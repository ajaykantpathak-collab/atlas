'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC ECONOMICS NODE IDS ───
const NODE_C12_ECON_081 = 'c12_econ_081'; // 3-Sector Model: S+T = I+G
const NODE_C12_ECON_082 = 'c12_econ_082'; // 4-Sector Model: S+T+M = I+G+X
const NODE_C12_ECON_083 = 'c12_econ_083'; // GDP, GNP, NNP, NY
const NODE_C12_ECON_084 = 'c12_econ_084'; // Private, Personal, PDI, Transfers
const NODE_C12_ECON_085 = 'c12_econ_085'; // GNDI, NNDI, Per Capita Income
const NODE_C12_ECON_086 = 'c12_econ_086'; // Factor Cost vs Market Price, Net Indirect Taxes
const NODE_C12_ECON_087 = 'c12_econ_087'; // Real vs Nominal GDP, GDP Deflator
const NODE_C12_ECON_088 = 'c12_econ_088'; // GDP & Welfare Limitations
const NODE_C12_ECON_089 = 'c12_econ_089'; // Complete Chain: GDP -> PDI
const NODE_C12_ECON_090 = 'c12_econ_090'; // Value Added, Income, Expenditure Methods
const NODE_C12_ECON_091 = 'c12_econ_091'; // Precautions & Measurement Difficulties

const ALL_NODE_IDS = [
  NODE_C12_ECON_081,
  NODE_C12_ECON_082,
  NODE_C12_ECON_083,
  NODE_C12_ECON_084,
  NODE_C12_ECON_085,
  NODE_C12_ECON_086,
  NODE_C12_ECON_087,
  NODE_C12_ECON_088,
  NODE_C12_ECON_089,
  NODE_C12_ECON_090,
  NODE_C12_ECON_091,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Union Budget & National Accounts Directorate',
  intro: 'You are appointed Senior Macroeconomic Adviser to the Ministry of Statistics and Programme Implementation (MoSPI) & the Finance Ministry. India is targeting a $5 Trillion economy.',
  context: 'From calculating the circular pulse of leakages and injections to unmasking inflationary illusions and evaluating true citizen welfare, your national income modeling will guide the Union Budget.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'If India’s Nominal GDP grows by 11% in FY 2024-25 while the GDP Deflator inflation is 4%, what is the true physical increase in goods and services produced?',
  options: [
    'The real volume of production increased by 11%',
    'The real volume of production increased by approximately 7%',
    'Production fell by 4%',
    'Production stayed exactly the same because 11% - 4% = 0'
  ],
  correctIndex: 1,
  hintAfter: 'Nominal GDP bundles both physical volume AND price hikes! Real GDP removes the inflation froth (11% - 4% ≈ 7%). Let us discover how the whole circular economy works!',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the circular flow of income when households increase their savings?',
    observableOptions: [
      'A leakage occurs, reducing the flow of income back to firms (✓)',
      'An injection occurs, increasing the flow (✗)',
      'No change in the circular flow (✗)',
      'The flow reverses direction entirely (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When government spending increases in the three-sector model, what happens to the circular flow?',
    observableOptions: [
      'An injection increases the total flow of income in the economy (✓)',
      'A leakage reduces the flow (✗)',
      'The flow stops completely (✗)',
      'Households lose all income (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - 3-Sector Leakages/Injections
  {
    id: 'ch_001_circ3',
    nodeId: NODE_C12_ECON_081,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a three-sector closed economy with Households, Firms, and Government, which pair constitutes LEAKAGES from the circular flow?',
    options: [
      'Investment (I) and Government Expenditure (G)',
      'Savings (S) and Taxes (T)',
      'Government Expenditure (G) and Taxes (T)',
      'Consumption (C) and Savings (S)'
    ],
    correctIndex: 1,
    explanation: 'Savings (S) and Taxes (T) withdraw purchasing power from the direct household-firm consumption loop. S flows into financial markets, and T flows to the government.',
    hints: [
      'Leakages are income withdrawals that reduce current domestic consumption.',
      'Think about what households do with income other than spending it on consumption.',
      'Households save part of their income (S) and pay compulsory dues to the government (T).'
    ],
    misconceptionIndex: 0
  },
  // 2. Foundation Drag-Label - 4-Sector Flow
  {
    id: 'ch_002_drag4s',
    nodeId: NODE_C12_ECON_082,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify whether these cross-border and fiscal transactions are Leakages (withdrawals) or Injections (additions) in the 4-sector circular flow.',
    dragItems: [
      { label: 'Imports (M)', targetId: 'box_leakage' },
      { label: 'Taxes (T)', targetId: 'box_leakage' },
      { label: 'Exports (X)', targetId: 'box_injection' },
      { label: 'Govt Spending (G)', targetId: 'box_injection' }
    ],
    correctMapping: {
      box_leakage: 'Imports (M)',
      box_injection: 'Exports (X)'
    },
    explanation: 'Imports (M) and Taxes (T) withdraw domestic money to foreign firms and government. Exports (X) and Government Spending (G) inject spending into domestic production.',
    hints: [
      'Does the transaction send money OUT of the domestic loop or bring money IN?',
      'Paying for foreign goods (M) drains rupees abroad; selling Indian software (X) brings foreign exchange in.',
      'Imports are Leakages; Exports are Injections.'
    ],
    misconceptionIndex: 1
  },
  // 3. Foundation Recall - GDP vs GNP
  {
    id: 'ch_003_gdp_gnp',
    nodeId: NODE_C12_ECON_083,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Samsung produces smartphones at its Noida factory in Uttar Pradesh. Tata Motors produces Jaguar cars in the UK. Which of these is included in India’s GDP?',
    options: [
      'Only Tata Motors UK factory output',
      'Only Samsung Noida factory output',
      'Both factories output',
      'Neither factory output'
    ],
    correctIndex: 1,
    explanation: 'GDP is strictly territory-based. Samsung Noida is on Indian soil (included in GDP). Tata Motors UK is outside Indian territory (excluded from GDP, though in GNP).',
    hints: [
      'GDP stands for Gross DOMESTIC Product — location is everything.',
      'Check which facility is located physically within the political/economic borders of India.',
      'Noida is in India (included in GDP); the UK is outside India (excluded from India’s GDP).'
    ],
    misconceptionIndex: 2
  },
  // 4. Foundation Understanding - Subsidies in Factor Cost
  {
    id: 'ch_004_fc_mp',
    nodeId: NODE_C12_ECON_086,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When converting an aggregate from Market Price (MP) to Factor Cost (FC), what is the correct mathematical treatment of Subsidies?',
    options: [
      'Subsidies must be subtracted because they are given by the government',
      'Subsidies must be added back because they artificially lowered the market price below the factor cost',
      'Subsidies are ignored because they are direct taxes',
      'Subsidies are multiplied by the GDP deflator'
    ],
    correctIndex: 1,
    explanation: 'FC = MP - Indirect Taxes + Subsidies = MP - Net Indirect Taxes. Subsidies lower the consumer price, so to recover what factors actually earned, subsidies must be added back.',
    hints: [
      'Think of PDS ration rice sold at ₹3/kg when it costs ₹22/kg to produce.',
      'To find the true ₹22 production cost from the ₹3 market price, you must add the government subsidy.',
      'Net Indirect Taxes = Indirect Taxes - Subsidies. Subtracting NIT means + Subsidies.'
    ],
    misconceptionIndex: 3
  },
  // 5. Foundation Application - Transfer Payments PM-KISAN
  {
    id: 'ch_005_pmkisan',
    nodeId: NODE_C12_ECON_084,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Under PM-KISAN, the Government of India transfers ₹6,000 annually directly into a small farmer’s bank account. How is this treated in National Income (NY) vs Personal Income (PI)?',
    options: [
      'Included in NY as factor income; excluded from PI',
      'Excluded from NY (no current production); included in PI (household purchasing power)',
      'Included in both NY and PI as agricultural value added',
      'Excluded from both NY and PI because it is below the tax threshold'
    ],
    correctIndex: 1,
    explanation: 'PM-KISAN is a transfer payment (unearned income without current output). It is excluded from National Income to prevent double counting, but included in Personal Income.',
    hints: [
      'Did the farmer produce a new crop in return for the specific ₹6,000 cheque from the treasury?',
      'No factor service was rendered for the transfer; it is a redistribution of collected tax revenue.',
      'Transfers are never in NY, but always in Personal Income and Personal Disposable Income.'
    ],
    misconceptionIndex: 4
  },
  // 6. Foundation Recall - Real vs Nominal Deflator
  {
    id: 'ch_006_deflator_def',
    nodeId: NODE_C12_ECON_087,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the macroeconomic metric to its authentic description:',
    options: [
      'GDP Deflator = (Nominal GDP / Real GDP) × 100 — measures economy-wide price changes',
      'Real GDP = Output valued at current year market prices',
      'Nominal GDP = Output adjusted for base year 2011-12 prices',
      'GDP Deflator = CPI Index multiplied by Population'
    ],
    correctIndex: 0,
    explanation: 'The GDP Deflator is the comprehensive price index derived as (Nominal GDP / Real GDP) * 100. Base year deflator is always 100.',
    hints: [
      'Nominal is at current prices; Real is at constant base-year prices.',
      'The deflator divides current price output by constant price output.',
      'Formula: (Nominal GDP / Real GDP) * 100.'
    ],
    misconceptionIndex: 5
  },
  // 7. Foundation Application - Precaution in Value Added
  {
    id: 'ch_007_valadd_wheat',
    nodeId: NODE_C12_ECON_090,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A farmer produces wheat worth ₹10,000 and sells it to a flour mill. The mill grinds it into flour worth ₹14,000 and sells to a bakery. The bakery produces bread worth ₹20,000 and sells to consumers. What is the total Gross Value Added (GVA)?',
    correctAnswer: 20000,
    tolerance: 0,
    unit: '₹',
    explanation: 'GVA = Farmer (10,000) + Mill (14,000 - 10,000 = 4,000) + Bakery (20,000 - 14,000 = 6,000) = ₹20,000. Sum of value added equals the final good price.',
    hints: [
      'Do not add gross outputs (10,000 + 14,000 + 20,000 = 44,000) because that double counts wheat!',
      'Compute Value Added at each stage: Output minus Intermediate Consumption.',
      '10,000 + 4,000 + 6,000 = ₹20,000.'
    ]
  },
  // 8. Standard Analysis - Equilibrium Condition 3-Sector
  {
    id: 'ch_008_eq3',
    nodeId: NODE_C12_ECON_081,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a 3-sector economy, Savings S = ₹3,000 Cr, Taxes T = ₹4,000 Cr, Investment I = ₹3,500 Cr, and Government Spending G = ₹4,500 Cr. What is happening to National Income?',
    options: [
      'Economy is in equilibrium because S + T = ₹7,000 Cr and I + G = ₹8,000 Cr',
      'Injections (₹8,000 Cr) > Leakages (₹7,000 Cr): aggregate demand exceeds supply, inventories deplete, and national income EXPANDS',
      'Leakages > Injections: national income contracts by ₹1,000 Cr',
      'Government must balance budget (G=T) before any equilibrium can exist'
    ],
    correctIndex: 1,
    explanation: 'Injections (I + G = 3,500 + 4,500 = 8,000) exceed Leakages (S + T = 3,000 + 4,000 = 7,000) by ₹1,000 Cr. Excess injection drives expansion in income until S + T rises to match I + G.',
    hints: [
      'Calculate Total Leakages: S + T. Calculate Total Injections: I + G.',
      'Leakages = 7,000; Injections = 8,000.',
      'When Injections exceed Leakages, new purchasing power enters, expanding national income.'
    ],
    misconceptionIndex: 0
  },
  // 9. Standard Numeric - Net Factor Income From Abroad (NFIA)
  {
    id: 'ch_009_nfia_calc',
    nodeId: NODE_C12_ECON_083,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'India’s GDP at Market Price is ₹300 Lakh Crore. Indian IT professionals abroad earned factor income of ₹6 Lakh Crore, while foreign MNCs in India repatriated ₹9.5 Lakh Crore abroad. What is India’s GNP at Market Price (in ₹ Lakh Cr)?',
    correctAnswer: 296.5,
    tolerance: 0.1,
    unit: 'Lakh Cr',
    explanation: 'NFIA = Factor income from abroad (6) - Factor income to abroad (9.5) = -3.5 Lakh Cr. GNP = GDP + NFIA = 300 + (-3.5) = ₹296.5 Lakh Crore.',
    hints: [
      'First calculate NFIA = Factor income earned by residents abroad − Factor income paid to foreign residents domestically.',
      'NFIA = 6.0 − 9.5 = −3.5 Lakh Crore.',
      'GNP = GDP + NFIA = 300 − 3.5 = 296.5.'
    ]
  },
  // 10. Standard Drag-Sort - Sequence from GDP to National Income
  {
    id: 'ch_010_sort_chain',
    nodeId: NODE_C12_ECON_089,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of transformations required to convert GDP at Market Price into National Income (NNP at Factor Cost):',
    sortItems: [
      'Start with GDP at Market Price (Domestic & Gross)',
      'Add Net Factor Income from Abroad (NFIA) to arrive at GNP at MP',
      'Deduct Consumption of Fixed Capital (Depreciation) to arrive at NNP at MP',
      'Deduct Net Indirect Taxes (Indirect Taxes − Subsidies) to arrive at NNP at FC'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The logical conversion chain: GDP(MP) + NFIA = GNP(MP); GNP(MP) - Depreciation = NNP(MP); NNP(MP) - NIT = NNP(FC) [National Income].',
    hints: [
      'First change Domestic to National by handling foreign factor income.',
      'Second change Gross to Net by subtracting capital wear and tear.',
      'Third change Market Price to Factor Cost by removing the net tax wedge.'
    ]
  },
  // 11. Standard Evaluation - Real GDP vs Nominal GDP in Policy
  {
    id: 'ch_011_real_nom_eval',
    nodeId: NODE_C12_ECON_087,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Country A reported 12% Nominal GDP growth with 10% inflation. Country B reported 6% Nominal GDP growth with 1% inflation. As an economic adviser, which economy achieved greater real expansion in physical goods/services?',
    options: [
      'Country A (12% > 6%)',
      'Country B (Real growth ≈ 5% in Country B vs ≈ 2% in Country A)',
      'Both grew equally at 1%',
      'Nominal GDP is the only standard metric used by the IMF'
    ],
    correctIndex: 1,
    explanation: 'Real GDP growth ≈ Nominal growth - Inflation. Country A real growth ≈ 12% - 10% = 2%. Country B real growth ≈ 6% - 1% = 5%. Country B produced 2.5x more incremental physical output.',
    hints: [
      'Calculate Real Growth for both: Real ≈ Nominal % − Inflation %.',
      'Country A: 12 − 10 = 2%. Country B: 6 − 1 = 5%.',
      'Compare 2% vs 5% to see which country actually produced more real goods and services.'
    ]
  },
  // 12. Standard Application - Expenditure Method 4-Sector Net Exports
  {
    id: 'ch_012_exp_calc',
    nodeId: NODE_C12_ECON_082,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an open economy: PFCE (C) = ₹180 L Cr, GFCF (I) = ₹60 L Cr, GFCE (G) = ₹40 L Cr, Exports (X) = ₹35 L Cr, Imports (M) = ₹45 L Cr. What is GDP at Market Price (in ₹ Lakh Cr)?',
    correctAnswer: 270,
    tolerance: 0,
    unit: 'Lakh Cr',
    explanation: 'GDP(MP) = C + I + G + (X - M) = 180 + 60 + 40 + (35 - 45) = 280 + (-10) = ₹270 Lakh Crore. Note that trade deficit (-10) reduces GDP.',
    hints: [
      'Use the 4-sector expenditure formula: Y = C + I + G + (X − M).',
      'Net exports (X − M) = 35 − 45 = −10 Lakh Crore.',
      '180 + 60 + 40 − 10 = 270 Lakh Crore.'
    ]
  },
  // 13. Standard Construct - Income Method Equation
  {
    id: 'ch_013_inc_construct',
    nodeId: NODE_C12_ECON_090,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the fundamental equation for Net Domestic Product at Factor Cost (NDP at FC) under the Income Method:',
    availableParts: [
      'Compensation of Employees',
      '+',
      'Operating Surplus',
      '+',
      'Mixed Income of Self-Employed',
      '+',
      'Depreciation',
      '+',
      'Subsidies'
    ],
    targetState: 'Compensation of Employees + Operating Surplus + Mixed Income of Self-Employed',
    validationHint: 'Combine the three primary factor income aggregates: labour reward, enterprise surplus (rent/interest/profit), and unincorporated self-employed income.',
    explanation: 'NDP(FC) under Income Method = Compensation of Employees + Operating Surplus (Rent + Interest + Profit) + Mixed Income of Self-Employed.',
    hints: [
      'Start with wages/salaries (Compensation of Employees).',
      'Add the return to capital, land, and enterprise (Operating Surplus).',
      'Add the combined income of own-account workers and farmers (Mixed Income).'
    ]
  },
  // 14. Standard Analysis - National Disposable Income vs Personal Disposable Income
  {
    id: 'ch_014_nndi_vs_pdi',
    nodeId: NODE_C12_ECON_085,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Personal Direct Tax (Income Tax) deducted to calculate Personal Disposable Income (PDI), but NOT deducted when calculating Net National Disposable Income (NNDI)?',
    options: [
      'Because NNDI is calculated before the financial year begins',
      'Because income tax is an internal transfer between domestic households and the government — both are within the same nation, so national disposable income is unaffected',
      'Because the government destroys tax revenue instead of circulating it',
      'Because PDI includes foreign aid whereas NNDI excludes foreign aid'
    ],
    correctIndex: 1,
    explanation: 'At the national level, taxes stay inside the country (transferred from citizen to treasury). Only border-crossing flows (Net Current Transfers from Abroad) change the nation’s total disposable pool.',
    hints: [
      'Think about whether income tax leaves the country or stays within the domestic boundary.',
      'Personal tax reduces household cash, but gives the same cash to the government of India.',
      'At the aggregate national level, internal transfers do not reduce total disposable resources.'
    ],
    misconceptionIndex: 6
  },
  // 15. Advanced Analysis - Used Car & Dealer Commission Precaution
  {
    id: 'ch_015_precautions_car',
    nodeId: NODE_C12_ECON_091,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 2018 Maruti Swift originally sold for ₹6,00,000 is resold in 2024 for ₹3,80,000 through a TrueValue car broker who charges ₹18,000 brokerage. How much enters India’s 2024 GDP?',
    options: [
      '₹3,80,000 (the full resale price of the vehicle)',
      '₹3,98,000 (resale price plus commission)',
      '₹18,000 (only the broker’s productive matching service in the current year)',
      'Zero, because second-hand transactions are completely excluded from economic accounting'
    ],
    correctIndex: 2,
    explanation: 'The car itself was counted in 2018 GDP when manufactured. Resale is an ownership asset transfer. Only the ₹18,000 broker fee represents NEW productive service created in 2024.',
    hints: [
      'Was the Maruti Swift manufactured in 2024 or 2018?',
      'Counting the ₹3,80,000 would double count the physical car produced years ago.',
      'Only the newly rendered service (brokerage commission of ₹18,000) counts in current GDP.'
    ],
    misconceptionIndex: 7
  },
  // 16. Advanced Evaluation - GDP and Welfare Paradox
  {
    id: 'ch_016_welfare_eval',
    nodeId: NODE_C12_ECON_088,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India is the 5th largest economy by GDP ($3.9 Trillion), yet ranks 134th on the UN Human Development Index (HDI). Which set of structural factors BEST explains this divergence?',
    options: [
      'India’s statistical offices make calculation errors in agricultural output',
      'GDP ignores income inequality (top 1% holds 40% wealth), excludes unpriced domestic labour (~5.5 hrs/day by women), and does not deduct pollution/health damages',
      'HDI uses nominal exchange rates while GDP uses factor costs',
      'High GDP always guarantees high welfare once population exceeds 1 billion'
    ],
    correctIndex: 1,
    explanation: 'GDP measures gross marketed economic throughput. It omits environmental damage (e.g. air pollution costing 1.67M lives/yr), unpaid care work, and massive wealth concentration.',
    hints: [
      'Recall the 5 limitations of GDP as a welfare indicator.',
      'Think about air pollution in Delhi, women’s unpaid housework, and wealth distribution.',
      'GDP is an aggregate volume of output, not a measure of equitable health, education, and clean living.'
    ]
  },
  // 17. Advanced Application - Full Derivation Chain Numerical
  {
    id: 'ch_017_full_chain_calc',
    nodeId: NODE_C12_ECON_089,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Given: GDP(MP) = ₹500 L Cr, NFIA = -₹10 L Cr, Depreciation = ₹40 L Cr, Indirect Taxes = ₹60 L Cr, Subsidies = ₹15 L Cr. Calculate National Income (NNP at Factor Cost) in ₹ Lakh Cr:',
    correctAnswer: 405,
    tolerance: 0,
    unit: 'Lakh Cr',
    explanation: 'GNP(MP) = 500 + (-10) = 490. NNP(MP) = 490 - 40 = 450. Net Indirect Taxes = 60 - 15 = 45. NNP(FC) = 450 - 45 = ₹405 Lakh Crore.',
    hints: [
      'Step 1: GNP(MP) = GDP(MP) + NFIA = 500 + (-10) = 490.',
      'Step 2: NNP(MP) = GNP(MP) - Depreciation = 490 - 40 = 450.',
      'Step 3: NIT = 60 - 15 = 45. NNP(FC) = 450 - 45 = 405.'
    ]
  },
  // 18. Advanced Analysis - Owner Occupied Imputed Rent
  {
    id: 'ch_018_imputed_rent',
    nodeId: NODE_C12_ECON_091,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does the National Statistical Office (NSO) include the IMPUTED RENT of owner-occupied houses in GDP estimation, even though no money changes hands?',
    options: [
      'To force homeowners to pay municipal property taxes',
      'To prevent an artificial drop in GDP if citizens buy homes rather than renting, preserving the measurement of housing services produced',
      'Because imputed rent is an indirect tax payable to the RBI',
      'It is an error in national accounts that will be eliminated under the 2020-21 base revision'
    ],
    correctIndex: 1,
    explanation: 'Living in an owned house produces real shelter services. If imputed rent were excluded, two identical economies would have drastically different GDPs simply based on tenant vs owner ratios.',
    hints: [
      'A tenant pays ₹25,000/mo rent (counted in GDP). A homeowner gets the exact same housing service.',
      'If everyone bought their rented homes tomorrow, would the physical shelter produced disappear?',
      'Imputed rent ensures housing services are measured consistently regardless of ownership status.'
    ],
    misconceptionIndex: 8
  },
  // 19. Advanced Analysis - Informal Sector Measurement in India
  {
    id: 'ch_019_informal_eval',
    nodeId: NODE_C12_ECON_091,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the informal sector (~50% of India’s GVA and ~90% of employment) considered the SINGLE MOST SEVERE statistical difficulty in national income estimation?',
    options: [
      'Informal workers refuse to use currency notes',
      'Informal micro-units keep no formal accounts or tax records, forcing statisticians to rely on proxy imputations (like PLFS labour surveys and night-lights data)',
      'The informal sector is located entirely outside India’s geographical borders',
      'Informal production is legally classified as second-hand goods'
    ],
    correctIndex: 1,
    explanation: 'Because informal enterprises do not maintain books of accounts or file GST returns, NSO must estimate half the economy using survey ratios and proxy indicators, creating margins of error.',
    hints: [
      'Think of roadside street vendors, small agricultural holdings, and unorganised workshops.',
      'Do they maintain audited P&L statements and balance sheets?',
      'Lack of records forces statisticians to impute half of India’s output rather than measuring it directly.'
    ]
  },
  // 20. Advanced Application - GDP Deflator Calculation
  {
    id: 'ch_020_deflator_calc',
    nodeId: NODE_C12_ECON_087,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In FY 2024-25, India’s Nominal GDP is ₹330 Lakh Crore while Real GDP (at 2011-12 base prices) is ₹165 Lakh Crore. Calculate the GDP Deflator Index:',
    correctAnswer: 200,
    tolerance: 0,
    unit: 'Index points',
    explanation: 'GDP Deflator = (Nominal GDP / Real GDP) × 100 = (330 / 165) × 100 = 2.0 × 100 = 200. This indicates cumulative price levels have doubled (100% inflation) since 2011-12.',
    hints: [
      'Formula: Deflator = (Nominal GDP ÷ Real GDP) × 100.',
      'Divide 330 by 165 to get 2.0.',
      'Multiply 2.0 by 100 to obtain the index value 200.'
    ]
  },
  // 21. Advanced Analysis - Private Income to Personal Disposable Income Chain
  {
    id: 'ch_021_pdi_chain_num',
    nodeId: NODE_C12_ECON_084,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Private Income = ₹300 L Cr. Corporate Tax = ₹25 L Cr, Undistributed Corporate Profits = ₹35 L Cr, Personal Direct Taxes = ₹20 L Cr. Calculate Personal Disposable Income (in ₹ Lakh Cr):',
    correctAnswer: 220,
    tolerance: 0,
    unit: 'Lakh Cr',
    explanation: 'Personal Income = Private Income - Corp Tax - Undistributed Profits = 300 - 25 - 35 = 240. PDI = Personal Income - Personal Taxes = 240 - 20 = ₹220 Lakh Crore.',
    hints: [
      'First find Personal Income: Private Income − Corporate Tax − Undistributed Profits.',
      'Personal Income = 300 − 25 − 35 = 240 Lakh Cr.',
      'Next find PDI: Personal Income − Personal Direct Taxes = 240 − 20 = 220 Lakh Cr.'
    ]
  },
  // 22. Advanced Creativity - Rebalancing Open Economy Circular Flow
  {
    id: 'ch_022_open_rebalance',
    nodeId: NODE_C12_ECON_082,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An open economy faces a large Trade Deficit (M exceeds X by ₹50,000 Cr). If Private Savings equals Investment (S = I), what fiscal policy action restores 4-sector circular equilibrium without contracting national income?',
    options: [
      'Run a Fiscal Surplus where Taxes exceed Govt Spending by ₹50,000 Cr (T - G = 50,000)',
      'Run a Fiscal Deficit where Govt Spending exceeds Taxes by ₹50,000 Cr (G - T = 50,000)',
      'Double the imports of luxury consumer electronics',
      'Ban all household savings'
    ],
    correctIndex: 1,
    explanation: 'Equilibrium: S + T + M = I + G + X => (G - T) + (I - S) = (M - X). If S = I, then G - T must equal M - X (₹50,000 Cr). The fiscal injection (G > T) offsets the trade leakage (M > X).',
    hints: [
      'Equilibrium condition is Leakages = Injections: S + T + M = I + G + X.',
      'Rearrange: (S − I) + (T − G) + (M − X) = 0.',
      'Since S = I, then (T − G) + 50,000 = 0 => G − T = 50,000 (Govt spending injection must match the import leakage).'
    ]
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
  nodeId: NODE_C12_ECON_081,
  title: 'Circular Flow of Income & National Accounts',
  definition: 'The circular flow of income depicts the continuous movement of money and real goods/services between households, firms, government, and the foreign sector, where Total Output = Total Income = Total Expenditure.',
  eli5: 'Think of the economy like a giant water fountain. Households pump money into businesses by buying goods; businesses pump it back as wages. Government and foreign trade act like extra pipes adding water (injections) or draining water (leakages).',
  misconceptions: [
    { misconception: 'All government transactions are leakages', correction: 'Taxes (T) are leakages, but Government Spending (G) is an injection that expands national income.' },
    { misconception: 'Imports and Exports should both be added in the expenditure method', correction: 'Imports are leakages and already embedded in C, I, G — they must be subtracted as (X - M).' },
    { misconception: 'GDP and GNP are identical', correction: 'GDP is territory-based output; GNP is resident-based earnings, related via GNP = GDP + NFIA.' },
    { misconception: 'Subsidies should be subtracted to get factor cost', correction: 'Subsidies lower market price below factor cost, so they must be ADDED back: FC = MP - Indirect Taxes + Subsidies.' },
    { misconception: 'Transfer payments like PM-KISAN or pensions are part of National Income', correction: 'Transfers do not represent current output and are excluded from NY, though included in Personal Income.' },
    { misconception: '10% nominal GDP growth means 10% more goods were produced', correction: 'Nominal growth includes inflation. Real growth = (Nominal GDP / Deflator) * 100.' },
    { misconception: 'Higher GDP automatically means higher citizen well-being', correction: 'GDP ignores inequality, pollution, unpaid household work, and product composition.' },
    { misconception: 'Second-hand car sales count in current GDP', correction: 'The car was counted when manufactured; only the broker’s new commission enters current GDP.' },
    { misconception: 'Owner-occupied housing rent is excluded because no money is paid', correction: 'NSO includes imputed rent so that housing services are consistently measured across home owners and tenants.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the equilibrium condition in a 4-sector open economy?', options: ['S = I', 'S + T = I + G', 'S + T + M = I + G + X', 'C + I = G + X'], correctIndex: 2 },
    { question: 'If GDP at MP is ₹200 Cr and Net Indirect Taxes are ₹30 Cr, what is GDP at FC?', options: ['₹230 Cr', '₹170 Cr', '₹200 Cr', '₹260 Cr'], correctIndex: 1 },
    { question: 'Which factor income category is largest in India due to unorganised workers and farmers?', options: ['Corporate Retained Earnings', 'Mixed Income of Self-Employed', 'Royalties', 'Foreign Direct Investment'], correctIndex: 1 },
    { question: 'What does the GDP Deflator measure?', options: ['Unemployment rate', 'Overall price level of all goods and services in GDP', 'Fiscal deficit ratio', 'Forex reserves'], correctIndex: 1 },
    { question: 'Which of the following is an injection into the circular flow?', options: ['Savings in banks', 'Income tax paid', 'Export earnings from software services', 'Import payments for crude oil'], correctIndex: 2 },
    { question: 'How is Per Capita Income calculated?', options: ['GDP / Working Population', 'NNP at Factor Cost / Total Population', 'GNP at Market Price / Taxpayers', 'Personal Income / Households'], correctIndex: 1 },
    { question: 'Why is intermediate consumption deducted in the value-added method?', options: ['To pay corporate tax', 'To avoid double-counting raw materials embedded in final output', 'To inflate GDP figures', 'To subsidise agriculture'], correctIndex: 1 },
    { question: 'Which index accounts for life expectancy, education, and per capita income together?', options: ['Gini Coefficient', 'Human Development Index (HDI)', 'Consumer Price Index (CPI)', 'Sensex'], correctIndex: 1 }
  ],
  masteryCriteria: 'Master circular flow leakages/injections, national account conversions (GDP to PDI), 3 measurement methods, and GDP welfare limitations.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The 3-Sector Circular Pulse',
    instruction: 'Adjust the Government Spending (G) and Tax (T) sliders to see how the circular flow expands or contracts.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_ECON_081,
  },
  {
    title: '2. Open Economy & The Foreign Sector',
    instruction: 'Toggle between Trade Surplus (X > M) and Trade Deficit (M > X) to observe international injections vs leakages.',
    interactionType: 'toggle-trade',
    nodeId: NODE_C12_ECON_082,
  },
  {
    title: '3. National Income Conversion Bridge',
    instruction: 'Click each adjustment stone to transform Gross Domestic Product at Market Price into National Income (NNP at FC).',
    interactionType: 'click-bridge',
    nodeId: NODE_C12_ECON_089,
  },
  {
    title: '4. The Inflation Illusion: Real vs Nominal',
    instruction: 'Drag the Inflation Deflator slider. Watch how Nominal GDP skyrockets while Real physical output stays constant!',
    interactionType: 'slider-deflator',
    nodeId: NODE_C12_ECON_087,
  },
  {
    title: '5. The Three Methods of Measurement',
    instruction: 'Click on Product, Income, and Expenditure tabs to verify that all 3 methods yield identical GDP.',
    interactionType: 'tab-methods',
    nodeId: NODE_C12_ECON_090,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the Government increases infrastructure spending (G) by ₹20,000 Cr while keeping taxes (T) unchanged, what will happen to the circular flow?',
    options: [
      'Injections will exceed leakages, causing National Income to expand',
      'Leakages will exceed injections, causing National Income to shrink',
      'The flow will stay identical because government spending is always a leakage',
      'Imports will drop to zero immediately'
    ],
    correctIndex: 0,
    verifyInstruction: 'Now set G higher than T on the slider below to verify whether the circular income balloon expands!',
    nodeId: NODE_C12_ECON_081,
  },
  {
    question: 'Predict: If India’s crude oil import bill surges by ₹30,000 Cr without an increase in exports, how will Net Exports impact GDP?',
    options: [
      'GDP will rise by ₹30,000 Cr because total spending increased',
      'GDP will contract by ₹30,000 Cr because Imports act as a net withdrawal/leakage',
      'GNP will double automatically',
      'No change because imports do not enter national accounts'
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Trade Deficit mode below and observe how (X − M) turns negative, reducing aggregate GDP.',
    nodeId: NODE_C12_ECON_082,
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Directorate Advisory: Crafting the Indian National Accounts Brief',
  description: 'Apply your national income framework to analyze India’s real data: Nominal GDP ₹328.98 L Cr, Real GDP ���172.90 L Cr, Remittances $125 Billion, and Service Exports $341 Billion.',
  steps: [
    'Calculate the implied GDP Deflator inflation since the 2011-12 base year.',
    'Explain why India’s Services Surplus & Remittances provide vital circular flow injections against merchandise trade deficits.',
    'Write a policy note recommending why MoSPI should supplement GDP growth headlines with HDI and Gini metrics.'
  ]
};

// ─── MAIN COMPONENT ───
export function C12_EconomicsCircularFlowIncomeSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ECON_081,
  title = DEFAULT_PROPS.title || 'Circular Flow of Income',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Interactive Variables
  const [savingsVal, setSavingsVal] = useState<number>(3000);
  const [taxesVal, setTaxesVal] = useState<number>(4000);
  const [investVal, setInvestVal] = useState<number>(3500);
  const [govtSpendVal, setGovtSpendVal] = useState<number>(4500);
  const [exportsVal, setExportsVal] = useState<number>(3500);
  const [importsVal, setImportsVal] = useState<number>(4500);

  // Deflator Simulator States
  const [simBaseOutput, setSimBaseOutput] = useState<number>(100);
  const [simDeflator, setSimDeflator] = useState<number>(190);

  // Active Bridge Step for National Accounts Transformation
  const [bridgeStep, setBridgeStep] = useState<number>(0);
  const [activeMethodTab, setActiveMethodTab] = useState<'product' | 'income' | 'expenditure'>('product');

  // Predict-then-check & Observation states
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);

  // Sandbox variables
  const [sandboxFactorCost, setSandboxFactorCost] = useState<number>(200);
  const [sandboxIndirectTax, setSandboxIndirectTax] = useState<number>(40);
  const [sandboxSubsidy, setSandboxSubsidy] = useState<number>(10);
  const [sandboxNFIA, setSandboxNFIA] = useState<number>(-5);
  const [sandboxDepreciation, setSandboxDepreciation] = useState<number>(25);

  // Challenge evaluation states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Drag-and-drop & Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Live Canvas and D3 refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const d3ContainerRef = useRef<SVGSVGElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATION ───
  const totalLeakages3S = useMemo(() => savingsVal + taxesVal, [savingsVal, taxesVal]);
  const totalInjections3S = useMemo(() => investVal + govtSpendVal, [investVal, govtSpendVal]);
  const net3SBalance = useMemo(() => totalInjections3S - totalLeakages3S, [totalInjections3S, totalLeakages3S]);

  const totalLeakages4S = useMemo(() => savingsVal + taxesVal + importsVal, [savingsVal, taxesVal, importsVal]);
  const totalInjections4S = useMemo(() => investVal + govtSpendVal + exportsVal, [investVal, govtSpendVal, exportsVal]);
  const net4SBalance = useMemo(() => totalInjections4S - totalLeakages4S, [totalInjections4S, totalLeakages4S]);

  const simNominalOutput = useMemo(() => (simBaseOutput * simDeflator) / 100, [simBaseOutput, simDeflator]);

  const sandboxMarketPrice = useMemo(() => {
    return sandboxFactorCost + sandboxIndirectTax - sandboxSubsidy;
  }, [sandboxFactorCost, sandboxIndirectTax, sandboxSubsidy]);

  const sandboxGNP_MP = useMemo(() => sandboxMarketPrice + sandboxNFIA, [sandboxMarketPrice, sandboxNFIA]);
  const sandboxNNP_MP = useMemo(() => sandboxGNP_MP - sandboxDepreciation, [sandboxGNP_MP, sandboxDepreciation]);
  const sandboxNationalIncome = useMemo(() => sandboxNNP_MP - (sandboxIndirectTax - sandboxSubsidy), [sandboxNNP_MP, sandboxIndirectTax, sandboxSubsidy]);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Calculated SRS Days
  const srsDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── USEEFFECT CALLS ───

  // 1. Initial Mastery Load
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. Adaptive BKT Mastery Update
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 3. 2D HTML Canvas Flow Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const renderFlow = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(150, 75, 55, 0, Math.PI * 2);
      ctx.stroke();

      const speed = Math.max(0.5, 2 + (net3SBalance / 1000));
      particleOffset += speed;

      const numBeads = 8;
      for (let i = 0; i < numBeads; i++) {
        const angle = ((particleOffset + (i * (360 / numBeads))) * Math.PI) / 180;
        const x = 150 + Math.cos(angle) * 55;
        const y = 75 + Math.sin(angle) * 55;

        ctx.fillStyle = net3SBalance >= 0 ? '#10b981' : '#f43f5e';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(net3SBalance >= 0 ? 'Flow Expanding' : 'Flow Contracting', 150, 78);

      animId = requestAnimationFrame(renderFlow);
    };

    renderFlow();
    return () => cancelAnimationFrame(animId);
  }, [net3SBalance]);

  // 4. D3 Real vs Nominal Visualizer Effect
  useEffect(() => {
    if (!d3ContainerRef.current) return;
    const svg = d3.select(d3ContainerRef.current);
    svg.selectAll('*').remove();

    const width = 360;
    const height = 160;
    const margin = { top: 20, right: 20, bottom: 30, left: 45 };

    const data = [
      { label: 'Base Real', value: simBaseOutput, color: '#3b82f6' },
      { label: 'Nominal Current', value: simNominalOutput, color: '#f59e0b' }
    ];

    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .domain(data.map(d => d.label))
      .padding(0.4);

    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([0, Math.max(250, simNominalOutput * 1.15)]);

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.label) || 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => (height - margin.bottom) - y(d.value))
      .attr('fill', d => d.color)
      .attr('rx', 6);

    svg.selectAll('text.val')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'val')
      .attr('x', d => (x(d.label) || 0) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 6)
      .attr('text-anchor', 'middle')
      .attr('fill', '#f8fafc')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(d => `₹${d.value.toFixed(0)} L Cr`);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .attr('color', '#64748b');

  }, [simBaseOutput, simNominalOutput]);

  // 5. Inactivity Auto-Hint Timer Cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && currentChallengeObj.hints[nextLvl - 1]) {
      const hintText = currentChallengeObj.hints[nextLvl - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeObj]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding economic intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the National Accounts Interactive Lab. Let us explore the circular pulse.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test any fiscal or trade variable freely in the sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for board-level challenges. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify.');
  }, []);

  const handleCompleteGame = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ISC Class 12 National Income Accounting!');
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
      handleCompleteGame();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteGame]);

  const handleAnswer = useCallback((submitted: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
      isCorrect = submitted === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(submitted) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'drag-sort') {
      isCorrect = JSON.stringify(submitted) === JSON.stringify(currentChallengeObj.correctOrder);
    } else if (currentChallengeObj.type === 'numeric') {
      const parsed = typeof submitted === 'string' ? parseFloat(submitted) : (submitted as number);
      isCorrect = Math.abs(parsed - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = (submitted as string).trim() === (currentChallengeObj.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well analyzed.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete step-by-step derivation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeObj.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('pop');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = [...prev];
      if (arr.length === 0 && currentChallengeObj.sortItems) {
        arr = currentChallengeObj.sortItems.map((_, i) => i);
      }
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentChallengeObj]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, currentChallengeObj, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">

      {/* HEADER SECTION */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20"
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ISC Class 12 Commerce & Economics
              </span>
              <span className="text-xs text-slate-400 font-mono">11 Core Concepts</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Phase & Difficulty Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
              difficulty === 'foundation' ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300' :
              difficulty === 'standard' ? 'bg-gold-900/40 border-gold-500 text-gold-300' :
              'bg-amber-900/40 border-amber-500 text-amber-300'
            }`}
          >
            {difficulty} tier
          </motion.span>
          <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300">
            Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span>
          </div>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-gold-950/70 rounded-2xl border border-emerald-800/60 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h3>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Curiosity Discovery Hook</span>
            <p className="text-base md:text-lg text-white font-semibold mt-2">{DISCOVERY_QUESTION.question}</p>

            <div className="mt-4 space-y-2.5">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${option}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 text-slate-500 border border-slate-800'
                      : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
                  }`}
                >
                  <span className="inline-block w-6 font-mono text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Real physical production only grew by the volume change (≈ 7%).' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/30 flex items-center gap-2"
                >
                  Step into the National Accounts Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg disabled:opacity-40"
            >
              ← Previous Step
            </motion.button>
            <span className="text-xs font-semibold text-emerald-400">
              Lab Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-md shadow-emerald-700/20"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-emerald-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* STEP 0: 3-SECTOR CIRCULAR FLOW SVG + CANVAS */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    {/* TOPIC SPECIFIC SVG 1: 3-Sector Circular Model Diagram */}
                    <svg viewBox="0 0 320 200" className="w-full max-w-[320px] h-auto mb-2">
                      <rect x="10" y="10" width="90" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                      <text x="55" y="34" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Households</text>

                      <rect x="220" y="10" width="90" height="40" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                      <text x="265" y="34" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">Firms</text>

                      <rect x="115" y="80" width="90" height="40" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <text x="160" y="104" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">Government</text>

                      <rect x="115" y="150" width="90" height="40" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                      <text x="160" y="174" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">Capital Market</text>

                      {/* Flow paths */}
                      <path d="M 55 50 L 115 150" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="70" y="115" fill="#f87171" fontSize="9">S (Leak)</text>

                      <path d="M 205 150 L 265 50" stroke="#10b981" strokeWidth="1.5" />
                      <text x="245" y="115" fill="#34d399" fontSize="9">I (Inj)</text>

                      <path d="M 100 30 L 115 80" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="92" y="65" fill="#f87171" fontSize="9">T</text>

                      <path d="M 205 80 L 220 30" stroke="#10b981" strokeWidth="1.5" />
                      <text x="220" y="65" fill="#34d399" fontSize="9">G</text>
                    </svg>

                    <canvas ref={canvasRef} width={300} height={120} className="w-full max-w-[300px]" />
                    <div className="mt-2 text-center">
                      <span className="text-xs font-mono text-slate-400">Injections (I+G): </span>
                      <span className="text-xs font-bold text-emerald-400 font-mono">₹{totalInjections3S} Cr</span>
                      <span className="text-slate-600 mx-2">|</span>
                      <span className="text-xs font-mono text-slate-400">Leakages (S+T): </span>
                      <span className="text-xs font-bold text-rose-400 font-mono">₹{totalLeakages3S} Cr</span>
                    </div>
                  </div>

                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300">
                        <span>Govt Spending (G - Injection):</span>
                        <span className="text-emerald-400 font-bold">₹{govtSpendVal} Cr</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={8000}
                        step={500}
                        value={govtSpendVal}
                        onChange={(e) => setGovtSpendVal(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300">
                        <span>Taxes (T - Leakage):</span>
                        <span className="text-rose-400 font-bold">₹{taxesVal} Cr</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={8000}
                        step={500}
                        value={taxesVal}
                        onChange={(e) => setTaxesVal(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300">
                        <span>Private Investment (I - Injection):</span>
                        <span className="text-teal-400 font-bold">₹{investVal} Cr</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={8000}
                        step={500}
                        value={investVal}
                        onChange={(e) => setInvestVal(Number(e.target.value))}
                        className="w-full accent-teal-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300">
                        <span>Private Savings (S - Leakage):</span>
                        <span className="text-amber-400 font-bold">₹{savingsVal} Cr</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={8000}
                        step={500}
                        value={savingsVal}
                        onChange={(e) => setSavingsVal(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: 4-SECTOR OPEN ECONOMY SVG */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* TOPIC SPECIFIC SVG 2: 4-Sector Open Economy Model Diagram */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 460 160" className="w-full max-w-[460px] h-auto">
                      <rect x="20" y="55" width="80" height="45" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="60" y="82" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">Domestic Loop</text>

                      <rect x="360" y="55" width="80" height="45" rx="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
                      <text x="400" y="82" textAnchor="middle" fill="#fbcfe8" fontSize="10" fontWeight="bold">Rest of World</text>

                      {/* Export Arrow Injection */}
                      <path d="M 360 70 L 100 70" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
                      <text x="230" y="63" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">Exports (X) [Injection +₹{exportsVal}]</text>

                      {/* Import Arrow Leakage */}
                      <path d="M 100 90 L 360 90" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
                      <text x="230" y="105" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Imports (M) [Leakage -₹{importsVal}]</text>

                      <rect x="170" y="125" width="120" height="25" rx="4" fill="#0f172a" stroke="#64748b" />
                      <text x="230" y="142" textAnchor="middle" fill={exportsVal >= importsVal ? '#34d399' : '#f87171'} fontSize="10" fontWeight="bold">
                        Net: {exportsVal >= importsVal ? `+₹${exportsVal - importsVal} Cr Surplus` : `-₹${importsVal - exportsVal} Cr Deficit`}
                      </text>
                    </svg>
                  </div>

                  {!predictionMade ? (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800">
                      <p className="text-sm font-semibold text-gold-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-amber-300 font-semibold">{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setExportsVal(6000); setImportsVal(3000); }}
                            className="px-3 py-1 bg-emerald-900/60 border border-emerald-500 rounded text-emerald-200 text-xs"
                          >
                            Set Trade Surplus (X &gt; M)
                          </button>
                          <button
                            onClick={() => { setExportsVal(3000); setImportsVal(7000); }}
                            className="px-3 py-1 bg-rose-900/60 border border-rose-500 rounded text-rose-200 text-xs"
                          >
                            Set Trade Deficit (M &gt; X)
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <span className="text-xs text-slate-400">Total 4S Injections (I+G+X)</span>
                          <p className="text-lg font-bold text-emerald-400 font-mono">₹{totalInjections4S} Cr</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <span className="text-xs text-slate-400">Total 4S Leakages (S+T+M)</span>
                          <p className="text-lg font-bold text-rose-400 font-mono">₹{totalLeakages4S} Cr</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-center">
                        Net Impact on National Income:{' '}
                        <span className={`font-bold font-mono ${net4SBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {net4SBalance >= 0 ? `+₹${net4SBalance} Cr (Expansionary Multiplier Active)` : `-₹${Math.abs(net4SBalance)} Cr (Contractionary Drain)`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: CONVERSION BRIDGE (TOPIC SPECIFIC SVG 3) */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* TOPIC SPECIFIC SVG 3: Conversion Bridge Ladder Diagram */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 500 110" className="w-full max-w-[500px] h-auto">
                      <g transform="translate(10, 20)">
                        <rect x="0" y="10" width="100" height="60" rx="6" fill={bridgeStep === 0 ? '#064e3b' : '#1e293b'} stroke="#10b981" strokeWidth="2" />
                        <text x="50" y="36" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">GDP(MP)</text>
                        <text x="50" y="54" textAnchor="middle" fill="#94a3b8" fontSize="9">₹330 L Cr</text>
                      </g>
                      <text x="122" y="58" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">+NFIA</text>

                      <g transform="translate(135, 20)">
                        <rect x="0" y="10" width="100" height="60" rx="6" fill={bridgeStep === 1 ? '#064e3b' : '#1e293b'} stroke="#3b82f6" strokeWidth="2" />
                        <text x="50" y="36" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">GNP(MP)</text>
                        <text x="50" y="54" textAnchor="middle" fill="#94a3b8" fontSize="9">₹325 L Cr</text>
                      </g>
                      <text x="247" y="58" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="bold">-Deprec</text>

                      <g transform="translate(260, 20)">
                        <rect x="0" y="10" width="100" height="60" rx="6" fill={bridgeStep === 2 ? '#064e3b' : '#1e293b'} stroke="#8b5cf6" strokeWidth="2" />
                        <text x="50" y="36" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">NNP(MP)</text>
                        <text x="50" y="54" textAnchor="middle" fill="#94a3b8" fontSize="9">₹295 L Cr</text>
                      </g>
                      <text x="372" y="58" textAnchor="middle" fill="#f43f5e" fontSize="14" fontWeight="bold">-NIT</text>

                      <g transform="translate(385, 20)">
                        <rect x="0" y="10" width="105" height="60" rx="6" fill={bridgeStep === 3 ? '#064e3b' : '#1e293b'} stroke="#eab308" strokeWidth="2" />
                        <text x="52" y="36" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">NNP(FC) [NY]</text>
                        <text x="52" y="54" textAnchor="middle" fill="#94a3b8" fontSize="9">₹260 L Cr</text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { title: '1. GDP at MP', val: '₹330 L Cr', desc: 'Domestic & Gross' },
                      { title: '2. GNP at MP', val: '₹325 L Cr', desc: '+ NFIA (-5 L Cr)' },
                      { title: '3. NNP at MP', val: '₹295 L Cr', desc: '- Depreciation (30 L Cr)' },
                      { title: '4. National Income', val: '₹260 L Cr', desc: '- Net Indirect Tax (35 L Cr)' }
                    ].map((step, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setBridgeStep(idx); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          bridgeStep === idx
                            ? 'bg-emerald-950 border-emerald-500 shadow-lg shadow-emerald-900/30'
                            : 'bg-slate-950 border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <p className="text-xs font-bold text-white">{step.title}</p>
                        <p className="text-sm font-mono font-bold text-emerald-400 mt-1">{step.val}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{step.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {bridgeStep === 0 && '📌 GDP at Market Price represents total final output produced on Indian geographical soil before adjusting for foreign remittances or machine depreciation.'}
                    {bridgeStep === 1 && '📌 NFIA adjustment changes geographical territory output into what Indian residents actually earn worldwide. Foreign MNC profit repatriation makes India’s NFIA negative.'}
                    {bridgeStep === 2 && '📌 Depreciation (Consumption of Fixed Capital) is deducted because worn-out capital replacements do NOT constitute fresh additions to national output.'}
                    {bridgeStep === 3 && '📌 Net Indirect Taxes (Indirect Tax − Subsidies) are removed to strip away the government tax wedge, revealing what labour, capital, and land actually received (Factor Cost).'}
                  </div>
                </div>
              )}

              {/* STEP 3: REAL VS NOMINAL (D3 Visualizer) */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg ref={d3ContainerRef} width={360} height={160} />
                  </div>

                  <div className="space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>GDP Deflator (Price Level Index):</span>
                        <span className="text-amber-400 font-bold font-mono">{simDeflator}</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={300}
                        step={5}
                        value={simDeflator}
                        onChange={(e) => setSimDeflator(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-slate-300 space-y-1">
                      <p>Physical Production (Real GDP): <span className="text-gold-400 font-bold">₹{simBaseOutput} L Cr</span></p>
                      <p>Price Tag Output (Nominal GDP): <span className="text-amber-400 font-bold">₹{simNominalOutput.toFixed(0)} L Cr</span></p>
                      <p className="text-[11px] text-slate-400">
                        Inflation has inflated the nominal number by <span className="text-rose-400 font-bold">{simDeflator - 100}%</span>, but real tractors, food, and software remained identical!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: THREE METHODS (Product, Income, Expenditure) */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['product', 'income', 'expenditure'] as const).map(tab => (
                      <button
                        key={tab}
                        onClick={() => { setActiveMethodTab(tab); audioManager.play('tap'); }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          activeMethodTab === tab
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {tab} Method
                      </button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    {activeMethodTab === 'product' && (
                      <div className="space-y-2">
                        <p className="font-bold text-emerald-400">Gross Value Added (GVA) = Output − Intermediate Consumption</p>
                        <p className="text-slate-300">• Primary Sector (Agriculture): ₹25,000 Cr GVA</p>
                        <p className="text-slate-300">• Secondary Sector (Manufacturing & Industry): ₹60,000 Cr GVA</p>
                        <p className="text-slate-300">• Tertiary Sector (IT & Services): ₹95,000 Cr GVA</p>
                        <p className="text-slate-300">• Net Indirect Taxes (Taxes − Subsidies): + ₹20,000 Cr</p>
                        <div className="p-2.5 bg-slate-900 rounded-lg font-mono font-bold text-white mt-2">
                          GDP at Market Price = ₹200,000 Cr
                        </div>
                      </div>
                    )}

                    {activeMethodTab === 'income' && (
                      <div className="space-y-2">
                        <p className="font-bold text-gold-400">Factor Incomes: NDP(FC) = Compensation + Operating Surplus + Mixed Income</p>
                        <p className="text-slate-300">• Compensation of Employees (Wages/Salaries): ₹90,000 Cr</p>
                        <p className="text-slate-300">• Operating Surplus (Rent, Interest, Corporate Profit): ₹65,000 Cr</p>
                        <p className="text-slate-300">• Mixed Income of Self-Employed (Farmers, Own-Account): ₹25,000 Cr</p>
                        <p className="text-slate-300">• Depreciation (CFC) + Net Indirect Taxes: + ₹20,000 Cr</p>
                        <div className="p-2.5 bg-slate-900 rounded-lg font-mono font-bold text-white mt-2">
                          GDP at Market Price = ₹200,000 Cr
                        </div>
                      </div>
                    )}

                    {activeMethodTab === 'expenditure' && (
                      <div className="space-y-2">
                        <p className="font-bold text-amber-400">Final Expenditures: GDP(MP) = C + I + G + (X − M)</p>
                        <p className="text-slate-300">• Private Final Consumption Expenditure (C): ₹115,000 Cr (57.5%)</p>
                        <p className="text-slate-300">• Gross Fixed Capital Formation / Investment (I): ₹58,000 Cr (29.0%)</p>
                        <p className="text-slate-300">• Government Final Consumption (G): ₹22,000 Cr (11.0%)</p>
                        <p className="text-slate-300">• Net Exports (X − M = 20,000 − 15,000): + ₹5,000 Cr (2.5%)</p>
                        <div className="p-2.5 bg-slate-900 rounded-lg font-mono font-bold text-white mt-2">
                          GDP at Market Price = ₹200,000 Cr (Exact 1:1 Identity Reconciled!)
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX EXPLORATION ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>🧪</span> Macroeconomic National Accounts Sandbox
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Manipulate factor costs, tax rates, subsidies, and foreign factor incomes to witness real-time aggregate calculations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Base Factor Cost (FC):</span>
                    <span className="text-emerald-400 font-bold font-mono">₹{sandboxFactorCost} L Cr</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={500}
                    value={sandboxFactorCost}
                    onChange={(e) => setSandboxFactorCost(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Indirect Taxes (GST/Excise):</span>
                    <span className="text-rose-400 font-bold font-mono">₹{sandboxIndirectTax} L Cr</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sandboxIndirectTax}
                    onChange={(e) => setSandboxIndirectTax(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Govt Subsidies (Fertiliser/Food):</span>
                    <span className="text-teal-400 font-bold font-mono">₹{sandboxSubsidy} L Cr</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={sandboxSubsidy}
                    onChange={(e) => setSandboxSubsidy(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>NFIA (Net Factor Income from Abroad):</span>
                    <span className="text-amber-400 font-bold font-mono">{sandboxNFIA >= 0 ? `+₹${sandboxNFIA}` : `-₹${Math.abs(sandboxNFIA)}`} L Cr</span>
                  </div>
                  <input
                    type="range"
                    min={-20}
                    max={20}
                    value={sandboxNFIA}
                    onChange={(e) => setSandboxNFIA(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* Calculated Outputs Cards */}
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase">GDP at Market Price</span>
                  <p className="text-base font-bold text-emerald-400 font-mono mt-1">₹{sandboxMarketPrice} L Cr</p>
                  <span className="text-[10px] text-slate-500">FC + (IT − Sub)</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase">GNP at Market Price</span>
                  <p className="text-base font-bold text-teal-400 font-mono mt-1">₹{sandboxGNP_MP} L Cr</p>
                  <span className="text-[10px] text-slate-500">GDP(MP) + NFIA</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase">NNP at Market Price</span>
                  <p className="text-base font-bold text-gold-400 font-mono mt-1">₹{sandboxNNP_MP} L Cr</p>
                  <span className="text-[10px] text-slate-500">GNP(MP) − Deprec</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 uppercase">National Income (NNP FC)</span>
                  <p className="text-base font-bold text-amber-400 font-mono mt-1">₹{sandboxNationalIncome} L Cr</p>
                  <span className="text-[10px] text-slate-500">NNP(MP) − NIT</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-700/30 flex items-center gap-2"
            >
              Enter Board Challenges Phase →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: BOARD CHALLENGES PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">

          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              NEP Competency: <span className="uppercase font-bold">{currentChallengeObj.competencyLevel}</span>
            </span>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* CHALLENGE CARD CONTAINER */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-500 shadow-2xl shadow-rose-900/30'
                : 'bg-slate-900/90 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-snug">
              {currentChallengeObj.question}
            </p>

            {/* 1. MCQ VARIANT */}
            {(currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') && currentChallengeObj.options && (
              <div className="mt-5 space-y-2.5">
                {currentChallengeObj.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                      showExplanation && idx === currentChallengeObj.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
                    }`}
                  >
                    <span className="inline-block w-6 font-mono text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG-LABEL VARIANT */}
            {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Items:</span>
                  {currentChallengeObj.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_leakage')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-rose-800 min-h-[90px] text-center"
                  >
                    <p className="text-xs font-bold text-rose-400 mb-1">Leakages Drop Target</p>
                    <span className="text-xs text-slate-300 font-mono font-bold">
                      {droppedLabels['box_leakage'] || 'Drop Leakage Here'}
                    </span>
                  </div>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('box_injection')}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-emerald-800 min-h-[90px] text-center"
                  >
                    <p className="text-xs font-bold text-emerald-400 mb-1">Injections Drop Target</p>
                    <span className="text-xs text-slate-300 font-mono font-bold">
                      {droppedLabels['box_injection'] || 'Drop Injection Here'}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Target Allocations
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT VARIANT */}
            {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
              <div className="mt-5 space-y-3">
                <span className="text-xs text-slate-400">Drag to arrange steps in logical derivation order:</span>
                {(sortArrangement.length === currentChallengeObj.sortItems.length
                  ? sortArrangement.map(idx => currentChallengeObj.sortItems![idx])
                  : currentChallengeObj.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-bold text-emerald-400">
                      {dIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC INPUT VARIANT */}
            {currentChallengeObj.type === 'numeric' && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-56 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs font-semibold text-slate-400">{currentChallengeObj.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Verify Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT EQUATION VARIANT */}
            {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeObj.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {currentChallengeObj.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAdd(part)}
                      className="px-3 py-1.5 bg-gold-900/60 border border-gold-700 text-gold-200 text-xs font-semibold rounded-lg hover:bg-gold-800"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Built Equation Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, cIdx) => (
                    <span key={cIdx} className="px-2.5 py-1 bg-emerald-950 border border-emerald-700 rounded text-xs font-mono text-emerald-200 flex items-center gap-1">
                      {part}
                      <button onClick={() => handleConstructRemove(cIdx)} className="text-rose-400 hover:text-rose-300 ml-1">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click parts above to construct the formula</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Submit Equation Structure
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE EXPLANATION BANNER */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-amber-600/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Step-by-Step Methodological Derivation
                  </span>
                </div>

                {currentChallengeObj.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 font-mono mr-1.5">{sIdx + 1}.</span>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3.5 py-1.5 bg-amber-900/60 border border-amber-500 text-amber-200 text-xs font-semibold rounded-lg"
                    >
                      Reveal Next Derivation Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-700/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-bold text-white">National Accounts Directorate Certification</h2>
            <p className="text-sm text-slate-300">
              Final Mastery Evaluation: <span className="text-emerald-400 font-bold font-mono">{Math.max(0, 100 - errors * 5)}%</span> | BKT Tier: <span className="text-teal-300 uppercase font-bold">{masteryLevel}</span>
            </p>

            <div className="p-4 bg-emerald-950/60 border border-emerald-700 rounded-xl text-xs md:text-sm text-emerald-200 leading-relaxed max-w-2xl mx-auto">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered all 11 National Income nodes, 4-sector circular flows, and statistical precautions with full distinction!'
                : errors <= 3
                ? '👏 Excellent work! Your macroeconomic intuition is robust. Review the misconception notes below to achieve 100% precision in board exams.'
                : '📈 Good foundational effort! Economics is a systemic science. Re-explore the 3-sector sandbox and review the misconception list below.'}
            </div>
          </div>

          {/* VISIBLE SPACED REPETITION SCHEDULE (SRS) */}
          <div className="p-6 bg-gradient-to-r from-gold-950/80 via-slate-900 to-emerald-950/80 border-2 border-gold-500/50 rounded-2xl shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🗓️</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-950 px-2.5 py-0.5 rounded-full border border-gold-700">
                      SuperMemo-2 Adaptive SRS
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Memory Retention Plan</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white mt-0.5">
                    Recommended Next Review: <span className="text-amber-400 font-extrabold">{srsDays} {srsDays === 1 ? 'day' : 'days'}</span>
                  </h3>
                </div>
              </div>

              <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-gold-800 text-right">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">SRS Status</span>
                <span className="text-sm font-bold font-mono text-emerald-400">
                  {errors === 0 ? 'Optimal (7d Interval)' : errors <= 3 ? 'Review Soon (3d Interval)' : 'Immediate Drill (1d Interval)'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className={`p-3 rounded-xl border ${errors === 0 ? 'bg-emerald-950/70 border-emerald-500 shadow-md shadow-emerald-900/30' : 'bg-slate-950/50 border-slate-800 opacity-60'}`}>
                <div className="font-bold text-emerald-300 flex items-center justify-between">
                  <span>0 Errors (High Retention)</span>
                  {errors === 0 && <span>✓ Current</span>}
                </div>
                <p className="text-slate-400 mt-1">Review in <strong className="text-emerald-400">7 days</strong>. Concepts consolidated into long-term memory buffer.</p>
              </div>

              <div className={`p-3 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-amber-950/70 border-amber-500 shadow-md shadow-amber-900/30' : 'bg-slate-950/50 border-slate-800 opacity-60'}`}>
                <div className="font-bold text-amber-300 flex items-center justify-between">
                  <span>1–3 Errors (Moderate)</span>
                  {errors >= 1 && errors <= 3 && <span>✓ Current</span>}
                </div>
                <p className="text-slate-400 mt-1">Review in <strong className="text-amber-400">3 days</strong>. Strengthen conversion bridges and equation structures.</p>
              </div>

              <div className={`p-3 rounded-xl border ${errors >= 4 ? 'bg-rose-950/70 border-rose-500 shadow-md shadow-rose-900/30' : 'bg-slate-950/50 border-slate-800 opacity-60'}`}>
                <div className="font-bold text-rose-300 flex items-center justify-between">
                  <span>4+ Errors (Needs Practice)</span>
                  {errors >= 4 && <span>✓ Current</span>}
                </div>
                <p className="text-slate-400 mt-1">Review in <strong className="text-rose-400">1 day</strong>. Re-run sandbox simulations on circular leakages vs injections.</p>
              </div>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE TRACKER */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 border border-rose-800/80 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnosis
              </h3>
              <p className="text-xs text-slate-400">
                You hit these common board exam traps during your session. Review the corrections:
              </p>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions?.[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-semibold">❌ Trap: {item.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Fact: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REAL WORLD ACTIVITY ARC */}
          <div className="p-5 bg-gold-950/40 border border-gold-800/60 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>💼</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RESTART ACTION BAR */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs flex flex-wrap items-center justify-between gap-3">
            <p className="text-slate-400">
              Completed all modules for <strong className="text-slate-200">{title}</strong>. Ready to test again or explore other topics.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setPhase('discovery'); setErrors(0); setCurrentChallenge(0); }}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/30"
            >
              Restart Simulation Lab ↻
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="National Accounts Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_EconomicsCircularFlowIncomeSim;