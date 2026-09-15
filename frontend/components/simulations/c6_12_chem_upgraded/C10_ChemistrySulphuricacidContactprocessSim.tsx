'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c10_chem_061',
  'c10_chem_062',
  'c10_chem_063',
  'c10_chem_064',
  'c10_chem_065',
  'c10_chem_066',
  'c10_chem_067',
  'c10_chem_068',
  'c10_chem_069',
  'c10_chem_070'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Contact Process & Sulphuric Acid Virtual Plant Lab',
  intro: 'Welcome to the ICSE Industrial Chemistry Operations Unit! You have been appointed Lead Chemical Engineer for the Contact Process Plant manufacturing Sulphuric Acid (H₂SO₄) — the "King of Chemicals".',
  context: 'In this simulation, you will control raw gas purification, optimize the exothermic equilibrium reaction converting SO₂ to SO₃, produce Oleum, manage safe hydration, and investigate H₂SO₄ as a dibasic acid, dehydrating agent, oxidising agent, and non-volatile acid supplier.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why is Sulphur Trioxide (SO₃) gas NOT directly dissolved in water to produce Sulphuric Acid in the Contact Process?',
  options: [
    'SO₃ does not react with water at room temperature',
    'The direct reaction with water is so violently exothermic that it vaporises water into a dense, uncondensable acid fog',
    'SO₃ forms toxic hydrogen sulfide gas (H₂S) upon contact with water',
    'Water decomposes SO₃ back into SO₂ and Oxygen'
  ],
  correctIndex: 1,
  hintAfter: 'Direct reaction releases immense heat, turning water into steam and dispersing a fine mist of droplets that bypass condensation traps!',
};

// ==========================================
// INTERFACES & TYPES
// ==========================================
interface ComponentProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'ordering' | 'fill-blank';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex: number;
}

interface Misconception {
  id: string;
  title: string;
  myth: string;
  fact: string;
  nodeId: NodeId;
}

// ==========================================
// DEFAULT PROPS / METADATA
// ==========================================
const DEFAULT_PROPS: ComponentProps = {
  onComplete: undefined,
  initialNodeId: 'c10_chem_061'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Contact Process Purification Train',
    instruction: 'Pass raw SO₂ gas through the 5 purification towers (Dust Tower, Washing Tower, Drying Tower, Arsenic Purifier, Testing Box) to eliminate catalyst poisons before reaching the catalytic converter.',
    interactionType: 'gas-purification-chain',
    nodeId: 'c10_chem_062' as NodeId,
  },
  {
    title: 'Lab 2: Catalytic Oxidation Equilibrium (SO₂ → SO₃)',
    instruction: 'Adjust Temperature (300°C–650°C), Pressure (0.5–10 atm), and Catalyst selection (V₂O₅ vs Pt) to find optimum conditions according to Le Chatelier’s Principle.',
    interactionType: 'equilibrium-reactor',
    nodeId: 'c10_chem_063' as NodeId,
  },
  {
    title: 'Lab 3: SO₃ Absorption Tower & Oleum Dilution',
    instruction: 'Absorb SO₃ in concentrated 98% H₂SO₄ to form Oleum (H₂S₂O₇), then calculate and mix stoichiometric water to obtain 98% H₂SO₄ safely.',
    interactionType: 'oleum-dilution',
    nodeId: 'c10_chem_064' as NodeId,
  },
  {
    title: 'Lab 4: Dehydrating vs Drying Action Lab',
    instruction: 'Test concentrated H₂SO₄ against Sugar, CuSO₄·5H₂O crystals, Oxalic Acid, and Ethanol. Observe water extraction vs surface moisture drying.',
    interactionType: 'dehydration-testing',
    nodeId: 'c10_chem_068' as NodeId,
  },
  {
    title: 'Lab 5: Hot Conc. H₂SO₄ as Oxidising & Non-Volatile Acid',
    instruction: 'React hot conc. H₂SO₄ with Copper, Carbon, Sulphur, and NaCl/KNO₃. Observe products, oxidation states, and acid displacement mechanisms below 200°C.',
    interactionType: 'acid-reactivity-lab',
    nodeId: 'c10_chem_069' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen if raw SO₂ gas containing Arsenic Oxide (As₂O₃) dust enters the Catalytic Chamber filled with V₂O₅?',
    options: [
      'The oxidation rate will increase dramatically due to arsenic catalysis',
      'Arsenic will react with oxygen to form flammable arsine gas',
      'Arsenic will poison the catalyst surface, deactivating V₂O₅ and stopping SO₃ production',
      'The temperature will drop below 100°C instantly'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 1, test raw gas bypass without passing through the Arsenic Purifier tower.',
    nodeId: 'c10_chem_062' as NodeId,
  },
  {
    question: 'Predict: When concentrated H₂SO₄ is added to cane sugar (C₁₂H₂₂O₁₁), what visual reaction occurs?',
    options: [
      'The sugar dissolves into a clear syrup with gas bubbles',
      'A dense, black, spongy column of pure carbon rises with steam release',
      'The mixture turns bright green and produces oxygen gas',
      'A white precipitate forms and falls to the bottom of the beaker'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, select "Cane Sugar" and pour concentrated H₂SO₄ onto it.',
    nodeId: 'c10_chem_068' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the optimum operating temperature for the catalytic oxidation 2SO₂ + O₂ ⇌ 2SO₃ + Heat?',
    observableOptions: [
      'Yield is highest at 1000°C because high temperature accelerates exothermic forward reaction',
      '450°C provides optimal balance between high equilibrium yield and viable reaction speed',
      'At 100°C, the conversion rate is maximum because lower temp favours exothermic yield instantly',
      'Temperature does not affect equilibrium yield of SO₃ at all'
    ],
    correctIndex: 1,
    nodeId: 'c10_chem_063' as NodeId,
  },
  {
    question: 'What happens when conc. H₂SO₄ is heated with NaCl salt below 200°C in a retort?',
    observableOptions: [
      'Chlorine gas (Cl₂) is evolved directly with red fumes',
      'HCl gas is evolved smoothly forming white fumes with NH₄OH, and acid salt NaHSO₄ remains',
      'Sodium metal precipitates at the bottom',
      'SO₂ gas is evolved as the primary product'
    ],
    correctIndex: 1,
    nodeId: 'c10_chem_070' as NodeId,
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Acid Plant Manager: Oleum Mass Balance & Output Control',
  description: 'In an industrial acid manufacturing facility producing 1,000 metric tons of 98% conc. H₂SO₄ daily, engineers produce Oleum (H₂S₂O₇) first to avoid aerosol misting.',
  steps: [
    'Step 1: Calculate SO₃ feed rate required: 2SO₂ + O₂ → 2SO₃ yielding 816 metric tons of SO₃ gas.',
    'Step 2: Absorb SO₃ gas into 98% H₂SO₄ absorbent liquid to synthesize pyrosulphuric acid / Oleum (H₂S₂O₇).',
    'Step 3: Dilute Oleum with precisely measured mass of water: H₂S₂O₇ + H₂O → 2H₂SO₄.',
    'Step 4: Confirm 98% acid purity and high specific gravity (1.84) using density meters before tank car distribution.',
  ],
};

// ==========================================
// MISCONCEPTIONS (6 TOPIC-SPECIFIC)
// ==========================================
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_01',
    title: 'Direct Dissolution Fallacy',
    myth: 'SO₃ is dissolved directly in water to make H₂SO₄ in industry.',
    fact: 'Direct addition produces violent heat, generating an uncondensable fog of H₂SO₄ droplets. Thus, SO₃ is absorbed in conc. H₂SO₄ to form Oleum first.',
    nodeId: 'c10_chem_064',
  },
  {
    id: 'misc_02',
    title: 'Dehydrating vs Drying Confusion',
    myth: 'Drying agents and dehydrating agents perform the exact same reaction.',
    fact: 'A drying agent removes physical absorbed moisture (e.g. H₂O on moist gas). A dehydrating agent chemically extracts chemically combined hydrogen and oxygen elements from compounds in a 2:1 ratio (e.g. sugar → carbon + water).',
    nodeId: 'c10_chem_068',
  },
  {
    id: 'misc_03',
    title: 'Conc. vs Dilute Acid Properties',
    myth: 'Dilute H₂SO₄ is a strong oxidising agent and dehydrating agent.',
    fact: 'Dehydrating and strong oxidising properties belong ONLY to concentrated H₂SO₄. Dilute H₂SO₄ acts strictly as a typical dibasic hydronium-ion supplying acid.',
    nodeId: 'c10_chem_066',
  },
  {
    id: 'misc_04',
    title: 'Catalyst Temperature Myth',
    myth: 'Higher temperature always increases the yield of SO₃ in the Contact process.',
    fact: 'Because 2SO₂ + O₂ ⇌ 2SO₃ is exothermic, higher temperatures shift equilibrium backward (lowering yield), even though rate increases. 450°C is optimum.',
    nodeId: 'c10_chem_063',
  },
  {
    id: 'misc_05',
    title: 'Volatile Acid Prep Temperature',
    myth: 'During HCl or HNO₃ prep using conc. H₂SO₄, heating above 200°C is better to speed up the reaction.',
    fact: 'Above 200°C, normal sulfate salts (Na₂SO₄) stick firmly to glass vessels, wasting fuel and breaking glassware.',
    nodeId: 'c10_chem_070',
  },
  {
    id: 'misc_06',
    title: 'Dilution Method Danger',
    myth: 'Water should be poured into concentrated Sulphuric acid during dilution.',
    fact: 'Water poured into acid floats and boils instantly due to high exothermic heat, splashing acid. ACID MUST ALWAYS BE ADDED TO WATER SLOWLY WITH STIRRING.',
    nodeId: 'c10_chem_066',
  },
];

// ==========================================
// MANDATORY SECTION 7: 22+ CHALLENGES ARRAY
// ==========================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7) ---
  {
    id: 'ch_01',
    nodeId: 'c10_chem_061',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary industrial method used worldwide for manufacturing Sulphuric Acid?',
    options: ['Haber Process', 'Ostwald Process', 'Contact Process', 'Solvay Process'],
    correctIndex: 2,
    explanation: 'The Contact Process is the main modern industrial method for manufacturing Sulphuric Acid using SO₂, O₂, and V₂O₅ catalyst.',
    hints: ['Think about contact between SO₂ and oxygen catalyst.', 'Ostwald is for Nitric Acid.', 'It is the Contact Process.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: 'c10_chem_062',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is raw SO₂ gas thoroughly purified of Arsenic Oxide (As₂O₃) before entering the catalytic tower?',
    options: [
      'Arsenic causes the acid to turn green',
      'Arsenic acts as a poison to the Vanadium Pentoxide catalyst, reducing its efficiency',
      'Arsenic turns SO₂ into toxic H₂S gas',
      'Arsenic lowers the boiling point of sulphuric acid'
    ],
    correctIndex: 1,
    explanation: 'Arsenic impurities poison the catalyst (V₂O₅ or Pt) by coating its active sites and stopping catalytic action.',
    hints: ['Catalysts have active sites.', 'Impurities deactivate catalysts.', 'Arsenic is a catalyst poison.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_03',
    nodeId: 'c10_chem_063',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which modern, cost-effective catalyst is used for the reaction 2SO₂ + O₂ ⇌ 2SO₃?',
    options: ['Finely divided Iron', 'Platinum foil', 'Vanadium Pentoxide (V₂O₅)', 'Copper Oxide'],
    correctIndex: 2,
    explanation: 'Vanadium Pentoxide (V₂O₅) is preferred today because it is cheaper than Platinum and less susceptible to poisoning.',
    hints: ['It contains Vanadium.', 'Formula is V₂O₅.', 'Vanadium Pentoxide.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_04',
    nodeId: 'c10_chem_064',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What chemical substance is formed when SO₃ gas is absorbed into concentrated 98% H₂SO₄?',
    options: ['Sulphurous acid (H₂SO₃)', 'Pyrosulphuric acid / Oleum (H₂S₂O₇)', 'Hydrogen sulfide (H₂S)', 'Persulphuric acid'],
    correctIndex: 1,
    explanation: 'SO₃ + H₂SO₄ → H₂S₂O₇ (Pyrosulphuric acid, commonly known as Oleum or fuming sulphuric acid).',
    hints: ['Formula combines one SO₃ and one H₂SO₄.', 'Contains 2 Sulfur and 7 Oxygen atoms.', 'Oleum or H₂S₂O₇.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_05',
    nodeId: 'c10_chem_065',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How is Oleum (H₂S₂O₇) converted into 98% concentrated Sulphuric Acid?',
    options: [
      'By heating strongly above 500°C',
      'By adding calculated, stoichiometric quantity of distilled water',
      'By passing oxygen gas through it',
      'By filtering through active charcoal'
    ],
    correctIndex: 1,
    explanation: 'Oleum reacts with calculated water: H₂S₂O₇ + H₂O → 2H₂SO₄ to yield concentrated Sulphuric Acid safely.',
    hints: ['Hydroxylation / hydration reaction.', 'Add controlled water.', 'H₂S₂O₇ + H₂O → 2H₂SO₄.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_06',
    nodeId: 'c10_chem_066',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the physical appearance and nature of pure concentrated Sulphuric Acid at room temperature?',
    options: [
      'Colourless, oily, dense liquid with specific gravity approx 1.84',
      'Yellow volatile gas with sharp pungent odor',
      'White crystalline solid that sublimates',
      'Blue liquid with low density'
    ],
    correctIndex: 0,
    explanation: 'Conc. H₂SO₄ is a colourless, dense, oily liquid ("Oil of Vitriol") with high boiling point (338°C) and density ~1.84 g/cm³.',
    hints: ['It was historically named Oil of Vitriol.', 'It is heavy and oily.', 'Colourless, oily, dense liquid.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_07',
    nodeId: 'c10_chem_067',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Sulphuric Acid classified as a dibasic acid?',
    options: [
      'It contains two sulfur atoms per molecule',
      'It can furnish two hydronium ions (H₃O⁺) per molecule in step-wise ionisation',
      'It reacts only with two bases simultaneously',
      'It dissolves two metals at once'
    ],
    correctIndex: 1,
    explanation: 'It has two replaceable hydrogen atoms per molecule, ionising in two stages: H₂SO₄ → H⁺ + HSO₄⁻, then HSO₄⁻ ⇌ H⁺ + SO₄²⁻.',
    hints: ['Basicity depends on replaceable H atoms.', 'Furnishes 2 H⁺ / H₃O⁺ ions per molecule.', 'Dibasic acid.'],
    misconceptionIndex: 2,
  },

  // --- STANDARD TIER (8) ---
  {
    id: 'ch_08',
    nodeId: 'c10_chem_068',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the distinction between a Drying Agent and a Dehydrating Agent?',
    options: [
      'Drying agents react chemically with carbon; dehydrating agents dissolve in water',
      'Drying agents remove absorbed moisture; dehydrating agents chemically remove water elements (H & O) from compounds',
      'Drying agents release steam; dehydrating agents absorb oxygen gas',
      'There is no difference; the terms are completely interchangeable in chemistry'
    ],
    correctIndex: 1,
    explanation: 'A drying agent absorbs physical moisture without altering chemical structure. A dehydrating agent extracts chemically combined H and O (in 2:1 ratio) from molecules.',
    hints: ['Moisture vs chemically combined H and O.', 'Sugar charred to carbon is dehydration.', 'Drying removes physical water.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09',
    nodeId: 'c10_chem_069',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When hot concentrated H₂SO₄ reacts with non-metal Carbon (C), what are the products formed?',
    options: [
      'CO + S + H₂O',
      'CO₂ + 2SO₂ + 2H₂O',
      'CH₄ + SO₃',
      'CS₂ + H₂O + O₂'
    ],
    correctIndex: 1,
    explanation: 'Hot conc. H₂SO₄ oxidises Carbon to CO₂ while being reduced itself to SO₂: C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O.',
    hints: ['Carbon is oxidised to Carbon Dioxide.', 'Sulfuric acid is reduced to Sulfur Dioxide.', 'C + 2H₂SO₄ → CO₂ + 2SO₂ + 2H₂O.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_10',
    nodeId: 'c10_chem_070',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Conc. H₂SO₄ is used to prepare volatile acids like HCl and HNO₃ because of which property?',
    options: ['Strong dehydrating action', 'Low density and high volatility', 'Non-volatile nature with high boiling point (338°C)', 'Strong reducing property'],
    correctIndex: 2,
    explanation: 'Conc. H₂SO₄ has a very high boiling point (338°C) and low volatility, allowing it to displace more volatile acids (HCl b.p. -85°C, HNO₃ b.p. 83°C) from their salts.',
    hints: ['High boiling point means non-volatile.', 'It displaces volatile acids.', 'Non-volatile acid property.'],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_11',
    nodeId: 'c10_chem_063',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + 45 kcal, why is high pressure (e.g. 200 atm) NOT practically used in modern plants even though volume decreases?',
    options: [
      'SO₃ decomposes into S and O₂ at high pressure',
      'High pressure turns V₂O₅ into liquid',
      'Yield at 1��2 atm is already ~97–98%, making expensive high-pressure towers economically unnecessary and corrosive',
      'Oxygen gas cannot dissolve at high pressure'
    ],
    correctIndex: 2,
    explanation: 'Conversion is already 97-98% at 1-2 atm pressure over V₂O₅ at 450°C, so costly high-pressure plant design is redundant.',
    hints: ['Consider cost vs extra yield.', 'Yield is already ~98% at 1-2 atm.', 'Economic efficiency.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_12',
    nodeId: 'c10_chem_064',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is direct dissolution of SO₃ in water avoided in industry?',
    options: [
      'SO₃ reacts with water to form explosive hydrogen gas',
      'The reaction is violently exothermic, producing acid mist that passes out uncollected',
      'SO₃ is insoluble in pure water',
      'It forms sulphurous acid (H₂SO₃) instead of sulphuric acid'
    ],
    correctIndex: 1,
    explanation: 'The extreme heat released turns water into steam, producing a cloud of tiny acid droplets (fog) that cannot be condensed easily.',
    hints: ['Exothermic heat creates vapor.', 'Acid mist escapes.', 'Heat turns water to steam fog.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_13',
    nodeId: 'c10_chem_068',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When conc. H₂SO₄ is added to hydrated Copper(II) Sulphate crystals (CuSO₄·5H₂O), what observation occurs?',
    options: [
      'Blue crystals turn into a white anhydrous powder',
      'White powder turns into blue liquid',
      'Effervescence of CO₂ gas occurs',
      'A black precipitate of copper oxide forms'
    ],
    correctIndex: 0,
    explanation: 'Conc. H₂SO₄ extracts water of crystallisation from blue CuSO₄·5H₂O, leaving behind white anhydrous CuSO₄ powder.',
    hints: ['Water of crystallisation is removed.', 'Blue CuSO₄·5H₂O becomes anhydrous.', 'Blue turns to white.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_14',
    nodeId: 'c10_chem_069',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What gases are evolved when hot conc. H₂SO₄ is reacted with Sulphur element (S)?',
    options: ['Only H₂S gas', 'SO₂ gas and water vapor', 'SO₃ and O₂ gas', 'CO₂ and SO₂ gas'],
    correctIndex: 1,
    explanation: 'S + 2H₂SO₄ → 3SO₂ + 2H₂O. Sulphur is oxidised to SO₂ and H₂SO₄ is reduced to SO₂.',
    hints: ['Both reactant sulfur and acid sulfur form the same gas.', 'S + 2H₂SO₄ → 3SO₂ + 2H��O.', 'SO₂ gas.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_15',
    nodeId: 'c10_chem_067',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which type of salts are formed when dilute Sulphuric Acid reacts with Sodium Hydroxide in 1:1 vs 1:2 molar ratios?',
    options: [
      '1:1 forms Na₂SO₄ (normal salt); 1:2 forms NaHSO₄ (acid salt)',
      '1:1 forms NaHSO₄ (acid salt); 1:2 forms Na₂SO₄ (normal salt)',
      'Both yield Na₂SO₄ only',
      'Both yield NaHSO₄ only'
    ],
    correctIndex: 1,
    explanation: 'NaOH + H₂SO₄ (1:1) → NaHSO₄ + H₂O (acid salt). 2NaOH + H₂SO₄ (1:2) → Na₂SO₄ + 2H₂O (normal salt).',
    hints: ['Partial neutralization gives acid salt NaHSO₄.', 'Complete neutralization gives normal salt Na₂SO₄.', '1:1 = acid salt, 1:2 = normal salt.'],
    misconceptionIndex: 2,
  },

  // --- ADVANCED TIER (7) ---
  {
    id: 'ch_16',
    nodeId: 'c10_chem_068',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When concentrated Sulphuric Acid acts on Oxalic Acid crystals [(COOH)₂ or H₂C₂O₄] upon heating, what products are formed?',
    options: [
      'CO + CO₂ + H₂O (absorbed by H₂SO₄)',
      'CH₄ + O₂ + H₂SO₃',
      'C (carbon black) + H₂O',
      'Formic acid + SO₂'
    ],
    correctIndex: 0,
    explanation: 'H₂C₂O₄ ⎯(conc. H₂SO₄)→ CO(g) + CO₂(g) + H₂O (which is absorbed by conc. H₂SO₄).',
    hints: ['Oxalic acid loses elements of water.', 'Splits into Carbon Monoxide and Carbon Dioxide.', 'CO + CO₂.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_17',
    nodeId: 'c10_chem_063',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'For the reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + ΔH (-197 kJ), why is 450°C chosen as the optimum compromise temperature?',
    options: [
      'At 450°C, catalyst V₂O₅ melts and becomes super-active',
      'Lower temperatures give higher theoretical yield but reaction is too slow; higher temperatures speed reaction but reduce equilibrium yield',
      '450°C is the boiling point of SO₃ gas',
      'SO₂ decomposes above 450°C'
    ],
    correctIndex: 1,
    explanation: '450°C balances kinetics (rate of reaction) and thermodynamics (Le Chatelier yield shift for exothermic reaction).',
    hints: ['Exothermic reactions shift backward at high temp.', 'Low temp is too slow.', '450°C is optimum compromise between speed and yield.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_18',
    nodeId: 'c10_chem_070',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the lab preparation of HCl gas from NaCl and conc. H₂SO₄, why must the temperature be strictly maintained BELOW 200°C?',
    options: [
      'Above 200°C, conc. H₂SO₄ oxidises HCl to toxic Chlorine gas',
      'Above 200°C, hard crust of insoluble Na₂SO₄ forms that sticks to glass, wasting fuel and risking apparatus breakage',
      'NaCl decomposes into explosive sodium metal at 200°C',
      'HCl gas dissolves back into H₂SO₄ above 200°C'
    ],
    correctIndex: 1,
    explanation: 'Below 200°C: NaCl + H₂SO₄ → NaHSO₄ + HCl (NaHSO₄ is soft/soluble). Above 200°C: 2NaCl + H₂SO₄ → Na₂SO₄ + 2HCl (Na₂SO₄ forms hard crust).',
    hints: ['Look at the salt product formed.', 'Na₂SO₄ forms a hard crust stick to glass.', 'NaHSO₄ is formed below 200°C.'],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_19',
    nodeId: 'c10_chem_062',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the correct sequential order of towers in the purification unit of the Contact Process?',
    options: [
      'Dust Precipitator → Washing/Scrubbing Tower → Drying Tower → Arsenic Purifier → Testing Box',
      'Arsenic Purifier → Dust Precipitator → Drying Tower → Scrubbing Tower → Testing Box',
      'Drying Tower → Dust Precipitator → Washing Tower → Testing Box → Arsenic Purifier',
      'Testing Box → Arsenic Purifier → Washing Tower → Drying Tower → Dust Precipitator'
    ],
    correctIndex: 0,
    explanation: '1. Dust Removal → 2. Scrubbing with water (cool & wash) → 3. Drying with conc H₂SO₄ → 4. Arsenic Purifier (Fe(OH)₃) → 5. Testing Box (light beam check).',
    hints: ['First remove coarse dust.', 'Then wash with water.', 'Dry before removing arsenic.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_20',
    nodeId: 'c10_chem_069',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the reaction Cu + 2H₂SO₄(conc.) ⎯Δ→ CuSO₄ + SO₂ + 2H₂O, what are the oxidation state changes of Copper and Sulfur?',
    options: [
      'Cu: 0 to +2 (oxidised); S in H₂SO₄: +6 to +4 (reduced)',
      'Cu: +2 to 0 (reduced); S: +4 to +6 (oxidised)',
      'Cu: 0 to +1; S: +6 to 0',
      'No oxidation state changes occur; it is a double displacement'
    ],
    correctIndex: 0,
    explanation: 'Cu metal (0) loses 2 e⁻ to become Cu²⁺ (+2). S in conc H₂SO₄ (+6) gains 2 e⁻ to form SO₂ (+4).',
    hints: ['Elemental copper is 0.', 'In CuSO₄, copper is +2.', 'Sulfur in H₂SO₄ is +6, in SO₂ is +4.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_21',
    nodeId: 'c10_chem_065',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'To prepare 196 kg of pure 100% H₂SO₄ from Oleum (H₂S₂O₇), what exact mass of pure distilled water must react stoichiometrically with 178 kg of H₂S₂O₇?',
    options: ['18 kg', '36 kg', '9 kg', '54 kg'],
    correctIndex: 0,
    explanation: 'H₂S₂O₇ (molar mass = 178 g/mol) + H₂O (18 g/mol) → 2H₂SO₄ (196 g/mol). Thus 178 kg Oleum requires exactly 18 kg water.',
    hints: ['Molar mass of H₂S₂O₇ = 2(1) + 2(32) + 7(16) = 178 g/mol.', 'Molar mass of H₂O = 18 g/mol.', '178 kg + 18 kg = 196 kg.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_22',
    nodeId: 'c10_chem_066',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does concentrated Sulphuric Acid boil at a remarkably high temperature (338°C) compared to other mineral acids?',
    options: [
      'Due to strong ionic bonding throughout the liquid state',
      'Due to extensive intermolecular Hydrogen bonding between H₂SO₄ molecules',
      'Because sulfur atoms are extremely heavy',
      'Because it contains dissolved SO₃ gas under high pressure'
    ],
    correctIndex: 1,
    explanation: 'Each H₂SO₄ molecule forms extensive networks of intermolecular hydrogen bonds with adjacent molecules, requiring high thermal energy to vaporise.',
    hints: ['Hydrogen bonding occurs between -OH groups and oxygen atoms.', 'Intermolecular attraction elevates boiling point.', 'Extensive H-bonding.'],
    misconceptionIndex: 2,
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS (AT LEAST 3)
// ==========================================

// SVG 1: Full Contact Process Plant Overview
const ContactProcessPlantSVG: React.FC<{
  activeStage: number;
  temperature: number;
  pressure: number;
  catalyst: string;
}> = ({ activeStage, temperature, pressure, catalyst }) => {
  return (
    <svg viewBox="0 0 900 360" className="w-full h-auto bg-slate-900 rounded-xl shadow-2xl border border-slate-700">
      <defs>
        <linearGradient id="burnerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="towerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="catalystGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="450" y="25" textAnchor="middle" fill="#f8fafc" className="text-sm font-bold tracking-widest uppercase">
        Contact Process Industrial Flowsheet
      </text>

      {/* STAGE 1: Sulphur Burner */}
      <g className="transition-all duration-300 cursor-pointer">
        <rect
          x="20" y="80" width="100" height="180" rx="8"
          fill={activeStage === 0 ? 'url(#burnerGrad)' : '#334155'}
          stroke={activeStage === 0 ? '#fb923c' : '#64748b'} strokeWidth="2"
        />
        <text x="70" y="120" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Sulphur</text>
        <text x="70" y="135" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">Burner</text>
        <path d="M 40 210 Q 70 170 100 210 T 70 240 Z" fill="#fdba74" className="animate-pulse" />
        <text x="70" y="245" textAnchor="middle" fill="#1e293b" className="text-[10px] font-extrabold">S + O₂ → SO₂</text>
      </g>

      {/* Connecting Pipe 1 */}
      <path d="M 120 170 L 160 170" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4" className="animate-dash" />

      {/* STAGE 2: Purification Towers */}
      <g className="transition-all duration-300">
        <rect
          x="160" y="70" width="220" height="200" rx="10"
          fill={activeStage === 1 ? '#1e293b' : '#0f172a'}
          stroke={activeStage === 1 ? '#38bdf8' : '#475569'} strokeWidth={activeStage === 1 ? "3" : "1.5"}
        />
        <text x="270" y="95" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">Purification Unit</text>

        {/* 5 Towers sub-boxes */}
        <rect x="175" y="110" width="35" height="120" rx="4" fill="#334155" stroke="#94a3b8" />
        <text x="192" y="170" textAnchor="middle" fill="#f8fafc" className="text-[9px]" transform="rotate(-90 192 170)">Dust</text>

        <rect x="215" y="110" width="35" height="120" rx="4" fill="#0284c7" opacity="0.4" stroke="#38bdf8" />
        <text x="232" y="170" textAnchor="middle" fill="#f8fafc" className="text-[9px]" transform="rotate(-90 232 170)">Wash</text>

        <rect x="255" y="110" width="35" height="120" rx="4" fill="#0369a1" stroke="#38bdf8" />
        <text x="272" y="170" textAnchor="middle" fill="#f8fafc" className="text-[9px]" transform="rotate(-90 272 170)">Drying</text>

        <rect x="295" y="110" width="35" height="120" rx="4" fill="#b45309" stroke="#f59e0b" />
        <text x="312" y="170" textAnchor="middle" fill="#f8fafc" className="text-[9px]" transform="rotate(-90 312 170)">As₂O₃</text>

        <rect x="335" y="110" width="35" height="120" rx="4" fill="#15803d" stroke="#22c55e" />
        <text x="352" y="170" textAnchor="middle" fill="#f8fafc" className="text-[9px]" transform="rotate(-90 352 170)">Testing</text>
      </g>

      {/* Connecting Pipe 2 */}
      <path d="M 380 170 L 430 170" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4" />

      {/* STAGE 3: Catalytic Converter (Contact Tower) */}
      <g className="transition-all duration-300">
        <rect
          x="430" y="60" width="180" height="220" rx="12"
          fill={activeStage === 2 ? '#451a03' : '#1e293b'}
          stroke={activeStage === 2 ? '#f59e0b' : '#64748b'} strokeWidth="3"
        />
        <text x="520" y="85" textAnchor="middle" fill="#fbbf24" className="text-xs font-bold">Contact Tower</text>

        {/* Catalyst Shelves */}
        <line x1="450" y1="120" x2="590" y2="120" stroke="#eab308" strokeWidth="6" strokeDasharray="8 4" />
        <line x1="450" y1="160" x2="590" y2="160" stroke="#eab308" strokeWidth="6" strokeDasharray="8 4" />
        <line x1="450" y1="200" x2="590" y2="200" stroke="#eab308" strokeWidth="6" strokeDasharray="8 4" />

        <text x="520" y="145" textAnchor="middle" fill="#fef08a" className="text-[10px] font-mono">
          {catalyst} Bed
        </text>
        <text x="520" y="235" textAnchor="middle" fill="#fef08a" className="text-[10px]">
          {temperature}°C | {pressure} atm
        </text>
        <text x="520" y="255" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-semibold">
          2SO₂ + O₂ ⇌ 2SO₃
        </text>
      </g>

      {/* Connecting Pipe 3 */}
      <path d="M 610 170 L 660 170" stroke="#a855f7" strokeWidth="4" strokeDasharray="4" />

      {/* STAGE 4: Absorption Tower */}
      <g className="transition-all duration-300">
        <rect
          x="660" y="70" width="100" height="200" rx="8"
          fill={activeStage === 3 ? 'url(#towerGrad)' : '#1e293b'}
          stroke={activeStage === 3 ? '#a855f7' : '#64748b'} strokeWidth="3"
        />
        <text x="710" y="100" textAnchor="middle" fill="#c084fc" className="text-xs font-bold">Absorption</text>
        <text x="710" y="115" textAnchor="middle" fill="#c084fc" className="text-xs font-bold">Tower</text>

        {/* Spray from top */}
        <path d="M 710 120 L 680 150 M 710 120 L 710 150 M 710 120 L 740 150" stroke="#a855f7" strokeWidth="2" strokeDasharray="2" />
        <text x="710" y="140" textAnchor="middle" fill="#e9d5ff" className="text-[9px]">98% H₂SO₄ spray</text>

        {/* Quartz packing */}
        <rect x="675" y="160" width="70" height="60" fill="#334155" opacity="0.6" rx="4" />
        <text x="710" y="190" textAnchor="middle" fill="#cbd5e1" className="text-[9px]">Quartz Pebbles</text>

        <text x="710" y="245" textAnchor="middle" fill="#f0abfc" className="text-[10px] font-bold">SO₃ → Oleum</text>
      </g>

      {/* Connecting Pipe 4 */}
      <path d="M 760 220 L 800 220" stroke="#ec4899" strokeWidth="4" />

      {/* STAGE 5: Dilution & Product Tank */}
      <g className="transition-all duration-300">
        <rect
          x="800" y="140" width="80" height="130" rx="8"
          fill={activeStage === 4 ? '#831843' : '#1e293b'}
          stroke={activeStage === 4 ? '#f43f5e' : '#64748b'} strokeWidth="3"
        />
        <text x="840" y="165" textAnchor="middle" fill="#fda4af" className="text-xs font-bold">Dilution</text>
        <text x="840" y="180" textAnchor="middle" fill="#fda4af" className="text-xs font-bold">Tank</text>

        {/* Liquid level */}
        <rect x="805" y="210" width="70" height="55" rx="4" fill="#be123c" opacity="0.8" />
        <text x="840" y="240" textAnchor="middle" fill="#ffffff" className="text-[10px] font-extrabold">98% H₂SO₄</text>
      </g>

      {/* Flow Arrows Label */}
      <g transform="translate(0, 310)">
        <rect x="20" y="0" width="860" height="35" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="450" y="22" textAnchor="middle" fill="#94a3b8" className="text-xs font-mono">
          S Burner ➔ Gas Cleaner ➔ Catalytic Oxidation (V₂O₅) ➔ SO₃ Absorption (H₂S₂O₇) ➔ Hydro Dilution (H₂SO₄)
        </text>
      </g>
    </svg>
  );
};

// SVG 2: Dehydration of Sugar Visualizer
const DehydrationVisualizerSVG: React.FC<{
  reactant: 'sugar' | 'cuso4' | 'oxalic' | 'ethanol';
  isReacted: boolean;
}> = ({ reactant, isReacted }) => {
  return (
    <svg viewBox="0 0 500 320" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <defs>
        <linearGradient id="beakerGlass" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="steam" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Title */}
      <text x="250" y="25" textAnchor="middle" fill="#e2e8f0" className="text-xs font-bold uppercase tracking-wide">
        Dehydration Reaction Visualization
      </text>

      {/* Lab Bench */}
      <rect x="30" y="270" width="440" height="15" fill="#334155" rx="2" />

      {/* Glass Beaker */}
      <rect x="180" y="110" width="140" height="160" rx="6" fill="url(#beakerGlass)" stroke="#94a3b8" strokeWidth="3" />
      <line x1="175" y1="110" x2="325" y2="110" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

      {/* Volume Markings */}
      <line x1="310" y1="150" x2="320" y2="150" stroke="#94a3b8" strokeWidth="2" />
      <line x1="305" y1="180" x2="320" y2="180" stroke="#94a3b8" strokeWidth="2" />
      <line x1="310" y1="210" x2="320" y2="210" stroke="#94a3b8" strokeWidth="2" />
      <line x1="305" y1="240" x2="320" y2="240" stroke="#94a3b8" strokeWidth="2" />

      {/* Content Rendering based on reactant state */}
      {reactant === 'sugar' && (
        <g>
          {!isReacted ? (
            <>
              {/* White Sugar heap */}
              <path d="M 190 268 Q 250 220 310 268 Z" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <text x="250" y="250" textAnchor="middle" fill="#475569" className="text-[10px] font-bold">C₁₂H₂₂O₁₁ (Sugar)</text>
            </>
          ) : (
            <>
              {/* Spongy Black Carbon Tower rising out */}
              <path d="M 195 268 C 190 180, 210 80, 230 50 C 250 30, 270 30, 280 60 C 295 100, 305 180, 305 268 Z" fill="#090d16" stroke="#334155" strokeWidth="2" />
              {/* Steam & Heat fuming */}
              <circle cx="230" cy="40" r="18" fill="url(#steam)" className="animate-ping" />
              <circle cx="270" cy="30" r="22" fill="url(#steam)" className="animate-ping" />
              <text x="250" y="160" textAnchor="middle" fill="#ef4444" className="text-xs font-extrabold tracking-widest">
                12 C (Sugar Charcoal) + Steam!
              </text>
            </>
          )}
        </g>
      )}

      {reactant === 'cuso4' && (
        <g>
          {!isReacted ? (
            <>
              <path d="M 190 268 Q 250 230 310 268 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
              <text x="250" y="255" textAnchor="middle" fill="#ffffff" className="text-[10px] font-bold">Blue CuSO₄·5H₂O</text>
            </>
          ) : (
            <>
              <path d="M 190 268 Q 250 230 310 268 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
              <text x="250" y="255" textAnchor="middle" fill="#0f172a" className="text-[10px] font-bold">Anhydrous CuSO₄ (White)</text>
              <text x="250" y="170" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">
                Water of Crystallisation Removed!
              </text>
            </>
          )}
        </g>
      )}

      {reactant === 'oxalic' && (
        <g>
          {!isReacted ? (
            <>
              <rect x="195" y="240" width="110" height="28" fill="#f8fafc" opacity="0.9" rx="4" />
              <text x="250" y="258" textAnchor="middle" fill="#334155" className="text-[10px] font-bold">(COOH)₂ Crystals</text>
            </>
          ) : (
            <>
              <rect x="195" y="250" width="110" height="18" fill="#94a3b8" opacity="0.4" rx="2" />
              {/* CO and CO2 gas bubbles escaping */}
              <circle cx="220" cy="180" r="12" fill="#38bdf8" opacity="0.6" />
              <text x="220" y="184" textAnchor="middle" fill="#ffffff" className="text-[9px] font-bold">CO</text>
              <circle cx="280" cy="150" r="14" fill="#a855f7" opacity="0.6" />
              <text x="280" y="154" textAnchor="middle" fill="#ffffff" className="text-[9px] font-bold">CO₂</text>
              <text x="250" y="100" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">
                (COOH)₂ ➔ CO + CO₂ + H₂O(absorbed)
              </text>
            </>
          )}
        </g>
      )}

      {reactant === 'ethanol' && (
        <g>
          {!isReacted ? (
            <>
              <rect x="190" y="220" width="120" height="48" fill="#38bdf8" opacity="0.3" rx="4" />
              <text x="250" y="248" textAnchor="middle" fill="#e0f2fe" className="text-[10px] font-bold">Ethanol (C₂H₅OH)</text>
            </>
          ) : (
            <>
              <rect x="190" y="240" width="120" height="28" fill="#0284c7" opacity="0.5" rx="4" />
              <path d="M 230 200 L 230 130 M 270 200 L 270 110" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4" />
              <text x="250" y="100" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">
                C₂H₅OH ⎯(170°C)→ C₂H₄ (Ethene Gas) + H₂O
              </text>
            </>
          )}
        </g>
      )}

      {/* Acid Dropper */}
      <g transform="translate(240, 40)">
        <path d="M 5 -20 L 15 -20 L 12 40 L 8 50 L 5 40 Z" fill="#94a3b8" />
        <rect x="2" y="-30" width="16" height="12" fill="#ef4444" rx="3" />
        {isReacted && (
          <circle cx="10" cy="65" r="4" fill="#e11d48" className="animate-bounce" />
        )}
      </g>
    </svg>
  );
};

// SVG 3: Volatile Acid Preparation Apparatus (HCl / HNO3)
const NonVolatileAcidPrepSVG: React.FC<{
  acidType: 'HCl' | 'HNO3';
  temperature: number;
}> = ({ acidType, temperature }) => {
  const isTooHot = temperature > 200;

  return (
    <svg viewBox="0 0 500 320" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <defs>
        <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fef08a" />
        </linearGradient>
      </defs>

      <text x="250" y="25" textAnchor="middle" fill="#e2e8f0" className="text-xs font-bold uppercase tracking-wider">
        Preparation of Volatile Acid ({acidType}) using Conc. H₂SO₄
      </text>

      {/* Retort Stand */}
      <rect x="50" y="270" width="300" height="12" fill="#334155" rx="2" />
      <rect x="90" y="80" width="10" height="190" fill="#475569" />

      {/* Glass Retort Flask */}
      <path
        d="M 100 210 C 100 160, 160 160, 160 210 C 160 250, 100 250, 100 210 Z"
        fill="#ffffff" opacity="0.15" stroke="#cbd5e1" strokeWidth="2"
      />
      {/* Retort Neck extending to receiver */}
      <path d="M 145 180 Q 230 160 320 230" fill="none" stroke="#cbd5e1" strokeWidth="6" />

      {/* Salt & Acid mixture inside retort */}
      <path
        d="M 105 220 Q 130 205 155 220 C 155 245, 105 245, 105 220 Z"
        fill={isTooHot ? '#78350f' : '#0284c7'} opacity="0.7"
      />
      <text x="130" y="232" textAnchor="middle" fill="#ffffff" className="text-[9px] font-bold">
        {acidType === 'HCl' ? 'NaCl + H₂SO₄' : 'KNO₃ + H₂SO₄'}
      </text>

      {/* Bunsen Burner */}
      <rect x="120" y="250" width="20" height="20" fill="#64748b" />
      <path d="M 122 250 L 130 228 L 138 250 Z" fill="url(#flameGrad)" className="animate-pulse" />

      {/* Gas Delivery / Receiver Jar */}
      <rect x="300" y="190" width="60" height="80" rx="4" fill="#ffffff" opacity="0.1" stroke="#94a3b8" strokeWidth="2" />
      <text x="330" y="240" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">
        {acidType} Gas
      </text>

      {/* Temperature Alert Warning */}
      {isTooHot ? (
        <g transform="translate(180, 60)">
          <rect x="0" y="0" width="280" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
          <text x="140" y="22" textAnchor="middle" fill="#fca5a5" className="text-xs font-bold">
            ⚠️ WARNING: Temp &gt; 200°C ({temperature}°C)!
          </text>
          <text x="140" y="38" textAnchor="middle" fill="#f8fafc" className="text-[10px]">
            Forms hard crust of Na₂SO₄ / K₂SO₄ sticking to glass!
          </text>
        </g>
      ) : (
        <g transform="translate(180, 60)">
          <rect x="0" y="0" width="280" height="50" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
          <text x="140" y="22" textAnchor="middle" fill="#6ee7b7" className="text-xs font-bold">
            ✓ OPTIMUM TEMP ({temperature}°C &lt; 200°C)
          </text>
          <text x="140" y="38" textAnchor="middle" fill="#f8fafc" className="text-[10px]">
            Forms acid salt ({acidType === 'HCl' ? 'NaHSO₄' : 'KHSO₄'}), preserving glass!
          </text>
        </g>
      )}
    </svg>
  );
};

// ==========================================
// CANVAS ANIMATION COMPONENT (EQUILIBRIUM REACTORS)
// ==========================================
const EquilibriumSimulationCanvas: React.FC<{
  temperature: number;
  pressure: number;
  catalyst: 'V2O5' | 'Pt' | 'None';
  onYieldCalculated: (so3Yield: number) => void;
}> = ({ temperature, pressure, catalyst, onYieldCalculated }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Equilibrium Yield Math Formula based on Thermodynamics:
  // 2SO2 + O2 <-> 2SO3 + Heat (Exothermic)
  const calculateYield = useCallback(() => {
    // Temp factor: lower temp = higher equilibrium yield, but catalyst needed for activation energy
    const tempK = temperature + 273;
    // Standard delta H ~ -197 kJ/mol
    let baseYield = 100 / (1 + Math.exp((temperature - 420) / 45));
    // Pressure factor: 3 moles gas -> 2 moles gas. Higher pressure increases yield slightly.
    baseYield += Math.log2(pressure) * 3;
    // Catalyst factor: catalyst speeds up rate to reach equilibrium, doesn't change position but without catalyst rate is ~0% at low temp.
    if (catalyst === 'None') {
      baseYield = Math.max(5, baseYield * 0.15);
    }
    return Math.min(99.5, Math.max(2, baseYield));
  }, [temperature, pressure, catalyst]);

  useEffect(() => {
    const yieldVal = calculateYield();
    onYieldCalculated(yieldVal);
  }, [temperature, pressure, catalyst, calculateYield, onYieldCalculated]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Particle system representing SO2 (red-yellow), O2 (blue), and SO3 (purple)
    const yieldVal = calculateYield();
    const totalParticles = 40;
    const so3Count = Math.round((yieldVal / 100) * totalParticles);
    const reactantCount = totalParticles - so3Count;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'SO2' | 'O2' | 'SO3';
    }

    const particles: Particle[] = [];

    // Speed scales with temperature
    const speedMultiplier = (temperature / 300) * 1.5;

    for (let i = 0; i < totalParticles; i++) {
      const type: 'SO2' | 'O2' | 'SO3' = i < so3Count ? 'SO3' : (i % 2 === 0 ? 'SO2' : 'O2');
      particles.push({
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * speedMultiplier,
        vy: (Math.random() - 0.5) * speedMultiplier,
        type,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background reactor vessel
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Grid lines inside reactor
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Catalyst bed visual band in middle if catalyst present
      if (catalyst !== 'None') {
        ctx.fillStyle = catalyst === 'V2O5' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(226, 232, 240, 0.15)';
        ctx.fillRect(width * 0.3, 0, width * 0.4, height);
        ctx.strokeStyle = catalyst === 'V2O5' ? '#eab308' : '#e2e8f0';
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(width * 0.3, 0, width * 0.4, height);
        ctx.setLineDash([]);
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < 15 || p.x > width - 15) p.vx *= -1;
        if (p.y < 15 || p.y > height - 15) p.vy *= -1;

        ctx.beginPath();
        if (p.type === 'SO3') {
          // Purple larger molecule
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#a855f7';
          ctx.fill();
          ctx.strokeStyle = '#c084fc';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = '#ffffff';
          ctx.font = '9px monospace';
          ctx.fillText('SO₃', p.x - 9, p.y + 3);
        } else if (p.type === 'SO2') {
          // Orange molecule
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#f97316';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '8px monospace';
          ctx.fillText('SO₂', p.x - 8, p.y + 3);
        } else {
          // Blue oxygen molecule
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '7px monospace';
          ctx.fillText('O₂', p.x - 5, p.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [temperature, pressure, catalyst, calculateYield]);

  return (
    <div className="relative border border-slate-700 rounded-xl overflow-hidden bg-slate-950 shadow-inner">
      <canvas ref={canvasRef} width={480} height={220} className="w-full h-auto block" />
      <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-2 text-xs text-slate-200">
        <div>Yield SO₃: <span className="font-bold text-amber-400">{calculateYield().toFixed(1)}%</span></div>
        <div>Temp: <span className="font-bold text-cyan-400">{temperature}°C</span></div>
        <div>Press: <span className="font-bold text-emerald-400">{pressure} atm</span></div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export const C10_ChemistrySulphuricacidContactprocessSim: React.FC<ComponentProps> = ({
  onComplete,
  initialNodeId = 'c10_chem_061'
}) => {
  // Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Active Exploration Step in Lab
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Lab 1 State: Gas Purification Chain
  const [passedTowers, setPassedTowers] = useState<boolean[]>([false, false, false, false, false]);
  const [purificationSuccess, setPurificationSuccess] = useState<boolean>(false);

  // Lab 2 State: Catalytic Reactor Equilibrium
  const [reactorTemp, setReactorTemp] = useState<number>(450);
  const [reactorPress, setReactorPress] = useState<number>(1.5);
  const [reactorCatalyst, setReactorCatalyst] = useState<'V2O5' | 'Pt' | 'None'>('V2O5');
  const [calculatedYield, setCalculatedYield] = useState<number>(97.5);

  // Lab 3 State: Oleum Dilution
  const [oleumMass, setOleumMass] = useState<number>(178); // kg
  const [waterMass, setWaterMass] = useState<number>(18); // kg
  const [dilutionOutput, setDilutionOutput] = useState<number>(196); // kg H2SO4

  // Lab 4 State: Dehydration Testing
  const [dehydrationReactant, setDehydrationReactant] = useState<'sugar' | 'cuso4' | 'oxalic' | 'ethanol'>('sugar');
  const [isDehydrationTriggered, setIsDehydrationTriggered] = useState<boolean>(false);

  // Lab 5 State: Acid Reactivity
  const [prepAcidType, setPrepAcidType] = useState<'HCl' | 'HNO3'>('HCl');
  const [prepTemp, setPrepTemp] = useState<number>(180);

  // Observation & Prediction Answers
  const [predAnswers, setPredAnswers] = useState<(number | null)[]>([null, null]);
  const [predSubmitted, setPredSubmitted] = useState<boolean[]>([false, false]);

  const [obsAnswers, setObsAnswers] = useState<(number | null)[]>([null, null]);
  const [obsSubmitted, setObsSubmitted] = useState<boolean[]>([false, false]);

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChallengeSubmitted, setIsChallengeSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // UI FX Signals
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Auto-Hint Timer Ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BKT & SRS Master State Maps
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Partial<Record<NodeId, BKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<NodeId, SRSItem>>(() => {
    const initial: Partial<Record<NodeId, SRSItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial as Record<NodeId, SRSItem>;
  });

  // Current Challenge Item
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Auto Hint timer after 10s inactivity in challenges
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (activeTab === 'challenges' && !isChallengeSubmitted) {
      inactivityTimerRef.current = setTimeout(() => {
        setShowHint(true);
        setCurrentHintText(currentChallenge.hints[0]);
        audioManager.play('hint');
      }, 10000);
    }
  }, [activeTab, isChallengeSubmitted, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, isChallengeSubmitted, resetInactivityTimer]);

  // Audio & Speech Handlers
  const playSound = (sound: SoundEffect) => {
    audioManager.play(sound);
  };

  const speakText = (text: string) => {
    speechManager.speak(text);
  };

  // Handle Discovery Submit
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speakText('Correct! Direct absorption in water forms an uncontrolled dense mist.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      playSound('error');
      speakText('Not quite. Consider the violent exothermic heat released.');
    }
  };

  // Gas Purification Tower Toggle
  const toggleTower = (index: number) => {
    playSound('pickup');
    const updated = [...passedTowers];
    updated[index] = !updated[index];
    setPassedTowers(updated);

    if (updated.every(Boolean)) {
      setPurificationSuccess(true);
      playSound('drop-correct');
      speakText('Purification chain complete! Raw gas is cleared of dust, water, and catalyst poisons.');
    } else {
      setPurificationSuccess(false);
    }
  };

  // Lab 3 Oleum Hydration Calc update
  useEffect(() => {
    // Oleum (178) + H2O (18) = 196 kg H2SO4
    const ratio = oleumMass / 178;
    const requiredH2O = ratio * 18;
    setDilutionOutput(Math.round(oleumMass + waterMass));
  }, [oleumMass, waterMass]);

  // Handle Challenge Option Click
  const handleOptionSelect = (index: number) => {
    if (isChallengeSubmitted) return;
    setSelectedOption(index);
    playSound('tap');
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = () => {
    if (selectedOption === null || isChallengeSubmitted) return;
    setIsChallengeSubmitted(true);

    const isCorrect = selectedOption === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // Update BKT & SRS
    const updatedBkt = bktUpdate(bktStates[nodeId], isCorrect);
    const updatedSrs = sm2Update(srsItems[nodeId], isCorrect ? 5 : 1);

    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      playSound('drop-correct');
      speakText('Excellently reasoned!');
      setChallengeScore((prev) => prev + 10);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      playSound('error');
      speakText('Let us review the underlying chemistry principle.');
      setShowHint(true);
      setCurrentHintText(currentChallenge.explanation);
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChallengeSubmitted(false);
      setShowHint(false);
      playSound('whoosh');
    } else {
      // Completed all challenges!
      playSound('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      speakText('Congratulations! You have mastered the Contact Process and Sulphuric Acid chemistry!');
      recordGameScore('c10_chem_sulphuric_acid', challengeScore + 10);
      if (onComplete) onComplete(challengeScore + 10);
    }
  };

  // Overall Mastery Calculator
  const overallMasteryPercent = useMemo(() => {
    const total = ALL_NODE_IDS.reduce((acc, id) => {
      const level = getMasteryLevel(bktStates[id]);
      return acc + (level === 'mastered' ? 100 : level === 'proficient' ? 60 : 20);
    }, 0);
    return Math.round(total / ALL_NODE_IDS.length);
  }, [bktStates]);

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-slate-950 text-slate-100 p-4 font-sans select-none">
      {/* HEADER BAR */}
      <header className="flex flex-col md:flex-row items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-extrabold text-xl shadow-inner">
            H₂SO₄
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-100 tracking-tight">
              Contact Process & Sulphuric Acid Operations
            </h1>
            <p className="text-xs text-slate-400">CISCE / ICSE Class 10 Chemistry • Industrial Lab Unit</p>
          </div>
        </div>

        {/* Top Navigation Tabs */}
        <nav className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
          <button
            onClick={() => { setActiveTab('discovery'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discovery' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Interactive Labs
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); playSound('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'summary' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Summary & Plant Report
          </button>
        </nav>

        {/* Plant Mastery Meter */}
        <div className="flex items-center gap-3 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Plant Mastery</div>
            <div className="text-sm font-extrabold text-amber-400">{overallMasteryPercent}%</div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-amber-500/30 flex items-center justify-center p-1">
            <div
              className="w-full h-full rounded-full bg-amber-500 transition-all"
              style={{ opacity: overallMasteryPercent / 100 }}
            />
          </div>
        </div>
      </header>

      {/* FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Industrial Plant Certification Achieved!" />
      <HintBubble show={showHint} text={currentHintText} />
      <SparkleBurst show={showSparkle} x={500} y={300} />

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <section className="space-y-6">
          {/* Narrative Lab Scenario */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
              <span>🏭</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {SCENARIO.context}
            </p>
          </div>

          {/* Plant Flowsheet Diagram */}
          <ContactProcessPlantSVG
            activeStage={2}
            temperature={reactorTemp}
            pressure={reactorPress}
            catalyst={reactorCatalyst}
          />

          {/* Discovery Question Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
              Pre-Lab Discovery Problem
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDiscoverySelected(idx); playSound('tap'); }}
                  className={`p-3.5 rounded-xl text-xs text-left transition-all border ${
                    discoverySelected === idx
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handleDiscoverySubmit}
                disabled={discoverySelected === null || discoverySubmitted}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-50 transition-all"
              >
                Submit Discovery Hypothesis
              </button>
            </div>

            {discoverySubmitted && (
              <div className="mt-4 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200">
                <span className="font-bold">Engineer Key Insight: </span>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* PREDICTION QUESTIONS RENDERING */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest">
              Lab Predictions & Hypotheses
            </h3>
            {PREDICTION_QUESTIONS.map((pred, pIdx) => (
              <div key={pIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <p className="text-xs font-semibold text-slate-200">{pred.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pred.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const updated = [...predAnswers];
                        updated[pIdx] = oIdx;
                        setPredAnswers(updated);
                        playSound('tap');
                      }}
                      className={`p-2.5 rounded-lg text-xs text-left border ${
                        predAnswers[pIdx] === oIdx
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const updatedSub = [...predSubmitted];
                    updatedSub[pIdx] = true;
                    setPredSubmitted(updatedSub);
                    if (predAnswers[pIdx] === pred.correctIndex) {
                      playSound('drop-correct');
                    } else {
                      playSound('drop-wrong');
                    }
                  }}
                  disabled={predAnswers[pIdx] === null}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 text-slate-950 text-xs font-bold hover:bg-cyan-500 disabled:opacity-40"
                >
                  Confirm Prediction {pIdx + 1}
                </button>
                {predSubmitted[pIdx] && (
                  <p className="text-[11px] text-cyan-300 bg-cyan-950/40 p-2 rounded-lg border border-cyan-800/40">
                    🔍 Verification Method: {pred.verifyInstruction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
      {activeTab === 'lab' && (
        <section className="space-y-6">
          {/* Lab Stage Selection Menu */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((lab, idx) => (
              <button
                key={idx}
                onClick={() => { setActiveLabIndex(idx); playSound('tap'); }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeLabIndex === idx
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-bold text-amber-500 uppercase">Lab {idx + 1}</div>
                <div className="text-xs font-semibold truncate">{lab.title.split(':')[1] || lab.title}</div>
              </button>
            ))}
          </div>

          {/* Current Lab Header */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <h3 className="text-sm font-bold text-amber-400 mb-1">
              {EXPLORATION_STEPS[activeLabIndex].title}
            </h3>
            <p className="text-xs text-slate-300">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
          </div>

          {/* LAB 1 INTERACTION: Gas Purification Chain */}
          {activeLabIndex === 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Raw Gas Purification Sequence (Node: c10_chem_062)
              </h4>
              <p className="text-xs text-slate-300">
                Click each tower in correct sequential order to purify raw SO₂ and air, removing dust, moisture, and deadly catalyst poisons like Arsenic Oxide (As₂O₃).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { name: '1. Dust Precipitator', desc: 'Removes coarse solid dust particles' },
                  { name: '2. Washing Tower', desc: 'Washes gas with water spray & cools' },
                  { name: '3. Drying Tower', desc: 'Conc. H₂SO₄ spray absorbs moisture' },
                  { name: '4. Arsenic Purifier', desc: 'Fe(OH)₃ absorbs As₂O₃ catalyst poison' },
                  { name: '5. Testing Box', desc: 'Light beam checks for remaining dust' },
                ].map((tower, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => toggleTower(tIdx)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      passedTowers[tIdx]
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-2">{passedTowers[tIdx] ? '✅' : '🔒'}</div>
                    <div className="text-xs font-bold mb-1">{tower.name}</div>
                    <div className="text-[10px] text-slate-500">{tower.desc}</div>
                  </button>
                ))}
              </div>

              {purificationSuccess ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500 text-emerald-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold">✓ Gas Purification Complete:</span> Raw SO₂ gas is now 99.9% pure and free of As₂O₃ poison. Ready for Catalytic Oxidation!
                  </div>
                  <button
                    onClick={() => { setActiveLabIndex(1); playSound('swoop'); }}
                    className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-lg hover:bg-emerald-400 text-xs"
                  >
                    Proceed to Lab 2 ➔
                  </button>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs">
                  ⚠️ Select all 5 purification units to prevent catalyst poisoning in the Contact Tower.
                </div>
              )}
            </div>
          )}

          {/* LAB 2 INTERACTION: Equilibrium Converter */}
          {activeLabIndex === 1 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Reactor Parameters (Node: c10_chem_063)
                  </h4>

                  {/* Temperature Slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Temperature (°C):</span>
                      <span className="text-amber-400">{reactorTemp}°C</span>
                    </div>
                    <input
                      type="range" min="300" max="650" step="10"
                      value={reactorTemp}
                      onChange={(e) => { setReactorTemp(Number(e.target.value)); playSound('tap'); }}
                      className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>300°C (Slow rate)</span>
                      <span className="text-amber-400 font-bold">450°C Optimum</span>
                      <span>650°C (Low yield)</span>
                    </div>
                  </div>

                  {/* Pressure Slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Pressure (atm):</span>
                      <span className="text-cyan-400">{reactorPress} atm</span>
                    </div>
                    <input
                      type="range" min="0.5" max="10" step="0.5"
                      value={reactorPress}
                      onChange={(e) => { setReactorPress(Number(e.target.value)); playSound('tap'); }}
                      className="w-full accent-cyan-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0.5 atm</span>
                      <span className="text-cyan-400 font-bold">1–2 atm Optimum</span>
                      <span>10 atm</span>
                    </div>
                  </div>

                  {/* Catalyst Choice */}
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-300 block mb-2">Catalyst Selection:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'V2O5', label: 'V₂O₅ (Vanadium Pentoxide)' },
                        { id: 'Pt', label: 'Platinum (Pt)' },
                        { id: 'None', label: 'No Catalyst' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { setReactorCatalyst(cat.id as 'V2O5' | 'Pt' | 'None'); playSound('tap'); }}
                          className={`p-2 rounded-lg text-xs font-bold border transition-all ${
                            reactorCatalyst === cat.id
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Simulation Canvas View */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Molecular Collision Kinetics Canvas
                  </h4>
                  <EquilibriumSimulationCanvas
                    temperature={reactorTemp}
                    pressure={reactorPress}
                    catalyst={reactorCatalyst}
                    onYieldCalculated={(y) => setCalculatedYield(y)}
                  />
                  <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <div className="font-bold text-amber-400 mb-1">Le Chatelier Chemical Analysis:</div>
                    2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + 45 kcal (Exothermic).
                    {reactorTemp > 500 && ' High temperature forces reaction backward!'}
                    {reactorTemp < 400 && ' Low temperature makes rate sluggish!'}
                    {reactorCatalyst === 'None' && ' Without catalyst, activation energy wall stalls conversion.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 3 INTERACTION: Oleum & Hydration */}
          {activeLabIndex === 2 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Absorption & Hydro-Dilution Mass Balance (Nodes: c10_chem_064, c10_chem_065)
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
                  <h5 className="text-xs font-bold text-purple-400">Step 1: Absorbing SO₃ in 98% H₂SO₄</h5>
                  <p className="text-xs text-slate-300">
                    SO₃(g) + H₂SO₄(l) → H₂S₂O₇(l) [Pyrosulphuric Acid / Oleum]
                  </p>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Oleum Mass Output (kg): {oleumMass} kg
                    </label>
                    <input
                      type="range" min="89" max="356" step="89"
                      value={oleumMass}
                      onChange={(e) => { setOleumMass(Number(e.target.value)); playSound('tap'); }}
                      className="w-full accent-purple-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
                  <h5 className="text-xs font-bold text-rose-400">Step 2: Controlled Dilution with Distilled H₂O</h5>
                  <p className="text-xs text-slate-300">
                    H₂S₂O₇(l) + H₂O(l) → 2 H₂SO₄(l) [Stoichiometric ratio 178g : 18g]
                  </p>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Water Added (kg): {waterMass} kg
                    </label>
                    <input
                      type="range" min="0" max="50" step="1"
                      value={waterMass}
                      onChange={(e) => { setWaterMass(Number(e.target.value)); playSound('tap'); }}
                      className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                    <div>Resulting Concentrated Acid: <span className="font-bold text-rose-400">{dilutionOutput} kg H₂SO₄</span></div>
                    {waterMass === Math.round((oleumMass / 178) * 18) ? (
                      <div className="text-emerald-400 font-bold mt-1">✓ Perfect Stoichiometric Ratio! Pure 98% Conc. H₂SO₄</div>
                    ) : (
                      <div className="text-amber-400 text-[10px] mt-1">Adjust water to exactly 18 kg per 178 kg Oleum for exact 98% conc.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 4 INTERACTION: Dehydration vs Drying */}
          {activeLabIndex === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Select Organic Compound / Hydrate (Node: c10_chem_068)
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                      { id: 'sugar', label: 'Cane Sugar (C₁₂H₂₂O₁₁)' },
                      { id: 'cuso4', label: 'Blue Vitriol (CuSO₄·5H₂O)' },
                      { id: 'oxalic', label: 'Oxalic Acid (H₂C₂O₄)' },
                      { id: 'ethanol', label: 'Ethanol (C₂H₅OH at 170°C)' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setDehydrationReactant(r.id as 'sugar' | 'cuso4' | 'oxalic' | 'ethanol');
                          setIsDehydrationTriggered(false);
                          playSound('tap');
                        }}
                        className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                          dehydrationReactant === r.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setIsDehydrationTriggered(true);
                      playSound('drop-correct');
                      speakText('Dehydrating action triggered! Concentrated sulphuric acid extracts water elements.');
                    }}
                    className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs hover:bg-amber-400 transition-all shadow-lg"
                  >
                    Pour Concentrated H₂SO₄ Acid 🧪
                  </button>
                </div>

                <div>
                  <DehydrationVisualizerSVG
                    reactant={dehydrationReactant}
                    isReacted={isDehydrationTriggered}
                  />
                </div>
              </div>
            </div>
          )}

          {/* LAB 5 INTERACTION: Acid Volatility & Reactivity */}
          {activeLabIndex === 4 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Preparation of Volatile Acids (Node: c10_chem_070)
                  </h4>

                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => { setPrepAcidType('HCl'); playSound('tap'); }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                        prepAcidType === 'HCl' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Prepare HCl Gas (from NaCl)
                    </button>
                    <button
                      onClick={() => { setPrepAcidType('HNO3'); playSound('tap'); }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all ${
                        prepAcidType === 'HNO3' ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      Prepare HNO₃ Vapor (from KNO₃)
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Retort Temp (°C):</span>
                      <span className={prepTemp > 200 ? 'text-rose-400 font-extrabold' : 'text-emerald-400 font-extrabold'}>
                        {prepTemp}°C
                      </span>
                    </div>
                    <input
                      type="range" min="100" max="350" step="10"
                      value={prepTemp}
                      onChange={(e) => { setPrepTemp(Number(e.target.value)); playSound('tap'); }}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>100°C</span>
                      <span className="text-emerald-400 font-bold">&lt; 200°C Ideal</span>
                      <span>350°C</span>
                    </div>
                  </div>
                </div>

                <div>
                  <NonVolatileAcidPrepSVG acidType={prepAcidType} temperature={prepTemp} />
                </div>
              </div>
            </div>
          )}

          {/* OBSERVATION QUESTIONS SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">
              Lab Observations & Deductions
            </h3>
            {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
              <div key={oIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                <p className="text-xs font-semibold text-slate-200">{obs.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {obs.observableOptions.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => {
                        const updated = [...obsAnswers];
                        updated[oIdx] = optIdx;
                        setObsAnswers(updated);
                        playSound('tap');
                      }}
                      className={`p-2.5 rounded-lg text-xs text-left border ${
                        obsAnswers[oIdx] === optIdx
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const updatedSub = [...obsSubmitted];
                    updatedSub[oIdx] = true;
                    setObsSubmitted(updatedSub);
                    if (obsAnswers[oIdx] === obs.correctIndex) {
                      playSound('drop-correct');
                    } else {
                      playSound('drop-wrong');
                    }
                  }}
                  disabled={obsAnswers[oIdx] === null}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-slate-950 text-xs font-bold hover:bg-emerald-500 disabled:opacity-40"
                >
                  Verify Observation {oIdx + 1}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: 22+ PROGRESSIVE CHALLENGES */}
      {activeTab === 'challenges' && (
        <section className="space-y-6">
          {/* Challenge Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-xl">
            <div>
              <span className={`text-xs font-extrabold uppercase px-2 py-1 rounded-md mr-2 ${
                currentChallenge.difficulty === 'foundation'
                  ? 'bg-blue-900/60 text-blue-300 border border-blue-700'
                  : currentChallenge.difficulty === 'standard'
                  ? 'bg-amber-900/60 text-amber-300 border border-amber-700'
                  : 'bg-purple-900/60 text-purple-300 border border-purple-700'
              }`}>
                {currentChallenge.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Node: {currentChallenge.nodeId} | Competency: {currentChallenge.competencyLevel}
              </span>
            </div>
            <div className="text-xs font-bold text-amber-400">
              Score: {challengeScore} pts
            </div>
          </div>

          {/* Challenge Question Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-base font-bold text-slate-100 leading-snug">
              Q{currentChallengeIndex + 1}. {currentChallenge.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentChallenge.options.map((option, idx) => {
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                if (selectedOption === idx) {
                  btnStyle = 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold';
                }

                if (isChallengeSubmitted) {
                  if (idx === currentChallenge.correctIndex) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-4 rounded-xl text-xs text-left border transition-all ${btnStyle}`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                  </button>
                );
              })}
            </div>

            {/* Submit & Next Control Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowHint((prev) => !prev);
                  setCurrentHintText(currentChallenge.hints[0]);
                  playSound('hint');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all"
              >
                💡 Hint
              </button>

              {!isChallengeSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-40 transition-all shadow-lg"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all shadow-lg"
                >
                  Next Challenge ➔
                </button>
              )}
            </div>

            {/* Explanation box after submission */}
            {isChallengeSubmitted && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                selectedOption === currentChallenge.correctIndex
                  ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-800 text-rose-200'
              }`}>
                <div className="font-bold mb-1">
                  {selectedOption === currentChallenge.correctIndex ? '✓ Correct Explanation:' : '× Review Explanation:'}
                </div>
                {currentChallenge.explanation}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 4: SUMMARY & REAL WORLD ACTIVITY */}
      {activeTab === 'summary' && (
        <section className="space-y-6">
          {/* Real World Activity Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-widest">
              Industrial Case Study & Application
            </div>
            <h3 className="text-base font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                <div key={sIdx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs text-slate-300">
                  <span className="text-rose-400 font-bold">{step.split(':')[0]}:</span> {step.split(':')[1]}
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Clarification Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">
              Common Misconceptions Debunked (ICSE Syllabus)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-rose-400">❌ Myth: {m.myth}</div>
                  <div className="text-xs text-emerald-300">✅ Fact: {m.fact}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Node Mastery Breakdown Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-widest">
              Concept Mastery Profile (BKT Analysis)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {ALL_NODE_IDS.map((nodeId) => {
                const bkt = bktStates[nodeId];
                const level = getMasteryLevel(bkt);
                const pKnown = Math.round(bkt.pKnown * 100);

                return (
                  <div key={nodeId} className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-center">
                    <div className="text-[10px] font-mono text-slate-400 mb-1">{nodeId}</div>
                    <div className="text-xs font-bold text-slate-200 mb-2 truncate">
                      {SUBJECT_CONFIG.chemistry?.nodeTitles?.[nodeId] || nodeId}
                    </div>
                    <div className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded ${
                      level === 'mastered'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                        : level === 'proficient'
                        ? 'bg-amber-950 text-amber-400 border border-amber-700'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {pKnown}% {level}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default C10_ChemistrySulphuricacidContactprocessSim;