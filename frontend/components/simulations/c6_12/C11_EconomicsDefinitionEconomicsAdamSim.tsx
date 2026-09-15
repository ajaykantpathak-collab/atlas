'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ────────────────────────────────────
const NODE_C11_ECON_001 = 'c11_econ_001'; // Adam Smith - Wealth Definition
const NODE_C11_ECON_002 = 'c11_econ_002'; // Alfred Marshall - Welfare Definition
const NODE_C11_ECON_003 = 'c11_econ_003'; // Lionel Robbins - Scarcity Definition
const NODE_C11_ECON_004 = 'c11_econ_004'; // Paul Samuelson - Growth Definition
const NODE_C11_ECON_005 = 'c11_econ_005'; // Scarcity & Allocation of Resources
const NODE_C11_ECON_006 = 'c11_econ_006'; // Micro vs Macro Economics
const NODE_C11_ECON_007 = 'c11_econ_007'; // Utility, Price, Value & Real vs Nominal
const NODE_C11_ECON_008 = 'c11_econ_008'; // Wealth, Welfare, Money (Stock vs Flow)
const NODE_C11_ECON_009 = 'c11_econ_009'; // Market, Capital, Investment, Income
const NODE_C11_ECON_010 = 'c11_econ_010'; // Production, Consumption, Saving, Business Cycle, AD/AS

const ALL_ECON_NODES = [
  NODE_C11_ECON_001,
  NODE_C11_ECON_002,
  NODE_C11_ECON_003,
  NODE_C11_ECON_004,
  NODE_C11_ECON_005,
  NODE_C11_ECON_006,
  NODE_C11_ECON_007,
  NODE_C11_ECON_008,
  NODE_C11_ECON_009,
  NODE_C11_ECON_010,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The Economic Policy Masterclass: From Wealth of Nations to Modern India',
  intro:
    'You are appointed Chief Economic Advisor to a state planning board in India. From managing water crises in Chennai and allocation of telecom spectrum to calculating real wages in Bengaluru and steering through post-pandemic business cycles, you must master the fundamental definitions and core concepts of economic science.',
  context:
    'Four great thinkers—Adam Smith, Alfred Marshall, Lionel Robbins, and Paul Samuelson—laid the foundations. You will manipulate live economic models, test inflation shocks, balance fiscal aggregates, and solve real resource allocation dilemmas.',
};

// ─── DISCOVERY QUESTION ────────────────────────────────────────────────��──────
const DISCOVERY_QUESTION = {
  question:
    'Suppose India announces that nominal GDP grew by 14% this year, but CPI inflation during the same period was 7%. If a worker’s monthly salary increased from ₹50,000 to ₹55,000 (+10%), what actually happened to her real purchasing power?',
  options: [
    'Her purchasing power increased by 10% because her salary rose by ₹5,000.',
    'Her purchasing power increased by 3% (10% salary hike − 7% inflation).',
    'Her purchasing power fell by 4% because nominal GDP grew faster at 14%.',
    'Her purchasing power rose by 14% matching national economic expansion.',
  ],
  correctIndex: 1,
  hintAfter:
    'Don’t worry if you were unsure! You just encountered the Money Illusion. Real welfare depends on what money can buy after adjusting for inflation.',
};

// ─── CHALLENGE INTERFACE ─────────────────────────────────────────────────────
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

// ─── 22 COMPREHENSIVE CHALLENGES (NEP 2020 ALIGNED) ──────────────────────────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Smith (Recall)
  {
    id: 'ch_001_smith_def',
    nodeId: NODE_C11_ECON_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Adam Smith (1776), what is the central subject matter of Economics?',
    options: [
      'The nature and causes of the wealth of nations and material production.',
      'The study of human welfare in the ordinary business of life.',
      'Human behaviour as a relationship between ends and scarce means.',
      'Dynamic growth of output and inter-temporal social distribution.',
    ],
    correctIndex: 0,
    explanation:
      'Adam Smith defined economics as an inquiry into the nature and causes of the wealth of nations, focusing strictly on material goods produced and accumulated.',
    hints: [
      'Think about who is called the Father of Economics and his famous 1776 book.',
      'Smith focused on material production, trade, and national wealth rather than welfare or choice.',
      'The answer is the definition centered directly on "the wealth of nations".',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Marshall (Understanding)
  {
    id: 'ch_002_marshall_shift',
    nodeId: NODE_C11_ECON_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How did Alfred Marshall (1890) re-position the relationship between "wealth" and "mankind"?',
    options: [
      'He discarded wealth completely and focused solely on spiritual meditation.',
      'He treated wealth as the ultimate end and human beings merely as tools of production.',
      'He made mankind the primary subject and demoted wealth to a means for achieving material wellbeing.',
      'He placed wealth and welfare as identical, interchangeable concepts.',
    ],
    correctIndex: 2,
    explanation:
      'Marshall famously declared economics to be on the one side a study of wealth, but on the other and more important side, a part of the study of man. Wealth is the means; human wellbeing is the end.',
    hints: [
      'Marshall wrote "Principles of Economics" to humanise the discipline.',
      'Think about what is the "means" and what is the "end" in Marshall\'s framework.',
      'Marshall regarded mankind in the ordinary business of life as the primary subject.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Robbins Scarcity (Understanding)
  {
    id: 'ch_003_robbins_scarcity',
    nodeId: NODE_C11_ECON_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Lionel Robbins (1932) defined economics around scarcity. Which condition is ESSENTIAL for scarcity to generate an economic choice problem?',
    options: [
      'Means must have only one single technical application.',
      'Means must be scarce AND possess alternative uses.',
      'The country must be experiencing acute poverty or famine.',
      'Resources must be completely unmeasurable in currency.',
    ],
    correctIndex: 1,
    explanation:
      'If scarce resources had only one use, there would be no choice to make. Scarcity combined with alternative uses forces choice and generates opportunity cost.',
    hints: [
      'If land could ONLY grow wheat and nothing else, would you have to choose between crops?',
      'Choice requires multiple competing pathways for deploying limited means.',
      'Scarcity plus alternative uses is Robbins’s indispensable condition.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Drag Label (Samuelson Elements)
  {
    id: 'ch_004_samuelson_drag',
    nodeId: NODE_C11_ECON_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the core components of Paul Samuelson’s growth-based definition to their respective functions.',
    dragItems: [
      { label: 'Scarce Productive Resources', targetId: 'target_robbins' },
      { label: 'Production Over Time (Growth)', targetId: 'target_growth' },
      { label: 'Distribution Among Groups', targetId: 'target_equity' },
      { label: 'With / Without Money (Barter)', targetId: 'target_scope' },
    ],
    correctMapping: {
      target_robbins: 'Scarce Productive Resources',
      target_growth: 'Production Over Time (Growth)',
      target_equity: 'Distribution Among Groups',
      target_scope: 'With / Without Money (Barter)',
    },
    explanation:
      'Samuelson integrated Robbinsian scarcity with dynamic growth over time, social distribution/equity, and universal non-monetary applicability.',
    hints: [
      'Match the static resource constraint to Robbins.',
      'Look for the inter-temporal element: "now and in the future" represents growth.',
      'The "who gets what" element corresponds to distribution/equity.',
    ],
  },
  // 5. Foundation - Micro vs Macro (Recall)
  {
    id: 'ch_005_micro_macro_dist',
    nodeId: NODE_C11_ECON_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is studying Tata Motors (an enterprise with over ₹4 lakh crore revenue) classified under MICROECONOMICS?',
    options: [
      'Because the Indian government owns fewer than 50% of its shares.',
      'Because the unit of analysis is ONE individual firm, regardless of its large physical size.',
      'Because its product is sold in small retail quantities to consumers.',
      'It is actually macroeconomics because its revenue is massive.',
    ],
    correctIndex: 1,
    explanation:
      'The micro-macro distinction is determined by the UNIT of analysis, not physical magnitude. One firm, one consumer, or one market is always microeconomics.',
    hints: [
      'Does "micro" mean physically tiny, or does it refer to individual units vs aggregates?',
      'Analyze whether you are studying the whole economy or a single business entity.',
      'The unit of study is a single corporate entity, making it microeconomic price and firm theory.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Stock vs Flow (Classification)
  {
    id: 'ch_006_stock_flow',
    nodeId: NODE_C11_ECON_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly pairs a STOCK variable with a FLOW variable?',
    options: [
      'Monthly Salary : Annual Bonus',
      'Bank Balance on 31st March : Monthly Salary',
      'Capital Investment in FY24 : GDP in FY24',
      'National Debt : Factory Capital Stock',
    ],
    correctIndex: 1,
    explanation:
      'Wealth/Bank Balance measured on a specific calendar date is a stock (snapshot). Salary earned over a period of time (a month) is a flow (rate).',
    hints: [
      'A stock is like a photograph taken on a date; a flow is like a video over a duration.',
      'Look for one item with a fixed date and another with a "per month/year" dimension.',
      'Bank balance on a specific date is a stock; monthly salary is a flow.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Numeric (Real Value Conversion)
  {
    id: 'ch_007_numeric_real_val',
    nodeId: NODE_C11_ECON_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'A software engineer in Bengaluru earned a nominal salary of ₹12,00,000 in 2024. The Consumer Price Index (CPI) stands at 150 (Base Year 2012 = 100). Calculate her real salary in 2012 base rupees (in Lakhs).',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'Lakh ₹',
    explanation:
      'Real Salary = (Nominal Salary / CPI) × 100 = (₹12,00,000 / 150) × 100 = ₹8,00,000 (8 Lakhs).',
    hints: [
      'Use the standard deflation formula: Real Value = (Nominal / Price Index) × 100.',
      'Divide 12,00,000 by 150, then multiply by 100.',
      '12 / 1.5 = 8 Lakh Rupees.',
    ],
  },
  // 8. Standard - Drag Sort (Evolution of Definitions)
  {
    id: 'ch_008_sort_evolution',
    nodeId: NODE_C11_ECON_004,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the historical definitions of economics in chronological order of their formulation.',
    sortItems: [
      'Adam Smith: Wealth & Causes of National Wealth (1776)',
      'Alfred Marshall: Mankind & Material Requisites of Wellbeing (1890)',
      'Lionel Robbins: Scarcity & Alternative Uses of Means (1932)',
      'Paul Samuelson: Dynamic Growth & Inter-temporal Distribution (1948)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Economic thought evolved sequentially from Smith’s Classical Wealth focus (1776) → Marshall’s Neo-classical Welfare (1890) → Robbins’s Scarcity (1932) → Samuelson’s Modern Growth Synthesis (1948).',
    hints: [
      'Start with the Father of Economics in the 18th century.',
      'Marshall published Principles of Economics in 1890 to counter Smith’s materialism.',
      'Robbins wrote during the 1930s Depression, followed by Samuelson post-WWII (1948).',
    ],
  },
  // 9. Standard - Application (Indian Allocation Problem)
  {
    id: 'ch_009_vidarbha_scarcity',
    nodeId: NODE_C11_ECON_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A farmer in Vidarbha with 2 hectares of land chooses between high-risk BT Cotton and drought-resistant Soybean. If she plants Cotton, what is her opportunity cost?',
    options: [
      'The market price she pays for purchasing hybrid BT cotton seeds.',
      'The net revenue and stability of the forgone Soybean harvest.',
      'The total interest due on her institutional Kisan Credit Card loan.',
      'The physical land itself which remains intact after harvest.',
    ],
    correctIndex: 1,
    explanation:
      'Opportunity cost is the value of the next-best alternative forgone. By selecting Cotton, she forfeits the stable Soybean harvest she could have grown on that same land.',
    hints: [
      'Opportunity cost is never the money expenditure paid for the chosen option.',
      'Look for what must be sacrificed or given up when making this production decision.',
      'The sacrificed alternative is the revenue and food security of the soybean crop.',
    ],
  },
  // 10. Standard - Numeric (Net Investment Calculation)
  {
    id: 'ch_010_net_investment',
    nodeId: NODE_C11_ECON_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Tata Steel begins the financial year with a capital stock of ₹300 crore. In FY24, its Gross Investment on new machinery is ₹65 crore, while annual Depreciation is ₹20 crore. What is its Net Investment in crore ₹?',
    correctAnswer: 45,
    tolerance: 0.5,
    unit: 'crore ₹',
    explanation:
      'Net Investment = Gross Investment − Depreciation = ₹65 crore − ₹20 crore = ₹45 crore. (Ending capital stock = ₹300 + ₹45 = ₹345 crore).',
    hints: [
      'Remember the fundamental capital identity: Net Investment = Gross Investment − Depreciation.',
      'Subtract the worn-out capital (depreciation) from total new capital expenditure.',
      '65 minus 20 equals 45.',
    ],
  },
  // 11. Standard - Analysis (Financial vs Economic Investment)
  {
    id: 'ch_011_fin_vs_econ_inv',
    nodeId: NODE_C11_ECON_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'An investor purchases 500 existing equity shares of Reliance Industries on the National Stock Exchange (NSE). How does this affect India’s real capital stock and GDP?',
    options: [
      'It immediately increases India’s GDP by the total rupee transaction value.',
      'It directly expands the productive machinery and factories in the Indian economy.',
      'It is purely a financial investment (transfer of ownership); it does not create new physical capital.',
      'It is counted under Government Gross Fixed Capital Formation.',
    ],
    correctIndex: 2,
    explanation:
      'Secondary stock purchases merely transfer paper title from one owner to another. Only economic investment (building new solar plants, factories, software centres) adds to the capital stock and GDP.',
    hints: [
      'Did this share purchase build a brand new factory or install new machinery today?',
      'Distinguish financial title exchange on secondary markets from real capital creation.',
      'Secondary trading is financial investment; it transfers ownership without adding physical output capacity.',
    ],
    misconceptionIndex: 5,
  },
  // 12. Standard - Analysis (Diamond-Water Paradox)
  {
    id: 'ch_012_diamond_water',
    nodeId: NODE_C11_ECON_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why does water have a very low market price despite having immense value-in-use, while diamonds have exorbitant prices despite minimal use-value in daily life?',
    options: [
      'Price is dictated purely by the moral necessity of human survival.',
      'Market price reflects exchange value governed by scarcity and supply, not total utility.',
      'Water has zero marginal utility for all consumers at all times.',
      'Diamond merchants possess legal monopoly exemptions under CISCE guidelines.',
    ],
    correctIndex: 1,
    explanation:
      'The Adam Smith diamond-water paradox is resolved by separating value-in-use from value-in-exchange. Price reflects marginal scarcity and exchange value, not total biological necessity.',
    hints: [
      'Think about the relative abundance of water vs extreme scarcity of diamonds.',
      'Useful things can be cheap if plentiful; non-essential things are costly if scarce.',
      'Exchange value depends on scarcity and marginal utility, not total use-value.',
    ],
  },
  // 13. Standard - Construct (Aggregate Demand Formula)
  {
    id: 'ch_013_ad_formula',
    nodeId: NODE_C11_ECON_010,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Assemble the four national components that form total Aggregate Demand (AD) in an open economy.',
    availableParts: ['C', '+', 'I', 'G', '(X - M)', 'S', 'T', 'Depreciation'],
    targetState: 'C + I + G + (X - M)',
    validationHint: 'Combine Consumption, Investment, Government Expenditure, and Net Exports.',
    explanation:
      'Aggregate Demand in an open economy is AD = C + I + G + (X − M), summing household consumption, private investment, government spending, and net foreign demand.',
    hints: [
      'Start with household Consumption (C).',
      'Add Investment (I) and Government Purchases (G).',
      'Finish with Net Exports, which is Exports minus Imports (X − M).',
    ],
  },
  // 14. Standard - Evaluation (Drain of Wealth Criticism)
  {
    id: 'ch_014_drain_of_wealth',
    nodeId: NODE_C11_ECON_001,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Dadabhai Naoroji’s "Drain of Wealth" theory (1867) demonstrated that Britain extracted ~9% of India’s national income annually. Which criticism of Adam Smith’s definition does this historical episode best prove?',
    options: [
      'Smith failed to explain how interest rates determine banking liquidity.',
      'Smith’s wealth-centered view ignored human welfare, enabling wealth extraction while Indian peasants starved.',
      'Smith placed excessive emphasis on non-material services like education.',
      'Smith believed all economic decisions must be planned by state monopolies.',
    ],
    correctIndex: 1,
    explanation:
      'Smith treated wealth accumulation as the sole end. The East India Company extracted tangible wealth from Bengal while millions perished in famines, proving that focusing purely on wealth blinds economists to human welfare.',
    hints: [
      'Was wealth flowing out of India? Yes. Were the people happy or well-off? No.',
      'Notice how focusing exclusively on wealth overlooks human suffering.',
      'A wealth-only lens ignores the welfare and survival of working people.',
    ],
  },
  // 15. Advanced - Analysis (Fallacy of Composition & Paradox of Thrift)
  {
    id: 'ch_015_fallacy_composition',
    nodeId: NODE_C11_ECON_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'What does the "Paradox of Thrift" reveal about the relationship between microeconomic actions and macroeconomic outcomes?',
    options: [
      'What benefits an individual household (saving more) can depress aggregate demand and lower total national income if done by everyone.',
      'Macroeconomics is merely microeconomics multiplied by the total population without any distortion.',
      'High saving rates immediately and automatically double national employment in the short run.',
      'Individual thriftiness violates the law of diminishing marginal utility.',
    ],
    correctIndex: 0,
    explanation:
      'The Paradox of Thrift exemplifies the fallacy of composition: an individual saving more builds personal wealth, but if every citizen simultaneously curtails spending, aggregate demand crashes, causing firms to cut production and reduce total income.',
    hints: [
      'Think what happens to shopkeepers’ revenues if every single person cuts spending at once.',
      'The whole is not always the simple sum of individual parts.',
      'Universal thrift shrinks aggregate consumption, causing recessions.',
    ],
  },
  // 16. Advanced - Numeric (Aggregate Demand Calculation)
  {
    id: 'ch_016_calc_ad_num',
    nodeId: NODE_C11_ECON_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'In FY24, an economy reports (in lakh crore ₹): Consumption C = 98, Investment I = 47, Government Expenditure G = 28, Exports X = 35, Imports M = 40. Calculate the exact Aggregate Demand (AD) in lakh crore ₹.',
    correctAnswer: 168,
    tolerance: 0.5,
    unit: 'lakh crore ₹',
    explanation:
      'AD = C + I + G + (X − M) = 98 + 47 + 28 + (35 − 40) = 173 + (−5) = 168 lakh crore ₹.',
    hints: [
      'First compute Net Exports: (X − M) = (35 − 40) = −5.',
      'Sum C + I + G: 98 + 47 + 28 = 173.',
      '173 + (−5) = 168.',
    ],
  },
  // 17. Advanced - Evaluation (Robbins vs Marshall in Indian Context)
  {
    id: 'ch_017_robbins_vs_marshall',
    nodeId: NODE_C11_ECON_003,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'While Lionel Robbins provided a logically universal positive science, why is Alfred Marshall’s welfare perspective still considered essential for India’s policymaking (e.g., PDS, MGNREGA)?',
    options: [
      'Because Robbins’s positive framework refuses to make value judgments on whether feeding the poor is a desirable social objective.',
      'Because Robbins believed that resources are completely infinite in developing economies.',
      'Because Marshall proved that services sector output should never be counted in national income.',
      'Because Indian policy strictly rejects the existence of opportunity cost.',
    ],
    correctIndex: 0,
    explanation:
      'Robbins treated economics as a value-neutral positive science of choice. But developing nations require normative welfare priorities (PDS food security, rural employment guarantees) to direct scarce resources toward eliminating poverty.',
    hints: [
      'Is choosing to subsidise food a moral/welfare choice or just a cold mathematical equation?',
      'Robbins excluded normative questions ("what ought to be") from economics.',
      'Marshall provided the ethical/welfare purpose that guides redistributive policy.',
    ],
  },
  // 18. Advanced - Analysis (Business Cycle vs Exogenous Shock)
  {
    id: 'ch_018_covid_cycle',
    nodeId: NODE_C11_ECON_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why was India’s GDP contraction of −23.9% in Q1 FY21 (COVID lockdown) fundamentally different from a typical cyclical recession like 2008-09?',
    options: [
      'The 2008-09 slowdown was caused by monsoon failures, whereas 2020 was caused by stock speculation.',
      'COVID-19 was an unprecedented exogenous health/policy shutdown, not an endogenous build-up of industrial overcapacity.',
      'The 2020 contraction lasted for 8 continuous years without any recovery.',
      'The Reserve Bank of India raised repo rates to 20% in 2020 causing an intentional liquidity freeze.',
    ],
    correctIndex: 1,
    explanation:
      'Cyclical downturns arise endogenously (over-investment, credit tightening, inventory overhang). The COVID-19 shock was an external, exogenous freeze on production and mobility, requiring health and income support rather than simple monetary tuning.',
    hints: [
      'Did factories shut in 2020 because nobody wanted goods, or because of a medical lockdown?',
      'Differentiate internal market dynamics from external global emergency shocks.',
      'It was an exogenous public health lockdown shock.',
    ],
  },
  // 19. Advanced - Evaluation (GDP rank vs HDI rank)
  {
    id: 'ch_019_gdp_vs_hdi',
    nodeId: NODE_C11_ECON_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'India is the 5th largest economy by GDP ($3.7T) but ranks 134th on the UN Human Development Index (0.644). What fundamental economic principle explains this divergence?',
    options: [
      'Wealth and income automatically guarantee optimal healthcare and education without state intervention.',
      'Wealth is merely a means; welfare depends on health, schooling, and distribution which GDP figures fail to measure.',
      'The Indian Rupee is not recognized as a medium of exchange internationally.',
      'The HDI index only counts gold reserves and agricultural output.',
    ],
    correctIndex: 1,
    explanation:
      'National wealth (GDP) is a means, whereas human welfare (HDI) is the end. When growth is unevenly distributed or public health/education lag, high GDP coexists with low human development.',
    hints: [
      'Does having a high national income mean every citizen has good schools and hospitals?',
      'Review the relationship: wealth is the means, welfare is the end.',
      'GDP measures material output, while welfare encompasses education, longevity, and equality.',
    ],
  },
  // 20. Advanced - Creativity / Policy Design (Spectrum Allocation)
  {
    id: 'ch_019_spectrum_allocation',
    nodeId: NODE_C11_ECON_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'In allocating scarce 5G spectrum, India shifted from discretionary administrative allotments (2G era) to transparent market auctions (2022 raising ₹1.5L Cr). Why is the allocation mechanism critical?',
    options: [
      'Administrative allocation always produces higher government revenue than open competitive bidding.',
      'Market auctions use the price mechanism to allocate scarce spectrum to firms with highest productive valuation transparently.',
      'Spectrum is physically infinite and requires no allocation system in modern physics.',
      'Auctions guarantee that all telecom services are offered to consumers at zero price.',
    ],
    correctIndex: 1,
    explanation:
      'Because resources are scarce, market auctions ensure transparent price discovery and allocate spectrum to the most efficient operators while eliminating corrupt bureaucratic rent-seeking.',
    hints: [
      'Recall the 2G scam loss vs ₹1.5 lakh crore transparent revenue in 2022.',
      'Consider how market prices signal true opportunity cost and economic efficiency.',
      'Competitive bidding aligns scarce resources with high-efficiency productive users.',
    ],
  },
  // 21. Advanced - Drag Sort (Micro-Macro Feedback Loop)
  {
    id: 'ch_021_feedback_loop',
    nodeId: NODE_C11_ECON_006,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the causal feedback loop when the Reserve Bank of India acts to curb inflation.',
    sortItems: [
      'RBI raises macroeconomic Repo Rate from 4.0% to 6.5%',
      'Commercial Banks (e.g. SBI) increase micro home loan interest rates to 9.15%',
      'Individual households postpone housing purchases due to higher monthly EMIs',
      'Aggregate demand in construction and real estate cools down, reducing economy-wide inflation',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Macro policy (Repo Rate) → Micro institutional pricing (Bank loan rates) → Micro consumer decision (Defer flat purchase) → Macro feedback (Reduced aggregate demand and inflation stabilization).',
    hints: [
      'Start with the central bank’s initial policy rate hike.',
      'Next comes the commercial bank response to borrowers.',
      'Then the household reacts to higher EMIs, which aggregates into lower national demand.',
    ],
  },
  // 22. Advanced - Synthesis (Samuelson’s Comprehensive Advantage)
  {
    id: 'ch_022_samuelson_synthesis',
    nodeId: NODE_C11_ECON_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Which scenario CANNOT be analysed by Lionel Robbins’s static scarcity definition but is FULLY captured by Paul Samuelson’s modern definition?',
    options: [
      'A farmer choosing whether to sow mustard or wheat on a fixed 3-acre plot today.',
      'A government choosing to spend ₹11.11 lakh crore on infrastructure to raise productive capacity for future generations.',
      'A consumer deciding between buying a coffee or a tea with ₹50 in cash.',
      'A firm deciding whether to hire 5 extra workers or buy 1 small machine this week.',
    ],
    correctIndex: 1,
    explanation:
      'Robbins treated resources as fixed and static at a single point in time. Samuelson explicitly introduced the inter-temporal growth dimension ("commodities over time, for consumption now and in the future"), capturing capital formation.',
    hints: [
      'Look for the option that involves time, future generations, and expanding the total economic pie.',
      'Robbins analysed allocation of a fixed pie; Samuelson analysed growing the pie over time.',
      'Long-term infrastructure investment for future growth is Samuelson’s unique inter-temporal contribution.',
    ],
  },
];

// ─── PROPS INTERFACE ─────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ───────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_ECON_001,
  title: 'Definitions & Core Foundations of Economics (ISC Class 11)',
  definition:
    'Economics began as the science of wealth (Adam Smith 1776), evolved into the study of human material welfare (Alfred Marshall 1890), was formalized as the positive science of scarcity and choice (Lionel Robbins 1932), and culminated in the modern dynamic synthesis of growth, distribution, and inter-temporal resource allocation (Paul Samuelson 1948).',
  eli5:
    'Economics is about how people and countries make smart choices with limited resources like time, land, and money—deciding what to make today, what to save for tomorrow, and how to share it fairly so everyone lives better.',
  misconceptions: [
    {
      misconception: 'Adam Smith defined economics as how individual people get rich with money.',
      correction:
        'Smith studied the Wealth of NATIONS—the macroeconomic production and accumulation of tangible material output through division of labour and trade, not individual get-rich advice.',
    },
    {
      misconception: 'Marshall defined economics as the equal study of wealth and welfare.',
      correction:
        'Marshall did not treat them equally; he shifted the focal END to human welfare, relegating wealth to the role of a material MEANS.',
    },
    {
      misconception: 'Robbins said scarcity means absolute physical poverty.',
      correction:
        'Scarcity is RELATIVE: unlimited wants exceeding limited means with alternative uses. Even billionaires and wealthy nations face scarcity of time, budget, and resources.',
    },
    {
      misconception: 'Studying a massive corporation like Tata Motors is Macroeconomics.',
      correction:
        'The distinction is based on the UNIT of analysis. A single firm or market is Microeconomics; only economy-wide aggregates (GDP, national inflation, total employment) are Macroeconomics.',
    },
    {
      misconception: 'A 10% nominal salary raise means you are 10% richer in real terms.',
      correction:
        'Real purchasing power equals nominal growth minus inflation. If inflation is 7%, a 10% salary hike increases real buying power by only ~3% (the Money Illusion).',
    },
    {
      misconception: 'Buying shares on the stock exchange adds to national capital stock and GDP.',
      correction:
        'Buying existing shares is a financial investment (transfer of ownership). Only economic investment (building new factories, buying equipment) expands capital stock and GDP.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Who is known as the Father of Economics and authored "The Wealth of Nations" in 1776?',
      options: ['Adam Smith', 'Alfred Marshall', 'Lionel Robbins', 'Paul Samuelson'],
      correctIndex: 0,
    },
    {
      question: 'Which definition first shifted the focus from "Wealth" to "Human Welfare"?',
      options: ['Wealth Definition', 'Welfare Definition (Marshall)', 'Scarcity Definition', 'Growth Definition'],
      correctIndex: 1,
    },
    {
      question: 'The condition that gives rise to Opportunity Cost in Robbins’s framework is:',
      options: ['Abundant money supply', 'Unlimited resources', 'Scarce means with alternative uses', 'Strict barter rules'],
      correctIndex: 2,
    },
    {
      question: 'Which economist added the explicit dimension of "production over time and future consumption"?',
      options: ['Adam Smith', 'Alfred Marshall', 'Lionel Robbins', 'Paul Samuelson'],
      correctIndex: 3,
    },
    {
      question: 'The Lasalgaon onion price determination is an example of:',
      options: ['Microeconomics', 'Macroeconomics', 'International Macroeconomics', 'Fiscal Monetary Policy'],
      correctIndex: 0,
    },
    {
      question: 'If nominal GDP grew 14% and the GDP deflator is 134, what is the nature of the 7% gap with real GDP?',
      options: ['Physical extra output', 'Pure price inflation', 'Foreign aid inflow', 'Gold accumulation'],
      correctIndex: 1,
    },
    {
      question: 'Net Investment is calculated as:',
      options: ['Gross Investment + Depreciation', 'Gross Investment − Depreciation', 'Capital Stock / Income', 'Savings × Interest Rate'],
      correctIndex: 1,
    },
    {
      question: 'The formula for Aggregate Demand (AD) in an open economy is:',
      options: ['C + S + T', 'C + I + G + (X − M)', 'P × Q', 'GDP − Depreciation'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student can distinguish the 4 definitions of economics, calculate real vs nominal values, differentiate micro from macro with feedback loops, calculate Net Investment and AD, and apply scarcity-opportunity cost logic to Indian economic decisions.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'The Great Thinkers: 4 Definitions of Economics',
    instruction: 'Click each landmark economist to compare their core focal shift, key work, and major criticism.',
    interactionType: 'click-economist',
    nodeId: NODE_C11_ECON_001,
  },
  {
    title: 'Real vs Nominal & The Money Illusion',
    instruction: 'Slide the Nominal Salary and Inflation sliders to observe how real purchasing power diverges.',
    interactionType: 'slider-inflation',
    nodeId: NODE_C11_ECON_007,
  },
  {
    title: 'The Scarcity & Opportunity Cost Allocator',
    instruction: 'Allocate India’s fiscal land/budget between Food Security and Industrial Green Energy to see opportunity cost.',
    interactionType: 'slider-ppf',
    nodeId: NODE_C11_ECON_005,
  },
  {
    title: 'Macroeconomic Aggregate Demand (AD) Engine',
    instruction: 'Adjust Consumption (C), Investment (I), Government Spending (G), and Net Exports (X-M) to watch national equilibrium move.',
    interactionType: 'slider-ad',
    nodeId: NODE_C11_ECON_010,
  },
  {
    title: 'The Business Cycle & Policy Feedback Loop',
    instruction: 'Scrub along the GDP timeline to identify Boom, Slowdown, COVID Trough, and Monetary Policy response.',
    interactionType: 'scrub-cycle',
    nodeId: NODE_C11_ECON_010,
  },
];

// ─── PREDICTION QUESTIONS ────────────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If the government increases nominal salary by 12% while annual inflation surges to 15%, what happens to the worker’s REAL standard of living?',
    options: [
      'Her standard of living rises by 12% because her payslip shows more cash.',
      'Her standard of living falls by approximately 3% because prices grew faster than wages.',
      'Her standard of living remains completely unaffected because money is a constant store of value.',
      'Her standard of living rises by 27% (12% + 15%).',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now set the Salary Hike slider to 12% and Inflation slider to 15% in the simulation below to verify the real purchasing power drop!',
    nodeId: NODE_C11_ECON_007,
  },
  {
    question:
      'Predict: If an economy shifts 50,000 hectares from growing Wheat to building Solar Parks, what is the exact economic Opportunity Cost?',
    options: [
      'The monetary construction cost of the solar panels.',
      'The quantity of Wheat and food grain output sacrificed on that land.',
      'The electricity tariffs paid by consumer households.',
      'The interest paid to the commercial banks.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Slide the land allocation control towards Solar Energy and watch the Wheat production meter decline!',
    nodeId: NODE_C11_ECON_005,
  },
];

// ─── OBSERVATION QUESTIONS ───────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question:
      'Observation: Look at the Real vs Nominal graph. When Inflation exceeds the Nominal Wage growth line, what color does the Real Purchasing Power meter turn?',
    observableOptions: [
      'Red (indicating negative real wage growth / loss in purchasing power)',
      'Green (indicating high wealth accumulation)',
      'Bright Blue (indicating perfect currency equilibrium)',
      'Yellow (indicating zero change in goods bought)',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_ECON_007,
  },
  {
    question:
      'Observation: In the Aggregate Demand simulator, what happens to total national output (AD) when Imports (M) become greater than Exports (X)?',
    observableOptions: [
      'AD increases because foreign goods add to domestic factory production.',
      'Net Exports become negative, acting as a net leakage that reduces total Aggregate Demand.',
      'Investment automatically doubles to compensate for the trade deficit.',
      'Government expenditure is forced to drop to zero instantly.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_ECON_010,
  },
];

// ─── REAL WORLD ACTIVITY ─────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Economic Advisor: Union Budget & Real Wage Audit',
  description:
    'Apply your Class 11 economic tools to evaluate your own city or family budget: calculate the real purchasing power of a salary after 6% inflation, classify 5 daily transactions as stock or flow, and evaluate an Indian capital infrastructure project.',
  steps: [
    'Take any family or entry-level salary (e.g. ₹6,00,000) and compute its real value with current CPI index (185 with base 2012=100).',
    'Classify 5 items from your home: Bank fixed deposit (Stock), Monthly electric bill (Flow), Gold necklace (Stock), Annual bonus (Flow), Car (Stock).',
    'Identify one central allocation choice in the latest Union Budget (e.g. ₹11.11 lakh crore Capital Expenditure vs food subsidies) and state the opportunity cost.',
    'Discuss with a classmate why India’s GDP rank (5th) differs from its HDI rank (134th) using Marshall and Samuelson’s concepts.',
  ],
};

// ─── 3 TOPIC-SPECIFIC RICH SVG DIAGRAM COMPONENTS ────────────────────────────

// SVG 1: Production Possibility Frontier (PPF) Diagram with Dynamic Tradeoff
function ProductionPossibilitySvg({ landWheat }: { landWheat: number }) {
  const wheatVal = landWheat * 0.5; // 0 to 50
  const solarVal = (100 - landWheat) * 0.35; // 0 to 35
  const ptX = 50 + solarVal * 6.5; // range 50..277.5
  const ptY = 230 - wheatVal * 3.6; // range 230..50

  return (
    <svg viewBox="0 0 340 260" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
      <defs>
        <linearGradient id="ppfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Axis Lines */}
      <line x1="45" y1="230" x2="310" y2="230" stroke="#64748b" strokeWidth="2" />
      <line x1="45" y1="230" x2="45" y2="25" stroke="#64748b" strokeWidth="2" />

      {/* Labels */}
      <text x="310" y="245" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">Clean Energy (Solar MW) →</text>
      <text x="25" y="22" fill="#94a3b8" fontSize="10" fontWeight="bold">↑ Food Grain (Wheat)</text>

      {/* Feasible Region Shade under PPF Curve */}
      <path
        d="M 45 50 Q 170 80 280 230 L 45 230 Z"
        fill="url(#areaGrad)"
      />

      {/* PPF Frontier Curve */}
      <path
        d="M 45 50 Q 170 80 280 230"
        fill="none"
        stroke="url(#ppfGrad)"
        strokeWidth="3.5"
      />

      {/* Current Production Point */}
      <circle cx={ptX} cy={ptY} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
      <line x1={ptX} y1={ptY} x2={ptX} y2="230" stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.5" />
      <line x1={ptX} y1={ptY} x2="45" y2={ptY} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1.5" />

      {/* Labels at point */}
      <text x={Math.min(ptX + 10, 240)} y={Math.max(ptY - 10, 45)} fill="#fbbf24" fontSize="11" fontWeight="bold">
        Point P (Allocated)
      </text>
      <text x="140" y="195" fill="#10b981" fontSize="10" opacity="0.9">Attainable & Efficient</text>
      <text x="230" y="80" fill="#f43f5e" fontSize="10" opacity="0.9">Unattainable (Scarcity)</text>
    </svg>
  );
}

// SVG 2: Circular Flow of Income & Productive Feedback Loop
function CircularFlowSvg() {
  return (
    <svg viewBox="0 0 360 260" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
      {/* Top Box: Households */}
      <rect x="90" y="15" width="180" height="42" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="180" y="33" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">HOUSEHOLDS (Consumers)</text>
      <text x="180" y="47" fill="#94a3b8" fontSize="9" textAnchor="middle">Own Factors of Production / Consume Output</text>

      {/* Bottom Box: Firms */}
      <rect x="90" y="200" width="180" height="42" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
      <text x="180" y="218" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">PRODUCING FIRMS (Enterprises)</text>
      <text x="180" y="232" fill="#94a3b8" fontSize="9" textAnchor="middle">Hire Inputs / Supply Goods & Services</text>

      {/* Outer Real Flow: Clockwise */}
      <path d="M 80 35 C 10 35 10 220 80 220" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
      <text x="12" y="125" fill="#f59e0b" fontSize="9" fontWeight="bold" transform="rotate(-90 12,125)" textAnchor="middle">
        Real Flow: Factors (Land, Labour, Capital)
      </text>

      {/* Outer Real Flow Return: Goods & Services */}
      <path d="M 280 220 C 350 220 350 35 280 35" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
      <text x="348" y="125" fill="#f59e0b" fontSize="9" fontWeight="bold" transform="rotate(90 348,125)" textAnchor="middle">
        Real Flow: Final Goods & Services
      </text>

      {/* Inner Money Flow: Counter-Clockwise */}
      <path d="M 120 62 C 60 110 60 150 120 195" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
      <text x="75" y="130" fill="#06b6d4" fontSize="9" fontWeight="bold">₹ Factor Incomes</text>

      <path d="M 240 195 C 300 150 300 110 240 62" fill="none" stroke="#a855f7" strokeWidth="2.5" />
      <text x="220" y="130" fill="#a855f7" fontSize="9" fontWeight="bold">₹ Consumption Spending</text>

      {/* Central Core Identity */}
      <circle cx="180" cy="128" r="22" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
      <text x="180" y="125" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">National</text>
      <text x="180" y="138" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Income (Y)</text>
    </svg>
  );
}

// SVG 3: Macroeconomic AD/AS Equilibrium and Price Level
function AggregateDemandSupplySvg({ totalAD }: { totalAD: number }) {
  const shiftOffset = (totalAD - 168) * 0.9;
  const eqX = 180 + shiftOffset * 0.7;
  const eqY = 130 - shiftOffset * 0.4;

  return (
    <svg viewBox="0 0 340 260" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
      {/* Axes */}
      <line x1="45" y1="225" x2="310" y2="225" stroke="#64748b" strokeWidth="2" />
      <line x1="45" y1="225" x2="45" y2="25" stroke="#64748b" strokeWidth="2" />

      <text x="310" y="240" fill="#94a3b8" fontSize="10" textAnchor="end" fontWeight="bold">Real GDP Output (Y) →</text>
      <text x="25" y="22" fill="#94a3b8" fontSize="10" fontWeight="bold">↑ General Price Level (P)</text>

      {/* Aggregate Supply Curve */}
      <path
        d="M 50 210 Q 150 200 220 120 T 290 35"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />
      <text x="295" y="45" fill="#10b981" fontSize="11" fontWeight="bold">AS</text>

      {/* Aggregate Demand Curve */}
      <line
        x1={60 + shiftOffset}
        y1="40"
        x2={280 + shiftOffset}
        y2="215"
        stroke="#6366f1"
        strokeWidth="3.5"
      />
      <text x={285 + shiftOffset} y="210" fill="#818cf8" fontSize="11" fontWeight="bold">AD = C+I+G+(X-M)</text>

      {/* Equilibrium Point */}
      <circle cx={eqX} cy={eqY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
      <line x1={eqX} y1={eqY} x2={eqX} y2="225" stroke="#f43f5e" strokeDasharray="3 3" strokeWidth="1.5" />
      <line x1={eqX} y1={eqY} x2="45" y2={eqY} stroke="#f43f5e" strokeDasharray="3 3" strokeWidth="1.5" />

      <text x={eqX + 8} y={eqY - 8} fill="#fda4af" fontSize="10" fontWeight="bold">
        Equilibrium (E)
      </text>
      <text x="50" y={Math.max(eqY - 4, 35)} fill="#94a3b8" fontSize="9">P*</text>
      <text x={eqX - 10} y="240" fill="#94a3b8" fontSize="9">Y*</text>
    </svg>
  );
}

// ─── MAIN SIMULATION COMPONENT ───────────────────────────────────────────────
export function C11_EconomicsDefinitionEconomicsAdamSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── STATE HOOKS ────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org pattern state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration State
  const [selectedEconomist, setSelectedEconomist] = useState<string>('smith');
  const [nominalSalary, setNominalSalary] = useState<number>(60000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [salaryHikePercent, setSalaryHikePercent] = useState<number>(10);
  const [landForWheat, setLandForWheat] = useState<number>(60);
  const [adConsumption, setAdConsumption] = useState<number>(98);
  const [adInvestment, setAdInvestment] = useState<number>(47);
  const [adGovSpending, setAdGovSpending] = useState<number>(28);
  const [adExports, setAdExports] = useState<number>(35);
  const [adImports, setAdImports] = useState<number>(40);

  // Adaptive Mastery & BKT State
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

  // Drag-and-drop & Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback & Animation state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [lastClickedWrongOption, setLastClickedWrongOption] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subject config
  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // ─── DERIVED REAL-TIME VALUES ───────��───────────────────────────────────────
  const realSalaryValue = useMemo(() => {
    const cpiIndex = 100 + inflationRate * 8;
    return Math.round((nominalSalary / cpiIndex) * 100);
  }, [nominalSalary, inflationRate]);

  const realWageGrowthRate = useMemo(() => {
    return salaryHikePercent - inflationRate;
  }, [salaryHikePercent, inflationRate]);

  const totalCalculatedAD = useMemo(() => {
    return adConsumption + adInvestment + adGovSpending + (adExports - adImports);
  }, [adConsumption, adInvestment, adGovSpending, adExports, adImports]);

  const wheatOutputTonnes = useMemo(() => landForWheat * 50, [landForWheat]);
  const solarEnergyMegawatts = useMemo(() => (100 - landForWheat) * 35, [landForWheat]);

  // Spaced repetition review interval string
  const srsReviewText = useMemo(() => {
    if (errors === 0) return 'review in 7 days';
    if (errors <= 3) return 'review in 3 days';
    return 'review in 1 day';
  }, [errors]);

  const srsReviewDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  const srsNextDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + srsReviewDays);
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [srsReviewDays]);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ─────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───────────────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS TRACKER ─────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, '#10b981');
      grad.addColorStop(0.5, '#06b6d4');
      grad.addColorStop(1, '#6366f1');
      ctx.fillStyle = grad;
      ctx.fillRect(0, canvas.height - 4, canvas.width, 4);

      const pulseX = (canvas.width * (currentChallenge + 1)) / filteredChallenges.length;
      const radius = 6 + Math.sin(frame * 0.08) * 2.5;
      ctx.beginPath();
      ctx.arc(pulseX, 15, Math.max(2, radius), 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`ISC Econ Unit: Node c11_econ_00${currentChallenge + 1} Tracker`, 10, 18);
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // ─── INACTIVITY AUTO-HINT ──────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us inspect the full step-by-step reasoning together.');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ���── EVENT HANDLERS ────────────────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant deduction! Real purchasing power accounts for inflation.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration! Manipulate the economic variables.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now try the free sandbox simulator without any grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges!');
  }, []);

  const handleEconomistClick = useCallback((id: string) => {
    setSelectedEconomist(id);
    audioManager.play('tap');
    const spokenText: Record<string, string> = {
      smith: 'Adam Smith: Economics is the science of national wealth and causes of material production.',
      marshall: 'Alfred Marshall: Economics is the study of mankind in the ordinary business of life for material welfare.',
      robbins: 'Lionel Robbins: Economics is the study of human behaviour between ends and scarce means with alternative uses.',
      samuelson: 'Paul Samuelson: Economics is the study of dynamic resource choice over time and social distribution.',
    };
    if (spokenText[id]) speechManager.speak(spokenText[id]);
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the color indicator on the real wage meter.');
  }, []);

  const handleSalarySliderChange = useCallback((val: number) => {
    setNominalSalary(val);
    audioManager.play('count');
  }, []);

  const handleInflationSliderChange = useCallback((val: number) => {
    setInflationRate(val);
    audioManager.play('count');
  }, []);

  const handleLandSliderChange = useCallback((val: number) => {
    setLandForWheat(val);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_ECON_NODES, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Simulation complete with a score of ${finalScore} percent. Topic scheduled for ${srsReviewText}.`);
  }, [errors, onComplete, srsReviewText]);

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
    setLastClickedWrongOption(null);
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

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
        if (!isCorrect && typeof answer === 'number') {
          setLastClickedWrongOption(answer);
        }
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setLastClickedWrongOption(null);
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent economic reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step breakdown.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        let arr = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Clean up timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RECHARTS DATA FOR VISUALIZATIONS ───────────────────────────────────────
  const realVsNominalData = useMemo(() => {
    return [
      { year: '2020', nominal: 50000, real: 50000 },
      { year: '2021', nominal: 54000, real: 51200 },
      { year: '2022', nominal: 60000, real: 53000 },
      { year: '2023', nominal: 67000, real: 55000 },
      { year: '2024 (You)', nominal: nominalSalary, real: realSalaryValue },
    ];
  }, [nominalSalary, realSalaryValue]);

  const businessCycleData = useMemo(() => {
    return [
      { year: 2007, gdpGrowth: 9.3, phase: 'Boom (Peak)' },
      { year: 2009, gdpGrowth: 3.9, phase: 'Slowdown (Lehman Shock)' },
      { year: 2016, gdpGrowth: 8.3, phase: 'Pre-Demonetisation' },
      { year: 2020, gdpGrowth: -5.8, phase: 'COVID Lockdown Shock' },
      { year: 2021, gdpGrowth: -23.9, phase: 'Q1 Trough (Strict Lockdown)' },
      { year: 2022, gdpGrowth: 8.7, phase: 'V-Shaped Recovery' },
      { year: 2024, gdpGrowth: 8.2, phase: 'Steady Expansion' },
    ];
  }, []);

  // ─── MOTIVATIONAL FEEDBACK TEXT CALCULATOR ─────────────────────────────────
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── JSX RENDERING ──────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
              ISC Class 11 Commerce & Economics
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-xs text-slate-300 font-mono">
            Phase: <strong className="text-emerald-400 uppercase">{phase}</strong>
          </span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border border-rose-700'
                : 'bg-indigo-950 text-indigo-400 border border-indigo-700'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/40 shadow-xl">
            <h2 className="text-xl font-bold text-indigo-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/30 text-xs text-indigo-200">
              💡 <strong>Advisor Brief:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-md">
                CURIOSITY HOOK (NOT GRADED)
              </span>
            </div>
            <p className="text-base font-semibold text-white mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-mono shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/50 border-amber-700 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '🎉 Spot on! 10% nominal salary − 7% inflation = ~3% real gain in actual purchasing power.'
                    : DISCOVERY_QUESTION.hintAfter}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  Enter Interactive Economic Laboratory →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Interactive Lab Step</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs font-mono bg-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          <p className="text-sm font-medium text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-6"
            >
              {/* STEP 0: 4 THINKERS COMPARISON */}
              {currentSlide === 0 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'smith', name: 'Adam Smith', year: '1776', tag: 'Wealth', color: 'border-amber-500' },
                      { id: 'marshall', name: 'Alfred Marshall', year: '1890', tag: 'Welfare', color: 'border-blue-500' },
                      { id: 'robbins', name: 'Lionel Robbins', year: '1932', tag: 'Scarcity', color: 'border-emerald-500' },
                      { id: 'samuelson', name: 'Paul Samuelson', year: '1948', tag: 'Growth', color: 'border-purple-500' },
                    ].map((econ) => (
                      <motion.button
                        key={econ.id}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleEconomistClick(econ.id)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedEconomist === econ.id
                            ? `bg-slate-800 ${econ.color} shadow-lg ring-1 ring-white/20`
                            : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <span className="text-xs font-mono text-slate-400">{econ.year}</span>
                        <h4 className="font-bold text-white text-sm">{econ.name}</h4>
                        <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-slate-700/50 text-slate-200">
                          {econ.tag} Focus
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Visual Detail Inspector with Topic SVG Diagram */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      {selectedEconomist === 'smith' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-amber-400 text-base">Adam Smith: Wealth of Nations (1776)</h4>
                            <span className="text-xs text-slate-400">Classical School</span>
                          </div>
                          <p className="text-sm text-slate-300 mt-2">
                            Defined Economics as the science studying the <strong>nature and causes of national wealth</strong>. Introduced the analytical concept of <em>Homo Economicus</em>.
                          </p>
                          <div className="mt-3 space-y-2 text-xs">
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                              <span className="text-amber-300 font-bold">Key Contribution:</span> Division of labour and free trade as wealth drivers.
                            </div>
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-rose-900/40">
                              <span className="text-rose-400 font-bold">Major Flaw:</span> Excluded non-material services (teachers, doctors).
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedEconomist === 'marshall' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-blue-400 text-base">Alfred Marshall: Principles (1890)</h4>
                            <span className="text-xs text-slate-400">Neo-Classical School</span>
                          </div>
                          <p className="text-sm text-slate-300 mt-2">
                            Economics is the <strong>study of mankind in the ordinary business of life</strong>; examining individual and social action connected to <em>material wellbeing</em>.
                          </p>
                          <div className="mt-3 space-y-2 text-xs">
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                              <span className="text-blue-300 font-bold">The Great Shift:</span> Welfare is the END; wealth is merely the MEANS.
                            </div>
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-rose-900/40">
                              <span className="text-rose-400 font-bold">Major Flaw:</span> Welfare is subjective and unmeasurable in rupees.
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedEconomist === 'robbins' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-emerald-400 text-base">Lionel Robbins: Scarcity (1932)</h4>
                            <span className="text-xs text-slate-400">Positive Choice School</span>
                          </div>
                          <p className="text-sm text-slate-300 mt-2">
                            Economics is the science studying human behaviour as a relationship between <strong>unlimited ends and scarce means with alternative uses</strong>.
                          </p>
                          <div className="mt-3 space-y-2 text-xs">
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                              <span className="text-emerald-300 font-bold">Causal Chain:</span> Scarcity + Alternative Uses → Choice → Opportunity Cost.
                            </div>
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-rose-900/40">
                              <span className="text-rose-400 font-bold">Major Flaw:</span> Static view (ignores growth) & value-free (ignores justice).
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedEconomist === 'samuelson' && (
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-purple-400 text-base">Paul Samuelson: Growth (1948)</h4>
                            <span className="text-xs text-slate-400">Modern Growth Synthesis</span>
                          </div>
                          <p className="text-sm text-slate-300 mt-2">
                            Studies how men choose to employ scarce resources to produce commodities <strong>over time and distribute them now and in the future</strong>.
                          </p>
                          <div className="mt-3 space-y-2 text-xs">
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                              <span className="text-purple-300 font-bold">Dynamic Synthesis:</span> Integrates scarcity + time/growth + social equity.
                            </div>
                            <div className="p-2.5 bg-slate-900 rounded-lg border border-emerald-900/40">
                              <span className="text-emerald-400 font-bold">Universal:</span> Includes non-monetary barter haats & capital accumulation.
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* TOPIC SVG DIAGRAM 1: Circular Flow of Economic Activity */}
                    <div className="flex flex-col justify-center">
                      <span className="text-[11px] text-slate-400 font-bold block mb-1">
                        Topic SVG Model: Circular Flow & National Economic System
                      </span>
                      <CircularFlowSvg />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: REAL VS NOMINAL SIMULATOR */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/50">
                      <p className="text-sm font-semibold text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 rounded-lg text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="text-xs text-amber-300 bg-amber-900/30 p-2.5 rounded-lg">
                      {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Nominal Monthly Salary (Current ₹)</span>
                          <span className="font-mono text-emerald-400 font-bold">₹{nominalSalary.toLocaleString('en-IN')}</span>
                        </div>
                        <input
                          type="range"
                          min={30000}
                          max={150000}
                          step={5000}
                          value={nominalSalary}
                          onChange={(e) => handleSalarySliderChange(Number(e.target.value))}
                          aria-label="Adjust Nominal Monthly Salary"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">Annual CPI Inflation Rate</span>
                          <span className={`font-mono font-bold ${inflationRate > 8 ? 'text-rose-400' : 'text-amber-400'}`}>
                            {inflationRate}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={20}
                          step={1}
                          value={inflationRate}
                          onChange={(e) => handleInflationSliderChange(Number(e.target.value))}
                          aria-label="Adjust Inflation Rate"
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-xs text-slate-400">Calculated Real Salary (2012 Constant Rupees):</span>
                        <div className="text-2xl font-black text-cyan-400 font-mono">
                          ₹{realSalaryValue.toLocaleString('en-IN')}
                        </div>
                        <span className="text-[11px] text-slate-500">
                          Deflation Formula: (Nominal / CPI [{100 + inflationRate * 8}]) × 100
                        </span>
                      </div>
                    </div>

                    {/* Chart visual */}
                    <div className="h-56 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <span className="text-[11px] text-slate-400 font-bold block mb-1">Nominal vs Real Salary Trend</span>
                      <ResponsiveContainer width="100%" height="85%">
                        <LineChart data={realVsNominalData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Line type="monotone" dataKey="nominal" stroke="#10b981" strokeWidth={2.5} name="Nominal ₹" />
                          <Line type="monotone" dataKey="real" stroke="#06b6d4" strokeWidth={2.5} name="Real ₹ (Purchasing Power)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {!observationAnswered && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mt-3">
                      <p className="text-xs text-white font-semibold mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left text-xs bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: SCARCITY & PPF ALLOCATOR WITH TOPIC SVG DIAGRAM */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">100,000 Hectares of State Land Allocation</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {landForWheat}% Wheat : {100 - landForWheat}% Solar Energy
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={landForWheat}
                    onChange={(e) => handleLandSliderChange(Number(e.target.value))}
                    aria-label="Allocate Land Between Wheat and Solar Energy"
                    className="w-full accent-indigo-500 cursor-pointer"
                  />

                  {/* TOPIC SVG DIAGRAM 2: Production Possibility Frontier (PPF) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <span className="text-[11px] text-slate-400 font-bold block mb-1">
                        Topic SVG Model: Production Possibility Frontier (PPF Curve)
                      </span>
                      <ProductionPossibilitySvg landWheat={landForWheat} />
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/40">
                        <span className="text-xs text-amber-400 font-bold uppercase">🌾 Food Security Output</span>
                        <div className="text-xl font-bold text-white font-mono mt-1">
                          {wheatOutputTonnes.toLocaleString('en-IN')} Quintals Wheat
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                          <motion.div className="h-full bg-amber-500" animate={{ width: `${landForWheat}%` }} />
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-cyan-900/40">
                        <span className="text-xs text-cyan-400 font-bold uppercase">⚡ Clean Energy Output</span>
                        <div className="text-xl font-bold text-white font-mono mt-1">
                          {solarEnergyMegawatts.toLocaleString('en-IN')} Megawatts Solar
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                          <motion.div className="h-full bg-cyan-500" animate={{ width: `${100 - landForWheat}%` }} />
                        </div>
                      </div>

                      <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
                        🔍 <strong>Opportunity Cost in Action:</strong> Expanding Solar power by 350 MW requires sacrificing 500 Quintals of Wheat. Robbins’s law in practice!
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: AGGREGATE DEMAND ENGINE WITH TOPIC SVG DIAGRAM */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Consumption (C)</span>
                      <div className="text-lg font-bold text-white font-mono">₹{adConsumption}L Cr</div>
                      <input
                        type="range"
                        min={70}
                        max={130}
                        value={adConsumption}
                        onChange={(e) => setAdConsumption(Number(e.target.value))}
                        aria-label="Set Consumption Expenditure"
                        className="w-full accent-blue-500 mt-1"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Investment (I)</span>
                      <div className="text-lg font-bold text-white font-mono">₹{adInvestment}L Cr</div>
                      <input
                        type="range"
                        min={20}
                        max={80}
                        value={adInvestment}
                        onChange={(e) => setAdInvestment(Number(e.target.value))}
                        aria-label="Set Investment Expenditure"
                        className="w-full accent-emerald-500 mt-1"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Govt Spending (G)</span>
                      <div className="text-lg font-bold text-white font-mono">₹{adGovSpending}L Cr</div>
                      <input
                        type="range"
                        min={10}
                        max={60}
                        value={adGovSpending}
                        onChange={(e) => setAdGovSpending(Number(e.target.value))}
                        aria-label="Set Government Spending"
                        className="w-full accent-purple-500 mt-1"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Net Exports (X−M)</span>
                      <div className={`text-lg font-bold font-mono ${adExports - adImports >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {adExports - adImports >= 0 ? '+' : ''}{adExports - adImports}L Cr
                      </div>
                      <span className="text-[10px] text-slate-500">X: ₹{adExports}L / M: ₹{adImports}L</span>
                    </div>
                  </div>

                  {/* TOPIC SVG DIAGRAM 3: Macro AD/AS Equilibrium */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <span className="text-[11px] text-slate-400 font-bold block mb-1">
                        Topic SVG Model: Macroeconomic AD/AS Equilibrium
                      </span>
                      <AggregateDemandSupplySvg totalAD={totalCalculatedAD} />
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-gradient-to-r from-slate-950 via-indigo-950/50 to-slate-950 rounded-xl border border-indigo-700/50">
                        <span className="text-xs text-indigo-300 font-bold uppercase">Total Aggregate Demand (AD)</span>
                        <div className="text-2xl font-black text-white font-mono mt-1">
                          ₹{totalCalculatedAD} Lakh Crore
                        </div>
                        <span className="text-xs font-mono bg-indigo-900/50 px-3 py-1 rounded-lg text-indigo-200 inline-block mt-2">
                          AD = C + I + G + (X − M)
                        </span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                        When consumer or government spending expands, the AD curve shifts outward to the right, driving both higher real national output and equilibrium price level.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: BUSINESS CYCLE SCRUBBER */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="h-48 bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 font-bold block mb-1">
                      India GDP Growth & Cycle Waves (2007–2024)
                    </span>
                    <ResponsiveContainer width="100%" height="85%">
                      <AreaChart data={businessCycleData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="gdpGrowth" stroke="#6366f1" fill="#4f46e5" fillOpacity={0.3} name="GDP Growth %" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <span className="text-amber-400 font-bold">Key ISC Distinction:</span> Slowdown (e.g. 2008-09 dropping from 9% to 3.9% = positive growth) is NOT a recession. A technical recession requires two consecutive negative quarters. COVID-19 Q1 FY21 (−23.9%) was a severe depression-like shock.
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Exploration Slide"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-all"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                aria-label="Next Exploration Slide"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Advance to Free Sandbox"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg transition-all"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/40">
            <h2 className="text-lg font-bold text-emerald-300">Free Exploration Sandbox</h2>
            <p className="text-slate-300 text-xs mt-1">
              Test any parameter combinations with zero time limits or scoring penalties. When you feel confident, launch the graded competency challenges!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Live Deflation & Real Wage Board */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">Live Real Wage Calculator</span>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Salary Hike (%):</span>
                  <span className="font-mono text-emerald-400 font-bold">+{salaryHikePercent}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={salaryHikePercent}
                  onChange={(e) => setSalaryHikePercent(Number(e.target.value))}
                  aria-label="Sandbox Salary Hike"
                  className="w-full accent-emerald-500"
                />

                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Inflation (%):</span>
                  <span className="font-mono text-rose-400 font-bold">{inflationRate}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={25}
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  aria-label="Sandbox Inflation Rate"
                  className="w-full accent-rose-500"
                />
              </div>

              <div
                className={`p-3 rounded-xl border text-center ${
                  realWageGrowthRate >= 0
                    ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                    : 'bg-rose-950/40 border-rose-700 text-rose-300'
                }`}
              >
                <span className="text-xs font-semibold">Net Real Purchasing Power Change:</span>
                <div className="text-xl font-mono font-black mt-0.5">
                  {realWageGrowthRate >= 0 ? '+' : ''}{realWageGrowthRate}%
                </div>
              </div>
            </div>

            {/* AD Aggregate Sum Box */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase">Macro Equilibrium Live Stack</span>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Consumption (C):</span>
                  <span className="font-mono text-white font-bold">₹{adConsumption}L Cr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Investment (I):</span>
                  <span className="font-mono text-white font-bold">₹{adInvestment}L Cr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Government (G):</span>
                  <span className="font-mono text-white font-bold">₹{adGovSpending}L Cr</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                  <span className="text-slate-400">Net Exports (X−M):</span>
                  <span className="font-mono text-white font-bold">₹{adExports - adImports}L Cr</span>
                </div>
              </div>
              <div className="p-2.5 bg-indigo-950/60 rounded-xl border border-indigo-700/50 text-center text-xs font-bold text-indigo-200">
                Total Equilibrium Demand = ₹{totalCalculatedAD} Lakh Crore
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            aria-label="Start Graded Challenges"
            className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-2 text-base"
          >
            I Am Ready for the Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Canvas Animation Loop */}
          <canvas ref={canvasRef} width={600} height={28} className="w-full rounded-lg bg-slate-900/50" />

          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Competency: <strong className="text-amber-400">{challenge.competencyLevel}</strong>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                Node: {challenge.nodeId}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Box with Visual Shake/Flash */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* A. MCQ / Classify / Distinguish / Match with SHAKE ANIMATION on Wrong Button */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => {
                    const isSelectedWrong = wrongShake && lastClickedWrongOption === i;
                    return (
                      <motion.button
                        key={i}
                        animate={isSelectedWrong ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.01, x: 4 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation}
                        aria-label={`Option ${i + 1}: ${opt}`}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                          showExplanation && i === challenge.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                            : isSelectedWrong
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-mono shrink-0">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* B. Drag Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item: ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-semibold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'target_robbins', title: 'Static Scarcity Foundation' },
                    { id: 'target_growth', title: 'Dynamic Production Over Time' },
                    { id: 'target_equity', title: 'Inter-temporal Social Equity' },
                    { id: 'target_scope', title: 'Non-Monetary Barter haats' },
                  ].map((tgt) => (
                    <div
                      key={tgt.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(tgt.id)}
                      className="p-3.5 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center"
                    >
                      <span className="text-[11px] text-slate-400 font-bold block mb-1">{tgt.title}</span>
                      <span
                        className={`text-xs font-semibold ${
                          droppedLabels[tgt.id] ? 'text-emerald-400' : 'text-slate-600 italic'
                        }`}
                      >
                        {droppedLabels[tgt.id] ? `✓ ${droppedLabels[tgt.id]}` : 'Drop matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Submit Label Placement"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* C. Drag Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Drag items to arrange in logical sequence:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
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
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${displayIdx + 1}: ${item}`}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Sort Order"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm mt-2"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* D. Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label="Enter Numeric Value"
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-base w-full focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-slate-400 text-sm font-semibold whitespace-nowrap">{challenge.unit}</span>
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Submit Numeric Answer"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-sm"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* E. Construct Component */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 rounded-lg text-xs font-mono font-bold text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-slate-800 rounded-md text-xs font-mono text-emerald-300 border border-slate-700 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        aria-label="Remove element"
                        className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs italic">Click formula blocks above to construct</span>
                  )}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Formula"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm"
                >
                  Verify Formula Construction
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Progressive Click-to-Reveal Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-950 border border-amber-700/60 rounded-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  ISC Step-by-Step Economic Reasoning
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Step {revealedSteps + 1} of{' '}
                  {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                </span>
              </div>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps <
              challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRevealedSteps((s) => s + 1)}
                  aria-label="Reveal next explanation step"
                  className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Show Next Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextChallenge}
                  aria-label="Advance to next challenge"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-sm shadow-lg transition-all"
                >
                  {currentChallenge + 1 >= filteredChallenges.length
                    ? 'Finalize Economic Assessment →'
                    : 'Proceed to Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="text-center p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl border border-emerald-500/40 shadow-2xl">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">Simulation Complete!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BADGE */}
            <div className="mt-3">
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-black tracking-wide uppercase ${
                  errors === 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : errors <= 3
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : errors <= 7
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {motivationalMessage}
              </span>
            </div>

            <p className="text-emerald-400 text-sm font-semibold mt-2">
              Final Score: {Math.max(0, 100 - errors * 5)}% • Adaptive Mastery: {masteryLevel.toUpperCase()}
            </p>

            <div className="mt-4 p-4 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? '🏆 Outstanding! You have achieved complete conceptual mastery across all 10 Class 11 economics nodes with zero mistakes!'
                : errors <= 3
                ? '🌟 Very strong performance! You handled the competency-based definitions and real vs nominal calculations expertly.'
                : errors <= 7
                ? '📈 Good effort! You showed a solid grasp of foundational concepts with room to refine key distinctions.'
                : '💪 Do not give up — You WILL get this! Every attempt strengthens your economic intuition. Review the diagnostic points below.'}
            </div>
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
              <p className="text-xs text-slate-400">
                Review these key distinctions where you made an initial slip:
              </p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-semibold">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* VISIBLE SPACED REPETITION SCHEDULE (SRS) CARD */}
          <div className="p-6 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-cyan-700/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-800/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <h3 className="text-sm md:text-base font-bold text-cyan-300">
                  Spaced Repetition Schedule (SuperMemo SM-2)
                </h3>
              </div>
              <span className="px-3 py-1 bg-cyan-900/40 border border-cyan-500/40 rounded-full text-xs font-mono font-bold text-cyan-200">
                SRS Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Next Review Target
                </span>
                <div className="text-lg font-black text-cyan-400 font-mono capitalize">
                  {srsReviewText}
                </div>
                <span className="text-[11px] text-slate-500">
                  {errors === 0
                    ? '0 errors → Optimal 7-day retention interval'
                    : errors <= 3
                    ? `${errors} errors → Reinforced 3-day interval`
                    : `${errors} errors → Immediate 1-day consolidation`}
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Scheduled Review Date
                </span>
                <div className="text-lg font-black text-emerald-400 font-mono">
                  {srsNextDate}
                </div>
                <span className="text-[11px] text-slate-500">
                  Next review session will test edge-case distinctions
                </span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Recommended Action
                </span>
                <div className="text-xs font-semibold text-slate-300 leading-relaxed">
                  {errors === 0
                    ? 'Proceed to Microeconomics: Demand & Supply elasticity simulations.'
                    : 'Revisit Robbins vs Samuelson growth definitions and Real vs Nominal deflation.'}
                </div>
              </div>
            </div>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE CONDITIONAL POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_EconomicsDefinitionEconomicsAdamSim;