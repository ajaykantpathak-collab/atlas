'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// Node IDs as string literals
const NODE_C11_ECON_021 = 'c11_econ_021'; // Socialist & Capitalist Economies
const NODE_C11_ECON_022 = 'c11_econ_022'; // Mixed Economy & Regulatory Frameworks
const NODE_C11_ECON_023 = 'c11_econ_023'; // Regional Economic Groupings (SAARC, EU, ASEAN, G-20)
const NODE_C11_ECON_024 = 'c11_econ_024'; // Price Mechanism & Market Clearing
const NODE_C11_ECON_025 = 'c11_econ_025'; // Post-1991 Agricultural Transformation
const NODE_C11_ECON_026 = 'c11_econ_026'; // Industrial Reforms & IBC 2016
const NODE_C11_ECON_027 = 'c11_econ_027'; // Foreign Trade, CAD & Services Surplus
const NODE_C11_ECON_028 = 'c11_econ_028'; // Per Capita Income & Welfare Disparities
const NODE_C11_ECON_029 = 'c11_econ_029'; // HDI Geometric Mean Formulation
const NODE_C11_ECON_030 = 'c11_econ_030'; // Comparative Human Development Indices

const ALL_NODE_IDS = [
  NODE_C11_ECON_021,
  NODE_C11_ECON_022,
  NODE_C11_ECON_023,
  NODE_C11_ECON_024,
  NODE_C11_ECON_025,
  NODE_C11_ECON_026,
  NODE_C11_ECON_027,
  NODE_C11_ECON_028,
  NODE_C11_ECON_029,
  NODE_C11_ECON_030,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Chief Economic Advisor: Architecting National Development',
  intro: 'You have been appointed Senior Advisor to the Ministry of Finance and Planning. India stands at the crossroads of structural transformation: balancing social welfare with private efficiency, steering trade groupings, overcoming agricultural and industrial bottlenecks, and elevating Human Development.',
  context: 'From allocating resources through market mechanisms to engineering human capability indices, your economic models will shape policies for 1.4 billion citizens.',
};

// Discovery Hook
const DISCOVERY_QUESTION = {
  question: 'Suppose Country Alpha has a Per Capita Income of $60,000 but life expectancy of 52 years, while Country Beta has a Per Capita Income of $12,000 with life expectancy of 78 years and 12 years of schooling. Which country achieves a higher Human Development Index (HDI)?',
  options: [
    'Country Alpha — because its average income is 5x higher',
    'Country Beta — because HDI penalises dimensional imbalances via geometric mean',
    'Both have identical HDI because income offsets health',
    'Cannot be determined without knowing the Gini coefficient',
  ],
  correctIndex: 1,
  hintAfter: "Surprised? Higher income does NOT guarantee higher human development! Let's explore how economic systems, price mechanisms, and human capability indices truly work.",
};

// Misconception database for targeted remedial feedback
const MISCONCEPTIONS: Record<number, { title: string; explanation: string; remedy: string }> = {
  0: {
    title: 'Misconception: Command Economies Eliminate Scarcity',
    explanation: 'State planning boards like Gosplan set quantitative quotas but cannot compute millions of dynamic consumer preferences in real time, leading to widespread shortages or massive surpluses of unwanted goods.',
    remedy: 'Understand that scarcity is an inherent economic condition; central planning merely changes how allocation decisions are made, replacing price signals with administrative directives.'
  },
  1: {
    title: 'Misconception: Mixed Economies Require an Equal 50/50 Split',
    explanation: 'A mixed economy is defined by the coexistence and synergy of public and private sectors, not by an arbitrary 50:50 mathematical ratio of ownership.',
    remedy: 'Recall that public sector intervention is justified to correct market failures, supply public goods, and provide social security nets.'
  },
  2: {
    title: 'Misconception: All Regional Blocs Share a Common Currency',
    explanation: 'Only an Economic and Monetary Union (like the Eurozone within the EU) adopts a shared currency. SAARC and ASEAN are Free Trade Areas without common external tariffs or currencies.',
    remedy: 'Review the stages of economic integration: PTA -> FTA -> Customs Union -> Common Market -> Economic and Monetary Union.'
  },
  3: {
    title: 'Misconception: Price Ceilings Eliminate Scarcity',
    explanation: 'Setting a legal price ceiling below the equilibrium price creates an artificial shortage (excess demand over supply), necessitating non-price rationing or queuing.',
    remedy: 'Observe that while price caps protect affordability of merit goods, they simultaneously reduce producer supply incentives unless accompanied by state subsidies.'
  },
  4: {
    title: 'Misconception: Declining Agricultural GDP Share Implies Declining Farm Output',
    explanation: 'A declining percentage share in GDP reflects faster growth in industrial and service sectors (structural transformation), even when absolute agricultural yield doubles or triples.',
    remedy: 'Distinguish between relative sector share (%) and absolute real output (metric tonnes or real Gross Value Added).'
  },
  5: {
    title: 'Misconception: High Per Capita Income Guarantees High Social Welfare',
    explanation: 'Per Capita Income is an arithmetic mean that masks income inequality and excludes essential human capabilities such as life expectancy, adult literacy, and child nutrition.',
    remedy: 'Study the Kerala vs. Goa paradox where superior public health and universal schooling yield superior social indicators at lower average monetary income.'
  },
  6: {
    title: 'Misconception: Merchandise Trade Deficit Means Balance of Payments Crisis',
    explanation: 'A merchandise goods deficit is regularly financed by net invisibles surpluses (IT/BPM service exports) and inward remittances, keeping the Current Account Deficit stable.',
    remedy: 'Always analyse the full Current Account (Goods Balance + Services Surplus + Secondary Remittance Transfers).'
  }
};

// Challenge Interface
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
}

// 22 Comprehensive Challenges
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C11_ECON_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under a classical socialist economic system, how are the central economic questions (what, how, and for whom to produce) decided?',
    options: [
      'By the automatic forces of demand and supply in competitive markets',
      'By central planning authorities guided by social welfare and state ownership',
      'Exclusively by multinational corporations seeking profit maximisation',
      'Through decentralised price bargaining between private consumers and producers',
    ],
    correctIndex: 1,
    explanation: 'Socialism replaces the price mechanism with central planning formulated by the state. The guiding principle is social welfare and equitable distribution rather than private profit.',
    hints: [
      'Think about whether factories are owned privately or by the state.',
      'Remember Gosplan in the USSR or the Planning Commission in pre-1991 India.',
      'A central plan guided by the government decides production targets and distribution.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_ECON_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In India’s mixed economy, why does the government operate Indian Railways and public health systems instead of privatising them completely?',
    options: [
      'Because the Indian Constitution forbids private companies from operating transports',
      'To correct market failures in public goods, natural monopolies, and merit goods that markets under-provide',
      'Because mixed economies strictly require an exact 50:50 mathematical split of all assets',
      'To prevent the price mechanism from functioning anywhere in the national economy',
    ],
    correctIndex: 1,
    explanation: 'In a mixed economy, the public sector exists primarily to correct market failure — providing natural monopolies (rail tracks), public goods, and merit goods that profit-seeking private firms under-supply.',
    hints: [
      'Would a private firm build loss-making remote rural railway tracks without subsidies?',
      'Consider the difference between private profit motives and social welfare.',
      'Public sectors step in where private markets fail to ensure universal access and social equity.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_ECON_024,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In a local wholesale grain market, the demand is given by Qd = 120 - 2P and supply is Qs = 20 + 3P. Calculate the equilibrium market clearing price (P in ₹).',
    correctAnswer: 20,
    tolerance: 0.5,
    unit: '₹',
    explanation: 'Equilibrium occurs where Qd = Qs. Setting 120 - 2P = 20 + 3P gives 100 = 5P, so P = ₹20. At this price, Qd = Qs = 80 units.',
    hints: [
      'Set the quantity demanded equation equal to quantity supplied: Qd = Qs.',
      '120 - 2P = 20 + 3P. Combine like terms by adding 2P to both sides and subtracting 20.',
      '100 = 5P, therefore P = 100 / 5 = 20.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_ECON_028,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A state has a Net State Domestic Product (NSDP) of ₹3,60,000 crore and a mid-year population of 12 crore. Calculate its Per Capita Income in ₹.',
    correctAnswer: 30000,
    tolerance: 100,
    unit: '₹',
    explanation: 'Per Capita Income = Total National/State Income / Population = ₹3,60,000 crore / 12 crore = ₹30,000 per person.',
    hints: [
      'Use the formula: Per Capita Income = Net State Income / Mid-year Population.',
      'Divide ₹3,60,000 crore by 12 crore.',
      '360000 / 12 = 30000.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_ECON_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following regional economic groupings has achieved the deepest level of economic integration by establishing a single market and common currency (euro)?',
    options: ['SAARC', 'ASEAN', 'European Union (EU)', 'G-20'],
    correctIndex: 2,
    explanation: 'The European Union (EU) represents a full economic and monetary union with the four freedoms (free movement of goods, services, capital, people) and the single euro currency.',
    hints: [
      'Look for the grouping with a shared currency across 20 nations.',
      'SAARC and ASEAN are free trade areas without a common currency.',
      'The Maastricht Treaty established the European Union single market and Eurozone.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_ECON_029,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each indicator to its corresponding Human Development Index (HDI) dimension.',
    dragItems: [
      { label: 'Life Expectancy at Birth', targetId: 'dim_health' },
      { label: 'Mean & Expected Years of Schooling', targetId: 'dim_edu' },
      { label: 'GNI Per Capita (PPP $)', targetId: 'dim_income' },
    ],
    correctMapping: {
      dim_health: 'Life Expectancy at Birth',
      dim_edu: 'Mean & Expected Years of Schooling',
      dim_income: 'GNI Per Capita (PPP $)',
    },
    explanation: 'The HDI is constructed across three dimensions: Health (life expectancy), Education (mean & expected schooling), and Standard of Living (GNI per capita in 2017 PPP $).',
    hints: [
      'Health measures longevity from birth.',
      'Education incorporates both adult schooling attainment and children school expectation.',
      'Standard of living is measured in Purchasing Power Parity adjusted dollars.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_ECON_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does a pure socialist command economy struggle with innovation in consumer goods despite achieving high production targets in heavy industry?',
    options: [
      'Because socialist workers are legally barred from using scientific instruments',
      'Because the absence of the profit motive and market competition removes incentives to improve consumer product quality and reduce costs',
      'Because heavy industry requires zero technological planning while consumer goods require foreign exchange',
      'Because central planners intentionally prefer scarcity of bread and clothing',
    ],
    correctIndex: 1,
    explanation: 'Without market competition and profit rewards, state monopolies produce to satisfy quantitative plan quotas rather than consumer preferences, causing technological stagnation in consumer goods (e.g. the 40-year unchanged Ambassador car design).',
    hints: [
      'Think about what motivates private companies to create better smartphones or cars.',
      'State-owned enterprises are judged on meeting physical output numbers, not customer delight.',
      'The profit motive and competitive threat drive rapid innovation in consumer markets.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_08',
    nodeId: NODE_C11_ECON_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does the Price Mechanism differ from a government price ceiling like the NPPA capping the price of essential medicines (e.g. Paracetamol at ₹2.30)?',
    options: [
      'The price mechanism is an administrative fiat, whereas NPPA caps emerge spontaneously from consumer bids',
      'The price mechanism operates spontaneously via demand and supply; NPPA price caps are deliberate legal interventions to correct market failure and protect affordability',
      'Price controls eliminate scarcity forever, whereas price mechanisms always cause inflation',
      'They are identical economic tools applied to different sectors',
    ],
    correctIndex: 1,
    explanation: 'The price mechanism is the market self-coordinating through supply and demand. Price caps are statutory welfare interventions because the free market would price essential life-saving drugs beyond the reach of the poor.',
    hints: [
      'Does the government set the price of every onion or shirt in India?',
      'The price mechanism is spontaneous; price controls are legal regulations.',
      'NPPA caps prevent life-saving drugs from becoming unaffordable.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_ECON_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'India’s agriculture share in GDP fell from ~30% in 1991 to ~18% in 2022. An analyst claims "Indian agriculture suffered severe contraction and decline after 1991." Why is this conclusion false?',
    options: [
      'Because GDP data in 1991 excluded wheat and paddy entirely',
      'Because absolute agricultural output doubled (wheat 55 MT to 113 MT); the percentage share fell only because secondary and tertiary sectors grew significantly faster',
      'Because all agricultural production was nationalised by the central government',
      'Because agriculture now includes software engineering services',
    ],
    correctIndex: 1,
    explanation: 'A falling percentage share in GDP represents structural transformation: total GDP grew faster than agriculture, even while absolute farm output more than doubled and India became a net food exporter.',
    hints: [
      'Remember: Share = (Agricultural GVA / Total GDP) * 100.',
      'If the denominator (Total GDP) grows by 8% and numerator (Agriculture) grows by 3.5%, the share drops even as output rises!',
      'Absolute production of wheat, milk, and horticulture expanded substantially.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_ECON_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which piece of economic legislation replaced the delayed, liquidation-shy BIFR (under SICA 1985) with a strict, time-bound (180-270 days) creditor-driven resolution process for sick industrial units in India?',
    options: [
      'MRTP Act 1969',
      'Foreign Exchange Regulation Act (FERA) 1973',
      'Insolvency and Bankruptcy Code (IBC) 2016',
      'Industries (Development and Regulation) Act 1951',
    ],
    correctIndex: 2,
    explanation: 'The IBC 2016 introduced a time-bound corporate insolvency resolution process before the NCLT, resolving major distressed assets like Bhushan Steel and Essar Steel and unlocking stuck bank capital.',
    hints: [
      'This law was enacted in 2016 to resolve non-performing assets (NPAs).',
      'It sets a 180 to 270-day strict resolution deadline.',
      'Look for the Insolvency and Bankruptcy Code.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_ECON_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a given financial year, India’s merchandise exports are $450 billion and merchandise imports are $730 billion. India’s GDP is $3,650 billion. Calculate the Trade-to-GDP ratio (in %).',
    correctAnswer: 32.33,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Trade-to-GDP Ratio = [(Exports + Imports) / GDP] * 100 = [($450B + $730B) / $3650B] * 100 = ($1180B / $3650B) * 100 = 32.33%.',
    hints: [
      'Total trade = Merchandise Exports + Merchandise Imports.',
      '$450 + $730 = $1,180 billion.',
      'Divide $1,180 by $3,650 and multiply by 100.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_ECON_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Per Capita Income considered an inadequate proxy for social welfare when comparing Indian states like Goa (PCI ~₹5.5 lakh) and Kerala (PCI ~₹1.7 lakh)?',
    options: [
      'Because Kerala uses a different legal currency than Goa',
      'Because PCI ignores income distribution, public health, and literacy — Kerala achieves higher life expectancy (77 yrs) and literacy (96%) than Goa despite lower average income',
      'Because Goa has zero economic activity in tourism',
      'Because Per Capita Income is legally restricted to agricultural households',
    ],
    correctIndex: 1,
    explanation: 'PCI is an arithmetic average that ignores distribution and non-monetary human capability dimensions. Kerala’s sustained public investment in health and education yields superior social welfare indicators at lower per capita income.',
    hints: [
      'Does higher average income guarantee that schools and hospitals are better?',
      'Check literacy rates and life expectancy in Kerala compared to Goa.',
      'PCI overlooks distribution, literacy, and health infrastructure.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_ECON_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the Health Dimension Index for a country where life expectancy at birth is 72 years, given UNDP goalposts of Min = 20 years and Max = 85 years.',
    correctAnswer: 0.8,
    tolerance: 0.02,
    unit: 'index',
    explanation: 'Health Index = (Actual - Min) / (Max - Min) = (72 - 20) / (85 - 20) = 52 / 65 = 0.800.',
    hints: [
      'Formula: Dimension Index = (Actual - Minimum) / (Maximum - Minimum).',
      'Numerator = 72 - 20 = 52.',
      'Denominator = 85 - 20 = 65. Divide 52 by 65.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_ECON_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'According to the UNDP Human Development Report 2024 (data year 2022), in which category and rank does India stand?',
    options: [
      'High Human Development (Rank 78, HDI 0.782)',
      'Medium Human Development (Rank 134/193, HDI 0.633)',
      'Low Human Development (Rank 164, HDI 0.547)',
      'Very High Human Development (Rank 30, HDI 0.890)',
    ],
    correctIndex: 1,
    explanation: 'As per UNDP HDR 2024, India’s HDI is 0.633 (Rank 134 out of 193), placing it in the Medium Human Development category (0.550 - 0.699).',
    hints: [
      'India graduated from the Low to Medium category around 2010.',
      'The HDI value is between 0.60 and 0.65.',
      'India is at Rank 134 with an HDI of 0.633.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_ECON_023,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the stages of regional economic integration in ascending order of integration depth (from least integrated to deepest union).',
    sortItems: [
      'Free Trade Area (tariffs eliminated among members, e.g. SAFTA)',
      'Customs Union (common external tariff against non-members, e.g. Mercosur)',
      'Common Market (free movement of capital, goods, services, and labour)',
      'Economic & Monetary Union (common currency, shared central bank & laws, e.g. Eurozone)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Economic integration deepens progressively: Free Trade Area -> Customs Union -> Common Market -> Economic & Monetary Union.',
    hints: [
      'Start with simple tariff reductions between member nations.',
      'Next comes a common external tariff applied to outside nations.',
      'Deepest integration involves surrendering monetary policy and sharing a single currency.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C11_ECON_027,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India routinely records a high merchandise Trade Deficit (~$190B in 2022-23), yet its Current Account Deficit (CAD) remains modest (~$67B, ~2% of GDP). What cushions this structural gap?',
    options: [
      'Printing fresh rupee currency notes for foreign petroleum suppliers',
      'Massive surpluses in software/IT-BPM services exports ($150B) and high worker remittances ($100B+)',
      'Emergency borrowing of gold reserves from the International Monetary Fund every month',
      'Revaluation of the rupee exchange rate by statutory ordinance',
    ],
    correctIndex: 1,
    explanation: 'While merchandise trade is heavily in deficit due to crude oil (70% imported) and electronics, India’s services trade surplus (IT exports) and global diaspora remittances substantially finance the goods deficit, keeping CAD manageable.',
    hints: [
      'Merchandise trade covers only physical goods (crude oil, gold, electronics).',
      'Current account includes services (software) and secondary transfers (remittances).',
      'Indian IT giants (TCS, Infosys) and NRIs sending remittances provide massive surplus inflows.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_ECON_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A country has the following dimension indices: Health Index = 0.800, Education Index = 0.600, Income Index = 0.512. Compute its final HDI using the UNDP geometric mean method.',
    correctAnswer: 0.626,
    tolerance: 0.015,
    unit: 'HDI',
    explanation: 'HDI = (I_Health * I_Education * I_Income)^(1/3) = (0.800 * 0.600 * 0.512)^(1/3) = (0.24576)^(1/3) ≈ 0.626.',
    hints: [
      'Multiply the three dimension indices together: 0.800 * 0.600 * 0.512.',
      '0.800 * 0.600 * 0.512 = 0.24576.',
      'Take the cube root (or power of 1/3) of 0.24576: 0.24576^(1/3) ≈ 0.626.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_ECON_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does Sri Lanka (HDI 0.782, Rank 78) surpass India (HDI 0.633, Rank 134) in human development despite comparable or lower national income scale?',
    options: [
      'Sri Lanka has vast crude oil reserves and high mineral exports',
      'Sri Lanka initiated universal free education (1945 Act) and universal free healthcare (1951 Policy) decades earlier, creating high schooling (11 yrs) and longevity (77 yrs)',
      'Sri Lanka is classified as a fully socialist command economy',
      'The UNDP calculates Sri Lanka’s HDI without using the geometric mean',
    ],
    correctIndex: 1,
    explanation: 'Sri Lanka’s early historic commitment to universal basic health and free education expanded capabilities across generations. In contrast, India’s adult mean years of schooling (6.5 years) lags significantly due to late universalisation.',
    hints: [
      'Compare when Sri Lanka made primary schooling free vs India’s RTE Act 2009.',
      'Sri Lanka’s mean schooling is 11 years compared to India’s 6.5 years.',
      'Decades of public health and education investments create lasting capability advantages.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_ECON_026,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Build the structural reform framework required to elevate India’s stagnant manufacturing GDP share from 16% toward the 25% target.',
    availableParts: [
      'Logistics Cost Reduction via DFCs & Ports',
      'Collateral-Free MSME Credit & PLI Incentives',
      'Flexible Labour Law Codes Enforcement',
      'Re-imposing 300% Import Licensing',
      'Shutting Down All Private Vehicle Assembly',
    ],
    targetState: 'Logistics Cost Reduction via DFCs & Ports + Collateral-Free MSME Credit & PLI Incentives + Flexible Labour Law Codes Enforcement',
    validationHint: 'Select the 3 synergistic positive structural reforms (infrastructure, finance, labour) and exclude regressive autarkic measures.',
    explanation: 'Overcoming manufacturing stagnation requires resolving binding constraints: bringing logistics costs down from 14% to 8%, closing the ₹25 lakh crore MSME credit gap, and streamlining labour regulations.',
    hints: [
      'Identify the three binding constraints: infrastructure/logistics, credit access, and labour flexibility.',
      'Do NOT select pre-1991 licence raj policies like 300% tariffs or banning private assembly.',
      'Add the 3 constructive modern policy levers.',
    ],
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_ECON_022,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the role of statutory regulators (RBI, SEBI, TRAI, CCI) in India’s mixed economy. Why are they vital for capitalist markets to function fairly?',
    options: [
      'They set 100% of consumer product prices each morning via planning directives',
      'They enforce transparent market rules, curb predatory monopolistic practices, protect consumers, and maintain financial stability without state ownership of every firm',
      'They mandate that every private company must turn over 80% of shares to the government',
      'They replace private enterprise by nationalising telecom and stock exchanges',
    ],
    correctIndex: 1,
    explanation: 'In a modern mixed economy, statutory regulators prevent market failure (monopoly collusion, systemic bank runs, fraudulent trading) while preserving private initiative, innovation, and pricing flexibility.',
    hints: [
      'What happens if there are no safety rules in banking or capital markets?',
      'Regulators ensure fair play, prevent cartels, and protect consumers.',
      'They set the legal rules of the game without taking over business ownership.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_ECON_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does contract farming (such as PepsiCo partnering with potato growers in Punjab) represent a post-liberalization market-linked agricultural feature?',
    options: [
      'The government confiscates the farm land and turns it into a state commune',
      'Farmers retain land ownership while receiving certified seeds, technical advice, and a guaranteed price buyback from the processing company',
      'Farmers are prohibited from selling any surplus produce to other buyers',
      'It eliminates the role of all private food processing companies in India',
    ],
    correctIndex: 1,
    explanation: 'Contract farming connects smallholder farmers directly with agro-industries and export markets, reducing price volatility through guaranteed buyback agreements while preserving land title.',
    hints: [
      'Does the farmer lose their land title in a contract farming agreement?',
      'The corporate buyer provides inputs and commits to buying the harvest at a fixed price.',
      'It links farming directly with commercial manufacturing demand.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_ECON_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does calculating Per Capita Income in Purchasing Power Parity (PPP $) yield ~$6,650 for India, compared to only ~$2,540 at nominal market exchange rates?',
    options: [
      'Because the Indian government subsidises international flights for all citizens',
      'Because lower domestic price levels for non-traded goods and services (food, housing, healthcare) mean $1 buys far more real goods in India than in the US',
      'Because PPP calculations include illegal black money transactions',
      'Because market exchange rates deliberately miscount population figures',
    ],
    correctIndex: 1,
    explanation: 'PPP exchange rates equalise purchasing power across borders. Since basic living costs (food, rent, services) are much lower in India than in advanced economies, an Indian rupee income buys significantly more real consumption goods.',
    hints: [
      'Think about how much a haircut or meal costs in Delhi versus New York in US dollars.',
      'Market exchange rates reflect trade flows, not the domestic cost of living.',
      'PPP adjusts for local price levels, giving a realistic measure of real purchasing power.',
    ],
  },
];

// Interactive Exploration Steps (Brilliant-style)
const EXPLORATION_STEPS = [
  {
    title: 'The Economic System Spectrum',
    instruction: 'Drag the Public vs Private Ownership slider and observe how resource allocation shifts between Central Planning and Price Mechanism.',
    interactionType: 'slider-systems',
    nodeId: NODE_C11_ECON_021,
  },
  {
    title: 'Price Mechanism: Market Equilibrium & Signals',
    instruction: 'Adjust the market price slider to observe shortages, surpluses, and automatic self-correcting price signals.',
    interactionType: 'slider-equilibrium',
    nodeId: NODE_C11_ECON_024,
  },
  {
    title: 'Post-1991 Structural Transformation',
    instruction: 'Toggle between Pre-1991 and Post-1991 dashboards to analyse Agriculture, Industry, and Foreign Trade dynamics.',
    interactionType: 'toggle-reforms',
    nodeId: NODE_C11_ECON_026,
  },
  {
    title: 'HDI Construction Engine',
    instruction: 'Manipulate Life Expectancy, Schooling, and GNI sliders. Observe how the Geometric Mean penalises dimensional imbalance!',
    interactionType: 'hdi-calculator',
    nodeId: NODE_C11_ECON_029,
  },
  {
    title: 'Regional & Global Trade Groupings',
    instruction: 'Select trade blocs (SAARC, EU, ASEAN, G-20) to compare internal trade integration depth and geopolitical realities.',
    interactionType: 'trade-map',
    nodeId: NODE_C11_ECON_023,
  },
];

// Predict-then-Check questions
const PREDICTION_QUESTIONS = [
  {
    question: 'If a country has a near-perfect Income Index (0.95) and Health Index (0.90), but an Education Index of only 0.20 due to historical neglect of schooling, what will happen to its final HDI under the Geometric Mean?',
    options: [
      'HDI will stay high (~0.85) because income easily compensates for schooling',
      'HDI will collapse to ~0.55 because the geometric mean severely penalises the weak dimension',
      'HDI will be the simple arithmetic average (0.68)',
      'HDI cannot be calculated when one dimension is below 0.30',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the Education slider to 0.20 in the HDI simulator below and check the resulting score!',
    nodeId: NODE_C11_ECON_029,
  },
  {
    question: 'Predict: When the market price of wheat is set below the equilibrium clearing price, what immediate market condition develops?',
    options: [
      'A market surplus (excess unsold stock)',
      'A market shortage (excess demand over supply)',
      'Supply immediately expands to meet demand',
      'Equilibrium shifts downward automatically',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the price slider below equilibrium to verify the shortage calculation and upward price pressure.',
    nodeId: NODE_C11_ECON_024,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Geometric Mean compared to the Arithmetic Mean when one dimension index is low?',
    observableOptions: [
      'Geometric mean is always significantly lower, penalising dimensional imbalance',
      'Geometric mean is always higher than the arithmetic mean',
      'Both means give identical values regardless of inputs',
      'Geometric mean completely ignores the highest index',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_ECON_029,
  },
  {
    question: 'In the Regional Trade Grouping simulator, why is intra-EU trade (~60%) so much higher than intra-SAARC trade (~5%)?',
    observableOptions: [
      'EU has a single market, common currency, and political consensus; SAARC is paralysed by bilateral political conflict',
      'SAARC countries do not produce any agricultural or manufactured goods',
      'The EU prohibits trade with all non-European nations',
      'SAARC requires all trade to be settled in physical gold',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_ECON_023,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Policy Advisor Lab: Design India’s 2030 Human Development Roadmap',
  description: 'Apply economic principles to draft a 3-point strategy for India to cross the 0.700 threshold from Medium into High Human Development.',
  steps: [
    'Target Adult Mean Years of Schooling: Implement targeted adult literacy and vocational upskilling to lift mean schooling from 6.5 towards 9.0 years.',
    'Strengthen Universal Primary Healthcare: Expand Ayushman Bharat wellness centres to increase life expectancy from 70 towards 75 years.',
    'Boost Manufacturing & Formal Employment: Implement the 4 Labour Codes, expand PLI in electronics/textiles, and lower logistics costs to 8% of GDP.',
    'Share and discuss your policy brief with peers and your economics teacher!',
  ],
};

// ─── TOPIC SPECIFIC SVG DIAGRAM 1: ECONOMIC SYSTEMS SPECTRUM ───
const EconomicSystemsDiagram = ({ mix }: { mix: number }) => {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 my-2">
      <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
        <span>Economic System Spectrum: State vs Market Control</span>
        <span className="text-emerald-400 font-mono">Current Mix: {mix}% Public / {100 - mix}% Private</span>
      </div>
      <svg viewBox="0 0 600 120" className="w-full h-auto" aria-label="Economic Spectrum Diagram">
        <defs>
          <linearGradient id="spectrumGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Track */}
        <rect x="50" y="45" width="500" height="20" rx="10" fill="url(#spectrumGradient)" />
        {/* Pointer indicator */}
        <line x1={50 + (500 * (100 - mix)) / 100} y1="20" x2={50 + (500 * (100 - mix)) / 100} y2="80" stroke="#fbbf24" strokeWidth="4" strokeDasharray="3 3" />
        <circle cx={50 + (500 * (100 - mix)) / 100} cy="55" r="14" fill="#fbbf24" stroke="#ffffff" strokeWidth="3" />

        {/* Labels */}
        <text x="50" y="90" fill="#06b6d4" fontSize="12" fontWeight="bold">Capitalism (USA)</text>
        <text x="50" y="105" fill="#94a3b8" fontSize="10">Price Mechanism</text>

        <text x="300" y="90" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Mixed Economy (India)</text>
        <text x="300" y="105" textAnchor="middle" fill="#94a3b8" fontSize="10">Market + State Welfare</text>

        <text x="550" y="90" textAnchor="end" fill="#ef4444" fontSize="12" fontWeight="bold">Socialism (USSR Gosplan)</text>
        <text x="550" y="105" textAnchor="end" fill="#94a3b8" fontSize="10">Central Plan Quotas</text>
      </svg>
    </div>
  );
};

// ─── TOPIC SPECIFIC SVG DIAGRAM 2: SUPPLY AND DEMAND CLEARING ───
const PriceMechanismDiagram = ({ price, qd, qs }: { price: number; qd: number; qs: number }) => {
  // Demand: Qd = 120 - 2P; Supply: Qs = 20 + 3P. Eq: P=20, Q=80
  const eqX = 250; // Q = 80
  const eqY = 150; // P = 20
  const curY = 250 - (price - 10) * (200 / 30);
  const curXDem = 50 + (qd / 120) * 300;
  const curXSup = 50 + (qs / 140) * 300;

  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 my-2">
      <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
        <span>Market Price Mechanism: Wheat Mandi Equilibrium (Qd vs Qs)</span>
        <span className="font-mono text-amber-400">P = ₹{price} | Qd = {qd} | Qs = {qs}</span>
      </div>
      <svg viewBox="0 0 400 240" className="w-full h-auto" aria-label="Demand and Supply Equilibrium Diagram">
        {/* Axes */}
        <line x1="50" y1="20" x2="50" y2="200" stroke="#64748b" strokeWidth="2" />
        <line x1="50" y1="200" x2="380" y2="200" stroke="#64748b" strokeWidth="2" />
        <text x="25" y="30" fill="#94a3b8" fontSize="10">Price (₹)</text>
        <text x="340" y="220" fill="#94a3b8" fontSize="10">Quantity (Q)</text>

        {/* Demand Line: (P=10, Q=100) to (P=40, Q=40) */}
        <line x1="80" y1="50" x2="350" y2="190" stroke="#06b6d4" strokeWidth="3" />
        <text x="355" y="195" fill="#06b6d4" fontSize="11" fontWeight="bold">D (Qd = 120 - 2P)</text>

        {/* Supply Line: (P=10, Q=50) to (P=40, Q=140) */}
        <line x1="80" y1="190" x2="350" y2="50" stroke="#f59e0b" strokeWidth="3" />
        <text x="355" y="55" fill="#f59e0b" fontSize="11" fontWeight="bold">S (Qs = 20 + 3P)</text>

        {/* Equilibrium Point */}
        <circle cx={eqX} cy={eqY} r="6" fill="#10b981" />
        <text x={eqX + 10} y={eqY - 5} fill="#10b981" fontSize="10" fontWeight="bold">E (₹20, 80 units)</text>

        {/* Current Price Line */}
        <line x1="50" y1={curY} x2="370" y2={curY} stroke="#e11d48" strokeWidth="2" strokeDasharray="4 4" />
        <text x="55" y={curY - 4} fill="#f43f5e" fontSize="10" fontWeight="bold">P = ₹{price}</text>

        {/* Shortage or Surplus indicator */}
        {price < 20 && (
          <rect x={curXSup} y={curY - 5} width={Math.max(1, curXDem - curXSup)} height="10" fill="#f43f5e" opacity="0.3" />
        )}
        {price > 20 && (
          <rect x={curXDem} y={curY - 5} width={Math.max(1, curXSup - curXDem)} height="10" fill="#3b82f6" opacity="0.3" />
        )}
      </svg>
    </div>
  );
};

// ─── TOPIC SPECIFIC SVG DIAGRAM 3: HDI GEOMETRIC MEAN TRIANGLE ───
const HDITriangleDiagram = ({ iHealth, iEdu, iIncome, hdi }: { iHealth: number; iEdu: number; iIncome: number; hdi: number }) => {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 my-2">
      <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
        <span>UNDP Human Development Index (HDI) Dimensional Triad</span>
        <span className="font-mono text-emerald-400 font-bold">HDI = {hdi}</span>
      </div>
      <svg viewBox="0 0 360 200" className="w-full h-auto" aria-label="Human Development Index Geometric Triangle">
        {/* Outer Triangle */}
        <polygon points="180,25 60,175 300,175" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

        {/* Dynamic inner area based on dimensional indices */}
        <polygon
          points={`180,${175 - iHealth * 150} ${180 - iEdu * 120},${175 - iEdu * 30} ${180 + iIncome * 120},${175 - iIncome * 30}`}
          fill="#10b981"
          fillOpacity="0.25"
          stroke="#10b981"
          strokeWidth="3"
        />

        {/* Vertices */}
        <circle cx="180" cy="25" r="8" fill="#10b981" />
        <text x="180" y="15" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Health ({iHealth})</text>

        <circle cx="60" cy="175" r="8" fill="#06b6d4" />
        <text x="60" y="195" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold">Education ({iEdu})</text>

        <circle cx="300" cy="175" r="8" fill="#f59e0b" />
        <text x="300" y="195" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Income ({iIncome})</text>

        {/* Center Node */}
        <circle cx="180" cy="125" r="22" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
        <text x="180" y="122" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="bold">HDI ∛</text>
        <text x="180" y="135" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">{hdi}</text>
      </svg>
    </div>
  );
};

// Props Interface
interface Props {
  nodeId?: string;
  title?: string;
  onComplete?: (score: number) => void;
}

export function C11_EconomicsTypesEconomiesSocialismSim({
  nodeId = NODE_C11_ECON_021,
  title = 'ISC Economics: Economic Systems, Reforms & Human Development',
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration State
  const [publicPrivateMix, setPublicPrivateMix] = useState(50); // 0 = 100% Capitalist, 100 = 100% Socialist
  const [simPrice, setSimPrice] = useState(25); // ₹10 to ₹40
  const [selectedReformTab, setSelectedReformTab] = useState<'agri' | 'ind' | 'trade'>('agri');
  const [hdiLifeExp, setHdiLifeExp] = useState(70);
  const [hdiMeanSchool, setHdiMeanSchool] = useState(6.5);
  const [hdiExpSchool, setHdiExpSchool] = useState(12.5);
  const [hdiGniPpp, setHdiGniPpp] = useState(6650);
  const [selectedGrouping, setSelectedGrouping] = useState<'saarc' | 'eu' | 'asean' | 'g20'>('eu');

  // Challenge Adaptive Engine
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge Drag/Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback State
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges based on BKT Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Dynamic HDI Calculations
  const calculatedHdi = useMemo(() => {
    const iHealth = Math.max(0, Math.min(1, (hdiLifeExp - 20) / (85 - 20)));
    const iExp = Math.max(0, Math.min(1, (hdiExpSchool - 0) / (18 - 0)));
    const iMean = Math.max(0, Math.min(1, (hdiMeanSchool - 0) / (15 - 0)));
    const iEdu = (iExp + iMean) / 2;
    const logVal = Math.log(Math.max(100, hdiGniPpp));
    const logMin = Math.log(100);
    const logMax = Math.log(75000);
    const iIncome = Math.max(0, Math.min(1, (logVal - logMin) / (logMax - logMin)));
    const hdi = Math.pow(iHealth * iEdu * iIncome, 1 / 3);
    const arithmeticMean = (iHealth + iEdu + iIncome) / 3;
    return {
      iHealth: Number(iHealth.toFixed(3)),
      iEdu: Number(iEdu.toFixed(3)),
      iIncome: Number(iIncome.toFixed(3)),
      hdi: Number(hdi.toFixed(3)),
      arithmeticMean: Number(arithmeticMean.toFixed(3)),
      penalty: Number((arithmeticMean - hdi).toFixed(3)),
    };
  }, [hdiLifeExp, hdiMeanSchool, hdiExpSchool, hdiGniPpp]);

  // Dynamic Price Mechanism Calculations (Qd = 120 - 2P, Qs = 20 + 3P)
  const priceMechanismData = useMemo(() => {
    const qd = Math.max(0, 120 - 2 * simPrice);
    const qs = Math.max(0, 20 + 3 * simPrice);
    const diff = qd - qs;
    const condition = diff > 0 ? 'Shortage (Excess Demand)' : diff < 0 ? 'Surplus (Excess Supply)' : 'Market Equilibrium';
    const pricePressure = diff > 0 ? 'Upward Pressure ↑' : diff < 0 ? 'Downward Pressure ↓' : 'Stable Clearing Price ✓';
    return { qd, qs, diff: Math.abs(diff), condition, pricePressure };
  }, [simPrice]);

  // Load Initial Mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Adaptive Effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 2D Canvas Indicator Animation
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Active Simulation Module: CISCE ISC Economics [Phase: ${phase.toUpperCase()}]`, 10, 18);
      const wave = Math.sin(frame * 0.08) * 4;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 14 + wave, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Escalating Hints
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
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete economic rationale together.');
    }
  }, [hintCount, challenge]);

  // Auto-hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 14000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Discovery Handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic reasoning!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate economic parameters and observe structural responses.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode activated. Experiment freely with economic variables before entering challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering Challenge Arena. Test your analytical and policy evaluation skills.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test and verify in the simulation.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Astute economic observation!' : 'Look closely at how the geometric mean operates.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Review your policy mastery and spaced repetition schedule.');
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
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numVal = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Exemplary application of economic principles.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us break down this question step by step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const handlePublicPrivateChange = useCallback((val: number) => {
    setPublicPrivateMix(val);
    audioManager.play('balance');
  }, []);

  const handlePriceChange = useCallback((val: number) => {
    setSimPrice(val);
    audioManager.play('count');
  }, []);

  // Motivational message logic
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE! Flawless economic acumen and analytical precision.';
    if (errors >= 1 && errors <= 3) return 'Great work! Excellent grasp of economic mechanisms and indicators.';
    if (errors >= 4 && errors <= 7) return 'Good effort! You have developed sound foundational understanding. Review targeted feedback to refine your scores.';
    return 'Do not give up — You WILL get this! Re-engage with the interactive simulators and practice key formulas.';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* Simulation Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-900/40 rounded-2xl border border-emerald-700/50" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400">Class 11 ISC Economics • Types of Economies, Price Mechanism & HDI Systems</p>
          </div>
        </div>

        {/* Phase / Difficulty Status */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-950 border border-emerald-600 text-emerald-400' :
              difficulty === 'standard' ? 'bg-blue-950 border border-blue-600 text-blue-400' :
              'bg-purple-950 border border-purple-600 text-purple-400'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800"
          >
            Phase: <span className="text-emerald-400 capitalize font-semibold">{phase}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg"
          >
            <h2 className="text-lg md:text-xl font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400/90 mt-2 font-mono">{SCENARIO.context}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <span aria-hidden="true">💡</span> Curiosity Diagnostic Hook:
            </div>
            <p className="text-base font-medium text-slate-100">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-emerald-400 font-bold" aria-hidden="true">✓</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-rose-400 font-bold" aria-hidden="true">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The geometric mean prevents high income from masking poor human health and schooling.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Launch interactive exploration lab"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/30 whitespace-nowrap"
                >
                  Launch Interactive Lab →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (Brilliant.org Visual Simulation) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Slide Navigator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800"
          >
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
              {EXPLORATION_STEPS.map((s, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setCurrentSlide(idx); audioManager.play('tap'); }}
                  aria-label={`Jump to Exploration Step ${idx + 1}`}
                  className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all ${
                    currentSlide === idx ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Step {idx + 1}
                </motion.button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-xl font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* Step 0: Economic Systems Spectrum */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-850">
                  <EconomicSystemsDiagram mix={publicPrivateMix} />

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-rose-400">Pure Socialism (100% State Gosplan)</span>
                      <span className="text-emerald-400">Mixed Economy ({100 - publicPrivateMix}% Private : {publicPrivateMix}% Public)</span>
                      <span className="text-cyan-400">Pure Capitalism (100% Free Market)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={publicPrivateMix}
                      aria-label="Adjust Public vs Private ownership percentage"
                      onChange={(e) => handlePublicPrivateChange(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900/90 rounded-xl border border-rose-900/40">
                      <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Public Sector ({publicPrivateMix}%)</h4>
                      <p className="text-xs text-slate-300 mt-1">Motive: Social Welfare & Equity</p>
                      <p className="text-xs text-slate-400 mt-1">Control: Central Planning, Minimum Support Prices, Public Distribution (PDS)</p>
                      <div className="mt-2 text-xs text-emerald-400">Examples: Indian Railways, SAIL (1954), Kendriya Vidyalayas</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900/90 rounded-xl border border-emerald-900/40">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Allocation Engine</h4>
                      <p className="text-xs text-slate-300 mt-1">
                        {publicPrivateMix > 75 ? 'Command Planning Dominates (Gosplan / Licence Raj)' :
                         publicPrivateMix < 25 ? 'Free Price Mechanism Dominates (Invisible Hand)' :
                         'Dual System: Price Mechanism + Regulatory Correction (RBI, SEBI, TRAI)'}
                      </p>
                      <div className="mt-2 text-xs text-amber-400">
                        {publicPrivateMix > 75 ? 'Risk: Shortages, Queues, Ambassador 40-yr Stagnation' :
                         publicPrivateMix < 25 ? 'Risk: Healthcare exclusion, High Gini (~0.47)' :
                         'Benefit: Private Innovation (TCS/Jio) + Safety Nets (NFSA 81 Cr)'}
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-slate-900/90 rounded-xl border border-cyan-900/40">
                      <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Private Sector ({100 - publicPrivateMix}%)</h4>
                      <p className="text-xs text-slate-300 mt-1">Motive: Profit Maximisation & Innovation</p>
                      <p className="text-xs text-slate-400 mt-1">Mechanism: Competitive Demand & Supply Price Signals</p>
                      <div className="mt-2 text-xs text-cyan-400">Examples: Reliance Jio, HDFC Bank, Tata Steel, 108 Unicorns</div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Price Mechanism Dynamic Lab */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 bg-slate-950 p-5 rounded-2xl border border-slate-850">
                  <PriceMechanismDiagram price={simPrice} qd={priceMechanismData.qd} qs={priceMechanismData.qs} />

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-mono">Market Price: ₹{simPrice}/kg</span>
                      <span className="text-emerald-400 font-semibold font-mono">Equilibrium Clearing: ₹20/kg (Q = 80 units)</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={40}
                      value={simPrice}
                      aria-label="Adjust market price slider in rupees"
                      onChange={(e) => handlePriceChange(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Quantity Demanded (Qd)</div>
                      <div className="text-lg font-bold text-cyan-400 font-mono">{priceMechanismData.qd} units</div>
                      <div className="text-[11px] text-slate-500">Qd = 120 - 2P</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Quantity Supplied (Qs)</div>
                      <div className="text-lg font-bold text-amber-400 font-mono">{priceMechanismData.qs} units</div>
                      <div className="text-[11px] text-slate-500">Qs = 20 + 3P</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Market Status</div>
                      <div className={`text-sm font-bold ${priceMechanismData.diff === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {priceMechanismData.condition}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{priceMechanismData.diff} units gap</div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Price Signal Response</div>
                      <div className="text-sm font-bold text-indigo-300">{priceMechanismData.pricePressure}</div>
                      <div className="text-[11px] text-slate-500">Adam Smith's Invisible Hand</div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Post-1991 Reforms Dynamic Comparator */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-850">
                  <div className="flex gap-2 pb-2 border-b border-slate-800">
                    {(['agri', 'ind', 'trade'] as const).map((tab) => (
                      <motion.button
                        key={tab}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setSelectedReformTab(tab); audioManager.play('tap'); }}
                        aria-label={`Select ${tab} reforms view`}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                          selectedReformTab === tab ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {tab === 'agri' ? '🌾 Agriculture' : tab === 'ind' ? '🏭 Industry & IBC' : '🚢 Foreign Trade'}
                      </motion.button>
                    ))}
                  </div>

                  {selectedReformTab === 'agri' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-rose-400 text-sm mb-2">Pre-1991: Subsistence & Food Deficit</h5>
                        <ul className="space-y-1.5 text-slate-300">
                          <li>• Wheat Output: ~55 Million Tonnes (import dependent in deficit years)</li>
                          <li>• Cropping: Heavy cereal monoculture tied to local mandi channels</li>
                          <li>• Milk Output: ~55 MT with fragmented rural supply chains</li>
                          <li>• Market: Rigid state APMC mandis with high commission agent layers</li>
                        </ul>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-emerald-800/60">
                        <h5 className="font-bold text-emerald-400 text-sm mb-2">Post-1991: Commercialisation & Surplus</h5>
                        <ul className="space-y-1.5 text-slate-300">
                          <li>• Wheat Output: ~113 Million Tonnes (Net foodgrain exporter)</li>
                          <li>• Milk: ~230 MT (World's #1 producer via Operation Flood)</li>
                          <li>• Contract Farming: PepsiCo Punjab potatoes, Suguna Poultry</li>
                          <li>• Digital Markets: e-NAM platform integrating 1,000+ mandis in 18 states</li>
                        </ul>
                      </motion.div>
                    </div>
                  )}

                  {selectedReformTab === 'ind' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-rose-400 text-sm mb-2">Pre-1991: Licence Raj & Sick Units</h5>
                        <ul className="space-y-1.5 text-slate-300">
                          <li>• Strict licensing for all capacity expansion and product mix</li>
                          <li>• SICA 1985 & BIFR: 5 to 10 years per resolution, capital trapped</li>
                          <li>• Port turnaround: 3-4 days; Logistics cost: &gt;16% of GDP</li>
                          <li>• Consumer choice: 2 car models with 7-year waiting queues</li>
                        </ul>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-emerald-800/60">
                        <h5 className="font-bold text-emerald-400 text-sm mb-2">Post-1991: Delicensing, SEZs & IBC 2016</h5>
                        <ul className="space-y-1.5 text-slate-300">
                          <li>• Delicensed all except 18 (now handful: tobacco, aerospace, haz chemicals)</li>
                          <li>• IBC 2016: 180-270 day strict NCLT timeline (Essar Steel ₹42,000 Cr resolved)</li>
                          <li>• Automobile boom: India 4th largest global automaker</li>
                          <li>• Stagnation challenge: Manufacturing stayed at 16-17% of GDP</li>
                        </ul>
                      </motion.div>
                    </div>
                  )}

                  {selectedReformTab === 'trade' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-rose-400 text-sm mb-2">Pre-1991: High Tariffs & Autarky</h5>
                        <ul className="space-y-1.5 text-slate-300">
                          <li>• Peak customs duties over 300%; strict FERA foreign exchange controls</li>
                          <li>• Trade-to-GDP ratio: Only ~17% (isolated from global supply chains)</li>
                          <li>• Exports: Low-value primary commodities (tea, jute, iron ore)</li>
                          <li>• Forex reserves: Crashed to &lt;3 weeks of imports in 1991 crisis</li>
                        </ul>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-emerald-800/60">
                        <h5 className="font-bold text-emerald-400 text-sm mb-2">Post-1991: Global Integration & IT Surge</h5>
                        <ul className="space-y-1.5 text-slate-300">
                          <li>• Peak tariffs lowered to ~10%; Trade-to-GDP ratio rose to ~35-40%</li>
                          <li>• Software/IT Services exports: ~$150B (TCS, Infosys, Wipro)</li>
                          <li>• Pharmacy of the World: 20% of global generic medicines volume</li>
                          <li>• Trade Deficit (~$190B) cushioned by remittances ($100B) & IT surplus</li>
                        </ul>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Interactive HDI Simulator */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 bg-slate-950 p-5 rounded-2xl border border-slate-850">
                  <HDITriangleDiagram
                    iHealth={calculatedHdi.iHealth}
                    iEdu={calculatedHdi.iEdu}
                    iIncome={calculatedHdi.iIncome}
                    hdi={calculatedHdi.hdi}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Life Expectancy (20 - 85 yrs)</span>
                          <span className="font-mono text-emerald-400 font-bold">{hdiLifeExp} yrs</span>
                        </div>
                        <input
                          type="range"
                          min={25}
                          max={85}
                          value={hdiLifeExp}
                          aria-label="Adjust Life Expectancy for HDI"
                          onChange={(e) => setHdiLifeExp(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Expected Schooling (0 - 18 yrs)</span>
                          <span className="font-mono text-cyan-400 font-bold">{hdiExpSchool} yrs</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={18}
                          step={0.5}
                          value={hdiExpSchool}
                          aria-label="Adjust Expected Schooling for HDI"
                          onChange={(e) => setHdiExpSchool(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">Mean Schooling (0 - 15 yrs)</span>
                          <span className="font-mono text-cyan-400 font-bold">{hdiMeanSchool} yrs</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={15}
                          step={0.5}
                          value={hdiMeanSchool}
                          aria-label="Adjust Mean Schooling for HDI"
                          onChange={(e) => setHdiMeanSchool(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">GNI Per Capita ($100 - $75,000 PPP)</span>
                          <span className="font-mono text-amber-400 font-bold">${hdiGniPpp}</span>
                        </div>
                        <input
                          type="range"
                          min={200}
                          max={60000}
                          step={250}
                          value={hdiGniPpp}
                          aria-label="Adjust GNI Per Capita in PPP dollars"
                          onChange={(e) => setHdiGniPpp(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-slate-950 rounded-lg border border-emerald-900/40">
                          <div className="text-[10px] text-slate-400">Health Index</div>
                          <div className="text-sm font-bold text-emerald-400 font-mono">{calculatedHdi.iHealth}</div>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-cyan-900/40">
                          <div className="text-[10px] text-slate-400">Edu Index</div>
                          <div className="text-sm font-bold text-cyan-400 font-mono">{calculatedHdi.iEdu}</div>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-amber-900/40">
                          <div className="text-[10px] text-slate-400">Income Index</div>
                          <div className="text-sm font-bold text-amber-400 font-mono">{calculatedHdi.iIncome}</div>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-r from-slate-950 via-indigo-950/60 to-slate-950 rounded-xl border border-indigo-700/60 text-center"
                      >
                        <div className="text-xs text-indigo-300">Final Composite HDI (Geometric Mean)</div>
                        <div className="text-3xl font-extrabold text-white my-1 font-mono">{calculatedHdi.hdi}</div>
                        <div className="text-xs font-semibold text-emerald-400">
                          Category:{' '}
                          {calculatedHdi.hdi >= 0.8 ? 'Very High (≥ 0.800)' :
                           calculatedHdi.hdi >= 0.7 ? 'High (0.700 - 0.799)' :
                           calculatedHdi.hdi >= 0.55 ? 'Medium (0.550 - 0.699)' : 'Low (< 0.550)'}
                        </div>
                      </motion.div>

                      <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                        Arithmetic Mean = {calculatedHdi.arithmeticMean} | <span className="text-amber-400 font-bold">Penalty = -{calculatedHdi.penalty}</span>
                        <div className="text-slate-500 text-[10px] mt-0.5">The cube-root geometric formula penalises single-dimension neglect.</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Regional & Global Trade Groupings */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-850">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'saarc' as const, name: 'SAARC (8 Members)', year: '1985' },
                      { id: 'eu' as const, name: 'EU (27 Members)', year: '1993' },
                      { id: 'asean' as const, name: 'ASEAN (10 Members)', year: '1967' },
                      { id: 'g20' as const, name: 'G-20 (19+EU+AU)', year: '1999' },
                    ].map((g) => (
                      <motion.button
                        key={g.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setSelectedGrouping(g.id); audioManager.play('tap'); }}
                        aria-label={`Select trade bloc ${g.name}`}
                        className={`p-3 text-left rounded-xl border transition-all ${
                          selectedGrouping === g.id
                            ? 'bg-indigo-950 border-indigo-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs">{g.name}</div>
                        <div className="text-[10px] text-slate-500">Est. {g.year}</div>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                    {selectedGrouping === 'saarc' && (
                      <>
                        <h5 className="font-bold text-rose-400 text-sm">SAARC: Frozen Potential</h5>
                        <p className="text-slate-300">Intra-grouping trade is only <span className="text-amber-400 font-bold font-mono">~5%</span> ($23B). Summits frozen since 2014 due to India-Pakistan cross-border terror conflict. India shifting focus to BIMSTEC.</p>
                      </>
                    )}
                    {selectedGrouping === 'eu' && (
                      <>
                        <h5 className="font-bold text-emerald-400 text-sm">European Union: Deepest Economic Union</h5>
                        <p className="text-slate-300">Intra-grouping trade reaches <span className="text-emerald-400 font-bold font-mono">~60%</span> (€4.2T). 20 Eurozone nations share the Euro currency, European Parliament, and four fundamental freedoms of movement.</p>
                      </>
                    )}
                    {selectedGrouping === 'asean' && (
                      <>
                        <h5 className="font-bold text-cyan-400 text-sm">ASEAN: Dynamic Regional Free Trade Area</h5>
                        <p className="text-slate-300">Combined GDP $3.6T (5th largest). India signed FTA in 2009; bilateral trade reaches $131B (~12% of India's total global trade).</p>
                      </>
                    )}
                    {selectedGrouping === 'g20' && (
                      <>
                        <h5 className="font-bold text-purple-400 text-sm">G-20: Global Economic Steering Forum</h5>
                        <p className="text-slate-300">Represents <span className="text-purple-300 font-bold font-mono">85% of Global GDP, 75% of Trade, 67% of Population</span>. India hosted the landmark 2023 New Delhi Summit, inducting the African Union.</p>
                      </>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              aria-label="Previous exploration step"
              className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Step
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('tap'); }}
                aria-label="Next exploration step"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Sandbox Mode"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/40 rounded-2xl border border-indigo-800/50"
          >
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">🧪</span> Free Policy Sandbox (No Grading Pressure)
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Adjust economic parameters simultaneously. Test how price equilibrium adjusts and how schooling shocks impact national HDI scores.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price Mechanism Sandbox Card */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-amber-400">Market Price Simulator (Wheat Mandi)</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Simulated Price</span>
                  <span className="font-mono text-white font-bold">₹{simPrice}/kg</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={40}
                  value={simPrice}
                  aria-label="Simulate wheat market price in rupees"
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 font-mono">
                <div>Qd = {priceMechanismData.qd} | Qs = {priceMechanismData.qs}</div>
                <div className="text-emerald-400">{priceMechanismData.condition}</div>
                <div className="text-slate-400">{priceMechanismData.pricePressure}</div>
              </div>
            </motion.div>

            {/* HDI Geometric Sandbox Card */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-cyan-400">HDI Capability Simulator</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Adult Mean Schooling</span>
                  <span className="font-mono text-white font-bold">{hdiMeanSchool} yrs</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={0.5}
                  value={hdiMeanSchool}
                  aria-label="Adjust mean schooling for sandbox"
                  onChange={(e) => setHdiMeanSchool(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1 font-mono">
                <div>Composite HDI: <span className="text-white font-bold">{calculatedHdi.hdi}</span></div>
                <div>Dimensional Penalty: <span className="text-amber-400">-{calculatedHdi.penalty}</span></div>
                <div className="text-emerald-400">Tier: {calculatedHdi.hdi >= 0.7 ? 'High' : 'Medium'}</div>
              </div>
            </motion.div>
          </div>

          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Advance to Examination Challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-950 text-sm"
            >
              Ready for Examination Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="font-mono text-emerald-400">Competency: {challenge.competencyLevel.toUpperCase()}</span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-600'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400">Node Ref: {challenge.nodeId}</span>
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 font-semibold uppercase"
              >
                {challenge.type}
              </motion.span>
            </div>

            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-5">
              {challenge.question}
            </p>

            {/* MCQ Render */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    aria-label={`Choice ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full p-4 text-left rounded-2xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {showExplanation && i === challenge.correctIndex && (
                      <span className="ml-2 text-emerald-400 font-bold" aria-hidden="true">✓</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Numeric Render */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    aria-label={`Enter numerical answer in ${challenge.unit || 'units'}`}
                    onChange={(e) => setNumericInput(e.target.value)}
                    disabled={showExplanation}
                    placeholder="Enter calculated value..."
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono w-48 text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-slate-400 font-mono text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    aria-label="Submit numeric response"
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Drag-Label Render */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      aria-label={`Draggable indicator: ${item.label}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-medium text-white cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['dim_health', 'dim_edu', 'dim_income'].map((tgt) => (
                    <div
                      key={tgt}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(tgt)}
                      aria-label={`Drop target area for ${tgt}`}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <div className="text-[11px] text-slate-400 uppercase font-semibold mb-1">
                        {tgt === 'dim_health' ? 'Health Dimension' : tgt === 'dim_edu' ? 'Education Dimension' : 'Standard of Living'}
                      </div>
                      <div className={`text-xs font-bold ${droppedLabels[tgt] ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {droppedLabels[tgt] ? `✓ ${droppedLabels[tgt]}` : 'Drop Indicator Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Verify dragged mappings"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Render */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag/reorder the items into sequential hierarchical order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0', 10);
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3 hover:border-indigo-500"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Confirm sequence arrangement"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Sequence
                </motion.button>
              </div>
            )}

            {/* Construct Render */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(p => p.includes(part) ? p.filter(x => x !== part) : [...p, part])}
                      aria-label={`Toggle reform policy part: ${part}`}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border ${
                        constructParts.includes(part)
                          ? 'bg-indigo-900/80 border-indigo-500 text-indigo-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '} {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px]">
                  <div className="text-[11px] text-slate-500 mb-1">Selected Reform Pillars:</div>
                  <div className="text-xs text-emerald-300 font-mono leading-relaxed">
                    {constructParts.join(' + ') || 'No policy pillars added yet...'}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' + '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Evaluate policy package"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Evaluate Policy Package
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 space-y-3"
              >
                <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <span aria-hidden="true">📖</span> Architectural Explanation:
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((stmt, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-200/90 leading-relaxed"
                  >
                    <span className="font-bold text-amber-400">{idx + 1}.</span> {stmt}{!stmt.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(r => r + 1)}
                      aria-label="Reveal next step in explanation"
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <span className="text-[11px] text-amber-400 font-semibold">✓ Full rationale revealed</span>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to next challenge or finalise assessment"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl border border-emerald-700/60 text-center space-y-3"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Simulation Completed!</h2>
            <p className="text-sm text-emerald-300 font-mono">
              Final Competency Score: <span className="text-2xl text-white font-bold">{Math.max(0, 100 - errors * 5)}%</span> | Mastery Tier: <span className="uppercase text-white font-bold">{masteryLevel}</span>
            </p>
          </motion.div>

          {/* Motivational Feedback Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-500'
                : errors <= 3
                ? 'bg-blue-950/60 border-blue-500'
                : errors <= 7
                ? 'bg-amber-950/60 border-amber-500'
                : 'bg-rose-950/60 border-rose-500'
            }`}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-300">Performance Evaluation</h4>
            <p className="text-sm font-semibold text-white leading-relaxed">
              {motivationalMessage}
            </p>
          </motion.div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Identified Misconception Profile</h4>
              {hitMisconceptions.map((mIdx, idx) => {
                const info = MISCONCEPTIONS[mIdx] || {
                  title: 'Economic Concept Refinement',
                  explanation: 'Review key trade and capability mechanisms.',
                  remedy: 'Apply the geometric mean for HDI, distinguish trade deficit from CAD, and remember that falling GDP shares in agriculture reflect faster tertiary growth.'
                };
                return (
                  <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="text-rose-400 font-bold">❌ {info.title}</div>
                    <div className="text-slate-300">{info.explanation}</div>
                    <div className="text-emerald-300">✓ Remedy: {info.remedy}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Spaced Repetition Schedule */}
          <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">SM-2 Spaced Repetition Protocol</h4>
              <p className="text-xs text-slate-300 mt-1">
                Next scheduled diagnostic review: <span className="font-bold text-indigo-200">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</span>.
              </p>
            </div>
            <span className="text-2xl" aria-hidden="true">📅</span>
          </motion.div>

          {/* Real-World Activity */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span aria-hidden="true">📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-300">
                  <span className="font-bold text-emerald-400 mr-1.5">{i + 1}.</span> {st}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating Canvas Animation Canvas Element */}
      <canvas ref={canvasRef} width={400} height={28} className="w-full mt-4 rounded-lg bg-slate-900/40 border border-slate-900" />

      {/* Engine Feedbacks */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_EconomicsTypesEconomiesSocialismSim;