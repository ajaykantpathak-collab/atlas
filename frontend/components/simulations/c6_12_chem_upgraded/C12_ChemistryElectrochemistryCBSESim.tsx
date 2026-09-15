'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Zap,
  Beaker,
  Flame,
  Activity,
  RefreshCw,
  Award,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  BookOpen,
  Layers,
  Shield,
  Sparkles,
  ArrowRight,
  Gauge,
  Info,
  Play,
  Pause,
  RotateCcw,
  AlertTriangle,
  Scale,
  Battery,
  BatteryCharging,
  Sliders,
  TrendingUp,
  Atom,
  Eye,
  Check,
  X,
  Volume2
} from 'lucide-react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. ALL NODE IDS & CURRICULUM DEFINITIONS
// ==========================================
const ALL_NODE_IDS = [
  'c12_chem_cbse_300',
  'c12_chem_cbse_301',
  'c12_chem_cbse_303',
  'c12_chem_cbse_304',
  'c12_chem_cbse_306',
  'c12_chem_cbse_307',
  'c12_chem_cbse_308',
  'c12_chem_cbse_309',
  'c12_chem_cbse_311',
  'c12_chem_cbse_312',
  'c12_chem_cbse_315',
  'c12_chem_cbse_317',
  'c12_chem_cbse_318',
  'c12_chem_cbse_319',
  'c12_chem_cbse_321',
  'c12_chem_cbse_322',
  'c12_chem_cbse_323',
  'c12_chem_cbse_324',
  'c12_chem_cbse_325',
  'c12_chem_cbse_326',
  'c12_chem_cbse_327',
  'c12_chem_cbse_333',
] as const;

type NodeId = (typeof ALL_NODE_IDS)[number];

interface NodeInfo {
  id: NodeId;
  name: string;
  definition: string;
  eli5: string;
}

const NODE_DEFINITIONS: Record<NodeId, NodeInfo> = {
  c12_chem_cbse_300: {
    id: 'c12_chem_cbse_300',
    name: 'Galvanic & Electrochemical Cells',
    definition: 'Devices that convert chemical energy released in a spontaneous redox reaction directly into electrical energy.',
    eli5: 'A battery made of two metals in salt solutions where electron transfer creates electric current.'
  },
  c12_chem_cbse_301: {
    id: 'c12_chem_cbse_301',
    name: 'Standard Hydrogen Electrode (SHE)',
    definition: 'Reference electrode with potential arbitrarily set to 0.00 V at 298 K, 1 atm H2 gas, and 1 M H+ ions.',
    eli5: 'The universal baseline ruler used by chemists to measure how strongly metals want to lose or gain electrons.'
  },
  c12_chem_cbse_303: {
    id: 'c12_chem_cbse_303',
    name: 'Electrochemical Series & Feasibility',
    definition: 'Arrangement of electrode systems in increasing order of their standard reduction potentials (E°).',
    eli5: 'A ranking list showing which elements are strongest oxidisers and reducers.'
  },
  c12_chem_cbse_304: {
    id: 'c12_chem_cbse_304',
    name: 'Nernst Equation & Cell EMF',
    definition: 'Quantifies variation of electrode/cell potential with concentration of ions and temperature: E = E° - (RT/nF) ln Q.',
    eli5: 'A math formula showing how changing chemical concentrations or temperature changes battery voltage.'
  },
  c12_chem_cbse_306: {
    id: 'c12_chem_cbse_306',
    name: 'Gibbs Free Energy & Cell Potential',
    definition: 'Thermodynamic relationship ΔG° = -n F E°cell connecting cell potential to electrical work done by the system.',
    eli5: 'More voltage means the cell releases more usable chemical energy to do useful work.'
  },
  c12_chem_cbse_307: {
    id: 'c12_chem_cbse_307',
    name: 'Equilibrium Constant from Nernst Equation',
    definition: 'At equilibrium Ecell = 0, leading to log Kc = (n E°cell) / 0.0591 at 298 K.',
    eli5: 'When a battery goes completely dead, chemical equilibrium is reached, allowing calculation of Kc.'
  },
  c12_chem_cbse_308: {
    id: 'c12_chem_cbse_308',
    name: 'Resistance, Conductance & Conductivity (κ)',
    definition: 'Conductivity (κ) is inverse resistivity (1/ρ), measuring ionic current conduction per unit cube of solution.',
    eli5: 'How easily electricity flows through a liquid electrolyte solution.'
  },
  c12_chem_cbse_309: {
    id: 'c12_chem_cbse_309',
    name: 'Molar Conductivity (Λm)',
    definition: 'Conducting power of all ions produced by dissolving 1 mole of an electrolyte in solution: Λm = (κ × 1000) / C.',
    eli5: 'The total conductivity provided by exactly one mole of salt dissolved in water.'
  },
  c12_chem_cbse_311: {
    id: 'c12_chem_cbse_311',
    name: 'Variation of Conductivity with Concentration',
    definition: 'κ decreases with dilution, whereas molar conductivity (Λm) increases with dilution for both strong and weak electrolytes.',
    eli5: 'Adding water spreads ions apart, lowering conductivity per volume, but increases molar conductivity.'
  },
  c12_chem_cbse_312: {
    id: 'c12_chem_cbse_312',
    name: "Kohlrausch's Law of Independent Migration",
    definition: 'Limiting molar conductivity of an electrolyte is the sum of individual ionic contributions of cations and anions.',
    eli5: 'At infinite dilution, every ion moves independently without interference from its partner.'
  },
  c12_chem_cbse_315: {
    id: 'c12_chem_cbse_315',
    name: "Applications of Kohlrausch's Law",
    definition: 'Calculation of limiting molar conductivity for weak electrolytes, degree of dissociation (α = Λm/Λm°), and Ka.',
    eli5: 'Using Kohlrausch law to find how much weak acids like acetic acid ionise in solution.'
  },
  c12_chem_cbse_317: {
    id: 'c12_chem_cbse_317',
    name: 'Electrolytic Cells & Electrolysis',
    definition: 'Process of chemical decomposition of an electrolyte by passing electric current from an external source.',
    eli5: 'Using external electrical energy to force non-spontaneous chemical reactions to happen.'
  },
  c12_chem_cbse_318: {
    id: 'c12_chem_cbse_318',
    name: "Faraday's First Law of Electrolysis",
    definition: 'Amount of chemical reaction / mass deposited (w) is directly proportional to quantity of electricity (Q = I × t).',
    eli5: 'Double the electric current or time, and you deposit double the metal on the electrode.'
  },
  c12_chem_cbse_319: {
    id: 'c12_chem_cbse_319',
    name: "Faraday's Second Law of Electrolysis",
    definition: 'Masses of different substances liberated by same charge are proportional to their chemical equivalent weights (w1/w2 = E1/E2).',
    eli5: 'The same electricity deposits metals in exact proportion to their chemical equivalent masses.'
  },
  c12_chem_cbse_321: {
    id: 'c12_chem_cbse_321',
    name: 'Products of Electrolysis',
    definition: 'Outcome determined by reduction potentials, concentrations, and electrode nature (inert vs active).',
    eli5: 'In water, H+ or OH- ions might get discharged instead of salt ions depending on voltage preferences.'
  },
  c12_chem_cbse_322: {
    id: 'c12_chem_cbse_322',
    name: 'Primary Batteries (Dry Cell & Mercury Cell)',
    definition: 'Galvanic cells where reaction occurs only once and cannot be recharged after components are exhausted.',
    eli5: 'Single-use batteries used in clocks and hearing aids.'
  },
  c12_chem_cbse_323: {
    id: 'c12_chem_cbse_323',
    name: 'Secondary Batteries (Lead Storage & Ni-Cd)',
    definition: 'Rechargeable cells that function as galvanic cells during discharge and electrolytic cells during recharge.',
    eli5: 'Rechargeable batteries like car batteries that reverse chemical reactions when plugged in.'
  },
  c12_chem_cbse_324: {
    id: 'c12_chem_cbse_324',
    name: 'Fuel Cells (H2-O2 Cell)',
    definition: 'Galvanic cells that continuously convert chemical energy of combustion fuels (H2, CH4) directly into electricity.',
    eli5: 'Clean energy generators combining hydrogen and oxygen to produce power and clean water.'
  },
  c12_chem_cbse_325: {
    id: 'c12_chem_cbse_325',
    name: 'Corrosion as an Electrochemical Process',
    definition: 'Oxidation of metals due to redox reactions with atmospheric oxygen and moisture, creating electrochemical micro-cells.',
    eli5: 'Rusting is actually tiny natural battery reactions eating away metal surfaces over time.'
  },
  c12_chem_cbse_326: {
    id: 'c12_chem_cbse_326',
    name: 'Corrosion Prevention & Sacrificial Anodes',
    definition: 'Protecting metals using sacrificial anodes (galvanization with Zn, Mg), cathodic protection, or barrier coatings.',
    eli5: 'Attaching a more reactive metal so it rusts first, saving the main steel structure.'
  },
  c12_chem_cbse_327: {
    id: 'c12_chem_cbse_327',
    name: 'Concentration Cells & Junction Potential',
    definition: 'Cells where EMF arises solely from difference in electrolyte concentration between identical electrode compartments.',
    eli5: 'A battery driven purely by salt concentration differences between two connected solutions.'
  },
  c12_chem_cbse_333: {
    id: 'c12_chem_cbse_333',
    name: 'Green Electrochemistry & Industrial Applications',
    definition: 'Modern sustainable electrochemical methods including chlor-alkali process, electro-refining, and green hydrogen synthesis.',
    eli5: 'Using electricity cleanly to refine ultra-pure copper, make green hydrogen, and produce industrial chemicals.'
  }
};

// ==========================================
// 2. MANDATORY SECTIONS DATA
// ==========================================

const SCENARIO = {
  title: 'Advanced ISC Electrochemistry & Electrochemical Dynamics Lab',
  intro: 'Welcome to the Central Electrochemistry & Energy Systems Research Facility. As Lead Chemical Engineer, you will control cell potentials, ion migrations, electrolysis reactors, and fuel cell stacks.',
  context: 'You will investigate how redox thermodynamics, Nernst concentration kinetics, Kohlrausch ion mobility, and Faraday quantitative electro-deposition govern modern energy storage and industrial chemical synthesis.'
};

const DISCOVERY_QUESTION = {
  question: 'Why does a standard Daniel Cell (Zn-Cu) stop producing current after running for a long time, even when plenty of copper ions and zinc metal remain in their half-cells?',
  options: [
    'The zinc metal electrode melts completely due to resistance heating.',
    'The salt bridge ions get exhausted or concentration equilibrium is reached where Ecell = 0 V.',
    'Electrons run out in the copper wire.',
    'Water inside the solutions undergoes complete electrolysis into H2 and O2.'
  ],
  correctIndex: 1,
  hintAfter: 'At chemical equilibrium, ΔG = 0 and Ecell = 0 V. The reaction Quotient Q equals the equilibrium constant Kc!'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Galvanic Cells & Nernst Equation Potential Simulator',
    instruction: 'Select anode/cathode metals, adjust ion concentrations (C1, C2) and temperature (T). Observe real-time cell potential Ecell, direction of electron flow, and Gibbs free energy ΔG.',
    interactionType: 'galvanic_nernst_sim',
    nodeId: 'c12_chem_cbse_304'
  },
  {
    title: 'Lab 2: Electrolyte Conductance & Kohlrausch Ion Migration',
    instruction: 'Compare Molar Conductivity (Λm) vs √C for Strong (KCl) and Weak (CH3COOH) electrolytes. Compute limiting molar conductivity Λm° and degree of dissociation α.',
    interactionType: 'conductance_kohlrausch_sim',
    nodeId: 'c12_chem_cbse_312'
  },
  {
    title: 'Lab 3: Quantitative Electrolysis & Faraday’s Electro-Deposition',
    instruction: 'Set current (I) and time (t) for aqueous CuSO4, molten NaCl, or aqueous NaCl. Measure mass of metal deposited and volume of gas evolved at STP.',
    interactionType: 'electrolysis_faraday_sim',
    nodeId: 'c12_chem_cbse_318'
  },
  {
    title: 'Lab 4: Advanced Batteries & H2-O2 Fuel Cell Efficiency',
    instruction: 'Toggle between Lead Storage Battery discharge/recharge and H2-O2 Fuel Cell operations. Monitor output voltage, power, and eco-emissions.',
    interactionType: 'battery_fuelcell_sim',
    nodeId: 'c12_chem_cbse_324'
  },
  {
    title: 'Lab 5: Corrosion Kinetics & Sacrificial Anode Protection',
    instruction: 'Expose steel samples to moisture/acid with different protective metal coatings (Zn, Cu, Mg). Track iron dissolution rate and rust formation.',
    interactionType: 'corrosion_protection_sim',
    nodeId: 'c12_chem_cbse_326'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'If you dilute both half-cells of a Galvanic cell Zn(s)|Zn2+(0.1 M) || Cu2+(1.0 M)|Cu(s) by adding equal volumes of pure water to both sides, what will happen to the cell potential Ecell?',
    options: [
      'Ecell will increase because Q = [Zn2+]/[Cu2+] remains unchanged.',
      'Ecell will remain exactly the same because the ratio Q = [Zn2+]/[Cu2+] does not change!',
      'Ecell will drop to 0 V instantly.',
      'Ecell will double in value.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 1 by setting both concentrations to 0.1 M and then both to 0.01 M.',
    nodeId: 'c12_chem_cbse_304'
  },
  {
    question: 'During electrolysis of aqueous CuSO4 using active Copper electrodes, what happens to the blue color of the solution over time?',
    options: [
      'Fades completely to colorless solution.',
      'Turns deep purple due to copper complexing.',
      'Remains unchanged because Cu2+ consumed at cathode is replenished by oxidation at copper anode!',
      'Turns bright yellow.'
    ],
    correctIndex: 2,
    verifyInstruction: 'Observe electrode reaction products in Lab 3 when active Cu electrodes are selected.',
    nodeId: 'c12_chem_cbse_321'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'When plotting Molar Conductivity (Λm) versus square root of concentration (√C), why does CH3COOH show a steep exponential curve near zero concentration?',
    options: [
      'Because weak electrolytes dissociate completely (α → 1) only at extreme dilution.',
      'Because ions collapse into neutral molecules at high dilution.',
      'Because water decomposes into hydrogen gas.',
      'Because temperature rises exponentially.'
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_cbse_311'
  },
  {
    question: 'In a Lead Storage Battery during recharging, what happens at the cathode (negative terminal)?',
    options: [
      'Lead dioxide (PbO2) is oxidized.',
      'Lead sulfate (PbSO4) is reduced back to metallic lead (Pb)!',
      'Sulfuric acid is consumed.',
      'Oxygen gas is violently evolved.'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_323'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Electro-refining & Green Hydrogen Generation Plant',
  description: 'Design an industrial electro-refining unit for purifying crude copper anode (95% pure) to ultra-pure cathode grade (99.99%) and calculate hydrogen production in a modern PEM water electrolyser powered by solar power.',
  steps: [
    'Step 1: Set refining cell current to I = 5000 A for t = 10 hours with aqueous CuSO4 electrolyte.',
    'Step 2: Calculate total charge Q = I × t = 5000 A × 36,000 s = 1.8 × 10^8 Coulombs.',
    'Step 3: Calculate copper mass deposited at Cathode: w = (M × Q) / (n × F) = (63.5 g/mol × 1.8 × 10^8 C) / (2 × 96487 C/mol) = 59.23 kg of pure Cu.',
    'Step 4: Switch to Green Hydrogen Cell (2H2O → 2H2 + O2). At 1000 A for 1 hr, generate 418.7 L of H2 gas at STP for zero-emission clean transport.'
  ]
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Anode is Always Positive and Cathode is Always Negative',
    misconception: 'Students believe anode is universally positive and cathode is negative regardless of cell type.',
    correction: 'In a Galvanic cell (spontaneous), Anode is negative (electron source) and Cathode is positive. In an Electrolytic cell (forced), Anode is connected to positive power terminal and Cathode to negative terminal. Oxidation ALWAYS occurs at Anode in both!',
    nodeId: 'c12_chem_cbse_300'
  },
  {
    id: 'misc_2',
    title: 'Electrons Flow Through Electrolyte Solutions',
    misconception: 'Believing that electrons travel through the liquid salt solution or salt bridge.',
    correction: 'Electrons flow ONLY through external metallic wires and electrodes. Current through the electrolyte and salt bridge is carried entirely by migrating anions and cations!',
    nodeId: 'c12_chem_cbse_308'
  },
  {
    id: 'misc_3',
    title: 'Conductivity (κ) Increases with Dilution',
    misconception: 'Assuming conductivity increases when water is added to electrolyte solutions.',
    correction: 'Conductivity (κ) DECREASES with dilution because the number of ions per unit volume (1 cm³) decreases. However, Molar Conductivity (Λm) INCREASES with dilution.',
    nodeId: 'c12_chem_cbse_311'
  },
  {
    id: 'misc_4',
    title: 'Standard Cell Potential Depends on Reaction Coefficients',
    misconception: 'Multiplying a half-cell reaction by 2 doubles its standard electrode potential E°.',
    correction: 'Electrode potential E° is an INTENSIVE property and does not depend on the stoichometric amounts of matter! E° remains constant regardless of balancing coefficients.',
    nodeId: 'c12_chem_cbse_303'
  },
  {
    id: 'misc_5',
    title: 'Water is Never Discharged During Electrolysis of Aqueous Salts',
    misconception: 'Thinking only solute metal/halide ions can react at electrodes during aqueous electrolysis.',
    correction: 'Water itself can undergo reduction (2H2O + 2e- → H2 + 2OH-, E° = -0.83V) or oxidation (2H2O → O2 + 4H+ + 4e-, E° = +1.23V). Discharge depends on competitive standard potentials and overpotential!',
    nodeId: 'c12_chem_cbse_321'
  },
  {
    id: 'misc_6',
    title: 'Rusting Requires Only Water',
    misconception: 'Believing iron rusts in pure air-free boiled water.',
    correction: 'Rusting is an electrochemical reaction requiring BOTH dissolved oxygen and moisture. Oxygen acts as the depolarising cathode acceptor (O2 + 4H+ + 4e- → 2H2O).',
    nodeId: 'c12_chem_cbse_325'
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    question: 'What is the standard EMF (E°cell) of a Daniel Cell [Zn(s) | Zn2+(1M) || Cu2+(1M) | Cu(s)] given E°(Zn2+/Zn) = -0.76 V and E°(Cu2+/Cu) = +0.34 V?',
    options: ['+0.42 V', '+1.10 V', '-1.10 V', '+0.76 V'],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_300'
  },
  {
    question: 'Which equation correctly expresses the Nernst equation for a cell at 298 K?',
    options: [
      'Ecell = E°cell - (0.0591/n) log10 Q',
      'Ecell = E°cell + (0.0591/n) ln Q',
      'Ecell = E°cell - (RT/F) log10 Q',
      'Ecell = nF E°cell'
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_cbse_304'
  },
  {
    question: 'What is the mathematical relation between standard Gibbs energy ΔG° and standard cell potential E°cell?',
    options: ['ΔG° = -n F E°cell', 'ΔG° = n F / E°cell', 'ΔG° = -R T ln E°cell', 'ΔG° = E°cell / nF'],
    correctIndex: 0,
    nodeId: 'c12_chem_cbse_306'
  },
  {
    question: 'What unit is molar conductivity (Λm) measured in SI units?',
    options: ['S cm-1', 'S cm2 mol-1', 'Ohm cm', 'S mol-1'],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_309'
  },
  {
    question: 'According to Kohlrausch law, limiting molar conductivity of MgCl2 (Λm°[MgCl2]) is equal to:',
    options: [
      'λ°(Mg2+) + λ°(Cl-)',
      'λ°(Mg2+) + 2 × λ°(Cl-)',
      '2 × λ°(Mg2+) + λ°(Cl-)',
      'λ°(Mg2+) / 2 + λ°(Cl-)'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_312'
  },
  {
    question: 'How many Coulombs of charge are required for the reduction of 1 mole of Al3+ to Al?',
    options: ['96,487 C', '192,974 C', '289,461 C', '482,435 C'],
    correctIndex: 2,
    nodeId: 'c12_chem_cbse_318'
  },
  {
    question: 'During electrolysis of concentrated aqueous NaCl (Brine) with inert electrodes, what gas is evolved at the Anode?',
    options: ['Hydrogen gas (H2)', 'Oxygen gas (O2)', 'Chlorine gas (Cl2)', 'Sodium vapor'],
    correctIndex: 2,
    nodeId: 'c12_chem_cbse_321'
  },
  {
    question: 'Which cathode reaction occurs in the H2-O2 Fuel Cell operating in alkaline medium?',
    options: [
      '2H2 + 4OH- → 4H2O + 4e-',
      'O2 + 2H2O + 4e- → 4OH-',
      '2H+ + 2e- → H2',
      'PbO2 + 4H+ + SO4(2-) + 2e- → PbSO4 + 2H2O'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_324'
  }
];

// ==========================================
// 3. 22 PROGRESSIVE CHALLENGES (Foundation -> Standard -> Advanced)
// ==========================================

export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric' | 'drag_drop' | 'sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  dragItems?: Array<{ id: string; text: string }>;
  dropZones?: Array<{ id: string; title: string; targetItemId: string }>;
  sortItems?: Array<{ id: string; label: string; value: number }>;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (1 to 7) ---
  {
    id: 'ch_1',
    nodeId: 'c12_chem_cbse_300',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a Galvanic cell, at which electrode does oxidation take place and what is its electrical polarity?',
    options: [
      'Cathode, Positive (+)',
      'Anode, Negative (-)',
      'Anode, Positive (+)',
      'Cathode, Negative (-)'
    ],
    correctIndex: 1,
    explanation: 'Oxidation ALWAYS occurs at the Anode. In a spontaneous Galvanic cell, electrons accumulate at the anode, giving it a negative (-) polarity.',
    hints: [
      'Remember the mnemonic AN OX (Anode = Oxidation) and RED CAT (Reduction = Cathode).',
      'Electrons leave the anode to flow into the wire.',
      'Negative charge accumulates where oxidation releases electrons.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_2',
    nodeId: 'c12_chem_cbse_301',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the standard state conditions specified for the Standard Hydrogen Electrode (SHE)?',
    options: [
      'T = 273 K, P(H2) = 1 bar, [H+] = 0.1 M',
      'T = 298 K, P(H2) = 1 bar (or 1 atm), [H+] = 1.0 M',
      'T = 300 K, P(H2) = 2 bar, [H+] = 2.0 M',
      'T = 298 K, P(H2) = 0.5 atm, [H+] = 1.0 M'
    ],
    correctIndex: 1,
    explanation: 'Standard conditions for SHE require 298 K (25°C), 1 bar H2 gas pressure, and 1 M concentration of H+ ions (activity = 1).',
    hints: [
      'Standard temperature in thermodynamics is 298 K.',
      'Unit molar concentration is 1.0 M.',
      'Gas pressure must be unit bar / 1 atm.'
    ]
  },
  {
    id: 'ch_3',
    nodeId: 'c12_chem_cbse_303',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Given standard reduction potentials: E°(Zn2+/Zn) = -0.76 V and E°(Ag+/Ag) = +0.80 V. Which species acts as the stronger reducing agent?',
    options: ['Ag metal', 'Ag+ ion', 'Zn metal', 'Zn2+ ion'],
    correctIndex: 2,
    explanation: 'A more negative E° value indicates a stronger tendency to lose electrons (undergo oxidation), making metallic Zn the stronger reducing agent.',
    hints: [
      'Reducing agents lose electrons and get oxidized.',
      'Lower/more negative E° means stronger reducing power.',
      'Metallic Zn has E° = -0.76 V compared to Ag (+0.80 V).'
    ]
  },
  {
    id: 'ch_4',
    nodeId: 'c12_chem_cbse_308',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of electrolytic conductivity (κ)?',
    options: ['S cm-1', 'S m-1', 'Ohm m', 'S m2 mol-1'],
    correctIndex: 1,
    explanation: 'In SI units, conductivity κ is expressed in Siemens per meter (S m-1), though S cm-1 is also widely used in laboratory chemistry.',
    hints: [
      'Conductivity is inverse of resistivity.',
      'Siemens (S) = Ohm^-1.',
      'Distance in SI is meters (m-1).'
    ]
  },
  {
    id: 'ch_5',
    nodeId: 'c12_chem_cbse_317',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which energy conversion occurs inside an Electrolytic Cell?',
    options: [
      'Chemical energy to Electrical energy',
      'Electrical energy to Chemical energy',
      'Thermal energy to Electrical energy',
      'Mechanical energy to Chemical energy'
    ],
    correctIndex: 1,
    explanation: 'Electrolytic cells consume external electrical energy from a power supply to drive non-spontaneous chemical redox reactions.',
    hints: [
      'Galvanic cells produce electricity.',
      'Electrolytic cells consume electricity to force chemical changes.',
      'Think of charging a battery or electroplating.'
    ]
  },
  {
    id: 'ch_6',
    nodeId: 'c12_chem_cbse_322',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why does a Mercury Cell maintain a completely constant voltage (1.35 V) throughout its entire operational lifespan?',
    options: [
      'It contains a built-in electronic voltage regulator.',
      'The overall cell reaction does not involve any ions in solution whose concentration can change.',
      'It uses liquid mercury metal which never wears out.',
      'It absorbs atmospheric oxygen continuously.'
    ],
    correctIndex: 1,
    explanation: 'In a Mercury cell, overall reaction is Zn(Hg) + HgO(s) → ZnO(s) + Hg(l). No ions appear in the net equation, so concentrations stay constant!',
    hints: [
      'Look at the species involved in the net ionic cell equation.',
      'Solid and liquid pure phases have constant activity = 1.',
      'Without changing ion concentration, Ecell remains strictly constant.'
    ]
  },
  {
    id: 'ch_7',
    nodeId: 'c12_chem_cbse_325',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the electrochemical process of iron corrosion (rusting), what acts as the cathode site?',
    options: [
      'Impurity spot on iron surface where Fe dissolves to Fe2+',
      'Water droplet spot rich in dissolved oxygen where O2 is reduced to H2O',
      'Pure zinc layer',
      'Dry iron oxide crust'
    ],
    correctIndex: 1,
    explanation: 'At cathode spots on iron, atmospheric oxygen in the presence of H+ ions undergoes reduction: O2(g) + 4H+(aq) + 4e- → 2H2O(l).',
    hints: [
      'Anode is where iron oxidizes: Fe → Fe2+ + 2e-.',
      'Cathode is where reduction of dissolved gas occurs.',
      'Oxygen reduction drives the cathodic half-reaction.'
    ],
    misconceptionIndex: 5
  },

  // --- STANDARD (8 to 15) ---
  {
    id: 'ch_8',
    nodeId: 'c12_chem_cbse_304',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the cell potential Ecell (in Volts) at 298 K for: Zn(s) | Zn2+(0.01 M) || Cu2+(1.0 M) | Cu(s). Given E°cell = +1.10 V. (Use 2.303 RT/F = 0.0591 V)',
    correctAnswer: 1.159,
    unit: 'V',
    explanation: 'Ecell = E°cell - (0.0591/n) log([Zn2+]/[Cu2+]) = 1.10 - (0.0591/2) log(0.01/1.0) = 1.10 - (0.02955) * (-2) = 1.10 + 0.0591 = 1.1591 V.',
    hints: [
      'Number of electrons transferred n = 2.',
      'Reaction quotient Q = [Zn2+]/[Cu2+] = 0.01 / 1.0 = 10^-2.',
      'log10(10^-2) = -2.'
    ]
  },
  {
    id: 'ch_9',
    nodeId: 'c12_chem_cbse_306',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate standard Gibbs energy change ΔG° (in kJ/mol) for Daniel cell with E°cell = +1.10 V. (F = 96487 C/mol). Round to 1 decimal place.',
    correctAnswer: -212.3,
    unit: 'kJ/mol',
    explanation: 'ΔG° = -n F E°cell = -2 × 96487 C/mol × 1.10 V = -212271.4 J/mol = -212.3 kJ/mol.',
    hints: [
      'Formula: ΔG° = -n F E°cell.',
      'For Zn-Cu cell, n = 2.',
      'Convert Joules to kilojoules by dividing by 1000.'
    ]
  },
  {
    id: 'ch_10',
    nodeId: 'c12_chem_cbse_307',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Find log10(Kc) for a cell reaction with n = 2 electrons and E°cell = +0.2955 V at 298 K.',
    correctAnswer: 10.0,
    unit: '',
    explanation: 'log10 Kc = (n E°cell) / 0.0591 = (2 × 0.2955) / 0.0591 = 0.591 / 0.0591 = 10.0.',
    hints: [
      'At equilibrium Ecell = 0.',
      'log10 Kc = (n × E°cell) / 0.0591.',
      '2 × 0.2955 = 0.591.'
    ]
  },
  {
    id: 'ch_11',
    nodeId: 'c12_chem_cbse_309',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A conductivity cell filled with 0.1 M KCl solution has resistance R = 100 Ω. If cell constant G* = 1.29 cm-1, compute molar conductivity Λm in S cm2 mol-1.',
    correctAnswer: 129.0,
    unit: 'S cm2 mol-1',
    explanation: 'Conductivity κ = G* / R = 1.29 / 100 = 0.0129 S cm-1. Molar conductivity Λm = (κ × 1000) / C = (0.0129 × 1000) / 0.1 = 129.0 S cm2 mol-1.',
    hints: [
      'κ = Cell constant G* / Resistance R.',
      'κ = 1.29 / 100 = 0.0129 S cm-1.',
      'Λm = (κ × 1000) / concentration C.'
    ]
  },
  {
    id: 'ch_12',
    nodeId: 'c12_chem_cbse_315',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Molar conductivity of 0.01 M CH3COOH is Λm = 39.05 S cm2 mol-1. Given limiting molar conductivity Λm° = 390.5 S cm2 mol-1, calculate degree of dissociation α.',
    correctAnswer: 0.1,
    unit: '',
    explanation: 'Degree of dissociation α = Λm / Λm° = 39.05 / 390.5 = 0.10 (or 10%).',
    hints: [
      'Kohlrausch relation for degree of dissociation: α = Λm / Λm°.',
      '39.05 divided by 390.5 = 0.10.',
      'No units required for α.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: 'c12_chem_cbse_318',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How many grams of Copper (M = 63.5 g/mol) are deposited at cathode during electrolysis of CuSO4 solution by a constant current of 5.0 A for 965 seconds? (F = 96487 C/mol). Round to 2 decimal places.',
    correctAnswer: 1.59,
    unit: 'g',
    explanation: 'Q = I × t = 5 A × 965 s = 4825 C. Reaction: Cu2+ + 2e- → Cu (n = 2). mass w = (M × Q) / (n × F) = (63.5 × 4825) / (2 × 96487) = 1.5875 ≈ 1.59 g.',
    hints: [
      'Calculate total electric charge Q = I × t.',
      'Equivalent weight E = M / 2 = 63.5 / 2 = 31.75 g/eq.',
      'Mass w = (E × Q) / 96487.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: 'c12_chem_cbse_321',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When aqueous NaCl (brine) is electrolysed with platinum electrodes, why is Cl2 gas preferentially liberated at the anode instead of O2 gas, even though E°(O2/H2O) = +1.23 V is lower than E°(Cl2/Cl-) = +1.36 V?',
    options: [
      'Sodium metal dissolves oxygen gas instantly.',
      'Due to OVERVOLTAGE / OVERPOTENTIAL for oxidation of water to oxygen at platinum surface!',
      'Chlorine ions are smaller than water molecules.',
      'Platinum reacts vigorously with oxygen.'
    ],
    correctIndex: 1,
    explanation: 'Thermodynamically oxygen oxidation is favored, but kinetically oxygen discharge requires significant extra potential (overvoltage) on Pt, making Cl2 evolution kinetically faster!',
    hints: [
      'Consider reaction kinetics vs thermodynamics.',
      'Water oxidation to oxygen gas is kinetically slow.',
      'This extra energy barrier is termed overpotential.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_15',
    nodeId: 'c12_chem_cbse_323',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During discharge of a Lead Storage Battery, what happens to the density of the H2SO4 electrolyte and the electrode compounds?',
    options: [
      'Density increases; Pb is converted to PbO2.',
      'Density decreases because H2SO4 is consumed to form solid PbSO4 and H2O!',
      'Density remains unchanged.',
      'Density decreases because H2 gas escapes.'
    ],
    correctIndex: 1,
    explanation: 'Discharge reaction: Pb(s) + PbO2(s) + 2H2SO4(aq) → 2PbSO4(s) + 2H2O(l). Sulfuric acid is consumed and diluted by water, lowering electrolyte density.',
    hints: [
      'Look at reactants: 2 moles of H2SO4 are used up.',
      'Product includes water (H2O).',
      'Hydrometer reading drops as battery discharges.'
    ]
  },

  // --- ADVANCED (16 to 22) ---
  {
    id: 'ch_16',
    nodeId: 'c12_chem_cbse_312',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Calculate limiting molar conductivity Λm° (in S cm2 mol-1) of CH3COOH using Kohlrausch law given: Λm°(HCl) = 426.0, Λm°(NaCl) = 126.0, and Λm°(CH3COONa) = 91.0 S cm2 mol-1.',
    correctAnswer: 391.0,
    unit: 'S cm2 mol-1',
    explanation: 'Λm°(CH3COOH) = Λm°(CH3COONa) + Λm°(HCl) - Λm°(NaCl) = 91.0 + 426.0 - 126.0 = 391.0 S cm2 mol-1.',
    hints: [
      'Combine equations so Na+ and Cl- ions cancel out.',
      'Add CH3COONa and HCl.',
      'Subtract NaCl value.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: 'c12_chem_cbse_327',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Calculate potential Ecell (in Volts) at 298 K for concentration cell: Cu(s) | Cu2+(C1 = 0.001 M) || Cu2+(C2 = 0.1 M) | Cu(s). (Use 2.303 RT/F = 0.0591 V).',
    correctAnswer: 0.0591,
    unit: 'V',
    explanation: 'For concentration cell E°cell = 0 V. Ecell = 0 - (0.0591 / 2) log10 (C1 / C2) = -0.02955 log10 (10^-3 / 10^-1) = -0.02955 log10(10^-2) = -0.02955 * (-2) = +0.0591 V.',
    hints: [
      'Standard potential E°cell for identical metal electrodes is ZERO.',
      'Formula: Ecell = (0.0591 / n) log10 (C2 / C1) where C2 > C1.',
      'n = 2 for Cu2+ ions.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: 'c12_chem_cbse_319',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Three electrolytic cells containing AgNO3, CuSO4, and AlCl3 solutions are connected in series. If 1.08 g of Silver (M = 108 g/mol) is deposited in the first cell, calculate mass of Copper (M = 63.5 g/mol) deposited in second cell. Round to 3 decimal places.',
    correctAnswer: 0.318,
    unit: 'g',
    explanation: 'By Faraday 2nd Law: (w1 / E1) = (w2 / E2). E(Ag) = 108/1 = 108. E(Cu) = 63.5/2 = 31.75. w(Cu) = w(Ag) × (E_Cu / E_Ag) = 1.08 × (31.75 / 108) = 0.3175 ≈ 0.318 g.',
    hints: [
      'Faraday 2nd Law: w1 / E1 = w2 / E2.',
      'Equivalent weight of Ag = 108 / 1 = 108.',
      'Equivalent weight of Cu = 63.5 / 2 = 31.75.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: 'c12_chem_cbse_324',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why are H2-O2 Fuel Cells vastly superior to conventional thermal power generation plants for spacecraft and future eco-grids?',
    options: [
      'They operate at 1000°C without requiring cooling systems.',
      'They achieve high efficiency (~70%+), produce zero toxic pollutants, and yield pure drinkable water as a byproduct!',
      'They use cheap lead metal as fuel.',
      'They require no oxygen gas for combustion.'
    ],
    correctIndex: 1,
    explanation: 'Fuel cells convert chemical energy of fuel directly into electricity without thermal Carnot heat engine limits, achieving high efficiency (~70%) with pure water byproduct.',
    hints: [
      'Thermal plants lose energy as waste heat (efficiency ~40%).',
      'Fuel cells skip the combustion-steam turbine stages.',
      'Product of H2 + O2 reaction is pure water (H2O).'
    ]
  },
  {
    id: 'ch_20',
    nodeId: 'c12_chem_cbse_326',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Sacrificial Protection of underground iron pipelines, blocks of Magnesium (Mg) are attached by wires to the steel pipe. How does this protect iron?',
    options: [
      'Magnesium forms a waterproof plastic coating around iron.',
      'Magnesium has a more negative standard reduction potential than iron, so Mg oxidizes preferentially (sacrifices itself), keeping iron cathodic!',
      'Magnesium absorbs all ground moisture.',
      'Magnesium neutralizes soil acidity by forming Mg(OH)2 precipitate.'
    ],
    correctIndex: 1,
    explanation: 'E°(Mg2+/Mg) = -2.37 V is much more negative than E°(Fe2+/Fe) = -0.44 V. Mg acts as anode and corrodes, supplying electrons to iron to keep it cathodic and unoxidized.',
    hints: [
      'Compare standard reduction potentials of Mg vs Fe.',
      'The metal with more negative E° oxidizes first.',
      'Supplying electrons to iron prevents Fe → Fe2+ + 2e-.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: 'c12_chem_cbse_333',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A green electro-synthesis reactor produces Hydrogen gas via electrolysis of water at 100% current efficiency. What volume of H2 gas (in Liters) at STP (22.4 L/mol) is generated by a current of 10 A running for 1930 seconds? (F = 96487 C/mol).',
    correctAnswer: 2.24,
    unit: 'L',
    explanation: 'Charge Q = 10 A × 1930 s = 19300 C. Reaction: 2H+ + 2e- → H2 (2 moles e- per mole H2). Moles H2 = Q / (2 × F) = 19300 / (2 × 96487) = 19300 / 192974 = 0.1 mol. Volume = 0.1 mol × 22.4 L/mol = 2.24 L.',
    hints: [
      'Calculate charge Q = I × t.',
      '2 Faradays (2 × 96487 C) yield 1 mole of H2 gas.',
      'Volume at STP = Moles × 22.4 L.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: 'c12_chem_cbse_311',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why cannot the limiting molar conductivity (Λm°) of a weak electrolyte like acetic acid (CH3COOH) be obtained by direct extrapolation of a Λm vs √C graph to zero concentration?',
    options: [
      'Because acetic acid decomposes into carbon dioxide at low concentration.',
      'Because at near zero concentration, Λm increases steeply (almost vertically), making accurate linear extrapolation impossible!',
      'Because resistance becomes zero and meter burns out.',
      'Because weak electrolytes turn into non-conductors when diluted.'
    ],
    correctIndex: 1,
    explanation: 'For weak electrolytes, dissociation degree α increases rapidly as C → 0, causing the Λm vs √C curve to bend vertically upwards. Kohlrausch law of independent ion migration must be used instead!',
    hints: [
      'Recall Ostwald dilution law α = √(Ka/C).',
      'As C approaches 0, α approaches 1 non-linearly.',
      'The curve becomes asymptotic to the Y-axis.'
    ]
  }
];

// ==========================================
// 4. INTERACTIVE SVG / CANVAS DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Interactive Galvanic / Nernst Cell Diagram
const GalvanicCellDiagram: React.FC<{
  anodeMetal: string;
  cathodeMetal: string;
  cAnode: number;
  cCathode: number;
  eCell: number;
  isRunning: boolean;
}> = ({ anodeMetal, cathodeMetal, cAnode, cCathode, eCell, isRunning }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    let animId: number;
    if (isRunning) {
      const animate = () => {
        setFrame(f => (f + 1) % 100);
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [isRunning]);

  // Color mapping
  const metalColors: Record<string, { main: string; ion: string }> = {
    Zn: { main: '#94a3b8', ion: '#cbd5e1' },
    Cu: { main: '#b45309', ion: '#38bdf8' },
    Ag: { main: '#e2e8f0', ion: '#e0f2fe' },
    Fe: { main: '#64748b', ion: '#93c5fd' },
    Ni: { main: '#475569', ion: '#a7f3d0' }
  };

  const anodeCol = metalColors[anodeMetal] || { main: '#64748b', ion: '#93c5fd' };
  const cathodeCol = metalColors[cathodeMetal] || { main: '#b45309', ion: '#38bdf8' };

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
          <Zap className="w-4 h-4" /> Spontaneous Electrochemical Cell
        </span>
        <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded border border-emerald-500/30">
          Ecell = {eCell.toFixed(3)} V
        </span>
      </div>

      <svg viewBox="0 0 600 320" className="w-full h-auto">
        <defs>
          <linearGradient id="anodeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={anodeCol.main} />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="cathodeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={cathodeCol.main} />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Beaker (Anode Half-Cell) */}
        <rect x="50" y="120" width="180" height="150" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="3" />
        <rect x="55" y="160" width="170" height="105" rx="4" fill={anodeCol.ion} fillOpacity="0.25" />
        <text x="140" y="250" textAnchor="middle" fill="#94a3b8" className="text-xs font-mono font-semibold">
          {anodeMetal}²⁺ Solution ({cAnode} M)
        </text>

        {/* Right Beaker (Cathode Half-Cell) */}
        <rect x="370" y="120" width="180" height="150" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="3" />
        <rect x="375" y="160" width="170" height="105" rx="4" fill={cathodeCol.ion} fillOpacity="0.35" />
        <text x="460" y="250" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono font-semibold">
          {cathodeMetal}²⁺ Solution ({cCathode} M)
        </text>

        {/* Anode Electrode */}
        <rect x="110" y="70" width="28" height="130" fill="url(#anodeGrad)" stroke="#64748b" strokeWidth="2" rx="3" />
        <text x="124" y="62" textAnchor="middle" fill="#f87171" className="text-xs font-bold font-mono">
          ANODE (-) [{anodeMetal}]
        </text>

        {/* Cathode Electrode */}
        <rect x="446" y="70" width="28" height="130" fill="url(#cathodeGrad)" stroke="#d97706" strokeWidth="2" rx="3" />
        <text x="460" y="62" textAnchor="middle" fill="#4ade80" className="text-xs font-bold font-mono">
          CATHODE (+) [{cathodeMetal}]
        </text>

        {/* Salt Bridge */}
        <path d="M 180 180 L 180 110 Q 180 90 200 90 L 400 90 Q 420 90 420 110 L 420 180" fill="none" stroke="#e2e8f0" strokeWidth="22" strokeLinecap="round" opacity="0.8" />
        <path d="M 180 180 L 180 110 Q 180 90 200 90 L 400 90 Q 420 90 420 110 L 420 180" fill="none" stroke="#38bdf8" strokeWidth="12" strokeDasharray="4 4" opacity="0.9" />
        <text x="300" y="82" textAnchor="middle" fill="#f8fafc" className="text-[11px] font-bold">
          Salt Bridge (KNO3 / Agar-Agar)
        </text>

        {/* External Wires & Voltmeter */}
        <path d="M 124 70 L 124 30 L 260 30" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <path d="M 460 70 L 460 30 L 340 30" fill="none" stroke="#f59e0b" strokeWidth="4" />

        {/* Voltmeter Unit */}
        <circle cx="300" cy="30" r="24" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" filter="url(#glow)" />
        <text x="300" y="26" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-mono font-bold">VOLTMETER</text>
        <text x="300" y="38" textAnchor="middle" fill="#4ade80" className="text-xs font-mono font-bold">
          {eCell > 0 ? `${eCell.toFixed(2)}V` : '0.00V'}
        </text>

        {/* Animated Electrons in External Wire */}
        {isRunning && eCell > 0 && (
          <>
            <circle cx={124 + (frame * 1.36) % 136} cy="30" r="4" fill="#38bdf8" filter="url(#glow)" />
            <circle cx={340 + (frame * 1.2) % 120} cy="30" r="4" fill="#38bdf8" filter="url(#glow)" />
            <path d="M 230 20 L 250 20 M 245 15 L 255 20 L 245 25" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <text x="240" y="14" fill="#38bdf8" className="text-[10px] font-mono">e⁻ flow →</text>
          </>
        )}

        {/* Ion Migration Arrows inside Salt Bridge */}
        {isRunning && eCell > 0 && (
          <>
            <text x="230" y="112" fill="#f87171" className="text-[10px] font-mono font-bold">← NO3⁻</text>
            <text x="340" y="112" fill="#4ade80" className="text-[10px] font-mono font-bold">K⁺ →</text>
          </>
        )}

        {/* Electrode Reaction Micro-Bubbles/Deposits */}
        {isRunning && eCell > 0 && (
          <>
            {/* Anode Dissolution */}
            <circle cx={135 + (frame % 15)} cy={170 + (frame * 2) % 40} r="3" fill="#cbd5e1" opacity="0.8" />
            {/* Cathode Plating */}
            <circle cx={442 - (frame % 10)} cy={170 + (frame * 1.5) % 40} r="3" fill="#fbbf24" opacity="0.9" />
          </>
        )}
      </svg>
    </div>
  );
};

// Diagram 2: Conductance & Kohlrausch Law Plot Canvas
const ConductanceKohlrauschDiagram: React.FC<{
  electrolyteType: 'strong' | 'weak';
  limitingLambda: number;
  concentration: number;
}> = ({ electrolyteType, limitingLambda, concentration }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Axes setup
    const margin = 50;
    const width = canvas.width - margin * 2;
    const height = canvas.height - margin * 2;

    // Background Grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(margin + x, margin);
      ctx.lineTo(margin + x, margin + height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(margin, margin + y);
      ctx.lineTo(margin + width, margin + y);
      ctx.stroke();
    }

    // Main Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin, margin);
    ctx.lineTo(margin, margin + height);
    ctx.lineTo(margin + width, margin + height);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px sans-serif';
    ctx.fillText('Molar Conductivity Λm (S cm² mol⁻¹)', margin - 10, margin - 15);
    ctx.fillText('√C (mol/L)¹/²', margin + width - 60, margin + height + 35);

    // Y Axis Ticks (0 to 400)
    for (let i = 0; i <= 4; i++) {
      const val = i * 100;
      const y = margin + height - (val / 400) * height;
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(val.toString(), margin - 35, y + 4);
    }

    // Strong Electrolyte Curve (KCl) -> Linear drop: Λm = Λm° - A √C
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const kclLambda0 = 150;
    const kclA = 80;
    for (let sqrtC = 0; sqrtC <= 1.0; sqrtC += 0.02) {
      const lam = kclLambda0 - kclA * sqrtC;
      const x = margin + sqrtC * width;
      const y = margin + height - (lam / 400) * height;
      if (sqrtC === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('Strong Electrolyte (KCl)', margin + 180, margin + height - 120);

    // Weak Electrolyte Curve (CH3COOH) -> Steep exponential curve at low C
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const ch3lambda0 = 391;
    for (let sqrtC = 0.001; sqrtC <= 1.0; sqrtC += 0.01) {
      // Approximating weak electrolyte curve
      const alpha = 1 / (1 + (sqrtC * sqrtC * 100));
      const lam = ch3lambda0 * Math.max(0.08, alpha);
      const x = margin + sqrtC * width;
      const y = margin + height - (lam / 400) * height;
      if (sqrtC === 0.001) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Weak Electrolyte (CH3COOH)', margin + 60, margin + 40);

    // Draw active point for selected concentration
    const currentSqrtC = Math.sqrt(concentration);
    let activeLam = 0;
    if (electrolyteType === 'strong') {
      activeLam = 150 - 80 * currentSqrtC;
    } else {
      const alpha = 1 / (1 + (currentSqrtC * currentSqrtC * 100));
      activeLam = 391 * Math.max(0.08, alpha);
    }

    const activeX = margin + currentSqrtC * width;
    const activeY = margin + height - (activeLam / 400) * height;

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(activeX, activeY, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Point Label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(
      `Current: (${currentSqrtC.toFixed(2)}, ${activeLam.toFixed(1)})`,
      activeX + 10,
      activeY - 10
    );

  }, [electrolyteType, limitingLambda, concentration]);

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-xl">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan-400" /> Molar Conductivity (Λm) vs Concentration (√C)
        </h4>
        <span className="text-xs bg-slate-800 text-cyan-300 font-mono px-2 py-1 rounded border border-cyan-500/30">
          Kohlrausch Law: Λm = Λm° - A√C
        </span>
      </div>
      <canvas ref={canvasRef} width={550} height={260} className="w-full h-auto rounded-lg bg-slate-950" />
    </div>
  );
};

// Diagram 3: Quantitative Electrolysis Cell Component
const ElectrolysisCellDiagram: React.FC<{
  electrolyte: 'aqueous_cuso4' | 'molten_nacl' | 'brine_nacl';
  electrodeType: 'inert_pt' | 'active_cu';
  current: number;
  timeSec: number;
  massDeposited: number;
  gasVolumeSTP: number;
}> = ({ electrolyte, electrodeType, current, timeSec, massDeposited, gasVolumeSTP }) => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-xl relative">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
          <Beaker className="w-4 h-4" /> Electrolytic Reactor & Electro-Deposition
        </span>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-1 rounded">
          Charge Q = {(current * timeSec).toFixed(0)} C
        </span>
      </div>

      <svg viewBox="0 0 550 280" className="w-full h-auto">
        {/* Electrolytic Cell Tank */}
        <rect x="100" y="80" width="350" height="170" rx="10" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
        
        {/* Solution fill */}
        <rect
          x="106"
          y="110"
          width="338"
          height="134"
          rx="6"
          fill={electrolyte === 'aqueous_cuso4' ? '#0284c7' : electrolyte === 'molten_nacl' ? '#ea580c' : '#0d9488'}
          fillOpacity="0.4"
        />

        {/* Electrolyte Name */}
        <text x="275" y="225" textAnchor="middle" fill="#f1f5f9" className="text-xs font-mono font-bold">
          {electrolyte === 'aqueous_cuso4' ? 'Aqueous CuSO4 Solution' : electrolyte === 'molten_nacl' ? 'Molten NaCl (800°C)' : 'Concentrated Aqueous NaCl (Brine)'}
        </text>

        {/* Left Electrode: Anode (+ Power) */}
        <rect x="170" y="40" width="24" height="140" fill={electrodeType === 'active_cu' ? '#b45309' : '#475569'} rx="3" stroke="#cbd5e1" strokeWidth="2" />
        <text x="182" y="32" textAnchor="middle" fill="#f87171" className="text-xs font-bold font-mono">ANODE (+)</text>

        {/* Right Electrode: Cathode (- Power) */}
        <rect x="356" y="40" width="24" height="140" fill={electrodeType === 'active_cu' ? '#b45309' : '#475569'} rx="3" stroke="#cbd5e1" strokeWidth="2" />
        <text x="368" y="32" textAnchor="middle" fill="#4ade80" className="text-xs font-bold font-mono">CATHODE (-)</text>

        {/* Electro-Deposited Layer on Cathode */}
        {massDeposited > 0 && (
          <rect x="352" y="90" width="32" height="85" fill="#f59e0b" rx="4" opacity="0.8" />
        )}

        {/* Gas Bubbles at Anode/Cathode */}
        {gasVolumeSTP > 0 && (
          <>
            <circle cx="175" cy="110" r="4" fill="#ffffff" opacity="0.8" />
            <circle cx="185" cy="130" r="5" fill="#ffffff" opacity="0.7" />
            <circle cx="178" cy="90" r="3" fill="#ffffff" opacity="0.9" />
          </>
        )}

        {/* DC Power Supply Battery Top */}
        <rect x="235" y="10" width="80" height="30" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
        <text x="275" y="28" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono font-bold">DC POWER</text>
        
        {/* Connecting Wires */}
        <path d="M 182 40 L 182 25 L 235 25" fill="none" stroke="#ef4444" strokeWidth="3" />
        <path d="M 368 40 L 368 25 L 315 25" fill="none" stroke="#22c55e" strokeWidth="3" />

        {/* Display Metrics */}
        <rect x="120" y="150" width="130" height="50" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="185" y="168" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">GAS EVOLVED (STP)</text>
        <text x="185" y="188" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono font-bold">{gasVolumeSTP.toFixed(2)} L</text>

        <rect x="300" y="150" width="130" height="50" rx="6" fill="#0f172a" stroke="#334155" />
        <text x="365" y="168" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">METAL DEPOSITED</text>
        <text x="365" y="188" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono font-bold">{massDeposited.toFixed(3)} g</text>
      </svg>
    </div>
  );
};

// Diagram 4: Battery & Fuel Cell Visualizer
const FuelCellDiagram: React.FC<{
  mode: 'fuel_cell' | 'lead_storage';
  isOperating: boolean;
}> = ({ mode, isOperating }) => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
          <BatteryCharging className="w-4 h-4" /> {mode === 'fuel_cell' ? 'H2-O2 Eco Fuel Cell Stack' : 'Lead-Acid Secondary Storage Battery'}
        </h4>
        <span className="text-xs font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">
          {mode === 'fuel_cell' ? 'Efficiency > 70%' : '38% H2SO4 Electrolyte'}
        </span>
      </div>

      <svg viewBox="0 0 550 260" className="w-full h-auto">
        {mode === 'fuel_cell' ? (
          <>
            {/* Anode Chamber */}
            <rect x="80" y="50" width="110" height="170" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="135" y="75" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">H₂ Gas Inlet</text>
            <path d="M 40 100 L 80 100" stroke="#38bdf8" strokeWidth="6" strokeDasharray="4 2" />
            <text x="135" y="140" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">2H₂ + 4OH⁻ →</text>
            <text x="135" y="158" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">4H₂O + 4e⁻</text>

            {/* Central Porous Carbon Electrodes with Catalysts */}
            <rect x="190" y="50" width="30" height="170" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            <rect x="220" y="50" width="110" height="170" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            <text x="275" y="130" textAnchor="middle" fill="#10b981" className="text-xs font-bold">Aqueous KOH</text>
            <text x="275" y="148" textAnchor="middle" fill="#10b981" className="text-xs font-bold">Electrolyte</text>
            <rect x="330" y="50" width="30" height="170" fill="#334155" stroke="#94a3b8" strokeWidth="2" />

            {/* Cathode Chamber */}
            <rect x="360" y="50" width="110" height="170" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
            <text x="415" y="75" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">O₂ Gas Inlet</text>
            <path d="M 470 100 L 510 100" stroke="#f59e0b" strokeWidth="6" strokeDasharray="4 2" />
            <text x="415" y="140" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">O₂ + 2H₂O + 4e⁻</text>
            <text x="415" y="158" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">→ 4OH⁻</text>

            {/* Pure Water Product Outlet */}
            <path d="M 275 220 L 275 250" stroke="#0ea5e9" strokeWidth="6" />
            <text x="275" y="258" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">Clean Water (H₂O) Outlet</text>
          </>
        ) : (
          <>
            {/* Lead Acid Battery Container */}
            <rect x="90" y="40" width="370" height="190" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="3" />
            {/* Electrolyte Liquid */}
            <rect x="96" y="80" width="358" height="144" rx="6" fill="#0284c7" fillOpacity="0.25" />

            {/* Lead Plates (Anode) */}
            <rect x="150" y="60" width="20" height="140" fill="#64748b" rx="2" stroke="#94a3b8" strokeWidth="2" />
            <rect x="210" y="60" width="20" height="140" fill="#64748b" rx="2" stroke="#94a3b8" strokeWidth="2" />
            <text x="190" y="52" textAnchor="middle" fill="#94a3b8" className="text-xs font-bold">Spongy Pb (Anode)</text>

            {/* Lead Dioxide Plates (Cathode) */}
            <rect x="320" y="60" width="20" height="140" fill="#b45309" rx="2" stroke="#f59e0b" strokeWidth="2" />
            <rect x="380" y="60" width="20" height="140" fill="#b45309" rx="2" stroke="#f59e0b" strokeWidth="2" />
            <text x="360" y="52" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">PbO₂ Grid (Cathode)</text>

            {/* Center Label */}
            <text x="275" y="140" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono font-bold">
              38% H₂SO₄ Solution (d = 1.30 g/mL)
            </text>
            <text x="275" y="165" textAnchor="middle" fill="#94a3b8" className="text-[11px] font-mono">
              Pb + PbO₂ + 2H₂SO₄ ⇌ 2PbSO₄ + 2H₂O
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// 5. MAIN COMPONENT IMPLEMENTATION
// ==========================================

export default function C12_ChemistryElectrochemistryCBSESim() {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary' | 'misconceptions'>('discovery');

  // Interactive Lab State Variables
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);

  // Lab 1 State: Galvanic Cell & Nernst Equation
  const [anodeMetal, setAnodeMetal] = useState<string>('Zn');
  const [cathodeMetal, setCathodeMetal] = useState<string>('Cu');
  const [cAnode, setCAnode] = useState<number>(0.01);
  const [cCathode, setCCathode] = useState<number>(1.0);
  const [temperature, setTemperature] = useState<number>(298);
  const [isCellRunning, setIsCellRunning] = useState<boolean>(true);

  // Standard Reduction Potentials E° (V) relative to SHE
  const stdPotentials: Record<string, number> = {
    Zn: -0.763,
    Fe: -0.440,
    Ni: -0.250,
    H2: 0.000,
    Cu: +0.337,
    Ag: +0.799
  };

  // Nernst Calculation
  const eCellCalc = useMemo(() => {
    const eAnode = stdPotentials[anodeMetal] || -0.76;
    const eCathode = stdPotentials[cathodeMetal] || +0.34;
    const eCell = eCathode - eAnode;

    if (eCell <= 0) return { eCell, eCell: 0, deltaG: 0, equilibriumK: 0 };

    const n = 2; // assuming 2-electron transfer for simplicity
    const R = 8.314;
    const F = 96487;
    const Q = cAnode / cCathode;

    const nernstCorrection = ((R * temperature) / (n * F)) * Math.log(Q);
    const eCell = eCell - nernstCorrection;
    const deltaG = -n * F * eCell / 1000; // in kJ
    const equilibriumK = Math.exp((n * F * eCell) / (R * 298.15));

    return { eCell, eCell: Math.max(0, eCell), deltaG, equilibriumK };
  }, [anodeMetal, cathodeMetal, cAnode, cCathode, temperature]);

  // Lab 2 State: Conductance & Kohlrausch
  const [electrolyteType, setElectrolyteType] = useState<'strong' | 'weak'>('weak');
  const [concentration, setConcentration] = useState<number>(0.01);

  const conductanceCalc = useMemo(() => {
    const lambda0 = electrolyteType === 'strong' ? 149.9 : 390.5; // S cm2 mol-1
    const sqrtC = Math.sqrt(concentration);
    let lambdaM = 0;
    if (electrolyteType === 'strong') {
      lambdaM = lambda0 - 80 * sqrtC;
    } else {
      const alpha = 1 / (1 + sqrtC * sqrtC * 100);
      lambdaM = lambda0 * Math.max(0.08, alpha);
    }
    const alpha = lambdaM / lambda0;
    const Ka = (concentration * alpha * alpha) / (1 - alpha || 1e-5);
    const kappa = (lambdaM * concentration) / 1000; // S cm-1

    return { lambda0, lambdaM, alpha, Ka, kappa };
  }, [electrolyteType, concentration]);

  // Lab 3 State: Electrolysis & Faraday
  const [electrolysisSolution, setElectrolysisSolution] = useState<'aqueous_cuso4' | 'molten_nacl' | 'brine_nacl'>('aqueous_cuso4');
  const [electrodeType, setElectrodeType] = useState<'inert_pt' | 'active_cu'>('inert_pt');
  const [currentAmp, setCurrentAmp] = useState<number>(5.0);
  const [timeSec, setTimeSec] = useState<number>(965);

  const electrolysisCalc = useMemo(() => {
    const Q = currentAmp * timeSec;
    const F = 96487;
    let massDeposited = 0;
    let gasVolumeSTP = 0;

    if (electrolysisSolution === 'aqueous_cuso4') {
      const M = 63.5;
      const n = 2;
      massDeposited = (M * Q) / (n * F);
      if (electrodeType === 'inert_pt') {
        // Oxygen gas evolved at anode: 1 mole O2 per 4 moles e-
        gasVolumeSTP = (Q / (4 * F)) * 22.4;
      }
    } else if (electrolysisSolution === 'molten_nacl') {
      const M = 23.0;
      const n = 1;
      massDeposited = (M * Q) / (n * F);
      // Cl2 gas evolved at anode: 1 mole Cl2 per 2 moles e-
      gasVolumeSTP = (Q / (2 * F)) * 22.4;
    } else if (electrolysisSolution === 'brine_nacl') {
      // H2 gas at cathode, Cl2 gas at anode
      gasVolumeSTP = (Q / (2 * F)) * 22.4 * 2; // total gas volume (H2 + Cl2)
    }

    return { Q, massDeposited, gasVolumeSTP };
  }, [electrolysisSolution, electrodeType, currentAmp, timeSec]);

  // Lab 4 State: Batteries & Fuel Cell
  const [batteryMode, setBatteryMode] = useState<'fuel_cell' | 'lead_storage'>('fuel_cell');

  // Gamification & Learning Progress State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [numericInputValue, setNumericInputValue] = useState<string>('');
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [challengeFeedback, setChallengeFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);

  // Sound / Audio effects triggers
  const playSound = (sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // Audio fallback
    }
  };

  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Speech fallback
    }
  };

  // Feedback FX States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Auto-hint timer (10s inactivity)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resetHintTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      const currCh = CHALLENGES[currentChallengeIndex];
      if (currCh && currCh.hints && currCh.hints.length > 0) {
        setCurrentHintText(currCh.hints[0]);
        setShowHint(true);
        playSound('hint');
      }
    }, 12000);
  }, [currentChallengeIndex]);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, resetHintTimer]);

  // BKT State & SM2 SRS State Tracking
  const [bktStates, setBktStates] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    ALL_NODE_IDS.forEach(nodeId => {
      initial[nodeId] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    ALL_NODE_IDS.forEach(nodeId => {
      initial[nodeId] = createReviewItem(nodeId);
    });
    return initial;
  });

  // Discovery Question state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);

  // Predictions State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});

  // Challenge Handling
  const handleAnswerChallenge = (userAnswer: number | string) => {
    const currentCh = CHALLENGES[currentChallengeIndex];
    if (!currentCh) return;

    let isCorrect = false;

    if (currentCh.type === 'mcq') {
      isCorrect = Number(userAnswer) === currentCh.correctIndex;
    } else if (currentCh.type === 'numeric') {
      const val = parseFloat(String(userAnswer));
      if (!isNaN(val) && currentCh.correctAnswer !== undefined) {
        const margin = Math.abs(currentCh.correctAnswer * 0.05) || 0.05;
        isCorrect = Math.abs(val - currentCh.correctAnswer) <= margin;
      }
    }

    // Update BKT & SRS states
    const prevBKT = bktStates[currentCh.nodeId];
    const updatedBKT = bktUpdate(prevBKT, isCorrect);
    setBktStates(prev => ({ ...prev, [currentCh.nodeId]: updatedBKT }));

    const prevSRS = srsItems[currentCh.nodeId];
    const updatedSRS = sm2Update(prevSRS, isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [currentCh.nodeId]: updatedSRS }));

    if (isCorrect) {
      playSound('success');
      setShowSparkle(true);
      setChallengeScore(s => s + 10);
      setStreakCount(s => s + 1);
      setChallengeFeedback({
        text: `Excellent! ${currentCh.explanation}`,
        isCorrect: true
      });
      speakText('Correct answer! Great job.');
      if (streakCount > 0 && streakCount % 3 === 0) {
        setShowConfetti(true);
        playSound('celebration');
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      playSound('error');
      setStreakCount(0);
      setChallengeFeedback({
        text: `Not quite. ${currentCh.explanation}`,
        isCorrect: false
      });
      speakText('Incorrect. Review the explanation and try again.');
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setSelectedMcqOption(null);
    setNumericInputValue('');
    setShowSparkle(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(c => c + 1);
    } else {
      setShowSuccessBanner(true);
      playSound('celebration');
      recordGameScore('electrochemistry_isc_12', challengeScore);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header Navigation Bar */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-emerald-500 rounded-lg shadow-lg">
            <Zap className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              ISC Class 12 Electrochemistry Master Lab
            </h1>
            <p className="text-xs text-slate-400 font-mono">CISCE Syllabus • Nernst Kinetics • Electrolysis • Kohlrausch</p>
          </div>
        </div>

        {/* Global Tab Navigation Buttons */}
        <nav className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl stroke-slate-800 border border-slate-800">
          <button
            onClick={() => { setActiveTab('discovery'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'discovery' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'lab' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Beaker className="w-3.5 h-3.5" /> Interactive Lab
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'challenges' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'summary' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Real-World & Mastery
          </button>
          <button
            onClick={() => { setActiveTab('misconceptions'); playSound('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'misconceptions' ? 'bg-cyan-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Misconception Lab
          </button>
        </nav>
      </header>

      {/* Main Content View Switcher */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">

        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Lab Scenario Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 p-6 rounded-2xl border border-cyan-800/40 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-700/50 text-xs font-mono font-bold rounded-full">
                  REAL SCENARIO
                </span>
                <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-md font-bold text-slate-100">Discovery Pre-Check Question</h3>
              </div>
              <p className="text-sm text-slate-300 font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDiscoverySelected(idx);
                      setDiscoveryAnswered(true);
                      if (idx === DISCOVERY_QUESTION.correctIndex) {
                        playSound('success');
                        speakText('Spot on! You nailed the discovery concept.');
                      } else {
                        playSound('error');
                      }
                    }}
                    className={`p-3 text-left text-xs rounded-xl border transition-all ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="mt-4 p-4 rounded-xl bg-cyan-950/50 border border-cyan-800/50 text-xs text-cyan-200 animate-fadeIn">
                  <span className="font-bold text-amber-400 block mb-1">Key Insight:</span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS ARRAY MAP */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-cyan-300 flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" /> Key Conceptual Predictions
              </h3>
              <div className="space-y-4">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredictionAnswers(prev => ({ ...prev, [idx]: oIdx }));
                            playSound('tap');
                          }}
                          className={`p-2.5 text-left text-xs rounded-lg border transition-all ${
                            predictionAnswers[idx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[idx] !== undefined && (
                      <p className="text-[11px] text-amber-300 font-mono italic">
                        Instruction: {pq.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LAB (5 EXPLORATION STEPS) */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Explorer Navigation Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLabIndex(idx);
                    playSound('tap');
                    speakText(step.title);
                  }}
                  className={`p-3 rounded-xl text-xs font-bold transition-all text-left flex flex-col gap-1 ${
                    selectedLabIndex === idx
                      ? 'bg-cyan-600 text-white shadow-lg ring-2 ring-cyan-400/50'
                      : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-cyan-200 uppercase">Lab {idx + 1}</span>
                  <span className="truncate">{step.title.split(':')[1]}</span>
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-cyan-400" />
                <p className="text-xs text-slate-300">
                  <span className="font-bold text-white">{EXPLORATION_STEPS[selectedLabIndex].title}: </span>
                  {EXPLORATION_STEPS[selectedLabIndex].instruction}
                </p>
              </div>
              <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-2 py-1 rounded border border-cyan-800">
                Node: {EXPLORATION_STEPS[selectedLabIndex].nodeId}
              </span>
            </div>

            {/* LAB 1: GALVANIC & NERNST SIMULATOR */}
            {selectedLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <GalvanicCellDiagram
                    anodeMetal={anodeMetal}
                    cathodeMetal={cathodeMetal}
                    cAnode={cAnode}
                    cCathode={cCathode}
                    eCell={eCellCalc.eCell}
                    isRunning={isCellRunning}
                  />
                </div>

                {/* Controls */}
                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4" /> Half-Cell Controls
                  </h3>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Anode Metal (-):</label>
                    <select
                      value={anodeMetal}
                      onChange={e => { setAnodeMetal(e.target.value); playSound('pop'); }}
                      className="w-full bg-slate-950 border border-slate-700 text-xs rounded-lg p-2 text-white font-mono"
                    >
                      <option value="Zn">Zinc (Zn) - E° = -0.76 V</option>
                      <option value="Fe">Iron (Fe) - E° = -0.44 V</option>
                      <option value="Ni">Nickel (Ni) - E° = -0.25 V</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Cathode Metal (+):</label>
                    <select
                      value={cathodeMetal}
                      onChange={e => { setCathodeMetal(e.target.value); playSound('pop'); }}
                      className="w-full bg-slate-950 border border-slate-700 text-xs rounded-lg p-2 text-white font-mono"
                    >
                      <option value="Cu">Copper (Cu) - E° = +0.34 V</option>
                      <option value="Ag">Silver (Ag) - E° = +0.80 V</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Anode Ion [Zn2+]:</span>
                      <span className="font-mono text-cyan-300">{cAnode} M</span>
                    </div>
                    <input
                      type="range"
                      min="0.001"
                      max="2.0"
                      step="0.01"
                      value={cAnode}
                      onChange={e => setCAnode(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Cathode Ion [Cu2+]:</span>
                      <span className="font-mono text-cyan-300">{cCathode} M</span>
                    </div>
                    <input
                      type="range"
                      min="0.001"
                      max="2.0"
                      step="0.01"
                      value={cCathode}
                      onChange={e => setCCathode(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Temperature (T):</span>
                      <span className="font-mono text-amber-300">{temperature} K ({temperature - 273}°C)</span>
                    </div>
                    <input
                      type="range"
                      min="273"
                      max="373"
                      step="1"
                      value={temperature}
                      onChange={e => setTemperature(parseInt(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Calculated Outputs */}
                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">E°cell (Standard):</span>
                      <span className="text-white font-bold">{eCellCalc.eCell.toFixed(3)} V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ecell (Nernst):</span>
                      <span className="text-emerald-400 font-bold">{eCellCalc.eCell.toFixed(3)} V</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ΔG (Gibbs Energy):</span>
                      <span className="text-amber-400 font-bold">{eCellCalc.deltaG.toFixed(1)} kJ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kc (Equilibrium):</span>
                      <span className="text-cyan-400 font-bold">{eCellCalc.equilibriumK.toExponential(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: CONDUCTANCE & KOHLRAUSCH LAW */}
            {selectedLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ConductanceKohlrauschDiagram
                    electrolyteType={electrolyteType}
                    limitingLambda={conductanceCalc.lambda0}
                    concentration={concentration}
                  />
                </div>

                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4" /> Conductance Parameters
                  </h3>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Electrolyte Classification:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { setElectrolyteType('strong'); playSound('pop'); }}
                        className={`p-2 text-xs rounded-lg font-bold border ${
                          electrolyteType === 'strong'
                            ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Strong (KCl)
                      </button>
                      <button
                        onClick={() => { setElectrolyteType('weak'); playSound('pop'); }}
                        className={`p-2 text-xs rounded-lg font-bold border ${
                          electrolyteType === 'weak'
                            ? 'bg-amber-950 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Weak (CH3COOH)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Concentration (C):</span>
                      <span className="font-mono text-cyan-300">{concentration} M</span>
                    </div>
                    <input
                      type="range"
                      min="0.0001"
                      max="1.0"
                      step="0.005"
                      value={concentration}
                      onChange={e => setConcentration(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Limiting Λm°:</span>
                      <span className="text-white font-bold">{conductanceCalc.lambda0} S cm² mol⁻¹</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Λm:</span>
                      <span className="text-cyan-400 font-bold">{conductanceCalc.lambdaM.toFixed(1)} S cm² mol⁻¹</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Conductivity (κ):</span>
                      <span className="text-emerald-400 font-bold">{conductanceCalc.kappa.toExponential(3)} S cm⁻¹</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dissociation (α):</span>
                      <span className="text-amber-400 font-bold">{(conductanceCalc.alpha * 100).toFixed(1)}%</span>
                    </div>
                    {electrolyteType === 'weak' && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dissociation Ka:</span>
                        <span className="text-purple-400 font-bold">{conductanceCalc.Ka.toExponential(2)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: ELECTROLYSIS & FARADAY LAWS */}
            {selectedLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ElectrolysisCellDiagram
                    electrolyte={electrolysisSolution}
                    electrodeType={electrodeType}
                    current={currentAmp}
                    timeSec={timeSec}
                    massDeposited={electrolysisCalc.massDeposited}
                    gasVolumeSTP={electrolysisCalc.gasVolumeSTP}
                  />
                </div>

                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4" /> Electrolysis Cell Inputs
                  </h3>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Electrolyte Solution:</label>
                    <select
                      value={electrolysisSolution}
                      onChange={e => {
                        setElectrolysisSolution(e.target.value as any);
                        playSound('pop');
                      }}
                      className="w-full bg-slate-950 border border-slate-700 text-xs rounded-lg p-2 text-white font-mono"
                    >
                      <option value="aqueous_cuso4">Aqueous CuSO4</option>
                      <option value="molten_nacl">Molten NaCl (800°C)</option>
                      <option value="brine_nacl">Concentrated Brine (NaCl aq)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Electrode Material:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => { setElectrodeType('inert_pt'); playSound('pop'); }}
                        className={`p-2 text-xs rounded-lg font-bold border ${
                          electrodeType === 'inert_pt'
                            ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Inert Platinum (Pt)
                      </button>
                      <button
                        onClick={() => { setElectrodeType('active_cu'); playSound('pop'); }}
                        className={`p-2 text-xs rounded-lg font-bold border ${
                          electrodeType === 'active_cu'
                            ? 'bg-amber-950 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        Active Copper (Cu)
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Electric Current (I):</span>
                      <span className="font-mono text-cyan-300">{currentAmp} A</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="20.0"
                      step="0.5"
                      value={currentAmp}
                      onChange={e => setCurrentAmp(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Time (t):</span>
                      <span className="font-mono text-amber-300">{timeSec} s ({(timeSec / 60).toFixed(1)} min)</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="3600"
                      step="50"
                      value={timeSec}
                      onChange={e => setTimeSec(parseInt(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: BATTERIES & FUEL CELLS */}
            {selectedLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FuelCellDiagram mode={batteryMode} isOperating={true} />
                </div>

                <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Battery className="w-4 h-4" /> Battery System Selection
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => { setBatteryMode('fuel_cell'); playSound('pop'); }}
                      className={`p-3 text-left rounded-xl border text-xs font-bold ${
                        batteryMode === 'fuel_cell'
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      🌱 H2-O2 Eco Fuel Cell
                      <span className="block text-[10px] text-slate-400 font-normal mt-1">Continuous zero-emission energy generator.</span>
                    </button>
                    <button
                      onClick={() => { setBatteryMode('lead_storage'); playSound('pop'); }}
                      className={`p-3 text-left rounded-xl border text-xs font-bold ${
                        batteryMode === 'lead_storage'
                          ? 'bg-amber-950 border-amber-500 text-amber-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      🔋 Lead Storage Battery (Car Cell)
                      <span className="block text-[10px] text-slate-400 font-normal mt-1">Rechargeable secondary battery (38% H2SO4).</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: CORROSION KINETICS */}
            {selectedLabIndex === 4 && (
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-md font-bold text-amber-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" /> Electrochemical Rusting & Protection Simulator
                </h3>
                <p className="text-xs text-slate-300">
                  Iron corrosion is an electrochemical micro-cell where Fe acts as anode and dissolved O2 acts as cathode:
                  <span className="font-mono text-cyan-300 block mt-1">Fe → Fe²⁺ + 2e⁻ (Anode) | O₂ + 4H⁺ + 4e⁻ → 2H₂O (Cathode)</span>
                </p>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-around text-center">
                  <div>
                    <span className="text-xs text-slate-400">Zinc Coating (Galvanization)</span>
                    <p className="text-emerald-400 font-bold text-sm">Sacrificial Anode (Protected)</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Copper Coating</span>
                    <p className="text-rose-400 font-bold text-sm">Accelerates Rusting if Scratched!</p>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Magnesium Blocks</span>
                    <p className="text-cyan-400 font-bold text-sm">Underground Pipe Protection</p>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS ARRAY MAP */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-emerald-300 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" /> Lab Observation Analysis
              </h3>
              <div className="space-y-4">
                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 text-xs rounded-lg border ${
                            oIdx === oq.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>
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

        {/* TAB 3: 22 PROGRESSIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs text-cyan-400 font-mono uppercase font-bold">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                      ? 'bg-blue-950 text-blue-300 border border-blue-700'
                      : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-300 border border-amber-700'
                      : 'bg-rose-950 text-rose-300 border border-rose-700'
                  }`}>
                    {CHALLENGES[currentChallengeIndex].difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Node: {CHALLENGES[currentChallengeIndex].nodeId}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <span className="text-slate-300">Score: <strong className="text-amber-400">{challengeScore}</strong></span>
                <span className="text-slate-300">Streak: <strong className="text-emerald-400">{streakCount} 🔥</strong></span>
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6 relative">
              <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </p>

              {/* MCQ Challenge Type */}
              {CHALLENGES[currentChallengeIndex].type === 'mcq' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={challengeFeedback !== null}
                      onClick={() => {
                        setSelectedMcqOption(oIdx);
                        handleAnswerChallenge(oIdx);
                      }}
                      className={`p-3.5 text-left text-xs rounded-xl border transition-all ${
                        selectedMcqOption === oIdx
                          ? oIdx === CHALLENGES[currentChallengeIndex].correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input Challenge Type */}
              {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
                <div className="flex gap-3 items-center max-w-md">
                  <input
                    type="number"
                    step="any"
                    value={numericInputValue}
                    onChange={e => setNumericInputValue(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="flex-1 bg-slate-950 border border-slate-700 text-sm rounded-xl p-3 text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-xs text-slate-400 font-mono">{CHALLENGES[currentChallengeIndex].unit}</span>
                  <button
                    onClick={() => handleAnswerChallenge(numericInputValue)}
                    className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition"
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Feedback Alert */}
              {challengeFeedback && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
                }`}>
                  <div className="font-bold mb-1 flex items-center gap-2">
                    {challengeFeedback.isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                    {challengeFeedback.isCorrect ? 'Correct Solution' : 'Incorrect'}
                  </div>
                  {challengeFeedback.text}
                </div>
              )}

              {/* Next Challenge Button */}
              {challengeFeedback && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-500 hover:from-cyan-500 hover:to-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
                  >
                    Next Challenge <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: REAL WORLD & MASTERY SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY MANDATORY RENDER */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-950 rounded-lg border border-emerald-500/30">
                  <Flame className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono space-y-1">
                    <span className="text-emerald-400 font-bold block">{step.split(':')[0]}</span>
                    <span>{step.split(':')[1]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Curriculum Mastery Tracker */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-cyan-300 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-cyan-400" /> Syllabus Node Mastery Breakdown (22 CISCE Nodes)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const info = NODE_DEFINITIONS[nodeId];
                  const mastery = masteryProb(bktStates[nodeId]);
                  return (
                    <div key={nodeId} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">{nodeId}</span>
                        <span className="text-[10px] font-mono bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded">
                          {(mastery * 100).toFixed(0)}% Mastered
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-200">{info?.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{info?.eli5}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MISCONCEPTION LAB */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-md font-bold text-rose-400 flex items-center gap-2">
                <Shield className="w-5 h-5" /> ISC Electrochemistry Misconception Debunker
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore common exam pitfalls and intuitive traps identified in CISCE board assessments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold text-slate-200">{m.title}</h4>
                  </div>
                  <div className="p-3 bg-rose-950/40 rounded-lg border border-rose-800/40 text-xs text-rose-300">
                    <strong className="block mb-1 text-rose-400">Common Misconception:</strong>
                    {m.misconception}
                  </div>
                  <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-800/40 text-xs text-emerald-300">
                    <strong className="block mb-1 text-emerald-400">Scientific Correction:</strong>
                    {m.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MANDATORY FEEDBACK COMPONENTS IN JSX */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Electrochemistry Simulation Complete!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}