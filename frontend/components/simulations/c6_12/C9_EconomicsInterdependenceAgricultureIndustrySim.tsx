'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE DECLARATIONS ───
const NODE_C9_ECON_031 = 'c9_econ_031';
const NODE_C9_ECON_032 = 'c9_econ_032';
const NODE_C9_ECON_033 = 'c9_econ_033';
const NODE_C9_ECON_034 = 'c9_econ_034';
const NODE_C9_ECON_035 = 'c9_econ_035';
const NODE_C9_ECON_036 = 'c9_econ_036';
const NODE_C9_ECON_037 = 'c9_econ_037';
const NODE_C9_ECON_038 = 'c9_econ_038';
const NODE_C9_ECON_039 = 'c9_econ_039';
const NODE_C9_ECON_040 = 'c9_econ_040';

const ALL_NODE_IDS = [
  NODE_C9_ECON_031,
  NODE_C9_ECON_032,
  NODE_C9_ECON_033,
  NODE_C9_ECON_034,
  NODE_C9_ECON_035,
  NODE_C9_ECON_036,
  NODE_C9_ECON_037,
  NODE_C9_ECON_038,
  NODE_C9_ECON_039,
  NODE_C9_ECON_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Vikaspur Economic Transformation Mission',
  intro: 'Welcome, Economic Planning Officer. The district of Vikaspur represents the real Indian economy in miniature: cotton and sugarcane farmers in the rural belt, agro-processing and manufacturing clusters in the industrial hub, an expanding service sector in the city, and deep structural challenges of poverty and unemployment.',
  context: 'Your task is to steer Vikaspur through industrial growth without ecological collapse, build essential social and economic infrastructure, and dismantle the structural vicious circles of poverty and unemployment.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If a severe drought cuts Vikaspur’s agricultural output by 40%, what happens to the city’s tractor factories and textile mills?',
  options: [
    'Nothing — factories depend on machines, not farms',
    'Tractor sales crash and textile mills face severe raw material shortages',
    'Industrial output doubles because farmers migrate to work in factories',
    'Only the service sector is affected because banks stop lending',
  ],
  correctIndex: 1,
  hintAfter: 'Agriculture and industry are deeply interdependent: farms supply raw materials and buy industrial tools!',
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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (8 items) ---
  {
    id: 'ch_01_fnd',
    nodeId: NODE_C9_ECON_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is the BEST example of a forward linkage from agriculture to industry?',
    options: [
      'Mahindra selling 27-HP tractors to farmers in Rajkot',
      'Cotton grown in Gujarat feeding spinning and weaving mills in Surat and Coimbatore',
      'IFFCO providing subsidised urea and DAP fertilisers to wheat farmers',
      'Farmers buying Hero MotoCorp two-wheelers using bumper harvest profits',
    ],
    correctIndex: 1,
    explanation: 'A forward linkage occurs when agricultural output becomes the raw material input for industrial manufacturing. Raw cotton feeding textile mills is a classic forward linkage.',
    hints: [
      'Look for the flow where farm produce moves FORWARD into a factory.',
      'Tractors and fertilisers are industrial inputs sold to farms (backward from industry).',
      'Raw cotton is transformed by textile mills into yarn and cloth.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_fnd',
    nodeId: NODE_C9_ECON_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which comprehensive environmental umbrella legislation was enacted directly in response to the 1984 Bhopal Gas Tragedy?',
    options: [
      'The Water (Prevention and Control of Pollution) Act 1974',
      'The Air (Prevention and Control of Pollution) Act 1981',
      'The Environment Protection Act 1986',
      'The National Green Tribunal Act 2010',
    ],
    correctIndex: 2,
    explanation: 'The Environment Protection Act 1986 was enacted by the Indian Parliament as an overarching umbrella law immediately following the catastrophic Union Carbide methyl isocyanate gas leak in Bhopal.',
    hints: [
      'The disaster occurred in December 1984.',
      'Prior acts covered only air or water in isolation; an umbrella act was needed.',
      'Parliament passed this comprehensive act in 1986.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_fnd',
    nodeId: NODE_C9_ECON_033,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are education and healthcare classified as "social infrastructure" rather than "economic infrastructure"?',
    options: [
      'Because they are completely free and funded only by charitable trusts',
      'Because they build human capabilities and capital rather than moving physical goods and finance directly',
      'Because they belong to the primary sector of the economy',
      'Because they do not contribute to India’s Gross Domestic Product',
    ],
    correctIndex: 1,
    explanation: 'Social infrastructure (schools, hospitals) builds human capital (knowledge, skills, health), whereas economic infrastructure (railways, banks, warehouses) facilitates the production and distribution of physical goods.',
    hints: [
      'Think about whether schools produce physical roads or developed human minds.',
      'Human capital formation is the direct goal of education and health.',
      'Social services develop people, whereas economic services move materials and money.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_fnd',
    nodeId: NODE_C9_ECON_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary economic difference between Banking and Insurance services?',
    options: [
      'Banking provides risk pooling; insurance provides credit creation',
      'Banking mobilises deposits and extends loans; insurance pools premiums to compensate for uncertain contingent losses',
      'Banking is run exclusively by private companies; insurance is run only by the Reserve Bank of India',
      'Banking handles physical goods; insurance handles digital currency only',
    ],
    correctIndex: 1,
    explanation: 'Banking acts as a financial intermediary (deposits to loans), while insurance provides risk pooling (premiums collected from many to compensate the few who suffer losses).',
    hints: [
      'A bank loan must be repaid with interest; an insurance claim payout is not repaid.',
      'Banks intermediate between savers and borrowers.',
      'Insurance pools risks across large populations.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_fnd',
    nodeId: NODE_C9_ECON_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the daily per-capita minimum calorie intake norms established for rural and urban areas in India?',
    options: [
      '2100 kcal rural and 2400 kcal urban',
      '2400 kcal rural and 2100 kcal urban',
      '2000 kcal rural and 2000 kcal urban',
      '2800 kcal rural and 2400 kcal urban',
    ],
    correctIndex: 1,
    explanation: 'The Planning Commission Task Forces fixed 2400 kcal/person/day for rural areas and 2100 kcal/person/day for urban areas due to the higher physical exertion in rural agricultural labor.',
    hints: [
      'Rural workers perform heavy manual agricultural labor like ploughing and harvesting.',
      'Higher physical exertion requires more caloric energy.',
      'The rural norm is 300 kcal higher than the urban norm.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_fnd',
    nodeId: NODE_C9_ECON_037,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental difference between Absolute Poverty and Relative Poverty?',
    options: [
      'Absolute poverty is found only in cities; relative poverty exists only in villages',
      'Absolute poverty is measured against a fixed physical survival floor (calorie/basket line); relative poverty is measured as comparative inequality against median societal living standards',
      'Absolute poverty decreases when taxes rise; relative poverty never changes',
      'Absolute poverty refers to lack of luxury goods; relative poverty refers to starvation',
    ],
    correctIndex: 1,
    explanation: 'Absolute poverty concerns biological survival below a fixed threshold, while relative poverty measures social inequality and exclusion compared against the prevailing median living standard of that society.',
    hints: [
      'Think of a fixed minimum survival basket vs comparing your income with your neighbors.',
      'Absolute poverty threshold does not move as society becomes rich.',
      'Relative poverty is linked to median income (e.g. < 60% of median).',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_07_fnd',
    nodeId: NODE_C9_ECON_039,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A paddy farm laborer in West Bengal gets agricultural employment for 120 days during sowing and harvesting, and remains idle for the other 245 days. What type of unemployment is this?',
    options: [
      'Technological unemployment',
      'Seasonal unemployment',
      'Frictional unemployment',
      'Voluntary unemployment',
    ],
    correctIndex: 1,
    explanation: 'Seasonal unemployment occurs when employment is tied to natural seasonal cycles of agriculture, tourism, or agro-mills, leaving workers idle during off-peak periods.',
    hints: [
      'Work depends on the monsoon and agricultural cropping cycles.',
      'Paddy sowing and harvesting occur at specific times of the year.',
      'MGNREGA 100-day wage guarantee was explicitly designed to buffer this off-season gap.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_08_fnd',
    nodeId: NODE_C9_ECON_034,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the economic infrastructure service to its flagship Indian apex institution.',
    dragItems: [
      { label: 'Indian Railways', targetId: 'slot_transport' },
      { label: 'State Bank of India', targetId: 'slot_banking' },
      { label: 'Life Insurance Corp', targetId: 'slot_insurance' },
      { label: 'Central Warehousing Corp', targetId: 'slot_storage' },
    ],
    correctMapping: {
      slot_transport: 'Indian Railways',
      slot_banking: 'State Bank of India',
      slot_insurance: 'Life Insurance Corp',
      slot_storage: 'Central Warehousing Corp',
    },
    explanation: 'Indian Railways moves freight/passengers, SBI intermediates credit, LIC pools life risk, and CWC provides warehousing receipts and grain storage.',
    hints: [
      'Think about which entity owns tracks and wagons vs which manages grain godowns.',
      'SBI is the largest commercial bank in India.',
      'CWC stands for Central Warehousing Corporation.',
    ],
  },

  // --- STANDARD (8 items) ---
  {
    id: 'ch_09_std',
    nodeId: NODE_C9_ECON_035,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'According to the Economic Survey, the tertiary sector contributes ~54% of India’s GVA but employs only ~31% of the workforce, whereas agriculture contributes ~18% of GVA but employs ~45% of workers. What does this reveal?',
    options: [
      'Agriculture is significantly more productive per worker than the service sector',
      'Tertiary sector has high labor productivity, while agriculture suffers from low worker productivity and disguised unemployment',
      'India should immediately shut down all IT companies to rebalance the labor force',
      'The service sector produces only physical agricultural machinery',
    ],
    correctIndex: 1,
    explanation: 'A 54% GVA share from 31% workers indicates high output per worker in services (productivity ratio > 1.7), while 18% GVA from 45% workers reveals low labor productivity in agriculture (ratio 0.40) and massive disguised unemployment.',
    hints: [
      'Calculate output per worker: GVA Share divided by Employment Share.',
      'Services: 54 / 31 = 1.74 (high value-added per worker).',
      'Agriculture: 18 / 45.5 = 0.40 (low value-added, overcrowded fields).',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_10_std',
    nodeId: NODE_C9_ECON_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the Rangarajan Committee poverty line, the rural threshold is ₹1,407 per capita/month. A rural family of 6 in Bihar has a total monthly consumption expenditure of ₹7,800. What is their monthly per-capita expenditure in ₹?',
    correctAnswer: 1300,
    tolerance: 5,
    unit: '₹/person',
    explanation: 'Per-capita monthly expenditure = Total Household Expenditure ÷ Number of Members = ₹7,800 ÷ 6 = ₹1,300. Since ₹1,300 < ₹1,407, the household is classified as Below Poverty Line (BPL).',
    hints: [
      'Divide the total family consumption by the total number of members.',
      'Calculation: 7800 / 6 = ?',
      '7800 divided by 6 is exactly 1300.',
    ],
  },
  {
    id: 'ch_11_std',
    nodeId: NODE_C9_ECON_038,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of Ragnar Nurkse’s "Vicious Circle of Poverty" in logical order starting from Low Income.',
    sortItems: [
      'Low Income Level',
      'Low Capacity to Save',
      'Low Investment & Capital Formation',
      'Low Labor and Farm Productivity',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Nurkse’s vicious circle operates as: Low Income → Low Saving → Low Capital Investment → Low Productivity → Low Income (loop closes). Planned public investment is required to break this loop.',
    hints: [
      'When families earn little, they spend everything on basic food and cannot save.',
      'Without savings, there are no investable funds for machinery and irrigation.',
      'Lack of capital equipment keeps labor productivity low, resulting in low wages.',
    ],
  },
  {
    id: 'ch_12_std',
    nodeId: NODE_C9_ECON_039,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Between 2000 and 2020, State Bank of India halved its clerical workforce from 2 lakh to 1 lakh while installing 4 lakh ATMs and integrating UPI. What specific form of unemployment did this cause?',
    options: [
      'Seasonal unemployment',
      'Technological unemployment (a specific form of structural unemployment)',
      'Cyclical demand-deficient unemployment',
      'Frictional voluntary unemployment',
    ],
    correctIndex: 1,
    explanation: 'Automating manual passbook printing, ledger entries, and cash dispensing with ATMs and software directly replaced human clerical labour with machines — the textbook definition of technological unemployment.',
    hints: [
      'Machines (ATMs, UPI algorithms) directly took over manual human tasks.',
      'It is a structural mismatch specifically caused by rapid automation.',
      'Technological replacement of routine clerical staff.',
    ],
  },
  {
    id: 'ch_13_std',
    nodeId: NODE_C9_ECON_040,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In India, 6 million youth enter the formal labor force annually, but modern industry and formal services create only 2 million jobs per year. How many million unabsorbed job-seekers accumulate over a 5-year period?',
    correctAnswer: 20,
    tolerance: 0.5,
    unit: 'million',
    explanation: 'Annual labor supply gap = 6 million − 2 million = 4 million unabsorbed job-seekers per year. Over 5 years: 4 million × 5 = 20 million youth.',
    hints: [
      'Find the annual gap first: Entrants minus New Jobs Created.',
      'Annual gap = 6 - 2 = 4 million/year.',
      'Multiply by 5 years: 4 * 5 = ?',
    ],
  },
  {
    id: 'ch_14_std',
    nodeId: NODE_C9_ECON_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the primary difference between Afforestation and Reforestation under Indian ecological policy?',
    options: [
      'Afforestation is done in private gardens; reforestation is done by the Forest Department',
      'Afforestation means planting trees on land that was NOT previously forested; reforestation means restoring tree cover on degraded or cleared forest land',
      'Afforestation uses only eucalyptus trees; reforestation uses only bamboo',
      'Afforestation is banned by the NGT; reforestation is mandatory',
    ],
    correctIndex: 1,
    explanation: 'Afforestation establishes a new forest on non-forest lands (creating new carbon sinks), while reforestation replants tree canopy where forests were previously degraded or harvested.',
    hints: [
      'Prefix "Re-" means doing something again on previously forested land.',
      'Afforestation converts non-forest land into newly forested areas.',
      'CAMPA and Green India Mission target both, but definitions remain distinct.',
    ],
  },
  {
    id: 'ch_15_std',
    nodeId: NODE_C9_ECON_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A family in urban Bengaluru earns ₹40,000/month. The urban survival poverty line is ₹1,000/person (₹5,000 total for 5 members). The median Bengaluru household income is ₹80,000/month. Using the international 60% of median standard, classify this family.',
    options: [
      'Both Absolutely and Relatively Poor',
      'Not Absolutely Poor, but Relatively Poor (₹40,000 < 60% of ₹80,000 = ₹48,000)',
      'Absolutely Poor, but not Relatively Poor',
      'Neither Absolutely nor Relatively Poor',
    ],
    correctIndex: 1,
    explanation: 'Per-capita income ₹8,000 > ₹1,000 (Not Absolutely Poor). However, ₹40,000 is less than ₹48,000 (60% of median ₹80,000), making them Relatively Poor due to exclusion from standard urban amenities like private healthcare/schooling.',
    hints: [
      'Test 1 (Absolute): Is ₹40,000 > ₹5,000? Yes → Not absolutely poor.',
      'Test 2 (Relative): What is 60% of ₹80,000? It is ₹48,000.',
      'Is ₹40,000 < ₹48,000? Yes → Relatively poor.',
    ],
  },
  {
    id: 'ch_16_std',
    nodeId: NODE_C9_ECON_031,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the two-way circular flow sequence connecting rural farm income to industrial manufacturing growth.',
    availableParts: ['Bumper Monsoon Harvest', 'High Farmer Incomes', 'Surplus Demand for Two-Wheelers & FMCG', 'Industrial Factory Expansion'],
    targetState: 'Bumper Monsoon Harvest High Farmer Incomes Surplus Demand for Two-Wheelers & FMCG Industrial Factory Expansion',
    validationHint: 'Connect agricultural output to rural purchasing power and factory demand.',
    explanation: 'A successful harvest generates rural disposable income, driving consumer demand for manufactured goods (Hero bikes, HUL soaps, UltraTech cement), prompting industrial factory expansions.',
    hints: [
      'Start with the agricultural output condition (Monsoon Harvest).',
      'Next comes farm income growth.',
      'Then rural purchasing of consumer durables and FMCG, driving industrial production.',
    ],
  },

  // --- ADVANCED (8 items) ---
  {
    id: 'ch_17_adv',
    nodeId: NODE_C9_ECON_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does the coexistence of 1.5 million annual engineering graduates and thousands of unfilled IT/robotics job vacancies in Bengaluru illustrate Structural Unemployment rather than General Demand Deficiency?',
    options: [
      'Because engineers refuse to work for any salary below ₹1 crore',
      'Because colleges teach outdated syllabi while industries demand AI, cloud computing, and advanced coding (a qualitative skill mismatch)',
      'Because IT companies are legally prohibited from hiring Indian engineers',
      'Because all engineering graduates are classified as "not in the labor force"',
    ],
    correctIndex: 1,
    explanation: 'Structural unemployment occurs when jobs exist and workers exist, but their skills or locations do not align. ASER and Wheebox report only ~45% graduate employability due to curriculum-industry divergence.',
    hints: [
      'Jobs are vacant simultaneously while job-seekers holding degrees are unemployed.',
      'Think about whether the problem is lack of vacancies or lack of matching skills.',
      'Wheebox employability data proves this skill mismatch.',
    ],
  },
  {
    id: 'ch_18_adv',
    nodeId: NODE_C9_ECON_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why Kerala (MPI poverty rate 0.55%) and Bihar (MPI poverty rate 51.91%) have vastly different poverty levels despite both having very high population densities.',
    options: [
      'Population density is the sole determinant of poverty; the survey data must be entirely fabricated',
      'Kerala broke the vicious circle through sustained historical investments in land reforms, universal literacy, and primary health, whereas eastern India lagged in social infrastructure and agrarian reform',
      'Bihar has no agricultural land, while Kerala produces 100% of India’s food grains',
      'Kerala banned all secondary and tertiary industries in 1956',
    ],
    correctIndex: 1,
    explanation: 'Poverty is not dictated by population alone; social capabilities, land reforms, schooling (SSA/RTE), and public health infrastructure determine whether a population becomes productive human capital or remains trapped in poverty.',
    hints: [
      'Does high population density always cause mass poverty?',
      'Kerala invested heavily in education and health (social infrastructure).',
      'Human capital formation empowers populations to overcome resource constraints.',
    ],
  },
  {
    id: 'ch_19_adv',
    nodeId: NODE_C9_ECON_032,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the landmark Niyamgiri Hills case (Odisha), why did the Supreme Court require Gram Sabha consent before allowing bauxite mining for Vedanta’s alumina refinery?',
    options: [
      'Because bauxite is not an economically useful mineral',
      'Because compensatory afforestation (CAMPA) cannot replace the unique biodiversity, sacred cultural heritage, and survival habitat of the Dongria Kondh tribe',
      'Because the state government wanted to import aluminium from Britain instead',
      'Because the refinery had already built zero-emission carbon scrubbers',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court recognized that monetary compensation or monoculture plantations cannot restore complex forest ecosystems and indigenous cultural rights protected under the Forest Rights Act 2006.',
    hints: [
      'Can planting rows of single-species eucalyptus replace an ancient sacred forest?',
      'Forests provide cultural, biological, and hydrological functions beyond timber value.',
      'The Dongria Kondh tribe has constitutionally recognized rights over Niyamgiri.',
    ],
  },
  {
    id: 'ch_20_adv',
    nodeId: NODE_C9_ECON_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did India’s post-independence structural transformation differ fundamentally from the classical developmental path observed in Western Europe, the US, and East Asia?',
    options: [
      'India transitioned from primary (agriculture) directly to tertiary (services) dominance in GDP share, skipping the manufacturing-dominated secondary phase',
      'India remained 100% dependent on British colonial imports with zero service growth',
      'India grew exclusively by exporting agricultural wheat and raw cotton to China',
      'India’s secondary manufacturing sector reached 75% of GDP by 1980',
    ],
    correctIndex: 0,
    explanation: 'Classical development moves from Agriculture → Heavy Manufacturing → Services. India leapfrogged from Agriculture directly to Service-sector dominance (~54% GVA), while Manufacturing remained modest at ~17% of GDP.',
    hints: [
      'Look at India’s manufacturing share (~17%) compared to its service share (~54%).',
      'Did India ever have a 45% manufacturing share like China or South Korea?',
      'India transitioned directly into a service/knowledge-led economic structure.',
    ],
  },
  {
    id: 'ch_21_adv',
    nodeId: NODE_C9_ECON_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A cotton farmer in Vidarbha deposits 20 quintals in a CWC warehouse. How does a Negotiable Warehouse Receipt (WDRA 2010) protect him from distress selling at harvest?',
    options: [
      'It forces the government to buy the cotton at triple the market price immediately',
      'He can pledge the receipt as legal collateral to SBI for an immediate low-interest loan, holding the physical crop until market prices rise in winter',
      'It converts the cotton into digital cryptocurrency that cannot lose value',
      'It exempts the farmer from ever repaying any agricultural bank loan',
    ],
    correctIndex: 1,
    explanation: 'Negotiable warehouse receipts turn stored agricultural commodities into liquid collateral, enabling farmers to secure bank credit for immediate cash needs rather than dumping crops during harvest-time price gluts.',
    hints: [
      'Harvest time sees heavy supply and low mandi prices.',
      'Warehousing allows timing the sale to months when prices recover.',
      'The receipt acts as collateral for a bank loan to cover immediate cash needs.',
    ],
  },
  {
    id: 'ch_22_adv',
    nodeId: NODE_C9_ECON_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does the adoption of 1,200 industrial welding robots in an Indian automobile plant present an economic paradox in a labour-surplus country?',
    options: [
      'Robots are legally banned from using electricity in Indian factories',
      'While robots increase private firm efficiency and quality, they displace manual jobs in an economy already facing an annual surplus of 4-5 million job-seekers',
      'Robots decrease factory output by 80% compared to manual workers',
      'Robots can only be operated if workers have agricultural land titles',
    ],
    correctIndex: 1,
    explanation: 'In a labor-surplus economy, private firms adopt capital-intensive automation to lower unit costs and ensure consistency, which inadvertently exacerbates aggregate technological unemployment and jobless growth.',
    hints: [
      'Think about private corporate profit vs national employment goals.',
      'India has millions of youth looking for work.',
      'Capital-intensive techniques reduce the employment elasticity of output growth.',
    ],
  },
  {
    id: 'ch_23_adv',
    nodeId: NODE_C9_ECON_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'Why are full-time students, homemakers, and discouraged workers who gave up job hunting NOT counted in the official Unemployment Rate?',
    options: [
      'Because they are automatically categorized as working in agriculture',
      'Because official unemployment requires both the capability AND active willingness/effort to seek work (they are "Not in the Labour Force")',
      'Because only people over 75 years of age are counted as unemployed',
      'Because the census only counts government employees',
    ],
    correctIndex: 1,
    explanation: 'The Labour Force comprises only the Employed + Unemployed (actively seeking). Those not seeking work are outside the labour force, which explains why a low headline unemployment rate can mask low female LFPR (~37%).',
    hints: [
      'Review the formula: Unemployment Rate = Unemployed ÷ Labour Force.',
      'Labour Force requires active job search.',
      'Discouraged workers drop out of the denominator entirely.',
    ],
  },
  {
    id: 'ch_24_adv',
    nodeId: NODE_C9_ECON_033,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the virtuous cycle of Human Capital Formation through social service investment.',
    availableParts: [
      'Public Spending on PM-JAY & PM-SHRI',
      'Improved Health & Technical Literacy',
      'Higher Workforce Labor Productivity',
      'Surging National GVA & Tax Revenues',
    ],
    targetState: 'Public Spending on PM-JAY & PM-SHRI Improved Health & Technical Literacy Higher Workforce Labor Productivity Surging National GVA & Tax Revenues',
    validationHint: 'Trace the progression from state budgetary allocation to national income growth.',
    explanation: 'Government investment in social infrastructure upgrades health and skills, raising worker output and taxable national income, which provides further fiscal capacity to fund schools and hospitals.',
    hints: [
      'Start with government policy schemes for education and healthcare.',
      'Next is the direct human capability upgrade (Health & Literacy).',
      'Then comes economic productivity, closing with national revenue growth.',
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
  nodeId: NODE_C9_ECON_031,
  title: 'Economics: Interdependence of Sectors, Poverty & Unemployment',
  definition: 'An integrated study of the two-way linkages between agriculture and industry, industrial externalities, social vs economic tertiary infrastructure, poverty measurement and distinction, and the structural causes of unemployment in India.',
  eli5: 'Think of the economy as a giant human body: agriculture and industry are the muscles feeding each other, services are the nervous system and highways connecting them, and poverty and unemployment are ailments we cure with education, healthcare, and smart policies.',
  misconceptions: [
    { misconception: 'Agriculture depends on industry, but industry can survive without agriculture.', correction: 'Agro-based industries (textiles, sugar, edible oils) depend entirely on farm raw materials, and rural demand drives industrial consumer goods.' },
    { misconception: 'Afforestation and reforestation mean the exact same thing.', correction: 'Afforestation creates new forests on lands not previously forested, while reforestation restores degraded forest canopy.' },
    { misconception: 'Education and healthcare are economic infrastructure because they help businesses.', correction: 'They are social infrastructure because their primary mechanism is building human capabilities (human capital), not transporting goods or processing money.' },
    { misconception: 'Banking and insurance are identical because both deal with currency.', correction: 'Banking provides financial intermediation (savings to credit); insurance provides risk pooling against unforeseen contingent disasters.' },
    { misconception: 'The poverty line is identical in rural and urban areas (2100 kcal everywhere).', correction: 'Rural norm is 2400 kcal/day (higher due to physical agricultural exertion); urban norm is 2100 kcal/day.' },
    { misconception: 'Relative poverty is just a milder form of absolute poverty.', correction: 'Absolute poverty is about biological survival against a fixed calorie floor; relative poverty is about societal income inequality and social exclusion.' },
    { misconception: 'Unemployment means simply not having a job.', correction: 'Unemployment requires being of working age, able to work, AND actively seeking employment at prevailing wages.' },
    { misconception: 'The tertiary sector is the largest employer in India because it contributes 54% of GDP.', correction: 'Tertiary produces 54% of GDP but employs only 31% of workers; agriculture employs 45% of workers with only 18% of GDP.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the rural daily calorie norm for the Indian poverty line?', options: ['2100 kcal', '2400 kcal', '2600 kcal', '1800 kcal'], correctIndex: 1 },
    { question: 'Which sector contributes the highest share to India’s Gross Value Added (GVA)?', options: ['Primary', 'Secondary', 'Tertiary', 'Foreign Sector'], correctIndex: 2 },
    { question: 'Under the Rangarajan poverty line, what is the monthly rural per capita threshold?', options: ['₹446', '₹972', '₹1,407', '₹2,500'], correctIndex: 2 },
    { question: 'What type of unemployment occurs when bank clerks are displaced by ATMs and UPI?', options: ['Seasonal', 'Structural / Technological', 'Frictional', 'Disguised'], correctIndex: 1 },
    { question: 'Which law was enacted as an umbrella act after the 1984 Bhopal Gas Tragedy?', options: ['Air Act 1981', 'Water Act 1974', 'Environment Protection Act 1986', 'CAMPA Act 2016'], correctIndex: 2 },
    { question: 'What term describes workers in agriculture whose marginal productivity is zero?', options: ['Technological unemployment', 'Disguised unemployment', 'Seasonal unemployment', 'Open unemployment'], correctIndex: 1 },
    { question: 'Which of the following is a social infrastructure service?', options: ['Indian Railways', 'State Bank of India', 'Sarva Shiksha Abhiyan / Schooling', 'Central Warehousing Corporation'], correctIndex: 2 },
    { question: 'Who formulated the "Vicious Circle of Poverty" theory?', options: ['Adam Smith', 'Ragnar Nurkse', 'Dadabhai Naoroji', 'Amartya Sen'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate deep conceptual mastery over sectoral interdependence, environmental trade-offs, service classification, poverty estimation formulas, and structural unemployment diagnosis.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Two-Way Flow of Agriculture & Industry',
    instruction: 'Adjust the Monsoon Harvest slider. Watch how agricultural supply feeds textile/sugar mills and how rural purchasing power drives factory production.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_ECON_031,
  },
  {
    title: 'Lab 2: Industrial Trade-Offs & Green Remediation',
    instruction: 'Increase factory output and toggle Effluent Treatment Plants (ETP) and Afforestation (CAMPA) to balance AQI and river cleanliness.',
    interactionType: 'toggle-balance',
    nodeId: NODE_C9_ECON_032,
  },
  {
    title: 'Lab 3: Tertiary Infrastructure Matrix',
    instruction: 'Click on economic and social service nodes to inspect how transport, banking, healthcare, and education power national development.',
    interactionType: 'click-matrix',
    nodeId: NODE_C9_ECON_034,
  },
  {
    title: 'Lab 4: The Calorie-Expenditure Poverty Calculator',
    instruction: 'Simulate household income, family size, and rural/urban location to calculate per-capita expenditure against Tendulkar and Rangarajan lines.',
    interactionType: 'poverty-calc',
    nodeId: NODE_C9_ECON_036,
  },
  {
    title: 'Lab 5: Labor Market Dynamics & Structural Unemployment',
    instruction: 'Change the automation level and education skill-match index to see why jobs remain vacant while educated youth face unemployment.',
    interactionType: 'labor-sim',
    nodeId: NODE_C9_ECON_040,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If rural monsoon harvest surges by 30%, what will happen to the sales of two-wheelers and FMCG products in Vikaspur?',
    options: [
      'Industrial consumer sales will drop as farmers eat all their money',
      'Industrial consumer sales will surge because higher farm incomes create strong rural consumer demand',
      'No change at all because farmers never purchase manufactured goods',
      'Tractor factories will shut down completely',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Monsoon slider to +30% in the simulation and observe the Rural Demand Gauge turn bright emerald.',
    nodeId: NODE_C9_ECON_031,
  },
  {
    question: 'Predict: If an automobile factory installs 500 robotic arms without expanding total vehicle demand, what happens to factory shop-floor employment?',
    options: [
      'Manual assembly jobs increase by 500%',
      'Employment per car produced falls, creating technological unemployment for routine manual labor',
      'Every worker gets promoted to senior AI researcher automatically',
      'The factory requires zero electricity',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Automation level slider to 80% and observe the Manual Employment bar shrink.',
    nodeId: NODE_C9_ECON_039,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between rural farm harvest and industrial tractor/machinery utilization?',
    observableOptions: [
      'They move in opposite directions',
      'They move in lockstep: higher harvests boost farm savings, expanding demand for tractors and agro-chemicals',
      'Industrial machinery is only purchased during severe droughts',
      'Farms only supply gold to factories',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_ECON_031,
  },
  {
    question: 'In the poverty simulation, what happens when a family of 6 with ₹7,800 monthly budget adds a 7th dependent member without increasing income?',
    observableOptions: [
      'Per-capita expenditure drops from ₹1,300 to ₹1,114, pushing them deeper below the Rangarajan poverty line',
      'Per-capita expenditure increases automatically',
      'The poverty line shifts to zero',
      'The family is reclassified as urban elite',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_ECON_036,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Vikaspur Economic Diagnostic & Strategy Brief',
  description: 'Act as the Lead District Economic Advisor. Prepare a brief identifying one agro-industry linkage, one social infrastructure priority, and one strategy to resolve youth structural unemployment in your home district.',
  steps: [
    'Identify your district’s primary agricultural crop (e.g., cotton, sugarcane, paddy, mustard) and trace which factory cluster processes it.',
    'Examine whether local hospitals and schools have reduced out-of-pocket medical debt and upgraded local digital skills.',
    'Propose a skill-training partnership (like Skill India / ITI) matching local youth with emerging services or agro-processing jobs.',
    'Present your 3-point economic resilience plan to your class or study group.',
  ],
};

// ─── MOTIVATIONAL FEEDBACK HELPER ───
const getMotivationalFeedback = (errCount: number) => {
  if (errCount === 0) {
    return {
      title: 'PERFECT SCORE!',
      badge: '🏆 Flawless Economic Officer',
      desc: 'Outstanding mastery! You identified every intersectoral linkage, policy regulation, and poverty threshold without a single error.',
      color: 'text-emerald-400',
      srsReviewDays: 7,
    };
  }
  if (errCount <= 3) {
    return {
      title: 'Great work!',
      badge: '⭐ Skilled Policy Planner',
      desc: 'Very strong analytical thinking! You demonstrated sound grasp over economic infrastructure and labor market mismatches.',
      color: 'text-sky-400',
      srsReviewDays: 3,
    };
  }
  return {
    title: 'Good effort — Practice makes permanent!',
    badge: '📈 Developing Economist',
    desc: 'Good progress! Review Nurkse’s vicious circle and the difference between absolute vs relative poverty to solidify your foundations.',
    color: 'text-amber-400',
    srsReviewDays: 1,
  };
};

// ─── MAIN COMPONENT ───
export default function C9_EconomicsInterdependenceAgricultureIndustrySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['commerce'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style Interactive Exploration & Sandbox States
  const [monsoonIndex, setMonsoonIndex] = useState<number>(70); // 0 to 100
  const [industrialOutput, setIndustrialOutput] = useState<number>(60); // 0 to 100
  const [etpEnabled, setEtpEnabled] = useState<boolean>(true);
  const [afforestationBudget, setAfforestationBudget] = useState<number>(50); // in crore ₹
  const [selectedTertiaryNode, setSelectedTertiaryNode] = useState<'transport' | 'banking' | 'insurance' | 'education' | 'health'>('transport');
  
  // Poverty Lab State
  const [householdIncome, setHouseholdIncome] = useState<number>(8500);
  const [familyMembers, setFamilyMembers] = useState<number>(5);
  const [isUrban, setIsUrban] = useState<boolean>(false);

  // Labor & Unemployment Lab State
  const [automationLevel, setAutomationLevel] = useState<number>(30); // %
  const [skillCurriculumMatch, setSkillCurriculumMatch] = useState<number>(45); // %

  // Predict & Observe state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Challenge & Evaluation state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag and drop & Interactive challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection Inputs
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs for BKT and Auto-Hint Timer
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATION ───
  const rawMaterialSupply = useMemo(() => Math.round(monsoonIndex * 1.2), [monsoonIndex]);
  const ruralIncomeLevel = useMemo(() => Math.round(monsoonIndex * 150 + 2000), [monsoonIndex]);
  const tractorSalesIndex = useMemo(() => Math.round(monsoonIndex * 0.9 + 20), [monsoonIndex]);
  const fmcgDemandIndex = useMemo(() => Math.round((ruralIncomeLevel / 17000) * 100), [ruralIncomeLevel]);

  // AQI and Water Quality Model
  const calculatedAQI = useMemo(() => {
    const basePollution = industrialOutput * 3.8;
    const treeMitigation = afforestationBudget * 1.4;
    return Math.max(35, Math.min(480, Math.round(basePollution - treeMitigation + 50)));
  }, [industrialOutput, afforestationBudget]);

  const riverPollutionScore = useMemo(() => {
    if (etpEnabled) return Math.max(10, Math.round(industrialOutput * 0.3));
    return Math.min(100, Math.round(industrialOutput * 1.1));
  }, [industrialOutput, etpEnabled]);

  // Poverty Calculations
  const calculatedPerCapita = useMemo(() => {
    if (familyMembers <= 0) return 0;
    return Math.round(householdIncome / familyMembers);
  }, [householdIncome, familyMembers]);

  const activeRangarajanLine = useMemo(() => (isUrban ? 972 : 1407), [isUrban]);
  const isBPL = useMemo(() => calculatedPerCapita < activeRangarajanLine, [calculatedPerCapita, activeRangarajanLine]);

  // Unemployment Model
  const manualJobsAvailable = useMemo(() => Math.max(10, Math.round(100 - automationLevel * 0.85)), [automationLevel]);
  const graduateEmployabilityRate = useMemo(() => Math.round(skillCurriculumMatch * 0.85), [skillCurriculumMatch]);
  const structuralUnemploymentRate = useMemo(() => Math.max(5, Math.round(100 - graduateEmployabilityRate)), [graduateEmployabilityRate]);

  // Chart Data for Sectoral Transformation
  const sectoralTransformationData = [
    { period: '1950s', Primary: 55, Secondary: 15, Tertiary: 30 },
    { period: '1990s', Primary: 30, Secondary: 25, Tertiary: 45 },
    { period: '2023', Primary: 18, Secondary: 28, Tertiary: 54 },
  ];

  // ─── FILTERED CHALLENGES BY DIFFICULTY ─��─
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── PERSISTENT MASTERY INITIALIZATION ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT SCORE EVOLUTION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const nextDiff = mastery === 'not-started' || mastery === 'beginner'
      ? 'foundation'
      : mastery === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== nextDiff) {
        setCurrentChallenge(0);
        return nextDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D ANIMATION (CIRCULAR FLOW OF GOODS) ───
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw animated particle flow from Agriculture to Industry
      const flowSpeed = (monsoonIndex / 100) * 3 + 0.5;
      const particleX = (frame * flowSpeed) % (canvas.width - 60) + 30;

      ctx.fillStyle = '#10b981'; // Farm green
      ctx.beginPath();
      ctx.arc(particleX, 25, 6, 0, Math.PI * 2);
      ctx.fill();

      // Return flow particle (Factory tools/FMCG to Farms)
      const returnParticleX = canvas.width - ((frame * flowSpeed * 0.9) % (canvas.width - 60)) - 30;
      ctx.fillStyle = '#38bdf8'; // Industrial cyan
      ctx.beginPath();
      ctx.arc(returnParticleX, 55, 6, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.font = '11px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Raw Material Flow (${rawMaterialSupply}k tons)`, 30, 20);
      ctx.fillText(`Industrial Goods & Credit Flow`, canvas.width - 200, 70);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, monsoonIndex, rawMaterialSupply]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete economic rationale together.');
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the variables and observe how the real economy responds.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test extreme economic scenarios with no grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us test your analytical expertise with official ICSE board challenges.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now drag the sliders in the simulator to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise observation! That is the core economic linkage.' : 'Take another close look at the data gauges.');
  }, []);

  // ─── TOGGLE HANDLERS ───
  const handleEtpToggle = useCallback(() => {
    setEtpEnabled(prev => !prev);
    audioManager.play('tap');
  }, []);

  const handleLocationToggle = useCallback((urbanVal: boolean) => {
    setIsUrban(urbanVal);
    audioManager.play('tap');
  }, []);

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
    if (isMatch) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === (challenge.sortItems?.length || 0)
        ? [...prev]
        : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the interdependence of sectors, poverty dynamics, and structural employment solutions.');
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
  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant analysis! Completely accurate.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us review the fundamental principle together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const motivationalData = useMemo(() => getMotivationalFeedback(errors), [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-emerald-400 font-medium">
              ICSE Class 9 Economics • Commercial & Social Development Hub
            </p>
          </div>
        </div>

        {/* Phase Badges & Difficulty Level */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : difficulty === 'standard'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            Phase: {phase.toUpperCase()}
          </span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Scenario Box */}
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="p-5 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/50 rounded-2xl border border-emerald-800/60 shadow-lg"
          >
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm tracking-wide uppercase">
              <span aria-hidden="true">🏛️</span> {SCENARIO.title}
            </div>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">
              {SCENARIO.intro}
            </p>
            <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-emerald-900/50 text-xs text-emerald-300 font-medium">
              ⚡ Challenge Goal: {SCENARIO.context}
            </div>
          </motion.div>

          {/* TOPIC-SPECIFIC SVG 1: Circular Flow of Sectoral Interdependence */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <span>📊</span> DIAGRAM 1: Two-Way Agro-Industrial Interdependence Flow
            </h3>
            <div className="w-full overflow-hidden bg-slate-950 rounded-xl p-3 border border-slate-800">
              <svg viewBox="0 0 650 180" className="w-full h-auto text-xs" aria-label="Agro-industrial circular interdependence diagram">
                <rect x="20" y="30" width="160" height="110" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="100" y="60" fill="#a7f3d0" fontWeight="bold" textAnchor="middle" fontSize="13">AGRICULTURE</text>
                <text x="100" y="82" fill="#6ee7b7" textAnchor="middle" fontSize="10">Raw Cotton, Cane, Oilseeds</text>
                <text x="100" y="102" fill="#d1fae5" textAnchor="middle" fontSize="10">Food grains for urban labor</text>
                <text x="100" y="122" fill="#6ee7b7" textAnchor="middle" fontSize="10">Rural purchasing market</text>

                <rect x="470" y="30" width="160" height="110" rx="12" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="550" y="60" fill="#bae6fd" fontWeight="bold" textAnchor="middle" fontSize="13">INDUSTRY</text>
                <text x="550" y="82" fill="#7dd3fc" textAnchor="middle" fontSize="10">Tractors, Pumps, Tools</text>
                <text x="550" y="102" fill="#e0f2fe" textAnchor="middle" fontSize="10">Chemical Fertilisers & DAP</text>
                <text x="550" y="122" fill="#7dd3fc" textAnchor="middle" fontSize="10">Consumer Durables & FMCG</text>

                {/* Forward Linkage Arrow */}
                <path d="M 185 55 L 460 55" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowGreen)" strokeDasharray="6 3" />
                <text x="325" y="45" fill="#34d399" textAnchor="middle" fontWeight="bold" fontSize="10">FORWARD LINKAGE: Raw Materials → Factories</text>

                {/* Backward Linkage Arrow */}
                <path d="M 460 115 L 185 115" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowCyan)" strokeDasharray="6 3" />
                <text x="325" y="132" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="10">BACKWARD LINKAGE: Machinery & Inputs → Farms</text>

                <defs>
                  <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                  </marker>
                  <marker id="arrowCyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 10 0 L 0 5 L 10 10 z" fill="#38bdf8" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span aria-hidden="true">❓</span> Curiosity Hook (Ungraded Exploration)
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-slate-400">
                    {String.fromCharCode(65 + i)}.
                  </span>{' '}
                  {opt} {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && ' ✗'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
              >
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Exactly right!' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration Laboratories"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
                >
                  Step Inside The Economic Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Exploration Navigation Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                aria-label={`Switch to ${step.title}`}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                }`}
              >
                {idx + 1}. {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          {/* Active Lab Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-emerald-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs px-2.5 py-1 bg-slate-800 text-emerald-400 rounded-md font-mono border border-slate-700">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                👉 <span className="text-amber-300 font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>

              {/* ─── LAB 1: AGRO-INDUSTRY INTERDEPENDENCE ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800/60 space-y-2">
                      <p className="text-xs text-indigo-300 font-bold uppercase">Hypothesis Check:</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Select hypothesis option ${i + 1}`}
                            className="text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Canvas Animation Stream */}
                  <div className="relative bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-hidden">
                    <div className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">
                      <span>Real-Time Bi-Directional Flow Visualizer</span>
                      <span className="text-emerald-400 animate-pulse">● Live Engine</span>
                    </div>
                    <canvas ref={canvasRef} width={500} height={90} className="w-full rounded-lg bg-slate-900/60" />
                  </div>

                  {/* Monsoon Slider Control - Real-time instant connection */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor="monsoon-slider" className="font-bold text-slate-300">
                        Monsoon Rainfall & Harvest Index:
                      </label>
                      <span className={`font-mono font-bold ${monsoonIndex > 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {monsoonIndex}% ({monsoonIndex > 75 ? 'Bumper Crop' : monsoonIndex < 40 ? 'Drought Alert' : 'Normal Harvest'})
                      </span>
                    </div>
                    <input
                      id="monsoon-slider"
                      type="range"
                      min={10}
                      max={100}
                      value={monsoonIndex}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMonsoonIndex(val);
                        audioManager.play('count');
                        if (predictionMade && !predictionVerified && Math.abs(val - 70) > 15) {
                          setPredictionVerified(true);
                          audioManager.play('sparkle');
                        }
                      }}
                      aria-label="Monsoon Rainfall and Harvest Index Slider"
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Real-time Economic Gauges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Cotton / Cane Supply</span>
                      <p className="text-lg font-black text-emerald-300 mt-1">{rawMaterialSupply}k Bales</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                        <motion.div className="bg-emerald-500 h-1.5 rounded-full" animate={{ width: `${Math.min(100, rawMaterialSupply)}%` }} />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Avg Rural Farm Income</span>
                      <p className="text-lg font-black text-sky-300 mt-1">₹{ruralIncomeLevel.toLocaleString()}/mo</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                        <motion.div className="bg-sky-500 h-1.5 rounded-full" animate={{ width: `${Math.min(100, (ruralIncomeLevel / 17000) * 100)}%` }} />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Tractor & Pump Demand</span>
                      <p className="text-lg font-black text-amber-300 mt-1">{tractorSalesIndex} Units</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                        <motion.div className="bg-amber-500 h-1.5 rounded-full" animate={{ width: `${Math.min(100, tractorSalesIndex)}%` }} />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Rural FMCG Index</span>
                      <p className="text-lg font-black text-purple-300 mt-1">{fmcgDemandIndex} pts</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                        <motion.div className="bg-purple-500 h-1.5 rounded-full" animate={{ width: `${Math.min(100, fmcgDemandIndex)}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {predictionVerified && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/60 space-y-2"
                    >
                      <p className="text-xs text-emerald-400 font-bold uppercase">Scientific Observation:</p>
                      <p className="text-sm text-white font-medium">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation answer: ${opt}`}
                            className="w-full text-left p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: INDUSTRIAL EXTERNALITIES & ENVIRONMENT ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label htmlFor="factory-output-slider" className="text-xs font-bold text-slate-300">
                        Factory Production Output: {industrialOutput}%
                      </label>
                      <input
                        id="factory-output-slider"
                        type="range"
                        min={20}
                        max={100}
                        value={industrialOutput}
                        onChange={(e) => {
                          setIndustrialOutput(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Factory Production Output Slider"
                        className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs font-bold text-slate-300">Effluent Treatment Plant (ETP)</span>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleEtpToggle}
                        aria-label="Toggle Effluent Treatment Plant Status"
                        className={`py-2 px-3 rounded-lg text-xs font-bold transition-colors ${
                          etpEnabled ? 'bg-emerald-600 text-white' : 'bg-rose-700 text-white'
                        }`}
                      >
                        {etpEnabled ? '✓ ETP Operational (Water Act 1974)' : '✗ ETP Bypassed (Raw Effluent)'}
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label htmlFor="campa-slider" className="text-xs font-bold text-slate-300">
                        CAMPA Tree Budget: ₹{afforestationBudget} Cr
                      </label>
                      <input
                        id="campa-slider"
                        type="range"
                        min={0}
                        max={100}
                        value={afforestationBudget}
                        onChange={(e) => {
                          setAfforestationBudget(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="CAMPA Afforestation Budget Slider"
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Environmental Outcome Dashboard */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">National Air Quality Index (AQI):</span>
                        <span className={`font-mono font-bold ${calculatedAQI > 300 ? 'text-rose-400' : calculatedAQI > 150 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {calculatedAQI} ({calculatedAQI > 400 ? 'Severe ✗' : calculatedAQI > 300 ? 'Very Poor ✗' : calculatedAQI > 100 ? 'Moderate' : 'Good ✓'})
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${calculatedAQI > 300 ? 'bg-rose-500' : calculatedAQI > 150 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          animate={{ width: `${(calculatedAQI / 500) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        Primary Pollutants: SO₂ from coal boilers, PM2.5/PM10 soot. Regulated under Air Act 1981 & EPA 1986.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">River Toxicity Load:</span>
                        <span className={`font-mono font-bold ${riverPollutionScore > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {riverPollutionScore}% Contamination {riverPollutionScore > 50 ? '✗' : '✓'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${riverPollutionScore > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          animate={{ width: `${riverPollutionScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        {etpEnabled
                          ? '✓ Chromium & textile dyes neutralized via mandatory Effluent Treatment Plants.'
                          : '✗ Warning: Toxic heavy metals discharging directly into local water bodies! Violates Water Act 1974.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: TERTIARY INFRASTRUCTURE MATRIX ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* TOPIC-SPECIFIC SVG 2: Tertiary Sector Ecosystem Structure */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-300 block mb-2">
                      📊 DIAGRAM 2: Tertiary Service Architecture (Economic vs Social)
                    </span>
                    <svg viewBox="0 0 620 150" className="w-full h-auto text-xs" aria-label="Tertiary infrastructure economic versus social breakdown">
                      <rect x="15" y="15" width="285" height="120" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="157" y="38" fill="#38bdf8" fontWeight="bold" textAnchor="middle" fontSize="12">ECONOMIC INFRASTRUCTURE</text>
                      <text x="157" y="58" fill="#94a3b8" textAnchor="middle" fontSize="9">Direct Physical & Financial Facilitation</text>
                      <rect x="25" y="70" width="80" height="50" rx="6" fill="#1e293b" />
                      <text x="65" y="90" fill="#bae6fd" textAnchor="middle" fontSize="10">🚂 Transport</text>
                      <text x="65" y="108" fill="#64748b" textAnchor="middle" fontSize="8">Rail/Road/Ports</text>
                      <rect x="115" y="70" width="80" height="50" rx="6" fill="#1e293b" />
                      <text x="155" y="90" fill="#bae6fd" textAnchor="middle" fontSize="10">🏦 Banking</text>
                      <text x="155" y="108" fill="#64748b" textAnchor="middle" fontSize="8">Credit/SBI/RBI</text>
                      <rect x="205" y="70" width="85" height="50" rx="6" fill="#1e293b" />
                      <text x="247" y="90" fill="#bae6fd" textAnchor="middle" fontSize="10">🛡️ Insurance</text>
                      <text x="247" y="108" fill="#64748b" textAnchor="middle" fontSize="8">Risk Pooling</text>

                      <rect x="320" y="15" width="285" height="120" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="462" y="38" fill="#c084fc" fontWeight="bold" textAnchor="middle" fontSize="12">SOCIAL INFRASTRUCTURE</text>
                      <text x="462" y="58" fill="#94a3b8" textAnchor="middle" fontSize="9">Human Capital & Capability Upgrade</text>
                      <rect x="340" y="70" width="115" height="50" rx="6" fill="#1e293b" />
                      <text x="397" y="90" fill="#e9d5ff" textAnchor="middle" fontSize="10">🎓 Education</text>
                      <text x="397" y="108" fill="#64748b" textAnchor="middle" fontSize="8">RTE / NEP / Skill Dev</text>
                      <rect x="475" y="70" width="115" height="50" rx="6" fill="#1e293b" />
                      <text x="532" y="90" fill="#e9d5ff" textAnchor="middle" fontSize="10">🏥 Healthcare</text>
                      <text x="532" y="108" fill="#64748b" textAnchor="middle" fontSize="8">PM-JAY / Sanitation</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'transport' as const, label: '🚂 Transport', type: 'Economic', org: 'Indian Railways (1853)' },
                      { id: 'banking' as const, label: '🏦 Banking', type: 'Economic', org: 'SBI & RBI (1955/1935)' },
                      { id: 'insurance' as const, label: '🛡️ Insurance', type: 'Economic', org: 'LIC & PMFBY (1956/2016)' },
                      { id: 'education' as const, label: '🎓 Education', type: 'Social', org: 'SSA, RTE & NEP 2020' },
                      { id: 'health' as const, label: '🏥 Healthcare', type: 'Social', org: 'NHM & PM-JAY (2018)' },
                    ].map(node => (
                      <motion.button
                        key={node.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedTertiaryNode(node.id);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select tertiary infrastructure: ${node.label}`}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedTertiaryNode === node.id
                            ? 'bg-emerald-950/80 border-emerald-500 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-bold text-white block">{node.label}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono mt-1 inline-block">
                          {node.type}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic Inspector for Selected Tertiary Service */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    {selectedTertiaryNode === 'transport' && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-emerald-300">Transportation — Freight & Connectivity</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Indian Railways (68,000+ km route, 24 crore tons freight) & NHAI move raw cotton to Surat and finished grain to PDS godowns. Reduces spatial transaction barriers.
                        </p>
                      </div>
                    )}
                    {selectedTertiaryNode === 'banking' && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-sky-300">Banking — Financial Intermediation</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Mobilizes household savings to fund Kisan Credit Cards (4% subsidized rate) and MSME credit, eliminating extortionate village moneylenders charging 36% interest.
                        </p>
                      </div>
                    )}
                    {selectedTertiaryNode === 'insurance' && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-amber-300">Insurance — Risk Pooling Mechanism</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          LIC (63% market share) and PMFBY collect premiums from millions to shield farmers from total bankruptcy when floods or pest attacks destroy crops.
                        </p>
                      </div>
                    )}
                    {selectedTertiaryNode === 'education' && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-purple-300">Education — Social Human Capital Formation</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          RTE Act 2009 (Article 21A) & NEP 2020 transformed literacy from 18.3% (1951) to 74.04% (2011). Skilled labor produces the high value-added output powering modern IT exports.
                        </p>
                      </div>
                    )}
                    {selectedTertiaryNode === 'health' && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-rose-300">Healthcare — Social Productivity Preservation</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Ayushman Bharat PM-JAY covers 50 crore citizens with ₹5 lakh annual cover. Prevents catastrophic health expenditures that historically pushed millions into poverty.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Recharts Sectoral GVA Share Chart */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400">Historical Sectoral GVA Shift (% Share)</span>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sectoralTransformationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
                          <YAxis stroke="#94a3b8" fontSize={11} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="Tertiary" fill="#10b981" stroke="#10b981" />
                          <Area type="monotone" dataKey="Secondary" fill="#38bdf8" stroke="#38bdf8" />
                          <Area type="monotone" dataKey="Primary" fill="#f59e0b" stroke="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: CALORIE & POVERTY SIMULATOR ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* TOPIC-SPECIFIC SVG 3: Ragnar Nurkse's Vicious Circle of Poverty */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-300 block mb-2">
                      📊 DIAGRAM 3: Ragnar Nurkse's Vicious Circle of Poverty (Supply-Side Loop)
                    </span>
                    <svg viewBox="0 0 580 160" className="w-full h-auto text-xs" aria-label="Ragnar Nurkse vicious circle of poverty diagram">
                      <rect x="15" y="55" width="115" height="50" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                      <text x="72" y="78" fill="#fecaca" fontWeight="bold" textAnchor="middle" fontSize="11">Low Income</text>
                      <text x="72" y="93" fill="#fca5a5" textAnchor="middle" fontSize="8">Near Subsistence</text>

                      <rect x="160" y="10" width="115" height="50" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="217" y="33" fill="#fef3c7" fontWeight="bold" textAnchor="middle" fontSize="11">Low Savings</text>
                      <text x="217" y="48" fill="#fde68a" textAnchor="middle" fontSize="8">Zero Capital Surplus</text>

                      <rect x="310" y="10" width="120" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="370" y="33" fill="#e0e7ff" fontWeight="bold" textAnchor="middle" fontSize="11">Low Investment</text>
                      <text x="370" y="48" fill="#c7d2fe" textAnchor="middle" fontSize="8">No Modern Machinery</text>

                      <rect x="450" y="55" width="115" height="50" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
                      <text x="507" y="78" fill="#dcfce7" fontWeight="bold" textAnchor="middle" fontSize="11">Low Productivity</text>
                      <text x="507" y="93" fill="#bbf7d0" textAnchor="middle" fontSize="8">Primitive Farm Yields</text>

                      {/* Connecting Arrows */}
                      <path d="M 130 65 L 160 40" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#circleArrow)" />
                      <path d="M 275 35 L 310 35" stroke="#6366f1" strokeWidth="2" markerEnd="url(#circleArrow)" />
                      <path d="M 430 40 L 450 65" stroke="#22c55e" strokeWidth="2" markerEnd="url(#circleArrow)" />
                      <path d="M 450 100 Q 290 145 130 100" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#circleArrow)" />
                      <text x="290" y="145" fill="#f87171" textAnchor="middle" fontSize="9">Loop Closes: Keeps generations trapped in poverty</text>

                      <defs>
                        <marker id="circleArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
                        </marker>
                      </defs>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label htmlFor="income-slider" className="text-xs font-bold text-slate-300">
                        Household Monthly Spend: ₹{householdIncome.toLocaleString()}
                      </label>
                      <input
                        id="income-slider"
                        type="range"
                        min={3000}
                        max={20000}
                        step={250}
                        value={householdIncome}
                        onChange={(e) => {
                          setHouseholdIncome(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Household Monthly Expenditure Slider"
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label htmlFor="members-slider" className="text-xs font-bold text-slate-300">
                        Family Members: {familyMembers} Persons
                      </label>
                      <input
                        id="members-slider"
                        type="range"
                        min={1}
                        max={10}
                        value={familyMembers}
                        onChange={(e) => {
                          setFamilyMembers(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Family Member Count Slider"
                        className="w-full accent-sky-500 h-2 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs font-bold text-slate-300">Location Calorie Standard</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLocationToggle(false)}
                          aria-label="Set standard to Rural: 2400 kcal"
                          className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                            !isUrban ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Rural (2400 kcal)
                        </button>
                        <button
                          onClick={() => handleLocationToggle(true)}
                          aria-label="Set standard to Urban: 2100 kcal"
                          className={`flex-1 py-2 rounded-lg text-xs font-bold ${
                            isUrban ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Urban (2100 kcal)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Poverty Verdict Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center items-center">
                    <div>
                      <span className="text-xs text-slate-400">Per-Capita Monthly Spend</span>
                      <p className="text-xl font-black text-white mt-1">₹{calculatedPerCapita} / person</p>
                      <span className="text-[10px] text-slate-500">(₹{householdIncome} ÷ {familyMembers})</span>
                    </div>

                    <div>
                      <span className="text-xs text-slate-400">Active Rangarajan Cut-off</span>
                      <p className="text-xl font-black text-amber-300 mt-1">₹{activeRangarajanLine} / person</p>
                      <span className="text-[10px] text-slate-500">{isUrban ? 'Urban standard' : 'Rural standard (2400 kcal)'}</span>
                    </div>

                    <div className={`p-3 rounded-xl border ${isBPL ? 'bg-rose-950/60 border-rose-600 text-rose-200' : 'bg-emerald-950/60 border-emerald-600 text-emerald-200'}`}>
                      <span className="text-xs uppercase font-black block">Official Classification</span>
                      <span className="text-lg font-black">{isBPL ? '✗ BPL (Below Poverty Line)' : '✓ APL (Above Poverty Line)'}</span>
                      <p className="text-[10px] mt-1">
                        {isBPL ? 'Eligible for NFSA subsidized grain & MGNREGA' : 'Above minimum survival consumption basket'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: LABOR SUPPLY & UNEMPLOYMENT ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label htmlFor="automation-slider" className="text-xs font-bold text-slate-300">
                        Robotic Automation Level: {automationLevel}%
                      </label>
                      <input
                        id="automation-slider"
                        type="range"
                        min={0}
                        max={90}
                        value={automationLevel}
                        onChange={(e) => {
                          setAutomationLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Robotic Automation Level Slider"
                        className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg"
                      />
                      <p className="text-[10px] text-slate-400">Automating welding, cash-counters (ATMs/UPI), and code reviews.</p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label htmlFor="curriculum-slider" className="text-xs font-bold text-slate-300">
                        College Curriculum Skill Match: {skillCurriculumMatch}%
                      </label>
                      <input
                        id="curriculum-slider"
                        type="range"
                        min={10}
                        max={95}
                        value={skillCurriculumMatch}
                        onChange={(e) => {
                          setSkillCurriculumMatch(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="College Curriculum Skill Match Slider"
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg"
                      />
                      <p className="text-[10px] text-slate-400">Teaching modern AI/cloud skills vs outdated purely theoretical textbook models.</p>
                    </div>
                  </div>

                  {/* Labor Market Outcome Gauges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">Factory Floor Manual Jobs:</span>
                        <span className="font-mono font-bold text-purple-300">{manualJobsAvailable} Index Pts</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <motion.div className="bg-purple-500 h-full" animate={{ width: `${manualJobsAvailable}%` }} />
                      </div>
                      <p className="text-xs text-slate-400">
                        Higher automation lowers unit costs but creates technological unemployment in a labour-surplus country.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-300">Youth Structural Unemployment:</span>
                        <span className={`font-mono font-bold ${structuralUnemploymentRate > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {structuralUnemploymentRate}% Mismatch {structuralUnemploymentRate > 40 ? '✗' : '✓'}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${structuralUnemploymentRate > 40 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          animate={{ width: `${structuralUnemploymentRate}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        {structuralUnemploymentRate > 40
                          ? '⚠️ Paradox of vacant tech jobs coexisting with millions of jobless engineering graduates!'
                          : '✓ High syllabus alignment enables graduates to fill open industry vacancies.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Go to next lab"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Macroeconomic Sandbox Mode"
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-sky-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Enter Sandbox Mode 🎮 →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX MODE (FREE PLAY) ─── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
        >
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <h3 className="text-lg font-bold text-emerald-300">Macroeconomic Policy Sandbox</h3>
              <p className="text-xs text-slate-400">
                Freely manipulate all levers of the Vikaspur economy simultaneously. Observe cross-sectoral ripple effects.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start graded ICSE challenges"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg"
            >
              Start Graded ICSE Challenges →
            </motion.button>
          </div>

          {/* Comprehensive 4-Quadrant Slider Board */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label htmlFor="sb-monsoon" className="text-xs font-bold text-emerald-400">
                1. Agriculture Monsoon: {monsoonIndex}%
              </label>
              <input
                id="sb-monsoon"
                type="range"
                min={10}
                max={100}
                value={monsoonIndex}
                onChange={(e) => {
                  setMonsoonIndex(Number(e.target.value));
                  audioManager.play('count');
                }}
                aria-label="Sandbox Agriculture Monsoon Slider"
                className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg"
              />
              <div className="text-[11px] text-slate-300 flex justify-between">
                <span>Crop Supply: {rawMaterialSupply}k bales</span>
                <span>Rural Demand: {fmcgDemandIndex} pts</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label htmlFor="sb-industrial" className="text-xs font-bold text-sky-400">
                2. Industrial Output: {industrialOutput}%
              </label>
              <input
                id="sb-industrial"
                type="range"
                min={20}
                max={100}
                value={industrialOutput}
                onChange={(e) => {
                  setIndustrialOutput(Number(e.target.value));
                  audioManager.play('count');
                }}
                aria-label="Sandbox Industrial Output Slider"
                className="w-full accent-sky-500 h-2 bg-slate-800 rounded-lg"
              />
              <div className="text-[11px] text-slate-300 flex justify-between">
                <span>Calculated AQI: {calculatedAQI}</span>
                <span>River Toxicity: {riverPollutionScore}%</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label htmlFor="sb-income" className="text-xs font-bold text-amber-400">
                3. Household Per-Capita Budget: ₹{calculatedPerCapita}/mo
              </label>
              <input
                id="sb-income"
                type="range"
                min={3000}
                max={20000}
                step={250}
                value={householdIncome}
                onChange={(e) => {
                  setHouseholdIncome(Number(e.target.value));
                  audioManager.play('count');
                }}
                aria-label="Sandbox Household Budget Slider"
                className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg"
              />
              <div className="text-[11px] text-slate-300 flex justify-between">
                <span>Poverty Cut-off: ₹{activeRangarajanLine}</span>
                <span className={isBPL ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {isBPL ? 'Status: BPL ✗' : 'Status: APL ✓'}
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label htmlFor="sb-skills" className="text-xs font-bold text-purple-400">
                4. College Curriculum Skill Match: {skillCurriculumMatch}%
              </label>
              <input
                id="sb-skills"
                type="range"
                min={10}
                max={95}
                value={skillCurriculumMatch}
                onChange={(e) => {
                  setSkillCurriculumMatch(Number(e.target.value));
                  audioManager.play('count');
                }}
                aria-label="Sandbox Skill Match Slider"
                className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg"
              />
              <div className="text-[11px] text-slate-300 flex justify-between">
                <span>Youth Employability: {graduateEmployabilityRate}%</span>
                <span>Structural Mismatch: {structuralUnemploymentRate}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-5"
        >
          {/* Progress & Competency Info Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded text-[10px] uppercase font-bold">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  Score: {Math.max(0, 100 - errors * 4)}%
                </span>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-sky-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border shadow-xl transition-colors space-y-4 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-600'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                {challenge.nodeId}
              </span>
              <span className="text-xs text-amber-400 font-bold uppercase">
                [{challenge.type.toUpperCase()}]
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {challenge.question}
            </h2>

            {/* --- MCQ RENDERING --- */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-900/40 border-rose-700 text-rose-200'
                        : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-slate-400">
                      {String.fromCharCode(65 + i)}.
                    </span>{' '}
                    {opt}
                    {showExplanation && i === challenge.correctIndex && ' ✓'}
                  </motion.button>
                ))}
              </div>
            )}

            {/* --- DRAG-LABEL RENDERING --- */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full block mb-1">Drag items to correct boxes:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'slot_transport', label: '1. Transportation Apex Body' },
                    { id: 'slot_banking', label: '2. Commercial Banking Giant' },
                    { id: 'slot_insurance', label: '3. Life Insurance Flagship' },
                    { id: 'slot_storage', label: '4. Warehousing & Receipts' },
                  ].map(slot => (
                    <div
                      key={slot.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className={`p-3 rounded-xl border-2 border-dashed min-h-[75px] flex flex-col justify-between ${
                        droppedLabels[slot.id] ? 'bg-emerald-950/50 border-emerald-500' : 'bg-slate-950/60 border-slate-700'
                      }`}
                    >
                      <span className="text-[11px] text-slate-400">{slot.label}</span>
                      <span className="text-xs font-bold text-emerald-300">
                        {droppedLabels[slot.id] || '[Drop Target Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify matched infrastructure answers"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Matched Infrastructure →
                </motion.button>
              </div>
            )}

            {/* --- DRAG-SORT RENDERING --- */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400 block">Drag & reorder into proper circular flow:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-2"
                  >
                    <span className="font-bold text-amber-400">{displayIdx + 1}.</span> {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i))}
                  disabled={showExplanation}
                  aria-label="Verify logical sequence"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Logical Sequence →
                </motion.button>
              </div>
            )}

            {/* --- NUMERIC RENDERING --- */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric calculation answer input"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit calculated numeric answer"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* --- CONSTRUCT RENDERING --- */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Click blocks to add in sequence:</span>
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add block: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-700 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-emerald-900/80 border border-emerald-600 rounded-md text-xs text-white flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        aria-label={`Remove block ${part}`}
                        className="text-rose-400 ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">[Constructed Chain Empty]</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify constructed sequence chain"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Loop →
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-emerald-950/60 border border-emerald-700 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                  <span>📘</span> Step-by-Step Economic Explanation:
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400">{i + 1}.</span>{' '}
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Show next explanation step"
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Rationale Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to next challenge or complete mission"
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission 🏆' : 'Proceed to Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Motivational Feedback Header */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <div className="space-y-1">
              <h2 className={`text-2xl font-black ${motivationalData.color}`}>
                {motivationalData.title}
              </h2>
              <span className="inline-block px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold">
                {motivationalData.badge}
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {motivationalData.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400">Final Score</span>
                <p className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400">BKT Mastery</span>
                <p className="text-xl font-black text-sky-400 uppercase">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400">Mistakes / Gaps</span>
                <p className="text-xl font-black text-amber-400">{errors}</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400">SRS Review Due</span>
                <p className="text-xl font-black text-purple-400">
                  {motivationalData.srsReviewDays === 7 ? '7 Days' : motivationalData.srsReviewDays === 3 ? '3 Days' : '1 Day'}
                </p>
              </div>
            </div>
          </div>

          {/* Spaced Repetition System (SRS) Schedule Banner */}
          <div className="p-4 bg-purple-950/40 border border-purple-600/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">📅</span>
              <div>
                <h4 className="text-sm font-bold text-purple-200">Spaced Repetition Schedule (SRS)</h4>
                <p className="text-xs text-purple-300">
                  {errors === 0
                    ? 'Mastery confirmed! Next review scheduled in 7 days for maximum memory retention.'
                    : errors <= 3
                    ? 'Good progress! Next review scheduled in 3 days to reinforce tricky linkages.'
                    : 'Review scheduled in 1 day to solidify foundational economic principles.'}
                </p>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-purple-900 text-purple-200 border border-purple-500 rounded-xl text-xs font-bold whitespace-nowrap">
              {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
            </span>
          </div>

          {/* Structured Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🧠</span> Concept Reflection & Deep Synthesis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-1" className="text-xs font-bold text-slate-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="ref-1"
                  rows={3}
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How high tertiary GVA doesn't automatically mean high service employment share..."
                  aria-label="Reflection on surprising concept"
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-2" className="text-xs font-bold text-slate-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="ref-2"
                  rows={3}
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Nurkse's circle shows why poor farmers can't buy modern machines without bank credit..."
                  aria-label="Reflection on explaining concept to a friend"
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label htmlFor="ref-3" className="text-xs font-bold text-slate-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="ref-3"
                  rows={3}
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. When analyzing agricultural policies, bank loan schemes, and career skill investments..."
                  aria-label="Reflection on real-life application"
                  className="w-full text-xs p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Diagnostic Misconceptions Identified During Session:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ ICSE Clarification: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <div className="space-y-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </span>
                  <p>{st}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ICSE Concept Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}