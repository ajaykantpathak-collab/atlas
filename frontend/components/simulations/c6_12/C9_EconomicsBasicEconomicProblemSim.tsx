'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C9_ECON_021 = 'c9_econ_021';
const NODE_C9_ECON_022 = 'c9_econ_022';
const NODE_C9_ECON_023 = 'c9_econ_023';
const NODE_C9_ECON_024 = 'c9_econ_024';
const NODE_C9_ECON_025 = 'c9_econ_025';
const NODE_C9_ECON_026 = 'c9_econ_026';
const NODE_C9_ECON_027 = 'c9_econ_027';
const NODE_C9_ECON_028 = 'c9_econ_028';
const NODE_C9_ECON_029 = 'c9_econ_029';
const NODE_C9_ECON_030 = 'c9_econ_030';

const ALL_NODE_IDS = [
  NODE_C9_ECON_021,
  NODE_C9_ECON_022,
  NODE_C9_ECON_023,
  NODE_C9_ECON_024,
  NODE_C9_ECON_025,
  NODE_C9_ECON_026,
  NODE_C9_ECON_027,
  NODE_C9_ECON_028,
  NODE_C9_ECON_029,
  NODE_C9_ECON_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Economic Advisor to Punyabhumi & Bharat Growth Mission',
  intro:
    'You are appointed Chief Economic Policy Advisor for the state of Punyabhumi and the National Planning Council. The state has a fixed budget of ₹10,000 crore, 52% rain-fed agriculture, fragmented small landholdings, and high demand for schools, hospitals, steel mills, and MSP food procurement.',
  context:
    'Every rupee spent on one project is a rupee foregone for another. How will you allocate scarce resources, eliminate waste, resolve the 3 central economic questions, support farmers through HYV/FCI networks, and promote cottage vs large industries?',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'The State of Punyabhumi has ₹10,000 Cr. Metro rail costs ₹6,000 Cr, Irrigation network costs ₹6,000 Cr, and Student Laptops cost ₹6,000 Cr. Can Punyabhumi fund all three at full scale?',
  options: [
    'Yes — by simply printing more paper currency without limit',
    'No — because resources are scarce (₹10,000 Cr < ₹18,000 Cr total demand) and have alternative uses',
    'Yes — because only poor families face economic scarcity',
    'No — but only because the government forgot to tax billionaires'
  ],
  correctIndex: 1,
  hintAfter:
    "Scarcity is universal! Even billionaires and governments face finite resources with competing alternative uses. Let's explore why!",
};

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

// ─── 22+ CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - c9_econ_021
  {
    id: 'ch_01_scarcity_def',
    nodeId: NODE_C9_ECON_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which three conditions together constitute the Basic Economic Problem?',
    options: [
      'Poverty, unemployment, and high market inflation',
      'Unlimited wants, limited resources, and resources having alternative uses',
      'Lack of gold reserves, foreign debt, and high bank interest rates',
      'Corrupt middlemen, monsoons, and outdated farming tools'
    ],
    correctIndex: 1,
    explanation: 'The basic economic problem arises because human wants are unlimited, resources are finite, and those resources have multiple alternative uses.',
    hints: [
      'Think about what forces humans to make economic choices.',
      'It combines human desires, finite inputs, and multi-purpose resources.',
      'Unlimited wants + limited resources + alternative uses = Scarcity & Choice.'
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation Drag-Label - c9_econ_023 (Central Problems)
  {
    id: 'ch_02_central_problems_map',
    nodeId: NODE_C9_ECON_023,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each Central Problem to its defining decision on the economy diagram.',
    dragItems: [
      { label: 'What to Produce?', targetId: 'box_what' },
      { label: 'How to Produce?', targetId: 'box_how' },
      { label: 'For Whom to Produce?', targetId: 'box_whom' },
      { label: 'Resource Efficiency', targetId: 'box_eff' },
    ],
    correctMapping: {
      box_what: 'What to Produce?',
      box_how: 'How to Produce?',
      box_whom: 'For Whom to Produce?',
      box_eff: 'Resource Efficiency'
    },
    explanation: 'The three central problems are What to Produce (goods/quantities), How to Produce (technique: labour vs capital), and For Whom to Produce (distribution by purchasing power vs need), governed by Resource Efficiency.',
    hints: [
      'Top decision chooses Capital vs Consumer goods.',
      'Technique decision chooses Labour vs Capital intensity.',
      'Distribution decision decides who receives goods (PDS vs Market).'
    ],
  },
  // 3. Standard Application - c9_econ_022 (Productive Efficiency)
  {
    id: 'ch_03_efficiency_ratio',
    nodeId: NODE_C9_ECON_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Farmer A yields 200 kg tomatoes using 1,000 L of water. Farmer B installs drip irrigation, using 500 L to produce the same 200 kg. What is Farmer B\'s Output-to-Input ratio (kg per litre)?',
    correctAnswer: 0.4,
    tolerance: 0.02,
    unit: 'kg/L',
    explanation: 'Output ÷ Input = 200 kg ÷ 500 L = 0.40 kg per litre. Farmer B achieves twice the water efficiency of Farmer A (0.20 kg/L).',
    hints: [
      'Formula: Efficiency = Total Output (kg) ÷ Total Input (Litres).',
      'Calculate 200 ÷ 500.',
      '200 / 500 = 0.40 kg/L.'
    ],
  },
  // 4. Standard Analysis - c9_econ_025 (Productivity Gap)
  {
    id: 'ch_04_primary_gap',
    nodeId: NODE_C9_ECON_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Agriculture in India employs ~45.5% of the workforce but contributes only ~18.3% to GVA. What does this statistical gap signify?',
    options: [
      'Farmers are intentionally producing less food than people consume',
      'A massive productivity gap: average output per farm worker is far lower than in industry/services due to structural constraints',
      'Agriculture is unprofitable and should be banned completely',
      'India imports 80% of all its staple food grains'
    ],
    correctIndex: 1,
    explanation: 'The gap indicates low labour productivity in agriculture caused by small fragmented holdings, monsoon dependence, and traditional tools.',
    hints: [
      'Compare 45.5% workers producing only 18.3% of the economic value.',
      'This reflects how much value each individual worker creates.',
      'Low capital and small land plots cap output per person.'
    ],
    misconceptionIndex: 0,
  },
  // 5. Advanced Sort - c9_econ_026 & c9_econ_027 (Agricultural Problem Causal Chain)
  {
    id: 'ch_05_agri_vicious_cycle',
    nodeId: NODE_C9_ECON_026,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the steps of the Indian agricultural distress cycle in logical causal sequence.',
    sortItems: [
      'Land subdivision leads to tiny 0.38-hectare marginal holdings',
      'Small plot cannot justify fixed cost of tubewell or tractor',
      'High dependence on erratic monsoon causes sudden crop failure',
      'Forced borrowing from informal moneylenders at 24-36% interest leads to debt trap'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Subdivision creates marginal holdings → capital/irrigation investment becomes unviable → dependence on monsoon causes crop failure → informal high-interest borrowing triggers debt trap.',
    hints: [
      'Start with inheritance and fragmentation of plots.',
      'Follow with the inability to invest in tubewells/tractors.',
      'Weather shock leads to borrowing at exorbitant interest rates.'
    ],
    misconceptionIndex: 1,
  },
  // 6. Foundation Recall - c9_econ_028 (Green Revolution architect)
  {
    id: 'ch_06_green_rev_architect',
    nodeId: NODE_C9_ECON_028,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who was the Indian scientific architect of the Green Revolution at IARI New Delhi who adapted Norman Borlaug\'s semi-dwarf wheat?',
    options: [
      'Dr. Verghese Kurien',
      'Prof. P. C. Mahalanobis',
      'Dr. M. S. Swaminathan',
      'Dr. Amartya Sen'
    ],
    correctIndex: 2,
    explanation: 'Dr. M.S. Swaminathan adapted Norman Borlaug\'s Mexican dwarf wheat varieties (Lerma Rojo, Sonora 64) at IARI New Delhi, kicking off the Green Revolution in 1965-66.',
    hints: [
      'Known as the father of the Green Revolution in India.',
      'He led research at the Indian Agricultural Research Institute.',
      'Dr. M.S. Swaminathan.'
    ],
  },
  // 7. Standard Application - c9_econ_029 (NFSA Food Subsidy Math)
  {
    id: 'ch_07_fci_subsidy_saving',
    nodeId: NODE_C9_ECON_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A migrant family of 4 in Mumbai is entitled to 5 kg rice per person/month under NFSA at ₹3/kg. Market price is ₹43/kg. How much does this family save on rice each month (in ₹)?',
    correctAnswer: 800,
    tolerance: 0,
    unit: '₹',
    explanation: 'Total rice = 4 × 5 = 20 kg. Market cost = 20 × ₹43 = ₹860. NFSA cost = 20 × ₹3 = ₹60. Monthly saving = 860 - 60 = ₹800.',
    hints: [
      'Find total monthly entitlement: 4 persons × 5 kg.',
      'Calculate difference per kg: ₹43 - ₹3 = ₹40/kg.',
      '20 kg × ₹40 saving/kg = ₹800.'
    ],
  },
  // 8. Advanced Evaluation - c9_econ_030 (Cottage vs Small-scale)
  {
    id: 'ch_08_cottage_vs_small',
    nodeId: NODE_C9_ECON_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A handloom artisan in Varanasi weaves silk sarees at home with his family using wooden looms. In Ludhiana, a workshop has 25 hired workers using electric sewing machines. How are they classified?',
    options: [
      'Both are Large-scale industries because textile exports are large',
      'Varanasi is Cottage Industry (household + family labour + traditional tools); Ludhiana is Small-Scale Industry (organised workshop + hired labour + power machinery)',
      'Varanasi is Small-Scale and Ludhiana is Cottage',
      'Both are informal illegal activities under the Factories Act'
    ],
    correctIndex: 1,
    explanation: 'Cottage industries are household-based using family labour and traditional tools. Small-scale industries operate in organised premises with power-driven machinery and hired labour.',
    hints: [
      'Look at who does the work: family members vs hired workers.',
      'Look at power: traditional manual loom vs power-driven machines.',
      'Home-based family work = Cottage; Workshop with hired labour = Small-Scale.'
    ],
    misconceptionIndex: 0,
  },
  // 9. Standard Construct - c9_econ_021 (Opportunity Cost Formula / Sentence)
  {
    id: 'ch_09_opp_cost_construct',
    nodeId: NODE_C9_ECON_021,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the precise economic definition of Opportunity Cost using the tiles below.',
    availableParts: ['Opportunity cost', 'is the value of', 'the next-best alternative', 'foregone when making', 'a choice.'],
    targetState: 'Opportunity cost is the value of the next-best alternative foregone when making a choice.',
    validationHint: 'Arrange words into the standard economic definition of Opportunity Cost.',
    explanation: 'Opportunity Cost is defined as the value of the next-best alternative foregone whenever a choice is made under scarcity.',
    hints: [
      'Start with the term "Opportunity cost".',
      'It represents what you gave up: "the next-best alternative".',
      '"Opportunity cost is the value of the next-best alternative foregone when making a choice."'
    ],
  },
  // 10. Foundation Classify - c9_econ_024 (For Whom to Produce)
  {
    id: 'ch_10_for_whom_pds',
    nodeId: NODE_C9_ECON_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which central economic question is directly addressed when the Indian government provides food grains at ₹2-3/kg under the Public Distribution System (PDS)?',
    options: [
      'What to Produce?',
      'How to Produce?',
      'For Whom to Produce?',
      'Where to Produce?'
    ],
    correctIndex: 2,
    explanation: 'PDS directly targets distribution of essential goods to low-income vulnerable groups, resolving the "For Whom to Produce?" question on the basis of need rather than purchasing power.',
    hints: [
      'Does this decide the machine type (How) or who receives the food (For Whom)?',
      'It ensures vulnerable populations get food regardless of market wealth.',
      '"For Whom to Produce?"'
    ],
  },
  // 11. Advanced Analysis - c9_econ_028 (Green Revolution Lodging)
  {
    id: 'ch_11_biological_mechanism',
    nodeId: NODE_C9_ECON_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did traditional Indian tall wheat fail to deliver high yields when given heavy chemical fertilisers, whereas Norman Borlaug\'s semi-dwarf varieties succeeded?',
    options: [
      'Tall wheat was genetically poisoned by chemical nitrogen',
      'Tall wheat grew excessively tall, became top-heavy, and suffered lodging (falling over), whereas dwarf varieties channelled nutrients into the grain head without lodging',
      'Traditional wheat could only absorb water from clouds, not canals',
      'Dwarf wheat required zero water and zero soil nutrients'
    ],
    correctIndex: 1,
    explanation: 'Traditional tall wheat became top-heavy and lodged (toppled), rotting in the field. Semi-dwarf varieties possessed stiff, short stems that supported heavy grain heads without falling.',
    hints: [
      'Think about plant height and top-heaviness.',
      'The term is "lodging" — falling over in the wind/rain.',
      'Dwarf stems stay upright, allowing extra nutrients to become heavy grain.'
    ],
  },
  // 12. Standard Application - c9_econ_027 (Soil Health Card)
  {
    id: 'ch_12_soil_card_app',
    nodeId: NODE_C9_ECON_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Punjab farmer previously dumped 150 kg/acre of NPK uniformly. His Soil Health Card reveals excess phosphorus but low nitrogen. What is the most efficient, rational action?',
    options: [
      'Double the phosphorus to saturate the soil completely',
      'Apply targeted nitrogen (urea) while reducing phosphorus, saving money and preventing soil toxicity',
      'Stop farming and burn all crop stubble',
      'Switch entirely to diesel flood irrigation'
    ],
    correctIndex: 1,
    explanation: 'Soil Health Cards promote balanced nutrient management, avoiding waste of already abundant nutrients and preventing environmental runoff.',
    hints: [
      'Why waste money adding what the soil already has in excess?',
      'Target the nutrient deficit (nitrogen) and cut back on phosphorus.',
      'Apply targeted nitrogen while reducing excess phosphorus.'
    ],
  },
  // 13. Foundation Recall - c9_econ_029 (FCI Buffer Norms)
  {
    id: 'ch_13_fci_three_functions',
    nodeId: NODE_C9_ECON_029,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the three core statutory functions of the Food Corporation of India (established under the Food Corporations Act 1964)?',
    options: [
      'Taxation, gold auditing, and export licensing',
      'Procurement (at MSP), Storage (buffer stock), and Distribution (through PDS)',
      'Seed breeding, pesticide spraying, and canal digging',
      'Stock market trading, currency printing, and bank regulation'
    ],
    correctIndex: 1,
    explanation: 'FCI procures food grains from farmers at Minimum Support Price (MSP), stores buffer stocks in godowns, and releases grains to States for PDS distribution.',
    hints: [
      'Think of the farm-to-plate journey of PDS wheat.',
      'FCI buys, stores, and supplies ration shops.',
      'Procurement, Storage, and Distribution.'
    ],
  },
  // 14. Standard Analysis - c9_econ_023 (Second Five Year Plan Mahalanobis)
  {
    id: 'ch_14_mahalanobis_what',
    nodeId: NODE_C9_ECON_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'India\'s Second Five-Year Plan (1956, Mahalanobis Model) prioritised building public steel plants (Bhilai, Rourkela, Durgapur). Which central economic question and choice did this reflect?',
    options: [
      '"How to Produce?" — by choosing manual stone cutting',
      '"What to Produce?" — prioritizing Capital Goods (heavy industry) over immediate Consumer Goods to build future capacity',
      '"For Whom to Produce?" — by giving cars only to civil servants',
      '"Where to Produce?" — by moving all factories to coastal ports'
    ],
    correctIndex: 1,
    explanation: 'This was a classic "What to produce?" decision: choosing heavy capital goods (steel, machinery) at the opportunity cost of fewer immediate consumer goods, aiming for long-term self-reliance.',
    hints: [
      'Steel is a Capital Good used to make other machines.',
      'It decides WHICH goods the economy manufactures.',
      'What to Produce — Capital goods over consumer goods.'
    ],
  },
  // 15. Advanced Creativity / Policy - c9_econ_030 (MSME Significance)
  {
    id: 'ch_15_msme_significance',
    nodeId: NODE_C9_ECON_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does the Government of India heavily promote Cottage and Small-Scale industries (MSMEs) alongside mega-corporations like Tata Steel or Reliance?',
    options: [
      'Because small units are illegal and easier to control',
      'They are labour-intensive (create maximum jobs per rupee of capital), disperse income equitably, and promote balanced regional development',
      'Mega-corporations refused to pay GST taxes',
      'Small enterprises produce 100% of India\'s fighter jets and submarines'
    ],
    correctIndex: 1,
    explanation: 'MSMEs employ over 11 crore people and generate higher employment per unit of capital than large automated plants, ensuring rural income dispersal and regional balance.',
    hints: [
      'India has abundant labour and scarce capital.',
      'Small workshops can be set up in rural/semi-urban areas across all states.',
      'High employment per rupee of capital + regional equity.'
    ],
    misconceptionIndex: 2,
  },
  // 16. Standard Numeric - c9_econ_026 (Marginal Landholding)
  {
    id: 'ch_16_marginal_holding_size',
    nodeId: NODE_C9_ECON_026,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'According to the Agriculture Census 2015-16, what is the average size of a marginal landholding in India in hectares (roughly the size of a football field)?',
    correctAnswer: 0.38,
    tolerance: 0.05,
    unit: 'hectare',
    explanation: 'Marginal holdings (under 1 hectare) average just 0.38 hectare across India, making mechanisation and private tubewell investments economically difficult.',
    hints: [
      'It is less than half a hectare.',
      'Exact national average is between 0.35 and 0.40.',
      '0.38 hectare.'
    ],
  },
  // 17. Advanced Evaluation - c9_econ_029 (Self-Sufficiency vs Food Security)
  {
    id: 'ch_17_sufficiency_vs_security',
    nodeId: NODE_C9_ECON_029,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India produces over 330 MT of food grains (self-sufficient) yet 35.5% of children under 5 are stunted (NFHS-5). Why does food self-sufficiency NOT guarantee food security?',
    options: [
      'Because children refuse to eat wheat and rice',
      'Self-sufficiency is aggregate national production (availability), while Food Security requires individual accessibility, affordability, and nutritional absorption',
      'Because all harvested grains are instantly exported to Europe',
      'Because food security is measured only in terms of milk production'
    ],
    correctIndex: 1,
    explanation: 'Self-sufficiency means enough grain is produced in aggregate. Food security requires that every citizen has the purchasing power (affordability) and physical access to nutritious food.',
    hints: [
      'Aggregate supply vs individual entitlement and purchasing power.',
      'Food can rot in godowns while poor families lack the money to buy it.',
      'Availability is necessary, but accessibility and affordability are also required.'
    ],
    misconceptionIndex: 0,
  },
  // 18. Foundation Classify - c9_econ_022 (Allocative vs Productive Efficiency)
  {
    id: 'ch_18_allocative_efficiency',
    nodeId: NODE_C9_ECON_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Pradhan Mantri Ujjwala Yojana replaced smoky biomass cooking with clean LPG cylinders, cutting indoor respiratory diseases. Which form of efficiency did this primarily improve?',
    options: [
      'Productive Efficiency (mining more coal per hour)',
      'Allocative Efficiency (directing energy resources to uses that yield higher societal health and welfare)',
      'Deflationary Efficiency',
      'Monetary Scarcity'
    ],
    correctIndex: 1,
    explanation: 'Allocative efficiency occurs when resources are allocated to produce the specific bundle of goods that maximises human welfare and health.',
    hints: [
      'It is about producing what society genuinely needs for better health.',
      'Directing resources toward cleaner, welfare-enhancing fuels is allocative.',
      'Allocative Efficiency.'
    ],
  },
  // 19. Standard Application - c9_econ_023 (Labour vs Capital Intensity)
  {
    id: 'ch_19_how_to_produce_mnrega',
    nodeId: NODE_C9_ECON_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'MGNREGA builds rural water bunds and roads using manual labour rather than bulldozers. Maruti Suzuki uses robotic arms in Manesar. Why are both considered economically rational?',
    options: [
      'Maruti Suzuki broke the law; MGNREGA followed the law',
      'Technique depends on objective: MGNREGA maximises rural livelihood/employment with abundant labour; Maruti maximises precision and speed with capital',
      'Bulldozers are banned in all rural Indian districts',
      'Robots are always cheaper than rural workers in India'
    ],
    correctIndex: 1,
    explanation: '"How to produce" depends on factor availability and goals. Where labour is abundant and poverty high, labour-intensive methods generate jobs; for precision manufacturing, capital intensity prevails.',
    hints: [
      'Consider factor endowments: India has a large workforce seeking jobs.',
      'Different sectors prioritise different outcomes (jobs vs micrometre precision).',
      'Both align with their specific objectives and factor supplies.'
    ],
  },
  // 20. Advanced Drag-Sort - c9_econ_030 (Industrial Scale by MSME Ceiling)
  {
    id: 'ch_20_msme_sort_scale',
    nodeId: NODE_C9_ECON_030,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 types of Indian industry in ascending order of capital investment (from lowest to highest).',
    sortItems: [
      'Cottage Industry (Khadi / Handloom at home — a few thousand to lakh rupees)',
      'Small-Scale / Micro Enterprise (Workshop with investment up to ₹1 Cr - ₹10 Cr)',
      'Medium Enterprise (Factory with plant/machinery investment up to ₹50 Cr)',
      'Large-Scale Industry (Steel plant / Refinery — hundreds to thousands of crores)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'From smallest to largest: Cottage (household scale) → Small (up to ₹10 Cr) → Medium (up to ₹50 Cr) → Large-scale (thousands of crores).',
    hints: [
      'Start with family weavers in their homes.',
      'Next is small workshop with 20 machines.',
      'Then medium industrial unit, ending with massive steel plants.'
    ],
  },
  // 21. Standard Application - c9_econ_021 (Cauvery Water Dispute Allocation)
  {
    id: 'ch_21_cauvery_water_scarcity',
    nodeId: NODE_C9_ECON_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the Cauvery Water Management Authority have to be established to divide river water between Karnataka and Tamil Nadu?',
    options: [
      'Because water in the Cauvery river has only one single use',
      'Because river water is a scarce resource with competing alternative uses (irrigation in Mandya vs delta rice in Thanjavur vs drinking in Bengaluru)',
      'Because Karnataka wanted to sell water to the USA',
      'Because Tamil Nadu had zero rainfall for 100 consecutive years'
    ],
    correctIndex: 1,
    explanation: 'River water is limited and cannot satisfy all demands simultaneously (alternative uses). When resources are scarce and rivalrous, statutory allocation mechanisms become necessary.',
    hints: [
      'Can the same cubic metre of water be used twice at the same time?',
      'Alternative uses: Bengaluru drinking water vs farming in both states.',
      'Limited resource + competing alternative uses = forced allocation decision.'
    ],
  },
  // 22. Advanced Creativity / Construct - c9_econ_027 (Agricultural Transformation Package)
  {
    id: 'ch_22_agri_package_construct',
    nodeId: NODE_C9_ECON_027,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build the complete 4-pillar Green Revolution Technology Package using the component tiles below.',
    availableParts: ['HYV Dwarf Seeds', '+ Assured Irrigation', '+ Chemical Fertilisers & Pesticides', '+ Remunerative MSP Support'],
    targetState: 'HYV Dwarf Seeds + Assured Irrigation + Chemical Fertilisers & Pesticides + Remunerative MSP Support',
    validationHint: 'Combine Seeds, Water, Nutrients, and Price Support.',
    explanation: 'The Green Revolution succeeded because it was a coordinated package of HYV seeds, assured irrigation, fertilisers/plant protection, and price incentives through MSP.',
    hints: [
      'Start with the biological engine: HYV Dwarf Seeds.',
      'Add the water requirement: Assured Irrigation.',
      'HYV Dwarf Seeds + Assured Irrigation + Chemical Fertilisers & Pesticides + Remunerative MSP Support'
    ],
  }
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
  nodeId: NODE_C9_ECON_021,
  title: 'Basic Economic Problems, Agriculture & Industry',
  definition:
    'The basic economic problem arises from unlimited human wants confronting limited resources with alternative uses, requiring efficient resource allocation, central decisions (What, How, For Whom to Produce), agricultural modernization (HYV, irrigation, FCI food security), and balanced industrial development (Cottage to Large-Scale).',
  eli5:
    'Imagine having ₹100 at a carnival. You want games, rides, ice cream, and toys. You cannot buy all of them, and that ₹100 can only be spent once. You must choose the best combination. Countries face the exact same problem with their land, water, workers, and budget!',
  misconceptions: [
    {
      misconception: 'The basic economic problem means that people or countries are poor.',
      correction: 'Scarcity is universal! Even billionaires like Mukesh Ambani and wealthy nations like Norway face limited time, budget limits, and competing uses for resources.'
    },
    {
      misconception: 'Scarcity alone creates the economic problem without alternative uses.',
      correction: 'If a resource only had one single purpose, there would be no allocation choice. Scarcity PLUS alternative uses forces economic choice.'
    },
    {
      misconception: 'The Green Revolution was just giving farmers better seeds.',
      correction: 'It was a complete technological package: semi-dwarf HYV seeds + chemical fertilisers + assured irrigation + MSP price protection. Seeds alone gave no yield boost.'
    },
    {
      misconception: 'Food self-sufficiency and food security are identical.',
      correction: 'Self-sufficiency is national aggregate production. Food security is individual access, affordability, and nutritional absorption.'
    },
    {
      misconception: 'Cottage industries and Small-Scale industries are the same thing.',
      correction: 'Cottage industries use family labour and traditional tools at home; small-scale industries use hired workers and power-driven machines in organized workshops.'
    }
  ],
  diagnosticQuestions: [
    {
      question: 'What is the root cause of all economic problems?',
      options: ['Money circulation', 'Scarcity of resources with alternative uses', 'Corrupt traders', 'Foreign exchange rates'],
      correctIndex: 1
    },
    {
      question: 'Which is an example of productive efficiency?',
      options: ['Using 1000 L to produce 50 kg crop', 'Using drip irrigation to produce 200 kg from 500 L instead of 1000 L', 'Leaving land uncultivated for 10 years', 'Importing wheat from America'],
      correctIndex: 1
    },
    {
      question: 'India\'s Second Five-Year Plan prioritized which sector?',
      options: ['Consumer cosmetics', 'Heavy capital goods (Steel plants)', 'Handicraft toys only', 'Private foreign airlines'],
      correctIndex: 1
    },
    {
      question: 'Under NFSA 2013, what is the subsidised price of rice per kg?',
      options: ['₹35/kg', '₹3/kg', '₹15/kg', 'Free only for billionaires'],
      correctIndex: 1
    },
    {
      question: 'What percentage of operational holdings in India are marginal or small?',
      options: ['12%', '45%', '86.08%', '99.9%'],
      correctIndex: 2
    },
    {
      question: 'What did Norman Borlaug\'s dwarf wheat prevent?',
      options: ['Plant lodging (falling over due to heavy grain heads)', 'Photosynthesis', 'Need for water', 'Root formation'],
      correctIndex: 0
    },
    {
      question: 'Which body maintains national buffer stocks and procures grain at MSP?',
      options: ['Reserve Bank of India', 'Food Corporation of India (FCI)', 'ISRO', 'NITI Aayog'],
      correctIndex: 1
    },
    {
      question: 'What distinguishes a Cottage Industry from a Small-Scale Industry?',
      options: ['Cottage uses family labour at home; Small-scale uses hired labour & power machinery in workshops', 'Cottage makes only steel', 'Small-scale is strictly owned by the President', 'Cottage uses heavy robotics'],
      correctIndex: 0
    }
  ],
  masteryCriteria:
    'Student understands Scarcity, Opportunity Cost, Productive/Allocative Efficiency, Central Economic Problems, Agricultural productivity gap, Green Revolution package, Food Security vs Self-Sufficiency, and MSME industrial taxonomy.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Scarcity & The Production Possibility Frontier (PPF)',
    instruction: 'Drag the State Budget slider between Capital Goods (Steel) and Consumer Goods (Food Grain). Observe the opportunity cost trade-off.',
    interactionType: 'slider-ppf',
    nodeId: NODE_C9_ECON_021,
  },
  {
    title: '2. Productive Efficiency: Drip vs Flood Irrigation',
    instruction: 'Toggle between Flood and Drip irrigation, and move the water supply slider to see tomato yield and water saved.',
    interactionType: 'efficiency-lab',
    nodeId: NODE_C9_ECON_022,
  },
  {
    title: '3. The Three Central Problems Matrix',
    instruction: 'Select each of the 3 Central Questions to inspect how Mixed Economies (like India) balance Market efficiency and Public welfare.',
    interactionType: 'central-matrix',
    nodeId: NODE_C9_ECON_023,
  },
  {
    title: '4. Indian Agriculture: The 45% vs 18% Productivity Gap',
    instruction: 'Interact with the Sector Output vs Employment chart to see why Indian agriculture requires technological transformation.',
    interactionType: 'agri-gap',
    nodeId: NODE_C9_ECON_025,
  },
  {
    title: '5. Industry Spectrum: From Khadi to Tata Steel',
    instruction: 'Click through the 4 types of industries (Cottage, Small, Medium, Large) to examine Capital, Labour, and Regional Balance metrics.',
    interactionType: 'industry-spectrum',
    nodeId: NODE_C9_ECON_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Punyabhumi allocates ₹8,000 Cr of its ₹10,000 Cr budget to heavy steel plants, what happens to immediate public food rations?',
    options: [
      'Food rations increase automatically because steel feeds people',
      'Food rations must decrease because budget resources are finite and diverted to steel (Opportunity Cost)',
      'Nothing changes because money is unlimited',
      'All farmers double their crop yields overnight'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the budget towards Capital Goods on the PPF simulation to observe the trade-off.',
    nodeId: NODE_C9_ECON_021,
  },
  {
    question:
      'Predict: If a farmer plants HYV dwarf seeds in rain-fed soil with ZERO irrigation and ZERO fertiliser, what will happen to yield?',
    options: [
      'Yield will quadruple because the seed has magical properties',
      'Yield will be equal to or lower than traditional seeds, because HYV requires the complete package of water and nutrients',
      'The seeds will turn into gold',
      'The soil will immediately flood itself'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the irrigation and fertiliser toggles in the Agriculture Lab to verify.',
    nodeId: NODE_C9_ECON_028,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the curve when you increase Steel production on the PPF diagram?',
    observableOptions: [
      'Food grain production declines along the frontier, proving opportunity cost',
      'Both food and steel increase to infinity',
      'The curve turns into a straight vertical bar',
      'No relationship exists between the two variables'
    ],
    correctIndex: 0,
    nodeId: NODE_C9_ECON_021,
  },
  {
    question: 'What pattern do you observe regarding MSMEs and Employment per ₹1 Crore of capital invested?',
    observableOptions: [
      'Cottage and Small industries generate vastly more jobs per crore than capital-intensive mega steel plants',
      'Mega steel refineries hire more workers per rupee than small garment shops',
      'All industries employ zero workers due to robots',
      'Capital investment has no impact on workforce'
    ],
    correctIndex: 0,
    nodeId: NODE_C9_ECON_030,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Punyabhumi District Economic Masterplan',
  description:
    'Select a district in your state (or imagine District Vidarbha / Mandya). Formulate a 4-point economic masterplan balancing Agriculture (PMKSY drip, KCC credit, Soil Health Cards) and Industry (supporting cottage handloom clusters while building a small-scale agro-processing hub).',
  steps: [
    'Identify whether your district is predominantly rain-fed or irrigated',
    'Calculate the food grain required vs FCI buffer availability for the local population',
    'Propose one Custom Hiring Centre (CHC) for farm tractors to solve land fragmentation',
    'Classify 2 local industrial units as Cottage or Small-Scale under the MSME Act 2020'
  ],
};

function C9_EconomicsBasicEconomicProblemSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['economics'] || {
    name: 'Economics',
    emoji: '📈',
    color: 'emerald',
  };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant pattern state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Interactive Simulation Controls (Exploration & Sandbox)
  const [capitalVsConsumerRatio, setCapitalVsConsumerRatio] = useState(50); // 0 (100% food) to 100 (100% steel)
  const [irrigationType, setIrrigationType] = useState<'flood' | 'drip'>('drip');
  const [waterLiters, setWaterLiters] = useState(600);
  const [fertilizerDose, setFertilizerDose] = useState(100);
  const [hasHYVSeed, setHasHYVSeed] = useState(true);
  const [hasIrrigation, setHasIrrigation] = useState(true);
  const [hasFertiliser, setHasFertiliser] = useState(true);
  const [hasMSPGuarantee, setHasMSPGuarantee] = useState(true);
  const [selectedCentralProblem, setSelectedCentralProblem] = useState<'what' | 'how' | 'whom'>('what');
  const [selectedIndustryType, setSelectedIndustryType] = useState<'cottage' | 'small' | 'medium' | 'large'>('small');

  // Difficulty & Mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag-and-drop / Sort / Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Visual feedback for wrong answers: Shake & Flash
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Click-to-reveal progressive disclosure
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());

  // Auto-hint Timer
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY VIA BKT ───
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

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CALCULATIONS ───
  // 1. PPF Calculations: Steel (Capital) vs Food (Consumer)
  const ppfOutputs = useMemo(() => {
    const steelMax = 100; // Lakh tonnes
    const foodMax = 300; // Lakh tonnes
    const steelShare = capitalVsConsumerRatio / 100;
    // PPF curve equation: (Steel/100)^2 + (Food/300)^2 <= 1
    const steelProduced = Math.round(steelShare * steelMax);
    const foodProduced = Math.round(foodMax * Math.sqrt(Math.max(0, 1 - Math.pow(steelShare, 2))));
    const capitalCostCr = Math.round((capitalVsConsumerRatio / 100) * 10000);
    const consumerCostCr = 10000 - capitalCostCr;
    return { steelProduced, foodProduced, capitalCostCr, consumerCostCr };
  }, [capitalVsConsumerRatio]);

  // 2. Irrigation Tomato Yield & Efficiency
  const irrigationResult = useMemo(() => {
    const ratio = irrigationType === 'drip' ? 0.4 : 0.2; // kg per litre
    const yieldKg = Math.round(waterLiters * ratio);
    const waterSavedPercent = irrigationType === 'drip' ? 50 : 0;
    return { ratio, yieldKg, waterSavedPercent };
  }, [irrigationType, waterLiters]);

  // 3. Green Revolution Simulation Output
  const greenRevYield = useMemo(() => {
    if (!hasHYVSeed) return 900; // Traditional baseline
    let base = 1200;
    if (hasIrrigation) base += 1000;
    if (hasFertiliser) base += 800;
    if (hasMSPGuarantee) base += 500;
    return base; // can reach up to 3500 kg/ha
  }, [hasHYVSeed, hasIrrigation, hasFertiliser, hasMSPGuarantee]);

  // ─── CANVAS 2D ANIMATION ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pulsating economy flow pulse
      const width = canvas.width;
      const height = canvas.height;

      // Draw background track
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw circular flow particles
      const particleX = (frame * 2) % width;
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#10b981');
      gradient.addColorStop(0.5, '#3b82f6');
      gradient.addColorStop(1, '#8b5cf6');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particleX, height / 2, 6, 0, Math.PI * 2);
      ctx.fill();

      // Flow label
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Punyabhumi Resource Flow: ₹${ppfOutputs.capitalCostCr}Cr Cap / ₹${ppfOutputs.consumerCostCr}Cr Cons`, 16, height / 2 + 4);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [ppfOutputs]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── HANDLERS FOR FLOW & DISCOVERY ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Spot on! Scarcity forces economic choice.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Economic Discovery Labs. Let us learn by interacting.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with resource variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    setHintCount(0);
    setAnswerRevealed(false);
    setShowExplanation(false);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Prove your economic policy mastery!');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now test your prediction on the interactive slider below!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Sharp observation! The graph visualizes opportunity cost.' : 'Take another close look at how the curves shift.');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Magnificent work! You completed the simulation with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── ANSWER SUBMISSION HANDLER ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        audioManager.play('drop-correct');
        setShowConfetti(true);
        setShowExplanation(true);
        speechManager.speak('Excellent analysis! That is precisely correct.');

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('error');
        audioManager.play('drop-wrong');
        setErrors(e => e + 1);

        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete economic rationale step-by-step.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length > 0 ? prev : (challenge.sortItems?.map((_, i) => i) || []);
      const arr = [...initial];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Pie chart data for GVA share (Economic Survey 2022-23)
  const gvaPieData = useMemo(() => [
    { name: 'Tertiary (Services)', value: 54, color: '#3b82f6' },
    { name: 'Secondary (Industry)', value: 28, color: '#8b5cf6' },
    { name: 'Primary (Agriculture & Allied)', value: 18, color: '#10b981' },
  ], []);

  // Bar chart data for Primary Workforce vs GVA
  const agriComparisonData = useMemo(() => [
    { metric: 'Workforce Share (%)', Agriculture: 45.5, IndustryServices: 54.5 },
    { metric: 'GVA Output Share (%)', Agriculture: 18.3, IndustryServices: 81.7 },
  ], []);

  // SRS interval text based on error count
  const srsIntervalText = useMemo(() => {
    if (errors === 0) return 'review in 7 days';
    if (errors <= 3) return 'review in 3 days';
    return 'review in 1 day';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/60 border border-emerald-800 rounded-2xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              ICSE Class 9 Commercial Studies & Economics
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${
              difficulty === 'foundation'
                ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
                : difficulty === 'standard'
                ? 'bg-blue-900/40 border-blue-500 text-blue-300'
                : 'bg-purple-900/40 border-purple-500 text-purple-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300">
            Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/50 shadow-inner">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-1">
              <span>🏛️</span> {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-sm font-bold uppercase text-emerald-400 mb-2">Curiosity Diagnostic Check</h2>
            <p className="text-base md:text-lg text-white font-semibold mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800">
                <p
                  className={`text-sm mb-4 font-medium ${
                    discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Spot on! You intuitively understand Scarcity and Opportunity Cost.'
                    : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2"
                >
                  Enter Interactive Discovery Labs 🚀
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <canvas ref={canvasRef} width={600} height={32} className="w-full rounded-lg border border-slate-800" />

          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <h2 className="text-lg md:text-xl font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-sm text-amber-300 font-medium bg-amber-950/30 p-3 rounded-lg border border-amber-900/50">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* SLIDE 0: PPF & SCARCITY LAB */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Predict Then Check */}
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-xl border border-indigo-800/60">
                      <p className="text-sm font-semibold text-indigo-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
                          <span>Focus: Consumer Goods (Food Rations)</span>
                          <span>Focus: Capital Goods (Bhilai Steel)</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={capitalVsConsumerRatio}
                          onChange={e => {
                            setCapitalVsConsumerRatio(Number(e.target.value));
                            audioManager.play('count');
                            if (!predictionVerified) setPredictionVerified(true);
                          }}
                          aria-label="PPF Allocation Slider"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                        <div className="mt-4 space-y-2 text-xs">
                          <div className="flex justify-between p-2 bg-slate-800 rounded">
                            <span className="text-slate-300">Capital Goods Budget:</span>
                            <span className="text-purple-400 font-bold">₹{ppfOutputs.capitalCostCr} Cr</span>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-800 rounded">
                            <span className="text-slate-300">Consumer Food Budget:</span>
                            <span className="text-emerald-400 font-bold">₹{ppfOutputs.consumerCostCr} Cr</span>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-800 rounded">
                            <span className="text-slate-300">Steel Production:</span>
                            <span className="text-purple-300 font-bold">{ppfOutputs.steelProduced} Lakh Tonnes</span>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-800 rounded">
                            <span className="text-slate-300">Food Grain Production:</span>
                            <span className="text-emerald-300 font-bold">{ppfOutputs.foodProduced} Lakh Tonnes</span>
                          </div>
                        </div>
                      </div>

                      {/* Live SVG Production Possibility Frontier */}
                      <div className="flex flex-col items-center">
                        <svg viewBox="0 0 300 200" className="w-full max-w-xs bg-slate-900 rounded-lg border border-slate-800">
                          {/* Grid & Axes */}
                          <line x1="40" y1="20" x2="40" y2="160" stroke="#475569" strokeWidth="2" />
                          <line x1="40" y1="160" x2="280" y2="160" stroke="#475569" strokeWidth="2" />
                          <text x="35" y="15" fill="#a855f7" fontSize="9" textAnchor="start">Steel (Capital)</text>
                          <text x="270" y="175" fill="#10b981" fontSize="9" textAnchor="end">Food (Consumer)</text>

                          {/* PPF Arc */}
                          <path
                            d="M 40 30 Q 180 35 270 160"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="3"
                            strokeDasharray="4 2"
                          />

                          {/* Interactive Point on Curve */}
                          {(() => {
                            const svgX = 40 + (ppfOutputs.foodProduced / 300) * 230;
                            const svgY = 160 - (ppfOutputs.steelProduced / 100) * 130;
                            return (
                              <g>
                                <circle cx={svgX} cy={svgY} r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                                <text x={svgX + 8} y={svgY - 8} fill="#ffffff" fontSize="9" fontWeight="bold">
                                  Current Allocation
                                </text>
                              </g>
                            );
                          })()}
                        </svg>
                        <span className="text-[11px] text-slate-400 mt-1">Opportunity Cost Frontier</span>
                      </div>
                    </div>
                  )}

                  {/* Observation Question */}
                  {predictionVerified && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-emerald-800/60">
                      <p className="text-xs font-semibold text-emerald-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2 rounded text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 1: PRODUCTIVE EFFICIENCY LAB (Drip vs Flood) */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="space-y-3">
                    <label className="text-xs text-slate-400 font-bold block">Select Irrigation Method:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIrrigationType('flood');
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold border ${
                          irrigationType === 'flood'
                            ? 'bg-blue-950 border-blue-500 text-blue-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Flood Irrigation (0.20 kg/L)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIrrigationType('drip');
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-lg text-xs font-bold border ${
                          irrigationType === 'drip'
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Drip Irrigation (0.40 kg/L) 💧
                      </motion.button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Water Applied (Litres):</span>
                        <span className="text-white font-bold">{waterLiters} L</span>
                      </div>
                      <input
                        type="range"
                        min={200}
                        max={1000}
                        step={50}
                        value={waterLiters}
                        onChange={e => {
                          setWaterLiters(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Water Liters Slider"
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1.5 border border-slate-800">
                      <p className="text-slate-300">
                        Tomato Yield Harvested:{' '}
                        <span className="text-emerald-400 font-extrabold text-sm">{irrigationResult.yieldKg} kg</span>
                      </p>
                      <p className="text-slate-400">
                        Output ÷ Input Ratio:{' '}
                        <span className="text-blue-300 font-bold">{irrigationResult.ratio} kg/L</span>
                      </p>
                      <p className="text-slate-400">
                        PMKSY "Per Drop More Crop" Water Saved:{' '}
                        <span className="text-teal-400 font-bold">{irrigationResult.waterSavedPercent}%</span>
                      </p>
                    </div>
                  </div>

                  {/* Visual SVG Plant root representation */}
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-lg border border-slate-800">
                    <svg viewBox="0 0 200 160" className="w-48 h-36">
                      {/* Soil */}
                      <rect x="10" y="100" width="180" height="50" rx="4" fill="#334155" />
                      {/* Plant Stem */}
                      <line x1="100" y1="100" x2="100" y2="40" stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
                      {/* Leaves */}
                      <ellipse cx="85" cy="55" rx="15" ry="8" fill="#22c55e" transform="rotate(-30 85 55)" />
                      <ellipse cx="115" cy="50" rx="15" ry="8" fill="#22c55e" transform="rotate(30 115 50)" />
                      {/* Tomatoes */}
                      <circle cx="85" cy="70" r="8" fill="#ef4444" />
                      <circle cx="118" cy="65" r="9" fill="#ef4444" />
                      {/* Irrigation visual */}
                      {irrigationType === 'drip' ? (
                        <g>
                          <line x1="20" y1="96" x2="180" y2="96" stroke="#0ea5e9" strokeWidth="4" />
                          <circle cx="100" cy="104" r="3" fill="#38bdf8" />
                          <circle cx="100" cy="116" r="2" fill="#38bdf8" />
                          <text x="100" y="140" textAnchor="middle" fill="#38bdf8" fontSize="8">
                            Drip to roots (Zero Waste)
                          </text>
                        </g>
                      ) : (
                        <g>
                          <rect x="20" y="92" width="160" height="12" fill="#0284c7" opacity="0.7" />
                          <text x="100" y="140" textAnchor="middle" fill="#fb7185" fontSize="8">
                            Flood runoff & evaporation
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 2: CENTRAL PROBLEMS MATRIX */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'what', label: '1. What to Produce?', icon: '🏗️' },
                      { id: 'how', label: '2. How to Produce?', icon: '⚙️' },
                      { id: 'whom', label: '3. For Whom to Produce?', icon: '🤝' },
                    ].map(tab => (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedCentralProblem(tab.id as 'what' | 'how' | 'whom');
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                          selectedCentralProblem === tab.id
                            ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        <div>{tab.icon}</div>
                        <div className="mt-1">{tab.label}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs md:text-sm space-y-2">
                    {selectedCentralProblem === 'what' && (
                      <div>
                        <h4 className="font-bold text-indigo-300">What to Produce & in What Quantities?</h4>
                        <p className="text-slate-300 mt-1">
                          Deciding between <strong>Capital Goods</strong> (Steel, Turbines, Freight Corridors) vs{' '}
                          <strong>Consumer Goods</strong> (Food, Textiles, Phones).
                        </p>
                        <p className="text-slate-400 mt-1">
                          <em>Indian Example:</em> Second Five-Year Plan (1956 Mahalanobis model) prioritised public steel plants (SAIL Bhilai/Rourkela) to build industrial foundations.
                        </p>
                      </div>
                    )}
                    {selectedCentralProblem === 'how' && (
                      <div>
                        <h4 className="font-bold text-indigo-300">How to Produce? (Choice of Technique)</h4>
                        <p className="text-slate-300 mt-1">
                          Deciding between <strong>Labour-Intensive</strong> (abundant Indian workforce, e.g. MGNREGA manual earthwork) vs{' '}
                          <strong>Capital-Intensive</strong> (robotic precision assembly, e.g. Maruti Suzuki Manesar).
                        </p>
                        <p className="text-slate-400 mt-1">
                          <em>Factor Endowment Rule:</em> India uses labour-intensive techniques where employment generation is urgent, and capital-intensive where global precision is required.
                        </p>
                      </div>
                    )}
                    {selectedCentralProblem === 'whom' && (
                      <div>
                        <h4 className="font-bold text-indigo-300">For Whom to Produce? (Distribution Mechanism)</h4>
                        <p className="text-slate-300 mt-1">
                          Market capitalist systems distribute goods by <strong>Purchasing Power</strong>. Socialist systems distribute by <strong>Need</strong>.
                        </p>
                        <p className="text-slate-400 mt-1">
                          <em>India's Mixed Approach:</em> Market distributes luxury consumer items (cars, electronics), while Government redistributes essential staples through NFSA/PDS (rice at ₹3/kg to 81.35 Cr citizens).
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: INDIAN AGRICULTURE 45% VS 18% GAP */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 items-center">
                  <div className="h-48 w-full">
                    <p className="text-xs text-center font-bold text-slate-300 mb-2">Workforce vs Output Mismatch</p>
                    <ResponsiveContainer width="100%" height="90%">
                      <BarChart data={agriComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="metric" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                        <Bar dataKey="Agriculture" fill="#10b981" />
                        <Bar dataKey="IndustryServices" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/60 rounded-lg">
                      <p className="font-bold text-emerald-300">The 5 Structural Agricultural Bottlenecks:</p>
                      <ul className="list-disc list-inside text-slate-300 mt-1 space-y-0.5">
                        <li>Subdivision: 86.08% holdings are marginal/small (avg 0.38 ha)</li>
                        <li>52% net sown area is rain-fed (Monsoon dependence)</li>
                        <li>Informal credit moneylenders (24-36% interest)</li>
                        <li>Traditional bullock tools & low mechanisation</li>
                        <li>Cold storage deficit (4.6-15.9% fruit post-harvest loss)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: INDUSTRY SPECTRUM (MSME TO LARGE) */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: 'cottage', label: 'Cottage' },
                      { id: 'small', label: 'Small-Scale' },
                      { id: 'medium', label: 'Medium' },
                      { id: 'large', label: 'Large-Scale' },
                    ].map(t => (
                      <motion.button
                        key={t.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedIndustryType(t.id as 'cottage' | 'small' | 'medium' | 'large');
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedIndustryType === t.id
                            ? 'bg-purple-950 border-purple-500 text-purple-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {t.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                    {selectedIndustryType === 'cottage' && (
                      <div>
                        <span className="text-purple-300 font-bold uppercase">Cottage Industry (Household based)</span>
                        <p className="text-slate-300 mt-1">
                          <strong>Labour:</strong> Family members | <strong>Tools:</strong> Traditional hand tools / no electric power.
                        </p>
                        <p className="text-slate-400">
                          <em>Examples:</em> Banarasi handloom saree weavers in Varanasi, Khurja pottery, Kerala Coir extraction (KVIC).
                        </p>
                      </div>
                    )}
                    {selectedIndustryType === 'small' && (
                      <div>
                        <span className="text-purple-300 font-bold uppercase">Small-Scale Industry (MSME Act 2020)</span>
                        <p className="text-slate-300 mt-1">
                          <strong>Labour:</strong> Hired workers | <strong>Tools:</strong> Power-driven machines in organised premises. Investment up to ₹10 Cr, Turnover up to ₹50 Cr.
                        </p>
                        <p className="text-slate-400">
                          <em>Examples:</em> Ludhiana garment workshop (25 hired workers), Kanpur leather goods workshop, Moradabad brassware.
                        </p>
                      </div>
                    )}
                    {selectedIndustryType === 'medium' && (
                      <div>
                        <span className="text-purple-300 font-bold uppercase">Medium-Scale Industry</span>
                        <p className="text-slate-300 mt-1">
                          Investment up to ₹50 Cr, Turnover up to ₹250 Cr. Power machinery, regional/export scale.
                        </p>
                        <p className="text-slate-400">
                          <em>Examples:</em> Tiruppur knitwear export factories, Pune auto-component makers for Tata Motors.
                        </p>
                      </div>
                    )}
                    {selectedIndustryType === 'large' && (
                      <div>
                        <span className="text-purple-300 font-bold uppercase">Large-Scale Heavy Industry</span>
                        <p className="text-slate-300 mt-1">
                          Capital of thousands of crores, massive workforce, high economies of scale.
                        </p>
                        <p className="text-slate-400">
                          <em>Examples:</em> Tata Steel Jamshedpur (10 MTPA crude steel), Reliance Jamnagar (1.24 million barrels/day oil refinery).
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE NAVIGATION CONTROLS */}
              <div className="flex justify-between items-center pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-white rounded-lg text-xs font-bold"
                >
                  ← Prev Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Enter Free Sandbox Mode 🧪
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX MODE (No grading pressure) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-teal-800/60 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-teal-300">Free Economic Sandbox & Policy Playground</h3>
              <p className="text-xs text-slate-300 mt-1">
                Freely experiment with Green Revolution parameters, PPF budget allocations, and Irrigation efficiency with zero grading!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40"
            >
              Ready for Graded Challenges! 🎯 →
            </motion.button>
          </div>

          {/* Combined Multi-variable Sandbox */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Box A: Green Revolution Package Builder */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-emerald-400">1. Green Revolution Package Simulation</h4>
              <div className="space-y-2">
                {[
                  { state: hasHYVSeed, setter: setHasHYVSeed, label: 'HYV Semi-Dwarf Seeds (Lerma Rojo / Kalyan Sona)' },
                  { state: hasIrrigation, setter: setHasIrrigation, label: 'Assured Canal / Tubewell Irrigation' },
                  { state: hasFertiliser, setter: setHasFertiliser, label: 'Chemical Fertilisers & Plant Protection' },
                  { state: hasMSPGuarantee, setter: setHasMSPGuarantee, label: 'Minimum Support Price (MSP) Protection' },
                ].map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => {
                      item.setter(!item.state);
                      audioManager.play('tap');
                    }}
                    className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold border flex items-center justify-between ${
                      item.state
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span>{item.state ? '✓ ACTIVE' : '✗ OFF'}</span>
                  </motion.button>
                ))}
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400">Simulated Wheat Yield:</span>
                <div className="text-xl font-black text-emerald-400 mt-1">{greenRevYield} kg / Hectare</div>
                <p className="text-[11px] text-slate-500 mt-1">
                  (Pre-1965 traditional yield was ~900 kg/ha. Full package reaches 3,400+ kg/ha in Punjab!)
                </p>
              </div>
            </div>

            {/* Box B: Macro Economy GVA Sector Visualizer */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-blue-400">2. India Sectoral GVA Share (Economic Survey)</h4>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={gvaPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={55} label>
                      {gvaPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 text-[11px] text-center gap-1">
                <span className="text-emerald-400 font-bold">Primary: 18%</span>
                <span className="text-purple-400 font-bold">Secondary: 28%</span>
                <span className="text-blue-400 font-bold">Tertiary: 54%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-bold uppercase">
                NEP 2020 Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* CHALLENGE CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <div className="flex justify-between items-start gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wide text-emerald-400">
                Question #{currentChallenge + 1}
              </span>
              <span className="text-xs bg-slate-800 px-2.5 py-0.5 rounded text-slate-400 font-medium">
                Type: {challenge.type}
              </span>
            </div>

            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* 1. MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(idx)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                        showExplanation && idx === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1 font-bold">Drag labels into matching boxes:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'box_what', title: 'A. Capital vs Consumer Goods selection' },
                    { id: 'box_how', title: 'B. Labour vs Capital technique' },
                    { id: 'box_whom', title: 'C. Purchasing Power vs PDS entitlement' },
                    { id: 'box_eff', title: 'D. Maximising Output per unit input' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl min-h-[70px] flex flex-col justify-between"
                    >
                      <span className="text-[11px] text-slate-400">{target.title}</span>
                      <div className="text-xs font-extrabold text-emerald-400 mt-1">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-bold block">
                  Drag items or use buttons to arrange in correct logical sequence:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 flex justify-between items-center cursor-grab"
                    >
                      <span>
                        <strong className="text-emerald-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleSortMove(displayIdx, Math.max(0, displayIdx - 1))}
                          className="px-2 py-0.5 bg-slate-700 rounded text-xs hover:bg-slate-600"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() =>
                            handleSortMove(displayIdx, Math.min(challenge.sortItems!.length - 1, displayIdx + 1))
                          }
                          className="px-2 py-0.5 bg-slate-700 rounded text-xs hover:bg-slate-600"
                        >
                          ↓
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-bold">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900 border border-indigo-600 rounded-lg text-xs text-white flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click tiles above to assemble...</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Validate Construction
                  </motion.button>
                  <button
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
                  <span>💡</span> Economic Explanation & Concept Breakdown
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200"
                    >
                      <strong className="text-emerald-400 mr-1.5">{sIdx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap gap-2">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Insight →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Final Mastery Report 🏆'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 rounded-2xl border border-emerald-700/60 text-center space-y-3 shadow-xl">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">Economic Simulation Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Mastery Score: <strong className="text-emerald-400 text-xl">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-indigo-300 font-semibold">
              Assessed Knowledge Level: <span className="uppercase font-bold text-white">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200">
            <span className="font-bold text-emerald-400">Advisor Feedback: </span>
            {errors === 0
              ? 'PERFECT SCORE!'
              : errors <= 3
              ? 'Great work!'
              : errors <= 7
              ? 'Good effort!'
              : 'Do not give up — You WILL get this!'}
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-4 bg-rose-950/30 border border-rose-800/60 rounded-xl space-y-2.5">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Your Targeted Misconception Profile
              </h4>
              {hitMisconceptions.map((idx, i) => {
                const item = misconceptions[idx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Trap: {item.misconception}</p>
                    <p className="text-emerald-300">✓ Economic Truth: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── SPACED REPETITION (SRS) VISIBILITY BOX ─── */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border-2 border-amber-500/60 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <h4 className="font-extrabold text-amber-300 uppercase tracking-wider text-sm">
                    Spaced Repetition Schedule (SM-2 SRS)
                  </h4>
                  <p className="text-[11px] text-slate-400">Personalized memory retention curve</p>
                </div>
              </div>
              <div className="px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded-full font-black text-xs uppercase tracking-wide">
                {srsIntervalText}
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              Based on your mistake rate ({errors} error{errors === 1 ? '' : 's'}), your optimal memory consolidation schedule indicates you should{' '}
              <strong className="text-amber-300 underline font-bold">{srsIntervalText}</strong>.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className={`p-2.5 rounded-xl border text-xs ${errors === 0 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/40' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase">0 Errors</div>
                <div className="font-black text-sm mt-0.5">review in 7 days</div>
              </div>
              <div className={`p-2.5 rounded-xl border text-xs ${errors >= 1 && errors <= 3 ? 'bg-blue-950/80 border-blue-500 text-blue-200 font-bold ring-2 ring-blue-500/40' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase">1–3 Errors</div>
                <div className="font-black text-sm mt-0.5">review in 3 days</div>
              </div>
              <div className={`p-2.5 rounded-xl border text-xs ${errors >= 4 ? 'bg-amber-950/80 border-amber-500 text-amber-200 font-bold ring-2 ring-amber-500/40' : 'bg-slate-950/50 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase">4+ Errors</div>
                <div className="font-black text-sm mt-0.5">review in 1 day</div>
              </div>
            </div>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-5 bg-gradient-to-br from-indigo-950/50 to-slate-900 rounded-2xl border border-indigo-800/60 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase">
              🏛️ {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-4 w-4 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center text-[10px] font-bold">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Set Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_EconomicsBasicEconomicProblemSim;