'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Line, Bar } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C11_APPMATH_071 = 'c11_appmath_071';
const NODE_C11_APPMATH_072 = 'c11_appmath_072';
const NODE_C11_APPMATH_073 = 'c11_appmath_073';
const NODE_C11_APPMATH_074 = 'c11_appmath_074';
const ALL_NODE_IDS = [
  NODE_C11_APPMATH_071,
  NODE_C11_APPMATH_072,
  NODE_C11_APPMATH_073,
  NODE_C11_APPMATH_074,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Apex Dynamics — Financial Engineering Lab',
  intro:
    'You are the Lead Financial Controller for Apex Dynamics, expanding operations across Surat (textiles), Bengaluru (tech), and New Delhi. You must master the Time Value of Money (PV/NPV/FV), structure employee Annuity & SIP plans, audit Inter-state & Intra-state GST invoices, and optimize high-voltage commercial utility slab bills.',
  context:
    'Every financial decision has an opportunity cost. Discounting future cash flows, scheduling periodic investments, segregating CGST/SGST/IGST, and decoding multi-tier energy tariffs determine company solvency and growth.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Apex Dynamics has two options: Receive ₹1,00,000 in cash today OR receive ₹1,20,000 after 2 years. If prevailing bank FD returns are 10% p.a. compounded annually, which option is financially superior today?',
  options: [
    'Option 2 (₹1,20,000 in 2 yrs) — ₹1,20,000 is always ₹20,000 higher',
    'Option 1 (₹1,00,000 today) — At 10% interest, ₹1,00,000 grows to ₹1,21,000 in 2 yrs',
    'Both options are exactly equivalent in worth',
    'Option 2 because inflation decreases the value of immediate cash',
  ],
  correctIndex: 1,
  hintAfter:
    'Money has a Time Value! ₹1,00,000 invested at 10% compound interest grows to ₹1,00,000 × (1.10)² = ₹1,21,000 after 2 years, beating ₹1,20,000.',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 Challenges) ---
  {
    id: 'ch_071_f1',
    nodeId: NODE_C11_APPMATH_071,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'In financial mathematics, what is the mathematical relationship between Present Value (PV) and Future Value (FV) with interest rate r per period over n periods?',
    options: [
      'PV = FV × (1 + r)^n',
      'PV = FV / (1 + r)^n',
      'PV = FV − (FV × r × n)',
      'PV = FV / (1 + n × r)',
    ],
    correctIndex: 1,
    explanation:
      'Present Value is found by discounting future value: PV = FV / (1 + r)^n. Discounting is the inverse process of compounding.',
    hints: [
      'Think about whether today’s money is smaller or larger than future nominal money.',
      'Compounding multiplies by (1+r)^n to go forward; discounting divides by (1+r)^n to bring money back.',
      'The discount factor is 1/(1+r)^n, so PV = FV / (1+r)^n.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_072_f2',
    nodeId: NODE_C11_APPMATH_072,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'What distinguishes an "annuity due" from an "ordinary (immediate) annuity"?',
    options: [
      'Annuity due has variable payments, while ordinary annuity has fixed payments',
      'Annuity due payments occur at the start of each period, while ordinary annuity payments occur at the end',
      'Annuity due applies simple interest, whereas ordinary annuity applies compound interest',
      'Annuity due payments begin only after a 5-year grace period',
    ],
    correctIndex: 1,
    explanation:
      'In an annuity due, each equal instalment is paid at the BEGINNING of each period, so every instalment earns interest for one extra period compared to an ordinary (immediate) annuity where payments happen at the END of each period.',
    hints: [
      'Look at the timing of when the payment enters the account.',
      'Think of rent paid on the 1st of the month versus salary received on the last day.',
      'Beginning of period = Annuity Due; End of period = Ordinary / Immediate Annuity.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_073_f3',
    nodeId: NODE_C11_APPMATH_073,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'A solar inverter manufacturer in Ahmedabad, Gujarat sells units to a distributor in Rajkot, Gujarat at 18% GST. How is this GST categorized and split?',
    options: [
      '18% IGST to Central Government',
      '9% CGST to Union Govt + 9% SGST to Gujarat State Govt',
      '18% CGST + 18% SGST',
      '9% CGST + 9% UTGST',
    ],
    correctIndex: 1,
    explanation:
      'Because both seller and buyer are inside Gujarat, this is an INTRA-STATE supply. The 18% GST is split equally into 9% CGST (Centre) and 9% SGST (State).',
    hints: [
      'Are the seller and buyer in the same state or different states?',
      'Intra-state sales split total GST exactly in half between Central and State governments.',
      'Total 18% splits into 9% CGST + 9% SGST.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_074_f4',
    nodeId: NODE_C11_APPMATH_074,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'On a commercial electricity bill, what is the fundamental difference between the "Fixed Demand Charge" and the "Energy Charge"?',
    options: [
      'Fixed charge is a percentage tax; Energy charge is a government refund',
      'Fixed charge is paid regardless of consumption for network connectivity; Energy charge depends on metered kWh consumed under slab rates',
      'Fixed charge applies only in summer; Energy charge applies in winter',
      'Fixed charge is calculated per unit of water; Energy charge per unit of power',
    ],
    correctIndex: 1,
    explanation:
      'The fixed charge is a flat/sanctioned capacity fee paid to maintain the connection even with zero consumption. Energy charges reflect metered volumetric units (kWh) consumed through progressive slab tiers.',
    hints: [
      'What do you pay even if you turn off all appliances for the whole month?',
      'Fixed connection fee vs metered unit consumption.',
      'Fixed charge is independent of usage; energy charge scales with units consumed.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_071_f5',
    nodeId: NODE_C11_APPMATH_071,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'Find the Present Value (PV) in Rupees of ₹12,100 receivable after 2 years at an interest rate of 10% per annum compounded annually.',
    correctAnswer: 10000,
    tolerance: 50,
    unit: '₹',
    explanation:
      'PV = FV / (1 + r)^n = 12,100 / (1 + 0.10)^2 = 12,100 / 1.21 = ₹10,000.',
    hints: [
      'Apply formula PV = FV / (1 + r)^n.',
      'Here FV = 12100, r = 0.10, n = 2. Compute (1.10)^2 = 1.21.',
      'Divide 12,100 by 1.21.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_073_f6',
    nodeId: NODE_C11_APPMATH_073,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag and assign each GST transaction type to its corresponding legal tax regime component.',
    dragItems: [
      { label: 'CGST + SGST (50:50)', targetId: 'box_intra' },
      { label: 'IGST (Integrated)', targetId: 'box_inter' },
      { label: 'CGST + UTGST', targetId: 'box_ut' },
      { label: 'Direct Income Tax', targetId: 'box_direct' },
    ],
    correctMapping: {
      box_intra: 'CGST + SGST (50:50)',
      box_inter: 'IGST (Integrated)',
      box_ut: 'CGST + UTGST',
      box_direct: 'Direct Income Tax',
    },
    explanation:
      'Intra-state uses CGST+SGST; Inter-state uses IGST; Union Territories without legislature use CGST+UTGST; Income tax is a direct tax on personal/corporate earnings.',
    hints: [
      'Match Intra-state to equal split of central and state tax.',
      'Match Inter-state to Integrated tax.',
      'Union Territories without legislature substitute UTGST for SGST.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_074_f7',
    nodeId: NODE_C11_APPMATH_074,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question:
      'An electricity meter reading was 8,450 kWh on May 1 and 8,850 kWh on May 31. If the first 200 units are billed at ₹4/unit and all subsequent units at ₹6/unit, what is the total Energy Charge in Rupees?',
    correctAnswer: 2000,
    tolerance: 10,
    unit: '₹',
    explanation:
      'Total units = 8850 − 8450 = 400 kWh. Slab 1: First 200 units × ₹4 = ₹800. Slab 2: Remaining (400 − 200) = 200 units × ₹6 = ₹1,200. Total Energy Charge = 800 + 1200 = ₹2,000.',
    hints: [
      'Find total units consumed first: 8850 − 8450 = 400 units.',
      'Do NOT multiply all 400 units by ₹6! Split into two slabs of 200 units.',
      'Slab 1 (200 × 4 = 800) + Slab 2 (200 × 6 = 1200) = ₹2,000.',
    ],
    misconceptionIndex: 3,
  },

  // --- STANDARD (8 Challenges) ---
  {
    id: 'ch_071_s1',
    nodeId: NODE_C11_APPMATH_071,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Apex Dynamics is evaluating a machinery overhaul costing ₹50,000 today. The project yields cash inflows of ₹22,000 at end of Year 1, ₹24,200 at end of Year 2, and ₹26,620 at end of Year 3. At a 10% discount rate, calculate the Net Present Value (NPV) in Rupees.',
    correctAnswer: 10000,
    tolerance: 50,
    unit: '₹',
    explanation:
      'PV(Y1) = 22,000/1.10 = ₹20,000. PV(Y2) = 24,200/(1.10)^2 = ₹20,000. PV(Y3) = 26,620/(1.10)^3 = ₹20,000. Total PV of inflows = 20,000 + 20,000 + 20,000 = ₹60,000. NPV = Total PV − Initial Outlay = 60,000 − 50,000 = ₹10,000.',
    hints: [
      'Discount each year’s cash flow separately: Ct / (1.10)^t.',
      'Sum all 3 discounted inflows together before subtracting initial cost.',
      '60,000 − 50,000 = 10,000.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_072_s2',
    nodeId: NODE_C11_APPMATH_072,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why is the Future Value of an Annuity Due always strictly greater than the Future Value of an Ordinary Annuity with identical instalment PMT, interest rate r > 0, and duration n?',
    options: [
      'Because Annuity Due formulas use simple interest compounding tables',
      'Because each instalment in an Annuity Due is invested 1 period earlier and earns interest for 1 extra compounding period',
      'Because Annuity Due requires paying double the instalment at period zero',
      'Because Ordinary Annuity involves deduction of GST at source',
    ],
    correctIndex: 1,
    explanation:
      'In an Annuity Due, payments are made at the beginning of each period. Thus, every single cash flow earns compound interest for exactly one additional period. FV(Due) = FV(Ordinary) × (1 + r).',
    hints: [
      'Compare when payment 1 is made: at t=0 (Due) vs t=1 (Ordinary).',
      'Every payment sits in the account 1 period longer in the Due scheme.',
      'Multiply ordinary annuity value by (1 + r) to account for that extra period.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_073_s3',
    nodeId: NODE_C11_APPMATH_073,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'An industrial textile loom is sold from Surat (Gujarat) to a buyer in Jaipur (Rajasthan) for a taxable base price of ₹2,50,000. The GST rate is 18%. How much IGST in Rupees must be charged on the invoice?',
    correctAnswer: 45000,
    tolerance: 100,
    unit: '₹',
    explanation:
      'Since Surat (Gujarat) and Jaipur (Rajasthan) are in different states, this is an Inter-state transaction. Full 18% is levied as IGST: ₹2,50,000 × 0.18 = ₹45,000.',
    hints: [
      'Is this intra-state or inter-state?',
      'Cross-state transactions use 100% IGST instead of CGST + SGST split.',
      'Compute 18% of 2,50,000: 250000 × 0.18 = 45000.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_074_s4',
    nodeId: NODE_C11_APPMATH_074,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A factory consumes 600 kWh in a monthly billing cycle. Tariff: First 200 kWh @ ₹4/unit, Next 300 kWh @ ₹6/unit, Remaining @ ₹8/unit. Fixed charge = ₹150. A Fuel Surcharge of 10% is levied ONLY on the Energy Charge. What is the subtotal before taxes in Rupees?',
    correctAnswer: 3890,
    tolerance: 10,
    unit: '₹',
    explanation:
      'Energy Charge = (200 × 4) + (300 × 6) + (100 × 8) = 800 + 1800 + 800 = ₹3,400. Fuel Surcharge = 10% of ₹3,400 = ₹340. Fixed Charge = ₹150. Subtotal = 3,400 + 340 + 150 = ₹3,890.',
    hints: [
      'Calculate energy charge in 3 slabs: 200@4 (800) + 300@6 (1800) + 100@8 (800) = 3400.',
      'Surcharge is 10% of energy charge (340), NOT 10% of total with fixed charge.',
      'Sum Energy (3400) + Surcharge (340) + Fixed (150) = 3890.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_072_s5',
    nodeId: NODE_C11_APPMATH_072,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange these financial accumulation milestones in chronologically ascending order of their compounding lifespan for an ordinary 3-year annual annuity of ₹10,000 at 8% p.a.',
    sortItems: [
      'Instalment 1 paid at end of Year 1 (Compounded for 2 years)',
      'Instalment 2 paid at end of Year 2 (Compounded for 1 year)',
      'Instalment 3 paid at end of Year 3 (Compounded for 0 years)',
      'Total Sum accumulated at Year 3 terminal date',
    ],
    correctOrder: [2, 1, 0, 3],
    explanation:
      'Instalment 3 compounds for 0 years (least growth), Instalment 2 compounds for 1 year, Instalment 1 compounds for 2 years (most growth), culminating in the accumulated Terminal Corpus.',
    hints: [
      'Look at compounding duration: 0 years < 1 year < 2 years < Final sum.',
      'Payment at end of year 3 earns 0 interest because it arrives on the maturity day.',
      'Order from lowest compounding period to total accumulated corpus.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_073_s6',
    nodeId: NODE_C11_APPMATH_073,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'How does the Input Tax Credit (ITC) mechanism under GST prevent the cascading effect ("tax-on-tax") for an Indian manufacturer?',
    options: [
      'It allows the manufacturer to avoid paying income tax on corporate profits',
      'It allows set-off of GST already paid on raw material purchases against the GST collected on final product sales, taxing only net value added',
      'It automatically refunds 50% of the retail selling price directly to the consumer',
      'It converts inter-state transactions into exempt non-taxable supplies',
    ],
    correctIndex: 1,
    explanation:
      'Input Tax Credit ensures that tax is paid ONLY on the incremental value added at each manufacturing/distribution stage by subtracting input GST from output GST liability.',
    hints: [
      'Think about what happens to tax already paid on raw materials.',
      'Cascading means paying tax on top of previously levied tax.',
      'ITC offsets input tax from output tax so only value-addition is taxed.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_071_s7',
    nodeId: NODE_C11_APPMATH_071,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Assemble the standard mathematical formula for Net Present Value (NPV) with initial investment C0, cash inflows Ct, discount rate r, and horizon n.',
    availableParts: ['NPV =', 'Σ [ Ct / (1+r)^t ]', '− C0', '+ C0', '× (1+r)^n', 'Σ [ Ct × (1+r)^t ]'],
    targetState: 'NPV = Σ [ Ct / (1+r)^t ] − C0',
    validationHint:
      'Start with "NPV =", add the discounted cash inflow summation term, and subtract the initial capital outlay C0.',
    explanation:
      'The Net Present Value formula is NPV = Σ[Ct / (1+r)^t] − C0 for t=1 to n. Subtracting the initial investment C0 from the discounted cash inflows reveals the project value creation.',
    hints: [
      'Discounting divides Ct by (1+r)^t.',
      'Initial capital outlay C0 must be subtracted, not added.',
      'Target sequence: NPV = Σ [ Ct / (1+r)^t ] − C0',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_074_s8',
    nodeId: NODE_C11_APPMATH_074,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'State Electricity Regulatory Commissions structure domestic power tariffs with increasing slab rates primarily to:',
    options: [
      'Penalize low-income households with higher base rates',
      'Cross-subsidize lifeline essential consumption while promoting conservation by penalizing excessive high-volume usage',
      'Eliminate the need for metering equipment',
      'Ensure fixed charges decrease as consumption grows',
    ],
    correctIndex: 1,
    explanation:
      'Slab tariffs protect low-consumption essential usage with subsidized rates, while charging higher marginal rates to heavy consumers to encourage energy conservation and fund utility infrastructure.',
    hints: [
      'Why is the first 100 units priced much cheaper than units past 300?',
      'Think about equity for small households and conservation incentives.',
      'Cross-subsidization and conservation are the key public policy goals.',
    ],
    misconceptionIndex: 3,
  },

  // --- ADVANCED (7 Challenges) ---
  {
    id: 'ch_071_a1',
    nodeId: NODE_C11_APPMATH_071,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Apex Dynamics is evaluating two mutually exclusive projects at 12% discount rate: Project Alpha (NPV = +₹45,000, Undiscounted Profit = ₹80,000) and Project Beta (NPV = +₹52,000, Undiscounted Profit = ₹65,000). Which project should be chosen and why?',
    options: [
      'Project Alpha because its undiscounted accounting profit is ₹15,000 higher',
      'Project Beta because it generates higher Net Present Value (+₹52,000), maximizing wealth after accounting for time value of money',
      'Neither, because both have discount rates exceeding 10%',
      'Both simultaneously, disregarding mutual exclusivity',
    ],
    correctIndex: 1,
    explanation:
      'Under capital budgeting, when choosing between mutually exclusive projects, the decision rule is to maximize NPV. Project Beta adds ₹52,000 of present value wealth compared to ₹45,000 for Alpha. Undiscounted profits ignore the time value of money.',
    hints: [
      'Mutually exclusive means you can only pick one.',
      'Never use undiscounted cash sums to rank capital investments.',
      'Choose the option with the highest Net Present Value (NPV).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_072_a2',
    nodeId: NODE_C11_APPMATH_072,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'An engineer sets up a quarterly SIP annuity due of ₹5,000 for 3 years in a fund yielding 8% p.a. compounded quarterly (r = 2% per quarter, n = 12 periods). Given that (1.02)^12 ≈ 1.26824, calculate the accumulated Future Value in Rupees (rounded to nearest Rupee).',
    correctAnswer: 68402,
    tolerance: 50,
    unit: '₹',
    explanation:
      'Ordinary FV = PMT × [((1+r)^n − 1) / r] = 5000 × [(1.26824 − 1) / 0.02] = 5000 × [0.26824 / 0.02] = 5000 × 13.412 = ₹67,060. For Annuity Due, multiply by (1 + r) = 1.02: 67,060 × 1.02 ≈ ₹68,401.66 ≈ ₹68,402.',
    hints: [
      'Quarterly rate r = 8% / 4 = 0.02. Number of quarters n = 3 × 4 = 12.',
      'Calculate ordinary annuity FV: 5000 × (0.26824 / 0.02) = 67,060.',
      'Multiply by (1 + 0.02) = 1.02 for Annuity Due = 68,401.66.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_073_a3',
    nodeId: NODE_C11_APPMATH_073,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'A software agency in Chandigarh (Union Territory without legislature) bills a local client ₹80,000 for IT consulting at 18% GST. What is the specific UTGST amount in Rupees charged on the invoice?',
    correctAnswer: 7200,
    tolerance: 20,
    unit: '₹',
    explanation:
      'In a Union Territory without its own legislature (like Chandigarh, Daman & Diu, Andaman & Nicobar), intra-UT supplies attract CGST (9%) + UTGST (9%). UTGST = ₹80,000 × 0.09 = ₹7,200.',
    hints: [
      'Chandigarh is a Union Territory without a state legislature.',
      'Intra-UT GST is split 50:50 between CGST and UTGST (not SGST).',
      'Half of 18% is 9%. 9% of 80,000 = 7,200.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_074_a4',
    nodeId: NODE_C11_APPMATH_074,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'A manufacturing unit consumes 800 kWh. Tariff: First 200 units @ ₹5, Next 300 units @ ₹7, Above 500 units @ ₹9. Fixed charge = ₹200. Surcharge = 8% on Energy Charge. Service charge = ₹100 flat. Electricity duty = 5% on total subtotal (including energy, fixed, surcharge & service charge). Calculate final Bill Amount in Rupees.',
    correctAnswer: 6892,
    tolerance: 25,
    unit: '₹',
    explanation:
      'Energy Charge = (200×5) + (300×7) + (300×9) = 1000 + 2100 + 2700 = ₹5,800. Surcharge = 8% of 5,800 = ₹464. Fixed = ₹200. Service = ₹100. Subtotal before duty = 5800 + 464 + 200 + 100 = ₹6,564. Electricity Duty = 5% of 6,564 = ₹328.20. Total Bill = 6,564 + 328.20 = ₹6,892.20 ≈ ₹6,892.',
    hints: [
      'Compute energy slabs: 1000 + 2100 + 2700 = 5800.',
      'Add 8% surcharge on 5800 = 464.',
      'Add fixed (200) + service (100) and apply 5% duty to subtotal 6564.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_072_a5',
    nodeId: NODE_C11_APPMATH_072,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'A deferred annuity has a deferral period of 3 years followed by 5 annual instalments of ₹20,000 each at 10% p.a. To find the present value at Year 0 today, what is the mathematically sound two-step approach?',
    options: [
      'Calculate ordinary annuity PV for 8 years and subtract 3 years simple interest',
      'Find the PV of the 5-instalment annuity at Year 3 (start of payment stream), then discount that single lump sum back 3 years to Year 0 using 1/(1.10)³',
      'Multiply ₹20,000 by 5 and divide by 1.10^8',
      'Add 3 years of interest to ₹1,00,000 directly',
    ],
    correctIndex: 1,
    explanation:
      'For a deferred annuity, first value the payment stream at the deferral milestone (Year 3) using standard annuity formulas, then discount that lump-sum present value across the 3-year gap to Year 0 using (1+r)^−m.',
    hints: [
      'Separate the deferral gap from the active payment stream.',
      'First find value at the start of payments, then discount that amount to today.',
      'PV at t=0 = [PV of annuity at t=3] / (1+r)³.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_073_a6',
    nodeId: NODE_C11_APPMATH_073,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'A supply chain consists of: Supplier A sells raw materials to Manufacturer B for ₹1,00,000 (GST 18%). B adds ₹50,000 value and sells to Retailer C for ₹1,50,000 (GST 18%). What is the net GST paid to the government by Manufacturer B after utilizing Input Tax Credit?',
    options: [
      '₹27,000 (Full 18% of ₹1,50,000)',
      '₹9,000 (18% on the ₹50,000 value addition only)',
      '₹18,000 (Full 18% of ₹1,00,000)',
      '₹45,000 (Cumulative tax)',
    ],
    correctIndex: 1,
    explanation:
      'Output GST collected by B = 18% of 1,50,000 = ₹27,000. Input Tax Credit (ITC) from purchase = 18% of 1,00,000 = ₹18,000. Net GST payable by B = Output GST − ITC = 27,000 − 18,000 = ₹9,000 (which equals 18% of the ₹50,000 value added).',
    hints: [
      'Compute Output Tax on sales (18% of 1,50,000 = 27,000).',
      'Compute Input Tax already paid on raw material (18% of 1,00,000 = 18,000).',
      'Net Tax = Output Tax − Input Tax Credit = 27,000 − 18,000 = 9,000.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_071_a7',
    nodeId: NODE_C11_APPMATH_071,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'If the prevailing discount rate in the economy increases from 8% to 14%, what happens to the Net Present Value (NPV) of a long-term infrastructure project with large upfront costs and distant future cash inflows?',
    options: [
      'NPV increases because future money becomes nominally larger',
      'NPV decreases significantly because distant future cash inflows are discounted much more heavily by higher powers of (1+r)',
      'NPV remains unchanged because cash inflows are fixed in rupee terms',
      'NPV doubles because the interest rate spread expands',
    ],
    correctIndex: 1,
    explanation:
      'Since discount factors are 1/(1+r)^t, higher discount rates r shrink future cash flows Ct substantially, especially for large t (distant years). Consequently, NPV decreases as discount rates rise.',
    hints: [
      'As r in the denominator increases, what happens to 1/(1+r)^t?',
      'Higher discount rate means a heavier penalty on waiting for future returns.',
      'NPV falls when discount rates climb.',
    ],
    misconceptionIndex: 0,
  },
];

// ─── PROPS & DEFAULTS ───
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
  nodeId: 'c11_appmath_071',
  title: 'Financial Mathematics: Present Value, Annuities, GST & Utility Bills',
  definition:
    'Financial Mathematics models the time value of money through compounding and discounting (PV, FV, NPV), uniform periodic cash streams (Annuities: ordinary, due, deferred), indirect tax architecture (CGST, SGST, IGST, UTGST, and Input Tax Credit), and structured multi-slab utility billing schedules.',
  eli5:
    'A rupee today can earn interest, so it is worth more than a rupee promised in 3 years. Annuities add up regular deposits like your monthly savings. GST splits sales tax fairly between state and central governments, while electric bills use step-by-step slabs so you pay less for basic power and more for heavy usage.',
  misconceptions: [
    {
      misconception: 'Discounting is just subtracting simple interest from future value.',
      correction:
        'Discounting divides by (1+r)^n compound discount factors. Simple interest subtraction ignores the compounding effect of time.',
    },
    {
      misconception: 'Annuity Due and Ordinary Annuity give the exact same terminal corpus.',
      correction:
        'Annuity Due deposits occur at the start of each period, earning an extra period of compound interest: FV(Due) = FV(Ord) × (1+r).',
    },
    {
      misconception: 'CGST is the full GST rate, and all invoices use CGST + SGST.',
      correction:
        'Intra-state sales split GST 50:50 between CGST and SGST. Inter-state sales use 100% IGST, and Union Territories without legislature use CGST + UTGST.',
    },
    {
      misconception: 'Utility bills multiply your entire consumption by the top slab rate.',
      correction:
        'Slab rates apply incrementally: only the units falling inside a specific bracket are charged at that bracket rate.',
    },
    {
      misconception: 'Surcharges and duties are always applied to the total gross bill.',
      correction:
        'Fuel surcharges often apply strictly to the Energy Charge portion, while electricity duties apply to designated subtotals.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the formula for the Present Value of a future sum FV?',
      options: ['PV = FV × (1+r)^n', 'PV = FV / (1+r)^n', 'PV = FV − I', 'PV = FV / (1 + nr)'],
      correctIndex: 1,
    },
    {
      question: 'Which annuity makes payments at the beginning of each period?',
      options: ['Ordinary Annuity', 'Immediate Annuity', 'Annuity Due', 'Deferred Annuity'],
      correctIndex: 2,
    },
    {
      question: 'An inter-state sale from Mumbai to Bengaluru attracts which tax?',
      options: ['CGST + SGST', 'UTGST', 'IGST', 'Excise Duty'],
      correctIndex: 2,
    },
    {
      question: 'How is 18% GST split on a sale within Chennai (Tamil Nadu)?',
      options: ['18% CGST', '9% CGST + 9% SGST', '9% CGST + 9% IGST', '18% SGST'],
      correctIndex: 1,
    },
    {
      question: 'If you consume 250 units in a 100-unit tier system, how many units enter Tier 3 (>200 units)?',
      options: ['250 units', '150 units', '50 units', '0 units'],
      correctIndex: 2,
    },
    {
      question: 'Net Present Value is positive when:',
      options: ['Discounted cash inflows > Initial investment', 'Total nominal sales > Costs', 'Interest rates are 0%', 'Project takes > 10 years'],
      correctIndex: 0,
    },
    {
      question: 'In a deferred annuity with a 2-year deferral and 4 payments, payments occur in:',
      options: ['Years 1 to 4', 'Years 3 to 6', 'Years 0 to 2', 'Years 2 to 4'],
      correctIndex: 1,
    },
    {
      question: 'Input Tax Credit allows a business to:',
      options: ['Claim refund on personal income tax', 'Deduct GST paid on purchases from GST collected on sales', 'Avoid paying electricity surcharge', 'Charge double GST to customers'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student accurately discounts cash flows, calculates NPV, evaluates ordinary vs due annuities, computes multi-tier GST splits, and constructs itemized utility bills.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Time Value of Money & NPV Engine',
    instruction: 'Adjust the discount rate slider and watch how future cash flows shrink back to Present Value today.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_APPMATH_071,
  },
  {
    title: 'Lab 2: Annuity Compounding — Ordinary vs Due',
    instruction: 'Toggle between Ordinary Annuity (end of period) and Annuity Due (start of period) to see the extra compounding bump.',
    interactionType: 'toggle-compare',
    nodeId: NODE_C11_APPMATH_072,
  },
  {
    title: 'Lab 3: GST Tax Architect & Regional Splitter',
    instruction: 'Select transaction route (Intra-State, Inter-State, or Union Territory) to visualize how GST is credited.',
    interactionType: 'click-route',
    nodeId: NODE_C11_APPMATH_073,
  },
  {
    title: 'Lab 4: Progressive Electricity Slab Billing',
    instruction: 'Drag the monthly power consumption meter to see how units cascade through tariff slabs and surcharges.',
    interactionType: 'slider-slab',
    nodeId: NODE_C11_APPMATH_074,
  },
  {
    title: 'Lab 5: Corporate Financial Synthesis Dashboard',
    instruction: 'Analyze how discount rates, tax credits, and utility surcharges integrate into corporate profitability.',
    interactionType: 'multi-variable',
    nodeId: NODE_C11_APPMATH_071,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase the discount rate from 8% to 16%, what will happen to the Net Present Value (NPV) of a 4-year project?',
    options: [
      'NPV will significantly decrease because future cash inflows are discounted by larger denominators',
      'NPV will increase because higher interest rates generate more wealth',
      'NPV will remain constant because cash inflows are already fixed in the contract',
      'NPV will instantly become zero',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Discount Rate slider above 14% to verify how the NPV bar shrinks or turns red (negative)!',
    nodeId: NODE_C11_APPMATH_071,
  },
  {
    question: 'Predict: If a company pays a monthly SIP of ₹10,000 at the BEGINNING of each month (Annuity Due) vs at the END (Ordinary), after 5 years at 12% p.a., will the difference be negligible?',
    options: [
      'Yes, since both involve 60 payments of ₹10,000, total money is the same',
      'No, Annuity Due will be higher by thousands of rupees because EVERY deposit earns 1 extra month of compound growth',
      'Ordinary annuity will be higher due to delayed tax deductions',
      'They will be identical because annual interest rates override monthly timing',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Annuity mode in Lab 2 to check the thousands of rupees generated by the (1 + r) compounding multiplier!',
    nodeId: NODE_C11_APPMATH_072,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you notice about the Discount Factor 1/(1+r)^t as the time horizon t increases from Year 1 to Year 5?',
    observableOptions: [
      'The factor gets progressively smaller, meaning ₹1 received in Year 5 is worth far less today than ₹1 in Year 1',
      'The factor remains constant across all years',
      'The factor grows exponentially, making distant money more valuable today',
      'The factor fluctuates randomly depending on market inflation',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_APPMATH_071,
  },
  {
    question: 'When moving from Slab 1 (0–100 units) into Slab 3 (>200 units), what happens to your marginal cost per unit consumed?',
    observableOptions: [
      'It stays flat at the initial base rate',
      'It increases at each tier step, creating a steeper cost curve to discourage waste',
      'It decreases as a bulk purchase discount',
      'It drops to zero because of government subsidies',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_APPMATH_074,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Apex Chief Financial Officer Portfolio Audit',
  description:
    'Apply your financial mathematics toolkit to audit an actual Indian business scenario: evaluate a ₹5,00,000 solar installation with 5-year energy savings, set up an executive gratuity annuity, audit an inter-state GST invoice from Gujarat to Karnataka, and calculate the commercial factory power bill.',
  steps: [
    'Discount the projected annual solar energy savings of ₹1,40,000/yr for 5 years at 10% discount rate and determine if NPV > 0.',
    'Model a monthly ₹15,000 retirement SIP annuity due for 10 years at 12% p.a. compounded monthly.',
    'Verify an invoice of ₹4,20,000 taxable goods shipped from Surat to Bengaluru (18% IGST vs CGST/SGST).',
    'Calculate a monthly commercial electricity bill for 1,850 kWh with multi-slab tariffs, 8% fuel surcharge, and 5% statutory duty.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_AppliedMathsFinancialMathematicsPresentSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Subject config
  const subjectConfig = SUBJECT_CONFIG['appmath'] || {
    name: 'Applied Mathematics',
    emoji: '📈',
    color: 'emerald',
  };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Discovery & Predict State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab 1: PV & NPV Simulator State
  const [npvDiscountRate, setNpvDiscountRate] = useState(10); // %
  const [initialOutlay, setInitialOutlay] = useState(50000); // ₹
  const [annualCashInflows] = useState([20000, 22000, 25000, 28000]); // 4 years

  // Lab 2: Annuity Compounding State
  const [annuityPmt, setAnnuityPmt] = useState(5000); // ₹ per period
  const [annuityRate, setAnnuityRate] = useState(8); // % p.a.
  const [annuityPeriods, setAnnuityPeriods] = useState(5); // years
  const [annuityType, setAnnuityType] = useState<'ordinary' | 'due' | 'deferred'>('ordinary');

  // Lab 3: GST Engine State
  const [taxableAmount, setTaxableAmount] = useState(50000); // ₹
  const [gstRate, setGstRate] = useState(18); // %
  const [supplyType, setSupplyType] = useState<'intra' | 'inter' | 'ut'>('intra');
  const [inputTaxPaid] = useState(4000); // ITC in ₹

  // Lab 4: Electricity Tariff Slab State
  const [powerUnits, setPowerUnits] = useState(380); // kWh
  const [fixedDemandCharge, setFixedDemandCharge] = useState(120); // ₹
  const [fuelSurchargePct, setFuelSurchargePct] = useState(8); // %
  const [electricityDutyPct] = useState(5); // %

  // Challenge Response States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Drop / Interactive Question State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Animation States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Timer Ref
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATES ───
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

  // ─── REAL-TIME CALCULATIONS: NPV ENGINE ───
  const npvCalculation = useMemo(() => {
    const r = npvDiscountRate / 100;
    let totalDiscountedInflows = 0;
    const discountedArray = annualCashInflows.map((cash, index) => {
      const year = index + 1;
      const discountFactor = 1 / Math.pow(1 + r, year);
      const pv = cash * discountFactor;
      totalDiscountedInflows += pv;
      return {
        year: `Year ${year}`,
        rawCash: cash,
        discountFactor: Number(discountFactor.toFixed(4)),
        pv: Math.round(pv),
      };
    });
    const npv = Math.round(totalDiscountedInflows - initialOutlay);
    const isProfitable = npv > 0;
    return {
      discountedArray,
      totalDiscountedInflows: Math.round(totalDiscountedInflows),
      npv,
      isProfitable,
    };
  }, [npvDiscountRate, initialOutlay, annualCashInflows]);

  // ─── REAL-TIME CALCULATIONS: ANNUITY ENGINE ───
  const annuityCalculation = useMemo(() => {
    const r = annuityRate / 100;
    const n = annuityPeriods;
    if (r <= 0 || n <= 0) return { fv: 0, ordinaryFV: 0, dueFV: 0, difference: 0, timeline: [] };

    const ordinaryFV = annuityPmt * ((Math.pow(1 + r, n) - 1) / r);
    const dueFV = ordinaryFV * (1 + r);
    let selectedFV = ordinaryFV;
    if (annuityType === 'due') selectedFV = dueFV;
    if (annuityType === 'deferred') {
      selectedFV = ordinaryFV;
    }

    const timeline = [];
    let runningTotalOrd = 0;
    let runningTotalDue = 0;
    for (let t = 1; t <= n; t++) {
      runningTotalOrd = annuityPmt * ((Math.pow(1 + r, t) - 1) / r);
      runningTotalDue = runningTotalOrd * (1 + r);
      timeline.push({
        period: `Period ${t}`,
        ordinary: Math.round(runningTotalOrd),
        due: Math.round(runningTotalDue),
        investedNominal: annuityPmt * t,
      });
    }

    return {
      fv: Math.round(selectedFV),
      ordinaryFV: Math.round(ordinaryFV),
      dueFV: Math.round(dueFV),
      difference: Math.round(dueFV - ordinaryFV),
      timeline,
    };
  }, [annuityPmt, annuityRate, annuityPeriods, annuityType]);

  // ─── REAL-TIME CALCULATIONS: GST ENGINE ───
  const gstCalculation = useMemo(() => {
    const totalGstAmount = (taxableAmount * gstRate) / 100;
    let cgst = 0;
    let sgst = 0;
    let igst = 0;
    let utgst = 0;

    if (supplyType === 'intra') {
      cgst = totalGstAmount / 2;
      sgst = totalGstAmount / 2;
    } else if (supplyType === 'inter') {
      igst = totalGstAmount;
    } else if (supplyType === 'ut') {
      cgst = totalGstAmount / 2;
      utgst = totalGstAmount / 2;
    }

    const grossInvoice = taxableAmount + totalGstAmount;
    const netGstPayableToGovt = Math.max(0, totalGstAmount - inputTaxPaid);

    return {
      totalGstAmount,
      cgst,
      sgst,
      igst,
      utgst,
      grossInvoice,
      netGstPayableToGovt,
    };
  }, [taxableAmount, gstRate, supplyType, inputTaxPaid]);

  // ─── REAL-TIME CALCULATIONS: ELECTRICITY TARIFF SLABS ───
  const tariffCalculation = useMemo(() => {
    let slab1Units = 0; // 0 - 100 @ ₹4.50
    let slab2Units = 0; // 101 - 200 @ ₹6.00
    let slab3Units = 0; // > 200 @ ₹8.00

    if (powerUnits <= 100) {
      slab1Units = powerUnits;
    } else if (powerUnits <= 200) {
      slab1Units = 100;
      slab2Units = powerUnits - 100;
    } else {
      slab1Units = 100;
      slab2Units = 100;
      slab3Units = powerUnits - 200;
    }

    const slab1Cost = slab1Units * 4.5;
    const slab2Cost = slab2Units * 6.0;
    const slab3Cost = slab3Units * 8.0;
    const totalEnergyCharge = slab1Cost + slab2Cost + slab3Cost;

    const fuelSurcharge = (totalEnergyCharge * fuelSurchargePct) / 100;
    const subtotalBeforeDuty = totalEnergyCharge + fixedDemandCharge + fuelSurcharge;
    const electricityDuty = (subtotalBeforeDuty * electricityDutyPct) / 100;
    const totalBillPayable = subtotalBeforeDuty + electricityDuty;

    return {
      slab1Units,
      slab2Units,
      slab3Units,
      slab1Cost,
      slab2Cost,
      slab3Cost,
      totalEnergyCharge,
      fuelSurcharge,
      subtotalBeforeDuty,
      electricityDuty,
      totalBillPayable: Math.round(totalBillPayable),
    };
  }, [powerUnits, fixedDemandCharge, fuelSurchargePct, electricityDutyPct]);

  // ─── 2D CANVAS ANIMATION EFFECT ───
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

      const width = canvas.width;
      const height = canvas.height;

      // Draw background financial grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Sine wave representing compounding interest growth
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < width; x++) {
        const y =
          height / 2 +
          Math.sin((x + frame * 1.5) * 0.04) * 12 +
          Math.cos((x - frame * 0.8) * 0.02) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing golden rupee node
      const pulseX = (frame * 2) % width;
      const pulseY =
        height / 2 +
        Math.sin((pulseX + frame * 1.5) * 0.04) * 12 +
        Math.cos((pulseX - frame * 0.8) * 0.02) * 8;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 5 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── ESCALATING HINTS HANDLER ───
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
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // ─── AUTO HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent financial intuition! ₹1,00,000 at 10% grows to ₹1,21,000.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── PHASE ADVANCEMENT HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Financial Mathematics Exploration Labs.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play unlocked. Experiment with all financial simulators freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase started. Put your skills to the test!');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now verify your hypothesis using the interactive lab controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Check the discount factor table again.');
  }, []);

  // ─── DRAG & DROP HANDLERS ───
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
        const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  // ─── COMPLETION & SCORE RECORDING ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the Financial Mathematics mastery curriculum.');
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
      setCurrentChallenge((c) => c + 1);
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
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Financial principles applied accurately.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
          speechManager.speak('Let us study the complete mathematical walkthrough.');
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

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── SLIDE NAVIGATION ───
  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide((s) => s + 1);
      audioManager.play('tap');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  // ─── MOTIVATIONAL MESSAGE HELPER ───
  const getMotivationalMessage = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE! Outstanding mastery across all financial domains!';
    if (errCount <= 3) return 'Great work! Excellent application of discounting and taxation mechanics.';
    if (errCount <= 7) return 'Good effort! Review the step-by-step breakdowns to perfect your precision.';
    return 'Do not give up — You WILL get this! Financial modeling becomes second nature with practice.';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ISC Class 11 Applied Maths
              </span>
              <span className="text-xs text-slate-400">Section B / Financial Math</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation / Status */}
        <div className="flex items-center gap-2">
          {['discovery', 'explore', 'sandbox', 'challenge', 'complete'].map((p) => (
            <motion.div
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {p}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── LIVE 2D FINANCIAL CANVAS BANNER ─── */}
      <div className="relative w-full h-10 my-3 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-900">
        <canvas ref={canvasRef} width={1000} height={40} className="w-full h-full block" />
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none text-[11px] text-slate-400 font-mono">
          <span>TVM & Annuity Compounding Engine Active</span>
          <span className="text-emerald-400">r={npvDiscountRate}% | Slab Units={powerUnits} kWh</span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-5 my-4"
        >
          {/* Narrative Scenario Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider">
              <span>🏢</span> Corporate Scenario: {SCENARIO.title}
            </div>
            <p className="mt-2 text-slate-200 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="mt-2 text-xs text-gold-300/80 border-t border-gold-900/50 pt-2">
              {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Curiosity Discovery Puzzle */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
                Curiosity Hook — No Grading Pressure
              </span>
              <span className="text-xs text-slate-400">Think like a Chief Financial Officer</span>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-800 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-3 border-t border-slate-800 space-y-3"
              >
                <div
                  className={`p-3.5 rounded-xl text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border border-emerald-700 text-emerald-300'
                      : 'bg-amber-950/60 border border-amber-700 text-amber-300'
                  }`}
                >
                  <span className="font-bold">{discoveryCorrect ? '✓ Spot on!' : '💡 Eye-opening Insight:'}</span>{' '}
                  {DISCOVERY_QUESTION.hintAfter}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2"
                >
                  Enter Interactive Financial Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4 my-4"
        >
          {/* Top Step Breadcrumbs */}
          <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    currentSlide === idx
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {idx + 1}. {step.title.split(':')[0]}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-emerald-400">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-slate-300 mt-1 flex items-center gap-1.5">
                  <span className="text-amber-400">👉 Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: PRESENT VALUE & NET PRESENT VALUE SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* TOPIC SVG 1: Time Value of Money & Discounting Flow */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 600 130" className="w-full max-w-xl h-auto">
                      <defs>
                        <linearGradient id="tvmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                        </marker>
                        <marker id="arrowRev" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
                        </marker>
                      </defs>
                      <line x1="50" y1="65" x2="550" y2="65" stroke="#334155" strokeWidth="3" />
                      
                      {/* Timeline Nodes */}
                      {[0, 1, 2, 3, 4].map((year) => {
                        const cx = 70 + year * 115;
                        return (
                          <g key={year}>
                            <circle cx={cx} cy="65" r="8" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                            <text x={cx} y="90" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
                              {year === 0 ? 'Today (t=0)' : `Year ${year}`}
                            </text>
                            {year > 0 && (
                              <text x={cx} y="45" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                                FV_{year}
                              </text>
                            )}
                          </g>
                        );
                      })}

                      {/* Discounting Arrows curving back to t=0 */}
                      <path d="M 415 50 Q 240 10 75 55" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowRev)" />
                      <text x="250" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Discounting: PV = FV / (1 + r)ᵗ
                      </text>
                    </svg>
                  </div>

                  {/* Predict Then Check Block */}
                  {!predictionMade && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-gold-400 uppercase">Step A: Form Your Hypothesis</div>
                      <p className="text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 rounded-xl bg-gold-950/60 border border-gold-700 text-xs text-gold-200 flex items-center justify-between">
                      <span>{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <button
                        onClick={() => setPredictionVerified(true)}
                        className="px-2.5 py-1 bg-gold-600 rounded-lg font-bold text-white text-[11px]"
                      >
                        Got It ✓
                      </button>
                    </div>
                  )}

                  {/* Interactive TVM Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Discount Rate (r):</span>
                        <span className="text-emerald-400 font-mono font-bold">{npvDiscountRate}%</span>
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={25}
                        step={1}
                        value={npvDiscountRate}
                        onChange={(e) => {
                          setNpvDiscountRate(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Adjust discount rate percentage"
                      />

                      <label className="text-xs font-semibold text-slate-300 flex justify-between mt-2">
                        <span>Initial Outlay (C₀):</span>
                        <span className="text-rose-400 font-mono font-bold">₹{initialOutlay.toLocaleString('en-IN')}</span>
                      </label>
                      <input
                        type="range"
                        min={30000}
                        max={90000}
                        step={5000}
                        value={initialOutlay}
                        onChange={(e) => {
                          setInitialOutlay(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="Adjust initial capital outlay"
                      />

                      <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
                        <div>PV Formula: PV = FV / (1 + r)ⁿ</div>
                        <div>NPV Formula: Σ[PV(Inflows)] − C₀</div>
                      </div>
                    </div>

                    {/* Dynamic Cash Flow Bar Chart */}
                    <div className="md:col-span-2 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="text-xs font-bold text-slate-300 mb-2">
                        Nominal Cash Flow vs Discounted Present Value
                      </div>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={npvCalculation.discountedArray}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${Number(v) / 1000}k`} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                              formatter={(value: unknown) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
                            />
                            <Bar dataKey="rawCash" name="Nominal Cash" fill="#64748b" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="pv" name="Present Value" fill="#10b981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Real-time NPV Metric Badge */}
                      <div className="mt-2 p-2.5 rounded-lg bg-slate-900 flex items-center justify-between">
                        <div>
                          <div className="text-[11px] text-slate-400">Total Discounted Inflows: ₹{npvCalculation.totalDiscountedInflows.toLocaleString('en-IN')}</div>
                          <div className={`text-sm font-extrabold font-mono ${npvCalculation.isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                            Net Present Value (NPV): {npvCalculation.npv >= 0 ? '+' : ''}₹{npvCalculation.npv.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-md text-xs font-bold ${npvCalculation.isProfitable ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300 border border-rose-700'}`}>
                          {npvCalculation.isProfitable ? 'ACCEPT PROJECT (NPV > 0)' : 'REJECT PROJECT (NPV < 0)'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scientific Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-amber-400">Step B: Scientific Observation</div>
                      <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: ANNUITY COMPASS — ORDINARY VS DUE VS DEFERRED ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* TOPIC SVG 2: Annuity Due vs Ordinary Annuity Cash Timing */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 600 130" className="w-full max-w-xl h-auto">
                      {/* Ordinary Annuity Timeline */}
                      <text x="30" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold">Ordinary Annuity (End):</text>
                      <line x1="170" y1="28" x2="570" y2="28" stroke="#475569" strokeWidth="2" />
                      {[0, 1, 2, 3].map((yr) => (
                        <g key={yr}>
                          <circle cx={180 + yr * 125} cy="28" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                          <text x={180 + yr * 125} y="44" fill="#64748b" fontSize="9" textAnchor="middle">t={yr}</text>
                          {yr > 0 && (
                            <text x={180 + yr * 125} y="18" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">↓ PMT</text>
                          )}
                        </g>
                      ))}

                      {/* Annuity Due Timeline */}
                      <text x="30" y="92" fill="#10b981" fontSize="11" fontWeight="bold">Annuity Due (Start):</text>
                      <line x1="170" y1="88" x2="570" y2="88" stroke="#475569" strokeWidth="2" />
                      {[0, 1, 2, 3].map((yr) => (
                        <g key={yr}>
                          <circle cx={180 + yr * 125} cy="88" r="5" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                          <text x={180 + yr * 125} y="104" fill="#64748b" fontSize="9" textAnchor="middle">t={yr}</text>
                          {yr < 3 && (
                            <text x={180 + yr * 125} y="78" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">↓ PMT</text>
                          )}
                        </g>
                      ))}
                      <rect x="420" y="108" width="165" height="18" rx="4" fill="#064e3b" />
                      <text x="502" y="121" fill="#6ee7b7" fontSize="10" textAnchor="middle" fontWeight="bold">
                        FV(Due) = FV(Ord) × (1 + r)
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-semibold text-slate-300">Annuity Timing Type:</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['ordinary', 'due', 'deferred'] as const).map((type) => (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setAnnuityType(type);
                              audioManager.play('tap');
                            }}
                            className={`py-1.5 text-xs font-bold rounded-lg capitalize border ${
                              annuityType === type
                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>

                      <label className="text-xs font-semibold text-slate-300 flex justify-between mt-2">
                        <span>Instalment (PMT):</span>
                        <span className="text-emerald-400 font-mono font-bold">₹{annuityPmt.toLocaleString('en-IN')}</span>
                      </label>
                      <input
                        type="range"
                        min={1000}
                        max={20000}
                        step={1000}
                        value={annuityPmt}
                        onChange={(e) => {
                          setAnnuityPmt(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Set annuity instalment amount"
                      />

                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Interest Rate (r p.a.):</span>
                        <span className="text-teal-400 font-mono font-bold">{annuityRate}%</span>
                      </label>
                      <input
                        type="range"
                        min={4}
                        max={16}
                        step={1}
                        value={annuityRate}
                        onChange={(e) => {
                          setAnnuityRate(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-teal-500 cursor-pointer"
                        aria-label="Set annuity interest rate"
                      />

                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Duration (n periods):</span>
                        <span className="text-gold-400 font-mono font-bold">{annuityPeriods} yrs</span>
                      </label>
                      <input
                        type="range"
                        min={2}
                        max={10}
                        step={1}
                        value={annuityPeriods}
                        onChange={(e) => {
                          setAnnuityPeriods(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Set annuity duration in periods"
                      />
                    </div>

                    {/* Annuity Growth Curve Visualization */}
                    <div className="md:col-span-2 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-xs font-bold text-slate-300">Accumulated Corpus Over Time</div>
                        <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          Due Bonus: +₹{annuityCalculation.difference.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={annuityCalculation.timeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
                            <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `₹${Number(v) / 1000}k`} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                              formatter={(v: unknown) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Corpus']}
                            />
                            <Line type="monotone" dataKey="investedNominal" name="Total Deposited" stroke="#64748b" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="ordinary" name="Ordinary Annuity" stroke="#38bdf8" strokeWidth={2.5} />
                            <Line type="monotone" dataKey="due" name="Annuity Due" stroke="#10b981" strokeWidth={2.5} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {/* Comparative Formula Cards */}
                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800 text-[11px]">
                        <div className="p-2 rounded bg-slate-900">
                          <span className="text-gold-400 font-bold">Ordinary (End):</span> FV = PMT × [((1+r)ⁿ − 1)/r] = ₹{annuityCalculation.ordinaryFV.toLocaleString('en-IN')}
                        </div>
                        <div className="p-2 rounded bg-slate-900">
                          <span className="text-emerald-400 font-bold">Due (Start):</span> FV = Ordinary × (1+r) = ₹{annuityCalculation.dueFV.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: GST TAX ENGINE & INVOICE AUDITOR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* TOPIC SVG 3: GST Structure & Input Tax Credit Architecture */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 600 130" className="w-full max-w-xl h-auto">
                      {/* Intra State Flow */}
                      <rect x="20" y="15" width="260" height="100" rx="8" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="150" y="35" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">
                        INTRA-STATE SUPPLY
                      </text>
                      <text x="150" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle">(Buyer & Seller in same State)</text>
                      <rect x="35" y="65" width="105" height="36" rx="4" fill="#1e3a8a" />
                      <text x="87" y="81" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">50% CGST</text>
                      <text x="87" y="94" fill="#bfdbfe" fontSize="9" textAnchor="middle">(Union Govt)</text>
                      <rect x="155" y="65" width="105" height="36" rx="4" fill="#065f46" />
                      <text x="207" y="81" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">50% SGST</text>
                      <text x="207" y="94" fill="#a7f3d0" fontSize="9" textAnchor="middle">(State Govt)</text>

                      {/* Inter State Flow */}
                      <rect x="320" y="15" width="260" height="100" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="450" y="35" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                        INTER-STATE SUPPLY
                      </text>
                      <text x="450" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle">(Movement across State borders)</text>
                      <rect x="350" y="65" width="200" height="36" rx="4" fill="#581c87" />
                      <text x="450" y="81" fill="#e9d5ff" fontSize="11" fontWeight="bold" textAnchor="middle">100% IGST</text>
                      <text x="450" y="94" fill="#f3e8ff" fontSize="9" textAnchor="middle">(Integrated Tax to Centre)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-semibold text-slate-300">Transaction Jurisdiction:</label>
                      <div className="grid grid-cols-1 gap-1.5">
                        {[
                          { id: 'intra', label: 'Intra-State (e.g. Surat → Ahmedabad)' },
                          { id: 'inter', label: 'Inter-State (e.g. Surat → Bengaluru)' },
                          { id: 'ut', label: 'Union Territory (e.g. Chandigarh)' },
                        ].map((route) => (
                          <motion.button
                            key={route.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSupplyType(route.id as 'intra' | 'inter' | 'ut');
                              audioManager.play('tap');
                            }}
                            className={`text-left px-2.5 py-2 rounded-lg text-xs font-medium border ${
                              supplyType === route.id
                                ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {route.label}
                          </motion.button>
                        ))}
                      </div>

                      <label className="text-xs font-semibold text-slate-300 flex justify-between mt-2">
                        <span>Taxable Value:</span>
                        <span className="text-emerald-400 font-mono font-bold">₹{taxableAmount.toLocaleString('en-IN')}</span>
                      </label>
                      <input
                        type="range"
                        min={10000}
                        max={200000}
                        step={10000}
                        value={taxableAmount}
                        onChange={(e) => {
                          setTaxableAmount(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Set taxable goods value"
                      />

                      <label className="text-xs font-semibold text-slate-300">GST Slab Rate:</label>
                      <div className="flex gap-1.5">
                        {[5, 12, 18, 28].map((rate) => (
                          <button
                            key={rate}
                            onClick={() => {
                              setGstRate(rate);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-1 rounded text-xs font-bold border ${
                              gstRate === rate
                                ? 'bg-gold-600 border-gold-500 text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            {rate}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Tax Invoice Visualization */}
                    <div className="md:col-span-2 p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="text-emerald-400 font-bold uppercase tracking-wider">Apex Commercial Tax Invoice</span>
                        <span className="text-slate-400 font-sans">GSTIN: 24AAACA1234F1Z5</span>
                      </div>

                      <div className="flex justify-between py-1 text-slate-300">
                        <span>Base Taxable Value:</span>
                        <span>₹{taxableAmount.toLocaleString('en-IN')}</span>
                      </div>

                      {supplyType === 'intra' && (
                        <>
                          <div className="flex justify-between py-1 text-gold-400 bg-gold-950/30 px-2 rounded">
                            <span>Central GST (CGST @ {gstRate / 2}%):</span>
                            <span>+₹{gstCalculation.cgst.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between py-1 text-gold-400 bg-gold-950/30 px-2 rounded">
                            <span>State GST (SGST @ {gstRate / 2}%):</span>
                            <span>+₹{gstCalculation.sgst.toLocaleString('en-IN')}</span>
                          </div>
                        </>
                      )}

                      {supplyType === 'inter' && (
                        <div className="flex justify-between py-1 text-purple-400 bg-purple-950/30 px-2 rounded">
                          <span>Integrated GST (IGST @ {gstRate}%):</span>
                          <span>+₹{gstCalculation.igst.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      {supplyType === 'ut' && (
                        <>
                          <div className="flex justify-between py-1 text-gold-400 bg-gold-950/30 px-2 rounded">
                            <span>Central GST (CGST @ {gstRate / 2}%):</span>
                            <span>+₹{gstCalculation.cgst.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between py-1 text-teal-400 bg-teal-950/30 px-2 rounded">
                            <span>Union Territory GST (UTGST @ {gstRate / 2}%):</span>
                            <span>+₹{gstCalculation.utgst.toLocaleString('en-IN')}</span>
                          </div>
                        </>
                      )}

                      <div className="flex justify-between py-2 border-t-2 border-slate-800 font-bold text-white text-sm">
                        <span>Total Customer Invoice Payable:</span>
                        <span className="text-emerald-400">₹{gstCalculation.grossInvoice.toLocaleString('en-IN')}</span>
                      </div>

                      {/* Input Tax Credit (ITC) Breakdown */}
                      <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-sans">
                        <div className="font-bold text-amber-400 mb-1">Input Tax Credit (ITC) Mechanics:</div>
                        <div className="text-slate-300">
                          Total Output Tax Collected: ₹{gstCalculation.totalGstAmount.toLocaleString('en-IN')} − ITC on Raw Materials: ₹{inputTaxPaid.toLocaleString('en-IN')} ={' '}
                          <span className="text-emerald-400 font-bold font-mono">
                            Net Tax to Government: ₹{gstCalculation.netGstPayableToGovt.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: UTILITY BILLING & SLAB TARIFF SIMULATOR ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* TOPIC SVG 4: Stepped Multi-Tier Electricity Slab Diagram */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 600 130" className="w-full max-w-xl h-auto">
                      <line x1="60" y1="110" x2="560" y2="110" stroke="#475569" strokeWidth="2" />
                      <line x1="60" y1="110" x2="60" y2="20" stroke="#475569" strokeWidth="2" />
                      <text x="40" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Rate (₹)</text>
                      <text x="560" y="125" fill="#94a3b8" fontSize="10" textAnchor="end">Units (kWh)</text>

                      {/* Slab 1 Step */}
                      <rect x="60" y="80" width="130" height="30" fill="#047857" opacity="0.6" />
                      <line x1="60" y1="80" x2="190" y2="80" stroke="#10b981" strokeWidth="2.5" />
                      <text x="125" y="72" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">Slab 1: ₹4.50</text>
                      <text x="190" y="122" fill="#64748b" fontSize="9" textAnchor="middle">100 u</text>

                      {/* Slab 2 Step */}
                      <rect x="190" y="55" width="130" height="55" fill="#0369a1" opacity="0.6" />
                      <line x1="190" y1="55" x2="320" y2="55" stroke="#38bdf8" strokeWidth="2.5" />
                      <text x="255" y="47" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">Slab 2: ₹6.00</text>
                      <text x="320" y="122" fill="#64748b" fontSize="9" textAnchor="middle">200 u</text>

                      {/* Slab 3 Step */}
                      <rect x="320" y="25" width="220" height="85" fill="#b45309" opacity="0.6" />
                      <line x1="320" y1="25" x2="540" y2="25" stroke="#fbbf24" strokeWidth="2.5" />
                      <text x="430" y="17" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">Slab 3: ₹8.00 (&gt;200 u)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Consumption (kWh):</span>
                        <span className="text-amber-400 font-mono font-bold">{powerUnits} Units</span>
                      </label>
                      <input
                        type="range"
                        min={50}
                        max={600}
                        step={10}
                        value={powerUnits}
                        onChange={(e) => {
                          setPowerUnits(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Set power units consumed"
                      />

                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Fixed Demand Charge:</span>
                        <span className="text-slate-200 font-mono">₹{fixedDemandCharge}</span>
                      </label>
                      <input
                        type="range"
                        min={50}
                        max={300}
                        step={10}
                        value={fixedDemandCharge}
                        onChange={(e) => setFixedDemandCharge(Number(e.target.value))}
                        className="w-full accent-slate-500 cursor-pointer"
                        aria-label="Set fixed demand charge"
                      />

                      <label className="text-xs font-semibold text-slate-300 flex justify-between">
                        <span>Fuel Surcharge:</span>
                        <span className="text-orange-400 font-mono">{fuelSurchargePct}% (on Energy)</span>
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        step={1}
                        value={fuelSurchargePct}
                        onChange={(e) => setFuelSurchargePct(Number(e.target.value))}
                        className="w-full accent-orange-500 cursor-pointer"
                        aria-label="Set fuel surcharge percentage"
                      />
                    </div>

                    {/* Slab Cascading Visualization */}
                    <div className="md:col-span-2 p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
                      <div className="text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                        State Electricity Board — Stepped Slab Breakdown
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
                          <span className="text-slate-300">Slab 1 (0–100 @ ₹4.50):</span>
                          <span className="text-slate-400">{tariffCalculation.slab1Units} units = <strong className="text-emerald-400 font-mono">₹{tariffCalculation.slab1Cost.toFixed(2)}</strong></span>
                        </div>

                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
                          <span className="text-slate-300">Slab 2 (101–200 @ ₹6.00):</span>
                          <span className="text-slate-400">{tariffCalculation.slab2Units} units = <strong className="text-emerald-400 font-mono">₹{tariffCalculation.slab2Cost.toFixed(2)}</strong></span>
                        </div>

                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
                          <span className="text-slate-300">Slab 3 (&gt;200 @ ₹8.00):</span>
                          <span className="text-slate-400">{tariffCalculation.slab3Units} units = <strong className="text-emerald-400 font-mono">₹{tariffCalculation.slab3Cost.toFixed(2)}</strong></span>
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-2 space-y-1 text-slate-300 text-[11px]">
                        <div className="flex justify-between">
                          <span>Total Energy Charge:</span>
                          <span className="font-bold">₹{tariffCalculation.totalEnergyCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-orange-400">
                          <span>Fuel Surcharge ({fuelSurchargePct}% on Energy):</span>
                          <span>+₹{tariffCalculation.fuelSurcharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Fixed Connection Fee:</span>
                          <span>+₹{fixedDemandCharge.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gold-400">
                          <span>Electricity Duty ({electricityDutyPct}% on Subtotal):</span>
                          <span>+₹{tariffCalculation.electricityDuty.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between py-2 border-t-2 border-slate-700 font-bold text-sm text-white">
                        <span>Total Bill Payable:</span>
                        <span className="text-amber-400">₹{tariffCalculation.totalBillPayable.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: MULTI-VARIABLE CORPORATE DASHBOARD ─── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Executive Overview: 4 Pillars of Applied Financial Math
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-[11px] text-slate-400 font-bold">1. Present Value (c11_071)</div>
                      <div className="text-sm font-extrabold text-emerald-400 font-mono">PV = FV / (1+r)ⁿ</div>
                      <p className="text-[11px] text-slate-300">Discounting brings distant money to today's purchasing power.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-[11px] text-slate-400 font-bold">2. Annuities (c11_072)</div>
                      <div className="text-sm font-extrabold text-gold-400 font-mono">FV(Due) = Ord × (1+r)</div>
                      <p className="text-[11px] text-slate-300">Timing at period start grants 1 extra period of compounding.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-[11px] text-slate-400 font-bold">3. GST Regimes (c11_073)</div>
                      <div className="text-sm font-extrabold text-gold-400 font-mono">CGST:SGST = 50:50</div>
                      <p className="text-[11px] text-slate-300">Intra-State splits in half; Inter-State assigns 100% to IGST.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-[11px] text-slate-400 font-bold">4. Utility Slabs (c11_074)</div>
                      <div className="text-sm font-extrabold text-amber-400 font-mono">Stepped Slabs + %</div>
                      <p className="text-[11px] text-slate-300">Tier rates apply only to units inside each individual block.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextSlide}
                    className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950"
                  >
                    Open Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4 my-4 p-5 bg-slate-900 rounded-2xl border border-slate-800"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-bold text-emerald-400">Financial Simulation Sandbox</h3>
              <p className="text-xs text-slate-400">
                Zero pressure, no timers, no grading. Test any numbers you want before the formal challenges.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Quick Sandbox 1: NPV vs Discount Rate */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-200">1. NPV Capital Budgeting Tester</span>
                <span className={`text-xs font-mono font-bold ${npvCalculation.isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>
                  NPV: {npvCalculation.npv >= 0 ? '+' : ''}₹{npvCalculation.npv.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={25}
                value={npvDiscountRate}
                onChange={(e) => setNpvDiscountRate(Number(e.target.value))}
                className="w-full accent-emerald-500"
                aria-label="Sandbox discount rate slider"
              />
              <div className="text-[11px] text-slate-400">
                At {npvDiscountRate}% discount rate, initial ₹{initialOutlay.toLocaleString('en-IN')} outlay is{' '}
                <strong className={npvCalculation.isProfitable ? 'text-emerald-400' : 'text-rose-400'}>
                  {npvCalculation.isProfitable ? 'Value Accretive (Profitable)' : 'Value Destroying (Loss-making)'}
                </strong>.
              </div>
            </div>

            {/* Quick Sandbox 2: Slab Bill Estimator */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-200">2. Power Bill Slab Estimator</span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  Bill: ₹{tariffCalculation.totalBillPayable.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                value={powerUnits}
                onChange={(e) => setPowerUnits(Number(e.target.value))}
                className="w-full accent-amber-500"
                aria-label="Sandbox power consumption slider"
              />
              <div className="text-[11px] text-slate-400">
                Consumption: {powerUnits} kWh | Energy Charge: ₹{tariffCalculation.totalEnergyCharge.toFixed(2)} + Surcharges.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4 my-4"
        >
          {/* Top Challenge Status Card */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950/80 text-rose-400 border-rose-700'
                      : 'bg-gold-950/80 text-gold-400 border-gold-700'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  NEP 2020: {challenge.competencyLevel.toUpperCase()}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Mastery Score: {Math.max(0, 100 - errors * 5)}%
              </div>
            </div>

            {/* Smooth Animated Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card with Framer Shake on Wrong */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-600'
                : 'bg-slate-900 border-slate-800'
            } space-y-4`}
          >
            <div className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed">
              {challenge.question}
            </div>

            {/* MCQ TYPE (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-md bg-slate-700/60 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 w-full mb-1">Drag these labels onto their drop targets:</div>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing border border-emerald-500"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'box_intra', title: '1. Intra-State Supply (Gujarat → Gujarat)' },
                    { id: 'box_inter', title: '2. Inter-State Supply (Gujarat → Rajasthan)' },
                    { id: 'box_ut', title: '3. Union Territory Supply (Chandigarh)' },
                    { id: 'box_direct', title: '4. Non-GST Direct Tax (Corporate Profit)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3.5 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[75px]"
                    >
                      <span className="text-xs text-slate-400 font-semibold">{target.title}</span>
                      <span className="text-xs font-bold font-mono text-emerald-400 mt-2 bg-slate-900 p-1.5 rounded border border-slate-800">
                        {droppedLabels[target.id] || '[ Drop Label Here ]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Assignments
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400">
                  Drag items up/down or click to re-order into correct chronological progression:
                </div>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      aria-label={`Sort item: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded bg-slate-800 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Confirm Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm">{challenge.unit || '₹'}</span>
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500 w-64"
                    aria-label="Numerical answer input"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 font-mono text-xs rounded-lg flex items-center gap-1.5"
                    >
                      {p}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click blocks above to construct the equation</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Click-to-Reveal Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <div className="flex justify-between items-center text-xs font-bold text-emerald-400">
                  <span>Step-by-Step Solution Breakdown:</span>
                  <span className="text-slate-400">
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
                        className="text-xs sm:text-sm text-slate-300 leading-relaxed"
                      >
                        <span className="text-emerald-400 font-bold font-mono mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold"
                  >
                    Show Next Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Complete Curriculum →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-5 my-4"
        >
          {/* Top Score Banner with Mandatory Motivational Feedback */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-700/60 shadow-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Curriculum Assessment Completed
              </span>
              <span className="text-xs font-mono text-slate-400">Nodes Mastered: 4 / 4</span>
            </div>

            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                {Math.max(0, 100 - errors * 5)}%
              </h2>
              <span className="text-sm text-emerald-400 font-semibold font-mono">
                Mastery Tier: {masteryLevel.toUpperCase()}
              </span>
            </div>

            {/* Personalized Motivational Message */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-800/60">
              <p className="text-xs sm:text-sm font-semibold text-emerald-300 leading-relaxed">
                {getMotivationalMessage(errors)}
              </p>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Personal Misconception Gaps & Corrective Insights
              </div>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-400">✓ Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule (SM-2 Algorithm) */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Spaced Review Schedule (SM-2 Interval):</span>
            <span className="font-bold text-amber-400 font-mono">
              Review Due in {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
            </span>
          </div>

          {/* Real World Portfolio Audit Section */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                  <span className="w-4 h-4 rounded bg-gold-900 text-gold-300 flex items-center justify-center font-bold shrink-0 text-[10px]">
                    {i + 1}
                  </span>
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
      {showSuccess && <SuccessBanner message="Challenge Phase Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_AppliedMathsFinancialMathematicsPresentSim;