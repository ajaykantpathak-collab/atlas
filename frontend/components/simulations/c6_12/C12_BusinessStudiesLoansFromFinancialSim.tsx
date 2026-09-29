'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (VERIFIABLE STRING LITERALS) ───
const NODE_C12_BS_031 = 'c12_bs_031'; // Loans from Financial Institutions
const NODE_C12_BS_032 = 'c12_bs_032'; // Short-Term Bank Assistance (Cash Credit, BD, OD)
const NODE_C12_BS_033 = 'c12_bs_033'; // Other Short-Term Sources (Public Deposits, Trade Credit, Factoring, ICD)
const NODE_C12_BS_034 = 'c12_bs_034'; // Stock Exchange, SEBI, Brokers
const NODE_C12_BS_035 = 'c12_bs_035'; // Market Terms (SENSEX, NIFTY, IPO, Bull/Bear, ETF, FII, Demat)
const NODE_C12_BS_036 = 'c12_bs_036'; // Markets — Meaning & Types
const NODE_C12_BS_037 = 'c12_bs_037'; // Modern Marketing Concepts & Functions
const NODE_C12_BS_038 = 'c12_bs_038'; // Product Mix — Goods vs Services
const NODE_C12_BS_039 = 'c12_bs_039'; // Product Mix — Branding, Labeling, Packaging
const NODE_C12_BS_040 = 'c12_bs_040'; // Price Mix & Strategies

const ALL_NODE_IDS = [
  NODE_C12_BS_031, NODE_C12_BS_032, NODE_C12_BS_033, NODE_C12_BS_034, NODE_C12_BS_035,
  NODE_C12_BS_036, NODE_C12_BS_037, NODE_C12_BS_038, NODE_C12_BS_039, NODE_C12_BS_040
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Titan EV Dynamics: Corporate Finance & Market Strategy',
  intro: 'You are appointed as the Chief Strategy Officer (CSO) of Titan EV Dynamics Ltd, an emerging Indian EV conglomerate in Pune. The board has approved a ₹500 crore greenfield expansion, requires working capital restructuring, plans a secondary listing on NSE, and is rolling out a brand-new line of commercial cargo EVs.',
  context: 'Navigate corporate term borrowing (FIs vs Banks), optimise the cash operating cycle, decipher stock exchange market dynamics, and architect an unshakeable 4Ps Marketing Mix.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Titan EV needs ₹350 crore for a 10-year manufacturing plant project. The CFO proposes taking a 10-year loan from a commercial bank (like SBI/HDFC) instead of a specialised Financial Institution (like SIDBI/IFCI). Why is this problematic?',
  options: [
    'Commercial banks are legally barred from lending more than ₹50 crore to any single EV company.',
    'Commercial banks face an "Asset-Liability Mismatch" because they raise short-term deposits and cannot safely lock them into decade-long project loans.',
    'Commercial banks do not charge interest, causing massive loss of tax deductions on interest paid.',
    'Financial institutions offer 0% interest loans funded directly by the Reserve Bank of India.'
  ],
  correctIndex: 1,
  hintAfter: 'Commercial banks rely on short/medium-term demand deposits (1-3 yrs). Locking those into 10-15 year term loans creates a severe liquidity and maturity mismatch risk!'
};

// ─── TOPIC SPECIFIC SVG DIAGRAM 1: ASSET-LIABILITY MISMATCH ───
function AssetLiabilityMismatchSVG({ termLoan }: { termLoan: number }) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
      <div className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">
        <span>STRUCTURE DIAGRAM 1: ASSET-LIABILITY MATURITY MATCHING</span>
        <span className="text-gold-400">FI vs Commercial Bank</span>
      </div>
      <svg viewBox="0 0 600 180" className="w-full h-auto" aria-label="Asset-Liability Mismatch Diagram">
        {/* Commercial Bank Side */}
        <rect x="20" y="20" width="260" height="140" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
        <text x="150" y="45" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Commercial Bank (SBI/HDFC)</text>
        <rect x="35" y="60" width="105" height="40" rx="6" fill="#1e293b" stroke="#64748b" />
        <text x="87" y="78" textAnchor="middle" fill="#94a3b8" fontSize="10">Short Deposits</text>
        <text x="87" y="92" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">1 - 3 Years</text>
        
        <path d="M 145 80 L 175 80" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow-red)" />
        <text x="160" y="72" textAnchor="middle" fill="#ef4444" fontSize="14">⚠️</text>

        <rect x="180" y="60" width="90" height="40" rx="6" fill="#450a0a" stroke="#ef4444" />
        <text x="225" y="78" textAnchor="middle" fill="#fca5a5" fontSize="10">Term Asset</text>
        <text x="225" y="92" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">10-15 Yrs Loan</text>
        <text x="150" y="145" textAnchor="middle" fill="#fca5a5" fontSize="10" fontStyle="italic">Asset-Liability Mismatch Risk!</text>

        {/* DFI / Financial Institution Side */}
        <rect x="320" y="20" width="260" height="140" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
        <text x="450" y="45" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Financial Institution (SIDBI/IFCI)</text>
        <rect x="335" y="60" width="105" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
        <text x="387" y="78" textAnchor="middle" fill="#a7f3d0" fontSize="10">Long-Term Bonds</text>
        <text x="387" y="92" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">10 - 20 Years</text>
        
        <path d="M 445 80 L 475 80" stroke="#10b981" strokeWidth="2" />
        <text x="460" y="75" textAnchor="middle" fill="#10b981" fontSize="12">✓</text>

        <rect x="480" y="60" width="90" height="40" rx="6" fill="#064e3b" stroke="#10b981" />
        <text x="525" y="78" textAnchor="middle" fill="#a7f3d0" fontSize="10">Project Finance</text>
        <text x="525" y="92" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">₹{termLoan} Cr Term</text>
        <text x="450" y="145" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontStyle="italic">Maturities Perfectly Matched</text>
      </svg>
    </div>
  );
}

// ─── TOPIC SPECIFIC SVG DIAGRAM 2: CASH CREDIT & DRAWING POWER ───
function CashCreditDrawingPowerSVG({ stockVal, margin, dp }: { stockVal: number; margin: number; dp: string }) {
  const marginWidth = (margin / 100) * 360;
  const dpWidth = 360 - marginWidth;

  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
      <div className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">
        <span>STRUCTURE DIAGRAM 2: HYPOTHECATED STOCK & DRAWING POWER</span>
        <span className="text-gold-400">SBI Cash Credit Mechanism</span>
      </div>
      <svg viewBox="0 0 600 160" className="w-full h-auto" aria-label="Cash Credit Drawing Power Diagram">
        {/* Total Stock Bar */}
        <text x="30" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">Hypothecated Inventory & Receivables: ₹{stockVal} Crore (100%)</text>
        <rect x="30" y="40" width="360" height="50" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        
        {/* Drawing Power Section */}
        <rect x="30" y="40" width={dpWidth} height="50" rx="8" fill="#0284c7" fillOpacity="0.85" stroke="#38bdf8" strokeWidth="2" />
        <text x={30 + dpWidth / 2} y="65" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Drawing Power (DP)</text>
        <text x={30 + dpWidth / 2} y="80" textAnchor="middle" fill="#e0f2fe" fontSize="11">���{dp} Cr ({100 - margin}%)</text>

        {/* Bank Margin Section */}
        <rect x={30 + dpWidth} y="40" width={marginWidth} height="50" rx="8" fill="#e11d48" fillOpacity="0.85" stroke="#fb7185" strokeWidth="2" />
        <text x={30 + dpWidth + marginWidth / 2} y="65" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Borrower Margin</text>
        <text x={30 + dpWidth + marginWidth / 2} y="80" textAnchor="middle" fill="#ffe4e6" fontSize="10">{margin}% Margin</text>

        {/* Formula breakdown */}
        <rect x="410" y="35" width="170" height="110" rx="8" fill="#0f172a" stroke="#334155" />
        <text x="495" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">DP Mathematical Rule</text>
        <text x="495" y="75" textAnchor="middle" fill="#94a3b8" fontSize="9.5">DP = Stock × (1 - Margin%)</text>
        <text x="495" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9.5">DP = ₹{stockVal} × (1 - {margin / 100})</text>
        <text x="495" y="120" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">DP = ₹{dp} Cr</text>

        <text x="30" y="125" fill="#64748b" fontSize="10">🔒 Charge: Hypothecation of moving stock (Charge without transfer of physical possession)</text>
        <text x="30" y="145" fill="#e2e8f0" fontSize="10">💡 Interest applies solely on drawn amounts against the calculated ₹{dp} Cr limit.</text>
      </svg>
    </div>
  );
}

// ─── TOPIC SPECIFIC SVG DIAGRAM 3: 4Ps MARKETING MIX & PRICING STRATEGY ───
function MarketingMixStrategySVG({ strategy, qualityTier }: { strategy: string; qualityTier: string }) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
      <div className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">
        <span>STRUCTURE DIAGRAM 3: 4Ps MARKETING MIX & PRICING STRATEGY</span>
        <span className="text-purple-400">Strategy: {strategy}</span>
      </div>
      <svg viewBox="0 0 600 170" className="w-full h-auto" aria-label="4Ps Marketing Mix Diagram">
        {/* 4 Quadrants of Marketing Mix */}
        <g transform="translate(20, 15)">
          {/* PRODUCT */}
          <rect x="0" y="0" width="125" height="65" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
          <text x="62" y="24" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">1. PRODUCT</text>
          <text x="62" y="40" textAnchor="middle" fill="#ffffff" fontSize="9.5">Tier: {qualityTier}</text>
          <text x="62" y="54" textAnchor="middle" fill="#c7d2fe" fontSize="8.5">Branding & BIS Specs</text>

          {/* PRICE */}
          <rect x="135" y="0" width="125" height="65" rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
          <text x="197" y="24" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">2. PRICE (Active)</text>
          <text x="197" y="40" textAnchor="middle" fill="#38bdf8" fontSize="9.5" fontWeight="bold">{strategy}</text>
          <text x="197" y="54" textAnchor="middle" fill="#e0e7ff" fontSize="8.5">DPCO & Margin Fit</text>

          {/* PLACE */}
          <rect x="0" y="75" width="125" height="65" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          <text x="62" y="99" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">3. PLACE (Channel)</text>
          <text x="62" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">Direct Dealerships</text>
          <text x="62" y="129" textAnchor="middle" fill="#64748b" fontSize="8.5">Logistics & Warehousing</text>

          {/* PROMOTION */}
          <rect x="135" y="75" width="125" height="65" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
          <text x="197" y="99" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">4. PROMOTION</text>
          <text x="197" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">Digital & Trade Expo</text>
          <text x="197" y="129" textAnchor="middle" fill="#64748b" fontSize="8.5">PR & Brand Ambassador</text>
        </g>

        {/* Pricing Strategy Curve Comparison */}
        <g transform="translate(290, 15)">
          <rect x="0" y="0" width="290" height="140" rx="8" fill="#090d16" stroke="#334155" />
          <text x="145" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">Price Trajectory Curve: {strategy}</text>
          
          <line x1="30" y1="115" x2="260" y2="115" stroke="#64748b" strokeWidth="1.5" />
          <line x1="30" y1="35" x2="30" y2="115" stroke="#64748b" strokeWidth="1.5" />
          <text x="260" y="130" textAnchor="end" fill="#64748b" fontSize="8.5">Time →</text>
          <text x="25" y="38" textAnchor="end" fill="#64748b" fontSize="8.5">₹ Price</text>

          {strategy === 'Skimming' ? (
            <>
              {/* High initial dropping curve */}
              <path d="M 40 45 Q 120 50 180 85 T 250 100" fill="none" stroke="#ec4899" strokeWidth="3" />
              <text x="140" y="55" fill="#f472b6" fontSize="9.5" fontWeight="bold">High Initial Skimming Price</text>
              <text x="145" y="105" fill="#94a3b8" fontSize="8.5">Stepwise reduction over product lifecycle</text>
            </>
          ) : strategy === 'Penetration' ? (
            <>
              {/* Low initial rising/flat curve */}
              <path d="M 40 105 L 140 105 Q 190 95 250 75" fill="none" stroke="#06b6d4" strokeWidth="3" />
              <text x="140" y="95" fill="#22d3ee" fontSize="9.5" fontWeight="bold">Low Entry Penetration Price</text>
              <text x="145" y="65" fill="#94a3b8" fontSize="8.5">Captures market share, later normalized</text>
            </>
          ) : (
            <>
              {/* Steady value curve */}
              <path d="M 40 70 L 250 70" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="5 5" />
              <text x="140" y="60" fill="#34d399" fontSize="9.5" fontWeight="bold">Value-Based / Equilibrium</text>
              <text x="145" y="90" fill="#94a3b8" fontSize="8.5">Aligned to customer perceived surplus</text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

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

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS 10 NODES ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_bs_001',
    nodeId: NODE_C12_BS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a statutory Development Financial Institution (DFI) established specifically for long-term industrial/MSME financing in India, rather than a commercial bank?',
    options: ['HDFC Bank', 'State Bank of India', 'SIDBI (Small Industries Development Bank of India)', 'ICICI Bank (Universal Banking Arm)'],
    correctIndex: 2,
    explanation: 'SIDBI was established under the SIDBI Act 1989 as the apex financial institution for MSME industrial term credit. Commercial banks like SBI and HDFC focus primarily on short/medium-term commercial lending.',
    hints: [
      'Think of specialised institutions established under specific statutory Acts for development finance.',
      'One of these acts as the apex lender for Micro, Small and Medium Enterprises.',
      'SIDBI, IFCI, EXIM Bank, and NABARD are development financial institutions.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_bs_002',
    nodeId: NODE_C12_BS_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A facility where a current account holder is permitted to withdraw funds beyond their available credit balance against collateral (such as a Fixed Deposit) is termed:',
    options: ['Cash Credit', 'Bank Overdraft', 'Bill Discounting', 'Factoring'],
    correctIndex: 1,
    explanation: 'Bank Overdraft operates directly on an existing current account allowing negative balances up to a sanctioned limit against collateral like Fixed Deposits or securities.',
    hints: [
      'It operates on an existing current account rather than a freshly created loan account.',
      'It is designed to cover temporary day-to-day cash mismatches.',
      'The account balance goes negative, known as "overdrawing" the account.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_bs_003',
    nodeId: NODE_C12_BS_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When an investor in Mumbai sells 200 existing shares of Tata Motors to a buyer in Kolkata via the NSE trading terminal, how much capital flows to Tata Motors Ltd?',
    options: ['The entire trade value minus STT', '50% of the capital', '₹0 (Zero rupees)', 'The total value minus broker commission'],
    correctIndex: 2,
    explanation: 'The stock exchange is a secondary market dealing in existing securities between investors. The issuing company (Tata Motors) receives zero fresh capital from secondary market trading.',
    hints: [
      'Is this a primary market IPO or a secondary market trade between two existing investors?',
      'The company receives funds only during primary issuance (IPO/FPO/Rights Issue).',
      'In secondary trades, funds flow strictly from buyer to seller; the corporate entity gets nothing.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_bs_004',
    nodeId: NODE_C12_BS_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the benchmark index of the Bombay Stock Exchange (BSE), its constituent count, and its base year:',
    options: [
      'NIFTY 50, 50 stocks, Base 1995 = 1000',
      'SENSEX, 30 stocks, Base 1978-79 = 100',
      'SENSEX, 50 stocks, Base 1980 = 100',
      'NIFTY, 30 stocks, Base 1978-79 = 1000'
    ],
    correctIndex: 1,
    explanation: 'SENSEX (Sensitive Index) is BSE\'s benchmark index tracking 30 financially sound companies with Base 1978-79 = 100. NIFTY 50 belongs to the NSE with Base 1995 = 1000.',
    hints: [
      'BSE\'s benchmark index contains 30 large cap liquid stocks.',
      'Its base year was set in the late 1970s with a base mark of 100.',
      'SENSEX = 30 stocks, Base 1978-79 = 100; NIFTY = 50 stocks, Base 1995 = 1000.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_bs_005',
    nodeId: NODE_C12_BS_038,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which characteristic of services explains why an unfilled hotel room at Taj Mahal Palace Mumbai for tonight cannot be stored and sold tomorrow?',
    options: ['Intangibility', 'Inseparability', 'Perishability', 'Variability'],
    correctIndex: 2,
    explanation: 'Perishability means services cannot be inventoried or stored for future sale. An unoccupied room or empty airline seat permanently loses revenue once the time window expires.',
    hints: [
      'Think of what happens to unused capacity over time.',
      'Services perish at the exact moment the delivery opportunity lapses.',
      'The four I\'s / characteristics are Intangibility, Inseparability, Heterogeneity/Variability, and Perishability.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_bs_006',
    nodeId: NODE_C12_BS_039,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each product element to its correct hierarchical tier on the packaging and branding architecture.',
    dragItems: [
      { label: 'Primary Packaging (Foil Wrapper)', targetId: 'target_primary' },
      { label: 'Secondary Packaging (Cardboard Carton)', targetId: 'target_secondary' },
      { label: 'Transport Packaging (Corrugated Crate)', targetId: 'target_transport' },
      { label: 'Brand Mark (Amul Mascot / Visual)', targetId: 'target_visual' },
    ],
    correctMapping: {
      target_primary: 'Primary Packaging (Foil Wrapper)',
      target_secondary: 'Secondary Packaging (Cardboard Carton)',
      target_transport: 'Transport Packaging (Corrugated Crate)',
      target_visual: 'Brand Mark (Amul Mascot / Visual)',
    },
    explanation: 'Primary packaging directly encloses the product; secondary provides unit protection/display; transport protects in bulk transit; brand mark is the unspoken visual emblem.',
    hints: [
      'What wrapper touches the product directly? That is primary.',
      'The outer display box is secondary; the bulk logistics carton is transport.',
      'The visual graphic that cannot be spoken aloud is the Brand Mark.'
    ]
  },
  {
    id: 'ch_bs_007',
    nodeId: NODE_C12_BS_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Drugs (Prices Control) Order (DPCO) 2013, which Indian regulatory body fixes the ceiling prices of essential scheduled pharmaceutical formulations?',
    options: ['SEBI', 'FSSAI', 'NPPA (National Pharmaceutical Pricing Authority)', 'RBI'],
    correctIndex: 2,
    explanation: 'The NPPA under the Department of Pharmaceuticals administers the DPCO 2013, fixing mandatory ceiling prices for scheduled essential medicines like Paracetamol.',
    hints: [
      'It is a specialized pricing authority for pharmaceuticals.',
      'Abbreviated as NPPA.',
      'National Pharmaceutical Pricing Authority enforces DPCO ceiling prices.'
    ]
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_bs_008',
    nodeId: NODE_C12_BS_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Titan EV holds hypothecated raw material and finished inventory valued at ₹80 crore. SBI has sanctioned a cash credit facility with a 25% mandatory margin. What is Titan EV\'s maximum Drawing Power in ₹ crore?',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: 'crore',
    explanation: 'Drawing Power = Stock Value × (1 − Margin%) = ₹80 crore × (1 − 0.25) = ₹80 × 0.75 = ₹60 crore.',
    hints: [
      'Drawing Power formula: Stock Value × (1 − Margin Fraction).',
      'Margin is 25%, so the bank lends against 75% of the hypothecated stock value.',
      '80 × 0.75 = 60 crore.'
    ]
  },
  {
    id: 'ch_bs_009',
    nodeId: NODE_C12_BS_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Maruti Suzuki draws a 90-day bill of exchange of ₹10,00,000 on a dealership. HDFC Bank discounts this bill at 12% per annum (using a 365-day year). Calculate the exact upfront discount deducted (in ₹, rounded to nearest whole rupee).',
    correctAnswer: 29589,
    tolerance: 50,
    unit: '₹',
    explanation: 'Discount = Face Value × Rate × (Days / 365) = ₹10,00,000 × 0.12 × (90 / 365) = ₹1,20,000 × 0.246575 = ₹29,589.',
    hints: [
      'Formula: Face Value × Annual Discount Rate × (Tenure in Days / 365).',
      '10,00,000 × 0.12 = 1,20,000 annual interest.',
      '1,20,000 × (90 / 365) ≈ ₹29,589.'
    ]
  },
  {
    id: 'ch_bs_010',
    nodeId: NODE_C12_BS_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the fundamental structural distinction between Factoring and Bill Discounting?',
    options: [
      'Bill discounting includes sales ledger administration, whereas factoring is purely a one-off bank loan.',
      'Factoring involves the ongoing sale of the accounts receivable portfolio where the factor manages the sales ledger and collections; Bill Discounting is a transaction-specific advance without sales ledger management.',
      'Factoring is regulated by the RBI Act 1934, while bill discounting is completely unregulated.',
      'Public deposits replace factoring, whereas bill discounting is only available to agriculture.'
    ],
    correctIndex: 1,
    explanation: 'Factoring (governed by Factoring Regulation Act 2011) is an ongoing portfolio service where the factor takes over sales ledger maintenance and debt collection. Bill discounting is a specific transaction on a single bill without ledger outsourcing.',
    hints: [
      'Consider who takes over customer sales ledgers and collection machinery.',
      'Factoring is a comprehensive receivables administration and financing relationship.',
      'Bill discounting discounts a single instrument without taking over ledger administration.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_bs_011',
    nodeId: NODE_C12_BS_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Godrej Consumer Products purchases packaging materials on terms "2/10, net 30" (2% cash discount if paid in 10 days; otherwise full sum in 30 days). Calculate the annualised cost of forgoing the discount (approximate % p.a. using (Discount% / (100 - Discount%)) × (365 / Extra Days) × 100).',
    correctAnswer: 37.24,
    tolerance: 1.0,
    unit: '% p.a.',
    explanation: 'Annualised Cost = (2 / 98) × (365 / (30 - 10)) × 100 = 0.020408 × 18.25 × 100 = 37.24% p.a. Forgoing a 2% discount to delay payment by 20 days is equivalent to an exorbitant ~37.24% loan!',
    hints: [
      'Formula: [Discount % / (100 - Discount %)] × [365 / (Credit Period - Discount Period)] × 100.',
      'Extra days of credit = 30 - 10 = 20 days. Effective rate for 20 days = 2 / 98 = 2.0408%.',
      'Annualise: 2.0408% × (365 / 20) = 37.24%.'
    ]
  },
  {
    id: 'ch_bs_012',
    nodeId: NODE_C12_BS_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'SEBI discovered that 11 entities placed front-running trades ahead of large FII orders in Reliance Industries shares, issuing ₹40 crore in penalties and trading bans. Which two SEBI statutory functions were exercised here?',
    options: [
      'Developmental and Primary Market Registration',
      'Protective (Section 11B) and Quasi-Judicial (Section 24)',
      'Legislative and Banking Regulation',
      'Monetary Policy and Fiscal Oversight'
    ],
    correctIndex: 1,
    explanation: 'Enforcing prohibitions against unfair trade practices is a Protective function (Sec 11B), while conducting formal investigations, passing binding penalties, and imposing bans is a Quasi-Judicial function (Sec 24).',
    hints: [
      'Protective functions safeguard investors against fraud and manipulation.',
      'Passing formal penalty orders with appellate pathways to SAT represents judicial authority.',
      'Protective + Quasi-Judicial functions.'
    ]
  },
  {
    id: 'ch_bs_013',
    nodeId: NODE_C12_BS_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Coal India auctioning 100,000 tonnes of coking coal to Tata Steel categorized as an Industrial Market transaction, while selling 100,000 tonnes to an independent coal trader is a Wholesale Market transaction?',
    options: [
      'Tata Steel pays in cash, whereas the trader pays on credit.',
      'The classification depends strictly on the buyer\'s intended use: Tata Steel consumes the coal as a direct input in blast furnace manufacturing (Industrial), whereas the trader purchases in bulk solely to resell (Wholesale).',
      'Industrial markets cannot exceed ₹10 crore, whereas wholesale markets have no limit.',
      'The Indian government classifies all steel-related sales as consumer products.'
    ],
    correctIndex: 1,
    explanation: 'Product volume alone does not determine market type. When a buyer uses the good as a raw material/capital input in manufacturing, it is an Industrial Market. When bought in bulk to resell to intermediate businesses, it is Wholesale.',
    hints: [
      'Look at the purpose of the buyer: transformation/production vs pure resale.',
      'Industrial buyers consume the good in manufacturing; wholesalers resell the good.',
      'The buyer\'s purpose defines the market.'
    ],
    misconceptionIndex: 6
  },
  {
    id: 'ch_bs_014',
    nodeId: NODE_C12_BS_037,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does Standardisation differ from Grading as a core function of marketing?',
    options: [
      'Standardisation is done by the consumer; Grading is done by the government.',
      'Standardisation establishes uniform predetermined quality/spec benchmarks for all output (e.g. ITC Classmate 70 GSM); Grading sorts heterogeneous goods into classes based on established quality tiers (e.g. APMC Wheat FAQ grades).',
      'Standardisation applies only to services; Grading applies only to industrial machinery.',
      'There is no difference; they are synonymous terms in the ISC syllabus.'
    ],
    correctIndex: 1,
    explanation: 'Standardisation fixes uniform benchmarks so that every manufactured unit is identical. Grading separates natural or variable agricultural output into differentiated quality tiers.',
    hints: [
      'Standardisation creates identical uniformity in manufacturing.',
      'Grading sorts naturally variable products (like agricultural crops) into quality classes.',
      'ITC notebooks are standardised; APMC agricultural produce is graded.'
    ]
  },
  {
    id: 'ch_bs_015',
    nodeId: NODE_C12_BS_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When Apple launches the iPhone 15 Pro Max at ₹1,59,900 to capture early adopters with high willingness to pay before later lowering prices, it uses:',
    options: ['Penetration Pricing', 'Price Skimming', 'Cost-Plus Pricing', 'Predatory Dumping'],
    correctIndex: 1,
    explanation: 'Price Skimming sets a high initial entry price to skim the consumer surplus from price-insensitive early adopters, before gradually lowering prices as competition grows.',
    hints: [
      'Think of skimming the rich cream off the top of milk.',
      'Penetration starts low to grab mass share; Skimming starts high to maximise early margins.',
      'Apple starts at premium price levels and discounts later.'
    ],
    misconceptionIndex: 7
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'ch_bs_016',
    nodeId: NODE_C12_BS_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Titan EV is choosing between a ₹300 crore 12-year Term Loan from IFCI at 10.5% and a Public Issue of 12-year Debentures at 9.0%. Which trade-off analysis is correct?',
    options: [
      'IFCI loans require zero security and no legal documentation, making them faster than debentures.',
      'Debentures offer a lower coupon and fewer ongoing managerial restrictions, but require public credit ratings, SEBI compliance, and large minimum issue scale; IFCI term loans offer customized disbursements and moratoria, but impose strict restrictive covenants (dividend caps, DSCR covenants, asset sale bans).',
      'Debentures dilute voting control by granting equity voting rights to debenture holders under Companies Act 2013.',
      'IFCI loans can be transferred freely on the NSE secondary market like equity shares.'
    ],
    correctIndex: 1,
    explanation: 'Financial Institution loans are bilateral, secured, and flexible with moratoriums, but carry onerous covenants. Debentures are tradeable securities requiring SEBI compliance but with greater managerial autonomy.',
    hints: [
      'Do debentures dilute equity voting power? No, they are pure debt.',
      'What covenants do development banks enforce to protect a 12-year loan?',
      'Consider the trade-off: public market compliance vs private restrictive covenants.'
    ]
  },
  {
    id: 'ch_bs_017',
    nodeId: NODE_C12_BS_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During the 2018 IL&FS collapse (₹94,000 crore default), corporate lenders like Tata Sons faced acute liquidity strain due to their exposure in Inter-Corporate Deposits (ICDs). Why are ICDs inherently vulnerable during corporate contagion?',
    options: [
      'ICDs are insured by DICGC up to ₹5 lakh, forcing banks to seize corporate bank accounts.',
      'ICDs are unsecured, short-term bilateral corporate borrowings with no specific governing statute or mandatory collateral charge, meaning default leaves the lending corporate with limited immediate recovery recourse.',
      'ICDs automatically convert to equity shares under Section 186 of Companies Act 2013.',
      'ICDs require 100% gold pledge reserves registered with the Reserve Bank of India.'
    ],
    correctIndex: 1,
    explanation: 'ICDs are informal, unsecured short-term corporate loans lacking statutory collateral backing. If the borrower defaults, the lender ranks as an unsecured creditor with high recovery risk.',
    hints: [
      'Are ICDs secured by fixed asset mortgages or bank guarantees?',
      'ICDs are unsecured and lack direct DICGC deposit insurance or SEBI trust deed backing.',
      'Unsecured status + informal bilateral nature = high contagion risk.'
    ]
  },
  {
    id: 'ch_bs_018',
    nodeId: NODE_C12_BS_035,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is an investment by Temasek Singapore buying 1.5% of HDFC Bank shares on NSE classified as FPI/FII, whereas Samsung building a ₹4,900 crore mobile factory in Noida is classified as FDI?',
    options: [
      'FPI investments are restricted to government bonds, whereas FDI is for private firms.',
      'FPI (Foreign Portfolio Investment) represents liquid, tradeable secondary market portfolio holdings without direct operational control that can be exited instantly; FDI (Foreign Direct Investment) represents long-term physical/equity assets with operational control and lasting management interest.',
      'FPI is tax-exempt in India under FEMA 1999, whereas FDI is taxed at 50%.',
      'Both are recorded identically in the Current Account of the Balance of Payments.'
    ],
    correctIndex: 1,
    explanation: 'FPI/FII is passive portfolio capital in tradeable securities with instant exit capability (recorded under Portfolio Investment in the BoP Capital Account). FDI creates physical enterprise capacity and managerial control.',
    hints: [
      'Look at exitability, liquidity, and operational management control.',
      'Buying liquid shares on an exchange = FPI; building a brick-and-mortar factory = FDI.',
      'FPI is liquid portfolio capital; FDI is direct operational investment.'
    ],
    misconceptionIndex: 8
  },
  {
    id: 'ch_bs_019',
    nodeId: NODE_C12_BS_037,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of activities for launching a new product under the Modern Marketing Concept in correct chronological order.',
    sortItems: [
      'Comprehensive Marketing Research & Customer Need Discovery',
      'Product Planning & Standardisation of Specifications',
      'Setting Pricing, Channel Distribution & Packaging Strategy',
      'Integrated Promotion & Advertising Campaign',
      'Post-Purchase Customer Feedback & Societal Impact Review'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Modern marketing begins with identifying customer needs (research BEFORE production), followed by product development, pricing/distribution setup, promotional execution, and ongoing feedback.',
    hints: [
      'What must happen BEFORE any factory begins manufacturing in modern marketing?',
      'Marketing research is always step 1.',
      'Research → Product Design/Standardisation → Pricing/Channels → Promotion → Feedback.'
    ]
  },
  {
    id: 'ch_bs_020',
    nodeId: NODE_C12_BS_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which of the following packages would violate statutory Indian labeling mandates under the FSS (Packaging and Labelling) Regulations 2011 and Legal Metrology Rules 2011?',
    options: [
      'A biscuit packet displaying FSSAI 14-digit license number, green dot inside square, MRP, Net Weight, and Manufacturing Date.',
      'A honey jar omitting the FSSAI license number and displaying only "Manufactured in Himalayas" without net quantity or vegetarian/non-vegetarian icon.',
      'A milk pouch showing expiry date, nutritional info per 100ml, batch number, and processor address.',
      'A tea packet with ISI mark, vegetarian green logo, and customer care contact details.'
    ],
    correctIndex: 1,
    explanation: 'FSSAI Regulations 2011 mandate: FSSAI license number, Veg/Non-Veg icon (green dot in green square / brown triangle), Net Weight, MRP, Best Before/Expiry Date, and complete manufacturer name and address. Omitting these attracts penalties up to ₹10 lakh.',
    hints: [
      'Look for the option missing statutory mandatory marks like FSSAI license, Veg logo, and Net Weight.',
      'Voluntary poetic slogans cannot replace mandatory statutory disclosures.',
      'Option 2 completely breaches FSSAI 2011 and Legal Metrology mandates.'
    ]
  },
  {
    id: 'ch_bs_021',
    nodeId: NODE_C12_BS_040,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the comprehensive 5-Step Pricing Strategy Decision Rule for corporate product launches.',
    availableParts: [
      '1. Check DPCO / Statutory Ceiling',
      '2. If Innovative & High Status → Skimming',
      '3. If Mass Market with Network Scale → Penetration',
      '4. If Highly Differentiated & Unique → Value-Based',
      '5. Else Match Competitors or Cost-Plus'
    ],
    targetState: '1. Check DPCO / Statutory Ceiling 2. If Innovative & High Status → Skimming 3. If Mass Market with Network Scale → Penetration 4. If Highly Differentiated & Unique → Value-Based 5. Else Match Competitors or Cost-Plus',
    validationHint: 'Assemble all 5 rules in strict sequential priority from legal compliance down to standard cost fallback.',
    explanation: 'Optimal pricing follows a clear hierarchy: Legal boundaries (DPCO) first, then Skimming for innovation, Penetration for network scale, Value-based for differentiated offerings, and Competitive/Cost-plus as defaults.',
    hints: [
      'Start with legal constraints (DPCO ceiling).',
      'Next evaluate innovation premium (Skimming) and mass scale (Penetration).',
      'Follow with perceived customer value and competitive/cost benchmarks.'
    ]
  },
  {
    id: 'ch_bs_022',
    nodeId: NODE_C12_BS_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Tata Motors buys 5,000 Michelin EV tyres to install in its Nexon EV factory, while an individual car owner buys 4 identical Michelin tyres at a local garage in Pune. How are these two transactions classified?',
    options: [
      'Both are Consumer Shopping Goods because the physical tyres are identical.',
      'Tata Motors\' purchase is an Industrial Good (Component Part); the car owner\'s purchase is a Consumer Shopping Good.',
      'Both are Industrial Goods because tyres are durable automotive parts.',
      'Tata Motors\' purchase is a Specialty Good; the car owner\'s is a Convenience Good.'
    ],
    correctIndex: 1,
    explanation: 'Classification depends entirely on the buyer\'s purpose: Tata Motors integrates the tyres as an industrial component in commercial manufacturing; the individual buys for personal replacement after comparing options (Consumer Shopping Good).',
    hints: [
      'Does product classification depend on the physical rubber or the buyer\'s purpose?',
      'A factory incorporating items into finished products buys Industrial Goods.',
      'An individual replacing car parts makes a consumer purchase.'
    ],
    misconceptionIndex: 6
  }
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG INTERACTIVE STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Long-Term Term Finance & Covenant Simulator',
    instruction: 'Adjust the Financial Institution Term Loan amount and inspect the debt-service coverage ratio (DSCR) and restrictive covenants in real time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BS_031,
  },
  {
    title: 'Lab 2: Short-Term Working Capital & Cash Credit Engine',
    instruction: 'Manipulate inventory levels and bank margin percentage to calculate real-time Drawing Power and interest on cash credit.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BS_032,
  },
  {
    title: 'Lab 3: Receivables Financing — Bill Discounting vs Factoring',
    instruction: 'Toggle between Bill Discounting and Factoring to see ledger administration, recourse risk, and cash turnaround.',
    interactionType: 'toggle-inspect',
    nodeId: NODE_C12_BS_033,
  },
  {
    title: 'Lab 4: Secondary Market & Demat Ecosystem Live Terminal',
    instruction: 'Simulate secondary market orders on NSE/BSE and observe how transactions settle with zero capital flow to the company.',
    interactionType: 'market-terminal',
    nodeId: NODE_C12_BS_034,
  },
  {
    title: 'Lab 5: Interactive 4Ps Marketing Mix & Pricing Architect',
    instruction: 'Balance Product Quality, Branding Intensity, Pricing Strategy (Skimming vs Penetration), and Distribution to maximize customer satisfaction.',
    interactionType: 'marketing-mix',
    nodeId: NODE_C12_BS_040,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'PREDICT: If Titan EV secures a ₹300 crore term loan from SIDBI, will the bank allow unlimited dividend payouts to equity shareholders?',
    options: [
      'Yes, financial institutions never interfere in dividend decisions.',
      'No, the FI loan agreement will impose a restrictive covenant (e.g. max 20% dividend) to ensure cash is retained to service debt.',
      'Yes, SEBI mandates 100% dividend distribution for all debt-financed projects.',
      'No, but only if the RBI governor personally vetoes it.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Term Loan slider in the simulator to verify how restrictive covenants activate automatically when borrowing increases!',
    nodeId: NODE_C12_BS_031,
  },
  {
    question: 'PREDICT: If the bank margin on hypothecated inventory increases from 25% to 40% during RBI credit tightening, what happens to Titan EV\'s drawing power?',
    options: [
      'Drawing Power increases because higher margin means more bank backing.',
      'Drawing Power drops significantly from 75% of stock value to 60% of stock value.',
      'Drawing Power remains exactly identical since sanctioned limit is unchanged.',
      'Drawing power doubles because of compounding interest.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the bank margin slider from 25% to 40% in Lab 2 to verify the drawing power contraction in real time.',
    nodeId: NODE_C12_BS_032,
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'OBSERVE: In the Working Capital engine, what happens to interest cost when you withdraw only ₹40 crore out of a ₹60 crore sanctioned Cash Credit limit?',
    observableOptions: [
      'Interest is billed on the entire ₹60 crore sanctioned limit.',
      'Interest is charged ONLY on the ₹40 crore actually drawn, proving CC\'s cost efficiency.',
      'Interest is waived completely for that month.',
      'The bank fines the company for underutilisation.'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BS_032,
  },
  {
    question: 'OBSERVE: In the Secondary Market terminal, when a retail buyer purchases shares at ₹950 from a selling investor, what changes on the company\'s balance sheet?',
    observableOptions: [
      'Paid-up share capital increases by ₹950.',
      'Company cash reserves increase by ₹950.',
      'Zero change to company capital; only the member registry updates ownership.',
      'Company debt decreases by ₹950.'
    ],
    correctIndex: 2,
    nodeId: NODE_C12_BS_034,
  }
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Corporate Finance & Brand Strategy Dossier',
  description: 'Select any leading Indian enterprise (e.g., Tata Motors, Reliance Retail, Asian Paints, or Zomato). Create a 1-page financial and marketing architecture audit:',
  steps: [
    '1. Financing Mix: Identify their primary long-term debt sources (FI term loans vs debentures) and working capital facility (SBI Cash Credit vs Factoring).',
    '2. Market Listing: Check their BSE/NSE ticker, SENSEX/NIFTY inclusion, and latest FII/FPI shareholding percentage.',
    '3. Product & Brand: Deconstruct their primary, secondary, and transport packaging, FSSAI/BIS statutory labels, and registered trademarks.',
    '4. Pricing Strategy: Analyze whether their flagship products utilize Price Skimming, Penetration, Value-Based, or Competitive Pricing.'
  ]
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BS_031,
  title: 'Corporate Loans, Financial Markets & Modern Marketing Mix',
  definition: 'Comprehensive mastery of Indian corporate finance (Financial Institutions, Short-Term Bank Assistance, Factoring, ICDs), Stock Exchange mechanics (SEBI, SENSEX, NIFTY, FII, Demat), and the 4Ps Marketing Mix (Product, Branding, Labeling, Packaging, and Pricing Strategies).',
  eli5: 'Think of running a massive company: you borrow long-term from special project funds (FIs) for factories, use flexible bank credit for raw materials, trade shares on a digital bazaar (stock exchange) watched by an inspector (SEBI), and design products with trusted names, clear labels, safe packages, and smart prices that customers love.',
  misconceptions: [
    { misconception: 'Commercial banks like SBI/HDFC are Financial Institutions for long-term project finance.', correction: 'Commercial banks raise short-term deposits and focus on short/medium-term working capital. Specialised Development Financial Institutions (SIDBI, IFCI, EXIM, NABARD) fund 5-15 year capital projects.' },
    { misconception: 'Cash credit and bank overdraft are identical facilities.', correction: 'Cash credit is a separate loan account against hypothecation of stock with fluctuating drawing power; overdraft operates on an existing current account against fixed collateral.' },
    { misconception: 'Buying shares on NSE channels fresh funds into the company.', correction: 'The stock exchange is a secondary market where existing securities trade between investors. The company receives ₹0 in secondary trades.' },
    { misconception: 'SENSEX and NIFTY are just two names for the same index.', correction: 'SENSEX tracks 30 BSE stocks (Base 1978-79=100); NIFTY tracks 50 NSE stocks (Base 1995=1000).' },
    { misconception: 'Services are durable because good memories last a long time.', correction: 'Services are strictly perishable — unused capacity (an empty flight seat or hotel room) is permanently lost once the time window passes.' },
    { misconception: 'Factoring and bill discounting are identical receivables loans.', correction: 'Factoring involves ongoing sale of the receivables portfolio where the factor manages the sales ledger; bill discounting is a single-bill discount without ledger outsourcing.' },
    { misconception: 'Consumer vs Industrial good classification depends on the physical item.', correction: 'Classification depends on the buyer\'s purpose: a tyre bought by a car owner is a consumer good; the same tyre bought by Tata Motors for factory assembly is an industrial good.' },
    { misconception: 'Price Skimming means setting a low price to penetrate the market.', correction: 'Skimming sets a HIGH initial price for early adopters; Penetration sets a LOW initial price to capture mass market share.' },
    { misconception: 'FII/FPI and FDI are the same type of foreign investment.', correction: 'FII/FPI is tradeable, liquid portfolio investment in secondary securities; FDI is direct, long-term capital with operational enterprise control.' }
  ],
  diagnosticQuestions: [
    { question: 'Which institution provides long-term term finance for industrial MSME projects?', options: ['SBI Cash Credit', 'SIDBI', 'Local Cooperative Bank', 'Postal Savings'], correctIndex: 1 },
    { question: 'What is the security used for a Cash Credit facility?', options: ['Hypothecation of inventory/stock', 'Personal gold', 'Unsecured promise', 'Share certificates only'], correctIndex: 0 },
    { question: 'When an investor buys an existing share on BSE, who gets the money?', options: ['BSE Corporation', 'The issuing company', 'The selling investor', 'SEBI'], correctIndex: 2 },
    { question: 'Which index represents the National Stock Exchange of India?', options: ['SENSEX 30', 'NIFTY 50', 'Dow Jones', 'NASDAQ'], correctIndex: 1 },
    { question: 'What are the four defining features of services?', options: ['Tangibility, storability, durability, ownership', 'Intangibility, inseparability, variability, perishability', 'Low price, high discount, free shipping, cash on delivery', 'Fixed weight, green logo, ISI mark, bar code'], correctIndex: 1 },
    { question: 'Which statutory body mandates the green veg dot and nutritional labels on food in India?', options: ['RBI', 'FSSAI', 'SEBI', 'NPPA'], correctIndex: 1 },
    { question: 'What pricing strategy did Reliance Jio use at launch (free/cheap data)?', options: ['Price Skimming', 'Penetration Pricing', 'Cost-Plus Pricing', 'Prestige Pricing'], correctIndex: 1 },
    { question: 'What is the maximum statutory tenure for public deposits under Companies Act 2013?', options: ['12 months', '36 months (3 years)', '10 years', '25 years'], correctIndex: 1 }
  ],
  masteryCriteria: 'Demonstrate holistic competency across Indian development banking, short-term working capital mechanics, capital market structure, and the complete 4Ps marketing mix.'
};

// ─── MAIN COMPONENT ───
function C12_BusinessStudiesLoansFromFinancialSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BS_031,
  title = DEFAULT_PROPS.title || 'Corporate Loans & Market Mix',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['bs'] || { name: 'Business Studies', emoji: '🏢', color: 'blue' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Scoring & Errors
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & drop / Sort / Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── RICH SIMULATION STATE VARIABLES (LABS & SANDBOX) ───
  // Lab 1: Term Loan
  const [termLoanAmount, setTermLoanAmount] = useState<number>(200); // in crore
  const [termLoanRate, setTermLoanRate] = useState<number>(10.5); // %
  const [termLoanTenure, setTermLoanTenure] = useState<number>(10); // years
  const [promoterMargin, setPromoterMargin] = useState<number>(30); // %

  // Lab 2: Cash Credit
  const [stockValue, setStockValue] = useState<number>(80); // in crore
  const [bankMargin, setBankMargin] = useState<number>(25); // %
  const [utilisedCC, setUtilisedCC] = useState<number>(45); // in crore
  const [ccInterestRate, setCcInterestRate] = useState<number>(9.0); // %

  // Lab 3: Receivables Financing
  const [invoiceValue, setInvoiceValue] = useState<number>(100); // in lakh
  const [creditDays, setCreditDays] = useState<number>(90);
  const [recourseMode, setRecourseMode] = useState<'with-recourse' | 'non-recourse'>('with-recourse');
  const [financingType, setFinancingType] = useState<'bill-discounting' | 'factoring'>('bill-discounting');

  // Lab 4: Stock Terminal
  const [selectedStock, setSelectedStock] = useState<'TITAN_EV' | 'RELIANCE' | 'TATA_MOTORS'>('TITAN_EV');
  const [tradeQuantity, setTradeQuantity] = useState<number>(100);
  const [tradePrice, setTradePrice] = useState<number>(450);
  const [orderBook, setOrderBook] = useState<{ id: number; type: 'BUY' | 'SELL'; qty: number; price: number }[]>([
    { id: 1, type: 'BUY', qty: 500, price: 449.5 },
    { id: 2, type: 'BUY', qty: 1200, price: 449.0 },
    { id: 3, type: 'SELL', qty: 800, price: 450.5 },
    { id: 4, type: 'SELL', qty: 1500, price: 451.0 },
  ]);

  // Lab 5: Marketing Mix
  const [productQualityTier, setProductQualityTier] = useState<'Standard' | 'Premium' | 'Luxury'>('Premium');
  const [packagingType, setPackagingType] = useState<'Basic' | 'Protective Eco-Friendly' | 'Luxury Metallic'>('Protective Eco-Friendly');
  const [pricingStrategy, setPricingStrategy] = useState<'Skimming' | 'Penetration' | 'Value-Based' | 'Cost-Plus'>('Value-Based');
  const [adSpendCrore, setAdSpendCrore] = useState<number>(15);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── DERIVED VALUES FOR REAL-TIME SIMULATION ───
  // Lab 1: DSCR & Covenants
  const annualEbitda = 65; // assumed ₹65 cr cash flow
  const annualInterest = (termLoanAmount * (termLoanRate / 100));
  const annualPrincipal = termLoanAmount / termLoanTenure;
  const dscr = useMemo(() => {
    const totalDebtService = annualInterest + annualPrincipal;
    return totalDebtService > 0 ? (annualEbitda / totalDebtService).toFixed(2) : 'N/A';
  }, [annualEbitda, annualInterest, annualPrincipal]);

  const activeCovenants = useMemo(() => {
    const list: string[] = [];
    if (termLoanAmount >= 150) list.push('Dividend payout capped at maximum 20% of net profit');
    if (termLoanAmount >= 200) list.push('Minimum Current Ratio mandatory at ≥ 1.33');
    if (termLoanAmount >= 250) list.push('First Pari-Passu charge on all Fixed Plant & Machinery');
    if (termLoanAmount >= 300) list.push('Prior written FI consent required for any additional borrowing or M&A');
    return list;
  }, [termLoanAmount]);

  // Lab 2: Drawing Power
  const drawingPower = useMemo(() => {
    return (stockValue * (1 - bankMargin / 100)).toFixed(2);
  }, [stockValue, bankMargin]);

  const actualMonthlyInterest = useMemo(() => {
    const effectiveDraw = Math.min(utilisedCC, parseFloat(drawingPower));
    return ((effectiveDraw * (ccInterestRate / 100)) / 12).toFixed(3);
  }, [utilisedCC, drawingPower, ccInterestRate]);

  // Lab 3: Discount calculation
  const calculatedDiscount = useMemo(() => {
    const rate = financingType === 'bill-discounting' ? 0.105 : 0.125;
    const upfrontAdvanceRate = financingType === 'bill-discounting' ? 1.0 : 0.85;
    const grossCost = (invoiceValue * rate * (creditDays / 365));
    const immediateCash = (invoiceValue * upfrontAdvanceRate) - grossCost;
    return {
      grossCost: grossCost.toFixed(2),
      immediateCash: immediateCash.toFixed(2),
      advancePercentage: (upfrontAdvanceRate * 100).toFixed(0)
    };
  }, [invoiceValue, creditDays, financingType]);

  // Lab 5: Marketing Mix Score & Revenue Projection
  const marketingIndex = useMemo(() => {
    let score = 50;
    if (productQualityTier === 'Luxury') score += 20;
    if (productQualityTier === 'Premium') score += 10;
    if (packagingType === 'Protective Eco-Friendly') score += 15;
    if (packagingType === 'Luxury Metallic') score += 20;
    if (pricingStrategy === 'Value-Based') score += 20;
    if (pricingStrategy === 'Skimming' && productQualityTier === 'Luxury') score += 25;
    if (pricingStrategy === 'Penetration') score += 15;
    score += Math.min(20, adSpendCrore * 1.2);
    return Math.min(100, Math.round(score));
  }, [productQualityTier, packagingType, pricingStrategy, adSpendCrore]);

  // ─── FILTERED CHALLENGES BY BKT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY CHECK ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── MOTIVATIONAL FEEDBACK MESSAGE ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── MEMOISED HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand Asset-Liability Mismatch.' : 'Let us explore why commercial banks cannot fund 10-year projects safely.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate parameters and observe outcomes.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter Free Play Sandbox. Explore corporate finance tools freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase initiated. Apply your understanding to solve real Indian commerce cases.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulator to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise observation! Cash credit charges interest only on utilised amounts.' : 'Notice that interest is only calculated on the drawn balance.');
  }, []);

  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide(s => s + 1);
      audioManager.play('whoosh');
      setPredictionMade(false);
      setPredictionIndex(-1);
      setObservationAnswered(false);
      setObservationIndex(-1);
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
      audioManager.play('whoosh');
    }
  }, [currentSlide]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive Business Studies simulation.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! That is correct.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Explanations unlocked. Review the step-by-step breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleExecuteTrade = useCallback((type: 'BUY' | 'SELL') => {
    audioManager.play('pop');
    setOrderBook(prev => [
      { id: Date.now(), type, qty: tradeQuantity, price: tradePrice },
      ...prev.slice(0, 5)
    ]);
    speechManager.speak(`${type} order for ${tradeQuantity} shares matched at ₹${tradePrice}. Zero capital to the company.`);
  }, [tradeQuantity, tradePrice]);

  // ─── 2D CANVAS ANIMATION (FLOW OF CAPITAL vs SECONDARY SETTLEMENT) ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      particleOffset = (particleOffset + 1.2) % 300;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw baseline track
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, 25);
      ctx.lineTo(canvas.width - 20, 25);
      ctx.stroke();

      // Flowing secondary market trade packet
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(20 + particleOffset * ((canvas.width - 40) / 300), 25, 6, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('Investor A (Seller)', 10, 48);
      ctx.fillText('NSE Clearing House (T+1 Novation)', canvas.width / 2 - 80, 12);
      ctx.fillText('Investor B (Buyer)', canvas.width - 110, 48);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Inactivity timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      
      {/* ─── HEADER BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20">
                ISC Class 12 Commerce & Business Studies
              </span>
              <motion.span 
                key={difficulty} 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }} 
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  difficulty === 'foundation' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                  difficulty === 'standard' ? 'bg-gold-500/10 text-gold-400 border-gold-500/30' :
                  'bg-purple-500/10 text-purple-400 border-purple-500/30'
                }`}
              >
                {difficulty.toUpperCase()} TIER
              </motion.span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Badges */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                phase === p 
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30' 
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-gold-950/40 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/40">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️</span> Narrative Scenario Case
            </div>
            <h3 className="text-xl font-bold text-white">{SCENARIO.title}</h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 p-3 bg-gold-950/60 rounded-xl border border-gold-800/30">
              💡 <strong>Executive Mission:</strong> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Discovery Question (Ungraded Curiosity Hook)</span>
              <span className="text-xs text-slate-400">Think like a CFO</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/70 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 space-y-4">
                <div className={`p-4 rounded-xl text-sm leading-relaxed border ${
                  discoveryCorrect 
                    ? 'bg-emerald-950/40 border-emerald-800/50 text-emerald-300' 
                    : 'bg-amber-950/40 border-amber-800/50 text-amber-300'
                }`}>
                  <p className="font-bold mb-1">{discoveryCorrect ? '🎯 Brilliant Strategic Intuition!' : '🔍 Critical Concept Unlocked:'}</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full py-3.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center justify-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─��─ PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Interactive Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={handlePrevSlide}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg border border-slate-700"
              >
                ← Back
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-xs font-bold rounded-lg text-white shadow"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Free Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-sm text-amber-300 font-medium p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* DYNAMIC LAB VIEW BASED ON SLIDE */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[420px] space-y-6">
            
            {/* LAB 1: Term Loan & Covenants */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <AssetLiabilityMismatchSVG termLoan={termLoanAmount} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">FI Term Loan Sanction (SIDBI/IFCI)</span>
                        <span className="text-gold-400 font-bold">₹{termLoanAmount} Crore</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={400}
                        step={10}
                        value={termLoanAmount}
                        onChange={(e) => setTermLoanAmount(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="FI Term Loan Amount"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Agreed Interest Rate</span>
                        <span className="text-gold-400 font-bold">{termLoanRate}% p.a.</span>
                      </div>
                      <input
                        type="range"
                        min={8.0}
                        max={14.0}
                        step={0.5}
                        value={termLoanRate}
                        onChange={(e) => setTermLoanRate(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Interest Rate"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Repayment Tenure</span>
                        <span className="text-gold-400 font-bold">{termLoanTenure} Years</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={15}
                        value={termLoanTenure}
                        onChange={(e) => setTermLoanTenure(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Tenure"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Annual Debt Service:</span>
                        <span className="font-bold text-white">₹{(annualInterest + annualPrincipal).toFixed(1)} Cr/yr</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Debt Service Coverage Ratio (DSCR):</span>
                        <span className={`font-bold ${parseFloat(dscr as string) >= 1.5 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {dscr} (Target ≥ 1.50)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Covenants Display */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Active Restrictive Covenants</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {activeCovenants.length} Restrictions Active
                      </span>
                    </div>
                    <div className="space-y-2">
                      {activeCovenants.map((cov, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-2.5 bg-slate-900 rounded-lg text-xs text-rose-200/90 border border-rose-900/40 flex items-start gap-2"
                        >
                          <span className="text-rose-400 font-bold">����</span>
                          <span>{cov}</span>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-500 italic pt-2">
                      *Section 180(1)(c) of Companies Act 2013 requires special shareholder resolution if borrowing exceeds Paid-up Capital + Free Reserves.
                    </p>
                  </div>
                </div>

                {/* Predict-then-check block */}
                {!predictionMade ? (
                  <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/40 space-y-3">
                    <span className="text-xs font-bold text-gold-400 uppercase">Step Challenge: Predict Before Testing</span>
                    <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="text-left p-2.5 bg-slate-800 hover:bg-slate-750 text-xs rounded-lg text-slate-200 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs text-emerald-300">
                    ✓ <strong>Prediction Verified:</strong> {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </motion.div>
                )}
              </div>
            )}

            {/* LAB 2: Cash Credit & Drawing Power */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <CashCreditDrawingPowerSVG stockVal={stockValue} margin={bankMargin} dp={drawingPower} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Hypothecated Stock Value</span>
                        <span className="text-gold-400 font-bold">₹{stockValue} Crore</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={150}
                        step={5}
                        value={stockValue}
                        onChange={(e) => setStockValue(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Stock Value"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Bank Margin Requirement</span>
                        <span className="text-gold-400 font-bold">{bankMargin}%</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={50}
                        step={5}
                        value={bankMargin}
                        onChange={(e) => setBankMargin(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Bank Margin"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Actual Utilised/Drawn Amount</span>
                        <span className="text-gold-400 font-bold">₹{utilisedCC} Crore</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        step={5}
                        value={utilisedCC}
                        onChange={(e) => setUtilisedCC(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Utilised Amount"
                      />
                    </div>
                  </div>

                  {/* Visual Gauges */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-center">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Maximum Drawing Power (Stock × [1 - Margin]):</span>
                        <span className="text-emerald-400 font-bold text-sm">₹{drawingPower} Crore</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500"
                          animate={{ width: `${Math.min(100, (parseFloat(drawingPower) / stockValue) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Monthly Interest Cost:</span>
                        <span className="text-amber-400 font-bold text-sm">₹{actualMonthlyInterest} Crore/month</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        ⚡ Interest is charged <strong>strictly on ₹{Math.min(utilisedCC, parseFloat(drawingPower))} Crore</strong> (the utilized amount), NOT on the full sanctioned limit!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Observation Question */}
                {!observationAnswered ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-gold-400 uppercase">Observation Check: What do you notice?</span>
                    <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleObservation(i)}
                          className="text-left p-2.5 bg-slate-800 hover:bg-slate-750 text-xs rounded-lg text-slate-200 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs text-emerald-300">
                    ✓ Observation logged: Cash Credit prevents dead interest expense by billing only active utilisation.
                  </div>
                )}
              </div>
            )}

            {/* LAB 3: Bill Discounting vs Factoring */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Facility Model:</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setFinancingType('bill-discounting'); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        financingType === 'bill-discounting' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Bill Discounting (Bank)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setFinancingType('factoring'); audioManager.play('tap'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        financingType === 'factoring' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Factoring (SBI Factors/NBFC)
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">Default Recourse:</span>
                    <span className={`text-xs px-2.5 py-1 rounded-md font-bold ${
                      financingType === 'bill-discounting' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {financingType === 'bill-discounting' ? 'With Recourse (Drawer liable)' : 'Non-Recourse / Recourse Option'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400">Invoice / Bill Value:</span>
                    <h4 className="text-xl font-black text-white">₹{invoiceValue} Lakh</h4>
                    <p className="text-[11px] text-slate-500">Drawn on certified automotive corporate buyer.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400">Upfront Advance ({calculatedDiscount.advancePercentage}%):</span>
                    <h4 className="text-xl font-black text-emerald-400">₹{calculatedDiscount.immediateCash} Lakh</h4>
                    <p className="text-[11px] text-slate-500">Instant cash released within 24-48 hours.</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400">Ledger Administration:</span>
                    <h4 className="text-sm font-bold text-gold-300">
                      {financingType === 'factoring' ? 'Outsourced to Factor' : 'Retained by Titan EV Internal Staff'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {financingType === 'factoring' ? 'Factor collects from all debtors directly.' : 'Firm retains debt collection responsibility.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: Stock Terminal */}
            {currentSlide === 3 && (
              <div className="space-y-5">
                {/* 2D Canvas Trade Settler */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <canvas ref={canvasRef} width={500} height={60} className="w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Secondary Market Order Terminal</span>
                      <span className="text-xs text-emerald-400 font-mono">NSE T+1 LIVE</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Trade Quantity</label>
                        <input
                          type="number"
                          value={tradeQuantity}
                          onChange={(e) => setTradeQuantity(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
                          aria-label="Quantity"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Limit Price (₹)</label>
                        <input
                          type="number"
                          value={tradePrice}
                          onChange={(e) => setTradePrice(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white"
                          aria-label="Price"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExecuteTrade('BUY')}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-xs text-white shadow-md shadow-emerald-600/30"
                      >
                        BUY (T+1 Settlement)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExecuteTrade('SELL')}
                        className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 font-bold rounded-xl text-xs text-white shadow-md shadow-rose-600/30"
                      >
                        SELL (Dematerialised)
                      </motion.button>
                    </div>
                  </div>

                  {/* Order book */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Matched Order Trail</span>
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                      {orderBook.map((ord) => (
                        <div key={ord.id} className="flex justify-between text-xs p-2 bg-slate-900 rounded-lg border border-slate-800 font-mono">
                          <span className={ord.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}>{ord.type} {ord.qty} Qty</span>
                          <span className="text-slate-300">@ ₹{ord.price}</span>
                          <span className="text-slate-500 text-[10px]">Company Fund Flow: ₹0</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: Marketing Mix & 4Ps */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <MarketingMixStrategySVG strategy={pricingStrategy} qualityTier={productQualityTier} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Product Quality & Feature Tier</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Standard', 'Premium', 'Luxury'] as const).map((tier) => (
                          <button
                            key={tier}
                            onClick={() => { setProductQualityTier(tier); audioManager.play('tap'); }}
                            className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                              productQualityTier === tier
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Pricing Strategy (Price Mix)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['Skimming', 'Penetration', 'Value-Based', 'Cost-Plus'] as const).map((strat) => (
                          <button
                            key={strat}
                            onClick={() => { setPricingStrategy(strat); audioManager.play('tap'); }}
                            className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                              pricingStrategy === strat
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            {strat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-400">Brand Promotion Spend</span>
                        <span className="text-gold-400 font-bold">₹{adSpendCrore} Crore</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        value={adSpendCrore}
                        onChange={(e) => setAdSpendCrore(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Ad Spend"
                      />
                    </div>
                  </div>

                  {/* 4Ps Wheel / Performance Index */}
                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Marketing Competitiveness Index</span>
                        <span className="text-sm font-black text-gold-400">{marketingIndex}/100</span>
                      </div>
                      <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500"
                          animate={{ width: `${marketingIndex}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-gold-300 font-bold">4Ps Alignment Analysis:</p>
                      <p className="text-slate-300">
                        {pricingStrategy === 'Skimming' && productQualityTier !== 'Luxury'
                          ? '⚠️ Skimming without luxury positioning risks high buyer resistance!'
                          : pricingStrategy === 'Penetration'
                          ? '🚀 Penetration drives massive customer acquisition and rapid market share.'
                          : '✨ Value-based pricing captures premium customer perceived surplus.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/40 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">🎮 Free Exploration Sandbox</h3>
              <p className="text-xs text-slate-300 mt-1">
                Zero pressure, zero scoring. Experiment with corporate borrowing limits, cash credit margins, and price mix mechanics.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30"
            >
              Ready for Board Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-gold-400 uppercase">Term Debt & Covenants Engine</span>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Term Loan Sanction</span>
                  <span className="text-white font-bold">₹{termLoanAmount} Cr</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={400}
                  step={10}
                  value={termLoanAmount}
                  onChange={(e) => setTermLoanAmount(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">DSCR:</span>
                  <span className="font-bold text-emerald-400">{dscr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Covenants Enforced:</span>
                  <span className="font-bold text-rose-400">{activeCovenants.length} Clauses</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-gold-400 uppercase">Cash Credit Drawing Power Engine</span>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Stock Hypothecated</span>
                  <span className="text-white font-bold">₹{stockValue} Cr</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={150}
                  step={5}
                  value={stockValue}
                  onChange={(e) => setStockValue(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bank Margin:</span>
                  <span className="font-bold text-gold-400">{bankMargin}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Drawing Power:</span>
                  <span className="font-bold text-emerald-400">₹{drawingPower} Cr</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          
          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 uppercase">
                Competency: {activeChallenge.competencyLevel.toUpperCase()}
              </span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card with Visual Feedback & Mandatory Shake */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white leading-snug mb-4">
              {activeChallenge.question}
            </p>

            {/* TYPE 1: CLASSIFY / DISTINGUISH / MATCH (MCQ) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG-LABEL */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'target_primary', title: 'Target A: Direct Product Enclosure' },
                    { id: 'target_secondary', title: 'Target B: Unit Outer Display Carton' },
                    { id: 'target_transport', title: 'Target C: Bulk Distribution Logistics' },
                    { id: 'target_visual', title: 'Target D: Unspoken Visual Emblem' }
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center space-y-1"
                    >
                      <span className="text-[11px] text-slate-400 block">{target.title}</span>
                      <div className="text-sm font-bold text-gold-300">
                        {droppedLabels[target.id] || '📥 Drop Component Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-3 bg-gold-600 hover:bg-gold-500 font-bold rounded-xl text-white text-sm"
                >
                  Verify Dragged Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder stages chronologically:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="font-mono text-gold-400 font-bold">{displayIdx + 1}.</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3, 4])}
                  className="w-full py-3 bg-gold-600 hover:bg-gold-500 font-bold rounded-xl text-white text-sm"
                >
                  Confirm Chronological Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric calculation"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm"
                    aria-label="Numeric answer"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 font-bold rounded-xl text-white text-sm shadow"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-bold text-gold-300 flex items-center gap-2">
                      {p}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-400">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click modules above to construct the decision hierarchy</span>}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="w-full py-3 bg-gold-600 hover:bg-gold-500 font-bold rounded-xl text-white text-sm"
                >
                  Validate Decision Architecture
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-5 bg-amber-950/40 rounded-2xl border border-amber-800/50 space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Resolution Walkthrough</span>
                
                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                  >
                    <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs"
                    >
                      Show Next Analysis Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Audit →' : 'Next Board Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-800/50 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Board Mastery Certified!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have completed the comprehensive ISC Business Studies Corporate Financing & Marketing Strategy curriculum.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery Status</span>
                <span className="text-xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION */}
          <div className="p-5 bg-gradient-to-r from-gold-950/80 to-slate-900 rounded-2xl border border-gold-700/50 text-center space-y-2">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Executive Assessment Feedback</span>
            <h3 className="text-xl font-extrabold text-white">{motivationalMessage}</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {errors === 0
                ? 'Flawless execution! You possess textbook precision across statutory acts, drawing power computations, and 4Ps strategic alignment.'
                : errors <= 3
                ? 'High-calibre performance! Review the minor misconception highlights below to cement complete 100% board readiness.'
                : errors <= 7
                ? 'Good effort! You demonstrated solid intuition in financial mechanisms. Revisit working capital formulas and covenants to master the fine details.'
                : 'Do not give up — You WILL get this! Commercial finance and market regulations have steep learning curves. Review the lessons and try another run!'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-lg">🧠</span>
              <h3 className="text-base font-bold text-white">Post-Simulation Executive Reflection</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g. Learning why secondary market trades do not provide funds to the company..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g. Explaining the difference between bank overdraft on current account vs cash credit against stock..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                  rows={2}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g. Structuring financing for my own startup or analyzing public companies on the stock market..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500"
                  rows={2}
                />
              </div>

              {!reflectionSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                  }}
                  className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 font-bold text-xs rounded-xl text-white transition-all shadow"
                >
                  Save Reflection Notes
                </motion.button>
              ) : (
                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 text-xs text-emerald-300 text-center font-bold">
                  ✓ Reflection saved to your personalized mastery portfolio!
                </div>
              )}
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/40 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Your Targeted Misconception Profile</span>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Myth: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Reality: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/40 text-xs text-gold-300 flex items-center justify-between">
            <span>📅 <strong>SM-2 Spaced Repetition Due:</strong> Review recommended in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to consolidate long-term synaptic retention.</span>
          </div>

          {/* Real-World Capstone */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">🏢 {REAL_WORLD_ACTIVITY.title}</span>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">{st}</div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── MODALS / POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}

export default C12_BusinessStudiesLoansFromFinancialSim;