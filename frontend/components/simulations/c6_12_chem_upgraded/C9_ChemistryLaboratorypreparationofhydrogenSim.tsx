'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type MetalType = 'granulated_zinc' | 'pure_zinc' | 'magnesium' | 'iron' | 'copper';
export type AcidType = 'dilute_hcl' | 'dilute_h2so4' | 'conc_h2so4' | 'dilute_hno3' | 'conc_hno3';
export type CollectionMethod = 'downward_water' | 'downward_air' | 'upward_air';
export type ActiveTab = 'discovery' | 'lab' | 'challenges' | 'summary';

export interface MetalInfo {
  id: MetalType;
  name: string;
  formula: string;
  reactivity: string;
  purity: string;
  description: string;
  reactionRateMultiplier: number;
}

export interface AcidInfo {
  id: AcidType;
  name: string;
  formula: string;
  isOxidizing: boolean;
  yieldsHydrogen: boolean;
  description: string;
  gasProduced: string;
  sideProducts: string;
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple_choice' | 'drag_label' | 'reaction_balance' | 'sequence_order';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: string;
}

export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
  customTitle?: string;
}

// ==========================================
// CONSTANTS & NODE DATA
// ==========================================

export const ALL_NODE_IDS = [
  'c9_chem_041',
  'c9_chem_042',
  'c9_chem_043',
  'c9_chem_044',
  'c9_chem_045',
  'c9_chem_046',
  'c9_chem_047',
  'c9_chem_048',
  'c9_chem_049',
  'c9_chem_050',
] as const;

export const NODE_DESCRIPTIONS: Record<string, string> = {
  c9_chem_041: 'Reactants for Laboratory Preparation of Hydrogen Gas',
  c9_chem_042: 'Role of Impurities in Granulated Zinc vs Pure Zinc',
  c9_chem_043: 'Action of Dilute and Concentrated Nitric Acid on Metals',
  c9_chem_044: 'Action of Concentrated Sulfuric Acid on Metals',
  c9_chem_045: 'Apparatus Setup, Thistle Funnel Immersion & Safety Rules',
  c9_chem_046: 'Collection of Hydrogen Gas over Water (Downward Displacement of Water)',
  c9_chem_047: 'Hazards of Displacement of Air & Explosive Air-Hydrogen Mixtures',
  c9_chem_048: 'Purification Train & Removal of Impurities (H2S, AsH3, PH3, Acid Vapors, Water)',
  c9_chem_049: 'Physical Properties & Combustion Pop Test for Pure Hydrogen',
  c9_chem_050: 'Chemical Properties, Reduction Reactions & Industrial Methods (Bosch Process)',
};

export const SCENARIO = {
  title: 'ICSE Chemistry Lab: Laboratory Preparation of Hydrogen Gas',
  intro: 'Welcome to the Virtual ICSE Chemistry Laboratory! You are appointed as Lead Research Chemist to synthesize pure, dry hydrogen gas safely.',
  context: 'You will choose appropriate active metals and dilute acids, assemble the Woulfe bottle apparatus with correct safety immersions, collect hydrogen over water, purify gaseous byproducts, and test its flammability.',
};

export const DISCOVERY_QUESTION = {
  question: 'Why is granulated zinc preferred over 100% chemically pure zinc for laboratory hydrogen preparation?',
  options: [
    'Pure zinc reacts too violently, causing dangerous explosions inside the flask.',
    'Granulated zinc contains trace copper impurities that form local electrochemical micro-cells, accelerating the reaction rate.',
    'Pure zinc reacts with hydrogen to form zinc hydride, reducing gas yield.',
    'Granulated zinc is liquid at room temperature, making acid mixing faster.',
  ],
  correctIndex: 1,
  hintAfter: 'Chemically pure zinc forms a protective barrier of hydrogen gas bubbles that slows reaction to a crawl. Trace copper in granulated zinc creates thousands of galvanic micro-couples!',
};

export const DEFAULT_PROPS: SimProps = {
  onComplete: undefined,
  initialNodeId: 'c9_chem_041',
};

export const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Reactant Compatibility & Gas Kinetics',
    instruction: 'Select different metals (Granulated Zn, Pure Zn, Mg, Fe, Cu) and acids (Dil. HCl, Dil. H₂SO₄, Conc. H₂SO₄, Conc. HNO₃) to observe reaction rates and gas evolution.',
    interactionType: 'reactant_selector',
    nodeId: 'c9_chem_041',
  },
  {
    title: 'Lab 2: Acid Specificity & Redox Side Reactions',
    instruction: 'Investigate why Nitric Acid (HNO₃) and Concentrated Sulfuric Acid (Conc. H₂SO₄) fail to yield pure hydrogen gas due to strong oxidation.',
    interactionType: 'acid_investigator',
    nodeId: 'c9_chem_043',
  },
  {
    title: 'Lab 3: Apparatus Engineering & Hydrostatic Safety',
    instruction: 'Adjust the Thistle funnel immersion depth and monitor air purging before collecting hydrogen gas over water.',
    interactionType: 'apparatus_builder',
    nodeId: 'c9_chem_045',
  },
  {
    title: 'Lab 4: Impurity Scrubbing & Gas Purification Train',
    instruction: 'Pass raw hydrogen through washing bottles containing AgNO₃, Pb(NO₃)₂, KOH, and anhydrous CaCl₂ to eliminate toxic impurities.',
    interactionType: 'purification_train',
    nodeId: 'c9_chem_048',
  },
  {
    title: 'Lab 5: Physical Properties & Combustion Pop Test',
    instruction: 'Perform density testing, water displacement check, and bring a burning splinter near the gas jar mouth to test combustibility.',
    interactionType: 'combustion_tester',
    nodeId: 'c9_chem_049',
  },
];

export const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen if the bottom end of the Thistle funnel stem remains ABOVE the acid level inside the Woulfe bottle?',
    options: [
      'Hydrogen gas will collect twice as fast in the gas jar.',
      'Evolved hydrogen gas will escape out into the room through the Thistle funnel stem instead of traveling through the delivery tube.',
      'Acid will siphon out automatically into the water trough.',
      'The reaction will immediately cease due to high atmospheric pressure.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Thistle funnel position in Lab 3 to test your prediction!',
    nodeId: 'c9_chem_045',
  },
  {
    question: 'Predict: What occurs when concentrated Nitric Acid (Conc. HNO₃) is poured over granulated zinc metal?',
    options: [
      'Pure hydrogen gas evolves rapidly with high volume yield.',
      'No reaction occurs because zinc becomes completely passive.',
      'Brown nitrogen dioxide gas (NO₂) and water are produced instead of hydrogen, as HNO₃ oxidizes nascent hydrogen.',
      'Solid copper precipitates out while chlorine gas evolves.',
    ],
    correctIndex: 2,
    verifyInstruction: 'Select Concentrated Nitric Acid in Lab 2 to verify chemical oxidation behavior!',
    nodeId: 'c9_chem_043',
  },
];

export const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when a burning splinter is brought to the mouth of a gas jar filled with pure hydrogen gas?',
    observableOptions: [
      'The splinter burns with a blinding white light like magnesium wire.',
      'The hydrogen gas burns at the mouth with a pale blue flame and characteristic "POP" sound, while the splinter inside is extinguished.',
      'The entire jar violently explodes into sharp glass fragments regardless of air presence.',
      'The flame turns bright green and produces thick white phosphorus smoke.',
    ],
    correctIndex: 1,
    nodeId: 'c9_chem_049',
  },
  {
    question: 'Why are the first few bubbles escaping from the delivery tube during hydrogen preparation allowed to escape into air without collection?',
    observableOptions: [
      'They contain toxic sulfur dioxide gas from the water trough.',
      'They consist mainly of atmospheric air trapped inside the apparatus, which forms an explosive air-hydrogen mixture.',
      'They are pure oxygen bubbles produced by acid decomposition.',
      'They contain heavy zinc vapor that contaminates the collection vessel.',
    ],
    correctIndex: 1,
    nodeId: 'c9_chem_047',
  },
];

export const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Fuel Cell Grade Hydrogen Purification & Safety Analysis',
  description: 'In modern hydrogen fuel-cell production plants, hydrogen gas prepared from steam methane reforming or water electrolysis must achieve 99.999% purity. As Quality Control Lead, calculate yield efficiency, chemical scrubbing capacity, and explosion limit safety protocols.',
  steps: [
    'Step 1: Calculate theoretical hydrogen gas yield from 65.4 g of Granulated Zinc reacting with excess dilute Hydrochloric acid (Molar Volume = 22.4 L/mol at STP). Yield = 22.4 Liters H₂.',
    'Step 2: Account for 3% trace hydrogen sulfide (H₂S) and phosphine (PH₃) impurities in industrial zinc. Calculate required volume of 0.1 M Lead Nitrate [Pb(NO₃)₂] solution to absorb H₂S gas completely.',
    'Step 3: Determine explosive safety boundaries: Air-Hydrogen mixture is explosive between 4.0% and 75.0% H₂ concentration by volume in atmospheric air.',
    'Step 4: Quality Check Conclusion: Gas passed through Anhydrous Calcium Chloride (CaCl₂) drying tower shows dew point < -60°C, proving complete removal of moisture vapor.',
  ],
};

export const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Concentrated Nitric Acid Prepares Hydrogen',
    misconception: 'Concentrated Nitric Acid can prepare hydrogen gas when reacted with active metals like zinc.',
    correction: 'Concentrated Nitric Acid is a powerful oxidizing agent. It oxidizes newly formed nascent hydrogen into water instantly, yielding oxides of nitrogen (NO₂ / NO) rather than H₂ gas.',
    nodeId: 'c9_chem_043',
  },
  {
    id: 'misc_2',
    title: 'Hydrogen Collected by Downward Displacement of Air',
    misconception: 'Hydrogen gas is safely collected by downward displacement of air because hydrogen is lighter than air.',
    correction: 'Collecting hydrogen by displacement of air is extremely hazardous because hydrogen mixes rapidly with atmospheric oxygen to form a highly explosive air-hydrogen mixture. Downward displacement of water is preferred due to low water solubility.',
    nodeId: 'c9_chem_047',
  },
  {
    id: 'misc_3',
    title: 'Pure Zinc is Superior to Granulated Zinc',
    misconception: 'Chemically pure zinc metal is superior to granulated zinc for hydrogen gas preparation.',
    correction: 'Pure zinc reacts extremely slowly with dilute acids because a layer of hydrogen gas bubbles forms on its smooth surface (polarization). Granulated zinc contains copper impurities that form micro-galvanic cells, dramatically increasing reaction speed.',
    nodeId: 'c9_chem_042',
  },
  {
    id: 'misc_4',
    title: 'Hydrogen Supports Combustion',
    misconception: 'Hydrogen gas supports combustion and helps other substances burn.',
    correction: 'Hydrogen is combustible (it burns in air with a pale blue flame and pop sound), but it DOES NOT support combustion. A burning splinter inserted inside pure hydrogen is extinguished.',
    nodeId: 'c9_chem_049',
  },
  {
    id: 'misc_5',
    title: 'Initial Bubbles Are Pure Hydrogen',
    misconception: 'The first bubbles of gas coming out of the delivery tube are pure hydrogen ready for collection.',
    correction: 'Initial bubbles consist mainly of air initially present in the flask and delivery tube. Collecting these first bubbles creates a dangerous explosive air-hydrogen mixture.',
    nodeId: 'c9_chem_045',
  },
  {
    id: 'misc_6',
    title: 'Concentrated Sulfuric Acid Yields Pure H₂',
    misconception: 'Concentrated Sulfuric acid can be used instead of dilute sulfuric acid for hydrogen preparation.',
    correction: 'Concentrated Sulfuric Acid is a strong oxidizing agent when heated or concentrated. It oxidizes hydrogen to water and is reduced to sulfur dioxide (SO₂). Dilute H₂SO₄ must be used.',
    nodeId: 'c9_chem_044',
  },
];

export const METALS_DATA: Record<MetalType, MetalInfo> = {
  granulated_zinc: {
    id: 'granulated_zinc',
    name: 'Granulated Zinc (Zn)',
    formula: 'Zn',
    reactivity: 'Moderate & Steady',
    purity: 'Contains ~0.5% Cu impurities',
    description: 'Ideal for lab preparation! Trace copper forms local electrochemical cells, accelerating gas production safely.',
    reactionRateMultiplier: 1.0,
  },
  pure_zinc: {
    id: 'pure_zinc',
    name: 'Pure Zinc (100% Zn)',
    formula: 'Zn',
    reactivity: 'Extremely Slow',
    purity: '99.99% Chemically Pure',
    description: 'Reacts sluggishly because hydrogen gas bubbles coat the metal surface (polarization), stopping acid contact.',
    reactionRateMultiplier: 0.15,
  },
  magnesium: {
    id: 'magnesium',
    name: 'Magnesium Ribbon (Mg)',
    formula: 'Mg',
    reactivity: 'Very Violent',
    purity: 'Pure Mg',
    description: 'Reacts too fast and vigorously, making gas collection hazardous and expensive for basic lab prep.',
    reactionRateMultiplier: 2.8,
  },
  iron: {
    id: 'iron',
    name: 'Iron Fillings (Fe)',
    formula: 'Fe',
    reactivity: 'Slow & Requires Heat',
    purity: 'Lab Grade Fe',
    description: 'Reaction requires heating and yields gaseous hydrogen sulfide (H₂S) impurity from trace iron sulfide.',
    reactionRateMultiplier: 0.4,
  },
  copper: {
    id: 'copper',
    name: 'Copper Turnings (Cu)',
    formula: 'Cu',
    reactivity: 'No Reaction',
    purity: 'Pure Cu',
    description: 'Copper is below hydrogen in the metal reactivity series and cannot displace hydrogen from dilute acids.',
    reactionRateMultiplier: 0.0,
  },
};

export const ACIDS_DATA: Record<AcidType, AcidInfo> = {
  dilute_hcl: {
    id: 'dilute_hcl',
    name: 'Dilute Hydrochloric Acid',
    formula: 'HCl (aq)',
    isOxidizing: false,
    yieldsHydrogen: true,
    description: 'Excellent choice. Reacts smoothly with granulated zinc to yield zinc chloride and pure hydrogen gas.',
    gasProduced: 'Hydrogen (H₂)',
    sideProducts: 'ZnCl₂ in solution',
  },
  dilute_h2so4: {
    id: 'dilute_h2so4',
    name: 'Dilute Sulfuric Acid',
    formula: 'H₂SO₄ (aq)',
    isOxidizing: false,
    yieldsHydrogen: true,
    description: 'Ideal choice. Reacts steadily with zinc to form soluble zinc sulfate and hydrogen gas.',
    gasProduced: 'Hydrogen (H₂)',
    sideProducts: 'ZnSO₄ in solution',
  },
  conc_h2so4: {
    id: 'conc_h2so4',
    name: 'Concentrated Sulfuric Acid',
    formula: 'Conc. H₂SO₄',
    isOxidizing: true,
    yieldsHydrogen: false,
    description: 'Strong oxidizing agent! Oxidizes hydrogen to water (H₂O) and is reduced to sulfur dioxide gas (SO₂).',
    gasProduced: 'Sulfur Dioxide (SO₂)',
    sideProducts: 'ZnSO₄ + H₂O',
  },
  dilute_hno3: {
    id: 'dilute_hno3',
    name: 'Dilute Nitric Acid',
    formula: 'Dil. HNO₃',
    isOxidizing: true,
    yieldsHydrogen: false,
    description: 'Powerful oxidizer! Oxidizes nascent hydrogen to water as fast as it is generated, evolving Nitric Oxide (NO).',
    gasProduced: 'Nitric Oxide (NO)',
    sideProducts: 'Zn(NO₃)₂ + H₂O',
  },
  conc_hno3: {
    id: 'conc_hno3',
    name: 'Concentrated Nitric Acid',
    formula: 'Conc. HNO₃',
    isOxidizing: true,
    yieldsHydrogen: false,
    description: 'Furious oxidizing action! Yields dense brown fumes of Nitrogen Dioxide (NO₂) gas and water.',
    gasProduced: 'Nitrogen Dioxide (NO₂)',
    sideProducts: 'Zn(NO₃)₂ + H₂O',
  },
};

export const CHALLENGES: Challenge[] = [
  // Foundation Tier (8 challenges)
  {
    id: 'c_1',
    nodeId: 'c9_chem_041',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which set of reactants is standard for the laboratory preparation of hydrogen gas?',
    options: [
      'Granulated Zinc and dilute Hydrochloric acid',
      'Pure Copper turnings and dilute Sulfuric acid',
      'Granulated Zinc and concentrated Nitric acid',
      'Iron filings and concentrated Nitric acid',
    ],
    correctIndex: 0,
    explanation: 'Granulated zinc with dilute HCl or dilute H₂SO₄ provides a safe, steady stream of hydrogen gas in the laboratory.',
    hints: [
      'Recall which metal is active enough to displace hydrogen without reacting violently.',
      'Avoid strong oxidizing acids like nitric acid.',
      'Zinc is preferred over copper because copper is below hydrogen in the reactivity series.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c_2',
    nodeId: 'c9_chem_042',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is granulated zinc preferred over 100% chemically pure zinc?',
    options: [
      'Pure zinc is too expensive to manufacture.',
      'Granulated zinc contains trace copper impurities that form tiny electrochemical couples, accelerating the rate of reaction.',
      'Pure zinc dissolves completely without generating any gas.',
      'Granulated zinc reacts with air to produce oxygen gas instead.',
    ],
    correctIndex: 1,
    explanation: 'Trace copper impurities in granulated zinc act as local cathodic sites, facilitating faster electron transfer and bubble release.',
    hints: [
      'Think about local galvanic cells formed by impurities.',
      'Pure metals often suffer from polarization when bubbles coat the surface.',
      'Copper acts as a microscopic cathode in acid.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c_3',
    nodeId: 'c9_chem_043',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the main reason dilute Nitric Acid (HNO₃) CANNOT be used to prepare hydrogen gas?',
    options: [
      'Nitric acid does not react with zinc at room temperature.',
      'Nitric acid is a powerful oxidizing agent that oxidizes hydrogen to water instantly.',
      'Nitric acid explodes immediately upon touching any metal.',
      'Nitric acid turns into solid salt when poured into Woulfe bottle.',
    ],
    correctIndex: 1,
    explanation: 'HNO₃ is a strong oxidizing agent. Nascent hydrogen formed is oxidized to H₂O while nitric acid is reduced to oxides of nitrogen.',
    hints: [
      'Consider the oxidizing nature of nitric acid.',
      'What happens to nascent hydrogen in the presence of an oxidizing agent?',
      'Hydrogen is converted into water.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c_4',
    nodeId: 'c9_chem_044',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What gas is evolved when Concentrated Sulfuric Acid reacts with zinc metal?',
    options: [
      'Pure Hydrogen (H₂)',
      'Sulfur Dioxide (SO₂)',
      'Oxygen (O₂)',
      'Chlorine (Cl₂)',
    ],
    correctIndex: 1,
    explanation: 'Concentrated H₂SO₄ is an oxidizing agent. It oxidizes hydrogen to water and gets reduced to sulfur dioxide gas (SO₂).',
    hints: [
      'Concentrated acids act as oxidizing agents.',
      'Sulfur is reduced from +6 to +4 oxidation state.',
      'The gas produced has a suffocating burning sulfur odor.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c_5',
    nodeId: 'c9_chem_045',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why must the lower end of the Thistle funnel be dipped well below the level of acid inside the Woulfe bottle?',
    options: [
      'To prevent evolved hydrogen gas from escaping through the funnel.',
      'To keep the acid from freezing.',
      'To force the zinc granules to float.',
      'To filter out dust particles from the acid.',
    ],
    correctIndex: 0,
    explanation: 'Dipping the funnel stem below liquid level creates a liquid seal. Otherwise, hydrogen gas escapes into the room through the funnel stem.',
    hints: [
      'Gas follows the path of least resistance.',
      'If the tube is open to air above liquid, where will gas go?',
      'Liquid seal prevents gas escape.',
    ],
  },
  {
    id: 'c_6',
    nodeId: 'c9_chem_046',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is hydrogen gas collected in the laboratory setup?',
    options: [
      'By downward displacement of water',
      'By downward displacement of air',
      'By direct compression into high pressure cylinders',
      'By freezing it into a solid',
    ],
    correctIndex: 0,
    explanation: 'Hydrogen is collected by downward displacement of water because it is virtually insoluble in water.',
    hints: [
      'Consider solubility of hydrogen in water.',
      'Water displacement provides a safe visual collection method.',
      'Air displacement presents explosion hazards.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c_7',
    nodeId: 'c9_chem_047',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is hydrogen NOT collected by displacement of air in the laboratory?',
    options: [
      'Hydrogen is heavier than air and sinks.',
      'Hydrogen forms an explosive mixture with atmospheric oxygen.',
      'Hydrogen reacts with nitrogen in air to form toxic ammonia.',
      'Air dissolves in hydrogen to make liquid air.',
    ],
    correctIndex: 1,
    explanation: 'Hydrogen forms a explosive mixture with air across a wide concentration range (4% to 75% H₂). Displacement of air is dangerous.',
    hints: [
      'Hydrogen + Air + Flame = ?',
      'Air contains 21% oxygen.',
      'Rapid mixing creates explosive hazardous mixtures.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c_8',
    nodeId: 'c9_chem_048',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which chemical reagent is used in the purification train to absorb Hydrogen Sulfide (H₂S) gas impurity?',
    options: [
      'Lead Nitrate solution [Pb(NO₃)₂]',
      'Anhydrous Calcium Chloride [CaCl₂]',
      'Caustic Potash solution [KOH]',
      'Silver Nitrate solution [AgNO₃]',
    ],
    correctIndex: 0,
    explanation: 'Lead Nitrate solution reacts with H₂S to form a black precipitate of Lead Sulfide (PbS), trapping the impurity.',
    hints: [
      'Lead ions react with sulfide ions.',
      'Pb²⁺ + S²⁻ -> PbS (black precipitate).',
      'Lead nitrate is a specific reagent for sulfur removal.',
    ],
  },

  // Standard Tier (8 challenges)
  {
    id: 'c_9',
    nodeId: 'c9_chem_041',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Write the balanced chemical equation for the laboratory reaction between Granulated Zinc and dilute Hydrochloric Acid.',
    options: [
      'Zn + 2HCl → ZnCl₂ + H₂ ↑',
      'Zn + HCl → ZnCl + H ↑',
      'Zn + 2HCl → ZnCl₂ + H₂O',
      '2Zn + 2HCl → 2ZnCl + H₂ ↑',
    ],
    correctIndex: 0,
    explanation: 'Zinc (valency 2) reacts with Hydrochloric acid to form Zinc Chloride salt and liberate Hydrogen gas: Zn + 2HCl → ZnCl₂ + H₂.',
    hints: [
      'Check valency of Zinc (Zn²⁺).',
      'Diatomic hydrogen molecule is H₂.',
      'Count atoms on both reactant and product sides.',
    ],
  },
  {
    id: 'c_10',
    nodeId: 'c9_chem_042',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In granulated zinc, trace copper impurities act as local electrochemical micro-cells. What role does copper play in this micro-cell?',
    options: [
      'Copper acts as the anode where zinc dissolves.',
      'Copper acts as the cathode where H⁺ ions accept electrons to evolve H₂ gas.',
      'Copper oxidizes hydrogen gas to water vapor.',
      'Copper neutralizes the acid without producing hydrogen.',
    ],
    correctIndex: 1,
    explanation: 'In the local galvanic cell, Zinc (more active) acts as Anode (Zn → Zn²⁺ + 2e⁻) and Copper acts as Cathode where 2H⁺ + 2e⁻ → H₂.',
    hints: [
      'Zn is more electropositive than Cu.',
      'Electrons flow from Zn anode to Cu cathode.',
      'H⁺ ions receive electrons at the cathode surface.',
    ],
  },
  {
    id: 'c_11',
    nodeId: 'c9_chem_043',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which two metals are rare exceptions that CAN produce hydrogen gas with VERY DILUTE (1%) Nitric Acid at cold temperatures?',
    options: [
      'Magnesium (Mg) and Manganese (Mn)',
      'Copper (Cu) and Silver (Ag)',
      'Iron (Fe) and Zinc (Zn)',
      'Sodium (Na) and Potassium (K)',
    ],
    correctIndex: 0,
    explanation: 'Magnesium (Mg) and Manganese (Mn) are extremely electropositive metals that can displace H₂ gas from very dilute (1%) cold HNO₃.',
    hints: [
      'These two metals are situated near the very top of the reactivity series.',
      'They start with the letter M.',
      'Mg + 2HNO₃ (very dil.) → Mg(NO₃)₂ + H₂ ↑.',
    ],
  },
  {
    id: 'c_12',
    nodeId: 'c9_chem_044',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the volume of H₂ gas produced at STP when 13.08 grams of pure Granulated Zinc (Atomic Mass Zn = 65.4 g/mol) reacts completely with excess dilute H₂SO₄.',
    options: [
      '4.48 Liters',
      '2.24 Liters',
      '22.4 Liters',
      '11.2 Liters',
    ],
    correctIndex: 0,
    explanation: 'Moles of Zn = 13.08 / 65.4 = 0.2 mol. From stoichiometry (1:1 ratio), Moles of H₂ = 0.2 mol. Volume at STP = 0.2 × 22.4 L = 4.48 L.',
    hints: [
      'Number of moles = Mass / Molar mass.',
      'Zn + H₂SO₄ → ZnSO₄ + H₂.',
      '1 mole of any ideal gas occupies 22.4 Liters at STP.',
    ],
  },
  {
    id: 'c_13',
    nodeId: 'c9_chem_045',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why MUST the initial gas bubbles generated in the Woulfe bottle be allowed to escape and NOT collected in gas jars?',
    options: [
      'Initial bubbles contain poisonous acid vapor.',
      'Initial bubbles contain air present inside the apparatus; mixing H₂ with air forms an explosive mixture.',
      'Initial bubbles consist of pure nitrogen gas.',
      'Initial bubbles contain unreacted zinc metal dust.',
    ],
    correctIndex: 1,
    explanation: 'Before reaction starts, the Woulfe bottle and delivery tubes are full of atmospheric air. Discarding initial bubbles purges the system safely.',
    hints: [
      'What gas was inside the empty flask before adding acid?',
      'Air + Hydrogen + Flame = Risk of explosion!',
      'Purging purges air from the delivery system.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c_14',
    nodeId: 'c9_chem_046',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Hydrogen gas collected over water is usually "moist". Which property allows collection over water despite moisture absorption?',
    options: [
      'Hydrogen is extremely soluble in water.',
      'Hydrogen is nearly insoluble in water and does not react chemically with water at room temp.',
      'Hydrogen turns into heavy water (D₂O) when bubbling through water.',
      'Hydrogen is heavier than water and sinks to the bottom.',
    ],
    correctIndex: 1,
    explanation: 'Hydrogen gas has extremely low solubility in water (approx 0.0016 g/L), allowing efficient displacement of water without gas loss.',
    hints: [
      'Does hydrogen dissolve easily in water?',
      'Non-polar molecules (H₂) have low solubility in polar water.',
      'Water displacement yields high volume recovery.',
    ],
  },
  {
    id: 'c_15',
    nodeId: 'c9_chem_047',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the density of Hydrogen gas relative to atmospheric air at STP?',
    options: [
      'Hydrogen is about 14.4 times lighter than air (Density ≈ 0.09 g/L vs Air ≈ 1.29 g/L).',
      'Hydrogen is twice as dense as air.',
      'Hydrogen has the exact same density as air.',
      'Hydrogen is 100 times heavier than air.',
    ],
    correctIndex: 0,
    explanation: 'Molecular weight of H₂ is 2 g/mol, while average air molecular weight is 28.97 g/mol. Hydrogen is ~14.5 times lighter than air.',
    hints: [
      'Compare molar masses: H₂ = 2 g/mol, Air ≈ 29 g/mol.',
      'Ratio = 29 / 2 ≈ 14.5.',
      'Hydrogen is the lightest known gas.',
    ],
  },
  {
    id: 'c_16',
    nodeId: 'c9_chem_048',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the complete gas purification train, what is the specific role of the Anhydrous Calcium Chloride (CaCl₂) U-tube?',
    options: [
      'To absorb toxic Hydrogen Sulfide gas (H₂S).',
      'To remove trace moisture/water vapor and yield dry Hydrogen gas.',
      'To neutralize acid fumes.',
      'To oxidize hydrogen into liquid water.',
    ],
    correctIndex: 1,
    explanation: 'Anhydrous Calcium Chloride (CaCl₂) is a strong hygroscopic drying agent used as the final stage to remove water vapor.',
    hints: [
      'Anhydrous means free of water.',
      'Drying agents absorb moisture.',
      'CaCl₂ absorbs water vapor without reacting with H₂ gas.',
    ],
  },

  // Advanced Tier (8 challenges)
  {
    id: 'c_17',
    nodeId: 'c9_chem_049',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When a burning test tube of hydrogen gas is ignited, a characteristic "POP" sound is heard. What produces this acoustic pop?',
    options: [
      'The glass test tube cracking under sudden high temperature.',
      'Rapid explosion of a small mixture of hydrogen and air producing a sudden localized pressure wave.',
      'Hydrogen gas condensing instantaneously into liquid water droplets.',
      'Nitrogen gas in air splitting into atomic nitrogen.',
    ],
    correctIndex: 1,
    explanation: 'The "POP" sound is caused by micro-detonation of a small mixture of H₂ and air, forming H₂O with immediate rapid acoustic expansion.',
    hints: [
      'Think of rapid gas combustion producing a shockwave.',
      '2H₂ + O₂ → 2H₂O (exothermic reaction).',
      'Quiet pale blue flame indicates 100% pure H₂ without air.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c_18',
    nodeId: 'c9_chem_050',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the industrial Bosch Process, Water Gas (CO + H₂) is mixed with excess steam and passed over Fe₂O₃ catalyst at 450°C. What reaction takes place?',
    options: [
      'CO + H₂O (steam) → CO₂ + H₂ + Heat',
      'CO + H₂ → CH₄ + O₂',
      '2CO + O₂ → 2CO₂',
      'H₂ + Cl₂ → 2HCl',
    ],
    correctIndex: 0,
    explanation: 'The Water-Gas Shift Reaction: CO + H₂O (steam) --[Fe₂O₃ / Cr₂O₃, 450°C]--> CO₂ + H₂. CO₂ is then removed by dissolving in KOH or water under pressure.',
    hints: [
      'Water-Gas Shift reaction converts carbon monoxide and steam into carbon dioxide and extra hydrogen.',
      'Fe₂O₃ acts as catalyst and Cr₂O₃ as promoter.',
      'CO₂ is easily separated from H₂ by dissolution.',
    ],
  },
  {
    id: 'c_19',
    nodeId: 'c9_chem_045',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Suppose hydrogen gas collected over water at 25°C and 750 mmHg pressure occupies 250 mL. If water vapor pressure at 25°C is 23.8 mmHg, calculate the pressure of DRY Hydrogen gas.',
    options: [
      '726.2 mmHg',
      '773.8 mmHg',
      '750.0 mmHg',
      '700.0 mmHg',
    ],
    correctIndex: 0,
    explanation: 'According to Dalton’s Law of Partial Pressures: P_total = P_dry_H2 + P_water_vapor. P_dry_H2 = 750 - 23.8 = 726.2 mmHg.',
    hints: [
      'Dalton’s Law: Total Pressure = Gas Pressure + Aqueous Tension.',
      'P_dry = P_total - Aqueous Tension.',
      'Subtract 23.8 from 750.',
    ],
  },
  {
    id: 'c_20',
    nodeId: 'c9_chem_048',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Match the impurity in raw hydrogen gas to its correct chemical absorbent reagent during purification:',
    options: [
      'H₂S -> Pb(NO₃)₂ ; AsH₃/PH₃ -> AgNO₃ ; Acid Vapors -> KOH ; Water -> CaCl₂',
      'H₂S -> CaCl₂ ; AsH₃ -> KOH ; Water -> Pb(NO₃)₂ ; Acid Vapors -> AgNO₃',
      'H₂S -> AgNO₃ ; AsH₃ -> CaCl₂ ; Acid Vapors -> Pb(NO₃)₂ ; Water -> KOH',
      'All impurities are absorbed by simple distilled water wash.',
    ],
    correctIndex: 0,
    explanation: 'Lead nitrate absorbs H₂S (forms black PbS), Silver nitrate absorbs toxic AsH₃ & PH₃, Caustic Potash absorbs CO₂/SO₂/acid fumes, and CaCl₂ dries water vapor.',
    hints: [
      'Lead forms insoluble black sulfide with H₂S.',
      'Silver nitrate precipitates arsenides/phosphides.',
      'KOH is strong alkali neutralizing acidic gases.',
    ],
  },
  {
    id: 'c_21',
    nodeId: 'c9_chem_050',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'When dry Hydrogen gas is passed over heated Black Copper(II) Oxide (CuO) in a hard glass tube, what visual change and chemical reduction occur?',
    options: [
      'Black CuO turns reddish-brown Copper metal (Cu), and water droplets condense on cooler parts of tube.',
      'Black CuO turns bright blue Copper Sulfate solution.',
      'No reaction occurs; CuO remains black powder.',
      'CuO melts into liquid yellow sulfur.',
    ],
    correctIndex: 0,
    explanation: 'Hydrogen acts as a Reducing Agent: CuO (black) + H₂ → Cu (reddish-brown) + H₂O. Copper is reduced (+2 to 0) and Hydrogen is oxidized (0 to +1).',
    hints: [
      'Hydrogen removes oxygen from metallic oxides.',
      'Copper metal has a characteristic reddish-brown color.',
      'Water vapor condenses at the cool end of the glass tube.',
    ],
  },
  {
    id: 'c_22',
    nodeId: 'c9_chem_049',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An inverted gas jar filled with pure hydrogen gas is held over a candle flame. Why does the hydrogen gas burn ONLY at the open mouth of the jar, while the candle inside is extinguished?',
    options: [
      'Hydrogen needs atmospheric oxygen to burn (combustible), but inside the jar there is zero oxygen, so it cannot support the candle combustion.',
      'Hydrogen is heavier than candle wax vapor.',
      'The candle flame melts the hydrogen gas into liquid.',
      'The jar creates a magnetic field that puts out the flame.',
    ],
    correctIndex: 0,
    explanation: 'Hydrogen is COMBUSTIBLE (burns where oxygen is available at jar mouth), but DOES NOT SUPPORT combustion (candle dies inside pure H₂ environment).',
    hints: [
      'Distinguish between combustible substance vs supporter of combustion.',
      'Oxygen is required inside the jar for the candle to burn.',
      'Pure H₂ excludes oxygen inside the inverted jar.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'c_23',
    nodeId: 'c9_chem_043',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the balanced equation for the reaction of Granulated Zinc with Concentrated Nitric Acid (Conc. HNO₃)?',
    options: [
      'Zn + 4HNO₃ (conc.) → Zn(NO₃)₂ + 2NO₂ ↑ + 2H₂O',
      'Zn + 2HNO₃ → Zn(NO₃)₂ + H₂ ↑',
      '3Zn + 8HNO₃ → 3Zn(NO₃)₂ + 2NO ↑ + 4H₂O',
      'Zn + HNO₃ → ZnNO₃ + H ↑',
    ],
    correctIndex: 0,
    explanation: 'Conc. HNO₃ acts as a powerful oxidizer: Zn + 4HNO₃ → Zn(NO₃)₂ + 2NO₂ (reddish-brown gas) + 2H₂O. No hydrogen gas escapes.',
    hints: [
      'Concentrated nitric acid produces Nitrogen Dioxide (NO₂).',
      'Brown fumes are characteristic of NO₂ gas.',
      '4 moles of HNO₃ react with 1 mole of Zn.',
    ],
  },
  {
    id: 'c_24',
    nodeId: 'c9_chem_050',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How is Carbon Monoxide (CO) gas removed from hydrogen during the industrial synthesis of hydrogen from Water Gas?',
    options: [
      'By liquefaction of CO under pressure (-191°C) or by scrubbing through ammoniacal cuprous chloride solution [Cu₂Cl₂].',
      'By filtration through paper filter.',
      'By burning CO in pure hydrogen.',
      'By adding solid sodium chloride salt.',
    ],
    correctIndex: 0,
    explanation: 'In industry, residual CO is scrubbed out by passing through Ammoniacal Cuprous Chloride [Cu₂Cl₂·2H₂O] solution or by fractional liquefaction at low temperature.',
    hints: [
      'CO forms a soluble complex with copper(I) salts.',
      'Liquefaction takes advantage of boiling point differences (H₂ bp = -252.9°C, CO bp = -191.5°C).',
      'Ammoniacal cuprous chloride absorbs carbon monoxide.',
    ],
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

export const ApparatusSetupDiagram: React.FC<{
  metal: MetalType;
  acid: AcidType;
  funnelSubmerged: boolean;
  isPurged: boolean;
  isReacting: boolean;
  gasVolume: number;
  collectionMethod: CollectionMethod;
}> = ({ metal, acid, funnelSubmerged, isPurged, isReacting, gasVolume, collectionMethod }) => {
  const isCorrectAcid = acid === 'dilute_hcl' || acid === 'dilute_h2so4';
  const isCorrectMetal = metal === 'granulated_zinc';
  const acidData = ACIDS_DATA[acid];

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-2 px-2 border-b border-slate-800 pb-2">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          Woulfe Bottle Assembly Schematic
        </span>
        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700 font-mono">
          Gas Yield: {gasVolume.toFixed(1)} mL
        </span>
      </div>

      <svg viewBox="0 0 800 420" className="w-full h-auto max-h-[380px] select-none">
        <defs>
          <linearGradient id="flaskGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="acidLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={acidData.isOxidizing ? '#f59e0b' : '#38bdf8'} stopOpacity="0.6" />
            <stop offset="100%" stopColor={acidData.isOxidizing ? '#d97706' : '#0284c7'} stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="waterTroughGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
          </linearGradient>

          <radialGradient id="h2BubbleGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* LAB BENCH */}
        <rect x="20" y="370" width="760" height="15" rx="4" fill="#334155" />
        <rect x="20" y="385" width="760" height="4" fill="#1e293b" />

        {/* WOULFE BOTTLE MAIN BODY (Two Neck Flask) */}
        <g id="woulfe_bottle">
          {/* Main Container */}
          <path
            d="M 120,240 Q 110,340 130,350 L 270,350 Q 290,340 280,240 Q 280,210 250,200 L 250,150 L 220,150 L 220,190 L 180,190 L 180,150 L 150,150 L 150,200 Q 120,210 120,240 Z"
            fill="url(#flaskGlass)"
            stroke="#0284c7"
            strokeWidth="3"
          />

          {/* Acid Liquid Level */}
          <path
            d="M 124,260 Q 116,340 134,346 L 266,346 Q 284,340 276,260 Z"
            fill="url(#acidLiquid)"
          />

          {/* Zinc Granules at Bottom */}
          <g id="zinc_granules">
            {metal === 'granulated_zinc' && (
              <>
                <ellipse cx="160" cy="340" rx="14" ry="7" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                <ellipse cx="185" cy="342" rx="16" ry="6" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
                <ellipse cx="215" cy="339" rx="15" ry="8" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                <ellipse cx="240" cy="341" rx="12" ry="6" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
                {/* Micro copper dots for granulated zinc */}
                <circle cx="162" cy="339" r="2" fill="#b45309" />
                <circle cx="188" cy="343" r="1.5" fill="#b45309" />
                <circle cx="212" cy="338" r="2" fill="#b45309" />
              </>
            )}
            {metal === 'pure_zinc' && (
              <rect x="170" y="332" width="60" height="14" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
            )}
            {metal === 'copper' && (
              <rect x="170" y="332" width="60" height="14" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            )}
            {metal === 'magnesium' && (
              <rect x="160" y="332" width="80" height="12" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
            )}
            {metal === 'iron' && (
              <rect x="160" y="334" width="80" height="10" rx="2" fill="#475569" stroke="#0f172a" strokeWidth="2" />
            )}
          </g>

          {/* Reacting Bubbles inside Flask */}
          {isReacting && (
            <g id="flask_bubbles">
              <circle cx="165" cy="310" r="3" fill="url(#h2BubbleGrad)" className="animate-ping" />
              <circle cx="190" cy="290" r="4" fill="url(#h2BubbleGrad)" />
              <circle cx="215" cy="300" r="2.5" fill="url(#h2BubbleGrad)" />
              <circle cx="235" cy="285" r="3.5" fill="url(#h2BubbleGrad)" />
              <circle cx="175" cy="270" r="4.5" fill="url(#h2BubbleGrad)" />
              <circle cx="205" cy="250" r="5" fill="url(#h2BubbleGrad)" />
            </g>
          )}

          {/* Rubber Stoppers */}
          <rect x="148" y="145" width="34" height="15" fill="#1e293b" rx="2" />
          <rect x="218" y="145" width="34" height="15" fill="#1e293b" rx="2" />

          {/* Thistle Funnel Stem */}
          <path
            d="M 160,60 L 170,60 L 167,130 L 167,295 L 163,295 L 163,130 Z"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="1.5"
            transform={funnelSubmerged ? 'translate(0,0)' : 'translate(0,-50)'}
          />
          {/* Thistle Funnel Top Cup */}
          <path
            d="M 145,30 L 185,30 L 170,60 L 160,60 Z"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="1.5"
            transform={funnelSubmerged ? 'translate(0,0)' : 'translate(0,-50)'}
          />

          {/* Hydrostatic Seal Warning / Check Visual */}
          {!funnelSubmerged && isReacting && (
            <g id="gas_leak_warning">
              <path d="M 165,120 Q 155,90 145,80" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />
              <text x="80" y="85" fill="#ef4444" fontSize="11" fontWeight="bold">
                ⚠️ Gas Leaking Out!
              </text>
            </g>
          )}

          {/* Delivery Tube out of Flask */}
          <path
            d="M 235,150 L 235,110 Q 235,95 250,95 L 530,95 Q 545,95 545,110 L 545,320 L 560,320"
            fill="none"
            stroke="#0284c7"
            strokeWidth="4"
          />
          <path
            d="M 235,150 L 235,110 Q 235,95 250,95 L 530,95 Q 545,95 545,110 L 545,320 L 560,320"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="1.5"
          />
        </g>

        {/* WATER TROUGH & BEEHIVE SHELF */}
        <g id="water_trough_setup">
          {/* Glass Trough Container */}
          <rect x="500" y="270" width="250" height="100" rx="8" fill="url(#flaskGlass)" stroke="#0284c7" strokeWidth="3" />
          {/* Water level in trough */}
          <rect x="503" y="285" width="244" height="82" rx="4" fill="url(#waterTroughGrad)" />

          {/* Beehive Shelf */}
          <path d="M 580,370 L 580,330 Q 580,320 600,320 L 660,320 Q 680,320 680,330 L 680,370 Z" fill="#475569" stroke="#334155" strokeWidth="2" />
          {/* Beehive shelf hole */}
          <ellipse cx="630" cy="320" rx="15" ry="5" fill="#1e293b" />

          {/* INVERTED GAS JAR OVER BEEHIVE SHELF */}
          <g id="inverted_gas_jar">
            <rect x="600" y="140" width="60" height="180" rx="6" fill="url(#flaskGlass)" stroke="#38bdf8" strokeWidth="2.5" />
            
            {/* Water inside gas jar (Displaced downwards as gas fills) */}
            {collectionMethod === 'downward_water' && (
              <rect
                x="603"
                y={143 + Math.min(150, (gasVolume / 100) * 150)}
                width="54"
                height={Math.max(0, 150 - Math.min(150, (gasVolume / 100) * 150))}
                fill="url(#waterTroughGrad)"
                rx="2"
              />
            )}

            {/* Collected Hydrogen Gas Space */}
            <rect
              x="603"
              y="143"
              width="54"
              height={Math.min(150, (gasVolume / 100) * 150)}
              fill={isCorrectAcid && isCorrectMetal ? 'rgba(56, 189, 248, 0.25)' : 'rgba(239, 68, 68, 0.25)'}
            />

            {/* Bubbles rising in gas jar */}
            {isReacting && funnelSubmerged && (
              <g id="jar_bubbles">
                <circle cx="630" cy="300" r="4" fill="url(#h2BubbleGrad)" className="animate-bounce" />
                <circle cx="622" cy="270" r="3" fill="url(#h2BubbleGrad)" />
                <circle cx="638" cy="240" r="5" fill="url(#h2BubbleGrad)" />
                <circle cx="628" cy="200" r="4.5" fill="url(#h2BubbleGrad)" />
              </g>
            )}

            {/* Jar Volume Graduations */}
            <line x1="600" y1="170" x2="610" y2="170" stroke="#94a3b8" strokeWidth="1" />
            <text x="582" y="173" fill="#94a3b8" fontSize="9" fontFamily="monospace">80ml</text>

            <line x1="600" y1="200" x2="610" y2="200" stroke="#94a3b8" strokeWidth="1" />
            <text x="582" y="203" fill="#94a3b8" fontSize="9" fontFamily="monospace">60ml</text>

            <line x1="600" y1="230" x2="610" y2="230" stroke="#94a3b8" strokeWidth="1" />
            <text x="582" y="233" fill="#94a3b8" fontSize="9" fontFamily="monospace">40ml</text>

            <line x1="600" y1="260" x2="610" y2="260" stroke="#94a3b8" strokeWidth="1" />
            <text x="582" y="263" fill="#94a3b8" fontSize="9" fontFamily="monospace">20ml</text>
          </g>
        </g>

        {/* STATUS BADGES & LABELS */}
        <text x="160" y="25" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
          Thistle Funnel
        </text>
        <text x="200" y="130" fill="#94a3b8" fontSize="11" textAnchor="middle">
          Woulfe's Bottle
        </text>
        <text x="380" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
          Delivery Tube (H₂ Gas)
        </text>
        <text x="630" y="125" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
          Gas Jar (Inverted)
        </text>
        <text x="630" y="395" fill="#94a3b8" fontSize="11" textAnchor="middle">
          Beehive Shelf & Water Trough
        </text>

        {/* Purged Air vs Explosive Mixture Tag */}
        <g id="purged_indicator" transform="translate(330, 320)">
          <rect
            x="0"
            y="0"
            width="140"
            height="32"
            rx="6"
            fill={isPurged ? '#065f46' : '#991b1b'}
            stroke={isPurged ? '#10b981' : '#f87171'}
            strokeWidth="1.5"
          />
          <text x="70" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
            {isPurged ? '✓ Air Purged (Safe)' : '⚠️ Air Present (Hazard)'}
          </text>
        </g>
      </svg>
    </div>
  );
};

export const GalvanicCellDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        Microscopic View: Granulated Zinc Electrochemical Acceleration
      </div>
      <svg viewBox="0 0 600 220" className="w-full h-auto max-h-[200px]">
        {/* Acid Medium background */}
        <rect x="20" y="20" width="560" height="180" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />

        {/* Zinc Metal Matrix */}
        <rect x="60" y="110" width="480" height="70" fill="#475569" rx="4" stroke="#64748b" strokeWidth="2" />
        <text x="300" y="150" fill="#cbd5e1" fontSize="16" fontWeight="bold" textAnchor="middle">
          Zinc Metal Body (Anode Site: Zn → Zn²⁺ + 2e⁻)
        </text>

        {/* Trace Copper Impurity Site */}
        <circle cx="180" cy="110" r="22" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
        <text x="180" y="114" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          Cu Impurity
        </text>

        {/* Electron Flow Arrow from Zn to Cu */}
        <path d="M 120,110 Q 150,90 162,100" fill="none" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="135" y="85" fill="#38bdf8" fontSize="10" fontWeight="bold">
          2e⁻ flow
        </text>

        {/* H+ Ions converting to H2 gas at Copper Cathode */}
        <path d="M 170,50 L 176,80" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2,2" />
        <path d="M 190,50 L 184,80" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2,2" />
        <circle cx="170" cy="45" r="8" fill="#f43f5e" />
        <text x="170" y="48" fill="#fff" fontSize="9" textAnchor="middle">H⁺</text>
        <circle cx="190" cy="45" r="8" fill="#f43f5e" />
        <text x="190" y="48" fill="#fff" fontSize="9" textAnchor="middle">H⁺</text>

        {/* H2 Bubble forming at Cu Cathode */}
        <circle cx="180" cy="25" r="14" fill="#38bdf8" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="2" />
        <text x="180" y="29" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">H₂ ↑</text>

        {/* Comparison: Pure Zinc polarization */}
        <g transform="translate(380, 40)">
          <rect x="0" y="0" width="160" height="60" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <text x="80" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">Pure 100% Zinc</text>
          <text x="80" y="38" fill="#f87171" fontSize="9" textAnchor="middle">H₂ gas layer coats surface</text>
          <text x="80" y="50" fill="#f87171" fontSize="9" textAnchor="middle">(Polarization halts reaction)</text>
        </g>
      </svg>
    </div>
  );
};

export const PurificationTrainSVG: React.FC<{ activeStage: number }> = ({ activeStage }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Multi-Stage Chemical Gas Purification Train
      </div>
      <svg viewBox="0 0 750 200" className="w-full h-auto max-h-[190px]">
        {/* Stage 1: AgNO3 (AsH3/PH3) */}
        <g id="stage1" opacity={activeStage >= 1 ? 1 : 0.4}>
          <rect x="30" y="60" width="80" height="110" rx="6" fill="#1e293b" stroke={activeStage === 1 ? '#10b981' : '#475569'} strokeWidth="2" />
          <rect x="35" y="110" width="70" height="55" fill="#38bdf8" fillOpacity="0.3" rx="2" />
          <text x="70" y="80" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Bottle 1</text>
          <text x="70" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">AgNO₃ (aq)</text>
          <text x="70" y="140" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Removes</text>
          <text x="70" y="152" fill="#10b981" fontSize="9" textAnchor="middle">AsH₃, PH₃</text>
        </g>

        {/* Connecting Tube 1-2 */}
        <path d="M 110,90 L 170,90" stroke="#0284c7" strokeWidth="3" />

        {/* Stage 2: Pb(NO3)2 (H2S) */}
        <g id="stage2" opacity={activeStage >= 2 ? 1 : 0.4}>
          <rect x="170" y="60" width="80" height="110" rx="6" fill="#1e293b" stroke={activeStage === 2 ? '#10b981' : '#475569'} strokeWidth="2" />
          <rect x="175" y="110" width="70" height="55" fill="#f59e0b" fillOpacity="0.2" rx="2" />
          <text x="210" y="80" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Bottle 2</text>
          <text x="210" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Pb(NO₃)₂ (aq)</text>
          <text x="210" y="140" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Removes</text>
          <text x="210" y="152" fill="#10b981" fontSize="9" textAnchor="middle">H₂S (as PbS↓)</text>
        </g>

        {/* Connecting Tube 2-3 */}
        <path d="M 250,90 L 310,90" stroke="#0284c7" strokeWidth="3" />

        {/* Stage 3: KOH (CO2/SO2/Acid Vapors) */}
        <g id="stage3" opacity={activeStage >= 3 ? 1 : 0.4}>
          <rect x="310" y="60" width="80" height="110" rx="6" fill="#1e293b" stroke={activeStage === 3 ? '#10b981' : '#475569'} strokeWidth="2" />
          <rect x="315" y="110" width="70" height="55" fill="#a855f7" fillOpacity="0.2" rx="2" />
          <text x="350" y="80" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Bottle 3</text>
          <text x="350" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">KOH (aq)</text>
          <text x="350" y="140" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Removes</text>
          <text x="350" y="152" fill="#10b981" fontSize="9" textAnchor="middle">CO₂, SO₂, HCl</text>
        </g>

        {/* Connecting Tube 3-4 */}
        <path d="M 390,90 L 450,90" stroke="#0284c7" strokeWidth="3" />

        {/* Stage 4: CaCl2 U-Tube (Moisture) */}
        <g id="stage4" opacity={activeStage >= 4 ? 1 : 0.4}>
          <path d="M 460,60 L 480,60 L 480,140 Q 480,165 505,165 Q 530,165 530,140 L 530,60 L 550,60 L 550,140 Q 550,185 505,185 Q 460,185 460,140 Z" fill="#1e293b" stroke={activeStage === 4 ? '#10b981' : '#475569'} strokeWidth="2" />
          {/* CaCl2 Granules inside U tube */}
          <circle cx="490" cy="150" r="4" fill="#f8fafc" />
          <circle cx="505" cy="160" r="5" fill="#f8fafc" />
          <circle cx="520" cy="150" r="4" fill="#f8fafc" />
          <text x="505" y="80" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">U-Tube</text>
          <text x="505" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Anhyd. CaCl₂</text>
          <text x="505" y="115" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Dries H₂O</text>
        </g>

        {/* Pure Dry Hydrogen Gas Output */}
        <g id="pure_output" transform="translate(580, 70)">
          <rect x="0" y="0" width="140" height="70" rx="8" fill="#065f46" stroke="#10b981" strokeWidth="2" />
          <text x="70" y="25" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">PURE DRY H₂</text>
          <text x="70" y="45" fill="#a7f3d0" fontSize="10" textAnchor="middle">99.999% Pure Gas</text>
        </g>
      </svg>
    </div>
  );
};

export const PopTestDiagramSVG: React.FC<{ gasPure: boolean; testTriggered: boolean }> = ({ gasPure, testTriggered }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-sky-400" />
        Combustion Pop Test & Supporter of Combustion Proof
      </div>
      <svg viewBox="0 0 600 220" className="w-full h-auto max-h-[200px]">
        {/* Test Tube Inverted */}
        <g transform="translate(180, 20)">
          <rect x="60" y="30" width="50" height="130" rx="6" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="85" y="80" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">H₂ Gas</text>

          {/* Splinter inserted inside test tube */}
          <line x1="85" y1="180" x2="85" y2="60" stroke="#b45309" strokeWidth="4" />
          {/* Flame extinguished inside */}
          {testTriggered && (
            <g id="extinguished_inside">
              <circle cx="85" cy="60" r="3" fill="#64748b" />
              <path d="M 85,57 Q 82,45 80,40" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
              <text x="140" y="65" fill="#f87171" fontSize="10" fontWeight="bold">
                ❌ Flame Extinguished Inside! (H₂ does NOT support burning)
              </text>
            </g>
          )}

          {/* Pale Blue Flame burning at mouth of tube */}
          {testTriggered && (
            <g id="pale_blue_flame">
              <path d="M 75,160 Q 85,130 95,160 Z" fill="#38bdf8" fillOpacity="0.8" stroke="#60a5fa" strokeWidth="1" />
              <text x="140" y="150" fill="#38bdf8" fontSize="10" fontWeight="bold">
                {gasPure ? '✓ Pale Blue Flame at Mouth (Combustible!)' : '💥 Loud POP Sound! (Air-H₂ Mixture)'}
              </text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export const C9_ChemistryLaboratorypreparationofhydrogenSim: React.FC<SimProps> = ({
  onComplete,
  initialNodeId = 'c9_chem_041',
  customTitle,
}) => {
  // Tab State
  const [activeTab, setActiveTab] = useState<ActiveTab>('discovery');

  // Simulation Controls State
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('granulated_zinc');
  const [selectedAcid, setSelectedAcid] = useState<AcidType>('dilute_hcl');
  const [funnelSubmerged, setFunnelSubmerged] = useState<boolean>(true);
  const [isPurged, setIsPurged] = useState<boolean>(false);
  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [gasVolume, setGasVolume] = useState<number>(0);
  const [collectionMethod, setCollectionMethod] = useState<CollectionMethod>('downward_water');
  const [purificationStage, setPurificationStage] = useState<number>(0);
  const [popTestDone, setPopTestDone] = useState<boolean>(false);

  // Discovery State
  const [discoverySelectedOption, setDiscoverySelectedOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Hint Ref Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
      speechManager.speak('Need a hint? Check the underlying chemical properties!');
    }, 10000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Gas Generation Simulation Interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isReacting) {
      interval = setInterval(() => {
        const metalData = METALS_DATA[selectedMetal];
        const acidData = ACIDS_DATA[selectedAcid];

        if (acidData.yieldsHydrogen && funnelSubmerged) {
          setGasVolume((prev) => {
            const next = prev + 1.8 * metalData.reactionRateMultiplier;
            return next > 100 ? 100 : next;
          });
        }
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isReacting, selectedMetal, selectedAcid, funnelSubmerged]);

  // Handle Discovery Submission
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelectedOption(index);
    setDiscoverySubmitted(true);

    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent discovery! Trace copper in granulated zinc forms micro-galvanic cells that accelerate hydrogen production.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the role of impurities in electrochemistry!');
    }
  };

  // Start Lab Reaction
  const handleStartReaction = () => {
    audioManager.play('pickup');
    setIsReacting(true);
    speechManager.speak('Acid reaction initiated inside the Woulfe bottle. Observe the bubble formation!');
  };

  // Reset Lab Reaction
  const handleResetLab = () => {
    audioManager.play('tap');
    setIsReacting(false);
    setGasVolume(0);
    setIsPurged(false);
    setPopTestDone(false);
    setPurificationStage(0);
  };

  // Purge Air
  const handlePurgeAir = () => {
    audioManager.play('whoosh');
    setIsPurged(true);
    speechManager.speak('Initial gas bubbles containing air have been purged safely. Pure hydrogen can now be collected over water!');
  };

  // Trigger Pop Test
  const handlePopTest = () => {
    setPopTestDone(true);
    if (isPurged && gasVolume > 20 && selectedAcid !== 'conc_hno3' && selectedAcid !== 'conc_h2so4') {
      audioManager.play('pop');
      audioManager.play('sparkle');
      speechManager.speak('Pop test successful! Pure hydrogen gas burns with a characteristic pale blue flame at the jar mouth.');
    } else {
      audioManager.play('error');
      speechManager.speak('Warning! Unpurged gas contains air, creating an explosive pop hazard.');
    }
  };

  // Handle Challenge Option Click
  const handleOptionSelect = (index: number) => {
    if (challengeSubmitted) return;
    setSelectedOption(index);
    audioManager.play('tap');
    resetInactivityTimer();
  };

  // Submit Challenge Answer
  const handleChallengeSubmit = () => {
    if (selectedOption === null || challengeSubmitted) return;

    const challenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedOption === challenge.correctIndex;

    setChallengeSubmitted(true);

    // BKT Update
    const currentBKT = bktStates[challenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [challenge.nodeId]: updatedBKT }));

    // SRS Update
    const currentSRS = srsItems[challenge.id] || createReviewItem(challenge.id);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [challenge.id]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('correct-drop');
      audioManager.play('chime');
      speechManager.speak('Correct answer! Fantastic understanding of hydrogen laboratory chemistry.');
      setChallengeScore((prev) => prev + 1);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2500);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the detailed reaction mechanism explanation.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
      setHintIndex(0);
      audioManager.play('swoop');
    } else {
      setChallengeCompleted(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      audioManager.play('sparkle');
      speechManager.speak('Congratulations! You have completed all ICSE Class 9 Hydrogen Preparation Challenges!');
      
      const totalScorePercent = Math.round((challengeScore / CHALLENGES.length) * 100);
      recordGameScore('c9_chem_ hydrogen_prep', totalScorePercent);

      if (onComplete) {
        onComplete(totalScorePercent);
      }
    }
  };

  // Current Challenge Object
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Global Mastery Level Calculation
  const globalMasteryPercent = useMemo(() => {
    let totalMastery = 0;
    ALL_NODE_IDS.forEach((id) => {
      const bkt = bktStates[id];
      totalMastery += bkt ? getMasteryLevel(bkt) : 0;
    });
    return Math.round((totalMastery / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
      {/* Top Header / Navigation Bar */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold text-xl">
            🧪
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">
              {customTitle || SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">Class 9 ICSE Chemistry • Chapter: Study of First Element (Hydrogen)</p>
          </div>
        </div>

        {/* Global Mastery & Progress Meter */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 uppercase font-mono tracking-wider">Mastery Level</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${globalMasteryPercent}%` }}
                />
              </div>
              <span className="text-sm font-bold text-emerald-400 font-mono">{globalMasteryPercent}%</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex bg-slate-800/80 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => {
                setActiveTab('discovery');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rx-md transition-all ${
                activeTab === 'discovery'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Discovery
            </button>
            <button
              onClick={() => {
                setActiveTab('lab');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rx-md transition-all ${
                activeTab === 'lab'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Interactive Lab
            </button>
            <button
              onClick={() => {
                setActiveTab('challenges');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rx-md transition-all ${
                activeTab === 'challenges'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('summary');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rx-md transition-all ${
                activeTab === 'summary'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4. Summary & Misconceptions
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN TAB CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {/* ================= TAB 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Context & Scenario Intro */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest px-3 py-1 bg-sky-950/60 rounded-full border border-sky-800/50">
                Interactive Scenario
              </span>
              <h2 className="text-2xl font-bold text-white mt-3 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
              <p className="text-slate-400 leading-relaxed text-sm mt-2">{SCENARIO.context}</p>
            </div>

            {/* Discovery Counterintuitive Question */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-sky-500/30 rounded-2xl p-6 shadow-2xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/50">
                Discovery Challenge
              </span>
              <h3 className="text-lg md:text-xl font-bold text-white mt-4 mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = discoverySelectedOption === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let btnStyle = 'bg-slate-800/90 border-slate-700 hover:border-sky-500 text-slate-200';

                  if (discoverySubmitted) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !discoverySubmitted && handleDiscoverySubmit(idx)}
                      disabled={discoverySubmitted}
                      className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 ${btnStyle} flex items-start gap-3`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center font-bold text-xs text-sky-400 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="bg-sky-950/60 border border-sky-500/40 rounded-xl p-4 text-sky-200 text-sm animate-fade-in">
                  <h4 className="font-bold mb-1 flex items-center gap-2">
                    💡 Scientific Discovery Insight
                  </h4>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Mandatory PREDICTION QUESTIONS Rendering */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-sky-400">🔮</span> Lab Predictions & Hypothesis Testing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <span className="text-xs font-mono text-sky-400 font-bold uppercase">Prediction #{idx + 1}</span>
                    <h4 className="text-sm font-semibold text-slate-100">{pq.question}</h4>
                    <ul className="space-y-1.5">
                      {pq.options.map((opt, oIdx) => (
                        <li key={oIdx} className="text-xs text-slate-300 bg-slate-800/60 p-2 rounded border border-slate-700/50">
                          <strong className="text-sky-400 mr-2">{String.fromCharCode(65 + oIdx)}.</strong>
                          {opt}
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-amber-400 bg-amber-950/40 p-2 rounded border border-amber-800/40 font-mono">
                      🔍 Verification: {pq.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* EXPLORATION STEPS RENDERER */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-xs font-mono uppercase text-sky-400 font-bold tracking-wider mb-3">
                Guided Interactive Modules (5 Exploration Labs)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-left hover:border-sky-500 transition-all cursor-pointer"
                    onClick={() => {
                      audioManager.play('tap');
                      speechManager.speak(`Exploring ${step.title}`);
                    }}
                  >
                    <span className="text-[10px] font-mono text-sky-400 font-bold block mb-1">MODULE 0{idx + 1}</span>
                    <h4 className="text-xs font-bold text-slate-100 mb-1 leading-snug">{step.title}</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{step.instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Workbench Controls & Live Diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Chemical Reactants Selector Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
                <h3 className="text-sm font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🎛️</span> Chemical Controls
                </h3>

                {/* Metal Selection */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">1. Select Metal Specimen:</label>
                  <select
                    value={selectedMetal}
                    onChange={(e) => {
                      setSelectedMetal(e.target.value as MetalType);
                      audioManager.play('tap');
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-sky-500 outline-none"
                  >
                    {Object.values(METALS_DATA).map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.purity})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1.5 italic">{METALS_DATA[selectedMetal].description}</p>
                </div>

                {/* Acid Selection */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-2">2. Select Acid Reagent:</label>
                  <select
                    value={selectedAcid}
                    onChange={(e) => {
                      setSelectedAcid(e.target.value as AcidType);
                      audioManager.play('tap');
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:border-sky-500 outline-none"
                  >
                    {Object.values(ACIDS_DATA).map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} [{a.formula}]
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400 mt-1.5 italic">{ACIDS_DATA[selectedAcid].description}</p>
                </div>

                {/* Thistle Funnel Stem Depth Toggle */}
                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300">Thistle Funnel Submerged:</span>
                    <button
                      onClick={() => {
                        setFunnelSubmerged(!funnelSubmerged);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        funnelSubmerged ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}
                    >
                      {funnelSubmerged ? 'Submerged (Safe)' : 'Above Acid (Leak)'}
                    </button>
                  </div>
                </div>

                {/* Action Controls */}
                <div className="pt-2 space-y-2">
                  {!isReacting ? (
                    <button
                      onClick={handleStartReaction}
                      className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold py-2.5 rounded-lg text-xs tracking-wider uppercase shadow-lg transition-all"
                    >
                      ▶ Start Reaction
                    </button>
                  ) : (
                    <button
                      onClick={handleResetLab}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2.5 rounded-lg text-xs tracking-wider uppercase border border-slate-700 transition-all"
                    >
                      🔄 Reset Experiment
                    </button>
                  )}

                  <button
                    onClick={handlePurgeAir}
                    disabled={!isReacting || isPurged}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold py-2 rounded-lg text-xs transition-all"
                  >
                    💨 Discard Air & Purge Apparatus
                  </button>

                  <button
                    onClick={handlePopTest}
                    disabled={!isReacting || gasVolume < 10}
                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-extrabold py-2 rounded-lg text-xs transition-all"
                  >
                    🔥 Perform Combustion Pop Test
                  </button>
                </div>
              </div>

              {/* Middle/Right Column: Live SVG Interactive Apparatus & Diagrams */}
              <div className="lg:col-span-2 space-y-4">
                <ApparatusSetupDiagram
                  metal={selectedMetal}
                  acid={selectedAcid}
                  funnelSubmerged={funnelSubmerged}
                  isPurged={isPurged}
                  isReacting={isReacting}
                  gasVolume={gasVolume}
                  collectionMethod={collectionMethod}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <GalvanicCellDiagram />
                  <PopTestDiagramSVG gasPure={isPurged} testTriggered={popTestDone} />
                </div>
              </div>
            </div>

            {/* Purification Train Interactive View */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  Chemical Gas Purification Sequence
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setPurificationStage((prev) => (prev < 4 ? prev + 1 : 0));
                      audioManager.play('tap');
                    }}
                    className="text-xs bg-emerald-950 border border-emerald-700 text-emerald-300 px-3 py-1 rounded font-bold hover:bg-emerald-900 transition-all"
                  >
                    Advance Scrubber Stage ({purificationStage}/4)
                  </button>
                </div>
              </div>
              <PurificationTrainSVG activeStage={purificationStage} />
            </div>

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">👁️</span> Laboratory Observations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Observation #{idx + 1}</span>
                    <h4 className="text-sm font-semibold text-slate-100">{oq.question}</h4>
                    <div className="space-y-1.5">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`text-xs p-2 rounded border ${
                            oIdx === oq.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 font-medium'
                              : 'bg-slate-800/40 border-slate-700/50 text-slate-300'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {!challengeCompleted ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
                {/* Challenge Header & Difficulty Badge */}
                <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 px-2.5 py-1 rounded border border-sky-800">
                      Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                    </span>
                    <span
                      className={`text-xs font-bold uppercase px-2.5 py-1 rounded border ${
                        currentChallenge.difficulty === 'foundation'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : currentChallenge.difficulty === 'standard'
                          ? 'bg-amber-950 text-amber-400 border-amber-800'
                          : 'bg-rose-950 text-rose-400 border-rose-800'
                      }`}
                    >
                      {currentChallenge.difficulty}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono">
                    Score: {challengeScore} / {CHALLENGES.length}
                  </span>
                </div>

                {/* Question Text */}
                <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
                  {currentChallenge.question}
                </h3>

                {/* Multiple Choice Options */}
                <div className="space-y-3 mb-6">
                  {currentChallenge.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentChallenge.correctIndex;
                    let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-sky-500';

                    if (challengeSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-sky-950 border-sky-400 text-sky-100 font-semibold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        disabled={challengeSubmitted}
                        className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center font-bold text-xs text-sky-400 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Explanation Box */}
                {challengeSubmitted && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm space-y-2 mb-6 animate-fade-in">
                    <h4 className="font-bold text-sky-400 flex items-center gap-2">
                      <span>📖</span> Explanation & Reaction Dynamics:
                    </h4>
                    <p className="text-slate-300 leading-relaxed">{currentChallenge.explanation}</p>
                  </div>
                )}

                {/* Footer Controls: Submit & Next */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowHint(!showHint);
                      if (!showHint) {
                        audioManager.play('hint');
                        setHintIndex((prev) => (prev + 1) % currentChallenge.hints.length);
                      }
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
                  >
                    <span>💡</span> {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>

                  {!challengeSubmitted ? (
                    <button
                      onClick={handleChallengeSubmit}
                      disabled={selectedOption === null}
                      className="bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-extrabold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider shadow-lg transition-all"
                    >
                      {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Quiz 🎉'}
                    </button>
                  )}
                </div>

                {/* Interactive Hint Bubble */}
                <HintBubble show={showHint} text={currentChallenge.hints[hintIndex]} />
              </div>
            ) : (
              /* Completion Certificate View */
              <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-4xl mx-auto border border-emerald-500/50">
                  🏆
                </div>
                <h2 className="text-3xl font-extrabold text-white">Challenge Complete!</h2>
                <p className="text-slate-300">
                  You scored <span className="text-emerald-400 font-bold">{challengeScore}</span> out of{' '}
                  <span className="font-bold">{CHALLENGES.length}</span> ({Math.round((challengeScore / CHALLENGES.length) * 100)}%)
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-2xl mx-auto">
                  {ALL_NODE_IDS.map((nodeId) => (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 block">{nodeId}</span>
                      <span className="text-xs font-bold text-emerald-400">
                        {Math.round(masteryProb(bktStates[nodeId]) * 100)}% Mastery
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setCurrentChallengeIndex(0);
                    setSelectedOption(null);
                    setChallengeSubmitted(false);
                    setChallengeCompleted(false);
                    setChallengeScore(0);
                    audioManager.play('tap');
                  }}
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-8 py-3 rounded-xl text-sm uppercase tracking-wider shadow-xl transition-all"
                >
                  🔄 Retake Lab Assessment
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: SUMMARY & MISCONCEPTIONS ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY SECTION */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 border border-sky-500/40 rounded-2xl p-6 shadow-2xl">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950 px-3 py-1 rounded-full border border-sky-800">
                Industrial Real-World Extension
              </span>
              <h3 className="text-xl font-bold text-white mt-3 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 space-y-1">
                    <span className="font-mono text-sky-400 font-bold block">STEP {idx + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS MATRIX */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">⚡</span> Misconceptions vs Scientific Corrections
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-bold text-amber-400">{m.title}</h4>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {m.nodeId}
                      </span>
                    </div>

                    <div className="bg-rose-950/40 border border-rose-900/40 p-3 rounded-lg text-xs text-rose-300">
                      <strong>❌ Common Misconception:</strong> {m.misconception}
                    </div>

                    <div className="bg-emerald-950/40 border border-emerald-900/40 p-3 rounded-lg text-xs text-emerald-300">
                      <strong>✓ Scientific Fact:</strong> {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Lab Preparation Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
};

export default C9_ChemistryLaboratorypreparationofhydrogenSim;