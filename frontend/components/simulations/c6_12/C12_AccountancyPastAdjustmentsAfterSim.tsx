'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Node IDs as string literals
const NODE_C12_ACC_011 = 'c12_acc_011';
const NODE_C12_ACC_012 = 'c12_acc_012';
const NODE_C12_ACC_013 = 'c12_acc_013';
const NODE_C12_ACC_014 = 'c12_acc_014';
const NODE_C12_ACC_015 = 'c12_acc_015';
const NODE_C12_ACC_016 = 'c12_acc_016';
const NODE_C12_ACC_017 = 'c12_acc_017';
const NODE_C12_ACC_018 = 'c12_acc_018';
const NODE_C12_ACC_019 = 'c12_acc_019';
const NODE_C12_ACC_020 = 'c12_acc_020';

const ALL_NODE_IDS = [
  NODE_C12_ACC_011,
  NODE_C12_ACC_012,
  NODE_C12_ACC_013,
  NODE_C12_ACC_014,
  NODE_C12_ACC_015,
  NODE_C12_ACC_016,
  NODE_C12_ACC_017,
  NODE_C12_ACC_018,
  NODE_C12_ACC_019,
  NODE_C12_ACC_020,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Apex ChemTech Partners: The Post-Audit Crisis & New Admission',
  intro: 'Apex ChemTech Partners (Jaipur) closed its 2024 financial accounts, but an internal audit revealed that Interest on Capital (10%) and Interest on Drawings (6%) were completely omitted from the P&L Appropriation A/c. To make matters more urgent, Dr. Chirag is joining as a 1/5th partner, bringing new capital and goodwill!',
  context: 'As the lead Chartered Accountant, you must fix the closed accounts via an Analytical Table compound entry, value Goodwill using AS-26 standards across multiple methods, revalue assets, and restructure partner capital balances before admission.',
};

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'The firm closed its books for FY 2023-24 and distributed ₹1,50,000 profit. Later, it was discovered that Interest on Capital of ₹60,000 was omitted. Should the accountant tear open the closed P&L Appropriation Account and re-prepare it?',
  options: [
    'Yes, re-prepare and re-audit the entire Profit & Loss Appropriation A/c from scratch',
    'No! Pass a single compound rectifying entry directly through Partners’ Capital A/cs via an Analytical Table',
    'No, simply ignore the error since the total firm cash remains unchanged',
    'Yes, cancel the partnership deed and form a brand new firm'
  ],
  correctIndex: 1,
  hintAfter: 'Under Indian Partnership Act 1932 and ICAI norms, closed accounts are rectified using an Analytical Table without reopening finalised statements!',
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: PAST ADJUSTMENT WORKFLOW ───
const AnalyticalTableSvg = () => (
  <svg viewBox="0 0 680 180" className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800 p-2 my-3">
    <defs>
      <linearGradient id="gradFlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4338ca" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
      </marker>
    </defs>
    <text x="340" y="22" textAnchor="middle" fill="#cbd5e1" fontSize="13" fontWeight="bold">
      Past Adjustment Architecture: Zero-Sum Analytical Rectification
    </text>
    {/* Step 1 Box */}
    <rect x="20" y="45" width="130" height="90" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
    <text x="85" y="70" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">1. Closed Books</text>
    <text x="85" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">P&L Approp. Closed</text>
    <text x="85" y="105" textAnchor="middle" fill="#f87171" fontSize="9">IOC / IOD Omitted</text>
    <text x="85" y="120" textAnchor="middle" fill="#fca5a5" fontSize="8">Wrong Divisible Profit</text>

    {/* Arrow 1 */}
    <line x1="155" y1="90" x2="185" y2="90" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

    {/* Step 2 Box */}
    <rect x="190" y="45" width="140" height="90" rx="8" fill="#0c4a6e" stroke="#0284c7" strokeWidth="1.5" />
    <text x="260" y="70" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">2. Entitlements</text>
    <text x="260" y="90" textAnchor="middle" fill="#34d399" fontSize="9">Credit (+) Omitted IOC</text>
    <text x="260" y="105" textAnchor="middle" fill="#f87171" fontSize="9">Debit (-) Omitted IOD</text>
    <text x="260" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="8">Credit Salary / Comm.</text>

    {/* Arrow 2 */}
    <line x1="335" y1="90" x2="365" y2="90" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

    {/* Step 3 Box */}
    <rect x="370" y="45" width="140" height="90" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
    <text x="440" y="70" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">3. Reversal Balance</text>
    <text x="440" y="90" textAnchor="middle" fill="#fca5a5" fontSize="9">Debit (-) Wrong Share</text>
    <text x="440" y="105" textAnchor="middle" fill="#94a3b8" fontSize="9">in Wrong Ratio</text>
    <text x="440" y="120" textAnchor="middle" fill="#fef08a" fontSize="8">Σ Net Firm Effect = ₹0</text>

    {/* Arrow 3 */}
    <line x1="515" y1="90" x2="540" y2="90" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />

    {/* Step 4 Box */}
    <rect x="545" y="45" width="120" height="90" rx="8" fill="#312e81" stroke="#a855f7" strokeWidth="1.5" />
    <text x="605" y="70" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">4. Compound Entry</text>
    <text x="605" y="90" textAnchor="middle" fill="#f43f5e" fontSize="9">Dr. Gaining Partner</text>
    <text x="605" y="105" textAnchor="middle" fill="#10b981" fontSize="9">Cr. Sacrificing Partner</text>
    <text x="605" y="120" textAnchor="middle" fill="#c084fc" fontSize="8">Single Rectifying JV</text>

    {/* Bottom summary bar */}
    <rect x="20" y="148" width="645" height="22" rx="4" fill="url(#gradFlow)" opacity="0.35" />
    <text x="340" y="163" textAnchor="middle" fill="#f8fafc" fontSize="9.5" fontWeight="semibold">
      Indian Partnership Act 1932 &amp; ICAI: No P&amp;L Reopening • Direct Inter-Capital Rebalancing
    </text>
  </svg>
);

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: AS-26 GOODWILL VALUATION PYRAMID ───
const GoodwillValuationSvg = () => (
  <svg viewBox="0 0 680 180" className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800 p-2 my-3">
    <text x="340" y="20" textAnchor="middle" fill="#fef08a" fontSize="13" fontWeight="bold">
      AS-26 Intangibles Framework: Valuation Spectrum &amp; Exclusions
    </text>
    {/* Box 1: Average Profit */}
    <rect x="25" y="38" width="145" height="95" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
    <text x="97" y="58" textAnchor="middle" fill="#38bdf8" fontSize="10.5" fontWeight="bold">Simple / Weighted Avg</text>
    <text x="97" y="76" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">Normal Operating Profit</text>
    <text x="97" y="90" textAnchor="middle" fill="#f87171" fontSize="8">(-) Abnormal Gains</text>
    <text x="97" y="104" textAnchor="middle" fill="#34d399" fontSize="8">(+) Abnormal Losses</text>
    <text x="97" y="120" textAnchor="middle" fill="#fbbf24" fontSize="8">GW = Avg Profit × YP</text>

    {/* Box 2: Super Profit */}
    <rect x="185" y="38" width="145" height="95" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
    <text x="257" y="58" textAnchor="middle" fill="#34d399" fontSize="10.5" fontWeight="bold">Super Profit Method</text>
    <text x="257" y="76" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">Normal P = CapEmp × NRR</text>
    <text x="257" y="92" textAnchor="middle" fill="#a7f3d0" fontSize="8.5">SP = Avg Profit - Normal P</text>
    <text x="257" y="108" textAnchor="middle" fill="#f87171" fontSize="8">If SP ≤ 0 ⇒ Goodwill = ₹0</text>
    <text x="257" y="122" textAnchor="middle" fill="#fbbf24" fontSize="8">GW = SP × No. of YP</text>

    {/* Box 3: Capitalization */}
    <rect x="345" y="38" width="150" height="95" rx="8" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
    <text x="420" y="58" textAnchor="middle" fill="#a5b4fc" fontSize="10.5" fontWeight="bold">Capitalization Method</text>
    <text x="420" y="76" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">1. Cap of Avg Profit:</text>
    <text x="420" y="90" textAnchor="middle" fill="#c7d2fe" fontSize="8">(Avg P × 100/NRR) - CapEmp</text>
    <text x="420" y="106" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">2. Cap of Super Profit:</text>
    <text x="420" y="120" textAnchor="middle" fill="#c7d2fe" fontSize="8">(Super P × 100/NRR)</text>

    {/* Box 4: AS-26 Mandate */}
    <rect x="510" y="38" width="145" height="95" rx="8" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
    <text x="582" y="58" textAnchor="middle" fill="#fb7185" fontSize="10.5" fontWeight="bold">AS-26 Mandatory Rule</text>
    <text x="582" y="76" textAnchor="middle" fill="#fca5a5" fontSize="8.5">❌ No Self-Generated GW</text>
    <text x="582" y="90" textAnchor="middle" fill="#fca5a5" fontSize="8.5">in Balance Sheet</text>
    <text x="582" y="106" textAnchor="middle" fill="#34d399" fontSize="8">✓ Purchased GW Allowed</text>
    <text x="582" y="122" textAnchor="middle" fill="#38bdf8" fontSize="8">Adjust via Capital / Current</text>

    <line x1="25" y1="145" x2="655" y2="145" stroke="#334155" strokeWidth="1" />
    <text x="340" y="165" textAnchor="middle" fill="#94a3b8" fontSize="9">
      Capital Employed = All Assets (Excl. Goodwill, Non-Trade Investments &amp; Fictitious Assets) - Outside Liabilities
    </text>
  </svg>
);

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: ADMISSION RECONSTITUTION WATERFALL ───
const AdmissionWaterfallSvg = () => (
  <svg viewBox="0 0 680 180" className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800 p-2 my-3">
    <text x="340" y="22" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">
      Reconstitution Sequence on Partner Admission (Order of Journalization)
    </text>
    {/* Step 1 */}
    <circle cx="70" cy="85" r="32" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
    <text x="70" y="80" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">1</text>
    <text x="70" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">Past Adj.</text>
    <text x="70" y="132" textAnchor="middle" fill="#94a3b8" fontSize="8">Rectify Prior</text>
    <text x="70" y="144" textAnchor="middle" fill="#94a3b8" fontSize="8">Omissions</text>

    {/* Connecting line */}
    <line x1="105" y1="85" x2="165" y2="85" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />

    {/* Step 2 */}
    <circle cx="205" cy="85" r="32" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
    <text x="205" y="80" textAnchor="middle" fill="#34d399" fontSize="14" fontWeight="bold">2</text>
    <text x="205" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">Revaluation</text>
    <text x="205" y="132" textAnchor="middle" fill="#94a3b8" fontSize="8">Assets/Liab</text>
    <text x="205" y="144" textAnchor="middle" fill="#a7f3d0" fontSize="8">Old Ratio Split</text>

    {/* Connecting line */}
    <line x1="240" y1="85" x2="300" y2="85" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />

    {/* Step 3 */}
    <circle cx="340" cy="85" r="32" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
    <text x="340" y="80" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">3</text>
    <text x="340" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">Reserves</text>
    <text x="340" y="132" textAnchor="middle" fill="#94a3b8" fontSize="8">Gen. Reserve &amp; P&amp;L</text>
    <text x="340" y="144" textAnchor="middle" fill="#fde68a" fontSize="8">Old Ratio Only</text>

    {/* Connecting line */}
    <line x1="375" y1="85" x2="435" y2="85" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />

    {/* Step 4 */}
    <circle cx="475" cy="85" r="32" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
    <text x="475" y="80" textAnchor="middle" fill="#f472b6" fontSize="14" fontWeight="bold">4</text>
    <text x="475" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">AS-26 GW</text>
    <text x="475" y="132" textAnchor="middle" fill="#94a3b8" fontSize="8">Premium for GW</text>
    <text x="475" y="144" textAnchor="middle" fill="#fbcfe8" fontSize="8">Sacrificing Ratio</text>

    {/* Connecting line */}
    <line x1="510" y1="85" x2="570" y2="85" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />

    {/* Step 5 */}
    <circle cx="605" cy="85" r="32" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
    <text x="605" y="80" textAnchor="middle" fill="#a78bfa" fontSize="14" fontWeight="bold">5</text>
    <text x="605" y="96" textAnchor="middle" fill="#e2e8f0" fontSize="8" fontWeight="bold">New Cap.</text>
    <text x="605" y="132" textAnchor="middle" fill="#94a3b8" fontSize="8">Capital Balance</text>
    <text x="605" y="144" textAnchor="middle" fill="#ddd6fe" fontSize="8">New Balance Sheet</text>

    <rect x="25" y="158" width="630" height="16" rx="4" fill="#0f172a" />
    <text x="340" y="170" textAnchor="middle" fill="#94a3b8" fontSize="8">
      Sacrificing Ratio = Old Share - New Share • Premium is strictly credited to Sacrificing Partners
    </text>
  </svg>
);

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

const CHALLENGES: Challenge[] = [
  // ─── FOUNDATION TIER (1-7) ───
  {
    id: 'ch_01',
    nodeId: NODE_C12_ACC_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is a single compound journal entry preferred for past adjustments rather than reopening the P&L Appropriation Account?',
    options: [
      'Reopening accounts is illegal under criminal law',
      'The net financial effect on the firm as a whole is zero; only inter-partner distribution changes',
      'Partners cannot legally alter their capital accounts once registered',
      'Auditors are not allowed to inspect past adjustment working sheets'
    ],
    correctIndex: 1,
    explanation: 'The total capital of the firm remains constant. The analytical table reallocates credits and debits among partners without disturbing closed financial statements.',
    hints: [
      'Think about whether any cash or asset leaves the firm when an omission is corrected.',
      'The correction is a zero-sum reallocation between over-credited and under-credited partners.',
      'Because total firm profit is unchanged, a single compound entry through Capital accounts suffices.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_ACC_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to AS-26 (Intangible Assets), which type of goodwill is strictly PROHIBITED from being recorded on the Balance Sheet?',
    options: [
      'Purchased Goodwill acquired in an arm’s length business takeover',
      'Internally Self-Generated Goodwill',
      'Goodwill paid for in cash during an acquisition',
      'Goodwill acquired through a court-approved corporate merger'
    ],
    correctIndex: 1,
    explanation: 'AS-26 mandates that self-generated goodwill cannot be recognized because its cost cannot be reliably and objectively measured.',
    hints: [
      'Consider which goodwill involves an actual monetary transaction and invoice.',
      'When you build a brand over 30 years yourself, what is the exact receipt of cost?',
      'AS-26 prohibits internally generated intangible assets whose cost cannot be measured reliably.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_ACC_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following factors would DIRECTLY DECREASE the value of a firm’s goodwill?',
    options: [
      'Securing a prime commercial location in Connaught Place, New Delhi',
      'Imposition of severe statutory price caps under the Drug Price Control Order (DPCO)',
      'A steady upward profit trend over 5 consecutive financial years',
      'High management efficiency reducing per-unit manufacturing cost'
    ],
    correctIndex: 1,
    explanation: 'Statutory price caps limit profit margins, directly compressing super profits and diminishing goodwill.',
    hints: [
      'Look for the option that restricts pricing power and margin.',
      'DPCO limits the maximum selling price of essential drugs.',
      'Compressed profit margins reduce future maintainable super profits.'
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_ACC_014,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Raw profits for 3 years are ₹1,00,000, ₹1,20,000, and ₹1,80,000. The 3rd year includes a non-recurring insurance claim of ₹20,000. What is the Simple Average Normal Profit in ₹?',
    correctAnswer: 126667,
    tolerance: 100,
    unit: '₹',
    explanation: 'Adjusted profits: Year 1 = 1,00,000; Year 2 = 1,20,000; Year 3 = 1,80,000 - 20,000 = 1,60,000. Average = (1,00,000 + 1,20,000 + 1,60,000) / 3 = 3,80,000 / 3 = ₹1,26,667.',
    hints: [
      'Abnormal non-recurring gains must be deducted to find normal operating profit.',
      'Year 3 adjusted profit = 1,80,000 - 20,000 = 1,60,000.',
      'Sum the three adjusted years (3,80,000) and divide by 3.'
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_ACC_017,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each balance sheet item to classify whether it is INCLUDED or EXCLUDED from Capital Employed for goodwill valuation.',
    dragItems: [
      { label: 'Purchased Goodwill', targetId: 'target_exclude' },
      { label: 'Plant & Machinery', targetId: 'target_include' },
      { label: 'Non-Trade Investments', targetId: 'target_exclude' },
      { label: 'Trade Debtors', targetId: 'target_include' }
    ],
    correctMapping: {
      target_exclude: 'Non-Trade Investments',
      target_include: 'Trade Debtors'
    },
    explanation: 'Purchased goodwill (to avoid circularity), non-trade investments (non-operating), and fictitious assets are excluded. Operating assets like Plant & Debtors are included.',
    hints: [
      'Operating assets that generate trading profit belong inside Capital Employed.',
      'Goodwill is excluded to prevent circular valuation.',
      'Non-trade investments do not earn operating profits and must be removed.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_ACC_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A and B share profits in 3:2. C is admitted for a 1/4th share, and old partners retain the remaining balance in their old ratio. What is the New Profit Sharing Ratio (NPSR)?',
    options: ['3 : 2 : 1', '9 : 6 : 5', '12 : 8 : 5', '3 : 2 : 5'],
    correctIndex: 1,
    explanation: 'Remaining share = 1 - 1/4 = 3/4. A’s new share = 3/4 × 3/5 = 9/20. B’s new share = 3/4 × 2/5 = 6/20. C’s share = 5/20. NPSR = 9:6:5.',
    hints: [
      'Do NOT just add 1 to the denominator to get 3:2:1 (that would make C’s share 1/6).',
      'Remaining profit is 3/4, split 3:2 between A and B.',
      'A = 3/4 * 3/5 = 9/20; B = 3/4 * 2/5 = 6/20; C = 5/20.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_ACC_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In which ratio and to whom is the General Reserve distributed on the date of admission of a new partner?',
    options: [
      'To all partners (including incoming) in the New Profit Sharing Ratio',
      'To old partners ONLY in their Old Profit Sharing Ratio',
      'To sacrificing partners in their Sacrificing Ratio',
      'Retained in the balance sheet without any entry'
    ],
    correctIndex: 1,
    explanation: 'General Reserve was accumulated out of past profits earned prior to the new partner’s admission. It belongs entirely to the old partners in their Old Ratio.',
    hints: [
      'Did the incoming partner help earn the past reserves?',
      'Past profits belong to past owners.',
      'Transfer General Reserve to Old Partners in the Old Profit Sharing Ratio.'
    ],
    misconceptionIndex: 4,
  },

  // ─── STANDARD TIER (8-14) ───
  {
    id: 'ch_08',
    nodeId: NODE_C12_ACC_011,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the steps for solving a Past Adjustment via the Analytical Table in the correct sequence:',
    sortItems: [
      'Credit omitted appropriations (e.g. Interest on Capital, Partner Salary)',
      'Debit omitted charges (e.g. Interest on Drawings)',
      'Debit the reversal of the wrongly distributed profit share',
      'Compute algebraic net effect per partner and pass single compound entry'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First determine what should have been credited and debited, reverse the incorrect profit distribution, and find net debit/credit per partner for the compound entry.',
    hints: [
      'Start with entitlements that partners were supposed to receive.',
      'Incorporate drawings charges.',
      'Reverse the incorrect divisible profit before computing net balancing amounts.'
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_ACC_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Capital Employed is ₹10,00,000; Normal Rate of Return (NRR) is 10%; Average Profit is ₹1,50,000. What is the value of Goodwill at 3 years’ purchase of Super Profit in ₹?',
    correctAnswer: 150000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Normal Profit = 10,00,000 × 10% = ₹1,00,000. Super Profit = 1,50,000 - 1,00,000 = ₹50,000. Goodwill = 50,000 × 3 = ₹1,50,000.',
    hints: [
      'Normal Profit = Capital Employed × NRR.',
      'Super Profit = Average Maintainable Profit - Normal Profit.',
      'Goodwill = Super Profit × Number of Years Purchase.'
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_ACC_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A firm has Average Profit of ₹2,40,000, NRR of 12%, and Capital Employed of ₹16,00,000. Compare Capitalization of Average Profit with Capitalization of Super Profit. Which statement is TRUE?',
    options: [
      'Capitalization of Average Profit yields ₹6,00,000 while Super Profit yields ₹4,00,000',
      'Both sub-methods yield EXACTLY ₹4,00,000 because they are algebraically equivalent',
      'Capitalization of Super Profit cannot be used if Capital Employed exceeds ₹10,00,000',
      'Capitalization of Average Profit requires deducting NRR from 100%'
    ],
    correctIndex: 1,
    explanation: 'Total Capitalized Value = 2,40,000 / 0.12 = ₹20,00,000. Goodwill = 20,00,000 - 16,00,000 = ₹4,00,000. Normal Profit = 1,92,000; Super Profit = 48,000. Goodwill = 48,000 / 0.12 = ₹4,00,000. Both reconcile perfectly!',
    hints: [
      'Calculate Total Capitalized Value = Average Profit / NRR.',
      'Subtract Capital Employed to get Goodwill under method 1.',
      'Notice that (Average Profit - Normal Profit)/NRR is algebraically identical.'
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_ACC_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Total Assets = ₹25,00,000 (including Purchased Goodwill ₹2,00,000, Non-Trade Investments ��3,00,000, P&L Dr. Balance ₹1,00,000). Outside Liabilities = ₹5,00,000. What is Capital Employed in ₹?',
    correctAnswer: 1400000,
    tolerance: 0,
    unit: '₹',
    explanation: 'Adjusted Assets = 25,00,000 - 2,00,000 (Goodwill) - 3,00,000 (Non-trade) - 1,00,000 (Fictitious) = ₹19,00,000. Capital Employed = 19,00,000 - 5,00,000 (Liabilities) = ₹14,00,000.',
    hints: [
      'Deduct all three non-operating/fictitious items from Total Assets first.',
      '19,00,000 is the tangible operating assets figure.',
      'Subtract outside liabilities (5,00,000) to get net operating capital.'
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_ACC_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'P and Q share profits in 2:1. R is admitted for 1/6th share, acquiring 2/3 of it from P and 1/3 from Q. What is the Sacrificing Ratio of P : Q?',
    options: ['2 : 1', '1 : 1', '3 : 2', '4 : 1'],
    correctIndex: 0,
    explanation: 'R acquires 2/3 of 1/6 from P and 1/3 of 1/6 from Q. The sacrifice of P is 2/18 and Q is 1/18. Hence the sacrificing ratio is 2 : 1.',
    hints: [
      'Sacrificing ratio is the ratio of surrender: (2/3 of 1/6) : (1/3 of 1/6).',
      'The 1/6 term cancels out.',
      'The direct ratio of sacrifice is 2/3 : 1/3 = 2 : 1.'
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_ACC_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Z is admitted into a firm. The firm’s goodwill is valued at ₹1,20,000. Z is entitled to 1/4th share but CANNOT bring any premium in cash. Under AS-26, what is the correct journal entry?',
    options: [
      'Dr. Goodwill A/c ₹30,000; Cr. Sacrificing Partners’ Capital A/cs ₹30,000',
      'Dr. Z’s Capital/Current A/c ₹30,000; Cr. Sacrificing Partners’ Capital A/cs ₹30,000 in Sacrificing Ratio',
      'Dr. Cash A/c ₹30,000; Cr. Z’s Capital A/c ₹30,000',
      'No entry is required until Z actually brings cash next year'
    ],
    correctIndex: 1,
    explanation: 'When premium cannot be brought in cash, AS-26 requires debiting the incoming partner’s capital or current account and crediting sacrificing partners in their sacrificing ratio. No Goodwill A/c is raised.',
    hints: [
      'AS-26 prohibits opening a Goodwill A/c in the books.',
      'Z owes ₹30,000 (1/4 of 1,20,000) to the sacrificing partners.',
      'Debit incoming partner’s capital/current account and credit sacrificing partners.'
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_ACC_020,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On admission, Building (Book Value ₹3,00,000) is revalued at ₹3,80,000, and Unrecorded Creditors of ₹20,000 are discovered. Construct the Net Revaluation Profit / Loss balance.',
    availableParts: ['Revaluation Profit ₹60,000', 'Revaluation Loss ₹60,000', 'Credited to Old Partners in Old Ratio', 'Debited to All Partners in New Ratio'],
    targetState: 'Revaluation Profit ₹60,000 Credited to Old Partners in Old Ratio',
    validationHint: 'Building gain is +80,000; Creditor loss is -20,000. Net is ₹60,000 profit transferred to old partners.',
    explanation: 'Credit Revaluation: Building gain (+₹80,000). Debit Revaluation: Unrecorded Creditors (-₹20,000). Net Revaluation Profit = ₹60,000, credited to Old Partners in their Old Profit Sharing Ratio.',
    hints: [
      'Gain on asset = 3,80,000 - 3,00,000 = +80,000.',
      'Loss on liability = -20,000.',
      'Net result is a Profit of ₹60,000 credited to old partners in old ratio.'
    ],
  },

  // ─── ADVANCED TIER (15-20) ───
  {
    id: 'ch_15',
    nodeId: NODE_C12_ACC_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A & B share profits 3:2 with capitals of ₹5,00,000 and ₹3,00,000. Interest on Capital @ 10% was omitted. Divisible profit of ₹80,000 was already distributed 3:2 without allowing interest. What is the Net Debit/Credit to A’s Capital A/c in ₹? (Enter positive for Credit, negative for Debit)',
    correctAnswer: 2000,
    tolerance: 0,
    unit: '₹',
    explanation: 'A should get IOC = +50,000. B gets IOC = +30,000. Total IOC = 80,000. Profit wrongly credited to A = 3/5 × 80,000 = -48,000. Net effect on A = +50,000 - 48,000 = +₹2,000 (Credit).',
    hints: [
      'Compute A’s omitted interest on capital: 10% of 5,00,000 = +50,000.',
      'Compute A’s share of profit already distributed: 3/5 of 80,000 = 48,000 (must be debited/reversed).',
      'Net effect = 50,000 - 48,000 = +2,000 Credit.'
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_ACC_014,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Profits: 2021: ₹80,000; 2022: ₹1,00,000; 2023: ₹1,50,000 (weights 1, 2, 3). Annual partner remuneration of ₹20,000 was not charged in any year. What is Goodwill at 2 years’ purchase of Weighted Average Profit in ₹?',
    correctAnswer: 203333,
    tolerance: 100,
    unit: '₹',
    explanation: 'Adjusted profits: Y1 = 60,000 (wt 1 = 60k); Y2 = 80,000 (wt 2 = 160k); Y3 = 1,30,000 (wt 3 = 390k). Sum weights = 6. Total weighted profit = 6,10,000. Weighted Avg = 6,10,000 / 6 = ₹1,01,667. Goodwill = 1,01,667 × 2 = ₹2,03,333.',
    hints: [
      'Deduct partner remuneration of ₹20,000 from each raw year first.',
      'Multiply adjusted profits by weights 1, 2, 3 and sum them.',
      'Divide by total weight (6) and multiply by 2 years purchase.'
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_ACC_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A firm has Capital Employed ₹20,00,000, NRR 12%, and Average Profit ₹2,10,000. An analyst calculates Goodwill as -₹90,000. How should an ISC accountant evaluate this result?',
    options: [
      'Recognize negative goodwill on the liability side of the balance sheet',
      'Goodwill is strictly NIL because self-generated negative goodwill is never recognized under AS-26',
      'Add ₹90,000 to the partners’ capital accounts as an intangible reserve',
      'Deduct ₹90,000 directly from bank balance'
    ],
    correctIndex: 1,
    explanation: 'Normal profit = 20,00,000 × 12% = ₹2,40,000. Super profit = 2,10,000 - 2,40,000 = -₹30,000. When super profit is negative, goodwill is NIL. Internally generated negative goodwill does not exist in accounting.',
    hints: [
      'Normal profit exceeds average profit, meaning return is below industry benchmark.',
      'Can a firm sell a "reputation deficit" as an asset or liability?',
      'Under AS-26 and ICAI rules, goodwill is recorded as NIL when super profit <= 0.'
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_ACC_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A & B share profits 3:2. C is admitted for 1/5th share. A sacrifices 1/10th from his share and B sacrifices 1/10th from his share. What is A’s NEW profit share fraction represented as a percentage (%)?',
    correctAnswer: 50,
    tolerance: 0,
    unit: '%',
    explanation: 'A’s old share = 3/5 = 6/10. A’s sacrifice = 1/10. A’s new share = 6/10 - 1/10 = 5/10 = 50%.',
    hints: [
      'Convert 3/5 into tenths: 6/10.',
      'Subtract the specific sacrifice of 1/10.',
      '6/10 - 1/10 = 5/10, which equals 50%.'
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_ACC_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'X and Y are 1:1 partners. Z is admitted for 1/4th share, acquired ENTIRELY from X. Goodwill is valued at ₹80,000 and Z brings ₹20,000 premium in cash. How is this premium credited?',
    options: [
      '₹10,000 to X and ₹10,000 to Y (Old Ratio)',
      '₹20,000 to X ONLY, and ₹0 to Y',
      '₹15,000 to X and ₹5,000 to Y (3:1)',
      '₹20,000 credited to General Reserve A/c'
    ],
    correctIndex: 1,
    explanation: 'Goodwill premium compensates only the sacrificing partner. Since Z acquired his entire share from X, Y sacrificed zero and receives zero. All ₹20,000 goes to X.',
    hints: [
      'Who surrendered profit share in favour of Z?',
      'Y gave up nothing (sacrifice = 0).',
      'The entire ₹20,000 is credited to X alone.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_ACC_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design the comprehensive closing & reconstitution workflow on Partner Admission in the correct chronological order:',
    sortItems: [
      'Pass past adjustment entries via analytical table for any prior omissions',
      'Prepare Revaluation A/c and distribute revaluation profit/loss in Old Ratio',
      'Distribute accumulated reserves (General Reserve, P&L credit balance) in Old Ratio',
      'Record incoming partner’s capital and AS-26 goodwill premium in Sacrificing Ratio'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Chronology: Rectify past errors first -> Revalue assets/liabilities -> Distribute existing accumulated reserves -> Admit incoming partner with capital and goodwill adjustment.',
    hints: [
      'First fix pre-existing errors in closed accounts.',
      'Revalue current assets and distribute pre-admission gains to old partners.',
      'Finally record the incoming partner’s capital and goodwill settlement.'
    ],
  },
];

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
  nodeId: NODE_C12_ACC_011,
  title: 'Past Adjustments & Admission Reconstitution Masterclass',
  definition: 'Past adjustments rectify errors made in closed partnership accounts via a single compound entry without reopening financial statements. On admission, assets are revalued, goodwill is treated under AS-26, and reserves are distributed to old partners.',
  eli5: 'When business partners forget to add interest or split profits wrongly last year, they make a quick balancing table instead of redoing all old books. When a new friend joins, they value the firm’s good name and split old piggy-bank savings fairly before letting the new partner in.',
  misconceptions: [
    { misconception: 'Past adjustments require reopening and re-auditing the P&L Appropriation Account', correction: 'No, a single compound entry through Partners’ Capital accounts using an Analytical Table fixes the inter-partner distribution without reopening closed accounts.' },
    { misconception: 'Self-generated goodwill should be recorded on the balance sheet at admission', correction: 'AS-26 strictly prohibits recording self-generated goodwill. It is adjusted exclusively through partners’ capital accounts in the sacrificing ratio.' },
    { misconception: 'All balance sheet investments are included in Capital Employed', correction: 'Non-trade investments are excluded from Capital Employed by default because they do not contribute to normal operating profit.' },
    { misconception: 'If A & B share 3:2 and C joins for 1/4th share, the new ratio is 3:2:1', correction: '3:2:1 gives C only 1/6th! The correct ratio is 9:6:5 found by multiplying remaining 3/4 by old shares.' },
    { misconception: 'General Reserve should be split in the New Ratio with the incoming partner', correction: 'General Reserve belongs strictly to Old Partners in the Old Ratio because it was accumulated from profits earned before admission.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the primary purpose of an Analytical Table in past adjustments?', options: ['To re-audit balance sheets', 'To compute net debit/credit per partner for a single compound entry', 'To calculate corporate tax', 'To dissolve the partnership'], correctIndex: 1 },
    { question: 'Which Accounting Standard governs Goodwill and prohibits self-generated goodwill recognition?', options: ['AS-3', 'AS-10', 'AS-26', 'AS-28'], correctIndex: 2 },
    { question: 'Under Super Profit method, Super Profit equals:', options: ['Average Profit + Normal Profit', 'Average Profit - Normal Profit', 'Total Assets / NRR', 'Weighted Profit × Years Purchase'], correctIndex: 1 },
    { question: 'Which asset is excluded from Capital Employed to prevent circular valuation?', options: ['Machinery', 'Trade Debtors', 'Purchased Goodwill', 'Stock'], correctIndex: 2 },
    { question: 'When a new partner brings goodwill premium in cash and retains it, which account is credited?', options: ['Goodwill A/c', 'Incoming Partner Capital A/c', 'Sacrificing Partners Capital A/cs in Sacrificing Ratio', 'P&L Appropriation A/c'], correctIndex: 2 },
    { question: 'Revaluation Account is which type of account?', options: ['Real Account', 'Personal Account', 'Nominal Account (P&L Adjustment)', 'Fictitious Asset Account'], correctIndex: 2 },
    { question: 'If Average Profit = ₹2,00,000 and NRR = 10%, Total Capitalized Value is:', options: ['₹20,000', '₹20,00,000', '₹2,00,000', '₹22,00,000'], correctIndex: 1 },
    { question: 'Sacrificing Ratio is calculated as:', options: ['New Share - Old Share', 'Old Share - New Share', 'Old Share + New Share', 'Gaining Ratio / 2'], correctIndex: 1 }
  ],
  masteryCriteria: 'Master the preparation of past adjustment analytical tables, goodwill valuation across all four methods, AS-26 accounting entries, and admission revaluation mechanics.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Interactive Past Adjustment Lab',
    instruction: 'Adjust partner capitals and omitted Interest on Capital rate to see the Analytical Table compute net adjustments in real-time.',
    interactionType: 'analytical-table',
    nodeId: NODE_C12_ACC_011,
  },
  {
    title: 'Goodwill Multi-Method Visualizer',
    instruction: 'Modify Capital Employed, NRR, and Average Profit to see all 4 valuation methods update simultaneously.',
    interactionType: 'goodwill-engine',
    nodeId: NODE_C12_ACC_015,
  },
  {
    title: 'Capital Employed Exclusions Filter',
    instruction: 'Toggle different asset types to observe what gets excluded from the productive net operating assets base.',
    interactionType: 'capital-employed',
    nodeId: NODE_C12_ACC_017,
  },
  {
    title: 'Admission Ratio & Sacrifice Visualizer',
    instruction: 'Drag the incoming partner share slider to observe how the profit pizza slices and sacrificing ratios transform.',
    interactionType: 'ratio-slider',
    nodeId: NODE_C12_ACC_018,
  },
  {
    title: 'AS-26 Goodwill & Revaluation T-Accounts',
    instruction: 'Simulate the admission journal entries and watch the dynamic T-Accounts balance live.',
    interactionType: 't-accounts',
    nodeId: NODE_C12_ACC_019,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Partner A has ₹6,00,000 capital and Partner B has ₹2,00,000 capital (sharing profits 1:1), and 10% Interest on Capital was omitted, who will be DEBITED in the past adjustment?',
    options: ['Partner A (he has more capital)', 'Partner B (he received more profit than his capital entitlement)', 'Neither, both get credited', 'The firm bank account'],
    correctIndex: 1,
    verifyInstruction: 'Adjust the simulator sliders below to Capital A=6L, B=2L, Ratio 1:1, IOC 10% to verify!',
    nodeId: NODE_C12_ACC_011,
  },
  {
    question: 'Predict: If a firm earns exactly the normal rate of return on its capital employed, what will be its Goodwill under the Super Profit method?',
    options: ['Equal to Capital Employed', 'Exactly NIL (₹0)', 'Equal to 3 years of Average Profit', 'Infinite'],
    correctIndex: 1,
    verifyInstruction: 'Set Average Profit equal to Normal Profit in the Goodwill engine to verify.',
    nodeId: NODE_C12_ACC_015,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the sum of Net Effects across all partners in the Analytical Table?',
    observableOptions: ['It always equals Total Capital', 'It always equals EXACTLY ZERO (Zero-Sum balance)', 'It equals the omitted interest', 'It is always positive'],
    correctIndex: 1,
    nodeId: NODE_C12_ACC_011,
  },
  {
    question: 'What happens to the Capitalization of Average Profit vs Super Profit when inputs are identical?',
    observableOptions: ['Average Profit method is always higher', 'Super Profit method is always higher', 'Both methods produce the EXACT same rupee figure (reconciled)', 'They differ by the tax rate'],
    correctIndex: 2,
    nodeId: NODE_C12_ACC_016,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Senior Partner Audit Review: Walker & Chandiok Case Study',
  description: 'Apply what you learned to an Indian partnership firm! Audit a real-life LLP reconstitution where an omitted partner salary of ₹1,20,000 and an unrecorded trademark appreciation of ₹3,00,000 must be adjusted before admitting an international partner.',
  steps: [
    'Prepare an Analytical Table for 3 partners with omitted salary and 8% IOC.',
    'Compute Capital Employed after excluding ₹5,00,000 non-trade mutual funds.',
    'Calculate Goodwill under Capitalization of Super Profit at 12% NRR.',
    'Draft the composite compound journal entry under AS-26 without opening a Goodwill A/c.'
  ],
};

function C12_AccountancyPastAdjustmentsAfterSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_ACC_011,
  title = DEFAULT_PROPS.title || 'Past Adjustments & Admission Reconstitution Masterclass',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['accountancy'] || { name: 'Accountancy', emoji: '📚', color: 'indigo' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org interactive discovery & observation state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Simulation Lab Interactive State
  const [capA, setCapA] = useState<number>(500000);
  const [capB, setCapB] = useState<number>(300000);
  const [iocRate, setIocRate] = useState<number>(10);
  const [omittedProfit, setOmittedProfit] = useState<number>(80000);
  const [psrA, setPsrA] = useState<number>(3);
  const [psrB, setPsrB] = useState<number>(2);

  // Goodwill Engine State
  const [gwAvgProfit, setGwAvgProfit] = useState<number>(240000);
  const [gwCapEmp, setGwCapEmp] = useState<number>(1600000);
  const [gwNrr, setGwNrr] = useState<number>(12);
  const [gwYearsPurchase, setGwYearsPurchase] = useState<number>(3);

  // Capital Employed Exclusions State
  const [incGoodwill, setIncGoodwill] = useState<boolean>(false);
  const [incNonTrade, setIncNonTrade] = useState<boolean>(false);
  const [incFictitious, setIncFictitious] = useState<boolean>(false);
  const [baseAssets, setBaseAssets] = useState<number>(2500000);
  const [outsideLiab, setOutsideLiab] = useState<number>(600000);

  // Admission Ratios State
  const [incomingShareFraction, setIncomingShareFraction] = useState<number>(20); // 20% = 1/5th
  const [revalBuildingGain, setRevalBuildingGain] = useState<number>(80000);
  const [revalStockLoss, setRevalStockLoss] = useState<number>(20000);
  const [genReserveAmount, setGenReserveAmount] = useState<number>(100000);

  // Challenge & Evaluation State
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construction State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Reflection State (for Phase 5)
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── COMPUTED VALUES: PAST ADJUSTMENTS ───
  const analyticalCalc = useMemo(() => {
    const iocA = (capA * iocRate) / 100;
    const iocB = (capB * iocRate) / 100;
    const totalIOC = iocA + iocB;
    const totalPsr = psrA + psrB;
    const revProfitA = (omittedProfit * psrA) / totalPsr;
    const revProfitB = (omittedProfit * psrB) / totalPsr;
    const netA = iocA - revProfitA;
    const netB = iocB - revProfitB;
    return { iocA, iocB, totalIOC, revProfitA, revProfitB, netA, netB };
  }, [capA, capB, iocRate, omittedProfit, psrA, psrB]);

  // ─── COMPUTED VALUES: GOODWILL METHODS ───
  const goodwillCalc = useMemo(() => {
    const normalProfit = (gwCapEmp * gwNrr) / 100;
    const superProfit = Math.max(0, gwAvgProfit - normalProfit);
    const avgProfitGw = gwAvgProfit * gwYearsPurchase;
    const superProfitGw = superProfit * gwYearsPurchase;
    const capAvgProfitTotal = (gwAvgProfit * 100) / gwNrr;
    const capAvgProfitGw = Math.max(0, capAvgProfitTotal - gwCapEmp);
    const capSuperProfitGw = (superProfit * 100) / gwNrr;
    return {
      normalProfit,
      superProfit,
      avgProfitGw,
      superProfitGw,
      capAvgProfitTotal,
      capAvgProfitGw,
      capSuperProfitGw
    };
  }, [gwAvgProfit, gwCapEmp, gwNrr, gwYearsPurchase]);

  // ─── COMPUTED VALUES: CAPITAL EMPLOYED ───
  const computedCapEmp = useMemo(() => {
    let assets = baseAssets;
    if (!incGoodwill) assets -= 200000;
    if (!incNonTrade) assets -= 300000;
    if (!incFictitious) assets -= 100000;
    return Math.max(0, assets - outsideLiab);
  }, [baseAssets, outsideLiab, incGoodwill, incNonTrade, incFictitious]);

  // ─── COMPUTED VALUES: ADMISSION RATIOS ───
  const admissionRatioCalc = useMemo(() => {
    const incFraction = incomingShareFraction / 100;
    const remaining = 1 - incFraction;
    const totalPsr = psrA + psrB;
    const newShareA = remaining * (psrA / totalPsr);
    const newShareB = remaining * (psrB / totalPsr);
    const sacrificeA = (psrA / totalPsr) - newShareA;
    const sacrificeB = (psrB / totalPsr) - newShareB;
    return {
      newShareA: (newShareA * 100).toFixed(1),
      newShareB: (newShareB * 100).toFixed(1),
      newShareC: (incFraction * 100).toFixed(1),
      sacrificeA: (sacrificeA * 100).toFixed(1),
      sacrificeB: (sacrificeB * 100).toFixed(1),
    };
  }, [incomingShareFraction, psrA, psrB]);

  // Filter challenges based on difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Update BKT adaptive difficulty
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D ANIMATION EFFECT ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing journal stream lines
      ctx.strokeStyle = '#4f46e5';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = 15 + Math.sin((x + frame * 2) * 0.05) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Dynamic ledger coin pulse
      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 15, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Brilliant intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive accounting simulation. Manipulate the variables and observe the accounts!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any combinations with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for ISC board challenge problems! Apply your concepts.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Good prediction! Now adjust the simulator to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Exact observation! The analytical table is always zero sum.' : 'Look closer at the net total column.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered Past Adjustments and Admission Accounting!');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Journal entries verified.');
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
        speechManager.speak('Let us inspect the step-by-step working note together.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Chart data for goodwill methods comparison
  const goodwillChartData = useMemo(() => [
    { name: 'Avg Profit (3yr)', value: goodwillCalc.avgProfitGw },
    { name: 'Super Profit (3yr)', value: goodwillCalc.superProfitGw },
    { name: 'Cap. Avg Profit', value: goodwillCalc.capAvgProfitGw },
    { name: 'Cap. Super Profit', value: goodwillCalc.capSuperProfitGw },
  ], [goodwillCalc]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Top Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-gold-900/60 border border-gold-500/40 rounded-2xl text-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-300 via-gold-300 to-emerald-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 12 Accountancy • Past Adjustments, AS-26 Goodwill &amp; Revaluation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
              difficulty === 'foundation' ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400' :
              difficulty === 'advanced' ? 'bg-rose-950/70 border-rose-500/50 text-rose-400' :
              'bg-gold-950/70 border-gold-500/50 text-gold-400'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <span className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs text-slate-300 font-semibold">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* PHASE 1: DISCOVERY */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
          <div className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/50 shadow-lg">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm tracking-wide uppercase">
              <span>🏛️ Real-World Case Scenario</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-gold-950/40 rounded-xl border border-gold-900/40 text-xs text-slate-300">
              💡 <span className="text-gold-300 font-semibold">Audit Findings:</span> {SCENARIO.context}
            </div>
          </div>

          {/* SVG Diagram 1: Visual Overview of Past Adjustments */}
          <AnalyticalTableSvg />

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>🔍 Curiosity Hook: What Should the Auditor Do?</span>
            </h3>
            <p className="text-sm text-slate-200 leading-snug">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left text-xs md:text-sm rounded-xl font-medium border transition-all duration-200 ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-gold-900/30 border-slate-700 hover:border-gold-500/50 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
                <p className={`text-xs md:text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Exact! An Analytical Table rectifies without touching closed ledgers.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-600 text-white rounded-xl font-bold text-xs md:text-sm shadow-lg shadow-gold-500/20"
                >
                  Enter Interactive Accounting Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 2: EXPLORE (Interactive Labs & Diagrams) */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between bg-slate-900/70 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-6 bg-gold-500' : 'w-2 bg-slate-700'}`}
                  aria-label={`Slide ${i + 1}`}
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
              className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs md:text-sm text-amber-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* LAB 1: PAST ADJUSTMENT ANALYTICAL TABLE */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/40">
                      <p className="text-xs font-bold text-gold-300 mb-2">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block">Partner A Capital: ₹{capA.toLocaleString('en-IN')}</label>
                      <input type="range" min={100000} max={1000000} step={50000} value={capA} onChange={e => setCapA(Number(e.target.value))} className="w-full mt-1 accent-gold-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block">Partner B Capital: ₹{capB.toLocaleString('en-IN')}</label>
                      <input type="range" min={100000} max={1000000} step={50000} value={capB} onChange={e => setCapB(Number(e.target.value))} className="w-full mt-1 accent-gold-500" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block">Omitted IOC Rate: {iocRate}%</label>
                      <input type="range" min={5} max={15} step={1} value={iocRate} onChange={e => setIocRate(Number(e.target.value))} className="w-full mt-1 accent-gold-500" />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                          <th className="p-2.5">Particulars</th>
                          <th className="p-2.5">Partner A (₹)</th>
                          <th className="p-2.5">Partner B (₹)</th>
                          <th className="p-2.5 font-bold text-amber-300">Total Firm (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        <tr className="hover:bg-slate-800/40">
                          <td className="p-2.5 text-emerald-400 font-medium">1. Interest on Capital @ {iocRate}% (Credit)</td>
                          <td className="p-2.5 font-mono text-emerald-300">+{analyticalCalc.iocA.toLocaleString('en-IN')}</td>
                          <td className="p-2.5 font-mono text-emerald-300">+{analyticalCalc.iocB.toLocaleString('en-IN')}</td>
                          <td className="p-2.5 font-mono text-emerald-400">+{analyticalCalc.totalIOC.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr className="hover:bg-slate-800/40">
                          <td className="p-2.5 text-rose-400 font-medium">2. Wrong Profit Share Reversed ({psrA}:{psrB}) (Debit)</td>
                          <td className="p-2.5 font-mono text-rose-300">-{analyticalCalc.revProfitA.toLocaleString('en-IN')}</td>
                          <td className="p-2.5 font-mono text-rose-300">-{analyticalCalc.revProfitB.toLocaleString('en-IN')}</td>
                          <td className="p-2.5 font-mono text-rose-400">-{omittedProfit.toLocaleString('en-IN')}</td>
                        </tr>
                        <tr className="bg-gold-950/40 font-bold">
                          <td className="p-2.5 text-gold-300">Net Effect (Compound Journal Basis)</td>
                          <td className={`p-2.5 font-mono ${analyticalCalc.netA >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {analyticalCalc.netA >= 0 ? `Cr ₹${analyticalCalc.netA.toLocaleString('en-IN')}` : `Dr ₹${Math.abs(analyticalCalc.netA).toLocaleString('en-IN')}`}
                          </td>
                          <td className={`p-2.5 font-mono ${analyticalCalc.netB >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {analyticalCalc.netB >= 0 ? `Cr ₹${analyticalCalc.netB.toLocaleString('en-IN')}` : `Dr ₹${Math.abs(analyticalCalc.netB).toLocaleString('en-IN')}`}
                          </td>
                          <td className="p-2.5 font-mono text-amber-300">₹{(analyticalCalc.netA + analyticalCalc.netB).toLocaleString('en-IN')} (Zero-Sum)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {!observationAnswered && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-semibold text-slate-200 mb-2">👁️ {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="flex flex-wrap gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-gold-900/40 rounded-lg text-slate-300 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* LAB 2: GOODWILL VALUATION ENGINE */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* SVG Diagram 2: AS-26 Valuation Framework */}
                  <GoodwillValuationSvg />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <label className="text-slate-400 font-semibold block">Avg Maintainable Profit: ₹{gwAvgProfit.toLocaleString('en-IN')}</label>
                      <input type="range" min={100000} max={500000} step={20000} value={gwAvgProfit} onChange={e => setGwAvgProfit(Number(e.target.value))} className="w-full mt-1 accent-gold-500" />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold block">Capital Employed: ₹{gwCapEmp.toLocaleString('en-IN')}</label>
                      <input type="range" min={500000} max={3000000} step={100000} value={gwCapEmp} onChange={e => setGwCapEmp(Number(e.target.value))} className="w-full mt-1 accent-gold-500" />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold block">Normal Rate (NRR): {gwNrr}%</label>
                      <input type="range" min={8} max={20} step={1} value={gwNrr} onChange={e => setGwNrr(Number(e.target.value))} className="w-full mt-1 accent-gold-500" />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold block">Years’ Purchase: {gwYearsPurchase}</label>
                      <input type="range" min={1} max={5} step={1} value={gwYearsPurchase} onChange={e => setGwYearsPurchase(Number(e.target.value))} className="w-full mt-1 accent-gold-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-56 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={goodwillChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-slate-400 font-medium block">Normal Profit</span>
                        <span className="text-base font-bold text-amber-300 font-mono">₹{goodwillCalc.normalProfit.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <span className="text-slate-400 font-medium block">Super Profit</span>
                        <span className="text-base font-bold text-emerald-300 font-mono">₹{goodwillCalc.superProfit.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
                        <span className="text-gold-300 font-medium block">Cap. of Avg Profit</span>
                        <span className="text-base font-bold text-gold-200 font-mono">₹{goodwillCalc.capAvgProfitGw.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
                        <span className="text-gold-300 font-medium block">Cap. of Super Profit</span>
                        <span className="text-base font-bold text-gold-200 font-mono">₹{goodwillCalc.capSuperProfitGw.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: CAPITAL EMPLOYED EXCLUSIONS */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <p className="text-xs text-slate-300">Toggle AS-26 rules to see how non-operating and fictitious items are deducted:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIncGoodwill(!incGoodwill)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold ${
                          incGoodwill ? 'bg-rose-950/60 border-rose-500 text-rose-300' : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        <div>Purchased Goodwill (₹2,00,000)</div>
                        <span className="text-[10px] font-normal block mt-1">{incGoodwill ? '❌ Included (Violates Circularity)' : '✓ Properly Excluded'}</span>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIncNonTrade(!incNonTrade)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold ${
                          incNonTrade ? 'bg-rose-950/60 border-rose-500 text-rose-300' : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        <div>Non-Trade Mutual Funds (₹3,00,000)</div>
                        <span className="text-[10px] font-normal block mt-1">{incNonTrade ? '❌ Included (Non-Operating)' : '✓ Properly Excluded'}</span>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIncFictitious(!incFictitious)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold ${
                          incFictitious ? 'bg-rose-950/60 border-rose-500 text-rose-300' : 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                        }`}
                      >
                        <div>Advertisement Suspense (₹1,00,000)</div>
                        <span className="text-[10px] font-normal block mt-1">{incFictitious ? '❌ Included (Fictitious)' : '✓ Properly Excluded'}</span>
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4 bg-gold-950/50 rounded-xl border border-gold-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gold-300 uppercase font-bold tracking-wider">Computed Tangible Capital Employed</span>
                      <p className="text-xs text-slate-400 mt-0.5">Base Assets (₹25L) - Excluded Items - Outside Liab (₹6L)</p>
                    </div>
                    <span className="text-2xl font-black font-mono text-emerald-400">₹{computedCapEmp.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              {/* LAB 4: ADMISSION RATIO & SACRIFICE PIZZA */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* SVG Diagram 3: Admission Reconstitution Waterfall */}
                  <AdmissionWaterfallSvg />

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-300 font-semibold block">Incoming Partner Share: {incomingShareFraction}% (1/{100 / incomingShareFraction})</label>
                    <input type="range" min={10} max={40} step={5} value={incomingShareFraction} onChange={e => setIncomingShareFraction(Number(e.target.value))} className="w-full mt-2 accent-gold-500" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
                      <span className="text-slate-400 font-medium">Partner A New Share</span>
                      <p className="text-xl font-black text-gold-300 mt-1">{admissionRatioCalc.newShareA}%</p>
                      <span className="text-[10px] text-amber-400 font-semibold">Sacrificed: {admissionRatioCalc.sacrificeA}%</span>
                    </div>
                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40">
                      <span className="text-slate-400 font-medium">Partner B New Share</span>
                      <p className="text-xl font-black text-gold-300 mt-1">{admissionRatioCalc.newShareB}%</p>
                      <span className="text-[10px] text-amber-400 font-semibold">Sacrificed: {admissionRatioCalc.sacrificeB}%</span>
                    </div>
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40">
                      <span className="text-slate-400 font-medium">Partner C (Incoming)</span>
                      <p className="text-xl font-black text-emerald-300 mt-1">{admissionRatioCalc.newShareC}%</p>
                      <span className="text-[10px] text-emerald-400 font-semibold">Total Gain Acquired</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: AS-26 GOODWILL & REVALUATION T-ACCOUNTS */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    {/* Revaluation T-Account */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-center font-bold text-gold-300 pb-1 border-b border-slate-800">Dr. Revaluation A/c Cr.</div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="border-r border-slate-800 pr-2 space-y-1">
                          <div className="text-rose-400">To Stock (Loss) ₹20k</div>
                          <div className="text-emerald-400 font-bold pt-2">To Profit transferred:</div>
                          <div className="text-slate-300 pl-2">A (3/5): ₹36,000</div>
                          <div className="text-slate-300 pl-2">B (2/5): ₹24,000</div>
                        </div>
                        <div className="pl-2 space-y-1">
                          <div className="text-emerald-400">By Building (Gain) ₹80k</div>
                        </div>
                      </div>
                      <div className="mt-2 pt-1 border-t border-slate-800 flex justify-between font-bold text-slate-400">
                        <span>Total: ₹80,000</span>
                        <span>Total: ₹80,000</span>
                      </div>
                    </div>

                    {/* Capital Accounts Adjustment (AS-26) */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="text-center font-bold text-gold-300 pb-1 border-b border-slate-800">AS-26 Direct Capital Adjustment</div>
                      <div className="p-2 mt-2 bg-slate-900 rounded-lg text-slate-300 space-y-1 text-[11px]">
                        <div>🔹 <span className="text-amber-300 font-semibold">No Goodwill A/c is raised</span> per AS-26</div>
                        <div>🔹 Incoming Partner brings ₹50,000 premium in cash:</div>
                        <div className="font-bold text-emerald-400 pl-3">Dr. Cash/Bank A/c ₹50,000</div>
                        <div className="text-gold-300 pl-6">Cr. A’s Capital (3/5) ₹30,000</div>
                        <div className="text-gold-300 pl-6">Cr. B’s Capital (2/5) ₹20,000</div>
                      </div>
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
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl font-bold text-xs md:text-sm"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-semibold">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs md:text-sm shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs md:text-sm shadow-lg shadow-emerald-600/20"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 3: SANDBOX */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-gold-300">Free Exploration Sandbox</h3>
            <p className="text-xs text-slate-400 mt-1">Manipulate all accounting variables freely with no grading pressure!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase">1. Past Adjustment Simulator</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400">Partner A Cap: ₹{capA.toLocaleString('en-IN')}</span>
                  <input type="range" min={100000} max={1000000} step={50000} value={capA} onChange={e => setCapA(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <span className="text-slate-400">Partner B Cap: ₹{capB.toLocaleString('en-IN')}</span>
                  <input type="range" min={100000} max={1000000} step={50000} value={capB} onChange={e => setCapB(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono">
                Net Result: A = {analyticalCalc.netA >= 0 ? 'Cr' : 'Dr'} ₹{Math.abs(analyticalCalc.netA).toLocaleString('en-IN')}, B = {analyticalCalc.netB >= 0 ? 'Cr' : 'Dr'} ₹{Math.abs(analyticalCalc.netB).toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-emerald-300 uppercase">2. Goodwill Calculator</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400">Avg Profit: ₹{gwAvgProfit.toLocaleString('en-IN')}</span>
                  <input type="range" min={100000} max={500000} step={20000} value={gwAvgProfit} onChange={e => setGwAvgProfit(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <span className="text-slate-400">Capital Employed: ₹{gwCapEmp.toLocaleString('en-IN')}</span>
                  <input type="range" min={500000} max={3000000} step={100000} value={gwCapEmp} onChange={e => setGwCapEmp(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-emerald-400">
                Super Profit Goodwill (3yr): ₹{goodwillCalc.superProfitGw.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-gradient-to-r from-gold-600 via-gold-600 to-emerald-600 text-white rounded-xl font-bold text-sm shadow-xl"
          >
            I am Ready for Board Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* PHASE 4: CHALLENGE */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          <canvas ref={canvasRef} width={600} height={30} className="w-full rounded-lg" />

          {/* Progress & Tier Bar */}
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
            <span className="text-gold-400 uppercase">Competency: {challenge.competencyLevel}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <p className="text-sm md:text-base font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* MCQ TYPE */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium border transition-all duration-200 ${
                      wrongFlash
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-gold-900/30 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
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
                      aria-label={`Draggable item ${item.label}`}
                      className="px-3 py-2 bg-gold-700 hover:bg-gold-600 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('target_include')}
                    className="p-4 bg-emerald-950/30 border-2 border-dashed border-emerald-600/50 rounded-xl min-h-[90px] flex flex-col justify-center items-center text-xs"
                  >
                    <span className="font-bold text-emerald-400 mb-1">✓ INCLUDED in Capital Employed</span>
                    <span className="text-white font-semibold">{droppedLabels.target_include || 'Drop Here'}</span>
                  </div>

                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop('target_exclude')}
                    className="p-4 bg-rose-950/30 border-2 border-dashed border-rose-600/50 rounded-xl min-h-[90px] flex flex-col justify-center items-center text-xs"
                  >
                    <span className="font-bold text-rose-400 mb-1">❌ EXCLUDED (AS-26 Exclusions)</span>
                    <span className="text-white font-semibold">{droppedLabels.target_exclude || 'Drop Here'}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Classification →
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
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
                    className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs flex items-center gap-3 cursor-grab text-slate-200"
                  >
                    <span className="w-5 h-5 flex items-center justify-center bg-gold-900 rounded-full font-bold text-gold-300 text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Submit Ordered Sequence →
                </motion.button>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter rupee value"
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                  >
                    Check Calculation →
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
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-600 rounded-lg text-xs text-white font-semibold flex items-center gap-1.5">
                      {part}
                      <button onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} className="text-rose-300 font-bold hover:text-white">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Assemble statements from above</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify Constructed Statement →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3">
                <p className="text-xs font-bold text-amber-300 uppercase tracking-wide">Detailed Working Note &amp; Rationale:</p>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-amber-200 leading-relaxed font-sans"
                  >
                    <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Working Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs md:text-sm shadow-lg shadow-emerald-600/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Audit Mastery →' : 'Next Board Problem →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 5: COMPLETE & REFLECTION */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-5">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/60 rounded-3xl border border-emerald-500/40 text-center space-y-3 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Reconstitution Audit Complete!</h2>
            <p className="text-sm text-emerald-300 font-medium">Final Audit Accuracy Score: {Math.max(0, 100 - errors * 5)}%</p>
            <span className="inline-block px-4 py-1.5 bg-emerald-900/60 border border-emerald-400 rounded-full text-xs font-bold text-emerald-200">
              Assessed Level: {masteryLevel.toUpperCase()}
            </span>
          </div>

          {/* Motivational Personalized Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
            {errors === 0
              ? '🌟 Flawless Mastery! You handled past adjustment analytical tables, AS-26 goodwill calculations, and revaluation entries with 100% precision.'
              : errors <= 3
              ? '👍 Excellent performance! You have a solid grasp of ISC partnership reconstitution rules. Review the specific notes below to reach full perfection.'
              : '💪 Good effort! You are making clear progress. Spend time analyzing the misconception profile below and re-explore the interactive labs.'}
          </div>

          {/* PROMINENT SPACED REPETITION (SRS) SCHEDULE BANNER */}
          <div className="p-5 bg-gradient-to-r from-amber-950/50 via-slate-900 to-gold-950/50 rounded-2xl border-2 border-amber-500/50 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 bg-amber-500/20 rounded-xl border border-amber-400/40">📅</span>
                <div>
                  <h4 className="text-sm md:text-base font-extrabold text-amber-300">
                    Spaced Repetition Schedule (SM-2 Algorithm)
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Scientifically calculated review interval to lock concepts into long-term memory.
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-500/20 border-2 border-amber-400 rounded-xl text-center">
                <span className="text-[10px] text-amber-300/80 uppercase font-bold tracking-wider block">Recommended Review</span>
                <span className="text-base md:text-lg font-black text-amber-200">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs">
              <div className={`p-2 rounded-lg border ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
                <div>0 Errors</div>
                <div className="text-[11px] font-semibold">7 Days (Mastered)</div>
              </div>
              <div className={`p-2 rounded-lg border ${errors >= 1 && errors <= 3 ? 'bg-amber-950/60 border-amber-500 text-amber-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
                <div>1–3 Errors</div>
                <div className="text-[11px] font-semibold">3 Days (Review)</div>
              </div>
              <div className={`p-2 rounded-lg border ${errors >= 4 ? 'bg-rose-950/60 border-rose-500 text-rose-300 font-bold' : 'bg-slate-900/40 border-slate-800 text-slate-400'}`}>
                <div>4+ Errors</div>
                <div className="text-[11px] font-semibold">1 Day (Reinforce)</div>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-gold-500/30 space-y-4">
            <h3 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🧠 Post-Audit Conceptual Reflection</span>
            </h3>
            <p className="text-xs text-slate-400">Deepen your long-term retention by reflecting on key principles:</p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  1. What was the most surprising thing you learned about past adjustments or AS-26?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. That past adjustments are strictly zero-sum, and self-generated goodwill can never be placed on the Balance Sheet..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  2. How would you explain the Analytical Table compound entry method to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Instead of opening all closed books, we calculate who received more vs who received less, and pass one net entry between partners' capital..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  3. Where in real life might you use this partnership reconstitution logic?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. When founding a startup, admitting a co-founder with sweat equity, or valuing brand equity during a corporate buyout..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-emerald-400 font-medium">
                {reflectionSubmitted ? '✓ Reflection saved to your SRS study record!' : ''}
              </span>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('success');
                  speechManager.speak('Reflection recorded successfully!');
                }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-md"
              >
                Save My Reflection →
              </motion.button>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
              <h3 className="text-xs md:text-sm font-bold text-rose-300 uppercase tracking-wider">Audit Traps Encountered:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Trap: {m.misconception}</p>
                    <p className="text-emerald-400">✓ Rule: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/40 space-y-3">
            <h3 className="text-sm md:text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1 text-xs text-slate-400 pl-4 list-disc">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Global Sim-Engine Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_AccountancyPastAdjustmentsAfterSim;