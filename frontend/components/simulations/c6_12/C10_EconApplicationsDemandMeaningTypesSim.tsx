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

// ─── NODE IDS (MANDATORY STRING LITERALS FOR VERIFICATION) ───
const NODE_C10_ECONAPP_001 = 'c10_econapp_001'; // Demand — Meaning and Types (Joint, Derived, Composite)
const NODE_C10_ECONAPP_002 = 'c10_econapp_002'; // Law of Demand — Schedule and Curve (Individual and Market)
const NODE_C10_ECONAPP_003 = 'c10_econapp_003'; // Movement and Shift of the Demand Curve
const NODE_C10_ECONAPP_004 = 'c10_econapp_004'; // Determinants of Demand
const NODE_C10_ECONAPP_005 = 'c10_econapp_005'; // Exceptions to the Law of Demand
const NODE_C10_ECONAPP_006 = 'c10_econapp_006'; // Supply — Meaning and Distinction from Stock
const NODE_C10_ECONAPP_007 = 'c10_econapp_007'; // Law of Supply — Supply Schedule and Curve
const NODE_C10_ECONAPP_008 = 'c10_econapp_008'; // Movement and Shift of the Supply Curve
const NODE_C10_ECONAPP_009 = 'c10_econapp_009'; // Determinants of Supply
const NODE_C10_ECONAPP_010 = 'c10_econapp_010'; // Elasticity of Demand — Meaning, Types, Percentage Method, and Factors

const ALL_NODE_IDS = [
  NODE_C10_ECONAPP_001,
  NODE_C10_ECONAPP_002,
  NODE_C10_ECONAPP_003,
  NODE_C10_ECONAPP_004,
  NODE_C10_ECONAPP_005,
  NODE_C10_ECONAPP_006,
  NODE_C10_ECONAPP_007,
  NODE_C10_ECONAPP_008,
  NODE_C10_ECONAPP_009,
  NODE_C10_ECONAPP_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Market Simulator: From Mandis to Megacorps',
  intro:
    'Step into the shoes of Chief Economic Advisor to the Ministry of Consumer Affairs and Commerce. From managing the Lasalgaon onion price volatility and Reliance Jio pricing strategies to navigating wheat buffer stocks with FCI and evaluating GST tax bands, Indian markets depend on your understanding of Demand and Supply.',
  context:
    'You will test market interactions in real time, observe the subtle differences between price-induced movements and structural shifts, measure consumer elasticity, and solve high-stakes economic challenges.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'In Lasalgaon Mandi (Maharashtra), unseasonal rains destroy 40% of the onion crop. Simultaneously, Diwali approaches, increasing household feast cooking. What will happen to the equilibrium price and quantity of onions in Indian cities?',
  options: [
    'Price will certainly skyrocket; quantity change depends on whether supply shock or festive demand is stronger.',
    'Price will drop because consumers cannot afford costlier vegetables.',
    'Both price and quantity will decrease because supply collapsed.',
    'Price remains unchanged because the government automatically caps agricultural commodities.',
  ],
  correctIndex: 0,
  hintAfter:
    'Supply shifts left (destruction) and demand shifts right (Diwali). Both forces push price UP, while their effects on total quantity work in opposite directions!',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Condition Test: Desire vs Effective Demand',
    instruction:
      'Toggle consumer ability and willingness to see when a simple "want" transforms into market demand.',
    interactionType: 'toggle-conditions',
    nodeId: NODE_C10_ECONAPP_001,
  },
  {
    title: 'The Law of Demand & Multi-Representation System',
    instruction:
      'Drag the Onion Price slider from ₹10/kg to ₹90/kg. Watch household quantity demanded contract along the schedule, curve, and algebraic formula.',
    interactionType: 'slider-demand',
    nodeId: NODE_C10_ECONAPP_002,
  },
  {
    title: 'Movement vs. Shift: What Changed?',
    instruction:
      'Switch between an Own-Price Change (Movement) and an Income Boost via PM-Kisan (Shift) to see how the curve behaves.',
    interactionType: 'shift-vs-movement',
    nodeId: NODE_C10_ECONAPP_003,
  },
  {
    title: 'Supply vs. Stock: The Punjab Wheat Harvest',
    instruction:
      'Adjust the Market Procurement Price to see how much of a 1,000 kg grain stock is offered as market supply.',
    interactionType: 'stock-vs-supply',
    nodeId: NODE_C10_ECONAPP_006,
  },
  {
    title: 'Price Elasticity of Demand: Responsive vs Inelastic',
    instruction:
      'Toggle between Tata Salt (Necessity) and Gold Jewellery (Luxury) to compare price responsiveness and total revenue.',
    interactionType: 'elasticity-meter',
    nodeId: NODE_C10_ECONAPP_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Reliance Jio raises mobile data pack prices by 30% while Airtel & Vi hold prices steady, what will happen to Jio subscriber demand?',
    options: [
      'Demand drops significantly (Elastic demand due to close substitutes)',
      'Demand rises because higher price signals better 5G speed (Veblen)',
      'Demand remains exactly the same because data is an absolute biological necessity',
      'Demand doubles due to speculative hoarding of gigabytes',
    ],
    correctIndex: 0,
    verifyInstruction:
      'Now drag the Telecom Price Slider to +30% in the simulator and verify the sharp subscriber drop!',
    nodeId: NODE_C10_ECONAPP_010,
  },
  {
    question:
      'Predict: If the Government of India grants a ₹1.97 Lakh Crore PLI (Production-Linked Incentive) subsidy to smartphone makers, what happens to the supply curve?',
    options: [
      'Supply shifts Leftward because taxes rise',
      'Supply shifts Rightward because marginal cost of production is subsidised',
      'Producers move down along the same supply curve (Contraction)',
      'Supply collapses because domestic producers leave the market',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Select the "PLI Subsidy" determinant button and watch the green supply curve expand to S2!',
    nodeId: NODE_C10_ECONAPP_009,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice about total consumer expenditure on Tata Salt when its price increases from ₹20 to ₹25?',
    observableOptions: [
      'Total expenditure on salt rises because quantity bought barely drops (inelastic demand)',
      'Expenditure drops to zero because consumers boycott salt',
      'Expenditure halving because salt demand is hyper-elastic',
      'No change in expenditure whatsoever',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECONAPP_010,
  },
  {
    question:
      'When you increase the market price in the Punjab Farmer simulator, what happens to the retained grain stock vs market supply?',
    observableOptions: [
      'Retained stock stays fixed at minimum self-consumption while market supply absorbs the surplus',
      'Market supply shrinks to zero at high prices',
      'Stock vanishes completely from the country',
      'Farmers burn excess wheat rather than selling',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECONAPP_006,
  },
];

// ─── CHALLENGE INTERFACE ───
export interface Challenge {
  id: string;
  nodeId: string;
  type:
    | 'classify'
    | 'distinguish'
    | 'match'
    | 'drag-label'
    | 'drag-sort'
    | 'numeric'
    | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel:
    | 'recall'
    | 'understanding'
    | 'application'
    | 'analysis'
    | 'evaluation'
    | 'creativity';
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

// ─── COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001_req_conditions',
    nodeId: NODE_C10_ECONAPP_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'A Class 10 student in Indore wishes to buy a Mercedes-Benz AMG (₹1.8 Crore) but has only ₹2,000 pocket money. In economics, why is this NOT classified as demand?',
    options: [
      'It is merely a desire; the ability to pay (purchasing power) is missing.',
      'It is derived demand, not direct consumer demand.',
      'The student has willingness but lacks composite utility.',
      'Automobiles are exempt from the definition of demand.',
    ],
    correctIndex: 0,
    explanation:
      'Demand requires three simultaneous conditions: desire, ability to pay (purchasing power), and willingness to pay at the given price. Without money, it remains a mere wish or desire.',
    hints: [
      'Think about the 3 essential pillars of economic demand.',
      'Does having ₹2,000 allow you to purchase a ₹1.8 Crore vehicle?',
      'Desire without purchasing power cannot reach the marketplace as a purchase.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_demand_types_drag',
    nodeId: NODE_C10_ECONAPP_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Match each real-world Indian transaction to its correct demand classification (Joint, Derived, or Composite).',
    dragItems: [
      { label: 'Tata Creta & Petrol', targetId: 'box_joint' },
      { label: 'JSW Steel for Tata Motors', targetId: 'box_derived' },
      { label: 'Electricity for Homes & Mills', targetId: 'box_composite' },
    ],
    correctMapping: {
      box_joint: 'Tata Creta & Petrol',
      box_derived: 'JSW Steel for Tata Motors',
      box_composite: 'Electricity for Homes & Mills',
    },
    explanation:
      'Joint demand = goods used together for one want (car + fuel). Derived demand = input wanted because final good is wanted (steel for cars). Composite demand = one good with multiple competing uses (electricity).',
    hints: [
      'Which pair is consumed simultaneously by a single driver?',
      'Which raw material is bought solely because consumers buy cars?',
      'Which utility powers lights, air conditioners, and factory lathes alike?',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_market_summation_num',
    nodeId: NODE_C10_ECONAPP_002,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'In a Delhi locality at ₹40/kg for Basmati rice, Family A demands 14 kg, Family B demands 18 kg, and Family C demands 23 kg. What is the total Market Demand at ₹40/kg in kg?',
    correctAnswer: 55,
    tolerance: 0,
    unit: 'kg',
    explanation:
      'Market Demand is derived by Horizontal Summation of all individual quantities at a given price: 14 + 18 + 23 = 55 kg.',
    hints: [
      'Do not sum the prices; price remains constant at ₹40/kg.',
      'Add the quantities demanded by Family A, Family B, and Family C together.',
      '14 + 18 + 23 = ?',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_law_of_demand_reasons',
    nodeId: NODE_C10_ECONAPP_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why does the standard Demand Curve slope downward from left to right in Indian retail markets?',
    options: [
      'Combined effect of the Income Effect (real purchasing power changes) and Substitution Effect.',
      'Because Indian producers always charge higher prices for higher quantities.',
      'Due to government price ceiling mandates under the Essential Commodities Act.',
      'Because total population always shrinks when prices increase.',
    ],
    correctIndex: 0,
    explanation:
      'When price falls, real income rises (Income Effect) and the good becomes cheaper relative to alternatives (Substitution Effect). Both induce consumers to buy more.',
    hints: [
      'What happens to your wallet\'s purchasing power when onion prices fall from ₹80 to ₹20?',
      'Do consumers switch away from costlier substitutes toward cheaper items?',
      'Income Effect + Substitution Effect together create the downward slope.',
    ],
  },
  {
    id: 'ch_005_movement_vs_shift_anal',
    nodeId: NODE_C10_ECONAPP_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'When Amul cuts milk price from ₹60 to ₹50/litre, sales rise. When PM-Kisan transfers ₹6,000 to farmers, FMCG sales rise at the SAME price. How are these two graphed?',
    options: [
      'Amul: Downward movement along the same curve (Expansion); PM-Kisan: Rightward shift of the entire curve (Increase in Demand).',
      'Amul: Rightward shift of curve; PM-Kisan: Leftward shift of curve.',
      'Both are classified as movements along the same demand curve.',
      'Both are rightward shifts because sales increased in both cases.',
    ],
    correctIndex: 0,
    explanation:
      'Own-price changes cause movement along the existing curve (expansion/contraction). Non-price factors like income transfers shift the entire curve rightward or leftward.',
    hints: [
      'Did Amul change the good\'s own price? Yes = movement.',
      'Did PM-Kisan change the soap price or consumer income? Income = shift.',
      'Never confuse "expansion" (movement down) with "increase" (shift right).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_006_substitutes_complements',
    nodeId: NODE_C10_ECONAPP_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'In 2022, petrol prices in Mumbai rose to ₹110/litre. What was the direct graphical effect on the Demand Curve for Petrol Hatchback Cars (Maruti Alto)?',
    options: [
      'Leftward shift of the Alto demand curve because petrol is a complementary good.',
      'Rightward shift of the Alto demand curve because petrol and cars are substitutes.',
      'Upward movement along the Alto demand curve (contraction).',
      'No change because car purchases depend solely on insurance regulations.',
    ],
    correctIndex: 0,
    explanation:
      'Petrol and petrol cars are complementary goods (jointly demanded). When the price of a complement rises, the entire bundle becomes costlier, shifting demand for the paired good leftward.',
    hints: [
      'Can you drive a petrol car without buying petrol?',
      'When fuel becomes expensive, does running a car become cheaper or costlier?',
      'Complement price UP → Paired good demand curve shifts LEFT.',
    ],
  },
  {
    id: 'ch_007_inferior_good_rural',
    nodeId: NODE_C10_ECONAPP_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'As rural household incomes in Rajasthan rose under direct benefit schemes, consumption of coarse grain (Bajra) fell while Basmati rice purchases surged. In economics, Bajra is classified here as:',
    options: [
      'An Inferior Good (negative income effect on demand).',
      'A Veblen Luxury Good.',
      'A Perfectly Elastic Commodity.',
      'A Complement to Basmati Rice.',
    ],
    correctIndex: 0,
    explanation:
      'An inferior good is one whose demand decreases as consumer income rises (and shifts right when income falls), as consumers upgrade to superior staples.',
    hints: [
      'Does higher income always make people buy more of low-grade staples?',
      'When people get richer, they shift away from coarse grains to fine wheat and rice.',
      'Income UP → Demand DOWN = Inferior Good.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_008_giffen_good_mechanism',
    nodeId: NODE_C10_ECONAPP_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Under what precise conditions does a staple grain exhibit the Giffen Paradox (upward-sloping demand curve)?',
    options: [
      'When the good is an inferior staple consuming a huge budget share of the very poor, with no cheaper substitute, so the negative income effect outweighs the substitution effect.',
      'When wealthy industrialists buy it for social status and conspicuous consumption.',
      'When the government fixes a legal minimum support price above market clearing level.',
      'When foreign multinational corporations monopolise grain trading mandis.',
    ],
    correctIndex: 0,
    explanation:
      'Sir Robert Giffen observed that for very poor families, when the staple price rises, their real income drops so severely that they can no longer afford any meat/wheat, forcing them to buy even MORE of the cheapest staple.',
    hints: [
      'Think of calorie survival on an extreme budget constraint.',
      'If the cheapest bread price rises, can the poor family still afford any meat?',
      'Income effect of price rise is negative, huge, and overwhelms the substitution effect.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_009_veblen_vs_necessity',
    nodeId: NODE_C10_ECONAPP_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate: A life-saving cancer injection costs ₹5 Lakh per vial. A Rolls-Royce Phantom costs ₹10 Crore. Why is the car a Veblen good, while the medicine is NOT?',
    options: [
      'Car demand rises specifically because high price signals exclusivity/status; medicine demand is driven by biological survival, not price prestige.',
      'Medicine has an upward sloping demand curve, while the luxury car has a downward sloping curve.',
      'Both are identical Veblen goods because both cost more than ₹1 Lakh.',
      'Neither good obeys any economic principles.',
    ],
    correctIndex: 0,
    explanation:
      'Veblen goods derive utility from the high price tag itself (conspicuous status signalling). If Rolls-Royce dropped price to ₹5 Lakh, wealthy buyers would abandon it. If cancer medicine price dropped, patients would buy equal or more doses gladly.',
    hints: [
      'Would wealthy people buy a Rolls-Royce if it cost ₹50,000 like an old scooter?',
      'Do cancer patients take injections to show off to their neighbours?',
      'Status motive vs Inelastic biological necessity.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_010_supply_vs_stock_punjab',
    nodeId: NODE_C10_ECONAPP_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'A Punjab farmer has 1,000 kg of wheat after harvest. She keeps 300 kg for family consumption and seed, and brings 700 kg to the mandi at ₹2,125/quintal. What is her stock and what is her supply?',
    options: [
      'Stock = 1,000 kg; Supply = 700 kg at ₹2,125/quintal.',
      'Stock = 700 kg; Supply = 1,000 kg.',
      'Both Stock and Supply are 1,000 kg.',
      'Supply = 300 kg; Stock = 700 kg.',
    ],
    correctIndex: 0,
    explanation:
      'Stock is the total quantity physically available at a point in time (1,000 kg). Supply is the specific portion offered for sale at a given price and time (700 kg).',
    hints: [
      'What is the total quantity in the barn?',
      'What quantity was loaded onto the tractor and offered for sale at the mandi?',
      'Stock = Total available; Supply = Offered for sale at given price.',
    ],
  },
  {
    id: 'ch_011_law_of_supply_slope',
    nodeId: NODE_C10_ECONAPP_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'State the Law of Supply. What is the fundamental shape and direction of the standard supply curve?',
    options: [
      'Direct relationship between price and quantity supplied (ceteris paribus); slopes UPWARD from left to right.',
      'Inverse relationship between price and quantity supplied; slopes DOWNWARD from left to right.',
      'Quantity supplied is fixed regardless of price; vertical line.',
      'Supply fluctuates randomly with no geometric relationship to price.',
    ],
    correctIndex: 0,
    explanation:
      'The Law of Supply states that higher prices incentivize higher quantity supplied (profit motive and covering rising marginal costs), producing an upward-sloping curve.',
    hints: [
      'Will a manufacturer produce more steel when prices are high or when prices are low?',
      'Demand = Downward; Supply = Upward.',
      'Direct positive relationship = Slopes UP from bottom-left to top-right.',
    ],
  },
  {
    id: 'ch_012_supply_shift_analysis',
    nodeId: NODE_C10_ECONAPP_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In March 2022, an unseasonal heatwave reduced India\'s wheat harvest by 4 million tonnes. How did this weather shock affect the national wheat supply curve?',
    options: [
      'Leftward shift of the entire supply curve (Decrease in Supply at every price level).',
      'Downwards contraction along the same supply curve.',
      'Rightward shift of the supply curve.',
      'The curve rotated to become perfectly horizontal.',
    ],
    correctIndex: 0,
    explanation:
      'Weather is a non-price determinant. A severe heatwave reduces physical crop availability across all prices, shifting the entire supply curve to the left (S1 to S3).',
    hints: [
      'Did the price of wheat cause the heatwave, or did the weather destroy the crop?',
      'Non-price factor = Shift of the entire curve.',
      'Less crop produced at all prices = Shift LEFT.',
    ],
  },
  {
    id: 'ch_013_export_ban_dual_shift',
    nodeId: NODE_C10_ECONAPP_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'On 14 May 2022, the Government of India banned wheat exports. Evaluate the simultaneous impact on the (i) Export Supply Curve and (ii) Domestic Indian Supply Curve.',
    options: [
      'Export Supply shifted Leftward (to near zero); Domestic Supply shifted Rightward (grain retained in India).',
      'Both export and domestic supply curves shifted leftward.',
      'Export supply expanded along the curve; domestic supply contracted.',
      'Both curves remained untouched because only international buyers were affected.',
    ],
    correctIndex: 0,
    explanation:
      'A single policy can have opposite impacts: closing export channels shifts export supply leftward, while redirecting those grain stocks into Indian mandis shifts domestic supply rightward.',
    hints: [
      'Can Indian traders ship wheat to London after the ban? Export supply collapses (Left).',
      'Where does the harvested wheat go instead? It remains in India, expanding domestic mandi availability (Right).',
      'Left in export, Right in domestic.',
    ],
  },
  {
    id: 'ch_014_pli_subsidy_impact',
    nodeId: NODE_C10_ECONAPP_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Under the ₹40,995 Crore PLI scheme for mobile manufacturing, Apple suppliers (Foxconn, Pegatron) expanded Indian output tenfold. Which supply determinant drove this rightward shift?',
    options: [
      'Government Subsidies (lowering effective per-unit manufacturing costs) and Entry of New Sellers.',
      'Increase in consumer income tax rates.',
      'A sudden spike in domestic raw mineral prices.',
      'Speculative hoarding of smartphones by retail distributors.',
    ],
    correctIndex: 0,
    explanation:
      'Production-Linked Incentives act as direct per-unit subsidies, reducing production costs and shifting supply curves rightward, further amplified by multinational sellers establishing local factories.',
    hints: [
      'Does a government incentive increase production cost or subsidise it?',
      'Subsidy = Support = Shift Right.',
      'Lower production cost + more factory operators = Rightward Supply Shift.',
    ],
  },
  {
    id: 'ch_015_elasticity_formula_check',
    nodeId: NODE_C10_ECONAPP_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the standard Percentage Method formula for calculating Price Elasticity of Demand (Ed)?',
    options: [
      'Ed = |(% Change in Quantity Demanded) / (% Change in Price)|',
      'Ed = |(% Change in Price) / (% Change in Quantity Demanded)|',
      'Ed = (Initial Price × New Price) / (Initial Quantity × New Quantity)',
      'Ed = Total Revenue / Total Cost',
    ],
    correctIndex: 0,
    explanation:
      'Elasticity measures how quantity responds to price: Ed = |(ΔQ/Q1 × 100) / (ΔP/P1 × 100)|. Quantity is always on top (numerator), price on the bottom (denominator).',
    hints: [
      'Which variable is responding to the other?',
      'Quantity response divided by Price stimulus.',
      'Always take the absolute value (positive sign).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_016_elasticity_calc_jio',
    nodeId: NODE_C10_ECONAPP_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'When Reliance Jio raises its monthly plan from ₹200 to ₹250, monthly recharge demand drops from 100 Million to 70 Million. Calculate Price Elasticity of Demand (Ed).',
    correctAnswer: 1.2,
    tolerance: 0.05,
    unit: '',
    explanation:
      '%ΔQ = |(70 - 100)/100 × 100| = 30%. %ΔP = (250 - 200)/200 × 100 = 25%. Ed = 30% / 25% = 1.2 (Elastic Demand, Ed > 1).',
    hints: [
      'Step 1: Calculate % Change in Quantity: (100 - 70) / 100 = 30%.',
      'Step 2: Calculate % Change in Price: (250 - 200) / 200 = 25%.',
      'Step 3: Divide %ΔQ by %ΔP: 30 / 25 = ?',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_017_sort_elasticity_spectrum',
    nodeId: NODE_C10_ECONAPP_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Arrange these 4 Indian commodities in order of INCREASING Price Elasticity of Demand (from lowest/most inelastic to highest/most elastic).',
    sortItems: [
      'Insulin Injection for Diabetics (Ed ≈ 0)',
      'Tata Iodized Cooking Salt (Ed < 1)',
      'Mid-tier Branded Tea (Ed ≈ 1)',
      'Titan 22k Gold Wedding Jewellery (Ed > 1)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Essential life-saving medicine (perfectly inelastic) < Daily cooking necessity (inelastic) < Habitual beverage with moderate substitutes (unitary) < Luxury discretionary jewellery with broad alternatives (highly elastic).',
    hints: [
      'Which good has zero substitutes and is essential for biological survival? (Goes first)',
      'Which good costs only ₹20 and takes 0.01% of household budget?',
      'Which expensive luxury item do people postpone when gold rates peak?',
    ],
  },
  {
    id: 'ch_018_gst_elasticity_logic',
    nodeId: NODE_C10_ECONAPP_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Why does India\'s GST Council levy 0% tax on unbranded milk & grains, but 28% + 22% cess on luxury SUVs, using Elasticity principles?',
    options: [
      'Essentials have inelastic demand; taxing them severely burdens poor families without reducing consumption. Luxuries have elastic demand and high ability to pay.',
      'Because the government wants to ban luxury car production completely.',
      'Because milk producers lobby the parliament whereas automakers do not.',
      'Elasticity theory recommends taxing necessities at the highest rate to maximize government profit.',
    ],
    correctIndex: 0,
    explanation:
      'Taxing inelastic necessities causes harsh regressive welfare loss for low-income citizens. Taxing elastic luxury goods collects revenue from high-income brackets while shifting discretionary capital toward productive sectors.',
    hints: [
      'Would poor families stop drinking milk if taxed, or just suffer nutritional poverty?',
      'Do wealthy buyers have the financial cushion to absorb luxury cess?',
      'Equity + Inelastic essentials vs Elastic luxuries.',
    ],
  },
  {
    id: 'ch_019_construct_equilibrium',
    nodeId: NODE_C10_ECONAPP_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question:
      'Construct the 3-step economic sequence that restores market equilibrium when price in a vegetable mandi is initially TOO HIGH (Surplus condition).',
    availableParts: [
      'Excess Supply (Surplus)',
      'Sellers Cut Prices to Clear Stock',
      'Quantity Demanded Expands to Equilibrium',
      'Shortage Triggers Panic Buying',
      'Government Imposes Rationing',
    ],
    targetState:
      'Excess Supply (Surplus) Sellers Cut Prices to Clear Stock Quantity Demanded Expands to Equilibrium',
    validationHint:
      'Start with surplus condition -> Seller reaction -> Buyer response.',
    explanation:
      'When price is above equilibrium: (1) Quantity Supplied > Quantity Demanded (Surplus) -> (2) Sellers lower prices to avoid spoilage -> (3) Lower prices induce buyers to expand demand until Qd = Qs.',
    hints: [
      'What happens when vegetable vendors have unsold crates at 4 PM?',
      'Do they raise prices or lower prices to attract buyers?',
      'As prices drop, do shoppers buy more or less?',
    ],
  },
  {
    id: 'ch_020_speculative_bubble_onion',
    nodeId: NODE_C10_ECONAPP_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In October 2019, onion prices jumped from ₹40 to ₹100/kg, yet urban households rushed to buy 15 kg sacks instead of their normal 2 kg. Why did this happen?',
    options: [
      'Price Expectations Exception: Consumers expected prices to hit ₹150/kg, triggering speculative panic hoarding.',
      'Onions suddenly became a Veblen luxury status symbol.',
      'Income of all Indian families tripled overnight.',
      'Onion demand curve became perfectly elastic.',
    ],
    correctIndex: 0,
    explanation:
      'When consumers expect future price hikes or acute shortages, current demand rises even at high prices to avoid paying higher future costs. This self-fulfilling speculative loop breaks the standard law of demand.',
    hints: [
      'Were people buying onions to impress their friends or out of fear of ₹150 prices?',
      'Fear of future inflation leads to panic buying today.',
      'Speculative expectations exception.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_021_fame_ii_demand_triad',
    nodeId: NODE_C10_ECONAPP_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Under the ₹11,500 Crore FAME-II policy, the Indian Government subsidised Ola Electric scooters. This simultaneously stimulated: (i) Direct demand for EVs, (ii) Joint demand for charging ports, and (iii) What type of demand for Exide Lithium-ion batteries?',
    options: [
      'Derived Demand (batteries needed as an industrial input to build EVs).',
      'Composite Demand (batteries consumed for cooking and lighting).',
      'Veblen Luxury Demand.',
      'Giffen Staple Demand.',
    ],
    correctIndex: 0,
    explanation:
      'The demand for automotive components, lithium cells, and raw materials is DERIVED from final consumer demand for electric scooters.',
    hints: [
      'Do regular consumers buy bare battery cells to keep on their dining table?',
      'Automakers demand batteries only because buyers demand electric scooters.',
      'Input demanded because output is demanded = Derived Demand.',
    ],
  },
  {
    id: 'ch_022_time_elasticity_factor',
    nodeId: NODE_C10_ECONAPP_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why is consumer demand for onions or crude oil very INELASTIC in the short run (1 week), but significantly more ELASTIC in the long run (1 year)?',
    options: [
      'In the long run, consumers have time to discover substitutes (cabbage, EV vehicles, public transit) and adjust habits.',
      'Because prices always drop to zero in the long run.',
      'Because the government legally prohibits long-run price elasticity.',
      'Because all goods become Giffen goods over a one-year horizon.',
    ],
    correctIndex: 0,
    explanation:
      'Elasticity increases over time because finding substitutes, re-engineering recipes, or switching to alternative technologies (like electric mobility) requires time.',
    hints: [
      'Can you buy an electric car tomorrow morning if petrol spikes today?',
      'Does changing cooking habits and discovering alternative ingredients take time?',
      'Time enables substitution -> Long run is always more elastic.',
    ],
  },
];

// ─── TOPIC-SPECIFIC VECTOR SVG DIAGRAMS ───

// SVG 1: Market Equilibrium & Surplus/Shortage Mechanism
const MarketEquilibriumSVG = ({
  price = 50,
  qd = 55,
  qs = 55,
}: {
  price?: number;
  qd?: number;
  qs?: number;
}) => (
  <svg
    viewBox="0 0 360 220"
    className="w-full h-auto max-h-56 bg-slate-950 rounded-xl border border-slate-800 p-2 select-none"
    role="img"
    aria-label="Market Equilibrium SVG diagram with demand and supply intersection"
  >
    <defs>
      <linearGradient id="eqGrid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
      </linearGradient>
      <marker id="arrowEq" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
      </marker>
    </defs>

    {/* Background Grid */}
    <rect x="35" y="15" width="305" height="170" fill="url(#eqGrid)" rx="6" />

    {/* Axes */}
    <line x1="40" y1="190" x2="340" y2="190" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowEq)" />
    <line x1="40" y1="190" x2="40" y2="15" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowEq)" />

    <text x="45" y="24" fill="#cbd5e1" fontSize="10" fontWeight="bold">Price (₹/kg)</text>
    <text x="275" y="208" fill="#cbd5e1" fontSize="10" fontWeight="bold">Quantity (Q)</text>

    {/* Demand Curve */}
    <line x1="60" y1="40" x2="320" y2="175" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" />
    <text x="325" y="175" fill="#f43f5e" fontSize="11" fontWeight="extrabold">D</text>
    <text x="50" y="38" fill="#f43f5e" fontSize="11" fontWeight="extrabold">D</text>

    {/* Supply Curve */}
    <line x1="60" y1="175" x2="320" y2="40" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
    <text x="325" y="44" fill="#10b981" fontSize="11" fontWeight="extrabold">S</text>
    <text x="50" y="180" fill="#10b981" fontSize="11" fontWeight="extrabold">S</text>

    {/* Equilibrium point */}
    <circle cx="190" cy="107.5" r="5" fill="#38bdf8" />
    <line x1="40" y1="107.5" x2="190" y2="107.5" stroke="#38bdf8" strokeDasharray="3,3" strokeWidth="1.5" />
    <line x1="190" y1="107.5" x2="190" y2="190" stroke="#38bdf8" strokeDasharray="3,3" strokeWidth="1.5" />
    <text x="12" y="111" fill="#38bdf8" fontSize="10" fontWeight="bold">P*</text>
    <text x="185" y="204" fill="#38bdf8" fontSize="10" fontWeight="bold">Q*</text>
    <text x="198" y="104" fill="#38bdf8" fontSize="9" fontWeight="bold">Equilibrium (E)</text>

    {/* Dynamic Price Line */}
    {(() => {
      const pY = 190 - (price / 100) * 150;
      const dX = 60 + ((pY - 40) / 135) * 260;
      const sX = 60 + ((175 - pY) / 135) * 260;
      return (
        <g>
          <line x1="40" y1={pY} x2="330" y2={pY} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,4" />
          <circle cx={dX} cy={pY} r="4" fill="#f43f5e" />
          <circle cx={sX} cy={pY} r="4" fill="#10b981" />
          <text x="8" y={pY + 4} fill="#fbbf24" fontSize="9" fontWeight="bold">₹{price}</text>
          {price > 55 && (
            <rect x="145" y={pY - 18} width="95" height="16" fill="#f59e0b" fillOpacity="0.25" rx="3" stroke="#f59e0b" strokeWidth="1" />
          )}
          {price > 55 && (
            <text x="152" y={pY - 6} fill="#fef08a" fontSize="8.5" fontWeight="bold">▲ Surplus (Qs &gt; Qd)</text>
          )}
          {price < 45 && (
            <rect x="145" y={pY + 6} width="95" height="16" fill="#ef4444" fillOpacity="0.25" rx="3" stroke="#ef4444" strokeWidth="1" />
          )}
          {price < 45 && (
            <text x="152" y={pY + 18} fill="#fecaca" fontSize="8.5" fontWeight="bold">▼ Shortage (Qd &gt; Qs)</text>
          )}
        </g>
      );
    })()}
  </svg>
);

// SVG 2: Movement Along Curve vs Shift of Curve
const MovementVsShiftSVG = ({ shift = 0 }: { shift?: number }) => (
  <svg
    viewBox="0 0 360 220"
    className="w-full h-auto max-h-56 bg-slate-950 rounded-xl border border-slate-800 p-2 select-none"
    role="img"
    aria-label="SVG Diagram showing Movement along demand curve vs Shift of demand curve"
  >
    <defs>
      <marker id="arrowShift" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
      </marker>
      <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" />
      </marker>
    </defs>

    {/* Axes */}
    <line x1="45" y1="185" x2="335" y2="185" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowShift)" />
    <line x1="45" y1="185" x2="45" y2="20" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowShift)" />
    <text x="50" y="28" fill="#cbd5e1" fontSize="9.5" fontWeight="bold">Price (P)</text>
    <text x="270" y="202" fill="#cbd5e1" fontSize="9.5" fontWeight="bold">Quantity (Q)</text>

    {/* Baseline Curve D1 */}
    <line x1="65" y1="45" x2="280" y2="175" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="5,3" />
    <text x="285" y="175" fill="#94a3b8" fontSize="10" fontWeight="bold">D1</text>

    {/* Shifted Curve D2 (if shifted) */}
    {shift !== 0 && (
      <g>
        <line
          x1={65 + shift * 1.5}
          y1="45"
          x2={280 + shift * 1.5}
          y2="175"
          stroke="#38bdf8"
          strokeWidth="3"
        />
        <text x={285 + shift * 1.5} y="175" fill="#38bdf8" fontSize="11" fontWeight="black">
          {shift > 0 ? 'D2 (Increase)' : 'D3 (Decrease)'}
        </text>
        {/* Shift arrows */}
        <line
          x1="180"
          y1="110"
          x2={180 + shift * 1.4}
          y2="110"
          stroke="#38bdf8"
          strokeWidth="2.5"
          markerEnd="url(#arrowShift)"
        />
        <text x={180 + (shift > 0 ? 8 : -75)} y="100" fill="#38bdf8" fontSize="8.5" fontWeight="bold">
          {shift > 0 ? 'Rightward Shift' : 'Leftward Shift'}
        </text>
      </g>
    )}

    {/* Movement Annotations on D1 */}
    <circle cx="120" cy="78" r="4" fill="#f43f5e" />
    <text x="128" y="76" fill="#f43f5e" fontSize="9" fontWeight="bold">Point A (High P, Low Q)</text>
    <circle cx="225" cy="142" r="4" fill="#10b981" />
    <text x="145" y="158" fill="#10b981" fontSize="9" fontWeight="bold">Point B (Expansion Downward)</text>

    <path d="M 125 82 Q 170 115 220 140" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#arrowRed)" />
    <text x="175" y="70" fill="#ec4899" fontSize="8.5" fontWeight="bold">Movement (Own Price Change)</text>
  </svg>
);

// SVG 3: Demand Triad & Elasticity Slope Spectrum
const DemandTriadVennSVG = () => (
  <svg
    viewBox="0 0 360 200"
    className="w-full h-auto max-h-52 bg-slate-950 rounded-xl border border-slate-800 p-2 select-none"
    role="img"
    aria-label="Venn Diagram showing the 3 mandatory pillars of economic demand"
  >
    <defs>
      <radialGradient id="triadG1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
      </radialGradient>
      <radialGradient id="triadG2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#064e3b" stopOpacity="0.2" />
      </radialGradient>
      <radialGradient id="triadG3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#78350f" stopOpacity="0.2" />
      </radialGradient>
    </defs>

    {/* 3 Intersecting Circles */}
    <circle cx="140" cy="90" r="55" fill="url(#triadG1)" stroke="#60a5fa" strokeWidth="2" />
    <circle cx="220" cy="90" r="55" fill="url(#triadG2)" stroke="#34d399" strokeWidth="2" />
    <circle cx="180" cy="140" r="55" fill="url(#triadG3)" stroke="#fbbf24" strokeWidth="2" />

    {/* Pillar Labels */}
    <text x="100" y="75" fill="#93c5fd" fontSize="10" fontWeight="extrabold">1. Desire</text>
    <text x="92" y="88" fill="#cbd5e1" fontSize="8">(Wanting)</text>

    <text x="215" y="75" fill="#6ee7b7" fontSize="10" fontWeight="extrabold">2. Ability</text>
    <text x="210" y="88" fill="#cbd5e1" fontSize="8">(Purchasing Power)</text>

    <text x="145" y="175" fill="#fde68a" fontSize="10" fontWeight="extrabold">3. Willingness</text>
    <text x="145" y="187" fill="#cbd5e1" fontSize="8">(Ready to Spend)</text>

    {/* Center Core */}
    <rect x="148" y="96" width="64" height="24" fill="#047857" rx="6" stroke="#a7f3d0" strokeWidth="1.5" />
    <text x="153" y="112" fill="#ffffff" fontSize="9" fontWeight="black">DEMAND ✓</text>
  </svg>
);

// ─── DEFAULT PROPS ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
  }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_ECONAPP_001,
  title: 'Demand & Supply Mechanics: CISCE Economic Applications',
  definition:
    'Demand is desire backed by purchasing power and willingness to pay. Supply is the quantity offered for sale at a specific price, time, and market by a willing producer. Both obey structural laws governed by price and non-price determinants.',
  eli5:
    'When prices go up, buyers want less (Law of Demand) and sellers want to supply more (Law of Supply). The price where both agree is the market equilibrium.',
  misconceptions: [
    {
      misconception: 'Wanting or needing an item is the same as economic demand.',
      correction:
        'Demand requires THREE things simultaneously: Desire + Ability to pay (money) + Willingness to pay the offered price.',
    },
    {
      misconception:
        'An increase in demand and an expansion of demand mean the exact same thing.',
      correction:
        'Expansion is a movement DOWN along the same curve due to an own-price cut. Increase is a SHIFT of the entire curve to the right due to non-price factors (like income or tastes).',
    },
    {
      misconception:
        'Market demand is calculated by summing the prices of all individual consumers.',
      correction:
        'Market demand is derived by Horizontal Summation — adding the QUANTITIES demanded at each fixed price level, never adding prices.',
    },
    {
      misconception: 'All inferior goods are Giffen goods.',
      correction:
        'Giffen goods are a tiny, extreme subset of inferior goods where the income effect is so massive that it overpowers the substitution effect, causing quantity demanded to rise when price rises.',
    },
    {
      misconception: 'Stock and Supply are interchangeable terms.',
      correction:
        'Stock is the total quantity in existence with a producer. Supply is only the fraction of stock offered for sale at a specific market price.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is NOT a condition of demand?',
      options: [
        'Desire for the good',
        'Ability to pay',
        'Government subsidy approval',
        'Willingness to spend at given price',
      ],
      correctIndex: 2,
    },
    {
      question: 'Steel demanded by Tata Motors to make cars is an example of:',
      options: ['Joint Demand', 'Derived Demand', 'Composite Demand', 'Direct Demand'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrates mastery over demand/supply definitions, curve derivations, movements vs shifts, determinants, exceptions, and elasticity calculations.',
};

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Market Analyst: The Lasalgaon Mandi & Jio Pricing Brief',
  description:
    'Synthesize your learning into a real-world policy advisory memo. Pick either (A) The Maharashtra Onion Price Spike or (B) Reliance Jio 5G Tariff Strategy.',
  steps: [
    'Identify whether the market shock is driven by a price movement or a non-price determinant shift.',
    'Classify whether the good is a necessity (inelastic) or discretionary substitute (elastic).',
    'Calculate the expected revenue impact of a 15% price adjustment.',
    'Formulate a 3-point recommendation (buffer stock intervention or competitive tariff structuring).',
  ],
};

// ─── MAIN COMPONENT ───
export function C10_EconApplicationsDemandMeaningTypesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_ECONAPP_001,
  title = DEFAULT_PROPS.title || 'Demand & Supply Mechanics',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['econapp'] || {
    name: 'Economic Applications',
    emoji: '📈',
    color: 'emerald',
  };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<
    'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'
  >('discovery');

  // ─── NAVIGATION & INTERACTION STATES ───
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── BRILLIANT PATTERN STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── REFLECTION STATE (POST-COMPLETION) ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explainFriend: '',
    realLife: '',
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // ─── SIMULATOR CONTROLS (EXPLORATION & SANDBOX) ───
  const [hasDesire, setHasDesire] = useState(true);
  const [hasAbility, setHasAbility] = useState(false);
  const [hasWillingness, setHasWillingness] = useState(false);

  const [onionPrice, setOnionPrice] = useState(30); // ₹10 to ₹90
  const [incomeShiftFactor, setIncomeShiftFactor] = useState(0); // -30 to +30
  const [selectedGoodType, setSelectedGoodType] = useState<
    'normal' | 'inferior' | 'veblen' | 'giffen'
  >('normal');

  const [procurementMSP, setProcurementMSP] = useState(2125);
  const totalStockKg = 1000;
  const householdReserveKg = 300;

  const [elasticityItem, setElasticityItem] = useState<'salt' | 'jio' | 'gold'>('jio');
  const [simPriceDelta, setSimPriceDelta] = useState(20);

  const [sandboxTab, setSandboxTab] = useState<
    'equilibrium' | 'elasticity' | 'shifts' | 'stockSupply'
  >('equilibrium');

  // Multi-Representation Tab Switcher
  const [repView, setRepView] = useState<'all' | 'schedule' | 'curve' | 'equation'>('all');

  // ─── CHALLENGE INTERACTION STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(
        (c) => c.difficulty === 'foundation' || c.difficulty === 'standard'
      );
    }
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── ADAPTIVE DIFFICULTY & BKT EFFECT ───
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

  // ─── LIVE CALCULATIONS: DEMAND, SUPPLY & EQUILIBRIUM ───
  const liveQuantityDemanded = useMemo(() => {
    if (selectedGoodType === 'veblen') {
      return Math.max(10, Math.round(20 + onionPrice * 0.8 + incomeShiftFactor));
    }
    if (selectedGoodType === 'giffen') {
      return Math.max(10, Math.round(15 + onionPrice * 0.85 - incomeShiftFactor * 0.5));
    }
    if (selectedGoodType === 'inferior') {
      return Math.max(5, Math.round(100 - onionPrice * 0.9 - incomeShiftFactor * 1.2));
    }
    return Math.max(5, Math.round(110 - onionPrice * 1.1 + incomeShiftFactor));
  }, [onionPrice, incomeShiftFactor, selectedGoodType]);

  const liveQuantitySupplied = useMemo(() => {
    return Math.max(5, Math.round(10 + onionPrice * 1.1));
  }, [onionPrice]);

  const marketSurplusOrShortage = useMemo(() => {
    return liveQuantitySupplied - liveQuantityDemanded;
  }, [liveQuantitySupplied, liveQuantityDemanded]);

  // Multi-representation schedule table dataset
  const demandScheduleData = useMemo(() => {
    const testPrices = [20, 35, 50, 65, 80];
    return testPrices.map((p) => {
      let q = Math.max(5, Math.round(110 - p * 1.1 + incomeShiftFactor));
      if (selectedGoodType === 'veblen') q = Math.max(10, Math.round(20 + p * 0.8 + incomeShiftFactor));
      if (selectedGoodType === 'giffen') q = Math.max(10, Math.round(15 + p * 0.85 - incomeShiftFactor * 0.5));
      if (selectedGoodType === 'inferior') q = Math.max(5, Math.round(100 - p * 0.9 - incomeShiftFactor * 1.2));
      const s = Math.max(5, Math.round(10 + p * 1.1));
      return { price: p, qd: q, qs: s, isCurrent: Math.abs(onionPrice - p) <= 7 };
    });
  }, [incomeShiftFactor, selectedGoodType, onionPrice]);

  const farmerOfferedSupplyKg = useMemo(() => {
    if (procurementMSP <= 1500) return 200;
    const extraPrice = procurementMSP - 1500;
    const fractionToSell = Math.min(1, 0.2 + (extraPrice / 1000) * 0.8);
    const availableAfterHome = totalStockKg - householdReserveKg;
    return Math.round(fractionToSell * availableAfterHome);
  }, [procurementMSP]);

  const elasticityProfile = useMemo(() => {
    let ed = 1.0;
    let basePrice = 100;
    let baseQty = 100;

    if (elasticityItem === 'salt') {
      ed = 0.1;
      basePrice = 20;
      baseQty = 10;
    } else if (elasticityItem === 'jio') {
      ed = 1.4;
      basePrice = 200;
      baseQty = 50;
    } else {
      ed = 2.5;
      basePrice = 50000;
      baseQty = 5;
    }

    const priceChangePct = simPriceDelta;
    const qtyChangePct = -(priceChangePct * ed);
    const newPrice = basePrice * (1 + priceChangePct / 100);
    const newQty = Math.max(0, baseQty * (1 + qtyChangePct / 100));

    const oldRev = basePrice * baseQty;
    const newRev = newPrice * newQty;
    const revDeltaPct = ((newRev - oldRev) / oldRev) * 100;

    return {
      ed,
      basePrice,
      baseQty,
      newPrice: Math.round(newPrice),
      newQty: Number(newQty.toFixed(1)),
      oldRev: Math.round(oldRev),
      newRev: Math.round(newRev),
      revDeltaPct: Number(revDeltaPct.toFixed(1)),
      priceChangePct,
      qtyChangePct: Number(qtyChangePct.toFixed(1)),
    };
  }, [elasticityItem, simPriceDelta]);

  // ─── 2D CANVAS ANIMATION (MARKET DYNAMICS) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let tick = 0;

    const render = () => {
      tick += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const padding = 40;

      // Axes
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(padding, 20);
      ctx.lineTo(padding, h - padding);
      ctx.lineTo(w - 20, h - padding);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Price (₹)', padding - 30, 16);
      ctx.fillText('Quantity (Units)', w - 80, h - padding + 25);

      // Demand Curve (Red)
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const dY1 = 40;
      const dX1 = Math.max(padding + 20, padding + 20 + incomeShiftFactor * 1.5);
      const dY2 = h - padding - 20;
      const dX2 = Math.min(w - 30, w - 80 + incomeShiftFactor * 1.5);

      if (selectedGoodType === 'veblen' || selectedGoodType === 'giffen') {
        ctx.moveTo(dX1, dY2);
        ctx.lineTo(dX2, dY1);
      } else {
        ctx.moveTo(dX1, dY1);
        ctx.lineTo(dX2, dY2);
      }
      ctx.stroke();

      // Supply Curve (Emerald)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(padding + 30, h - padding - 20);
      ctx.lineTo(w - 40, 40);
      ctx.stroke();

      // Current Price Line
      const currentPriceY =
        h - padding - (onionPrice / 100) * (h - padding - 60) - 20;
      ctx.strokeStyle = '#eab308';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding, currentPriceY);
      ctx.lineTo(w - 20, currentPriceY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Demand & Supply Points
      const currentDemandX =
        padding + (liveQuantityDemanded / 120) * (w - padding - 40);
      const currentSupplyX =
        padding + (liveQuantitySupplied / 120) * (w - padding - 40);

      // Demand node
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(
        currentDemandX,
        currentPriceY,
        5 + Math.sin(tick) * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Supply node
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(
        currentSupplyX,
        currentPriceY,
        5 + Math.cos(tick) * 1.5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#fecdd3';
      ctx.fillText(`Qd: ${liveQuantityDemanded}`, currentDemandX - 15, currentPriceY - 12);
      ctx.fillStyle = '#a7f3d0';
      ctx.fillText(`Qs: ${liveQuantitySupplied}`, currentSupplyX - 15, currentPriceY + 18);

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [
    onionPrice,
    incomeShiftFactor,
    selectedGoodType,
    liveQuantityDemanded,
    liveQuantitySupplied,
  ]);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints[nextLvl - 1]) {
      setCurrentHint(challenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete step-by-step ICSE explanation.');
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant economic intuition!'
        : 'A very common intuition, but let us discover why the supply-demand intersection shifts both variables!'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Experiment with the core mechanisms.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play sandbox unlocked. Feel free to stress-test any market variable!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. Read each scenario carefully.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the slider to observe what happens.');
  }, []);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        challenge.type === 'classify' ||
        challenge.type === 'distinguish' ||
        challenge.type === 'match'
      ) {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAnswer =
          typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numAnswer - (challenge.correctAnswer || 0)) <=
          (challenge.tolerance || 0.01);
      } else if (challenge.type === 'construct') {
        isCorrect =
          (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding analysis.');
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          challenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(challenge.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Review the full explanation below.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Review your economic mastery breakdown.');
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
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base =
          prev.length === challenge.sortItems?.length
            ? [...prev]
            : challenge.sortItems?.map((_, i) => i) || [];
        const [moved] = base.splice(fromIndex, 1);
        base.splice(toIndex, 0, moved);
        return base;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleResetSimulator = useCallback(() => {
    setOnionPrice(30);
    setIncomeShiftFactor(0);
    setSelectedGoodType('normal');
    setProcurementMSP(2125);
    setSimPriceDelta(20);
    audioManager.play('pop');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              {title}
            </h1>
            <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">
              ICSE Class 10 Commercial Studies / Economic Applications
            </p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800" role="tablist">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-black">
              📊
            </div>
            <span className="inline-block px-3 py-1 bg-gold-500/20 text-gold-300 text-xs font-black uppercase rounded-full mb-3 tracking-wider">
              Real-World Narrative Context
            </span>
            <h2 className="text-2xl font-extrabold text-white mb-2">
              {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {SCENARIO.intro}
            </p>
            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-gold-900/50 text-xs text-gold-200">
              💡 <strong>Scenario Objective:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* SVG Diagram 1: Topic-specific Market Equilibrium Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-6 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                Visual Market Blueprint: Equilibrium & Market Forces
              </h3>
              <MarketEquilibriumSVG price={50} />
            </div>
            <div className="md:col-span-6 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase mb-2">
                Concept Structure: The 3 Essential Pillars of Demand
              </h3>
              <DemandTriadVennSVG />
            </div>
          </div>

          {/* Curiosity Diagnostic Question */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                Discovery Challenge (Not Graded)
              </h3>
            </div>
            <p className="text-base md:text-lg font-semibold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 border-slate-700 hover:border-emerald-500 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="ml-auto text-emerald-400 font-bold" aria-label="Correct answer">✓</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  <p
                    className={
                      discoveryCorrect
                        ? 'text-emerald-400 font-bold'
                        : 'text-amber-400 font-bold'
                    }
                  >
                    {discoveryCorrect
                      ? '✓ Spot on analysis!'
                      : '💡 Here is why this happens:'}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    {DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  aria-label="Enter Visual Labs Exploration"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-950 whitespace-nowrap"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
              Interactive Concept Discovery: Step {currentSlide + 1} of{' '}
              {EXPLORATION_STEPS.length}
            </span>
            <span className="text-xs text-slate-400">
              Node Target: {EXPLORATION_STEPS[currentSlide].nodeId}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{
                width: `${((currentSlide + 1) / EXPLORATION_STEPS.length) * 100}%`,
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl"
            >
              <div className="mb-4">
                <span className="text-xs px-2.5 py-1 bg-emerald-950 border border-emerald-700/50 text-emerald-300 font-extrabold rounded-lg uppercase">
                  {EXPLORATION_STEPS[currentSlide].title}
                </span>
                <p className="text-sm font-semibold text-amber-300 mt-2">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* STEP 0: DEMAND THREE-CONDITION SIMULATOR */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-5 space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Toggle Consumer Variables (Tata Nexon: ₹14 Lakh)
                    </h4>

                    {/* Toggle 1 */}
                    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div>
                        <p className="text-sm font-bold text-white">1. Desire</p>
                        <p className="text-xs text-slate-400">Do you want the car?</p>
                      </div>
                      <button
                        aria-label="Toggle Desire condition"
                        onClick={() => {
                          setHasDesire(!hasDesire);
                          audioManager.play('tap');
                        }}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          hasDesire ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                        }`}
                      >
                        <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-md" />
                      </button>
                    </div>

                    {/* Toggle 2 */}
                    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div>
                        <p className="text-sm font-bold text-white">2. Ability to Pay</p>
                        <p className="text-xs text-slate-400">Bank savings &gt; ₹14 Lakh?</p>
                      </div>
                      <button
                        aria-label="Toggle Ability to Pay condition"
                        onClick={() => {
                          setHasAbility(!hasAbility);
                          audioManager.play('tap');
                        }}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          hasAbility ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                        }`}
                      >
                        <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-md" />
                      </button>
                    </div>

                    {/* Toggle 3 */}
                    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <div>
                        <p className="text-sm font-bold text-white">3. Willingness to Spend</p>
                        <p className="text-xs text-slate-400">Ready to part with ₹14 Lakh now?</p>
                      </div>
                      <button
                        aria-label="Toggle Willingness to Spend condition"
                        onClick={() => {
                          setHasWillingness(!hasWillingness);
                          audioManager.play('tap');
                        }}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                          hasWillingness ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                        }`}
                      >
                        <motion.div layout className="w-4 h-4 rounded-full bg-white shadow-md" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                    <div className="relative mb-4">
                      <motion.div
                        animate={{
                          scale: hasDesire && hasAbility && hasWillingness ? [1, 1.05, 1] : 1,
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className={`w-28 h-28 rounded-3xl flex items-center justify-center text-4xl border-2 ${
                          hasDesire && hasAbility && hasWillingness
                            ? 'bg-emerald-950 border-emerald-400 shadow-xl shadow-emerald-950/80 text-emerald-300'
                            : 'bg-rose-950/40 border-rose-800 text-rose-400'
                        }`}
                      >
                        {hasDesire && hasAbility && hasWillingness ? '🚗 🛒 ✓' : '💭 ❌'}
                      </motion.div>
                    </div>
                    <h3
                      className={`text-lg font-black ${
                        hasDesire && hasAbility && hasWillingness
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {hasDesire && hasAbility && hasWillingness
                        ? 'STATUS: EFFECTIVE DEMAND CONFIRMED! [✓]'
                        : 'STATUS: MERE DESIRE / WANT [✗]'}
                    </h3>
                    <p className="text-xs text-slate-300 max-w-md mt-2">
                      {hasDesire && hasAbility && hasWillingness
                        ? 'All 3 conditions met: The consumer enters the market and purchases the car. Real economic demand created!'
                        : 'Unless Desire, Ability to Pay, and Willingness to Pay are ALL present simultaneously, no economic demand exists.'}
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 1: LAW OF DEMAND & MULTI-REPRESENTATION */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Slider Header */}
                  <div className="flex flex-wrap items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 gap-4">
                    <div className="w-full md:w-1/2">
                      <div className="flex justify-between text-xs font-bold text-slate-400 mb-1">
                        <span>Lasalgaon Mandi Onion Price</span>
                        <span className="text-emerald-400 text-sm">₹{onionPrice} / kg</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Adjust onion price slider"
                        min={10}
                        max={90}
                        value={onionPrice}
                        onChange={(e) => {
                          setOnionPrice(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Monthly Household Buy</p>
                        <p className="text-lg font-black text-rose-400">
                          {liveQuantityDemanded} kg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400">Monthly Bill</p>
                        <p className="text-lg font-black text-amber-300">
                          ₹{onionPrice * liveQuantityDemanded}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MULTI-REPRESENTATION SWITCHER */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      📊 Multi-Representation System (3 Synchronized Views):
                    </span>
                    <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800" role="tablist">
                      {[
                        { id: 'all', label: 'All 3 Views' },
                        { id: 'schedule', label: '1. Schedule Table' },
                        { id: 'curve', label: '2. Geometric Curve' },
                        { id: 'equation', label: '3. Algebraic Eq.' },
                      ].map((view) => (
                        <button
                          key={view.id}
                          role="tab"
                          aria-selected={repView === view.id}
                          aria-label={`Show ${view.label}`}
                          onClick={() => setRepView(view.id as any)}
                          className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-all ${
                            repView === view.id
                              ? 'bg-emerald-600 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {view.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Multi-Representation Views Display */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* View 1: Tabular Demand Schedule */}
                    {(repView === 'all' || repView === 'schedule') && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2 flex items-center justify-between">
                          <span>Representation 1: Schedule</span>
                          <span className="text-[10px] text-slate-400">Tabular Form</span>
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-300" aria-label="Individual demand schedule table">
                            <thead>
                              <tr className="border-b border-slate-800 text-slate-400">
                                <th className="pb-1">Price (₹)</th>
                                <th className="pb-1 text-rose-400">Qd (kg)</th>
                                <th className="pb-1 text-emerald-400">Qs (kg)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {demandScheduleData.map((row) => (
                                <tr
                                  key={row.price}
                                  className={`border-b border-slate-900 ${
                                    row.isCurrent
                                      ? 'bg-emerald-950/80 font-bold text-white'
                                      : ''
                                  }`}
                                >
                                  <td className="py-1">₹{row.price}</td>
                                  <td className="py-1 text-rose-300">{row.qd}</td>
                                  <td className="py-1 text-emerald-300">{row.qs}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* View 2: Geometric Visual Curve */}
                    {(repView === 'all' || repView === 'curve') && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-rose-400 uppercase mb-2 flex items-center justify-between">
                          <span>Representation 2: Geometric Curve</span>
                          <span className="text-[10px] text-slate-400">Graphical Form</span>
                        </h4>
                        <MarketEquilibriumSVG price={onionPrice} />
                      </div>
                    )}

                    {/* View 3: Algebraic Mathematical Equation */}
                    {(repView === 'all' || repView === 'equation') && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-gold-400 uppercase mb-2 flex items-center justify-between">
                            <span>Representation 3: Algebraic Model</span>
                            <span className="text-[10px] text-slate-400">Equation Form</span>
                          </h4>
                          <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs space-y-1.5 text-gold-200">
                            <p><strong>Demand Function:</strong> Qd = 110 - 1.1·(P) + {incomeShiftFactor}</p>
                            <p><strong>At Price = ₹{onionPrice}:</strong></p>
                            <p className="text-rose-300">Qd = 110 - (1.1 × {onionPrice}) + {incomeShiftFactor} = <strong>{liveQuantityDemanded} Units</strong></p>
                          </div>
                        </div>
                        <div className="p-2 bg-gold-950/40 rounded-lg text-[11px] text-gold-300 mt-2">
                          💡 <strong>ICSE Insight:</strong> Inverse slope = -1.1 shows downward sloping law of demand.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: MOVEMENT VS SHIFT */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 border border-gold-800 rounded-xl">
                      <p className="text-sm font-bold text-white mb-2">
                        {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 bg-slate-900 border border-slate-700 text-left text-xs rounded-lg text-slate-200 hover:border-emerald-500"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Movement vs Shift SVG Diagram */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                        Movement along D1 vs Shift to D2/D3
                      </h4>
                      <MovementVsShiftSVG shift={incomeShiftFactor} />
                    </div>

                    <div className="space-y-3">
                      {/* Control 1: Price (Movement) */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase mb-1">
                          Movement Along Curve (Own Price)
                        </h4>
                        <input
                          type="range"
                          aria-label="Adjust own price to see movement along curve"
                          min={10}
                          max={90}
                          value={onionPrice}
                          onChange={(e) => {
                            setOnionPrice(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-emerald-500"
                        />
                        <div className="flex justify-between text-xs text-slate-300 mt-1">
                          <span>Price: ₹{onionPrice}</span>
                          <span className="text-emerald-400 font-bold">
                            {onionPrice > 50 ? 'Contraction (Upward)' : 'Expansion (Downward)'}
                          </span>
                        </div>
                      </div>

                      {/* Control 2: Income / Subsidy (Shift) */}
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <h4 className="text-xs font-bold text-gold-400 uppercase mb-1">
                          Shift of the Curve (PM-Kisan Direct Benefit)
                        </h4>
                        <input
                          type="range"
                          aria-label="Adjust consumer income shock to see shift of curve"
                          min={-30}
                          max={30}
                          value={incomeShiftFactor}
                          onChange={(e) => {
                            setIncomeShiftFactor(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-gold-500"
                        />
                        <div className="flex justify-between text-xs text-slate-300 mt-1">
                          <span>Income Shock: {incomeShiftFactor > 0 ? '+' : ''}{incomeShiftFactor}%</span>
                          <span className="font-bold text-gold-300">
                            {incomeShiftFactor > 0
                              ? 'Rightward Shift (Increase)'
                              : incomeShiftFactor < 0
                              ? 'Leftward Shift (Decrease)'
                              : 'Baseline D1'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                    <span>
                      📊 <strong>Key Rule:</strong> Price changes = Movement on D1. Income / Tastes = Shift to D2.
                    </span>
                    <button
                      aria-label="Reset simulation variables"
                      onClick={handleResetSimulator}
                      className="px-3 py-1 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 text-xs"
                    >
                      Reset Variables
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: PUNJAB WHEAT HARVEST (STOCK VS SUPPLY) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                      <span>FCI Minimum Support Price (MSP) per Quintal</span>
                      <span className="text-emerald-400 font-black">
                        ₹{procurementMSP} / quintal
                      </span>
                    </div>
                    <input
                      type="range"
                      aria-label="Adjust FCI procurement price"
                      min={1500}
                      max={2500}
                      step={25}
                      value={procurementMSP}
                      onChange={(e) => {
                        setProcurementMSP(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-2xl">🌾</span>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mt-1">
                        Total Harvest Stock
                      </h4>
                      <p className="text-xl font-black text-white mt-1">{totalStockKg} kg</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Total quantity physically available in barn.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-2xl">🏠</span>
                      <h4 className="text-xs font-bold text-amber-400 uppercase mt-1">
                        Household Reserve
                      </h4>
                      <p className="text-xl font-black text-amber-300 mt-1">{householdReserveKg} kg</p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Retained for food, cattle feed, seed (Not for sale).
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-emerald-900/60 bg-emerald-950/20">
                      <span className="text-2xl">🚚</span>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase mt-1">
                        Active Market Supply
                      </h4>
                      <p className="text-xl font-black text-emerald-300 mt-1">{farmerOfferedSupplyKg} kg</p>
                      <p className="text-[11px] text-emerald-400/80 mt-1">
                        Offered to FCI Mandi at ₹{procurementMSP}/q.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-900/40 text-xs text-gold-200">
                    💡 <strong>Economic Rule:</strong> Stock ≥ Supply. Supply changes as MSP rises, but the physical harvest stock is fixed in the short run!
                  </div>
                </div>
              )}

              {/* STEP 4: PRICE ELASTICITY GAUGE & REVENUE */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-2" role="group" aria-label="Select commodity sector">
                    {[
                      { id: 'salt', label: 'Tata Salt (Inelastic, Ed=0.1)' },
                      { id: 'jio', label: 'Jio Mobile Data (Elastic, Ed=1.4)' },
                      { id: 'gold', label: 'Gold Jewellery (Hyper-Elastic, Ed=2.5)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        aria-label={`Select ${item.label}`}
                        onClick={() => {
                          setElasticityItem(item.id as any);
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                          elasticityItem === item.id
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                      <span>Simulated Price Change</span>
                      <span className="text-emerald-400">
                        {simPriceDelta > 0 ? '+' : ''}{simPriceDelta}%
                      </span>
                    </div>
                    <input
                      type="range"
                      aria-label="Simulate price percentage change"
                      min={-40}
                      max={40}
                      value={simPriceDelta}
                      onChange={(e) => {
                        setSimPriceDelta(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Price Adjusted</p>
                      <p className="text-base font-black text-white">₹{elasticityProfile.newPrice}</p>
                      <p className="text-[10px] text-slate-400">From ₹{elasticityProfile.basePrice}</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Quantity Sold</p>
                      <p className="text-base font-black text-rose-400">{elasticityProfile.newQty}</p>
                      <p className="text-[10px] text-rose-300">Δ {elasticityProfile.qtyChangePct}%</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Elasticity Type</p>
                      <p
                        className={`text-sm font-black ${
                          elasticityProfile.ed < 1 ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {elasticityProfile.ed < 1 ? 'Inelastic (Ed < 1)' : 'Elastic (Ed > 1)'}
                      </p>
                      <p className="text-[10px] text-slate-400">Ed = {elasticityProfile.ed}</p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-[11px] text-slate-400">Total Revenue</p>
                      <p
                        className={`text-base font-black ${
                          elasticityProfile.revDeltaPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        ₹{elasticityProfile.newRev}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {elasticityProfile.revDeltaPct >= 0 ? '▲ [✓]' : '▼ [✗]'}{' '}
                        {elasticityProfile.revDeltaPct}%
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Prev / Next Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl font-bold text-xs"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-bold">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Advance to next visual lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-950"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open free interactive sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-950"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>🧪</span> Interactive Economics Sandbox
              </h3>
              <p className="text-xs text-slate-400">
                Manipulate any market determinant. No grading, no pressure.
              </p>
            </div>
            <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800" role="tablist">
              {[
                { id: 'equilibrium', label: 'Equilibrium & Curves' },
                { id: 'shifts', label: 'Exceptions (Veblen/Giffen)' },
                { id: 'elasticity', label: 'Elasticity Live Meter' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={sandboxTab === tab.id}
                  aria-label={`Open ${tab.label} tab`}
                  onClick={() => {
                    setSandboxTab(tab.id as any);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    sandboxTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {sandboxTab === 'equilibrium' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="lg:col-span-5 space-y-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase">
                  Market Determinants
                </h4>
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Market Price</span>
                    <span className="text-emerald-400 font-bold">₹{onionPrice}</span>
                  </div>
                  <input
                    type="range"
                    aria-label="Adjust market price in sandbox"
                    min={10}
                    max={90}
                    value={onionPrice}
                    onChange={(e) => setOnionPrice(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Demand Shift (Income / Taste)</span>
                    <span className="text-gold-400 font-bold">
                      {incomeShiftFactor > 0 ? '+' : ''}{incomeShiftFactor}
                    </span>
                  </div>
                  <input
                    type="range"
                    aria-label="Adjust demand shift in sandbox"
                    min={-30}
                    max={30}
                    value={incomeShiftFactor}
                    onChange={(e) => setIncomeShiftFactor(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Quantity Demanded:</span>
                    <span className="text-rose-400 font-bold">{liveQuantityDemanded}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Quantity Supplied:</span>
                    <span className="text-emerald-400 font-bold">{liveQuantitySupplied}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1 border-t border-slate-800">
                    <span className="text-slate-300">Market Status:</span>
                    <span
                      className={`font-black ${
                        marketSurplusOrShortage > 0
                          ? 'text-amber-400'
                          : marketSurplusOrShortage < 0
                          ? 'text-rose-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {marketSurplusOrShortage > 0
                        ? `Surplus (${marketSurplusOrShortage} Units) [▲]`
                        : marketSurplusOrShortage < 0
                        ? `Shortage (${Math.abs(marketSurplusOrShortage)} Units) [▼]`
                        : 'Perfect Equilibrium! [✓]'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                <canvas
                  ref={canvasRef}
                  width={450}
                  height={220}
                  className="w-full h-52 rounded-lg bg-slate-900/40"
                  aria-label="Live animated market equilibrium chart"
                />
              </div>
            </div>
          )}

          {sandboxTab === 'shifts' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase">
                Select Good Type to Observe Curve Slope:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'normal', name: 'Standard Normal Good', slope: 'Downward Slope' },
                  { id: 'inferior', name: 'Inferior Good (Bajra)', slope: 'Downward Slope' },
                  { id: 'veblen', name: 'Veblen Luxury (Mercedes)', slope: 'Upward Slope!' },
                  { id: 'giffen', name: 'Giffen Staple (Extreme)', slope: 'Upward Slope!' },
                ].map((gt) => (
                  <button
                    key={gt.id}
                    aria-label={`Select good type: ${gt.name}`}
                    onClick={() => {
                      setSelectedGoodType(gt.id as any);
                      audioManager.play('tap');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedGoodType === gt.id
                        ? 'bg-gold-950 border-gold-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <p className="text-xs font-bold">{gt.name}</p>
                    <p className="text-[10px] text-gold-300 mt-1">{gt.slope}</p>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                {selectedGoodType === 'veblen' && (
                  <p>
                    👑 <strong>Veblen Conspicuous Consumption:</strong> As price rises, exclusivity rises, inducing wealthy buyers to buy MORE. Demand curve slopes UPWARD.
                  </p>
                )}
                {selectedGoodType === 'giffen' && (
                  <p>
                    🍞 <strong>Giffen Paradox:</strong> Massive real income loss forces destitute families to buy more cheap calories when price rises. Demand curve slopes UPWARD.
                  </p>
                )}
                {selectedGoodType === 'normal' && (
                  <p>
                    📦 <strong>Normal Good:</strong> Price and quantity demanded move inversely. Standard downward sloping demand curve.
                  </p>
                )}
                {selectedGoodType === 'inferior' && (
                  <p>
                    📉 <strong>Inferior Good:</strong> Obeys own-price law of demand, but shifts LEFTWARD when consumer income increases.
                  </p>
                )}
              </div>
            </div>
          )}

          {sandboxTab === 'elasticity' && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Elasticity Sensitivity Calculator
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  Ed Formula: |%ΔQ / %ΔP|
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">1. Select Sector:</span>
                  <select
                    aria-label="Select sector for elasticity meter"
                    value={elasticityItem}
                    onChange={(e) => setElasticityItem(e.target.value as any)}
                    className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                  >
                    <option value="salt">Tata Salt (Necessity)</option>
                    <option value="jio">Reliance Jio (Telecom Data)</option>
                    <option value="gold">Titan Jewellery (Luxury)</option>
                  </select>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">
                    2. Price Change: {simPriceDelta}%
                  </span>
                  <input
                    type="range"
                    aria-label="Change simulated price delta"
                    min={-40}
                    max={40}
                    value={simPriceDelta}
                    onChange={(e) => setSimPriceDelta(Number(e.target.value))}
                    className="w-full mt-3 accent-emerald-500"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400">3. Revenue Delta:</span>
                  <p
                    className={`text-xl font-black mt-1 ${
                      elasticityProfile.revDeltaPct >= 0
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {elasticityProfile.revDeltaPct > 0 ? '+' : ''}
                    {elasticityProfile.revDeltaPct}%
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {elasticityProfile.ed > 1
                      ? 'Price Hike Cuts Total Revenue [✗]'
                      : 'Price Hike Boosts Total Revenue [✓]'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <motion.button
              aria-label="Proceed to ICSE Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-950"
            >
              Ready for ICSE Challenges! 🚀
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-gold-950 text-gold-300 border border-gold-800">
                  {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5">
                Target Node: {challenge.nodeId}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 text-xs font-black rounded-xl uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                    : 'bg-gold-950 text-gold-400 border border-gold-800'
                }`}
              >
                {difficulty}
              </motion.span>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Score</p>
                <p className="text-sm font-black text-emerald-400">
                  {Math.max(0, 100 - errors * 5)}%
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{
                width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
              }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Types */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold shadow-lg shadow-emerald-950'
                          : 'bg-slate-950/80 border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-xs flex items-center justify-center font-bold flex-shrink-0 text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                        {showExplanation && i === challenge.correctIndex && (
                          <span className="ml-auto text-emerald-400 font-black" aria-label="Correct">[✓]</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">
                    Drag items:
                  </span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg cursor-grab text-xs font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'box_joint', title: 'Joint Demand Box' },
                    { id: 'box_derived', title: 'Derived Demand Box' },
                    { id: 'box_composite', title: 'Composite Demand Box' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      aria-label={`Dropzone for ${target.title}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                    >
                      <span className="text-[11px] font-bold text-slate-400">
                        {target.title}
                      </span>
                      <div className="p-2 bg-slate-900 rounded-lg text-center text-xs font-black text-emerald-300">
                        {droppedLabels[target.id] ? `${droppedLabels[target.id]} [✓]` : 'Drop matching item here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Drag items up/down to reorder from Lowest to Highest Elasticity:
                </p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      aria-label={`Item ${idx + 1}: ${item}. Drag to reorder`}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between cursor-grab text-xs font-semibold text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-bold text-emerald-400">
                          {idx + 1}
                        </span>
                        {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Check sort sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Enter numerical calculation answer"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter exact number"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-emerald-500 outline-none"
                  />
                  <span className="text-sm font-bold text-slate-400">
                    {challenge.unit}
                  </span>
                  <motion.button
                    aria-label="Submit calculation answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={!numericInput || showExplanation}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-950 disabled:opacity-50"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add building block: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-950 border border-gold-800 text-gold-200 rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-900 border border-emerald-600 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        aria-label={`Remove part: ${p}`}
                        onClick={() =>
                          setConstructParts((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="text-rose-400 hover:text-white ml-1 font-black"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">
                      Click building blocks above in proper chronological order...
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    aria-label="Verify constructed sequence"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Sequence
                  </motion.button>
                  <button
                    aria-label="Clear construction parts"
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}

            {/* Explanation disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                    📖 Step-by-Step ICSE Solution
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {
                      challenge.explanation
                        .split('. ')
                        .filter((s) => s.trim().length > 0).length
                    }
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-amber-100 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">
                          {idx + 1}.
                        </span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0).length -
                    1 ? (
                    <motion.button
                      aria-label="Show next explanation point"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >=
                    challenge.explanation
                      .split('. ')
                      .filter((s) => s.trim().length > 0).length -
                      1 && (
                    <motion.button
                      aria-label="Advance to next challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Simulation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MANDATORY REFLECTION SECTION ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Header Score Card */}
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-800 text-center relative overflow-hidden">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
              Simulation Complete!
            </h2>
            <p className="text-sm text-emerald-400 font-semibold mt-1">
              Final Commercial Mastery Score: {Math.max(0, 100 - errors * 5)}%
            </p>

            <div className="mt-4 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 max-w-xl mx-auto text-xs text-slate-300">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered all 10 Demand & Supply nodes for CISCE 2026!'
                : errors <= 3
                ? '👏 Excellent work! Your grasp of market curves and elasticity is near perfect.'
                : '💪 Good foundational effort! Review the misconception profile below to clear remaining conceptual traps.'}
            </div>
          </div>

          {/* ─── PROMINENT SPACED REPETITION SYSTEM (SRS) VISIBILITY BANNER ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 rounded-3xl border-2 border-amber-500/70 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-xl">
                  📅
                </div>
                <div>
                  <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase">
                    Spaced Repetition System (SRS) Active
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Next Scheduled Review Target
                  </h3>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/20 uppercase tracking-wide">
                {errors === 0
                  ? 'Review in 7 Days'
                  : errors <= 3
                  ? 'Review in 3 Days'
                  : 'Review in 1 Day'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div
                className={`p-3 rounded-xl border text-xs ${
                  errors === 0
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>0 Errors (Perfect)</span>
                  {errors === 0 && <span>✓ Active</span>}
                </div>
                <p className="text-[11px] mt-1">Review in 7 days (Optimal long-term consolidation)</p>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  errors >= 1 && errors <= 3
                    ? 'bg-amber-950/70 border-amber-500 text-amber-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>1–3 Errors (Moderate)</span>
                  {errors >= 1 && errors <= 3 && <span>✓ Active</span>}
                </div>
                <p className="text-[11px] mt-1">Review in 3 days (Reinforce weak connections)</p>
              </div>

              <div
                className={`p-3 rounded-xl border text-xs ${
                  errors >= 4
                    ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>4+ Errors (Needs Review)</span>
                  {errors >= 4 && <span>✓ Active</span>}
                </div>
                <p className="text-[11px] mt-1">Review in 1 day (Immediate spaced repetition refresh)</p>
              </div>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/60 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-sm font-black text-gold-300 uppercase tracking-wider">
                Post-Simulation Deep Reflection
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Synthesize what you discovered across demand curves, shifts, stock vs supply, and price elasticity.
            </p>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>1.</span> What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  value={reflectionAnswers.surprising}
                  onChange={(e) =>
                    setReflectionAnswers((prev) => ({ ...prev, surprising: e.target.value }))
                  }
                  placeholder="E.g., How Giffen and Veblen goods make the demand curve slope upward, or why stock does not equal supply..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-gold-500 outline-none resize-none h-16"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>2.</span> How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="Reflection: How would you explain this to a friend?"
                  value={reflectionAnswers.explainFriend}
                  onChange={(e) =>
                    setReflectionAnswers((prev) => ({ ...prev, explainFriend: e.target.value }))
                  }
                  placeholder="E.g., Price changes move you on the same roller-coaster track, but an income bonus builds an entirely new track to the right..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-gold-500 outline-none resize-none h-16"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                  <span>3.</span> Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Reflection: Where in real life might you use this?"
                  value={reflectionAnswers.realLife}
                  onChange={(e) =>
                    setReflectionAnswers((prev) => ({ ...prev, realLife: e.target.value }))
                  }
                  placeholder="E.g., Pricing products for a startup, understanding why onion prices surge after rains, or evaluating petrol taxes..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-gold-500 outline-none resize-none h-16"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <motion.button
                  aria-label="Save reflection responses"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setReflectionSaved(true);
                    audioManager.play('success');
                  }}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  {reflectionSaved ? 'Reflections Saved [✓]' : 'Submit Reflections'}
                </motion.button>
                {reflectionSaved && (
                  <span className="text-xs text-emerald-400 font-bold">
                    ✓ Recorded into your study portfolio!
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-black text-rose-300 uppercase tracking-wider">
                ⚠️ Your Targeted Conceptual Review List:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Trap [✗]: {m.misconception}</p>
                      <p className="text-emerald-300 font-semibold mt-1">✓ Correct Rule [✓]: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Quick Actions Banner */}
          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
                🧠 SRS Memory Review Status
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Your SRS flashcard intervals have been synced. Come back in{' '}
                <strong className="text-amber-300">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                to maintain mastery retention.
              </p>
            </div>
            <button
              aria-label="Replay visual labs"
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                audioManager.play('tap');
              }}
              className="px-4 py-2 bg-slate-800 text-xs font-bold text-white rounded-xl hover:bg-slate-700 whitespace-nowrap"
            >
              Replay Visual Labs
            </button>
          </div>

          {/* Real World Policy Memo Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-black text-gold-300 uppercase tracking-wider">
              📝 Real-World Policy Memo Assignment
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400"
                >
                  <strong className="text-emerald-400 mr-1">{i + 1}.</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && (
        <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />
      )}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && (
        <SuccessBanner
          message="Economic Concept Mastered!"
          onComplete={() => setShowSuccess(false)}
        />
      )}
      {showSparkle && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setShowSparkle(false)}
        />
      )}
    </div>
  );
}

export default C10_EconApplicationsDemandMeaningTypesSim;