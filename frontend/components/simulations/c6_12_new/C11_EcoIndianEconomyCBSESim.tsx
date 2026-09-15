'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL NODE IDS FOR THIS SIMULATION (31 Nodes)
// ==========================================
const ALL_NODE_IDS = [
  'c11_eco_cbse_183',
  'c11_eco_cbse_184',
  'c11_eco_cbse_185',
  'c11_eco_cbse_186',
  'c11_eco_cbse_187',
  'c11_eco_cbse_188',
  'c11_eco_cbse_189',
  'c11_eco_cbse_190',
  'c11_eco_cbse_191',
  'c11_eco_cbse_192',
  'c11_eco_cbse_193',
  'c11_eco_cbse_194',
  'c11_eco_cbse_195',
  'c11_eco_cbse_196',
  'c11_eco_cbse_197',
  'c11_eco_cbse_198',
  'c11_eco_cbse_199',
  'c11_eco_cbse_200',
  'c11_eco_cbse_201',
  'c11_eco_cbse_202',
  'c11_eco_cbse_203',
  'c11_eco_cbse_204',
  'c11_eco_cbse_205',
  'c11_eco_cbse_206',
  'c11_eco_cbse_207',
  'c11_eco_cbse_208',
  'c11_eco_cbse_209',
  'c11_eco_cbse_210',
  'c11_eco_cbse_211',
  'c11_eco_cbse_212',
  'c11_eco_cbse_213'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Architects of Independent India: Planning Economy (1950–1990)',
  intro: 'Welcome to the Planning Commission Secretariat, New Delhi, 1950. As chief economic policy advisor to PC Mahalanobis and Jawaharlal Nehru, you are tasked with steering a nation recently liberated from 200 years of colonial drain.',
  context: 'You will balance state intervention with private initiative, design industrial investment ratios, simulate Green Revolution adoption, enforce land ceilings, manage the License Raj, and observe the macro-outcomes across GDP growth, self-reliance, equity, and structural transformation.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why did India choose a "Mixed Economy" model with heavy state leadership instead of pure Free-Market Capitalism or pure Soviet Command Socialism in 1950?',
  options: [
    'Private capitalists were completely absent in post-independence India.',
    'Private capital was insufficient for heavy strategic industries, while democracy prevented complete state takeover of private property.',
    'The British colonial government mandated a mixed economy in the Indian Independence Act of 1947.',
    'Foreign trade was banned globally during the 1950s, forcing internal state controls.'
  ],
  correctIndex: 1,
  hintAfter: 'India combined democratic freedoms with state control because private industrialists lacked funds for capital-intensive infrastructure (like steel and dams), yet total state ownership would destroy democratic freedom.',
};

// DEFAULT PROPS
const DEFAULT_PROPS = {
  initialNodeId: 'c11_eco_cbse_183',
  onComplete: (score: number) => { console.log('Simulation complete with score:', score); }
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS (5 Labs)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Mahalanobis Strategy & Capital vs Consumer Goods',
    instruction: 'Adjust heavy industry capital allocation slider (λ_k) and observe long-term capital formation vs short-term consumer availability.',
    interactionType: 'mahalanobis_allocation',
    nodeId: 'c11_eco_cbse_186',
  },
  {
    title: 'Lab 2: Land Reforms & Agricultural Productivity',
    instruction: 'Toggle intermediary abolition, adjust land ceiling limits, and observe cultivator incentive and total agricultural output.',
    interactionType: 'land_reforms_sim',
    nodeId: 'c11_eco_cbse_192',
  },
  {
    title: 'Lab 3: The Green Revolution & Technology Adoption Matrix',
    instruction: 'Vary HYV seed access, irrigation coverage, and fertilizer subsidies to evaluate yield gains, regional equity, and fiscal burden.',
    interactionType: 'green_revolution_sim',
    nodeId: 'c11_eco_cbse_195',
  },
  {
    title: 'Lab 4: IPR 1956 & Industrial Licensing (License Raj)',
    instruction: 'Categorize industries into Schedule A, B, and C; simulate licensing friction, capacity caps, and private sector entry delays.',
    interactionType: 'license_raj_sim',
    nodeId: 'c11_eco_cbse_200',
  },
  {
    title: 'Lab 5: Import Substitution Trade Policy & Sectoral Transformation',
    instruction: 'Increase import tariffs and quota protection to test domestic manufacturing growth against export competitiveness and productivity.',
    interactionType: 'trade_policy_sim',
    nodeId: 'c11_eco_cbse_202',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If India allocates 70% of public investment to heavy capital goods (Second Five Year Plan approach), what happens to consumer goods inflation in the short term?',
    options: [
      'Consumer goods prices drop immediately due to modern tech.',
      'Shortage of consumer goods causes upward price pressure until capital goods expand supply capacity.',
      'Employment in farming instantly drops to zero.',
      'Imports of consumer goods increase without any foreign exchange constraints.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, set Heavy Industry allocation (λ_k) above 65% and check the Consumer Goods Shortage Index.',
    nodeId: 'c11_eco_cbse_186',
  },
  {
    question: 'Predict: What is the combined effect of high import tariffs (150%) and domestic capacity licensing on infant domestic industries?',
    options: [
      'Domestic firms become world leaders in quality and technology standard export.',
      'Domestic firms enjoy a sheltered seller market, producing low-quality goods at high prices without competition incentives.',
      'Foreign direct investment surges to replace domestic production.',
      'Agricultural yields triple automatically due to price signaling.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5, set Import Protection to High and Licensing Bureaucracy to High, then check Quality & Efficiency Index.',
    nodeId: 'c11_eco_cbse_203',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: Between 1950 and 1990, the share of agriculture in GDP declined from 59% to ~35%, but the share of workforce in agriculture remained above 64%. What does this structural disconnect indicate?',
    observableOptions: [
      'The industrial and services sectors failed to absorb surplus rural labor effectively.',
      'Agricultural productivity per farmer surpassed industrial labor productivity.',
      'Population growth occurred exclusively in urban metropolitan regions.',
      'Land ceiling laws successfully converted all rural labor into industrial workers.'
    ],
    correctIndex: 0,
    nodeId: 'c11_eco_cbse_207',
  },
  {
    question: 'Observation: When land ceiling laws contained loopholes allowing land transfers to relatives ("benami" transfers), what was the measured outcome on wealth equity?',
    observableOptions: [
      'Tenant farmers acquired 100% of cultivable land within 5 years.',
      'Large landlords retained effective control while actual land distribution to landless laborers was minimal (except in West Bengal & Kerala).',
      'Foodgrain imports doubled immediately from USA under PL-480.',
      'Small scale industrial growth stopped nationwide.'
    ],
    correctIndex: 1,
    nodeId: 'c11_eco_cbse_193',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Audit of a 1975 State Electricity Board & Textile PSU',
  description: 'Evaluate the financial performance, capacity utilization, and social objectives of a Public Sector Undertaking (PSU) under the 1956 Industrial Policy framework.',
  steps: [
    'Calculate Total Revenue vs Operating Expenses for a state-run fertilizer factory supplying subsidized urea at ₹500/ton below production cost.',
    'Determine the budgetary subsidy burden carried by the central government to maintain price stability for poor farmers.',
    'Analyze the licensing restriction preventing private entry: Private firms must wait 48 months for manufacturing permission.',
    'Synthesize a policy recommendation balancing social welfare objectives (Equity) with fiscal sustainability (Efficiency).'
  ],
};

// ==========================================
// MISCONCEPTIONS (6 Items)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Mixed Economy = 50% Private + 50% State',
    explanation: 'A mixed economy is not a fixed 50/50 static ratio. In India (1950-1990), the state commanded the "commanding heights" (heavy infrastructure, energy, steel, banking), while agriculture and light consumer goods were left to private ownership under state regulation.',
    correctedConcept: 'India chose a mixed economy where public sector led heavy growth while private sector operated under regulatory controls and licenses.'
  },
  {
    id: 'misc_2',
    title: 'Self-Reliance Means Complete Autarky (No Foreign Trade)',
    explanation: 'Self-reliance (Atm Nirbharta) during the planning era meant avoiding critical external dependencies—especially food grain reliance and foreign capital dominance that could compromise sovereign economic decisions—not zero trade.',
    correctedConcept: 'Self-reliance aimed to avoid foreign exchange vulnerability and foreign political interference, primarily by developing national capital goods industries.'
  },
  {
    id: 'misc_3',
    title: 'Land Reforms Were uniformly successful across all Indian States',
    explanation: 'Land reform success varied wildly by region. States like Kerala and West Bengal achieved significant tenant ownership redistribution, whereas in many other states landlords exploited loopholes (benami transfers, self-cultivation clauses).',
    correctedConcept: 'Intermediary abolition succeeded broadly, but land ceiling laws were largely evaded except in states with strong political mass mobilization.'
  },
  {
    id: 'misc_4',
    title: 'The Green Revolution Benefit Was Equally Distributed from Day 1',
    explanation: 'The initial phase (mid-1960s to mid-1970s) was geographically restricted to Punjab, Haryana, and western UP, benefiting mostly wealthy farmers who could afford HYV seeds, tubewells, and fertilizers.',
    correctedConcept: 'Green Revolution initially increased regional and class disparities before subsidized credit and wider expansion spread benefits in Phase 2.'
  },
  {
    id: 'misc_5',
    title: 'Public Sector Undertakings (PSUs) Were Designed Solely for Profit Generation',
    explanation: 'PSUs were created primarily for social welfare, infrastructure creation in backward regions, employment generation, and national self-reliance rather than purely commercial profit maximization.',
    correctedConcept: 'PSUs prioritized long-term capital base creation and social equity over short-term private accounting profits.'
  },
  {
    id: 'misc_6',
    title: 'Import Substitution Safeguarded Domestic Quality',
    explanation: 'Inward-oriented trade policy (tariffs/quotas) protected infant domestic industries from foreign competition. Lacking competitive pressure, domestic manufacturers had little incentive to upgrade quality or lower costs.',
    correctedConcept: 'Protectionism created a seller market where consumers had to purchase domestic goods regardless of quality, leading to technological stagnation.'
  }
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 Items)
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which body was set up in March 1950 with the Prime Minister as its Chairman to assess human and material resources of India?',
    options: ['Finance Commission', 'Planning Commission', 'NITI Aayog', 'Reserve Bank of India'],
    correctIndex: 1,
    explanation: 'The Planning Commission was established in 1950 under PM Jawaharlal Nehru to formulate Five Year Plans.',
    nodeId: 'c11_eco_cbse_185'
  },
  {
    id: 'diag_2',
    question: 'Who is widely regarded as the architect of Indian economic planning and the founder of the Indian Statistical Institute (ISI)?',
    options: ['Dr. Manmohan Singh', 'Prof. P.C. Mahalanobis', 'Dr. B.R. Ambedkar', 'Dadabhai Naoroji'],
    correctIndex: 1,
    explanation: 'Prof. P.C. Mahalanobis designed the capital-goods heavy Second Five Year Plan (1956-1961).',
    nodeId: 'c11_eco_cbse_186'
  },
  {
    id: 'diag_3',
    question: 'Which of the following is NOT one of the four common goals of Indian Five Year Plans (1950-1990)?',
    options: ['Growth', 'Modernisation', 'Self-Reliance', 'Hyper-Capitalist Privatization'],
    correctIndex: 3,
    explanation: 'The four core pillars were Growth, Modernisation, Self-Reliance, and Equity.',
    nodeId: 'c11_eco_cbse_187'
  },
  {
    id: 'diag_4',
    question: 'What does "Marketable Surplus" refer to in agriculture?',
    options: [
      'Total crop yield harvested in a season',
      'The portion of agricultural produce sold in the market by farmers after meeting own consumption',
      'The grain spoiled due to inadequate storage in godowns',
      'The seed quantity saved for next season sowing'
    ],
    correctIndex: 1,
    explanation: 'Marketable surplus = Total agricultural output - Self-consumption requirement of the farming household.',
    nodeId: 'c11_eco_cbse_205'
  },
  {
    id: 'diag_5',
    question: 'Under the Industrial Policy Resolution (IPR) 1956, how were industries classified?',
    options: [
      'Two categories: Private and Foreign',
      'Three schedules: Schedule A (State exclusive), Schedule B (State progressive), Schedule C (Private)',
      'Four sectors: Primary, Secondary, Tertiary, Quaternary',
      'Single unregulated list'
    ],
    correctIndex: 1,
    explanation: 'IPR 1956 divided industries into Schedule A (17 exclusive state industries), Schedule B (12 state-led), Schedule C (remaining private).',
    nodeId: 'c11_eco_cbse_200'
  },
  {
    id: 'diag_6',
    question: 'What was the primary policy tool used to achieve Import Substitution in India during 1950-1990?',
    options: ['Zero tariffs and free export processing zones', 'Tariffs and Quotas', 'Currency devaluation every year', 'Banning domestic manufacturing'],
    correctIndex: 1,
    explanation: 'Tariffs (heavy import duties) and Quotas (quantities limited) protected domestic producers from foreign competition.',
    nodeId: 'c11_eco_cbse_208'
  },
  {
    id: 'diag_7',
    question: 'Which committee in 1955 highlighted the role of Small Scale Industries (SSI) in promoting rural development?',
    options: ['Rangarajan Committee', 'Karve Committee', 'Narsimham Committee', 'Kelkar Committee'],
    correctIndex: 1,
    explanation: 'The Village and Small Scale Industries Committee (Karve Committee) in 1955 underscored SSIs for labor employment and rural growth.',
    nodeId: 'c11_eco_cbse_198'
  },
  {
    id: 'diag_8',
    question: 'What key contradiction emerged between Modernisation and Employment in early planning policy?',
    options: [
      'Modern machinery and technology could increase capital productivity but temporarily reduce direct labor requirements per unit of output.',
      'Modernisation always increases farm labor demand by 500%.',
      'Modernisation was illegal under Indian Constitution.',
      'Employment cannot exist without imported raw materials.'
    ],
    correctIndex: 0,
    explanation: 'Adopting labor-saving modern technology can displace workers in the short run if aggregate demand and structural shift do not expand proportionally.',
    nodeId: 'c11_eco_cbse_211'
  }
];

// ==========================================
// INTERFACE DEFINITION FOR CHALLENGES
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple_choice' | 'numeric' | 'drag_sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ==========================================
// 22+ CHALLENGES ACROSS 3 TIERS
// ==========================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_1',
    nodeId: 'c11_eco_cbse_183',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Basic Understanding',
    question: 'In a capitalist economic system, how are the central economic questions ("What, How, and For Whom to produce") solved?',
    options: [
      'By the central planning commission based on social needs',
      'By market forces of demand and supply via price mechanism',
      'By customary traditions passed down over centuries',
      'By military directives'
    ],
    correctIndex: 1,
    explanation: 'Capitalism relies on market forces and price signals driven by consumer sovereignty and private profit motive.',
    hints: ['Think of market price signals.', 'Consumer demand drives supply in capitalism.', 'No central government planner is involved.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_2',
    nodeId: 'c11_eco_cbse_184',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why did Jawaharlal Nehru and post-independence leaders opt for a Mixed Economy rather than strict Soviet Command Socialism?',
    options: [
      'They wanted complete foreign ownership of Indian factories.',
      'They sought to combine socialist welfare goals with democratic rights and private enterprise flexibility.',
      'They were mandated by the League of Nations.',
      'They believed private property should be totally abolished.'
    ],
    correctIndex: 1,
    explanation: 'India embraced a mixed model to ensure social justice and state guidance while preserving individual liberty and private business initiative.',
    hints: ['Consider democracy plus welfare.', 'Socialism without authoritarian control.', 'Private enterprise was allowed alongside state PSUs.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_3',
    nodeId: 'c11_eco_cbse_185',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the standard duration of a Five Year Plan as adopted in India starting from 1951?',
    options: ['3 years', '5 years', '7 years', '10 years'],
    correctIndex: 1,
    explanation: 'Five Year Plans run for 5 years, inspired by Soviet perspective economic planning.',
    hints: ['It is in the name itself!', '1951 to 1956 was the First Plan.', 'Five-year policy horizons.'],
  },
  {
    id: 'ch_4',
    nodeId: 'c11_eco_cbse_187',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which four general goals formed the core architecture of all Indian Five Year Plans during 1950-1990?',
    options: [
      'Growth, Modernisation, Self-Reliance, Equity',
      'Privatisation, Globalisation, Deregulation, Inflation',
      'Deficit Spending, Export Boom, Urbanisation, Monopolies',
      'Feudalism, Industrialisation, Colonisation, Taxation'
    ],
    correctIndex: 0,
    explanation: 'The four cornerstone goals were: Growth (GDP expansion), Modernisation (tech & social mindset), Self-Reliance (reducing foreign reliance), and Equity (fair wealth distribution).',
    hints: ['Core four objectives.', 'Growth + Modern Tech + Atm Nirbharta + Social Fairness.', 'Growth, Modernisation, Self-Reliance, Equity.'],
  },
  {
    id: 'ch_5',
    nodeId: 'c11_eco_cbse_192',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What was the immediate objective of "Abolition of Intermediaries" (Zamindari system) post-1947?',
    options: [
      'To increase tax collection for British crown',
      'To remove parasitic landlords (Zamindars) and bring actual tillers into direct contact with the government',
      'To force all farmers into factory work in cities',
      'To export all wheat output to Europe'
    ],
    correctIndex: 1,
    explanation: 'Abolishing intermediaries aimed to eliminate revenue exploitation and provide direct land tenure security to tenant cultivators.',
    hints: ['Targeting the Zamindars.', 'Direct contact between cultivator and state.', 'Removing rent-seeking middlemen.'],
    misconceptionIndex: 2
  },
  {
    id: 'ch_6',
    nodeId: 'c11_eco_cbse_195',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The Green Revolution in India primarily relied on the combination of which key inputs?',
    options: [
      'Organic compost, rain-fed streams, manual bullocks',
      'High-Yielding Variety (HYV) seeds, chemical fertilizers, pesticides, and reliable irrigation',
      'Genetically modified cotton and tractors only',
      'Imported foreign wheat grain directly sold in ration shops'
    ],
    correctIndex: 1,
    explanation: 'The HYV technology package required HYV seeds (like Norman Borlaug wheat varieties), controlled water (irrigation), and chemical inputs.',
    hints: ['HYV seed package.', 'Chemical fertilizers + controlled water.', 'Pesticides and irrigation.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_7',
    nodeId: 'c11_eco_cbse_200',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which industrial resolution is considered the "Economic Constitution of India" for the planning era?',
    options: ['IPR 1948', 'IPR 1956', 'IPR 1977', 'IPR 1991'],
    correctIndex: 1,
    explanation: 'Industrial Policy Resolution 1956 established the 3-category schedule and guided public sector dominance.',
    hints: ['Formulated alongside 2nd Plan.', 'Year 1956.', 'Categorized industries into 3 Schedules.'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_8',
    nodeId: 'c11_eco_cbse_186',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analysis & Calculation',
    question: 'Under a 2-sector Mahalanobis model, if National Income Y = C + I, and investment allocation fraction to heavy capital goods (λ_k) is increased from 0.30 to 0.70 of total ₹1000 Crore investment budget, how much capital goods investment occurs?',
    correctAnswer: 700,
    tolerance: 10,
    unit: 'Crore ₹',
    explanation: 'Capital Goods Investment I_k = λ_k × Total Investment = 0.70 × 1000 = ₹700 Crore.',
    hints: ['Multiply total budget by λ_k.', '0.70 × 1000.', '700 Crore ₹.'],
  },
  {
    id: 'ch_9',
    nodeId: 'c11_eco_cbse_188',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding & Application',
    question: 'How is Economic Growth primarily quantified in national accounting during Five Year Plans?',
    options: [
      'By sustained increase in Real Gross Domestic Product (GDP) / Gross National Product (GNP) over time',
      'By the total quantity of currency notes printed by Reserve Bank of India',
      'By aggregate population growth rate',
      'By total tariff revenue collected at sea ports'
    ],
    correctIndex: 0,
    explanation: 'Economic growth reflects an expansion in the aggregate volume of final goods and services produced within the country (Real GDP growth).',
    hints: ['Focus on Real output of goods and services.', 'Real GDP expansion.', 'Not inflation or money printing.'],
  },
  {
    id: 'ch_10',
    nodeId: 'c11_eco_cbse_193',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What was the primary legal mechanism of "Land Ceiling" policy?',
    options: [
      'Fixing the maximum price for selling agricultural land',
      'Fixing the maximum legal limit of land holding an individual or family could own, taking surplus land for redistribution to landless',
      'Limiting the maximum depth of water wells on farms',
      'Capping the maximum quantity of wheat per acre'
    ],
    correctIndex: 1,
    explanation: 'Land ceiling legislation fixed upper bounds on land ownership to reduce concentration of land wealth in rural areas.',
    hints: ['Upper bound on land holding size.', 'Surplus land redistribution.', 'Reducing concentration of land property.'],
    misconceptionIndex: 2
  },
  {
    id: 'ch_11',
    nodeId: 'c11_eco_cbse_196',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Evaluation',
    question: 'Economists who argue IN FAVOR of continuing fertilizer subsidies in India emphasize that:',
    options: [
      'Subsidies mostly enrich large fertilizer manufacturing corporations without helping farmers.',
      'Farming in India is inherently risky and small/marginal farmers cannot afford expensive modern inputs without state support.',
      'Subsidies reduce government fiscal deficit instantly.',
      'Fertilizer use has no ecological impact.'
    ],
    correctIndex: 1,
    explanation: 'Pro-subsidy arguments highlight risk mitigation and technological adoption incentive for resource-poor farmers.',
    hints: ['Focus on protecting small and marginal farmers.', 'High upfront input costs.', 'Risk reduction in climate-vulnerable agriculture.'],
  },
  {
    id: 'ch_12',
    nodeId: 'c11_eco_cbse_198',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why did the Karve Committee (1955) advocate special protection and capital reservation for Small Scale Industries (SSIs)?',
    options: [
      'SSIs require capital-intensive automated robotics.',
      'SSIs are labor-intensive, generating high employment per unit of capital investment, and promote decentralized rural development.',
      'SSIs only manufacture heavy steel rails.',
      'SSIs consume zero electric power.'
    ],
    correctIndex: 1,
    explanation: 'Small scale industries generate employment using less capital compared to large-scale plants, dispersing income across rural areas.',
    hints: ['Labor intensity vs Capital intensity.', 'More jobs per Rupee invested.', 'Decentralized rural employment.'],
  },
  {
    id: 'ch_13',
    nodeId: 'c11_eco_cbse_201',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Under the "License Raj" (Licensing System), why did large industrial houses often apply for licenses without intending to establish immediate production capacity?',
    options: [
      'To sell licenses to foreign investors on stock exchanges',
      'To prevent prospective competitors from securing manufacturing capacity quotas',
      'To pay higher income taxes willingly',
      'To gift licenses to agricultural cooperatives'
    ],
    correctIndex: 1,
    explanation: 'Big firms frequently cornered licenses to block potential rivals, creating artificial entry barriers and domestic monopoly control.',
    hints: ['Preempting rivals.', 'Blocking prospective competitors.', 'Creating entry barriers.'],
  },
  {
    id: 'ch_14',
    nodeId: 'c11_eco_cbse_205',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'A farmer grows 120 quintals of wheat. The family consumes 35 quintals for food and retains 15 quintals for seeds and animal feed. What is the Marketable Surplus (in quintals)?',
    correctAnswer: 70,
    tolerance: 0,
    unit: 'quintals',
    explanation: 'Marketable Surplus = Total Output - (Own Consumption + Seed Retention) = 120 - (35 + 15) = 70 quintals.',
    hints: ['Deduct self-consumption and seed retention from total output.', '120 - 35 - 15.', '70 quintals.'],
  },
  {
    id: 'ch_15',
    nodeId: 'c11_eco_cbse_208',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What is the structural difference between a Tariff and a Import Quota?',
    options: [
      'Tariff is a tax on imported goods; Quota specifies maximum quantity/volume of goods allowed for import.',
      'Tariff is a subsidy for exports; Quota is a tax on agricultural land.',
      'Tariff applies only to services; Quota applies only to gold.',
      'There is no difference between them.'
    ],
    correctIndex: 0,
    explanation: 'Tariffs act through price manipulation (tax per unit), whereas Quotas act through direct quantitative restrictions.',
    hints: ['Tax vs Quantitative limit.', 'Tariff = Import duty.', 'Quota = Physical ceiling on foreign quantity.'],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'ch_16',
    nodeId: 'c11_eco_cbse_199',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'Evaluate the "Structural Change Paradox" of India (1950–1990): GDP share of Agriculture declined dramatically, yet labor shift was sluggish. What was the core cause?',
    options: [
      'Industrial sector grew rapidly using high capital-intensity (labor-saving technology) while service sector growth was insufficient to absorb rural farm workers.',
      'Farmers preferred staying in villages due to excess real wages in agriculture.',
      'Government banned migration from villages to cities.',
      'Industrial productivity was lower than traditional farming productivity.'
    ],
    correctIndex: 0,
    explanation: 'The growth pattern of heavy industry was capital-intensive, failing to generate proportional job opportunities for surplus rural labor.',
    hints: ['Capital-intensive heavy industrial strategy.', 'Lack of labor-absorbing manufacturing.', 'Sluggish migration to non-farm sectors.'],
  },
  {
    id: 'ch_17',
    nodeId: 'c11_eco_cbse_202',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis & Critical Appraisal',
    question: 'Inward-Oriented Trade Strategy (Import Substitution) succeeded in building a diversified industrial base, but what critical weakness did it inflict on Indian goods internationally?',
    options: [
      'Excessive foreign exchange reserves accumulated in banks.',
      'Lack of international competition led to low quality, high cost structure, and export uncompetitiveness.',
      'Complete elimination of domestic private companies.',
      'Hyper-deflation in domestic markets.'
    ],
    correctIndex: 1,
    explanation: 'Shielding domestic producers behind high tariffs eliminated competitive pressures, leading to inefficiency, low quality, and high production costs.',
    hints: ['Protection without competition.', 'Low quality and high cost.', 'Lack of global export competitiveness.'],
    misconceptionIndex: 5
  },
  {
    id: 'ch_18',
    nodeId: 'c11_eco_cbse_209',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why did the Public Sector Undertakings (PSUs) encounter severe losses and inefficiency by the late 1980s, despite initial investments?',
    options: [
      'PSUs were completely privatized in 1960.',
      'Over-staffing, political interference, lack of managerial autonomy, and absence of market discipline ("soft budget constraints").',
      'PSUs were banned from selling goods to domestic citizens.',
      'PSUs had no access to government capital funds.'
    ],
    correctIndex: 1,
    explanation: 'Soft budget constraints (government covering losses continuously), administrative interference, and operational rigidities eroded PSU efficiency.',
    hints: ['Soft budget constraints.', 'Lack of managerial autonomy and political intervention.', 'Over-manning and lack of profit accountability.'],
    misconceptionIndex: 4
  },
  {
    id: 'ch_19',
    nodeId: 'c11_eco_cbse_211',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Analyze the trade-off between "Modernisation" and "Employment Generation" in early economic planning.',
    options: [
      'Modern tech increases output per worker but may displace labor unless aggregate output expands fast enough to absorb displaced workers.',
      'Modern tech automatically employs 100% of uneducated rural labor.',
      'Modernisation eliminates the need for educated engineers.',
      'There is no conflict; modernisation always reduces technology usage.'
    ],
    correctIndex: 0,
    explanation: 'Technological modernisation raises labor productivity. If output growth rate is less than labor productivity growth, net employment growth can turn negative.',
    hints: ['Output growth vs Productivity growth.', 'Labor-saving capital tech.', 'Displacement of labor if demand does not grow fast enough.'],
  },
  {
    id: 'ch_20',
    nodeId: 'c11_eco_cbse_212',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Historical Synthesis',
    question: 'At the time of independence (1947), what was the status of India\'s industrial structure?',
    options: [
      'World leader in computer software and microchips',
      'Confined largely to cotton textiles, jute, and basic steel (TISCO), lacking heavy machinery, electrical, or capital goods capability',
      'Fully nationalized state monopolies in all 50 states',
      'Heavy reliance on automobile exports to Britain'
    ],
    correctIndex: 1,
    explanation: 'Colonial rule left India with narrow consumer goods industries (cotton/jute) and minimal capital goods infrastructure.',
    hints: ['Cotton and jute textiles dominance.', 'Lack of capital goods and machinery industries.', 'Narrow industrial base.'],
  },
  {
    id: 'ch_21',
    nodeId: 'c11_eco_cbse_213',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'By 1990, why was structural economic reform (LPG - Liberalisation, Privatisation, Globalisation) deemed essential?',
    options: [
      'India had reached 25% annual GDP growth and needed to slow down.',
      'Balance of Payments (BoP) crisis, severe fiscal deficit, PSU losses, high inflation, and inefficient License Raj constrained growth.',
      'The World Bank mandated total shutdown of all Indian agriculture.',
      'Private enterprise was completely banned in 1989.'
    ],
    correctIndex: 1,
    explanation: 'Inefficiencies accumulated over 40 years of inward protectionism culminated in a severe 1991 BoP crisis, forcing fundamental structural reforms.',
    hints: ['BoP Crisis and fiscal crisis of 1990-91.', 'Inward trade limitations and License Raj bottlenecks.', 'Fiscal debt and inflation.'],
  },
  {
    id: 'ch_22',
    nodeId: 'c11_eco_cbse_210',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Complex Calculation',
    question: 'Suppose an economy\'s Target GDP Growth Rate = 6.0% per annum. If the Capital-Output Ratio (ICOR) is 4.0, calculate the required Savings/Investment Rate (as % of GDP) using the Harrod-Domar relationship (Growth = Investment Rate / ICOR).',
    correctAnswer: 24,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Harrod-Domar model: Growth Rate (g) = Investment Rate (s) / ICOR  ==> 6.0% = s / 4.0  ==> s = 6.0 × 4.0 = 24%.',
    hints: ['g = s / ICOR', 's = g × ICOR', '6.0 × 4.0 = 24%.'],
  }
];

// ==========================================
// SVG DIAGRAM COMPONENT 1: PLANNING MODEL DIAGRAM
// ==========================================
const PlanningModelDiagram: React.FC<{
  capitalRatio: number; // 0 to 100
  growthRate: number;
  consumerSupply: number;
}> = ({ capitalRatio, growthRate, consumerSupply }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
      <h3 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Mahalanobis Planning Model: Capital Allocation vs Outcomes
      </h3>
      <svg viewBox="0 0 500 220" className="w-full h-48 bg-slate-950 rounded-lg">
        {/* Background Grid */}
        <line x1="50" y1="30" x2="50" y2="180" stroke="#334155" strokeWidth="2" />
        <line x1="50" y1="180" x2="460" y2="180" stroke="#334155" strokeWidth="2" />

        {/* Labels Axis */}
        <text x="50" y="20" fill="#94a3b8" fontSize="11" textAnchor="middle">Output Index</text>
        <text x="250" y="205" fill="#94a3b8" fontSize="11" textAnchor="middle">Heavy Capital Allocation (λ_k %)</text>

        {/* Investment Bar split */}
        <rect x="70" y="40" width="30" height="130" fill="#1e293b" rx="4" />
        <rect x="70" y={40 + (130 * (100 - capitalRatio) / 100)} width="30" height={130 * capitalRatio / 100} fill="#f59e0b" rx="2" />
        <text x="85" y="32" fill="#f59e0b" fontSize="10" textAnchor="middle">Capital: {capitalRatio}%</text>

        {/* Long Term Growth Trajectory Line */}
        <path
          d={`M 150 160 Q 280 ${160 - (growthRate * 14)} 440 ${160 - (growthRate * 18)}`}
          fill="none"
          stroke="#10b981"
          strokeWidth="3"
        />
        <text x="440" y={150 - (growthRate * 18)} fill="#10b981" fontSize="10" fontWeight="bold">GDP Growth ({growthRate.toFixed(1)}%)</text>

        {/* Short term Consumer Goods Availability Line */}
        <path
          d={`M 150 60 Q 280 ${60 + (100 - consumerSupply)} 440 ${170 - (consumerSupply * 1.1)}`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeDasharray="4 4"
        />
        <text x="440" y={178 - (consumerSupply * 1.1)} fill="#38bdf8" fontSize="10">Consumer Index ({consumerSupply.toFixed(0)})</text>

        {/* Steel Mill Icon */}
        <g transform="translate(180, 50)">
          <rect x="0" y="20" width="35" height="30" fill="#475569" />
          <polygon points="0,20 17,5 35,20" fill="#64748b" />
          <line x1="8" y1="5" x2="8" y2="-5" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="8" cy="-8" r="3" fill="#cbd5e1" opacity="0.6" />
        </g>
        <text x="197" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">Heavy Industry (PSU)</text>
      </svg>
      <div className="mt-2 text-xs text-slate-400 flex justify-between">
        <span>Higher λ_k → Rapid Future Capital Formation</span>
        <span>Lower λ_k → High Immediate Consumer Goods</span>
      </div>
    </div>
  );
};

// ==========================================
// SVG DIAGRAM COMPONENT 2: AGRICULTURAL REFORM & GREEN REV DIAGRAM
// ==========================================
const AgriculturalReformDiagram: React.FC<{
  tenureSecurity: boolean;
  hyvAdoption: number; // 0-100%
  subsidyLevel: number; // 0-100%
  yieldIndex: number;
}> = ({ tenureSecurity, hyvAdoption, subsidyLevel, yieldIndex }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
      <h3 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V14.37" />
        </svg>
        Agrarian Dynamics: Land Reform & Green Revolution
      </h3>
      <svg viewBox="0 0 500 200" className="w-full h-44 bg-slate-950 rounded-lg">
        {/* Land ownership box */}
        <rect x="30" y="40" width="130" height="120" fill={tenureSecurity ? '#064e3b' : '#451a03'} rx="8" stroke={tenureSecurity ? '#10b981' : '#f59e0b'} strokeWidth="2" />
        <text x="95" y="65" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
          {tenureSecurity ? 'Owner Tiller' : 'Tenant Farmer'}
        </text>
        <text x="95" y="85" fill="#94a3b8" fontSize="9" textAnchor="middle">
          {tenureSecurity ? 'High Investment Incentive' : 'Low Investment Incentive'}
        </text>
        <text x="95" y="105" fill="#94a3b8" fontSize="9" textAnchor="middle">
          {tenureSecurity ? 'Abolished Zamindari' : 'High Rent Exploitation'}
        </text>

        {/* Plus Arrow */}
        <text x="180" y="105" fill="#64748b" fontSize="24" textAnchor="middle">+</text>

        {/* Tech Box (HYV + Fertilizer + Subsidies) */}
        <rect x="200" y="40" width="140" height="120" fill="#1e293b" rx="8" stroke="#38bdf8" strokeWidth="2" />
        <text x="270" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Green Tech Package</text>
        <text x="270" y="90" fill="#e2e8f0" fontSize="10" textAnchor="middle">HYV Seeds: {hyvAdoption}%</text>
        <text x="270" y="110" fill="#e2e8f0" fontSize="10" textAnchor="middle">Subsidy Level: {subsidyLevel}%</text>
        <text x="270" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">Irrigation + Urea</text>

        {/* Equals Arrow */}
        <text x="360" y="105" fill="#64748b" fontSize="24" textAnchor="middle">=</text>

        {/* Total Yield Output Gauge */}
        <circle cx="430" cy="100" r="40" fill="#0284c7" opacity="0.2" />
        <circle cx="430" cy="100" r={Math.min(42, Math.max(10, yieldIndex * 0.35))} fill="#10b981" />
        <text x="430" y="98" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">{yieldIndex}</text>
        <text x="430" y="114" fill="#e2e8f0" fontSize="8" textAnchor="middle">Yield Index</text>
      </svg>
      <div className="mt-2 text-xs text-slate-400 flex justify-between">
        <span>Tenure security unlocks long-term land development</span>
        <span>HYV technology multiplies yield per hectare</span>
      </div>
    </div>
  );
};

// ==========================================
// SVG DIAGRAM COMPONENT 3: INDUSTRIAL LICENSE & TRADE DIAGRAM
// ==========================================
const IndustrialLicenseTradeDiagram: React.FC<{
  scheduleAShare: number;
  licenseStrictness: number;
  tariffWall: number;
}> = ({ scheduleAShare, licenseStrictness, tariffWall }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
      <h3 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h5m0 0v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
        </svg>
        IPR 1956, License Raj & Protectionist Trade Wall
      </h3>
      <svg viewBox="0 0 500 210" className="w-full h-44 bg-slate-950 rounded-lg">
        {/* Foreign Trade Shield (Tariff Wall) */}
        <rect x="20" y="30" width="30" height="150" fill="#dc2626" opacity={tariffWall / 100} rx="4" />
        <text x="35" y="110" fill="#ffffff" fontSize="10" fontWeight="bold" transform="rotate(-90, 35, 110)" textAnchor="middle">
          Tariff/Quota Wall ({tariffWall}%)
        </text>

        {/* Domestic Market Area */}
        <rect x="70" y="30" width="400" height="150" fill="#1e1b4b" opacity="0.4" rx="8" stroke="#4338ca" strokeDasharray="3 3" />

        {/* PSU Schedule A Dominance */}
        <rect x="85" y="45" width={scheduleAShare * 2.2} height="60" fill="#4c1d95" rx="4" />
        <text x={85 + (scheduleAShare * 1.1)} y="80" fill="#e9d5ff" fontSize="10" textAnchor="middle" fontWeight="bold">
          Schedule A (State Reserve {scheduleAShare}%)
        </text>

        {/* Private Sector Gate & License Lock */}
        <rect x="85" y="115" width="220" height="50" fill="#1e293b" rx="4" stroke="#eab308" strokeWidth="2" />
        <text x="195" y="135" fill="#fef08a" fontSize="10" textAnchor="middle" fontWeight="bold">
          Private Sector (Schedule C)
        </text>
        <text x="195" y="152" fill="#94a3b8" fontSize="9" textAnchor="middle">
          License Delay: {(licenseStrictness * 0.4).toFixed(1)} Months
        </text>

        {/* Padlock Icon */}
        <circle cx="330" cy="140" r="14" fill="#ea580c" />
        <text x="330" y="144" fill="#ffffff" fontSize="12" textAnchor="middle">🔒</text>
        <text x="330" y="170" fill="#fdba74" fontSize="8" textAnchor="middle">License Raj</text>

        {/* Inward arrow blocked */}
        <line x1="5" y1="105" x2="20" y2="105" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
        <text x="12" y="90" fill="#ef4444" fontSize="8">Foreign Goods</text>
      </svg>
      <div className="mt-2 text-xs text-slate-400 flex justify-between">
        <span>High protection creates seller market with low foreign competition</span>
        <span>Licensing controls private capacity expansion</span>
      </div>
    </div>
  );
};

// ==========================================
// CANVAS DIAGRAM COMPONENT 4: SECTORAL SHIFT CANVAS
// ==========================================
const SectoralShiftCanvas: React.FC<{
  yearIndex: number; // 1950 to 1990
  agriGdpShare: number;
  indGdpShare: number;
  servGdpShare: number;
  agriEmpShare: number;
}> = ({ yearIndex, agriGdpShare, indGdpShare, servGdpShare, agriEmpShare }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Year ${yearIndex}: GDP Share vs Employment Share Breakdown`, 15, 20);

    // Bar GDP
    const barWidth = 45;
    const startX = 60;

    // Agri GDP
    const hAgri = (agriGdpShare / 100) * 120;
    ctx.fillStyle = '#10b981';
    ctx.fillRect(startX, 160 - hAgri, barWidth, hAgri);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px sans-serif';
    ctx.fillText(`${agriGdpShare.toFixed(1)}%`, startX + 8, 155 - hAgri);
    ctx.fillText('Agri GDP', startX + 2, 175);

    // Ind GDP
    const hInd = (indGdpShare / 100) * 120;
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(startX + 80, 160 - hInd, barWidth, hInd);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${indGdpShare.toFixed(1)}%`, startX + 88, 155 - hInd);
    ctx.fillText('Ind GDP', startX + 82, 175);

    // Serv GDP
    const hServ = (servGdpShare / 100) * 120;
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(startX + 160, 160 - hServ, barWidth, hServ);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${servGdpShare.toFixed(1)}%`, startX + 168, 155 - hServ);
    ctx.fillText('Serv GDP', startX + 162, 175);

    // Agri Employment Bar (Comparison disconnect)
    const hEmp = (agriEmpShare / 100) * 120;
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(startX + 260, 160 - hEmp, barWidth + 15, hEmp);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`${agriEmpShare.toFixed(1)}%`, startX + 268, 155 - hEmp);
    ctx.fillText('Agri Labor %', startX + 260, 175);

    // Disconnect Annotation
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(startX + barWidth, 160 - hAgri);
    ctx.lineTo(startX + 260, 160 - hEmp);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '10px sans-serif';
    ctx.fillText('Structural Disconnect Gap', startX + 120, 75);

  }, [yearIndex, agriGdpShare, indGdpShare, servGdpShare, agriEmpShare]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
      <h3 className="text-sm font-semibold text-sky-400 mb-2">
        Occupational Structure vs Sectoral GDP Share Dynamics (1950–1990)
      </h3>
      <canvas ref={canvasRef} width={450} height={190} className="w-full h-44 rounded-lg bg-slate-950" />
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export const C11_EcoIndianEconomyCBSESim: React.FC<{
  initialNodeId?: NodeId;
  onComplete?: (score: number) => void;
}> = ({
  initialNodeId = 'c11_eco_cbse_183',
  onComplete = DEFAULT_PROPS.onComplete
}) => {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Simulation State Variables
  const [capitalAllocation, setCapitalAllocation] = useState<number>(65); // λ_k percentage
  const [landTenureSecurity, setLandTenureSecurity] = useState<boolean>(true);
  const [landCeilingLimit, setLandCeilingLimit] = useState<number>(18); // Acres
  const [hyvAdoption, setHyvAdoption] = useState<number>(60); // %
  const [subsidyRate, setSubsidyRate] = useState<number>(50); // %
  const [iprScheduleAShare, setIprScheduleAShare] = useState<number>(55); // %
  const [licenseStrictness, setLicenseStrictness] = useState<number>(75); // 0-100
  const [tariffWall, setTariffWall] = useState<number>(120); // %
  const [simYear, setSimYear] = useState<number>(1970);

  // Score & Gamification State
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Discovery & Lab Q State
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Visual Feedback Triggers
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Auto-hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mastery & SRS State tracking per node
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Derived Calculations from Lab State
  const growthRate = useMemo(() => {
    // Harrod-Domar / Mahalanobis approximation
    const icor = 3.8 + (licenseStrictness / 50) + (tariffWall / 150);
    const investmentRate = 14 + (capitalAllocation * 0.15);
    return Math.max(1.5, Math.min(8.5, investmentRate / icor));
  }, [capitalAllocation, licenseStrictness, tariffWall]);

  const consumerSupplyIndex = useMemo(() => {
    return Math.max(20, Math.min(100, (100 - capitalAllocation) * 1.2 + 20));
  }, [capitalAllocation]);

  const agYieldIndex = useMemo(() => {
    const tenureFactor = landTenureSecurity ? 1.35 : 0.85;
    const techFactor = 1 + (hyvAdoption * 0.012) + (subsidyRate * 0.005);
    return Math.round(50 * tenureFactor * techFactor);
  }, [landTenureSecurity, hyvAdoption, subsidyRate]);

  const sectoralGdpShares = useMemo(() => {
    const elapsed = simYear - 1950;
    const agri = Math.max(30, 59 - elapsed * 0.6);
    const ind = Math.min(28, 13 + elapsed * 0.35);
    const serv = 100 - agri - ind;
    return { agri, ind, serv };
  }, [simYear]);

  const agEmpShare = useMemo(() => {
    const elapsed = simYear - 1950;
    return Math.max(62, 72 - elapsed * 0.22);
  }, [simYear]);

  // Reset hint timer on interaction
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const currentCh = CHALLENGES[challengeIndex];
      if (currentCh && activeTab === 'challenges') {
        setCurrentHint(currentCh.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [challengeIndex, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, challengeIndex, activeTab]);

  // Initial greeting voice
  useEffect(() => {
    speechManager.speak('Welcome to the Indian Economy Planning Commission Simulation 1950 to 1990.');
  }, []);

  // Handlers
  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryChoice(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct insight into India\'s choice of Mixed Economy.');
      setShowSparkle(true);
      setScore(prev => prev + 50);
    } else {
      audioManager.play('error');
      speechManager.speak('Consider both economic constraints and democratic values.');
    }
  };

  const handleChallengeSubmit = () => {
    const currentCh = CHALLENGES[challengeIndex];
    if (!currentCh) return;

    let correct = false;
    if (currentCh.type === 'multiple_choice') {
      correct = selectedOption === currentCh.correctIndex;
    } else if (currentCh.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && currentCh.correctAnswer !== undefined) {
        const tol = currentCh.tolerance || 0.1;
        correct = Math.abs(val - currentCh.correctAnswer) <= tol;
      }
    }

    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(correct);

    // Update BKT & SRS
    const currentBkt = bktStates[currentCh.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, correct);
    setBktStates(prev => ({ ...prev, [currentCh.nodeId]: updatedBkt }));

    const currentSrs = srsItems[currentCh.nodeId] || createReviewItem(currentCh.nodeId);
    const updatedSrs = sm2Update(currentSrs, correct ? 4 : 1);
    setSrsItems(prev => ({ ...prev, [currentCh.nodeId]: updatedSrs }));

    if (correct) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent analysis!');
      setScore(prev => prev + 100 + streak * 10);
      setStreak(prev => prev + 1);
      setShowSparkle(true);
      if ((challengeIndex + 1) % 5 === 0) {
        setShowConfetti(true);
        audioManager.play('celebration');
        speechManager.speak('Milestone achieved! Great economic policy expertise.');
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the planning concept hint.');
      setStreak(0);
      if (currentCh.hints && currentCh.hints.length > 0) {
        setCurrentHint(currentCh.hints[0]);
        setShowHint(true);
      }
    }
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(null);
    setShowHint(false);

    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      setShowSuccess(true);
      audioManager.play('chime');
      speechManager.speak('Congratulations! You have completed all planning challenges.');
      recordGameScore('c11_eco_cbse_indian_economy', score);
      onComplete(score);
    }
  };

  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    audioManager.play('tap');
    setActiveTab(tab);
    if (tab === 'lab') {
      speechManager.speak('Interactive Economic Policy Laboratories active.');
    } else if (tab === 'challenges') {
      speechManager.speak('Testing strategic policy knowledge across foundation, standard, and advanced challenges.');
    } else if (tab === 'summary') {
      speechManager.speak('Reviewing economic performance indicators, misconceptions, and real world audit.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-12">
      {/* Top Banner Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 px-6 py-4 flex flex-wrap items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-2 rounded-lg shadow-md">
            <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">
              Indian Economy 1950–1990: Policy & Planning Sim
            </h1>
            <p className="text-xs text-amber-400 font-medium">
              ISC Economics Class 11 • Five Year Plans, Agriculture, Industry & Trade
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-2 bg-slate-950 p-1 rounded-xl stroke-slate-800 border border-slate-800 my-2 sm:my-0">
          {(['discovery', 'lab', 'challenges', 'summary'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {tab === 'lab' ? 'Interactive Labs' : tab}
            </button>
          ))}
        </nav>

        {/* Score Stats */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <span className="text-slate-400">Score:</span>
            <span className="text-amber-400 font-bold text-sm">{score}</span>
          </div>
          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <span className="text-slate-400">Streak:</span>
            <span className="text-emerald-400 font-bold text-sm">🔥 {streak}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* TAB 1: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* SCENARIO BOX */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Scenario Narrative</span>
                  <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
                  <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
                  <p className="text-xs text-slate-400 italic bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    {SCENARIO.context}
                  </p>
                </div>
              </div>
            </div>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-base font-semibold text-amber-400 flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">?</span>
                Core Discovery Inquiry
              </h3>
              <p className="text-sm text-white font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = discoveryChoice === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let btnClass = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
                  if (discoverySubmitted) {
                    if (isCorrect) btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200';
                    else if (isSelected) btnClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${btnClass}`}
                    >
                      <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-400 block mb-1">Key Insight:</span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* MANDATORY RENDERING OF PREDICTION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-sky-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Hypothesis & Prediction Desk
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                    <span className="text-xs text-sky-400 font-semibold uppercase">Prediction #{pIdx + 1}</span>
                    <p className="text-xs text-white leading-snug">{pred.question}</p>
                    <div className="space-y-1.5">
                      {pred.options.map((opt, oIdx) => {
                        const sel = predictionAnswers[pIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => {
                              audioManager.play('tap');
                              const next = [...predictionAnswers];
                              next[pIdx] = oIdx;
                              setPredictionAnswers(next);
                            }}
                            className={`w-full text-left p-2.5 rounded-lg text-xs border transition-all ${
                              sel ? 'bg-sky-950 border-sky-500 text-sky-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 italic bg-slate-900 p-2 rounded">
                      🔍 {pred.verifyInstruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* MANDATORY LAB SELECTOR (5 EXPLORATION STEPS) */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveLabIndex(idx);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    activeLabIndex === idx
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] uppercase tracking-wider opacity-75">Lab Step {idx + 1}</div>
                  <div className="text-xs truncate font-semibold">{step.title.replace(`Lab ${idx + 1}: `, '')}</div>
                </button>
              ))}
            </div>

            {/* LAB INSTRUCTION BAR */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-amber-400">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* INTERACTIVE LAB CONTENT BASED ON ACTIVE INDEX */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PlanningModelDiagram
                  capitalRatio={capitalAllocation}
                  growthRate={growthRate}
                  consumerSupply={consumerSupplyIndex}
                />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Mahalanobis Heavy Capital Investment Control (λ_k)
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Capital Goods Allocation (Heavy Steel, Dams, Machinery):</span>
                      <span className="text-amber-400 font-bold">{capitalAllocation}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="85"
                      value={capitalAllocation}
                      onChange={(e) => {
                        setCapitalAllocation(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>20% (Consumer-First Light Model)</span>
                      <span>85% (Aggressive Heavy Industry)</span>
                    </div>
                  </div>

                  {/* Calculated Indicators */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Projected Long-Term Growth</div>
                      <div className="text-lg font-bold text-emerald-400">{growthRate.toFixed(2)}% p.a.</div>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                      <div className="text-[10px] text-slate-400">Consumer Goods Shortage Risk</div>
                      <div className="text-lg font-bold text-amber-400">
                        {capitalAllocation > 70 ? 'High Inflation' : 'Balanced Supply'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AgriculturalReformDiagram
                  tenureSecurity={landTenureSecurity}
                  hyvAdoption={hyvAdoption}
                  subsidyLevel={subsidyRate}
                  yieldIndex={agYieldIndex}
                />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white">Land Reform & Productivity Controls</h4>

                  <div className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <div>
                      <div className="text-xs font-semibold text-white">Intermediary Abolition (Zamindari Removal)</div>
                      <div className="text-[10px] text-slate-400">Direct tiller ownership incentives</div>
                    </div>
                    <button
                      onClick={() => {
                        audioManager.play('pop');
                        setLandTenureSecurity(!landTenureSecurity);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        landTenureSecurity ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {landTenureSecurity ? 'Enforced' : 'Disabled'}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Land Ceiling Limit per Family:</span>
                      <span className="text-sky-400 font-bold">{landCeilingLimit} Acres</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={landCeilingLimit}
                      onChange={(e) => {
                        setLandCeilingLimit(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AgriculturalReformDiagram
                  tenureSecurity={landTenureSecurity}
                  hyvAdoption={hyvAdoption}
                  subsidyLevel={subsidyRate}
                  yieldIndex={agYieldIndex}
                />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white">Green Revolution Tech & Fertilizer Subsidies</h4>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">HYV Seed Adoption Rate:</span>
                      <span className="text-emerald-400 font-bold">{hyvAdoption}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="95"
                      value={hyvAdoption}
                      onChange={(e) => {
                        setHyvAdoption(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Input Subsidy Coverage (Urea/Power):</span>
                      <span className="text-amber-400 font-bold">{subsidyRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="90"
                      value={subsidyRate}
                      onChange={(e) => {
                        setSubsidyRate(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-300 space-y-1">
                    <div className="text-amber-400 font-bold">Fiscal Burden vs Food Grain Self-Sufficiency</div>
                    <p>Subsidies boost wheat/rice yields but increase government budget deficit over time.</p>
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IndustrialLicenseTradeDiagram
                  scheduleAShare={iprScheduleAShare}
                  licenseStrictness={licenseStrictness}
                  tariffWall={tariffWall}
                />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white">IPR 1956 & License Raj Simulator</h4>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Schedule A PSU Reserve Share:</span>
                      <span className="text-purple-400 font-bold">{iprScheduleAShare}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="80"
                      value={iprScheduleAShare}
                      onChange={(e) => {
                        setIprScheduleAShare(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Licensing Approval Strictness (Delay):</span>
                      <span className="text-orange-400 font-bold">{licenseStrictness}/100</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="95"
                      value={licenseStrictness}
                      onChange={(e) => {
                        setLicenseStrictness(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectoralShiftCanvas
                  yearIndex={simYear}
                  agriGdpShare={sectoralGdpShares.agri}
                  indGdpShare={sectoralGdpShares.ind}
                  servGdpShare={sectoralGdpShares.serv}
                  agriEmpShare={agEmpShare}
                />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white">Import Substitution & Structural Change Timeline</h4>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Simulation Timeline Year:</span>
                      <span className="text-sky-400 font-bold">{simYear}</span>
                    </div>
                    <input
                      type="range"
                      min="1950"
                      max="1990"
                      step="5"
                      value={simYear}
                      onChange={(e) => {
                        setSimYear(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-sky-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Import Tariff Protection Wall:</span>
                      <span className="text-rose-400 font-bold">{tariffWall}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="250"
                      value={tariffWall}
                      onChange={(e) => {
                        setTariffWall(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-rose-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY RENDERING OF OBSERVATION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-semibold text-emerald-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Empirical Observation Desk
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                    <span className="text-xs text-emerald-400 font-semibold uppercase">Observation #{oIdx + 1}</span>
                    <p className="text-xs text-white leading-snug">{obs.question}</p>
                    <div className="space-y-1.5">
                      {obs.observableOptions.map((opt, optIdx) => {
                        const sel = observationAnswers[oIdx] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => {
                              audioManager.play('tap');
                              const next = [...observationAnswers];
                              next[oIdx] = optIdx;
                              setObservationAnswers(next);
                            }}
                            className={`w-full text-left p-2.5 rounded-lg text-xs border transition-all ${
                              sel ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CHALLENGES (22+ Items) */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Challenge {challengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Tier: <span className="capitalize text-sky-400">{CHALLENGES[challengeIndex].difficulty}</span> • Node ID: {CHALLENGES[challengeIndex].nodeId}
                </h3>
              </div>
              <div className="w-full sm:w-48 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((challengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Challenge Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {CHALLENGES[challengeIndex].competencyLevel}
                  </span>
                </div>
                <h2 className="text-base font-bold text-white leading-relaxed">
                  {CHALLENGES[challengeIndex].question}
                </h2>
              </div>

              {/* Multiple Choice Options */}
              {CHALLENGES[challengeIndex].type === 'multiple_choice' && CHALLENGES[challengeIndex].options && (
                <div className="space-y-3">
                  {CHALLENGES[challengeIndex].options!.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    let optionStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';
                    if (isAnswerSubmitted) {
                      if (oIdx === CHALLENGES[challengeIndex].correctIndex) {
                        optionStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected) {
                        optionStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-amber-950/50 border-amber-500 text-amber-200 font-medium';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => {
                          audioManager.play('tap');
                          setSelectedOption(oIdx);
                        }}
                        className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                      >
                        <span className="font-bold text-xs uppercase px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric Input */}
              {CHALLENGES[challengeIndex].type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      disabled={isAnswerSubmitted}
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      placeholder="Enter numerical value..."
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 w-full sm:w-64"
                    />
                    {CHALLENGES[challengeIndex].unit && (
                      <span className="text-xs font-semibold text-slate-400">{CHALLENGES[challengeIndex].unit}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Submit / Next Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setCurrentHint(CHALLENGES[challengeIndex].hints[0]);
                    setShowHint(true);
                  }}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  💡 Need a Hint?
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    disabled={selectedOption === null && numericAnswer === ''}
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={nextChallenge}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>

              {/* Answer Feedback Explanation */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-xl text-xs space-y-1 ${
                  isAnswerCorrect ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border border-rose-500/40 text-rose-200'
                }`}>
                  <div className="font-bold text-sm">{isAnswerCorrect ? 'Correct!' : 'Incorrect'}</div>
                  <p className="leading-relaxed">{CHALLENGES[challengeIndex].explanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL WORLD ACTIVITY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* MANDATORY REAL-WORLD ACTIVITY DISPLAY */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Mandatory Real-World Activity</span>
                  <h2 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Key Misconceptions & Clarifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map(misc => (
                  <div key={misc.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                    <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span>⚠️ Misconception:</span>
                      <span>{misc.title}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{misc.explanation}</p>
                    <div className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                      ✓ <span className="font-semibold">Correct Concept:</span> {misc.correctedConcept}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIAGNOSTIC CHECKPOINT */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Diagnostic Learning Mastery Checkpoint
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DIAGNOSTIC_QUESTIONS.map((dq, idx) => {
                  const mastery = getMasteryLevel(bktStates[dq.nodeId] || createBKTState());
                  return (
                    <div key={dq.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="text-xs text-white font-medium">Q{idx + 1}: {dq.question}</div>
                        <div className="text-[10px] text-slate-500 mt-1">Node: {dq.nodeId}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded capitalize ${
                        mastery === 'mastered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500' : 'bg-amber-950 text-amber-400 border border-amber-500'
                      }`}>
                        {mastery}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Simulation & Planning Masterclass Complete!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
};

export default C11_EcoIndianEconomyCBSESim;