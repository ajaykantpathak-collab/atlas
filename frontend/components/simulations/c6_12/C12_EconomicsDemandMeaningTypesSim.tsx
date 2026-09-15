'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 12 Economics: Demand & Consumer Behavior) ───
const NODE_C12_ECON_001 = 'c12_econ_001'; // Meaning & Types of Demand
const NODE_C12_ECON_002 = 'c12_econ_002'; // Demand Function & Determinants
const NODE_C12_ECON_003 = 'c12_econ_003'; // Law of Demand & Reasons for Downward Slope
const NODE_C12_ECON_004 = 'c12_econ_004'; // Demand Schedule & Graphical Derivation
const NODE_C12_ECON_005 = 'c12_econ_005'; // Market Demand Derivation via Horizontal Summation
const NODE_C12_ECON_006 = 'c12_econ_006'; // Movement Along vs Shift of Demand Curve
const NODE_C12_ECON_007 = 'c12_econ_007'; // Exceptions to Law of Demand (Giffen, Veblen, etc.)
const NODE_C12_ECON_008 = 'c12_econ_008'; // Cardinal Utility: TU, MU, and TU-MU Relationship
const NODE_C12_ECON_009 = 'c12_econ_009'; // Law of Diminishing Marginal Utility (LDMU)
const NODE_C12_ECON_010 = 'c12_econ_010'; // Consumer Equilibrium (One Commodity: MUx/Px = MUm)

const ALL_NODE_IDS = [
  NODE_C12_ECON_001,
  NODE_C12_ECON_002,
  NODE_C12_ECON_003,
  NODE_C12_ECON_004,
  NODE_C12_ECON_005,
  NODE_C12_ECON_006,
  NODE_C12_ECON_007,
  NODE_C12_ECON_008,
  NODE_C12_ECON_009,
  NODE_C12_ECON_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Great Indian Canteen Dilemma',
  intro: 'You are the chief economic strategist for "Desi Delight Canteens", operating across Delhi University campuses and corporate hubs in Bengaluru. Price shocks, monsoon disruptions in tomatoes, festive gold rushes, and changing student pocket allowances are challenging your pricing decisions.',
  context: 'To maximise customer satisfaction and business stability, you must master the mechanics of demand functions, demand curve movements vs shifts, utility curves, diminishing marginal satisfaction, and consumer equilibrium.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Ravi has ₹20 in his pocket and strongly desires a ₹500 pizza. Simultaneously, Ananya has ₹50,000 in her bank account, can easily afford a ₹500 pizza, but hates pizza and refuses to buy it. Who has an "Economic Demand" for pizza?',
  options: [
    'Ravi — because strong desire is the root of demand',
    'Ananya — because she has ample purchasing power',
    'Both — because between them they have desire and ability',
    'Neither — economic demand strictly requires desire, ability to pay, AND willingness to pay simultaneously',
  ],
  correctIndex: 3,
  hintAfter: 'In Economics, demand is never a mere wish or idle wealth. Let us discover the three pillars of economic demand!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Aligned) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001_c12_001',
    nodeId: NODE_C12_ECON_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Tata Motors purchases 10,000 tonnes of steel sheets from JSW Steel solely to manufacture Nexon cars. What type of demand is this?',
    options: ['Direct Demand', 'Derived Demand', 'Composite Demand', 'Autonomous Demand'],
    correctIndex: 1,
    explanation: 'Steel is demanded not for its own direct consumption, but because passenger cars are demanded. Demand for an input derived from the demand for the final output is Derived Demand.',
    hints: [
      'Ask: Does the consumer directly enjoy using raw steel sheets, or is it needed to manufacture something else?',
      'The demand for steel arises from the demand for cars.',
      'When demand for a good is derived from demand for the final good it produces, it is called Derived Demand.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_c12_001',
    nodeId: NODE_C12_ECON_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Electricity in India is demanded for lighting homes, powering factory machinery, running agricultural pump sets, and charging EVs. What type of demand does electricity represent?',
    options: ['Joint Demand', 'Composite Demand', 'Direct Demand', 'Induced Demand'],
    correctIndex: 1,
    explanation: 'When a single commodity has multiple distinct uses and can be put to several independent purposes, it has Composite Demand.',
    hints: [
      'Remember the test: "Many goods for one purpose" vs "One good for many purposes".',
      'Joint demand is many goods for one use (tea + milk for chai).',
      'Here, ONE commodity (electricity) serves multiple distinct uses — hence Composite Demand.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_c12_002',
    nodeId: NODE_C12_ECON_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the formal demand function Dx = f(Px, Y, Pr, T, E, O), what does the term "Pr" specifically represent?',
    options: [
      'Price of related goods (both substitutes and complements)',
      'Profit rate of the producing firm',
      'Production capacity of the industry',
      'Public relations and advertising expenditure',
    ],
    correctIndex: 0,
    explanation: 'In the demand function, Pr stands for the price of related goods, which includes substitute goods (like tea and coffee) and complementary goods (like petrol and cars).',
    hints: [
      'Look at the letter "r" — it denotes a relationship between goods.',
      'It relates to how coffee prices affect tea, or petrol prices affect car demand.',
      'Pr is the Price of Related goods.',
    ],
  },
  {
    id: 'ch_004_c12_003',
    nodeId: NODE_C12_ECON_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Alfred Marshall convention in economics, which variable is placed on the vertical Y-axis and which on the horizontal X-axis when plotting a demand curve?',
    options: [
      'Y-axis: Quantity Demanded; X-axis: Price',
      'Y-axis: Price; X-axis: Quantity Demanded',
      'Y-axis: Consumer Income; X-axis: Price',
      'Y-axis: Total Utility; X-axis: Marginal Utility',
    ],
    correctIndex: 1,
    explanation: 'By the Marshallian convention (established in Marshall\'s 1890 Principles of Economics), Price is plotted on the vertical Y-axis and Quantity Demanded is on the horizontal X-axis.',
    hints: [
      'Think about how Indian economics textbooks label the axes.',
      'Price (₹) goes vertically, quantity units go horizontally.',
      'Vertical Y-axis = Price; Horizontal X-axis = Quantity Demanded.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_005_c12_004',
    nodeId: NODE_C12_ECON_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct economic labels to complete the individual demand schedule analysis.',
    dragItems: [
      { label: 'High Price / Low Quantity', targetId: 'top_left_point' },
      { label: 'Low Price / High Quantity', targetId: 'bottom_right_point' },
      { label: 'Downward Slope (Inverse Law)', targetId: 'curve_trajectory' },
    ],
    correctMapping: {
      top_left_point: 'High Price / Low Quantity',
      bottom_right_point: 'Low Price / High Quantity',
      curve_trajectory: 'Downward Slope (Inverse Law)',
    },
    explanation: 'A demand curve connects points of high price and low quantity (top-left) to low price and high quantity (bottom-right), demonstrating an inverse downward slope under ceteris paribus.',
    hints: [
      'At the top of the Y-axis, price is highest, so buyers purchase the fewest units.',
      'At the bottom of the Y-axis, price is lowest, so buyers purchase the most units.',
      'Connecting these creates the downward-sloping demand curve DD.',
    ],
  },
  {
    id: 'ch_006_c12_008',
    nodeId: NODE_C12_ECON_008,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A student drinks cutting chais. Total Utility (TU) after 2 cups is 22 utils, and TU after 3 cups is 28 utils. What is the Marginal Utility (MU) of the 3rd cup?',
    correctAnswer: 6,
    tolerance: 0.1,
    unit: 'utils',
    explanation: 'Marginal Utility is the change in Total Utility: MU3 = TU3 - TU2 = 28 - 22 = 6 utils.',
    hints: [
      'Use the formula: MU = TUn - TUn-1.',
      'Subtract the previous total utility (22) from the current total utility (28).',
      '28 - 22 = 6 utils.',
    ],
  },
  {
    id: 'ch_007_c12_008',
    nodeId: NODE_C12_ECON_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When Marginal Utility (MU) reaches exactly ZERO, what happens to Total Utility (TU)?',
    options: [
      'Total Utility is at its MAXIMUM (Saturation Point)',
      'Total Utility is also ZERO',
      'Total Utility is falling rapidly',
      'Total Utility is negative',
    ],
    correctIndex: 0,
    explanation: 'When MU = 0, the consumer derives no extra utility from an additional unit. Therefore, Total Utility stops rising and reaches its absolute peak — the Saturation Point.',
    hints: [
      'As long as MU is positive, TU is rising.',
      'When MU becomes zero, nothing is added to the total.',
      'Hence TU is at its maximum (saturation).',
    ],
  },
  {
    id: 'ch_008_c12_005',
    nodeId: NODE_C12_ECON_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a small village, at ₹600/cylinder, Household A demands 3 LPG cylinders, Household B demands 2, and Household C demands 4. What is the Market Demand at ₹600?',
    correctAnswer: 9,
    tolerance: 0,
    unit: 'cylinders',
    explanation: 'Market demand is the horizontal summation of individual quantities at a given price: Qm = QA + QB + QC = 3 + 2 + 4 = 9 cylinders.',
    hints: [
      'Horizontal summation means adding the quantities demanded by all households at that exact price.',
      'Do not add prices; add the cylinder quantities: 3 + 2 + 4.',
      'Total market demand is 9 cylinders.',
    ],
  },
  {
    id: 'ch_009_c12_005',
    nodeId: NODE_C12_ECON_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Market Demand Curve generally flatter (more price-elastic) than individual demand curves?',
    options: [
      'Because market demand adds individual quantities horizontally, resulting in a larger aggregate quantity response for any given price change',
      'Because market demand adds prices vertically, making the slope mathematically steeper',
      'Because market demand ignores consumer income completely',
      'Because all individual consumers have identical tastes',
    ],
    correctIndex: 0,
    explanation: 'When price changes by ΔP, every active individual adjusts quantity. The market response is the sum of all individual ΔQ changes. A larger horizontal change for the same vertical price change makes the market curve flatter.',
    hints: [
      'Think about horizontal summation on the X-axis.',
      'For a ₹10 price drop, Person A buys +2, Person B buys +3, Market buys +5.',
      'A wider horizontal stretch for the same vertical drop makes the slope flatter.',
    ],
  },
  {
    id: 'ch_010_c12_006',
    nodeId: NODE_C12_ECON_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Scenario 1: Petrol price in Delhi rises from ₹90 to ₹100/litre, and commuters buy less petrol.\nScenario 2: Central DA hike increases government employees\' salaries, and they buy more cars at ₹8 lakh.\nClassify both events correctly.',
    options: [
      'Scenario 1: Movement along curve (Contraction); Scenario 2: Shift of demand curve (Rightward shift)',
      'Scenario 1: Shift of curve (Leftward); Scenario 2: Movement along curve (Expansion)',
      'Both scenarios are movements along their respective demand curves',
      'Both scenarios are shifts of their respective demand curves',
    ],
    correctIndex: 0,
    explanation: 'In Scenario 1, the good\'s own price changed (Px ↑ → Contraction along DD). In Scenario 2, a non-price determinant (Income Y ↑) changed, causing a Rightward Shift of the entire car demand curve.',
    hints: [
      'Ask the golden diagnostic question: "Did the good\'s OWN price change, or did something else change?"',
      'Scenario 1: Petrol price itself changed → Movement along curve.',
      'Scenario 2: Salary/Income changed at constant car price → Shift of curve.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_011_c12_006',
    nodeId: NODE_C12_ECON_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For an Inferior Good (like coarse cereal jowar/bajra), what happens to the demand curve when rural household incomes rise through PM-KISAN transfers?',
    options: [
      'The demand curve shifts LEFTWARD (demand decreases at every price)',
      'The demand curve shifts RIGHTWARD (demand increases at every price)',
      'There is a downward movement (expansion) along the same demand curve',
      'The demand curve becomes vertical',
    ],
    correctIndex: 0,
    explanation: 'By definition, an inferior good has a negative income effect. As incomes rise, consumers upgrade to superior staples (wheat/rice), causing the demand curve for the inferior good to shift leftward.',
    hints: [
      'Remember: "Inferior" in economics is defined by how demand responds to INCOME, not poor quality.',
      'When poor families get more income, do they buy more coarse grains or switch to basmati rice/wheat?',
      'Higher income reduces demand for inferior goods → Leftward shift.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_012_c12_009',
    nodeId: NODE_C12_ECON_009,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of consumer psychological states as successive glasses of water are consumed on a hot day (Law of Diminishing Marginal Utility):',
    sortItems: [
      'High positive Marginal Utility (Intense thirst relief)',
      'Diminishing positive Marginal Utility (Thirst partially satisfied)',
      'Zero Marginal Utility (Saturation / Full satiation)',
      'Negative Marginal Utility (Disutility / Discomfort & nausea)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Under LDMU, consumption starts with high MU, transitions into diminishing positive MU, hits zero at the saturation point, and becomes negative disutility if forced further.',
    hints: [
      'First unit gives the maximum relief.',
      'Successive units give progressively lower positive satisfaction.',
      'When completely full, MU is zero. Beyond that, over-drinking causes negative utility.',
    ],
  },
  {
    id: 'ch_013_c12_009',
    nodeId: NODE_C12_ECON_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Which of the following scenarios violates an essential assumption of the Law of Diminishing Marginal Utility, causing MU to apparently increase rather than decrease?',
    options: [
      'A person drinking small sips of water at 3-hour intervals rather than continuous glasses',
      'A person drinking identical glasses of mineral water in one sitting',
      'A person consuming standard 200ml cups of tea continuously',
      'A rational consumer seeking to maximise net satisfaction',
    ],
    correctIndex: 0,
    explanation: 'LDMU strictly assumes continuous consumption. If large time gaps occur (e.g. 3 hours), thirst returns, violating the continuous consumption assumption and preventing MU from diminishing continuously.',
    hints: [
      'Check the 7 assumptions of LDMU: homogeneous units, continuous consumption, rational consumer, etc.',
      'If you drink water at 9 AM and then at 1 PM, thirst has returned.',
      'Discontinuous consumption breaks the law.',
    ],
  },
  {
    id: 'ch_014_c12_010',
    nodeId: NODE_C12_ECON_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A samosa costs Px = ₹20. A student\'s marginal utility of money is MUm = 2 utils/₹. At what Marginal Utility (MUx in utils) will the student achieve Consumer Equilibrium for one commodity?',
    correctAnswer: 40,
    tolerance: 0,
    unit: 'utils',
    explanation: 'Consumer equilibrium condition is MUx / Px = MUm, which rearranges to MUx = Px × MUm. Here, MUx = 20 × 2 = 40 utils.',
    hints: [
      'Use the equilibrium formula: MUx / Px = MUm.',
      'Multiply both sides by Px: MUx = Px × MUm.',
      'MUx = 20 × 2 = 40 utils.',
    ],
  },
  {
    id: 'ch_015_c12_007',
    nodeId: NODE_C12_ECON_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare a Giffen Good and a Veblen Good. What is the fundamental difference in the underlying consumer mechanism that causes both to have upward-sloping demand curves?',
    options: [
      'Giffen good is an inferior staple of poor households where the negative income effect dominates the substitution effect; Veblen good is a luxury of wealthy households where high price acts as a prestige/status signal',
      'Giffen goods are bought by billionaires for status; Veblen goods are staple grains bought by rural labourers',
      'Giffen goods violate the law of supply; Veblen goods violate cardinal utility only',
      'There is no difference; both terms are interchangeable in ISC economics',
    ],
    correctIndex: 0,
    explanation: 'Both exhibit upward-sloping demand (positive price-quantity relationship), but Giffen goods stem from extreme poverty where price hikes destroy real income forcing more staple consumption, whereas Veblen goods stem from conspicuous consumption where high price provides snob/prestige value.',
    hints: [
      'Who buys Irish potatoes or coarse bajra during famine/poverty? (Giffen)',
      'Who buys Rolex watches and diamond jewellery for status? (Veblen)',
      'Giffen = Poverty + Income effect dominance; Veblen = Wealth + Status signalling.',
    ],
  },
  {
    id: 'ch_016_c12_007',
    nodeId: NODE_C12_ECON_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'On 24 March 2020, during the initial COVID-19 lockdown announcement, prices of N95 masks and hand sanitizers in Mumbai rose 100%, yet pharmacies witnessed unprecedented surge in quantity purchased. Which exception applies?',
    options: [
      'Emergency & Panic Buying (Fear of complete future unavailability violates ceteris paribus)',
      'Veblen Good effect (Masks became status symbols)',
      'Giffen Paradox (Sanitizers became an inferior staple replacing food)',
      'Quality-Price Inference (Higher price made sanitizers medically superior)',
    ],
    correctIndex: 0,
    explanation: 'During emergencies and crises, fear of critical shortages and total future unavailability leads to panic hoarding. The ceteris paribus assumption ("no emergency panic") collapses.',
    hints: [
      'Why did people queue up for sanitizers in March 2020? Was it for luxury status or survival panic?',
      'Emergency situations violate the standard normal-market assumptions.',
      'This is the Emergency / Crisis exception.',
    ],
  },
  {
    id: 'ch_017_c12_010',
    nodeId: NODE_C12_ECON_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the exact mathematical equilibrium formula for a single commodity consumer in cardinal utility theory:',
    availableParts: ['MUx', '/', 'Px', '=', 'MUm', '*', 'TUx', '+', 'Py'],
    targetState: 'MUx / Px = MUm',
    validationHint: 'The ratio of marginal utility of good X to its price must equal the marginal utility of money.',
    explanation: 'The single commodity equilibrium condition equates marginal utility per rupee spent (MUx/Px) to the opportunity utility of holding money (MUm).',
    hints: [
      'Marginal benefit per rupee spent on good X is MUx divided by Px.',
      'This must equal the utility of one rupee (MUm).',
      'Target: MUx / Px = MUm.',
    ],
  },
  {
    id: 'ch_018_c12_003',
    nodeId: NODE_C12_ECON_003,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the three core reasons for the downward slope of the demand curve with their active economic mechanisms:',
    options: [
      'Income Effect ➔ Purchasing power changes; Substitution Effect ➔ Relative price changes; LDMU ➔ Declining marginal satisfaction',
      'Income Effect ➔ Relative price changes; Substitution Effect ➔ Purchasing power changes; LDMU ➔ Fixed budget',
      'Income Effect ➔ Tax rate changes; Substitution Effect ➔ Inflation; LDMU ➔ Production cost',
      'Income Effect ➔ Shift of curve; Substitution Effect ➔ Movement; LDMU ➔ Market demand',
    ],
    correctIndex: 0,
    explanation: 'Income effect works via real purchasing power (price drop frees up money income). Substitution effect works via relative price (cheaper relative to substitutes). LDMU works via psychological utility (lower willingness to pay for additional units).',
    hints: [
      'When price drops, your existing money can buy more (Purchasing power = Income effect).',
      'When price drops, the good becomes more attractive than rival goods (Relative price = Substitution effect).',
      'Each extra unit gives fewer utils (Diminishing utility = LDMU).',
    ],
  },
  {
    id: 'ch_019_c12_010',
    nodeId: NODE_C12_ECON_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A consumer evaluates coffee: at 3 cups, MUx/Px = 1.5 utils/₹, while MUm = 1.0 util/₹. Is the consumer in equilibrium? What rational action should they take?',
    options: [
      'Not in equilibrium; since MUx/Px > MUm, the consumer gains net utility by consuming MORE cups until MUx/Px falls to 1.0',
      'In equilibrium; because the consumer is making a positive net surplus',
      'Not in equilibrium; the consumer should immediately stop and reduce consumption to 0',
      'In equilibrium; provided total utility is zero',
    ],
    correctIndex: 0,
    explanation: 'As long as MUx/Px > MUm, each additional rupee spent on coffee yields more utility than keeping the rupee. Net utility increases by expanding consumption until diminishing MU brings MUx/Px equal to MUm.',
    hints: [
      'If spending ₹1 gives you 1.5 utils of coffee, but holding ₹1 gives only 1 util, what should a rational person do?',
      'You gain 0.5 utils net on every rupee spent. You should buy more.',
      'Keep buying until MUx/Px diminishes down to MUm.',
    ],
  },
  {
    id: 'ch_020_c12_006',
    nodeId: NODE_C12_ECON_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In June 2017, just before the GST rollout, Indian auto dealerships saw a spike in car sales even as list prices were unchanged. Which determinant caused this rightward shift?',
    options: [
      'Expectations (E) — Consumers expected post-GST tax rates to increase car prices, accelerating current purchases',
      'Own Price (Px) — Dealerships offered mandatory zero-price schemes',
      'Climate (O) — Monsoon onset across Maharashtra',
      'Tastes (T) — Instantaneous preference transformation for internal combustion engines',
    ],
    correctIndex: 0,
    explanation: 'Expectations of future price rises or tax increases (E) prompt consumers to buy immediately, shifting the current demand curve to the right before any actual price change occurs.',
    hints: [
      'Think about consumer speculation before tax policy changes.',
      'If you expect car prices to jump next month, when do you buy?',
      'Expectations (E) shift the demand curve rightward today.',
    ],
  },
  {
    id: 'ch_021_c12_002',
    nodeId: NODE_C12_ECON_002,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A demand function is estimated as: Qdx = 120 - 4*Px + 0.05*Y + 2*Pr. If own price Px = ₹15, Income Y = ₹400, and Substitute Price Pr = ₹10, calculate the quantity demanded Qdx.',
    correctAnswer: 100,
    tolerance: 0.5,
    unit: 'units',
    explanation: 'Substitute the values: Qdx = 120 - (4 × 15) + (0.05 × 400) + (2 × 10) = 120 - 60 + 20 + 20 = 100 units.',
    hints: [
      'Calculate term by term: 4 × 15 = 60.',
      '0.05 × 400 = 20, and 2 × 10 = 20.',
      'Qdx = 120 - 60 + 20 + 20 = 100 units.',
    ],
  },
  {
    id: 'ch_022_c12_008',
    nodeId: NODE_C12_ECON_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the exact distinction between Marginal Utility (MU) and Average Utility (AU)?',
    options: [
      'MU is the difference ΔTU/ΔQ (additional satisfaction from the last unit), while AU is the ratio TU/Q (average satisfaction per unit across all units consumed)',
      'MU is TU divided by Q; AU is the slope of the TU curve',
      'MU applies only to money; AU applies to physical goods',
      'MU and AU are mathematically identical for all continuous functions',
    ],
    correctIndex: 0,
    explanation: 'Examiners frequently test this distinction: MU is marginal (difference/derivative ΔTU/ΔQ), while AU is average (ratio TU/Q). They are conceptually and numerically distinct.',
    hints: [
      'Think: "Marginal" means difference/change from the previous step.',
      '"Average" means taking the total and dividing by total count.',
      'MU = ΔTU/ΔQ; AU = TU/Q.',
    ],
    misconceptionIndex: 1,
  },
];

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Three Conditions of Demand',
    instruction: 'Toggle Desire, Ability, and Willingness to pay. Observe when True Economic Demand is unlocked!',
    interactionType: 'toggle-conditions',
    nodeId: NODE_C12_ECON_001,
  },
  {
    title: 'Lab 2: The Demand Function & Dynamic Curve',
    instruction: 'Adjust Own Price (Px), Consumer Income (Y), and Substitute Price (Pr). Watch movement vs shift in real-time!',
    interactionType: 'slider-curve-shift',
    nodeId: NODE_C12_ECON_002,
  },
  {
    title: 'Lab 3: Horizontal Summation (Market Demand)',
    instruction: 'Drag the price slider to see how Household A and Household B demand curves combine to form the Market Curve.',
    interactionType: 'horizontal-sum',
    nodeId: NODE_C12_ECON_005,
  },
  {
    title: 'Lab 4: Cardinal Utility & The Saturation Point',
    instruction: 'Feed samosas to the student. Track TU and MU curves simultaneously to pinpoint where MU = 0.',
    interactionType: 'utility-curves',
    nodeId: NODE_C12_ECON_008,
  },
  {
    title: 'Lab 5: Consumer Equilibrium Optimizer (MUx/Px = MUm)',
    instruction: 'Change the snack price and MUm. Find the exact quantity where marginal benefit per rupee equals MUm.',
    interactionType: 'equilibrium-finder',
    nodeId: NODE_C12_ECON_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the price of coffee rises sharply in India, what will happen to the demand curve for tea (a substitute good)?',
    options: [
      'The tea demand curve will shift RIGHTWARD (demand for tea rises at every price)',
      'The tea demand curve will shift LEFTWARD',
      'There will be an upward contraction along the tea demand curve',
      'The tea demand curve will become completely vertical',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now move the "Substitute Price (Pr)" slider up in Lab 2 to watch the tea demand curve shift right!',
    nodeId: NODE_C12_ECON_002,
  },
  {
    question: 'Predict: If a student eats 5 gulab jamuns and reaches the saturation point (MU = 0), what will happen to Total Utility if they force down a 6th jamun?',
    options: [
      'Total Utility will decrease (disutility)',
      'Total Utility will increase even faster',
      'Total Utility will stay permanently at its peak',
      'Total Utility will double immediately',
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 4, increase units past the saturation point, and observe TU curving downward into the negative MU zone!',
    nodeId: NODE_C12_ECON_008,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Market Demand lab, what do you notice about the Market Curve (Dm) compared to Individual Curves (dA and dB)?',
    observableOptions: [
      'Dm is situated further to the right and is visibly flatter than dA and dB',
      'Dm is steeper and positioned to the left of dA',
      'Dm is a vertical line',
      'Dm has an upward positive slope',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_ECON_005,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Pricing Challenge: Bengaluru Metro vs BMTC Buses',
  description: 'Apply your microeconomic toolkit to urban transit. Metro and BMTC buses are close substitutes. If Bangalore Metro slashes off-peak fares by 30%, draft the 4-step impact analysis for BMTC bus revenue, commuter equilibrium, and city-wide travel utility.',
  steps: [
    'Identify Metro price drop as own-price expansion along the Metro demand curve',
    'Identify BMTC bus demand as undergoing a leftward shift due to cheaper substitute (Pr ↓)',
    'Calculate the change in commuter marginal utility per rupee (MU/P) on Metro commutes',
    'Propose an equimarginal pricing counter-strategy for BMTC bus passes',
  ],
};

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_ECON_001,
  title: 'Demand Theory, Utility Analysis & Consumer Equilibrium',
  definition: 'Demand is desire backed by ability and willingness to pay at a given price and time. Cardinal utility measures satisfaction in utils, where diminishing marginal utility governs consumer equilibrium (MUx/Px = MUm).',
  eli5: 'Wanting an iPhone without money is just a wish. When you have money and are ready to spend it at that price, it becomes Demand! Eating slices of pizza makes each next slice less exciting (diminishing utility) until you stop buying when the joy matches the money spent.',
  misconceptions: [
    { misconception: 'Demand is the same as desire or wanting something.', correction: 'Economic demand requires three simultaneous conditions: Desire + Ability to pay (income) + Willingness to spend at a specific price and time.' },
    { misconception: 'Marginal utility is the same as average utility.', correction: 'MU is the difference in total utility from the LAST unit (ΔTU/ΔQ), whereas AU is total utility divided by total quantity (TU/Q).' },
    { misconception: 'Price is on the X-axis because it is the independent variable.', correction: 'Economics follows the Alfred Marshall convention (1890): Price is on the vertical Y-axis and Quantity on the horizontal X-axis.' },
    { misconception: 'A rise in price causes a leftward shift of the demand curve.', correction: 'A change in own price causes a MOVEMENT along the existing curve (contraction). Non-price determinants (income, substitutes, tastes) cause SHIFTS.' },
    { misconception: 'Inferior goods always have upward-sloping demand curves.', correction: 'Inferior goods shift leftward when income rises. Only a rare sub-category — Giffen goods (where negative income effect outweighs substitution effect) — has an upward-sloping curve.' },
  ],
  diagnosticQuestions: [
    { question: 'What three conditions constitute economic demand?', options: ['Need, luxury, price', 'Desire, ability to pay, willingness to pay', 'Supply, cost, profit', 'Market, shop, advertising'], correctIndex: 1 },
    { question: 'What causes a movement along a demand curve?', options: ['Change in consumer income', 'Change in taste', 'Change in the good\'s own price', 'Change in price of substitute'], correctIndex: 2 },
    { question: 'What is horizontal summation used to derive?', options: ['Market demand from individual demands', 'Total utility from marginal utility', 'Supply curve from cost', 'Consumer surplus'], correctIndex: 0 },
    { question: 'At what point is Total Utility (TU) maximised?', options: ['When MU is at its maximum', 'When MU = 0', 'When MU is negative', 'When Price = 0'], correctIndex: 1 },
    { question: 'What is the single-commodity consumer equilibrium condition?', options: ['MUx = 0', 'MUx / Px = MUm', 'TUx = Px', 'MUx = MUy'], correctIndex: 1 },
    { question: 'Which good has an upward-sloping demand curve due to status signalling?', options: ['Giffen good', 'Veblen good', 'Normal good', 'Complementary good'], correctIndex: 1 },
    { question: 'If tea and coffee are substitutes, what does a rise in coffee price cause?', options: ['Leftward shift of tea demand', 'Rightward shift of tea demand', 'Movement down tea demand', 'No effect'], correctIndex: 1 },
    { question: 'What is the formula for Marginal Utility for discrete units?', options: ['TU / Q', 'TUn - TUn-1', 'TU * Q', 'ΔP / ΔQ'], correctIndex: 1 },
  ],
  masteryCriteria: 'Master demand functions, market aggregation, curve shifts vs movements, exceptions, cardinal utility curves, LDMU assumptions, and consumer equilibrium.',
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_EconomicsDemandMeaningTypesSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ECON_001,
    title = DEFAULT_PROPS.title || 'Demand & Utility Analysis',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['economics'] || { name: 'Economics', emoji: '📈', color: 'emerald' };

  // ─── FLOW STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // ─── BRILLIANT PATTERNS STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // ─── HINTS & REVEAL STATE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── VISUAL FEEDBACK STATE ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // ─── DRAG AND DROP / INTERACTION STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── SIMULATION LAB 1 (Conditions of Demand) STATE ───
  const [condDesire, setCondDesire] = useState(true);
  const [condAbility, setCondAbility] = useState(false);
  const [condWillingness, setCondWillingness] = useState(false);

  // ─── SIMULATION LAB 2 (Demand Function & Curve) STATE ───
  const [simPrice, setSimPrice] = useState(25);
  const [simIncome, setSimIncome] = useState(50);
  const [simSubPrice, setSimSubPrice] = useState(30);
  const [simTasteIndex] = useState(50);

  // ─── SIMULATION LAB 3 (Market Aggregation) STATE ───
  const [marketPrice, setMarketPrice] = useState(20);

  // ─── SIMULATION LAB 4 & 5 (Utility & Equilibrium) STATE ───
  const [snackCount, setSnackCount] = useState(3);
  const [snackPrice, setSnackPrice] = useState(15);
  const [marginalUtilMoney, setMarginalUtilMoney] = useState(1.5);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── BKT & LOCALSTORAGE INIT ───
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
    const targetDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CALCULATIONS: DEMAND CURVE ───
  const demandCurveData = useMemo(() => {
    const baseIntercept = 40 + simIncome * 0.4 + simSubPrice * 0.5 + simTasteIndex * 0.3;
    const points: { price: number; quantity: number }[] = [];
    for (let p = 5; p <= 60; p += 5) {
      const q = Math.max(0, baseIntercept - 1.8 * p);
      points.push({ price: p, quantity: Math.round(q * 10) / 10 });
    }
    const currentQ = Math.max(0, baseIntercept - 1.8 * simPrice);
    return { points, currentQ: Math.round(currentQ * 10) / 10, baseIntercept };
  }, [simPrice, simIncome, simSubPrice, simTasteIndex]);

  // ─── REAL-TIME CALCULATIONS: MARKET SUMMATION ───
  const marketSumData = useMemo(() => {
    const qa = Math.max(0, Math.round((50 - 1.2 * marketPrice) * 10) / 10);
    const qb = Math.max(0, Math.round((40 - 1.0 * marketPrice) * 10) / 10);
    const qm = Math.round((qa + qb) * 10) / 10;
    return { qa, qb, qm };
  }, [marketPrice]);

  // ─── REAL-TIME CALCULATIONS: CARDINAL UTILITY SCHEDULE ───
  const utilitySchedule = useMemo(() => {
    const baseMUs = [28, 20, 14, 8, 0, -6];
    let cumulativeTU = 0;
    return baseMUs.map((mu, idx) => {
      cumulativeTU += mu;
      const unit = idx + 1;
      const muOverP = Math.round((mu / snackPrice) * 100) / 100;
      return {
        unit,
        mu,
        tu: cumulativeTU,
        muOverP,
        isEquilibrium: Math.abs(muOverP - marginalUtilMoney) < 0.25 || (muOverP >= marginalUtilMoney && (baseMUs[idx + 1] / snackPrice) < marginalUtilMoney),
        isSaturation: mu === 0,
      };
    });
  }, [snackPrice, marginalUtilMoney]);

  // ─── 2D CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + frame * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── EVENT HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand economic demand.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Experiment freely with the economic levers!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test edge cases without time limits or grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase started. Put your demand and utility mastery to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Look closer at the curve shifts on the screen.');
  }, []);

  const handlePriceChange = useCallback((val: number) => {
    setSimPrice(val);
    audioManager.play('count');
  }, []);

  const handleIncomeChange = useCallback((val: number) => {
    setSimIncome(val);
    audioManager.play('count');
  }, []);

  const handleSubPriceChange = useCallback((val: number) => {
    setSimSubPrice(val);
    audioManager.play('count');
  }, []);

  const handleMarketPriceChange = useCallback((val: number) => {
    setMarketPrice(val);
    audioManager.play('count');
  }, []);

  const handleSnackCountChange = useCallback((val: number) => {
    setSnackCount(val);
    audioManager.play('pop');
  }, []);

  const handleSnackPriceChange = useCallback((val: number) => {
    setSnackPrice(val);
    audioManager.play('count');
  }, []);

  const handleMUmChange = useCallback((val: number) => {
    setMarginalUtilMoney(val);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You scored ${finalScore} percent on Demand and Utility Analysis!`);
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
        isCorrect =
          Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Brilliant! That is completely correct.');
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
          speechManager.speak('Let us study the complete step-by-step ISC explanation.');
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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(answer);
  }, [sortArrangement, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner shadow-emerald-500/20"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                ISC Class 12 Economics
              </span>
              <span className="text-xs text-slate-400">Microeconomics Unit 2</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((pTab) => (
            <motion.button
              key={pTab}
              aria-label={`Navigate to ${pTab} phase`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPhase(pTab);
                audioManager.play('tap');
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                phase === pTab
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {pTab}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/40 rounded-3xl border border-emerald-800/30 shadow-xl relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Scenario Simulation
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              💡 {SCENARIO.context}
            </p>
          </motion.div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 font-bold text-xs rounded-lg border border-amber-500/30">
                Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">Not Graded — Test Your Economic Intuition!</span>
            </div>
            <p className="text-base md:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700/80 text-center leading-6 text-xs mr-2 font-bold">
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
                className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Demand requires Desire, Ability to Pay, and Willingness to Pay.'
                    : '✗ ' + DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, sIdx) => (
                <div
                  key={sIdx}
                  className={`h-2 rounded-full transition-all ${
                    sIdx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-700'
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
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-emerald-400 text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* Lab 1 */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <motion.div
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle desire condition, currently ${condDesire ? 'active' : 'inactive'}`}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      condDesire
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                    onClick={() => {
                      setCondDesire(!condDesire);
                      audioManager.play('tap');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCondDesire(!condDesire);
                        audioManager.play('tap');
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">1. Desire for Good</span>
                      <span>{condDesire ? '✓ ON' : '✗ OFF'}</span>
                    </div>
                    <p className="text-xs mt-2 text-slate-400">
                      The consumer wants or needs the commodity to satisfy a want.
                    </p>
                  </motion.div>

                  <motion.div
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle ability to pay condition, currently ${condAbility ? 'active' : 'inactive'}`}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      condAbility
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                    onClick={() => {
                      setCondAbility(!condAbility);
                      audioManager.play('tap');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCondAbility(!condAbility);
                        audioManager.play('tap');
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">2. Ability to Pay</span>
                      <span>{condAbility ? '✓ ON' : '✗ OFF'}</span>
                    </div>
                    <p className="text-xs mt-2 text-slate-400">
                      Sufficient purchasing power (income/wealth) to afford the price tag.
                    </p>
                  </motion.div>

                  <motion.div
                    role="button"
                    tabIndex={0}
                    aria-label={`Toggle willingness to pay condition, currently ${condWillingness ? 'active' : 'inactive'}`}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      condWillingness
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                    onClick={() => {
                      setCondWillingness(!condWillingness);
                      audioManager.play('tap');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCondWillingness(!condWillingness);
                        audioManager.play('tap');
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">3. Willingness to Pay</span>
                      <span>{condWillingness ? '✓ ON' : '✗ OFF'}</span>
                    </div>
                    <p className="text-xs mt-2 text-slate-400">
                      Ready to part with the rupees rather than holding cash or buying substitutes.
                    </p>
                  </motion.div>

                  <div className="md:col-span-3 mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase text-slate-400 font-bold">Economic Result:</span>
                      <p
                        className={`text-lg font-black mt-0.5 ${
                          condDesire && condAbility && condWillingness
                            ? 'text-emerald-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {condDesire && condAbility && condWillingness
                          ? '✓ VALID ECONOMIC DEMAND ESTABLISHED!'
                          : !condDesire
                          ? '✗ Mere wealth without desire is not demand'
                          : !condAbility
                          ? '✗ Mere wish/daydream without purchasing power'
                          : '✗ Affordability without readiness to spend is not demand'}
                      </p>
                    </div>
                    <span className="text-2xl">
                      {condDesire && condAbility && condWillingness ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              )}

              {/* Lab 2 */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-800/40 space-y-3">
                      <span className="text-xs font-bold text-indigo-300 uppercase">Predict First</span>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 bg-slate-800/80 rounded-xl text-xs text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <label htmlFor="price-slider">Own Price (Px) [Causes Movement]:</label>
                          <span className="text-emerald-400 font-mono">₹{simPrice}/unit</span>
                        </div>
                        <input
                          id="price-slider"
                          aria-label="Own price slider"
                          type="range"
                          min={10}
                          max={50}
                          value={simPrice}
                          onChange={(e) => handlePriceChange(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <label htmlFor="income-slider">Consumer Income (Y) [Causes Shift]:</label>
                          <span className="text-indigo-400 font-mono">Index {simIncome}</span>
                        </div>
                        <input
                          id="income-slider"
                          aria-label="Consumer income slider"
                          type="range"
                          min={10}
                          max={90}
                          value={simIncome}
                          onChange={(e) => handleIncomeChange(Number(e.target.value))}
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                          <label htmlFor="sub-price-slider">Substitute Price (Pr) [Causes Shift]:</label>
                          <span className="text-amber-400 font-mono">₹{simSubPrice}</span>
                        </div>
                        <input
                          id="sub-price-slider"
                          aria-label="Substitute price slider"
                          type="range"
                          min={10}
                          max={60}
                          value={simSubPrice}
                          onChange={(e) => handleSubPriceChange(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                        <div>
                          Current Quantity Demanded (Dx):{' '}
                          <span className="text-white font-bold">{demandCurveData.currentQ} units</span>
                        </div>
                        <div>
                          Status:{' '}
                          <span className="text-emerald-400 font-semibold">
                            {simPrice > 35 ? 'Contraction (High Px)' : 'Expansion (Low Px)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 360 220" className="w-full h-52" aria-label="Marshallian Demand Curve Visualization">
                        <line x1="40" y1="180" x2="340" y2="180" stroke="#64748b" strokeWidth="2" />
                        <line x1="40" y1="20" x2="40" y2="180" stroke="#64748b" strokeWidth="2" />
                        <text x="330" y="200" fill="#94a3b8" fontSize="10" textAnchor="end">
                          Quantity (Q)
                        </text>
                        <text x="35" y="15" fill="#94a3b8" fontSize="10" textAnchor="start">
                          Price (P ₹)
                        </text>

                        <line
                          x1="50"
                          y1={Math.max(25, 180 - (demandCurveData.baseIntercept - 50) * 1.8)}
                          x2="320"
                          y2={Math.min(175, 180 - (demandCurveData.baseIntercept - 320) * 0.5)}
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <text x="325" y="170" fill="#10b981" fontSize="11" fontWeight="bold">
                          DD
                        </text>

                        {(() => {
                          const px = 40 + Math.min(270, demandCurveData.currentQ * 2.2);
                          const py = 180 - (simPrice / 50) * 140;
                          return (
                            <g>
                              <line x1="40" y1={py} x2={px} y2={py} stroke="#fbbf24" strokeDasharray="3,3" />
                              <line x1={px} y1="180" x2={px} y2={py} stroke="#fbbf24" strokeDasharray="3,3" />
                              <circle cx={px} cy={py} r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                              <text x={px + 8} y={py - 6} fill="#fbbf24" fontSize="10" fontWeight="bold">
                                (Q={demandCurveData.currentQ}, P=₹{simPrice})
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                      <span className="text-[11px] text-slate-400 mt-2 text-center">
                        Marshallian Axis Convention: Price (Vertical Y) vs Quantity (Horizontal X)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab 3 */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between text-sm font-semibold text-slate-200">
                      <label htmlFor="market-price-slider">Market Price (P): ₹{marketPrice}/cylinder</label>
                      <span className="text-emerald-400">Horizontal Sum: Qm = QA + QB</span>
                    </div>
                    <input
                      id="market-price-slider"
                      aria-label="Market price slider"
                      type="range"
                      min={10}
                      max={35}
                      value={marketPrice}
                      onChange={(e) => handleMarketPriceChange(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs text-indigo-400 font-bold uppercase">Household A (dA)</span>
                        <div className="text-2xl font-black text-white mt-1">{marketSumData.qa} units</div>
                        <span className="text-[10px] text-slate-500">Equation: 50 - 1.2*P</span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs text-teal-400 font-bold uppercase">Household B (dB)</span>
                        <div className="text-2xl font-black text-white mt-1">{marketSumData.qb} units</div>
                        <span className="text-[10px] text-slate-500">Equation: 40 - 1.0*P</span>
                      </div>
                      <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-500/50 text-center">
                        <span className="text-xs text-emerald-300 font-bold uppercase">Market Demand (Dm)</span>
                        <div className="text-2xl font-black text-emerald-400 mt-1">{marketSumData.qm} units</div>
                        <span className="text-[10px] text-emerald-500/80">Flatter, more price-elastic</span>
                      </div>
                    </div>
                  </div>

                  {!observationAnswered && (
                    <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-400 uppercase">Scientific Observation</p>
                      <p className="text-sm text-white font-medium">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2.5 bg-slate-800 rounded-xl text-xs text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Lab 4 */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-bold text-emerald-400 uppercase">Consumption Controller</span>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Samosas Consumed:</span>
                        <span className="font-bold text-white">{snackCount} Units</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <motion.button
                            key={num}
                            aria-label={`Select ${num} units consumed`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSnackCountChange(num)}
                            className={`flex-1 py-2 rounded-xl font-bold text-xs ${
                              snackCount === num
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/40'
                                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Utility (TU):</span>
                        <span className="text-emerald-400 font-bold text-sm">
                          {utilitySchedule[snackCount - 1]?.tu} Utils
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Marginal Utility (MU):</span>
                        <span
                          className={`font-bold text-sm ${
                            utilitySchedule[snackCount - 1]?.mu < 0
                              ? 'text-rose-400'
                              : utilitySchedule[snackCount - 1]?.mu === 0
                              ? 'text-amber-400'
                              : 'text-indigo-400'
                          }`}
                        >
                          {utilitySchedule[snackCount - 1]?.mu} Utils
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 text-slate-300">
                        Regime:{' '}
                        <span className="font-semibold text-white">
                          {utilitySchedule[snackCount - 1]?.mu > 0
                            ? 'MU > 0 ➔ TU is Rising'
                            : utilitySchedule[snackCount - 1]?.mu === 0
                            ? 'MU = 0 ➔ TU is at Peak MAXIMUM (Saturation)'
                            : 'MU < 0 ➔ TU is Falling (Disutility)'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 360 200" className="w-full h-48" aria-label="Cardinal Utility and Saturation Curve">
                      <line x1="40" y1="150" x2="340" y2="150" stroke="#64748b" strokeWidth="2" />
                      <line x1="40" y1="10" x2="40" y2="180" stroke="#64748b" strokeWidth="2" />
                      <text x="330" y="170" fill="#94a3b8" fontSize="9" textAnchor="end">
                        Quantity (Units)
                      </text>
                      <text x="45" y="15" fill="#94a3b8" fontSize="9" textAnchor="start">
                        TU / MU (Utils)
                      </text>

                      <path
                        d="M 50 140 Q 180 20 270 30 T 330 70"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                      <text x="280" y="25" fill="#10b981" fontSize="10" fontWeight="bold">
                        TU Curve
                      </text>

                      <line x1="50" y1="50" x2="330" y2="175" stroke="#f43f5e" strokeWidth="2.5" />
                      <text x="330" y="185" fill="#f43f5e" fontSize="10" fontWeight="bold">
                        MU Curve
                      </text>

                      <line x1="270" y1="20" x2="270" y2="160" stroke="#fbbf24" strokeDasharray="3,3" />
                      <circle cx="270" cy="30" r="4" fill="#10b981" />
                      <circle cx="270" cy="150" r="4" fill="#fbbf24" />
                      <text x="275" y="145" fill="#fbbf24" fontSize="8" fontWeight="bold">
                        Saturation (MU=0)
                      </text>
                    </svg>
                    <span className="text-[11px] text-slate-400 mt-2 text-center">
                      Vertical Alignment: Peak of TU directly above MU = 0 intersection
                    </span>
                  </div>
                </div>
              )}

              {/* Lab 5 */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <label htmlFor="snack-price-slider">Price per Snack (Px):</label>
                        <span className="font-mono text-emerald-400 font-bold">₹{snackPrice}</span>
                      </div>
                      <input
                        id="snack-price-slider"
                        aria-label="Snack price slider"
                        type="range"
                        min={10}
                        max={30}
                        step={5}
                        value={snackPrice}
                        onChange={(e) => handleSnackPriceChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <label htmlFor="mum-slider">Marginal Utility of Money (MUm):</label>
                        <span className="font-mono text-indigo-400 font-bold">{marginalUtilMoney} utils/₹</span>
                      </div>
                      <input
                        id="mum-slider"
                        aria-label="Marginal utility of money slider"
                        type="range"
                        min={0.5}
                        max={2.5}
                        step={0.1}
                        value={marginalUtilMoney}
                        onChange={(e) => handleMUmChange(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div className="md:col-span-2 overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-900 text-slate-400 font-semibold uppercase">
                          <tr>
                            <th className="p-3">Unit (Q)</th>
                            <th className="p-3">MUx (Utils)</th>
                            <th className="p-3">MUx / Px (Utils/₹)</th>
                            <th className="p-3">MUm</th>
                            <th className="p-3">Decision Rule</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-950">
                          {utilitySchedule.map((row) => (
                            <tr
                              key={row.unit}
                              className={
                                row.isEquilibrium
                                  ? 'bg-emerald-950/40 text-emerald-200 font-bold'
                                  : 'text-slate-300'
                              }
                            >
                              <td className="p-3 font-mono">{row.unit}</td>
                              <td className="p-3">{row.mu}</td>
                              <td className="p-3 font-mono text-emerald-400">{row.muOverP}</td>
                              <td className="p-3 font-mono">{marginalUtilMoney}</td>
                              <td className="p-3">
                                {row.muOverP > marginalUtilMoney ? (
                                  <span className="text-teal-400">Buy (Gain &gt; Cost)</span>
                                ) : row.isEquilibrium ? (
                                  <span className="text-emerald-400 font-bold">🎯 EQUILIBRIUM POINT</span>
                                ) : (
                                  <span className="text-rose-400">Stop (Loss &gt; Gain)</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

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
              className="px-5 py-2.5 bg-slate-800 text-slate-200 rounded-2xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-500 font-mono">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-emerald-500/30"
              >
                Enter Sandbox Mode 🚀
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Free Sandbox Exploration</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manipulate price, consumer income, and utility parameters simultaneously without any grading pressure.
                </p>
              </div>
              <motion.button
                aria-label="Advance to challenge mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase">Demand Curve Parameters</span>
                <div>
                  <label htmlFor="sb-price-slider" className="text-[11px] text-slate-400">Price: ₹{simPrice}</label>
                  <input
                    id="sb-price-slider"
                    aria-label="Sandbox price slider"
                    type="range"
                    min={10}
                    max={50}
                    value={simPrice}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="sb-income-slider" className="text-[11px] text-slate-400">Income Index: {simIncome}</label>
                  <input
                    id="sb-income-slider"
                    aria-label="Sandbox income slider"
                    type="range"
                    min={10}
                    max={90}
                    value={simIncome}
                    onChange={(e) => handleIncomeChange(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-teal-400 uppercase">Equilibrium Parameters</span>
                <div>
                  <label htmlFor="sb-snack-price" className="text-[11px] text-slate-400">Snack Price: ₹{snackPrice}</label>
                  <input
                    id="sb-snack-price"
                    aria-label="Sandbox snack price slider"
                    type="range"
                    min={10}
                    max={30}
                    step={5}
                    value={snackPrice}
                    onChange={(e) => handleSnackPriceChange(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
                <div>
                  <label htmlFor="sb-mum-slider" className="text-[11px] text-slate-400">MUm: {marginalUtilMoney} utils/₹</label>
                  <input
                    id="sb-mum-slider"
                    aria-label="Sandbox marginal utility of money slider"
                    type="range"
                    min={0.5}
                    max={2.5}
                    step={0.1}
                    value={marginalUtilMoney}
                    onChange={(e) => handleMUmChange(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase">Instant Microeconomic Summary</span>
                <div className="text-xs text-slate-300 space-y-1 my-2">
                  <div>
                    Quantity Demanded: <span className="text-emerald-400 font-bold">{demandCurveData.currentQ}</span>
                  </div>
                  <div>
                    Market Total (QA+QB): <span className="text-teal-400 font-bold">{marketSumData.qm}</span>
                  </div>
                  <div>
                    Optimal Consumption: <span className="text-amber-400 font-bold">~3 to 4 Units</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500">Live analytical calculations running in background</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <canvas ref={canvasRef} width={600} height={32} className="w-full rounded-xl bg-slate-900" />

          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {activeChallenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-white mt-0.5">
                Competency Assessment: {activeChallenge.nodeId}
              </h2>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-400'
                  : difficulty === 'standard'
                  ? 'bg-indigo-950/70 border-indigo-500 text-indigo-400'
                  : 'bg-rose-950/70 border-rose-500 text-rose-400'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          </div>

          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-3xl border shadow-xl space-y-5 transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed whitespace-pre-line">
              {activeChallenge.question}
            </p>

            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80 text-slate-200'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center leading-6 text-xs mr-3 font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-mono">{targetKey}</span>
                      <span className="text-xs font-bold text-emerald-300 mt-1">
                        {droppedLabels[targetKey] || '📥 Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Drag Mapping"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Drag Mapping
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder psychological steps in correct sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length > 0
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      className="p-3 bg-slate-800 rounded-xl text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between border border-slate-700"
                    >
                      <span>
                        {displayIdx + 1}. {item}
                      </span>
                      <span className="text-slate-500 text-sm">⋮⋮</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Check Sequence Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'numeric' && (
              <div className="flex items-center gap-3">
                <input
                  aria-label={`Numeric input in ${activeChallenge.unit}`}
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono w-48 focus:border-emerald-500 focus:outline-none"
                />
                <span className="text-xs text-slate-400">{activeChallenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric answer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow"
                >
                  Submit Answer
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add formula part ${part}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-md font-mono text-xs flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to assemble formula</span>
                  )}
                </div>
                <motion.button
                  aria-label="Check assembled formula"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow disabled:opacity-50"
                >
                  Check Assembled Formula
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-emerald-950/40 border border-emerald-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                    ISC Step-by-Step Economic Walkthrough
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                  </span>
                </div>

                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-emerald-100/90 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">{sIdx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Show next step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Show Next Analytical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Advance to next challenge or finish"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black uppercase tracking-wider rounded-2xl shadow-lg shadow-emerald-500/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finish Simulation Arc →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MASTERY METRICS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center text-3xl mx-auto">
              🏆
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Demand & Utility Mastery Achieved!</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              You have navigated all 10 core ISC microeconomic nodes — from individual demand functions and market horizontal summation to cardinal utility curves and consumer equilibrium.
            </p>

            <div className="flex justify-center gap-6 py-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400">Score</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {Math.max(0, 100 - errors * 5)}%
                </div>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <div className="text-2xl font-black text-indigo-400 mt-1 capitalize">{masteryLevel}</div>
              </div>
            </div>

            {/* Personalized Motivational Feedback Banner */}
            <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 text-sm font-semibold text-emerald-200">
              {errors === 0
                ? '🌟 PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? '👏 Great work!'
                : errors >= 4 && errors <= 7
                ? '👍 Good effort!'
                : '💪 Do not give up — You WILL get this!'}
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>💭</span> Key Concept Reflection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase text-emerald-400">Question 1</h4>
                <p className="text-sm text-slate-200 font-semibold">What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400">
                  Reflect on how Giffen goods or Veblen prestige status reverse the traditional downward slope of demand curves.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase text-indigo-400">Question 2</h4>
                <p className="text-sm text-slate-200 font-semibold">How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400">
                  Explain consumer equilibrium (MUx/Px = MUm) using everyday canteen snacks and rupees spent.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase text-amber-400">Question 3</h4>
                <p className="text-sm text-slate-200 font-semibold">Where in real life might you use this?</p>
                <p className="text-xs text-slate-400">
                  Think about dynamic pricing during festival seasons or metro transit ticket fare optimizations.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300">Your Diagnostic Misconception Profile</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">✗ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ True Economics: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-amber-950/30 rounded-3xl border border-amber-800/40 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                SM-2 Spaced Repetition Engine
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Based on your retention score, your next spaced review session is scheduled in{' '}
                <span className="text-amber-300 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                .
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Executive Activity */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/50 to-slate-900 rounded-3xl border border-indigo-800/40 space-y-4">
            <h3 className="text-lg font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold mr-1">Phase {i + 1}:</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── POPUP OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Analytical Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_EconomicsDemandMeaningTypesSim;