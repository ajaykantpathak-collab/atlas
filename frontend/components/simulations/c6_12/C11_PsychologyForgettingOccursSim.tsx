'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC PSYCHOLOGY CURRICULUM NODE IDENTIFIERS ───
const NODE_C11_PSY_031 = 'c11_psy_031'; // Why and How Forgetting Occurs
const NODE_C11_PSY_032 = 'c11_psy_032'; // How Memory Can Be Improved
const NODE_C11_PSY_033 = 'c11_psy_033'; // What is Thinking and Elements of Thought
const NODE_C11_PSY_034 = 'c11_psy_034'; // Concepts and How They Are Formed
const NODE_C11_PSY_035 = 'c11_psy_035'; // Reasoning and Common Errors
const NODE_C11_PSY_036 = 'c11_psy_036'; // Decision Making and Problem Solving
const NODE_C11_PSY_037 = 'c11_psy_037'; // Creative Thinking - Stages and Fostering Creativity

const ALL_NODE_IDS = [
  NODE_C11_PSY_031,
  NODE_C11_PSY_032,
  NODE_C11_PSY_033,
  NODE_C11_PSY_034,
  NODE_C11_PSY_035,
  NODE_C11_PSY_036,
  NODE_C11_PSY_037,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Cognitive Architecture of Memory & Mind',
  intro: 'At the NIMHANS Cognitive Neuropsychology Research Lab in Bengaluru, Class 11 researchers are investigating how the human brain encodes, consolidates, retrieves, and forgets critical information. Concurrently, an ISC psychology team in Lucknow is analyzing problem-solving heuristics, decision trees under risk, concept formation models, and Graham Wallas\'s four-stage creative illumination cycle.',
  context: 'Trace electrochemical neural trace decay, counteract proactive & retroactive interference, master Paivio\'s dual-coding imagery system, evaluate deductive syllogisms vs inductive generalizations, calculate expected utility in decision dilemmas, and foster divergent creative fluency.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A student learns French vocabulary at 9:00 AM, then studies Spanish vocabulary at 4:00 PM. That evening, when taking a French recall test, they keep remembering the Spanish words instead! What specific cognitive phenomenon is causing this memory block?',
  options: [
    'Proactive Interference (Prior learning blocks newer memories)',
    'Retroactive Interference (New learning reaches back to disrupt older memories)',
    'Trace Decay (Electrochemical neural engram spontaneously evaporated over 8 hours)',
    'Anterograde Amnesia (Hippocampal inability to consolidate new declarative information)',
  ],
  correctIndex: 1,
  hintAfter: 'Notice the temporal direction: the newly acquired Spanish is reaching backward in time to disrupt the previously learned French. That is Retroactive Interference!',
};

// ─── SVG DIAGRAM COMPONENT 1: EBBINGHAUS FORGETTING & RETENTION CURVE ───
function ForgettingCurveSVG({
  timeDays,
  retentionPercent,
  practiceMode,
  dualCoding,
}: {
  timeDays: number;
  retentionPercent: number;
  practiceMode: 'massed' | 'distributed';
  dualCoding: boolean;
}) {
  const width = 520;
  const height = 240;
  const padding = { top: 25, right: 30, bottom: 40, left: 55 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  // Generate curve coordinates for Massed vs Distributed
  const massedPoints = useMemo(() => {
    const pts: string[] = [];
    for (let d = 0; d <= 30; d += 1) {
      const x = padding.left + (d / 30) * plotW;
      const r = Math.max(5, Math.exp(-d / 2.2) * 100);
      const y = padding.top + plotH - (r / 100) * plotH;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [plotW, plotH, padding.left, padding.top]);

  const distributedPoints = useMemo(() => {
    const pts: string[] = [];
    for (let d = 0; d <= 30; d += 1) {
      const x = padding.left + (d / 30) * plotW;
      // Spaced curve with rehearsal refresh bumps at day 1, 3, 7
      let r = 100;
      if (d <= 1) r = 100 - d * 20;
      else if (d <= 3) r = 92 - (d - 1) * 8;
      else if (d <= 7) r = 88 - (d - 3) * 4;
      else r = 80 - (d - 7) * 0.8;
      const y = padding.top + plotH - (Math.max(10, r) / 100) * plotH;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [plotW, plotH, padding.left, padding.top]);

  const currentX = padding.left + (timeDays / 30) * plotW;
  const currentY = padding.top + plotH - (retentionPercent / 100) * plotH;

  return (
    <div className="w-full bg-slate-950/90 p-3 rounded-2xl border border-slate-800 shadow-inner">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="font-bold text-purple-300 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Representation A: Ebbinghaus Mathematical Decay & Consolidation Curve
        </span>
        <span className="text-[11px] font-mono text-slate-400">R = e^(-t/S)</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id="massedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
          </linearGradient>
          <filter id="glowPink" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const y = padding.top + plotH - (pct / 100) * plotH;
          return (
            <g key={pct}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
              <text x={padding.left - 8} y={y + 3} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">
                {pct}%
              </text>
            </g>
          );
        })}

        {/* X Axis Ticks */}
        {[0, 5, 10, 15, 20, 25, 30].map((d) => {
          const x = padding.left + (d / 30) * plotW;
          return (
            <g key={d}>
              <line x1={x} y1={padding.top + plotH} x2={x} y2={padding.top + plotH + 5} stroke="#64748b" strokeWidth="1" />
              <text x={x} y={padding.top + plotH + 16} fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                {d}d
              </text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + plotH} stroke="#64748b" strokeWidth="1.5" />
        <line x1={padding.left} y1={padding.top + plotH} x2={width - padding.right} y2={padding.top + plotH} stroke="#64748b" strokeWidth="1.5" />

        {/* Massed Practice Curve */}
        <polyline fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray={practiceMode === 'massed' ? 'none' : '4 4'} opacity={practiceMode === 'massed' ? 1 : 0.4} points={massedPoints} />

        {/* Distributed Practice Curve */}
        <polyline fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray={practiceMode === 'distributed' ? 'none' : '4 4'} opacity={practiceMode === 'distributed' ? 1 : 0.4} points={distributedPoints} />

        {/* Rehearsal Boost Markers on Distributed Line */}
        {practiceMode === 'distributed' && (
          <>
            <circle cx={padding.left + (1 / 30) * plotW} cy={padding.top + plotH - 0.9 * plotH} r="4" fill="#10b981" />
            <circle cx={padding.left + (3 / 30) * plotW} cy={padding.top + plotH - 0.88 * plotH} r="4" fill="#10b981" />
            <circle cx={padding.left + (7 / 30) * plotW} cy={padding.top + plotH - 0.82 * plotH} r="4" fill="#10b981" />
            <text x={padding.left + (3 / 30) * plotW} y={padding.top + plotH - 0.93 * plotH} fill="#34d399" fontSize="9" textAnchor="middle">
              Review Re-consolidation
            </text>
          </>
        )}

        {/* Current Dynamic State Indicator */}
        <line x1={currentX} y1={padding.top} x2={currentX} y2={padding.top + plotH} stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx={currentX} cy={currentY} r="7" fill="#c084fc" filter="url(#glowPink)" stroke="#ffffff" strokeWidth="2" />
        <text x={Math.min(currentX + 10, width - padding.right - 60)} y={Math.max(currentY - 10, padding.top + 15)} fill="#f3e8ff" fontSize="11" fontWeight="bold">
          {retentionPercent}% Retained
        </text>

        {/* Axis Labels */}
        <text x={padding.left + plotW / 2} y={height - 6} fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="500">
          Time Elapsed (Days)
        </text>
        <text transform={`rotate(-90 ${16} ${padding.top + plotH / 2})`} x={16} y={padding.top + plotH / 2} fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="500">
          Retention (%)
        </text>
      </svg>
    </div>
  );
}

// ─── SVG DIAGRAM COMPONENT 2: DUAL CODING & RETRIEVAL ROUTE ARCHITECTURE ───
function DualCodingArchitectureSVG({ dualCodingActive }: { dualCodingActive: boolean }) {
  const w = 520;
  const h = 230;

  return (
    <div className="w-full bg-slate-950/90 p-3 rounded-2xl border border-slate-800 shadow-inner">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="font-bold text-indigo-300 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          Representation B: Paivio Dual Coding Cognitive Architecture
        </span>
        <span className="text-[11px] font-mono text-slate-400">{dualCodingActive ? 'Twin Retrieval Routes Active' : 'Single Linguistic Route'}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible select-none">
        <defs>
          <marker id="arrowIndigo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#818cf8" />
          </marker>
          <marker id="arrowEmerald" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#34d399" />
          </marker>
          <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#fbbf24" />
          </marker>
        </defs>

        {/* Input Sensory Node */}
        <rect x="20" y="85" width="100" height="55" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <text x="70" y="108" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
          Stimulus
        </text>
        <text x="70" y="124" fill="#94a3b8" fontSize="9" textAnchor="middle">
          Text / Object
        </text>

        {/* Channel 1: Verbal Linguistic System (Logogens) */}
        <path d="M 120 100 C 150 70, 180 50, 210 50" fill="none" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowIndigo)" />
        <rect x="210" y="25" width="140" height="50" rx="8" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
        <text x="280" y="47" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">
          Verbal System
        </text>
        <text x="280" y="63" fill="#a5b4fc" fontSize="9" textAnchor="middle">
          Logogens (Word Codes)
        </text>

        {/* Channel 2: Non-Verbal Visual System (Imagens) */}
        <path d="M 120 125 C 150 155, 180 175, 210 175" fill="none" stroke={dualCodingActive ? '#34d399' : '#475569'} strokeWidth={dualCodingActive ? '2.5' : '1.5'} strokeDasharray={dualCodingActive ? 'none' : '4 4'} markerEnd={dualCodingActive ? 'url(#arrowEmerald)' : ''} />
        <rect x="210" y="150" width="140" height="50" rx="8" fill={dualCodingActive ? '#064e3b' : '#0f172a'} stroke={dualCodingActive ? '#10b981' : '#334155'} strokeWidth="1.5" />
        <text x="280" y="172" fill={dualCodingActive ? '#d1fae5' : '#64748b'} fontSize="11" fontWeight="bold" textAnchor="middle">
          Visual Imagery
        </text>
        <text x="280" y="188" fill={dualCodingActive ? '#6ee7b7' : '#475569'} fontSize="9" textAnchor="middle">
          Imagens (Mental Images)
        </text>

        {/* Cross-System Referential Connections */}
        <path d="M 280 75 L 280 150" fill="none" stroke={dualCodingActive ? '#fbbf24' : '#334155'} strokeWidth="1.5" strokeDasharray="3 3" markerEnd={dualCodingActive ? 'url(#arrowAmber)' : ''} />
        <text x="288" y="116" fill={dualCodingActive ? '#fcd34d' : '#475569'} fontSize="8" fontWeight="bold">
          Referential Links
        </text>

        {/* Output Retrieval Node */}
        <path d="M 350 50 C 375 50, 395 85, 410 100" fill="none" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowIndigo)" />
        <path d="M 350 175 C 375 175, 395 140, 410 125" fill="none" stroke={dualCodingActive ? '#34d399' : '#334155'} strokeWidth={dualCodingActive ? '2.5' : '1'} strokeDasharray={dualCodingActive ? 'none' : '4 4'} markerEnd={dualCodingActive ? 'url(#arrowEmerald)' : ''} />
        <rect x="410" y="85" width="100" height="55" rx="8" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
        <text x="460" y="108" fill="#f3e8ff" fontSize="11" fontWeight="bold" textAnchor="middle">
          Recall Access
        </text>
        <text x="460" y="124" fill="#d8b4fe" fontSize="9" textAnchor="middle">
          {dualCodingActive ? '2 Retrieval Paths' : '1 Retrieval Path'}
        </text>
      </svg>
    </div>
  );
}

// ─── SVG DIAGRAM COMPONENT 3: GRAHAM WALLAS 4-STAGE CREATIVITY CYCLE ───
function WallasCreativityFlowSVG({ activeStage }: { activeStage: 0 | 1 | 2 | 3 }) {
  const w = 520;
  const h = 140;

  const stages = [
    { name: '1. Preparation', sub: 'Conscious Analysis', color: '#6366f1', activeBg: '#312e81' },
    { name: '2. Incubation', sub: 'Unconscious Wandering', color: '#ec4899', activeBg: '#831843' },
    { name: '3. Illumination', sub: 'Aha! Flash of Insight', color: '#eab308', activeBg: '#713f12' },
    { name: '4. Verification', sub: 'Critical Proof & Logic', color: '#10b981', activeBg: '#064e3b' },
  ];

  return (
    <div className="w-full bg-slate-950/90 p-3 rounded-2xl border border-slate-800 shadow-inner">
      <div className="flex items-center justify-between mb-2 text-xs">
        <span className="font-bold text-amber-300 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Representation C: Graham Wallas (1926) Four-Stage Creative Cognition Model
        </span>
        <span className="text-[11px] font-mono text-slate-400">Current Focus: Stage {activeStage + 1}</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto overflow-visible select-none">
        {stages.map((st, i) => {
          const x = 12 + i * 126;
          const y = 30;
          const isCurrent = activeStage === i;
          return (
            <g key={i}>
              {/* Connector Arrow */}
              {i < 3 && (
                <path d={`M ${x + 115} ${y + 35} L ${x + 126} ${y + 35}`} stroke="#475569" strokeWidth="2" markerEnd="url(#arrowSmall)" />
              )}
              {/* Stage Container */}
              <rect
                x={x}
                y={y}
                width="116"
                height="70"
                rx="10"
                fill={isCurrent ? st.activeBg : '#0f172a'}
                stroke={isCurrent ? st.color : '#334155'}
                strokeWidth={isCurrent ? '2.5' : '1'}
                className="transition-all duration-300"
              />
              <circle cx={x + 16} cy={y + 20} r="8" fill={isCurrent ? st.color : '#334155'} />
              <text x={x + 16} y={y + 23} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                {i + 1}
              </text>
              <text x={x + 30} y={y + 23} fill={isCurrent ? '#ffffff' : '#cbd5e1'} fontSize="10" fontWeight="bold">
                {st.name.split('. ')[1]}
              </text>
              <text x={x + 10} y={y + 48} fill={isCurrent ? '#fde047' : '#64748b'} fontSize="8.5" fontWeight="500">
                {st.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── 24 COMPREHENSIVE CHALLENGES COVERING ALL 7 NODES ───
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
  // 1. Foundation - Node 031 - Recall
  {
    id: 'ch_psy_001',
    nodeId: NODE_C11_PSY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Donald Hebb\'s trace decay theory, why does natural forgetting occur in the brain over time?',
    options: [
      'New memories physically crush and overwrite older neural synapses in the cerebral cortex',
      'Unrehearsed electrochemical neural traces (engrams) gradually fade over time due to metabolic disuse',
      'The prefrontal cortex deliberately represses all neutral sensory stimuli to preserve energy',
      'The hippocampus runs out of physical byte storage for sensory registers',
    ],
    correctIndex: 1,
    explanation: 'Trace decay theory posits that learning creates an electrochemical neural trace (engram). Without active rehearsal or reactivation over time, this physical metabolic trace naturally decays and weakens.',
    hints: [
      'Think of a footpath through a grassy meadow that has not been walked on for months.',
      'It involves the variables of time and metabolic disuse acting on the physical neural pathway.',
      'The engram or neural trace simply fades when unrefreshed by rehearsal.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Node 031 - Understanding
  {
    id: 'ch_psy_002',
    nodeId: NODE_C11_PSY_031,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Following a highway collision on NH-48, a patient remembers everything about their childhood and identity, but cannot form any new long-term memories since the accident. What condition does this indicate?',
    options: [
      'Retrograde Amnesia (loss of past declarative memories prior to trauma)',
      'Anterograde Amnesia (inability to consolidate new post-trauma declarative memories)',
      'Transient Global Trace Decay',
      'Proactive Synaptic Inhibition',
    ],
    correctIndex: 1,
    explanation: 'Anterograde amnesia is the inability to lay down or consolidate new long-term declarative memories after brain damage (classically involving the bilateral hippocampus), while leaving remote past memories intact.',
    hints: [
      'Antero- means moving forward in time.',
      'The patient cannot form NEW memories, but their OLD past is preserved (like Patient H.M.).',
      'Damage to the hippocampus prevents post-injury memory consolidation: Anterograde Amnesia.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Node 032 - Application
  {
    id: 'ch_psy_003',
    nodeId: NODE_C11_PSY_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Allan Paivio\'s Dual Coding Theory suggests that psychological concepts are remembered most robustly when encoded in which manner?',
    options: [
      'Through loud verbal chanting repeated at maximum audible volume',
      'Both as a verbal linguistic code (logogen) and an internal visual mental imagery code (imagen)',
      'Exclusively as pure abstract mathematical propositions without sensory representations',
      'By reading printed text under high-intensity strobe lighting',
    ],
    correctIndex: 1,
    explanation: 'Dual Coding Theory shows that storing information in two distinct formats — verbal (words) and non-verbal (visual images) — creates two separate independent retrieval pathways in the brain, greatly enhancing recall.',
    hints: [
      'Think about pairing a word with a vivid mental picture.',
      'The brain utilizes both verbal linguistic channels and visual spatial channels.',
      'Dual means two: combining verbal codes with visual imagery creates twin retrieval routes.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Node 033 - Drag-Label
  {
    id: 'ch_psy_004',
    nodeId: NODE_C11_PSY_033,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the three primary cognitive elements of human thought to their functional definitions.',
    dragItems: [
      { label: 'Mental Image', targetId: 'target_sensory' },
      { label: 'Concept', targetId: 'target_category' },
      { label: 'Language', targetId: 'target_symbolic' },
    ],
    correctMapping: {
      target_sensory: 'Mental Image',
      target_category: 'Concept',
      target_symbolic: 'Language',
    },
    explanation: 'Thought relies on: 1) Mental Images (internal sensory-like representations), 2) Concepts (mental categories grouping common properties), and 3) Language (rule-governed arbitrary symbol systems).',
    hints: [
      'Picturing the Taj Mahal without seeing it physically is a mental image.',
      'A category grouping fruits or vehicles is a concept.',
      'Words and syntactic grammar rules form language.',
    ],
  },
  // 5. Standard - Node 031 - Application
  {
    id: 'ch_psy_005',
    nodeId: NODE_C11_PSY_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rohan has entered his old 4-digit ATM PIN for five years. Yesterday he set a new PIN, but at the ATM machine today, his fingers automatically key in the old PIN. Which interference type is this?',
    options: [
      'Retroactive Interference (New disrupts Old)',
      'Proactive Interference (Old disrupts New)',
      'Retrieval Cue Decay',
      'Context-Dependent Extinction',
    ],
    correctIndex: 1,
    explanation: 'Proactive Interference occurs when previously learned habits or memories (old PIN) interfere with the retrieval or performance of newly learned material (new PIN). Flow: Old blocks New.',
    hints: [
      'Pro- points forward: the past learning is interfering with current action.',
      'Old information is getting in the way of the newly created memory.',
      'Old PIN blocks new PIN = Proactive Interference.',
    ],
    misconceptionIndex: 0,
  },
  // 6. Standard - Node 034 - Analysis
  {
    id: 'ch_psy_006',
    nodeId: NODE_C11_PSY_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does an artificial concept (e.g., "Equilateral Triangle") fundamentally differ from a natural concept (e.g., "Indian Street Food")?',
    options: [
      'Artificial concepts are learned in childhood; natural concepts require university degrees',
      'Artificial concepts have rigid, rule-based defining features; natural concepts have fuzzy prototype boundaries',
      'Artificial concepts have no real-world application; natural concepts are purely mathematical',
      'Natural concepts are governed by constitutional laws; artificial concepts are purely visual',
    ],
    correctIndex: 1,
    explanation: 'Artificial concepts are defined by strict, all-or-none logical rules (3 equal sides and angles). Natural concepts (Eleanor Rosch\'s prototype theory) arise from lived experience and have fuzzy, continuous boundaries.',
    hints: [
      'Can an equilateral triangle ever have 4 sides? No, the rule is strict.',
      'Can street food include both samosas and non-traditional snacks? Yes, membership is fuzzy and prototype-based.',
      'Artificial = rigid formal rules; Natural = fuzzy boundaries based on central prototypes.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Standard - Node 035 - Analysis
  {
    id: 'ch_psy_007',
    nodeId: NODE_C11_PSY_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Consider this syllogistic argument: "Premise 1: All top IAS rankers study 16 hours daily. Premise 2: Priya studies 16 hours daily. Conclusion: Priya will surely top the IAS exam." Why is this logically flawed?',
    options: [
      'It is an inductive generalization that cannot use proper nouns',
      'It suffers from a faulty premise and affirming the consequent (deductive invalidity)',
      'It utilizes means-end analysis rather than an algorithm',
      'Premises in psychology can never be quantified in hours',
    ],
    correctIndex: 1,
    explanation: 'First, the premise that all rankers study 16 hours is factually faulty (unverified extreme assumption). Second, studying 16 hours does not guarantee rank 1 (flawed deductive reasoning assuming a single necessary cause).',
    hints: [
      'Is the starting premise factually true for every single successful person?',
      'Does having one attribute guarantee the entire complex outcome?',
      'It involves both an unsound/faulty premise and invalid causal deduction.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Standard - Node 036 - Numeric
  {
    id: 'ch_psy_008',
    nodeId: NODE_C11_PSY_036,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the Expected Utility (EU = Σ pi × ui) for Decision Option A: 70% chance (p=0.7) of achieving +80 utility points, and 30% chance (p=0.3) of losing 20 utility points (u=-20). Enter the net Expected Utility:',
    correctAnswer: 50,
    tolerance: 0.5,
    unit: 'EU points',
    explanation: 'EU = (0.7 × 80) + (0.3 × -20) = 56 - 6 = 50 net utility points.',
    hints: [
      'Calculate the positive outcome first: 0.7 multiplied by 80 = 56.',
      'Calculate the negative risk: 0.3 multiplied by -20 = -6.',
      'Sum them together: 56 + (-6) = 50.',
    ],
  },
  // 9. Standard - Node 037 - Drag-Sort
  {
    id: 'ch_psy_009',
    nodeId: NODE_C11_PSY_037,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange Graham Wallas\'s four sequential stages of Creative Thinking in their natural progression.',
    sortItems: [
      'Preparation (Conscious research, data gathering & problem definition)',
      'Incubation (Unconscious cognitive processing while stepping away from the problem)',
      'Illumination (Sudden flash of insight — the "Aha!" moment)',
      'Verification / Validation (Testing, critical evaluation & refining the solution)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Graham Wallas (1926) established the 4 creative stages: 1. Preparation → 2. Incubation → 3. Illumination → 4. Verification/Validation.',
    hints: [
      'You cannot incubate before you have done the initial hard work and study.',
      'The sudden flash of insight comes after unconscious incubation.',
      'Final testing and mathematical/logical verification is always the last stage.',
    ],
  },
  // 10. Standard - Node 032 - Understanding
  {
    id: 'ch_psy_010',
    nodeId: NODE_C11_PSY_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does Distributed Practice (spaced study sessions) consistently outperform Massed Practice (cramming) in retention studies?',
    options: [
      'Massed practice overloads working memory, creates high fatigue, and prevents synaptic consolidation between sessions',
      'Distributed practice changes brain anatomy by multiplying neuron counts overnight',
      'Massed practice only works for languages while distributed practice is only for mathematics',
      'Distributed practice bypasses sensory memory entirely',
    ],
    correctIndex: 0,
    explanation: 'Distributed practice spaces learning across time, allowing sleep-dependent hippocampal consolidation, reducing cognitive fatigue, and minimizing both proactive and retroactive interference.',
    hints: [
      'Think about what happens to memory consolidation during rest and sleep.',
      'Cramming creates cognitive fatigue and high interference between packed items.',
      'Spaced repetition enables long-term potentiation and solid consolidation.',
    ],
    misconceptionIndex: 2,
  },
  // 11. Advanced - Node 031 - Evaluation
  {
    id: 'ch_psy_011',
    nodeId: NODE_C11_PSY_031,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to clinical psychology and the ARDSI Dementia in India Report (5.3M affected), how is Alzheimer\'s Disease distinguished from the general syndrome of Dementia?',
    options: [
      'Dementia is an acute viral infection, whereas Alzheimer\'s is a temporary emotional state',
      'Dementia is the broad umbrella clinical syndrome of progressive cognitive decline; Alzheimer\'s is a specific neurodegenerative neuropathology marked by amyloid plaques and neurofibrillary tangles',
      'Alzheimer\'s only affects motor reflexes, while dementia only impairs vision',
      'Dementia is legally curable under the Mental Healthcare Act 2017, whereas Alzheimer\'s is purely genetic',
    ],
    correctIndex: 1,
    explanation: 'Dementia is an umbrella clinical syndrome involving chronic decline in 2+ cognitive domains. Alzheimer\'s Disease is the leading specific neuropathology causing dementia, characterized by hippocampal amyloid plaques and tau tangles.',
    hints: [
      'Think of "vehicle" as an umbrella category and "electric car" as a specific model.',
      'Dementia is the overarching clinical syndrome.',
      'Alzheimer\'s is the specific biological neurodegenerative disease causing the majority of dementia cases.',
    ],
    misconceptionIndex: 1,
  },
  // 12. Advanced - Node 036 - Analysis
  {
    id: 'ch_psy_012',
    nodeId: NODE_C11_PSY_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In computer science and cognitive psychology (Newell & Simon), how does an Algorithm differ from a Heuristic?',
    options: [
      'Heuristics guarantee 100% correct answers slowly; algorithms are rapid educated guesses',
      'Algorithms are step-by-step procedures that guarantee the correct solution; heuristics are fast mental shortcuts that reduce cognitive load but do not guarantee accuracy',
      'Algorithms are only found in machines; human brains only possess heuristics',
      'Heuristics require mathematical calculators; algorithms are intuitive gut feelings',
    ],
    correctIndex: 1,
    explanation: 'Algorithms provide exhaustive, step-by-step rules guaranteeing a correct outcome (e.g., long division). Heuristics are cognitive shortcuts (rules of thumb) providing fast, satisfactory decisions with bounded rationality.',
    hints: [
      'An algorithm trades speed for guaranteed certainty.',
      'A heuristic trades absolute certainty for speed and lower cognitive effort.',
      'Long division is an algorithm; estimating a shopping total is a heuristic.',
    ],
  },
  // 13. Advanced - Node 035 - Evaluation
  {
    id: 'ch_psy_013',
    nodeId: NODE_C11_PSY_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A media report attributes rising adolescent anxiety in metro cities entirely to "smartphones", ignoring academic competition, sleep debt, parental expectations, and urban isolation. Which critical reasoning fallacy is committed?',
    options: [
      'Fallacy of Single Cause (oversimplification of a multi-causal reality)',
      'Syllogistic Modus Tollens error',
      'Analogical Inversion Fallacy',
      'Prototype Representation Error',
    ],
    correctIndex: 0,
    explanation: 'The Fallacy of Single Cause mistakenly attributes a complex, systemic, multi-factorial outcome (such as mental health distress documented in NIMHANS surveys) to a single isolated variable.',
    hints: [
      'Is adolescent stress caused by only one solitary factor?',
      'The error comes from ignoring multiple contributing dimensions.',
      'Blaming one isolated culprit for a complex phenomenon = Fallacy of Single Cause.',
    ],
    misconceptionIndex: 4,
  },
  // 14. Advanced - Node 037 - Creativity
  {
    id: 'ch_psy_014',
    nodeId: NODE_C11_PSY_037,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the 4-pillar institutional environment that fosters Creative Divergent Thinking according to NCERT and ISC psychology curricula.',
    availableParts: [
      'Enrich Knowledge & Varied Experience',
      'Encourage Autonomy & Independence',
      'Nurture Questioning & Curiosity',
      'Promote Positive Emotional Climate',
      'Impose Rigid Punitive Evaluation',
      'Rote Repetition of Single Correct Answers',
    ],
    targetState: 'Enrich Knowledge & Varied Experience + Encourage Autonomy & Independence + Nurture Questioning & Curiosity + Promote Positive Emotional Climate',
    validationHint: 'Select all 4 positive fostering strategies from the syllabus while excluding punitive and rote constraints.',
    explanation: 'Creativity is fostered by: 1) Enriched experiential store, 2) Autonomy and independence, 3) Rewarding curiosity and inquiry, and 4) A safe, positive emotional climate that frees cognitive working memory.',
    hints: [
      'Look for the four evidence-based psychological enablers of creativity.',
      'Exclude strict penalties and rote memorisation.',
      'Select: Knowledge enrichment, Autonomy/Independence, Curiosity, and Positive mood.',
    ],
  },
  // 15. Foundation - Node 033 - Understanding
  {
    id: 'ch_psy_015',
    nodeId: NODE_C11_PSY_033,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which thinking type is engaged when a student solves a single-answer calculus integral versus when brainstorming 30 novel uses for a discarded clay kulhad?',
    options: [
      'Both use Divergent Thinking equally',
      'Integral uses Convergent Thinking (narrowing to one answer); Kulhad brainstorming uses Divergent Thinking (expanding outward)',
      'Integral uses Aimless Fantasy; Kulhad uses Heuristic Deduction',
      'Integral uses Divergent Thinking; Kulhad uses Algorithmic Search',
    ],
    correctIndex: 1,
    explanation: 'Convergent thinking (J.P. Guilford) channels logic toward a single correct or optimal solution. Divergent thinking branches outward from a prompt to produce fluency, flexibility, and originality.',
    hints: [
      'Converge means coming together to one single point.',
      'Diverge means spreading out into multiple branching pathways.',
      'Single right answer = Convergent; Multiple creative ideas = Divergent.',
    ],
  },
  // 16. Foundation - Node 034 - Recall
  {
    id: 'ch_psy_016',
    nodeId: NODE_C11_PSY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Eleanor Rosch\'s cognitive prototype theory, what is a "prototype"?',
    options: [
      'A defective copy of an image stored in short term memory',
      'The most typical, central, and representative member of a natural category',
      'An unproven mathematical axiom used in deductive proofs',
      'A legal definition formulated under the Indian Penal Code',
    ],
    correctIndex: 1,
    explanation: 'A prototype is the mental benchmark or most typical exemplar of a category (e.g., a sparrow as a prototype for "bird", rather than a penguin). New instances are categorized by similarity to this prototype.',
    hints: [
      'Think of what image immediately pops into mind when someone says "bird" or "chair".',
      'It represents the most characteristic example of that group.',
      'Prototype = the clearest and most typical representative exemplar of a concept.',
    ],
  },
  // 17. Standard - Node 036 - Application
  {
    id: 'ch_psy_017',
    nodeId: NODE_C11_PSY_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Newell and Simon\'s Means-End Analysis heuristic, what is the core problem-solving action?',
    options: [
      'Relying entirely on random trial-and-error until luck strikes',
      'Comparing current state with goal state, setting intermediate sub-goals, and applying operators to reduce the difference',
      'Working strictly forward without ever evaluating the final goal state',
      'Waiting in passive incubation until an illumination occurs',
    ],
    correctIndex: 1,
    explanation: 'Means-End Analysis repeatedly compares the current state to the goal state, identifies discrepancies, creates sub-goals to bridge the gap, and selects operators (means) to achieve those sub-goals.',
    hints: [
      'It involves breaking a daunting distant goal into smaller milestone sub-goals.',
      'Means are the tools or operators used to reach the desired End.',
      'Comparing states and setting sub-goals to reduce differences = Means-End Analysis.',
    ],
  },
  // 18. Standard - Node 032 - Application
  {
    id: 'ch_psy_018',
    nodeId: NODE_C11_PSY_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'To memorize the seven stages of cognitive development, a student mentally places each stage inside rooms along their familiar school corridor walk. Which mnemonic technique is this?',
    options: [
      'The Acronym Chunking System',
      'The Method of Loci (Memory Palace)',
      'Retroactive Semantic Encoding',
      'Phonological Rehearsal Loop',
    ],
    correctIndex: 1,
    explanation: 'The Method of Loci (originating from Simonides of Ceos) anchors abstract list items to familiar spatial landmarks along a well-known route, exploiting robust evolutionary spatial memory.',
    hints: [
      'Loci is Latin for locations or places.',
      'It uses spatial routes (such as a school hallway or house rooms) to anchor memories.',
      'Walking through a familiar path to pick up items = Method of Loci.',
    ],
  },
  // 19. Advanced - Node 035 - Analysis
  {
    id: 'ch_psy_019',
    nodeId: NODE_C11_PSY_035,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Distinguish between Deductive and Inductive Reasoning regarding certainty and logical direction:',
    options: [
      'Deduction moves specific-to-general and is probabilistic; Induction moves general-to-specific and is certain',
      'Deduction moves general-to-specific with logical certainty (if premises are true); Induction moves specific-to-general yielding probabilistic conclusions',
      'Both yield identical mathematical certainty in empirical science',
      'Induction is only used in courtrooms while deduction is restricted to botany',
    ],
    correctIndex: 1,
    explanation: 'Deductive reasoning moves top-down (general premises to specific instance), guaranteeing conclusion truth if premises are true. Inductive reasoning moves bottom-up (specific instances to general rule), yielding probable conclusions vulnerable to counterexamples.',
    hints: [
      'All humans are mortal (General) -> Socrates is human -> Socrates is mortal (Specific certainty). That is deduction.',
      'Every swan observed in Delhi is white -> All swans are white (Probable until a black swan is seen). That is induction.',
      'Deduction = General to Specific (Certain); Induction = Specific to General (Probable).',
    ],
  },
  // 20. Advanced - Node 031 - Analysis
  {
    id: 'ch_psy_020',
    nodeId: NODE_C11_PSY_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student experiences the "Tip-of-the-Tongue" (TOT) phenomenon during a viva exam. Which theory of forgetting best explains why they suddenly recall the answer the moment the teacher gives a one-letter clue?',
    options: [
      'Trace Decay (the engram was permanently destroyed)',
      'Retrieval Failure Theory (information is stored in LTM but inaccessible due to missing cues)',
      'Retrograde Traumatic Amnesia',
      'Permanent Synaptic Pruning',
    ],
    correctIndex: 1,
    explanation: 'Retrieval Failure Theory shows that forgotten information often remains intact within Long-Term Memory storage, but cannot be accessed without an effective, context-appropriate retrieval cue.',
    hints: [
      'Did the memory vanish, or was it simply locked without the right key?',
      'The prompt/cue unlocked the stored information.',
      'The memory was available in storage, but inaccessible without cues: Retrieval Failure.',
    ],
  },
  // 21. Advanced - Node 036 - Evaluation
  {
    id: 'ch_psy_021',
    nodeId: NODE_C11_PSY_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A person refuses to travel by train after seeing a dramatic TV report of a derailment, despite statistical data proving trains are 20× safer than cars. Which Tversky & Kahneman heuristic causes this biased risk evaluation?',
    options: [
      'Anchoring & Adjustment Heuristic',
      'Availability Heuristic (estimating likelihood based on vividness and ease of recall)',
      'Representativeness Prototype Heuristic',
      'Means-End Transformation Heuristic',
    ],
    correctIndex: 1,
    explanation: 'The Availability Heuristic leads people to assess the probability or danger of an event by how easily concrete, vivid instances come to mind (e.g., highly publicized, emotionally salient disaster news).',
    hints: [
      'How readily does the vivid memory come to the mind\'s surface?',
      'Vivid, emotional events are easily available in memory, skewing probability estimates.',
      'Judging frequency by ease of mental recall = Availability Heuristic.',
    ],
  },
  // 22. Advanced - Node 037 - Application
  {
    id: 'ch_psy_022',
    nodeId: NODE_C11_PSY_037,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the creative process of mathematician Srinivasa Ramanujan, complex formulas appeared vividly during deep rest and dreams. Which two stages of Wallas\'s model are represented by the rest period and the sudden discovery?',
    options: [
      'Preparation and Verification',
      'Incubation (subconscious processing) and Illumination (insight emergence)',
      'Deduction and Algorithmization',
      'Retrieval and Decay',
    ],
    correctIndex: 1,
    explanation: 'Setting the conscious work aside allows unconscious recombination during Incubation, which leads directly to the sudden "Aha!" realization of Illumination.',
    hints: [
      'Stepping away and letting the unconscious work = Incubation.',
      'The sudden flash of insight = Illumination.',
      'Incubation leads directly to Illumination.',
    ],
  },
  // 23. Standard - Node 034 - Application
  {
    id: 'ch_psy_023',
    nodeId: NODE_C11_PSY_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When asked if an ostrich is a bird, a student hesitates 800ms longer than when asked if a robin is a bird. What does this difference in reaction time demonstrate?',
    options: [
      'The Prototype Typicality Effect (prototypical exemplars are verified faster in semantic memory)',
      'Auditory Trace Decay',
      'Proactive Language Inhibition',
      'Retrograde Lexical Amnesia',
    ],
    correctIndex: 0,
    explanation: 'The Typicality Effect demonstrates that category members sharing higher feature overlap with the central prototype (e.g., robins having wings, flying, singing) are verified significantly faster than atypical boundary members (e.g., flightless ostriches).',
    hints: [
      'Which bird is closer to the central mental average of "bird"?',
      'Closer proximity to the prototype speeds up neural semantic verification.',
      'Faster verification of central exemplars = The Typicality Effect.',
    ],
  },
  // 24. Advanced - Node 036 - Numeric
  {
    id: 'ch_psy_024',
    nodeId: NODE_C11_PSY_036,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Calculate the Expected Utility (EU = p1×u1 + p2×u2) for Career Choice B: 40% probability (p=0.4) of securing +150 career satisfaction units, and 60% probability (p=0.6) of suffering -30 stress units. Enter the net Expected Utility:',
    correctAnswer: 42,
    tolerance: 0.5,
    unit: 'EU score',
    explanation: 'EU = (0.4 × 150) + (0.6 × -30) = 60 - 18 = 42 net utility points.',
    hints: [
      'Positive gain component: 0.4 × 150 = 60.',
      'Negative risk component: 0.6 × -30 = -18.',
      'Sum the components: 60 - 18 = 42.',
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

// ─── DEFAULT ENRICHMENT PROPS (ISC PSYCHOLOGY SYLLABUS ALIGNED) ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_PSY_031,
  title: 'Remembering, Forgetting & Cognitive Thinking Processes',
  definition:
    'Forgetting represents the inability to retrieve, recognize, or reproduce previously stored information via mechanisms of trace decay, interference, and retrieval failure, while clinical amnesia and dementia signify biological neuropathology. Thinking comprises the mental manipulation of images, concepts, and language through reasoning, problem solving, decision making, and 4-stage creative cognition.',
  eli5: 'Your brain is like a supercomputer. Forgetting happens when trails fade (decay), files get mixed up (interference), or you lose the file name (retrieval failure). Thinking is how you use those files to solve puzzles, make choices, and invent brand new things!',
  misconceptions: [
    {
      misconception: 'Retroactive interference means old memories interfere with new learning.',
      correction: 'Retroactive interference flows new-to-old: new learning disrupts older memories. Proactive interference is when old learning blocks new memories.',
    },
    {
      misconception: 'Alzheimer\'s disease and Dementia are interchangeable synonyms.',
      correction: 'Dementia is an umbrella clinical syndrome of general cognitive decline; Alzheimer\'s disease is a specific progressive neuropathology causing ~70% of dementia cases.',
    },
    {
      misconception: 'Passive textbook re-reading is the most effective memory booster.',
      correction: 'Passive re-reading creates an illusion of familiarity. Active retrieval practice, dual coding imagery, and distributed practice yield vastly superior long-term retention.',
    },
    {
      misconception: 'Natural concepts have rigid, strict mathematical definitions.',
      correction: 'Natural concepts (like "vehicle" or "bird") have fuzzy boundaries organized around central mental prototypes rather than rigid logical rules.',
    },
    {
      misconception: 'The Fallacy of Single Cause just means giving one good reason.',
      correction: 'The fallacy occurs when a multi-causal, complex systemic outcome is mistakenly attributed entirely to a single isolated variable.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which brain structure is primary for consolidating new long-term declarative memories?',
      options: ['Hippocampus', 'Medulla Oblongata', 'Occipital Pole', 'Cerebellum'],
      correctIndex: 0,
    },
    {
      question: 'What is the direction of interference in Retroactive Interference?',
      options: ['New material interferes with old recall', 'Old material interferes with new learning', 'Sensory register wipes working memory', 'Emotional trauma causes repression'],
      correctIndex: 0,
    },
    {
      question: 'Which method uses spatial routes and landmarks as mnemonic anchors?',
      options: ['Method of Loci', 'Acronym Chunking', 'Peg-word system', 'Distributed spacing'],
      correctIndex: 0,
    },
    {
      question: 'What element of thought consists of rule-governed arbitrary symbols?',
      options: ['Language', 'Visual engram', 'Natural prototype', 'Heuristic shortcut'],
      correctIndex: 0,
    },
    {
      question: 'Which thinking style branches outward to produce fluent and novel solutions?',
      options: ['Divergent Thinking', 'Convergent Thinking', 'Aimless Fantasy', 'Algorithmic Long-Division'],
      correctIndex: 0,
    },
    {
      question: 'What is the formula for Optimum Expected Utility?',
      options: ['EU = Σ (pi × ui)', 'EU = pi + ui', 'EU = (pi / ui) × 100', 'EU = √(pi × ui)'],
      correctIndex: 0,
    },
    {
      question: 'In Wallas\'s creative model, what is the unconscious rest stage called?',
      options: ['Incubation', 'Preparation', 'Illumination', 'Verification'],
      correctIndex: 0,
    },
    {
      question: 'Which cognitive shortcut judges likelihood based on how easily examples are recalled?',
      options: ['Availability Heuristic', 'Representativeness Heuristic', 'Means-End Operator', 'Syllogism'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Mastery is achieved when the student accurately distinguishes all causes of forgetting, applies mnemonic dual coding principles, categorizes concepts & reasoning modes, computes expected utility, and tracks Wallas\'s four creative stages.',
};

// ─── 5 INTERACTIVE BRILLIANT-STYLE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Decay of Neural Engrams & Interference Dynamics',
    instruction: 'Adjust the Time Elapsed slider to watch trace decay, and toggle Subject Similarity to experience proactive vs retroactive interference.',
    interactionType: 'slider-decay',
    nodeId: NODE_C11_PSY_031,
  },
  {
    title: '2. Dual-Coding & The Memory Optimization Toolkit',
    instruction: 'Toggle Verbal vs Dual-Coding (Visual + Verbal) and compare Massed vs Distributed study retention curves in real time.',
    interactionType: 'toggle-memory',
    nodeId: NODE_C11_PSY_032,
  },
  {
    title: '3. Cognitive Elements: Images, Prototypes & Concepts',
    instruction: 'Click on category prototypes to observe natural vs artificial concept boundary mapping in cognitive semantic space.',
    interactionType: 'click-prototype',
    nodeId: NODE_C11_PSY_034,
  },
  {
    title: '4. Decision Matrix: Expected Utility & Means-End Analysis',
    instruction: 'Adjust probability (p) and utility outcome values (u) to calculate Expected Utility and build sub-goal operators.',
    interactionType: 'slider-utility',
    nodeId: NODE_C11_PSY_036,
  },
  {
    title: '5. The Creative Mind: Wallas\'s 4 Stages of Illumination',
    instruction: 'Simulate the incubation timeline from conscious preparation through unconscious incubation to sudden "Aha!" illumination.',
    interactionType: 'creative-stages',
    nodeId: NODE_C11_PSY_037,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'PREDICT: If you study Psychology for 4 hours non-stop (Massed) vs 1 hour daily for 4 days (Distributed), which retention curve will be higher at Day 7?',
    options: [
      'Massed will be higher because the cramming was recent and intense',
      'Distributed will be substantially higher due to spaced consolidation and lower interference',
      'Both will produce identical 10% retention due to constant decay rates',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now toggle the "Practice Mode" below in the simulator to verify how spaced intervals maintain memory retention above 75%!',
    nodeId: NODE_C11_PSY_032,
  },
  {
    question: 'PREDICT: If an outcome has an 80% chance of gaining 50 points (p=0.8, u=50) and a 20% chance of losing 100 points (p=0.2, u=-100), is the rational Expected Utility positive or negative?',
    options: [
      'Positive: EU = +20',
      'Negative: EU = -30',
      'Neutral: EU = 0',
    ],
    correctIndex: 0,
    verifyInstruction: 'Test it on the interactive utility calculator: (0.8 × 50) + (0.2 × -100) = 40 - 20 = +20!',
    nodeId: NODE_C11_PSY_036,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'OBSERVATION: What happens to the interference level when the two studied subjects are highly similar (e.g., Spanish & Portuguese) compared to dissimilar (e.g., Spanish & Chemistry)?',
    observableOptions: [
      'High similarity increases interference dramatically because shared neural pathways compete for retrieval cues',
      'High similarity completely eliminates all retroactive interference',
      'Similarity has zero effect on human cognitive interference',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PSY_031,
  },
  {
    question: 'OBSERVATION: When Dual Coding (Imagery + Verbal) is activated, what happens to the number of retrieval routes?',
    observableOptions: [
      'Retrieval routes double from 1 to 2, significantly buffering against cue failure',
      'Retrieval routes collapse because visual images block verbal processing',
      'Memory storage speed decreases to zero',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_PSY_032,
  },
];

// ─── REAL WORLD ACTIVITY (CAPSTONE) ───
const REAL_WORLD_ACTIVITY = {
  title: 'NIMHANS Adolescent Memory & Study Protocol',
  description: 'Design a personalized 7-day ISC exam preparation schedule that applies Dual Coding, Distributed Practice, Means-End sub-goals, and deliberate Incubation breaks to prevent proactive interference in a high-stress academic environment.',
  steps: [
    'Audit daily study blocks: Replace 4-hour massed cramming with 45-minute distributed intervals.',
    'Eliminate retroactive interference by avoiding back-to-back similar subjects (e.g., separate Hindi and Sanskrit).',
    'Translate 5 abstract psychological definitions into dual-coded visual mental diagrams.',
    'Incorporate 20-minute daily incubation walks to stimulate unconscious divergent creative synthesis.',
  ],
};

// ─── MAIN COMPONENT ───
export function C11_PsychologyForgettingOccursSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PSY_031,
  title = DEFAULT_PROPS.title || 'Psychology: Memory, Forgetting & Thought',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['psychology'] || { name: 'Psychology', emoji: '🧠', color: 'purple' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── MULTI-REPRESENTATION TOGGLE STATE ───
  const [representationMode, setRepresentationMode] = useState<'graph' | 'architecture' | 'creativityFlow'>('graph');

  // ─── INTERACTIVE SIMULATION CONTROLS ───
  const [timeDaysElapsed, setTimeDaysElapsed] = useState(2);
  const [rehearsalCount, setRehearsalCount] = useState(1);
  const [interferenceType, setInterferenceType] = useState<'retroactive' | 'proactive' | 'none'>('retroactive');
  const [subjectSimilarity, setSubjectSimilarity] = useState(70);
  const [dualCodingActive, setDualCodingActive] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'massed' | 'distributed'>('distributed');
  const [selectedLobe, setSelectedLobe] = useState<'hippocampus' | 'prefrontal' | 'temporal' | 'amygdala'>('hippocampus');
  const [activeConceptType, setActiveConceptType] = useState<'natural' | 'artificial'>('natural');
  const [selectedConceptItem, setSelectedConceptItem] = useState('Sparrow (Prototype)');
  const [utilityProbability, setUtilityProbability] = useState(70);
  const [utilityGain, setUtilityGain] = useState(80);
  const [utilityLoss, setUtilityLoss] = useState(20);
  const [creativeStage, setCreativeStage] = useState<0 | 1 | 2 | 3>(0);
  const [divergentItemCount, setDivergentItemCount] = useState(4);
  const [meansEndCurrentState, setMeansEndCurrentState] = useState('Stressed & Behind on Syllabus');
  const [meansEndSubgoals, setMeansEndSubgoals] = useState<string[]>([
    'Subgoal 1: Chunk Chapter 6 & 7 Syllabus into 4 modules',
    'Subgoal 2: Apply Paivio Dual Coding with Mind Maps',
    'Subgoal 3: Test Retrieval with Spaced Flashcards',
  ]);
  const [activeThinkingMode, setActiveThinkingMode] = useState<'convergent' | 'divergent'>('divergent');
  const [reasoningPremiseValid, setReasoningPremiseValid] = useState(true);
  const [reasoningEmotionLevel, setReasoningEmotionLevel] = useState(30);

  // ─── CHALLENGE & ADAPTIVE BKT STATE ───
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

  // ─── INTERACTION FEEDBACK STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── PERSISTENT REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── CALCULATED RETENTION VALUE VIA EBBINGHAUS & HEBB EQUATION ───
  const calculatedRetention = useMemo(() => {
    const strengthMultiplier = 1 + rehearsalCount * 0.8 + (dualCodingActive ? 1.2 : 0) + (practiceMode === 'distributed' ? 1.5 : 0.3);
    const decay = Math.exp(-timeDaysElapsed / strengthMultiplier) * 100;
    const interferencePenalty = interferenceType !== 'none' ? (subjectSimilarity / 100) * 25 : 0;
    return Math.max(5, Math.min(100, Math.round(decay - interferencePenalty)));
  }, [timeDaysElapsed, rehearsalCount, dualCodingActive, practiceMode, interferenceType, subjectSimilarity]);

  // ─── CALCULATED EXPECTED UTILITY VALUE ───
  const calculatedEU = useMemo(() => {
    const p1 = utilityProbability / 100;
    const p2 = 1 - p1;
    const u1 = utilityGain;
    const u2 = -utilityLoss;
    return Math.round((p1 * u1 + p2 * u2) * 10) / 10;
  }, [utilityProbability, utilityGain, utilityLoss]);

  // ─── FILTERED CHALLENGES BY BKT DIFFICULTY TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: INITIAL LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT ADAPTIVE DIFFICULTY TUNING ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── EFFECT 3: 2D CANVAS COGNITIVE BRAIN & MEMORY WAVE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Sine wave representing active hippocampal oscillations / working memory
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = dualCodingActive ? '#10b981' : '#6366f1';
      for (let x = 0; x < canvas.width; x++) {
        const freq = 0.03 + (practiceMode === 'distributed' ? 0.02 : 0.01);
        const amp = (calculatedRetention / 100) * 20;
        const y = canvas.height / 2 + Math.sin(x * freq + frame * 0.05) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing neural node
      const pulseSize = 6 + Math.sin(frame * 0.1) * 3;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(canvas.width - 40, canvas.height / 2, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Text status overlay
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Neural Engram Strength: ${calculatedRetention}%`, 15, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [calculatedRetention, dualCodingActive, practiceMode]);

  // ─── EFFECT 4: AUTO-SPEAK ON DISCOVERY MOUNT ───
  useEffect(() => {
    speechManager.speak('Welcome to the cognitive architecture simulation of remembering, forgetting, and thought.');
  }, []);

  // ─── EFFECT 5: CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK EVENT HANDLERS ───
  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You understand retroactive interference.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core neural and cognitive architectures.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test all memory variables, decision formulas, and neural pathways.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering structured challenge mode. Let us verify your cognitive psychological mastery.');
  }, []);

  const handlePrediction = useCallback((index: number) => {
    setPredictionIndex(index);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now verify it using the live sliders!');
  }, []);

  const handleObservation = useCallback((index: number) => {
    setObservationIndex(index);
    setObservationAnswered(true);
    const isCorrect = index === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closer at the interference parameters.');
  }, []);

  const handleLobeSelect = useCallback((lobe: 'hippocampus' | 'prefrontal' | 'temporal' | 'amygdala') => {
    setSelectedLobe(lobe);
    audioManager.play('tap');
    const dict = {
      hippocampus: 'Hippocampus: Central for consolidating new long-term declarative memories.',
      prefrontal: 'Prefrontal Cortex: Directs executive control, problem-solving, and means-end reasoning.',
      temporal: 'Temporal Lobe: Stores semantic categories, language structures, and concepts.',
      amygdala: 'Amygdala: Encodes emotional valence and can introduce affective bias in reasoning.',
    };
    speechManager.speak(dict[lobe]);
  }, []);

  const handleTimeSliderChange = useCallback((val: number) => {
    setTimeDaysElapsed(val);
    audioManager.play('count');
  }, []);

  const handleRehearsalBoost = useCallback(() => {
    setRehearsalCount((prev) => Math.min(prev + 1, 6));
    audioManager.play('sparkle');
    speechManager.speak('Active rehearsal reinforces the electrochemical neural trace!');
  }, []);

  const handleToggleDualCoding = useCallback(() => {
    setDualCodingActive((prev) => !prev);
    audioManager.play('chime');
  }, []);

  const handleTogglePracticeMode = useCallback((mode: 'massed' | 'distributed') => {
    setPracticeMode(mode);
    audioManager.play('tap');
  }, []);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

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
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Mastery assessment complete. Your score is ${finalScore} percent.`);
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
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding psychological deduction.');
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

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('All hints explored. Let us examine the psychological rationale.');
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

  // Motivational message calculation
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans selection:bg-purple-500 selection:text-white">
      {/* ─── HEADER SECTION ─── */}
      <motion.header initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-900/40">
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-purple-400">Class 11 ISC Psychology • Cognitive Systems</span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 text-xs">
          <span className="text-slate-400">Phase:</span>
          <span className="font-bold uppercase text-purple-300">{phase}</span>
          <span className="text-slate-600">|</span>
          <motion.span key={difficulty} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className={`font-bold px-2 py-0.5 rounded-md ${difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border border-rose-800' : 'bg-indigo-950 text-indigo-400 border border-indigo-800'}`}>
            {difficulty.toUpperCase()}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-purple-950/60 to-slate-900 rounded-2xl border border-purple-800/60 shadow-xl">
            <h2 className="text-lg font-bold text-purple-300 flex items-center gap-2">
              <span>🔬</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-purple-400/90 mt-2 bg-purple-950/80 p-2.5 rounded-lg border border-purple-800/40">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
              <span>💡</span>
              <span>Curiosity Exploration Probe (Non-graded inquiry):</span>
            </div>
            <p className="text-base text-white font-medium">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${option}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${discoveryAnswered ? (idx === DISCOVERY_QUESTION.correctIndex ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60') : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-purple-500'}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs text-slate-300 font-bold">{String.fromCharCode(65 + idx)}</span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs sm:text-sm text-purple-200">{discoveryCorrect ? '🎯 Spot on! New learning can disrupt older memories via retroactive interference.' : DISCOVERY_QUESTION.hintAfter}</p>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdvanceToExploration} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-900/50 whitespace-nowrap">
                  Explore The Cognitive Architecture →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          {/* STEP HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Guided Interactive Lab</span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              {EXPLORATION_STEPS.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-purple-500' : 'w-2 bg-slate-700'}`} />
              ))}
            </div>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>

          {/* MULTI-REPRESENTATION VISUAL VIEW SWITCHER */}
          <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>📊</span> Multi-Representation Viewport:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setRepresentationMode('graph')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${representationMode === 'graph' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                1. Ebbinghaus Decay Graph
              </button>
              <button
                onClick={() => setRepresentationMode('architecture')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${representationMode === 'architecture' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                2. Dual-Coding Schema
              </button>
              <button
                onClick={() => setRepresentationMode('creativityFlow')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${representationMode === 'creativityFlow' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                3. Wallas Creative Cycle
              </button>
            </div>
          </div>

          {/* DYNAMIC SVG MULTI-REPRESENTATION CONTAINER */}
          {representationMode === 'graph' && (
            <ForgettingCurveSVG timeDays={timeDaysElapsed} retentionPercent={calculatedRetention} practiceMode={practiceMode} dualCoding={dualCodingActive} />
          )}
          {representationMode === 'architecture' && (
            <DualCodingArchitectureSVG dualCodingActive={dualCodingActive} />
          )}
          {representationMode === 'creativityFlow' && (
            <WallasCreativityFlowSVG activeStage={creativeStage} />
          )}

          {/* DYNAMIC INTERACTIVE LAB VISUALIZATION CONTAINER */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6">
            {/* SLIDE 0: TRACE DECAY & INTERFERENCE SIMULATOR */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300">Time Elapsed: {timeDaysElapsed} Day(s)</label>
                    <span className="text-xs text-purple-400 font-bold">{timeDaysElapsed * 24} hours</span>
                  </div>
                  <input type="range" min={1} max={30} value={timeDaysElapsed} onChange={(e) => handleTimeSliderChange(Number(e.target.value))} aria-label="Adjust time elapsed in days" className="w-full accent-purple-500" />

                  <div className="flex items-center justify-between pt-2">
                    <label className="text-xs font-semibold text-slate-300">Subject Similarity: {subjectSimilarity}%</label>
                    <span className="text-xs text-rose-400">Interference Risk</span>
                  </div>
                  <input type="range" min={10} max={100} value={subjectSimilarity} onChange={(e) => setSubjectSimilarity(Number(e.target.value))} aria-label="Adjust similarity between studied subjects" className="w-full accent-rose-500" />

                  <div className="flex flex-wrap gap-2 pt-2">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRehearsalBoost} className="px-4 py-2 bg-purple-900/60 hover:bg-purple-900 border border-purple-700 text-purple-200 rounded-xl text-xs font-bold">
                      ⚡ Active Rehearsal (+Engram Strength)
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setInterferenceType((p) => (p === 'retroactive' ? 'proactive' : p === 'proactive' ? 'none' : 'retroactive'))} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold">
                      Mode: {interferenceType.toUpperCase()}
                    </motion.button>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Live Brain Retention Meter</span>
                    <div className="mt-3 flex items-end gap-3">
                      <span className="text-4xl font-black text-purple-400">{calculatedRetention}%</span>
                      <span className="text-xs text-slate-400 pb-1">Retrievable Memory</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full mt-2 overflow-hidden">
                      <motion.div animate={{ width: `${calculatedRetention}%` }} className={`h-full rounded-full transition-all duration-300 ${calculatedRetention > 65 ? 'bg-emerald-500' : calculatedRetention > 35 ? 'bg-amber-500' : 'bg-rose-500'}`} />
                    </div>
                  </div>

                  {/* Canvas Waveform */}
                  <div className="mt-4">
                    <canvas ref={canvasRef} width={380} height={70} className="w-full rounded-lg bg-slate-900/60 border border-slate-800" />
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 1: DUAL CODING & DISTRIBUTED PRACTICE */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                {/* PREDICTION HOOK */}
                {!predictionMade ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-purple-900/60 space-y-3">
                    <p className="text-sm font-semibold text-purple-200">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handlePrediction(i)} className="p-3 text-left bg-slate-900 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-600 rounded-xl text-xs text-slate-300">
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                    ✓ Prediction recorded: {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex ? 'Accurate hypothesis!' : 'Hypothesis noted.'} {PREDICTION_QUESTIONS[0].verifyInstruction}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase">Dual-Coding Architecture (Paivio)</span>
                    <div className="flex items-center gap-3">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleToggleDualCoding} className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${dualCodingActive ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                        {dualCodingActive ? '✓ Dual Coding Enabled (Verbal + Visual)' : '+ Activate Mental Imagery'}
                      </motion.button>
                    </div>
                    <p className="text-xs text-slate-400">
                      {dualCodingActive ? '🧠 Two independent neural retrieval routes active: Verbal linguistic semantic pathway + Visual-spatial cortical pathway.' : 'Single verbal code active. Memory trace is vulnerable to cue-retrieval failure.'}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs text-slate-400 font-bold uppercase">Practice Scheduling</span>
                    <div className="flex gap-2">
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleTogglePracticeMode('massed')} className={`flex-1 py-2 rounded-xl text-xs font-bold border ${practiceMode === 'massed' ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                        Massed (4h Cram)
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleTogglePracticeMode('distributed')} className={`flex-1 py-2 rounded-xl text-xs font-bold border ${practiceMode === 'distributed' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                        Distributed (1h × 4d)
                      </motion.button>
                    </div>
                    <p className="text-xs text-slate-400">
                      {practiceMode === 'distributed' ? '✨ Optimal synaptic consolidation occurs during intervals. Minimal retroactive interference.' : '⚠️ High cognitive fatigue, shallow encoding, high interference between packed chapters.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 2: CONCEPTS & SEMANTIC NEURAL MAP */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveConceptType('natural')} className={`px-4 py-2 rounded-xl text-xs font-bold border ${activeConceptType === 'natural' ? 'bg-purple-950 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    Natural Concept (Fuzzy Prototypes)
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveConceptType('artificial')} className={`px-4 py-2 rounded-xl text-xs font-bold border ${activeConceptType === 'artificial' ? 'bg-purple-950 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    Artificial Concept (Formal Rules)
                  </motion.button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeConceptType === 'natural' ? (
                    <>
                      {['Sparrow (Prototype - High Typicality)', 'Penguin (Atypical Edge Member)', 'Bat (Mammal Excluded)'].map((item, idx) => (
                        <motion.div key={idx} whileHover={{ scale: 1.03 }} onClick={() => setSelectedConceptItem(item)} className={`p-4 rounded-xl cursor-pointer border text-xs font-semibold ${selectedConceptItem === item ? 'bg-purple-900/60 border-purple-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                          <div className="text-lg mb-1">{idx === 0 ? '🐦' : idx === 1 ? '🐧' : '🦇'}</div>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </>
                  ) : (
                    <>
                      {['Equilateral Triangle (3 Equal Sides)', 'Right Triangle (90° Angle)', 'Quadrilateral (4 Sides - Excluded)'].map((item, idx) => (
                        <motion.div key={idx} whileHover={{ scale: 1.03 }} onClick={() => setSelectedConceptItem(item)} className={`p-4 rounded-xl cursor-pointer border text-xs font-semibold ${selectedConceptItem === item ? 'bg-purple-900/60 border-purple-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                          <div className="text-lg mb-1">{idx === 0 ? '🔺' : idx === 1 ? '📐' : '⬛'}</div>
                          <span>{item}</span>
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <strong className="text-purple-300">Cognitive Schema Note:</strong> {activeConceptType === 'natural' ? 'Natural concepts (Eleanor Rosch) are defined by similarity distance to a central prototype from everyday experience.' : 'Artificial concepts are mathematically strict: membership is all-or-none based on formal attributes.'}
                </p>
              </div>
            )}

            {/* SLIDE 3: EXPECTED UTILITY & PROBLEM SOLVING */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-slate-300">Success Probability (p): {utilityProbability}%</label>
                    <input type="range" min={10} max={90} value={utilityProbability} onChange={(e) => setUtilityProbability(Number(e.target.value))} className="w-full accent-emerald-500" />

                    <label className="text-xs font-semibold text-slate-300">Gain Utility (u1): +{utilityGain} pts</label>
                    <input type="range" min={10} max={100} value={utilityGain} onChange={(e) => setUtilityGain(Number(e.target.value))} className="w-full accent-indigo-500" />

                    <label className="text-xs font-semibold text-slate-300">Loss Penalty (u2): -{utilityLoss} pts</label>
                    <input type="range" min={0} max={100} value={utilityLoss} onChange={(e) => setUtilityLoss(Number(e.target.value))} className="w-full accent-rose-500" />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Expected Utility Formula</span>
                    <span className="text-xs text-purple-300 font-mono mt-1">EU = (p1 × u1) + (p2 × u2)</span>
                    <div className="mt-4 text-3xl font-black text-emerald-400">{calculatedEU}</div>
                    <span className="text-xs text-slate-400 mt-1">{calculatedEU > 0 ? '✓ Rational Decision Alternative' : '⚠️ Unfavourable Risk Profile'}</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 uppercase font-semibold">Means-End Analysis (Newell & Simon)</span>
                    <p className="text-xs text-indigo-300 font-medium">Goal: Score 95% in ISC Psychology</p>
                    <div className="space-y-1 text-[11px] text-slate-300">
                      {meansEndSubgoals.map((sub, i) => (
                        <div key={i} className="bg-slate-900 p-1.5 rounded border border-slate-800">
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SLIDE 4: WALLAS\'S 4 CREATIVE THINKING STAGES */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { title: '1. Preparation', desc: 'Conscious research & study', icon: '📚' },
                    { title: '2. Incubation', desc: 'Unconscious mind wandering', icon: '🧘' },
                    { title: '3. Illumination', desc: 'Sudden "Aha!" insight', icon: '💡' },
                    { title: '4. Verification', desc: 'Logical validation & testing', icon: '🔬' },
                  ].map((stage, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setCreativeStage(idx as 0 | 1 | 2 | 3)}
                      className={`p-3 text-left rounded-xl border transition-all ${creativeStage === idx ? 'bg-purple-950 border-purple-500 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <div className="text-xl mb-1">{stage.icon}</div>
                      <div className="text-xs font-bold">{stage.title}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{stage.desc}</div>
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-400 font-bold uppercase">Active Divergent Idea Pool (Kulhad Uses)</span>
                    <span className="text-xs text-slate-400">{divergentItemCount} original variants</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {['Terracotta Tea Cup', 'Garden Succulent Pot', 'Acoustic Sound Reflector', 'Diya Oil Lamp', 'Bio-degradable Seed Starter'].slice(0, divergentItemCount + 1).map((idea, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-950/80 border border-purple-700 text-purple-200 text-xs rounded-lg">
                        ✦ {idea}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setDivergentItemCount((p) => Math.min(p + 1, 4))} className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-semibold">
                      + Generate Divergent Association
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* EXPLORATION NAVIGATION */}
          <div className="flex items-center justify-between pt-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))} disabled={currentSlide === 0} className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40">
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-medium text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentSlide((s) => s + 1)} className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                Next Model →
              </motion.button>
            ) : (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdvanceToSandbox} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40">
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎮</span> Cognitive Sandbox & Brain Explorer
              </h2>
              <p className="text-xs text-slate-400 mt-1">Manipulate cognitive parameters freely. Test any hypothesis without grading pressure.</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAdvanceToChallenge} className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-900/50">
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Brain Map */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Interactive Neuroanatomy</span>
              <div className="grid grid-cols-2 gap-2">
                {(['hippocampus', 'prefrontal', 'temporal', 'amygdala'] as const).map((lobe) => (
                  <motion.button
                    key={lobe}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleLobeSelect(lobe)}
                    className={`p-3 text-left rounded-xl border text-xs font-semibold capitalize ${selectedLobe === lobe ? 'bg-purple-950 border-purple-400 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    🧠 {lobe}
                  </motion.button>
                ))}
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed min-h-[80px]">
                {selectedLobe === 'hippocampus' && 'Hippocampus: Converts working memory into long-term declarative engrams. Damaged in anterograde amnesia and early Alzheimer\'s.'}
                {selectedLobe === 'prefrontal' && 'Dorsolateral Prefrontal Cortex: Orchestrates working memory, means-end analysis, and suppression of impulsive cognitive errors.'}
                {selectedLobe === 'temporal' && 'Temporal Lobe: Synthesizes semantic memory, linguistic concepts, and categorical associations.'}
                {selectedLobe === 'amygdala' && 'Amygdala: Encodes emotional significance; heightened arousal can bias reasoning and trigger single-cause fallacies.'}
              </div>
            </div>

            {/* Interference Sandbox Controls */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Memory Dynamics</span>
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Time Disuse: {timeDaysElapsed} Days</span>
                  <span>Ret: {calculatedRetention}%</span>
                </div>
                <input type="range" min={1} max={30} value={timeDaysElapsed} onChange={(e) => setTimeDaysElapsed(Number(e.target.value))} className="w-full accent-purple-500" />
                <div className="flex gap-2 pt-2">
                  <button onClick={handleToggleDualCoding} className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${dualCodingActive ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                    Dual-Coding
                  </button>
                  <button onClick={() => handleTogglePracticeMode(practiceMode === 'massed' ? 'distributed' : 'massed')} className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                    {practiceMode.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>

            {/* Reasoning & Emotion Balance */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Reasoning Regulation</span>
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Affective Arousal: {reasoningEmotionLevel}%</span>
                  <span className={reasoningEmotionLevel > 50 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>{reasoningEmotionLevel > 50 ? 'High Bias' : 'Sound Logic'}</span>
                </div>
                <input type="range" min={0} max={100} value={reasoningEmotionLevel} onChange={(e) => setReasoningEmotionLevel(Number(e.target.value))} className="w-full accent-rose-500" />
                <p className="text-xs text-slate-400">
                  {reasoningEmotionLevel > 50 ? '⚠️ High emotional arousal activates the amygdala and increases vulnerability to confirmation bias and single-cause fallacies.' : '✓ Balanced emotional state allows prefrontal deliberative reasoning and premise validation.'}
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: STRUCTURED ADAPTIVE CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          {/* CHALLENGE STATUS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-800 text-purple-300 font-semibold uppercase">{challenge.competencyLevel}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs text-slate-400">
                Score: <span className="font-bold text-emerald-400">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={showNextHint} disabled={hintCount >= 3 || showExplanation} className="px-3 py-1 bg-amber-950/60 hover:bg-amber-900 border border-amber-700 text-amber-300 rounded-lg text-xs font-bold disabled:opacity-30">
                💡 Hint ({hintCount}/3)
              </motion.button>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }} />
          </div>

          {/* MAIN CHALLENGE CARD CONTAINER */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
            className={`p-6 rounded-2xl border transition-all duration-300 ${wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'bg-slate-900/90 border-slate-800'}`}
          >
            <p className="text-base sm:text-lg text-white font-semibold leading-relaxed mb-6">{challenge.question}</p>

            {/* CHALLENGE TYPE: MCQ */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={showExplanation || answerRevealed}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${option}`}
                    className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                      showExplanation
                        ? idx === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/30'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-50'
                        : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 hover:border-purple-500 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0">{String.fromCharCode(65 + idx)}</span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* CHALLENGE TYPE: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each cognitive label into its matching box:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-purple-900/80 hover:bg-purple-900 border border-purple-600 rounded-xl text-xs font-bold text-white cursor-grab active:cursor-grabbing"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'target_sensory', title: 'Internal Sensory-like Representation' },
                    { id: 'target_category', title: 'Mental Class / Categorization Schema' },
                    { id: 'target_symbolic', title: 'Rule-Governed Arbitrary Symbol System' },
                  ].map((tgt) => (
                    <div
                      key={tgt.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(tgt.id)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-between min-h-[110px] transition-all ${droppedLabels[tgt.id] ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-950 border-slate-700'}`}
                    >
                      <span className="text-[11px] font-semibold text-slate-400">{tgt.title}</span>
                      <div className="mt-2 text-xs font-bold text-emerald-300">{droppedLabels[tgt.id] || 'Drop matching label here'}</div>
                    </div>
                  ))}
                </div>

                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(droppedLabels)} disabled={showExplanation || Object.keys(droppedLabels).length < 3} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold disabled:opacity-40">
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* CHALLENGE TYPE: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">Drag items to rearrange into correct chronological order:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx) => challenge.sortItems![idx]) : challenge.sortItems).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => setDraggedItem(String(idx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, idx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-md bg-purple-900/60 flex items-center justify-center font-bold text-purple-300">{idx + 1}</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3])} disabled={showExplanation} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold">
                  Check Ordered Progression
                </motion.button>
              </div>
            )}

            {/* CHALLENGE TYPE: NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Enter numerical answer"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(numericInput)} disabled={showExplanation || !numericInput} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold disabled:opacity-40">
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* CHALLENGE TYPE: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => (prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${constructParts.includes(part) ? 'bg-purple-950 border-purple-400 text-purple-200' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '}
                      {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] text-xs text-purple-300 flex flex-wrap gap-2 items-center">
                  {constructParts.length > 0 ? constructParts.map((p, i) => <span key={i} className="px-2 py-1 bg-purple-900/60 rounded border border-purple-700">✦ {p}</span>) : <span className="text-slate-500">Click components above to assemble the model</span>}
                </div>

                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => handleAnswer(constructParts.join(' + '))} disabled={showExplanation || constructParts.length === 0} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold disabled:opacity-40">
                  Verify Synthesized Model
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-purple-950/40 border border-purple-800/80 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
                  <span>📘</span> Step-by-Step Psychological Explanation:
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                        <strong className="text-purple-400">{idx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setRevealedSteps((s) => s + 1)} className="px-4 py-2 bg-purple-800/80 hover:bg-purple-700 text-white rounded-xl text-xs font-bold">
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleNextChallenge} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40">
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Review →' : 'Next Board Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-purple-950/80 to-slate-900 rounded-2xl border border-purple-800 shadow-xl text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">Curriculum Mastery Achieved!</h2>
            <p className="text-sm text-slate-300">ISC Class 11 Psychology • Memory & Thought Mastery</p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Final Score</span>
                <div className="text-3xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">BKT Mastery Tier</span>
                <div className="text-3xl font-black text-purple-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK WITH EXACT STRINGS REQUIRED */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-purple-950/50 rounded-2xl border border-purple-800/80 text-center space-y-2">
            <span className="text-xs text-purple-400 uppercase font-bold tracking-widest">Evaluator Assessment</span>
            <div className="text-2xl font-black text-white tracking-tight">{motivationalMessage}</div>
            <p className="text-xs text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? 'Flawless performance! You have complete mastery of neural trace decay, dual-coding mnemonics, concept formation schemas, syllogistic reasoning, expected utility, and Graham Wallas\'s four creative stages.'
                : errors <= 3
                ? 'Excellent grasp of cognitive architectures and memory improvement paradigms. Solid foundation for the ISC board examination.'
                : errors <= 7
                ? 'Good effort throughout the assessment. Revisit the dual-coding lab and the interference sandbox to master the nuances.'
                : 'Every attempt strengthens your neural pathways. Review the misconception notes below and try again!'}
            </p>
          </div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Targeted Misconception Profile & Corrections:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Clinical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SPACED REPETITION SCHEDULE */}
          <div className="p-4 bg-purple-950/30 rounded-2xl border border-purple-800/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-purple-300">Spaced Repetition Schedule (SM-2 Interval): </span>
              <span className="text-slate-300">Next review recommended in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to optimize synaptic engram stability.</span>
            </div>
          </div>

          {/* CAPSTONE REAL-WORLD ACTIVITY */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-purple-400">Step {idx + 1}:</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Tier Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PsychologyForgettingOccursSim;