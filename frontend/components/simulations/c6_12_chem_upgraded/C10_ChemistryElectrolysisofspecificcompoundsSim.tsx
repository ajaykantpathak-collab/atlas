'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// -----------------------------------------------------------------------------
// CONSTANTS & NODE DEFINITIONS
// -----------------------------------------------------------------------------

const ALL_NODE_IDS = [
  'c10_chem_041',
  'c10_chem_042',
  'c10_chem_043',
  'c10_chem_044',
  'c10_chem_045',
  'c10_chem_046',
  'c10_chem_047',
  'c10_chem_048',
  'c10_chem_049',
  'c10_chem_050',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

type Tier = 'foundation' | 'standard' | 'advanced';
type ChallengeType = 'multiple-choice' | 'numerical' | 'matching' | 'drag-sort';

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: ChallengeType;
  difficulty: Tier;
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  matchingPairs?: { left: string; right: string }[];
  sortItems?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// Mandatory Section 1: SCENARIO
const SCENARIO = {
  title: 'Advanced Electrochemistry & Industrial Electrolysis Simulator',
  intro: 'Welcome to the ICSE Master Electrochemistry Laboratory! Here, you will operate DC electrolytic cells to decompose molten salts, aqueous solutions, and industrial ores under precise current and voltage conditions.',
  context: 'You are tasked with analyzing selective ion discharge, measuring electrode mass deposits according to Faraday\'s Laws, refining copper, electroplating metals, and optimizing the industrial Hall-Héroult extraction process for aluminium.',
};

// Mandatory Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'When an aqueous solution of Sodium Chloride (Brine) is electrolyzed, sodium metal is NOT formed at the cathode. Instead, hydrogen gas is evolved! Why does this happen?',
  options: [
    'Sodium metal reacts instantly with water to dissolve back into sodium ions',
    'Hydrogen ions (H+) have a lower discharge potential than Sodium ions (Na+) and are preferentially reduced',
    'Sodium ions are negatively charged and migrate to the positive anode instead',
    'Water molecules block sodium ions from physically reaching the cathode surface'
  ],
  correctIndex: 1,
  hintAfter: 'According to the Electrochemical Series, cations with lower discharge potential (higher reduction potential) gain electrons more readily. H+ is reduced before Na+ in aqueous solution!',
};

// Mandatory Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Acidified Water Electrolysis',
    instruction: 'Set electrolyte to Acidified Water (H2O + H2SO4) with Platinum electrodes. Observe the 2:1 volume ratio of Hydrogen gas at the cathode versus Oxygen gas at the anode.',
    interactionType: 'select-acidified-water',
    nodeId: 'c10_chem_041' as NodeId,
  },
  {
    title: 'Lab 2: Molten Lead Bromide Decomposition',
    instruction: 'Select Molten Lead Bromide (PbBr2) in a silica crucible with graphite electrodes. Heat to 380°C and observe reddish-brown Bromine fumes at the anode and silvery molten Lead at the cathode.',
    interactionType: 'select-molten-pbbr2',
    nodeId: 'c10_chem_042' as NodeId,
  },
  {
    title: 'Lab 3: Aqueous Copper Sulfate (Inert vs Active Electrodes)',
    instruction: 'Compare CuSO4 with Inert Platinum electrodes against Active Copper electrodes. Observe how the solution color turns pale/acidic with Pt electrodes, but stays vibrant blue with Cu electrodes.',
    interactionType: 'compare-cuso4-electrodes',
    nodeId: 'c10_chem_043' as NodeId,
  },
  {
    title: 'Lab 4: Brine Electrolysis & Selective Discharge',
    instruction: 'Electrolyze concentrated NaCl solution. Verify that H2 evolves at cathode, Cl2 evolves at anode, and NaOH accumulates in the surrounding solution.',
    interactionType: 'select-brine-nacl',
    nodeId: 'c10_chem_045' as NodeId,
  },
  {
    title: 'Lab 5: Faraday\'s Quantitative Electrodeposition & Refining',
    instruction: 'Adjust current (Amperes) and run duration (seconds). Calculate deposited mass (m = Z · I · t) for copper refining and silver electroplating.',
    interactionType: 'faraday-deposition-calc',
    nodeId: 'c10_chem_049' as NodeId,
  },
];

// Mandatory Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you electrolyze aqueous Copper(II) Sulfate solution using active Copper electrodes, what will happen to the mass of the copper anode over time?',
    options: [
      'The anode mass increases as copper ions precipitate on it',
      'The anode mass remains constant while water is oxidized',
      'The anode mass decreases at the exact same rate as mass deposits on the cathode',
      'The anode dissolves into gas bubbles of sulfur dioxide'
    ],
    correctIndex: 2,
    verifyInstruction: 'Switch electrolyte to CuSO4 (Active Cu Electrodes) in the Lab tab and run the current for 100 seconds to inspect mass changes!',
    nodeId: 'c10_chem_044' as NodeId,
  },
  {
    question: 'Predict: Double the current passing through an electrolytic cell for the exact same duration. How does the mass of metal deposited change according to Faraday\'s First Law?',
    options: [
      'The deposited mass quadruples (increases by 4x)',
      'The deposited mass doubles (increases by 2x)',
      'The deposited mass remains unchanged',
      'The deposited mass is halved (decreases by 50%)'
    ],
    correctIndex: 1,
    verifyInstruction: 'Increase current slider from 1.0 A to 2.0 A in the Faraday Depositing tool and check the mass output display.',
    nodeId: 'c10_chem_049' as NodeId,
  },
];

// Mandatory Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the gas volume ratio trapped in the tubes during electrolysis of acidified water?',
    observableOptions: [
      'Cathode gas (H2) volume is twice the Anode gas (O2) volume (2 : 1)',
      'Anode gas (O2) volume is twice the Cathode gas (H2) volume (2 : 1)',
      'Both cathode and anode collect equal volumes of gas (1 : 1)',
      'No gas is evolved at either electrode; only liquid forms'
    ],
    correctIndex: 0,
    nodeId: 'c10_chem_041' as NodeId,
  },
  {
    question: 'What happens to the impurities (Gold, Silver, Platinum) present in impure Blister Copper during electrorefining?',
    observableOptions: [
      'They dissolve completely in acidic copper sulfate solution',
      'They deposit onto the cathode alongside pure copper',
      'They settle at the bottom below the anode as "Anode Mud"',
      'They evaporate into toxic metallic vapors'
    ],
    correctIndex: 2,
    nodeId: 'c10_chem_047' as NodeId,
  },
];

// Mandatory Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Quality Control: Silver Electroplating & Pure Copper Refining',
  description: 'In an industrial electroplating plant, brass spoons are coated with pure silver to protect against corrosion and improve aesthetics. Concurrently, copper refiners purify raw copper from 95% to 99.99% purity using high-current electrolytic baths.',
  steps: [
    'Step 1: Mount the brass spoon as the Cathode (- terminal) and a block of 99.9% pure Silver as the Anode (+ terminal).',
    'Step 2: Submerge both in a solution of Sodium Argentocyanide [NaAg(CN)2] to maintain low Ag+ concentration for smooth coating.',
    'Step 3: Pass a steady DC current of 2.0 Amperes for 9650 seconds (2.68 hours). Electrochemical equivalent of Silver Z = 0.001118 g/C.',
    'Step 4: Calculate mass of Silver deposited: m = Z · I · t = 0.001118 × 2.0 × 9650 = 21.57 grams of pure lustrous silver coating.',
  ],
};

// Misconceptions
const MISCONCEPTIONS = [
  {
    id: 1,
    misconception: 'Pure Water Undergoes Electrolysis Easily Without Adding Any Electrolyte',
    correction: 'Pure water is an extremely weak electrolyte that ionizes negligibly into H+ and OH- ions, making it a poor conductor. Dilute H2SO4 or an ionic salt must be added to provide free mobile ions for conductivity.',
  },
  {
    id: 2,
    misconception: 'Electrolysis of Brine Solution Produces Sodium Metal at Cathode',
    correction: 'In aqueous NaCl, both Na+ and H+ ions compete at the cathode. H+ ions have a lower discharge potential than Na+, so H2 gas is preferentially liberated at the cathode. Molten dry NaCl is required to isolate Na metal.',
  },
  {
    id: 3,
    misconception: 'Blue Color of CuSO4 Solution Stays Constant With Inert Electrodes',
    correction: 'With inert platinum/carbon electrodes, Cu2+ ions are continuously removed at the cathode while OH-/water is oxidized at the anode. As Cu2+ concentration decreases, the deep blue solution fades to clear acidic H2SO4.',
  },
  {
    id: 4,
    misconception: 'Positively Charged Cations Always Migrate to the Positive Anode',
    correction: 'In an electrolytic cell, the cathode is connected to the negative DC terminal and the anode to the positive terminal. Opposites attract, so positively charged cations migrate to the negative cathode.',
  },
  {
    id: 5,
    misconception: 'Mass Deposited at Electrodes Depends Primarily on Applied Voltage',
    correction: 'According to Faraday\'s First Law, mass liberated is directly proportional to electric charge (Q = I · t). Current strength and duration determine mass, whereas voltage merely drives current through cell resistance.',
  },
  {
    id: 6,
    misconception: 'Cryolite is added to Alumina in Hall-Héroult process to act as a chemical catalyst',
    correction: 'Cryolite (Na3AlF6) acts as a solvent that lowers the melting point of Alumina from 2050°C to ~950°C and increases electrical conductivity of the molten mixture.',
  },
];

// -----------------------------------------------------------------------------
// 22+ COMPREHENSIVE CHALLENGES ACROSS 3 TIERS
// -----------------------------------------------------------------------------

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'f1',
    nodeId: 'c10_chem_041',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'During the electrolysis of acidified water, which gas is evolved at the CATHODE (- electrode)?',
    options: ['Oxygen gas (O2)', 'Hydrogen gas (H2)', 'Sulfur dioxide gas (SO2)', 'Nitrogen gas (N2)'],
    correctIndex: 1,
    explanation: 'Hydrogen cations (H+) migrate to the negative cathode, gain electrons (reduction), and form diatomic Hydrogen gas (H2).',
    hints: [
      'Cations move to the Cathode.',
      'Acidified water has H+ ions that gain electrons.',
      'H+ + e- -> H; 2H -> H2 gas at the negative terminal.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'f2',
    nodeId: 'c10_chem_041',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why is a small amount of dilute sulfuric acid added to pure distilled water prior to electrolysis?',
    options: [
      'To prevent the water from boiling',
      'To act as a catalyst that speeds up electrode reactions',
      'To provide sufficient free mobile ions to conduct electric current',
      'To color the water so electrode bubbles are visible'
    ],
    correctIndex: 2,
    explanation: 'Pure water is a very weak electrolyte with negligible ionization. Acidification increases free ion concentration (H+ and SO4 2-), rendering the liquid conducting.',
    hints: [
      'Pure water has almost zero electrical conductivity.',
      'Electrolysis requires free mobile ions.',
      'Sulfuric acid ionizes completely into H+ and SO4 2- ions.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'f3',
    nodeId: 'c10_chem_042',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What material is used for the vessel (crucible) during the electrolysis of molten lead bromide?',
    options: ['Copper beaker', 'Silica crucible', 'Iron flask', 'Glass flask'],
    correctIndex: 1,
    explanation: 'A silica crucible is non-reactive, heat-resistant, and withstands high temperatures (~380°C) required to keep lead bromide molten.',
    hints: [
      'It must withstand temperatures around 380°C.',
      'Glass may crack or react; metals react with molten salts.',
      'Silica is heat resistant and chemically inert to molten PbBr2.'
    ],
  },
  {
    id: 'f4',
    nodeId: 'c10_chem_042',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Observation',
    question: 'What visible product appears at the ANODE (+) during the electrolysis of molten lead bromide?',
    options: [
      'Silvery shiny liquid droplets',
      'Reddish-brown vapors of Bromine gas',
      'Pungent green Chlorine gas',
      'White powdery deposit of Lead oxide'
    ],
    correctIndex: 1,
    explanation: 'Bromide anions (Br-) lose electrons at the anode to form Bromine molecules (Br2), which evolve as reddish-brown vapors.',
    hints: [
      'Br- ions move to the positive anode.',
      'Oxidation of Br- releases elemental Bromine.',
      'Bromine gas has a distinct reddish-brown color.'
    ],
  },
  {
    id: 'f5',
    nodeId: 'c10_chem_043',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'When aqueous CuSO4 is electrolyzed using INERT Platinum electrodes, what gas is evolved at the Anode?',
    options: ['Copper gas', 'Sulfur dioxide (SO2)', 'Oxygen gas (O2)', 'Hydrogen gas (H2)'],
    correctIndex: 2,
    explanation: 'At the anode, OH- ions have a lower discharge potential than SO4 2- ions. OH- ions are preferentially oxidized to liberate Oxygen gas (O2).',
    hints: [
      'Compare SO4 2- and OH- ions.',
      'OH- is discharged more readily than SO4 2-.',
      '4 OH- - 4e- -> 2H2O + O2.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'f6',
    nodeId: 'c10_chem_046',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In electroplating an iron key with copper, where must the iron key be placed in the circuit?',
    options: ['At the positive Anode', 'At the negative Cathode', 'Submerged at the bottom of beaker', 'Connected in series with the switch'],
    correctIndex: 1,
    explanation: 'The article to be plated is ALWAYS placed at the Cathode (-) because positively charged metal cations (Cu2+) migrate to the cathode to receive electrons and deposit as neutral metal.',
    hints: [
      'Metal cations (Cu2+) are positive.',
      'Positive ions migrate to the negative electrode.',
      'Therefore, the object to be coated is the Cathode.'
    ],
  },
  {
    id: 'f7',
    nodeId: 'c10_chem_048',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which cation will be discharged FIRST at the cathode from a mixture of K+, Na+, Cu2+, and H+ ions?',
    options: ['K+', 'Na+', 'H+', 'Cu2+'],
    correctIndex: 3,
    explanation: 'Cu2+ is lowest in the electrochemical series among the four cations, so it has the highest tendency to accept electrons (lowest discharge potential).',
    hints: [
      'Look at position in the electrochemical series of cations.',
      'LBNCA (K, Na, Ca, Mg, Al, Zn, Fe, Pb, H, Cu, Hg, Ag, Au).',
      'Cations lowest in the series gain electrons most easily.'
    ],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 's1',
    nodeId: 'c10_chem_044',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'During electrolysis of aqueous CuSO4 using ACTIVE Copper electrodes, why does the intensity of the blue solution remain UNCHANGED?',
    options: [
      'Copper ions do not participate in the electrode reactions at all',
      'For every Cu2+ ion discharged at the cathode, one Cu2+ ion enters the solution from the copper anode',
      'Water molecules absorb light to maintain the blue appearance',
      'Sulfate ions continuously oxidize into copper ions'
    ],
    correctIndex: 1,
    explanation: 'The active copper anode dissolves (Cu -> Cu2+ + 2e-) at the exact rate that copper deposits on the cathode (Cu2+ + 2e- -> Cu). Concentration of Cu2+ remains constant.',
    hints: [
      'Anode is active copper, not inert platinum.',
      'Anode reaction: Cu -> Cu2+ + 2e-. Cathode reaction: Cu2+ + 2e- -> Cu.',
      'Net concentration of Cu2+ in solution does not change.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 's2',
    nodeId: 'c10_chem_045',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Electrolysis of concentrated NaCl solution (Brine) yields H2 at the cathode and Cl2 at the anode. What solution remains in the cell?',
    options: ['Pure water', 'Sulfuric acid solution', 'Sodium hydroxide (NaOH) solution', 'Hydrochloric acid solution'],
    correctIndex: 2,
    explanation: 'As H+ is discharged at cathode and Cl- is discharged at anode, Na+ and OH- ions remain in the liquid, forming a solution of Sodium Hydroxide (NaOH).',
    hints: [
      'Initial ions present: Na+, Cl-, H+, OH-.',
      'H+ discharged at cathode, Cl- discharged at anode.',
      'Remaining ions in solution are Na+ and OH-.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 's3',
    nodeId: 'c10_chem_047',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In the electrorefining of impure copper, what is selected as the Anode and Cathode?',
    options: [
      'Anode = Pure copper strip; Cathode = Impure blister copper block',
      'Anode = Impure blister copper block; Cathode = Pure copper thin sheet',
      'Anode = Platinum rod; Cathode = Pure copper sheet',
      'Anode = Graphite block; Cathode = Impure copper block'
    ],
    correctIndex: 1,
    explanation: 'The impure copper block is made the Anode so it dissolves into Cu2+ ions. The Cathode is a thin pure copper sheet where pure Cu2+ ions deposit.',
    hints: [
      'The metal to be purified must dissolve.',
      'Dissolution occurs at the positive Anode.',
      'Deposition of pure metal occurs at the negative Cathode.'
    ],
  },
  {
    id: 's4',
    nodeId: 'c10_chem_049',
    type: 'numerical',
    difficulty: 'standard',
    competencyLevel: 'Problem Solving',
    question: 'Calculate the mass of copper (in grams) deposited at the cathode when a steady current of 5.0 Amperes is passed through CuSO4 solution for 1930 seconds. (Z for Cu = 0.000329 g/C)',
    correctAnswer: 3.175,
    tolerance: 0.05,
    unit: 'g',
    explanation: 'Mass m = Z · I · t = 0.000329 g/C × 5.0 A × 1930 s = 3.17485 g ≈ 3.175 g.',
    hints: [
      'Use Faraday\'s First Law equation: m = Z × I × t.',
      'Multiply Electrochemical Equivalent Z by Current I (in A) and Time t (in s).',
      'm = 0.000329 × 5 × 1930.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 's5',
    nodeId: 'c10_chem_048',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which list places anions in correct order of INCREASING ease of discharge (lowest to highest discharge potential)?',
    options: [
      'OH- < Cl- < Br- < SO4 2-',
      'SO4 2- < NO3 - < OH- < Cl- < Br- < I-',
      'I- < Br- < Cl- < OH- < NO3 - < SO4 2-',
      'Cl- < OH- < SO4 2- < NO3 -'
    ],
    correctIndex: 1,
    explanation: 'Anion discharge ease increases down the series: SO4 2- < NO3 - < OH- < Cl- < Br- < I-. Sulfate is hardest to discharge, Iodide is easiest.',
    hints: [
      'SO4 2- and NO3 - are very stable and rarely discharged in aqueous solution.',
      'OH- discharges before SO4 2-.',
      'Halides (Cl-, Br-, I-) discharge more easily as ion size increases.'
    ],
  },
  {
    id: 's6',
    nodeId: 'c10_chem_050',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Recall',
    question: 'What is the primary role of Cryolite (Na3AlF6) and Fluorspar (CaF2) added to purified Alumina (Al2O3) in the Hall-Héroult Process?',
    options: [
      'To increase the density of the bath so aluminium floats',
      'To lower the melting point of Alumina from 2050°C to ~950°C and enhance electrical conductivity',
      'To act as oxidizing agents that convert alumina into aluminium metal',
      'To prevent the carbon anode rods from burning'
    ],
    correctIndex: 1,
    explanation: 'Pure Alumina melts at an extremely high temperature (2050°C) and is a poor conductor. Adding Cryolite and Fluorspar lowers melting point to ~950°C and increases conductivity drastically.',
    hints: [
      'Pure Alumina melts at over 2000°C which requires massive energy.',
      'Cryolite acts as a solvent.',
      'Fluorspar increases fluidity and conductivity.'
    ],
    misconceptionIndex: 5,
  },
  {
    id: 's7',
    nodeId: 'c10_chem_043',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What happens to the pH of aqueous CuSO4 solution when electrolyzed using Platinum electrodes?',
    options: ['pH increases (becomes basic)', 'pH remains exactly 7.0 (neutral)', 'pH decreases (becomes acidic)', 'pH fluctuates randomly'],
    correctIndex: 2,
    explanation: 'Cu2+ and OH- ions are removed. H+ ions and SO4 2- ions remain in solution, forming Sulfuric Acid (H2SO4). Excess H+ ions cause the pH to drop.',
    hints: [
      'Cu2+ deposits at cathode. OH- is discharged at anode as O2.',
      'H+ from water and SO4 2- remain in solution.',
      'Formation of H2SO4 increases acidity, dropping pH.'
    ],
  },
  {
    id: 's8',
    nodeId: 'c10_chem_046',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why must a DIRECT CURRENT (DC) source be used for electroplating instead of Alternating Current (AC)?',
    options: [
      'AC current is too dangerous for lab solutions',
      'AC causes rapid reversal of electrode polarity, so metal deposits in one half-cycle and redissolves in the next',
      'DC current produces heat while AC cools the solution',
      'AC current neutralizes electrolyte ions into neutral atoms instantly'
    ],
    correctIndex: 1,
    explanation: 'DC maintains fixed polarity (cathode negative, anode positive). AC reverses polarity 50-60 times per second, causing metal to deposit then immediately dissolve, resulting in no net plating.',
    hints: [
      'Consider what AC current does to positive and negative terminals.',
      'AC flips cathode and anode back and forth.',
      'Deposition requires continuous cathode reduction.'
    ],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'a1',
    nodeId: 'c10_chem_049',
    type: 'numerical',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'The same electric quantity (charge Q) passes through two electrolytic cells in series: Cell A contains CuSO4 (Cu2+) and Cell B contains AgNO3 (Ag+). If 1.5875 g of Cu is deposited, how many grams of Ag will deposit? (Atomic weights: Cu = 63.5, Ag = 108)',
    correctAnswer: 5.40,
    tolerance: 0.1,
    unit: 'g',
    explanation: 'According to Faraday\'s Second Law, (m1 / m2) = (E1 / E2). Equivalent weight E(Cu) = 63.5 / 2 = 31.75. E(Ag) = 108 / 1 = 108. m(Ag) = 1.5875 × (108 / 31.75) = 5.40 g.',
    hints: [
      'Apply Faraday\'s Second Law: m1 / m2 = E1 / E2.',
      'Chemical Equivalent E = Atomic Mass / Valency.',
      'E(Cu) = 63.5 / 2 = 31.75; E(Ag) = 108 / 1 = 108.'
    ],
  },
  {
    id: 'a2',
    nodeId: 'c10_chem_050',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In the Hall-Héroult Process, why must the carbon anode blocks be continuously replaced during industrial operation?',
    options: [
      'The carbon anodes melt into the molten aluminium bath',
      'Oxygen gas liberated at the anode reacts with carbon at high temperature (~950°C) to form CO and CO2 gases',
      'Aluminium metal coats the anode and stops current flow',
      'Cryolite reacts with carbon to produce synthetic diamond'
    ],
    correctIndex: 1,
    explanation: 'At ~950°C, oxygen evolved at the anode (2O 2- -> O2 + 4e-) reacts with the graphite carbon rods: C + O2 -> CO2 and C + 1/2 O2 -> CO. The anodes burn away gradually.',
    hints: [
      'Anode product is Oxygen gas.',
      'The cell operates at 950°C with graphite (carbon) anodes.',
      'Carbon + Oxygen at high temperature -> Carbon dioxide gas.'
    ],
  },
  {
    id: 'a3',
    nodeId: 'c10_chem_048',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Electrolysis of DILUTE NaCl vs CONCENTRATED NaCl (Brine) with platinum electrodes produces different anode products. What is liberated at the anode for DILUTE NaCl?',
    options: [
      'Chlorine gas (Cl2) because Cl- concentration is high',
      'Oxygen gas (O2) because OH- is preferentially discharged over low concentration Cl-',
      'Sodium metal vapor (Na)',
      'Hydrogen gas (H2)'
    ],
    correctIndex: 1,
    explanation: 'In dilute NaCl, OH- concentration relative to Cl- is significant and OH- has a lower discharge potential than Cl-, liberating Oxygen. In concentrated brine, high Cl- concentration overcomes potential difference to liberate Cl2.',
    hints: [
      'Discharge of ions depends on concentration factor.',
      'In dilute solution, Cl- concentration is very low.',
      'OH- from water is preferentially discharged yielding Oxygen gas.'
    ],
  },
  {
    id: 'a4',
    nodeId: 'c10_chem_042',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    sortItems: [
      'Heat silica crucible containing solid PbBr2 to ~380°C until melted',
      'Insert inert graphite electrodes into molten PbBr2 liquid',
      'Connect electrodes to DC battery source and turn on current',
      'Pb2+ cations migrate to cathode gaining electrons to form lead metal',
      'Br- anions migrate to anode losing electrons to release Br2 vapors'
    ],
    question: 'Arrange the sequential operational steps of Molten Lead Bromide Electrolysis from start to finish:',
    explanation: 'Solid PbBr2 must first be melted to free mobile ions. Electrodes are inserted, DC applied, and cations/anions migrate to respective electrodes to undergo reduction and oxidation.',
    hints: [
      'Solid PbBr2 does not conduct; it must first be melted.',
      'After melting, electrodes are inserted and powered.',
      'Reduction at cathode and oxidation at anode occur simultaneously.'
    ],
  },
  {
    id: 'a5',
    nodeId: 'c10_chem_047',
    type: 'matching',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    matchingPairs: [
      { left: 'Anode in Copper Refining', right: 'Impure Blister Copper block' },
      { left: 'Cathode in Copper Refining', right: 'Thin sheet of 99.99% Pure Copper' },
      { left: 'Electrolyte in Copper Refining', right: 'Aqueous CuSO4 + Dilute H2SO4' },
      { left: 'Anode Mud Components', right: 'Insoluble Gold, Silver, Platinum particles' }
    ],
    question: 'Match each component of the Copper Electrorefining cell with its correct material or composition:',
    explanation: 'Impure copper dissolves at anode; pure copper deposits at cathode; CuSO4/H2SO4 provides Cu2+ transport; noble metals fall as anode mud.',
    hints: [
      'Impure metal is anode; pure sheet is cathode.',
      'Noble impurities (Ag, Au) do not oxidize and sink to bottom.'
    ],
  },
  {
    id: 'a6',
    nodeId: 'c10_chem_049',
    type: 'numerical',
    difficulty: 'advanced',
    competencyLevel: 'Problem Solving',
    question: 'How many Coulombs of electric charge (Q = I · t) are required to deposit 1 mole of aluminium metal (Al) from molten Al2O3 in the Hall-Héroult cell? (1 Faraday = 96,500 Coulombs)',
    correctAnswer: 289500,
    tolerance: 100,
    unit: 'C',
    explanation: 'Aluminium ion reduction: Al3+ + 3e- -> Al. Depositing 1 mole of Al requires 3 moles of electrons. Q = 3 × 96,500 C = 289,500 Coulombs.',
    hints: [
      'Determine valency of Aluminium in Al2O3 (Al3+).',
      'Each Al3+ ion requires 3 electrons to reduce to neutral Al atom.',
      '1 mole of electrons = 1 Faraday = 96,500 C. 3 moles = 3 × 96,500 C.'
    ],
  },
  {
    id: 'a7',
    nodeId: 'c10_chem_041',
    type: 'numerical',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'During electrolysis of acidified water, 40.0 cm³ of Hydrogen gas is collected at the cathode. What volume of Oxygen gas (in cm³) is collected at the anode at the same temperature and pressure?',
    correctAnswer: 20.0,
    tolerance: 0.1,
    unit: 'cm³',
    explanation: 'Overall stoichiometry: 2 H2O -> 2 H2 + O2. The mole ratio (and volume ratio of gases) H2 : O2 is 2 : 1. Volume of O2 = 40.0 / 2 = 20.0 cm³.',
    hints: [
      'Recall balanced equation for water decomposition: 2H2O -> 2H2 + O2.',
      'Volume ratio of Hydrogen to Oxygen is 2 : 1.',
      'Divide Cathode gas volume by 2.'
    ],
  },
];

// -----------------------------------------------------------------------------
// SVG DIAGRAM COMPONENTS (Section 8)
// -----------------------------------------------------------------------------

const AcidifiedWaterVoltameterSVG: React.FC<{ active: boolean; currentVal: number }> = ({ active, currentVal }) => {
  return (
    <svg viewBox="0 0 500 360" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg">
      <defs>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="ptGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
      </defs>

      {/* Outer Voltameter Tube Frame */}
      <rect x="50" y="40" width="400" height="280" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="250" y="30" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold tracking-wider">
        HOFMANN VOLTAMETER (Acidified Water Electrolysis)
      </text>

      {/* Central Reservoir & Two Side Tubes */}
      {/* Left Tube (Cathode - H2) */}
      <rect x="110" y="70" width="50" height="200" rx="6" fill="url(#waterGrad)" stroke="#38bdf8" strokeWidth="2" />
      {/* Right Tube (Anode - O2) */}
      <rect x="340" y="70" width="50" height="200" rx="6" fill="url(#waterGrad)" stroke="#38bdf8" strokeWidth="2" />
      {/* Central Reservoir */}
      <rect x="225" y="60" width="50" height="180" rx="6" fill="url(#waterGrad)" stroke="#38bdf8" strokeWidth="2" />
      <path d="M 160 230 L 225 230 M 275 230 L 340 230" stroke="#38bdf8" strokeWidth="12" strokeLinecap="round" />

      {/* Gas Space Left (Cathode H2 - 2 Volume Units) */}
      <rect x="112" y="72" width="46" height="60" fill="#0f172a" opacity="0.9" />
      <text x="135" y="105" fill="#a7f3d0" textAnchor="middle" className="text-xs font-bold">H₂ Gas</text>
      <text x="135" y="120" fill="#a7f3d0" textAnchor="middle" className="text-[10px]">Vol: 2x</text>

      {/* Gas Space Right (Anode O2 - 1 Volume Unit) */}
      <rect x="342" y="72" width="46" height="30" fill="#0f172a" opacity="0.9" />
      <text x="365" y="90" fill="#fef08a" textAnchor="middle" className="text-xs font-bold">O₂ Gas</text>
      <text x="365" y="102" fill="#fef08a" textAnchor="middle" className="text-[10px]">Vol: 1x</text>

      {/* Electrodes */}
      {/* Platinum Cathode (-) */}
      <rect x="128" y="210" width="14" height="50" fill="url(#ptGrad)" stroke="#e2e8f0" strokeWidth="1" />
      <text x="135" y="275" fill="#f43f5e" textAnchor="middle" className="text-xs font-extrabold">CATHODE (-)</text>

      {/* Platinum Anode (+) */}
      <rect x="358" y="210" width="14" height="50" fill="url(#ptGrad)" stroke="#e2e8f0" strokeWidth="1" />
      <text x="365" y="275" fill="#22c55e" textAnchor="middle" className="text-xs font-extrabold">ANODE (+)</text>

      {/* Animated Bubbles if active */}
      {active && (
        <>
          <circle cx="132" cy="190" r="3" fill="#6ee7b7" className="animate-ping" />
          <circle cx="140" cy="170" r="4" fill="#6ee7b7" className="animate-ping" />
          <circle cx="130" cy="150" r="3.5" fill="#6ee7b7" className="animate-ping" />

          <circle cx="360" cy="195" r="2.5" fill="#fde047" className="animate-ping" />
          <circle cx="368" cy="175" r="3" fill="#fde047" className="animate-ping" />
        </>
      )}

      {/* Battery Connections */}
      <path d="M 135 280 L 135 310 L 210 310" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="4" />
      <path d="M 365 280 L 365 310 L 290 310" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="4" />
      {/* Battery Cell Icon */}
      <rect x="210" y="295" width="80" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
      <text x="250" y="315" fill="#f59e0b" textAnchor="middle" className="text-xs font-bold">DC Power {currentVal}A</text>
    </svg>
  );
};

const MoltenLeadBromideCellSVG: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <svg viewBox="0 0 500 360" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg">
      <text x="250" y="30" fill="#fb923c" textAnchor="middle" className="text-sm font-bold tracking-wider">
        ELECTROLYSIS OF MOLTEN LEAD BROMIDE (PbBr₂)
      </text>

      {/* Silica Crucible */}
      <path d="M 130 110 L 160 270 Q 250 290 340 270 L 370 110 Z" fill="#334155" stroke="#94a3b8" strokeWidth="3" />

      {/* Molten Electrolyte (Orange/Brown Liquid) */}
      <path d="M 142 160 Q 250 165 358 160 L 340 270 Q 250 288 160 270 Z" fill="#ea580c" opacity="0.85" />
      <text x="250" y="210" fill="#ffedd5" textAnchor="middle" className="text-xs font-bold">Molten PbBr₂ (380°C)</text>

      {/* Silvery Molten Lead Layer at Bottom of Cathode */}
      <ellipse cx="200" cy="262" rx="35" ry="10" fill="#cbd5e1" stroke="#94a3b8" />
      <text x="200" y="265" fill="#0f172a" textAnchor="middle" className="text-[10px] font-extrabold">Pb Liquid</text>

      {/* Graphite Electrodes */}
      {/* Cathode (-) */}
      <rect x="190" y="80" width="20" height="170" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <text x="200" y="70" fill="#f43f5e" textAnchor="middle" className="text-xs font-bold">Cathode (-)</text>

      {/* Anode (+) */}
      <rect x="290" y="80" width="20" height="170" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
      <text x="300" y="70" fill="#22c55e" textAnchor="middle" className="text-xs font-bold">Anode (+)</text>

      {/* Reddish-Brown Vapors of Bromine at Anode */}
      {active && (
        <g className="animate-pulse">
          <circle cx="300" cy="130" r="14" fill="#7c2d12" opacity="0.6" />
          <circle cx="315" cy="110" r="18" fill="#9a3412" opacity="0.5" />
          <circle cx="290" cy="95" r="22" fill="#c2410c" opacity="0.4" />
          <text x="330" y="90" fill="#fdba74" className="text-xs font-bold">Br₂ Vapors</text>
        </g>
      )}

      {/* Bunsen Burner Flame under Crucible */}
      <path d="M 230 340 L 250 290 L 270 340 Z" fill="#38bdf8" opacity="0.9" />
      <path d="M 240 340 L 250 305 L 260 340 Z" fill="#fde047" opacity="0.9" />
      <text x="250" y="355" fill="#94a3b8" textAnchor="middle" className="text-[11px]">Heat Source (Bunsen Burner)</text>
    </svg>
  );
};

const ElectrorefiningCuSVG: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <svg viewBox="0 0 500 360" className="w-full h-auto bg-slate-900 rounded-xl shadow-lg">
      <text x="250" y="30" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold tracking-wider">
        ELECTROREFINING OF IMPURE COPPER
      </text>

      {/* Tank Container */}
      <rect x="70" y="70" width="360" height="230" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="3" />

      {/* Electrolyte Solution (CuSO4 + Dilute H2SO4 - Blue) */}
      <rect x="80" y="120" width="340" height="170" fill="#0284c7" opacity="0.65" rx="6" />
      <text x="250" y="145" fill="#e0f2fe" textAnchor="middle" className="text-xs font-bold">Aqueous CuSO₄ + H₂SO₄</text>

      {/* Impure Blister Copper Anode (+) */}
      <rect x="140" y="90" width="40" height="170" fill="#b45309" stroke="#d97706" strokeWidth="2" />
      <text x="160" y="82" fill="#22c55e" textAnchor="middle" className="text-xs font-bold">Impure Anode (+)</text>

      {/* Thin Pure Copper Cathode (-) */}
      <rect x="320" y="90" width="16" height="170" fill="#f97316" stroke="#fb923c" strokeWidth="2" />
      <text x="328" y="82" fill="#f43f5e" textAnchor="middle" className="text-xs font-bold">Pure Cathode (-)</text>

      {/* Ions migrating */}
      {active && (
        <g>
          <path d="M 190 180 Q 250 160 310 180" fill="none" stroke="#fef08a" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
          <circle cx="250" cy="170" r="8" fill="#ea580c" />
          <text x="250" y="173" fill="#ffffff" textAnchor="middle" className="text-[9px] font-bold">Cu²⁺</text>
        </g>
      )}

      {/* Anode Mud at Bottom under Anode */}
      <ellipse cx="160" cy="285" rx="35" ry="8" fill="#71717a" stroke="#a1a1aa" />
      <text x="160" y="288" fill="#f4f4f5" textAnchor="middle" className="text-[10px] font-bold">Anode Mud (Au, Ag, Pt)</text>
    </svg>
  );
};

// -----------------------------------------------------------------------------
// INTERACTIVE CANVAS ANIMATED VISUALIZER (Section 8 + Exploration Labs)
// -----------------------------------------------------------------------------

interface ElectrolysisCanvasProps {
   electrolyte: string;
   electrodeType: 'inert' | 'active';
   current: number; // Amperes
   isRunning: boolean;
   onTick?: (depositedMassGrams: number, elapsedSec: number) => void;
}

const ElectrolysisCanvas: React.FC<ElectrolysisCanvasProps> = ({
  electrolyte,
  electrodeType,
  current,
  isRunning,
  onTick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const elapsedRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Particles state for ion migration & gas bubbles
  const particlesRef = useRef<
    { x: number; y: number; vx: number; vy: number; type: 'cation' | 'anion' | 'bubbleCathode' | 'bubbleAnode'; label: string; color: string }[]
  >([]);

  // Initialize ions based on selected electrolyte
  useEffect(() => {
    const p: { x: number; y: number; vx: number; vy: number; type: 'cation' | 'anion' | 'bubbleCathode' | 'bubbleAnode'; label: string; color: string }[] = [];
    let catLabel = 'H+';
    let catColor = '#6ee7b7';
    let anLabel = 'OH-';
    let anColor = '#fde047';

    if (electrolyte === 'acidified_water') {
      catLabel = 'H+';
      catColor = '#38bdf8';
      anLabel = 'OH-';
      anColor = '#facc15';
    } else if (electrolyte === 'molten_pbbr2') {
      catLabel = 'Pb2+';
      catColor = '#cbd5e1';
      anLabel = 'Br-';
      anColor = '#ea580c';
    } else if (electrolyte.includes('cuso4')) {
      catLabel = 'Cu2+';
      catColor = '#f97316';
      anLabel = 'SO4 2-';
      anColor = '#a855f7';
    } else if (electrolyte === 'brine_nacl') {
      catLabel = 'Na+ / H+';
      catColor = '#38bdf8';
      anLabel = 'Cl-';
      anColor = '#84cc16';
    }

    for (let i = 0; i < 24; i++) {
      p.push({
        x: 120 + Math.random() * 260,
        y: 120 + Math.random() * 120,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        type: i % 2 === 0 ? 'cation' : 'anion',
        label: i % 2 === 0 ? catLabel : anLabel,
        color: i % 2 === 0 ? catColor : anColor,
      });
    }
    particlesRef.current = p;
  }, [electrolyte]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isRunning) {
        elapsedRef.current += dt;
        // Z values for copper, lead, hydrogen, silver, etc.
        const Z = electrolyte.includes('cuso4') ? 0.000329 : electrolyte === 'molten_pbbr2' ? 0.001072 : 0.0000104;
        const mass = Z * current * elapsedRef.current;
        if (onTick) onTick(mass, Math.floor(elapsedRef.current));
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Lab Bench
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glass Beaker / Cell Vessel
      ctx.fillStyle = electrolyte === 'acidified_water' ? 'rgba(14, 165, 233, 0.25)' :
                      electrolyte === 'molten_pbbr2' ? 'rgba(234, 88, 12, 0.45)' :
                      electrolyte.includes('cuso4') ? (electrodeType === 'inert' ? `rgba(2, 132, 199, ${Math.max(0.15, 0.7 - elapsedRef.current * 0.005)})` : 'rgba(2, 132, 199, 0.75)') :
                      'rgba(56, 189, 248, 0.3)';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;

      ctx.beginPath();
      ctx.roundRect(80, 80, 340, 200, 16);
      ctx.fill();
      ctx.stroke();

      // Liquid Surface Line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(85, 110);
      ctx.lineTo(415, 110);
      ctx.stroke();

      // Left Cathode (- terminal)
      ctx.fillStyle = electrodeType === 'active' ? '#ea580c' : '#475569';
      ctx.fillRect(130, 60, 24 + (isRunning && electrolyte.includes('cuso4') ? Math.min(12, elapsedRef.current * 0.1) : 0), 200);
      ctx.fillStyle = '#f43f5e';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('CATHODE (-)', 105, 50);

      // Right Anode (+ terminal)
      ctx.fillStyle = electrodeType === 'active' ? '#ea580c' : '#475569';
      const anodeWidth = electrodeType === 'active' && isRunning ? Math.max(8, 24 - elapsedRef.current * 0.1) : 24;
      ctx.fillRect(346, 60, anodeWidth, 200);
      ctx.fillStyle = '#22c55e';
      ctx.fillText('ANODE (+)', 340, 50);

      // Wire Connections to DC Source
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(142, 60);
      ctx.lineTo(142, 25);
      ctx.lineTo(210, 25);
      ctx.stroke();

      ctx.strokeStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(358, 60);
      ctx.lineTo(358, 25);
      ctx.lineTo(290, 25);
      ctx.stroke();

      // DC Source Box
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.fillRect(210, 10, 80, 30);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`DC ${current.toFixed(1)} A`, 225, 30);

      // Render & Update Particles (Ions & Gas Bubbles)
      particlesRef.current.forEach((pt) => {
        if (isRunning) {
          // Cations drift left to Cathode (x ~ 150)
          if (pt.type === 'cation') {
            pt.x += (150 - pt.x) * 0.02 + pt.vx;
            pt.y += pt.vy;
            if (pt.x <= 155) {
              pt.x = 200 + Math.random() * 100;
              pt.y = 120 + Math.random() * 120;
            }
          }
          // Anions drift right to Anode (x ~ 340)
          else if (pt.type === 'anion') {
            pt.x += (340 - pt.x) * 0.02 + pt.vx;
            pt.y += pt.vy;
            if (pt.x >= 335) {
              pt.x = 150 + Math.random() * 100;
              pt.y = 120 + Math.random() * 120;
            }
          }
        }

        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px sans-serif';
        ctx.fillText(pt.label, pt.x - 8, pt.y - 8);
      });

      // Spawn Bubbles if running
      if (isRunning && Math.random() < 0.3) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(142 + (Math.random() - 0.5) * 20, 240 - Math.random() * 100, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = electrolyte === 'molten_pbbr2' ? 'rgba(234, 88, 12, 0.7)' : 'rgba(250, 204, 21, 0.7)';
        ctx.beginPath();
        ctx.arc(358 + (Math.random() - 0.5) * 20, 240 - Math.random() * 100, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [electrolyte, electrodeType, current, isRunning, onTick]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <canvas ref={canvasRef} width={500} height={300} className="w-full max-w-xl rounded-xl shadow-2xl bg-slate-900 border border-slate-700" />
    </div>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT CLASS / FUNCTION
// -----------------------------------------------------------------------------

export default function C10_ChemistryElectrolysisofspecificcompoundsSim() {
  // Navigation Tabs: discovery -> lab -> challenges -> summary
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab Controls State
  const [electrolyte, setElectrolyte] = useState<string>('acidified_water');
  const [electrodeType, setElectrodeType] = useState<'inert' | 'active'>('inert');
  const [current, setCurrent] = useState<number>(2.0); // Amperes
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [depositedMass, setDepositedMass] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Discovery / Prediction / Observation State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionChecked, setPredictionChecked] = useState<boolean[]>([false, false]);

  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationChecked, setObservationChecked] = useState<boolean[]>([false, false]);

  // Challenge Mode State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [userMcqOption, setUserMcqOption] = useState<number | null>(null);
  const [userNumInput, setUserNumInput] = useState<string>('');
  const [userSortOrder, setUserSortOrder] = useState<string[]>([]);
  const [userMatching, setUserMatching] = useState<{ [key: string]: string }>({});

  const [challengeStatus, setChallengeStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [challengeScore, setChallengeScore] = useState<number>(0);

  // Sim Feedback Component States
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Node BKT / Mastery State
  const [bktStates, setBktStates] = useState<{ [key in NodeId]: ReturnType<typeof createBKTState> }>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as { [key in NodeId]: ReturnType<typeof createBKTState> };
  });

  const [reviewItems, setReviewItems] = useState(() => {
    return ALL_NODE_IDS.map((id) => createReviewItem(id));
  });

  // Active Challenge object
  const activeChallenge = CHALLENGES[currentChallengeIdx];

  // Auto-hint Ref Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && challengeStatus === 'unanswered') {
        setCurrentHint(activeChallenge.hints[0] || 'Think about electrode charges and selective discharge!');
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Here is a helpful hint for this electrolysis problem.');
      }
    }, 10000); // 10s auto hint
  }, [activeTab, challengeStatus, activeChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetInactivityTimer]);

  // Initialize sort items when drag-sort challenge loads
  useEffect(() => {
    if (activeChallenge.type === 'drag-sort' && activeChallenge.sortItems) {
      setUserSortOrder([...activeChallenge.sortItems].sort(() => Math.random() - 0.5));
    }
  }, [currentChallengeIdx, activeChallenge]);

  // Handlers for Interactive Lab
  const handleToggleRun = () => {
    if (!isRunning) {
      audioManager.play('pickup');
      speechManager.speak('Starting direct electric current flow through the electrolytic bath.');
    } else {
      audioManager.play('drop-correct');
    }
    setIsRunning(!isRunning);
  };

  const handleResetLab = () => {
    audioManager.play('whoosh');
    setIsRunning(false);
    setDepositedMass(0);
    setElapsedSeconds(0);
  };

  const handleLabTick = useCallback((massGrams: number, elapsedSec: number) => {
    setDepositedMass(massGrams);
    setElapsedSeconds(elapsedSec);
  }, []);

  // Handlers for Discovery Question
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Hydrogen ions have a lower discharge potential than sodium ions.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the selective discharge series for cations in water.');
    }
  };

  // Handlers for Challenge Submission
  const handleCheckChallenge = () => {
    let isCorrect = false;

    if (activeChallenge.type === 'multiple-choice') {
      isCorrect = userMcqOption === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'numerical') {
      const val = parseFloat(userNumInput);
      if (!isNaN(val) && activeChallenge.correctAnswer !== undefined) {
        const tol = activeChallenge.tolerance || 0.01;
        isCorrect = Math.abs(val - activeChallenge.correctAnswer) <= tol;
      }
    } else if (activeChallenge.type === 'drag-sort') {
      if (activeChallenge.sortItems) {
        isCorrect = userSortOrder.every((item, idx) => item === activeChallenge.sortItems![idx]);
      }
    } else if (activeChallenge.type === 'matching') {
      if (activeChallenge.matchingPairs) {
        isCorrect = activeChallenge.matchingPairs.every(
          (pair) => userMatching[pair.left] === pair.right
        );
      }
    }

    // Update BKT & SM2
    const currentBKT = bktStates[activeChallenge.nodeId];
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [activeChallenge.nodeId]: updatedBKT }));

    const revItem = reviewItems.find((it) => it.nodeId === activeChallenge.nodeId) || createReviewItem(activeChallenge.nodeId);
    const updatedSM2 = sm2Update(revItem, isCorrect ? 5 : 1);
    setReviewItems((prev) => prev.map((it) => (it.nodeId === activeChallenge.nodeId ? updatedSM2 : it)));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('chime');
      speechManager.speak('Excellent work! You answered correctly.');
      setChallengeStatus('correct');
      setChallengeScore((prev) => prev + 10);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      if (currentChallengeIdx === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have mastered all ICSE electrolysis challenges.');
        recordGameScore('c10_chem_electrolysis', challengeScore + 10);
      }
    } else {
      audioManager.play('error');
      speechManager.speak('That answer is incorrect. Review the hints and explanation.');
      setChallengeStatus('incorrect');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('swoop');
    setUserMcqOption(null);
    setUserNumInput('');
    setUserSortOrder([]);
    setUserMatching({});
    setChallengeStatus('unanswered');
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    }
  };

  // Render Header & Navigation
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Top Bar Header */}
      <header className="max-w-6xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              ICSE Class 10 Chemistry
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-wider">
              Nodes 041 - 050
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            {SCENARIO.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">{SCENARIO.context}</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('discovery'); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'discovery' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('lab'); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'lab' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Interactive Lab
          </button>
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('challenges'); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'challenges' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => { audioManager.play('tap'); setActiveTab('summary'); }}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'summary' ? 'bg-gold-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Real-World & Mastery
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto">
        {/* TAB 1: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Narrative Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-2">Lab Scenario Briefing</h2>
              <p className="text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-lg font-bold text-white">Discovery Problem: The Brine Paradox</h3>
              </div>

              <p className="text-slate-200 font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { audioManager.play('tap'); setDiscoverySelected(idx); }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      discoverySelected === idx
                        ? 'bg-gold-950/60 border-gold-500 text-white shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        discoverySelected === idx ? 'bg-gold-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelected === null || discoverySubmitted}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Confirm Answer
                </button>

                {discoverySubmitted && (
                  <p className="text-sm font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-lg">
                    {DISCOVERY_QUESTION.hintAfter}
                  </p>
                )}
              </div>
            </div>

            {/* MANDATORY PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4">Pre-Lab Hypothesis & Predictions</h3>

              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-800/50 border border-slate-700/50 p-5 rounded-xl">
                    <p className="font-bold text-white mb-3">{pIdx + 1}. {pred.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            const updated = [...predictionAnswers];
                            updated[pIdx] = oIdx;
                            setPredictionAnswers(updated);
                          }}
                          className={`p-3 rounded-lg text-xs font-semibold text-left border transition-all ${
                            predictionAnswers[pIdx] === oIdx
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          const updated = [...predictionChecked];
                          updated[pIdx] = true;
                          setPredictionChecked(updated);
                          if (predictionAnswers[pIdx] === pred.correctIndex) {
                            audioManager.play('success');
                          } else {
                            audioManager.play('error');
                          }
                        }}
                        disabled={predictionAnswers[pIdx] === null}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg"
                      >
                        Verify Hypothesis
                      </button>

                      {predictionChecked[pIdx] && (
                        <span className={`text-xs font-bold ${predictionAnswers[pIdx] === pred.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {predictionAnswers[pIdx] === pred.correctIndex ? '✓ Correct Hypothesis!' : '✗ Re-evaluate formulation.'} — {pred.verifyInstruction}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LAB */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lab Setup Controls (Left Column) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4">Electrolytic Cell Controls</h3>

                {/* Electrolyte Selection */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Electrolyte Bath Solution</label>
                  <select
                    value={electrolyte}
                    onChange={(e) => { audioManager.play('tap'); setElectrolyte(e.target.value); }}
                    className="w-full bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl p-3 focus:outline-none focus:border-gold-500"
                  >
                    <option value="acidified_water">Acidified Water (H2O + H2SO4)</option>
                    <option value="molten_pbbr2">Molten Lead Bromide (PbBr2 at 380°C)</option>
                    <option value="cuso4_inert">Aqueous CuSO4 (Platinum Electrodes)</option>
                    <option value="cuso4_active">Aqueous CuSO4 (Active Copper Electrodes)</option>
                    <option value="brine_nacl">Concentrated NaCl (Brine Solution)</option>
                  </select>
                </div>

                {/* Electrode Type Selector */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Electrode Material</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { audioManager.play('tap'); setElectrodeType('inert'); }}
                      className={`p-3 rounded-xl font-bold text-xs border transition-all ${
                        electrodeType === 'inert' ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Inert (Pt / Carbon)
                    </button>
                    <button
                      onClick={() => { audioManager.play('tap'); setElectrodeType('active'); }}
                      className={`p-3 rounded-xl font-bold text-xs border transition-all ${
                        electrodeType === 'active' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Active (Copper)
                    </button>
                  </div>
                </div>

                {/* Direct Current Slider */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-400 uppercase">DC Current Intensity</span>
                    <span className="text-gold-400 font-mono text-sm">{current.toFixed(1)} Amperes</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.5"
                    value={current}
                    onChange={(e) => setCurrent(parseFloat(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>

                {/* Run / Stop & Reset Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleToggleRun}
                    className={`flex-1 py-3 font-bold text-white rounded-xl shadow-lg transition-all ${
                      isRunning ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'
                    }`}
                  >
                    {isRunning ? 'Stop Current' : 'Apply DC Power'}
                  </button>
                  <button
                    onClick={handleResetLab}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-700"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Data Instrumentation Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-2 gap-4">
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Elapsed Time</span>
                  <p className="text-xl font-mono font-bold text-gold-400">{elapsedSeconds} s</p>
                </div>
                <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Deposited Mass (Faraday)</span>
                  <p className="text-xl font-mono font-bold text-emerald-400">{depositedMass.toFixed(4)} g</p>
                </div>
              </div>

              {/* MANDATORY EXPLORATION STEPS MAP */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Guided Interactive Labs</h4>
                {EXPLORATION_STEPS.map((step, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/40 text-xs">
                    <span className="font-bold text-gold-400">{step.title}</span>
                    <p className="text-slate-300 mt-1">{step.instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas & Dynamic SVG Diagrams (Right Column) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Live Electrolytic Visualizer</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${isRunning ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse' : 'bg-slate-800 text-slate-400'}`}>
                    {isRunning ? 'CELL ACTIVE (ELECTRON FLOW)' : 'STANDBY'}
                  </span>
                </div>

                <ElectrolysisCanvas
                  electrolyte={electrolyte}
                  electrodeType={electrodeType}
                  current={current}
                  isRunning={isRunning}
                  onTick={handleLabTick}
                />
              </div>

              {/* Dynamic Diagram based on active selection */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">Cell Architecture Diagram</h3>
                {electrolyte === 'acidified_water' && <AcidifiedWaterVoltameterSVG active={isRunning} currentVal={current} />}
                {electrolyte === 'molten_pbbr2' && <MoltenLeadBromideCellSVG active={isRunning} />}
                {electrolyte.includes('cuso4') && <ElectrorefiningCuSVG active={isRunning} />}
                {electrolyte === 'brine_nacl' && <AcidifiedWaterVoltameterSVG active={isRunning} currentVal={current} />}
              </div>

              {/* MANDATORY OBSERVATION QUESTIONS SECTION */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-gold-400 mb-4">Lab Observations</h3>
                <div className="space-y-4">
                  {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                    <div key={oIdx} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-xs">
                      <p className="font-bold text-white mb-2">{obs.question}</p>
                      <div className="space-y-2">
                        {obs.observableOptions.map((opt, opIdx) => (
                          <button
                            key={opIdx}
                            onClick={() => {
                              audioManager.play('tap');
                              const updated = [...observationAnswers];
                              updated[oIdx] = opIdx;
                              setObservationAnswers(updated);
                              const chk = [...observationChecked];
                              chk[oIdx] = true;
                              setObservationChecked(chk);
                              if (opIdx === obs.correctIndex) audioManager.play('success');
                            }}
                            className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                              observationAnswers[oIdx] === opIdx
                                ? observationAnswers[oIdx] === obs.correctIndex
                                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                  : 'bg-rose-950/60 border-rose-500 text-rose-300'
                                : 'bg-slate-900 border-slate-700 text-slate-300'
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
          </div>
        )}

        {/* TAB 3: CHALLENGES (22+ Items Across 3 Tiers) */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-gold-400">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                    activeChallenge.difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    activeChallenge.difficulty === 'standard' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {activeChallenge.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">• Node: {activeChallenge.nodeId}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold uppercase">Mastery Score</span>
                <p className="text-2xl font-mono font-extrabold text-amber-400">{challengeScore} pts</p>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* MULTIPLE CHOICE TYPE */}
            {activeChallenge.type === 'multiple-choice' && activeChallenge.options && (
              <div className="space-y-3 mb-8">
                {activeChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={challengeStatus !== 'unanswered'}
                    onClick={() => { audioManager.play('tap'); setUserMcqOption(idx); }}
                    className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition-all ${
                      userMcqOption === idx
                        ? 'bg-gold-950/60 border-gold-500 text-white shadow-lg'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        userMcqOption === idx ? 'bg-gold-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* NUMERICAL TYPE */}
            {activeChallenge.type === 'numerical' && (
              <div className="mb-8 space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase">Enter Numerical Calculation Result</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    disabled={challengeStatus !== 'unanswered'}
                    value={userNumInput}
                    onChange={(e) => setUserNumInput(e.target.value)}
                    placeholder="Type value..."
                    className="bg-slate-800 border border-slate-700 text-white font-mono text-lg rounded-xl p-4 w-64 focus:outline-none focus:border-gold-500"
                  />
                  {activeChallenge.unit && (
                    <span className="text-lg font-bold text-gold-400">{activeChallenge.unit}</span>
                  )}
                </div>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {activeChallenge.type === 'drag-sort' && (
              <div className="mb-8 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase">Click or reorder items into correct sequence:</p>
                {userSortOrder.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <span className="w-6 h-6 rounded-full bg-gold-600 text-white flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-200 flex-1">{item}</span>
                    {challengeStatus === 'unanswered' && (
                      <div className="flex gap-1">
                        {idx > 0 && (
                          <button
                            onClick={() => {
                              const arr = [...userSortOrder];
                              [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                              setUserSortOrder(arr);
                            }}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs font-bold rounded"
                          >
                            ▲
                          </button>
                        )}
                        {idx < userSortOrder.length - 1 && (
                          <button
                            onClick={() => {
                              const arr = [...userSortOrder];
                              [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
                              setUserSortOrder(arr);
                            }}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs font-bold rounded"
                          >
                            ▼
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* MATCHING TYPE */}
            {activeChallenge.type === 'matching' && activeChallenge.matchingPairs && (
              <div className="mb-8 space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase">Match left column items to right column options:</p>
                {activeChallenge.matchingPairs.map((pair, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
                    <div className="text-sm font-bold text-gold-300 flex items-center">{pair.left}</div>
                    <select
                      disabled={challengeStatus !== 'unanswered'}
                      value={userMatching[pair.left] || ''}
                      onChange={(e) => setUserMatching({ ...userMatching, [pair.left]: e.target.value })}
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg p-3"
                    >
                      <option value="">Select matching component...</option>
                      {activeChallenge.matchingPairs!.map((p, pIdx) => (
                        <option key={pIdx} value={p.right}>{p.right}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Feedback & Actions */}
            <div className="space-y-4">
              {challengeStatus === 'unanswered' ? (
                <button
                  onClick={handleCheckChallenge}
                  className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-white font-extrabold text-base rounded-xl shadow-lg transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <div className={`p-5 rounded-xl border ${challengeStatus === 'correct' ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/60 border-rose-500/50 text-rose-200'}`}>
                    <h4 className="font-extrabold text-lg mb-1">{challengeStatus === 'correct' ? '✓ Correct Answer!' : '✗ Incorrect'}</h4>
                    <p className="text-sm leading-relaxed">{activeChallenge.explanation}</p>
                  </div>

                  {currentChallengeIdx < CHALLENGES.length - 1 && (
                    <button
                      onClick={handleNextChallenge}
                      className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base rounded-xl shadow-lg transition-all"
                    >
                      Next Challenge →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL-WORLD EXTENSION */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* MANDATORY REAL-WORLD ACTIVITY RENDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, sIdx) => (
                  <div key={sIdx} className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-xl flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                      {sIdx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">{stepStr}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4">ICSE Electrolysis Misconception Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((item) => (
                  <div key={item.id} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Misconception #{item.id}</span>
                    <h4 className="text-xs font-bold text-rose-300">{item.misconception}</h4>
                    <p className="text-xs text-emerald-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      <span className="font-bold text-emerald-400">Scientific Truth: </span>{item.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Node Mastery Dashboard */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Bayesian Knowledge Tracing (BKT) Mastery Dashboard</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const state = bktStates[nodeId];
                  const pMastery = masteryProb(state);
                  const perc = Math.round(pMastery * 100);
                  return (
                    <div key={nodeId} className="bg-slate-800/60 border border-slate-700 p-3 rounded-xl text-center">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{nodeId}</span>
                      <div className="w-full bg-slate-700 h-2 rounded-full my-2 overflow-hidden">
                        <div className="bg-gold-500 h-full transition-all duration-500" style={{ width: `${perc}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gold-400 font-mono">{perc}% Mastery</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MANDATORY SIM ENGINE FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Electrolysis Modules Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}