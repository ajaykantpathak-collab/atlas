'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// ─── NODE IDENTIFIERS ───
const NODE_C10_ECON_031 = 'c10_econ_031';
const NODE_C10_ECON_032 = 'c10_econ_032';
const NODE_C10_ECON_033 = 'c10_econ_033';
const NODE_C10_ECON_034 = 'c10_econ_034';
const NODE_C10_ECON_035 = 'c10_econ_035';
const NODE_C10_ECON_036 = 'c10_econ_036';
const NODE_C10_ECON_037 = 'c10_econ_037';
const NODE_C10_ECON_038 = 'c10_econ_038';
const NODE_C10_ECON_039 = 'c10_econ_039';
const NODE_C10_ECON_040 = 'c10_econ_040';
const NODE_C10_ECON_041 = 'c10_econ_041';
const NODE_C10_ECON_042 = 'c10_econ_042';

const ALL_NODE_IDS = [
  NODE_C10_ECON_031,
  NODE_C10_ECON_032,
  NODE_C10_ECON_033,
  NODE_C10_ECON_034,
  NODE_C10_ECON_035,
  NODE_C10_ECON_036,
  NODE_C10_ECON_037,
  NODE_C10_ECON_038,
  NODE_C10_ECON_039,
  NODE_C10_ECON_040,
  NODE_C10_ECON_041,
  NODE_C10_ECON_042,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Union Ministry of Finance & Consumer Affairs Crisis Room',
  intro: 'India is navigating a complex economic landscape. The Union Budget must balance record infrastructure capital spending against ₹10.8 lakh crore in interest liabilities, imported oil shocks are pushing up freight costs, and wholesale markets report surging consumer grievances and adulteration scandals.',
  context: 'As Chief Economic Advisor and Consumer Ombudsman, you must balance public budgets, calibrate inflation-control tools, identify supply vs demand shocks, protect consumer rights under COPRA 2019, and ensure food safety through PDS and certification marks.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'The Government of India repays ₹5,000 crore as loan principal and pays ₹2,000 crore as loan interest in the same fiscal year. How are these classified?',
  options: [
    'Both are Revenue Expenditure because both relate to borrowing operations.',
    'Principal repayment is Capital Expenditure (reduces liability); Interest is Revenue Expenditure (recurring cost).',
    'Principal repayment is Revenue Expenditure; Interest is Capital Expenditure (asset creation).',
    'Both are Capital Receipts because money originated from banks.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember the golden rule of budgeting: If spending creates an asset or reduces a liability, it is Capital. Otherwise, it is Revenue!',
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
}

// ─── CHALLENGES DATASET (22 Challenges across 12 Nodes) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_031_1',
    nodeId: NODE_C10_ECON_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under Union Budget 2024-25, ₹11.1 lakh crore is allocated for Bharatmala highways and high-speed rail rakes. Which expenditure type is this?',
    options: [
      'Revenue Expenditure (recurring operational costs)',
      'Capital Expenditure (creates physical/long-term national assets)',
      'Non-developmental administrative grants',
      'Transfer payments with no productive return',
    ],
    correctIndex: 1,
    explanation: 'Capital expenditure creates physical or financial assets (like highways, rail networks, and hospitals) or reduces government debt liabilities.',
    hints: [
      'Ask yourself: Does building a highway create a physical asset that lasts for decades?',
      'Expenditures that build new national infrastructure add directly to the nation\'s capital stock.',
      'Asset creation = Capital Expenditure. Operational spending = Revenue Expenditure.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_031_2',
    nodeId: NODE_C10_ECON_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A state budget shows Total Expenditure = ₹3,50,000 crore. Capital projects (Metro + AIIMS + Loan principal repayment) = ₹35,000 crore. What is the capex share (%) of the budget?',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Capex Share = (Capital Expenditure ÷ Total Expenditure) × 100 = (35,000 ÷ 3,50,000) × 100 = 10%.',
    hints: [
      'Use the formula: Capex Share = (Capital Expenditure / Total Expenditure) * 100.',
      'Divide ₹35,000 crore by ₹3,50,000 crore.',
      '35,000 / 350,000 = 0.10, which equals 10%.',
    ],
  },
  {
    id: 'ch_032_1',
    nodeId: NODE_C10_ECON_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A citizen deposits ₹1.5 lakh into a 15-year Public Provident Fund (PPF) account at 7.1% interest. From the government\'s balance sheet, what is this?',
    options: [
      'Private equity investment with zero liability',
      'Internal Public Debt under Small Savings (an obligation to repay with interest)',
      'External foreign currency liability',
      'Revenue receipt that never requires repayment',
    ],
    correctIndex: 1,
    explanation: 'While PPF is a savings asset for the household, it is a borrowing (Internal Public Debt) for the Government of India, which must repay principal plus interest.',
    hints: [
      'Look at the transaction from the Government of India\'s viewpoint, not the saver\'s.',
      'The government holds the funds and must repay them after 15 years with 7.1% interest.',
      'This makes PPF a constituent of internal small-savings debt.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_032_2',
    nodeId: NODE_C10_ECON_032,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does India deliberately maintain over 95% of its central public debt as rupee-denominated internal debt rather than foreign commercial loans?',
    options: [
      'Internal debt has zero interest costs compared to international loans.',
      'To prevent currency risk where rupee depreciation dramatically increases debt-servicing burdens in foreign currency.',
      'Foreign multilateral banks are legally prohibited from lending to developing nations.',
      'Domestic banks do not require bond redemption at maturity.',
    ],
    correctIndex: 1,
    explanation: 'Following the 1991 Balance of Payments crisis, India prioritised domestic rupee debt to eliminate currency risk, avoiding ballooning repayments when the rupee weakens against the USD/EUR.',
    hints: [
      'What happened in 1991 when foreign exchange reserves ran dangerously low?',
      'If you borrow in US dollars and the rupee falls from ₹70 to ₹85 per dollar, what happens to your repayment burden in rupees?',
      'Denominating debt in domestic currency eliminates external currency depreciation shocks.',
    ],
  },
  {
    id: 'ch_033_1',
    nodeId: NODE_C10_ECON_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Due to a flash flood, tomato prices in Azadpur Mandi spike from ₹30/kg to ₹120/kg for two weeks while all other consumer goods remain steady. Is this inflation?',
    options: [
      'Yes, any rapid price rise exceeding 100% is considered hyperinflation.',
      'No, it is a transient relative price shock because inflation requires a sustained and general rise across the entire price basket.',
      'Yes, because agricultural goods form 100% of the Wholesale Price Index.',
      'No, because only manufactured industrial goods count toward official inflation.',
    ],
    correctIndex: 1,
    explanation: 'Inflation requires two conditions: SUSTAINED over time (months/years) and GENERAL across the entire basket of goods and services. A temporary spike in a single vegetable is a relative price shock.',
    hints: [
      'Check the two defining criteria of inflation: "sustained" and "general".',
      'Did the price rise last for months across all commodities, or two weeks for just tomatoes?',
      'A single-item temporary spike is a localized relative price shock.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_033_2',
    nodeId: NODE_C10_ECON_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'India\'s CPI (Combined) index moved from 175.0 in March 2023 to 183.75 in March 2024. Calculate the annual CPI inflation rate (%).',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Inflation Rate = [(183.75 − 175.0) ÷ 175.0] × 100 = (8.75 ÷ 175.0) × 100 = 5.0%.',
    hints: [
      'Formula: [(Current Index - Base Index) / Base Index] * 100.',
      '183.75 - 175.0 = 8.75.',
      '(8.75 / 175.0) * 100 = 5%.',
    ],
  },
  {
    id: 'ch_034_1',
    nodeId: NODE_C10_ECON_034,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the four stages of inflation with their characteristic annual rate thresholds:',
    options: [
      'Creeping (<3%), Walking (3%–7%), Running (>10%), Hyperinflation (>1000% or prices doubling in days)',
      'Creeping (0%), Walking (10%–20%), Running (50%), Hyperinflation (100%)',
      'Creeping (5%), Walking (10%), Running (25%), Hyperinflation (500%)',
      'Creeping (1%–5%), Walking (5%–15%), Running (20%–50%), Hyperinflation (100%)',
    ],
    correctIndex: 0,
    explanation: 'Standard economic classification: Creeping (<3%), Walking (3-7%, within RBI\'s 4%±2% band), Running (>10%), and Hyperinflation (>1000% where currency collapses).',
    hints: [
      'Recall the RBI tolerance band: 4% ± 2% (2% to 6%) covers creeping to walking.',
      'Running is dangerous double-digit inflation (>10%).',
      'Hyperinflation involves currency collapse and price explosions (>1000%).',
    ],
  },
  {
    id: 'ch_034_2',
    nodeId: NODE_C10_ECON_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Zimbabwe in 2008 recorded annual price increases of 79.6 billion percent with prices doubling every 24 hours. What fundamental structural breakdown occurred?',
    options: [
      'Mild creeping inflation stimulated industrial manufacturing capacity.',
      'Walking inflation remained safely anchored by central bank interest rates.',
      'Hyperinflation destroyed faith in the currency, triggering currency abandonment and total monetary collapse.',
      'Stagflation occurred with stable currency parity against the US dollar.',
    ],
    correctIndex: 2,
    explanation: 'Hyperinflation represents a complete breakdown of the monetary unit where velocity approaches infinity, prices double in days or hours, and the currency must be abandoned.',
    hints: [
      'Look at the astronomical rate: 79.6 billion percent.',
      'When prices double daily, do citizens hold onto paper banknotes?',
      'Zimbabwe had to officially discontinue the Zimbabwean dollar and adopt the US dollar.',
    ],
  },
  {
    id: 'ch_035_1',
    nodeId: NODE_C10_ECON_035,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Following geopolitical conflict in West Asia, Brent crude climbs from $70 to $120/barrel, raising diesel transport costs across India and forcing FMCG firms to increase retail prices. What type of inflation is this?',
    options: [
      'Demand-Pull Inflation triggered by excessive consumer liquidity',
      'Cost-Push Inflation triggered by an external input cost and supply-side shock',
      'Deflationary contraction in the general price level',
      'Deficit financing inflation from excessive government printing',
    ],
    correctIndex: 1,
    explanation: 'Cost-push inflation is triggered by supply-side increases in production inputs (fuel, raw materials, wages, indirect taxes), shifting the aggregate supply curve leftward.',
    hints: [
      'Did consumer demand surge first, or did crude oil input costs spike?',
      'Crude oil is a primary input for freight, packaging, and manufacturing.',
      'Supply-side cost increase = Cost-Push Inflation.',
    ],
  },
  {
    id: 'ch_035_2',
    nodeId: NODE_C10_ECON_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is raising the RBI repo rate an imperfect or blunt remedy during pure cost-push stagflation (e.g. 1973 oil shock or monsoon crop failure)?',
    options: [
      'Interest rate hikes cannot lower global crude oil prices or restore damaged crops, and higher borrowing costs may further suppress output and raise production costs.',
      'Repo rate changes are only legal during periods of negative economic growth.',
      'Commercial banks are exempt from repo rate adjustments during agricultural crises.',
      'Cost-push inflation automatically self-corrects within 24 hours without policy action.',
    ],
    correctIndex: 0,
    explanation: 'Monetary rate hikes compress aggregate demand. They cannot drill oil or make rain. By raising working capital borrowing costs, rate hikes can deepen output contraction (stagflation).',
    hints: [
      'What does raising the repo rate do to consumer and corporate loans?',
      'Can a higher interest rate at SBI fix an oil tanker shortage or unseasonal rain in Maharashtra?',
      'Demand tools do not directly fix supply-side physical bottlenecks.',
    ],
  },
  {
    id: 'ch_036_1',
    nodeId: NODE_C10_ECON_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Following the 7th Pay Commission award and post-lockdown reopening, millions of households spend accumulated savings on automobiles and travel. Factories at 98% capacity cannot raise output. What inflation mechanism is triggered?',
    options: [
      'Cost-Push Inflation due to raw material export bans',
      'Demand-Pull Inflation: "Too much money chasing too few goods" near full capacity',
      'Imported Stagflation with zero wage increments',
      'Administrative PDS rationing price correction',
    ],
    correctIndex: 1,
    explanation: 'When aggregate demand expands faster than productive capacity near full employment, buyers bid up prices, causing Demand-Pull Inflation.',
    hints: [
      'Notice the key details: households have higher disposable cash and factories are near 100% capacity.',
      'When buyers compete for limited output, what happens to the demand curve?',
      'Aggregate Demand shifts rightward against inelastic supply = Demand-Pull.',
    ],
  },
  {
    id: 'ch_037_1',
    nodeId: NODE_C10_ECON_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During unexpected 10% annual inflation, who among the following gains in real economic terms?',
    options: [
      'An EPS-95 pensioner receiving a fixed unindexed ₹3,000 monthly pension',
      'A fixed-deposit holder earning 6% nominal interest (net real return = -4%)',
      'A borrower who took a long-term fixed-rate home loan at 7% (repaying in depreciated rupees)',
      'A daily wage worker whose wages are frozen for two years',
    ],
    correctIndex: 2,
    explanation: 'Debtors gain during unanticipated inflation because they repay loans in cheaper, depreciated currency with lower purchasing power (Real Interest Rate = Nominal Rate - Inflation = 7% - 10% = -3%).',
    hints: [
      'Calculate Real Return = Nominal Interest - Inflation Rate.',
      'Fixed-income earners receive money that buys fewer goods.',
      'Debtors pay back debt using money that is worth less than when they borrowed it.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_037_2',
    nodeId: NODE_C10_ECON_037,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A senior citizen holds a 1-year Bank Fixed Deposit earning 6.5% nominal interest. Inflation for that year turns out to be 8.5%. What is the real interest rate (%) earned?',
    correctAnswer: -2,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Real Interest Rate = Nominal Rate − Inflation Rate = 6.5% − 8.5% = −2.0%. The purchasing power of the deposit shrinks by 2%.',
    hints: [
      'Use the Fisher equation approximation: Real Rate = Nominal Rate - Inflation Rate.',
      '6.5% - 8.5% = -2.0%.',
      'A negative real rate means the saver is losing purchasing power.',
    ],
  },
  {
    id: 'ch_038_1',
    nodeId: NODE_C10_ECON_038,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Drag the correct form of consumer exploitation to match each real-world market malpractice.',
    dragItems: [
      { label: 'Adulteration', targetId: 'slot_adulteration' },
      { label: 'False Weights', targetId: 'slot_weights' },
      { label: 'Misleading Ads', targetId: 'slot_ads' },
      { label: 'Sale above MRP', targetId: 'slot_mrp' },
    ],
    correctMapping: {
      slot_adulteration: 'Adulteration',
      slot_weights: 'False Weights',
      slot_ads: 'Misleading Ads',
      slot_mrp: 'Sale above MRP',
    },
    explanation: 'Mixing argemone oil in mustard oil is Adulteration; using 900g weights for 1kg is False Weights; claiming unproven instant disease cures is Misleading Ads; charging ₹60 for a ₹45 cold drink is Sale above MRP.',
    hints: [
      'Match physical contamination with Adulteration.',
      'Match short measurement with False Weights.',
      'Match overcharging printed price with Sale above MRP.',
    ],
  },
  {
    id: 'ch_038_2',
    nodeId: NODE_C10_ECON_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A luxury boutique sells handcrafted Italian leather shoes for ₹80,000 with clear pricing. Meanwhile, an airport kiosk sells a ₹20 packaged water bottle for ₹45. Which constitutes consumer exploitation?',
    options: [
      'Both, because any high price is illegal under Indian law.',
      'Neither, because private sellers have total freedom over all pricing.',
      'Only the airport kiosk, because it violates the legally printed Maximum Retail Price (MRP) under the Legal Metrology Act.',
      'Only the luxury shoe boutique, because footwear is an essential commodity.',
    ],
    correctIndex: 2,
    explanation: 'High prices transparently charged for luxury goods are voluntary market transactions. Exploitation requires deception, coercion, or violation of legal standards (such as charging above the printed MRP).',
    hints: [
      'Is charging a high price for luxury items illegal if the buyer knows the price in advance?',
      'What does the Legal Metrology Act state regarding printed MRP on packaged goods?',
      'Exploitation involves deception, coercion, or breaking statutory rules.',
    ],
  },
  {
    id: 'ch_039_1',
    nodeId: NODE_C10_ECON_039,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Distinguish between "forms" and "reasons" for consumer exploitation in India:',
    options: [
      'Forms describe WHAT unfair practices occur (adulteration, short weights); Reasons describe WHY they persist (low literacy, unorganised consumers, weak enforcement).',
      'Forms apply only to rural consumers, whereas reasons apply only to online e-commerce shoppers.',
      'Forms are created by the CCPA, whereas reasons are defined by the RBI.',
      'Forms and reasons are identical terms in Indian commercial jurisprudence.',
    ],
    correctIndex: 0,
    explanation: 'Forms are the actual unfair acts committed by sellers (WHAT happens). Reasons are the structural enabling conditions (WHY it happens — 77.7% literacy, lack of consumer unions, court backlogs).',
    hints: [
      'Ask: Is "adulteration" the action or the root cause?',
      'Adulteration is the act (form). Illiteracy or poor enforcement is the reason it goes unpunished.',
      'Forms = WHAT; Reasons = WHY.',
    ],
  },
  {
    id: 'ch_040_1',
    nodeId: NODE_C10_ECON_040,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the three-tier consumer disputes redressal commission tiers under COPRA 2019 to their statutory pecuniary jurisdiction:',
    options: [
      'District Commission (Up to ₹1 crore), State Commission (₹1 crore to ₹10 crore), National Commission (Above ₹10 crore)',
      'District Commission (Up to ₹20 lakh), State Commission (₹20 lakh to ₹1 crore), National Commission (Above ₹1 crore)',
      'District Commission (Up to ₹50 lakh), State Commission (₹50 lakh to ₹5 crore), National Commission (Above ₹5 crore)',
      'District Commission (Up to ₹10 lakh), State Commission (₹10 lakh to ₹50 lakh), National Commission (Above ₹50 lakh)',
    ],
    correctIndex: 0,
    explanation: 'Under COPRA 2019: District Commission handles claims up to ₹1 crore; State Commission handles ₹1 crore to ₹10 crore; National Commission handles claims exceeding ₹10 crore.',
    hints: [
      'Remember the 2019 revision raised limits significantly from the 1986 Act.',
      'District = Up to ₹1 Cr; State = ₹1 Cr to ₹10 Cr; National = >₹10 Cr.',
      'Select the option with ₹1 Cr and ₹10 Cr thresholds.',
    ],
  },
  {
    id: 'ch_040_2',
    nodeId: NODE_C10_ECON_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does COPRA 2019\'s "Right to Information" differ in jurisdiction and scope from the Right to Information (RTI) Act 2005?',
    options: [
      'COPRA\'s Right to Information empowers buyers to know product quality, purity, and price from private sellers; RTI 2005 empowers citizens to access public records from government departments.',
      'COPRA applies only to central ministers, while RTI 2005 applies exclusively to grocery stores.',
      'Both statutes are identical chapters under the Indian Penal Code.',
      'RTI 2005 handles defective goods, whereas COPRA 2019 inspects police stations.',
    ],
    correctIndex: 0,
    explanation: 'COPRA 2019 enforces market transparency against private manufacturers/sellers. RTI 2005 enforces democratic transparency against public authorities and government bodies for a ₹10 fee.',
    hints: [
      'Who do you demand product ingredients and MRP from vs who do you request government spending records from?',
      'COPRA = Private marketplace (goods and services).',
      'RTI 2005 = Public government authorities.',
    ],
  },
  {
    id: 'ch_041_1',
    nodeId: NODE_C10_ECON_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A lab test reveals metanil yellow dye in turmeric powder and argemone oil in mustard oil. What severe health hazards are associated with these two intentional adulterants?',
    options: [
      'Temporary skin dryness and mild toothache',
      'Metanil yellow is a proven carcinogen (liver cancer); Argemone oil causes Epidemic Dropsy and heart failure (60 deaths in Delhi, 1998)',
      'Transient boost in vitamin B12 absorption',
      'Immediate enhancement of eyesight with zero toxicity',
    ],
    correctIndex: 1,
    explanation: 'Metanil yellow is a toxic coal-tar dye causing cancer and liver damage. Argemone oil contains sanguinarine which triggers epidemic dropsy, severe cardiac failure, and death.',
    hints: [
      'Food adulteration is far more dangerous than simple stomach discomfort.',
      'Recall the 1998 Delhi dropsy crisis caused by mustard oil adulteration.',
      'Metanil yellow is a synthetic carcinogen.',
    ],
  },
  {
    id: 'ch_041_2',
    nodeId: NODE_C10_ECON_041,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the laboratory/home test steps to detect starch adulteration in suspected milk samples in the correct order:',
    sortItems: [
      'Take 5 ml of milk sample in a clean test tube',
      'Boil the milk sample thoroughly and allow it to cool to room temperature',
      'Add 2-3 drops of iodine solution to the cooled sample',
      'Observe colour change: intense blue-black confirms presence of added starch',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The standard iodine test for starch: take sample -> boil and cool -> add iodine reagent -> observe blue-black colour formation indicating starch presence.',
    hints: [
      'First obtain the milk sample in a test tube.',
      'Boil and cool the sample before adding reagents.',
      'Iodine reagent turns blue-black in the presence of starch polymers.',
    ],
  },
  {
    id: 'ch_042_1',
    nodeId: NODE_C10_ECON_042,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match each product category with its mandatory statutory certification mark or administrative protection measure.',
    dragItems: [
      { label: 'ISI Mark (BIS)', targetId: 'target_iron' },
      { label: 'AGMARK', targetId: 'target_honey' },
      { label: 'ECOMARK', targetId: 'target_soap' },
      { label: 'PDS (Fair Price Shop)', targetId: 'target_rice' },
    ],
    correctMapping: {
      target_iron: 'ISI Mark (BIS)',
      target_honey: 'AGMARK',
      target_soap: 'ECOMARK',
      target_rice: 'PDS (Fair Price Shop)',
    },
    explanation: 'Electric irons and helmets carry the ISI mark (BIS Act 2016); agricultural honey and ghee carry AGMARK (1937 Act); eco-friendly soaps carry ECOMARK; subsidized ration foodgrains are distributed via PDS (NFSA 2013).',
    hints: [
      'ISI is for industrial/electrical manufactured goods.',
      'AGMARK is for agricultural produce like honey, spices, and ghee.',
      'ECOMARK is the earthen pot symbol for eco-friendly goods.',
      'PDS distributes subsidized grains to Antyodaya and Priority households.',
    ],
  },
  {
    id: 'ch_042_2',
    nodeId: NODE_C10_ECON_042,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why are PDS and BIS/AGMARK complementary rather than interchangeable consumer protection measures?',
    options: [
      'PDS solves the AFFORDABILITY dimension (subsidized foodgrains at ₹3/kg for 80 Cr citizens) but does not certify technical standards; BIS/AGMARK solve the QUALITY/SAFETY dimension but do not subsidize retail prices for the poor.',
      'PDS operates only in foreign embassies, while BIS handles military weapons.',
      'BIS produces all agricultural foodgrains, while PDS tests industrial electronics.',
      'Both are identical technical certification bodies governed by the Ministry of Steel.',
    ],
    correctIndex: 0,
    explanation: 'A poor family needs food they can afford (PDS administrative distribution) AND food/goods that are tested and safe (BIS/AGMARK technical standards). Comprehensive protection requires both affordability and quality.',
    hints: [
      'Think: If food is 100% pure but costs ₹500/kg, can a BPL household buy it?',
      'If food is ₹1/kg but full of chalk, is the consumer protected?',
      'Affordability (PDS) + Quality/Safety (BIS/AGMARK) = Complete protection.',
    ],
  },
  // ─── Class 10 board-depth additions: consumer-rights diagnostics ───
  {
    id: 'ch_depth_consumer_comic_rights',
    nodeId: 'c10_eco_cbse_05_002',
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Storyboard a 4-panel comic in which a consumer suffers violations of ALL the consumer rights (safety, information, choice, redressal) -- describe each panel in 1-2 sentences.',
    availableParts: ['Panel 1: unsafe product', 'Panel 2: missing information', 'Panel 3: no alternative offered', 'Panel 4: complaint dismissed', 'Resolution: District Commission'],
    targetState: 'Panel 1: unsafe product Panel 2: missing information Panel 3: no alternative offered Panel 4: complaint dismissed Resolution: District Commission',
    validationHint: 'Build the story so each panel violates exactly one right, then close with the redressal path.',
    explanation: 'Panel 1 (safety): a pressure cooker with a faulty valve bursts -- COPRA\'s right to safety violated. Panel 2 (information): the box hides ingredients and expiry -- right to information. Panel 3 (choice): the shop forces a bundled purchase -- right to choose. Panel 4 (redressal): the dealer refuses the complaint -- right to redress, so the consumer files at the District Commission (Pecuniary jurisdiction up to Rs 50 lakh under the 2019 Act).',
    hints: [
      'One right per panel keeps the story crisp.',
      'The 2019 Consumer Protection Act replaced the three-tier "Forums" with "Commissions".',
      'End every comic at the institution that can actually help.'
    ],
  },
  {
    id: 'ch_depth_consumer_rwa_overbilling',
    nodeId: 'c10_eco_cbse_05_006',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An RWA finds the electricity company repeatedly overbills consumers. Which democratic machinery applies, and what 3-step action plan should a Class 10 student follow on finding a packaged snack WITHOUT the mandatory FSSAI licence number and veg mark?',
    options: [
      'Consumer redressal chain (complaint helpline 1912/consumer forum) plus RTI for billing data; for the snack: (1) stop and photograph the label as evidence, (2) complain on the FSSAI app / to the shopkeeper citing the Legal Metrology (Packaged Commodities) Rules, (3) escalate to the District Consumer Commission if a health risk persists -- using rights to information, safety and redressal',
      'Do nothing; labels are optional decorations',
      'Pay the bill silently; expired labels only matter for medicines',
      'Vandalise the shop; consumer law rewards direct action'
    ],
    correctIndex: 0,
    explanation:
      'Mandatory label elements: FSSAI licence number, veg/non-veg symbol, ingredients, MRP, expiry, net quantity, manufacturer details. The learner\'s plan operationalises the chapter: evidence first, formal channel second, escalation third. Overbilling cases are exactly what consumer commissions handle -- deficiency of service.',
    hints: [
      'Evidence -> channel -> escalation is the universal sequence.',
      'FSSAI number + veg mark are legally compulsory, not courtesy.',
      'Consumer Commission jurisdiction starts at the District.'
    ],
  },
  {
    id: 'ch_depth_consumer_laptop_warranty',
    nodeId: 'c10_eco_cbse_05_008',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A laptop bought for Rs 85,000 with a 2-year warranty fails at 18 months; the authorised centre blames "misuse" and quotes Rs 40,000 for repair. What is the consumer\'s strongest legal ground?',
    options: [
      'The burden of proving misuse lies on the seller once the product fails WITHIN the warranty period -- the consumer should demand a written misuse report, then file for deficiency of service/unfair trade practice at the District Consumer Commission (goods up to Rs 50 lakh), seeking repair/replacement/refund plus compensation',
      'The company\'s word is final; consumers must always pay after the first 12 months',
      'Only criminal courts can hear warranty disputes',
      'Warranties are legally unenforceable in India'
    ],
    correctIndex: 0,
    explanation:
      'Under the Consumer Protection Act, "deficiency" and "unfair trade practice" cover wrongful warranty denial; commissions can order replacement, refund, compensation and costs. Hallmark India-lesson: HDFC-era case law obliges the service centre to substantiate the misuse claim with evidence, not assertions. Keep invoices, warranty card, service records -- the file wins the case.',
    hints: [
      'Who must PROVE misuse -- the buyer or the seller?',
      'Match the claim value to the right Commission.',
      'Relief menu: repair, replace, refund, compensation, costs.'
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
  nodeId: 'c10_econ_031',
  title: 'Public Expenditure, Inflation Dynamics & Consumer Protection',
  definition: 'An integrated study of the Government budget (Revenue vs Capital expenditure, Public Debt), Macroeconomic stability (Inflation stages, Demand-Pull vs Cost-Push, Real income redistribution), and Consumer Welfare (Exploitation forms, COPRA 2019, RTI, Food adulteration, and BIS/AGMARK/PDS protection measures).',
  eli5: 'Think of the economy like running a huge household: The government budgets for daily groceries (revenue) and building a house (capital capex). When too much cash chases scarce items or oil costs surge, prices rise (inflation), hurting savers and helping debtors. To stop shopkeepers from cheating or adulterating food, laws like COPRA and marks like ISI and AGMARK protect consumers.',
  misconceptions: [
    { misconception: 'Loan principal repayment is revenue expenditure because it recurs annually.', correction: 'Loan principal repayment reduces a liability, so it is Capital Expenditure. Loan interest payment creates no asset and reduces no principal, so it is Revenue Expenditure.' },
    { misconception: 'PPF and small savings belong to households and are not public debt.', correction: 'While PPF is an asset for the household, it is an internal borrowing (liability) on the government balance sheet that must be repaid with interest.' },
    { misconception: 'A 2-week price spike in onions or tomatoes is inflation.', correction: 'Inflation must be both sustained over time and general across the basket of goods. A brief single-vegetable spike is a relative price shock.' },
    { misconception: 'Inflation hurts everyone equally across the entire economy.', correction: 'Inflation redistributes wealth: fixed pensioners and creditors lose real purchasing power, while debtors and tangible asset owners gain.' },
    { misconception: 'PDS is a technical quality certification measure.', correction: 'PDS is an administrative distribution network providing affordable foodgrains. Quality and safety certification is performed by BIS, AGMARK, and FSSAI.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary test for Capital Expenditure?', options: ['It must recur monthly', 'It creates an asset or reduces a liability', 'It pays government salaries', 'It provides free food subsidies'], correctIndex: 1 },
    { question: 'What percentage of India\'s central debt is internal (rupee-denominated)?', options: ['Under 20%', 'Around 50%', 'Over 95%', 'Exactly 10%'], correctIndex: 2 },
    { question: 'What is the statutory CPI inflation target set for the RBI?', options: ['0% fixed', '4% with ±2% band (2% to 6%)', '8% to 12%', '10% fixed'], correctIndex: 1 },
    { question: 'Which stage describes dangerous double-digit inflation exceeding 10%?', options: ['Creeping', 'Walking', 'Running (Galloping)', 'Hyperinflation'], correctIndex: 2 },
    { question: 'What type of inflation is caused by a surge in global crude oil and freight costs?', options: ['Demand-Pull', 'Cost-Push (Supply-Side)', 'Hyperinflation', 'Deflation'], correctIndex: 1 },
    { question: 'Real Interest Rate is calculated as:', options: ['Nominal Rate + Inflation Rate', 'Nominal Rate − Inflation Rate', 'Nominal Rate × Inflation Rate', 'Inflation Rate ÷ Nominal Rate'], correctIndex: 1 },
    { question: 'Under COPRA 2019, which body has suo motu powers to recall hazardous goods?', options: ['District Commission', 'Central Consumer Protection Authority (CCPA)', 'Directorate of Marketing', 'State Food Commission'], correctIndex: 1 },
    { question: 'Which certification mark is mandatory on pure agricultural honey and ghee?', options: ['ISI mark', 'AGMARK', 'ECOMARK', 'FPO only'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery across public financial classification, inflation mechanics and Fisher equations, consumer rights under COPRA 2019, and quality certification standards.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Union Budget Asset-Liability Simulator',
    instruction: 'Adjust the Capital vs Revenue expenditure split to observe real-time changes in Capex Share and the visual fiscal balance.',
    interactionType: 'budget-allocator',
    nodeId: NODE_C10_ECON_031,
  },
  {
    title: 'AD-AS Inflation Dynamics Lab',
    instruction: 'Shift the Aggregate Demand (Money Supply) and Aggregate Supply (Crude/Input Cost) sliders to see real-time price equilibrium and curve shifts.',
    interactionType: 'adas-simulator',
    nodeId: NODE_C10_ECON_035,
  },
  {
    title: 'Real Income & Purchasing Power Matrix',
    instruction: 'Adjust nominal inflation to see how real income diverges between fixed-pensioners, debtors, and fixed deposit savers.',
    interactionType: 'distribution-matrix',
    nodeId: NODE_C10_ECON_037,
  },
  {
    title: 'Food Adulteration Chemistry Test Bench',
    instruction: 'Perform interactive reagent tests on milk (iodine) and turmeric (HCl) to detect synthetic starch and carcinogenic metanil yellow.',
    interactionType: 'lab-reagents',
    nodeId: NODE_C10_ECON_041,
  },
  {
    title: 'Consumer Protection & Certification Scanner',
    instruction: 'Inspect the COPRA 2019 Three-Tier Redressal Hierarchy and statutory marks (ISI, AGMARK, ECOMARK, PDS ration quotas).',
    interactionType: 'standards-scanner',
    nodeId: NODE_C10_ECON_042,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If global crude oil surges from $70 to $130/barrel, which curve shifts and what happens to GDP output and price level?',
    options: [
      'AD shifts right: Price rises and GDP output expands rapidly.',
      'AS shifts left (Cost-Push): Price level rises while GDP output contracts (Stagflation risk).',
      'AS shifts right: Price drops and unemployment reaches zero.',
      'No curve shifts; only foreign exchange rates change.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the "Crude Oil Input Cost" slider to $130 in the simulator below and observe the leftward supply shift.',
    nodeId: NODE_C10_ECON_035,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Capex Share when the government shifts ₹5 lakh crore from recurring subsidies into highway construction?',
    observableOptions: [
      'Capex Share increases, boosting long-term physical asset formation without directly increasing ongoing liabilities.',
      'Total expenditure automatically drops to zero.',
      'Revenue expenditure expands while capital stock declines.',
      'Internal debt becomes 100% external foreign debt.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECON_031,
  },
  {
    question: 'What happens to the price equilibrium and output when the money supply growth rate is increased from 8% to 18% in the AD-AS lab?',
    observableOptions: [
      'The Aggregate Demand (AD) curve shifts rightward, pulling the equilibrium price level upward.',
      'The Aggregate Supply (AS) curve shifts downward, cutting consumer prices in half.',
      'Equilibrium price stays unchanged while money velocity falls to zero.',
      'Output and price level both plummet due to supply starvation.',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECON_035,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Economic Advisor & Consumer Ombudsman Audit',
  description: 'Conduct a practical investigation in your own household and neighbourhood market:',
  steps: [
    'Inspect 3 packaged items in your kitchen (salt/spices, electric iron/plug, honey/ghee) and identify their ISI or AGMARK certification numbers.',
    'Interview a family member about their electricity and grocery bills to calculate the annual percentage change.',
    'Verify whether packaged drinking water bottles or cold drinks at local transport hubs are sold at or above the printed MRP.',
    'Draft a sample 1-page grievance complaint under COPRA 2019 for a hypothetical defective appliance with an 18-month warranty.',
  ],
};

// ─── MAIN COMPONENT ───
function C10_EconomicsPublicExpenditureRevenueSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c10_econ_031',
  title = DEFAULT_PROPS.title || 'Economics Public Expenditure & Consumer Sim',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['econ'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org style states
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);

  // Interactive Exploration & Sandbox Simulation States (Real-time Slider Variables)
  const [revenueExp, setRevenueExp] = useState(34); // in lakh crore
  const [capitalExp, setCapitalExp] = useState(11); // in lakh crore
  const [crudePrice, setCrudePrice] = useState(75); // $/barrel
  const [moneySupplyGrowth, setMoneySupplyGrowth] = useState(10); // %
  const [nominalInflation, setNominalInflation] = useState(6); // %
  const [testFood, setTestFood] = useState<'milk' | 'turmeric' | 'chilli' | 'ghee'>('milk');
  const [reagentAdded, setReagentAdded] = useState(false);
  const [selectedScannerItem, setSelectedScannerItem] = useState<'iron' | 'honey' | 'soap' | 'pds_grain'>('iron');

  // Adaptive difficulty & scoring
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

  // Drag & Sort & Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Misconceptions tracked
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs for BKT & timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Derived Economic Calculations
  const totalExp = useMemo(() => revenueExp + capitalExp, [revenueExp, capitalExp]);
  const capexShare = useMemo(() => ((capitalExp / (totalExp || 1)) * 100).toFixed(1), [capitalExp, totalExp]);

  // Real interest calculation
  const fdNominalRate = 6.5;
  const realFdRate = useMemo(() => (fdNominalRate - nominalInflation).toFixed(1), [nominalInflation]);
  const realPensionValue = useMemo(() => (10000 / Math.pow(1 + nominalInflation / 100, 3)).toFixed(0), [nominalInflation]);

  // AD-AS Graph Data
  const adAsData = useMemo(() => {
    const data = [];
    const adShift = (moneySupplyGrowth - 8) * 2;
    const asShift = (crudePrice - 70) * 0.3;
    for (let q = 20; q <= 100; q += 10) {
      const pAD = Math.max(10, 150 - 1.2 * q + adShift);
      const pAS = Math.max(10, 20 + 0.9 * q + asShift);
      data.push({ quantity: q, AggregateDemand: Math.round(pAD), AggregateSupply: Math.round(pAS) });
    }
    return data;
  }, [moneySupplyGrowth, crudePrice]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive updates
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas 2D Loop for economic market pulse indicator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animFrame: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing grid lines
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw animated economic wave
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 20 + Math.sin((x + tick * 2) * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw glowing pulse dot
      const dotX = (tick * 2) % canvas.width;
      const dotY = 20 + Math.sin((dotX + tick * 2) * 0.05) * 8;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#10b981';
      ctx.fill();
      ctx.shadowBlur = 0;

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [phase]);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core economic mechanisms step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Test your economic theories freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your economic reasoning to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  const handleTestFoodChange = useCallback((food: 'milk' | 'turmeric' | 'chilli' | 'ghee') => {
    setTestFood(food);
    setReagentAdded(false);
    audioManager.play('tap');
  }, []);

  const handleApplyReagent = useCallback(() => {
    setReagentAdded(true);
    audioManager.play('sparkle');
    speechManager.speak('Chemical reagent added. Observe the reaction color.');
  }, []);

  const handleScannerSelect = useCallback((item: 'iron' | 'honey' | 'soap' | 'pds_grain') => {
    setSelectedScannerItem(item);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Economic Dynamics and Consumer Protection module.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! Well reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
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
          speechManager.speak('Let us examine the economic explanation together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        const initial = prev.length > 0 ? prev : (challenge.sortItems?.map((_, i) => i) || []);
        const arr = [...initial];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER / BANNER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-950/80 border border-emerald-600/40 rounded-2xl text-2xl sm:text-3xl">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ICSE Class 10 Commercial Studies / Economics
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-700"
              >
                {difficulty} TIER
              </motion.span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Global Mini Canvas Pulse */}
        <div className="w-48 h-10 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hidden sm:block">
          <canvas ref={canvasRef} width={192} height={40} className="w-full h-full" />
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-2">
              <span>🏛️</span>
              <span>MACROECONOMIC & CONSUMER CASE SCENARIO</span>
            </div>
            <h2 className="text-lg font-bold text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-3 bg-indigo-950/40 p-3 rounded-xl border border-indigo-900/50">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
              <span>💡</span>
              <span>PRE-FLIGHT DISCOVERY QUESTION (Test Your Economic Intuition)</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${option}`}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold text-slate-300 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-medium'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Principal repayment extinguishes debt liabilities (Capital), while interest is recurring debt servicing (Revenue).'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 shrink-0 w-full sm:w-auto"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Indicators */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400 font-mono">0{currentSlide + 1}.</span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300 mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 0: Union Budget Allocator (Includes SVG 1: Budget Balance Scale) ── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-300 font-medium">Revenue Expenditure (Operational):</span>
                        <span className="font-mono font-bold text-rose-400">₹{revenueExp} Lakh Cr</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={50}
                        value={revenueExp}
                        onChange={(e) => setRevenueExp(Number(e.target.value))}
                        aria-label="Set Revenue Expenditure in Lakh Crore"
                        className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="flex justify-between items-center text-sm pt-2">
                        <span className="text-slate-300 font-medium">Capital Capex (Highways, Rail, AIIMS):</span>
                        <span className="font-mono font-bold text-emerald-400">₹{capitalExp} Lakh Cr</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        value={capitalExp}
                        onChange={(e) => setCapitalExp(Number(e.target.value))}
                        aria-label="Set Capital Expenditure in Lakh Crore"
                        className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      {/* SVG DIAGRAM 1: Interactive Real-Time Fiscal Balance Scale */}
                      <div className="p-2 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col items-center">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Fiscal Fulcrum & Asset Growth Scale (Live SVG)
                        </span>
                        <svg viewBox="0 0 300 120" className="w-full h-28">
                          {/* Base and Fulcrum */}
                          <polygon points="150,85 135,115 165,115" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
                          <rect x="100" y="113" width="100" height="4" rx="2" fill="#334155" />
                          
                          {/* Dynamic Tilting Beam based on Capex vs Revenue ratio */}
                          {(() => {
                            const angle = Math.max(-14, Math.min(14, (capitalExp - revenueExp / 2) * 1.5));
                            return (
                              <g transform={`rotate(${angle}, 150, 85)`} className="transition-transform duration-300 ease-out">
                                <line x1="30" y1="85" x2="270" y2="85" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                                
                                {/* Left Pan: Revenue Expenditure */}
                                <line x1="45" y1="85" x2="45" y2="100" stroke="#f43f5e" strokeWidth="1.5" />
                                <rect x="15" y="100" width="60" height="15" rx="3" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
                                <text x="45" y="111" fill="#fecdd3" fontSize="8" textAnchor="middle" fontWeight="bold">
                                  Rev ₹{revenueExp}L
                                </text>

                                {/* Right Pan: Capital Capex */}
                                <line x1="255" y1="85" x2="255" y2="100" stroke="#10b981" strokeWidth="1.5" />
                                <rect x="225" y="100" width="60" height="15" rx="3" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                                <text x="255" y="111" fill="#a7f3d0" fontSize="8" textAnchor="middle" fontWeight="bold">
                                  Cap ₹{capitalExp}L
                                </text>
                              </g>
                            );
                          })()}
                        </svg>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>Total Outlay:</span>
                          <span className="font-bold text-white font-mono">₹{totalExp} Lakh Cr</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Capex Quality Share:</span>
                          <span className="font-bold text-emerald-400 font-mono">{capexShare}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Visual Budget Meter & Chart */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <h4 className="text-xs uppercase font-bold text-slate-400 mb-2">Budget Allocation Breakdown</h4>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[{ name: 'Budget', Revenue: revenueExp, Capital: capitalExp }]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" unit="L Cr" />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Bar dataKey="Revenue" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Capital" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-slate-400 italic text-center mt-2">
                        Higher Capex share accelerates long-term GDP growth and asset formation.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 1: AD-AS Inflation Dynamics (Includes SVG 2: AD-AS Macroeconomic Shift Diagram) ── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Predict Then Check Pattern */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800 space-y-3">
                      <div className="text-xs font-bold uppercase text-indigo-300 flex items-center gap-1.5">
                        <span>🔮</span> PREDICT-THEN-CHECK
                      </div>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(idx)}
                            aria-label={`Predict option ${idx + 1}`}
                            className="p-3 text-left text-xs bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/80 text-xs text-amber-300 flex items-center justify-between">
                      <span>{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPredictionVerified(true)}
                        aria-label="Mark prediction verified"
                        className="px-3 py-1 bg-amber-600 text-white rounded font-bold text-xs"
                      >
                        I Verified It ✓
                      </motion.button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Cost-Push Shock: Global Crude Oil ($/bbl)</span>
                          <span className="font-mono font-bold text-rose-400">${crudePrice}</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={140}
                          value={crudePrice}
                          onChange={(e) => setCrudePrice(Number(e.target.value))}
                          aria-label="Set crude oil price per barrel"
                          className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Demand-Pull Driver: Broad Money Growth (M3 %)</span>
                          <span className="font-mono font-bold text-emerald-400">{moneySupplyGrowth}%</span>
                        </div>
                        <input
                          type="range"
                          min={4}
                          max={22}
                          value={moneySupplyGrowth}
                          onChange={(e) => setMoneySupplyGrowth(Number(e.target.value))}
                          aria-label="Set money supply growth rate"
                          className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* SVG DIAGRAM 2: Live Real-Time Vector AD-AS Macro Graph */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">
                          Macro Vector Dynamics: Demand vs Supply (Live SVG)
                        </span>
                        <svg viewBox="0 0 260 140" className="w-full h-32">
                          <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
                            </marker>
                          </defs>
                          {/* Axes */}
                          <line x1="30" y1="120" x2="245" y2="120" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                          <line x1="30" y1="120" x2="30" y2="15" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
                          <text x="245" y="132" fill="#94a3b8" fontSize="9" textAnchor="end">Real Output (Y)</text>
                          <text x="25" y="12" fill="#94a3b8" fontSize="9" textAnchor="end">Price (P)</text>

                          {/* Dynamic AD Line (Shifted right by moneySupplyGrowth) */}
                          {(() => {
                            const adOffset = (moneySupplyGrowth - 10) * 3;
                            return (
                              <g className="transition-all duration-300">
                                <line
                                  x1={40 + adOffset}
                                  y1="25"
                                  x2={210 + adOffset}
                                  y2="115"
                                  stroke="#38bdf8"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                />
                                <text x={215 + adOffset} y="118" fill="#38bdf8" fontSize="9" fontWeight="bold">AD</text>
                              </g>
                            );
                          })()}

                          {/* Dynamic AS Line (Shifted left/up by crudePrice) */}
                          {(() => {
                            const asOffset = (crudePrice - 75) * 0.4;
                            return (
                              <g className="transition-all duration-300">
                                <line
                                  x1="45"
                                  y1={115 - asOffset}
                                  x2="215"
                                  y2={25 - asOffset}
                                  stroke="#f43f5e"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                />
                                <text x="220" y={28 - asOffset} fill="#f43f5e" fontSize="9" fontWeight="bold">AS</text>
                              </g>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>

                    {/* Real-time AD-AS Curves via Recharts */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs uppercase font-bold text-slate-400 mb-2">AD-AS Equilibrium Values</h4>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={adAsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="quantity" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Line type="monotone" dataKey="AggregateDemand" stroke="#38bdf8" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="AggregateSupply" stroke="#f43f5e" strokeWidth={2} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: Real Income & Distribution Matrix ── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Simulated Annual Inflation Rate (%):</span>
                          <span className="font-mono font-bold text-amber-400">{nominalInflation}%</span>
                        </div>
                        <input
                          type="range"
                          min={2}
                          max={16}
                          value={nominalInflation}
                          onChange={(e) => setNominalInflation(Number(e.target.value))}
                          aria-label="Set annual inflation rate"
                          className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Bank Fixed Deposit (6.5% Nominal):</span>
                          <span className={`font-mono font-bold ${Number(realFdRate) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            Real Rate: {realFdRate}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Fixed Pension (₹10,000/m after 3 yrs):</span>
                          <span className="font-mono font-bold text-rose-400">Real Val: ₹{realPensionValue}</span>
                        </div>
                      </div>
                    </div>

                    {/* Redistribution Outcome Table */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <h4 className="font-bold text-slate-300 uppercase mb-3">Winners vs Losers at {nominalInflation}% Inflation</h4>
                      <div className="space-y-2">
                        <div className="p-2.5 bg-rose-950/40 border border-rose-900/60 rounded-lg flex items-center justify-between">
                          <span>👵 Fixed Pensioners (Unindexed)</span>
                          <span className="text-rose-400 font-bold">LOSES (Real Income Erodes)</span>
                        </div>
                        <div className="p-2.5 bg-rose-950/40 border border-rose-900/60 rounded-lg flex items-center justify-between">
                          <span>🏦 Bank FD Savers (6.5% rate)</span>
                          <span className={`${Number(realFdRate) < 0 ? 'text-rose-400' : 'text-emerald-400'} font-bold`}>
                            {Number(realFdRate) < 0 ? 'LOSES (Negative Real Return)' : 'GAINS'}
                          </span>
                        </div>
                        <div className="p-2.5 bg-emerald-950/40 border border-emerald-900/60 rounded-lg flex items-center justify-between">
                          <span>🏠 Fixed-Rate Home Loan Borrowers</span>
                          <span className="text-emerald-400 font-bold">GAINS (Repays in Cheaper ₹)</span>
                        </div>
                        <div className="p-2.5 bg-emerald-950/40 border border-emerald-900/60 rounded-lg flex items-center justify-between">
                          <span>🏢 Real Estate & Tangible Asset Owners</span>
                          <span className="text-emerald-400 font-bold">GAINS (Asset Prices Appreciate)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: Food Adulteration Chemistry Test Bench (Includes SVG 3) ── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'milk', label: '🥛 Milk (Starch Test)' },
                      { id: 'turmeric', label: '🟡 Turmeric (Metanil Yellow)' },
                      { id: 'chilli', label: '🌶️ Red Chilli (Brick Powder)' },
                      { id: 'ghee', label: '🧈 Ghee (Vegetable Fat)' },
                    ].map(tab => (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTestFoodChange(tab.id as 'milk' | 'turmeric' | 'chilli' | 'ghee')}
                        aria-label={`Select food sample ${tab.label}`}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                          testFood === tab.id
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SVG DIAGRAM 3: Food Adulteration Chemistry Reagent Lab */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[200px] text-center">
                      <svg viewBox="0 0 200 150" className="w-48 h-36">
                        {/* Test Tube Stand & Tube */}
                        <rect x="85" y="20" width="30" height="90" rx="15" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                        {/* Fluid Inside */}
                        <rect
                          x="87"
                          y="50"
                          width="26"
                          height="58"
                          rx="13"
                          fill={
                            !reagentAdded
                              ? testFood === 'milk'
                                ? '#f8fafc'
                                : testFood === 'turmeric'
                                ? '#fbbf24'
                                : testFood === 'chilli'
                                ? '#ef4444'
                                : '#fef08a'
                              : testFood === 'milk'
                              ? '#1e1b4b' // Blue-black starch
                              : testFood === 'turmeric'
                              ? '#be185d' // Pink-violet metanil
                              : testFood === 'chilli'
                              ? '#7f1d1d' // Sediment
                              : '#ca8a04'
                          }
                          className="transition-colors duration-700"
                        />
                        {/* Dropper */}
                        {reagentAdded && (
                          <motion.g initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                            <path d="M100,5 L100,25" stroke="#38bdf8" strokeWidth="3" strokeDasharray="2,2" />
                          </motion.g>
                        )}
                      </svg>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleApplyReagent}
                        aria-label="Add reagent drops"
                        className="mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold"
                      >
                        🧪 Add Chemical Reagent (Iodine / HCl)
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center text-xs space-y-3">
                      <h4 className="font-bold text-white text-sm">
                        {testFood === 'milk' && 'Milk: Starch Detection (Iodine Test)'}
                        {testFood === 'turmeric' && 'Turmeric: Metanil Yellow (HCl Acid Test)'}
                        {testFood === 'chilli' && 'Red Chilli: Brick Powder & Dye Sedimentation'}
                        {testFood === 'ghee' && 'Ghee: Vegetable Fat & Hydrocarbon Purity'}
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        {!reagentAdded
                          ? 'Click the button on the left to add testing reagent into the suspect food sample.'
                          : testFood === 'milk'
                          ? 'Result: Turning BLUE-BLACK confirms added starch to mimic density after watering down milk.'
                          : testFood === 'turmeric'
                          ? 'Result: Intense PINK / MAGENTA with concentrated HCl confirms toxic carcinogenic METANIL YELLOW dye.'
                          : testFood === 'chilli'
                          ? 'Result: Heavy sediment sinking rapidly confirms artificial insoluble BRICK POWDER.'
                          : 'Result: Unnatural curdling confirms hydrogenated vegetable oil adulteration.'}
                      </p>
                      {reagentAdded && (
                        <div className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-lg text-rose-300">
                          <strong>Health Hazard:</strong>{' '}
                          {testFood === 'turmeric'
                            ? 'Metanil Yellow causes liver cancer and chronic organ toxicity.'
                            : testFood === 'milk'
                            ? 'Nutritional deficiency and gastrointestinal disruption.'
                            : 'Digestive tract damage and systemic inflammation.'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: Consumer Standards & Scanner (Includes SVG 4: Three-Tier COPRA 2019 Hierarchy) ── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 4: Three-Tier COPRA 2019 Redressal Architecture */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      COPRA 2019 Three-Tier Redressal Hierarchy (Statutory Structure SVG)
                    </span>
                    <svg viewBox="0 0 360 110" className="w-full max-w-lg h-28">
                      {/* Tier 3: National (Top) */}
                      <polygon points="180,10 130,40 230,40" fill="#4338ca" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="180" y="30" fill="#e0e7ff" fontSize="9" fontWeight="bold" textAnchor="middle">
                        NATIONAL (&gt; ₹10 Cr)
                      </text>

                      {/* Tier 2: State (Middle) */}
                      <polygon points="130,43 230,43 270,75 90,75" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="180" y="62" fill="#dbeafe" fontSize="9" fontWeight="bold" textAnchor="middle">
                        STATE (₹1 Cr – ₹10 Cr)
                      </text>

                      {/* Tier 1: District (Base) */}
                      <polygon points="90,78 270,78 310,105 50,105" fill="#0f766e" stroke="#14b8a6" strokeWidth="1.5" />
                      <text x="180" y="95" fill="#ccfbf1" fontSize="9" fontWeight="bold" textAnchor="middle">
                        DISTRICT COMMISSION (Up to ₹1 Cr)
                      </text>
                    </svg>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'iron', label: '🔌 Electric Iron (Manufactured)' },
                      { id: 'honey', label: '🍯 Pure Honey (Agricultural)' },
                      { id: 'soap', label: '🧼 Eco Laundry Soap (Environmental)' },
                      { id: 'pds_grain', label: '🌾 PDS Ration Rice (Distribution)' },
                    ].map(item => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleScannerSelect(item.id as 'iron' | 'honey' | 'soap' | 'pds_grain')}
                        aria-label={`Select scanner item ${item.label}`}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border ${
                          selectedScannerItem === item.id
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex justify-center">
                      {selectedScannerItem === 'iron' && (
                        <div className="p-4 bg-slate-900 rounded-2xl border-2 border-indigo-500 text-center w-48">
                          <div className="text-3xl font-black text-indigo-400 font-mono tracking-widest border-2 border-indigo-400 p-2 rounded">
                            ISI
                          </div>
                          <p className="text-xs font-bold text-white mt-2">BIS Standard IS 302</p>
                          <p className="text-[10px] text-slate-400">Electrical & Physical Safety</p>
                        </div>
                      )}
                      {selectedScannerItem === 'honey' && (
                        <div className="p-4 bg-slate-900 rounded-2xl border-2 border-amber-500 text-center w-48">
                          <div className="text-2xl font-black text-amber-400 tracking-wider border-2 border-amber-400 p-2 rounded">
                            AGMARK
                          </div>
                          <p className="text-xs font-bold text-white mt-2">Special / Standard Grade</p>
                          <p className="text-[10px] text-slate-400">Agricultural Produce 1937</p>
                        </div>
                      )}
                      {selectedScannerItem === 'soap' && (
                        <div className="p-4 bg-slate-900 rounded-2xl border-2 border-emerald-500 text-center w-48">
                          <div className="text-3xl font-black text-emerald-400 border-2 border-emerald-400 p-2 rounded">
                            🏺 ECO
                          </div>
                          <p className="text-xs font-bold text-white mt-2">ECOMARK Certification</p>
                          <p className="text-[10px] text-slate-400">MoEFCC & BIS Eco-Friendly</p>
                        </div>
                      )}
                      {selectedScannerItem === 'pds_grain' && (
                        <div className="p-4 bg-slate-900 rounded-2xl border-2 border-rose-500 text-center w-48">
                          <div className="text-xl font-black text-rose-400 border-2 border-rose-400 p-2 rounded">
                            PDS RATION
                          </div>
                          <p className="text-xs font-bold text-white mt-2">NFSA 2013 (₹3/kg)</p>
                          <p className="text-[10px] text-slate-400">Administrative Distribution</p>
                        </div>
                      )}
                    </div>

                    <div className="text-xs space-y-2 text-slate-300">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="font-bold text-emerald-400 uppercase">Protection Classification:</span>
                        <p className="mt-1">
                          {selectedScannerItem === 'pds_grain'
                            ? 'ADMINISTRATIVE MEASURE: Ensures affordable physical foodgrain access for 80+ crore people across 5.4 lakh Fair Price Shops.'
                            : 'TECHNICAL MEASURE: Establishes statutory quality, purity, and safety benchmarks that products must legally conform to.'}
                        </p>
                      </div>
                      <p className="text-slate-400 italic">
                        Remember: Technical marks certify quality; PDS ensures pricing access.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Exploration Lab"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next Exploration Lab"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Free Sandbox"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-emerald-400">Free Exploration Sandbox (Zero Grading Pressure)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Freely manipulate fiscal and monetary controls to test their impact on GDP growth and price stability.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Launch graded challenges"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/40 shrink-0"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-300">Fiscal Policy (Union Budget)</span>
              <div>
                <label className="text-[11px] text-slate-400 block">Revenue Exp: ₹{revenueExp} L Cr</label>
                <input
                  type="range"
                  min={15}
                  max={50}
                  value={revenueExp}
                  onChange={(e) => setRevenueExp(Number(e.target.value))}
                  aria-label="Sandbox revenue expenditure"
                  className="w-full accent-indigo-500 bg-slate-800"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block">Capital Capex: ₹{capitalExp} L Cr</label>
                <input
                  type="range"
                  min={5}
                  max={30}
                  value={capitalExp}
                  onChange={(e) => setCapitalExp(Number(e.target.value))}
                  aria-label="Sandbox capital expenditure"
                  className="w-full accent-emerald-500 bg-slate-800"
                />
              </div>
              <div className="p-2 bg-slate-950 rounded text-[11px] text-slate-300">
                Capex Share: <strong className="text-emerald-400">{capexShare}%</strong>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-300">Supply-Side Shocks</span>
              <div>
                <label className="text-[11px] text-slate-400 block">Crude Oil: ${crudePrice}/bbl</label>
                <input
                  type="range"
                  min={50}
                  max={140}
                  value={crudePrice}
                  onChange={(e) => setCrudePrice(Number(e.target.value))}
                  aria-label="Sandbox crude oil price"
                  className="w-full accent-rose-500 bg-slate-800"
                />
              </div>
              <div className="p-2 bg-slate-950 rounded text-[11px] text-slate-300">
                Supply State:{' '}
                <strong className={crudePrice > 100 ? 'text-rose-400' : 'text-emerald-400'}>
                  {crudePrice > 100 ? 'Cost-Push Pressure High' : 'Supply Normal'}
                </strong>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-300">Monetary Dynamics</span>
              <div>
                <label className="text-[11px] text-slate-400 block">M3 Growth: {moneySupplyGrowth}%</label>
                <input
                  type="range"
                  min={4}
                  max={22}
                  value={moneySupplyGrowth}
                  onChange={(e) => setMoneySupplyGrowth(Number(e.target.value))}
                  aria-label="Sandbox money growth"
                  className="w-full accent-amber-500 bg-slate-800"
                />
              </div>
              <div className="p-2 bg-slate-950 rounded text-[11px] text-slate-300">
                Demand State:{' '}
                <strong className={moneySupplyGrowth > 14 ? 'text-amber-400' : 'text-emerald-400'}>
                  {moneySupplyGrowth > 14 ? 'Demand-Pull Risk' : 'Money Supply Anchored'}
                </strong>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (Adaptive BKT Engine) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress and Difficulty Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700 uppercase">
                  {challenge.competencyLevel}
                </span>
                <span className="text-xs font-mono text-slate-400">Node: {challenge.nodeId}</span>
              </div>
            </div>

            <div className="w-full sm:w-48">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Mastery Progress</span>
                <span className="font-mono">
                  {Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Challenge Card */}
          <div
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed mb-4">
              {challenge.question}
            </h3>

            {/* TYPE 1: MCQ & Distinguish & Classify */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold text-slate-300 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: Drag & Drop Label */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels into their matching slots:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(slotId => (
                    <div
                      key={slotId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">
                        Target Slot: {slotId.replace('slot_', '').replace('target_', '').toUpperCase()}
                      </span>
                      <div className="mt-2 text-sm font-bold text-emerald-400">
                        {droppedLabels[slotId] ? `✓ ${droppedLabels[slotId]}` : 'Drop matching label here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit Drag and Drop Answers"
                  className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    aria-label="Enter numeric answer"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500 w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Check numeric answer"
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                  >
                    Check Calculation →
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 4: Drag & Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Drag items to arrange in correct chronological/logical sequence:</span>
                {(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems.map((_, i) => i)).map((itemIdx, pos) => (
                  <motion.div
                    key={itemIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(pos))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromPos = parseInt(draggedItem || '0', 10);
                      handleSortMove(fromPos, pos);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    aria-label={`Sort item ${pos + 1}`}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-3 cursor-grab text-xs sm:text-sm text-slate-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center text-xs">
                      {pos + 1}
                    </span>
                    <span>{challenge.sortItems![itemIdx]}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Sorted Order"
                  className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Order →
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-amber-950/40 border border-amber-800/80 rounded-xl space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <span>📖</span> STEP-BY-STEP ECONOMIC DISCLOSURE
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-amber-200 leading-relaxed">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal next explanation sentence"
                    className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to Next Question"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score →' : 'Next Question →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-3">
            <div className="text-4xl">🎓</div>
            <h2 className="text-2xl font-black text-white">Module Mastery Completed!</h2>
            
            {/* MOTIVATIONAL FEEDBACK (Personalised message based on errors) */}
            <div className="text-lg font-extrabold text-emerald-400 uppercase tracking-wider py-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </div>

            <p className="text-sm text-slate-300">
              Final Economic Competency Score:{' '}
              <span className="font-mono font-bold text-emerald-400 text-lg">
                {Math.max(0, 100 - errors * 5)}%
              </span>
            </p>
            <p className="text-xs text-slate-400">
              Assessed Mastery Level: <span className="text-indigo-400 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* Detailed Feedback Card */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {errors === 0
              ? '🌟 Flawless Mastery! You demonstrated complete command of Union budgeting, AD-AS inflation dynamics, and COPRA statutory protections.'
              : errors <= 3
              ? '👍 Commendable Performance! You have strong conceptual grasp of fiscal and monetary mechanisms. Review the minor points below to reach perfection.'
              : '🌱 Solid foundation built! Economics connects real-world policy with everyday life. Revisit the exploration labs to reinforce the subtle points.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/70 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnostic Profile
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-950 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400">✓ Economic Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-900/60 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-indigo-300 block">Spaced Repetition (SM-2 Algorithm)</span>
              <span>
                Based on your response accuracy, review is scheduled in{' '}
                <strong className="text-indigo-400">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>
                .
              </span>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-emerald-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Set Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C10_EconomicsPublicExpenditureRevenueSim;