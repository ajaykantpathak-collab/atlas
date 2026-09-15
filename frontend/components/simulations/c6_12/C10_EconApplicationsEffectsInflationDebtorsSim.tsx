'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

// ─── NODE IDS (VERIFIABLE STRING LITERALS) ──────────────────────────────────
const NODE_C10_ECONAPP_031 = 'c10_econapp_031';
const NODE_C10_ECONAPP_032 = 'c10_econapp_032';
const NODE_C10_ECONAPP_033 = 'c10_econapp_033';
const ALL_NODE_IDS = [NODE_C10_ECONAPP_031, NODE_C10_ECONAPP_032, NODE_C10_ECONAPP_033];

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── NARRATIVE SCENARIO ─────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The Great Indian Inflation & Credit Crisis (2022–2024)',
  intro: 'In April 2022, headline CPI inflation in India hit 7.79% following global commodity shocks. In Vidarbha, farmer Karthik has a ₹1,00,000 crop loan from SBI at 4%. In Pune, retired schoolteacher Lakshmi relies on a ₹5,00,000 SBI fixed deposit at 5.4%. In Tirupur, a textile exporter faces a 40% hike in raw cotton costs, while Reliance Industries watches its crude oil inventory gain value.',
  context: 'As Chief Economic Advisor to the RBI Monetary Policy Committee, you must analyze who gains and who loses from inflation, model commercial bank credit creation under varying CRR & SLR reserves, and deploy quantitative and qualitative credit controls to bring inflation back to the 4.0% ± 2.0% target.',
};

// ─── DISCOVERY QUESTION (CURIOSITY HOOK) ────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'Karthik took an SBI crop loan of ₹1,00,000 at 4% interest. Inflation surges unexpectedly to 7%. Who gains from this inflation spike?',
  options: [
    'SBI (The Lender) — because nominal money flow increases',
    'Karthik (The Debtor) — because he repays in rupees with 3% negative real interest',
    'Lakshmi (Fixed Deposit Saver) — because nominal prices are rising',
    'Both Karthik and SBI gain equally',
  ],
  correctIndex: 1,
  hintAfter: "Surprising, isn't it? When inflation exceeds the loan interest rate, the borrower pays back money that buys fewer goods than when borrowed! Let's explore why.",
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: INFLATION REDISTRIBUTION SEESAW ──────────
function InflationSeesawSVG({ inflation, nominalRate }: { inflation: number; nominalRate: number }) {
  const tilt = Math.max(-18, Math.min(18, (nominalRate - inflation) * 3));
  const debtorGain = inflation > nominalRate;
  return (
    <svg viewBox="0 0 440 180" className="w-full h-auto max-h-48 drop-shadow-md select-none">
      <defs>
        <linearGradient id="plankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="fulcrumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* Background Frame */}
      <rect x="10" y="10" width="420" height="160" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

      {/* Ground line */}
      <line x1="40" y1="150" x2="400" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

      {/* Fulcrum Triangle */}
      <polygon points="220,105 200,150 240,150" fill="url(#fulcrumGrad)" stroke="#475569" strokeWidth="1.5" />
      <circle cx="220" cy="105" r="4" fill="#38bdf8" />

      {/* Tilting Seesaw Group */}
      <g transform={`rotate(${tilt}, 220, 105)`} className="transition-transform duration-300">
        {/* Main Plank */}
        <rect x="50" y="101" width="340" height="8" rx="4" fill="url(#plankGrad)" stroke="#1e1b4b" strokeWidth="1" />

        {/* Debtor Box (Left) */}
        <g transform="translate(60, 52)">
          <rect x="0" y="0" width="80" height="46" rx="8" fill={debtorGain ? '#064e3b' : '#1e293b'} stroke="#10b981" strokeWidth="1.5" />
          <text x="40" y="18" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">DEBTOR</text>
          <text x="40" y="32" textAnchor="middle" fill="#e2e8f0" fontSize="9">Karthik (Loan)</text>
          <text x="40" y="42" textAnchor="middle" fill={debtorGain ? '#4ade80' : '#94a3b8'} fontSize="8" fontWeight="bold">
            {debtorGain ? '▲ Real Gain' : 'Normal'}
          </text>
        </g>

        {/* Creditor Box (Right) */}
        <g transform="translate(300, 52)">
          <rect x="0" y="0" width="80" height="46" rx="8" fill={!debtorGain ? '#064e3b' : '#4c0519'} stroke="#f43f5e" strokeWidth="1.5" />
          <text x="40" y="18" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">CREDITOR</text>
          <text x="40" y="32" textAnchor="middle" fill="#e2e8f0" fontSize="9">Lakshmi (FD)</text>
          <text x="40" y="42" textAnchor="middle" fill={!debtorGain ? '#4ade80' : '#f87171'} fontSize="8" fontWeight="bold">
            {!debtorGain ? '▲ Real Gain' : '▼ Real Loss'}
          </text>
        </g>
      </g>

      {/* Header Info */}
      <text x="220" y="28" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">
        Inflation Wealth Redistribution Dynamic (Seesaw Equilibrium)
      </text>
      <text x="220" y="166" textAnchor="middle" fill="#64748b" fontSize="9">
        Inflation: {inflation}% | Loan Rate: {nominalRate}% | Real Transfer Rate: {(nominalRate - inflation).toFixed(1)}%
      </text>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: CREDIT CREATION MULTIPLIER FLOW ─────────
function CreditMultiplierFlowSVG({ crr, slr }: { crr: number; slr: number }) {
  const totalReserve = crr + slr;
  const multiplier = totalReserve > 0 ? (100 / totalReserve).toFixed(2) : '100';
  return (
    <svg viewBox="0 0 460 170" className="w-full h-auto max-h-48 drop-shadow-md select-none">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
        </marker>
        <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
        </marker>
      </defs>

      {/* Panel Background */}
      <rect x="8" y="8" width="444" height="154" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

      {/* Step 1: Primary Cash Deposit */}
      <rect x="22" y="48" width="90" height="66" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
      <text x="67" y="68" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">INITIAL CASH</text>
      <text x="67" y="84" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">₹10,000</text>
      <text x="67" y="100" textAnchor="middle" fill="#94a3b8" fontSize="8">Primary Deposit</text>

      {/* Flow arrow 1 */}
      <line x1="114" y1="81" x2="148" y2="81" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Step 2: Commercial Bank Vault & Reserve Split */}
      <rect x="150" y="32" width="140" height="98" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="220" y="50" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">COMMERCIAL BANK</text>

      {/* Reserve lock box */}
      <rect x="160" y="58" width="120" height="28" rx="6" fill="#451a03" stroke="#f59e0b" strokeWidth="1" />
      <text x="220" y="71" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">CRR ({crr}%) + SLR ({slr}%)</text>
      <text x="220" y="82" textAnchor="middle" fill="#fef3c7" fontSize="8">Locked Reserve = {totalReserve}%</text>

      {/* Lendable Excess box */}
      <rect x="160" y="90" width="120" height="32" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
      <text x="220" y="103" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">Lendable Surplus</text>
      <text x="220" y="115" textAnchor="middle" fill="#a7f3d0" fontSize="8">{(100 - totalReserve).toFixed(1)}% to Borrower</text>

      {/* Flow arrow 2 */}
      <line x1="292" y1="106" x2="326" y2="106" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowGreen)" />

      {/* Step 3: Multiplier Expansion Output */}
      <rect x="328" y="48" width="112" height="66" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="384" y="66" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">SYSTEM EXPANSION</text>
      <text x="384" y="82" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="extrabold">{multiplier}x</text>
      <text x="384" y="96" textAnchor="middle" fill="#a7f3d0" fontSize="8">Multiplier = 1/(CRR+SLR)</text>
      <text x="384" y="106" textAnchor="middle" fill="#cbd5e1" fontSize="7">₹10k → ₹{Math.round(10000 * parseFloat(multiplier)).toLocaleString()}</text>

      {/* Feedback loop arrow */}
      <path d="M 384 48 C 384 18, 67 18, 67 44" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrow)" />
      <text x="220" y="24" textAnchor="middle" fill="#a5b4fc" fontSize="8">Borrower spends → Seller redeposits into banking loop</text>

      <text x="230" y="152" textAnchor="middle" fill="#64748b" fontSize="8">
        Fractional Reserve Multiplier Principle (Section 42 RBI Act & Section 24 BR Act)
      </text>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: RBI TRANSMISSION PIPELINE ────────────────
function RbiTransmissionPipelineSVG({ repo }: { repo: number }) {
  const isTight = repo >= 6.0;
  return (
    <svg viewBox="0 0 460 160" className="w-full h-auto max-h-48 drop-shadow-md select-none">
      <defs>
        <marker id="tArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
        </marker>
      </defs>

      {/* Frame */}
      <rect x="8" y="8" width="444" height="144" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />

      {/* Stage 1: RBI MPC */}
      <rect x="18" y="44" width="80" height="70" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
      <text x="58" y="62" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">1. RBI MPC</text>
      <text x="58" y="78" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="extrabold">{repo.toFixed(2)}%</text>
      <text x="58" y="92" textAnchor="middle" fill="#94a3b8" fontSize="7">Repo Rate</text>
      <text x="58" y="104" textAnchor="middle" fill={isTight ? '#f43f5e' : '#34d399'} fontSize="7" fontWeight="bold">
        {isTight ? '▲ Tightening' : '▼ Accommodative'}
      </text>

      {/* Arrow 1-2 */}
      <line x1="100" y1="79" x2="118" y2="79" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#tArrow)" />

      {/* Stage 2: Bank Cost of Funds */}
      <rect x="120" y="44" width="84" height="70" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="162" y="62" textAnchor="middle" fill="#7dd3fc" fontSize="8" fontWeight="bold">2. BANK MCLR</text>
      <text x="162" y="78" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">{(repo + 2.5).toFixed(2)}%</text>
      <text x="162" y="92" textAnchor="middle" fill="#94a3b8" fontSize="7">Lending Spread</text>
      <text x="162" y="104" textAnchor="middle" fill="#38bdf8" fontSize="7">Cost of Funds</text>

      {/* Arrow 2-3 */}
      <line x1="206" y1="79" x2="224" y2="79" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#tArrow)" />

      {/* Stage 3: Loan & Investment Demand */}
      <rect x="226" y="44" width="88" height="70" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="270" y="62" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="bold">3. LOAN DEMAND</text>
      <text x="270" y="78" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Higher EMIs</text>
      <text x="270" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="7">Borrowing Cost</text>
      <text x="270" y="104" textAnchor="middle" fill={isTight ? '#f87171' : '#4ade80'} fontSize="7" fontWeight="bold">
        {isTight ? '▼ Credit Contracts' : '▲ Credit Expands'}
      </text>

      {/* Arrow 3-4 */}
      <line x1="316" y1="79" x2="334" y2="79" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#tArrow)" />

      {/* Stage 4: Aggregate Demand & Inflation Target */}
      <rect x="336" y="44" width="102" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
      <text x="387" y="62" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontWeight="bold">4. TARGET CPI</text>
      <text x="387" y="78" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="extrabold">4.0% ± 2.0%</text>
      <text x="387" y="92" textAnchor="middle" fill="#a7f3d0" fontSize="7">Price Stability</text>
      <text x="387" y="104" textAnchor="middle" fill="#34d399" fontSize="7" fontWeight="bold">Target Corridor ✓</text>

      <text x="230" y="26" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">
        Monetary Policy Transmission Mechanism (Policy Rate → Commercial Rates → Aggregate Demand → CPI)
      </text>
      <text x="230" y="140" textAnchor="middle" fill="#64748b" fontSize="8">
        Quantitative Transmission Flow mandated under Section 45ZB of RBI Act 1934
      </text>
    </svg>
  );
}

// ─── CHALLENGE INTERFACE ────────────────────────────────────────────────────
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

// ─── 22 CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ──────────────────────────
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1 (Recall)
  {
    id: 'ch_econ_001',
    nodeId: NODE_C10_ECONAPP_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is unanticipated inflation referred to as "the debtor\'s friend" in economics?',
    options: [
      'Debtors receive interest rebates directly from the Reserve Bank of India',
      'Debtors repay fixed nominal debts with rupees that have eroded purchasing power',
      'Debtors are legally exempt from repaying loans during high inflation periods',
      'Commercial banks write off all unsecured loans when inflation crosses 6%',
    ],
    correctIndex: 1,
    explanation: 'Because nominal debt amounts remain fixed while price levels rise, borrowers repay loans with rupees of lower purchasing power. The real burden of debt falls.',
    hints: [
      'Think about the difference between nominal face value of a ₹100 note and what it can buy.',
      'If prices rise, does each rupee buy more or fewer goods when you repay?',
      'Since rupees buy less, repaying a fixed rupee amount means giving back less real purchasing power.',
    ],
    misconceptionIndex: 1,
  },
  // FOUNDATION 2 (Recall)
  {
    id: 'ch_econ_002',
    nodeId: NODE_C10_ECONAPP_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which deposit account pays NO interest and allows unlimited daily withdrawals for business traders?',
    options: [
      'Recurring Deposit Account (RD)',
      'Savings Bank Account',
      'Current Account',
      'Fixed Deposit Account (FD)',
    ],
    correctIndex: 2,
    explanation: 'Current accounts are designed for traders and businesses needing frequent liquidity without transaction caps, hence banks offer zero interest on current accounts.',
    hints: [
      'Think about what a busy Kirana store owner or corporate entity requires daily.',
      'Savings accounts restrict free transaction counts, while fixed deposits lock funds.',
      'The account tailored for continuous daily cash turnover with 0% interest is the Current Account.',
    ],
    misconceptionIndex: 0,
  },
  // FOUNDATION 3 (Understanding)
  {
    id: 'ch_econ_003',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under Section 22 of the RBI Act 1934, which currency note is NOT issued by the Reserve Bank of India?',
    options: [
      '₹10 Note (issued by SBI)',
      '₹1 Note (issued by Government of India Ministry of Finance)',
      '₹500 Note (issued by State Governments)',
      '₹200 Note (issued by Commercial Banks)',
    ],
    correctIndex: 1,
    explanation: 'The ₹1 note (bearing the signature of the Finance Secretary) and all coins are issued by the Ministry of Finance, Government of India, though circulated via the RBI.',
    hints: [
      'Look at the signature on a one-rupee note compared to a five-hundred-rupee note.',
      'The Governor of the RBI signs notes from ₹2 and above.',
      'The Government of India retains sole legal authority to issue ₹1 notes and mint coins.',
    ],
  },
  // FOUNDATION 4 (Drag-label)
  {
    id: 'ch_econ_004',
    nodeId: NODE_C10_ECONAPP_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each economic agent with their primary financial exposure during unanticipated inflation.',
    dragItems: [
      { label: 'Gains (Negative Real Interest)', targetId: 'box_debtor' },
      { label: 'Loses (Negative Real Return on FDs)', targetId: 'box_creditor' },
      { label: 'Loses (Erosion of Fixed Pension)', targetId: 'box_fixed' },
      { label: 'Gains (Inventory Value Appreciation)', targetId: 'box_producer' },
    ],
    correctMapping: {
      box_debtor: 'Gains (Negative Real Interest)',
      box_creditor: 'Loses (Negative Real Return on FDs)',
      box_fixed: 'Loses (Erosion of Fixed Pension)',
      box_producer: 'Gains (Inventory Value Appreciation)',
    },
    explanation: 'Unanticipated inflation redistributes wealth: borrowers gain as real debt declines, depositors lose real interest, unindexed pensioners lose purchasing power, and price-making producers gain on inventories.',
    hints: [
      'Who owes money and pays back cheaper rupees? (Debtor)',
      'Who deposited savings at a fixed nominal rate? (Creditor)',
      'Who receives the exact same unadjusted cash every month? (Fixed Income)',
    ],
  },
  // FOUNDATION 5 (Recall)
  {
    id: 'ch_econ_005',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the statutory CPI inflation target mandated to the RBI Monetary Policy Committee (MPC)?',
    options: [
      '0% strict zero inflation',
      '4.0% with a tolerance band of ± 2.0% (2% to 6%)',
      '8.0% to stimulate rapid industrial growth',
      '10.0% fixed ceiling',
    ],
    correctIndex: 1,
    explanation: 'Under the 2015 Monetary Policy Framework Agreement and the amended RBI Act 1934 (Section 45ZB), the MPC is mandated a 4% CPI inflation target with a ±2% tolerance corridor (2%–6%).',
    hints: [
      'The central midpoint target is 4%.',
      'The tolerance band allows a 2 percentage point deviation above and below.',
      'The corridor ranges between 2.0% minimum and 6.0% maximum.',
    ],
  },
  // FOUNDATION 6 (Understanding)
  {
    id: 'ch_econ_006',
    nodeId: NODE_C10_ECONAPP_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does an Overdraft facility differ from a standard Commercial Term Loan?',
    options: [
      'Overdraft is granted exclusively to farmers without any interest fee',
      'Overdraft allows current account holders to withdraw beyond their balance up to a limit, paying interest only on the overdrawn sum',
      'Term loans require no collateral, whereas overdrafts require 100% gold pledge',
      'Overdrafts are disbursed as lump sums repayable over 30 years',
    ],
    correctIndex: 1,
    explanation: 'An overdraft is an elastic credit facility attached to a current account where interest is computed on the daily negative balance, unlike term loans which disburse a fixed lump sum.',
    hints: [
      'Overdraft is linked to daily working balances.',
      'You only pay interest for the days and amount you actually overdraw.',
      'Term loans charge interest on the entire disbursed principal across scheduled instalments.',
    ],
  },
  // FOUNDATION 7 (Recall)
  {
    id: 'ch_econ_007',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a QUANTITATIVE credit control instrument used by the RBI?',
    options: [
      'Fixing Margin Requirements on crop loans',
      'Moral Suasion circulars to commercial bank MDs',
      'Cash Reserve Ratio (CRR)',
      'Credit Rationing for speculative real estate',
    ],
    correctIndex: 2,
    explanation: 'Quantitative measures (CRR, SLR, Repo Rate, Bank Rate, OMO) regulate the overall total volume of credit across all sectors indiscriminately.',
    hints: [
      'Quantitative tools affect the total volume of money in the entire economy.',
      'Qualitative tools target specific sectors or types of loans.',
      'CRR mandates a cash fraction of all deposits to be held with the RBI.',
    ],
    misconceptionIndex: 2,
  },

  // STANDARD 8 (Application - Numeric)
  {
    id: 'ch_econ_008',
    nodeId: NODE_C10_ECONAPP_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Priya deposits ₹5,00,000 in an SBI Fixed Deposit earning 5.5% nominal interest. If CPI inflation is 6.5%, calculate her real rate of return in percentage (%):',
    correctAnswer: -1.0,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Real Interest Rate = Nominal Interest Rate − Inflation Rate = 5.5% − 6.5% = −1.0%. Her purchasing power contracts by 1% annually.',
    hints: [
      'Use the Fisher formula: Real Rate = Nominal Rate − Inflation Rate.',
      'Subtract 6.5 from 5.5.',
      'The result is negative because inflation surpasses the deposit interest rate.',
    ],
    misconceptionIndex: 1,
  },
  // STANDARD 9 (Application - Numeric)
  {
    id: 'ch_econ_009',
    nodeId: NODE_C10_ECONAPP_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the Indian banking system, CRR is set at 4.5% and SLR at 18.0% (Total Reserve Ratio = 22.5%). What is the theoretical Credit Multiplier?',
    correctAnswer: 4.44,
    tolerance: 0.05,
    unit: 'x',
    explanation: 'Credit Creation Multiplier = 1 / (CRR + SLR) = 1 / 0.225 ≈ 4.44. An initial deposit of ₹1,000 can generate up to ₹4,444 in total system deposits.',
    hints: [
      'Total required reserve ratio = 4.5% + 18.0% = 22.5% = 0.225.',
      'Multiplier formula is 1 / Total Reserve Ratio.',
      'Compute 1 / 0.225 to two decimal places.',
    ],
  },
  // STANDARD 10 (Analysis)
  {
    id: 'ch_econ_010',
    nodeId: NODE_C10_ECONAPP_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Reliance Industries gain during the 2022 crude oil price surge while Tirupur textile exporters suffered margin compression?',
    options: [
      'Reliance received direct cash grants from the RBI while Tirupur mills did not',
      'Reliance is a price-maker with appreciating raw crude inventories; Tirupur exporters are price-takers facing 40% cost-push cotton spikes unable to hike export prices',
      'Textile exporters are debtors, whereas petroleum refiners are pure creditors',
      'Textile wages in India are indexed by 100% Dearness Allowance daily',
    ],
    correctIndex: 1,
    explanation: 'In cost-push inflation, price-taking firms facing intense global competition cannot pass cost increases to buyers, squeezing margins. Price-makers with existing inventory gain substantial inventory appreciation.',
    hints: [
      'Consider who can dictate selling prices in international competitive markets.',
      'If your raw material cost jumps 40% but foreign buyers can switch to Vietnam or Bangladesh, can you raise prices?',
      'Reliance holds large crude inventories that appreciated, and possesses domestic price-setting power.',
    ],
    misconceptionIndex: 0,
  },
  // STANDARD 11 (Drag-sort)
  {
    id: 'ch_econ_011',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of monetary transmission when RBI hikes the Repo Rate from 4.00% to 6.50% to fight demand-pull inflation:',
    sortItems: [
      'RBI increases Repo Rate by 250 basis points',
      'Commercial banks face higher borrowing costs and raise MCLR/lending rates',
      'Borrowers reduce consumption loans and capital investment due to high EMIs',
      'Aggregate demand in the economy contracts, causing CPI inflation to cool down',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Monetary transmission flows: Policy Rate hike → Commercial Bank Lending Rates (MCLR) rise → Credit Demand & Expenditure fall → Aggregate Demand falls → Inflation moderates.',
    hints: [
      'Start with the central bank policy decision.',
      'Next, commercial banks pass the higher cost to public borrowers.',
      'Next, consumers and businesses curtail spending due to higher interest burdens.',
      'Finally, aggregate market demand cools down price pressures.',
    ],
  },
  // STANDARD 12 (Application)
  {
    id: 'ch_econ_012',
    nodeId: NODE_C10_ECONAPP_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A central government employee on ₹40,000 basic salary receives 42% Dearness Allowance (DA), while a private security guard on ₹15,000 fixed wage receives zero DA. After 8% inflation, what happens?',
    options: [
      'Both suffer identical percentage real income erosion',
      'The government employee is partially insulated via biannual CPI-IW indexation; the private worker bears 100% of real purchasing power loss',
      'The private worker gains because fixed wages are exempt from income tax',
      'The government employee loses more because DA is deducted from savings',
    ],
    correctIndex: 1,
    explanation: 'Dearness Allowance (DA) under the Central Pay Commission acts as a price indexation shield for government employees and pensioners. Unindexed private/unorganised workers suffer full unmitigated real wage erosion.',
    hints: [
      'What is the explicit purpose of Dearness Allowance (DA)?',
      'DA increases periodically when the Consumer Price Index for Industrial Workers (CPI-IW) rises.',
      'Private unorganised employees without contract indexation receive no automatic nominal raise.',
    ],
    misconceptionIndex: 3,
  },
  // STANDARD 13 (Analysis)
  {
    id: 'ch_econ_013',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between the RBI Repo Rate and the Bank Rate based on collateral and tenor:',
    options: [
      'Repo Rate requires G-Sec collateral for short-term (1–7 days) liquidity; Bank Rate is for long-term uncollateralised lending (aligned with repo + 0.25%)',
      'Repo Rate is uncollateralised for 10 years; Bank Rate is collateralised for 1 day',
      'Repo Rate is charged to individual citizens; Bank Rate is charged to state governments',
      'Repo Rate is fixed by Parliament; Bank Rate is decided by commercial bank managers',
    ],
    correctIndex: 0,
    explanation: 'Repo (Repurchase Option) is the primary operative policy rate collateralised by Government Securities for short durations (1–7 days). Bank Rate is uncollateralised long-term penal/refinance rate.',
    hints: [
      'Repo stands for Repurchase Option of Government Securities (G-Secs).',
      'Repo is the active daily liquidity tool used by the MPC.',
      'Bank rate carries a penalty spread and requires no collateral.',
    ],
    misconceptionIndex: 4,
  },
  // STANDARD 14 (Construct)
  {
    id: 'ch_econ_014',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the RBI quantitative contractionary policy package to drain excess liquidity during rampant demand-pull inflation:',
    availableParts: [
      'Raise Repo Rate',
      'Lower Repo Rate',
      'Raise CRR',
      'Lower CRR',
      'Sell G-Secs in OMO',
      'Buy G-Secs in OMO',
      'Raise SLR',
    ],
    targetState: 'Raise Repo Rate Raise CRR Sell G-Secs in OMO Raise SLR',
    validationHint: 'Select all tightening tools: Increase Repo, Increase CRR, Sell Securities in Open Market, and Increase SLR.',
    explanation: 'To contract money supply, the RBI raises the Repo Rate (costlier borrowing), increases CRR and SLR (locking bank deposits into reserves), and sells G-Secs in Open Market Operations to absorb cash.',
    hints: [
      'To reduce liquidity, does the RBI make borrowing more expensive or cheaper?',
      'Does raising reserve ratios lock up more cash or free up cash?',
      'When RBI sells bonds, commercial banks give money to RBI, pulling money out of circulation.',
    ],
  },
  // STANDARD 15 (Understanding)
  {
    id: 'ch_econ_015',
    nodeId: NODE_C10_ECONAPP_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does the actual credit created by Indian banks fall short of the theoretical multiplier 1 / (CRR + SLR)?',
    options: [
      'Because the RBI prohibits commercial banks from earning interest on loans',
      'Due to currency leakage into cash circulation, banks holding excess reserves, and risk-averse credit rationing during NPA stress',
      'Because all commercial bank deposits are frozen under the Banking Regulation Act',
      'Because depositors withdraw 100% of their money as foreign exchange',
    ],
    correctIndex: 1,
    explanation: 'The theoretical multiplier assumes 100% redeposit without cash leakage and zero excess reserves. In reality, currency drain (approx 15%) and banks parking surplus in SDF/Reverse Repo reduce the realized multiplier.',
    hints: [
      'Do people keep 100% of their money in bank accounts, or do they hold paper cash notes?',
      'Do banks always lend out every single rupee permitted, or do they keep safe buffers?',
      'Cash leakage and excess reserve holdings diminish the multiplier loop.',
    ],
  },

  // ADVANCED 16 (Evaluation - Real Case Study)
  {
    id: 'ch_econ_016',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In April 2022, CPI inflation peaked at 7.79% due to crude oil and edible oil import shocks. Why could RBI repo rate hikes alone NOT bring instant relief to food and fuel prices?',
    options: [
      'Because repo rate hikes increase agricultural subsidies automatically',
      'Because oil and food inflation was cost-push from geopolitical supply disruptions; monetary tightening suppresses demand but cannot harvest crops or drill foreign oil',
      'Because the Monetary Policy Committee is only legally permitted to regulate gold prices',
      'Because commercial banks refused to adjust home loan rates',
    ],
    correctIndex: 1,
    explanation: 'Monetary policy operates on the demand side by raising the cost of borrowing. It cannot fix external cost-push supply shocks (such as Ukraine war oil disruption), which require fiscal supply interventions (excise tax cuts, import duty waivers).',
    hints: [
      'Can raising interest rates in Mumbai make crude oil ships in the Black Sea sail faster?',
      'Distinguish between demand-pull (excess domestic buying) and cost-push (global supply shortages).',
      'Monetary policy cools aggregate demand, but supply shocks require fiscal and trade measures.',
    ],
  },
  // ADVANCED 17 (Analysis - Numeric Multi-step)
  {
    id: 'ch_econ_017',
    nodeId: NODE_C10_ECONAPP_031,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A pensioner received a fixed unindexed pension of ₹20,000/month in 2020 (CPI base = 100). By 2023, cumulative CPI reached 125 (25% inflation). What is the real monthly purchasing power of the pension in 2020 rupees?',
    correctAnswer: 16000,
    tolerance: 50,
    unit: '₹/month',
    explanation: 'Real Wage / Pension = (Nominal Wage / CPI) × 100 = (₹20,000 / 125) × 100 = ₹16,000. The pensioner has suffered a real monthly income loss of ₹4,000 (20% real loss).',
    hints: [
      'Use the formula: Real Value = (Nominal Value / Current Price Index) × Base Index (100).',
      'Divide 20,000 by 125.',
      'Multiply the quotient 160 by 100.',
    ],
  },
  // ADVANCED 18 (Evaluation - Qualitative Control)
  {
    id: 'ch_econ_018',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In November 2023, the RBI noticed unsecured personal loans and credit cards growing at >25% per annum. What qualitative action did RBI take, and why?',
    options: [
      'RBI banned all commercial banking operations across India',
      'RBI increased risk weights on unsecured consumer credit by 25 percentage points (Qualitative/Selective directive) to curb speculative lending without choking MSME manufacturing credit',
      'RBI increased repo rate to 20% to freeze all industrial lending',
      'RBI converted all credit card balances into government bonds',
    ],
    correctIndex: 1,
    explanation: 'Qualitative/Selective credit controls target specific high-risk sectors (unsecured retail credit) through margin/risk-weight hikes and moral suasion, avoiding blunt rate hikes that would hurt productive manufacturing and agriculture.',
    hints: [
      'Qualitative tools are precision instruments, not blunt hammers.',
      'Did the RBI want to punish all factory loans, or just runaway unsecured credit card debt?',
      'Selective risk weight adjustment alters the flow of credit to a specific target sector.',
    ],
    misconceptionIndex: 2,
  },
  // ADVANCED 19 (Creativity / Policy Design)
  {
    id: 'ch_econ_019',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design the ideal credit policy for an economic recession where retail inflation is comfortably low at 2.5% but industrial manufacturing is stagnant:',
    options: [
      'Contractionary: Raise CRR to 10% and hike Repo Rate to 9%',
      'Expansionary: Lower Repo Rate, decrease CRR/SLR, conduct OMO bond purchases, and lower margin requirements for MSME factory loans',
      'Qualitative ban: Prohibit commercial banks from issuing loans to all businesses',
      'Impose strict 50% margin requirements on all productive priority sector investments',
    ],
    correctIndex: 1,
    explanation: 'In a recession with low inflation, an expansionary monetary policy (rate cuts, reserve cuts, liquidity injections via OMO purchases, and relaxed margin requirements) lowers borrowing costs and stimulates investment demand.',
    hints: [
      'In a recession, businesses need cheap and abundant credit to hire and expand.',
      'Lowering repo rate reduces loan EMIs.',
      'Decreasing CRR leaves more loanable funds with commercial banks.',
    ],
  },
  // ADVANCED 20 (Analysis - Floating vs Fixed Debt)
  {
    id: 'ch_econ_020',
    nodeId: NODE_C10_ECONAPP_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Evaluate why a home loan borrower on a FLOATING interest rate linked to RBI Repo does NOT gain as much from inflation as a fixed-rate borrower:',
    options: [
      'Floating rate loans are forgiven by the government during inflation',
      'When inflation rises, RBI hikes repo rate → bank raises floating MCLR/EBLR → loan EMI increases, neutralizing the debtor’s inflation benefit',
      'Fixed rate borrowers are forced to pay double principal when prices double',
      'Commercial banks only allow politicians to hold floating rate loans',
    ],
    correctIndex: 1,
    explanation: 'The debtor gain occurs when nominal interest is sticky/fixed. With modern Indian floating-rate retail loans (EBLR linked to Repo), RBI rate hikes raise nominal EMIs, preserving the bank’s real return and eroding the debtor’s gain.',
    hints: [
      'What happens to floating loan EMIs when RBI hikes the repo rate?',
      'If your loan interest rate rises from 7% to 9.5% during inflation, is your nominal payment staying the same?',
      'Automatic upward adjustment of nominal borrowing costs transfers the burden back to the borrower.',
    ],
  },
  // ADVANCED 21 (Drag-sort - Credit Creation Round-by-Round)
  {
    id: 'ch_econ_021',
    nodeId: NODE_C10_ECONAPP_032,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the progressive credit creation rounds starting from an initial ₹10,000 cash deposit in SBI with Total Reserve Ratio (CRR + SLR) = 20%:',
    sortItems: [
      'Round 1: SBI keeps ₹2,000 reserve and lends ₹8,000 to Borrower A',
      'Round 2: Borrower A spends ₹8,000; Merchant deposits ₹8,000 in HDFC, which keeps ₹1,600 reserve and lends ₹6,400',
      'Round 3: ICICI receives ₹6,400 deposit, keeps ₹1,280 reserve and lends ₹5,120',
      'Limit: Total cumulative deposits across banking system expand towards ₹50,000',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Each round preserves 20% in statutory reserves and lends 80%. Cumulative system deposits sum to ₹10,000 × (1 / 0.20) = ₹50,000, creating ₹40,000 in new deposit money.',
    hints: [
      'Round 1 starts with the initial ₹10,000 cash deposit.',
      'Round 2 receives the ₹8,000 loan disbursement as a new deposit.',
      'Round 3 receives 80% of ₹8,000 (which is ₹6,400).',
      'The theoretical infinite sum converges to ₹10,000 × 5 = ₹50,000.',
    ],
  },
  // ADVANCED 22 (Evaluation - Section 45ZN Mandate)
  {
    id: 'ch_econ_022',
    nodeId: NODE_C10_ECONAPP_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Under Section 45ZN of the RBI Act 1934, what mandatory action was the RBI forced to take when CPI inflation exceeded 6% for three consecutive quarters in 2022?',
    options: [
      'Dissolve the commercial banking system and print new physical currency',
      'Submit a formal explanation report to the Central Government detailing failure causes, remedial rate hikes, and the time horizon to restore the 4% target',
      'Impose a 100% tax on all agricultural food grains',
      'Resign the entire Monetary Policy Committee without replacement',
    ],
    correctIndex: 1,
    explanation: 'Section 45ZN establishes statutory accountability: if inflation breaches the 2%–6% band for 3 consecutive quarters, the RBI must formally report to the Union Government with remedial strategies.',
    hints: [
      'Think of legal accountability mechanisms in modern central banking.',
      'Does the RBI Governor write a formal statutory report to the Ministry of Finance?',
      'The law requires outlining remedial steps, such as repo rate tightening timelines.',
    ],
  },
];

// ─── PROPS INTERFACE ───────────────────────────────────────────���────────────
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

// ─── DEFAULT PROPS ──────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_ECONAPP_031,
  title: 'Inflation Redistribution, Commercial Banks & RBI Credit Control',
  definition:
    'Inflation is a sustained rise in the general price level that redistributes real wealth from creditors and fixed-income earners to debtors and price-making producers. Commercial banks mobilize deposits and generate credit via the multiplier 1 / (CRR + SLR). The Reserve Bank of India regulates aggregate money supply and sectoral credit direction through quantitative tools (Repo, Reverse Repo, Bank Rate, CRR, SLR, OMO) and qualitative tools (margin requirements, moral suasion, selective credit control) to maintain price stability around the 4% ± 2% target.',
  eli5:
    'Think of inflation like a silent discount on old debts: if you borrowed ₹100 yesterday when rice was ₹50/kg, you repay ₹100 tomorrow when rice is ₹100/kg—giving back half the real rice! Commercial banks turn ₹1,000 of cash into over ₹4,000 of loans by re-lending deposits. The RBI is the captain who taps the brakes (raising interest rates & reserves) when the economic train runs too hot.',
  misconceptions: [
    {
      misconception: 'All producers gain equally during inflation because selling prices rise.',
      correction:
        'Only price-makers in demand-pull inflation gain. Price-taking exporters (like Tirupur garment makers) facing raw material spikes lose because global competition prevents them from hiking export prices.',
    },
    {
      misconception: 'If nominal savings grow at 5.5% in a fixed deposit, the saver is definitely getting richer.',
      correction:
        'If CPI inflation is 6.5%, the real return is 5.5% − 6.5% = −1.0%. The nominal balance grows, but its actual basket-of-goods purchasing power contracts.',
    },
    {
      misconception: 'Quantitative and qualitative credit controls are identical tools.',
      correction:
        'Quantitative controls (Repo, CRR, SLR, OMO) regulate the total volume of credit across the whole economy. Qualitative controls (margins, moral suasion) direct credit toward or away from specific target sectors.',
    },
    {
      misconception: 'All salaried workers suffer identical real losses from inflation.',
      correction:
        'Central and state government workers receive biannual Dearness Allowance (DA) linked to CPI-IW, which partially shields their purchasing power. Unindexed private/unorganised workers bear 100% of the loss.',
    },
    {
      misconception: 'Repo Rate and Bank Rate are the same thing.',
      correction:
        'Repo Rate is short-term (1–7 days) with government bond collateral (the active MPC policy rate). Bank Rate is longer-term without collateral, serving primarily as a penalty reference rate.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Who benefits when inflation unexpectedly rises above the loan interest rate?',
      options: ['Creditors / Savers', 'Debtors / Borrowers', 'Fixed Pensioners', 'Cash hoarders'],
      correctIndex: 1,
    },
    {
      question: 'What is the formula for the theoretical bank credit creation multiplier?',
      options: ['1 / (CRR + SLR)', 'CRR × SLR', '(Deposit − Loan) / 100', 'Repo Rate × 100'],
      correctIndex: 0,
    },
    {
      question: 'Which rate is the primary operative policy rate set by the RBI MPC?',
      options: ['Bank Rate', 'Repo Rate', 'Reverse Repo Rate', 'Savings Deposit Rate'],
      correctIndex: 1,
    },
    {
      question: 'What is the RBI’s statutorily mandated CPI inflation target range?',
      options: ['0% to 1%', '2% to 6% (4% ± 2%)', '7% to 10%', '12% constant'],
      correctIndex: 1,
    },
    {
      question: 'Which account pays NO interest and suits high-frequency business transactions?',
      options: ['Savings Account', 'Current Account', 'Recurring Deposit', 'Public Provident Fund'],
      correctIndex: 1,
    },
    {
      question: 'What happens to real wage if nominal wage remains ₹30,000 while prices double?',
      options: ['Doubles to ₹60,000', 'Halves to ₹15,000', 'Remains unchanged', 'Falls to zero'],
      correctIndex: 1,
    },
    {
      question: 'When the RBI sells government securities in the open market (OMO), what happens?',
      options: ['Liquidity expands', 'Liquidity is absorbed / sucked out', 'Interest rates drop to zero', 'CRR becomes 0%'],
      correctIndex: 1,
    },
    {
      question: 'Why do floating rate borrowers gain less from inflation than fixed rate borrowers?',
      options: ['Their nominal EMIs rise as RBI hikes repo', 'They get free cash from banks', 'Their loan term is cut in half', 'Floating rates are illegal'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Student can compute real interest and real wages using Indian economic data, model round-by-round credit creation with reserve ratios, trace the monetary policy transmission chain from Repo Rate to inflation, and distinguish quantitative from qualitative credit controls.',
};

// ─── EXPLORATION STEPS ──────────────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. The Inflation Redistribution Seesaw',
    instruction: 'Adjust the Inflation and Nominal Interest sliders to see how real wealth shifts between Karthik (Debtor), Lakshmi (Creditor), Murthy (Fixed Income), and Ambani (Producer).',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_ECONAPP_031,
  },
  {
    title: '2. Four Types of Bank Deposits',
    instruction: 'Click each bank deposit type to inspect its interest rate, transaction flexibility, and target Indian customer persona.',
    interactionType: 'click-account',
    nodeId: NODE_C10_ECONAPP_032,
  },
  {
    title: '3. The Commercial Bank Multiplier Machine',
    instruction: 'Change the CRR and SLR reserve sliders and watch how an initial ₹10,000 cash deposit multiplies across successive banking rounds.',
    interactionType: 'slider-multiplier',
    nodeId: NODE_C10_ECONAPP_032,
  },
  {
    title: '4. RBI Monetary Transmission Pipeline',
    instruction: 'Drag the RBI Repo Rate lever up or down and trace the 6-step cause-and-effect chain all the way to consumer price inflation.',
    interactionType: 'slider-transmission',
    nodeId: NODE_C10_ECONAPP_033,
  },
  {
    title: '5. Quantitative vs Qualitative Control Arsenal',
    instruction: 'Switch between Quantitative (Total Volume) and Qualitative (Directional) tools to resolve inflation and credit bubbles.',
    interactionType: 'toggle-tools',
    nodeId: NODE_C10_ECONAPP_033,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'PREDICT: If CPI inflation rises to 8.0% while SBI Fixed Deposit rate stays at 5.5%, what will happen to Lakshmi’s real savings purchasing power?',
    options: [
      'Increases by 2.5% because nominal interest is positive',
      'Decreases by 2.5% in real terms (5.5% − 8.0% = −2.5%)',
      'Remains unaffected because SBI is a government-backed bank',
      'Doubles because prices are rising',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now set Inflation = 8.0% and Nominal Rate = 5.5% in the visualizer above to observe the real return gauge drop into the negative zone!',
    nodeId: NODE_C10_ECONAPP_031,
  },
  {
    question: 'PREDICT: If the RBI increases CRR from 4.5% to 6.5% and SLR from 18.0% to 20.0%, what will happen to the credit creation capacity of commercial banks?',
    options: [
      'Credit multiplier will rise, expanding bank loans',
      'Credit multiplier will drop from 4.44x to 3.77x, contracting total loanable funds',
      'Banks will stop accepting deposits entirely',
      'Credit creation is mathematically independent of CRR and SLR',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the CRR and SLR sliders to 6.5% and 20.0% to verify the drop in the total deposit multiplier!',
    nodeId: NODE_C10_ECONAPP_032,
  },
];

// ─── OBSERVATION QUESTIONS ──────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe on the real interest rate gauge when Inflation Rate exceeds Nominal Loan Rate?',
    observableOptions: [
      'Real interest rate turns negative, meaning the debtor effectively repays less real purchasing power than borrowed',
      'Real interest rate spikes to +100%',
      'The bank earns supernormal real profit',
      'The nominal loan amount automatically shrinks to zero',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_ECONAPP_031,
  },
  {
    question: 'When you increase the Repo Rate by 2.5% on the transmission simulator, what happens to Aggregate Demand and CPI Inflation?',
    observableOptions: [
      'Both Aggregate Demand and CPI Inflation expand rapidly',
      'MCLR rises → EMIs increase → Loan demand contracts → CPI Inflation cools down toward target',
      'No parameter changes on the transmission pipeline',
      'Commercial banks lower their deposit and lending rates',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_ECONAPP_033,
  },
];

// ─── REAL-WORLD ACTIVITY ───────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Be the RBI Governor: The 2026 Monetary Policy Simulation',
  description:
    'You are appointed RBI Governor during an unexpected international supply shock. Retail inflation has surged to 7.2%, while commercial banks are heavily issuing unsecured personal loans. Write down your policy directive:',
  steps: [
    'Calculate the Real Interest Rate for a fixed deposit at 6.0% under 7.2% inflation (6.0% − 7.2% = −1.2%).',
    'Prescribe a quantitative repo rate hike (e.g., +50 bps to 7.00%) to cool overall aggregate demand.',
    'Increase CRR from 4.5% to 5.0% to suck ₹1,00,000+ crore of excess liquidity from the interbank system.',
    'Issue a qualitative directive (Moral Suasion + higher margin/risk weights on unsecured credit cards) to protect financial stability without strangling agricultural credit.',
  ],
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
function C10_EconApplicationsEffectsInflationDebtorsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── 1. CORE FLOW STATE ───────────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // ─── 2. BRILLIANT.ORG INTERACTION STATES ─────────────────────────────────
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── REFLECTION ANSWERS STATE ─────────────────────────────────────────────
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explainFriend: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // ─── 3. SIMULATOR SLIDERS & LIVE CONTROLS (30+ STATES) ────────────────────
  const [inflationRate, setInflationRate] = useState<number>(6.5);
  const [nominalLoanRate, setNominalLoanRate] = useState<number>(4.0);
  const [nominalDepositRate, setNominalDepositRate] = useState<number>(5.5);
  const [monthlyPensionNominal, setMonthlyPensionNominal] = useState<number>(20000);
  const [crrPercent, setCrrPercent] = useState<number>(4.5);
  const [slrPercent, setSlrPercent] = useState<number>(18.0);
  const [initialCashDeposit, setInitialCashDeposit] = useState<number>(10000);
  const [repoRate, setRepoRate] = useState<number>(6.50);
  const [activeDepositTab, setActiveDepositTab] = useState<'savings' | 'current' | 'rd' | 'fd'>('savings');
  const [selectedToolCategory, setSelectedToolCategory] = useState<'quantitative' | 'qualitative'>('quantitative');
  const [activeQualTool, setActiveQualTool] = useState<string>('margin');
  const [selectedAgent, setSelectedAgent] = useState<'debtor' | 'creditor' | 'fixed' | 'producer'>('debtor');

  // ─── 4. CHALLENGE INTERACTION & FEEDBACK STATES ───────────────────────────
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── 5. VISUAL FEEDBACK POPUPS ─��──────────────────────────────────────────
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── 6. REFS ──────────────────────────────────────────────────────────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const subjectConfig = SUBJECT_CONFIG['commstud'] || { name: 'Commercial Applications', emoji: '📈', color: 'emerald' };

  // ─── 7. DERIVED CALCULATIONS (REAL TIME) ───────────────────────────────────
  const realLoanRate = useMemo(() => +(nominalLoanRate - inflationRate).toFixed(2), [nominalLoanRate, inflationRate]);
  const realDepositRate = useMemo(() => +(nominalDepositRate - inflationRate).toFixed(2), [nominalDepositRate, inflationRate]);
  const realPensionValue = useMemo(() => {
    const cpiFactor = 1 + inflationRate / 100;
    return Math.round(monthlyPensionNominal / cpiFactor);
  }, [monthlyPensionNominal, inflationRate]);

  const totalReserveRatio = useMemo(() => +((crrPercent + slrPercent) / 100).toFixed(4), [crrPercent, slrPercent]);
  const creditMultiplier = useMemo(() => {
    if (totalReserveRatio <= 0) return 100;
    return +(1 / totalReserveRatio).toFixed(2);
  }, [totalReserveRatio]);

  const maxTotalDeposits = useMemo(() => Math.round(initialCashDeposit * creditMultiplier), [initialCashDeposit, creditMultiplier]);

  // Round-by-round credit simulation data
  const creditRoundsData = useMemo(() => {
    const rounds = [];
    let currentDep = initialCashDeposit;
    let totalDep = 0;
    let totalLoans = 0;
    let totalRes = 0;

    for (let r = 1; r <= 4; r++) {
      const reserve = Math.round(currentDep * totalReserveRatio);
      const loan = Math.max(0, currentDep - reserve);
      totalDep += currentDep;
      totalLoans += loan;
      totalRes += reserve;

      rounds.push({
        round: `R${r}`,
        deposit: currentDep,
        reserve,
        loan,
        cumulativeDeposit: totalDep,
      });

      currentDep = loan;
    }
    return rounds;
  }, [initialCashDeposit, totalReserveRatio]);

  // Derived Transmission Pipeline indicators
  const transmissionMclr = useMemo(() => +(repoRate + 2.6).toFixed(2), [repoRate]);
  const projectedInflation = useMemo(() => {
    const baseInf = 8.5;
    const impact = (repoRate - 4.0) * 1.15;
    return Math.max(2.0, +(baseInf - impact).toFixed(2));
  }, [repoRate]);

  // ─── 8. FILTERED CHALLENGES BY DIFFICULTY ─────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 9. LOAD EXISTING MASTERY ON MOUNT (EFFECT 1) ─────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── 10. ADAPTIVE BKT DIFFICULTY EFFECT (EFFECT 2) ────────────────────────
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

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 11. HTML CANVAS 2D ANIMATION (EFFECT 3) ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset += 0.8;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background glow grid
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Animated money flow wave
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 30 + Math.sin((x + particleOffset * 3) * 0.04) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Floating Rupee symbol particles
      const symbols = ['₹', '₹', '₹', '₹', '₹'];
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillStyle = '#34d399';
      symbols.forEach((sym, idx) => {
        const px = (particleOffset * 1.5 + idx * 90) % canvas.width;
        const py = 30 + Math.sin((px + particleOffset) * 0.04) * 12;
        ctx.fillText(sym, px, py - 6);
      });

      animFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameId);
  }, [phase]);

  // ─── 12. CLEANUP INACTIVITY TIMER (EFFECT 4) ──────────────────────────────
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── 13. SPEECH ON SLIDE CHANGE (EFFECT 5) ────────────────────────────────
  useEffect(() => {
    if (phase === 'explore') {
      speechManager.speak(EXPLORATION_STEPS[currentSlide].title);
    }
  }, [phase, currentSlide]);

  // ─── 14. USECALLBACK HANDLERS ─────────────────────────────────────────────

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step ICSE explanation.');
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && !showExplanation && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, showExplanation, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You spotted the debtor gain.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Touch and experiment with each model.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode unlocked. Freely adjust all economic levers without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase initiated. Apply your understanding to solve real Indian economic cases.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the live sliders to test your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Check the gauges closely.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
      resetInactivityTimer();
    },
    [draggedItem, activeChallenge, resetInactivityTimer]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        let arr = prev.length === 0 && activeChallenge.sortItems ? activeChallenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
      resetInactivityTimer();
    },
    [activeChallenge, resetInactivityTimer]
  );

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.05);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant economic reasoning.');
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
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete solution breakdown.');
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
    [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

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
      const finalScore = Math.max(0, 100 - errors * 5);
      recordGameScore(ALL_NODE_IDS, finalScore);
      if (onComplete) onComplete(finalScore);
      setPhase('complete');
      setShowSuccess(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered Inflation, Commercial Banking, and RBI Credit Control!');
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, errors, onComplete, resetInactivityTimer]);

  const handleSelectAgent = useCallback((agent: 'debtor' | 'creditor' | 'fixed' | 'producer') => {
    setSelectedAgent(agent);
    audioManager.play('tap');
    const agentSpeeches = {
      debtor: 'Karthik the farmer: My ₹1,00,000 SBI loan has negative real interest! I repay cheaper rupees.',
      creditor: 'Lakshmi the pensioner: My ₹5,00,000 SBI FD earns 5.5%, but 6.5% inflation shrinks its purchasing power.',
      fixed: 'Murthy the private worker: My ₹20,000 monthly salary buys 20% less food and fuel without DA indexation.',
      producer: 'Reliance Refineries: Our crude oil inventories gained substantial value during the price hike.',
    };
    speechManager.speak(agentSpeeches[agent]);
  }, []);

  const handleSelectDepositTab = useCallback((tab: 'savings' | 'current' | 'rd' | 'fd') => {
    setActiveDepositTab(tab);
    audioManager.play('tap');
    const info = {
      savings: 'Savings Account: 2.70% to 3.00% p.a. for individuals. Calculated daily, restricts commercial transactions.',
      current: 'Current Account: 0% interest, unlimited daily transactions and overdraft facility for business merchants.',
      rd: 'Recurring Deposit: Fixed monthly savings building an investment corpus over 12 to 120 months.',
      fd: 'Fixed Deposit: Lump-sum term deposit (7 days to 10 years) yielding highest guaranteed interest (up to 7.0%).',
    };
    speechManager.speak(info[tab]);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800/80"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ICSE Class 10 Economics
              </span>
              <span className="text-xs font-mono text-slate-400">c10_econapp_031 • 032 • 033</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <span
              key={p}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE (HOOK) ─────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div
          key="discovery-phase"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-700/40">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
              <span>🌾</span>
              <span>Case Scenario Hook: 2022 Vidarbha & Pune</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
              ⚡ <strong>Your Role:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-semibold text-amber-300 mb-4 flex items-center gap-2">
              <span>❓</span>
              <span>Initial Discovery Question (Low Stakes Curiosity Hook)</span>
            </h3>
            <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400 opacity-60'
                      : 'bg-slate-800/90 border-slate-700 hover:border-indigo-500 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm">
                  {discoveryCorrect ? (
                    <p className="text-emerald-400 font-semibold">✓ Correct Intuition! Debtor gains when prices surge.</p>
                  ) : (
                    <p className="text-amber-400 font-semibold">{DISCOVERY_QUESTION.hintAfter}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    Let’s step into the Brilliant-style interactive labs to model the real numbers.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-950/50 hover:brightness-110 shrink-0"
                >
                  Let's Explore the Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (INTERACTIVE GUIDED BRILLIANT LABS) ───────────── */}
      {phase === 'explore' && (
        <motion.div key="explore-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Progress & Step Tabs */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                  {idx + 1}
                </span>
                <span>{step.title.split('. ')[1]}</span>
              </motion.button>
            ))}
          </div>

          {/* Current Interactive Slide Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-emerald-400">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-amber-300 text-sm mb-6 flex items-center gap-2">
                <span>👉</span>
                <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </p>

              {/* ── LAB 1: INFLATION REDISTRIBUTION SEESAW ─────────────────── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 1 */}
                  <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <InflationSeesawSVG inflation={inflationRate} nominalRate={nominalLoanRate} />
                  </div>

                  {/* Predict Then Check Section */}
                  {!predictionMade && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700/50 mb-4"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Predict First</span>
                      <p className="text-sm text-white font-medium mt-1 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left rounded-xl bg-slate-900 border border-indigo-800/60 hover:border-indigo-400 text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600/40 text-xs text-amber-300 flex items-center justify-between">
                      <span>{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPredictionVerified(true)}
                        className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
                      >
                        Verified!
                      </motion.button>
                    </div>
                  )}

                  {/* Dual Sliders: Inflation vs Nominal Rates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span className="font-semibold text-rose-400">Headline CPI Inflation:</span>
                        <span className="font-mono font-bold text-rose-400">{inflationRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        step={0.5}
                        value={inflationRate}
                        onChange={e => {
                          setInflationRate(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Headline CPI Inflation"
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>0% (Stable)</span>
                        <span>4% (RBI Target)</span>
                        <span>15% (Hyperinflation)</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span className="font-semibold text-emerald-400">SBI Nominal Loan Rate:</span>
                        <span className="font-mono font-bold text-emerald-400">{nominalLoanRate}%</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={15}
                        step={0.5}
                        value={nominalLoanRate}
                        onChange={e => {
                          setNominalLoanRate(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Nominal Loan Interest Rate"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                        <span>1%</span>
                        <span>4% (Kisan Card)</span>
                        <span>15% (Unsecured)</span>
                      </div>
                    </div>
                  </div>

                  {/* Multi-Representation: Live Interactive Agent Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectAgent('debtor')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAgent === 'debtor'
                          ? 'bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">🚜</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold ${
                            realLoanRate < 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {realLoanRate < 0 ? 'GAINS ✓' : 'NEUTRAL'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Karthik (Farmer / Debtor)</h4>
                      <p className="text-[11px] text-slate-400 mt-1">₹1,00,000 Loan @ {nominalLoanRate}%</p>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">Real Interest Paid:</span>
                        <p className={`font-mono font-bold text-sm ${realLoanRate < 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                          {nominalLoanRate}% − {inflationRate}% = {realLoanRate}%
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectAgent('creditor')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAgent === 'creditor'
                          ? 'bg-rose-950/60 border-rose-500 ring-2 ring-rose-500/30'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">👵</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-bold ${
                            realDepositRate < 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {realDepositRate < 0 ? 'LOSES ✗' : 'GAINS'}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Lakshmi (Creditor / Saver)</h4>
                      <p className="text-[11px] text-slate-400 mt-1">₹5,00,000 SBI FD @ {nominalDepositRate}%</p>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">Real FD Return:</span>
                        <p className={`font-mono font-bold text-sm ${realDepositRate < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {nominalDepositRate}% − {inflationRate}% = {realDepositRate}%
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectAgent('fixed')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAgent === 'fixed'
                          ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-500/30'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">👔</span>
                        <span className="text-xs px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-400">
                          LOSES ✗
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Murthy (Fixed Salaried)</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Nominal: ₹{monthlyPensionNominal.toLocaleString()}/mo</p>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">Real Purchasing Power:</span>
                        <p className="font-mono font-bold text-sm text-amber-400">
                          ₹{realPensionValue.toLocaleString()}/mo
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSelectAgent('producer')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedAgent === 'producer'
                          ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30'
                          : 'bg-slate-950 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">🏭</span>
                        <span className="text-xs px-2 py-0.5 rounded font-bold bg-indigo-500/20 text-indigo-400">
                          PRICE-MAKER GAINS
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Reliance Industries</h4>
                      <p className="text-[11px] text-slate-400 mt-1">Petrochemical Refineries</p>
                      <div className="mt-3 pt-2 border-t border-slate-800 text-xs">
                        <span className="text-slate-400">Inventory Effect:</span>
                        <p className="font-mono font-bold text-sm text-indigo-300">Appreciation Gain</p>
                      </div>
                    </motion.div>
                  </div>

                  {inflationRate >= 6.0 && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800"
                    >
                      <p className="text-xs font-bold text-amber-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── LAB 2: COMMERCIAL BANK DEPOSIT FUNCTIONS ──────────────── */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'savings' as const, name: 'Savings Account', rate: '2.70%–3.00%', icon: '💳' },
                      { id: 'current' as const, name: 'Current Account', rate: '0.00% (Nil)', icon: '🏬' },
                      { id: 'rd' as const, name: 'Recurring Deposit', rate: '6.50%–6.80%', icon: '📅' },
                      { id: 'fd' as const, name: 'Fixed Deposit', rate: '6.80%–7.10%', icon: '🔒' },
                    ].map(tab => (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectDepositTab(tab.id)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          activeDepositTab === tab.id
                            ? 'bg-emerald-950/70 border-emerald-500 shadow-lg shadow-emerald-950'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-2xl mb-1">{tab.icon}</div>
                        <h4 className="text-xs font-bold text-white">{tab.name}</h4>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">{tab.rate}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                        <span>🔍</span>
                        <span>Key Statutory Features & CISCE Distinction</span>
                      </h3>
                      {activeDepositTab === 'savings' && (
                        <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                          <li>• <strong>Target Audience:</strong> Salaried individuals, students, households.</li>
                          <li>• <strong>Interest Calculation:</strong> Calculated on daily product balance, credited quarterly.</li>
                          <li>• <strong>Withdrawal Policy:</strong> Unlimited deposits, but limited free ATM/cheque withdrawals per month.</li>
                          <li>• <strong>Objective:</strong> Inculcates thrift and savings habit among individuals.</li>
                        </ul>
                      )}
                      {activeDepositTab === 'current' && (
                        <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                          <li>• <strong>Target Audience:</strong> Business enterprises, Kirana shops, joint stock companies.</li>
                          <li>• <strong>Interest Paid:</strong> Strictly 0% (Nil) interest under RBI regulations.</li>
                          <li>• <strong>Withdrawal Policy:</strong> Unlimited transactions, cash deposits, and withdrawals daily.</li>
                          <li>• <strong>Exclusive Feature:</strong> Overdraft facility permitted against sanctioned credit limits.</li>
                        </ul>
                      )}
                      {activeDepositTab === 'rd' && (
                        <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                          <li>• <strong>Target Audience:</strong> Regular income earners planning a planned future lump sum.</li>
                          <li>• <strong>Contribution:</strong> Fixed sum deposited every single month for 12 to 120 months.</li>
                          <li>• <strong>Interest Rate:</strong> Compounded quarterly at term deposit rates.</li>
                          <li>• <strong>Premature Closure:</strong> Allowed with nominal penalty interest.</li>
                        </ul>
                      )}
                      {activeDepositTab === 'fd' && (
                        <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
                          <li>• <strong>Target Audience:</strong> Retirees, investors with surplus lump-sum capital.</li>
                          <li>• <strong>Tenor:</strong> 7 days to 10 years fixed duration.</li>
                          <li>• <strong>Liquidity:</strong> Loan up to 90% of FD value can be availed without breaking deposit.</li>
                          <li>• <strong>Interest Payout:</strong> Highest deposit yield; cumulative or monthly/quarterly payout.</li>
                        </ul>
                      )}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800/80">
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                        Secondary Commercial Banking Functions
                      </h4>
                      <div className="space-y-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="font-bold text-indigo-400">1. Agency Functions:</span>
                          <p className="text-slate-300 text-[11px] mt-0.5">
                            Collecting dividend cheques, auto-debit of electricity bills/SIPs, executing standing instructions, acting as trustee/executor.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="font-bold text-teal-400">2. General Utility Functions:</span>
                          <p className="text-slate-300 text-[11px] mt-0.5">
                            Safe deposit lockers, issuing Demand Drafts (DD) & Travelers Cheques, foreign exchange remittance, underwriting corporate IPOs.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: CREDIT CREATION MULTIPLIER MACHINE ─────────────── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 2 */}
                  <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <CreditMultiplierFlowSVG crr={crrPercent} slr={slrPercent} />
                  </div>

                  {/* Reserve Ratio Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span className="font-semibold text-indigo-400">Initial Cash Deposit (₹):</span>
                        <span className="font-mono font-bold text-white">₹{initialCashDeposit.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min={1000}
                        max={50000}
                        step={1000}
                        value={initialCashDeposit}
                        onChange={e => {
                          setInitialCashDeposit(parseInt(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Initial Cash Deposit"
                        className="w-full accent-indigo-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span className="font-semibold text-teal-400">CRR (held with RBI):</span>
                        <span className="font-mono font-bold text-teal-400">{crrPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min={3}
                        max={10}
                        step={0.5}
                        value={crrPercent}
                        onChange={e => {
                          setCrrPercent(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Cash Reserve Ratio CRR"
                        className="w-full accent-teal-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span className="font-semibold text-amber-400">SLR (held in G-Secs/Gold):</span>
                        <span className="font-mono font-bold text-amber-400">{slrPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={30}
                        step={1}
                        value={slrPercent}
                        onChange={e => {
                          setSlrPercent(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set Statutory Liquidity Ratio SLR"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Multiplier KPI Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Total Reserve (CRR+SLR):</span>
                      <p className="text-lg font-mono font-bold text-indigo-400">{(crrPercent + slrPercent).toFixed(1)}%</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Credit Multiplier:</span>
                      <p className="text-lg font-mono font-bold text-emerald-400">{creditMultiplier}x</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">Theoretical Max Deposits:</span>
                      <p className="text-lg font-mono font-bold text-teal-300">₹{maxTotalDeposits.toLocaleString()}</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                      <span className="text-[11px] text-slate-400">New Credit Created:</span>
                      <p className="text-lg font-mono font-bold text-purple-400">
                        ₹{(maxTotalDeposits - initialCashDeposit).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Live Recharts Round-by-Round BarChart */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 mb-3">
                      Round-by-Round Deposit vs Reserve vs Lending Progression
                    </h4>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={creditRoundsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="round" stroke="#64748b" fontSize={11} />
                          <YAxis stroke="#64748b" fontSize={11} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8 }}
                            itemStyle={{ fontSize: 12 }}
                          />
                          <Bar dataKey="deposit" fill="#6366f1" name="Deposit Received (₹)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="loan" fill="#10b981" name="Amount Lent Out (₹)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="reserve" fill="#f59e0b" name="Reserve Retained (₹)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: RBI MONETARY POLICY TRANSMISSION PIPELINE ──────── */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* TOPIC-SPECIFIC SVG DIAGRAM 3 */}
                  <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <RbiTransmissionPipelineSVG repo={repoRate} />
                  </div>

                  {/* Repo Rate Lever */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Monetary Policy Committee (MPC) Lever
                        </span>
                        <h4 className="text-sm font-bold text-white">RBI Repo Rate (Operative Policy Rate)</h4>
                      </div>
                      <span className="text-2xl font-mono font-extrabold text-emerald-400">{repoRate.toFixed(2)}%</span>
                    </div>
                    <input
                      type="range"
                      min={4.00}
                      max={8.50}
                      step={0.25}
                      value={repoRate}
                      onChange={e => {
                        setRepoRate(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      aria-label="Set RBI Repo Rate"
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>4.00% (COVID Stimulus)</span>
                      <span>6.50% (Feb 2023 Standard)</span>
                      <span>8.50% (Severe Tightening)</span>
                    </div>
                  </div>

                  {/* 6-Step Visual Transmission Pipeline */}
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {[
                      { step: 1, title: 'Repo Rate', val: `${repoRate.toFixed(2)}%`, icon: '🏛️' },
                      { step: 2, title: 'Bank Cost of Funds', val: 'Increases', icon: '🏦' },
                      { step: 3, title: 'Commercial MCLR', val: `${transmissionMclr}%`, icon: '📈' },
                      { step: 4, title: 'Loan Demand (EMIs)', val: repoRate > 6.0 ? 'Contracts' : 'Expands', icon: '📉' },
                      { step: 5, title: 'Aggregate Demand', val: repoRate > 6.0 ? 'Cools Down' : 'Heats Up', icon: '🛒' },
                      {
                        step: 6,
                        title: 'CPI Inflation',
                        val: `${projectedInflation}%`,
                        icon: projectedInflation <= 6.0 ? '🎯' : '🔥',
                      },
                    ].map(pipe => (
                      <motion.div
                        key={pipe.step}
                        whileHover={{ y: -3 }}
                        className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-center flex flex-col justify-between"
                      >
                        <div className="text-xs text-indigo-400 font-bold mb-1">Step {pipe.step}</div>
                        <div className="text-xl my-1">{pipe.icon}</div>
                        <div className="text-[11px] text-slate-300 font-medium">{pipe.title}</div>
                        <div className="mt-2 text-xs font-mono font-bold text-emerald-400 bg-slate-900 py-1 rounded-lg">
                          {pipe.val}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Inflation Gauge Target Corridor Visualizer */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Projected CPI Inflation vs Statutory Target Corridor (2% to 6%):</span>
                      <span className={`font-mono font-bold ${projectedInflation <= 6.0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {projectedInflation}% {projectedInflation <= 6.0 ? '(Within Tolerance ✓)' : '(Breaches 6% Ceiling ✗)'}
                      </span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden relative">
                      <div className="absolute left-[20%] w-[40%] h-full bg-emerald-500/20 border-x border-emerald-500" />
                      <motion.div
                        className={`h-full ${projectedInflation <= 6.0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        animate={{ width: `${Math.min(100, (projectedInflation / 10) * 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>0%</span>
                      <span>2% (Lower Band)</span>
                      <span>4% (Mid Target)</span>
                      <span>6% (Upper Tolerance)</span>
                      <span>10%+</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: QUANTITATIVE VS QUALITATIVE CREDIT CONTROL ─────── */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  {/* Category Switcher */}
                  <div className="flex p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <button
                      onClick={() => {
                        setSelectedToolCategory('quantitative');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedToolCategory === 'quantitative'
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Quantitative Tools (Regulate TOTAL Volume)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedToolCategory('qualitative');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedToolCategory === 'qualitative'
                          ? 'bg-teal-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Qualitative Tools (Direct DIRECTION & Quality)
                    </button>
                  </div>

                  {/* Tools Grid */}
                  {selectedToolCategory === 'quantitative' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { name: 'Repo Rate (6.50%)', desc: 'Short-term collateralised lending rate against G-Secs.', impact: 'Hike cools total loan demand' },
                        { name: 'Reverse Repo (3.35%)', desc: 'Rate RBI pays to absorb excess liquidity from banks.', impact: 'Hike incentivises banks to park surplus' },
                        { name: 'Bank Rate (6.75%)', desc: 'Long-term uncollateralised penal reference rate.', impact: 'Hike increases penal loan rates' },
                        { name: 'Cash Reserve Ratio (4.5%)', desc: 'Fraction of deposits held as cash with RBI.', impact: 'Hike reduces bank loanable funds' },
                        { name: 'Statutory Liquidity (18%)', desc: 'Fraction held in gold/approved G-Secs.', impact: 'Hike locks up funds in sovereign debt' },
                        { name: 'Open Market Operations (OMO)', desc: 'RBI outright buying or selling of G-Secs.', impact: 'Selling bonds sucks out cash' },
                      ].map((tool, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-indigo-300">{tool.name}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{tool.desc}</p>
                          </div>
                          <div className="mt-3 text-[10px] font-semibold text-emerald-400 bg-slate-900 p-1.5 rounded-lg">
                            ⚡ {tool.impact}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { name: 'Margin Requirements', desc: 'Minimum borrower equity down-payment on loans.', eg: 'Raising share loan margin to 40% stops speculation' },
                        { name: 'Moral Suasion', desc: 'RBI persuasion, circulars, and directives to MDs.', eg: '2023 caution against unsecured credit card debt' },
                        { name: 'Credit Rationing', desc: 'Imposing maximum credit ceilings on specific sectors.', eg: 'Capping commercial real estate loans' },
                        { name: 'Consumer Credit Reg.', desc: 'Regulating hire-purchase & durable loan terms.', eg: 'Shortening maximum tenure on car loans' },
                        { name: 'Direct Action', desc: 'Penalties, fines, or business bans on rogue banks.', eg: 'Barring banks violating priority sector quotas' },
                        { name: 'Differential Interest Rates', desc: 'Concessional rates for priority sectors (Kisan card).', eg: '4% for small farmers vs 12% for luxury cars' },
                      ].map((tool, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between"
                        >
                          <div>
                            <h4 className="text-xs font-bold text-teal-300">{tool.name}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">{tool.desc}</p>
                          </div>
                          <div className="mt-3 text-[10px] font-semibold text-amber-300 bg-slate-900 p-1.5 rounded-lg">
                            🎯 {tool.eg}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
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
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-950"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-950"
              >
                Free Exploration Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY BEFORE CHALLENGES) ────────────────── */}
      {phase === 'sandbox' && (
        <motion.div key="sandbox-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🧪</span>
                <span>Unrestricted Economic Sandbox</span>
              </h2>
              <p className="text-xs text-slate-400">
                Freely experiment with all inflation, credit multiplier, and monetary levers with zero grading pressure.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-950"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400">1. Inflation vs Fixed Incomes & Loans</h3>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Inflation Rate:</span>
                  <span className="font-mono text-rose-400 font-bold">{inflationRate}%</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={0.5}
                  value={inflationRate}
                  onChange={e => setInflationRate(parseFloat(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Nominal Pension Amount:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{monthlyPensionNominal.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min={5000}
                  max={50000}
                  step={2500}
                  value={monthlyPensionNominal}
                  onChange={e => setMonthlyPensionNominal(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                <span className="text-slate-400">Real Monthly Purchasing Power:</span>
                <span className="font-mono font-bold text-base text-amber-400">₹{realPensionValue.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-teal-400">2. Banking System Multiplier</h3>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Cash Reserve Ratio (CRR):</span>
                  <span className="font-mono text-teal-400 font-bold">{crrPercent}%</span>
                </label>
                <input
                  type="range"
                  min={3}
                  max={10}
                  step={0.5}
                  value={crrPercent}
                  onChange={e => setCrrPercent(parseFloat(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Statutory Liquidity Ratio (SLR):</span>
                  <span className="font-mono text-amber-400 font-bold">{slrPercent}%</span>
                </label>
                <input
                  type="range"
                  min={15}
                  max={30}
                  step={1}
                  value={slrPercent}
                  onChange={e => setSlrPercent(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
                <span className="text-slate-400">Credit Multiplier = 1 / (CRR + SLR):</span>
                <span className="font-mono font-bold text-base text-teal-300">{creditMultiplier}x</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (PROGRESSIVE NEP 2020 & CISCE 2026) ────────── */}
      {phase === 'challenge' && (
        <motion.div key="challenge-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="w-full h-14 bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-800">
            <canvas ref={canvasRef} width={1000} height={60} className="w-full h-full" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {activeChallenge.nodeId}
                </span>
              </div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🎯</span>
                <span>NEP 2020 Competency: {activeChallenge.competencyLevel.toUpperCase()}</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
                Score: {Math.max(0, 100 - errors * 5)}%
              </span>
            </div>
          </div>

          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 shadow-2xl shadow-rose-950'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white mb-6 leading-relaxed">
              {activeChallenge.question}
            </p>

            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`text-left p-4 rounded-2xl border transition-all text-sm font-medium ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : wrongFlash
                          ? 'bg-rose-900/40 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 hover:border-indigo-500 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Draggable Roles:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag role ${item.label}`}
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'box_debtor', title: '🚜 Debtor (Karthik Crop Loan)' },
                    { id: 'box_creditor', title: '👵 Creditor (Lakshmi SBI FD)' },
                    { id: 'box_fixed', title: '👔 Fixed Salaried (Unindexed Pension)' },
                    { id: 'box_producer', title: '🏭 Price-Maker (Reliance Crude Refiner)' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold block mb-1">{target.title}</span>
                      <div className="min-h-[32px] flex items-center justify-center bg-slate-900 rounded-xl p-2 text-xs font-mono font-bold">
                        {droppedLabels[target.id] || 'Drop matching effect here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">
                  Drag and drop or click items to arrange in correct chronological sequence:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${displayIdx + 1}: ${item}`}
                      className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3 cursor-grab text-xs font-medium text-slate-200"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center font-mono font-bold shrink-0">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    aria-label="Numerical answer input"
                    className="px-4 py-3 bg-slate-950 rounded-2xl border border-slate-800 text-white font-mono text-base focus:border-indigo-500 focus:outline-none w-64"
                  />
                  <span className="text-sm font-bold text-slate-400 font-mono">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-bold disabled:opacity-50"
                  >
                    Submit Answer →
                  </motion.button>
                </div>
              </div>
            )}

            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300 font-semibold">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add component ${part}`}
                      className="px-3 py-2 bg-slate-800 hover:bg-indigo-700 text-white rounded-xl text-xs font-medium border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px]">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Assembled Package:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-900/80 text-indigo-200 rounded-lg text-xs font-bold flex items-center gap-2 border border-indigo-700"
                      >
                        {part}
                        <button
                          onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-200"
                          aria-label={`Remove ${part}`}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Assembled Policy →
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-slate-950 rounded-2xl border border-emerald-600/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>✓</span>
                    <span>Step-by-Step ICSE Solution Walkthrough</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400 font-mono mr-1.5">[{i + 1}]</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-bold"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-950 block mt-4"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Question →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & REFLECTION PHASE ──────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div key="complete-phase" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 to-slate-900 rounded-3xl border border-emerald-500/40 text-center space-y-4">
            <div className="text-5xl">🏆</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Topic Mastery Completed!</h2>
            <div className="flex justify-center gap-4 text-sm font-mono">
              <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-emerald-400 font-bold">
                Final Score: {Math.max(0, 100 - errors * 5)}%
              </span>
              <span className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-indigo-300 font-bold">
                Mastery: {masteryLevel.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? 'PERFECT SCORE! You possess complete mastery of Inflation Redistribution, Commercial Banking Multipliers, and RBI Credit Controls!'
                : errors <= 3
                ? 'Outstanding performance! You have built a robust analytical foundation in commercial economics.'
                : 'Good effort! Review your specific misconception profile and complete your reflection prompts below.'}
            </p>
          </div>

          {/* ── MANDATORY REFLECTION SECTION ─────────────────────────────────── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-indigo-700/50 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-xl">
                💭
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Cognitive Reflection & Metacognition</h3>
                <p className="text-xs text-slate-400">
                  Synthesize your learning through these three real-world reflection prompts:
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <span>1.</span>
                  <span>What was the most surprising thing you learned?</span>
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How borrowers/debtors actually benefit when inflation runs hotter than nominal loan interest..."
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-teal-300 flex items-center gap-2">
                  <span>2.</span>
                  <span>How would you explain this to a friend?</span>
                </label>
                <textarea
                  value={reflectionAnswers.explainFriend}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explainFriend: e.target.value }))}
                  placeholder="e.g., The bank multiplier is like a relay race: every cash deposit is lent out again after keeping CRR/SLR reserves..."
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                  <span>3.</span>
                  <span>Where in real life might you use this?</span>
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Choosing between fixed vs floating rate home loans, understanding why RBI raises repo rate when grocery prices shoot up..."
                  rows={2}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              {!reflectionSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                    speechManager.speak('Thank you for your thoughtful reflections! Your conceptual synthesis is complete.');
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-teal-500 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-indigo-950"
                >
                  Save Reflection & Insights ✓
                </motion.button>
              ) : (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 flex items-center gap-2 font-medium">
                  <span>✓</span>
                  <span>Reflections recorded successfully! Excellent metacognitive depth.</span>
                </div>
              )}
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Personalized Misconception Correction Profile
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-medium">✓ ICSE Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <span className="font-bold text-white">Spaced Repetition Schedule (SM-2):</span>
                <p className="text-slate-400">
                  Next review due in{' '}
                  <strong className="text-amber-300">
                    {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </strong>{' '}
                  to strengthen long-term synaptic retention.
                </p>
              </div>
            </div>
          </div>

          {/* Real World Capstone Assignment */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💼</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-mono text-emerald-400 font-bold mr-1.5">{i + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Reset / Re-run */}
          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentChallenge(0);
                setErrors(0);
                audioManager.play('whoosh');
              }}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-indigo-950"
            >
              Re-explore Labs & Simulations ↺
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK POPUP COMPONENTS ─────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Topic Completed Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_EconApplicationsEffectsInflationDebtorsSim;