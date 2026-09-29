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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

// ─── MANDATORY NODE IDENTIFIERS ───
const NODE_C12_COMM_021 = 'c12_comm_021';
const NODE_C12_COMM_022 = 'c12_comm_022';
const NODE_C12_COMM_023 = 'c12_comm_023';
const NODE_C12_COMM_024 = 'c12_comm_024';
const NODE_C12_COMM_025 = 'c12_comm_025';
const NODE_C12_COMM_026 = 'c12_comm_026';
const NODE_C12_COMM_027 = 'c12_comm_027';
const NODE_C12_COMM_028 = 'c12_comm_028';
const NODE_C12_COMM_029 = 'c12_comm_029';
const NODE_C12_COMM_030 = 'c12_comm_030';

const ALL_NODE_IDS = [
  NODE_C12_COMM_021,
  NODE_C12_COMM_022,
  NODE_C12_COMM_023,
  NODE_C12_COMM_024,
  NODE_C12_COMM_025,
  NODE_C12_COMM_026,
  NODE_C12_COMM_027,
  NODE_C12_COMM_028,
  NODE_C12_COMM_029,
  NODE_C12_COMM_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Turnaround at Bharat Mobility Motors (BMM Ltd.)',
  intro:
    'You are appointed Chief Operations & Financial Officer at BMM Ltd., an Indian electric and commercial vehicle manufacturer in Pune. The assembly line is experiencing severe bottlenecks, worker unrest, departmental silos, erratic working capital, and a risky capital structure.',
  context:
    'Across 10 core management & finance pillars — from shop-floor supervision under the Factories Act 1948 and Maslow motivation hierarchies, to closed-loop controlling, Amul-style coordination, IFDL financial decisions, capital structure leveraging, and equity vs preference share funding — you must analyse, simulate, and steer the enterprise to peak performance.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'BMM Ltd. decides to launch an ambitious ₹5,000 crore EV gigafactory. The Plant Head starts hiring workers, the Finance team issues high-interest debentures without tax planning, and Marketing advertises deliveries before assembly begins. What fundamental management essence has failed here first?',
  options: [
    'Supervision — workers were not inspected strictly enough',
    'Coordination — departmental objectives and timing were not synchronised across functions',
    'Planning — only written forecasts were missing',
    'Directing — workers refused to work overtime',
  ],
  correctIndex: 1,
  hintAfter:
    'Notice how individual competence in silos produces chaos without continuous coordination!',
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: SUPERVISORY LINKING PIN ARCHITECTURE ───
function SupervisoryLinkingPinSVG({ intensity, redressal }: { intensity: number; redressal: number }) {
  return (
    <svg
      viewBox="0 0 500 240"
      className="w-full h-auto rounded-xl bg-slate-950/80 border border-slate-800 p-2 shadow-inner"
      role="img"
      aria-label="Diagram of Supervisor as the Linking Pin between Middle Management and Operative Technicians under Factories Act 1948"
    >
      <defs>
        <linearGradient id="gradTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="gradSup" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="gradWork" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#818cf8" />
        </marker>
        <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#34d399" />
        </marker>
      </defs>

      {/* Top / Middle Management Box */}
      <rect x="130" y="15" width="240" height="42" rx="8" fill="url(#gradTop)" stroke="#818cf8" strokeWidth="1.5" />
      <text x="250" y="34" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
        🏢 Middle Management (Plant GM / HR)
      </text>
      <text x="250" y="48" textAnchor="middle" fill="#c7d2fe" fontSize="9">
        Sets Production Policies & Targets
      </text>

      {/* Downward Policy Arrow */}
      <line x1="210" y1="60" x2="210" y2="92" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowDown)" strokeDasharray="4,2" />
      <text x="175" y="80" textAnchor="end" fill="#a5b4fc" fontSize="8" fontWeight="bold">
        Policies & Directives
      </text>

      {/* Upward Grievance Arrow */}
      <line x1="290" y1="92" x2="290" y2="60" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrowUp)" strokeDasharray="4,2" />
      <text x="325" y="80" textAnchor="start" fill="#6ee7b7" fontSize="8" fontWeight="bold">
        Grievances ({redressal}%)
      </text>

      {/* Shift Supervisor Linking Pin Box */}
      <rect x="110" y="96" width="280" height="48" rx="8" fill="url(#gradSup)" stroke="#6ee7b7" strokeWidth="2" />
      <text x="250" y="117" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
        ⚖️ Shift Supervisor (Vital Linking Pin)
      </text>
      <text x="250" y="133" textAnchor="middle" fill="#d1fae5" fontSize="9">
        Factories Act 1948 • Floor Oversight ({intensity}%) & Worker Welfare
      </text>

      {/* Downward Instructions Arrow */}
      <line x1="210" y1="147" x2="210" y2="178" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrowDown)" />
      <text x="175" y="166" textAnchor="end" fill="#a5b4fc" fontSize="8" fontWeight="bold">
        Supervision & Safety
      </text>

      {/* Upward Operational Voice Arrow */}
      <line x1="290" y1="178" x2="290" y2="147" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrowUp)" />
      <text x="325" y="166" textAnchor="start" fill="#6ee7b7" fontSize="8" fontWeight="bold">
        Safety Issues & Voice
      </text>

      {/* Operative Floor Technicians */}
      <rect x="130" y="182" width="240" height="42" rx="8" fill="url(#gradWork)" stroke="#fcd34d" strokeWidth="1.5" />
      <text x="250" y="201" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
        🔧 Operative Floor Technicians
      </text>
      <text x="250" y="215" textAnchor="middle" fill="#fef3c7" fontSize="9">
        Physical Assembly Line • 35 Technicians / Shift
      </text>
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: MASLOW HIERARCHY OF NEEDS PYRAMID ───
function MaslowPyramidSVG({ activeTier, onSelectTier }: { activeTier: number; onSelectTier: (t: number) => void }) {
  const tiers = [
    { level: 4, name: 'Self-Actualisation', desc: 'R&D Innovation & Potential', color: '#8b5cf6', y: 15, h: 32, wTop: 80, wBot: 140 },
    { level: 3, name: 'Esteem Needs', desc: 'Recognition, Awards & Titles', color: '#3b82f6', y: 50, h: 32, wTop: 140, wBot: 200 },
    { level: 2, name: 'Social / Belonging', desc: 'Teamwork & Family Day Picnics', color: '#10b981', y: 85, h: 32, wTop: 200, wBot: 260 },
    { level: 1, name: 'Safety & Security', desc: 'EPF, ESI & PPE Gear Compliance', color: '#f59e0b', y: 120, h: 32, wTop: 260, wBot: 320 },
    { level: 0, name: 'Physiological Needs', desc: 'Living Wage, Rest Breaks & Food', color: '#ef4444', y: 155, h: 35, wTop: 320, wBot: 380 },
  ];

  return (
    <svg
      viewBox="0 0 460 210"
      className="w-full h-auto rounded-xl bg-slate-950/80 border border-slate-800 p-2 shadow-inner"
      role="img"
      aria-label="Maslow Hierarchy of Human Needs Pyramid Diagram"
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ffffff" floodOpacity="0.6" />
        </filter>
      </defs>

      {tiers.map((t) => {
        const isSelected = activeTier === t.level;
        const xCenter = 230;
        const p1 = `${xCenter - t.wTop / 2},${t.y}`;
        const p2 = `${xCenter + t.wTop / 2},${t.y}`;
        const p3 = `${xCenter + t.wBot / 2},${t.y + t.h}`;
        const p4 = `${xCenter - t.wBot / 2},${t.y + t.h}`;
        const points = `${p1} ${p2} ${p3} ${p4}`;

        return (
          <g
            key={t.level}
            onClick={() => onSelectTier(t.level)}
            className="cursor-pointer transition-all hover:opacity-90"
            role="button"
            tabIndex={0}
            aria-label={`Select Maslow Tier: ${t.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectTier(t.level);
            }}
          >
            <polygon
              points={points}
              fill={t.color}
              opacity={isSelected ? 1 : 0.65}
              stroke={isSelected ? '#ffffff' : '#1e293b'}
              strokeWidth={isSelected ? 2.5 : 1}
              filter={isSelected ? 'url(#glow)' : undefined}
            />
            <text
              x={xCenter}
              y={t.y + t.h / 2 - 2}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="bold"
            >
              {t.level + 1}. {t.name} {isSelected ? '✓' : ''}
            </text>
            <text
              x={xCenter}
              y={t.y + t.h / 2 + 10}
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="8"
              opacity="0.9"
            >
              {t.desc}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: IFDL BALANCE SHEET & CAPITAL STRUCTURE MODEL ───
function CapitalStructureBalanceSheetSVG({ debtRatio, taxShield }: { debtRatio: number; taxShield: number }) {
  const equityRatio = 100 - debtRatio;
  return (
    <svg
      viewBox="0 0 500 220"
      className="w-full h-auto rounded-xl bg-slate-950/80 border border-slate-800 p-2 shadow-inner"
      role="img"
      aria-label="Balance Sheet Model showing Investment (Assets) vs Financing (Liabilities/Equity) Decisions and Tax Shield"
    >
      {/* Title */}
      <text x="250" y="18" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">
        📊 IFDL Framework: Balance Sheet Deployment & Financing Structure
      </text>

      {/* Left Column: Assets / Investment Decision */}
      <g>
        <rect x="25" y="32" width="215" height="175" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
        <rect x="25" y="32" width="215" height="26" rx="8" fill="#2563eb" />
        <text x="132" y="49" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          ASSETS (Investment Decisions)
        </text>

        {/* Fixed Capital Block */}
        <rect x="35" y="66" width="195" height="60" rx="6" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="1" />
        <text x="132" y="86" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          🏭 Fixed Capital (PPE)
        </text>
        <text x="132" y="102" textAnchor="middle" fill="#bfdbfe" fontSize="8">
          EV Gigafactory & Assembly Robots
        </text>
        <text x="132" y="116" textAnchor="middle" fill="#93c5fd" fontSize="8">
          Capital Budgeting (Long-Term)
        </text>

        {/* Working Capital Block */}
        <rect x="35" y="132" width="195" height="65" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
        <text x="132" y="152" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          ⚡ Working Capital (CA − CL)
        </text>
        <text x="132" y="168" textAnchor="middle" fill="#e0f2fe" fontSize="8">
          Inventory + Debtors − Creditors
        </text>
        <text x="132" y="182" textAnchor="middle" fill="#7dd3fc" fontSize="8">
          Liquidity Decision (Operating Cycle)
        </text>
      </g>

      {/* Right Column: Liabilities & Equity / Financing Decision */}
      <g>
        <rect x="260" y="32" width="215" height="175" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
        <rect x="260" y="32" width="215" height="26" rx="8" fill="#4f46e5" />
        <text x="367" y="49" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          LIABILITIES & EQUITY (Financing)
        </text>

        {/* Equity Share Capital Block */}
        <rect
          x="270"
          y="66"
          width="195"
          height={Math.max(28, (equityRatio / 100) * 125)}
          rx="6"
          fill="#4338ca"
          stroke="#818cf8"
          strokeWidth="1"
        />
        <text x="367" y="86" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          🏛️ Equity Capital: {equityRatio}%
        </text>
        <text x="367" y="99" textAnchor="middle" fill="#c7d2fe" fontSize="8">
          Permanent Risk Capital (Sec 43)
        </text>

        {/* Debt Capital Block with Tax Shield */}
        <rect
          x="270"
          y={66 + Math.max(28, (equityRatio / 100) * 125) + 4}
          width="195"
          height={Math.max(28, (debtRatio / 100) * 125)}
          rx="6"
          fill="#e11d48"
          stroke="#fb7185"
          strokeWidth="1"
        />
        <text
          x="367"
          y={66 + Math.max(28, (equityRatio / 100) * 125) + 20}
          textAnchor="middle"
          fill="#ffffff"
          fontSize="10"
          fontWeight="bold"
        >
          💳 Debt Capital: {debtRatio}%
        </text>
        <text
          x="367"
          y={66 + Math.max(28, (equityRatio / 100) * 125) + 33}
          textAnchor="middle"
          fill="#ffe4e6"
          fontSize="8"
        >
          🛡️ Sec 36(1)(iii) Tax Shield: ₹{taxShield} Cr/yr
        </text>
      </g>
    </svg>
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
  scenarioSnippet?: string;
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

// ─── COMPREHENSIVE CHALLENGES (24 items covering all 10 nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Directing & Supervision (c12_comm_021) - Foundation
  {
    id: 'ch_dir_001',
    nodeId: NODE_C12_COMM_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which of the following correctly lists the four core elements of the Directing function in management?',
    options: [
      'Planning, Organising, Staffing, Controlling',
      'Supervision, Motivation, Leadership, Communication',
      'Recruitment, Selection, Training, Appraisal',
      'Authority, Responsibility, Accountability, Delegation',
    ],
    correctIndex: 1,
    explanation:
      'Directing comprises four sub-elements: Supervision (oversight), Motivation (inspiring effort), Leadership (guiding behaviour), and Communication (information exchange).',
    hints: [
      'Think of what sets human resources into action on a daily operational basis.',
      'One element oversees, one inspires, one leads by example, and one transmits messages.',
      'The four elements are Supervision, Motivation, Leadership, and Communication.',
    ],
    misconceptionIndex: 0,
  },

  // 2. Directing & Factories Act (c12_comm_021) - Standard (Application)
  {
    id: 'ch_dir_002',
    nodeId: NODE_C12_COMM_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioSnippet:
      'At BMM’s Pune plant, Shift Supervisor Priya monitors 35 assembly technicians producing 180 chassis/shift. She also ensures safety goggles are worn and logs grievances upward to HR.',
    question:
      'Which supervisory function is Priya performing when she reports worker safety equipment wear and machine complaints to the Plant Manager under Sections 61-72 of the Factories Act 1948?',
    options: [
      'Issuing instructions and assigning stations',
      'Acting as a vital linking pin between operative workers and middle management',
      'Executing capital budgeting investment decisions',
      'Determining dividend payout ratios',
    ],
    correctIndex: 1,
    explanation:
      'The supervisor acts as the critical link between workers and upper management. Suppressing this linking function (as observed in industrial disputes) leads to severe unrest.',
    hints: [
      'Supervisors stand at the operational boundary between floor technicians and executive management.',
      'Transmitting grievances up and management policies down is the two-way linking function.',
      'It is the linking pin function connecting operative staff to departmental heads.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Maslow Motivation (c12_comm_022) - Foundation
  {
    id: 'ch_mot_001',
    nodeId: NODE_C12_COMM_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'In Maslow’s Hierarchy of Needs, what is the exact ascending order from lowest (most basic) to highest order of human needs?',
    options: [
      'Safety → Physiological → Social → Esteem → Self-Actualisation',
      'Physiological → Safety → Social (Belonging) → Esteem → Self-Actualisation',
      'Physiological → Esteem → Social → Safety → Self-Actualisation',
      'Self-Actualisation → Esteem → Social → Safety → Physiological',
    ],
    correctIndex: 1,
    explanation:
      'Human needs ascend strictly: 1. Physiological (food/wages) → 2. Safety (job security/ESI/EPF) → 3. Social (belonging/teamwork) → 4. Esteem (recognition/awards) → 5. Self-Actualisation (realising full potential).',
    hints: [
      'A hungry worker must first afford food before worrying about physical job safety or social belonging.',
      'Self-actualisation is always the pinnacle apex of Maslow’s pyramid.',
      'Order: Physiological, Safety, Social, Esteem, and Self-Actualisation.',
    ],
    misconceptionIndex: 2,
  },

  // 4. Leadership Styles (c12_comm_022) - Standard (Analysis)
  {
    id: 'ch_lead_002',
    nodeId: NODE_C12_COMM_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    scenarioSnippet:
      'Scenario A: Plant fire alarm rings; Supervisor Rajesh immediately commands evacuation routes without voting. Scenario B: ISRO senior scientists design cryogenic trajectory models autonomously.',
    question:
      'Which leadership styles are appropriately deployed in Scenario A and Scenario B respectively?',
    options: [
      'Democratic in Scenario A; Autocratic in Scenario B',
      'Autocratic (centralised command) in Scenario A; Laissez-faire (delegated autonomy) in Scenario B',
      'Laissez-faire in Scenario A; Transformational in Scenario B',
      'Transformational in Scenario A; Autocratic in Scenario B',
    ],
    correctIndex: 1,
    explanation:
      'Crisis situations require swift autocratic command to preserve life. Self-motivated, highly specialised experts (like ISRO scientists or Google research teams) excel under laissez-faire leadership.',
    hints: [
      'In an emergency, taking a democratic vote wastes critical seconds.',
      'Elite R&D researchers need freedom to experiment rather than micromanagement.',
      'Emergency = Autocratic; Expert research = Laissez-faire.',
    ],
    misconceptionIndex: 3,
  },

  // 5. Controlling Steps (c12_comm_023) - Drag-Sort (Competency: Understanding)
  {
    id: 'ch_ctrl_sort_001',
    nodeId: NODE_C12_COMM_023,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Arrange the four sequential steps of the Managerial Controlling process in the correct operational order.',
    sortItems: [
      'Establish performance standards and tolerance limits',
      'Measure actual operating performance through physical/cost reports',
      'Compare actual performance with standards to calculate deviations',
      'Initiate corrective action and feed back insights into future planning',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Controlling follows 4 rigorous steps: 1. Setting standards → 2. Measuring actuals → 3. Comparing & identifying deviations → 4. Corrective action & feedback.',
    hints: [
      'You cannot measure before you set a benchmark or yardstick.',
      'Comparison comes after data collection; corrective action concludes the loop.',
      'Order: 1. Standards → 2. Measure → 3. Compare → 4. Corrective Action.',
    ],
  },

  // 6. Management by Exception & Span of Control (c12_comm_023) - Advanced (Evaluation)
  {
    id: 'ch_ctrl_002',
    nodeId: NODE_C12_COMM_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    scenarioSnippet:
      'Infosys project managers handle deviations up to ±10% budget internally. Only project overruns exceeding 10% escalate to the CEO. Meanwhile, Maruti keeps assembly line spans at 8 workers per supervisor, whereas TCS allows 30 engineers per delivery lead.',
    question:
      'What principles govern the Infosys budget threshold and the Maruti vs TCS supervisor ratios respectively?',
    options: [
      'Span of control for budget thresholds; Management by Exception for supervisor ratios',
      'Management by Exception (filtering by deviation significance) and Span of Control (subordinates supervised based on task complexity)',
      'Scalar Chain and Unity of Command',
      'Subordination of individual interest and Order',
    ],
    correctIndex: 1,
    explanation:
      'Management by Exception reserves senior leadership time for critical variances beyond tolerance. Span of control specifies the manageable number of subordinates based on task risk and worker autonomy.',
    hints: [
      'Filtering variances by a percentage tolerance limit is a specific control doctrine.',
      'The number of people reporting to one supervisor is the span.',
      'Threshold filtering = Management by Exception; Headcount oversight = Span of Control.',
    ],
  },

  // 7. Coordination as Essence (c12_comm_024) - Standard (Understanding)
  {
    id: 'ch_coord_001',
    nodeId: NODE_C12_COMM_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why is Coordination designated as the "Essence of Management" rather than an isolated sixth function?',
    options: [
      'Because it is only executed by the Board of Directors under Companies Act Section 149',
      'Because it is the integrating thread that permeates and harmonises all five functions (Planning, Organising, Staffing, Directing, Controlling)',
      'Because it replaces the need for financial controlling and supervision',
      'Because it is an optional activity for cooperative societies like Amul',
    ],
    correctIndex: 1,
    explanation:
      'Coordination is not a standalone bead on the necklace; it is the binding thread running through Planning, Organising, Staffing, Directing, and Controlling.',
    hints: [
      'Think of the necklace metaphor where functions are beads.',
      'Without coordination, even the best plans and staffing structures operate in departmental conflict.',
      'It permeates all managerial functions to align efforts toward collective enterprise goals.',
    ],
    misconceptionIndex: 4,
  },

  // 8. Coordination Failure Case Study (c12_comm_024) - Advanced (Analysis)
  {
    id: 'ch_coord_002',
    nodeId: NODE_C12_COMM_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    scenarioSnippet:
      'In 2012, Kingfisher Airlines collapsed with ₹9,000+ crore debt. Marketing launched premium long-haul flights, while Finance lacked cash flow for jet fuel and Operations faced aircraft repossession due to unpaid lease rents.',
    question:
      'Why did Kingfisher Airlines collapse despite having award-winning marketing and experienced pilots?',
    options: [
      'Lack of individual pilot technical competence',
      'Coordination failure — departments pursued aggressive isolated goals exceeding corporate financial and operational capacity',
      'Excessive equity share issuance diluting promoter voting control',
      'Failure to comply with the Factories Act 1948 shift hours',
    ],
    correctIndex: 1,
    explanation:
      'Kingfisher had competent individual units, but departmental silos operated without unified financial synchronisation, leading to catastrophic system failure.',
    hints: [
      'Individual excellence cannot compensate for misaligned cross-functional execution.',
      'Marketing expanded faster than Finance could fund and Operations could maintain.',
      'It is a classic case of coordination failure across marketing, finance, and fleet operations.',
    ],
  },

  // 9. IFDL Financial Decisions (c12_comm_025) - Drag-Label (Competency: Understanding)
  {
    id: 'ch_ifdl_drag_001',
    nodeId: NODE_C12_COMM_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Match each corporate action of Tata Motors & Reliance to its correct IFDL Financial Management Decision category.',
    dragItems: [
      { label: 'Investment (Capital Budgeting)', targetId: 'slot_inv' },
      { label: 'Financing Decision', targetId: 'slot_fin' },
      { label: 'Dividend Decision', targetId: 'slot_div' },
      { label: 'Liquidity Decision', targetId: 'slot_liq' },
    ],
    correctMapping: {
      slot_inv: 'Investment (Capital Budgeting)',
      slot_fin: 'Financing Decision',
      slot_div: 'Dividend Decision',
      slot_liq: 'Liquidity Decision',
    },
    explanation:
      'Investment = Asset deployment (₹7,500 Cr EV plant); Financing = Source of capital (Rights issue / Debt); Dividend = Profit distribution vs retention (Sec 123); Liquidity = Day-to-day cash buffer.',
    hints: [
      'Deploying money in machinery is on the Assets side (Investment).',
      'Raising money via shares or debt is on the Liabilities side (Financing).',
      'Distributing profits is Dividend; maintaining cash for daily bills is Liquidity.',
    ],
  },

  // 10. IFDL Balance Sheet Mental Model (c12_comm_025) - Standard (Application)
  {
    id: 'ch_ifdl_002',
    nodeId: NODE_C12_COMM_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioSnippet:
      'Reliance Industries raised ₹53,125 crore through a mega rights issue of shares in 2020 and used part of the proceeds to expand Jio digital telecom infrastructure.',
    question:
      'How are the rights share issue and the telecom infrastructure expansion classified under the balance-sheet mental model?',
    options: [
      'Rights issue = Investment (Assets); Telecom expansion = Financing (Liabilities)',
      'Rights issue = Financing Decision (Liabilities/Sources); Telecom expansion = Investment Decision (Assets/Deployment)',
      'Both actions are Dividend decisions governed by Section 123 of Companies Act 2013',
      'Both actions represent Liquidity decisions for daily raw material cash',
    ],
    correctIndex: 1,
    explanation:
      'Raising equity funds belongs on the Liabilities side (Financing Decision). Deploying capital into physical towers, fibre, and software belongs on the Assets side (Investment Decision).',
    hints: [
      'Remember: Sources of funds = Liabilities = Financing.',
      'Deployment of funds = Assets = Investment.',
      'Rights issue is Financing; building infrastructure is Investment.',
    ],
    misconceptionIndex: 0,
  },

  // 11. Financial Planning & Tax Shield (c12_comm_026) - Numeric (Competency: Application)
  {
    id: 'ch_tax_num_001',
    nodeId: NODE_C12_COMM_026,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioSnippet:
      'BMM Ltd. pays ₹100 crore annual interest on term debt. The corporate tax rate is 25%. Under Section 36(1)(iii) of the Income Tax Act 1961, interest is tax-deductible.',
    question:
      'Calculate the annual tax savings (Tax Shield in ₹ Crore) enjoyed by BMM Ltd. due to this interest deduction.',
    correctAnswer: 25,
    tolerance: 0.5,
    unit: '₹ Crore',
    explanation:
      'Tax Shield = Interest Payment × Tax Rate = ₹100 Cr × 25% = ₹25 Crore. This reduces the effective after-tax cost of debt from ₹100 Cr to ₹75 Cr.',
    hints: [
      'Multiply the gross interest expense by the corporate tax percentage rate.',
      '100 crore × 0.25 gives the direct tax deduction benefit.',
      'The tax shield amount is exactly ₹25 Crore.',
    ],
  },

  // 12. Factors Affecting Capital Structure (c12_comm_026) - Advanced (Analysis)
  {
    id: 'ch_cap_002',
    nodeId: NODE_C12_COMM_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    scenarioSnippet:
      'As of 2023, Infosys maintained a conservative Debt-Equity ratio of 0.1:1, while Bharti Airtel operated at approximately 2:1.',
    question:
      'Which core factors from the five-factor capital structure framework primarily explain this stark divergence?',
    options: [
      'Infosys had higher inventory spoilage risk than Bharti Airtel',
      'Nature of Business (low capex IT software vs massive capex telecom spectrum auctions) and Cash Flow Stability',
      'Bharti Airtel was prohibited from issuing equity shares by SEBI',
      'Infosys was forced by the Factories Act 1948 to eliminate all debt',
    ],
    correctIndex: 1,
    explanation:
      'Telecom requires upfront statutory spectrum payments and nationwide physical towers (high capital intensity), requiring debt leverage. IT services rely on human capital and software, requiring little debt.',
    hints: [
      'Look at the assets required: software coding laptops vs multibillion-rupee 5G spectrum licenses.',
      'IT generates massive predictable cash reserves; telecom is asset-heavy.',
      'Divergence is driven by Nature of Business and Cash Flow dynamics.',
    ],
  },

  // 13. Fixed Capital Concept (c12_comm_027) - Foundation
  {
    id: 'ch_fc_001',
    nodeId: NODE_C12_COMM_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under Schedule III of the Companies Act 2013, how is Fixed Capital classified and reported on the corporate Balance Sheet?',
    options: [
      'Under Current Assets as Trade Receivables',
      'Under Non-Current Assets as Property, Plant and Equipment (PPE) & Intangible Assets',
      'Under Current Liabilities as Bank Overdraft',
      'Under Contingent Liabilities in Footnotes',
    ],
    correctIndex: 1,
    explanation:
      'Fixed capital represents funds committed to long-term productive infrastructure (>1 year), presented as Property, Plant & Equipment (PPE) and Intangibles under Non-Current Assets.',
    hints: [
      'Fixed assets are durable tools of production used across multiple financial years.',
      'Schedule III places plant, machinery, buildings, and patents under Non-Current Assets.',
      'The classification is Non-Current Assets (Property, Plant and Equipment).',
    ],
  },

  // 14. Fixed Capital vs Fixed Costs (c12_comm_027) - Standard (Distinguish)
  {
    id: 'ch_fc_002',
    nodeId: NODE_C12_COMM_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    scenarioSnippet:
      'Firm Alpha owns a ₹100 crore factory building outright with no rent. Firm Beta rents a workshop for ₹5 lakh/month with ₹2 lakh of hand tools.',
    question:
      'How do Firm Alpha and Firm Beta compare in terms of Fixed Capital and Fixed Costs?',
    options: [
      'Both firms have identical fixed capital and identical fixed costs',
      'Firm Alpha has High Fixed Capital (Balance Sheet Asset) but Low Fixed Costs (No Rent); Firm Beta has Low Fixed Capital but High Fixed Costs (Recurring Rent in P&L)',
      'Firm Alpha has High Fixed Costs on the Balance Sheet; Firm Beta has High Fixed Capital on the P&L',
      'Firm Beta has higher fixed capital because rent accumulates forever',
    ],
    correctIndex: 1,
    explanation:
      'Fixed Capital is a Balance Sheet STOCK of long-term assets. Fixed Costs are recurring FLOW expenses on the Profit & Loss statement that do not vary with production output.',
    hints: [
      'Capital = Assets on the Balance Sheet. Costs = Expenses on the P&L.',
      'Alpha owns an expensive physical building; Beta incurs a monthly recurring lease bill.',
      'Alpha = High Fixed Capital / Low Fixed Cost; Beta = Low Fixed Capital / High Fixed Cost.',
    ],
    misconceptionIndex: 5,
  },

  // 15. Working Capital Calculation (c12_comm_028) - Numeric (Competency: Application)
  {
    id: 'ch_wc_num_001',
    nodeId: NODE_C12_COMM_028,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioSnippet:
      'BMM Ltd. records: Raw Material Stock = ₹40 Cr, Debtors = ₹30 Cr, Cash & Bank = ₹10 Cr, Trade Creditors = ₹35 Cr, Outstanding Wages = ₹5 Cr.',
    question:
      'Calculate the Net Working Capital (Current Assets − Current Liabilities) in ₹ Crore.',
    correctAnswer: 40,
    tolerance: 0,
    unit: '₹ Crore',
    explanation:
      'Current Assets = ₹40 + ₹30 + ₹10 = ₹80 Cr. Current Liabilities = ₹35 + ₹5 = ₹40 Cr. Net Working Capital = ₹80 Cr − ₹40 Cr = ₹40 Crore.',
    hints: [
      'Add all Current Assets: Inventory + Debtors + Cash.',
      'Add all Current Liabilities: Creditors + Outstanding Expenses.',
      'Subtract Total Liabilities (40 Cr) from Total Assets (80 Cr) = 40 Cr.',
    ],
    misconceptionIndex: 6,
  },

  // 16. Negative Working Capital Strategy (c12_comm_028) - Advanced (Evaluation)
  {
    id: 'ch_wc_002',
    nodeId: NODE_C12_COMM_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    scenarioSnippet:
      'Indian Railways collects ticket fares weeks in advance before running trains. Maruti Suzuki receives dealer cash upfront while settling component suppliers on 60-day credit.',
    question:
      'Why is negative net working capital a sign of strategic strength rather than bankruptcy for Indian Railways and Maruti Suzuki?',
    options: [
      'Because they are exempt from Companies Act Schedule III accounting rules',
      'Because their operations are funded at zero interest by customers and suppliers (negative cash conversion cycle)',
      'Because they convert all current liabilities into equity shares under Section 43',
      'Because the RBI provides automatic unsecured grants for negative working capital',
    ],
    correctIndex: 1,
    explanation:
      'Structural negative working capital means counterparties finance the business at 0% cost. Involuntary negative working capital is distress, but deliberate negative cash conversion cycle is power.',
    hints: [
      'Customers pay before the service is delivered, providing free upfront liquidity.',
      'Suppliers wait 60 days for payment while cash from sales is already banked.',
      'It represents a powerful negative cash conversion cycle funded by counterparties.',
    ],
    misconceptionIndex: 7,
  },

  // 17. Equity Shares Features (c12_comm_029) - Foundation
  {
    id: 'ch_eq_001',
    nodeId: NODE_C12_COMM_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under Sections 2(84), 43, and 47 of the Companies Act 2013, what defines Equity Share Capital?',
    options: [
      'Secured debt carrying mandatory 10% annual interest with mortgage rights',
      'Permanent risk capital carrying proportionate voting rights and a residual claim on profits/assets',
      'Short-term money market instrument redeemable within 90 days',
      'Government bonds with sovereign guarantees against market loss',
    ],
    correctIndex: 1,
    explanation:
      'Equity shares represent permanent ownership capital with full voting rights (Section 47) and a residual claim (paid after all creditors and preference shareholders).',
    hints: [
      'Equity holders are the ultimate owners who bear residual business risk.',
      'They vote at AGMs and receive variable dividends when profits allow.',
      'It is permanent risk capital with voting rights and residual claims.',
    ],
  },

  // 18. Equity Dividend Calculation (c12_comm_029) - Numeric (Competency: Application)
  {
    id: 'ch_eq_num_001',
    nodeId: NODE_C12_COMM_029,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioSnippet:
      'An investor holds 500 equity shares of Reliance Industries with Face Value ₹10 per share. The shares trade on NSE at ₹2,800. The Board declares a 70% dividend.',
    question:
      'Calculate the total dividend payout (in ₹) received by the investor.',
    correctAnswer: 3500,
    tolerance: 0,
    unit: '₹',
    explanation:
      'Dividend is ALWAYS calculated on FACE VALUE, not market price! Dividend/share = 70% of ₹10 = ₹7. Total Payout = 500 shares × ₹7 = ₹3,500.',
    hints: [
      'Do NOT calculate 70% of the ₹2,800 market price! That is the classic student trap.',
      'Dividend per share = 70% of Face Value (₹10) = ₹7.',
      '500 shares × ₹7 = ₹3,500.',
    ],
    misconceptionIndex: 8,
  },

  // 19. Equity vs Debt for Unprofitable Startups (c12_comm_029) - Advanced (Analysis)
  {
    id: 'ch_eq_003',
    nodeId: NODE_C12_COMM_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    scenarioSnippet:
      'During their IPOs in 2021, tech companies like Zomato and Nykaa were loss-making but raised thousands of crores via fresh equity shares rather than bank term loans.',
    question:
      'Why is equity financing vital for loss-making growth companies compared to debentures or term debt?',
    options: [
      'Equity carries a tax shield under Section 36(1)(iii) that reimburses all losses',
      'Equity carries no compulsory fixed dividend obligation or insolvency trigger during gestation losses',
      'Debentures automatically grant voting control to debenture trustees',
      'SEBI mandates that loss-making companies are banned from bank deposits',
    ],
    correctIndex: 1,
    explanation:
      'Debt imposes mandatory contractual interest payments regardless of profits; non-payment triggers default and bankruptcy. Equity allows the company to reinvest and skip dividends without defaulting.',
    hints: [
      'What happens if a company cannot pay interest on debentures? It faces insolvency.',
      'Equity gives breathing room because dividends are discretionary, not mandatory.',
      'Equity has no fixed charge on earnings, protecting cash during loss-making growth.',
    ],
  },

  // 20. Preference Shares Meaning & Rights (c12_comm_030) - Foundation
  {
    id: 'ch_pref_001',
    nodeId: NODE_C12_COMM_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What two statutory preferential rights distinguish Preference Shares from Equity Shares under Section 43(2) of Companies Act 2013?',
    options: [
      'Permanent ownership and double voting power at AGMs',
      'Priority in fixed dividend payment before equity AND priority in capital repayment on winding up',
      'Tax-deductible dividend and right to inspect confidential R&D files',
      'Exemption from SEBI ICDR regulations and right to veto the Board',
    ],
    correctIndex: 1,
    explanation:
      'Preference shares carry 2 preferential rights: 1. Fixed dividend paid before equity dividends; 2. Capital repayment priority over equity if the company liquidates.',
    hints: [
      'The word "preference" refers to who gets paid first in the profit and liquidation queue.',
      'Preference holders stand ahead of ordinary equity holders for dividends and capital return.',
      'Priority in fixed dividends AND priority in capital repayment on liquidation.',
    ],
  },

  // 21. Cumulative vs Non-Cumulative Calculation (c12_comm_030) - Numeric (Competency: Application)
  {
    id: 'ch_pref_num_001',
    nodeId: NODE_C12_COMM_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioSnippet:
      'BMM Ltd. issued 20,000 Cumulative Preference Shares of ₹100 face value with a 10% dividend. Due to a plant upgrade loss, no dividend was paid in Year 1. In Year 2, the company earned strong profits.',
    question:
      'How much total preference dividend (in ₹) must BMM Ltd. pay in Year 2 before any dividend can be distributed to equity shareholders?',
    correctAnswer: 400000,
    tolerance: 0,
    unit: '₹',
    explanation:
      'Annual Dividend = 20,000 × ₹100 × 10% = ₹2,00,000. Because shares are CUMULATIVE, Year 1 arrears (₹2,00,000) accumulate and must be paid alongside Year 2 dividend (₹2,00,000) = ₹4,00,000 total.',
    hints: [
      'Calculate one year of preference dividend: 20,000 × ₹100 × 10%.',
      'Since they are cumulative, skipped dividends do NOT disappear — they accumulate as arrears.',
      'Year 1 arrears (₹2,00,000) + Year 2 dividend (₹2,00,000) = ₹4,00,000.',
    ],
    misconceptionIndex: 9,
  },

  // 22. Distinction: Equity vs Preference (c12_comm_030) - Drag-Label (Competency: Analysis)
  {
    id: 'ch_pref_drag_002',
    nodeId: NODE_C12_COMM_030,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Map each corporate characteristic to either Equity Shares or Preference Shares.',
    dragItems: [
      { label: 'Full Voting Rights (Section 47)', targetId: 'slot_eq_vote' },
      { label: 'Fixed Dividend Rate & No Ordinary Vote (Sec 50)', targetId: 'slot_pref_rate' },
      { label: 'Permanent Capital (Non-Redeemable)', targetId: 'slot_eq_perm' },
      { label: 'Max 20-Yr Redemption Rule (Section 55)', targetId: 'slot_pref_red' },
    ],
    correctMapping: {
      slot_eq_vote: 'Full Voting Rights (Section 47)',
      slot_pref_rate: 'Fixed Dividend Rate & No Ordinary Vote (Sec 50)',
      slot_eq_perm: 'Permanent Capital (Non-Redeemable)',
      slot_pref_red: 'Max 20-Yr Redemption Rule (Section 55)',
    },
    explanation:
      'Equity = Full voting, permanent, variable return. Preference = Fixed dividend, restricted voting (matters affecting rights only), mandatory redemption within 20 years under Sec 55.',
    hints: [
      'Equity holders vote on all regular resolutions and have permanent capital.',
      'Section 55 mandates that preference shares must be redeemed within 20 years in India.',
      'Match voting and permanence to Equity; fixed rate and 20-yr redemption to Preference.',
    ],
  },

  // 23. Public Sector Bank Recapitalisation (c12_comm_030) - Advanced (Evaluation)
  {
    id: 'ch_pref_003',
    nodeId: NODE_C12_COMM_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    scenarioSnippet:
      'Between 2015 and 2020 under the Indradhanush scheme, the Government of India infused over ₹3 lakh crore into public sector banks (SBI, PNB, BoB) predominantly using Preference Shares.',
    question:
      'What was the primary strategic rationale for using Preference Shares rather than ordinary voting Equity Shares for this massive bank recapitalisation?',
    options: [
      'Preference shares are exempt from RBI Basel III capital adequacy calculations',
      'Infused required tier regulatory capital without complicating or diluting ordinary voting equity structures',
      'Preference share dividends are 100% tax-deductible like debenture interest',
      'To enable foreign investors to take over public sector bank board seats',
    ],
    correctIndex: 1,
    explanation:
      'Preference shares provided qualifying regulatory capital to meet RBI Basel III norms while maintaining the existing voting control balance under Section 50 of Companies Act 2013.',
    hints: [
      'Think about voting power: Preference shares have restricted voting rights on ordinary business.',
      'Banks needed capital for Basel III compliance without altering shareholder voting equations.',
      'It provided regulatory capital without diluting or disrupting ordinary voting equity structures.',
    ],
  },

  // 24. Construct: Closed-Loop Management Cycle - Construct (Competency: Creativity)
  {
    id: 'ch_construct_001',
    nodeId: NODE_C12_COMM_023,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Construct the 5-function integrated Management Spiral by adding functions in the exact operational sequence that closes the planning-controlling feedback loop.',
    validationHint:
      'Assemble all 5 classical management functions in their standard logical order.',
    availableParts: ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'],
    targetState: 'Planning Organising Staffing Directing Controlling',
    explanation:
      'Planning sets goals → Organising builds structures → Staffing assigns people → Directing initiates action → Controlling measures deviations and feeds insights back into Planning.',
    hints: [
      'Start with the function that decides what to do in advance.',
      'End with the function that measures actuals against standards and takes corrective action.',
      'Sequence: Planning → Organising → Staffing → Directing → Controlling.',
    ],
  },
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
  nodeId: NODE_C12_COMM_021,
  title: 'Directing, Financial Decisions & Capital Structure',
  definition:
    'Directing initiates action through supervision, motivation, leadership, and communication. Financial management coordinates Investment, Financing, Dividend, and Liquidity (IFDL) decisions to optimise fixed and working capital structures.',
  eli5:
    'Directing is the backstage director telling actors when and how to perform; financial management is ensuring the theatre has enough funds to buy equipment (fixed capital) and pay daily bills (working capital) without going broke.',
  misconceptions: [
    {
      misconception: 'Supervision and Directing are identical synonyms.',
      correction:
        'Supervision is merely one of four elements of Directing (alongside Motivation, Leadership, and Communication).',
    },
    {
      misconception: 'The supervisor’s sole duty is giving verbal orders.',
      correction:
        'Under the Factories Act 1948, supervisors also enforce safety, ensure quality, and act as a critical linking pin reporting grievances upward.',
    },
    {
      misconception: 'Self-Actualisation is at the base of Maslow’s pyramid.',
      correction:
        'Self-actualisation is the highest apex; Physiological survival needs form the indispensable foundation.',
    },
    {
      misconception: 'Autocratic leadership is always evil and ineffective.',
      correction:
        'Autocratic leadership is necessary and lifesaving during factory emergencies and crises where instant command is required.',
    },
    {
      misconception: 'Coordination is a separate sixth function of management.',
      correction:
        'Coordination is the "Essence of Management" that binds and permeates all five functions rather than being an isolated step.',
    },
    {
      misconception: 'Fixed Capital and Fixed Costs mean the exact same thing.',
      correction:
        'Fixed Capital is a Balance Sheet asset (machinery/land); Fixed Costs are recurring Profit & Loss expenses (factory rent/salaries).',
    },
    {
      misconception: 'Working capital simply equals gross current assets.',
      correction:
        'Net Working Capital = Current Assets − Current Liabilities; committed current obligations must be deducted.',
    },
    {
      misconception: 'Negative working capital always signals immediate bankruptcy.',
      correction:
        'Companies like Indian Railways and Maruti run deliberate negative cash conversion cycles funded efficiently by customer advances.',
    },
    {
      misconception: 'Dividends are calculated on the market price of equity shares.',
      correction:
        'Dividend is legally calculated exclusively on the nominal FACE VALUE of the share, never on fluctuating stock market prices.',
    },
    {
      misconception: 'Preference shareholders hold full ordinary voting rights at AGMs.',
      correction:
        'Under Section 50 of Companies Act 2013, preference shareholders vote only on resolutions directly affecting their specific rights.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which element of Directing involves inspiring employees toward organisational goals?',
      options: ['Supervision', 'Motivation', 'Staffing', 'Organising'],
      correctIndex: 1,
    },
    {
      question: 'Under the Factories Act 1948, which managerial tier directly maintains floor safety records?',
      options: ['Managing Director', 'Shift Supervisor / Foreman', 'Statutory Auditor', 'Company Secretary'],
      correctIndex: 1,
    },
    {
      question: 'What is the top-most tier in Maslow’s need hierarchy?',
      options: ['Esteem', 'Safety', 'Self-Actualisation', 'Physiological'],
      correctIndex: 2,
    },
    {
      question: 'Which decision answers: "Where should the firm deploy its long-term funds?"',
      options: ['Financing Decision', 'Investment (Capital Budgeting) Decision', 'Dividend Decision', 'Liquidity Decision'],
      correctIndex: 1,
    },
    {
      question: 'Interest paid on debt is tax-deductible in India under which statute section?',
      options: ['Companies Act Sec 134', 'Income Tax Act Sec 36(1)(iii)', 'Factories Act Sec 61', 'SEBI LODR Reg 29'],
      correctIndex: 1,
    },
    {
      question: 'What is the formula for Net Working Capital?',
      options: ['Fixed Assets − Current Liabilities', 'Current Assets − Current Liabilities', 'Total Assets − Total Equity', 'Gross Revenue − Operating Expenses'],
      correctIndex: 1,
    },
    {
      question: 'What is the maximum statutory redemption period for preference shares under Section 55?',
      options: ['5 years', '10 years', '20 years', '50 years'],
      correctIndex: 2,
    },
    {
      question: 'Why did Kingfisher Airlines collapse in 2012?',
      options: ['Unfair tax rates', 'Coordination failure across departmental silos', 'Zero advertising', 'Over-supervision by foremen'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrate proficiency in directing, supervisory functions, Maslow motivation, leadership styles, controlling deviation loops, coordination essence, IFDL balance sheet mapping, fixed vs working capital calculations, and equity vs preference share structuring under the Companies Act 2013.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Directing & Supervisory Action Lab',
    instruction:
      'Adjust the Shift Supervision Intensity & Grievance Reporting rate to observe line productivity and worker morale at BMM’s Pune plant.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_COMM_021,
  },
  {
    title: 'Maslow Motivation & Leadership Compass',
    instruction:
      'Select leadership styles and meet human need tiers to discover employee engagement impact in different operating scenarios.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_COMM_022,
  },
  {
    title: 'Controlling Loop & Management by Exception',
    instruction:
      'Set production standards and tolerance thresholds. Watch how variances trigger exception reporting and corrective action.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_COMM_023,
  },
  {
    title: 'Cross-Functional Coordination Matrix (Amul vs Kingfisher)',
    instruction:
      'Toggle departmental synchronisation to see how unified coordination creates market leadership while silos cause systemic bankruptcy.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_COMM_024,
  },
  {
    title: 'IFDL Decisions & Capital Structure Balancer',
    instruction:
      'Configure Debt-to-Equity, Dividend retention, and Working Capital days. Analyse the real-time effect on Tax Shield and Insolvency Risk.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_COMM_026,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If BMM Ltd. increases its debt proportion from 20% to 70% in a booming market with 25% corporate tax, what happens to the return on equity (ROE) and the tax shield?',
    options: [
      'ROE drops to zero and tax payments double',
      'ROE increases due to financial leverage (trading on equity) and tax shield increases',
      'No change in ROE because debt carries no interest',
      'The company is automatically dissolved by the Ministry of Corporate Affairs',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Move the Debt-Equity slider in the capital simulator above 65% and watch ROE and the Tax Shield gauge turn bright green!',
    nodeId: NODE_C12_COMM_026,
  },
  {
    question:
      'Predict: If a supervisor focuses 100% on shouting orders but suppresses 0% of worker safety grievances, what is the predicted outcome?',
    options: [
      'Output increases permanently by 500%',
      'Worker resentment accumulates, leading to catastrophic strikes and output collapse',
      'Workers immediately become self-actualised',
      'The Factories Act 1948 grants an exemption from safety rules',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Lower Grievance Reporting to 0% on the Directing Lab and watch the Strike Risk index spike into danger red!',
    nodeId: NODE_C12_COMM_021,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice happens to the after-tax cost of debt when interest is deducted under Section 36(1)(iii) of the Income Tax Act?',
    observableOptions: [
      'The effective cost of borrowing drops by the tax rate percentage (Tax Shield)',
      'The effective cost of debt doubles',
      'The principal debt amount is forgiven by the bank',
      'Equity shares lose their voting power',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_COMM_026,
  },
  {
    question:
      'What happens to Net Working Capital when trade payables (creditors) increase while inventory and cash remain constant?',
    observableOptions: [
      'Net Working Capital decreases because Current Liabilities have increased',
      'Net Working Capital increases because debt is an asset',
      'Fixed Capital automatically increases by the same amount',
      'No mathematical effect occurs',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_COMM_028,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Executive Boardroom Strategy Brief',
  description:
    'Select a real Indian corporate giant (such as Tata Motors, Reliance Industries, Asian Paints, or Infosys). Draft a 1-page executive financial and directing summary evaluating their capital structure, supervisory practices, and working capital strategy.',
  steps: [
    'Retrieve the latest annual balance sheet from BSE/NSE filings (Schedule III format).',
    'Calculate the Debt-Equity Ratio and Net Working Capital figure.',
    'Identify whether their working capital model is positive or negative cash conversion (like Maruti).',
    'Assess how their leadership style (e.g., N. Chandrasekaran democratic style) drives coordination.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C12_CommerceDirectingMeaningImportanceSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Escalating hints and explanation state
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Interactive UI feedback state
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);

  // Predict-then-check & Observation state
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Drag & drop interactive challenge state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Lab 1: Directing simulation parameters
  const [supervisionIntensity, setSupervisionIntensity] = useState<number>(65);
  const [grievanceRedressal, setGrievanceRedressal] = useState<number>(75);
  const [safetyGearCompliance, setSafetyGearCompliance] = useState<number>(85);

  // Lab 2: Motivation & Leadership parameters
  const [activeNeedTier, setActiveNeedTier] = useState<number>(2);
  const [selectedLeadershipStyle, setSelectedLeadershipStyle] = useState<'autocratic' | 'democratic' | 'laissez-faire' | 'transformational'>('democratic');

  // Lab 3: Controlling & Deviation loop parameters
  const [productionTarget, setProductionTarget] = useState<number>(1000);
  const [actualOutput, setActualOutput] = useState<number>(920);
  const [toleranceThreshold, setToleranceThreshold] = useState<number>(5);

  // Lab 4: Coordination parameters
  const [marketingSync, setMarketingSync] = useState<boolean>(true);
  const [operationsSync, setOperationsSync] = useState<boolean>(true);
  const [financeSync, setFinanceSync] = useState<boolean>(true);

  // Lab 5: Capital Structure & Working Capital parameters
  const [debtRatio, setDebtRatio] = useState<number>(40);
  const [corporateTaxRate, setCorporateTaxRate] = useState<number>(25);
  const [receivableDays, setReceivableDays] = useState<number>(45);
  const [inventoryDays, setInventoryDays] = useState<number>(60);
  const [payableDays, setPayableDays] = useState<number>(50);

  // Misconception tracking list
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Post-completion reflection answers state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── SUBJECT DISPLAY CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['commstud'] || {
    name: 'Commerce',
    emoji: '📈',
    color: 'indigo',
  };

  // ─── COMPUTED METRICS FOR LABS ───
  const directingProductivity = useMemo(() => {
    const raw = supervisionIntensity * 0.4 + grievanceRedressal * 0.35 + safetyGearCompliance * 0.25;
    return Math.min(100, Math.round(raw));
  }, [supervisionIntensity, grievanceRedressal, safetyGearCompliance]);

  const strikeRisk = useMemo(() => {
    const risk = 100 - (grievanceRedressal * 0.6 + safetyGearCompliance * 0.4);
    return Math.max(0, Math.min(100, Math.round(risk)));
  }, [grievanceRedressal, safetyGearCompliance]);

  const controlDeviationPct = useMemo(() => {
    if (productionTarget === 0) return 0;
    return Math.round(((actualOutput - productionTarget) / productionTarget) * 100);
  }, [productionTarget, actualOutput]);

  const isExceptionTriggered = useMemo(() => {
    return Math.abs(controlDeviationPct) > toleranceThreshold;
  }, [controlDeviationPct, toleranceThreshold]);

  const coordinationHealth = useMemo(() => {
    let score = 0;
    if (marketingSync) score += 33.3;
    if (operationsSync) score += 33.3;
    if (financeSync) score += 33.4;
    return Math.round(score);
  }, [marketingSync, operationsSync, financeSync]);

  const taxShieldValue = useMemo(() => {
    const totalDebt = debtRatio;
    const interestExpense = totalDebt * 0.1;
    return Number(((interestExpense * corporateTaxRate) / 100).toFixed(2));
  }, [debtRatio, corporateTaxRate]);

  const estimatedROE = useMemo(() => {
    const equityRatio = 100 - debtRatio;
    if (equityRatio <= 0) return 0;
    const ebit = 20;
    const interest = debtRatio * 0.1;
    const ebt = Math.max(0, ebit - interest);
    const eat = ebt * (1 - corporateTaxRate / 100);
    return Number(((eat / equityRatio) * 100).toFixed(1));
  }, [debtRatio, corporateTaxRate]);

  const cashConversionCycle = useMemo(() => {
    return receivableDays + inventoryDays - payableDays;
  }, [receivableDays, inventoryDays, payableDays]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the Executive Management and Corporate Finance Simulation.');
  }, [nodeId]);

  // ─── EFFECT 2: BKT ADAPTIVE UPDATES ───
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

  // ─── EFFECT 3: 2D HTML CANVAS CONTROLLING LOOP ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 55;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      const signalX = centerX + Math.cos(angle) * radius;
      const signalY = centerY + Math.sin(angle) * radius;

      ctx.beginPath();
      ctx.arc(signalX, signalY, 8, 0, Math.PI * 2);
      ctx.fillStyle = isExceptionTriggered ? '#ef4444' : '#10b981';
      ctx.shadowColor = isExceptionTriggered ? '#f87171' : '#34d399';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(isExceptionTriggered ? 'ALERT' : 'NORMAL', centerX, centerY);

      angle += 0.04;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isExceptionTriggered]);

  // ─── EFFECT 4: PREDICTION VERIFICATION WATCHER ───
  useEffect(() => {
    if (predictionMade && !predictionVerified) {
      if (debtRatio >= 65 || grievanceRedressal === 0) {
        setPredictionVerified(true);
        audioManager.play('sparkle');
        speechManager.speak('Prediction verified through your real-time manipulation!');
      }
    }
  }, [debtRatio, grievanceRedressal, predictionMade, predictionVerified]);

  // ─── EFFECT 5: CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── EVENT HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Coordination binds every function.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Explore each interactive management pillar step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode unlocked. Freely adjust variables with no grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency-based boardroom challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction registered! Now test it by adjusting the controls below.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the Management and Finance Simulation.');
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

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well analysed.');
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
          speechManager.speak('Review the step-by-step statutory explanation.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const source = prev.length > 0 ? prev : [0, 1, 2, 3];
      const arr = [...source];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(finalOrder);
  }, [sortArrangement, handleAnswer]);

  const handleSelectNeedTier = useCallback((tier: number) => {
    setActiveNeedTier(tier);
    audioManager.play('tap');
    const needNames = [
      'Physiological (Wages & Canteen thali)',
      'Safety (EPF/ESI & Safety PPE)',
      'Social (Family Day & Team Spirit)',
      'Esteem (Best Worker Award)',
      'Self-Actualisation (Innovista R&D Platform)',
    ];
    speechManager.speak(`Need Level ${tier + 1}: ${needNames[tier]}`);
  }, []);

  const capitalStructureChartData = useMemo(() => {
    return [
      { name: 'Equity Share Capital', amount: 100 - debtRatio, fill: '#6366f1' },
      { name: 'Debt Capital (Debentures/Loans)', amount: debtRatio, fill: '#f43f5e' },
    ];
  }, [debtRatio]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/30 border border-gold-500/50 flex items-center justify-center text-2xl shadow-inner"
            aria-label="Simulation Topic Icon"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                ISC Class 12 • Commerce
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : 'bg-gold-500/20 text-gold-300 border-gold-500/30'
                }`}
              >
                <span>✓</span> {difficulty.toUpperCase()} TIER
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">
              {title}
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav aria-label="Main Simulation Navigation" className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((tab) => (
            <motion.button
              key={tab}
              aria-label={`Switch to ${tab} mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(tab);
                audioManager.play('tap');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === tab
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </nav>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-950 rounded-2xl border border-gold-700/40 shadow-xl">
            <div className="flex items-center gap-2.5 text-gold-400 mb-2">
              <span className="text-lg">🏢</span>
              <h2 className="text-base font-bold tracking-wide uppercase">
                {SCENARIO.title}
              </h2>
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">
              {SCENARIO.intro}
            </p>
            <p className="text-xs text-slate-400 mt-2.5 border-t border-slate-800 pt-2.5">
              {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Diagnostic Question */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 block">
              Curiosity Hook • Predict the Problem
            </span>
            <p className="text-base md:text-lg font-semibold text-white mb-4">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-900/40 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-700/50 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-emerald-400 font-bold">✓ Correct</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-4 rounded-xl bg-gold-950/40 border border-gold-800/60 flex flex-wrap items-center justify-between gap-3"
              >
                <p
                  className={`text-sm flex items-center gap-1.5 ${
                    discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  <span>{discoveryCorrect ? '✓' : '⚠️'}</span>
                  {discoveryCorrect
                    ? 'Spot on! Uncoordinated departments pull in conflicting directions.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter Interactive Management Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-5"
        >
          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Exploration Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide
                      ? 'w-8 bg-gold-500'
                      : idx < currentSlide
                      ? 'w-3 bg-gold-800'
                      : 'w-3 bg-slate-800'
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
              className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-gold-400">🔬</span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-300 mt-1 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: DIRECTING & SUPERVISION LAB (WITH SVG 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Topic-specific SVG 1 */}
                  <SupervisoryLinkingPinSVG intensity={supervisionIntensity} redressal={grievanceRedressal} />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="lg:col-span-6 space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-supervision">
                          <span>Supervision Intensity (Floor Oversight):</span>
                          <span className="text-gold-400">{supervisionIntensity}%</span>
                        </label>
                        <input
                          id="slider-supervision"
                          aria-label="Supervision Intensity Slider"
                          type="range"
                          min={10}
                          max={100}
                          value={supervisionIntensity}
                          onChange={(e) => setSupervisionIntensity(Number(e.target.value))}
                          className="w-full accent-gold-500 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-grievance">
                          <span>Grievance Reporting Upward (Linking Pin):</span>
                          <span className="text-emerald-400">{grievanceRedressal}%</span>
                        </label>
                        <input
                          id="slider-grievance"
                          aria-label="Grievance Reporting Upward Slider"
                          type="range"
                          min={0}
                          max={100}
                          value={grievanceRedressal}
                          onChange={(e) => setGrievanceRedressal(Number(e.target.value))}
                          className="w-full accent-emerald-500 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-safety">
                          <span>Factories Act 1948 Safety Gear Compliance:</span>
                          <span className="text-gold-400">{safetyGearCompliance}%</span>
                        </label>
                        <input
                          id="slider-safety"
                          aria-label="Safety Gear Compliance Slider"
                          type="range"
                          min={10}
                          max={100}
                          value={safetyGearCompliance}
                          onChange={(e) => setSafetyGearCompliance(Number(e.target.value))}
                          className="w-full accent-gold-500 mt-1"
                        />
                      </div>
                    </div>

                    {/* Visual Gauges */}
                    <div className="lg:col-span-6 grid grid-cols-2 gap-3 items-center">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
                          <span>✓</span> Assembly Productivity
                        </p>
                        <p className="text-3xl font-black text-gold-400 mt-2">
                          {directingProductivity}%
                        </p>
                        <div className="w-full h-2.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-gold-500 to-emerald-400"
                            animate={{ width: `${directingProductivity}%` }}
                          />
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold flex items-center justify-center gap-1">
                          <span>{strikeRisk > 50 ? '✗' : '✓'}</span> Strike Risk
                        </p>
                        <p
                          className={`text-3xl font-black mt-2 ${
                            strikeRisk > 50 ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {strikeRisk}%
                        </p>
                        <div className="w-full h-2.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                          <motion.div
                            className={`h-full ${
                              strikeRisk > 50 ? 'bg-rose-500' : 'bg-emerald-500'
                            }`}
                            animate={{ width: `${strikeRisk}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: MASLOW MOTIVATION & LEADERSHIP COMPASS (WITH SVG 2) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Topic-specific SVG 2 */}
                  <MaslowPyramidSVG activeTier={activeNeedTier} onSelectTier={handleSelectNeedTier} />

                  <div className="space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {[
                        { tier: 0, name: '1. Physiological', icon: '🍲', ex: 'Tata ₹15 Canteen' },
                        { tier: 1, name: '2. Safety / Security', icon: '🛡️', ex: 'EPF & ESI Cover' },
                        { tier: 2, name: '3. Social (Belonging)', icon: '🤝', ex: 'Family Day Picnic' },
                        { tier: 3, name: '4. Esteem (Status)', icon: '🏆', ex: 'Best Worker Medal' },
                        { tier: 4, name: '5. Self-Actualisation', icon: '💡', ex: 'Innovista Platform' },
                      ].map((item) => (
                        <motion.button
                          key={item.tier}
                          aria-label={`Select Maslow Need: ${item.name}`}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleSelectNeedTier(item.tier)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            activeNeedTier === item.tier
                              ? 'bg-gold-600/30 border-gold-400 text-white shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-xl block mb-1">{item.icon}</span>
                          <p className="text-xs font-bold leading-tight">
                            {item.name} {activeNeedTier === item.tier ? '✓' : ''}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">{item.ex}</p>
                        </motion.button>
                      ))}
                    </div>

                    {/* Leadership Styles Selector */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-slate-300 uppercase mb-2">
                        Select Leadership Style:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          { id: 'autocratic', label: 'Autocratic', icon: '⚡', desc: 'Fast, centralized command' },
                          { id: 'democratic', label: 'Democratic', icon: '🗳️', desc: 'Participative (N. Chandrasekaran)' },
                          { id: 'laissez-faire', label: 'Laissez-Faire', icon: '🕊️', desc: 'Delegated expert autonomy' },
                          { id: 'transformational', label: 'Transformational', icon: '🌟', desc: 'Inspirational (Ratan Tata)' },
                        ].map((style) => (
                          <motion.button
                            key={style.id}
                            aria-label={`Select ${style.label} Leadership Style`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSelectedLeadershipStyle(style.id as any);
                              audioManager.play('tap');
                            }}
                            className={`p-2.5 rounded-lg border text-left text-xs ${
                              selectedLeadershipStyle === style.id
                                ? 'bg-gold-600 border-gold-400 text-white'
                                : 'bg-slate-950 border-slate-800 text-slate-400'
                            }`}
                          >
                            <span className="font-bold flex items-center gap-1.5">
                              <span>{style.icon}</span> {style.label} {selectedLeadershipStyle === style.id ? '✓' : ''}
                            </span>
                            <p className="text-[10px] text-slate-300 mt-1">{style.desc}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─��─ SLIDE 2: CONTROLLING & DEVIATION LOOP ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 bg-slate-950 rounded-2xl border border-slate-800 items-center">
                  <div className="lg:col-span-5 space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-target">
                        <span>Planned Target (Chassis/Shift):</span>
                        <span className="text-gold-400">{productionTarget}</span>
                      </label>
                      <input
                        id="slider-target"
                        aria-label="Planned Production Target Slider"
                        type="range"
                        min={500}
                        max={1500}
                        step={50}
                        value={productionTarget}
                        onChange={(e) => setProductionTarget(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-actual">
                        <span>Actual Floor Output:</span>
                        <span className="text-amber-400">{actualOutput}</span>
                      </label>
                      <input
                        id="slider-actual"
                        aria-label="Actual Floor Output Slider"
                        type="range"
                        min={400}
                        max={1600}
                        step={20}
                        value={actualOutput}
                        onChange={(e) => setActualOutput(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-tolerance">
                        <span>Management by Exception Tolerance:</span>
                        <span className="text-gold-400">±{toleranceThreshold}%</span>
                      </label>
                      <input
                        id="slider-tolerance"
                        aria-label="Management by Exception Tolerance Threshold Slider"
                        type="range"
                        min={1}
                        max={15}
                        value={toleranceThreshold}
                        onChange={(e) => setToleranceThreshold(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Canvas Feedback Loop & Deviation Card */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <canvas ref={canvasRef} width={280} height={140} className="rounded-lg mb-2" aria-label="Control deviation loop canvas visualization" />
                    <div className="w-full grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Variance:</span>
                        <p
                          className={`text-base font-black ${
                            controlDeviationPct < 0 ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          {controlDeviationPct > 0 ? '+' : ''}
                          {controlDeviationPct}%
                        </p>
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-slate-800">
                        <span className="text-slate-400">Exception Trigger:</span>
                        <p
                          className={`text-base font-black flex items-center justify-center gap-1 ${
                            isExceptionTriggered ? 'text-rose-400' : 'text-emerald-400'
                          }`}
                        >
                          <span>{isExceptionTriggered ? '✗ ALERT:' : '✓ NORMAL:'}</span>
                          {isExceptionTriggered ? 'ESCALATE' : 'DELEGATED'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: COORDINATION MATRIX ─── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.button
                      aria-label="Toggle Marketing Strategy Synchronisation"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setMarketingSync(!marketingSync);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        marketingSync
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500 text-rose-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Marketing Strategy</span>
                        <span>{marketingSync ? '✓ Synchronised' : '✗ Siloed'}</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Aligns promotional campaigns with actual factory line inventory.
                      </p>
                    </motion.button>

                    <motion.button
                      aria-label="Toggle Operations and Supply Synchronisation"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setOperationsSync(!operationsSync);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        operationsSync
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500 text-rose-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Operations / Supply</span>
                        <span>{operationsSync ? '✓ Synchronised' : '✗ Siloed'}</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Ensures raw materials arrive seamlessly just-in-time for shifts.
                      </p>
                    </motion.button>

                    <motion.button
                      aria-label="Toggle Finance and Cash Flow Synchronisation"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setFinanceSync(!financeSync);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        financeSync
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500 text-rose-200'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Finance & Cash Flow</span>
                        <span>{financeSync ? '✓ Synchronised' : '✗ Siloed'}</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Funds inventory without triggering liquidity crunches or lease defaults.
                      </p>
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase font-bold text-slate-400">
                        Systemic Coordination Outcome:
                      </p>
                      <p
                        className={`text-lg font-black flex items-center gap-1.5 ${
                          coordinationHealth === 100
                            ? 'text-emerald-400'
                            : coordinationHealth > 40
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        <span>{coordinationHealth === 100 ? '✓' : coordinationHealth > 40 ? '⚠️' : '✗'}</span>
                        {coordinationHealth === 100
                          ? 'Amul-Style Synchronised Leadership (Turnover ₹55,000+ Cr)'
                          : coordinationHealth > 40
                          ? 'Frictional Bottlenecks (Partial Waste & Delays)'
                          : 'Kingfisher-Style Coordination Bankruptcy'}
                      </p>
                    </div>
                    <span className="text-2xl font-black text-white">{coordinationHealth}%</span>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: IFDL & CAPITAL STRUCTURE (WITH SVG 3) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* Topic-specific SVG 3 */}
                  <CapitalStructureBalanceSheetSVG debtRatio={debtRatio} taxShield={taxShieldValue} />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-debt">
                          <span>Debt Ratio in Capital Structure:</span>
                          <span className="text-rose-400">{debtRatio}% Debt / {100 - debtRatio}% Equity</span>
                        </label>
                        <input
                          id="slider-debt"
                          aria-label="Debt Ratio in Capital Structure Slider"
                          type="range"
                          min={0}
                          max={85}
                          value={debtRatio}
                          onChange={(e) => setDebtRatio(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 flex justify-between" htmlFor="slider-tax">
                          <span>Corporate Tax Rate (Sec 36(1)(iii)):</span>
                          <span className="text-gold-400">{corporateTaxRate}%</span>
                        </label>
                        <input
                          id="slider-tax"
                          aria-label="Corporate Tax Rate Slider"
                          type="range"
                          min={15}
                          max={35}
                          value={corporateTaxRate}
                          onChange={(e) => setCorporateTaxRate(Number(e.target.value))}
                          className="w-full accent-gold-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-300 flex justify-between">
                          <span>Cash Conversion Cycle:</span>
                          <span className="text-amber-400">{cashConversionCycle} Days</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2 mt-1 text-[10px]">
                          <div>
                            <span>Rec: {receivableDays}d</span>
                            <input
                              aria-label="Receivable Days Slider"
                              type="range"
                              min={15}
                              max={90}
                              value={receivableDays}
                              onChange={(e) => setReceivableDays(Number(e.target.value))}
                              className="w-full accent-amber-500"
                            />
                          </div>
                          <div>
                            <span>Inv: {inventoryDays}d</span>
                            <input
                              aria-label="Inventory Days Slider"
                              type="range"
                              min={20}
                              max={120}
                              value={inventoryDays}
                              onChange={(e) => setInventoryDays(Number(e.target.value))}
                              className="w-full accent-amber-500"
                            />
                          </div>
                          <div>
                            <span>Pay: {payableDays}d</span>
                            <input
                              aria-label="Payable Days Slider"
                              type="range"
                              min={15}
                              max={90}
                              value={payableDays}
                              onChange={(e) => setPayableDays(Number(e.target.value))}
                              className="w-full accent-amber-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Metrics Dashboard */}
                    <div className="lg:col-span-7 grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <p className="text-[11px] text-slate-400 font-bold uppercase flex items-center justify-center gap-1">
                          <span>✓</span> Tax Shield Benefit
                        </p>
                        <p className="text-2xl font-black text-emerald-400 mt-1">₹{taxShieldValue} Cr</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Annual Tax Saved under Sec 36(1)(iii)
                        </p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <p className="text-[11px] text-slate-400 font-bold uppercase flex items-center justify-center gap-1">
                          <span>✓</span> Estimated ROE
                        </p>
                        <p className="text-2xl font-black text-gold-400 mt-1">{estimatedROE}%</p>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Trading on Equity (Financial Leverage)
                        </p>
                      </div>

                      <div className="col-span-2 h-36 bg-slate-900 rounded-xl border border-slate-800 p-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={capitalStructureChartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" />
                            <YAxis dataKey="name" type="category" stroke="#94a3b8" width={110} tick={{ fontSize: 10 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                              {capitalStructureChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-3">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-bold text-slate-400">
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
                className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold shadow-lg shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to Sandbox free play mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Proceed to Sandbox Free Play →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE SANDBOX / SIMULATOR PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-5"
        >
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎛️</span> Executive Sandbox Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Freely manipulate all management and corporate finance levers. No grading pressure.
              </p>
            </div>
            <motion.button
              aria-label="Start graded boardroom challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              Start Graded Boardroom Challenges →
            </motion.button>
          </div>

          {/* Predict-Then-Check In Sandbox */}
          {!predictionMade && (
            <div className="p-4 bg-gold-950/50 rounded-2xl border border-gold-800">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-1">
                Predict Before Manipulating:
              </span>
              <p className="text-sm font-semibold text-white mb-3">
                {PREDICTION_QUESTIONS[0].question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Select prediction: ${opt}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePrediction(i)}
                    className="p-2.5 bg-slate-900 text-left rounded-lg text-xs text-slate-200 border border-slate-800 hover:border-gold-500"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {predictionMade && !predictionVerified && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-amber-950/40 rounded-xl border border-amber-700 text-xs text-amber-300 flex items-center gap-2"
            >
              <span>👉</span> {PREDICTION_QUESTIONS[0].verifyInstruction}
            </motion.div>
          )}

          {predictionVerified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-600 text-xs text-emerald-300 font-bold flex items-center gap-2"
            >
              <span>✓</span> Prediction Verified! High debt leverage magnifies ROE and unlocks interest tax deductions.
            </motion.div>
          )}

          {/* Multi-Lever Control Deck */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase">Directing & Supervision</h4>
              <div>
                <label className="text-[11px] text-slate-300 flex justify-between" htmlFor="sb-supervision">
                  <span>Supervision:</span> <span>{supervisionIntensity}%</span>
                </label>
                <input
                  id="sb-supervision"
                  aria-label="Sandbox Supervision Slider"
                  type="range"
                  min={10}
                  max={100}
                  value={supervisionIntensity}
                  onChange={(e) => setSupervisionIntensity(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-300 flex justify-between" htmlFor="sb-grievance">
                  <span>Grievance Redressal:</span> <span>{grievanceRedressal}%</span>
                </label>
                <input
                  id="sb-grievance"
                  aria-label="Sandbox Grievance Slider"
                  type="range"
                  min={0}
                  max={100}
                  value={grievanceRedressal}
                  onChange={(e) => setGrievanceRedressal(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-rose-400 uppercase">Capital & Leverage</h4>
              <div>
                <label className="text-[11px] text-slate-300 flex justify-between" htmlFor="sb-debt">
                  <span>Debt/Equity Mix:</span> <span>{debtRatio}% Debt</span>
                </label>
                <input
                  id="sb-debt"
                  aria-label="Sandbox Debt Ratio Slider"
                  type="range"
                  min={0}
                  max={85}
                  value={debtRatio}
                  onChange={(e) => setDebtRatio(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
              <div className="p-2 bg-slate-900 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 block">Tax Shield Value:</span>
                <span className="text-lg font-black text-emerald-400">✓ ₹{taxShieldValue} Cr</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">Working Capital Cycle</h4>
              <div className="p-2 bg-slate-900 rounded-lg text-center">
                <span className="text-[10px] text-slate-400 block">Cash Conversion Cycle:</span>
                <span className="text-lg font-black text-amber-400">{cashConversionCycle} Days</span>
              </div>
              <div className="text-[10px] text-slate-400 leading-tight">
                Receivables ({receivableDays}d) + Inventory ({inventoryDays}d) − Payables ({payableDays}d).
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: BOARDROOM CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-5"
        >
          {/* Top Challenge Tracker */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                  {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                Node Focus: {challenge.nodeId}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                Score: <strong className="text-emerald-400">✓ {scoreBreakdown.correct}</strong> / {scoreBreakdown.total}
              </span>
              <motion.button
                aria-label={`Get Hint Level ${hintCount + 1}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={hintCount >= 3 || showExplanation}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-200 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
              >
                <span>💡 Hint ({hintCount}/3)</span>
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-400"
              animate={{
                width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
              }}
            />
          </div>

          {/* Challenge Box */}
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl space-y-4">
            {challenge.scenarioSnippet && (
              <div className="p-3 bg-slate-950/60 rounded-xl border-l-4 border-gold-500 text-xs md:text-sm text-slate-300">
                <strong>Real Indian Context:</strong> {challenge.scenarioSnippet}
              </div>
            )}

            <p className="text-base md:text-lg font-semibold text-white">
              {challenge.question}
            </p>

            {/* ─── TYPE A: MCQ (WITH PROPER SHAKE ANIMATION) ─── */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-2.5 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Answer choice ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border flex items-center justify-between ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-700/60 hover:border-slate-500'
                      }`}
                    >
                      <div>
                        <span className="font-bold mr-2 text-gold-400">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </div>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                      )}
                      {wrongFlash && (
                        <span className="text-rose-400 font-bold ml-2">✗ Incorrect</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ─── TYPE B: DRAG-LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">
                  Drag each item badge into its corresponding target slot:
                </p>

                {/* Draggable items palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable badge: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg bg-gold-600 text-white text-xs font-bold cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop target slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col justify-between min-h-[90px] ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase text-slate-400 flex items-center justify-between">
                        <span>Target: {item.targetId.replace('slot_', '').toUpperCase()}</span>
                        {droppedLabels[item.targetId] && <span className="text-emerald-400">✓ Placed</span>}
                      </span>
                      <p className="text-sm font-semibold mt-2">
                        {droppedLabels[item.targetId] || 'Drop matching label here'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Drag Label Mappings"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold shadow-lg"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* ─── TYPE C: DRAG-SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">
                  Drag and reorder the stages into the rigorous operational sequence:
                </p>

                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-900 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Sequence Order"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold shadow-lg"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* ─── TYPE D: NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label="Enter calculated numerical value"
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    disabled={showExplanation}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500 w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Numeric Calculation"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ──��� TYPE E: CONSTRUCT CHALLENGE ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                {/* Available blocks */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add function: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts((prev) => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Assembled pipeline */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-900 border border-gold-500 text-white text-xs font-bold rounded-lg flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        aria-label={`Remove function ${part}`}
                        onClick={() =>
                          setConstructParts((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">
                      Click the blocks above to assemble the management loop...
                    </span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify Constructed Management Loop"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Verify Constructed Loop
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ���── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 rounded-2xl border border-amber-600/50 space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
                  <span>📖</span>
                  <span>Step-by-Step Statutory & Management Explanation:</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0)
                      .length -
                      1 && (
                    <motion.button
                      aria-label="Show Next Step of Explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0)
                      .length -
                      1 && (
                    <motion.button
                      aria-label="Advance to Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Boardroom Simulation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Hero Score Card */}
          <div className="p-8 bg-gradient-to-br from-gold-950/80 via-slate-900 to-emerald-950/80 rounded-3xl border border-gold-500/40 text-center space-y-3 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Simulation Completed Successfully!
            </h2>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 uppercase font-bold block">Final Score</span>
                <span className="text-3xl font-black text-emerald-400">
                  ✓ {Math.max(0, 100 - errors * 5)}%
                </span>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-w-[130px]">
                <span className="text-xs text-slate-400 uppercase font-bold block">BKT Mastery</span>
                <span className="text-3xl font-black text-gold-400 capitalize">
                  {masteryLevel}
                </span>
              </div>
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-800/95 rounded-3xl border border-gold-500/40 shadow-xl space-y-5">
            <div className="flex items-center gap-2 text-gold-400 border-b border-slate-700 pb-3">
              <span className="text-xl">💭</span>
              <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">
                Executive Reflection & Synthesis
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-amber-300 block mb-1.5" htmlFor="refl-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  id="refl-1"
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g., How interest tax shields reduce debt cost, or how negative working capital can be a strategic power for Maruti/Railways..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-300 block mb-1.5" htmlFor="refl-2">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  id="refl-2"
                  aria-label="Reflection: How would you explain this to a friend?"
                  rows={2}
                  value={reflectionAnswers.explanation}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explanation: e.target.value })}
                  placeholder="e.g., Directing is the motor that drives people, while financial management ensures the fuel (capital) is deployed smartly..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gold-300 block mb-1.5" htmlFor="refl-3">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  id="refl-3"
                  aria-label="Reflection: Where in real life might you use this?"
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g., Managing student clubs, evaluating Indian corporate balance sheets before investing, or structuring startup funding..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <motion.button
                  aria-label="Save Executive Reflections"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                    speechManager.speak('Reflections recorded. Excellent synthesis!');
                  }}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  {reflectionSubmitted ? '✓ Reflections Saved' : 'Save Executive Reflection'}
                </motion.button>
                {reflectionSubmitted && (
                  <span className="text-xs text-emerald-400 font-bold">
                    ✓ Synthesised into long-term memory
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700">
            <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
              <span>✓</span> Executive Performance Evaluation:
            </h3>
            <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You possess complete mastery of Class 12 ISC Directing and Corporate Finance fundamentals.'
                : errors <= 3
                ? 'Excellent work! You demonstrate strong competency in applying management principles to Indian corporate cases.'
                : errors <= 7
                ? 'Solid progress! Review the specific misconception corrections below to eliminate conceptual traps.'
                : 'Foundational concepts established. Re-explore the interactive labs to reinforce the link between directing and capital structure.'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide flex items-center gap-1.5">
                <span>✗</span> Your Personal Misconception Profile:
              </h3>
              <p className="text-xs text-slate-400">
                Review the specific cognitive pitfalls you encountered during the simulation:
              </p>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">✗ Trap: {m.misconception}</p>
                      <p className="text-emerald-300 font-semibold mt-1">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── ENHANCED SPACED REPETITION VISIBILITY CARD (SRS VISIBILITY) ─── */}
          <div className="p-6 bg-gradient-to-br from-amber-950/50 via-slate-900 to-gold-950/50 rounded-3xl border-2 border-amber-500/60 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🗓️</span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                    Spaced Repetition System (SRS) • SuperMemo SM-2 Protocol
                  </span>
                  <h3 className="text-lg font-black text-white">
                    Next Review Schedule
                  </h3>
                </div>
              </div>
              <div className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-sm flex items-center gap-1.5 shadow-inner">
                <span>⏰</span>
                <span>Review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className={`p-4 rounded-2xl border text-center transition-all ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs uppercase font-bold text-emerald-400 block">0 Errors (Mastery)</span>
                <p className="text-2xl font-black text-white mt-1">7 Days</p>
                <p className="text-[11px] text-slate-300 mt-1">Long-term consolidation interval</p>
                {errors === 0 && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">
                    ✓ Your Assigned Interval
                  </span>
                )}
              </div>

              <div className={`p-4 rounded-2xl border text-center transition-all ${
                errors >= 1 && errors <= 3
                  ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs uppercase font-bold text-amber-400 block">1–3 Errors (Proficient)</span>
                <p className="text-2xl font-black text-white mt-1">3 Days</p>
                <p className="text-[11px] text-slate-300 mt-1">Medium reinforcement interval</p>
                {errors >= 1 && errors <= 3 && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase">
                    ✓ Your Assigned Interval
                  </span>
                )}
              </div>

              <div className={`p-4 rounded-2xl border text-center transition-all ${
                errors >= 4
                  ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-500/20'
                  : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs uppercase font-bold text-rose-400 block">4+ Errors (Review Needed)</span>
                <p className="text-2xl font-black text-white mt-1">1 Day</p>
                <p className="text-[11px] text-slate-300 mt-1">Immediate retention booster</p>
                {errors >= 4 && (
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase">
                    ✓ Your Assigned Interval
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <span className="flex items-center gap-1.5">
                <strong className="text-amber-400">Target Session Date:</strong>{' '}
                {new Date(Date.now() + (errors === 0 ? 7 : errors <= 3 ? 3 : 1) * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="text-slate-400">
                SRS state saved to browser storage for automated spaced recall prompts.
              </span>
            </div>

            <div className="flex justify-end pt-1">
              <motion.button
                aria-label="Re-explore interactive simulation labs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                  audioManager.play('tap');
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2"
              >
                <span>↺</span> Re-Explore Interactive Labs
              </motion.button>
            </div>
          </div>

          {/* Real-World Activity Completion Arc */}
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📝</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <ul className="space-y-1.5 pt-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-gold-400">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Executive Challenge Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_CommerceDirectingMeaningImportanceSim;