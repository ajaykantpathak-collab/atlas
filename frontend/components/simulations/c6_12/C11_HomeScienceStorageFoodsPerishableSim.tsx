'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC HOME SCIENCE NODE CONSTANTS ───
const NODE_C11_HOME_011 = 'c11_home_011';
const NODE_C11_HOME_012 = 'c11_home_012';
const NODE_C11_HOME_013 = 'c11_home_013';
const NODE_C11_HOME_014 = 'c11_home_014';
const NODE_C11_HOME_015 = 'c11_home_015';
const NODE_C11_HOME_016 = 'c11_home_016';
const NODE_C11_HOME_017 = 'c11_home_017';
const NODE_C11_HOME_018 = 'c11_home_018';
const NODE_C11_HOME_019 = 'c11_home_019';
const NODE_C11_HOME_020 = 'c11_home_020';

const ALL_NODE_IDS = [
  NODE_C11_HOME_011,
  NODE_C11_HOME_012,
  NODE_C11_HOME_013,
  NODE_C11_HOME_014,
  NODE_C11_HOME_015,
  NODE_C11_HOME_016,
  NODE_C11_HOME_017,
  NODE_C11_HOME_018,
  NODE_C11_HOME_019,
  NODE_C11_HOME_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Rasoi & Resource Resilience Challenge',
  intro:
    'You are leading the household management consultancy for the Verma joint family in Bhopal and an anganwadi self-help group in Ratnagiri. Summer is peaking at 42°C, seasonal fruits are overflowing, utility bills are spiking, and daily chores are causing fatigue.',
  context:
    'You must preserve perishable produce, optimize nutrition vs convenience, allocate human and shared resources, schedule peak load hours, and ergonomically simplify kitchen tasks without compromising quality or health.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'The Verma family bought 10 kg of summer Alphonso mangoes, 5 kg of onions, and 10 kg of wheat atta. Which item will spoil first at 38°C room temperature if left unpreserved, and why?',
  options: [
    'Wheat atta — because insects will colonize it within 4 hours',
    'Onions — because ethylene gas decomposes them by evening',
    'Mangoes — because high moisture (80–85%) & nutrients accelerate rapid microbial & enzymatic decay',
    'All three will spoil at the exact same rate in summer',
  ],
  correctIndex: 2,
  hintAfter:
    'Notice how water content dictates the speed of bacterial and fungal colonization! Let us explore how food science and resource management work together.',
};

// ─── PREDICTION QUESTIONS (Predict-Then-Check Pattern) ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question:
      'Predict: If you reduce the Food Moisture Content slider from 80% to under 15% at 32°C, what will happen to the Microbial Proliferation Rate?',
    options: [
      'Microbial proliferation will drop to near zero (<5%) because bacteria require free water activity (aw > 0.60) for metabolism',
      'Microbial proliferation will jump to 100% because bacteria thrive in dry powder',
      'The temperature will automatically spike to 100°C',
      'Microbial colonies will double in size every second',
    ],
    correctIndex: 0,
    explanation:
      'Lowering moisture below 15% drops water activity below the threshold required for microbial cell division and nutrient uptake.',
    verifyInstruction:
      'Drag the Food Moisture slider below 15% in Lab 1 and observe the Microbial Proliferation bar and Petri dish respond instantly!',
  },
  {
    id: 'pred_2',
    question:
      'Predict: If a homemaker adjusts the kitchen counter height from 65 cm (deep stooping) to 90 cm (elbow level), what will happen to the Musculoskeletal Lumbar Strain score?',
    options: [
      'Spinal strain will increase to 100% due to arm elevation',
      'Spinal strain will drop dramatically to its minimum value because the lumbar spine remains in natural neutral alignment',
      'Time taken to chop vegetables will triple',
      'The work triangle layout will immediately fail',
    ],
    correctIndex: 1,
    explanation:
      'Counters set at elbow height (85–95 cm) prevent continuous forward trunk flexion, eliminating excessive torque on the lumbar spine.',
    verifyInstruction:
      'Move the Kitchen Counter Height slider in Lab 5 to 90 cm and verify that the Ergonomic Strain Gauge drops into the safe green zone!',
  },
];

// ─── OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question:
      'Observation: Set the storage temperature to -18°C and then to 38°C in Lab 1. What happens in the Petri dish visualization?',
    observableOptions: [
      'At -18°C bacterial activity is dormant/suppressed (bacteriostatic), while at 38°C colonies multiply rapidly across the dish (danger zone)',
      'At -18°C the bacteria multiply instantly into red clusters',
      'There is zero visual difference between -18°C and 38°C',
      'At 38°C all bacteria are completely sterilized and vanish forever',
    ],
    correctIndex: 0,
    explanation:
      'Freezing at -18°C puts bacterial metabolism on pause (bacteriostatic) without killing all cells, whereas ambient summer 38°C falls right in the optimal danger zone (5°C–60°C) for exponential bacterial growth.',
  },
  {
    id: 'obs_2',
    question:
      'Observation: In Lab 2 (The Multi-Hurdle Pickle Lab), observe the shelf-life readout as you toggle each of the 4 hurdles (Salt, Oil, Acid, Spices). What do you notice?',
    observableOptions: [
      'Shelf-life stays at 2 days no matter which hurdle is turned on',
      'Each added hurdle incrementally extends preservation, combining to reach over 360 days (1 full year) of room-temperature stability',
      'Activating the oil barrier instantly destroys the acid effect',
      'Spices reduce the shelf-life by 50 days',
    ],
    correctIndex: 1,
    explanation:
      'Multi-hurdle technology operates synergistically: osmotic dehydration (salt), anaerobiosis (oil), low pH (acid), and phytoncides (spices) together deliver complete 360+ day shelf stability.',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  bloomLevel?: string;
}

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // 1. Food Storage Classification (c11_home_011) - Foundation Recall
  {
    id: 'ch_011_a',
    nodeId: NODE_C11_HOME_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How are fresh paneer, potatoes, and dry arhar dal classified according to perishability?',
    options: [
      'Perishable (paneer), Semi-perishable (potatoes), Non-perishable (arhar dal)',
      'Non-perishable (paneer), Semi-perishable (potatoes), Perishable (arhar dal)',
      'Semi-perishable (paneer), Non-perishable (potatoes), Perishable (arhar dal)',
      'All three are semi-perishable staples',
    ],
    correctIndex: 0,
    explanation:
      'Paneer contains 60–70% moisture supporting rapid bacterial growth (perishable). Potatoes have moderate moisture and protective skin lasting weeks in cool conditions (semi-perishable). Arhar dal has moisture below 12%, making it shelf-stable for months (non-perishable).',
    hints: [
      'Look at the moisture content of each food item.',
      'High water foods like dairy spoil in 1-2 days without cold storage.',
      'Whole dried pulses have less than 14% water and resist microbial decay for months.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Storage Practice (c11_home_011) - Application (Drag-Label)
  {
    id: 'ch_011_b',
    nodeId: NODE_C11_HOME_011,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Place each food item into its scientifically sound home storage container or zone.',
    dragItems: [
      { label: 'Fresh Milk / Curd', targetId: 'zone_fridge_top' },
      { label: 'Raw Poultry / Fish', targetId: 'zone_fridge_bottom' },
      { label: 'Potatoes & Onions', targetId: 'zone_ventilated_baskets' },
      { label: 'Wheat Atta & Basmati Rice', targetId: 'zone_airtight_dabba' },
    ],
    correctMapping: {
      zone_fridge_top: 'Fresh Milk / Curd',
      zone_fridge_bottom: 'Raw Poultry / Fish',
      zone_ventilated_baskets: 'Potatoes & Onions',
      zone_airtight_dabba: 'Wheat Atta & Basmati Rice',
    },
    explanation:
      'Milk is kept on upper fridge shelves at steady 1–4°C. Raw meats are placed in covered containers on the bottom shelf to prevent drip contamination. Potatoes and onions go into separate ventilated wire baskets in dark corners. Cereals belong in airtight steel dabbas with neem leaves.',
    hints: [
      'Raw meat drips can cross-contaminate cooked foods if kept on top shelves.',
      'Onions and potatoes must never be sealed in plastic or mixed together.',
      'Cereals require airtight dry storage to block rice weevils and pulse beetles.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Convenience Foods (c11_home_012) - Understanding
  {
    id: 'ch_012_a',
    nodeId: NODE_C11_HOME_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following is correctly identified as a Ready-to-Cook (RTC) convenience food?',
    options: [
      'Haldiram packaged Bhujia sev (consumed directly from pouch)',
      'Frozen Amul Aloo Paratha or pre-fermented Idli batter',
      'Whole raw basmati rice grains',
      'Unpasteurized raw farm milk',
    ],
    correctIndex: 1,
    explanation:
      'Frozen parathas and idli batter are partially prepared by the manufacturer and require only cooking/heating before consumption, which defines Ready-to-Cook (RTC) foods. Bhujia is Ready-to-Eat (RTE), and raw rice is an unprocessed staple.',
    hints: [
      'Ready-to-cook requires simple thermal preparation (heating, griddling, steaming).',
      'Ready-to-eat needs zero preparation before eating.',
      'Staples like raw rice still require full cleaning, measuring, and cooking.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Convenience Foods Evaluation (c11_home_012) - Evaluation (NEP Competency)
  {
    id: 'ch_012_b',
    nodeId: NODE_C11_HOME_012,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'An urban IT couple in Bengaluru consumes instant noodles and packaged frozen snacks 5 nights a week to save 45 minutes daily. Based on ICMR-NIN guidelines & NFHS-5 data, evaluate the primary risk.',
    options: [
      'Loss of cooking gas efficiency only',
      'Excess sodium, saturated fats, refined maida, and chemical additives increasing risks of hypertension, obesity, and micronutrient deficiencies',
      'No risk at all since industrial packaging guarantees total vitamin stability',
      'Excess dietary fiber causing sudden digestive enzyme inhibition',
    ],
    correctIndex: 1,
    explanation:
      'While ultra-processed convenience foods offer time utility, ICMR-NIN cautions against high levels of sodium, trans-fats, and refined carbohydrates. NFHS-5 documents rising adult hypertension and overweight, exacerbated by frequent ultra-processed dietary reliance.',
    hints: [
      'Think about what industrial processing adds (salt, fat, preservatives) and removes (fiber, heat-sensitive vitamins C & B).',
      'Evaluate long-term physiological outcomes reported in NFHS-5 surveys.',
      'High Fat, Sugar and Salt (HFSS) foods are flagged by FSSAI for metabolic risks.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Food Preservation Principles (c11_home_013) - Understanding
  {
    id: 'ch_013_a',
    nodeId: NODE_C11_HOME_013,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the household preservation technique to its underlying scientific principle.',
    options: [
      'Sun-drying raw mango (amchoor) → Moisture removal (aw < 0.60); Amla Murabba in 65% sugar syrup → Osmotic dehydration; Lemon pickle with vinegar → Lowering pH below 4.5',
      'Sun-drying → Lowering pH; Amla Murabba → Thermal bactericidal death; Lemon pickle → Oxygen enrichment',
      'All preservation techniques work solely by raising temperature above 120°C',
      'Sugar preserves by acting as a direct biological poison to bacteria',
    ],
    correctIndex: 0,
    explanation:
      'Sun-drying removes water to lower water activity (aw). High sugar (60-65%) and high salt (15-20%) create hypertonic environments that draw water out of microbial cells via osmosis. Lemon juice and vinegar lower pH below 4.5, arresting bacterial enzymes.',
    hints: [
      'Sugar and salt draw moisture out through osmosis.',
      'Acids (acetic, citric) change the hydrogen ion concentration (pH).',
      'Dehydration removes physical water needed for cellular metabolism.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Commercial Preservatives Limits (c11_home_013) - Numeric / Application
  {
    id: 'ch_013_b',
    nodeId: NODE_C11_HOME_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Under FSSAI regulations, what is the maximum permitted limit of Sodium Benzoate in commercial fruit squashes, sauces, and jams in parts per million (ppm)?',
    correctAnswer: 750,
    tolerance: 0,
    unit: 'ppm',
    explanation:
      'FSSAI permits a maximum concentration of 750 ppm of sodium benzoate in jams, squashes, and sauces. For potassium metabisulphite (KMS), the limit is 350 ppm calculated as SO2 for clear fruit juices.',
    hints: [
      'It is a standard 3-digit number between 700 and 800.',
      'Benzoate is permitted up to 750 ppm in acidic jams and squashes.',
      'Enter exactly 750.',
    ],
  },
  // 7. Preservation Methods: Bactericidal vs Bacteriostatic (c11_home_014) - Analysis
  {
    id: 'ch_014_a',
    nodeId: NODE_C11_HOME_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is freezing green peas at -18°C bacteriostatic, whereas pressure canning at 121°C is bactericidal?',
    options: [
      'Freezing kills every single bacterial spore, while canning merely puts them to sleep',
      'Freezing arrests microbial metabolism and multiplication reversibly without destroying all cells; canning uses lethal heat that permanently destroys vegetative cells and spores',
      'Both methods are strictly bactericidal at sub-zero temperatures',
      'Freezing alters the chemical DNA of food while canning leaves living cultures intact',
    ],
    correctIndex: 1,
    explanation:
      'Bactericidal means "bacteria-killing" (e.g. 121°C autoclaving/pressure cooking destroys cellular proteins and spores). Bacteriostatic means "bacteria-arresting" (e.g. -18°C halts microbial enzyme kinetics, but microbes resume multiplication when thawed).',
    hints: [
      'Think about what happens to frozen peas when left on a warm kitchen counter.',
      '"-cidal" means killing; "-static" means keeping in a steady paused state.',
      'Sterilization through cooking permanently destroys pathogens.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Andhra Avakaya Pickle Composition (c11_home_014) - Analysis / Multi-Principle
  {
    id: 'ch_014_b',
    nodeId: NODE_C11_HOME_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Traditional Andhra Avakaya mango pickle stays preserved for over a year without refrigeration. Which combination of bacteriostatic hurdles acts simultaneously?',
    options: [
      'High salt (osmotic moisture withdrawal), Mustard oil top layer (anaerobic oxygen exclusion), Chilli & Mustard/Fenugreek (antimicrobial phytochemicals), Raw mango acidity (low pH)',
      'High artificial radiation and chemical antibiotics added by default',
      'Boiling for 4 hours at 150°C and sealing with liquid paraffin wax',
      'Only high sugar concentration above 80%',
    ],
    correctIndex: 0,
    explanation:
      'Pickling is a composite hurdle method: 15–20% salt reduces water activity, mustard oil creates an airtight barrier preventing aerobic mould germination, spices provide phytoncide antimicrobials, and natural fruit acids maintain pH < 4.5.',
    hints: [
      'Traditional pickles use multiple natural physical and chemical barriers.',
      'Oil sits on top to keep atmospheric oxygen away from aerobic moulds.',
      'Salt pulls water out of the raw mango wedges by osmosis.',
    ],
  },
  // 9. Resource Classification (c11_home_015) - Foundation
  {
    id: 'ch_015_a',
    nodeId: NODE_C11_HOME_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following groups comprises solely HUMAN resources of a family?',
    options: [
      'Time, Energy, Cooking Skills, Nutritional Knowledge, Positive Attitude',
      'Monthly Salary, Residential Flat, Gold Jewellery',
      'Government Anganwadi Centre, Public Bus, Municipal Water Supply',
      'Pressure Cooker, Mixer Grinder, LPG Cylinder',
    ],
    correctIndex: 0,
    explanation:
      'Human resources reside internally within individuals: time (24 hours/day), energy, knowledge, skills, and mental attitudes. Money, goods, and property are non-human resources. Public amenities are shared community resources.',
    hints: [
      'Human resources cannot be touched externally or transferred physically like currency.',
      'They live inside the human mind and body.',
      'Time, energy, knowledge, skills, and attitudes are the 5 human resources in ISC syllabus.',
    ],
  },
  // 10. Resource Sorting (c11_home_015) - Drag-Label
  {
    id: 'ch_015_b',
    nodeId: NODE_C11_HOME_015,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Sort each resource item into Human, Non-Human, or Shared Community categories.',
    dragItems: [
      { label: 'Homemaker Culinary Skill', targetId: 'cat_human' },
      { label: 'Family Monthly Income (₹35,000)', targetId: 'cat_nonhuman' },
      { label: 'Ayushman Bharat PHC Clinic', targetId: 'cat_shared' },
      { label: 'Mid-Day Meal Scheme Facility', targetId: 'cat_shared' },
    ],
    correctMapping: {
      cat_human: 'Homemaker Culinary Skill',
      cat_nonhuman: 'Family Monthly Income (₹35,000)',
      cat_shared: 'Ayushman Bharat PHC Clinic',
    },
    explanation:
      'Skills are personal human resources. Money and material wealth are non-human assets. Public health centres and government school schemes are shared civic resources funded collectively.',
    hints: [
      'Internal abilities belong to human.',
      'Tangible financial income belongs to non-human.',
      'Government welfare infrastructure belongs to shared community resources.',
    ],
  },
  // 11. Management Process Sequence (c11_home_016) - Drag-Sort
  {
    id: 'ch_016_a',
    nodeId: NODE_C11_HOME_016,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 5 steps of the Family Resource Management cycle in the correct chronological order.',
    sortItems: [
      'Planning (Goal setting, resource listing, predicting obstacles)',
      'Organizing (Structuring tasks, allocating responsibilities & tools)',
      'Implementing (Executing the designated plan)',
      'Controlling (Monitoring ongoing progress & mid-course corrective action)',
      'Evaluation (Appraising results to feed into the next planning cycle)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'The management process is a continuous spiral: 1. Planning sets the path; 2. Organizing aligns people and resources; 3. Implementing puts plans into action; 4. Controlling inspects deviations during work; 5. Evaluation appraises outcomes for future cycles.',
    hints: [
      'You cannot organize without first having a plan.',
      'Controlling happens while work is ongoing.',
      'Evaluation is the retrospective review that informs the next plan.',
    ],
  },
  // 12. Management Process Diagnostics (c11_home_016) - Analysis (NEP Competency)
  {
    id: 'ch_016_b',
    nodeId: NODE_C11_HOME_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'A homemaker budgets ₹8,000 for monthly groceries. On Day 14, she reviews expenditure, discovers ₹6,200 spent due to tomato price inflation, and immediately switches to seasonal cabbage and lauki for the next 2 weeks. Which management step was executed on Day 14?',
    options: [
      'Controlling (mid-course check & corrective action)',
      'Initial Planning only',
      'Retrospective Annual Evaluation',
      'Passive Delegation',
    ],
    correctIndex: 0,
    explanation:
      'Controlling is the active step that takes place DURING implementation. It compares actual spending with the planned benchmark, catches the deficit, and implements immediate corrective substitutions.',
    hints: [
      'The check is happening midway through the month, not at the very end.',
      'She is actively correcting a deviation from the plan.',
      'This is the built-in warning and adjustment mechanism of management.',
    ],
  },
  // 13. Decision Making Steps (c11_home_017) - Drag-Sort
  {
    id: 'ch_017_a',
    nodeId: NODE_C11_HOME_017,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the 6 sequential steps of rational Decision Making in Resource Management.',
    sortItems: [
      '1. Recognize and define the problem or need',
      '2. Gather relevant facts and resource data',
      '3. Identify and list possible alternatives',
      '4. Evaluate each alternative against criteria (cost, health, time)',
      '5. Select the best alternative and implement it',
      '6. Follow up and evaluate the outcome',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation:
      'Rational decision making begins with problem identification, gathers data, brainstorms alternatives, evaluates trade-offs, implements the chosen option, and closes with follow-up assessment.',
    hints: [
      'Start with identifying what the problem is.',
      'Gathering facts comes before brainstorming solutions.',
      'Evaluation of the outcome is always the final verification step.',
    ],
  },
  // 14. Decision Making in Practice (c11_home_017) - Application
  {
    id: 'ch_017_b',
    nodeId: NODE_C11_HOME_017,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluating alternatives: A family wants to reduce edible oil expenses. Option A: Buy cheapest loose unbranded palm oil. Option B: Buy mustard/sunflower oil in 5L bulk tin and adopt shallow pan steaming. Evaluate using Home Science principles.',
    options: [
      'Option A is superior because the lowest immediate rupee price is the only valid management metric',
      'Option B is superior because it balances economy (bulk buying discount) with nutritional safety (FSSAI compliance) and oil-reduction health benefits',
      'Both options have identical physiological and financial impacts',
      'Option A is better because unbranded loose oils have zero oxidation risk',
    ],
    correctIndex: 1,
    explanation:
      'A sound decision evaluates multiple criteria: health, quality, long-term costs, and safety. Loose unbranded oil risks adulteration and high saturated fats. Option B delivers long-term economic and health optimization.',
    hints: [
      'Remember the misconception: "The cheapest option is always the best decision."',
      'Consider health risks, adulteration, and long-term medical expenditures.',
      'Bulk buying branded staples plus portion control optimizes both budget and health.',
    ],
  },
  // 15. Shared Resource Conservation (c11_home_018) - Numeric
  {
    id: 'ch_018_a',
    nodeId: NODE_C11_HOME_018,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'A single leaking faucet dripping at 1 drop per second in a household wastes approximately how many litres of clean water in one full year?',
    correctAnswer: 11000,
    tolerance: 500,
    unit: 'litres',
    explanation:
      'According to municipal water conservation audits, a single dripping tap wastes approximately 11,000 litres of water annually — enough to supply one individual with drinking water for over 15 years.',
    hints: [
      'It is an 11-thousand figure.',
      'Think of 11 followed by three zeros.',
      'Enter approximately 11000.',
    ],
  },
  // 16. Shared Resource 3R Hierarchy (c11_home_018) - Analysis
  {
    id: 'ch_018_b',
    nodeId: NODE_C11_HOME_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why is the 3R conservation framework (Reduce → Reuse → Recycle) structured as an explicit hierarchy rather than equal choices?',
    options: [
      'Because "Reduce" prevents raw resource extraction, manufacturing energy, and packaging waste at the source, making it the most ecologically and economically efficient action',
      'Because "Recycle" produces zero carbon emissions and uses no fresh electricity',
      'Because "Reuse" is illegal under Indian municipal corporation bye-laws',
      'The order is purely alphabetical and carries no practical priority',
    ],
    correctIndex: 0,
    explanation:
      'Reducing consumption eliminates lifecycle energy, water, and material footprints upfront. Reusing preserves the manufactured article with minimal energy. Recycling requires transport, remelting/reprocessing, and energy, making it the last resort.',
    hints: [
      'Preventing waste at the source requires zero reprocessing energy.',
      'Recycling still requires transport and thermal energy to re-manufacture.',
      'Hierarchy prioritizes prevention > multiple uses > reprocessing.',
    ],
  },
  // 17. Time and Energy Plans (c11_home_019) - Recall
  {
    id: 'ch_019_a',
    nodeId: NODE_C11_HOME_019,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the four types of time plans with their respective household time horizons and functions.',
    options: [
      'Daily (hour-by-hour 24hr schedule); Weekly (haat marketing & batch cleaning); Monthly (salary & PDS ration cycle); Annual (festivals like Diwali/Pongal & school exams)',
      'Daily (annual crop harvest); Weekly (daily waking time); Monthly (lunch rest); Annual (teeth brushing)',
      'All time plans operate exclusively on a 10-year planning cycle',
      'Time is renewable through bank loans, so schedules are unnecessary',
    ],
    correctIndex: 0,
    explanation:
      'Daily plans manage the 24-hour routine; weekly plans balance recurring chores like the weekly haat or deep washing; monthly plans coordinate financial and ration cycles; annual plans budget for major festivals, taxes, and holidays.',
    hints: [
      'Daily manages hour-by-hour routine.',
      'Weekly organizes recurring tasks that do not happen daily.',
      'Annual accounts for festival seasons and academic calendars.',
    ],
  },
  // 18. Peak Load & Rest Periods (c11_home_019) - Application
  {
    id: 'ch_019_b',
    nodeId: NODE_C11_HOME_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'In a typical Indian household, what defines "Peak Load" and how should a homemaker strategically alleviate morning peak load (6:00 AM – 9:00 AM)?',
    options: [
      'Peak load is the period of maximum simultaneous task demands (cooking, packing tiffins, elder medicines); it is relieved by night-before advance prep (soaking dals, cutting veggies) and family delegation',
      'Peak load means afternoon rest; it is relieved by skipping children breakfast entirely',
      'Peak load is exclusively related to industrial factories and cannot occur at home',
      'Peak load is resolved by doing every single household task between 1:00 AM and 4:00 AM',
    ],
    correctIndex: 0,
    explanation:
      'Peak load occurs when multiple high-priority tasks converge simultaneously (6–9 AM / 6–9 PM). Strategically, pre-soaking pulses, cutting vegetables the night before, and delegating tiffin packing flatten the morning peak spike.',
    hints: [
      'Peak load is the highest simultaneous demand on time and energy.',
      'Advance preparation shifts heavy tasks away from the morning crunch.',
      'Delegation distributes workload across family members.',
    ],
  },
  // 19. Work Simplification Meaning & Gilbreth (c11_home_020) - Foundation
  {
    id: 'ch_020_a',
    nodeId: NODE_C11_HOME_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the precise definition of "Work Simplification" in Home Science?',
    options: [
      'The systematic re-organization of household tasks to achieve the SAME quality output with MINIMUM time, energy, and financial expenditure',
      'Lowering housekeeping standards and leaving dishes unwashed',
      'Purchasing every gadget in the market regardless of electrical cost',
      'Hiring full-time domestic workers for all tasks',
    ],
    correctIndex: 0,
    explanation:
      'Work simplification (originating from Frank and Lillian Gilbreth motion studies) means achieving identical or improved standard of output while consciously eliminating unnecessary steps, fatigue, and muscular strain.',
    hints: [
      'Work simplification does NOT mean reducing standards or quality.',
      'It focuses on motion economy and ergonomic efficiency.',
      'Same result with less fatigue and fewer wasted movements.',
    ],
  },
  // 20. Four Methods of Work Simplification (c11_home_020) - Analysis (Drag-Label)
  {
    id: 'ch_020_b',
    nodeId: NODE_C11_HOME_020,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Classify each ergonomic solution under its correct Work Simplification Method.',
    dragItems: [
      { label: 'Using Pressure Cooker & Long-Handled Mop', targetId: 'method_equipment' },
      { label: 'Organizing Kitchen on Work-Triangle Principle', targetId: 'method_method' },
      { label: 'Setting Counter at 90cm Elbow Height & Sitting for Peeling', targetId: 'method_posture' },
      { label: 'Batching Chopping & Working in Cool Morning Hours', targetId: 'method_sequence' },
    ],
    correctMapping: {
      method_equipment: 'Using Pressure Cooker & Long-Handled Mop',
      method_method: 'Organizing Kitchen on Work-Triangle Principle',
      method_posture: 'Setting Counter at 90cm Elbow Height & Sitting for Peeling',
      method_sequence: 'Batching Chopping & Working in Cool Morning Hours',
    },
    explanation:
      'The four Gilbreth-adapted methods are: 1. Equipment change (tools/gadgets); 2. Method change (workflow/kitchen layout); 3. Posture change (ergonomics/counter heights); 4. Sequence & environment change (task grouping/lighting/thermal comfort).',
    hints: [
      'Mops and pressure cookers are tools/equipment.',
      'Work triangle is a spatial workflow method.',
      'Counter height and sitting posture protect the musculoskeletal spine.',
    ],
  },
  // 21. Constructing an Ergonomic Kitchen (c11_home_020) - Construct / Creativity
  {
    id: 'ch_020_c',
    nodeId: NODE_C11_HOME_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Construct the 4 key components of an Ergonomic Kitchen Work-Station for the Verma family to eliminate chronic lower back pain.',
    availableParts: [
      'Counter-at-Elbow-Height(90cm)',
      'Compact-Work-Triangle(Sink-Stove-Fridge)',
      'Pressure-Cooker-&-Long-Mop',
      'Adequate-Task-Lighting-&-Ventilation',
      'Squat-Floor-Grinding-SilBatta',
      'Scattered-Storage-in-3-Rooms',
    ],
    targetState:
      'Counter-at-Elbow-Height(90cm) Compact-Work-Triangle(Sink-Stove-Fridge) Pressure-Cooker-&-Long-Mop Adequate-Task-Lighting-&-Ventilation',
    validationHint:
      'Select the 4 positive ergonomic and work simplification features; exclude poor postures and scattered layouts.',
    explanation:
      'An ergonomic kitchen pairs elbow-height counters (avoids spinal flexion), a tight work triangle (reduces walking steps), efficient tools (pressure cooker/long mop), and optimal lighting/ventilation to minimize fatigue.',
    hints: [
      'Select tools that keep the spine upright and reduce trips between sink and stove.',
      'Do not include sil-batta squatting or scattered storage.',
      'Add all 4 ergonomic solutions in order.',
    ],
  },
  // 22. Case Study: SHG Fruit Preservation (c11_home_013, c11_home_017) - Advanced Evaluation
  {
    id: 'ch_014_c',
    nodeId: NODE_C11_HOME_014,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A Ratnagiri Mahila SHG has 500 kg of peak summer mangoes. They decide to make Aam Papad (sun-drying) and Mango Squash (sodium benzoate). Why does this dual strategy optimize resource management?',
    options: [
      'It leverages free solar energy (shared resource), applies FSSAI-compliant chemical preservation for liquid shelf-life, prevents 30-40% post-harvest loss, and creates year-round marketable income',
      'It violates all food safety laws and wastes energy',
      'Sun-drying is only possible in snow-covered areas',
      'Liquid squashes do not require any preservation principle',
    ],
    correctIndex: 0,
    explanation:
      'This strategy applies multi-principle food preservation: free sunlight removes moisture for Aam Papad without fuel costs, while sodium benzoate (max 750 ppm) enables stable commercial squash. This cuts agricultural post-harvest waste and enhances family livelihood.',
    hints: [
      'Think about post-harvest losses in India (30–40% in fruits).',
      'Sunlight is a free renewable shared energy resource.',
      'Value-addition turns surplus into shelf-stable economic assets.',
    ],
  },
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_HOME_011,
  title: 'Storage of Foods & Household Resource Management',
  definition:
    'Food storage and preservation apply scientific controls over moisture, temperature, pH, and microbes to prevent spoilage and retain nutrients. Household resource management systematically mobilizes human, non-human, and shared assets through planning, organizing, implementing, controlling, and evaluating.',
  eli5:
    'Think of your kitchen as a smart control center. High-water foods spoil fast like melting ice, so we freeze or pickle them. Your time and energy are like battery power: if you plan your day, use smart tools like pressure cookers, and sit comfortably, you get everything done without running out of charge!',
  misconceptions: [
    {
      misconception: 'Potatoes and onions are non-perishable because they stay out of the fridge for weeks.',
      correction:
        'Potatoes (80% water) and onions (89% water) are semi-perishable. They sprout and rot if kept in warm, humid conditions. Non-perishables like rice and dal have under 14% water and last a year.',
    },
    {
      misconception: 'Refrigeration destroys and kills bacteria completely.',
      correction:
        'Refrigeration is bacteriostatic (it merely puts microbial metabolism on pause). When food returns to room temperature, bacteria multiply rapidly again.',
    },
    {
      misconception: 'Convenience foods are always unhealthy and should never be used.',
      correction:
        'Minimally processed convenience foods like frozen peas, pasteurized milk, and roasted chana are healthy and time-saving. Only ultra-processed foods high in salt, sugar, and trans-fats should be restricted.',
    },
    {
      misconception: 'Sugar and salt preserve food because they are poisonous chemicals.',
      correction:
        'Sugar and salt preserve food through osmosis: they pull water out of microbial cells, lowering water activity so microbes cannot survive.',
    },
    {
      misconception: 'Work simplification means doing less work or compromising on cleanliness.',
      correction:
        'Work simplification produces the EXACT same quality output with fewer body motions, better posture, and smarter tools.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is a perishable food requiring 1–4°C refrigeration?',
      options: ['Basmati Rice', 'Paneer / Fresh Curd', 'Arhar Dal', 'Table Salt'],
      correctIndex: 1,
    },
    {
      question: 'Why are onions and potatoes stored in separate ventilated baskets?',
      options: [
        'Onions release ethylene and moisture that cause potatoes to sprout and rot',
        'Potatoes absorb onion color',
        'Both must always be kept inside the freezer',
        'It is merely a visual tradition with no scientific basis',
      ],
      correctIndex: 0,
    },
    {
      question: 'What is the maximum permitted limit of Sodium Benzoate in jams and squashes under FSSAI?',
      options: ['750 ppm', '50 ppm', '5000 ppm', '10 ppm'],
      correctIndex: 0,
    },
    {
      question: 'Sterilization by cooking at 121°C is classified as:',
      options: ['Bacteriostatic method', 'Bactericidal method', 'Dehydration method', 'Refrigeration method'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following is a democratic human resource received equally by everyone?',
      options: ['Money / Bank Balance', 'Time (24 hours/day)', 'Residential Property', 'Motor Car'],
      correctIndex: 1,
    },
    {
      question: 'The management step where ongoing spending is monitored and corrected midway is called:',
      options: ['Planning', 'Controlling', 'Evaluation', 'Discarding'],
      correctIndex: 1,
    },
    {
      question: 'In the 3R environmental conservation hierarchy, what is the most effective top-tier step?',
      options: ['Recycle', 'Reduce at source', 'Reuse once', 'Incinerate'],
      correctIndex: 1,
    },
    {
      question: 'The ideal ergonomic kitchen counter height for standing work is at:',
      options: ['Ankle height', 'Knee height', 'Elbow height (approx 85-95 cm)', 'Above forehead level'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Student can classify foods by perishability, apply preservation methods, categorize resources, navigate the 5-step management cycle, and implement ergonomic work simplification principles.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Food Moisture & Spoilage Simulator',
    instruction: 'Adjust the food moisture slider and temperature to observe how bacterial growth changes in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HOME_011,
  },
  {
    title: 'Lab 2: The Multi-Hurdle Pickle & Preservation Lab',
    instruction: 'Toggle Salt, Oil Barrier, and Lemon/Acid to see how microbes are suppressed by combined bacteriostatic forces.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_HOME_013,
  },
  {
    title: 'Lab 3: Family Resource Allocation Matrix',
    instruction: 'Balance human time/energy with financial budget to see how shared resources relieve family strain.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HOME_015,
  },
  {
    title: 'Lab 4: 24-Hour Peak Load & Energy Curve',
    instruction: 'Adjust task scheduling between 6 AM and 9 AM to flatten the morning peak load and insert rest periods.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HOME_019,
  },
  {
    title: 'Lab 5: Ergonomic Kitchen Work-Triangle Simulator',
    instruction: 'Toggle counter height and layout to minimize walking steps and lumbar spinal strain.',
    interactionType: 'drag-position',
    nodeId: NODE_C11_HOME_020,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Home Kitchen & Resource Management Audit',
  description:
    'Conduct a live scientific audit of your home kitchen and family schedule over this weekend. Inspect storage zones, test an ergonomic improvement, and calculate shared utility conservation.',
  steps: [
    'Classify 10 pantry items into Perishable, Semi-perishable, and Non-perishable. Check if onions and potatoes are separated in ventilated baskets.',
    'Check if raw meats are stored on the bottom fridge shelf and milk is placed on the cold top shelf.',
    'Identify one dripping tap in the house or inspect the RO reject water pipe — route reject water into a mopping bucket.',
    'Map your family morning routine between 6:00 AM and 9:00 AM. Introduce one night-before prep task and calculate time saved.',
    'Measure your kitchen counter height. If it is too low, place a sturdy wooden cutting board on a riser to reach elbow level (85–95 cm).',
  ],
};

function C11_HomeScienceStorageFoodsPerishableSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_HOME_011,
  title = DEFAULT_PROPS.title || 'Storage of Foods & Household Resource Management',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['homesci'] || {
    name: 'Home Science',
    emoji: '🏡',
    color: 'emerald',
  };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction & Observation Interactive States
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionChecked, setPredictionChecked] = useState(false);
  const [observationIndex, setObservationIndex] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);
  const [observationChecked, setObservationChecked] = useState(false);

  // Lab 1 Simulator States (Moisture, Temp, Spoilage)
  const [simMoisture, setSimMoisture] = useState(80); // 5% to 95%
  const [simTemp, setSimTemp] = useState(32); // -18 to 100°C
  const [simPreservativePpm, setSimPreservativePpm] = useState(0); // 0 to 1000 ppm

  // Lab 2 Multi-Hurdle Pickle States
  const [pickleSalt, setPickleSalt] = useState(false);
  const [pickleOil, setPickleOil] = useState(false);
  const [pickleAcid, setPickleAcid] = useState(false);
  const [pickleSpices, setPickleSpices] = useState(false);

  // Lab 3 Resource Allocation States
  const [familyIncome, setFamilyIncome] = useState(40000); // INR/month
  const [useSharedPds, setUseSharedPds] = useState(true);
  const [useSharedPublicTransport, setUseSharedPublicTransport] = useState(true);

  // Lab 4 Time & Energy Peak Load States
  const [delegateTiffins, setDelegateTiffins] = useState(false);
  const [preNightPrep, setPreNightPrep] = useState(false);

  // Lab 5 Ergonomic Workstation States
  const [counterHeightCm, setCounterHeightCm] = useState(88); // 65 to 105 cm
  const [useWorkTriangle, setUseWorkTriangle] = useState(true);
  const [usePressureCooker, setUsePressureCooker] = useState(true);
  const [useLongMop, setUseLongMop] = useState(true);

  // Challenge and Adaptive Difficulty States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag and drop & input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback animations & bursts
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconceptions tracked
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection inputs
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── DERIVED REAL-TIME SIMULATION METRICS ───

  // 1. Bacterial growth index (0 to 100%)
  const bacterialGrowthIndex = useMemo(() => {
    if (simTemp <= 0) return 3; // dormant in freezing
    if (simTemp >= 70) return 0; // destroyed by heat pasteurization/cooking
    if (simMoisture < 15) return 2; // dehydrated shelf-stable
    const moistureFactor = (simMoisture - 15) / 80;
    const tempFactor = simTemp > 45 ? Math.max(0, 1 - (simTemp - 45) / 25) : simTemp / 45;
    const preservativeDiscount = Math.min(0.8, simPreservativePpm / 1000);
    const score = Math.round(moistureFactor * tempFactor * 100 * (1 - preservativeDiscount));
    return Math.max(0, Math.min(100, score));
  }, [simMoisture, simTemp, simPreservativePpm]);

  // 2. Pickle shelf-life in days
  const pickleShelfLifeDays = useMemo(() => {
    let days = 2; // base fresh mango
    if (pickleSalt) days += 60;
    if (pickleAcid) days += 90;
    if (pickleOil) days += 150;
    if (pickleSpices) days += 60;
    return days;
  }, [pickleSalt, pickleAcid, pickleOil, pickleSpices]);

  // 3. Ergonomic Spinal Strain Score (0 = perfect, 100 = extreme strain)
  const spinalStrainScore = useMemo(() => {
    const heightDeviation = Math.abs(counterHeightCm - 90); // 90cm is ideal elbow height
    let strain = heightDeviation * 3.5;
    if (!useWorkTriangle) strain += 25;
    if (!usePressureCooker) strain += 15;
    if (!useLongMop) strain += 20;
    return Math.max(5, Math.min(100, Math.round(strain)));
  }, [counterHeightCm, useWorkTriangle, usePressureCooker, useLongMop]);

  // 4. Spaced repetition review interval string
  const reviewIntervalText = useMemo(() => {
    if (errors === 0) return 'Review in 7 days (Mastered)';
    if (errors <= 3) return 'Review in 3 days (Strengthening)';
    return 'Review in 1 day (Needs Focus)';
  }, [errors]);

  // 5. Filtered challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECTS ───

  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Here is the comprehensive explanation.');
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // 2D Canvas visualizer for bacteria
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 60, 0, Math.PI * 2);
      ctx.strokeStyle = bacterialGrowthIndex > 50 ? '#ef4444' : '#10b981';
      ctx.lineWidth = 3;
      ctx.stroke();

      const count = Math.floor((bacterialGrowthIndex / 100) * 45);
      for (let i = 0; i < count; i++) {
        const angle = (i * 137.5 * Math.PI) / 180 + tick * 0.02;
        const radius = Math.min(50, 8 + Math.sqrt(i) * 6 + Math.sin(tick * 0.05 + i) * 3);
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = bacterialGrowthIndex > 50 ? '#f87171' : '#34d399';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [bacterialGrowthIndex]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Moisture drives rapid spoilage.'
        : 'Notice the moisture difference — let us explore why!'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore each concept hands-on!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in free exploration mode. Experiment with no pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Time for real-world ISC competency challenges. You can do this!');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const arr = prev.length ? [...prev] : (activeChallenge.sortItems || []).map((_, i) => i);
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered Food Storage, Preservation, and Family Resource Management.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well done.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete step-by-step breakdown.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  return (
    <div
      role="region"
      aria-label="Food Storage and Resource Management Simulation"
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-600 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                ISC Class 11 Home Science
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                CISCE 2026 NEP
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.section
          key="phase_discovery"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/40 rounded-3xl border border-emerald-700/40 shadow-xl"
          >
            <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🌾</span> Real-World Case Scenario
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-200/80 mt-3 p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/50">
              💡 <strong>Core Challenge:</strong> {SCENARIO.context}
            </p>
          </motion.div>

          {/* Interactive Curiosity Hook */}
          <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-sm">🤔 Think & Predict</span>
            </div>
            <p className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center text-xs leading-6 font-bold mr-2 text-slate-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✨ Brilliant intuition! High water content (80–85%) accelerates microbial action.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: EXPLORE (Hands-on Labs) ─── */}
      {phase === 'explore' && (
        <motion.section
          key="phase_explore"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Lab Step Indicator */}
          <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400">
                Investigation {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentSlide ? 'bg-emerald-500 w-8' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Interactive Lab Canvas & Workspaces */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-6"
            >
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-emerald-300 text-sm font-semibold">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </div>

              {/* SLIDE 0: Food Moisture & Temperature Spoilage Lab */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 space-y-5">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                        <span>Food Moisture Content:</span>
                        <span className="text-emerald-400">
                          {simMoisture}% (aw approx {(simMoisture / 100).toFixed(2)})
                        </span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={95}
                        value={simMoisture}
                        onChange={(e) => {
                          setSimMoisture(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Food Moisture Slider"
                        className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>Non-perishable (&lt;14%)</span>
                        <span>Semi (40-60%)</span>
                        <span>Perishable (&gt;75%)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                        <span>Storage Temperature:</span>
                        <span className="text-amber-400">{simTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min={-18}
                        max={100}
                        value={simTemp}
                        onChange={(e) => {
                          setSimTemp(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Storage Temperature Slider"
                        className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>Freezer (-18°C)</span>
                        <span>Fridge (4°C)</span>
                        <span>Summer (38°C)</span>
                        <span>Boil (100°C)</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 uppercase">Current Classification</div>
                      <div className="text-base font-black text-white mt-1">
                        {simMoisture < 15
                          ? '🌾 Non-Perishable (Shelf-stable in Airtight Dabba)'
                          : simMoisture < 65
                          ? '🥔 Semi-Perishable (Cool, Dark, Ventilated Basket)'
                          : '🥛 Perishable (Requires Immediate Cold Storage 1–4°C)'}
                      </div>
                    </div>
                  </div>

                  {/* Visualizer Simulation Canvas */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">Microbial Petri Dish Visualization</div>
                    <canvas ref={canvasRef} width={280} height={180} className="rounded-xl" />
                    <div className="w-full mt-3">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-400">Microbial Proliferation Rate:</span>
                        <span className={bacterialGrowthIndex > 50 ? 'text-rose-400' : 'text-emerald-400'}>
                          {bacterialGrowthIndex}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          animate={{ width: `${bacterialGrowthIndex}%` }}
                          style={{
                            backgroundColor:
                              bacterialGrowthIndex > 65
                                ? '#ef4444'
                                : bacterialGrowthIndex > 25
                                ? '#f59e0b'
                                : '#10b981',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Multi-Hurdle Pickle & Preservation Lab */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-white">Toggle Preservation Hurdles:</h3>
                    {[
                      {
                        label: 'Salt (15–20% Brine)',
                        state: pickleSalt,
                        setter: setPickleSalt,
                        desc: 'Draws out cellular moisture via osmosis (aw drop)',
                      },
                      {
                        label: 'Mustard Oil Layer',
                        state: pickleOil,
                        setter: setPickleOil,
                        desc: 'Forms continuous airtight seal against aerobic moulds',
                      },
                      {
                        label: 'Lemon / Acetic Acid',
                        state: pickleAcid,
                        setter: setPickleAcid,
                        desc: 'Drops pH below 4.5 inhibiting bacterial enzymes',
                      },
                      {
                        label: 'Turmeric & Spices',
                        state: pickleSpices,
                        setter: setPickleSpices,
                        desc: 'Contributes natural phytoncide antimicrobial action',
                      },
                    ].map((item, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          item.setter(!item.state);
                          audioManager.play('tap');
                        }}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${
                          item.state
                            ? 'bg-emerald-950/60 border-emerald-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>{item.label}</span>
                          <span className={item.state ? 'text-emerald-400' : 'text-slate-600'}>
                            {item.state ? 'ACTIVE ✓' : 'OFF ✗'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-between items-center text-center">
                    <div className="text-xs uppercase font-bold text-slate-400">Jar Preservation Status</div>

                    <svg viewBox="0 0 200 220" className="w-44 h-44 my-2">
                      <rect x="40" y="50" width="120" height="150" rx="20" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
                      <rect x="60" y="30" width="80" height="20" rx="6" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                      {pickleSalt && <rect x="45" y="140" width="110" height="55" rx="10" fill="#0284c7" opacity="0.4" />}
                      {pickleOil && <rect x="45" y="70" width="110" height="25" rx="5" fill="#eab308" opacity="0.6" />}
                      <circle cx="80" cy="120" r="14" fill="#f59e0b" />
                      <circle cx="120" cy="130" r="16" fill="#f59e0b" />
                      <circle cx="95" cy="155" r="15" fill="#f59e0b" />
                      {pickleSpices && (
                        <text x="100" y="115" textAnchor="middle" fill="#fde047" fontSize="10">
                          ✦ ✦ ✦
                        </text>
                      )}
                    </svg>

                    <div>
                      <div className="text-xs text-slate-400 font-semibold">Estimated Shelf Life:</div>
                      <div className="text-2xl font-black text-emerald-400">{pickleShelfLifeDays} Days</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {pickleShelfLifeDays > 300
                          ? '🌟 Full 1-Year Traditional Stability Achieved!'
                          : '⚠️ Needs all 4 hurdles for complete year-round shelf life.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Resource Allocation Matrix */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-gold-400">HUMAN RESOURCES</span>
                      <p className="text-xs text-slate-300 mt-1">
                        Homemaker Time, Culinary Skills, Health Energy, Family Planning Attitude.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-emerald-400">NON-HUMAN ASSETS</span>
                      <p className="text-xs text-slate-300 mt-1">
                        Monthly Income (₹{familyIncome.toLocaleString()}), Pressure Cooker, Refrigerator.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <span className="text-xs font-bold text-amber-400">SHARED COMMUNITY</span>
                      <p className="text-xs text-slate-300 mt-1">
                        PDS Fair Price Shop, Anganwadi, Public Transport, Municipal Water.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm font-bold text-white">Leverage Shared Community Facilities:</div>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUseSharedPds(!useSharedPds)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                          useSharedPds
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        PDS Ration Scheme {useSharedPds ? '✓' : ''}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setUseSharedPublicTransport(!useSharedPublicTransport)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                          useSharedPublicTransport
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Public Metro/Bus {useSharedPublicTransport ? '✓' : ''}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: 24-Hour Peak Load & Energy Curve */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-300">Peak Load Management Levers:</div>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPreNightPrep(!preNightPrep)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                          preNightPrep
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Night-Before Prep (Soak dal / cut veggies) {preNightPrep ? '✓' : ''}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDelegateTiffins(!delegateTiffins)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                          delegateTiffins
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Delegate Tiffin Packing {delegateTiffins ? '✓' : ''}
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">
                      Homemaker Energy Demand Across 24 Hours (Red Zone = Peak Load Stress)
                    </div>
                    <svg viewBox="0 0 500 160" className="w-full">
                      <line x1="40" y1="130" x2="480" y2="130" stroke="#334155" strokeWidth="1" />
                      <line x1="40" y1="30" x2="40" y2="130" stroke="#334155" strokeWidth="1" />

                      <text x="50" y="145" fill="#64748b" fontSize="9">6 AM</text>
                      <text x="140" y="145" fill="#64748b" fontSize="9">9 AM</text>
                      <text x="230" y="145" fill="#64748b" fontSize="9">1 PM</text>
                      <text x="320" y="145" fill="#64748b" fontSize="9">6 PM</text>
                      <text x="410" y="145" fill="#64748b" fontSize="9">9 PM</text>

                      <path
                        d={
                          preNightPrep && delegateTiffins
                            ? 'M 50 110 Q 95 60 140 95 T 230 115 T 320 80 T 410 100 T 480 125'
                            : 'M 50 115 Q 95 20 140 100 T 230 110 T 320 40 T 410 90 T 480 125'
                        }
                        fill="none"
                        stroke={preNightPrep && delegateTiffins ? '#10b981' : '#f43f5e'}
                        strokeWidth="3"
                      />

                      <rect x="220" y="100" width="50" height="25" rx="4" fill="#065f46" opacity="0.6" />
                      <text x="245" y="115" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                        Rest Period
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Ergonomic Workstation Simulator */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-bold mb-1">
                        <span>Kitchen Counter Height:</span>
                        <span className="text-emerald-400">{counterHeightCm} cm (Ideal: 85–95 cm)</span>
                      </div>
                      <input
                        type="range"
                        min={65}
                        max={105}
                        value={counterHeightCm}
                        onChange={(e) => {
                          setCounterHeightCm(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Counter Height Slider"
                        className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-400">Work Simplification Methods:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setUseWorkTriangle(!useWorkTriangle)}
                          className={`p-2 rounded-xl text-xs font-bold border text-left ${
                            useWorkTriangle
                              ? 'bg-emerald-950/60 border-emerald-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          Work Triangle Layout {useWorkTriangle ? '✓' : ''}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setUsePressureCooker(!usePressureCooker)}
                          className={`p-2 rounded-xl text-xs font-bold border text-left ${
                            usePressureCooker
                              ? 'bg-emerald-950/60 border-emerald-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          Pressure Cooker {usePressureCooker ? '✓' : ''}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setUseLongMop(!useLongMop)}
                          className={`p-2 rounded-xl text-xs font-bold border text-left ${
                            useLongMop
                              ? 'bg-emerald-950/60 border-emerald-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          Long-Handled Mop {useLongMop ? '✓' : ''}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                    <div className="text-xs uppercase font-bold text-slate-400">Ergonomic Musculoskeletal Strain</div>
                    <div className="text-3xl font-black mt-2 text-rose-400">{spinalStrainScore}%</div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden mt-2">
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${spinalStrainScore}%` }}
                        style={{
                          backgroundColor:
                            spinalStrainScore > 60
                              ? '#ef4444'
                              : spinalStrainScore > 30
                              ? '#f59e0b'
                              : '#10b981',
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {spinalStrainScore < 25
                        ? '✅ Perfect spinal alignment and motion economy.'
                        : '⚠️ High lumbar flexion risks chronic lower back pain.'}
                    </p>
                  </div>
                </div>
              )}

              {/* ─── BRILLIANT.ORG PREDICT-THEN-CHECK SECTION ─── */}
              <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 rounded-2xl border border-amber-600/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                      🎯 Prediction Challenge {predictionIndex + 1} of {PREDICTION_QUESTIONS.length}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setPredictionIndex((p) => (p + 1) % PREDICTION_QUESTIONS.length);
                      setPredictionSelected(null);
                      setPredictionChecked(false);
                    }}
                    className="text-xs text-amber-300 underline font-semibold"
                  >
                    Switch Prediction Question ↻
                  </button>
                </div>

                <p className="text-sm font-bold text-white">{PREDICTION_QUESTIONS[predictionIndex].question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPredictionSelected(i);
                        setPredictionChecked(true);
                        audioManager.play(
                          i === PREDICTION_QUESTIONS[predictionIndex].correctIndex ? 'success' : 'pop'
                        );
                      }}
                      className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                        predictionChecked
                          ? i === PREDICTION_QUESTIONS[predictionIndex].correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : predictionSelected === i
                            ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          : predictionSelected === i
                          ? 'bg-amber-950 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span> {opt}
                    </button>
                  ))}
                </div>

                {predictionChecked && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-slate-900/80 rounded-xl border border-amber-500/40 text-xs text-amber-200 space-y-1"
                  >
                    <div>
                      <strong>Verification Instruction:</strong>{' '}
                      {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                    </div>
                    <div className="text-slate-400">{PREDICTION_QUESTIONS[predictionIndex].explanation}</div>
                  </motion.div>
                )}
              </div>

              {/* ─── BRILLIANT.ORG 'WHAT DO YOU NOTICE?' OBSERVATION SECTION ─── */}
              <div className="p-5 bg-gradient-to-r from-gold-950/40 via-slate-900 to-gold-950/20 rounded-2xl border border-gold-600/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gold-400 font-bold text-xs uppercase tracking-wider">
                      👁️ Observation Check {observationIndex + 1} of {OBSERVATION_QUESTIONS.length}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setObservationIndex((o) => (o + 1) % OBSERVATION_QUESTIONS.length);
                      setObservationSelected(null);
                      setObservationChecked(false);
                    }}
                    className="text-xs text-gold-300 underline font-semibold"
                  >
                    Switch Observation Question ↻
                  </button>
                </div>

                <p className="text-sm font-bold text-white">{OBSERVATION_QUESTIONS[observationIndex].question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                  {OBSERVATION_QUESTIONS[observationIndex].observableOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setObservationSelected(i);
                        setObservationChecked(true);
                        audioManager.play(
                          i === OBSERVATION_QUESTIONS[observationIndex].correctIndex ? 'success' : 'pop'
                        );
                      }}
                      className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                        observationChecked
                          ? i === OBSERVATION_QUESTIONS[observationIndex].correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : observationSelected === i
                            ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          : observationSelected === i
                          ? 'bg-gold-950 border-gold-500 text-gold-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-gold-500/50'
                      }`}
                    >
                      <span className="font-bold mr-1.5">{String.fromCharCode(65 + i)}.</span> {opt}
                    </button>
                  ))}
                </div>

                {observationChecked && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-slate-900/80 rounded-xl border border-gold-500/40 text-xs text-gold-200"
                  >
                    <strong>Key Insight:</strong> {OBSERVATION_QUESTIONS[observationIndex].explanation}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-sm disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-black text-sm shadow-lg shadow-gold-600/30"
              >
                Try Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.section
          key="phase_sandbox"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs uppercase font-bold text-gold-400">Sandbox Playground</span>
              <h2 className="text-xl font-bold text-white">Free Exploration & Variable Tuning</h2>
              <p className="text-xs text-slate-400">
                Test any combinations freely. Real-time visualization updates instantly as you drag.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30"
            >
              Ready for ISC Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400">FOOD PRESERVATION ENGINE</span>
              <div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Moisture:</span>
                  <span className="font-bold text-emerald-300">{simMoisture}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={95}
                  value={simMoisture}
                  onChange={(e) => {
                    setSimMoisture(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  aria-label="Sandbox Moisture Slider"
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Temp:</span>
                  <span className="font-bold text-amber-300">{simTemp}°C</span>
                </div>
                <input
                  type="range"
                  min={-18}
                  max={100}
                  value={simTemp}
                  onChange={(e) => {
                    setSimTemp(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  aria-label="Sandbox Temperature Slider"
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div className="text-xs font-bold text-slate-300">
                Microbial Growth: <span className="text-rose-400">{bacterialGrowthIndex}%</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400">TIME & ENERGY CURVE</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreNightPrep(!preNightPrep)}
                  className={`p-2 rounded-lg text-xs font-bold w-full border ${
                    preNightPrep
                      ? 'bg-gold-900/60 border-gold-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Night Prep {preNightPrep ? '✓' : '✗'}
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setDelegateTiffins(!delegateTiffins)}
                  className={`p-2 rounded-lg text-xs font-bold w-full border ${
                    delegateTiffins
                      ? 'bg-gold-900/60 border-gold-500 text-white'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  Delegate {delegateTiffins ? '✓' : '✗'}
                </button>
              </div>
              <div className="text-xs text-slate-400">Peak Load Status: {preNightPrep ? 'Flattened' : 'Spiked'}</div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400">ERGONOMICS & WORK SIMPLIFICATION</span>
              <div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Counter Height:</span>
                  <span className="font-bold text-amber-300">{counterHeightCm} cm</span>
                </div>
                <input
                  type="range"
                  min={65}
                  max={105}
                  value={counterHeightCm}
                  onChange={(e) => {
                    setCounterHeightCm(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  aria-label="Sandbox Counter Height Slider"
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
              <div className="text-xs font-bold text-slate-300">
                Lumbar Fatigue Index: <span className="text-amber-400">{spinalStrainScore}%</span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE (NEP 2020 / CISCE Competency) ─── */}
      {phase === 'challenge' && (
        <motion.section
          key="phase_challenge"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Top Progress & Adaptive Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    : 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 font-mono">
                {activeChallenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs font-bold text-slate-400">
              Score:{' '}
              <span className="text-emerald-400 font-mono text-sm">
                {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-gold-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Active Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-2xl shadow-rose-900/50'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Topic Node: {activeChallenge.nodeId}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">{activeChallenge.question}</h3>

            {/* MCQ & Distinguish Options */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3 mt-5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 text-slate-200'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-center text-xs leading-6 font-bold mr-3 text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-2 bg-gold-700 hover:bg-gold-600 rounded-xl text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-900 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500 text-center"
                    >
                      <div className="text-xs text-slate-400 font-bold uppercase">{targetId.replace(/_/g, ' ')}</div>
                      <div className="text-sm font-black text-emerald-300 mt-2">
                        {droppedLabels[targetId] || '📥 Drag Label Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg"
                >
                  Verify Mapping ✓
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="mt-5 space-y-3">
                <div className="text-xs text-slate-400">Drag to re-order the items sequentially:</div>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 text-sm font-semibold flex items-center gap-3 cursor-grab active:cursor-grabbing"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-center text-xs leading-6 font-bold text-emerald-400">
                      {displayIdx + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg"
                >
                  Check Sequence ✓
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  aria-label="Numeric answer input"
                  className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
                <span className="text-slate-400 text-sm font-bold">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-lg"
                >
                  Submit Answer ✓
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-2 bg-slate-800 hover:bg-gold-700 border border-slate-700 rounded-xl text-white text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-600 rounded-lg text-white text-xs font-bold flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs italic">Click parts above to construct your solution...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg"
                >
                  Verify Construction ✓
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-700/50 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <span>📖</span> Step-by-Step Scientific Rationale:
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-emerald-100/90 leading-relaxed"
                    >
                      <strong className="text-emerald-400">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-emerald-800/60 border border-emerald-600 text-emerald-200 rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation 🏆' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETE (Mastery, Misconceptions, Reflection, Spaced Review) ─── */}
      {phase === 'complete' && (
        <motion.section
          key="phase_complete"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="text-center p-8 bg-gradient-to-b from-emerald-950/60 to-slate-950 rounded-3xl border border-emerald-700/50 shadow-2xl space-y-3">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white">ISC Mastery Level: {masteryLevel.toUpperCase()}</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              Final Score:{' '}
              <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong> (
              {scoreBreakdown.correct} of {scoreBreakdown.total} challenges answered correctly)
            </p>

            <div className="p-4 bg-emerald-900/30 rounded-2xl border border-emerald-600/40 text-emerald-200 text-sm font-semibold max-w-2xl mx-auto">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have completely mastered Food Storage, Preservation, and Family Resource Management!'
                : errors <= 3
                ? '👏 Excellent work! Your scientific grounding in preservation and resource management is strong.'
                : '💪 Solid effort! Review the misconception diagnostics below and retry to solidify your board exam score.'}
            </div>
          </div>

          {/* ─── VISIBLE SPACED REPETITION SCHEDULE (SRS SM-2 PROTOCOL) ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/50 via-slate-950 to-emerald-950/50 rounded-3xl border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <h3 className="text-base font-bold text-amber-300">Spaced Repetition System (SM-2 Protocol)</h3>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Based on your performance ({errors} error{errors === 1 ? '' : 's'}), your optimal memory retention
                interval is calculated as:
              </p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-900/40 border border-amber-500/60 text-amber-200 text-sm font-black">
                <span>⏰ Next Review:</span>
                <span className="underline uppercase tracking-wide">{reviewIntervalText}</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
            >
              Re-explore Labs ↺
            </motion.button>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-950 rounded-3xl border border-gold-900/40 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Reflection & Deep Processing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-emerald-400">What was the most surprising thing you learned?</p>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="E.g., How multiple hurdles like salt and oil completely replace refrigeration..."
                  className="w-full h-24 p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-amber-400">How would you explain this to a friend?</p>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="E.g., Why work simplification is about posture and smart sequences rather than taking shortcuts..."
                  className="w-full h-24 p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-gold-400">Where in real life might you use this?</p>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="E.g., Rearranging the home kitchen counter and pre-soaking dals to manage morning peak load..."
                  className="w-full h-24 p-2.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-950 rounded-3xl border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>🔍</span> Your Personalized Misconception Diagnostics
              </h3>
              <p className="text-xs text-slate-400">
                The simulation detected these conceptual traps during your session. Review the corrections:
              </p>
              <div className="space-y-3">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5">
                      <div className="text-xs font-bold text-rose-400">❌ Trapped by: {m.misconception}</div>
                      <div className="text-xs font-semibold text-emerald-300">✓ Scientific Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Practical Activity Arc */}
          <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>🏡</span> Weekend Practical Project: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_HomeScienceStorageFoodsPerishableSim;