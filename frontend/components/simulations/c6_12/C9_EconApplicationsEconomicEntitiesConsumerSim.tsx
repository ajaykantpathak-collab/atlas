'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED NODE CONSTANTS (Required: all 10 string literals) ───
const NODE_C9_ECONAPP_001 = 'c9_econapp_001';
const NODE_C9_ECONAPP_002 = 'c9_econapp_002';
const NODE_C9_ECONAPP_003 = 'c9_econapp_003';
const NODE_C9_ECONAPP_004 = 'c9_econapp_004';
const NODE_C9_ECONAPP_005 = 'c9_econapp_005';
const NODE_C9_ECONAPP_006 = 'c9_econapp_006';
const NODE_C9_ECONAPP_007 = 'c9_econapp_007';
const NODE_C9_ECONAPP_008 = 'c9_econapp_008';
const NODE_C9_ECONAPP_009 = 'c9_econapp_009';
const NODE_C9_ECONAPP_010 = 'c9_econapp_010';

const ALL_NODE_IDS = [
  NODE_C9_ECONAPP_001,
  NODE_C9_ECONAPP_002,
  NODE_C9_ECONAPP_003,
  NODE_C9_ECONAPP_004,
  NODE_C9_ECONAPP_005,
  NODE_C9_ECONAPP_006,
  NODE_C9_ECONAPP_007,
  NODE_C9_ECONAPP_008,
  NODE_C9_ECONAPP_009,
  NODE_C9_ECONAPP_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The National Economic Blueprint: Bharat 2030',
  intro: 'You are appointed as Chief Economic Advisor to the State Planning Board. From rural wheat farms in Punjab and bustling textile clusters in Tirupur, to the high-tech IT corridors of Bengaluru and the tanneries along the Ganga in Kanpur, you must allocate scarce resources, balance economic growth with human development, and sustain the ecosystem.',
  context: 'Make critical choices across the four economic entities (Consumers, Producers, Households, Government), resolve the three fundamental questions (What, How, For Whom), and guide structural transformation across Agriculture, Industry, and Services.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In India, Agriculture employs ~45.5% of the total workforce, while Services employ ~29%. What percentage of India’s GDP (Gross Value Added) does Agriculture generate?',
  options: [
    'Around 45% — matching its workforce share',
    'Around 18% — revealing a huge labour productivity gap',
    'Around 65% — because India is an agrarian nation',
    'Under 5% — like developed economies such as the USA'
  ],
  correctIndex: 1,
  hintAfter: 'Surprised? Even though nearly half of India’s workforce is in farming, it produces only ~18% of output. Let’s explore why this productivity gap exists and how economic entities interact!',
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01_labour_shift',
    question: 'Prediction 1: If 15% of surplus farm workers shift into rural manufacturing and services, what will happen to total agricultural output and national GDP?',
    options: [
      'Agricultural output collapses because fewer hands are on the field',
      'Agricultural output remains unchanged (due to disguised unemployment) while national GDP increases',
      'National GDP decreases because factory machinery is too costly',
      'Both farm output and factory output drop to zero'
    ],
    correctIndex: 1,
    explanation: 'Because surplus farm workers have near-zero marginal productivity (disguised unemployment), moving them to secondary or tertiary activities does not decrease farm harvest, but immediately creates new industrial and service value.',
    verifyInstruction: 'Go to the Sandbox phase and adjust the "Agri → Non-Farm Labour Shift" slider to observe estimated GDP growth rise from 6.5% to 8.3% without reducing baseline food supply.'
  },
  {
    id: 'pred_02_cetp_bod',
    question: 'Prediction 2: What happens to Biochemical Oxygen Demand (BOD) when industrial wastewater passes through the Aeration Tank (aerobic biological digestion)?',
    options: [
      'BOD increases sharply because bacteria add organic matter to water',
      'BOD drops by over 80% (from ~260 mg/L down to ~45 mg/L) as aerobic microbes biologically consume dissolved organic waste',
      'BOD remains completely unchanged because bacteria only remove heavy metals',
      'BOD drops instantly to absolute zero in less than 1 second'
    ],
    correctIndex: 1,
    explanation: 'In the Aeration Tank (Stage 4), aerobic bacteria consume dissolved organic matter as nutrients, dramatically reducing BOD before secondary settling and compliant river discharge.',
    verifyInstruction: 'In Visual Lab 4 (CETP sequence), click on Stage 4 (Aeration Tank) to verify that BOD falls from 260 mg/L to 45 mg/L.'
  }
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

// ─── 22 CHALLENGES (NEP 2020 Compliant, Foundation / Standard / Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c9_econapp_001)
  {
    id: 'ch_01_entities_def',
    nodeId: NODE_C9_ECONAPP_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Mrs. Verma teaches at a government school in Bhopal earning ₹45,000/month. On her way home, she buys vegetables for ₹300 for dinner. In the vegetable transaction, what economic role is she playing?',
    options: ['Producer', 'Consumer', 'Government Regulator', 'Factor of Production'],
    correctIndex: 1,
    explanation: 'Buying goods or services for final use to satisfy wants defines the role of a Consumer. Her teaching job is on the factor/earning side (Household/Labour), but buying vegetables for dinner is strictly consumption.',
    hints: [
      'Think about the primary purpose of the vegetable transaction.',
      'Is she making goods for sale, or using them for personal satisfaction?',
      'Purchasing goods for final use without resale defines the Consumer role.'
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag-label (c9_econapp_001)
  {
    id: 'ch_02_entity_diagram',
    nodeId: NODE_C9_ECONAPP_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Place the four fundamental economic entities into their primary functional roles.',
    dragItems: [
      { label: 'Consumer', targetId: 'role_spending' },
      { label: 'Producer', targetId: 'role_making' },
      { label: 'Household', targetId: 'role_earning' },
      { label: 'Government', targetId: 'role_welfare' }
    ],
    correctMapping: {
      role_spending: 'Consumer',
      role_making: 'Producer',
      role_earning: 'Household',
      role_welfare: 'Government'
    },
    explanation: 'Consumers buy for final use; Producers combine factors to create goods/services for sale; Households supply factor inputs and earn income; Government taxes and provides public infrastructure and welfare.',
    hints: [
      'Who earns income by supplying labour and spends on life needs? (Household)',
      'Who converts raw inputs into finished products for profit? (Producer)',
      'Who collects taxes and manages public welfare? (Government)'
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Understanding (c9_econapp_002)
  {
    id: 'ch_03_economy_def',
    nodeId: NODE_C9_ECONAPP_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is a one-time barter trade between two isolated travelers not considered an "economy"?',
    options: [
      'Because they did not pay GST to the government',
      'Because an economy requires continuous, two-way circular flow of production, consumption, and exchange',
      'Because only transactions involving gold and bank notes count as economics',
      'Because barter is legally banned under the Reserve Bank of India Act'
    ],
    correctIndex: 1,
    explanation: 'An economy is a continuous system of interdependent production, consumption, and exchange. A single isolated trade is merely a transaction, lacking the perpetual circular flow.',
    hints: [
      'Think about the defining feature that keeps an economic system alive over time.',
      'Recall the water fountain analogy: it requires continuous circulation.',
      'An economy is a sustained loop of goods flowing one way and payments flowing the other.'
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Recall (c9_econapp_003)
  {
    id: 'ch_04_robbins_scarcity',
    nodeId: NODE_C9_ECONAPP_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Lionel Robbins (1932), which three structural conditions must exist simultaneously to create an economic allocation problem?',
    options: [
      'Money, Banks, and Taxes',
      'Unlimited ends (wants), Scarce means (resources), and Alternative uses of resources',
      'High GDP, Low Inflation, and Foreign Trade',
      'Agriculture, Heavy Industry, and Modern Services'
    ],
    correctIndex: 1,
    explanation: 'Robbins defined economics around: (1) Unlimited ends, (2) Scarce means, and (3) Alternative uses. If any one is absent, choice is unnecessary and the economic problem vanishes.',
    hints: [
      'Robbins framed economics as the science of choice under limitation.',
      'What are wants called? (Ends). What are resources called? (Means).',
      'Do resources have only one use, or alternative uses?'
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Understanding (c9_econapp_004)
  {
    id: 'ch_05_central_problems',
    nodeId: NODE_C9_ECONAPP_004,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Deciding whether India should spend ₹6.21 lakh crore on Tejas fighter jets vs ₹73,498 crore on school textbooks directly answers which central problem?',
    options: [
      'HOW to produce (Technique selection)',
      'WHAT to produce (Allocation of scarce resources among goods)',
      'FOR WHOM to produce (Distribution of national output)',
      'WHEN to produce (Time preference of consumption)'
    ],
    correctIndex: 1,
    explanation: 'Choosing between defence capital goods (Tejas jets) and social services (education) is the central problem of "WHAT to produce and in what quantities."',
    hints: [
      'Does this decision pick machinery vs hand-weaving, or choose which goods get budget?',
      'It is choosing the bundle of goods that society creates from limited tax revenue.',
      'This is the fundamental "What to produce" allocation question.'
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Recall (c9_econapp_005)
  {
    id: 'ch_06_mixed_econ_india',
    nodeId: NODE_C9_ECONAPP_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the Indian economy formally classified as a "Mixed Economy"?',
    options: [
      'Because it has both rural villages and modern skyscrapers',
      'Because public sector units (like SBI, Indian Railways) and private enterprises (like Reliance, Tata) coexist',
      'Because it imports as much as it exports in foreign trade',
      'Because it combines direct taxes with indirect GST'
    ],
    correctIndex: 1,
    explanation: 'A mixed economy features the simultaneous presence and cooperation of both state-owned public sector enterprises and privately owned market-driven businesses.',
    hints: [
      'Focus on the ownership of means of production.',
      'Think about Indian Railways (Govt) running alongside Indigo airlines (Private).',
      'Public sector + Private sector coexisting = Mixed Economy.'
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Drag-sort (c9_econapp_009)
  {
    id: 'ch_07_cetp_sort',
    nodeId: NODE_C9_ECONAPP_009,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 5 core stages of a Common Effluent Treatment Plant (CETP) in the correct operational sequence:',
    sortItems: [
      'Screening (bar screens remove floating rags and hide trimmings)',
      'Equalisation tank (homogenises flow volume and pollutant concentration)',
      'Primary Clarifier (settles heavy suspended solids and skims grease)',
      'Aeration tank (aerobic bacteria biologically consume dissolved organic BOD)',
      'Secondary Clarifier & Discharge (settles bacterial sludge; treated water released)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The standard CETP sequence flows from physical separation (screening, equalisation, primary settling) to biological degradation (aeration tank) and final clarification/discharge.',
    hints: [
      'You must catch large floating debris before pumping into delicate tanks.',
      'Equalisation balances batch discharges before settling.',
      'Biological aeration happens after physical solids are settled out.'
    ],
  },
  // 8. Standard - Numeric Productivity Ratio (c9_econapp_006)
  {
    id: 'ch_08_agri_prod_calc',
    nodeId: NODE_C9_ECONAPP_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If Agriculture employs 45.5% of India\'s total workforce but generates only 18.2% of total Gross Value Added (GVA), what is the Labour Productivity Ratio (Employment % ÷ GVA %)? (Give answer to 1 decimal place)',
    correctAnswer: 2.5,
    tolerance: 0.1,
    unit: 'ratio',
    explanation: '45.5 ÷ 18.2 = 2.5. A ratio of 2.5 indicates that it takes 2.5 times as many workers in agriculture to generate the average national output per worker, signaling disguised unemployment.',
    hints: [
      'Divide the employment percentage (45.5) by the GVA percentage (18.2).',
      '45.5 / 18.2 = ?',
      'The result is approximately 2.5.'
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Application (c9_econapp_004)
  {
    id: 'ch_09_growth_vs_dev',
    nodeId: NODE_C9_ECONAPP_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In FY 2023-24, India\'s real GDP grew by 8.2%, yet India ranked 134th out of 193 nations on the UNDP Human Development Index (HDI 2024). What does this divergence prove?',
    options: [
      'The GDP calculation was fraudulent and overstated',
      'Economic growth (quantitative output rise) is necessary but not sufficient for economic development (qualitative living standards & welfare)',
      'HDI only applies to European socialist economies, not developing ones',
      'Higher GDP automatically guarantees elimination of poverty within 12 months'
    ],
    correctIndex: 1,
    explanation: 'Economic growth is quantitative (real GDP expansion). Economic development is qualitative (literacy, life expectancy, infant mortality, equity). An economy can grow fast while broad welfare indicators lag.',
    hints: [
      'Think of Growth as the engine horsepower, and Development as reaching the human destination.',
      'Does high national income guarantee every child has a school and clean water?',
      'Growth measures output; development measures quality of life and human capability.'
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard - Application (c9_econapp_003)
  {
    id: 'ch_10_samuelson_water',
    nodeId: NODE_C9_ECONAPP_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'India\'s per capita water availability dropped from 1,816 m³ (2001) to 1,367 m³ (2021). How does Samuelson\'s definition of economics expand upon Robbins\' view when addressing this crisis?',
    options: [
      'Samuelson ignores scarcity and assumes government can print infinite water resources',
      'Samuelson adds dynamic growth over time (desalination/recharge), technical efficiency (drip irrigation), and equitable distribution (Jal Jeevan Mission)',
      'Samuelson restricts economics strictly to market prices and denies that water has any economic value',
      'Samuelson claims only industrial users should be given access to river basins'
    ],
    correctIndex: 1,
    explanation: 'While Robbins focused statically on allocating existing scarce means at one instant, Samuelson made economics dynamic by adding efficiency of use, expansion over time (growth), and societal distribution (now and in the future).',
    hints: [
      'Robbins is static (allocating what exists today).',
      'What dimensions did Samuelson add in his 1948 definition?',
      'Samuelson integrated efficiency, growth across time, and fair social distribution.'
    ],
    misconceptionIndex: 2,
  },
  // 11. Standard - Application (c9_econapp_007)
  {
    id: 'ch_11_biofertilizer_diff',
    nodeId: NODE_C9_ECONAPP_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A farmer applies Rhizobium culture to chickpea seeds and spread 5 tonnes of vermicompost on the soil. Why is Rhizobium classified as a bio-fertilizer and NOT organic manure?',
    options: [
      'Because Rhizobium contains 50% synthetic chemical nitrogen produced in a factory',
      'Because Rhizobium is a living micro-organism that fixes atmospheric nitrogen biologically, containing no direct NPK in the packet itself',
      'Because Rhizobium is poisonous to pests and acts only as an insecticide',
      'Because organic manure requires earthworms while bio-fertilizers require tractors'
    ],
    correctIndex: 1,
    explanation: 'Bio-fertilizers are living microbes (Rhizobium, Azotobacter) that biologically fix nitrogen or solubilise phosphorus. Manure/compost is decomposed organic biomass directly supplying mineralised NPK nutrients.',
    hints: [
      'Check the biological mechanism: does the packet contain physical plant nutrients or living bacteria?',
      'Rhizobium bacteria live in legume root nodules and fix nitrogen gas from air.',
      'Bio-fertilizers act as biological converters, not direct nutrient stores.'
    ],
    misconceptionIndex: 2,
  },
  // 12. Standard - Numeric Industrial Emissions (c9_econapp_008)
  {
    id: 'ch_12_co2_calc',
    nodeId: NODE_C9_ECONAPP_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 1,000 MW coal power plant generates 6,000,000 MWh (6 billion kWh) annually. At an emission factor of 0.82 kg CO₂/kWh, how many million metric tonnes of CO₂ does it emit per year? (Round to 2 decimal places)',
    correctAnswer: 4.92,
    tolerance: 0.1,
    unit: 'million tonnes',
    explanation: '6,000,000,000 kWh × 0.82 kg = 4,920,000,000 kg = 4.92 million metric tonnes of CO₂ per year. In contrast, a solar facility would emit under 0.30 million tonnes.',
    hints: [
      'Total kWh = 6,000,000,000.',
      'Multiply by 0.82 kg per kWh to find total kg.',
      'Convert 4,920,000,000 kg to million metric tonnes (divide by 1,000,000,000 kg).'
    ],
  },
  // 13. Standard - Construct (c9_econapp_007)
  {
    id: 'ch_13_crop_rotation_plan',
    nodeId: NODE_C9_ECONAPP_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct an ecologically sustainable 3-season crop rotation plan for a 1-hectare farm in Punjab to restore nitrogen and prevent topsoil loss:',
    availableParts: ['Kharif: Rice', 'Rabi: Wheat', 'Summer: Moong (Legume)', 'Fallow with Bare Tillage', 'Kharif: Maize-Moong Strip', 'Chemical Urea Soak'],
    targetState: 'Kharif: Maize-Moong Strip Rabi: Wheat Summer: Moong (Legume)',
    validationHint: 'Combine strip cropping in Kharif, cereal food grain in Rabi, and nitrogen-fixing legume in Summer!',
    explanation: 'Alternating cereal crops (Wheat) with dense legumes (Moong) in summer fallow fixes 25-40 kg biological N/ha through Rhizobium, while strip cropping protects soil from monsoon runoff.',
    hints: [
      'Avoid bare fallow and continuous heavy water consumers.',
      'Use Moong in the summer to fix atmospheric nitrogen biologically.',
      'Select: Kharif: Maize-Moong Strip -> Rabi: Wheat -> Summer: Moong (Legume).'
    ],
  },
  // 14. Standard - Application (c9_econapp_010)
  {
    id: 'ch_14_services_disparity',
    nodeId: NODE_C9_ECONAPP_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bengaluru generates over $60 Billion in IT exports, yet northern Karnataka districts like Yadgir experience below-average per capita income. How does the Karnataka "Beyond Bengaluru" policy attempt to correct this?',
    options: [
      'By banning all software companies in Bengaluru and shutting the airport',
      'By incentivising IT clusters, subsidized office space, and digital skills in Tier-2/3 cities like Mysuru, Hubballi, and Mangaluru',
      'By transferring 100% of Bengaluru city taxes directly to foreign software clients',
      'By replacing software engineering with manual subsistence farming'
    ],
    correctIndex: 1,
    explanation: 'Tertiary sector expansion tends to cluster geographically around existing infrastructure and talent pools. Decentralisation policies (like Beyond Bengaluru) provide infrastructure incentives in Tier-2/3 hubs to disperse regional wealth.',
    hints: [
      'How can a government spread service-sector employment to lagging regions?',
      'Think about developing IT infrastructure in satellite cities like Hubballi and Mysuru.',
      'Incentives and training in Tier-2/3 cities reduce excessive metro concentration.'
    ],
  },
  // 15. Advanced - Analysis (c9_econapp_006)
  {
    id: 'ch_15_disguised_unemp',
    nodeId: NODE_C9_ECONAPP_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a 1-hectare family farm near Nashik, 6 family members produce 20 quintals of grapes. When 2 members migrate to Pune for factory jobs, the remaining 4 members STILL produce 20 quintals. What economic phenomenon was occurring on this farm?',
    options: [
      'Frictional Unemployment',
      'Disguised Unemployment (Marginal Product of the extra 2 workers was zero)',
      'Structural Involuntary Wage Lock',
      'Technological Displacement'
    ],
    correctIndex: 1,
    explanation: 'Disguised unemployment occurs when more workers are engaged in an activity than necessary. Because land is fixed, the marginal physical product of surplus workers is zero; their withdrawal leaves total output unchanged.',
    hints: [
      'Look at total output before and after the 2 workers left: 20 quintals -> 20 quintals.',
      'Did the 2 workers add any additional output when they were on the farm?',
      'When marginal productivity of labor is zero, it is called disguised unemployment.'
    ],
    misconceptionIndex: 1,
  },
  // 16. Advanced - Evaluation (c9_econapp_004)
  {
    id: 'ch_16_pli_tradeoff',
    nodeId: NODE_C9_ECONAPP_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The Government introduces a ₹6,903 crore Production-Linked Incentive (PLI) for automated mega-textile parks. Evaluate the structural trade-off between the "HOW" and "FOR WHOM" problems in this policy:',
    options: [
      'There is zero trade-off because automated machines employ more manual weavers than handlooms',
      'Capital-intensive "HOW" improves export cost-competitiveness, but may displace handloom weavers, worsening income distribution ("FOR WHOM") unless non-farm safety nets absorb them',
      'Automated textile production completely eliminates the need for raw cotton from agriculture',
      'The policy converts the entire Indian economy into a pure command socialist model'
    ],
    correctIndex: 1,
    explanation: 'Choosing capital-intensive production ("HOW") enhances scale, quality, and global export competitiveness, but risks displacing millions of traditional handloom/powerloom workers, impacting the "FOR WHOM" income distribution.',
    hints: [
      'Analyze the conflict between automated efficiency and mass labor absorption.',
      'India has 35+ lakh handloom weavers and 55+ lakh powerloom workers.',
      'High-tech automation boosts output but requires proactive retraining to protect worker livelihoods.'
    ],
  },
  // 17. Advanced - Evaluation (c9_econapp_009)
  {
    id: 'ch_17_cpcb_water_limits',
    nodeId: NODE_C9_ECONAPP_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under the Water Act 1974 and CPCB MINAS standards, treated industrial effluent discharged into inland surface waters must not exceed which Biochemical Oxygen Demand (BOD) threshold?',
    options: ['300 mg/L', '150 mg/L', '30 mg/L', '0.5 mg/L'],
    correctIndex: 2,
    explanation: 'The Central Pollution Control Board (CPCB) mandates a maximum BOD limit of 30 mg/L for treated industrial effluent discharged into inland surface water bodies to safeguard aquatic oxygen levels.',
    hints: [
      'BOD measures oxygen demand required by aerobic bacteria to break down organics.',
      'High BOD (>100 mg/L) suffocates fish and river life.',
      'The standard CPCB MINAS limit for inland surface water is 30 mg/L.'
    ],
  },
  // 18. Advanced - Analysis (c9_econapp_010)
  {
    id: 'ch_18_mgnrega_service',
    nodeId: NODE_C9_ECONAPP_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is MGNREGA 2005 (guaranteeing 100 days of wage work) analytically classified as a service-sector intervention for regional development rather than factory manufacturing?',
    options: [
      'Because MGNREGA workers exclusively write software for multinational IT firms',
      'Because workers provide public labour services to build communal infrastructure (check dams, rural roads, water harvesting) which stimulates purchasing power in backward districts',
      'Because MGNREGA is operated exclusively by private commercial banks for corporate profit',
      'Because it produces manufactured luxury goods for export to European markets'
    ],
    correctIndex: 1,
    explanation: 'MGNREGA funds community labour services that create durable public capital assets (water conservation, flood channels, roads) while injecting purchasing power directly into distressed rural households.',
    hints: [
      'What do MGNREGA workers produce? Physical commercial retail products or public community assets?',
      'They provide communal labor services creating public goods.',
      'It acts as a public-service safety net generating grassroots regional assets.'
    ],
  },
  // 19. Advanced - Application (c9_econapp_008)
  {
    id: 'ch_19_bs6_grap_eval',
    nodeId: NODE_C9_ECONAPP_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India skipped BS-V and implemented BS-VI emission norms on 1 April 2020 (cutting diesel NOx by 68%). Why did Delhi’s winter PM2.5 levels remain elevated despite strict vehicle standards?',
    options: [
      'Because BS-VI engines emit 10 times more particulate matter than older engines',
      'Because BS-VI is a per-vehicle limit, while total urban fleet size grew, and vehicles contribute only ~30% of PM2.5 alongside thermal power, road dust, and crop residue burning',
      'Because the Supreme Court abolished all environmental regulations in 2021',
      'Because BS-VI fuel is chemically identical to unrefined crude oil'
    ],
    correctIndex: 1,
    explanation: 'Vehicle standards govern per-unit emissions. When total vehicular population expands (11+ million registered vehicles) and non-vehicular sources (coal plants, construction dust, agricultural biomass burning) persist, ambient PM2.5 remains hazardous.',
    hints: [
      'Distinguish per-vehicle emission rate from the total aggregate pollution volume.',
      'What percentage of Delhi\'s PM2.5 comes from non-vehicular sources? (~70%).',
      'A holistic policy must tackle power plants, dust, and biomass alongside vehicle norms.'
    ],
  },
  // 20. Advanced - Drag-sort (c9_econapp_002)
  {
    id: 'ch_20_circular_flow_steps',
    nodeId: NODE_C9_ECONAPP_002,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the unbroken chain of the Circular Flow of Economic Activity starting from factor supply:',
    sortItems: [
      'Households supply factors of production (Labour, Land, Capital) to Producers in Factor Market',
      'Producers pay factor incomes (Wages, Rent, Interest, Profit) back to Households',
      'Households use earned factor income to purchase finished Goods and Services in Product Market',
      'Producers receive sales revenue from Consumers and reinvest in factor employment'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Factor Market flow (factors for factor income) leads directly into Product Market flow (consumer spending for finished output), forming the perpetual circular loop.',
    hints: [
      'Start with households supplying their labor to firms.',
      'Firms pay wages for that labor.',
      'Households spend those wages buying groceries and goods from firms.'
    ],
  },
  // 21. Advanced - Construct (c9_econapp_005)
  {
    id: 'ch_21_mixed_economy_pair',
    nodeId: NODE_C9_ECONAPP_005,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 3 classic Indian institutional pairs that prove India is a developing Mixed Economy:',
    availableParts: ['Railways: Indian Railways (Public) & Indigo (Private Air)', 'Telecom: BSNL (Public) & Reliance Jio (Private)', 'Banking: SBI (Public) & HDFC Bank (Private)', 'Pure Monarchy: Crown Lands', 'Totalitarian Barter Clan'],
    targetState: 'Railways: Indian Railways (Public) & Indigo (Private Air) Telecom: BSNL (Public) & Reliance Jio (Private) Banking: SBI (Public) & HDFC Bank (Private)',
    validationHint: 'Select all three Public-Private sector pairs across Railways/Aviation, Telecom, and Banking!',
    explanation: 'The coexistence of State-run enterprises serving public welfare and private commercial corporations competing for market efficiency embodies India\'s Mixed Economy structure.',
    hints: [
      'Select the institutional pairs containing both Public and Private Indian operators.',
      'Include Telecom (BSNL + Jio), Banking (SBI + HDFC), and Transport.',
      'Exclude non-economic distractors.'
    ],
  },
  // 22. Advanced - Numeric Sector Productivity (c9_econapp_010)
  {
    id: 'ch_22_service_productivity_calc',
    nodeId: NODE_C9_ECONAPP_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'If Services generate 54.0% of India\'s GVA while employing 29.0% of the workforce, calculate the Service Sector Productivity Index (GVA % ÷ Employment %). (Round to 2 decimal places)',
    correctAnswer: 1.86,
    tolerance: 0.05,
    unit: 'productivity index',
    explanation: '54.0 ÷ 29.0 = 1.86. A productivity index of 1.86 means a service worker generates 1.86 times the average national output, compared to just 0.40 for an agricultural worker.',
    hints: [
      'Divide the GVA share (54.0) by the employment share (29.0).',
      '54.0 / 29.0 = ?',
      'The result is approximately 1.86.'
    ],
  },
  // ─── Class 10 board-depth additions: development diagnostics ───
  {
    id: 'ch_depth_dev_village_income',
    nodeId: 'c10_eco_cbse_01_002',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Two villages have identical average per capita income. Village A has a functioning primary health centre, panchayat schools and safe water; Village B has none. Is "income" alone the right development measure?',
    options: [
      'No -- identical averages hide distribution AND public facilities; development must include health, education, equality and public goods. That is why Kerala outperforms richer states on HDI indicators (infant mortality, literacy), and why the Human Development Index bundles income with health and education',
      'Yes -- money buys everything, so the villages are equally developed',
      'Public facilities matter only in cities',
      'Averages never hide anything'
    ],
    correctIndex: 0,
    explanation:
      'The chapter\'s pivot: "money cannot buy all the goods you need to live well" -- pollution-free air, unadulterated medicines, collective public facilities. And averages conceal inequality: one billionaire plus ten landless can match eleven middle incomes per capita while meaning opposite things. BMI example: a student with BMI 22.5 is "normal weight" (18.5-24.9 band) -- health statistics measure wellbeing income cannot; and critiquing "replace per-capita income with BMI": BMI captures ONE health dimension, income captures purchasing power -- both partial, hence the composite HDI.',
    hints: [
      'Same average, different lives -- what is invisible?',
      'Kerala vs Haryana: income vs health/education outcomes.',
      'Critique = what the single measure misses.'
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
  nodeId: NODE_C9_ECONAPP_001,
  title: 'Economic Entities & Fundamentals of the Indian Economy',
  definition: 'An economic entity is any decision-making unit (Consumer, Producer, Household, Government) that produces, consumes, earns, exchanges, or regulates resources under conditions of scarcity.',
  eli5: 'Think of the economy like a gigantic school festival. Households run stalls and earn tokens; consumers buy treats; producers bake the food; and the school management makes sure there are lights, security, and equal fair rules.',
  misconceptions: [
    {
      misconception: 'Household and Consumer mean the exact same thing.',
      correction: 'A Household is the dual unit that earns income (supplying labour) AND consumes. A Consumer refers strictly to the spending role within that unit.'
    },
    {
      misconception: 'Agriculture produces 50% of India’s GDP because ~45% of workers are in farming.',
      correction: 'Agriculture generates only ~18% of India\'s GVA despite employing ~45.5% of workers. This large gap is the hallmark of low agricultural productivity and disguised unemployment.'
    },
    {
      misconception: 'Robbins and Samuelson gave identical definitions of economics.',
      correction: 'Robbins provided a static definition focusing on allocation under scarcity at one instant. Samuelson added dynamic growth over time, technical efficiency, and social distribution.'
    },
    {
      misconception: 'Economic growth (GDP rising) is identical to Economic Development.',
      correction: 'Growth is quantitative (GDP number rising). Development is qualitative: growth combined with improved literacy, life expectancy, health, and equitable welfare.'
    },
    {
      misconception: 'India became a purely Capitalist economy after the 1991 Liberalisation.',
      correction: 'India remains a Mixed Economy. 1991 expanded private enterprise, but the State continues to operate strategic public utilities, railways, and major welfare safety nets (PDS, MGNREGA).'
    }
  ],
  diagnosticQuestions: [
    { question: 'What are the four primary economic entities?', options: ['Banks, Stock Exchanges, Exporters, Buyers', 'Consumers, Producers, Households, Government', 'Farmers, Millers, Traders, Transporters', 'Schools, Hospitals, Courts, Police'], correctIndex: 1 },
    { question: 'What is the three-part basis of Lionel Robbins’ definition?', options: ['Land, Labour, Capital', 'Ends are unlimited, Means are scarce, Means have alternative uses', 'Taxes, Subsidies, Deficits', 'Primary, Secondary, Tertiary'], correctIndex: 1 },
    { question: 'Which central problem involves choosing between labour-intensive vs capital-intensive techniques?', options: ['WHAT to produce', 'HOW to produce', 'FOR WHOM to produce', 'WHERE to produce'], correctIndex: 1 },
    { question: 'What share of India’s GVA does the Service sector contribute (approx)?', options: ['18%', '28%', '54%', '80%'], correctIndex: 2 },
    { question: 'What is the primary characteristic of disguised unemployment in farming?', options: ['Workers refuse to accept wages', 'Marginal productivity of extra workers is near zero', 'Farms are closed during monsoon', 'Workers lack tractors'], correctIndex: 1 },
    { question: 'What is the maximum permissible BOD limit for inland treated effluent under CPCB standards?', options: ['300 mg/L', '100 mg/L', '30 mg/L', '5 mg/L'], correctIndex: 2 },
    { question: 'Which practice incorporates biological nitrogen fixation into soil without synthetic urea?', options: ['Crop rotation with Moong/Rhizobium', 'Deep open-pit sand mining', 'Over-grazing on pastures', 'Dumping untreated tannery sludge'], correctIndex: 0 },
    { question: 'India’s GDP rank is 5th globally, but its HDI rank is 134th. What does this demonstrate?', options: ['GDP growth alone does not guarantee high human development', 'India has no services sector', 'Data from the UN is invalid', 'India is an underdeveloped nation'], correctIndex: 0 }
  ],
  masteryCriteria: 'Mastery is achieved when the student accurately classifies economic entities, calculates sector productivity indices, evaluates central economic problems, and analyzes industrial effluent & ecological sustainability.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Learn by Doing) ───
const EXPLORATION_STEPS = [
  {
    id: 'exp_01_circular',
    title: '1. The Circular Flow of Economic Entities',
    instruction: 'Click each entity node to see how goods, factor inputs, and money circulate through the Indian economy.',
    interactionType: 'click-entity',
    nodeId: NODE_C9_ECONAPP_001,
  },
  {
    id: 'exp_02_central_problems',
    title: '2. The Three Central Economic Problems',
    instruction: 'Adjust the National Budget allocation slider to balance Capital Defense vs Social Education, and observe the opportunity trade-offs.',
    interactionType: 'slider-budget',
    nodeId: NODE_C9_ECONAPP_004,
  },
  {
    id: 'exp_03_sector_gap',
    title: '3. Structural Transformation: GVA vs Employment',
    instruction: 'Toggle between Agriculture, Industry, and Services to inspect the Labour Productivity Index across India’s economy.',
    interactionType: 'toggle-sectors',
    nodeId: NODE_C9_ECONAPP_006,
  },
  {
    id: 'exp_04_cetp_simulation',
    title: '4. Industrial Wastewater: CETP Treatment Sequence',
    instruction: 'Select each stage or use the selector buttons to trace how Kanpur tannery effluent has chromium and BOD reduced before discharging into the Ganga.',
    interactionType: 'slider-cetp',
    nodeId: NODE_C9_ECONAPP_009,
  },
  {
    id: 'exp_05_soil_conservation',
    title: '5. Ecological Farming & Soil Renewal',
    instruction: 'Switch between Conventional Monoculture and Alternative Conservation Cropping to inspect runoff and topsoil preservation.',
    interactionType: 'toggle-farming',
    nodeId: NODE_C9_ECONAPP_007,
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Service Sector compared to Agriculture in India?',
    observableOptions: [
      'Services produce over half the nation\'s income (~54% GVA) with less than a third of its workers (~29%)',
      'Agriculture produces more income than services and industry combined',
      'Both sectors have identical employment and output numbers',
      'Services employ 90% of India\'s rural population'
    ],
    correctIndex: 0,
    nodeId: NODE_C9_ECONAPP_010,
  }
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Economic Planner: Design Your District Plan',
  description: 'Select your home district in India (e.g., Pune, Kanpur, Ludhiana, Tirupur, or Bengaluru) and map out its primary economic engine across the three sectors, identifying its key environmental challenge and proposing a safe mitigation strategy.',
  steps: [
    '1. Identify your local primary producer clusters (farming, textile mills, tanneries, IT parks).',
    '2. Note where your district’s households supply labour and where consumers spend their income.',
    '3. Diagnose one local ecological impact (e.g., groundwater depletion, industrial effluent, vehicle PM2.5).',
    '4. Propose an eco-friendly remedy: CETP upgrade, contour bunding with bio-fertilizers, or EV transit corridors.',
  ],
};

// ─── COMPONENT DEFINITION ───
export function C9_EconApplicationsEconomicEntitiesConsumerSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C9_ECONAPP_001,
    title = DEFAULT_PROPS.title || 'Economic Entities & Indian Economy Fundamentals',
    definition = DEFAULT_PROPS.definition,
    eli5 = DEFAULT_PROPS.eli5,
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    masteryCriteria = DEFAULT_PROPS.masteryCriteria,
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['econapp'] || { name: 'Economics Applications', emoji: '📈', color: 'emerald' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT-STYLE INTERACTION STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryIndex, setSelectedDiscoveryIndex] = useState<number | null>(null);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── PREDICTION SYSTEM STATE (Predict-then-Check) ───
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number | null>>({ 0: null, 1: null });
  const [predictionChecked, setPredictionChecked] = useState<Record<number, boolean>>({ 0: false, 1: false });

  // ─── INTERACTIVE EXPLORATION STATES ───
  const [selectedEntity, setSelectedEntity] = useState<'consumer' | 'producer' | 'household' | 'government' | null>('household');
  const [budgetAllocation, setBudgetAllocation] = useState<number>(50); // 0 = 100% Social/Edu, 100 = 100% Defence/Capital
  const [selectedSector, setSelectedSector] = useState<'agri' | 'ind' | 'serv'>('agri');
  const [cetpStage, setCetpStage] = useState<number>(1);
  const [farmingMode, setFarmingMode] = useState<'monoculture' | 'conservation'>('conservation');

  // ─── SANDBOX STATE ───
  const [sandboxTaxRate, setSandboxTaxRate] = useState<number>(20);
  const [sandboxFarmShift, setSandboxFarmShift] = useState<number>(15);
  const [sandboxGreenSubsidy, setSandboxGreenSubsidy] = useState<number>(40);

  // ─── ADAPTIVITY & SCORING ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // ─── ESCALATING HINTS & PROGRESSIVE DISCLOSURE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── DRAG & DROP / NUMERIC / CONSTRUCT STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── FEEDBACK OVERLAYS ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT: LOAD EXISTING MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT SCORE UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : (mastery === 'developing' ? 'standard' : 'advanced');

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION FOR FLOW DIAGRAM ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated pulsing flow particles
      const speed = 0.04;
      const t = frame * speed;
      const numParticles = 6;

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(10, 8, canvas.width - 20, canvas.height - 16);

      for (let i = 0; i < numParticles; i++) {
        const offset = (t + i / numParticles) % 1;
        const x = 20 + offset * (canvas.width - 40);
        const y = canvas.height / 2 + Math.sin(frame * 0.05 + i) * 6;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#38bdf8';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Live Economy Circulation Tracker (Real Goods vs Money Flow)', 24, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge?.hints?.[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a nudge? Check this hint.');
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Here is the full solution explanation.');
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    setSelectedDiscoveryIndex(selectedIndex);
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You understand the productivity gap.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PREDICTION HANDLER (Brilliant-style Predict-then-Check) ───
  const handleSelectPrediction = useCallback((predIndex: number, optIndex: number) => {
    setPredictionAnswers(prev => ({ ...prev, [predIndex]: optIndex }));
    setPredictionChecked(prev => ({ ...prev, [predIndex]: true }));
    const isCorrect = optIndex === PREDICTION_QUESTIONS[predIndex].correctIndex;
    audioManager.play(isCorrect ? 'drop-correct' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate prediction!' : 'Prediction recorded. Check the verification instruction!');
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core economic mechanisms step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Economic Sandbox! Experiment freely with policy sliders.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Prove your economic mastery!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Look closer at the GVA and employment distributions.');
  }, []);

  // ─── ENTITY CLICK IN EXPLORATION ───
  const handleEntityClick = useCallback((entity: 'consumer' | 'producer' | 'household' | 'government') => {
    setSelectedEntity(entity);
    audioManager.play('tap');
    const speechMap = {
      consumer: 'Consumers purchase goods for final use, maximizing satisfaction from their budget.',
      producer: 'Producers combine land, labour, and capital to create goods for market sale.',
      household: 'Households supply labour in factor markets and spend earned income on life needs.',
      government: 'The Government collects taxes, manages currency, and provides public goods and welfare.',
    };
    speechManager.speak(speechMap[entity]);
  }, []);

  // ─── SLIDER HANDLERS ───
  const handleBudgetAllocationChange = useCallback((val: number) => {
    setBudgetAllocation(val);
    audioManager.play('count');
  }, []);

  const handleCetpStageChange = useCallback((stage: number) => {
    setCetpStage(stage);
    audioManager.play('count');
  }, []);

  const handleFarmingModeToggle = useCallback((mode: 'monoculture' | 'conservation') => {
    setFarmingMode(mode);
    audioManager.play('tap');
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
    speechManager.speak(`Congratulations! You completed the blueprint with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setSelectedOption(null);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── DRAG SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length === 0 && challenge.sortItems
        ? challenge.sortItems.map((_, i) => i)
        : [...prev];
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [challenge]);

  // ─── SUBMIT ANSWER (VALIDATES ALL CHALLENGE TYPES) ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    if (typeof answer === 'number') {
      setSelectedOption(answer);
    }

    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct analysis! Well done.');
      setShowSparkle(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({
          nodeId: challenge.nodeId,
          mastery: getMasteryLevel(bktStateRef.current.pKnown),
          score: 100,
          timestamp: Date.now()
        }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
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
        speechManager.speak('Let us inspect the complete step-by-step reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DERIVED VALUES FOR LIVE VISUALIZATIONS ───
  const defenseJets = useMemo(() => Math.round((budgetAllocation / 100) * 12), [budgetAllocation]);
  const schoolBooksLakh = useMemo(() => Math.round(((100 - budgetAllocation) / 100) * 80), [budgetAllocation]);

  const cetpParams = useMemo(() => {
    switch (cetpStage) {
      case 1: return { name: 'Stage 1: Raw Tannery Influent & Bar Screen', bod: 420, chromium: 55, color: '#451a03', status: 'Untreated / High Solids' };
      case 2: return { name: 'Stage 2: Equalisation & Neutralisation Tank', bod: 380, chromium: 48, color: '#78350f', status: 'Homogenised Batch' };
      case 3: return { name: 'Stage 3: Primary Clarifier & Chemical Coagulation', bod: 260, chromium: 22, color: '#92400e', status: 'Solids Settled' };
      case 4: return { name: 'Stage 4: Aeration Tank (Aerobic Biological Digestion)', bod: 45, chromium: 8, color: '#065f46', status: 'Microbial Digestion' };
      case 5: default: return { name: 'Stage 5: Secondary Clarifier & Safe River Discharge', bod: 22, chromium: 1.4, color: '#047857', status: 'CPCB Compliant (BOD ≤ 30)' };
    }
  }, [cetpStage]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/50"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Class 9 ICSE • Econ Applications</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">Chapters 1–4</span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Buttons */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="toolbar" aria-label="Simulation phase navigation">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${p} phase`}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p === 'discovery' ? 'Discovery' : p === 'explore' ? 'Visual Lab' : p === 'sandbox' ? 'Sandbox' : 'Challenges'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook + Predict-then-Check Pattern) ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/50 border border-emerald-800/60 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                Mission Scenario
              </span>
              <span className="text-xs text-slate-400">Policy Case Study</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-3 font-medium bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Question */}
          <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Curiosity Hook (Not Graded)
            </span>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="group" aria-label="Discovery options">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isSelected = selectedDiscoveryIndex === i;
                const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    onClick={() => handleDiscoveryAnswer(i)}
                    className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all border ${
                      discoveryAnswered
                        ? isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : isSelected
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700/80 text-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {discoveryAnswered && (
                        <span>
                          {isCorrect ? (
                            <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                          ) : isSelected ? (
                            <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                          ) : null}
                        </span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{discoveryCorrect ? '✓' : 'ℹ️'}</span>
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                    {discoveryCorrect ? 'Spot on! 45.5% of workers produce only 18% of output.' : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter visual lab"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 whitespace-nowrap"
                >
                  Enter Visual Lab →
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* ──�� BRILLIANT.ORG PREDICT-THEN-CHECK MODULES ─── */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-sky-900/50 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs uppercase tracking-wider">
                🔮 Predict-Then-Check Pattern
              </span>
              <span className="text-xs text-slate-400">Make predictions first, then verify inside the Visual Lab and Sandbox!</span>
            </div>

            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pred, pIdx) => {
                const selected = predictionAnswers[pIdx];
                const checked = predictionChecked[pIdx];
                return (
                  <div key={pred.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h4 className="text-sm md:text-base font-bold text-white">{pred.question}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {pred.options.map((opt, optIdx) => {
                        const isChosen = selected === optIdx;
                        const isCorrect = optIdx === pred.correctIndex;
                        return (
                          <button
                            key={optIdx}
                            disabled={checked}
                            onClick={() => handleSelectPrediction(pIdx, optIdx)}
                            className={`p-3 rounded-xl text-left text-xs font-semibold border transition-all ${
                              checked
                                ? isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                  : isChosen
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                  : 'bg-slate-900/50 border-slate-800 text-slate-500'
                                : 'bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-200 hover:border-sky-500/50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{opt}</span>
                              {checked && isChosen && (
                                <span className={`font-bold ml-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  {isCorrect ? '✓ Expected' : '✗ Hypothesis'}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {checked && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/60 space-y-1.5"
                      >
                        <p className="text-xs text-slate-300">
                          <strong className="text-sky-300">Analysis:</strong> {pred.explanation}
                        </p>
                        <div className="p-2 rounded-lg bg-slate-900/90 border border-sky-600/40 text-xs text-sky-200 flex items-start gap-2">
                          <span className="text-base leading-none">🔍</span>
                          <span><strong>How to Verify:</strong> {pred.verifyInstruction}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE (Interactive Guided Visual Labs with 4 SVG Diagrams) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs uppercase font-bold text-emerald-400">Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-base md:text-lg font-extrabold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-xs text-amber-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                aria-label="Previous lab slide"
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-white text-xs font-bold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next lab slide' : 'Proceed to Sandbox'}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Sandbox Mode →'}
              </motion.button>
            </div>
          </div>

          {/* Dynamic Interactive Visuals by Lab Slide */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 min-h-[380px]">
            {/* Lab 1: Circular Flow & 4 Entities (SVG 1) */}
            {currentSlide === 0 && (
              <div className="space-y-4">
                <canvas ref={canvasRef} width={600} height={40} className="w-full rounded-xl border border-slate-800" aria-label="Animated circulation particles diagram" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  {/* SVG 1: Circular Flow Graph */}
                  <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 400 320" className="w-full h-64" role="img" aria-label="Circular flow of economic activity diagram featuring households, producers, consumers, and government">
                      <defs>
                        <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                      {/* Outer Goods and Services Loop */}
                      <circle cx="200" cy="160" r="110" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" />
                      <circle cx="200" cy="160" r="75" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="6 6" />

                      {/* Top Entity: Household */}
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label="Select Household entity"
                        onClick={() => handleEntityClick('household')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleEntityClick('household'); }}
                        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      >
                        <circle cx="200" cy="45" r="32" fill={selectedEntity === 'household' ? '#047857' : '#1e293b'} stroke="#10b981" strokeWidth="2" />
                        <text x="200" y="42" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Household</text>
                        <text x="200" y="55" textAnchor="middle" fill="#a7f3d0" fontSize="8">Supplies Labour</text>
                      </g>

                      {/* Bottom Entity: Producer */}
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label="Select Producer entity"
                        onClick={() => handleEntityClick('producer')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleEntityClick('producer'); }}
                        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        <circle cx="200" cy="275" r="32" fill={selectedEntity === 'producer' ? '#0369a1' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
                        <text x="200" y="272" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Producer</text>
                        <text x="200" y="285" textAnchor="middle" fill="#bae6fd" fontSize="8">Makes Goods</text>
                      </g>

                      {/* Left Entity: Consumer Role */}
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label="Select Consumer entity"
                        onClick={() => handleEntityClick('consumer')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleEntityClick('consumer'); }}
                        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        <circle cx="65" cy="160" r="30" fill={selectedEntity === 'consumer' ? '#b45309' : '#1e293b'} stroke="#f59e0b" strokeWidth="2" />
                        <text x="65" y="157" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Consumer</text>
                        <text x="65" y="169" textAnchor="middle" fill="#fde68a" fontSize="7.5">Spending Role</text>
                      </g>

                      {/* Right Entity: Government */}
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label="Select Government entity"
                        onClick={() => handleEntityClick('government')}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleEntityClick('government'); }}
                        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
                      >
                        <circle cx="335" cy="160" r="30" fill={selectedEntity === 'government' ? '#6d28d9' : '#1e293b'} stroke="#a855f7" strokeWidth="2" />
                        <text x="335" y="157" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Government</text>
                        <text x="335" y="169" textAnchor="middle" fill="#e9d5ff" fontSize="7.5">Taxes & Welfare</text>
                      </g>

                      {/* Flow labels */}
                      <text x="200" y="130" textAnchor="middle" fill="#38bdf8" fontSize="9">← Goods & Services Flow →</text>
                      <text x="200" y="195" textAnchor="middle" fill="#10b981" fontSize="9">← Rupee Payments & Wages →</text>
                    </svg>
                  </div>

                  {/* Entity Detail Card */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <span className="text-xs uppercase font-bold text-slate-400">Selected Entity Analysis</span>
                    {selectedEntity === 'household' && (
                      <div className="space-y-2">
                        <h4 className="text-emerald-400 font-bold text-base">The Household (Earning & Consuming Unit)</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Dual Role:</strong> Supplies labour to Tata Steel or Infosys in the factor market to earn wages (₹7.2L/yr), and spends income on school fees and food.
                        </p>
                        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300">
                          ⚠️ Common Error: A household is NOT just a consumer. It supplies the factors of production!
                        </div>
                      </div>
                    )}
                    {selectedEntity === 'producer' && (
                      <div className="space-y-2">
                        <h4 className="text-sky-400 font-bold text-base">The Producer (Creation for Sale)</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Function:</strong> Combines Land, Labour, Capital, and Enterprise. From Amul (3.6M dairy farmers) to a Tirupur tailor, all convert inputs into market outputs.
                        </p>
                        <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-800 text-xs text-sky-300">
                          Target: Driven by profit motive (Revenue must exceed cost of inputs).
                        </div>
                      </div>
                    )}
                    {selectedEntity === 'consumer' && (
                      <div className="space-y-2">
                        <h4 className="text-amber-400 font-bold text-base">The Consumer (Final Use)</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Function:</strong> Buys goods and services for direct want satisfaction, without resale. A family buying a subsidised ₹903 LPG cylinder acts as a consumer.
                        </p>
                      </div>
                    )}
                    {selectedEntity === 'government' && (
                      <div className="space-y-2">
                        <h4 className="text-purple-400 font-bold text-base">The Government (Framework & Welfare)</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Function:</strong> Collects taxes (GST: ₹20.14L Cr) and spends on public goods (Budget ₹48.21L Cr), issues currency via RBI, and feeds 80 Cr people through PDS.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Lab 2: Three Problems & Budget Trade-off */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-300 font-bold">National Budget Allocation (Scarcity in Action)</span>
                    <span className="text-xs text-emerald-400 font-mono font-bold">
                      Defence: {budgetAllocation}% | Education: {100 - budgetAllocation}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    value={budgetAllocation}
                    aria-label="National Budget Allocation slider between Defence and Education"
                    onChange={(e) => handleBudgetAllocationChange(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-2xl" aria-hidden="true">✈️</span>
                      <p className="text-xs text-slate-400 mt-1">Capital Goods (Tejas Jets)</p>
                      <p className="text-lg font-black text-sky-400">{defenseJets} Squadrons</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                      <span className="text-2xl" aria-hidden="true">📚</span>
                      <p className="text-xs text-slate-400 mt-1">Social Welfare (School Kits)</p>
                      <p className="text-lg font-black text-emerald-400">{schoolBooksLakh} Lakh Students</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-bold text-amber-400">1. WHAT to Produce</span>
                    <p className="text-xs text-slate-300 mt-1">Allocation of limited tax revenue between defence jets and school education.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-bold text-sky-400">2. HOW to Produce</span>
                    <p className="text-xs text-slate-300 mt-1">Labour-intensive (Khadi handlooms) vs Capital-intensive automated mega-parks.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs font-bold text-purple-400">3. FOR WHOM to Produce</span>
                    <p className="text-xs text-slate-300 mt-1">Market luxury cars (₹1.7 Cr Mercedes) vs Subsidised PDS wheat (₹2/kg for 80 Cr people).</p>
                  </div>
                </div>
              </div>
            )}

            {/* Lab 3: Sectoral GVA vs Employment (SVG 2: Structural Transformation) */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[
                    { id: 'agri', label: '🌾 Agriculture (Primary)', gva: 18, emp: 45.5, prod: 0.40 },
                    { id: 'ind', label: '🏭 Industry (Secondary)', gva: 28, emp: 25.5, prod: 1.10 },
                    { id: 'serv', label: '💻 Services (Tertiary)', gva: 54, emp: 29.0, prod: 1.86 },
                  ].map((s) => (
                    <motion.button
                      key={s.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Select ${s.label}`}
                      onClick={() => {
                        setSelectedSector(s.id as any);
                        audioManager.play('tap');
                      }}
                      className={`flex-1 p-3 rounded-2xl text-left border transition-all ${
                        selectedSector === s.id
                          ? 'bg-emerald-950/70 border-emerald-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <p className="text-xs font-bold">{s.label}</p>
                      <p className="text-xs mt-1 text-slate-300">GVA: {s.gva}% | Jobs: {s.emp}%</p>
                    </motion.button>
                  ))}
                </div>

                {/* SVG 2: Structural Sector Productivity Matrix */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="w-full md:w-1/2">
                    <svg viewBox="0 0 320 180" className="w-full h-44" role="img" aria-label="Sectoral comparison graph showing Gross Value Added share versus employment share">
                      {/* Grid Lines */}
                      <line x1="40" y1="20" x2="40" y2="150" stroke="#334155" strokeWidth="1.5" />
                      <line x1="40" y1="150" x2="300" y2="150" stroke="#334155" strokeWidth="1.5" />

                      {/* Primary Bar Pair (Agri) */}
                      <rect x="65" y={150 - (18 * 2)} width="24" height={18 * 2} fill="#10b981" rx="3" opacity={selectedSector === 'agri' ? 1 : 0.4} />
                      <rect x="92" y={150 - (45.5 * 2)} width="24" height={45.5 * 2} fill="#38bdf8" rx="3" opacity={selectedSector === 'agri' ? 1 : 0.4} />
                      <text x="90" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Agri</text>

                      {/* Secondary Bar Pair (Industry) */}
                      <rect x="145" y={150 - (28 * 2)} width="24" height={28 * 2} fill="#10b981" rx="3" opacity={selectedSector === 'ind' ? 1 : 0.4} />
                      <rect x="172" y={150 - (25.5 * 2)} width="24" height={25.5 * 2} fill="#38bdf8" rx="3" opacity={selectedSector === 'ind' ? 1 : 0.4} />
                      <text x="170" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Industry</text>

                      {/* Tertiary Bar Pair (Services) */}
                      <rect x="225" y={150 - (54 * 2)} width="24" height={54 * 2} fill="#10b981" rx="3" opacity={selectedSector === 'serv' ? 1 : 0.4} />
                      <rect x="252" y={150 - (29 * 2)} width="24" height={29 * 2} fill="#38bdf8" rx="3" opacity={selectedSector === 'serv' ? 1 : 0.4} />
                      <text x="250" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">Services</text>

                      {/* Legend inside SVG */}
                      <rect x="50" y="15" width="10" height="10" fill="#10b981" rx="2" />
                      <text x="65" y="24" fill="#a7f3d0" fontSize="8.5">GVA % Output</text>
                      <rect x="150" y="15" width="10" height="10" fill="#38bdf8" rx="2" />
                      <text x="165" y="24" fill="#bae6fd" fontSize="8.5">Workforce %</text>
                    </svg>
                  </div>

                  <div className="w-full md:w-1/2 space-y-2 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-slate-400 font-bold">Selected Sector Analysis:</p>
                      <p className="text-sm font-black text-white mt-0.5">
                        {selectedSector === 'agri' ? 'Primary: Agriculture & Allied' : selectedSector === 'ind' ? 'Secondary: Manufacturing & Power' : 'Tertiary: Software, Finance & Logistics'}
                      </p>
                      <p className="text-amber-300 mt-1">
                        Labour Productivity: <strong>{selectedSector === 'agri' ? '0.40 (Disguised underemployment)' : selectedSector === 'ind' ? '1.10 (Balanced output)' : '1.86 (High-value economic powerhouse)'}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Observation Trigger */}
                {!observationAnswered && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/60">
                    <p className="text-xs font-bold text-amber-300 mb-2">Observation Challenge: {OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="space-y-1.5" role="group" aria-label="Observation options">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          aria-label={`Observation option ${idx + 1}: ${opt}`}
                          onClick={() => handleObservation(idx)}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-800 flex items-center justify-between"
                        >
                          <span>{opt}</span>
                          {observationAnswered && idx === OBSERVATION_QUESTIONS[0].correctIndex && (
                            <span className="text-emerald-400 font-bold ml-2">✓ Verified</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Lab 4: CETP Effluent Treatment Sequence (SVG 3: CETP Wastewater Schematic) */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-300">CETP Stage Selector:</span>
                  <div className="flex gap-1.5" role="group" aria-label="CETP treatment stages">
                    {[1, 2, 3, 4, 5].map((st) => (
                      <button
                        key={st}
                        aria-label={`Select CETP treatment stage ${st}`}
                        onClick={() => handleCetpStageChange(st)}
                        className={`w-8 h-8 rounded-lg text-xs font-bold ${
                          cetpStage === st ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG 3: Multi-Stage CETP Plant Schematic */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <svg viewBox="0 0 520 130" className="w-full h-32" role="img" aria-label="Schematic diagram of Common Effluent Treatment Plant showing bar screen, equalisation tank, primary clarifier, aeration tank, and secondary clarifier">
                    {/* Flow pipe connecting all */}
                    <line x1="30" y1="65" x2="490" y2="65" stroke="#475569" strokeWidth="4" />

                    {/* Stage 1: Bar Screen */}
                    <rect x="25" y="30" width="70" height="70" rx="8" fill={cetpStage === 1 ? '#047857' : '#1e293b'} stroke={cetpStage === 1 ? '#10b981' : '#475569'} strokeWidth="2" />
                    <line x1="45" y1="35" x2="45" y2="95" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="60" y1="35" x2="60" y2="95" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="75" y1="35" x2="75" y2="95" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 2" />
                    <text x="60" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">1. Bar Screen</text>

                    {/* Stage 2: Equalisation */}
                    <rect x="125" y="30" width="70" height="70" rx="8" fill={cetpStage === 2 ? '#047857' : '#1e293b'} stroke={cetpStage === 2 ? '#10b981' : '#475569'} strokeWidth="2" />
                    <path d="M 135 65 Q 160 50, 185 65 T 190 65" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <text x="160" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">2. Equalisation</text>

                    {/* Stage 3: Primary Clarifier */}
                    <rect x="225" y="30" width="70" height="70" rx="8" fill={cetpStage === 3 ? '#047857' : '#1e293b'} stroke={cetpStage === 3 ? '#10b981' : '#475569'} strokeWidth="2" />
                    <polygon points="235,40 285,40 260,85" fill="#f59e0b" opacity="0.6" />
                    <text x="260" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">3. 1° Clarifier</text>

                    {/* Stage 4: Aeration Tank */}
                    <rect x="325" y="30" width="70" height="70" rx="8" fill={cetpStage === 4 ? '#047857' : '#1e293b'} stroke={cetpStage === 4 ? '#10b981' : '#475569'} strokeWidth="2" />
                    <circle cx="345" cy="55" r="4" fill="#a7f3d0" />
                    <circle cx="360" cy="70" r="5" fill="#a7f3d0" />
                    <circle cx="375" cy="50" r="3" fill="#a7f3d0" />
                    <text x="360" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">4. Aeration Tank</text>

                    {/* Stage 5: Secondary Clarifier & Discharge */}
                    <rect x="425" y="30" width="70" height="70" rx="8" fill={cetpStage === 5 ? '#047857' : '#1e293b'} stroke={cetpStage === 5 ? '#10b981' : '#475569'} strokeWidth="2" />
                    <path d="M 440 60 L 460 85 L 480 60" fill="none" stroke="#10b981" strokeWidth="3" />
                    <text x="460" y="115" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">5. River Release</text>
                  </svg>
                </div>

                {/* Animated Pipeline Stage Output Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{cetpParams.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-emerald-400">
                      ✓ {cetpParams.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl">
                      <p className="text-xs text-slate-400">Biochemical Oxygen Demand (BOD)</p>
                      <p className="text-lg font-black text-rose-400">{cetpParams.bod} mg/L</p>
                      <p className="text-[10px] text-slate-500">CPCB Inland Standard: ≤ 30 mg/L</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl">
                      <p className="text-xs text-slate-400">Chromium Concentration</p>
                      <p className="text-lg font-black text-amber-400">{cetpParams.chromium} mg/L</p>
                      <p className="text-[10px] text-slate-500">Safe Target: &lt; 2.0 mg/L</p>
                    </div>
                  </div>

                  {/* Visual Fluid Color Simulation */}
                  <div className="h-6 rounded-xl border border-slate-700 overflow-hidden relative">
                    <motion.div
                      className="h-full w-full"
                      animate={{ backgroundColor: cetpParams.color }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Lab 5: Alternative Cropping & Conservation (SVG 4: Soil Profile & Conservation Bunding) */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    aria-label="Select Conventional Monoculture farming mode"
                    onClick={() => handleFarmingModeToggle('monoculture')}
                    className={`flex-1 p-3 rounded-2xl text-xs font-bold border transition-all ${
                      farmingMode === 'monoculture' ? 'bg-rose-950/60 border-rose-500 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    ⚠️ Conventional Monoculture (Bare Cotton)
                  </button>
                  <button
                    aria-label="Select Conservation Suite farming mode"
                    onClick={() => handleFarmingModeToggle('conservation')}
                    className={`flex-1 p-3 rounded-2xl text-xs font-bold border transition-all ${
                      farmingMode === 'conservation' ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🌿 Conservation Suite (Contour Bunding + Moong)
                  </button>
                </div>

                {/* SVG 4: Soil Conservation Cross-Section */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <svg viewBox="0 0 420 120" className="w-full h-28" role="img" aria-label="Soil cross-section comparing topsoil erosion under monoculture versus topsoil preservation with contour bunding">
                    {/* Soil base */}
                    <rect x="10" y="60" width="400" height="50" fill="#451a03" rx="4" />

                    {farmingMode === 'monoculture' ? (
                      <g>
                        {/* Washed off topsoil */}
                        <path d="M 10 60 Q 150 75, 410 85" fill="none" stroke="#78350f" strokeWidth="8" strokeDasharray="6 4" />
                        <text x="210" y="35" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">⚠️ High Runoff: Topsoil Washed Away (-100%)</text>
                        {/* Barren sparse plants */}
                        <line x1="100" y1="60" x2="100" y2="40" stroke="#a16207" strokeWidth="3" />
                        <line x1="250" y1="65" x2="250" y2="45" stroke="#a16207" strokeWidth="3" />
                      </g>
                    ) : (
                      <g>
                        {/* Rich topsoil layer protected by contour bunds */}
                        <rect x="10" y="45" width="400" height="20" fill="#14532d" rx="2" />
                        {/* Contour bund barriers */}
                        <polygon points="120,45 130,25 140,45" fill="#a16207" />
                        <polygon points="260,45 270,25 280,45" fill="#a16207" />
                        {/* Healthy legumes fixing nitrogen */}
                        <circle cx="80" cy="35" r="7" fill="#10b981" />
                        <circle cx="200" cy="35" r="7" fill="#10b981" />
                        <circle cx="330" cy="35" r="7" fill="#10b981" />
                        <text x="210" y="18" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">✓ Contour Bunds + Rhizobium Legumes (+35 kg N/ha)</text>
                      </g>
                    )}
                  </svg>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 text-center">
                    <p className="text-xs text-slate-400">Topsoil Runoff Loss</p>
                    <p className={`text-lg font-black ${farmingMode === 'conservation' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {farmingMode === 'conservation' ? '✓ -55% (Conserved)' : '✗ +100% (High Loss)'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 text-center">
                    <p className="text-xs text-slate-400">Biological N Fixation</p>
                    <p className={`text-lg font-black ${farmingMode === 'conservation' ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {farmingMode === 'conservation' ? '✓ +35 kg N/ha' : '✗ 0 kg (Urea needed)'}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 text-center">
                    <p className="text-xs text-slate-400">Soil Organic Carbon</p>
                    <p className={`text-lg font-black ${farmingMode === 'conservation' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {farmingMode === 'conservation' ? '✓ 0.75% (Healthy)' : '✗ 0.28% (Depleted)'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (Ungraded Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
            <h3 className="text-lg font-black text-white">Interactive Economy Sandbox</h3>
            <p className="text-xs text-slate-400 mt-1">Manipulate the national fiscal and sector dials freely. See how your policies reshape GDP and sustainability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400">GST / Corporate Tax Rate: {sandboxTaxRate}%</span>
              <input
                type="range"
                min={5}
                max={40}
                value={sandboxTaxRate}
                aria-label="GST and Corporate Tax Rate percentage slider"
                onChange={(e) => setSandboxTaxRate(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-[11px] text-slate-400">Revenue for PDS, roads, and national schools.</p>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-sky-400">Agri → Non-Farm Labour Shift: {sandboxFarmShift}%</span>
              <input
                type="range"
                min={0}
                max={30}
                value={sandboxFarmShift}
                aria-label="Labour shift percentage from Agriculture to Non-farm sector"
                onChange={(e) => setSandboxFarmShift(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
              <p className="text-[11px] text-slate-400">Absorbing disguised rural underemployment.</p>
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400">Green Subsidy (Solar & CETP): ₹{sandboxGreenSubsidy}k Cr</span>
              <input
                type="range"
                min={10}
                max={100}
                value={sandboxGreenSubsidy}
                aria-label="Green subsidy in thousands of crores"
                onChange={(e) => setSandboxGreenSubsidy(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-[11px] text-slate-400">Reduces coal fly ash and river pollution.</p>
            </div>
          </div>

          {/* Real-time Dynamic Gauge Output */}
          <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-slate-900 rounded-2xl">
              <p className="text-xs text-slate-400">Estimated GDP Growth</p>
              <p className="text-2xl font-black text-emerald-400">
                {(6.5 + (sandboxFarmShift * 0.12) - (sandboxTaxRate > 30 ? 0.8 : 0)).toFixed(1)}%
              </p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl">
              <p className="text-xs text-slate-400">River Pollution Index</p>
              <p className="text-2xl font-black text-sky-400">
                {Math.max(15, 100 - sandboxGreenSubsidy).toFixed(0)} / 100
              </p>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl">
              <p className="text-xs text-slate-400">Human Welfare Score</p>
              <p className="text-2xl font-black text-purple-400">
                {(50 + (sandboxTaxRate * 0.7) + (sandboxFarmShift * 0.8)).toFixed(0)} pts
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Ready for Challenges. Test your mastery."
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/60"
          >
            Ready for Challenges! Test Your Mastery →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive 22 Questions) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Progress & Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-bold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                  Competency: {challenge.competencyLevel.toUpperCase()}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-extrabold uppercase ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : difficulty === 'standard'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {difficulty}
                </motion.span>
              </div>
            </div>

            {/* Hint Trigger Button */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Get hint. Currently used ${hintCount} of 3 hints.`}
                onClick={showNextHint}
                disabled={answerRevealed || showExplanation}
                className="px-3 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/60 text-amber-300 text-xs font-bold disabled:opacity-40"
              >
                💡 Hint ({hintCount}/3)
              </motion.button>
            </div>
          </div>

          {/* Challenge Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-sky-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Box */}
          <div
            className={`p-6 bg-slate-900/90 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-5 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Type Render */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3" role="group" aria-label="Challenge answer options">
                {challenge.options.map((opt, i) => {
                  const isCorrect = i === challenge.correctIndex;
                  const isSelected = selectedOption === i;
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Answer choice ${i + 1}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all ${
                        showExplanation
                          ? isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : isSelected
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-950/50 border-slate-800 text-slate-500'
                          : 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-200 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {showExplanation && (
                          <span>
                            {isCorrect ? (
                              <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                            ) : isSelected ? (
                              <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                            ) : null}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Drag-Label Type Render */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800" role="group" aria-label="Available draggable labels">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable entity: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-grab shadow focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3" role="group" aria-label="Drop target functional roles">
                  {[
                    { id: 'role_spending', desc: '1. Spending Role for Final Use' },
                    { id: 'role_making', desc: '2. Combines Factors for Sale' },
                    { id: 'role_earning', desc: '3. Supplies Labour & Earns' },
                    { id: 'role_welfare', desc: '4. Taxes, Regulates & Protects' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      role="region"
                      aria-label={`Drop target for ${target.desc}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-xs text-slate-400">{target.desc}</span>
                      <span className="text-sm font-extrabold text-emerald-400 mt-1">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[ Drop Entity Here ]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify dragged entity labels"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type Render */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag/click items to reorder into chronological sequence:</p>
                <div className="space-y-2" role="group" aria-label="Reorderable sequence list">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Sequence position ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify operational sequence"
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Verify Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type Render */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    aria-label={`Enter calculated value in ${challenge.unit || 'units'}`}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    className="flex-1 p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Check calculated answer"
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type Render */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Available policy components">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`Add component: ${part}`}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px]">
                  <p className="text-[11px] text-slate-500 mb-2">Assembled Blueprint:</p>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((pt, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
                        {pt}
                        <button
                          aria-label={`Remove component ${pt}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, id) => id !== i))}
                          className="text-rose-400 font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600 italic">Click parts above to construct your policy</span>}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Verify constructed policy sequence"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                >
                  Verify Construct
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-2xl bg-amber-950/40 border border-amber-800/80 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Step-by-Step Reasoning
                  </span>
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-200 leading-relaxed"
                  >
                    <strong>Step {idx + 1}:</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Reveal next step of explanation"
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'View Blueprint Score' : 'Next Challenge'}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-lg shadow-emerald-950/60 mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'View Blueprint Score →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE (Motivational, Misconceptions, Reflection & SRS Visibility) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-700/60 shadow-2xl text-center space-y-2">
            <span className="text-3xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl font-black text-white">National Blueprint Completed!</h2>
            <p className="text-sm text-slate-300">
              Final Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Level: <strong className="text-sky-400 uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-xs uppercase font-bold text-emerald-400 mb-1">Performance Assessment</h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You possess complete mastery of Economic Entities, Sectoral Productivity, and Environmental Protection.'
                : errors <= 3
                ? 'Excellent work! You have strong conceptual grasp over the three central problems and circular flows. Review the few missed items below.'
                : 'Good effort! Economics requires connecting definitions with data. Study the Misconception Profile below to reinforce your foundational knowledge.'}
            </p>
          </div>

          {/* ─── SPACED REPETITION SCHEDULE CARD (Explicit Student Visibility) ─── */}
          <div className="p-5 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 rounded-3xl border border-amber-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl" aria-hidden="true">📅</span>
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">Spaced Repetition Review Schedule</h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                SM-2 Adaptive Algorithm
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Target Retention Window:</p>
                <p className="text-base font-extrabold text-white mt-0.5">
                  Recommendation: <span className="text-amber-400 font-black underline">
                    {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {errors === 0
                    ? '0 errors logged: High memory strength. Long-term consolidation scheduled in 7 days.'
                    : errors <= 3
                    ? `${errors} errors logged: Moderate retention. Intermediate recall reinforcement scheduled in 3 days.`
                    : `${errors} errors logged: Foundational review required. Short-term refresh scheduled in 1 day.`}
                </p>
              </div>

              <div className="flex gap-2">
                <div className={`p-2.5 rounded-xl border text-center ${errors === 0 ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <p className="text-[10px]">0 Errors</p>
                  <p className="text-xs font-mono">review in 7 days</p>
                </div>
                <div className={`p-2.5 rounded-xl border text-center ${errors >= 1 && errors <= 3 ? 'bg-amber-950 border-amber-500 text-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <p className="text-[10px]">1-3 Errors</p>
                  <p className="text-xs font-mono">review in 3 days</p>
                </div>
                <div className={`p-2.5 rounded-xl border text-center ${errors >= 4 ? 'bg-rose-950 border-rose-500 text-rose-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <p className="text-[10px]">4+ Errors</p>
                  <p className="text-xs font-mono">review in 1 day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h4 className="text-xs uppercase font-bold text-rose-300">Your Misconception Diagnosis:</h4>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 space-y-1">
                    <p className="text-xs text-rose-300 font-bold">✗ {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">🗺️</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                  {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Economic Challenge Solved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_EconApplicationsEconomicEntitiesConsumerSim;