'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- ALL NODE IDS ---
const ALL_NODE_IDS = [
  'c12_bt_cbse_374', 'c12_bt_cbse_375', 'c12_bt_cbse_376', 'c12_bt_cbse_377', 'c12_bt_cbse_378',
  'c12_bt_cbse_379', 'c12_bt_cbse_380', 'c12_bt_cbse_381', 'c12_bt_cbse_382', 'c12_bt_cbse_383',
  'c12_bt_cbse_384', 'c12_bt_cbse_385', 'c12_bt_cbse_386', 'c12_bt_cbse_387', 'c12_bt_cbse_388',
  'c12_bt_cbse_389', 'c12_bt_cbse_390', 'c12_bt_cbse_391', 'c12_bt_cbse_392', 'c12_bt_cbse_393',
  'c12_bt_cbse_394', 'c12_bt_cbse_395', 'c12_bt_cbse_396', 'c12_bt_cbse_397', 'c12_bt_cbse_398',
  'c12_bt_cbse_399', 'c12_bt_cbse_400', 'c12_bt_cbse_401', 'c12_bt_cbse_402', 'c12_bt_cbse_403',
  'c12_bt_cbse_404', 'c12_bt_cbse_405', 'c12_bt_cbse_406', 'c12_bt_cbse_407', 'c12_bt_cbse_408',
  'c12_bt_cbse_409', 'c12_bt_cbse_410', 'c12_bt_cbse_411', 'c12_bt_cbse_412', 'c12_bt_cbse_413',
  'c12_bt_cbse_414', 'c12_bt_cbse_415', 'c12_bt_cbse_416', 'c12_bt_cbse_417', 'c12_bt_cbse_418',
  'c12_bt_cbse_419', 'c12_bt_cbse_420', 'c12_bt_cbse_421', 'c12_bt_cbse_422', 'c12_bt_cbse_423',
  'c12_bt_cbse_424', 'c12_bt_cbse_425', 'c12_bt_cbse_426', 'c12_bt_cbse_427'
];

// --- TYPES & INTERFACES ---
interface Scenario {
  title: string;
  intro: string;
  context: string;
}

interface DiscoveryQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  hintAfter: string;
}

interface Misconception {
  id: string;
  statement: string;
  correction: string;
  nodeId: string;
}

interface DiagnosticQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  itemsToSort?: string[];
  correctSortedOrder?: string[];
  categories?: { label: string; items: string[] }[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

// --- MANDATORY SECTIONS ---

const SCENARIO: Scenario = {
  title: 'Apex Bio-Tech Industrial Fermentation & Culture Lab',
  intro: 'Welcome to the Industrial Microbiology & Bioprocess Center. As chief biotechnologist, you are tasked with isolating pure bacterial cultures, formulating optimal growth media, operating high-pressure autoclaves, and optimizing microbial growth kinetics for recombinant protein production.',
  context: 'You will manipulate growth parameters (temperature, pH, dissolved oxygen, nutrients), test sterilization parameters, isolate single colonies via quadrant streak plating, and calculate generation times to maximize yield.'
};

const DISCOVERY_QUESTION: DiscoveryQuestion = {
  question: 'Why does boiling nutrient broth in an open beaker fail to achieve true sterilization, whereas an autoclave operating at 121°C for 15 minutes achieves complete sterility?',
  options: [
    'Boiling at 100°C destroys all viruses but cannot denature bacterial enzymes.',
    'Bacterial endospores (e.g., Bacillus, Clostridium) survive 100°C boiling; high pressure (15 psi) allows water to reach 121°C, denaturing endospore proteins.',
    'Autoclaves use UV radiation combined with steam to eliminate non-pathogenic bacteria.',
    'Boiling increases oxygen solubility, which promotes bacterial spore germination.'
  ],
  correctIndex: 1,
  hintAfter: 'Standard boiling at 100°C destroys vegetative cells but leaves heat-resistant bacterial endospores intact. Steam under 15 psi pressure reaches 121°C, which rapidly destroys endospore structures.'
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    statement: 'Boiling water at 100°C kills all microorganisms and guarantees total sterility.',
    correction: 'Boiling kills vegetative cells but fails to destroy bacterial endospores of species like Bacillus subtilis or Clostridium botulinum, which require 121°C moist heat under pressure.',
    nodeId: 'c12_bt_cbse_393'
  },
  {
    id: 'misc_2',
    statement: 'The lag phase of microbial growth is a period of cell rest where no metabolic activity occurs.',
    correction: 'During the lag phase, cells are intensely metabolically active—synthesizing enzymes, RNA, ATP, and structural proteins—even though net cell division is zero.',
    nodeId: 'c12_bt_cbse_409'
  },
  {
    id: 'misc_3',
    statement: 'Adding excess nutrient substrate will infinitely increase the specific growth rate (μ) of bacteria.',
    correction: 'According to Monod kinetics, specific growth rate (μ) approaches a maximum rate (μmax) as substrate concentration increases and plateaus due to enzyme saturation.',
    nodeId: 'c12_bt_cbse_411'
  },
  {
    id: 'misc_4',
    statement: 'Selective media and differential media perform identical functions in microbiology.',
    correction: 'Selective media inhibit unwanted microbes while supporting desired ones (e.g., antibiotics or high salt), whereas differential media distinguish between organisms based on biochemical reactions (e.g., pH indicators for lactose fermentation).',
    nodeId: 'c12_bt_cbse_391'
  },
  {
    id: 'misc_5',
    statement: 'Direct microscopic counting using a Hemocytometer gives the exact count of viable (living) cells.',
    correction: 'Direct counting counts both living and dead cells unless viable staining (e.g., trypan blue or fluorescein diacetate) is applied. CFU plating counts viable cells only.',
    nodeId: 'c12_bt_cbse_412'
  },
  {
    id: 'misc_6',
    statement: 'Pasteurization sterlizes milk by killing all living microorganisms and endospores.',
    correction: 'Pasteurization is heat treatment designed to kill key pathogens (e.g., Mycobacterium tuberculosis, Coxiella burnetii) and spoilage microbes, but does NOT achieve complete sterilization.',
    nodeId: 'c12_bt_cbse_396'
  }
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c12_bt_cbse_376',
    question: 'Louis Pasteur used swan-neck flasks to disprove spontaneous generation because:',
    options: [
      'The curved neck trapped airborne microorganisms while allowing air exchange',
      'The neck sealed the broth completely from oxygen',
      'The glass absorbed infrared light and killed bacteria',
      'The neck generated vacuum pressure preventing microbial movement'
    ],
    correctIndex: 0,
    explanation: 'The swan-neck allowed air to pass in and out freely, but gravity trapped airborne dust and microbes in the bend, preventing broth contamination.'
  },
  {
    id: 'diag_2',
    nodeId: 'c12_bt_cbse_377',
    question: 'Which of Koch\'s postulates is violated when a pathogen cannot be cultured in artificial cell-free growth media?',
    options: [
      'Postulate 1: Pathogen must be present in all disease cases',
      'Postulate 2: Pathogen must be isolated and grown in pure culture',
      'Postulate 3: Cultured pathogen must cause disease in healthy host',
      'Postulate 4: Pathogen must be re-isolated from inoculated host'
    ],
    correctIndex: 1,
    explanation: 'Postulate 2 requires growing the microorganism in pure culture, which fails for obligate intracellular parasites like Treponema pallidum or Mycobacterium leprae.'
  },
  {
    id: 'diag_3',
    nodeId: 'c12_bt_cbse_395',
    question: 'Standard steam sterilization in an autoclave requires which operating parameters?',
    options: [
      '100°C at 0 psi for 60 minutes',
      '121°C at 15 psi (103 kPa) for 15-20 minutes',
      '160°C at 30 psi for 5 minutes',
      '80°C at 5 psi for 120 minutes'
    ],
    correctIndex: 1,
    explanation: 'Standard autoclaving uses saturated steam at 121°C (250°F) under 15 psi gauge pressure for 15 to 20 minutes.'
  },
  {
    id: 'diag_4',
    nodeId: 'c12_bt_cbse_411',
    question: 'If a bacterial culture grows from 10^3 cells to 10^6 cells in 3 hours during exponential phase, what is the generation time (g)?',
    options: [
      'approx 18.1 minutes',
      'approx 30.0 minutes',
      'approx 45.2 minutes',
      'approx 60.0 minutes'
    ],
    correctIndex: 0,
    explanation: 'n = (log10(10^6) - log10(10^3)) / 0.301 = 3 / 0.301 = 9.96 generations. g = 180 min / 9.96 = 18.06 minutes.'
  },
  {
    id: 'diag_5',
    nodeId: 'c12_bt_cbse_402',
    question: 'What is the primary objective of performing a 4-quadrant streak plate technique?',
    options: [
      'To measure total protein concentration in media',
      'To achieve mechanical dilution and isolate single discrete colonies',
      'To induce endospore formation in Gram-negative bacteria',
      'To increase bacterial growth rate by aerating agar'
    ],
    correctIndex: 1,
    explanation: 'Streaking sequentially dilutes microbial density across agar quadrants so individual cells settle far apart and grow into clonal colonies.'
  },
  {
    id: 'diag_6',
    nodeId: 'c12_bt_cbse_388',
    question: 'A chemically defined (synthetic) medium is distinguished by:',
    options: [
      'Containing complex unknown digest mixtures like peptone and yeast extract',
      'Exact chemical identity and precise quantitative composition of every ingredient',
      'Liquid state at room temperature with high agar concentration',
      'Inability to support heterotrophic bacterial species'
    ],
    correctIndex: 1,
    explanation: 'Defined media contain known pure chemical compounds in exact specified concentrations with no undefined natural extracts.'
  },
  {
    id: 'diag_7',
    nodeId: 'c12_bt_cbse_424',
    question: 'Thermophilic bacteria possess specialized adaptations including:',
    options: [
      'High unsaturated fatty acids in membrane and heat-labile enzymes',
      'Heat-stable enzymes with dense hydrophobic cores and saturated membrane lipids',
      'Loss of peptidoglycan cell walls to resist osmotic pressure',
      'Inability to synthesize ATP at temperatures above 30°C'
    ],
    correctIndex: 1,
    explanation: 'Thermophiles maintain membrane integrity with saturated fatty acids and utilize thermostable proteins rich in salt bridges and hydrophobic cores.'
  },
  {
    id: 'diag_8',
    nodeId: 'c12_bt_cbse_413',
    question: 'During the stationary phase of a batch microbial growth curve, cell population numbers remain constant because:',
    options: [
      'Binary fission halts completely due to total DNA degradation',
      'Rate of cell division equals rate of cell death due to nutrient depletion and toxin buildup',
      'Bacteria transform into viruses',
      'Cells double every 5 minutes while dead cells vanish'
    ],
    correctIndex: 1,
    explanation: 'Stationary phase occurs when growth rate equals death rate (net growth = 0) caused by substrate exhaustion and toxic metabolic byproduct accumulation.'
  }
];

const DEFAULT_PROPS: SimProps = {};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Microbial Growth Kinetics & Curve Simulator',
    instruction: 'Adjust Temperature, pH, Dissolved Oxygen, and Initial Inoculum. Observe how specific growth rate (μ), generation time (g), and the 4 growth phases (Lag, Log, Stationary, Death) respond live on the batch growth kinetics graph.',
    interactionType: 'kinetics-simulator',
    nodeId: 'c12_bt_cbse_408'
  },
  {
    title: 'Lab 2: Autoclave & Thermal Sterilization Rig',
    instruction: 'Set steam pressure (psi), chamber temperature (°C), and exposure duration (min). Calculate the D-value log-reduction of bacterial endospores (Geobacillus stearothermophilus) to verify sterility assurance level (SAL = 10^-6).',
    interactionType: 'sterilization-rig',
    nodeId: 'c12_bt_cbse_395'
  },
  {
    title: 'Lab 3: Pure Culture Isolation & Dilution Plating',
    instruction: 'Perform simulated 4-Quadrant Streak Plating or Serial Dilution Spread Plating. Calculate Colony Forming Units per mL (CFU/mL) from colony count and dilution factors.',
    interactionType: 'streak-plating',
    nodeId: 'c12_bt_cbse_402'
  },
  {
    title: 'Lab 4: Media Formulator & Selective/Differential Lab',
    instruction: 'Synthesize custom culture media (Defined vs Complex, MacConkey, Mannitol Salt Agar). Test response against Gram-positive (Staphylococcus) vs Gram-negative (E. coli) microorganisms.',
    interactionType: 'media-formulator',
    nodeId: 'c12_bt_cbse_391'
  },
  {
    title: 'Lab 5: Environmental Microbial Classifier',
    instruction: 'Expose unknown isolates to varying temperature ranges (4°C to 95°C) and oxygen tubes (fluid thioglycollate broth) to classify them into Psychrophiles, Mesophiles, Thermophiles, Aerobes, or Anaerobes.',
    interactionType: 'env-classifier',
    nodeId: 'c12_bt_cbse_424'
  }
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'If you double the initial inoculum (N0) of E. coli in exponential phase while keeping growth conditions constant, how will the specific growth rate (μ) change?',
    options: [
      'μ will double because more cells are dividing simultaneously',
      'μ will remain unchanged because specific growth rate is an intrinsic property under set conditions',
      'μ will decrease by 50% due to space competition',
      'μ will drop to zero immediately'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, double initial inoculum N0 while keeping T=37°C, pH=7.0. Observe that slope μ in log phase remains constant.',
    nodeId: 'c12_bt_cbse_411'
  },
  {
    question: 'Predict the outcome when E. coli and Staphylococcus aureus are cultured on MacConkey agar media containing bile salts and crystal violet.',
    options: [
      'Both organisms grow with pink colonies',
      'E. coli (Gram-negative) grows forming pink/red lactose-fermenting colonies; S. aureus (Gram-positive) is inhibited',
      'S. aureus grows normally while E. coli cells undergo lysis',
      'Neither organism grows due to antibiotic activity'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, select MacConkey Agar media and inoculate with Gram-negative vs Gram-positive cultures.',
    nodeId: 'c12_bt_cbse_391'
  }
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you observe about the slope of the log-transformed cell density graph during the Exponential (Log) phase?',
    observableOptions: [
      'The slope is zero (horizontal line)',
      'The slope is constant and positive, representing a linear rise in log(N)',
      'The slope drops sharply downwards to zero',
      'The slope fluctuates rapidly up and down'
    ],
    correctIndex: 1,
    nodeId: 'c12_bt_cbse_423'
  },
  {
    question: 'In the fluid thioglycollate tube observation, where do obligate anaerobic bacteria accumulate?',
    observableOptions: [
      'Exclusively at the top near the oxygen-rich surface',
      'Uniformly distributed throughout the entire tube',
      'Exclusively at the bottom of the tube where oxygen concentration is zero',
      'Forming a distinct ring in the middle zone only'
    ],
    correctIndex: 2,
    nodeId: 'c12_bt_cbse_425'
  }
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Bioreactor Scale-Up for Recombinant Insulin Production',
  description: 'Apply growth kinetics calculations and sterility assurance testing to optimize a 10,000-Liter industrial fermenter producing recombinant human insulin.',
  steps: [
    'Step 1: Sterilize 10,000 L liquid culture medium in situ using continuous high-temperature short-time thermal sterilization (140°C for 2 minutes).',
    'Step 2: Inoculate with 100 L of pure E. coli seed culture (N0 = 1.0 x 10^7 cells/mL).',
    'Step 3: Maintain growth conditions at 37°C, pH 7.0, and dissolved oxygen at 30% saturation during exponential phase (generation time g = 20 min).',
    'Step 4: Calculate final biomass cell count after 6 hours of exponential growth: N(t) = 1.0x10^7 * 2^(18) = 2.62 x 10^12 cells/mL.'
  ]
};

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7) ---
  {
    id: 'ch_f1',
    nodeId: 'c12_bt_cbse_376',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which historical scientist definitively disproved spontaneous generation using swan-neck flask experiments?',
    options: ['Robert Koch', 'Louis Pasteur', 'Anton van Leeuwenhoek', 'Alexander Fleming'],
    correctIndex: 1,
    explanation: 'Louis Pasteur demonstrated that boiled broth remained sterile inside a swan-neck flask as long as dust microbes were trapped in the neck.',
    hints: ['Think of pasteurization.', 'He used bent glass flasks to trap airborne microbes.', 'French microbiologist (1822–1895).']
  },
  {
    id: 'ch_f2',
    nodeId: 'c12_bt_cbse_381',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Who designed the shallow circular glass dish with a overlapping cover used universally for solid culture media?',
    options: ['Julius Richard Petri', 'Robert Koch', 'Gottlieb Haberlandt', 'Edward Jenner'],
    correctIndex: 0,
    explanation: 'Julius Richard Petri, an assistant to Robert Koch, invented the Petri dish in 1887.',
    hints: ['The dish bears his name.', 'He worked as Koch\'s assistant.', 'Petri dish.']
  },
  {
    id: 'ch_f3',
    nodeId: 'c12_bt_cbse_390',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the primary gelling agent used in solid microbiological media, isolated from red algae?',
    options: ['Gelatin', 'Agar-agar', 'Pectin', 'Starch'],
    correctIndex: 1,
    explanation: 'Agar-agar, extracted from Rhodophyta (e.g., Gracilaria, Gelidium), melts at ~85°C and solidifies at ~40-42°C, making it ideal for bacterial culture.',
    hints: ['Extracted from red seaweed.', 'Melts around 85-90°C and solidifies at ~42°C.', 'It is non-biodegradable by most bacteria.']
  },
  {
    id: 'ch_f4',
    nodeId: 'c12_bt_cbse_408',
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Categorize the descriptions into the correct bacterial growth phase.',
    categories: [
      { label: 'Lag Phase', items: ['Enzyme synthesis, zero net cell division', 'Cells adapt to new medium'] },
      { label: 'Log (Exponential) Phase', items: ['Maximal constant division rate', 'Binary fission at minimum generation time'] },
      { label: 'Stationary Phase', items: ['Growth rate equals death rate', 'Nutrient depletion and toxin accumulation'] }
    ],
    explanation: 'Lag phase is adaptation; Log phase is maximal doubling; Stationary phase is equilibrium between division and death.',
    hints: ['Lag has no net doubling.', 'Log features exponential slope.', 'Stationary is plateaued count.']
  },
  {
    id: 'ch_f5',
    nodeId: 'c12_bt_cbse_395',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What standard temperature and gauge pressure are maintained in an autoclave for routine sterilization?',
    options: ['100°C at 0 psi', '121°C at 15 psi', '150°C at 30 psi', '80°C at 10 psi'],
    correctIndex: 1,
    explanation: 'Autoclaves typically operate at 121°C (250°F) under 15 pounds per square inch (psi) steam pressure for 15-20 minutes.',
    hints: ['Water boils at 100°C at 1 atm.', 'Pressure raises boiling point to 121°C.', '15 psi gauge pressure.']
  },
  {
    id: 'ch_f6',
    nodeId: 'c12_bt_cbse_410',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The asexual reproduction process by which prokaryotes split into two daughter cells of equal size is:',
    options: ['Mitosis', 'Binary Fission', 'Budding', 'Sporulation'],
    correctIndex: 1,
    explanation: 'Prokaryotes reproduce primarily via binary fission, duplicating their circular chromosome and forming a septum.',
    hints: ['Binary means two.', 'Fission means splitting.', 'Standard prokaryotic replication.']
  },
  {
    id: 'ch_f7',
    nodeId: 'c12_bt_cbse_424',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Microorganisms with an optimal growth temperature between 20°C and 45°C (human pathogens around 37°C) are termed:',
    options: ['Psychrophiles', 'Mesophiles', 'Thermophiles', 'Hyperthermophiles'],
    correctIndex: 1,
    explanation: 'Mesophiles prefer moderate temperatures (20–45°C); human pathogens are mesophiles adapted to body temperature (~37°C).',
    hints: ['Meso means middle or moderate.', 'Human body temperature falls in this group.', 'Mesophiles.']
  },

  // --- STANDARD TIER (8) ---
  {
    id: 'ch_s1',
    nodeId: 'c12_bt_cbse_411',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A bacterial culture increases from N0 = 1,000 cells/mL to N = 32,000 cells/mL in 150 minutes of exponential growth. Calculate the generation time (g) in minutes.',
    correctAnswer: 30,
    tolerance: 0.5,
    explanation: 'N = N0 * 2^n => 32,000 / 1,000 = 32 = 2^5 => n = 5 generations. g = total time / n = 150 min / 5 = 30 minutes.',
    hints: ['Find number of doublings n: 32,000/1,000 = 32 = 2^n.', '2^5 = 32, so n = 5.', 'g = 150 min / 5.']
  },
  {
    id: 'ch_s2',
    nodeId: 'c12_bt_cbse_415',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the specific growth rate (μ in hr^-1) for E. coli with a generation time (g) of 0.5 hours (30 minutes). [μ = ln(2) / g = 0.693 / g]',
    correctAnswer: 1.386,
    tolerance: 0.05,
    explanation: 'μ = ln(2) / g = 0.69315 / 0.5 hr = 1.386 hr^-1.',
    hints: ['Formula: μ = 0.693 / g.', 'g = 0.5 hours.', '0.693 / 0.5 = 1.386.']
  },
  {
    id: 'ch_s3',
    nodeId: 'c12_bt_cbse_402',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why must the inoculating loop be flamed and cooled between each quadrant streak in the 4-quadrant streak plate method?',
    options: ['To kill all bacteria so no colonies grow', 'To dilute the cell density by carrying only a small fraction of cells from the previous quadrant', 'To fix the bacteria permanently onto the agar substrate', 'To alter the pH of the agar surface'],
    correctIndex: 1,
    explanation: 'Flaming sterilizes the loop. Touching the previous quadrant picks up a small sample, diluting the inoculum step-by-step to yield isolated single colonies.',
    hints: ['Flaming removes all living cells from the loop.', 'Then you touch the edge of the prior quadrant.', 'This achieves stepwise dilution.']
  },
  {
    id: 'ch_s4',
    nodeId: 'c12_bt_cbse_391',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Mannitol Salt Agar (MSA) contains 7.5% NaCl and mannitol with phenol red pH indicator. How does it function as both selective and differential media?',
    options: [
      'It selects for Gram-negative bacteria and differentiates glucose fermenters',
      'High salt selects for halotolerant Staphylococci; mannitol fermentation turns phenol red to yellow due to acid',
      'It selects for fungi and differentiates bacterial spores',
      'It selects for anaerobic bacteria and differentiates gas producers'
    ],
    correctIndex: 1,
    explanation: '7.5% NaCl inhibits non-halotolerant organisms (selective). S. aureus ferments mannitol, lowering pH and turning red agar to yellow (differential).',
    hints: ['7.5% NaCl is very high osmotic pressure.', 'Phenol red turns yellow under acidic conditions.', 'Staphylococcus aureus ferments mannitol.']
  },
  {
    id: 'ch_s5',
    nodeId: 'c12_bt_cbse_399',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which sterilization method is imperative for heat-labile biological solutions such as enzyme solutions, antibiotics, and serum derivatives?',
    options: ['Autoclaving at 121°C', 'Hot air oven at 160°C', 'Membrane filtration (0.22 μm pore size)', 'Incineration'],
    correctIndex: 2,
    explanation: '0.22 μm membrane filters physically trap bacteria while allowing heat-sensitive proteins and antibiotics to pass undamaged.',
    hints: ['Heat de-natures enzymes and antibiotics.', 'Filter pores smaller than bacterial cells (0.22 μm).', 'Membrane filtration.']
  },
  {
    id: 'ch_s6',
    nodeId: 'c12_bt_cbse_412',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In a serial dilution experiment, 0.1 mL of a 10^-5 dilution is plated on agar. After incubation, 150 colonies are counted. Calculate the original sample concentration in CFU/mL. [CFU/mL = Colonies / (Volume * Dilution Factor)]',
    correctAnswer: 150000000,
    tolerance: 1000000,
    explanation: 'CFU/mL = 150 / (0.1 mL * 10^-5) = 150 / 10^-6 = 150 * 10^6 = 1.5 x 10^8 CFU/mL (150,000,000).',
    hints: ['CFU/mL = count / (0.1 * 10^-5)', 'Volume = 10^-1 mL.', '150 / 10^-6 = 1.5 x 10^8.']
  },
  {
    id: 'ch_s7',
    nodeId: 'c12_bt_cbse_425',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'An organism grows luxuriously throughout a fluid thioglycollate broth tube, but exhibits dense growth near the top. How is it classified?',
    options: ['Obligate Aerobe', 'Obligate Anaerobe', 'Facultative Anaerobe', 'Microaerophile'],
    correctIndex: 2,
    explanation: 'Facultative anaerobes can perform aerobic respiration (generating more ATP near top) but switch to fermentation/anaerobic respiration when O2 is absent.',
    hints: ['Can live with or without oxygen.', 'Grows better with oxygen (top).', 'Facultative anaerobe.']
  },
  {
    id: 'ch_s8',
    nodeId: 'c12_bt_cbse_377',
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Arrange Koch\'s Postulates in correct sequential order.',
    itemsToSort: [
      'Microorganism must be isolated from diseased host and grown in pure culture',
      'Microorganism must be found in abundance in all diseased organisms but not in healthy ones',
      'Same microorganism must be re-isolated from experimentally infected host',
      'Cultured microorganism should cause disease when inoculated into a healthy host'
    ],
    correctSortedOrder: [
      'Microorganism must be found in abundance in all diseased organisms but not in healthy ones',
      'Microorganism must be isolated from diseased host and grown in pure culture',
      'Cultured microorganism should cause disease when inoculated into a healthy host',
      'Same microorganism must be re-isolated from experimentally infected host'
    ],
    explanation: 'Postulate 1: Association -> Postulate 2: Pure culture isolation -> Postulate 3: Inoculation & reproduction of disease -> Postulate 4: Re-isolation.',
    hints: ['First observe disease association.', 'Isolate pure culture second.', 'Inoculate test host third.', 'Re-isolate last.']
  },

  // --- ADVANCED TIER (9) ---
  {
    id: 'ch_a1',
    nodeId: 'c12_bt_cbse_415',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A fermenter inoculated with N0 = 5.0 x 10^4 cells/mL reaches N = 6.4 x 10^7 cells/mL in 7 hours. Calculate the specific growth rate (μ) in hr^-1. [Formula: μ = (ln(N) - ln(N0)) / t]',
    correctAnswer: 1.022,
    tolerance: 0.03,
    explanation: 'ln(6.4x10^7) = 17.974, ln(5.0x10^4) = 10.820. Δln = 7.154. μ = 7.154 / 7 hr = 1.022 hr^-1.',
    hints: ['ln(6.4e7) = 17.974', 'ln(5.0e4) = 10.820', 'μ = (17.974 - 10.820) / 7 = 1.022']
  },
  {
    id: 'ch_a2',
    nodeId: 'c12_bt_cbse_427',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'To maximize secondary metabolite production (e.g., penicillin antibiotic) in industrial fermentation, in which phase should the bioreactor be maintained?',
    options: [
      'Lag Phase',
      'Exponential (Log) Phase',
      'Stationary Phase (idiophase)',
      'Death Phase'
    ],
    correctIndex: 2,
    explanation: 'Primary metabolites (growth-linked) are produced in log phase (trophophase). Secondary metabolites (e.g., antibiotics) are produced in stationary phase (idiophase) under nutrient stress.',
    hints: ['Secondary metabolites are non-growth linked.', 'Produced under nutrient starvation or limitation.', 'Idiophase corresponds to stationary phase.']
  },
  {
    id: 'ch_a3',
    nodeId: 'c12_bt_cbse_398',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why is non-ionizing UV radiation (254 nm) suitable for surface sterilization of biosafety cabinets but unsuitable for sterilizing pre-packaged liquid media in plastic bottles?',
    options: ['UV radiation generates heat that melts plastic', 'UV light has low penetrating power and cannot pass through glass, plastic, or liquid turbid solutions', 'UV light turns water into hydrogen gas exploding bottles', 'UV radiation only activates fungal spores'],
    correctIndex: 1,
    explanation: 'UV light (254 nm) induces pyrimidine/thymine dimers in DNA but lacks penetrating power; it is absorbed by glass, plastic, and turbid liquids.',
    hints: ['UV light forms thymine dimers.', 'Think about light penetration through solid barriers.', 'UV lacks high energy photon depth like Gamma rays.']
  },
  {
    id: 'ch_a4',
    nodeId: 'c12_bt_cbse_378',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Gottlieb Haberlandt (1902) proposed the concept of plant cell totipotency. What does totipotency signify in biotechnology?',
    options: [
      'The ability of plant cells to produce toxins against viruses',
      'The inherent capacity of a single nucleated cell to regenerate into a complete whole organism',
      'The process of bacterial endospore formation under heat',
      'The rapid multiplication of bacteriophages inside host cells'
    ],
    correctIndex: 1,
    explanation: 'Totipotency is the genetic potential of a single plant cell to differentiate and regenerate into an entire functional plant.',
    hints: ['Toti = total / whole.', 'Potency = power / capacity.', 'Regenerate whole plant from single cell.']
  },
  {
    id: 'ch_a5',
    nodeId: 'c12_bt_cbse_426',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Assertion (A): Chemostat continuous culture maintains microbial cells indefinitely in the exponential log phase.\nReason (R): Fresh sterile medium is added continuously at rate D while spent culture broth containing cells and toxins is removed at the same rate.',
    options: [
      'Both A and R are true and R is the correct explanation of A',
      'Both A and R are true but R is NOT the correct explanation of A',
      'A is true but R is false',
      'A is false but R is true'
    ],
    correctIndex: 0,
    explanation: 'In a chemostat, dilution rate D equals specific growth rate μ, keeping cell concentration and nutrient availability constant indefinitely in log phase.',
    hints: ['Check if both statements are true.', 'Does continuous medium flow prevent nutrient exhaustion?', 'Yes, R directly explains A.']
  },
  {
    id: 'ch_a6',
    nodeId: 'c12_bt_cbse_387',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why are anti-foaming agents (e.g., silicone oil, polypropylene glycol) essential additives in large-scale aerated industrial fermenters?',
    options: [
      'They serve as primary carbon sources for cell division',
      'Excessive foaming caused by sparging and protein secretion clogs air exhaust filters and risks broth overflow and contamination',
      'Anti-foams increase dissolved oxygen solubility by 500%',
      'They act as pH buffers to neutralize lactic acid'
    ],
    correctIndex: 1,
    explanation: 'Agitation and aeration of protein-rich media produce foam, which can wet sterile exhaust filters, lead to loss of reactor volume, and cause contamination.',
    hints: ['Foam rises to the top of the vessel.', 'It can wet exhaust gas filters.', 'Disrupts sterile boundary.']
  },
  {
    id: 'ch_a7',
    nodeId: 'c12_bt_cbse_416',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'If Pasteur had boiled endospore-containing hay infusion broth in his swan-neck flask instead of yeast-sugar broth, what outcome would have occurred?',
    options: [
      'The broth would remain sterile indefinitely',
      'Endospores would survive boiling and germinate, causing microbial growth despite intact swan-neck curves',
      'The glass flask would melt',
      'Oxygen would be completely consumed within seconds'
    ],
    correctIndex: 1,
    explanation: 'John Tyndall later discovered heat-resistant bacterial endospores in hay infusions (Bacillus subtilis). Standard boiling fails to destroy endospores.',
    hints: ['Hay infusions harbor spore-formers like Bacillus.', 'Endospores resist 100°C boiling.', 'Broth would turn cloudy despite swan-neck.']
  },
  {
    id: 'ch_a8',
    nodeId: 'c12_bt_cbse_418',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What biological indicator organism is universally used to validate autoclave thermal sterilization efficiency?',
    options: ['Escherichia coli', 'Geobacillus stearothermophilus endospores', 'Staphylococcus aureus', 'Saccharomyces cerevisiae'],
    correctIndex: 1,
    explanation: 'Geobacillus stearothermophilus endospores are highly heat-resistant (D121°C ≈ 1.5–2.0 min); survival/death testing confirms complete sterilization.',
    hints: ['Thermophilic spore-former.', 'Requires 121°C to kill.', 'Geobacillus stearothermophilus.']
  },
  {
    id: 'ch_a9',
    nodeId: 'c12_bt_cbse_421',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What distinguishes the Spread Plate method from the Pour Plate method when isolating microaerophilic or heat-sensitive bacterial species?',
    options: [
      'Spread plate exposes cells to molten agar at 45-50°C, killing heat-sensitive microbes',
      'Spread plate spreads sample on pre-solidified agar, avoiding heat shock and ensuring all colonies grow on the surface',
      'Pour plate requires no serial dilution step',
      'Spread plate only works for obligate anaerobes'
    ],
    correctIndex: 1,
    explanation: 'In pour plating, cells are mixed into liquid agar at 45-50°C, which can thermal-shock delicate cells and traps embedded subsurface colonies.',
    hints: ['Pour plate involves molten agar (~45-50°C).', 'Heat shock can reduce cell viability.', 'Spread plate uses pre-cooled solid agar.']
  }
];

// --- TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS ---

const SwanNeckFlaskSVG = () => (
  <svg viewBox="0 0 400 240" className="w-full h-48 bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="200" y="22" fill="#38bdf8" textAnchor="middle" className="text-sm font-semibold">
      Pasteur&apos;s Swan-Neck Flask Refutation Experiment
    </text>
    {/* Left Flask - Intact Swan Neck */}
    <g transform="translate(30, 40)">
      <path d="M 60 110 L 40 150 A 25 25 0 0 0 90 150 L 70 110 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="65" cy="142" rx="20" ry="6" fill="#fbbf24" fillOpacity="0.6" />
      {/* Curved Neck */}
      <path d="M 65 110 Q 65 70 85 70 Q 115 70 115 95 Q 115 120 135 120 L 145 120" fill="none" stroke="#94a3b8" strokeWidth="3" />
      {/* Trapped Dust */}
      <circle cx="115" cy="115" r="4" fill="#ef4444" />
      <circle cx="118" cy="117" r="3" fill="#ef4444" />
      <text x="65" y="170" fill="#22c55e" textAnchor="middle" className="text-xs font-bold">Sterile Broth (No Growth)</text>
      <text x="120" y="60" fill="#ef4444" className="text-xs">Dust Trapped</text>
    </g>
    {/* Right Flask - Broken Neck */}
    <g transform="translate(230, 40)">
      <path d="M 60 110 L 40 150 A 25 25 0 0 0 90 150 L 70 110 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="65" cy="142" rx="20" ry="6" fill="#84cc16" fillOpacity="0.9" />
      {/* Broken Neck Straight open */}
      <line x1="65" y1="110" x2="65" y2="70" stroke="#94a3b8" strokeWidth="3" />
      {/* Bacteria entering */}
      <circle cx="65" cy="80" r="3" fill="#ef4444" />
      <circle cx="63" cy="95" r="3" fill="#ef4444" />
      <circle cx="67" cy="120" r="4" fill="#ef4444" />
      <text x="65" y="170" fill="#ef4444" textAnchor="middle" className="text-xs font-bold">Microbial Growth (Cloudy)</text>
      <text x="75" y="65" fill="#38bdf8" className="text-xs">Direct Air Entrance</text>
    </g>
  </svg>
);

const AutoclaveDiagramSVG = ({ pressure, temp }: { pressure: number; temp: number }) => (
  <svg viewBox="0 0 400 240" className="w-full h-48 bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="200" y="22" fill="#38bdf8" textAnchor="middle" className="text-sm font-semibold">
      High-Pressure Steam Autoclave (121°C / 15 psi)
    </text>
    {/* Outer Vessel */}
    <rect x="100" y="40" width="200" height="150" rx="20" fill="#334155" stroke="#64748b" strokeWidth="4" />
    <rect x="115" y="55" width="170" height="120" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
    {/* Water / Steam region */}
    <rect x="115" y="145" width="170" height="30" fill="#0284c7" fillOpacity="0.5" />
    <path d="M 120 140 Q 140 130 160 140 T 200 140 T 240 140 T 280 140" stroke="#38bdf8" fill="none" strokeWidth="2" />
    {/* Steam particles */}
    <circle cx="150" cy="90" r="6" fill="#e0f2fe" fillOpacity="0.6" />
    <circle cx="210" cy="110" r="8" fill="#e0f2fe" fillOpacity="0.5" />
    <circle cx="240" cy="80" r="5" fill="#e0f2fe" fillOpacity="0.7" />
    {/* Pressure gauge */}
    <circle cx="200" cy="40" r="18" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
    <line x1="200" y1="40" x2={200 + 12 * Math.cos((pressure / 30) * Math.PI - Math.PI / 2)} y2={40 + 12 * Math.sin((pressure / 30) * Math.PI - Math.PI / 2)} stroke="#ef4444" strokeWidth="3" />
    {/* Specimen Flask inside */}
    <path d="M 185 135 L 175 160 L 225 160 L 215 135 Z" fill="#fbbf24" fillOpacity="0.8" stroke="#ffffff" strokeWidth="1.5" />
    <rect x="193" y="125" width="14" height="10" fill="#94a3b8" />
    {/* Info display */}
    <text x="200" y="195" fill="#f8fafc" textAnchor="middle" className="text-xs font-mono">
      Temp: {temp}°C | Gauge Pressure: {pressure} psi
    </text>
    <text x="200" y="212" fill={temp >= 121 && pressure >= 15 ? "#4ade80" : "#f59e0b"} textAnchor="middle" className="text-xs font-bold">
      {temp >= 121 && pressure >= 15 ? "STERILIZATION ACTIVE (Spores Destroyed)" : "HEATING PHASE (Sub-sterilizing)"}
    </text>
  </svg>
);

const StreakPlateSVG = () => (
  <svg viewBox="0 0 400 240" className="w-full h-48 bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="200" y="22" fill="#38bdf8" textAnchor="middle" className="text-sm font-semibold">
      4-Quadrant Streak Plate Pure Culture Isolation
    </text>
    <circle cx="200" cy="130" r="85" fill="#fef3c7" stroke="#cbd5e1" strokeWidth="4" />
    <circle cx="200" cy="130" r="80" fill="#d97706" fillOpacity="0.25" />
    {/* Quadrant Lines (dashed) */}
    <line x1="200" y1="50" x2="200" y2="210" stroke="#94a3b8" strokeDasharray="4" />
    <line x1="120" y1="130" x2="280" y2="130" stroke="#94a3b8" strokeDasharray="4" />
    {/* Q1 Heavy inoculum */}
    <path d="M 140 75 Q 170 65 185 85 Q 150 95 180 115" fill="none" stroke="#ef4444" strokeWidth="4" opacity="0.9" />
    <text x="145" y="60" fill="#ef4444" className="text-xs font-bold">Q1: Dense</text>
    {/* Q2 Diluted */}
    <path d="M 190 75 Q 230 65 245 95 Q 210 110 235 120" fill="none" stroke="#f97316" strokeWidth="2.5" opacity="0.9" />
    <text x="240" y="60" fill="#f97316" className="text-xs font-bold">Q2</text>
    {/* Q3 Further diluted */}
    <path d="M 245 140 Q 230 180 210 195" fill="none" stroke="#eab308" strokeWidth="1.5" />
    <text x="250" y="195" fill="#eab308" className="text-xs font-bold">Q3</text>
    {/* Q4 Single Isolated Colonies */}
    <circle cx="160" cy="180" r="3.5" fill="#22c55e" />
    <circle cx="145" cy="165" r="4" fill="#22c55e" />
    <circle cx="175" cy="195" r="3" fill="#22c55e" />
    <circle cx="130" cy="185" r="3.5" fill="#22c55e" />
    <text x="140" y="215" fill="#22c55e" className="text-xs font-bold">Q4: Isolated Single Colonies</text>
  </svg>
);

// --- MAIN COMPONENT ---
export default function C12_BiotechMicrobialCultureCBSESim({
  onComplete,
  initialNodeId = 'c12_bt_cbse_408'
}: SimProps) {
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [selectedExploration, setSelectedExploration] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Discovery tab state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predAnswers, setPredAnswers] = useState<(number | null)[]>([null, null]);
  const [obsAnswers, setObsAnswers] = useState<(number | null)[]>([null, null]);

  // Drag-Sort State
  const [dragItems, setDragItems] = useState<string[]>([]);

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Lab 1: Growth Kinetics Parameters
  const [temp, setTemp] = useState<number>(37); // °C
  const [pH, setPH] = useState<number>(7.0);
  const [oxygen, setOxygen] = useState<number>(100); // % saturation
  const [initialN0, setInitialN0] = useState<number>(1000); // cells/mL
  const [simTime, setSimTime] = useState<number>(0); // hours
  const [isKineticsRunning, setIsKineticsRunning] = useState<boolean>(false);

  // Lab 2: Autoclave Rig Parameters
  const [autoTemp, setAutoTemp] = useState<number>(100);
  const [autoPressure, setAutoPressure] = useState<number>(0);
  const [autoTime, setAutoTime] = useState<number>(5);
  const [autoclaveTested, setAutoclaveTested] = useState<boolean>(false);

  // Lab 3: Streak Plating / Dilution
  const [dilutionExponent, setDilutionExponent] = useState<number>(5);
  const [sampleVol, setSampleVol] = useState<number>(0.1);
  const [colonyCount, setColonyCount] = useState<number>(145);

  // Lab 4: Media formulation
  const [mediaType, setMediaType] = useState<'defined' | 'complex' | 'macconkey' | 'msa'>('complex');
  const [targetOrganism, setTargetOrganism] = useState<'ecoli' | 'stauraus' | 'bsubtilis'>('ecoli');

  // Lab 5: Environmental Classification
  const [envTestTemp, setEnvTestTemp] = useState<number>(37);
  const [envO2Zone, setEnvO2Zone] = useState<'top' | 'bottom' | 'throughout'>('throughout');

  // Timer Ref for Inactivity Hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize drag items for current challenge if drag-sort
  useEffect(() => {
    const curr = CHALLENGES[currentChallengeIndex];
    if (curr && curr.type === 'drag-sort' && curr.itemsToSort) {
      setDragItems([...curr.itemsToSort].sort(() => Math.random() - 0.5));
    }
  }, [currentChallengeIndex]);

  // Simulation loop for Lab 1 Kinetics
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isKineticsRunning) {
      interval = setInterval(() => {
        setSimTime(prev => {
          if (prev >= 12) {
            setIsKineticsRunning(false);
            return 12;
          }
          return prev + 0.2;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isKineticsRunning]);

  // Auto hint reset on user action
  const resetInactivityTimer = () => {
    setShowHint(false);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab]);

  // Helper functions for growth curve calculation
  const calculateGrowthKinetics = (t: number) => {
    // Optimal around 37°C, pH 7.0, O2 100%
    const tempFactor = Math.max(0.1, 1 - Math.pow((temp - 37) / 20, 2));
    const phFactor = Math.max(0.1, 1 - Math.pow((pH - 7.0) / 3, 2));
    const o2Factor = oxygen / 100;
    const mu = 1.2 * tempFactor * phFactor * (0.3 + 0.7 * o2Factor); // max mu ~ 1.2 hr^-1
    const g = 0.693 / mu; // generation time in hours

    const tLag = 1.5 / tempFactor;
    const K = 1000000; // Carrying capacity (cells/mL)
    const kd = 0.4; // death rate

    let N = initialN0;
    if (t < tLag) {
      N = initialN0;
    } else if (t < 7) {
      const expTime = t - tLag;
      N = Math.min(K, initialN0 * Math.exp(mu * expTime));
    } else if (t < 9.5) {
      N = K;
    } else {
      const deathTime = t - 9.5;
      N = Math.max(100, K * Math.exp(-kd * deathTime));
    }

    return { N, mu, g, phase: t < tLag ? 'Lag' : t < 7 ? 'Log (Exponential)' : t < 9.5 ? 'Stationary' : 'Death (Decline)' };
  };

  const currentKinetics = calculateGrowthKinetics(simTime);

  // Audio & Speech triggers on events
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    audioManager.play('whoosh');
    setActiveTab(tab);
    if (tab === 'summary') {
      speechManager.speak('Congratulations on completing the Microbial Culture Biotechnology Lab.');
    }
  };

  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Steam under 15 psi pressure reaches 121 degrees Celsius, destroying resistant endospores.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the temperature required to destroy bacterial endospores.');
    }
  };

  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    const curr = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (curr.type === 'mcq') {
      isCorrect = selectedOption === curr.correctIndex;
    } else if (curr.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && curr.correctAnswer !== undefined) {
        const tol = curr.tolerance || 0.1;
        isCorrect = Math.abs(val - curr.correctAnswer) <= tol;
      }
    } else if (curr.type === 'drag-sort') {
      isCorrect = JSON.stringify(dragItems) === JSON.stringify(curr.correctSortedOrder);
    } else if (curr.type === 'classify') {
      isCorrect = true; // Auto-validated classification exercise
    }

    // Update BKT & SRS
    const prevBkt = bktStates[curr.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(prevBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [curr.nodeId]: updatedBkt }));

    const prevSrs = srsItems[curr.nodeId] || createReviewItem(curr.nodeId);
    const updatedSrs = sm2Update(prevSrs, isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [curr.nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('chime');
      setScore(prev => prev + 10);
      setFeedback({ isCorrect: true, message: `Correct! ${curr.explanation}` });
      setShowSparkle(true);
      speechManager.speak('Excellent scientific reasoning!');
    } else {
      audioManager.play('drop-wrong');
      setFeedback({ isCorrect: false, message: `Incorrect. ${curr.explanation}` });
      speechManager.speak('Review the concept and try again.');
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericInput('');
    setFeedback(null);
    setShowSparkle(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      audioManager.play('swoop');
    } else {
      setShowConfetti(true);
      setShowSuccess(true);
      audioManager.play('celebration');
      if (onComplete) onComplete(score + 10);
      recordGameScore('microbial_culture_sim', score + 10);
    }
  };

  // Helper for drag item movement
  const moveDragItem = (fromIndex: number, toIndex: number) => {
    const updated = [...dragItems];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setDragItems(updated);
    audioManager.play('pop');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col gap-6">
      {/* HEADER BAR */}
      <header className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-400">ISC Class 12 Biotechnology • Microbial Culture & Growth Kinetics</p>
          </div>
        </div>

        {/* TAB NAVIGATION */}
        <nav className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
          <button
            onClick={() => handleTabChange('discovery')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'discovery' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => handleTabChange('lab')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'lab' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Interactive Labs
          </button>
          <button
            onClick={() => handleTabChange('challenges')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            3. Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => handleTabChange('summary')}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              activeTab === 'summary' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            4. Summary
          </button>
        </nav>
      </header>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex]?.hints[0] || 'Observe kinetic parameters carefully.'} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Microbial Culture Challenges Completed!" />
      <SparkleBurst show={showSparkle} x={300} y={200} />

      {/* TAB 1: DISCOVERY & NARRATIVE */}
      {activeTab === 'discovery' && (
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
            <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
              <span>🔬</span> Laboratory Scenario & Historical Context
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>

            {/* SVG Diagram: Swan-Neck Flask */}
            <SwanNeckFlaskSVG />

            {/* DISCOVERY QUESTION */}
            <div className="bg-slate-950 border border-amber-500/30 p-5 rounded-xl flex flex-col gap-4">
              <h3 className="text-base font-semibold text-amber-300">Discovery Inquiry</h3>
              <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.question}</p>

              <div className="flex flex-col gap-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDiscoverySelected(idx);
                      audioManager.play('tap');
                    }}
                    className={`p-3 rounded-lg text-left text-xs md:text-sm border transition-all ${
                      discoverySelected === idx
                        ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                        : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelected === null}
                  className="mt-2 py-2.5 px-6 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 disabled:opacity-50 transition-all self-start"
                >
                  Verify Hypothesis
                </button>
              ) : (
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300">
                  <span className="font-bold text-amber-400">Scientific Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-base font-bold text-emerald-400">Hypothesis & Prediction Practice</h3>
              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <p className="text-sm font-semibold text-slate-200">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const newAns = [...predAnswers];
                          newAns[idx] = oIdx;
                          setPredAnswers(newAns);
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-lg text-left text-xs border ${
                          predAnswers[idx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                              : 'bg-red-500/20 border-red-400 text-red-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predAnswers[idx] !== null && (
                    <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2 rounded">
                      🔍 Verification: {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR: COMMON MISCONCEPTIONS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <span>⚠️</span> Common Misconceptions & Corrections
            </h3>
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[600px] pr-1">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col gap-1.5">
                  <p className="text-xs font-semibold text-red-400">❌ Misconception:</p>
                  <p className="text-xs text-slate-300">{m.statement}</p>
                  <p className="text-xs font-semibold text-emerald-400 mt-1">✓ Scientific Reality:</p>
                  <p className="text-xs text-slate-300">{m.correction}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
      {activeTab === 'lab' && (
        <main className="flex-1 flex flex-col gap-6">
          {/* EXPLORATION STEP SELECTION HEADER */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedExploration(idx);
                  audioManager.play('pickup');
                }}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                  selectedExploration === idx
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-amber-500 font-bold mb-1">Lab Module {idx + 1}</div>
                <div className="truncate">{step.title.split(':')[1] || step.title}</div>
              </button>
            ))}
          </div>

          {/* MAIN SIMULATION VIEWPANEL */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
              <div>
                <h3 className="text-lg font-bold text-amber-400">{EXPLORATION_STEPS[selectedExploration].title}</h3>
                <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[selectedExploration].instruction}</p>
              </div>

              {/* MODULE 1: GROWTH KINETICS SIMULATOR */}
              {selectedExploration === 0 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold">Temperature (°C): {temp}</label>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        value={temp}
                        onChange={e => setTemp(Number(e.target.value))}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold">pH Level: {pH.toFixed(1)}</label>
                      <input
                        type="range"
                        min="3"
                        max="11"
                        step="0.5"
                        value={pH}
                        onChange={e => setPH(Number(e.target.value))}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold">Dissolved O2 (%): {oxygen}</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={oxygen}
                        onChange={e => setOxygen(Number(e.target.value))}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold">Initial N0: {initialN0}</label>
                      <input
                        type="range"
                        min="100"
                        max="10000"
                        step="500"
                        value={initialN0}
                        onChange={e => setInitialN0(Number(e.target.value))}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                  </div>

                  {/* KINETICS CANVAS GRAPH */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Log10(Biomass N) vs Time (Hours)</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsKineticsRunning(!isKineticsRunning)}
                          className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded hover:bg-amber-400"
                        >
                          {isKineticsRunning ? 'Pause' : 'Run Kinetics'}
                        </button>
                        <button
                          onClick={() => { setSimTime(0); setIsKineticsRunning(false); }}
                          className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded hover:bg-slate-700"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <svg viewBox="0 0 400 180" className="w-full h-44 bg-slate-900 rounded-lg">
                      {/* Grid lines */}
                      <line x1="40" y1="20" x2="40" y2="150" stroke="#475569" strokeWidth="1" />
                      <line x1="40" y1="150" x2="380" y2="150" stroke="#475569" strokeWidth="1" />
                      {/* Growth Phase Regions */}
                      <rect x="40" y="20" width="55" height="130" fill="#3b82f6" fillOpacity="0.1" />
                      <rect x="95" y="20" width="130" height="130" fill="#22c55e" fillOpacity="0.1" />
                      <rect x="225" y="20" width="75" height="130" fill="#eab308" fillOpacity="0.1" />
                      <rect x="300" y="20" width="80" height="130" fill="#ef4444" fillOpacity="0.1" />

                      <text x="65" y="35" fill="#60a5fa" textAnchor="middle" className="text-[10px]">Lag</text>
                      <text x="160" y="35" fill="#4ade80" textAnchor="middle" className="text-[10px]">Log (Exp)</text>
                      <text x="260" y="35" fill="#fde047" textAnchor="middle" className="text-[10px]">Stationary</text>
                      <text x="340" y="35" fill="#f87171" textAnchor="middle" className="text-[10px]">Death</text>

                      {/* Animated Growth Curve path */}
                      <path
                        d="M 40 130 L 95 130 Q 140 120 180 50 Q 225 40 295 40 Q 340 50 380 140"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                      />
                      {/* Time Marker */}
                      <line
                        x1={40 + (simTime / 12) * 340}
                        y1="20"
                        x2={40 + (simTime / 12) * 340}
                        y2="150"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeDasharray="4"
                      />
                    </svg>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono bg-slate-900 p-2 rounded border border-slate-800">
                      <div><span className="text-slate-400">Time:</span> {simTime.toFixed(1)} h</div>
                      <div><span className="text-slate-400">N:</span> {Math.round(currentKinetics.N).toLocaleString()}</div>
                      <div><span className="text-slate-400">μ:</span> {currentKinetics.mu.toFixed(2)} h⁻¹</div>
                      <div><span className="text-slate-400">Phase:</span> <span className="text-amber-400 font-bold">{currentKinetics.phase}</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 2: STERILIZATION RIG */}
              {selectedExploration === 1 && (
                <div className="flex flex-col gap-4">
                  <AutoclaveDiagramSVG pressure={autoPressure} temp={autoTemp} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold">Chamber Temp (°C): {autoTemp}</label>
                      <input
                        type="range"
                        min="80"
                        max="140"
                        value={autoTemp}
                        onChange={e => {
                          const t = Number(e.target.value);
                          setAutoTemp(t);
                          setAutoPressure(t >= 100 ? Math.round((t - 100) * 0.71) : 0);
                        }}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold">Pressure (psi): {autoPressure}</label>
                      <input type="text" readOnly value={`${autoPressure} psi`} className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs p-2 rounded mt-1" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold">Hold Time (min): {autoTime}</label>
                      <input
                        type="range"
                        min="1"
                        max="40"
                        value={autoTime}
                        onChange={e => setAutoTime(Number(e.target.value))}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setAutoclaveTested(true);
                      audioManager.play('balance');
                    }}
                    className="py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-500 transition-all"
                  >
                    Execute Sterilization Cycle
                  </button>
                  {autoclaveTested && (
                    <div className="p-3 bg-slate-950 border border-emerald-500/40 rounded-lg text-xs">
                      {autoTemp >= 121 && autoPressure >= 15 && autoTime >= 15 ? (
                        <p className="text-emerald-400 font-bold">✓ Sterility Assurance Level (SAL 10⁻⁶) Achieved! Bacterial endospores destroyed.</p>
                      ) : (
                        <p className="text-red-400 font-bold">✕ Sterilization Failed! Temperature or time insufficient to destroy endospores.</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* MODULE 3: PURE CULTURE & STREAK PLATING */}
              {selectedExploration === 2 && (
                <div className="flex flex-col gap-4">
                  <StreakPlateSVG />
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-amber-300">CFU/mL Serial Dilution Calculator</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400">Colony Count (30-300):</label>
                        <input
                          type="number"
                          value={colonyCount}
                          onChange={e => setColonyCount(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 text-amber-300 text-xs p-2 rounded mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400">Dilution Factor (10^-x):</label>
                        <input
                          type="number"
                          value={dilutionExponent}
                          onChange={e => setDilutionExponent(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 text-amber-300 text-xs p-2 rounded mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400">Volume Plated (mL):</label>
                        <input
                          type="number"
                          step="0.05"
                          value={sampleVol}
                          onChange={e => setSampleVol(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-800 text-amber-300 text-xs p-2 rounded mt-1"
                        />
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded text-center text-xs font-mono text-emerald-400 font-bold">
                      Concentration = {(colonyCount / (sampleVol * Math.pow(10, -dilutionExponent))).toExponential(2)} CFU/mL
                    </div>
                  </div>
                </div>
              )}

              {/* MODULE 4: MEDIA FORMULATOR */}
              {selectedExploration === 3 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(['defined', 'complex', 'macconkey', 'msa'] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => { setMediaType(m); audioManager.play('pop'); }}
                        className={`p-2.5 rounded-lg text-xs font-bold capitalize border transition-all ${
                          mediaType === m ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {m} Media
                      </button>
                    ))}
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex flex-col gap-2">
                    <h4 className="font-bold text-amber-300 uppercase">Formulation Composition</h4>
                    {mediaType === 'defined' && <p>• Glucose 5.0g, NH4Cl 1.0g, KH2PO4 3.0g, MgSO4 0.2g, Water 1L (Exact chemical identity known)</p>}
                    {mediaType === 'complex' && <p>• Peptone 10g, Yeast Extract 5g, NaCl 5g, Agar 15g, Water 1L (Undefined natural extracts)</p>}
                    {mediaType === 'macconkey' && <p>• Bile salts, Crystal Violet (inhibits Gram-positives), Lactose, Neutral Red (Differential indicator)</p>}
                    {mediaType === 'msa' && <p>• 7.5% NaCl (Selective for Staphylococci), Mannitol, Phenol Red (Differential yellowing on acid)</p>}
                  </div>
                </div>
              )}

              {/* MODULE 5: ENVIRONMENTAL CLASSIFIER */}
              {selectedExploration === 4 && (
                <div className="flex flex-col gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-amber-300">Fluid Thioglycollate Oxygen Tube Simulation</h4>
                    <div className="flex justify-center gap-6">
                      <div className="w-16 h-40 bg-slate-900 border-2 border-slate-700 rounded-b-full relative overflow-hidden flex flex-col items-center">
                        <div className="w-full h-8 bg-pink-500/30 text-[9px] text-pink-300 text-center font-bold">O2 Zone</div>
                        <div className="w-full h-32 bg-amber-500/10 relative">
                          {envO2Zone === 'top' && <div className="w-full h-8 bg-emerald-400/80 rounded-t" />}
                          {envO2Zone === 'bottom' && <div className="w-full h-8 bg-emerald-400/80 absolute bottom-0" />}
                          {envO2Zone === 'throughout' && <div className="w-full h-full bg-emerald-400/40" />}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2">
                      {(['top', 'bottom', 'throughout'] as const).map(z => (
                        <button
                          key={z}
                          onClick={() => setEnvO2Zone(z)}
                          className={`px-3 py-1 rounded text-xs capitalize ${envO2Zone === z ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'}`}
                        >
                          {z === 'top' ? 'Obligate Aerobe' : z === 'bottom' ? 'Obligate Anaerobe' : 'Facultative Anaerobe'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS PANEL */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>👁️</span> Lab Observations & Analysis
              </h3>
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                  <div className="flex flex-col gap-1.5">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const updated = [...obsAnswers];
                          updated[idx] = oIdx;
                          setObsAnswers(updated);
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded text-left text-xs border ${
                          obsAnswers[idx] === oIdx
                            ? oIdx === oq.correctIndex
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                              : 'bg-red-500/20 border-red-400 text-red-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
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
        </main>
      )}

      {/* TAB 3: PROGRESSIVE CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="flex-1 max-w-4xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
          {/* CHALLENGE HEADER BAR */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {CHALLENGES[currentChallengeIndex].difficulty} • {CHALLENGES[currentChallengeIndex].competencyLevel}
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-2">
                Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Score Points</div>
              <div className="text-xl font-mono font-bold text-amber-400">{score}</div>
            </div>
          </div>

          {/* QUESTION TEXT */}
          <p className="text-base text-slate-200 leading-relaxed font-medium">
            {CHALLENGES[currentChallengeIndex].question}
          </p>

          {/* QUESTION TYPE: MCQ */}
          {CHALLENGES[currentChallengeIndex].type === 'mcq' && CHALLENGES[currentChallengeIndex].options && (
            <div className="flex flex-col gap-2.5">
              {CHALLENGES[currentChallengeIndex].options!.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedOption(idx);
                    audioManager.play('tap');
                  }}
                  className={`p-3.5 rounded-xl text-left text-sm border transition-all ${
                    selectedOption === idx
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-500">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>
          )}

          {/* QUESTION TYPE: NUMERIC */}
          {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
            <div className="flex flex-col gap-3">
              <label className="text-xs text-slate-400">Enter your calculated numerical value:</label>
              <input
                type="number"
                step="any"
                value={numericInput}
                onChange={e => setNumericInput(e.target.value)}
                placeholder="Type numeric answer..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-amber-300 font-mono text-base focus:border-amber-400 focus:outline-none"
              />
            </div>
          )}

          {/* QUESTION TYPE: DRAG-SORT */}
          {CHALLENGES[currentChallengeIndex].type === 'drag-sort' && (
            <div className="flex flex-col gap-2">
              <p className="text-xs text-slate-400">Use arrow buttons to arrange items into correct chronological sequence:</p>
              {dragItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-3 rounded-xl">
                  <span className="font-bold text-amber-400 text-xs w-6">{idx + 1}.</span>
                  <span className="text-xs text-slate-200 flex-1">{item}</span>
                  <div className="flex flex-col gap-1">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveDragItem(idx, idx - 1)}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded hover:bg-slate-700 disabled:opacity-30"
                    >
                      ▲
                    </button>
                    <button
                      disabled={idx === dragItems.length - 1}
                      onClick={() => moveDragItem(idx, idx + 1)}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded hover:bg-slate-700 disabled:opacity-30"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SUBMIT / NEXT CONTROLS */}
          {!feedback ? (
            <button
              onClick={handleChallengeSubmit}
              disabled={
                (CHALLENGES[currentChallengeIndex].type === 'mcq' && selectedOption === null) ||
                (CHALLENGES[currentChallengeIndex].type === 'numeric' && !numericInput)
              }
              className="py-3 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 disabled:opacity-50 transition-all shadow-lg"
            >
              Submit Answer
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <div className={`p-4 rounded-xl border text-sm ${
                feedback.isCorrect ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'
              }`}>
                {feedback.message}
              </div>
              <button
                onClick={handleNextChallenge}
                className="py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all shadow-lg"
              >
                {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Lab Session'}
              </button>
            </div>
          )}
        </main>
      )}

      {/* TAB 4: REAL-WORLD ACTIVITY & SUMMARY */}
      {activeTab === 'summary' && (
        <main className="flex-1 max-w-4xl mx-auto w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-6 shadow-xl">
          <h2 className="text-2xl font-bold text-amber-400 border-b border-slate-800 pb-3">
            Industrial Bioprocess Summary & Mastery Analysis
          </h2>

          {/* REAL WORLD ACTIVITY SECTION */}
          <div className="bg-slate-950 border border-amber-500/30 p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <span>🏭</span> Real-World Industry Case Study: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="flex flex-col gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200">
                  {st}
                </div>
              ))}
            </div>
          </div>

          {/* MASTERY OVERVIEW */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-base font-bold text-amber-300">Bayesian Knowledge Tracing (BKT) Node Mastery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {ALL_NODE_IDS.slice(0, 10).map(id => {
                const pMastery = masteryProb(bktStates[id] || createBKTState());
                return (
                  <div key={id} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">{id}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full" style={{ width: `${pMastery * 100}%` }} />
                      </div>
                      <span className="font-bold text-amber-300">{(pMastery * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => handleTabChange('discovery')}
            className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl transition-all self-center px-8"
          >
            Restart Interactive Simulation
          </button>
        </main>
      )}
    </div>
  );
}