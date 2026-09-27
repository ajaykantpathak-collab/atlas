'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================
const ALL_NODE_IDS = [
  'c9_chem_051',
  'c9_chem_052',
  'c9_chem_053',
  'c9_chem_054'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

const NODE_TITLES: Record<NodeId, string> = {
  c9_chem_051: 'Baseline Rain Acidity & Carbonic Acid Equilibrium',
  c9_chem_052: 'Sulfur Oxides (SO2/SO3) & Sulfuric Acid Kinetics',
  c9_chem_053: 'Nitrogen Oxides (NO/NO2) & Nitric Acid Synthesis',
  c9_chem_054: 'Environmental Impacts: Soil Leaching & Marble Decay'
};

const DEFAULT_PROPS = {
  initialNode: 'c9_chem_051' as NodeId,
  onComplete: (score: number) => { console.log('Sim completed with score:', score); }
};

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Atmospheric Chemistry & Acid Rain Simulation Facility',
  intro: 'Welcome to the ICSE Environmental Chemistry Laboratory. As atmospheric research lead, you will investigate how industrial emissions transform clean cloud moisture into acid precipitation and harm ecosystems.',
  context: 'Model gas-phase atmospheric oxidations, calculate exact rainwater pH shifts, trace pollutant drift across hundreds of kilometers, and evaluate marble corrosion and soil neutralization reactions.'
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Unpolluted, pristine rainwater collected over a remote oceanic island is tested with a calibrated digital pH meter. What pH will it display?',
  options: [
    'Exactly 7.00 because pristine rain is pure distilled water.',
    'Approximately 5.6 because atmospheric CO2 naturally dissolves to form weak carbonic acid.',
    'Exactly 8.2 because sea spray droplets make cloud water alkaline.',
    'Approximately 3.5 because solar cosmic rays split water into hydronium ions.'
  ],
  correctIndex: 1,
  hintAfter: 'Even untouched natural rain is naturally acidic (pH ~5.6) due to atmospheric carbon dioxide dissolving to form carbonic acid (H2CO3). Rain is classified as true "acid rain" only when pH drops below 5.6 due to SO2 and NOx.'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Natural Carbonic Acid Baseline',
    instruction: 'Adjust atmospheric CO2 concentrations between 250 ppm and 1000 ppm to observe the equilibrium formation of H2CO3 and natural rain baseline pH.',
    interactionType: 'carbonic-equilibrium',
    nodeId: 'c9_chem_051'
  },
  {
    title: 'Lab 2: Sulfur Oxides & Sulfuric Acid Formation',
    instruction: 'Vary SO2 industrial emissions, atmospheric humidity, and soot catalyst presence to measure catalytic oxidation into SO3 and H2SO4.',
    interactionType: 'sulfuric-kinetics',
    nodeId: 'c9_chem_052'
  },
  {
    title: 'Lab 3: Nitrogen Oxides & Nitric Acid Synthesis',
    instruction: 'Simulate high-temperature motor vehicle combustion and atmospheric lightning to generate NO, NO2, and dissolved HNO3 precipitation.',
    interactionType: 'nitric-synthesis',
    nodeId: 'c9_chem_053'
  },
  {
    title: 'Lab 4: Atmospheric Transport & Regional Dispersion Map',
    instruction: 'Set wind velocity and smokestack heights to track how acid rain plumes migrate up to 500 km downwind into pristine rural biomes.',
    interactionType: 'plume-dispersion',
    nodeId: 'c9_chem_054'
  },
  {
    title: 'Lab 5: Marble Corrosion & Ecological Neutralization Lab',
    instruction: 'Expose CaCO3 marble structures and forest soils to rainwater of varying pH. Test mitigation using calcium hydroxide (slaked lime) remediation.',
    interactionType: 'impact-neutralization',
    nodeId: 'c9_chem_054'
  }
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If thermal power plants increase SO2 output by 300% in a high-humidity environment with metallic particulate soot, what will happen to precipitation downwind?',
    options: [
      'pH remains at 5.6 because water buffers strong mineral acids.',
      'pH will drop dramatically towards 3.8-4.2 due to accelerated catalytic oxidation to H2SO4.',
      'pH rises above 7.0 because SO2 forms alkaline sulfites in cloud water.',
      'SO2 turns directly into solid sulfur crystals before cloud droplet absorption.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, increase SO2 emissions and turn ON soot catalysts to witness rapid pH drop down to 3.8.',
    nodeId: 'c9_chem_052'
  },
  {
    question: 'Predict: What primary chemical change occurs when acid rain (pH 4.2 containing H2SO4) reacts with marble (CaCO3) monuments like the Taj Mahal?',
    options: [
      'CaCO3 converts to insoluble magnetic iron oxide.',
      'CaCO3 reacts to form soluble calcium sulfate (CaSO4), water, and carbon dioxide gas, causing flaking and erosion.',
      'CaCO3 gains hydrogen ions to form crystalline sodium bicarbonate.',
      'No reaction occurs because marble is chemically inert to mineral acids.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5, select the Marble Substrate and lower rain pH to observe CO2 effervescent gas bubbles and mass loss.',
    nodeId: 'c9_chem_054'
  }
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When universal indicator is added to rainwater samples affected by high SO2 and NO2 emissions, what color change is observed on the pH scale?',
    observableOptions: [
      'Dark green to royal blue (pH 7 to pH 10)',
      'Light yellow-green (pH 5.6) shifting to orange and vivid pinkish-red (pH 4.0 - 3.5)',
      'Clear transparent to intense purple',
      'Bright yellow shifting to emerald green'
    ],
    correctIndex: 1,
    nodeId: 'c9_chem_052'
  },
  {
    question: 'Observation: What happens to aquatic life in mountain lakes when rain pH drops below 4.5 and toxic aluminum ions (Al3+) are leached from surrounding soils?',
    observableOptions: [
      'Fish thrive and reproduce rapidly due to increased mineral concentration.',
      'Fish experience mucus build-up on gills leading to asphyxiation, causing aquatic population collapse.',
      'Aluminum ions bind with oxygen to make the lake hyper-oxygenated.',
      'Water turns into solid crystalline jelly.'
    ],
    correctIndex: 1,
    nodeId: 'c9_chem_054'
  }
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Flue Gas Desulfurization (FGD) Engineering Design',
  description: 'Evaluate the operational requirements for a Wet Limestone Scrubber installed at a 500 MW thermal power station emitting 20 metric tonnes of SO2 per day.',
  steps: [
    'Step 1: Calculate daily SO2 molar emissions: 20 metric tons = 20,000,000 g / 64.06 g/mol = 312,207 mol SO2 daily.',
    'Step 2: Determine stoichiometric limestone (CaCO3) demand: SO2 + CaCO3 + 0.5 O2 + 2 H2O -> CaSO4·2H2O + CO2. Pure CaCO3 required = 312,207 mol * 100.09 g/mol = 31.25 tonnes/day.',
    'Step 3: Calculate gypsum byproduct output: Assuming 92% scrubber absorption efficiency, daily gypsum (CaSO4·2H2O) produced = 287,230 mol * 172.17 g/mol = 49.45 tonnes usable building gypsum.',
    'Step 4: Verify environmental compliance: Downwind precipitation pH recovers from an acidic 4.1 back up to 5.4, preserving regional forest soils and aquatic habitats.'
  ]
};

// ==========================================
// MISCONCEPTIONS & CORRECTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    title: 'Pure Rain is Completely Neutral (pH 7.0)',
    description: 'Students assume unpolluted rain is neutral like distilled water.',
    correction: 'Normal unpolluted rain is naturally acidic with a pH around 5.6 due to dissolved atmospheric carbon dioxide forming weak carbonic acid (H2CO3).'
  },
  {
    id: 'misc_02',
    title: 'Acid Rain Causes Instant Chemical Skin Burns',
    description: 'Students imagine acid rain burns human skin immediately like laboratory acid.',
    correction: 'Acid rain is far too dilute (pH 4.0-5.0) to burn human skin directly. Its damage is cumulative and ecological over years.'
  },
  {
    id: 'misc_03',
    title: 'Carbon Dioxide is the Primary Cause of Acid Rain',
    description: 'Students confuse greenhouse gases with acid rain precursor gases.',
    correction: 'CO2 causes baseline natural acidity (pH 5.6). True acid rain (pH < 5.6) is caused by SO2 and NOx forming strong sulfuric and nitric acids.'
  },
  {
    id: 'misc_04',
    title: 'Acid Rain Only Falls Near Power Plants and Cities',
    description: 'Students think acid rain stays right above industrial pollution sources.',
    correction: 'High-altitude prevailing winds transport precursor gases hundreds of kilometers, causing acid rain in pristine remote wilderness areas.'
  },
  {
    id: 'misc_05',
    title: 'Acid Rain Consists of Undiluted Concentrated Acids',
    description: 'Students think clouds store pure liquid sulfuric acid.',
    correction: 'Acid rain is over 99.9% liquid water containing minute micromolar concentrations of dissolved H+ ions, H2SO4, and HNO3.'
  },
  {
    id: 'misc_06',
    title: 'Liming Soil Permanently Prevents Acid Rain Damage',
    description: 'Students assume adding lime (Ca(OH)2) once permanently cures acidic soils.',
    correction: 'Liming provides temporary neutralization of hydrogen ions, but continued acid deposition leaches essential cations (K+, Ca2+, Mg2+) continuously.'
  }
];

// ==========================================
// DIAGNOSTIC QUESTIONS
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: 'c9_chem_051',
    question: 'What acid is formed when atmospheric carbon dioxide dissolves in rainwater?',
    options: ['Sulfuric Acid (H2SO4)', 'Nitric Acid (HNO3)', 'Carbonic Acid (H2CO3)', 'Hydrochloric Acid (HCl)'],
    correctIndex: 2
  },
  {
    id: 'diag_2',
    nodeId: 'c9_chem_051',
    question: 'Which equation correctly represents the reversible formation of baseline carbonic acid?',
    options: [
      'CO2 + H2O ⇌ H2CO3',
      'CO2 + O2 ⇌ CO3',
      '2CO + H2O ⇌ H2CO2',
      'C + 2H2O ⇌ CH4 + O2'
    ],
    correctIndex: 0
  },
  {
    id: 'diag_3',
    nodeId: 'c9_chem_052',
    question: 'What is the correct chemical formula for sulfur trioxide?',
    options: ['SO2', 'SO3', 'H2SO3', 'SO4'],
    correctIndex: 1
  },
  {
    id: 'diag_4',
    nodeId: 'c9_chem_052',
    question: 'Which gas dissolves in water droplets to directly yield sulfuric acid (H2SO4)?',
    options: ['Sulfur Dioxide (SO2)', 'Sulfur Trioxide (SO3)', 'Hydrogen Sulfide (H2S)', 'Carbon Monoxide (CO)'],
    correctIndex: 1
  },
  {
    id: 'diag_5',
    nodeId: 'c9_chem_053',
    question: 'What extreme atmospheric condition provides sufficient activation energy to bond N2 and O2 into nitric oxide (NO)?',
    options: ['Solar UV exposure', 'Atmospheric lightning discharges', 'Heavy rainstorm condensation', 'Ocean evaporation'],
    correctIndex: 1
  },
  {
    id: 'diag_6',
    nodeId: 'c9_chem_053',
    question: 'Which balanced equation describes the dissolution of nitrogen dioxide in cloud moisture and oxygen?',
    options: [
      '4NO2 + 2H2O + O2 -> 4HNO3',
      'NO2 + H2O -> HNO2',
      '2NO2 + H2O -> H2SO4',
      'NO2 + O2 -> NO4'
    ],
    correctIndex: 0
  },
  {
    id: 'diag_7',
    nodeId: 'c9_chem_054',
    question: 'Why does acid rain cause yellowing and necrosis of leaves in high-altitude forest canopies?',
    options: [
      'It freezes the sap inside tree trunks.',
      'It leaches essential calcium and magnesium nutrients from soil and damages leaf cuticle wax.',
      'It fills plant cells with heavy lead deposits.',
      'It blocks solar photons from reaching chloroplasts.'
    ],
    correctIndex: 1
  },
  {
    id: 'diag_8',
    nodeId: 'c9_chem_054',
    question: 'What chemical substance is commonly spread over acidic lakes to raise pH levels during environmental restoration?',
    options: ['Sodium chloride (NaCl)', 'Calcium hydroxide / carbonate (Limestone/Lime)', 'Copper sulfate (CuSO4)', 'Hydrochloric acid (HCl)'],
    correctIndex: 1
  }
];

// ==========================================
// 22 CHALLENGES ACROSS 3 TIERS
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  classifyItems?: { text: string; category: string }[];
  categories?: string[];
  sortItems?: string[];
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 Challenges)
  {
    id: 'c1',
    nodeId: 'c9_chem_051',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is the pH of natural, unpolluted rainwater under standard atmospheric conditions?',
    options: ['pH 7.0 (Strictly neutral)', 'pH 5.6 (Slightly acidic)', 'pH 8.5 (Slightly basic)', 'pH 3.2 (Strongly acidic)'],
    correctIndex: 1,
    explanation: 'Atmospheric carbon dioxide (CO2 ~415 ppm) dissolves naturally in water vapor to form weak carbonic acid (H2CO3), establishing a baseline pH of ~5.6.',
    hints: [
      'Think about whether atmospheric gases react with cloud water.',
      'Carbon dioxide forms a weak acid when dissolved.',
      'The natural baseline pH is slightly below 7, specifically around 5.6.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: 'c9_chem_051',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which weak dibasic acid is responsible for the natural acidity of clean rainwater?',
    options: ['Sulfuric Acid (H2SO4)', 'Carbonic Acid (H2CO3)', 'Nitric Acid (HNO3)', 'Phosphoric Acid (H3PO4)'],
    correctIndex: 1,
    explanation: 'Carbonic acid (H2CO3) is a diprotie weak acid formed by CO2 + H2O ⇌ H2CO3.',
    hints: [
      'It comes from the carbon dioxide in our atmosphere.',
      'Formula: H2CO3.',
      'It is carbonic acid.'
    ]
  },
  {
    id: 'c3',
    nodeId: 'c9_chem_052',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the principal industrial source of anthropogenic sulfur dioxide (SO2) in the atmosphere?',
    options: [
      'Nuclear power plant cooling towers',
      'Combustion of sulfur-containing fossil fuels (coal and heavy crude oil) in power stations',
      'Agricultural fertilizer application',
      'Solar energy farms'
    ],
    correctIndex: 1,
    explanation: 'Coal and crude oil contain 1-3% elemental sulfur impurities. Burning them releases high volumes of SO2 gas: S + O2 -> SO2.',
    hints: [
      'Look for energy generation involving coal or oil.',
      'Fossil fuels contain sulfur impurities.',
      'Thermal power plants burning coal emit massive quantities of SO2.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c4',
    nodeId: 'c9_chem_052',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Rainwater is officially classified as "acid rain" when its measured pH falls below what threshold?',
    options: ['pH 7.0', 'pH 6.5', 'pH 5.6', 'pH 2.0'],
    correctIndex: 2,
    explanation: 'Because natural rain has a baseline pH of 5.6 due to carbonic acid, any precipitation with pH < 5.6 is categorized as acid rain.',
    hints: [
      'Remember the baseline natural rain pH.',
      'Acid rain occurs when pH drops lower than natural carbonic baseline.',
      'The threshold value is 5.6.'
    ]
  },
  {
    id: 'c5',
    nodeId: 'c9_chem_051',
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Classify each atmospheric gas into whether it causes Natural Baseline Acidity or True Acid Rain Precursors.',
    categories: ['Natural Baseline (pH ~5.6)', 'Acid Rain Precursor (pH < 5.6)'],
    classifyItems: [
      { text: 'Carbon Dioxide (CO2)', category: 'Natural Baseline (pH ~5.6)' },
      { text: 'Sulfur Dioxide (SO2)', category: 'Acid Rain Precursor (pH < 5.6)' },
      { text: 'Sulfur Trioxide (SO3)', category: 'Acid Rain Precursor (pH < 5.6)' },
      { text: 'Nitrogen Dioxide (NO2)', category: 'Acid Rain Precursor (pH < 5.6)' },
      { text: 'Nitric Oxide (NO)', category: 'Acid Rain Precursor (pH < 5.6)' }
    ],
    explanation: 'CO2 creates natural baseline carbonic acid (pH 5.6), whereas SO2, SO3, NO, and NO2 yield strong mineral acids H2SO4 and HNO3.',
    hints: [
      'Which gas is present in pristine nature?',
      'SO2 and NOx come heavily from fossil fuel burning.',
      'CO2 goes to Natural Baseline; SO2, SO3, NO, NO2 go to Acid Rain Precursor.'
    ]
  },
  {
    id: 'c6',
    nodeId: 'c9_chem_053',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'How is nitric oxide (NO) synthesized in internal combustion engine cylinders?',
    options: [
      'Fuel hydrocarbons react directly with nitrogen gas.',
      'High engine temperatures (> 1500°C) cause atmospheric N2 and O2 to combine directly: N2 + O2 -> 2NO.',
      'Nitrate salts in gasoline decompose into NO gas.',
      'Coolant fluid evaporates into NO.'
    ],
    correctIndex: 1,
    explanation: 'The extreme thermal energy inside engine combustion chambers breaks the strong N≡N triple bond, enabling N2 + O2 -> 2NO.',
    hints: [
      'Consider the high temperature and pressure inside engines.',
      'Nitrogen and oxygen from atmospheric air react together.',
      'Equation: N2 + O2 -> 2NO at high temperatures.'
    ]
  },
  {
    id: 'c7',
    nodeId: 'c9_chem_054',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the chemical composition of historical marble monuments like the Taj Mahal that makes them vulnerable to acid rain?',
    options: ['Silicon dioxide (SiO2)', 'Calcium carbonate (CaCO3)', 'Aluminum oxide (Al2O3)', 'Sodium chloride (NaCl)'],
    correctIndex: 1,
    explanation: 'Marble is composed primarily of crystalline calcium carbonate (CaCO3), which reacts rapidly with sulfuric and nitric acids.',
    hints: [
      'Marble is a metamorphic form of limestone.',
      'It contains calcium and carbonate ions.',
      'Chemical formula: CaCO3.'
    ]
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'c8',
    nodeId: 'c9_chem_052',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Select the balanced chemical equation for the oxidation of sulfur dioxide to sulfur trioxide in atmospheric moisture droplets.',
    options: [
      'SO2 + O2 -> SO4',
      '2SO2 + O2 -> 2SO3',
      'SO2 + H2O -> H2SO3',
      'SO3 + O2 -> SO5'
    ],
    correctIndex: 1,
    explanation: 'Sulfur dioxide undergoes catalytic oxidation to sulfur trioxide: 2SO2(g) + O2(g) -> 2SO3(g).',
    hints: [
      'Check the atom counts on reactants and products side.',
      'Sulfur trioxide is SO3.',
      '2 SO2 molecules react with 1 O2 molecule to form 2 SO3 molecules.'
    ]
  },
  {
    id: 'c9',
    nodeId: 'c9_chem_054',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Problem Solving',
    question: 'A sample of acid rain collected near an industrial belt has a hydrogen ion concentration [H+] = 1.0 × 10^(-4) mol/L. Calculate its exact pH using pH = -log10[H+].',
    correctAnswer: 4.0,
    tolerance: 0.1,
    unit: 'pH',
    explanation: 'pH = -log10(1.0 × 10^-4) = -(-4) = 4.0.',
    hints: [
      'Recall the definition of pH: pH = -log10[H+].',
      'The exponent of 10^-4 is -4.',
      'Taking the negative of -4 yields pH = 4.0.'
    ]
  },
  {
    id: 'c10',
    nodeId: 'c9_chem_053',
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'Sequencing',
    question: 'Arrange the sequential steps of Nitric Acid Rain formation from high-temperature combustion to precipitation.',
    sortItems: [
      'Step 1: Atmospheric N2 and O2 combine at high temperatures in engines to form Nitric Oxide (NO)',
      'Step 2: Nitric Oxide (NO) reacts with atmospheric O2 to form red-brown Nitrogen Dioxide (NO2)',
      'Step 3: NO2 reacts with cloud water droplets and O2 to form Nitric Acid (4NO2 + 2H2O + O2 -> 4HNO3)',
      'Step 4: Nitric Acid dissociates in rain droplets into H+ and NO3- ions falling to earth'
    ],
    explanation: 'Atmospheric N2 + O2 -> 2NO, then 2NO + O2 -> 2NO2, followed by 4NO2 + 2H2O + O2 -> 4HNO3.',
    hints: [
      'Start with high-temperature engine combustion of atmospheric gases.',
      'First NO is formed, then oxidized to NO2.',
      'NO2 dissolves with oxygen in rain droplets to make HNO3.'
    ]
  },
  {
    id: 'c11',
    nodeId: 'c9_chem_054',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Chemical Equation Analysis',
    question: 'Which chemical reaction represents the erosion of marble (CaCO3) by sulfuric acid rain (H2SO4)?',
    options: [
      'CaCO3 + H2SO4 -> CaSO4 + H2O + CO2(g)',
      'CaCO3 + H2SO4 -> CaS + H2O + 2O2',
      'CaCO3 + H2SO4 -> Ca(HSO4)2 + CO',
      'CaCO3 + H2SO4 -> CaOH + SO3 + CO2'
    ],
    correctIndex: 0,
    explanation: 'Calcium carbonate reacts with sulfuric acid to form calcium sulfate (gypsum crust), liquid water, and carbon dioxide gas effervescence.',
    hints: [
      'Carbonates react with acids to yield salt, water, and carbon dioxide.',
      'The salt formed here is calcium sulfate (CaSO4).',
      'Equation: CaCO3 + H2SO4 -> CaSO4 + H2O + CO2.'
    ]
  },
  {
    id: 'c12',
    nodeId: 'c9_chem_054',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How does soil acidification damage forest ecosystems through metal ion leaching?',
    options: [
      'H+ ions replace essential nutrients (K+, Ca2+, Mg2+) on clay particles and wash toxic Al3+ ions into soil solution.',
      'H+ ions convert soil minerals into pure liquid mercury.',
      'Acid rain neutralizes all nitrogen compounds, starving trees of carbon.',
      'Acid rain turns soil clay into solid glass.'
    ],
    correctIndex: 0,
    explanation: 'Excess H+ ions displace essential cations (Ca2+, Mg2+, K+) from soil clay minerals, washing them away, while solubilizing toxic Al3+ ions that damage root structures.',
    hints: [
      'Think about ion exchange on negatively charged clay soil particles.',
      'H+ ions displace nutrient cations.',
      'Toxic aluminum (Al3+) ions become soluble and poison plant roots.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c13',
    nodeId: 'c9_chem_052',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Kinetics & Catalysis',
    question: 'Why does SO2 oxidize to SO3 much faster in polluted urban atmosphere compared to pure laboratory air?',
    options: [
      'Particulate matter (soot, fly ash, metal oxides of Fe and Mn) acts as a heterogeneous catalyst.',
      'Urban air contains higher concentrations of inert neon gas.',
      'Gravity is stronger over dense cities.',
      'Urban noise vibrations split SO2 bonds.'
    ],
    correctIndex: 0,
    explanation: 'Solid airborne particulates like iron and manganese oxide soot particles provide active surface sites that catalyze the oxidation of SO2 to SO3.',
    hints: [
      'Consider the catalytic role of soot and metal dust in urban air.',
      'Catalysts lower activation energy.',
      'Particulate soot and metal oxides act as heterogeneous catalysts.'
    ]
  },
  {
    id: 'c14',
    nodeId: 'c9_chem_051',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Equilibrium Analysis',
    question: 'Which step shows the primary step of ionization of carbonic acid in cloud water?',
    options: [
      'H2CO3 ⇌ H+ + HCO3-',
      'H2CO3 -> 2H+ + CO3(2-)',
      'H2CO3 -> H2O + CO2',
      'HCO3- -> H+ + C4+'
    ],
    correctIndex: 0,
    explanation: 'Carbonic acid is a weak dibasic acid that undergoes partial first-stage ionization: H2CO3 ⇌ H+ + HCO3- (Ka1 = 4.3 × 10^-7).',
    hints: [
      'Carbonic acid is a weak acid, so it dissociates step-wise.',
      'The first dissociation releases one H+ ion and a hydrogen carbonate ion.',
      'Formula: H2CO3 ⇌ H+ + HCO3-.'
    ]
  },
  {
    id: 'c15',
    nodeId: 'c9_chem_054',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Atmospheric Physics',
    question: 'Why do high industrial smokestacks built to reduce local smog actually worsen regional acid rain?',
    options: [
      'Tall stacks inject SO2 and NOx into high-altitude tropospheric winds, transporting them hundreds of kilometers downwind.',
      'Tall stacks heat the gas so much that it turns into hydrochloric acid.',
      'Tall stacks absorb oxygen from the upper atmosphere.',
      'Tall stacks block rainfall over the city completely.'
    ],
    correctIndex: 0,
    explanation: 'Tall chimneys dilute local urban smog by discharging gases into upper wind layers, but this allows long-range atmospheric transport into distant forest and lake catchments.',
    hints: [
      'Think about wind speeds at higher altitudes.',
      'Tall chimneys release pollutants higher up in the troposphere.',
      'High wind currents carry pollutants far away into pristine regions.'
    ],
    misconceptionIndex: 3
  },

  // ADVANCED TIER (7 Challenges)
  {
    id: 'c16',
    nodeId: 'c9_chem_054',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Quantitative Stoichiometry',
    question: 'How many grams of pure marble (CaCO3, molar mass = 100.09 g/mol) will be dissolved by 49.04 g of sulfuric acid (H2SO4, molar mass = 98.08 g/mol) in acid rain? (CaCO3 + H2SO4 -> CaSO4 + H2O + CO2)',
    correctAnswer: 50.04,
    tolerance: 0.5,
    unit: 'grams',
    explanation: 'Moles of H2SO4 = 49.04 g / 98.08 g/mol = 0.50 mol. 1:1 molar ratio requires 0.50 mol CaCO3. Mass CaCO3 = 0.50 mol × 100.09 g/mol = 50.045 g.',
    hints: [
      'First calculate moles of H2SO4: 49.04 / 98.08.',
      'Use the 1:1 stoichiometric ratio from the balanced chemical equation.',
      'Multiply moles by the molar mass of CaCO3 (100.09 g/mol).'
    ]
  },
  {
    id: 'c17',
    nodeId: 'c9_chem_053',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Stoichiometry',
    question: 'In the atmospheric synthesis of nitric acid, how many moles of NO2 are required to produce 4 moles of HNO3 according to 4NO2 + 2H2O + O2 -> 4HNO3?',
    options: ['2 moles', '4 moles', '1 mole', '8 moles'],
    correctIndex: 1,
    explanation: 'From the balanced stoichiometric equation 4NO2 + 2H2O + O2 -> 4HNO3, exactly 4 moles of NO2 generate 4 moles of HNO3 (1:1 molar ratio).',
    hints: [
      'Look at the stoichiometric coefficients in front of NO2 and HNO3.',
      'Coefficient of NO2 is 4, coefficient of HNO3 is 4.',
      'The molar ratio is 4:4 or 1:1.'
    ]
  },
  {
    id: 'c18',
    nodeId: 'c9_chem_054',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Quantitative pH Calculation',
    question: 'If a storm cloud absorbs enough SO3 to create a H2SO4 concentration of 5.0 × 10^(-5) mol/L, assuming complete 2-step ionization (yielding 2 H+ per H2SO4 molecule), calculate the rain pH. [H+] = 1.0 × 10^(-4) M.',
    correctAnswer: 4.0,
    tolerance: 0.1,
    unit: 'pH',
    explanation: '[H+] = 2 × (5.0 × 10^-5 M) = 1.0 × 10^-4 M. pH = -log10(10^-4) = 4.0.',
    hints: [
      'Sulfuric acid is a strong diprotic acid releasing 2 H+ ions per molecule.',
      '[H+] = 2 * (5.0 * 10^-5) = 1.0 * 10^-4 M.',
      'pH = -log(1.0 * 10^-4) = 4.0.'
    ]
  },
  {
    id: 'c19',
    nodeId: 'c9_chem_052',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Industrial Environmental Chemistry',
    question: 'In a Wet Limestone Flue Gas Desulfurization (FGD) scrubber, what solid byproduct is harvested for commercial drywall production?',
    options: [
      'Gypsum (Calcium sulfate dihydrate, CaSO4·2H2O)',
      'Calcium carbide (CaC2)',
      'Sodium bicarbonate (NaHCO3)',
      'Elemental sulfur crystals'
    ],
    correctIndex: 0,
    explanation: 'SO2 absorbed into slurry reacts with CaCO3 and forced air oxidation to yield synthetic Gypsum (CaSO4·2H2O), used worldwide in plasterboard/drywall manufacture.',
    hints: [
      'It is a hydrated calcium sulfate mineral.',
      'Used widely in construction sheetrock and plaster.',
      'Chemical name: Gypsum (CaSO4·2H2O).'
    ]
  },
  {
    id: 'c20',
    nodeId: 'c9_chem_053',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Mitigation Chemistry',
    question: 'How do vehicle three-way catalytic converters eliminate NOx precursors of acid rain?',
    options: [
      'They reduce NOx to harmless N2 gas using platinum/rhodium catalysts: 2NOx -> xO2 + N2.',
      'They dissolve NOx into liquid nitric acid stored in the trunk.',
      'They freeze NOx into solid dry ice.',
      'They convert NOx into methane gas.'
    ],
    correctIndex: 0,
    explanation: 'Catalytic converters utilize platinum, palladium, and rhodium to reduce harmful NOx emissions back into atmospheric nitrogen (N2) and oxygen (O2).',
    hints: [
      'Reduction converts nitrogen oxides back into elemental atmospheric nitrogen.',
      'Catalysts used are precious metals (Pt, Rh).',
      'Reaction: 2NOx -> N2 + xO2.'
    ]
  },
  {
    id: 'c21',
    nodeId: 'c9_chem_051',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Le Chatelier Principle',
    question: 'According to Le Chatelier’s Principle, if atmospheric CO2 increases from 280 ppm (pre-industrial) to 420 ppm (current), how does the CO2(g) + H2O(l) ⇌ H2CO3(aq) equilibrium shift?',
    options: [
      'Shifts to the right, increasing [H2CO3] and slightly lowering natural rain pH.',
      'Shifts to the left, decreasing H2CO3 and making rain alkaline.',
      'No shift occurs because water concentration is constant.',
      'CO2 precipitates out as liquid carbon.'
    ],
    correctIndex: 0,
    explanation: 'Increasing reactant CO2 gas concentration shifts equilibrium forward (right), forming more H2CO3, which increases [H+] and lowers baseline natural rain pH from ~5.65 to ~5.55.',
    hints: [
      'Increasing a reactant concentration drives equilibrium forward.',
      'Forward shift produces more H2CO3.',
      'Higher H2CO3 yields higher [H+] and lower pH.'
    ]
  },
  {
    id: 'c22',
    nodeId: 'c9_chem_054',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Ecological Cascade Sequencing',
    question: 'Order the sequential cascade of ecological events when continuous acid rain falls on a mountain forest ecosystem.',
    sortItems: [
      '1. Acid rain (pH 4.1) deposits high H+ ion concentration onto forest canopy and topsoil.',
      '2. H+ ions displace essential Ca2+ and Mg2+ cations from soil particles, leaching them into groundwater.',
      '3. Solubilized toxic Al3+ ions accumulate in soil water, damaging fine root hairs.',
      '4. Trees suffer severe nutrient deficiency, wax layer degradation, and dieback, leaving forest vulnerable to frost.'
    ],
    explanation: 'Acid deposition -> cation leaching -> Al3+ toxicity mobilization -> root hair destruction & tree canopy dieback.',
    hints: [
      'Start with initial atmospheric acid deposition.',
      'Follow H+ ion exchange in soil clay.',
      'Trace aluminum solubilization leading to tree canopy dieback.'
    ]
  }
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// 1. Atmosphere Cycle SVG Diagram
const AcidRainAtmosphereDiagram: React.FC<{
  so2Ppm: number;
  noxPpm: number;
  rainPh: number;
}> = ({ so2Ppm, noxPpm, rainPh }) => {
  const getPhColor = (ph: number) => {
    if (ph >= 5.6) return '#22c55e'; // green
    if (ph >= 4.8) return '#eab308'; // yellow
    if (ph >= 4.0) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const phColor = getPhColor(rainPh);

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-2xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Atmospheric Transport & Acid Synthesis Cycle</h4>
        <span className="text-xs font-mono font-bold px-2 py-1 rounded" style={{ backgroundColor: `${phColor}22`, color: phColor }}>
          Cloud Rain pH: {rainPh.toFixed(2)}
        </span>
      </div>
      <svg viewBox="0 0 800 360" className="w-full h-auto rounded-lg bg-slate-950">
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="60%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Sky background */}
        <rect width="800" height="360" fill="url(#skyGrad)" />

        {/* Ground & Mountain */}
        <path d="M 0 320 Q 200 280, 400 320 T 800 300 L 800 360 L 0 360 Z" fill="#14532d" />
        <path d="M 550 320 L 650 180 L 750 320 Z" fill="#334155" />
        <path d="M 625 215 L 650 180 L 675 215 Z" fill="#f8fafc" /> {/* Snow cap */}

        {/* Taj Mahal / Building Silhouette on right */}
        <g transform="translate(420, 240)">
          <path d="M 20 60 L 100 60 L 100 20 L 20 20 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
          <path d="M 45 20 C 45 0, 75 0, 75 20 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" /> {/* Main Dome */}
          <rect x="52" y="30" width="16" height="30" fill="#475569" /> {/* Entry arch */}
          {/* Minarets */}
          <rect x="5" y="10" width="8" height="50" fill="#cbd5e1" />
          <rect x="107" y="10" width="8" height="50" fill="#cbd5e1" />
        </g>

        {/* Industrial Factory Stack on left */}
        <g transform="translate(60, 220)">
          <rect x="0" y="30" width="70" height="70" fill="#334155" stroke="#475569" strokeWidth="2" />
          <rect x="15" y="0" width="18" height="30" fill="#475569" />
          <rect x="42" y="10" width="15" height="20" fill="#475569" />

          {/* Exhaust Plume */}
          <path d="M 24 0 Q 30 -40, 70 -60 T 160 -90" fill="none" stroke="#94a3b8" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
          <path d="M 50 10 Q 70 -30, 110 -50 T 200 -80" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
        </g>

        {/* Clouds */}
        <g transform="translate(180, 40)" fill="url(#cloudGrad)">
          <path d="M 20 50 Q 0 50, 0 35 Q 0 20, 20 20 Q 35 0, 65 10 Q 90 0, 110 20 Q 130 20, 130 35 Q 130 50, 110 50 Z" />
        </g>

        <g transform="translate(450, 50)" fill="url(#cloudGrad)">
          <path d="M 20 50 Q 0 50, 0 35 Q 0 20, 20 20 Q 35 0, 65 10 Q 90 0, 110 20 Q 130 20, 130 50 Z" />
        </g>

        {/* Gas molecules labels */}
        <g transform="translate(160, 130)" filter="url(#glow)">
          <rect x="-10" y="-14" width="120" height="28" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="50" y="4" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">
            SO₂ + NOₓ Gases
          </text>
        </g>

        {/* Atmospheric Reaction Box */}
        <g transform="translate(320, 80)" filter="url(#glow)">
          <rect x="-10" y="-14" width="180" height="42" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
          <text x="80" y="4" fill="#a5b4fc" fontSize="11" fontWeight="bold" textAnchor="middle">
            Oxidation in Moisture
          </text>
          <text x="80" y="20" fill="#c7d2fe" fontSize="10" textAnchor="middle">
            H₂SO₄ & HNO₃ Formation
          </text>
        </g>

        {/* Wind Arrow */}
        <path d="M 120 40 L 360 40" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow)" />
        <text x="240" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Atmospheric Wind Transport (100 - 500 km)</text>

        {/* Rain Streams */}
        <g stroke={phColor} strokeWidth="2" strokeDasharray="4 6" opacity="0.8">
          <line x1="480" y1="100" x2="470" y2="240" />
          <line x1="510" y1="100" x2="500" y2="240" />
          <line x1="540" y1="100" x2="530" y2="240" />
          <line x1="570" y1="100" x2="560" y2="240" />
          <line x1="650" y1="180" x2="640" y2="300" />
        </g>

        {/* Labels on impacts */}
        <g transform="translate(480, 290)">
          <rect x="-50" y="-12" width="120" height="24" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
          <text x="10" y="4" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">
            Marble Decay (CaCO₃)
          </text>
        </g>

        <g transform="translate(670, 270)">
          <rect x="-55" y="-12" width="110" height="24" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="1" />
          <text x="0" y="4" fill="#86efac" fontSize="10" fontWeight="bold" textAnchor="middle">
            Soil Al³⁺ Leaching
          </text>
        </g>
      </svg>
    </div>
  );
};

// 2. Reaction Mechanism SVG Diagram
const ReactionMechanismDiagram: React.FC<{ activeTab: 'sulfur' | 'nitrogen' }> = ({ activeTab }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
        {activeTab === 'sulfur' ? 'Sulfuric Acid Stepwise Reaction Pathway' : 'Nitric Acid Stepwise Reaction Pathway'}
      </h4>
      <svg viewBox="0 0 800 220" className="w-full h-auto bg-slate-950 rounded-lg">
        {activeTab === 'sulfur' ? (
          <g>
            {/* Step 1 */}
            <g transform="translate(40, 40)">
              <rect width="210" height="140" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="105" y="24" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">1. Fuel Combustion</text>
              <text x="105" y="55" fill="#f8fafc" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">S + O₂ → SO₂</text>
              <text x="105" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Elemental sulfur impurity</text>
              <text x="105" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">burns in air releasing SO₂ gas</text>
              <circle cx="105" cy="122" r="8" fill="#eab308" />
              <text x="105" y="125" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">S</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 255 110 L 290 110" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Step 2 */}
            <g transform="translate(295, 40)">
              <rect width="210" height="140" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="105" y="24" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">2. Catalytic Oxidation</text>
              <text x="105" y="55" fill="#f8fafc" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2SO₂ + O₂ → 2SO₃</text>
              <text x="105" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Catalyzed by soot particulates</text>
              <text x="105" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">& metallic dust in clouds</text>
              <rect x="70" y="112" width="70" height="16" rx="3" fill="#312e81" />
              <text x="105" y="124" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">Soot/Fe₂O₃</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 510 110 L 545 110" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Step 3 */}
            <g transform="translate(550, 40)">
              <rect width="210" height="140" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
              <text x="105" y="24" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">3. Cloud Dissolution</text>
              <text x="105" y="55" fill="#f8fafc" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SO₃ + H₂O → H₂SO₄</text>
              <text x="105" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Rapid hydrolysis yielding</text>
              <text x="105" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">strong sulfuric acid in rain</text>
              <text x="105" y="124" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">H⁺ + HSO₄⁻ Ions</text>
            </g>
          </g>
        ) : (
          <g>
            {/* Step 1 */}
            <g transform="translate(40, 40)">
              <rect width="210" height="140" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <text x="105" y="24" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">1. Thermal Fixation</text>
              <text x="105" y="55" fill="#f8fafc" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">N₂ + O₂ → 2NO</text>
              <text x="105" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Occurs at &gt;1500°C in engines</text>
              <text x="105" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">or during lightning bolts</text>
              <path d="M 95 112 L 115 112 L 100 128 L 115 128 L 95 135" fill="none" stroke="#eab308" strokeWidth="2" />
            </g>

            {/* Arrow 1 */}
            <path d="M 255 110 L 290 110" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Step 2 */}
            <g transform="translate(295, 40)">
              <rect width="210" height="140" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="105" y="24" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">2. Air Oxidation</text>
              <text x="105" y="55" fill="#f8fafc" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2NO + O₂ → 2NO₂</text>
              <text x="105" y="85" fill="#94a3b8" fontSize="10" textAnchor="middle">Nitric oxide oxidizes to form</text>
              <text x="105" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">choking reddish-brown NO₂</text>
              <rect x="75" y="112" width="60" height="16" rx="3" fill="#b45309" />
              <text x="105" y="124" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">Brown Gas</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 510 110 L 545 110" stroke="#64748b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Step 3 */}
            <g transform="translate(550, 40)">
              <rect width="210" height="140" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
              <text x="105" y="24" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">3. Aqueous Synthesis</text>
              <text x="105" y="50" fill="#f8fafc" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">4NO₂ + 2H₂O + O₂</text>
              <text x="105" y="68" fill="#f8fafc" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">→ 4HNO₃</text>
              <text x="105" y="92" fill="#94a3b8" fontSize="10" textAnchor="middle">Dissolves in cloud drops</text>
              <text x="105" y="106" fill="#94a3b8" fontSize="10" textAnchor="middle">forming strong nitric acid</text>
              <text x="105" y="126" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">H⁺ + NO₃⁻ Ions</text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

// 3. Marble Erosion SVG Diagram
const MarbleErosionDiagram: React.FC<{ ph: number; erosionRate: number }> = ({ ph, erosionRate }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
        Microscopic View: Marble (CaCO₃) Acid Attack Kinetics
      </h4>
      <svg viewBox="0 0 800 200" className="w-full h-auto bg-slate-950 rounded-lg">
        {/* Unreacted lattice left */}
        <g transform="translate(50, 20)">
          <rect width="320" height="160" rx="6" fill="#0f172a" stroke="#334155" />
          <text x="160" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Intact Marble Surface (pH 7.0)</text>
          {/* Lattice circles */}
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => (
              <g key={`l-${r}-${c}`} transform={`translate(${45 + c * 38}, ${50 + r * 28})`}>
                <circle cx="0" cy="0" r="11" fill="#cbd5e1" stroke="#64748b" />
                <text x="0" y="3" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">Ca²⁺</text>
                <circle cx="16" cy="12" r="9" fill="#94a3b8" stroke="#475569" />
                <text x="16" y="14" fill="#0f172a" fontSize="7" fontWeight="bold" textAnchor="middle">CO₃</text>
              </g>
            ))
          )}
        </g>

        {/* Acid reaction right */}
        <g transform="translate(430, 20)">
          <rect width="320" height="160" rx="6" fill="#1e1b4b" stroke={ph < 5.0 ? '#ef4444' : '#3b82f6'} />
          <text x="160" y="25" fill={ph < 5.0 ? '#fca5a5' : '#93c5fd'} fontSize="11" fontWeight="bold" textAnchor="middle">
            Acid Attack (pH {ph.toFixed(1)}) - Corrosion Rate: {erosionRate.toFixed(1)} µm/yr
          </text>

          {/* Damaged lattice with effervescing CO2 bubbles */}
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 7 }).map((_, c) => {
              const isEroded = ph < 5.2 && (r + c) % 2 === 0;
              return (
                <g key={`r-${r}-${c}`} transform={`translate(${45 + c * 38}, ${50 + r * 28})`}>
                  {isEroded ? (
                    <g className="animate-pulse">
                      <circle cx="0" cy="-5" r="7" fill="none" stroke="#60a5fa" strokeDasharray="2 2" />
                      <text x="0" y="-3" fill="#60a5fa" fontSize="7" textAnchor="middle">CO₂↑</text>
                      <circle cx="14" cy="5" r="6" fill="#ef4444" opacity="0.6" />
                      <text x="14" y="7" fill="#fff" fontSize="6" textAnchor="middle">H⁺</text>
                    </g>
                  ) : (
                    <g>
                      <circle cx="0" cy="0" r="10" fill="#cbd5e1" opacity={ph < 4.5 ? 0.6 : 1.0} />
                      <text x="0" y="3" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">Ca²⁺</text>
                    </g>
                  )}
                </g>
              );
            })
          )}

          {/* Gypsum crust indicator */}
          {ph < 5.0 && (
            <path d="M 30 145 Q 160 135, 290 145" fill="none" stroke="#fef08a" strokeWidth="6" strokeDasharray="5 3" />
          )}
          <text x="160" y="155" fill="#fef08a" fontSize="9" textAnchor="middle">
            {ph < 5.0 ? 'Flaky Gypsum Crust (CaSO₄·2H₂O) Dissolving Away' : 'Stable Carbonate Matrix'}
          </text>
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================
export default function C9_ChemistryAcidraincompositionandcausesSim({
  initialNode = DEFAULT_PROPS.initialNode,
  onComplete = DEFAULT_PROPS.onComplete
}: {
  initialNode?: NodeId;
  onComplete?: (score: number) => void;
}) {
  // ----------------------------------------
  // NAVIGATION & TAB STATE
  // ----------------------------------------
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>(initialNode);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab Exploration Selection
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);

  // Lab 1 State: Carbonic baseline
  const [co2Ppm, setCo2Ppm] = useState<number>(415);

  // Lab 2 State: Sulfur kinetics
  const [so2Emissions, setSo2Emissions] = useState<number>(180); // ppb
  const [humidity, setHumidity] = useState<number>(65); // %
  const [sootCatalyst, setSootCatalyst] = useState<boolean>(true);

  // Lab 3 State: Nitrogen kinetics
  const [vehicleDensity, setVehicleDensity] = useState<number>(250); // index
  const [lightningActive, setLightningActive] = useState<boolean>(false);

  // Lab 4 State: Atmospheric Dispersion
  const [windSpeed, setWindSpeed] = useState<number>(35); // km/h
  const [distanceDownwind, setDistanceDownwind] = useState<number>(120); // km

  // Lab 5 State: Ecological Neutralization
  const [substrateType, setSubstrateType] = useState<'marble' | 'lake' | 'soil'>('marble');
  const [addedLime, setAddedLime] = useState<number>(0); // kg/hectare

  // Calculated Rain pH
  const calculatedRainPh = useMemo(() => {
    // Baseline CO2 contribution: pH ~ 5.65 at 280ppm, 5.56 at 415ppm
    const co2HPlus = Math.pow(10, -5.6) * Math.sqrt(co2Ppm / 280);

    // SO2 contribution (sulfuric acid diprotic)
    const catalystMultiplier = sootCatalyst ? 2.5 : 1.0;
    const humidityMultiplier = humidity / 50;
    const so2HPlus = (so2Emissions * 1e-7) * catalystMultiplier * humidityMultiplier;

    // NOx contribution (nitric acid)
    const lightningBoost = lightningActive ? 1.5e-5 : 0;
    const noxHPlus = (vehicleDensity * 0.8e-7) + lightningBoost;

    const totalHPlus = co2HPlus + so2HPlus + noxHPlus;
    const rawPh = -Math.log10(totalHPlus);
    return Math.max(3.0, Math.min(7.0, rawPh));
  }, [co2Ppm, so2Emissions, humidity, sootCatalyst, vehicleDensity, lightningActive]);

  // Neutralized pH in Lab 5
  const effectivePh = useMemo(() => {
    if (addedLime <= 0) return calculatedRainPh;
    const limeNeutralizationBoost = Math.log10(1 + addedLime * 0.05);
    return Math.min(7.0, calculatedRainPh + limeNeutralizationBoost);
  }, [calculatedRainPh, addedLime]);

  // Marble erosion rate calculation (micrometers per year)
  const marbleErosionRate = useMemo(() => {
    if (effectivePh >= 5.6) return 2.5;
    return 2.5 + Math.pow(10, 5.6 - effectivePh) * 12.0;
  }, [effectivePh]);

  // ----------------------------------------
  // PREDICTION & OBSERVATION ANSWERS STATE
  // ----------------------------------------
  const [predAnswers, setPredAnswers] = useState<(number | null)[]>([null, null]);
  const [predSubmitted, setPredSubmitted] = useState<boolean[]>([false, false]);

  const [obsAnswers, setObsAnswers] = useState<(number | null)[]>([null, null]);
  const [obsSubmitted, setObsSubmitted] = useState<boolean[]>([false, false]);

  // ----------------------------------------
  // CHALLENGES ENGINE STATE
  // ----------------------------------------
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [userMcqChoice, setUserMcqChoice] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userClassify, setUserClassify] = useState<Record<string, string>>({});
  const [userSortedItems, setUserSortedItems] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // SRS / BKT tracking
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>({});
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // UI Visual Effects
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint inactivity timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const activeCh = CHALLENGES[currentChallengeIdx];
      if (activeCh && !challengeFeedback) {
        setCurrentHint(`Auto-Hint: ${activeCh.hints[0]}`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [currentChallengeIdx, challengeFeedback]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIdx]);

  // Synchronize Drag-Sort Items on Challenge Change
  useEffect(() => {
    const ch = CHALLENGES[currentChallengeIdx];
    if (ch && ch.type === 'drag-sort' && ch.sortItems) {
      // Shuffle slightly or copy
      setUserSortedItems([...ch.sortItems]);
    } else {
      setUserSortedItems([]);
    }
    setUserMcqChoice(null);
    setUserNumericInput('');
    setUserClassify({});
    setChallengeFeedback(null);
    setShowHint(false);
  }, [currentChallengeIdx]);

  // Initial Voice Welcome
  useEffect(() => {
    speechManager.speak('Welcome to the Acid Rain Composition and Environmental Causes Simulation Lab.');
  }, []);

  // ----------------------------------------
  // ANIMATED ATMOSPHERE CANVAS
  // ----------------------------------------
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Raindrop particles
    const raindrops = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 3 + Math.random() * 5,
      length: 8 + Math.random() * 10
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rain Color based on calculated pH
      let rainColor = '#22c55e'; // green
      if (effectivePh < 5.6) rainColor = '#eab308'; // yellow
      if (effectivePh < 4.8) rainColor = '#f97316'; // orange
      if (effectivePh < 4.0) rainColor = '#ef4444'; // red

      // Draw raindrops
      ctx.strokeStyle = rainColor;
      ctx.lineWidth = 1.5;
      raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - windSpeed * 0.1, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= windSpeed * 0.05;
        if (drop.y > canvas.height) {
          drop.y = -10;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x < 0) drop.x = canvas.width;
      });

      // Ground Landscape
      ctx.fillStyle = effectivePh < 4.5 ? '#78350f' : '#15803d'; // yellowed/brown ground if high acid
      ctx.beginPath();
      ctx.arc(150, 240, 160, Math.PI, 0);
      ctx.fill();

      // Trees
      ctx.fillStyle = effectivePh < 4.8 ? '#a16207' : '#166534';
      ctx.fillRect(100, 120, 10, 30);
      ctx.beginPath();
      ctx.arc(105, 110, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillRect(180, 130, 8, 25);
      ctx.beginPath();
      ctx.arc(184, 120, 15, 0, Math.PI * 2);
      ctx.fill();

      // Lake Water Body
      ctx.fillStyle = effectivePh < 4.5 ? '#0284c7' : '#0369a1';
      ctx.beginPath();
      ctx.ellipse(320, 160, 70, 25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lake Fish indicator
      if (effectivePh >= 4.8) {
        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(310, 160, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(335, 165, 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Floating dead fish X markers
        ctx.strokeStyle = '#f87171';
        ctx.lineWidth = 1.5;
        ctx.strokeText('x', 310, 158);
        ctx.strokeText('x', 330, 162);
      }

      // Overlay text
      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Simulated Rain pH: ${effectivePh.toFixed(2)}`, 15, 25);
      ctx.fillText(`Wind Speed: ${windSpeed} km/h`, 15, 40);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [effectivePh, windSpeed]);

  // ----------------------------------------
  // DISCOVERY SUBMIT HANDLER
  // ----------------------------------------
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Even unpolluted natural rainwater is naturally acidic with a pH of 5.6 due to dissolved carbon dioxide.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember that carbon dioxide in the air dissolves to form weak carbonic acid.');
    }
  };

  // ----------------------------------------
  // PREDICTION / OBSERVATION SUBMIT HANDLERS
  // ----------------------------------------
  const handlePredSubmit = (idx: number) => {
    if (predAnswers[idx] === null) return;
    const nextSub = [...predSubmitted];
    nextSub[idx] = true;
    setPredSubmitted(nextSub);

    if (predAnswers[idx] === PREDICTION_QUESTIONS[idx].correctIndex) {
      audioManager.play('success');
      speechManager.speak('Prediction verified correct!');
    } else {
      audioManager.play('error');
    }
  };

  const handleObsSubmit = (idx: number) => {
    if (obsAnswers[idx] === null) return;
    const nextSub = [...obsSubmitted];
    nextSub[idx] = true;
    setObsSubmitted(nextSub);

    if (obsAnswers[idx] === OBSERVATION_QUESTIONS[idx].correctIndex) {
      audioManager.play('success');
      speechManager.speak('Observation correct!');
    } else {
      audioManager.play('error');
    }
  };

  // ----------------------------------------
  // CHALLENGE SUBMISSION ENGINE
  // ----------------------------------------
  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    const activeCh = CHALLENGES[currentChallengeIdx];
    if (!activeCh) return;

    let isCorrect = false;

    if (activeCh.type === 'mcq') {
      if (userMcqChoice === null) return;
      isCorrect = (userMcqChoice === activeCh.correctIndex);
    } else if (activeCh.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (isNaN(val)) return;
      const target = Number(activeCh.correctAnswer);
      const tol = activeCh.tolerance || 0.1;
      isCorrect = Math.abs(val - target) <= tol;
    } else if (activeCh.type === 'classify') {
      if (!activeCh.classifyItems) return;
      isCorrect = activeCh.classifyItems.every(item => userClassify[item.text] === item.category);
    } else if (activeCh.type === 'drag-sort') {
      if (!activeCh.sortItems) return;
      isCorrect = userSortedItems.every((item, idx) => item === activeCh.sortItems![idx]);
    }

    // Update BKT & SRS state
    const targetNode = activeCh.nodeId;
    const currentBKT = bktStates[targetNode] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);

    setBktStates(prev => ({
      ...prev,
      [targetNode]: updatedBKT
    }));

    const srsId = activeCh.id;
    const currentSRS = srsItems[srsId] || createReviewItem(srsId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);

    setSrsItems(prev => ({
      ...prev,
      [srsId]: updatedSRS
    }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('celebration');
      speechManager.speak('Excellent job! That is correct.');
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${activeCh.explanation}` });
      setShowConfetti(true);
      setShowSuccess(true);
      setShowSparkle(true);
      setCompletedChallenges(prev => new Set(prev).add(activeCh.id));
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('Not quite right. Review the explanation and try again.');
      setChallengeFeedback({ isCorrect: false, text: `Incorrect. ${activeCh.explanation}` });
    }
  };

  const handleNextChallenge = () => {
    setShowConfetti(false);
    setShowSuccess(false);
    setShowSparkle(false);
    setChallengeFeedback(null);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges
      const totalScore = Math.round((completedChallenges.size / CHALLENGES.length) * 100);
      recordGameScore('acid_rain_sim', totalScore);
      onComplete(totalScore);
      setActiveTab('summary');
      speechManager.speak('Congratulations! You have completed all acid rain simulation challenges.');
    }
  };

  // Helper for drag-sort reordering
  const moveSortItem = (index: number, direction: 'up' | 'down') => {
    audioManager.play('tap');
    const newItems = [...userSortedItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setUserSortedItems(newItems);
  };

  // Current active challenge reference
  const currentCh = CHALLENGES[currentChallengeIdx];
  const currentMastery = getMasteryLevel(bktStates[currentCh.nodeId] || createBKTState());

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6 select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Completed!" />
      <HintBubble show={showHint} text={currentHint} />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* HEADER SECTION */}
      <header className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              ICSE Class 9 Chemistry
            </span>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold px-3 py-1 rounded-full">
              Atmospheric Science & Acids
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Acid Rain: Composition, Kinetics & Environmental Impacts
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-3xl">
            {SCENARIO.intro}
          </p>
        </div>

        {/* Global Node Mastery Badges */}
        <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
          {ALL_NODE_IDS.map(nodeId => {
            const master = getMasteryLevel(bktStates[nodeId]);
            return (
              <div key={nodeId} className="bg-slate-950 border border-slate-800 p-2 rounded-lg flex flex-col">
                <span className="text-[10px] text-slate-400 font-mono truncate">{nodeId}</span>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <span className="text-xs font-semibold text-slate-200">
                    {nodeId === 'c9_chem_051' ? 'CO₂ Rain' : nodeId === 'c9_chem_052' ? 'SOₓ Acid' : nodeId === 'c9_chem_053' ? 'NOₓ Acid' : 'Impacts'}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    master === 'mastered' ? 'bg-emerald-500/20 text-emerald-400' :
                    master === 'proficient' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {master}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {/* TOP NAVIGATION TABS */}
      <nav className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`px-5 py-3 font-semibold text-sm transition-all rounded-t-xl flex items-center gap-2 ${
            activeTab === 'discovery'
              ? 'bg-slate-900 border-t-2 border-amber-400 text-amber-400 border-x border-slate-800'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <span>💡</span> 1. Discovery & Hypotheses
        </button>
        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`px-5 py-3 font-semibold text-sm transition-all rounded-t-xl flex items-center gap-2 ${
            activeTab === 'lab'
              ? 'bg-slate-900 border-t-2 border-indigo-400 text-indigo-400 border-x border-slate-800'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <span>🧪</span> 2. Interactive Chemistry Labs
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`px-5 py-3 font-semibold text-sm transition-all rounded-t-xl flex items-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-slate-900 border-t-2 border-emerald-400 text-emerald-400 border-x border-slate-800'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <span>🎯</span> 3. Mastery Challenges ({completedChallenges.size}/{CHALLENGES.length})
        </button>
        <button
          onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
          className={`px-5 py-3 font-semibold text-sm transition-all rounded-t-xl flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-slate-900 border-t-2 border-sky-400 text-sky-400 border-x border-slate-800'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <span>📊</span> 4. Lab Summary & Industrial Applications
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & HYPOTHESIS */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Initial Discovery Challenge</span>
              <h2 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h2>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => { setDiscoverySelected(idx); audioManager.play('tap'); }}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      discoverySelected === idx
                        ? 'border-amber-400 bg-amber-400/10 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoverySelected === null}
                  onClick={handleDiscoverySubmit}
                  className="mt-6 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  Verify Discovery Hypothesis
                </button>
              ) : (
                <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-300 text-sm">
                  <span className="font-bold text-amber-400">Scientific Explanation: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS ARRAY (MANDATORY RENDER) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-md font-bold text-slate-200 flex items-center gap-2">
                <span>🔮</span> Predictive Scenarios ({PREDICTION_QUESTIONS.length})
              </h3>
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-indigo-300">{pq.question}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        disabled={predSubmitted[pIdx]}
                        onClick={() => {
                          const nextAns = [...predAnswers];
                          nextAns[pIdx] = oIdx;
                          setPredAnswers(nextAns);
                          audioManager.play('tap');
                        }}
                        className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                          predAnswers[pIdx] === oIdx
                            ? 'border-indigo-500 bg-indigo-500/10 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {!predSubmitted[pIdx] ? (
                    <button
                      disabled={predAnswers[pIdx] === null}
                      onClick={() => handlePredSubmit(pIdx)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all"
                    >
                      Confirm Prediction #{pIdx + 1}
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 border border-indigo-500/30 rounded-lg text-xs text-indigo-200">
                      <span className="font-bold">Lab Verification Tip: </span> {pq.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <AcidRainAtmosphereDiagram so2Ppm={so2Emissions} noxPpm={vehicleDensity} rainPh={effectivePh} />

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Core Atmospheric Reaction Summary</h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono">
                  <span className="text-emerald-400 font-bold">Natural Baseline:</span><br />
                  CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ (pH ~ 5.6)
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono">
                  <span className="text-amber-400 font-bold">Sulfuric Acid Pathway:</span><br />
                  2SO₂ + O₂ → 2SO₃ (Catalytic soot/dust)<br />
                  SO₃ + H₂O → H₂SO₄ → H⁺ + HSO₄⁻
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono">
                  <span className="text-indigo-400 font-bold">Nitric Acid Pathway:</span><br />
                  N₂ + O₂ → 2NO (Engine high temp / Lightning)<br />
                  2NO + O₂ → 2NO₂<br />
                  4NO₂ + 2H₂O + O₂ → 4HNO₃ → 4H⁺ + 4NO₃⁻
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE CHEMISTRY LABS */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LAB SELECTOR & CONTROLS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Select Exploration Workbench</h2>
              <div className="space-y-2">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedLabIndex(idx); audioManager.play('tap'); }}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                      selectedLabIndex === idx
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>{step.title}</span>
                    <span className="text-[10px] font-mono opacity-60">{step.nodeId}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                <span className="font-bold text-indigo-400">Lab Directive: </span>
                {EXPLORATION_STEPS[selectedLabIndex].instruction}
              </div>
            </div>

            {/* DYNAMIC LAB PARAMETER SLIDERS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
                Interactive Chemical Kinetics Controls
              </h3>

              {selectedLabIndex === 0 && (
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-300">Atmospheric CO₂ Concentration:</span>
                    <span className="text-emerald-400 font-mono">{co2Ppm} ppm</span>
                  </div>
                  <input
                    type="range"
                    min="250"
                    max="1000"
                    step="5"
                    value={co2Ppm}
                    onChange={(e) => setCo2Ppm(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-2">
                    Pre-industrial baseline: ~280 ppm. Current atmospheric level: ~415 ppm. Notice how CO2 alone sets baseline pH to ~5.6.
                  </p>
                </div>
              )}

              {selectedLabIndex === 1 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">SO₂ Emission Load:</span>
                      <span className="text-amber-400 font-mono">{so2Emissions} ppb</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={so2Emissions}
                      onChange={(e) => setSo2Emissions(parseFloat(e.target.value))}
                      className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Relative Humidity:</span>
                      <span className="text-sky-400 font-mono">{humidity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={humidity}
                      onChange={(e) => setHumidity(parseFloat(e.target.value))}
                      className="w-full accent-sky-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-300 font-semibold">Heterogeneous Soot / Fe₂O₃ Catalyst</span>
                    <button
                      onClick={() => { setSootCatalyst(!sootCatalyst); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        sootCatalyst ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sootCatalyst ? 'ACTIVE (Fast Oxidation)' : 'INACTIVE (Slow Oxidation)'}
                    </button>
                  </div>
                </div>
              )}

              {selectedLabIndex === 2 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Vehicle / Power Plant Vehicle Density:</span>
                      <span className="text-indigo-400 font-mono">{vehicleDensity} Index</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={vehicleDensity}
                      onChange={(e) => setVehicleDensity(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-300 font-semibold">High-Voltage Lightning Discharge</span>
                    <button
                      onClick={() => { setLightningActive(!lightningActive); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        lightningActive ? 'bg-yellow-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lightningActive ? '⚡ LIGHTNING ACTIVE' : 'NO LIGHTNING'}
                    </button>
                  </div>
                </div>
              )}

              {selectedLabIndex === 3 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Tropospheric Wind Speed:</span>
                      <span className="text-sky-400 font-mono">{windSpeed} km/h</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={windSpeed}
                      onChange={(e) => setWindSpeed(parseFloat(e.target.value))}
                      className="w-full accent-sky-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Downwind Dispersion Distance:</span>
                      <span className="text-purple-400 font-mono">{distanceDownwind} km</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={distanceDownwind}
                      onChange={(e) => setDistanceDownwind(parseFloat(e.target.value))}
                      className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {selectedLabIndex === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 mb-1 block">Target Substrate Exposed to Acid Rain:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['marble', 'lake', 'soil'] as const).map(sub => (
                        <button
                          key={sub}
                          onClick={() => { setSubstrateType(sub); audioManager.play('tap'); }}
                          className={`p-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                            substrateType === sub
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Slaked Lime / Limestone Remediation Addition:</span>
                      <span className="text-emerald-400 font-mono">{addedLime} kg/ha</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      step="5"
                      value={addedLime}
                      onChange={(e) => setAddedLime(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIMULATION VISUAL DISPLAY CANVAS & MOLECULAR DIAGRAM */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Live Cloud Droplet & Ecosystem Atmosphere Simulator
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md" style={{
                  backgroundColor: effectivePh < 5.6 ? '#ef444422' : '#22c55e22',
                  color: effectivePh < 5.6 ? '#ef4444' : '#22c55e'
                }}>
                  Precipitation pH: {effectivePh.toFixed(2)}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                width={550}
                height={260}
                className="w-full h-auto rounded-xl border border-slate-800 bg-slate-950"
              />
            </div>

            {/* DYNAMIC DIAGRAMS */}
            {selectedLabIndex === 1 && <ReactionMechanismDiagram activeTab="sulfur" />}
            {selectedLabIndex === 2 && <ReactionMechanismDiagram activeTab="nitrogen" />}
            {selectedLabIndex === 4 && <MarbleErosionDiagram ph={effectivePh} erosionRate={marbleErosionRate} />}

            {/* OBSERVATION QUESTIONS ARRAY (MANDATORY RENDER) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <h3 className="text-md font-bold text-slate-200 flex items-center gap-2">
                <span>👁️</span> Empirical Observation Analysis ({OBSERVATION_QUESTIONS.length})
              </h3>
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-sky-300">{oq.question}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        disabled={obsSubmitted[oIdx]}
                        onClick={() => {
                          const nextObs = [...obsAnswers];
                          nextObs[oIdx] = optIdx;
                          setObsAnswers(nextObs);
                          audioManager.play('tap');
                        }}
                        className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                          obsAnswers[oIdx] === optIdx
                            ? 'border-sky-500 bg-sky-500/10 text-white'
                            : 'border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {!obsSubmitted[oIdx] ? (
                    <button
                      disabled={obsAnswers[oIdx] === null}
                      onClick={() => handleObsSubmit(oIdx)}
                      className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-lg transition-all"
                    >
                      Log Observation #{oIdx + 1}
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 border border-sky-500/30 rounded-lg text-xs text-sky-200 font-medium">
                      ✓ Empirical observation recorded and validated against chemistry lab models.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MASTERY CHALLENGES ENGINE */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto w-full space-y-6">
          {/* Challenge Header Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {NODE_TITLES[currentCh.nodeId]}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border uppercase ${
                currentCh.difficulty === 'foundation' ? 'bg-sky-500/10 border-sky-500/30 text-sky-400' :
                currentCh.difficulty === 'standard' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                'bg-purple-500/10 border-purple-500/30 text-purple-400'
              }`}>
                {currentCh.difficulty} tier
              </span>
              <span className="text-xs font-mono bg-slate-950 px-3 py-1 rounded-md border border-slate-800 text-slate-300">
                Node Mastery: {currentMastery}
              </span>
            </div>
          </div>

          {/* Main Challenge Interaction Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">
              {currentCh.competencyLevel}
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
              {currentCh.question}
            </h2>

            {/* MCQ TYPE */}
            {currentCh.type === 'mcq' && currentCh.options && (
              <div className="space-y-3">
                {currentCh.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={challengeFeedback !== null}
                    onClick={() => { setUserMcqChoice(idx); audioManager.play('tap'); }}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      userMcqChoice === idx
                        ? 'border-emerald-400 bg-emerald-400/10 text-white'
                        : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* NUMERIC TYPE */}
            {currentCh.type === 'numeric' && (
              <div className="space-y-3 max-w-md">
                <label className="text-xs font-bold text-slate-400">Enter Numeric Answer:</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.01"
                    disabled={challengeFeedback !== null}
                    value={userNumericInput}
                    onChange={(e) => setUserNumericInput(e.target.value)}
                    placeholder="e.g. 4.0"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-emerald-500"
                  />
                  {currentCh.unit && (
                    <span className="flex items-center px-4 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-mono text-sm">
                      {currentCh.unit}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CLASSIFY TYPE */}
            {currentCh.type === 'classify' && currentCh.classifyItems && currentCh.categories && (
              <div className="space-y-4">
                {currentCh.classifyItems.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-200">{item.text}</span>
                    <div className="flex gap-2">
                      {currentCh.categories!.map((cat) => (
                        <button
                          key={cat}
                          disabled={challengeFeedback !== null}
                          onClick={() => {
                            setUserClassify(prev => ({ ...prev, [item.text]: cat }));
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            userClassify[item.text] === cat
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* DRAG SORT TYPE */}
            {currentCh.type === 'drag-sort' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Use arrow buttons to arrange items into correct sequence:</p>
                {userSortedItems.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                    <div className="flex gap-1">
                      <button
                        disabled={idx === 0 || challengeFeedback !== null}
                        onClick={() => moveSortItem(idx, 'up')}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        disabled={idx === userSortedItems.length - 1 || challengeFeedback !== null}
                        onClick={() => moveSortItem(idx, 'down')}
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg disabled:opacity-30"
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
              <div className={`p-4 rounded-xl border text-sm font-medium ${
                challengeFeedback.isCorrect
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/10 border-red-500/30 text-red-300'
              }`}>
                {challengeFeedback.text}
              </div>
            )}

            {/* BUTTON CONTROLS */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setCurrentHint(currentCh.hints[0]);
                  setShowHint(true);
                  audioManager.play('hint');
                }}
                className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>💡</span> Need Hint?
              </button>

              {!challengeFeedback ? (
                <button
                  onClick={handleChallengeSubmit}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg"
                >
                  Submit Challenge Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
                >
                  <span>Next Challenge</span> →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SUMMARY & REAL WORLD ACTIVITY */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            {/* REAL WORLD ACTIVITY (MANDATORY RENDER) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-sky-400">
                <span className="text-xl">🏭</span>
                <span className="text-xs font-bold uppercase tracking-wider">Real-World Engineering Application</span>
              </div>
              <h2 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-slate-200 flex items-center gap-2">
                <span>🧠</span> ICSE Chemistry Misconception Deconstruction ({MISCONCEPTIONS.length})
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Myth: {m.title}</h4>
                    <p className="text-xs text-slate-400">{m.description}</p>
                    <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-emerald-300 font-medium border border-emerald-500/20">
                      ✓ Correction: {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            {/* DIAGNOSTIC RECAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Diagnostic Mastery Items</h3>
              <div className="space-y-3">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="text-slate-200 font-bold">{dq.question}</div>
                    <div className="text-emerald-400 font-mono text-[11px]">Correct: {dq.options[dq.correctIndex]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Default export matching requirement
// [dup-export removed] // export default C9_ChemistryAcidraincompositionandcausesSim;