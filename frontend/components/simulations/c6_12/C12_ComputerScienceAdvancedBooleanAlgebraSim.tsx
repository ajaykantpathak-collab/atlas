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

// ─── ISC CLASS 12 COMPUTER SCIENCE NODE IDENTIFIERS ───
const NODE_C12_CS_001 = 'c12_cs_001'; // Advanced Boolean algebra - consensus, absorption, redundancy
const NODE_C12_CS_002 = 'c12_cs_002'; // Quine-McCluskey tabular minimisation & prime implicants
const NODE_C12_CS_003 = 'c12_cs_003'; // Adders & subtractors - ripple carry, look-ahead carry
const NODE_C12_CS_004 = 'c12_cs_004'; // Sequential circuits - counters, shift registers, FSMs
const NODE_C12_CS_005 = 'c12_cs_005'; // Encoders, decoders, multiplexers, and 7-segment displays
const NODE_C12_CS_006 = 'c12_cs_006'; // Architecture - pipelining, RISC vs CISC, Flynn's taxonomy
const NODE_C12_CS_007 = 'c12_cs_007'; // Memory management - paging, segmentation, virtual memory, cache
const NODE_C12_CS_008 = 'c12_cs_008'; // OS - scheduling (FCFS, SJF, RR), deadlocks, 5-state process
const NODE_C12_CS_009 = 'c12_cs_009'; // Java OOP design patterns (Singleton, Factory, Observer, MVC)
const NODE_C12_CS_010 = 'c12_cs_010'; // Java 8 lambdas, functional interfaces, and Stream API

const ALL_NODE_IDS = [
  NODE_C12_CS_001,
  NODE_C12_CS_002,
  NODE_C12_CS_003,
  NODE_C12_CS_004,
  NODE_C12_CS_005,
  NODE_C12_CS_006,
  NODE_C12_CS_007,
  NODE_C12_CS_008,
  NODE_C12_CS_009,
  NODE_C12_CS_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Project Param-Shakti: Next-Gen Silicon & OS Architecture',
  intro:
    'You are the lead computer architect and systems engineer at C-DAC Pune. Your mission: architect a high-speed RISC coprocessor, optimise Boolean logic cores, eliminate memory thrashing, and write modern Java 8 telemetry interfaces for India’s next supercomputing cluster.',
  context:
    'From fundamental gate reduction (Consensus theorem & Quine-McCluskey) to Look-Ahead Carry ALUs, 5-stage instruction pipelining, and virtual memory address translation, every nanosecond and transistor counts.',
};

// ─── DISCOVERY HOOK (PRE-EXPLORATION PUZZLE) ───
const DISCOVERY_QUESTION = {
  question:
    'Look at this digital control logic for an emergency cooling pump: F = AB + A\'C + BC. A junior engineer orders 3 AND gates and 1 OR gate. Can you save silicon area without changing the output behavior for ANY input?',
  options: [
    'No — all 3 terms are essential because B and C both activate the pump in distinct modes.',
    'Yes — the term BC is entirely redundant by the Consensus Theorem (A bridge cancels BC).',
    'Yes — replace everything with a single NOT gate.',
    'No — eliminating BC will cause pump failure whenever A=0, B=1, C=1.',
  ],
  correctIndex: 1,
  hintAfter:
    'Notice that when A=1, the AB term covers B=1; when A=0, the A\'C term covers C=1. Thus whenever BC=1, either AB or A\'C is already 1! BC adds zero new true conditions.',
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS ───

// SVG Diagram 1: Boolean Consensus Logic Circuit
function BooleanConsensusSVG({ a, b, c, termAB, termNotAC, termBC, out }: { a: boolean; b: boolean; c: boolean; termAB: boolean; termNotAC: boolean; termBC: boolean; out: boolean }) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
      <div className="text-xs font-bold text-gold-400 mb-2 flex items-center justify-between">
        <span>⚡ Schematic 1: Consensus Logic Core (F = AB + A&apos;C + BC)</span>
        <span className="text-[10px] text-amber-400 font-mono">Consensus: BC Redundant</span>
      </div>
      <svg viewBox="0 0 540 220" className="w-full h-auto max-h-56 select-none font-mono">
        <defs>
          <linearGradient id="gateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="redundantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Input Signal Rails */}
        {/* Rail A */}
        <text x="15" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold">A={a ? '1' : '0'}</text>
        <line x1="45" y1="38" x2="180" y2="38" stroke={a ? '#38bdf8' : '#475569'} strokeWidth="2" />
        <line x1="80" y1="38" x2="80" y2="105" stroke={a ? '#38bdf8' : '#475569'} strokeWidth="2" />

        {/* NOT Gate on A */}
        <polygon points="80,100 105,105 80,110" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <circle cx="109" cy="105" r="3.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="113" y1="105" x2="180" y2="105" stroke={!a ? '#38bdf8' : '#475569'} strokeWidth="2" />
        <text x="118" y="99" fill="#94a3b8" fontSize="9">A&apos;={!a ? '1' : '0'}</text>

        {/* Rail B */}
        <text x="15" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold">B={b ? '1' : '0'}</text>
        <line x1="45" y1="62" x2="180" y2="62" stroke={b ? '#38bdf8' : '#475569'} strokeWidth="2" />
        <line x1="125" y1="62" x2="125" y2="165" stroke={b ? '#38bdf8' : '#475569'} strokeWidth="2" />
        <line x1="125" y1="165" x2="180" y2="165" stroke={b ? '#38bdf8' : '#475569'} strokeWidth="2" />

        {/* Rail C */}
        <text x="15" y="130" fill="#38bdf8" fontSize="11" fontWeight="bold">C={c ? '1' : '0'}</text>
        <line x1="45" y1="125" x2="180" y2="125" stroke={c ? '#38bdf8' : '#475569'} strokeWidth="2" />
        <line x1="150" y1="125" x2="150" y2="188" stroke={c ? '#38bdf8' : '#475569'} strokeWidth="2" />
        <line x1="150" y1="188" x2="180" y2="188" stroke={c ? '#38bdf8' : '#475569'} strokeWidth="2" />

        {/* AND Gate 1: AB */}
        <g transform="translate(180, 25)">
          <path d="M 0,0 L 25,0 A 25,25 0 0,1 25,50 L 0,50 Z" fill="url(#gateGrad)" stroke="#6366f1" strokeWidth="2" />
          <text x="12" y="29" fill="#e0e7ff" fontSize="10" fontWeight="bold">AND</text>
          <text x="58" y="29" fill={termAB ? '#4ade80' : '#64748b'} fontSize="11" fontWeight="bold">AB={termAB ? '1' : '0'}</text>
          <line x1="50" y1="25" x2="350" y2="25" stroke={termAB ? '#4ade80' : '#475569'} strokeWidth="2" />
        </g>

        {/* AND Gate 2: A'C */}
        <g transform="translate(180, 92)">
          <path d="M 0,0 L 25,0 A 25,25 0 0,1 25,50 L 0,50 Z" fill="url(#gateGrad)" stroke="#6366f1" strokeWidth="2" />
          <text x="12" y="29" fill="#e0e7ff" fontSize="10" fontWeight="bold">AND</text>
          <text x="58" y="29" fill={termNotAC ? '#4ade80' : '#64748b'} fontSize="11" fontWeight="bold">A&apos;C={termNotAC ? '1' : '0'}</text>
          <line x1="50" y1="25" x2="350" y2="25" stroke={termNotAC ? '#4ade80' : '#475569'} strokeWidth="2" />
        </g>

        {/* AND Gate 3: BC (Consensus - Redundant) */}
        <g transform="translate(180, 155)">
          <path d="M 0,0 L 25,0 A 25,25 0 0,1 25,50 L 0,50 Z" fill="url(#redundantGrad)" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
          <text x="10" y="29" fill="#fef3c7" fontSize="9" fontWeight="bold">AND*</text>
          <text x="58" y="29" fill={termBC ? '#fbbf24' : '#78716c'} fontSize="11" fontWeight="bold">BC={termBC ? '1' : '0'} [ELIMINATE]</text>
          <line x1="50" y1="25" x2="350" y2="25" stroke={termBC ? '#fbbf24' : '#475569'} strokeWidth="1.5" strokeDasharray="4,4" />
        </g>

        {/* OR Gate */}
        <g transform="translate(350, 75)">
          <path d="M 0,0 C 18,15 18,45 0,60 C 35,60 55,42 65,30 C 55,18 35,0 0,0 Z" fill="url(#gateGrad)" stroke="#818cf8" strokeWidth="2" />
          <text x="16" y="34" fill="#e0e7ff" fontSize="11" fontWeight="bold">OR</text>
          <line x1="65" y1="30" x2="110" y2="30" stroke={out ? '#22c55e' : '#64748b'} strokeWidth="3" filter={out ? 'url(#glow)' : undefined} />
          <circle cx="115" cy="30" r="5" fill={out ? '#22c55e' : '#334155'} stroke="#fff" strokeWidth="1.5" />
          <text x="125" y="34" fill={out ? '#4ade80' : '#94a3b8'} fontSize="13" fontWeight="black">F = {out ? '1' : '0'}</text>
        </g>
      </svg>
    </div>
  );
}

// SVG Diagram 2: Carry Look-Ahead ALU (CLA Architecture)
function CarryLookAheadSVG({ opA, opB, claSignals }: { opA: number; opB: number; claSignals: any }) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
      <div className="text-xs font-bold text-gold-400 mb-2 flex items-center justify-between">
        <span>⚡ Schematic 2: 4-Bit Carry Look-Ahead Generator (CLA ALU)</span>
        <span className="text-[10px] text-emerald-400 font-mono">Propagation: O(1) Parallel</span>
      </div>
      <svg viewBox="0 0 540 210" className="w-full h-auto max-h-56 select-none font-mono">
        <defs>
          <linearGradient id="claGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        {/* Input Registers A & B */}
        <rect x="20" y="15" width="490" height="32" rx="6" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1.5" />
        <text x="35" y="35" fill="#a5b4fc" fontSize="11" fontWeight="bold">Input Operands:</text>
        <text x="160" y="35" fill="#38bdf8" fontSize="11">A = {opA.toString(2).padStart(4, '0')} ({opA})</text>
        <text x="300" y="35" fill="#38bdf8" fontSize="11">B = {opB.toString(2).padStart(4, '0')} ({opB})</text>
        <text x="440" y="35" fill="#f59e0b" fontSize="11">Cin = 0</text>

        {/* 4 Bit Slices (Gi, Pi) */}
        {[0, 1, 2, 3].map((bit) => {
          const x = 35 + bit * 120;
          return (
            <g key={bit} transform={`translate(${x}, 58)`}>
              <rect x="0" y="0" width="105" height="42" rx="5" fill="#0284c7" fillOpacity="0.15" stroke="#0284c7" strokeWidth="1.2" />
              <text x="8" y="16" fill="#38bdf8" fontSize="9" fontWeight="bold">Bit {bit} Unit</text>
              <text x="8" y="33" fill="#cbd5e1" fontSize="9">G{bit}={claSignals.G[bit]} | P{bit}={claSignals.P[bit]}</text>
              <line x1="52" y1="42" x2="52" y2="58" stroke="#38bdf8" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Central Carry Look-Ahead Generator Unit */}
        <rect x="35" y="118" width="470" height="40" rx="6" fill="url(#claGrad)" stroke="#38bdf8" strokeWidth="2" />
        <text x="48" y="142" fill="#7dd3fc" fontSize="11" fontWeight="bold">Carry Look-Ahead Logic Unit [Parallel Ci Equations]</text>
        <text x="390" y="142" fill="#34d399" fontSize="10">Delay: 2 Gate Levels</text>

        {/* Sum Bit Outputs */}
        {[0, 1, 2, 3].map((bit) => {
          const x = 35 + bit * 120;
          return (
            <g key={bit} transform={`translate(${x}, 168)`}>
              <rect x="0" y="0" width="105" height="32" rx="5" fill="#065f46" fillOpacity="0.3" stroke="#059669" strokeWidth="1.2" />
              <text x="14" y="20" fill="#a7f3d0" fontSize="10" fontWeight="bold">S{bit} = {claSignals.Sum[bit]} (P{bit}⊕C{bit})</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// SVG Diagram 3: 5-Stage CPU Instruction Pipeline Architecture
function PipelineStageDiagramSVG({ pipeCycle, pipeStall }: { pipeCycle: number; pipeStall: boolean }) {
  const stages = [
    { name: 'IF', full: 'Fetch', desc: 'Read PC & Instr RAM' },
    { name: 'ID', full: 'Decode', desc: 'Opcode & Reg Read' },
    { name: 'EX', full: 'Execute', desc: 'ALU Op / Branch' },
    { name: 'MEM', full: 'Memory', desc: 'Data RAM Load/Store' },
    { name: 'WB', full: 'Writeback', desc: 'Commit to Register' },
  ];

  return (
    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800">
      <div className="text-xs font-bold text-gold-400 mb-2 flex items-center justify-between">
        <span>⚡ Schematic 3: 5-Stage RISC Processor Pipelining Architecture</span>
        <span className="text-[10px] text-gold-400 font-mono">Cycle {pipeCycle} | Steady Throughput: 1 IPC</span>
      </div>
      <svg viewBox="0 0 540 180" className="w-full h-auto max-h-52 select-none font-mono">
        <defs>
          <linearGradient id="pipeActive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#312e81" />
          </linearGradient>
          <linearGradient id="pipeStallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>
        </defs>

        {stages.map((st, i) => {
          const x = 15 + i * 105;
          const instrNum = pipeCycle - i;
          const isActive = instrNum >= 1 && instrNum <= 5;
          const isStalled = pipeStall && i === 1;

          return (
            <g key={st.name} transform={`translate(${x}, 15)`}>
              {/* Stage Box */}
              <rect
                x="0"
                y="0"
                width="95"
                height="120"
                rx="8"
                fill={isStalled ? 'url(#pipeStallGrad)' : isActive ? 'url(#pipeActive)' : '#0f172a'}
                stroke={isStalled ? '#ef4444' : isActive ? '#818cf8' : '#334155'}
                strokeWidth={isActive ? '2' : '1'}
              />
              <rect x="0" y="0" width="95" height="24" rx="8" fill="#1e1b4b" fillOpacity="0.6" />
              <text x="47" y="16" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">{st.name}</text>
              <text x="47" y="38" fill="#94a3b8" fontSize="9" textAnchor="middle">{st.full}</text>

              {/* Instruction Badge */}
              <rect x="10" y="48" width="75" height="30" rx="5" fill="#020617" stroke="#475569" strokeWidth="1" />
              <text
                x="47"
                y="68"
                fill={isStalled ? '#fca5a5' : isActive ? '#38bdf8' : '#64748b'}
                fontSize="12"
                fontWeight="black"
                textAnchor="middle"
              >
                {isStalled ? 'BUBBLE' : isActive ? `Instr #${instrNum}` : 'IDLE'}
              </text>

              <text x="47" y="96" fill="#cbd5e1" fontSize="7.5" textAnchor="middle">{st.desc}</text>
              <text x="47" y="108" fill="#a5b4fc" fontSize="7" textAnchor="middle">Lat: 1.0 ns</text>

              {/* Inter-stage Register Arrow */}
              {i < 4 && (
                <path d="M 98,60 L 105,60" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrow)" />
              )}
            </g>
          );
        })}

        {/* Global Clock Line */}
        <line x1="20" y1="155" x2="520" y2="155" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4,4" />
        <text x="270" y="172" fill="#38bdf8" fontSize="9" textAnchor="middle">Synchronous Master Clock Edge Trigger (3.2 GHz)</text>
      </svg>
    </div>
  );
}

// ─── CHALLENGE DEFINITION INTERFACE ───
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

// ─── COMPREHENSIVE CHALLENGES POOL (22 CHALLENGES) ───
const CHALLENGES: Challenge[] = [
  // --- c12_cs_001: Advanced Boolean Algebra ---
  {
    id: 'ch_01',
    nodeId: NODE_C12_CS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'In the Boolean expression F = AB + A\'C + BC, which term represents the consensus term, and why can it be eliminated?',
    options: [
      'AB, because A is uncomplemented',
      'A\'C, because it contains the complemented literal A\'',
      'BC, because B comes from AB and C from A\'C across the opposing literal A and A\'',
      'None; removing any term alters the truth table',
    ],
    correctIndex: 2,
    explanation:
      'The Consensus Theorem states that XY + X\'Z + YZ = XY + X\'Z. The term YZ (here BC) is formed from the unshared literals of two terms containing a variable in true and complemented forms. It is mathematically redundant because BC = (A + A\')BC = ABC + A\'BC, where ABC is absorbed by AB and A\'BC is absorbed by A\'C.',
    hints: [
      'Look for the pair of terms that share variable A in inverted states (A and A\').',
      'The third term consists of the remaining literals from that pair.',
      'BC is the consensus term because (A + A\')BC expands into terms already absorbed by AB and A\'C.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_CS_001,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Construct the simplified form of the redundant expression: P + P\'Q using basic Boolean theorems.',
    availableParts: ['P', '+', 'Q', 'P\'', 'PQ', '.', '1', '0'],
    targetState: 'P + Q',
    validationHint: 'Use the distributive expansion (P + P\')(P + Q) to simplify P + P\'Q.',
    explanation:
      'By the Redundancy Theorem (Third Law), P + P\'Q = (P + P\')(P + Q). Since (P + P\') = 1 by the complement law, 1 · (P + Q) = P + Q. The complemented literal P\' in the second term is completely eliminated.',
    hints: [
      'Apply the distributive law: A + BC = (A + B)(A + C).',
      'Here, let A = P, B = P\', and C = Q. What does (P + P\') evaluate to?',
      'Since (P + P\') = 1, the result simplifies cleanly to P + Q.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_CS_001,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'An ISRO satellite telemetry logic designer replaces expression E1 = A + AB with its dual E2 = A · (A + B). What law relates E1 = A and E2 = A, and how does taking a dual differ from taking a complement?',
    options: [
      'Absorption Law; Duality swaps only operators (+ <-> ·) and identity elements (0 <-> 1) leaving literals untouched, whereas Complementation inverts literals too.',
      'Consensus Law; Duality negates every variable while leaving operators unchanged.',
      'De Morgan’s Law; Duality and Complementation are identical operations in POS form.',
      'Involution Law; Duals always result in the complement of the original Boolean function.',
    ],
    correctIndex: 0,
    explanation:
      'Both A + AB = A and A(A + B) = A are forms of the Absorption Law. The Principle of Duality states that any valid Boolean identity remains valid when + and · are interchanged, and 0 and 1 are swapped, while literals remain unchanged. In contrast, complementation negates every literal as well as swapping operators via De Morgan’s laws.',
    hints: [
      'Notice that in A(A+B) = A, no literal was inverted (A didn’t become A\').',
      'The + operator changed to ·, and the product term became a sum term.',
      'Taking a dual preserves variable identities; taking a complement inverts every variable.',
    ],
    misconceptionIndex: 0,
  },

  // --- c12_cs_002: Quine-McCluskey Method ---
  {
    id: 'ch_04',
    nodeId: NODE_C12_CS_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why does the Quine-McCluskey (QM) tabular method group minterms by the number of 1s (Hamming weight) in their binary representations before comparing them?',
    options: [
      'Because minterms can only differ by exactly 1 bit if they belong to adjacent index groups with a count difference of 1.',
      'To sort minterms alphabetically according to variable names.',
      'To eliminate all 0-minterms before starting the reduction table.',
      'Because the method is restricted to 4-variable functions only.',
    ],
    correctIndex: 0,
    explanation:
      'Two binary numbers can differ in exactly one bit position if and only if one number contains exactly one more binary 1 than the other. Grouping by the count of 1s limits comparisons strictly between adjacent groups (Group i with Group i+1), reducing computational comparisons from O(N^2) to a structured partition.',
    hints: [
      'Consider 0100 (one 1) and 0110 (two 1s). They differ by exactly 1 bit.',
      'Can two minterms with the exact same number of 1s (e.g., 0101 and 1010) differ in only one bit position?',
      'No, because changing one bit must change the total count of 1s by +1 or -1.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_CS_002,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the systematic steps of the Quine-McCluskey tabular minimisation algorithm in chronological order.',
    sortItems: [
      'Express minterms in binary and partition into groups by the count of 1s.',
      'Compare adjacent groups to merge terms differing by 1 bit, inserting a dash (-).',
      'Repeat merging across successive tables until no further combinations can be made.',
      'Collect all unmarked terms as Prime Implicants (PIs) and construct the PI Chart.',
      'Identify Essential Prime Implicants (columns with single checkmarks) and formulate minimal cover.',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation:
      'The Quine-McCluskey algorithm proceeds systematically: 1) Group minterms by Hamming weight; 2) Merge 1-bit differing pairs with dashes; 3) Build higher-order combination tables; 4) Extract Prime Implicants from unmarked terms and draw chart; 5) Pick Essential Prime Implicants and cover remaining minterms (using Petrick’s method if needed).',
    hints: [
      'Start with initial binary grouping before attempting any bitwise comparisons.',
      'Merging continues until terms cannot be combined any further.',
      'The Prime Implicant chart is constructed only after all uncombined terms (PIs) are found.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_CS_002,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'In a Prime Implicant chart, how is an Essential Prime Implicant (EPI) rigorously distinguished from a non-essential Prime Implicant?',
    options: [
      'An EPI is the sole prime implicant that covers at least one specific minterm (indicated by a column with exactly one cross/tick).',
      'An EPI has the maximum number of dashes in its binary representation.',
      'An EPI is any implicant that covers minterm m0 (0000).',
      'An EPI is eliminated during Petrick’s algebraic expansion.',
    ],
    correctIndex: 0,
    explanation:
      'In the QM Prime Implicant table, each column represents a minterm. If a minterm column has only a single checkmark (X), the prime implicant in that row is ESSENTIAL because no other implicant can cover that minterm. All EPIs must be included in the minimal Boolean expression.',
    hints: [
      'Look at the minterm columns across the top of the chart.',
      'What happens if a minterm column contains only one single checkmark?',
      'That single implicant is mandatory because omitting it leaves that minterm completely uncovered.',
    ],
  },

  // --- c12_cs_003: Adders and Subtractors ---
  {
    id: 'ch_07',
    nodeId: NODE_C12_CS_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Drag the correct gate designations to complete the Full Adder architecture built from 2 Half Adders and an OR gate.',
    dragItems: [
      { label: 'XOR (HA-1 Sum)', targetId: 'fa_ha1_sum' },
      { label: 'AND (HA-1 Carry)', targetId: 'fa_ha1_carry' },
      { label: 'XOR (HA-2 Sum Out)', targetId: 'fa_ha2_sum' },
      { label: 'OR (Final Carry Out)', targetId: 'fa_cout' },
    ],
    correctMapping: {
      fa_ha1_sum: 'XOR (HA-1 Sum)',
      fa_ha1_carry: 'AND (HA-1 Carry)',
      fa_ha2_sum: 'XOR (HA-2 Sum Out)',
      fa_cout: 'OR (Final Carry Out)',
    },
    explanation:
      'A full adder decomposes into two half adders: HA1 computes intermediate sum S1 = A ⊕ B and carry C1 = A·B. HA2 computes final sum S = S1 ⊕ Cin = A ⊕ B ⊕ Cin and carry C2 = S1·Cin. The final Carry-Out Cout is formed by OR-ing C1 + C2 = AB + (A ⊕ B)Cin.',
    hints: [
      'The sum bit is produced by modulo-2 addition, which is implemented with XOR gates.',
      'Carry generation requires both inputs to be 1, which uses AND gates.',
      'The two intermediate carry outputs (C1 and C2) are combined via a final OR gate.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_CS_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A 32-bit Ripple Carry Adder (RCA) has a full adder stage propagation delay of 1.8 nanoseconds per bit. What is the worst-case carry propagation delay through the entire 32-bit chain in nanoseconds?',
    correctAnswer: 57.6,
    tolerance: 0.1,
    unit: 'ns',
    explanation:
      'In a ripple carry adder, the carry signal must propagate sequentially through all n stages. Worst-case latency = n × t_stage = 32 × 1.8 ns = 57.6 ns. Carry Look-Ahead Adders (CLA) avoid this O(n) delay by generating all carries in parallel in O(1) or O(log n) time.',
    hints: [
      'Recall that a Ripple Carry Adder has linear propagation delay: Total Delay = n × delay_per_stage.',
      'Multiply 32 stages by 1.8 ns per stage.',
      '32 × 1.8 = 57.6 ns.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_CS_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In a 4-bit Carry Look-Ahead Adder, given Generate Gi = AiBi and Propagate Pi = Ai ⊕ Bi, what is the exact parallel Boolean equation for carry C3 in terms of inputs and initial carry C0?',
    options: [
      'C3 = G2 + P2·G1 + P2·P1·G0 + P2·P1·P0·C0',
      'C3 = G3 + P3·C2',
      'C3 = (G0 + P0)(G1 + P1)(G2 + P2) + C0',
      'C3 = G2·G1·G0 + P2·P1·P0·C0',
    ],
    correctIndex: 0,
    explanation:
      'By recursive substitution: C1 = G0 + P0·C0; C2 = G1 + P1·C1 = G1 + P1·G0 + P1·P0·C0; C3 = G2 + P2·C2 = G2 + P2·G1 + P2·P1·G0 + P2·P1·P0·C0. This allows C3 to be computed in two gate levels without waiting for C1 and C2 to settle.',
    hints: [
      'Stage 2 generates a carry if it produces one directly (G2) or propagates one from stage 1 (P2·C2).',
      'Substitute the formula for C2 into C3 = G2 + P2·C2.',
      'Expand: C3 = G2 + P2(G1 + P1·G0 + P1·P0·C0).',
    ],
  },

  // --- c12_cs_004: Sequential Circuits ---
  {
    id: 'ch_10',
    nodeId: NODE_C12_CS_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the fundamental difference between a Mealy finite state machine and a Moore finite state machine?',
    options: [
      'In a Mealy machine, outputs depend on both the present state and current inputs; in a Moore machine, outputs depend strictly on the present state alone.',
      'A Mealy machine has no flip-flops, whereas a Moore machine uses D flip-flops.',
      'A Moore machine has no external inputs, while a Mealy machine has inputs.',
      'A Mealy machine is always asynchronous, whereas a Moore machine is synchronous.',
    ],
    correctIndex: 0,
    explanation:
      'In a Moore machine, output = λ(Present State), meaning outputs are stable during clock periods and change only on active clock edges. In a Mealy machine, output = λ(Present State, Current Input), allowing faster response but introducing susceptibility to input glitches between clock ticks.',
    hints: [
      'Think about what determines the output signals in each model.',
      'In Moore machines, the output is written INSIDE the state bubble on the diagram.',
      'In Mealy machines, the output is written on the transition ARROWS alongside the input (e.g., input/output).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_CS_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'How many distinct clock pulses are required to load a 4-bit parallel byte into a 4-bit SIPO (Serial-In Parallel-Out) shift register, and how many pulses to read all 4 bits at the parallel outputs?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'pulses to load',
    explanation:
      'In a SIPO shift register, serial loading takes n clock pulses (4 pulses for 4 bits, one bit per edge). Once loaded into the flip-flops, the parallel data is available simultaneously at Q3..Q0 in 0 additional clock pulses.',
    hints: [
      'Serial input accepts one bit per clock cycle.',
      'For 4 bits, you must clock the register 4 times to shift all 4 bits in.',
      'Reading from parallel output lines requires 0 extra clock pulses because all pins are read simultaneously.',
    ],
  },

  // --- c12_cs_005: Encoders, Decoders, Multiplexers ---
  {
    id: 'ch_12',
    nodeId: NODE_C12_CS_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'A 4-to-2 Priority Encoder has active inputs D0=1, D1=1, D2=1, and D3=0 (where D3 has the highest priority). What will be the 2-bit binary output Y1 Y0?',
    options: ['10 (binary 2)', '01 (binary 1)', '11 (binary 3)', '00 (binary 0)'],
    correctIndex: 0,
    explanation:
      'In a priority encoder with D3 having highest priority, the circuit evaluates the highest-order asserted line. Since D3 is 0 and D2 is 1, D2 takes precedence over D1 and D0. The binary code for input 2 is Y1=1, Y0=0 (binary 10).',
    hints: [
      'Identify the highest active subscript input: D3 is 0, but D2 is 1.',
      'Lower active inputs (D1 and D0) are ignored due to priority arbitration.',
      'Convert decimal index 2 into 2-bit binary: 2 = 10_2.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_CS_005,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'To display the decimal digit "7" on a common-cathode 7-segment display (segments a, b, c, d, e, f, g), which segments must be set to logic HIGH (1)?',
    options: [
      'Segments a, b, and c only',
      'Segments a, b, c, and d',
      'Segments b, c, and g only',
      'Segments a, c, d, f, and g',
    ],
    correctIndex: 0,
    explanation:
      'A standard 7-segment display forms the numeral "7" by lighting the top horizontal segment (a), the upper right vertical segment (b), and the lower right vertical segment (c). In common-cathode mode, segments illuminate when driven with logic HIGH (1). Segments d, e, f, and g remain 0.',
    hints: [
      'Visualize the digit 7 on an electronic digital clock.',
      'The top bar is segment a; the two right vertical bars are b (top right) and c (bottom right).',
      'Segments a, b, c = 1, while d, e, f, g = 0.',
    ],
  },

  // --- c12_cs_006: Architecture - Pipelining & RISC ---
  {
    id: 'ch_14',
    nodeId: NODE_C12_CS_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A 5-stage CPU pipeline (Fetch, Decode, Execute, Memory, Write-back) operates at a clock cycle of 1 ns. How many total nanoseconds are required to execute 1000 independent instructions without hazards (ideal pipelining)?',
    correctAnswer: 1004,
    tolerance: 0,
    unit: 'ns',
    explanation:
      'For an n-stage pipeline executing k instructions, Total Cycles = n + (k - 1). Here, Total Cycles = 5 + (1000 - 1) = 1004 cycles. At 1 ns/cycle, the total execution time is 1004 ns. In contrast, a non-pipelined CPU would take 1000 × 5 = 5000 ns (Speedup ≈ 4.98×).',
    hints: [
      'The first instruction requires 5 cycles to fill all 5 stages of the pipeline.',
      'Each subsequent instruction completes 1 cycle later.',
      'Total cycles = 5 + 999 = 1004 cycles × 1 ns = 1004 ns.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_CS_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why is a RISC processor fundamentally easier to pipeline than a CISC processor?',
    options: [
      'RISC features fixed-length instructions, uniform single-cycle execution, a load-store model, and hardwired control units, preventing stage imbalance and decode stalls.',
      'RISC instructions can access memory directly in every ALU operation without needing register loads.',
      'CISC does not use instruction registers or clock oscillators.',
      'RISC architectures eliminate all data dependencies by hardware duplication.',
    ],
    correctIndex: 0,
    explanation:
      'Pipelining requires all stages to take approximately the same duration. RISC instructions are fixed in length (e.g., 32 bits), use hardwired decoders, and restrict memory access strictly to LOAD and STORE instructions. CISC instructions vary in byte length and take variable numbers of micro-operations, causing severe pipeline bubbles and synchronization stalls.',
    hints: [
      'Consider instruction length consistency and memory access restrictions.',
      'In RISC, instructions are uniform in length and execution time.',
      'Variable-length instructions in CISC make instruction pre-decoding and stage synchronization difficult.',
    ],
    misconceptionIndex: 0,
  },

  // --- c12_cs_007: Memory Management ---
  {
    id: 'ch_16',
    nodeId: NODE_C12_CS_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A computer system uses paging with a page size of 512 bytes (2^9 bytes). A process issues a logical address of 1200. Given the page table: Page 0 -> Frame 4, Page 1 -> Frame 1, Page 2 -> Frame 7, Page 3 -> Frame 2. What is the translated Physical Address in memory?',
    correctAnswer: 3760,
    tolerance: 0,
    unit: 'bytes',
    explanation:
      'Page size = 512 bytes. Logical address = 1200. Logical Page Number = floor(1200 / 512) = 2. Offset = 1200 mod 512 = 176. From page table, Page 2 is mapped to Frame 7. Physical Address = (Frame Number × Page Size) + Offset = (7 × 512) + 176 = 3584 + 176 = 3760.',
    hints: [
      'Step 1: Calculate the Page Number = floor(Logical Address / Page Size).',
      '1200 / 512 = Page 2 with a remainder (offset) of 176.',
      'Step 2: Look up Page 2 in the table -> Frame 7. Compute (7 × 512) + 176.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_CS_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Compare Paging vs Segmentation regarding memory allocation and fragmentation vulnerabilities.',
    options: [
      'Paging divides memory into fixed-size units eliminating external fragmentation (suffers only minor internal fragmentation); Segmentation uses variable-size logical units matching programmer modules but suffers from external fragmentation.',
      'Paging creates large external fragmentation holes; Segmentation has zero fragmentation of any kind.',
      'Paging requires continuous physical memory blocks; Segmentation distributes pages across random frames.',
      'Paging is managed entirely by hardware without OS page tables; Segmentation requires no MMU translation.',
    ],
    correctIndex: 0,
    explanation:
      'Paging partitions logical address space into fixed-size pages matching physical frames, allowing non-contiguous allocation and eliminating external fragmentation. The last page may not be completely full, leaving internal fragmentation. Segmentation partitions memory into variable-sized logical segments (Code, Stack, Heap), which can cause external fragmentation as segments are loaded and swapped.',
    hints: [
      'Are pages fixed size or variable size? Pages are fixed; segments are variable.',
      'Fixed-size blocks fit into any open frame (no external gaps), but may not be filled completely (internal waste).',
      'Variable-size segments create scattered free holes over time (external fragmentation).',
    ],
    misconceptionIndex: 0,
  },

  // --- c12_cs_008: Operating System Advanced ---
  {
    id: 'ch_18',
    nodeId: NODE_C12_CS_008,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Three processes P1, P2, and P3 arrive simultaneously at time t=0 with CPU burst times of 12 ms, 4 ms, and 8 ms respectively. Under non-preemptive Shortest Job First (SJF) scheduling, what is the Average Waiting Time in milliseconds?',
    correctAnswer: 5.33,
    tolerance: 0.1,
    unit: 'ms',
    explanation:
      'Under SJF, execution order is shortest to longest: P2 (4 ms), then P3 (8 ms), then P1 (12 ms). Waiting times: P2 starts at 0 -> Wait = 0 ms; P3 starts after P2 at t=4 -> Wait = 4 ms; P1 starts after P3 at t=12 -> Wait = 12 ms. Average Waiting Time = (0 + 4 + 12) / 3 = 16 / 3 = 5.33 ms.',
    hints: [
      'Sort processes by burst time: P2 (4 ms), P3 (8 ms), P1 (12 ms).',
      'Calculate individual waiting times: P2 waits 0, P3 waits 4, P1 waits 4 + 8 = 12.',
      'Sum waiting times = 0 + 4 + 12 = 16. Divide by 3 = 5.33 ms.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_CS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'According to Coffman’s criteria, which of the following is NOT one of the four simultaneously required conditions for a deadlock to occur?',
    options: [
      'Preemptive resource reclaim (Operating system forcefully revoking allocated hardware)',
      'Mutual exclusion (Resources cannot be shared simultaneously)',
      'Hold and Wait (Process holds at least 1 resource while requesting additional resources)',
      'Circular Wait (A closed chain of processes where each holds a resource needed by the next)',
    ],
    correctIndex: 0,
    explanation:
      'The four necessary conditions for deadlock are: 1) Mutual Exclusion, 2) Hold and Wait, 3) NO Preemption (resources cannot be forcibly confiscated), and 4) Circular Wait. Allowing preemption prevents deadlocks because the OS can reclaim resources to break deadlocks.',
    hints: [
      'Deadlock requires that resources CANNOT be taken away forcibly once allocated.',
      'The actual condition is "No Preemption".',
      'Preemptive reclaim is a technique used to PREVENT deadlocks, not cause them.',
    ],
    misconceptionIndex: 1,
  },

  // --- c12_cs_009: Java OOP Design Patterns ---
  {
    id: 'ch_20',
    nodeId: NODE_C12_CS_009,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which three architectural elements are strictly mandatory to implement a thread-safe Singleton pattern in Java?',
    options: [
      'A private constructor, a private static instance variable of the class, and a public static getInstance() accessor method.',
      'A public constructor, a protected clone() method, and an abstract factory interface.',
      'A static initializer block, public volatile fields, and an Observer event bus.',
      'A final class with public constructors and parameterized static generics.',
    ],
    correctIndex: 0,
    explanation:
      'The Singleton pattern guarantees exactly one instance exists: 1) Private constructor prevents outside classes from calling `new`; 2) Private static instance variable stores the sole instance; 3) Public static getInstance() provides global access, instantiating the object if null or returning the existing reference.',
    hints: [
      'How do you prevent other developers from creating new objects with `new MyClass()`?',
      'The constructor MUST be declared private.',
      'Access must be mediated through a public static method like getInstance().',
    ],
    misconceptionIndex: 0,
  },

  // --- c12_cs_010: Java 8 Lambdas & Stream API ---
  {
    id: 'ch_21',
    nodeId: NODE_C12_CS_010,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Match the standard built-in Java 8 functional interface from `java.util.function` to its abstract method signature and intended usage.',
    options: [
      'Predicate<T> -> boolean test(T t) [Filtering/Conditions]',
      'Consumer<T> -> T get() [Value generation without input]',
      'Supplier<T> -> void accept(T t) [Printing/Side-effects]',
      'Function<T,R> -> boolean test(T t) [Boolean condition checking]',
    ],
    correctIndex: 0,
    explanation:
      'In java.util.function: 1) Predicate<T> has `boolean test(T t)` for filtering; 2) Consumer<T> has `void accept(T t)` for side-effects; 3) Supplier<T> has `T get()` with no arguments to produce values; 4) Function<T, R> has `R apply(T t)` for transformations.',
    hints: [
      'Predicate asks a yes/no question (returns boolean).',
      'Consumer accepts an input and returns void.',
      'Predicate<T> uses the method `boolean test(T t)`.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_22',
    nodeId: NODE_C12_CS_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Assemble a declarative Java 8 Stream pipeline to filter a list of ISC student marks (`marks`), keep scores >= 75, and print each score.',
    availableParts: [
      'marks.stream()',
      '.filter(m -> m >= 75)',
      '.forEach(System.out::println);',
      '.map(m -> m + 5)',
      '.collect(Collectors.toList())',
      '.reduce(0, Integer::sum)',
    ],
    targetState: 'marks.stream() .filter(m -> m >= 75) .forEach(System.out::println);',
    validationHint:
      'Build: stream source -> intermediate filter operation -> terminal forEach with method reference.',
    explanation:
      '`marks.stream().filter(m -> m >= 75).forEach(System.out::println);` creates a stream, applies a Predicate filter (lazy evaluation), and consumes the matching items with a terminal forEach operation using a Consumer method reference.',
    hints: [
      'Start with creating the stream from the source collection: `marks.stream()`.',
      'Add the intermediate filtering operation checking for `>= 75`.',
      'End with the terminal consumer operation `forEach(System.out::println);`.',
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

// ─── DEFAULT PROPS WITH RICH CISCE ENRICHMENT ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_CS_001,
  title: 'Advanced Boolean Algebra & High-Performance Systems Architecture',
  definition:
    'Advanced Boolean algebra for ISC Class 12 introduces the Consensus Theorem, Absorption Laws, and Redundancy Theorem to rigorously minimize combinational logic. In enterprise computing, these principles underpin Quine-McCluskey tabular reduction, Carry Look-Ahead arithmetic units, 5-stage instruction pipelines, Paged Virtual Memory MMUs, preemptive OS process schedulers, and Java 8 functional abstractions.',
  eli5:
    'Imagine you are building a lightning-fast computer brain. First, you strip away unnecessary logic gates like removing duplicate rules in a board game. Then, you build supercharged adders that guess carry bits in advance, stack instructions onto an assembly line pipeline, organize memory into neat book pages, and write clean Java lambda recipes to process data instantly.',
  misconceptions: [
    {
      misconception: 'Taking the Dual of a Boolean expression is the same as taking its Complement.',
      correction:
        'Dual swaps only operators (+ <-> ·) and identity values (0 <-> 1) leaving variables unchanged. Complement inverts every literal via De Morgan’s laws.',
    },
    {
      misconception: 'Any repeated variable across terms in Boolean algebra is automatically redundant.',
      correction:
        'Only genuine consensus terms (where a bridging variable appears both true and complemented) or absorbed sub-terms are mathematically redundant.',
    },
    {
      misconception: 'A Moore machine has no external inputs because outputs depend only on state.',
      correction:
        'Moore machines definitely receive external inputs to determine NEXT-state transitions; only output generation is restricted to the current state.',
    },
    {
      misconception: 'Instruction pipelining reduces the execution time of an individual instruction.',
      correction:
        'Pipelining improves CPU instruction throughput (instructions completed per second) by overlapping execution stages; individual instruction latency remains 5 cycles.',
    },
    {
      misconception: 'Virtual memory provides physical additional RAM chips to the motherboard.',
      correction:
        'Virtual memory is an OS abstraction mapping large logical address spaces onto RAM frames and secondary disk backing stores via Demand Paging.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the Consensus term in AB + A\'C + BC?',
      options: ['BC', 'AB', 'A\'C', 'None'],
      correctIndex: 0,
    },
    {
      question: 'Which logic gate computes the Sum bit in a Half Adder?',
      options: ['OR', 'XOR', 'AND', 'NAND'],
      correctIndex: 1,
    },
    {
      question: 'What is the propagation delay complexity of an n-bit Ripple Carry Adder?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
      correctIndex: 2,
    },
    {
      question: 'In Quine-McCluskey, why are minterms grouped by the count of 1s?',
      options: [
        'Only terms in adjacent groups can differ by exactly 1 bit',
        'To reverse binary bits',
        'To convert SOP to POS',
        'To eliminate don\'t cares',
      ],
      correctIndex: 0,
    },
    {
      question: 'In a 5-stage pipeline, how many instructions finish per cycle in steady state?',
      options: ['5', '1', '0.2', '10'],
      correctIndex: 1,
    },
    {
      question: 'Which cache mapping allows a memory block to go into ANY cache line?',
      options: ['Direct Mapping', 'Fully Associative Mapping', '2-Way Set Associative', 'Paged Mapping'],
      correctIndex: 1,
    },
    {
      question: 'Which scheduling algorithm guarantees minimum average waiting time if burst times are known?',
      options: ['FCFS', 'SJF (Shortest Job First)', 'Round Robin', 'Priority without aging'],
      correctIndex: 1,
    },
    {
      question: 'What is the SAM (Single Abstract Method) of Java 8 `Predicate<T>`?',
      options: ['void accept(T t)', 'T get()', 'boolean test(T t)', 'R apply(T t)'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Mastery demonstrated by resolving consensus logic, tracing QM prime implicants, calculating carry look-ahead delay, mapping virtual pages, and constructing Java 8 functional pipelines with >= 80% accuracy.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Consensus Theorem Interactive Probe',
    instruction:
      'Toggle inputs A, B, and C below. Observe the output of AB, A\'C, and the consensus term BC. Notice how BC never changes the final output!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_001,
  },
  {
    title: 'Quine-McCluskey Minterm Grouper',
    instruction:
      'Select active minterms from m0 to m7. Watch the algorithm classify them into Hamming weight groups (0, 1, 2, or 3 ones) in real time.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_CS_002,
  },
  {
    title: 'Look-Ahead Carry ALU Simulator',
    instruction:
      'Inject 4-bit binary operands A and B. Watch Generate (G = AB) and Propagate (P = A ⊕ B) signals compute all carries in parallel!',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_CS_003,
  },
  {
    title: '5-Stage Instruction Pipelining Assembly Line',
    instruction:
      'Step the clock cycle slider forward. Watch instructions traverse Fetch, Decode, Execute, Memory, and Writeback stages concurrently.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_CS_006,
  },
  {
    title: 'Virtual Memory Page-to-Frame Address Mapper',
    instruction:
      'Adjust the logical address slider. Watch the MMU split the address into Page Number & Offset, look up the Frame Table, and synthesize the Physical Address.',
    interactionType: 'drag-position',
    nodeId: NODE_C12_CS_007,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: In the circuit F = AB + A\'C + BC, what happens to the output if input A=0, B=1, and C=1?',
    options: [
      'Output is 0 because A is FALSE',
      'Output is 1 because the A\'C term is TRUE (1 · 1 = 1)',
      'Output is undefined because BC creates a race condition',
      'Output depends solely on whether B was loaded first',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set toggle A=0, B=1, C=1 in the simulation below to verify your prediction in real time!',
    nodeId: NODE_C12_CS_001,
  },
  {
    question:
      'Predict: If a 5-stage pipeline has a branch misprediction (Control Hazard) at cycle 4, what must the CPU hardware do?',
    options: [
      'Double the clock frequency to catch up',
      'Flush (discard) the instructions in Fetch and Decode stages, inserting bubble cycles',
      'Execute both branch paths simultaneously on one ALU',
      'Permanently halt the microprocessor',
    ],
    correctIndex: 1,
    verifyInstruction: 'Advance the pipeline clock slider and observe the pipeline bubble stall effect.',
    nodeId: NODE_C12_CS_006,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice about the term BC when you toggle variable A between 0 and 1 while keeping B=1 and C=1?',
    observableOptions: [
      'The expression F remains 1 at all times because AB catches A=1 and A\'C catches A=0',
      'The output dips to 0 during the transition',
      'The term BC is active only when A is 1',
      'Both AB and A\'C turn off simultaneously',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_CS_001,
  },
  {
    question:
      'When translating logical address to physical frame in paging, what happens to the OFFSET portion of the address?',
    observableOptions: [
      'The offset is multiplied by the page size',
      'The offset passes through completely unchanged because page size equals frame size',
      'The offset is inverted using 2’s complement',
      'The offset is discarded',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_CS_007,
  },
];

// ─── REAL-WORLD ACTIVITY COMPLETION ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Architect Synthesis: Bangalore VLSI Tech Lab',
  description:
    'You have architected the Boolean simplification core, parallel look-ahead ALU, and virtual memory system for the Param-Shakti project. Here is your engineering debrief.',
  steps: [
    'Apply Consensus & Absorption to eliminate gate redundancies, saving silicon die area and thermal power.',
    'Replace Ripple Carry chains with Look-Ahead Carry generators to slash ALU addition latency from O(n) to O(1).',
    'Structure the 5-stage RISC pipeline to achieve near 1-instruction-per-cycle throughput.',
    'Implement Demand Paged Virtual Memory with Page Tables to eradicate external memory fragmentation.',
    'Deploy Java 8 Lambdas and Stream APIs for clean, declarative, high-throughput data processing.',
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// COMPONENT IMPLEMENTATION
// ═════════════════════════════════════════════════════════════════════════════
export default function C12_ComputerScienceAdvancedBooleanAlgebraSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_CS_001,
    title = DEFAULT_PROPS.title || 'Advanced Boolean Algebra & Architecture',
    diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['cs'] || {
    name: 'Computer Science',
    emoji: '💻',
    color: 'indigo',
  };

  // ─── CORE PHASE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // ─── PREDICTION & OBSERVATION STATE ───
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // ─── REFLECTION ANSWERS STATE ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── INTERACTIVE SIMULATION VARIABLES ───
  // Step 0: Boolean Consensus Probe
  const [boolA, setBoolA] = useState<boolean>(true);
  const [boolB, setBoolB] = useState<boolean>(true);
  const [boolC, setBoolC] = useState<boolean>(false);

  // Step 1: Quine-McCluskey Minterms
  const [selectedMinterms, setSelectedMinterms] = useState<number[]>([1, 3, 5, 7]);

  // Step 2: 4-Bit Look-Ahead Adder
  const [opA, setOpA] = useState<number>(5); // 0101
  const [opB, setOpB] = useState<number>(3); // 0011
  const [carryIn, setCarryIn] = useState<number>(0);

  // Step 3: 5-Stage Pipeline Cycle
  const [pipeCycle, setPipeCycle] = useState<number>(3);
  const [pipeStall, setPipeStall] = useState<boolean>(false);

  // Step 4: Virtual Memory Address Translation
  const [logicalAddress, setLogicalAddress] = useState<number>(1200);
  const pageSize = 512;
  const pageTableMap = useMemo<Record<number, number>>(() => ({ 0: 4, 1: 1, 2: 7, 3: 2 }), []);

  // ─── ADAPTIVE BKT & PROGRESSION STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState<{ correct: 0; total: 0 }>({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // ─── ESCALATING HINTS & PROGRESSIVE EXPLANATION ───
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // ─── CHALLENGE INTERACTION STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // ─── FEEDBACK, VISUALS & ANIMATIONS ───
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── REAL-TIME LOGIC EVALUATIONS ───
  const termAB = boolA && boolB;
  const termNotAC = !boolA && boolC;
  const termBC = boolB && boolC;
  const fullOutput = termAB || termNotAC || termBC;
  const simplifiedOutput = termAB || termNotAC;

  // Real-time Carry Look-Ahead Calculations
  const claSignals = useMemo(() => {
    const aBits = [(opA >> 0) & 1, (opA >> 1) & 1, (opA >> 2) & 1, (opA >> 3) & 1];
    const bBits = [(opB >> 0) & 1, (opB >> 1) & 1, (opB >> 2) & 1, (opB >> 3) & 1];
    const G = aBits.map((a, i) => a & bBits[i]);
    const P = aBits.map((a, i) => a ^ bBits[i]);
    const C: number[] = [carryIn];
    C[1] = G[0] | (P[0] & C[0]);
    C[2] = G[1] | (P[1] & G[0]) | (P[1] & P[0] & C[0]);
    C[3] = G[2] | (P[2] & G[1]) | (P[2] & P[1] & G[0]) | (P[2] & P[1] & P[0] & C[0]);
    const Cout =
      G[3] |
      (P[3] & G[2]) |
      (P[3] & P[2] & G[1]) |
      (P[3] & P[2] & P[1] & G[0]) |
      (P[3] & P[2] & P[1] & P[0] & C[0]);
    const Sum = P.map((p, i) => p ^ C[i]);
    const totalResult = (Sum[0] << 0) | (Sum[1] << 1) | (Sum[2] << 2) | (Sum[3] << 3) | (Cout << 4);
    return { aBits, bBits, G, P, C, Cout, Sum, totalResult };
  }, [opA, opB, carryIn]);

  // Real-time Page Translation
  const pageNumber = Math.floor(logicalAddress / pageSize);
  const pageOffset = logicalAddress % pageSize;
  const mappedFrame = pageTableMap[pageNumber] !== undefined ? pageTableMap[pageNumber] : -1;
  const physicalAddress = mappedFrame !== -1 ? mappedFrame * pageSize + pageOffset : null;

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalMessage = (errorCount: number) => {
    if (errorCount === 0) return 'PERFECT SCORE!';
    if (errorCount <= 3) return 'Great work!';
    if (errorCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentMastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentMastery);
    const targetDiff: 'foundation' | 'standard' | 'advanced' =
      currentMastery === 'not-started' || currentMastery === 'beginner'
        ? 'foundation'
        : currentMastery === 'developing'
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

  // ─── CANVAS 2D WAVEFORM & PIPELINE ANIMATION ───
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

      // Background Grid
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Live Clock Pulse Train
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const period = 40;
      for (let x = 0; x < canvas.width; x++) {
        const phaseShift = (x + frame * 1.5) % period;
        const y = phaseShift < period / 2 ? 10 : 35;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Digital Pulse Glow
      ctx.fillStyle = '#818cf8';
      ctx.font = '10px monospace';
      ctx.fillText(`SYS_CLK: 3.2 GHz | IPC ~ 0.98 | PIPELINE RUNNING`, 10, 48);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent intuition! The Consensus theorem proves BC is completely redundant.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive silicon lab. Explore each architecture module hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Tweak any input, adder, or pipeline stage without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering certification challenge phase. Let us test your mastery.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Manipulate the simulator below to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback(
    (idx: number) => {
      setObservationIndex(idx);
      setObservationAnswered(true);
      const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(
        isCorrect
          ? 'Spot on observation! AB and A prime C form a seamless logical bridge.'
          : 'Look closely at how the terms overlap.'
      );
    },
    []
  );

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding performance! You have mastered advanced Boolean algebra and processor architecture.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ADVANCEMENT ───
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
      setCurrentChallenge((prev) => prev + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── MASTER ANSWER EVALUATION ───
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
        setScoreBreakdown((sb) => ({ correct: (sb.correct + 1) as any, total: (sb.total + 1) as any }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Verified by Boolean theorem.');
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

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the step-by-step mathematical proof.');
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

  // ─── DRAG AND DROP HANDLERS ───
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
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── SIMULATION INTERACTION HANDLERS ───
  const handleToggleMinterm = useCallback((m: number) => {
    audioManager.play('tap');
    setSelectedMinterms((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m].sort((a, b) => a - b)
    );
  }, []);

  const handleOpAChange = useCallback((val: number) => {
    setOpA(val);
    audioManager.play('count');
  }, []);

  const handleOpBChange = useCallback((val: number) => {
    setOpB(val);
    audioManager.play('count');
  }, []);

  const handleLogicalAddressChange = useCallback((val: number) => {
    setLogicalAddress(val);
    audioManager.play('count');
  }, []);

  const handlePipeCycleChange = useCallback((val: number) => {
    setPipeCycle(val);
    audioManager.play('count');
  }, []);

  const handleSlidePrev = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const handleSlideNext = useCallback(() => {
    setCurrentSlide((s) => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handleSparkleTrigger = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ═════════════════════════════════════���═══════════════════════════════════════
  // JSX RENDER
  // ═════════════════════════════════════════════════════════════════════════════
  return (
    <div
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
      onClick={handleSparkleTrigger}
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-gold-900/60 border border-gold-500 flex items-center justify-center text-2xl shadow-inner shadow-gold-500/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                ISC Class 12 Computer Science
              </span>
              <span className="text-xs text-slate-400">Paper 1 (Theory) & Practical</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge & Score HUD */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border-rose-700'
                : 'bg-amber-950 text-amber-400 border-amber-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-xs bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400">Mastery: </span>
            <span className="font-bold text-gold-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── OSCILLOSCOPE & CLOCK CANVAS BAR ─── */}
      <div className="mt-3 bg-slate-900/80 rounded-2xl p-2 border border-slate-800/80">
        <canvas ref={canvasRef} width={800} height={52} className="w-full rounded-xl bg-slate-950" />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY HOOK
      ═══════════════════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.section
          key="discovery-phase"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 rounded-2xl border border-gold-700/50 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm tracking-wider uppercase">
              <span>🚀 Mission Briefing</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-gold-900/30 rounded-xl border border-gold-800/40 text-xs text-gold-200">
              <strong>Architecture Context:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
                Curiosity Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">(Low-stakes intuition probe)</span>
            </div>
            <p className="text-base font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-mono text-xs mt-0.5 text-gold-400">[{String.fromCharCode(65 + i)}]</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! BC is absorbed across the bridge literals A and A\'.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Silicon Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE)
      ══════════════════���════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.section
          key="explore-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-5"
        >
          {/* Step Progress Tracker */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>
              Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <span className="text-gold-400">{EXPLORATION_STEPS[currentSlide].title}</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
              animate={{ width: `${((currentSlide + 1) / EXPLORATION_STEPS.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gold-600 text-white flex items-center justify-center text-sm font-black">
                    {currentSlide + 1}
                  </span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-300 text-sm mt-2 font-medium">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: CONSENSUS THEOREM INTERACTIVE PROBE + SVG 1 ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* Predict Then Check Box */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-700/60 space-y-2">
                      <p className="text-xs font-bold uppercase text-gold-300 tracking-wider">
                        Predict-Then-Check Challenge
                      </p>
                      <p className="text-sm text-slate-100">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 rounded-lg text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-gold-900/30 rounded-xl border border-gold-800 text-xs text-gold-200"
                    >
                      {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.div>
                  )}

                  {/* SVG Circuit 1 */}
                  <BooleanConsensusSVG
                    a={boolA}
                    b={boolB}
                    c={boolC}
                    termAB={termAB}
                    termNotAC={termNotAC}
                    termBC={termBC}
                    out={fullOutput}
                  />

                  {/* Interactive Gate Diagram & Toggles */}
                  <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-6">
                    {/* Input Switches */}
                    <div className="flex flex-wrap items-center justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">Input A:</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setBoolA(!boolA);
                            audioManager.play('tap');
                          }}
                          className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors ${
                            boolA ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                          }`}
                          aria-label={`Toggle input A, currently ${boolA ? '1' : '0'}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-white text-slate-950 font-black text-xs flex items-center justify-center">
                            {boolA ? '1' : '0'}
                          </span>
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">Input B:</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setBoolB(!boolB);
                            audioManager.play('tap');
                          }}
                          className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors ${
                            boolB ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                          }`}
                          aria-label={`Toggle input B, currently ${boolB ? '1' : '0'}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-white text-slate-950 font-black text-xs flex items-center justify-center">
                            {boolB ? '1' : '0'}
                          </span>
                        </motion.button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">Input C:</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setBoolC(!boolC);
                            audioManager.play('tap');
                          }}
                          className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors ${
                            boolC ? 'bg-emerald-600 justify-end' : 'bg-slate-700 justify-start'
                          }`}
                          aria-label={`Toggle input C, currently ${boolC ? '1' : '0'}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-white text-slate-950 font-black text-xs flex items-center justify-center">
                            {boolC ? '1' : '0'}
                          </span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Term Evaluation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                        <p className="text-xs text-slate-400 font-mono">Term 1: AB</p>
                        <p className="text-lg font-black text-gold-400 mt-1">{termAB ? '1 (TRUE)' : '0 (FALSE)'}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {boolA ? '1' : '0'} · {boolB ? '1' : '0'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center">
                        <p className="text-xs text-slate-400 font-mono">Term 2: A&apos;C</p>
                        <p className="text-lg font-black text-gold-400 mt-1">
                          {termNotAC ? '1 (TRUE)' : '0 (FALSE)'}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          {boolA ? '0' : '1'} · {boolC ? '1' : '0'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-amber-600/40 text-center bg-amber-950/20">
                        <p className="text-xs text-amber-300 font-mono">Consensus Term: BC</p>
                        <p className="text-lg font-black text-amber-400 mt-1">{termBC ? '1 (TRUE)' : '0 (FALSE)'}</p>
                        <p className="text-[10px] text-amber-500/80 mt-0.5">
                          Redundant: {boolB ? '1' : '0'} · {boolC ? '1' : '0'}
                        </p>
                      </div>
                    </div>

                    {/* Full vs Simplified Output Equality Banner */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-gold-500/30 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-400">Full Function: F = AB + A&apos;C + BC</p>
                        <p className="text-sm font-bold text-white">
                          Output: <span className={fullOutput ? 'text-emerald-400' : 'text-rose-400'}>{fullOutput ? 'HIGH (1)' : 'LOW (0)'}</span>
                        </p>
                      </div>
                      <div className="text-2xl font-black text-gold-400">≡</div>
                      <div>
                        <p className="text-xs text-slate-400">Simplified Form: F = AB + A&apos;C</p>
                        <p className="text-sm font-bold text-white">
                          Output: <span className={simplifiedOutput ? 'text-emerald-400' : 'text-rose-400'}>{simplifiedOutput ? 'HIGH (1)' : 'LOW (0)'}</span>
                        </p>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-600 text-xs text-emerald-300 font-bold">
                        ✓ 100% Truth-Table Equivalent
                      </div>
                    </div>

                    {/* Observation Question */}
                    {!observationAnswered && (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <p className="text-xs font-bold text-gold-300 uppercase">Scientific Observation</p>
                        <p className="text-sm text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5 mt-2">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full p-2.5 rounded-lg text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: QUINE-MCCLUSKEY MINTERM GROUPER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  <p className="text-sm text-slate-300">
                    Click minterms to include them in the Boolean function Σm(...). Observe how the QM algorithm
                    partitions minterms into adjacent groups based on binary 1-counts (Hamming weight).
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((m) => {
                      const bin = m.toString(2).padStart(3, '0');
                      const ones = (bin.match(/1/g) || []).length;
                      const isSel = selectedMinterms.includes(m);
                      return (
                        <motion.button
                          key={m}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleToggleMinterm(m)}
                          className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                            isSel
                              ? 'bg-gold-600 text-white border-gold-400 shadow-lg shadow-gold-600/30'
                              : 'bg-slate-800 text-slate-400 border-slate-750 hover:bg-slate-700'
                          }`}
                        >
                          m{m} ({bin}) [{ones} ones]
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Partitioned QM Table */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((groupCount) => {
                      const termsInGroup = selectedMinterms.filter(
                        (m) => (m.toString(2).padStart(3, '0').match(/1/g) || []).length === groupCount
                      );
                      return (
                        <div key={groupCount} className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                            <span className="text-xs font-bold text-gold-400">Group {groupCount}</span>
                            <span className="text-[10px] text-slate-500">({groupCount} ones)</span>
                          </div>
                          <div className="mt-2 space-y-1">
                            {termsInGroup.length > 0 ? (
                              termsInGroup.map((m) => (
                                <div
                                  key={m}
                                  className="p-1.5 bg-slate-900 rounded text-xs font-mono text-slate-200 flex justify-between"
                                >
                                  <span>m{m}</span>
                                  <span className="text-slate-400">{m.toString(2).padStart(3, '0')}</span>
                                </div>
                              ))
                            ) : (
                              <p className="text-[10px] text-slate-600 italic py-2 text-center">No minterms</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl text-xs text-slate-300">
                    💡 <strong>Algorithm Insight:</strong> In the first reduction phase, terms from Group 0 will ONLY be
                    compared against Group 1; Group 1 against Group 2; and Group 2 against Group 3. Terms differing by
                    one bit merge with a dash (e.g., 001 and 011 merge to 0-1 = A&apos;C).
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: LOOK-AHEAD CARRY ALU SIMULATOR + SVG 2 ─── */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label className="text-xs font-bold text-slate-400">
                        Operand A (4-bit): {opA} (Binary: {opA.toString(2).padStart(4, '0')})
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        value={opA}
                        onChange={(e) => handleOpAChange(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label className="text-xs font-bold text-slate-400">
                        Operand B (4-bit): {opB} (Binary: {opB.toString(2).padStart(4, '0')})
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={15}
                        value={opB}
                        onChange={(e) => handleOpBChange(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* SVG Circuit 2 */}
                  <CarryLookAheadSVG opA={opA} opB={opB} claSignals={claSignals} />

                  {/* Parallel Signal Generation Table */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
                    <table className="w-full text-xs font-mono">
                      <thead>
                        <tr className="text-slate-400 border-b border-slate-800">
                          <th className="py-1 text-left">Stage</th>
                          <th className="py-1">Ai</th>
                          <th className="py-1">Bi</th>
                          <th className="py-1 text-gold-400">Gi = AiBi</th>
                          <th className="py-1 text-gold-400">Pi = Ai ⊕ Bi</th>
                          <th className="py-1 text-amber-400">Carry In (Ci)</th>
                          <th className="py-1 text-emerald-400">Sum (Si)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {[0, 1, 2, 3].map((i) => (
                          <tr key={i} className="text-center">
                            <td className="py-2 text-left font-bold text-slate-300">Bit {i}</td>
                            <td>{claSignals.aBits[i]}</td>
                            <td>{claSignals.bBits[i]}</td>
                            <td className="text-gold-400 font-bold">{claSignals.G[i]}</td>
                            <td className="text-gold-400 font-bold">{claSignals.P[i]}</td>
                            <td className="text-amber-400 font-bold">{claSignals.C[i]}</td>
                            <td className="text-emerald-400 font-bold">{claSignals.Sum[i]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-emerald-600/40 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-mono">ALU Arithmetic Addition Result:</p>
                      <p className="text-lg font-black text-white">
                        {opA} + {opB} + Cin({carryIn}) = {opA + opB + carryIn} (Binary: {claSignals.Cout}
                        {claSignals.Sum.slice().reverse().join('')})
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-300 rounded-lg text-xs font-bold border border-emerald-700">
                      O(1) Parallel Latency
                    </span>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: 5-STAGE PIPELINING + SVG 3 ─── */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400">Pipeline Execution Clock Cycle: {pipeCycle}</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPipeStall(!pipeStall)}
                        className={`px-3 py-1 rounded-lg font-bold border ${
                          pipeStall ? 'bg-rose-900 text-rose-300 border-rose-600' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {pipeStall ? 'Injecting Bubble (Stall Active)' : 'Normal Hazard-Free Flow'}
                      </motion.button>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      value={pipeCycle}
                      onChange={(e) => handlePipeCycleChange(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  {/* SVG Architecture 3 */}
                  <PipelineStageDiagramSVG pipeCycle={pipeCycle} pipeStall={pipeStall} />

                  <p className="text-xs text-slate-400">
                    💡 Once filled (cycle 5+), the CPU retires 1 completed instruction EVERY clock cycle (Throughput = 1
                    IPC), delivering up to 5× speedup over non-pipelined sequential processors.
                  </p>
                </div>
              )}

              {/* ─── SLIDE 4: VIRTUAL MEMORY ADDRESS TRANSLATION ─── */}
              {currentSlide === 4 && (
                <div className="space-y-5">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-400">
                      Logical Address issued by CPU: {logicalAddress} (Range: 0 to 2047 bytes)
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={2047}
                      value={logicalAddress}
                      onChange={(e) => handleLogicalAddressChange(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  {/* MMU Translation Flow */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-gold-400">1. Logical Address Split</p>
                      <p className="text-xs text-slate-400 mt-1">Page Size = 512 bytes</p>
                      <div className="mt-2 text-xs font-mono space-y-1">
                        <div>Page No = floor({logicalAddress} / 512) = <strong className="text-white">{pageNumber}</strong></div>
                        <div>Offset = {logicalAddress} mod 512 = <strong className="text-gold-400">{pageOffset}</strong></div>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-400">2. Page Table Lookup</p>
                      <p className="text-xs text-slate-400 mt-1">Process Page Table Map</p>
                      <div className="mt-2 text-xs font-mono space-y-1">
                        {Object.entries(pageTableMap).map(([p, f]) => (
                          <div
                            key={p}
                            className={`px-2 py-0.5 rounded flex justify-between ${
                              Number(p) === pageNumber ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-500'
                            }`}
                          >
                            <span>Page {p}</span>
                            <span>→ Frame {f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-emerald-700/50 bg-emerald-950/20">
                      <p className="text-xs font-bold text-emerald-400">3. Physical RAM Address</p>
                      <p className="text-xs text-slate-400 mt-1">Frame {mappedFrame} + Offset {pageOffset}</p>
                      <div className="mt-2 text-xs font-mono space-y-1 text-slate-200">
                        <div>= ({mappedFrame} × 512) + {pageOffset}</div>
                        <div className="text-lg font-black text-emerald-400 mt-1">= {physicalAddress} bytes</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Step Nav Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={handleSlidePrev}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs disabled:opacity-40"
                >
                  ← Previous Concept
                </motion.button>
                <span className="text-xs text-slate-500 font-mono">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSlideNext}
                    className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs shadow-lg shadow-gold-600/30"
                  >
                    Next Concept →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
                  >
                    Enter Open Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 3: OPEN SANDBOX (PRESSURE-FREE EXPERIMENTATION)
      ══════════��════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.section
          key="sandbox-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🛠️ Open Architecture Sandbox</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely tweak input vectors, adder bitwidths, and page addresses with zero grading.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
              >
                Ready for CISCE Challenges →
              </motion.button>
            </div>

            {/* Live Dual Control Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-gold-400">1. Boolean Consensus Logic Lab</p>
                <div className="flex gap-4">
                  <label className="text-xs text-slate-300 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={boolA}
                      onChange={(e) => setBoolA(e.target.checked)}
                      className="accent-gold-500 w-4 h-4 rounded"
                    />
                    A = {boolA ? '1' : '0'}
                  </label>
                  <label className="text-xs text-slate-300 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={boolB}
                      onChange={(e) => setBoolB(e.target.checked)}
                      className="accent-gold-500 w-4 h-4 rounded"
                    />
                    B = {boolB ? '1' : '0'}
                  </label>
                  <label className="text-xs text-slate-300 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={boolC}
                      onChange={(e) => setBoolC(e.target.checked)}
                      className="accent-gold-500 w-4 h-4 rounded"
                    />
                    C = {boolC ? '1' : '0'}
                  </label>
                </div>
                <div className="text-xs font-mono p-2 bg-slate-900 rounded border border-slate-800 text-slate-200">
                  F(A,B,C) = {fullOutput ? '1' : '0'} | AB={termAB ? '1' : '0'} | A&apos;C={termNotAC ? '1' : '0'} |
                  BC(redundant)={termBC ? '1' : '0'}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-gold-400">2. Look-Ahead Carry Live Synthesizer</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400">A = {opA}</span>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      value={opA}
                      onChange={(e) => setOpA(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">B = {opB}</span>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      value={opB}
                      onChange={(e) => setOpB(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>
                <div className="text-xs font-mono p-2 bg-slate-900 rounded border border-slate-800 text-slate-200">
                  SUM = {claSignals.totalResult} (Bin: {claSignals.totalResult.toString(2).padStart(5, '0')})
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 4: CISCE CHALLENGES (ADAPTIVE NEP 2020 COMPETENCY ASSESSMENTS)
      ═════════════════════════════════���═════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.section
          key="challenge-phase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mt-6 space-y-5"
        >
          {/* Challenge Navigation & Difficulty Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 font-mono text-[11px] border border-gold-500/30">
                Node: {challenge.nodeId}
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold capitalize text-[11px]">
                Competency: {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                Hint Level: <strong className="text-amber-400">{hintCount}/3</strong>
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={answerRevealed || hintCount >= 3}
                className="px-3 py-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 rounded-lg text-xs font-bold border border-amber-500/40 disabled:opacity-40"
              >
                💡 Get Hint
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Main Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-xl shadow-rose-950/50'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white leading-relaxed">{challenge.question}</p>

            {/* ─── CHALLENGE TYPE 1: MCQ (Classify / Distinguish / Match) ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="mt-5 space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      disabled={showExplanation}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-950/40 border-slate-850 text-slate-500 opacity-50'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700'
                      }`}
                      aria-label={`Option ${i + 1}: ${opt}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs mt-0.5 text-gold-400">[{String.fromCharCode(65 + i)}]</span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ─── CHALLENGE TYPE 2: DRAG-LABEL (Circuit & Architecture) ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Available Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'fa_ha1_sum', title: 'Stage 1 Intermediate Sum' },
                    { id: 'fa_ha1_carry', title: 'Stage 1 Intermediate Carry' },
                    { id: 'fa_ha2_sum', title: 'Stage 2 Final Sum Output' },
                    { id: 'fa_cout', title: 'Stage 2 Final Carry Output' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-xs text-slate-400">{target.title}</span>
                      <span className="text-sm font-bold text-gold-300 mt-1">
                        {droppedLabels[target.id] || '👉 Drop Label Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Verify Full Adder Diagram Labels
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 3: DRAG-SORT (Process Sequencing) ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
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
                      className="p-3 bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-gold-400 flex items-center justify-center font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
                >
                  Check Algorithm Sequence Order
                </motion.button>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 4: NUMERIC (Calculations) ─── */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-sm w-64 focus:outline-none focus:border-gold-500"
                    aria-label="Enter your numeric answer"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs disabled:opacity-40"
                  >
                    Validate Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CHALLENGE TYPE 5: CONSTRUCT (Java Pipeline / Logic Assembler) ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Assembled Canvas Area */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 rounded bg-gold-600 text-white font-mono text-xs flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 hover:text-white font-bold ml-1"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to assemble pipeline</span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs disabled:opacity-40"
                  >
                    Verify Construction
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-gold-950/60 to-slate-950 rounded-2xl border border-gold-700/60 space-y-4"
              >
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase tracking-wider">
                  <span>📐 Step-by-Step Mathematical & Architectural Solution</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-200 leading-relaxed font-sans"
                      >
                        <span className="font-bold text-amber-400 font-mono mr-1.5">{i + 1}.</span>
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
                    className="px-4 py-2 bg-gold-700/70 hover:bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Proof Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finalize Certification Assessment →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          PHASE 5: COMPLETION & MISCONCEPTION PROFILE
      ═════════════════════════════════════════════════════════���═════════════ */}
      {phase === 'complete' && (
        <motion.section
          key="complete-phase"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 space-y-6"
        >
          {/* Completion Banner */}
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-emerald-950 rounded-2xl border border-gold-600 text-center space-y-2">
            <h2 className="text-3xl font-black text-white">Silicon Simulation Mastered!</h2>
            <p className="text-sm text-slate-300">
              Final Architecture Certification Score:{' '}
              <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-gold-300 font-medium capitalize">
              Adaptive Mastery Achieved: {masteryLevel} (ISC Class 12 CS Syllabus Complete)
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK BANNER */}
          <div className="p-5 bg-gradient-to-r from-gold-900/60 to-emerald-900/60 rounded-2xl border border-gold-500/50 text-center space-y-1">
            <div className="text-xl font-black text-amber-300 tracking-wide">
              {getMotivationalMessage(errors)}
            </div>
            <p className="text-xs text-slate-300">
              {errors === 0
                ? 'Flawless execution! You demonstrated comprehensive mastery across Boolean reduction, Carry Look-Ahead ALU design, RISC pipelining, and virtual memory.'
                : errors <= 3
                ? 'Outstanding performance with high precision! Your system architectural foundation is rock-solid.'
                : errors <= 7
                ? 'Great perseverance! You tackled advanced ISC board-level design questions successfully.'
                : 'Great tenacity! Review the core proofs and try the simulation again to solidify your intuition.'}
            </p>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️ Personal Diagnostic Misconception Review</span>
              </h3>
              <p className="text-xs text-slate-400">
                The CISCE examiner analysis identified specific conceptual traps during this session:
              </p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-300 font-bold">❌ Trap: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Board Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭 Deep Architecture Reflection</span>
            </h3>
            <p className="text-xs text-slate-400">
              Consolidate your learning by formulating conceptual explanations in your own words:
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                  placeholder="e.g. How the consensus term BC contributes nothing to the truth table..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                  placeholder="e.g. Pipelining is like an automated laundry assembly line with overlapping stages..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="text-xs font-semibold text-slate-200 block">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                  placeholder="e.g. Designing supercomputer ALUs, compiler optimizations, or memory managers..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Spaced Repetition SRS Review Schedule */}
          <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/60 text-xs text-amber-200">
            <strong>Spaced Repetition Schedule (SM-2):</strong> To ensure long-term retention for the upcoming ISC Board
            examinations, review this node again in{' '}
            <span className="font-bold text-amber-300">
              {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
            </span>
            .
          </div>

          {/* Real-World Application Wrap-Up */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── SIM-ENGINE CONDITIONAL POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Architecture Core Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C12_ComputerScienceAdvancedBooleanAlgebraSim };