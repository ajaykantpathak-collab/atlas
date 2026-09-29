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
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import gsap from 'gsap';

// ─────────────────────────────────────────────────────────────────────────────
// NODE CONSTANTS & CURRICULUM IDENTIFIERS (ICSE CLASS 9 CIVICS)
// ─────────────────────────────────────────────────────────────────────────────
const NODE_C9_HISTCIV_001 = 'c9_histciv_001'; // Definition & Constitutional Supremacy
const NODE_C9_HISTCIV_002 = 'c9_histciv_002'; // Adoption vs Enforcement (1949 vs 1950)
const NODE_C9_HISTCIV_003 = 'c9_histciv_003'; // Single Citizenship & Adult Franchise
const NODE_C9_HISTCIV_004 = 'c9_histciv_004'; // Fundamental Rights & Art 32 Remedies
const NODE_C9_HISTCIV_005 = 'c9_histciv_005'; // Directive Principles of State Policy
const NODE_C9_HISTCIV_006 = 'c9_histciv_006'; // Welfare State Architecture
const NODE_C9_HISTCIV_007 = 'c9_histciv_007'; // Elections in Democracy (Accountability)
const NODE_C9_HISTCIV_008 = 'c9_histciv_008'; // Election Commission (Article 324 & MCC)
const NODE_C9_HISTCIV_009 = 'c9_histciv_009'; // Direct vs Indirect Electoral Systems
const NODE_C9_HISTCIV_010 = 'c9_histciv_010'; // General, Mid-term & By-Elections

const ALL_NODE_IDS = [
  NODE_C9_HISTCIV_001,
  NODE_C9_HISTCIV_002,
  NODE_C9_HISTCIV_003,
  NODE_C9_HISTCIV_004,
  NODE_C9_HISTCIV_005,
  NODE_C9_HISTCIV_006,
  NODE_C9_HISTCIV_007,
  NODE_C9_HISTCIV_008,
  NODE_C9_HISTCIV_009,
  NODE_C9_HISTCIV_010,
];

// ─────────────────────────────────────────────────────────────────────────────
// NARRATIVE SCENARIO & CONTEXTUAL SIMULATION BRIEF
// ─────────────────────────────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Architects of the Republic: 1949 to Present',
  subtitle: 'Constitutional Supremacy, Fundamental Rights & The Electoral Mandate',
  intro:
    'You are appointed as the Chief Constitutional & Electoral Analyst for the Republic of India. From the historic debates in the Constituent Assembly to overseeing an electorate of 970+ million voters, your task is to understand, protect, and simulate the supreme constitutional machinery that governs the world’s largest democracy.',
  context:
    'Balance the three organs of state power, enforce justiciable rights through constitutional remedies, guide welfare legislation using Directive Principles, and protect the sanctity of universal franchise under the autonomous Election Commission of India.',
  role: 'Chief Constitutional & Electoral Commissioner (In-Training)',
  jurisdiction: 'Union of India (Articles 1 to 395)',
};

// ─────────────────────────────────────────────────────────────────────────────
// DISCOVERY CURIOSITY HOOK
// ────────────────────────────────────���────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question:
    'On 26 November 1949, the Constituent Assembly passed the Constitution of India. Did it immediately become the operative supreme law governing the entire nation on that very day?',
  options: [
    'Yes — once signed by the President of the Assembly, all 395 articles took effect immediately',
    'No — only select articles (citizenship, elections, provisional parliament) took effect immediately; full enforcement was reserved for 26 January 1950',
    'No — it was held until 15 August 1950 to coincide with the third anniversary of Independence',
    'Yes — but it applied only to provincial legislatures and not the Union Executive',
  ],
  correctIndex: 1,
  hintAfter:
    'Adoption and Enforcement represent two distinct constitutional milestones! Let us uncover why the framers deliberately waited two months to bridge 1930 and 1950.',
  historicalFootnote:
    'Under Article 394, Articles 5, 6, 7, 8, 9, 60, 324, 366, 367, 379, 380, 388, 391, 392, and 393 came into force at once on 26 Nov 1949. The remaining substantive provisions came into force on 26 Jan 1950.',
};

// ─────────────────────────────────────────────────────────────────────────────
// TOPIC SPECIFIC SVG DIAGRAM 1: CONSTITUTIONAL SUPREMACY & TRIAS POLITICA
// ─────────────────────────────────────────────────────────────────────────────
function ConstitutionHierarchySvg({
  activePillar,
  lawStatus,
  onPillarClick,
}: {
  activePillar: string | null;
  lawStatus: 'valid' | 'clash' | 'struck_down';
  onPillarClick?: (pillar: 'legislature' | 'executive' | 'judiciary') => void;
}) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center">
      <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-bold">
        Constitutional Supremacy & Checks and Balances Architecture
      </div>
      <svg
        viewBox="0 0 760 380"
        className="w-full h-auto max-h-[340px] select-none"
        aria-label="Constitutional Supremacy Hierarchy Diagram"
      >
        <defs>
          <linearGradient id="goldApex" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="blueLeg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="amberExec" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="emeraldJud" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Apex: The Constitution of India */}
        <g id="apex-constitution" className="cursor-pointer">
          <rect
            x="230"
            y="20"
            width="300"
            height="64"
            rx="14"
            fill="url(#goldApex)"
            stroke="#fbbf24"
            strokeWidth="2"
            filter="url(#glow)"
          />
          <text x="380" y="46" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="15" letterSpacing="1">
            CONSTITUTION OF INDIA
          </text>
          <text x="380" y="66" textAnchor="middle" fill="#fef3c7" fontSize="11" fontStyle="italic">
            Supreme Law of the Land (Lex Suprema)
          </text>
        </g>

        {/* Connecting Golden Lines from Apex */}
        <path d="M 380 84 L 140 160" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" />
        <path d="M 380 84 L 380 160" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" />
        <path d="M 380 84 L 620 160" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4" />

        {/* Central Article 13 & 32 Shield Badge */}
        <g transform="translate(320, 102)">
          <rect x="0" y="0" width="120" height="30" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
          <text x="60" y="19" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">
            Art 13 & Art 32 Shield
          </text>
        </g>

        {/* Pillar 1: Legislature (Parliament) */}
        <g
          id="pillar-legislature"
          onClick={() => onPillarClick && onPillarClick('legislature')}
          className="cursor-pointer transition-transform hover:opacity-95"
        >
          <rect
            x="50"
            y="160"
            width="180"
            height="110"
            rx="12"
            fill={activePillar === 'legislature' ? '#1e3a8a' : '#0f172a'}
            stroke={activePillar === 'legislature' ? '#60a5fa' : '#3b82f6'}
            strokeWidth={activePillar === 'legislature' ? '3' : '1.5'}
          />
          <text x="140" y="188" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="13">
            LEGISLATURE
          </text>
          <text x="140" y="206" textAnchor="middle" fill="#93c5fd" fontSize="11">
            Parliament of India
          </text>
          <text x="140" y="226" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">
            Lok Sabha + Rajya Sabha
          </text>
          <text x="140" y="244" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Power: Enact Laws & Budgets
          </text>
          <rect x="65" y="252" width="150" height="12" rx="4" fill="#1e293b" />
          <text x="140" y="261" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">
            Limited by Basic Structure
          </text>
        </g>

        {/* Pillar 2: Executive (Union Government) */}
        <g
          id="pillar-executive"
          onClick={() => onPillarClick && onPillarClick('executive')}
          className="cursor-pointer transition-transform hover:opacity-95"
        >
          <rect
            x="290"
            y="160"
            width="180"
            height="110"
            rx="12"
            fill={activePillar === 'executive' ? '#451a03' : '#0f172a'}
            stroke={activePillar === 'executive' ? '#fbbf24' : '#f59e0b'}
            strokeWidth={activePillar === 'executive' ? '3' : '1.5'}
          />
          <text x="380" y="188" textAnchor="middle" fill="#fbbf24" fontWeight="bold" fontSize="13">
            EXECUTIVE
          </text>
          <text x="380" y="206" textAnchor="middle" fill="#fde68a" fontSize="11">
            President, PM & Cabinet
          </text>
          <text x="380" y="226" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">
            Council of Ministers
          </text>
          <text x="380" y="244" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Power: Administer & Execute
          </text>
          <rect x="305" y="252" width="150" height="12" rx="4" fill="#1e293b" />
          <text x="380" y="261" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">
            Accountable to Lok Sabha
          </text>
        </g>

        {/* Pillar 3: Judiciary (Supreme Court) */}
        <g
          id="pillar-judiciary"
          onClick={() => onPillarClick && onPillarClick('judiciary')}
          className="cursor-pointer transition-transform hover:opacity-95"
        >
          <rect
            x="530"
            y="160"
            width="180"
            height="110"
            rx="12"
            fill={activePillar === 'judiciary' ? '#064e3b' : '#0f172a'}
            stroke={activePillar === 'judiciary' ? '#34d399' : '#10b981'}
            strokeWidth={activePillar === 'judiciary' ? '3' : '1.5'}
          />
          <text x="620" y="188" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="13">
            JUDICIARY
          </text>
          <text x="620" y="206" textAnchor="middle" fill="#a7f3d0" fontSize="11">
            Supreme Court of India
          </text>
          <text x="620" y="226" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">
            Apex Guardian of Rights
          </text>
          <text x="620" y="244" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Power: Judicial Review (Art 13)
          </text>
          <rect x="545" y="252" width="150" height="12" rx="4" fill="#1e293b" />
          <text x="620" y="261" textAnchor="middle" fill="#4ade80" fontSize="8" fontWeight="bold">
            Issues Writs (Article 32)
          </text>
        </g>

        {/* Dynamic Law Status Simulation at Bottom */}
        <g transform="translate(100, 295)">
          <rect
            x="0"
            y="0"
            width="560"
            height="65"
            rx="10"
            fill={lawStatus === 'valid' ? '#022c22' : lawStatus === 'clash' ? '#451a03' : '#4c0519'}
            stroke={lawStatus === 'valid' ? '#10b981' : lawStatus === 'clash' ? '#f59e0b' : '#f43f5e'}
            strokeWidth="1.5"
          />
          <text x="280" y="22" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
            STATUTORY TEST: {lawStatus === 'valid' ? 'ORDINARY LAW COMPLIANT' : lawStatus === 'clash' ? 'BILL VIOLATES FUNDAMENTAL RIGHT (ART 19/21)' : 'SUPREME COURT ARTICLE 13 JUDICIAL REVIEW: VOID AB INITIO'}
          </text>
          <text x="280" y="44" textAnchor="middle" fill={lawStatus === 'valid' ? '#6ee7b7' : lawStatus === 'clash' ? '#fde68a' : '#fda4af'} fontSize="9.5">
            {lawStatus === 'valid' && 'Law satisfies constitutional standards. Citizens enjoy rights undisturbed.'}
            {lawStatus === 'clash' && 'Citizen files writ under Article 32. Supreme Court issues notice to Union Government.'}
            {lawStatus === 'struck_down' && 'Article 13(2): "The State shall not make any law which takes away or abridges rights" -> STRUCK DOWN.'}
          </text>
        </g>

        {/* Interactive Checks and Balances Cross-Arrows */}
        <path d="M 230 215 L 290 215" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <path d="M 470 215 L 530 215" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPIC SPECIFIC SVG DIAGRAM 2: TIMELINE BRIDGE (1930 -> 1949 -> 1950)
// ─────────────────────────────────────────────────────────────��───────────────
function TimelineHistoricalBridgeSvg({ currentYear }: { currentYear: number }) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center">
      <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-bold">
        The 20-Year Constitutional Bridge: Purna Swaraj (1930) to Republic Day (1950)
      </div>
      <svg
        viewBox="0 0 760 260"
        className="w-full h-auto max-h-[260px] select-none"
        aria-label="Constitutional Timeline Bridge Diagram"
      >
        <defs>
          <linearGradient id="timeLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Main Base Timeline Rail */}
        <rect x="40" y="115" width="680" height="10" rx="5" fill="#1e293b" />
        <rect
          x="40"
          y="115"
          width={Math.max(10, Math.min(680, ((currentYear - 1930) / 20) * 680))}
          height="10"
          rx="5"
          fill="url(#timeLineGrad)"
        />

        {/* Node 1: 26 January 1930 - Lahore Session */}
        <g transform="translate(80, 120)">
          <circle
            cx="0"
            cy="0"
            r={currentYear >= 1930 ? 14 : 10}
            fill={currentYear >= 1930 ? '#f59e0b' : '#334155'}
            stroke="#ffffff"
            strokeWidth="2"
          />
          <text x="0" y="30" textAnchor="middle" fill="#f59e0b" fontWeight="bold" fontSize="11">
            26 Jan 1930
          </text>
          <text x="0" y="46" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            Purna Swaraj
          </text>
          <text x="0" y="60" textAnchor="middle" fill="#94a3b8" fontSize="8.5">
            Lahore Congress Pledge
          </text>
          <rect x="-65" y="-75" width="130" height="48" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
          <text x="0" y="-55" textAnchor="middle" fill="#fde68a" fontSize="8.5" fontWeight="bold">
            Observed as Independence
          </text>
          <text x="0" y="-40" textAnchor="middle" fill="#cbd5e1" fontSize="8">
            Day for 20 years (1930-49)
          </text>
        </g>

        {/* Node 2: 9 December 1946 - Constituent Assembly 1st Sitting */}
        <g transform="translate(280, 120)">
          <circle
            cx="0"
            cy="0"
            r={currentYear >= 1946 ? 12 : 8}
            fill={currentYear >= 1946 ? '#3b82f6' : '#334155'}
            stroke="#ffffff"
            strokeWidth="2"
          />
          <text x="0" y="30" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="11">
            9 Dec 1946
          </text>
          <text x="0" y="46" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            Drafting Begins
          </text>
          <text x="0" y="60" textAnchor="middle" fill="#94a3b8" fontSize="8.5">
            Constituent Assembly
          </text>
        </g>

        {/* Node 3: 26 November 1949 - ADOPTION */}
        <g transform="translate(500, 120)">
          <circle
            cx="0"
            cy="0"
            r={currentYear >= 1949 ? 15 : 10}
            fill={currentYear >= 1949 ? '#8b5cf6' : '#334155'}
            stroke="#ffffff"
            strokeWidth="2.5"
          />
          <text x="0" y="30" textAnchor="middle" fill="#a78bfa" fontWeight="bold" fontSize="11">
            26 Nov 1949
          </text>
          <text x="0" y="46" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            ADOPTION
          </text>
          <text x="0" y="60" textAnchor="middle" fill="#c4b5fd" fontSize="8.5">
            Samvidhan Divas
          </text>
          <rect x="-65" y="-75" width="130" height="48" rx="8" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth="1" />
          <text x="0" y="-55" textAnchor="middle" fill="#ddd6fe" fontSize="8.5" fontWeight="bold">
            Draft Signed & Passed
          </text>
          <text x="0" y="-40" textAnchor="middle" fill="#94a3b8" fontSize="8">
            2 yrs, 11 mos, 18 days
          </text>
        </g>

        {/* Node 4: 26 January 1950 - ENFORCEMENT */}
        <g transform="translate(680, 120)">
          <circle
            cx="0"
            cy="0"
            r={currentYear >= 1950 ? 17 : 10}
            fill={currentYear >= 1950 ? '#10b981' : '#334155'}
            stroke="#ffffff"
            strokeWidth="3"
          />
          <text x="0" y="30" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="11">
            26 Jan 1950
          </text>
          <text x="0" y="46" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">
            ENFORCEMENT
          </text>
          <text x="0" y="60" textAnchor="middle" fill="#6ee7b7" fontSize="8.5">
            Republic Day (Purna Swaraj)
          </text>
          <rect x="-70" y="-75" width="140" height="48" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
          <text x="0" y="-55" textAnchor="middle" fill="#a7f3d0" fontSize="8.5" fontWeight="bold">
            Full Supreme Law
          </text>
          <text x="0" y="-40" textAnchor="middle" fill="#cbd5e1" fontSize="8">
            Republic of India Born
          </text>
        </g>

        {/* Connecting Arc Indicating the 20-year Honouring */}
        <path
          d="M 80 85 C 200 -20, 560 -20, 680 85"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text x="380" y="15" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">
          Exact 20-Year Bridge: Honouring Purna Swaraj (1930) on Republic Day (1950)
        </text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOPIC SPECIFIC SVG DIAGRAM 3: ELECTORAL ARCHITECTURE (DIRECT VS INDIRECT)
// ─────────────────────────────────────────────────────────────────────────────
function ElectoralPyramidSvg({
  activeTrace,
  onTraceSelect,
}: {
  activeTrace: 'mla' | 'mp' | null;
  onTraceSelect?: (trace: 'mla' | 'mp') => void;
}) {
  return (
    <div className="w-full bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner flex flex-col items-center">
      <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 font-bold">
        Indian Electoral Machinery: Direct Franchise to Indirect Governance
      </div>
      <svg
        viewBox="0 0 760 340"
        className="w-full h-auto max-h-[320px] select-none"
        aria-label="Direct vs Indirect Indian Election Architecture Diagram"
      >
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
          </marker>
          <marker id="arrBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
          <marker id="arrGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
          </marker>
        </defs>

        {/* Base Layer: 970+ Million Registered Citizens (Universal Adult Franchise Art 326) */}
        <g transform="translate(180, 260)">
          <rect x="0" y="0" width="400" height="60" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <text x="200" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
            CITIZEN VOTERS OF INDIA (Age 18+)
          </text>
          <text x="200" y="44" textAnchor="middle" fill="#94a3b8" fontSize="10">
            Universal Adult Franchise • Single Citizenship • Single Vote per Citizen (Art 326)
          </text>
        </g>

        {/* Middle Tier Left: State MLAs (Direct Election) */}
        <g
          transform="translate(80, 130)"
          onClick={() => onTraceSelect && onTraceSelect('mla')}
          className="cursor-pointer transition-transform hover:opacity-90"
        >
          <rect
            x="0"
            y="0"
            width="260"
            height="70"
            rx="10"
            fill={activeTrace === 'mla' ? '#1e1b4b' : '#0f172a'}
            stroke={activeTrace === 'mla' ? '#818cf8' : '#6366f1'}
            strokeWidth={activeTrace === 'mla' ? '3' : '1.5'}
          />
          <text x="130" y="22" textAnchor="middle" fill="#a5b4fc" fontWeight="bold" fontSize="12">
            STATE VIDHAN SABHA (MLAs)
          </text>
          <text x="130" y="40" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">
            DIRECT ELECTION (Territorial Wards)
          </text>
          <text x="130" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Term: 5 Years • Forms State Government
          </text>
        </g>

        {/* Middle Tier Right: Lok Sabha MPs (Direct Election) */}
        <g
          transform="translate(420, 130)"
          onClick={() => onTraceSelect && onTraceSelect('mp')}
          className="cursor-pointer transition-transform hover:opacity-90"
        >
          <rect
            x="0"
            y="0"
            width="260"
            height="70"
            rx="10"
            fill={activeTrace === 'mp' ? '#064e3b' : '#0f172a'}
            stroke={activeTrace === 'mp' ? '#34d399' : '#10b981'}
            strokeWidth={activeTrace === 'mp' ? '3' : '1.5'}
          />
          <text x="130" y="22" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" fontSize="12">
            LOK SABHA (MPs - House of People)
          </text>
          <text x="130" y="40" textAnchor="middle" fill="#ffffff" fontSize="10.5" fontWeight="bold">
            DIRECT ELECTION (543 Constituencies)
          </text>
          <text x="130" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Term: 5 Years • Direct Popular Mandate
          </text>
        </g>

        {/* Apex Left: Rajya Sabha (Indirect Election by MLAs) */}
        <g transform="translate(80, 15)">
          <rect x="0" y="0" width="260" height="65" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="130" y="22" textAnchor="middle" fill="#fde68a" fontWeight="bold" fontSize="12">
            RAJYA SABHA (Council of States)
          </text>
          <text x="130" y="38" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
            INDIRECT ELECTION
          </text>
          <text x="130" y="54" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">
            Elected by State MLAs (Single Transferable Vote)
          </text>
        </g>

        {/* Apex Right: President of India (Electoral College) */}
        <g transform="translate(420, 15)">
          <rect x="0" y="0" width="260" height="65" rx="10" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
          <text x="130" y="22" textAnchor="middle" fill="#fbcfe8" fontWeight="bold" fontSize="12">
            PRESIDENT OF INDIA
          </text>
          <text x="130" y="38" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="bold">
            INDIRECT ELECTORAL COLLEGE (Art 54)
          </text>
          <text x="130" y="54" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">
            Elected MPs (LS + RS) + Elected MLAs of States & UTs
          </text>
        </g>

        {/* Direct Voting Arrows from Citizens */}
        <path d="M 280 260 L 210 205" stroke="#818cf8" strokeWidth="2.5" markerEnd="url(#arrBlue)" />
        <path d="M 480 260 L 550 205" stroke="#34d399" strokeWidth="2.5" markerEnd="url(#arrGreen)" />

        {/* Indirect Voting Flow from MLAs to Rajya Sabha */}
        <path d="M 210 130 L 210 85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arr)" />

        {/* Indirect Voting Flow from MLAs & MPs to President */}
        <path d="M 280 130 C 350 90, 480 90, 520 85" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arr)" />
        <path d="M 550 130 L 550 85" stroke="#ec4899" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arr)" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE CHALLENGE INTERFACE
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// 21 CHALLENGES (FOUNDATION, STANDARD, ADVANCED TIERS)
// ─────────────────────────────────────────────────────────────────────────────
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_c9_001',
    nodeId: NODE_C9_HISTCIV_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the fundamental defining characteristic of a Constitution that establishes its supremacy over ordinary legislative enactments?',
    options: [
      'It is an ordinary collection of administrative guidelines enacted by Parliament',
      'It is the supreme foundational law of the land from which all state organs derive power and against which all statutes are judged',
      'It is a political manifesto that automatically dissolves whenever a new coalition takes office',
      'It is exclusively a charter of citizen privileges containing no regulatory checks on government power',
    ],
    correctIndex: 1,
    explanation:
      'A Constitution is the supreme foundational law of the state (Lex Suprema). Under Article 13 of the Indian Constitution, any ordinary law passed by Parliament or state legislatures that is inconsistent with the Constitution is void ab initio.',
    hints: [
      'Think about the highest source of authority in the Indian legal hierarchy.',
      'Recall Article 13: what happens when an ordinary statute conflicts with a constitutional provision?',
      'The Constitution creates and limits the Legislature, Executive, and Judiciary; it is not subordinate to them.',
    ],
    misconceptionIndex: 0,
    bloomLevel: 'Remembering & Understanding',
  },
  {
    id: 'ch_c9_002',
    nodeId: NODE_C9_HISTCIV_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why did the Constituent Assembly select 26 January 1950 (Republic Day) rather than 26 November 1949 as the Date of Complete Enforcement?',
    options: [
      '26 January 1950 was picked at random solely for administrative convenience',
      'To commemorate the 20th anniversary of the historic 26 January 1930 Purna Swaraj (Complete Independence) pledge made at Lahore',
      'Because the British Parliament had not yet surrendered its sovereign veto over Indian legislation in November 1949',
      'To synchronize the declaration with the monsoon sowing cycle across the Gangetic plains',
    ],
    correctIndex: 1,
    explanation:
      'The Constituent Assembly completed and adopted the Constitution on 26 November 1949 (Constitution Day). However, the framers deliberately chose 26 January 1950 for full enforcement to immortalize the 26 January 1930 Purna Swaraj pledge declared at the Lahore Congress session led by Jawaharlal Nehru.',
    hints: [
      'What historic pledge was proclaimed on the banks of the Ravi River in Lahore on 26 January 1930?',
      'For two decades before independence, 26 January was observed across India as "Independence Day".',
      'The framers created a deliberate historical continuity between the freedom struggle’s pledge and its constitutional fruition.',
    ],
    misconceptionIndex: 1,
    bloomLevel: 'Understanding',
  },
  {
    id: 'ch_c9_003',
    nodeId: NODE_C9_HISTCIV_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the qualifying minimum voting age for Universal Adult Franchise under Article 326 (lowered from 21 by the 61st Amendment Act)?',
    correctAnswer: 18,
    tolerance: 0,
    unit: 'years',
    explanation:
      'Article 326 guarantees Universal Adult Franchise. The 61st Constitutional Amendment Act (1988), which came into force in March 1989, lowered the voting age from 21 to 18 years to empower the youth in democratic decision-making.',
    hints: [
      'Think of the age at which an Indian citizen attains legal adulthood and receives voter registration rights.',
      'The 61st Constitutional Amendment in 1988 reduced the original threshold of 21 years by exactly 3 years.',
      'The qualifying age is 18 years.',
    ],
    misconceptionIndex: 2,
    bloomLevel: 'Remembering',
  },
  {
    id: 'ch_c9_004',
    nodeId: NODE_C9_HISTCIV_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why did Dr. B.R. Ambedkar designate Article 32 (Right to Constitutional Remedies) as the "very soul and the very heart of the Constitution"?',
    options: [
      'Because it regulates tax distribution formulas between the Union and the States',
      'Because without a direct judicial remedy to enforce rights through prerogative writs, all Fundamental Rights remain mere paper promises',
      'Because it grants the Prime Minister emergency authority to rule without parliamentary approval',
      'Because it prescribes the moral obligations of citizens during foreign invasions',
    ],
    correctIndex: 1,
    explanation:
      'A declaration of fundamental rights is meaningless without an effective enforcement machinery. Article 32 guarantees the right to move the Supreme Court directly by appropriate proceedings for the enforcement of Part III rights through writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, and Certiorari).',
    hints: [
      'What value does a legal right hold if a citizen cannot immediately go to court when it is trampled upon?',
      'Ambedkar emphasized the procedural tool that breathes life into substantive liberties.',
      'Article 32 makes rights "justiciable" by guaranteeing apex judicial remedies.',
    ],
    misconceptionIndex: 0,
    bloomLevel: 'Understanding',
  },
  {
    id: 'ch_c9_005',
    nodeId: NODE_C9_HISTCIV_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Under Article 324, what is the multi-member constitutional composition of the Election Commission of India since October 1993?',
    options: [
      'A single Chief Election Commissioner appointed for life by the Prime Minister',
      'One Chief Election Commissioner (CEC) and two Election Commissioners appointed by the President of India',
      'A rotating tribunal composed of five senior High Court Chief Justices',
      'A parliamentary standing committee representing all registered national political parties',
    ],
    correctIndex: 1,
    explanation:
      'Since October 1993, the Election Commission of India functions as a three-member body comprising the Chief Election Commissioner and two Election Commissioners. All three enjoy equal voting power, and decisions are taken unanimously or by majority.',
    hints: [
      'How many commissioners preside over the Nirvachan Sadan (ECI headquarters)?',
      'It consists of 1 Chief + 2 Commissioners working as a multi-member collegial body.',
      'Appointments are made by the President of India under constitutional mandate.',
    ],
    misconceptionIndex: 3,
    bloomLevel: 'Remembering',
  },
  {
    id: 'ch_c9_006',
    nodeId: NODE_C9_HISTCIV_009,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which public office in India is filled through a DIRECT popular vote by registered adult citizens in territorial constituencies?',
    options: [
      'President of India',
      'Member of the Rajya Sabha (Council of States)',
      'Member of the Lok Sabha (House of the People)',
      'Vice-President of India',
    ],
    correctIndex: 2,
    explanation:
      'Members of the Lok Sabha (and Members of State Legislative Assemblies/MLAs) are elected directly by eligible voters casting secret ballots in single-member territorial constituencies. The President, Vice-President, and Rajya Sabha members are elected indirectly.',
    hints: [
      'Consider the EVM ballot: which representative do ordinary 18+ voters press a button for in general elections?',
      'Rajya Sabha members are elected by State MLAs, while the President is elected by an Electoral College.',
      'The Lok Sabha is the "House of the People", directly chosen by the electorate.',
    ],
    misconceptionIndex: 4,
    bloomLevel: 'Understanding',
  },
  {
    id: 'ch_c9_007',
    nodeId: NODE_C9_HISTCIV_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the normal constitutional lifespan of the Lok Sabha under Article 83(2), at the expiry of which a General Election must be held?',
    options: ['3 years', '4 years', '5 years', '6 years'],
    correctIndex: 2,
    explanation:
      'Under Article 83(2), the Lok Sabha continues for 5 years from the date appointed for its first meeting, unless dissolved earlier by the President on the advice of the Prime Minister. The expiration of this 5-year period operates as automatic dissolution.',
    hints: [
      'How many years separate standard nationwide parliamentary general elections in India?',
      'Article 83(2) prescribes a 5-year tenure for the Lok Sabha and Article 172 prescribes 5 years for State Assemblies.',
      'The normal term is 5 years.',
    ],
    bloomLevel: 'Remembering',
  },

  // ── STANDARD TIER (8-14) ──
  {
    id: 'ch_c9_008',
    nodeId: NODE_C9_HISTCIV_003,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Match each constitutional feature to its precise legal mechanism and article provision in the Indian Constitution.',
    dragItems: [
      { label: 'Single Citizenship', targetId: 'feat_unity' },
      { label: 'Universal Adult Franchise', targetId: 'feat_equality' },
      { label: 'Article 326', targetId: 'feat_ballot' },
      { label: 'Articles 5-11', targetId: 'feat_national' },
    ],
    correctMapping: {
      feat_unity: 'Single Citizenship',
      feat_equality: 'Universal Adult Franchise',
      feat_ballot: 'Article 326',
      feat_national: 'Articles 5-11',
    },
    explanation:
      'Single Citizenship (Part II, Articles 5-11) ensures all Indians enjoy identical civil rights across all states, preventing regional dual allegiance. Universal Adult Franchise (Article 326) grants equal political voice (one person, one vote, one value) without property or literacy barriers.',
    hints: [
      'Which principle ensures no Indian is considered a foreigner or second-class resident in any state of India?',
      'Article 326 is the exact constitutional seat of the right to vote for all adult citizens.',
      'Part II (Articles 5-11) codifies citizenship, while Single Citizenship fosters national solidarity.',
    ],
    misconceptionIndex: 2,
    bloomLevel: 'Understanding & Applying',
  },
  {
    id: 'ch_c9_009',
    nodeId: NODE_C9_HISTCIV_004,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the Fundamental Rights (Part III) in strict ascending order of their constitutional Article numbers.',
    sortItems: [
      'Right to Equality (Articles 14-18)',
      'Right to Freedom (Articles 19-22)',
      'Right against Exploitation (Articles 23-24)',
      'Right to Freedom of Religion (Articles 25-28)',
      'Cultural & Educational Rights (Articles 29-30)',
      'Right to Constitutional Remedies (Article 32)',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation:
      'The 6 Fundamental Rights in Part III follow a precise logical sequence: Equality (14-18), Freedom (19-22), Exploitation (23-24), Religion (25-28), Cultural/Educational (29-30), and Remedies (32). Note: The Right to Property (former Art 31) was deleted by the 44th Amendment in 1978 and moved to Article 300A as a legal right.',
    hints: [
      'Equality begins right after general definitions: Articles 14 to 18.',
      'Freedom of speech, movement, and life (Articles 19-22) comes immediately after Equality.',
      'Remedies under Article 32 anchors the entire structure at the end.',
    ],
    bloomLevel: 'Analyzing',
  },
  {
    id: 'ch_c9_010',
    nodeId: NODE_C9_HISTCIV_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Which statement accurately analyzes the legal distinction between Fundamental Rights (Part III) and Directive Principles of State Policy (Part IV)?',
    options: [
      'Rights are non-justiciable moral advice; DPSPs are justiciable and directly enforceable by court writs',
      'Rights impose primarily negative restrictions on the State and are justiciable (enforceable under Art 32); DPSPs impose positive socio-economic obligations and are non-justiciable under Article 37',
      'Both Fundamental Rights and DPSPs can be enforced with identical contempt-of-court penalties by High Courts under Article 226',
      'DPSPs apply exclusively to multinational corporations, while Fundamental Rights apply only to village panchayats',
    ],
    correctIndex: 1,
    explanation:
      'Fundamental Rights (Part III) act as justiciable negative injunctions barring state overreach into individual freedom. Directive Principles (Part IV) are non-justiciable positive socio-economic mandates (Article 37) directing the State to establish social and economic democracy, though not enforceable in a court of law.',
    hints: [
      'Can a citizen sue the government in court if a Directive Principle (like uniform civil code or work guarantees) is not enacted?',
      'Article 37 explicitly declares that DPSPs "shall not be enforceable by any court, but the principles therein laid down are nevertheless fundamental in the governance of the country".',
      'Rights protect individual liberty (justiciable); DPSPs chart the roadmap for a welfare state (non-justiciable).',
    ],
    misconceptionIndex: 1,
    bloomLevel: 'Analyzing',
  },
  {
    id: 'ch_c9_011',
    nodeId: NODE_C9_HISTCIV_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'How does India’s constitutional "Welfare State" model fundamentally differ from a traditional "Police State"?',
    options: [
      'A Police State runs free schools and hospitals, whereas a Welfare State only polices traffic',
      'A Police State restricts its role to law enforcement, border defense, and tax extraction; a Welfare State actively guarantees minimum standards of health, education, nutrition, social security, and human dignity',
      'A Welfare State abolishes all forms of private enterprise and outlaws personal property',
      'There is no distinction in constitutional law; both models operate identically under Article 21',
    ],
    correctIndex: 1,
    explanation:
      'A police state (laissez-faire night-watchman state) maintains order and defends borders. A Welfare State, as envisioned in the Preamble and Directive Principles (Articles 38, 39, 41, 47), actively intervenes to eradicate poverty, reduce inequality, provide universal schooling, healthcare, and ensure a dignity floor for every citizen.',
    hints: [
      'Think about what extra responsibilities a Welfare State shoulders beyond catching criminals and maintaining armies.',
      'Consider nationwide welfare schemes: mid-day meals, free primary schooling, rural employment guarantees, and food security.',
      'A Welfare State actively builds safety nets to uphold social justice.',
    ],
    bloomLevel: 'Applying',
  },
  {
    id: 'ch_c9_012',
    nodeId: NODE_C9_HISTCIV_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'In March 1977, following the 21-month Emergency, the Indian electorate voted the incumbent ruling party out of power. What core democratic principle did this event prove?',
    options: [
      'That the judiciary alone possesses the sovereign authority to dismiss an elected Prime Minister',
      'That periodic, competitive elections enforce democratic accountability by renewing or revoking the consent of the governed through the ballot box',
      'That elections are merely ritualistic ceremonies with no real power to change the executive government',
      'That State Governors hold discretionary power to override parliamentary general elections',
    ],
    correctIndex: 1,
    explanation:
      'The historic 1977 general election demonstrated that in a constitutional democracy, ultimate sovereignty rests with the people ("We, the People"). Periodic elections provide a peaceful, institutionalized mechanism to hold governments accountable and replace those who abuse executive authority.',
    hints: [
      'What happens to a government when citizens cast their ballots against it at the end of its tenure?',
      'Elections convert popular will into a legitimate transfer of constitutional authority.',
      'The ballot box provides the ultimate instrument of peaceful democratic accountability.',
    ],
    bloomLevel: 'Applying & Evaluating',
  },
  {
    id: 'ch_c9_008',
    nodeId: NODE_C9_HISTCIV_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Why does Article 324(5) mandate that the Chief Election Commissioner (CEC) can only be removed through parliamentary impeachment in like manner as a Supreme Court judge?',
    options: [
      'To ensure the CEC receives a lifetime cabinet salary from the Prime Minister’s discretionary fund',
      'To insulate the electoral referee from arbitrary executive retaliation, guaranteeing completely independent and impartial conduct of elections',
      'Because the CEC automatically serves as the ex-officio Chief Justice of India during polling week',
      'To allow State Chief Ministers to veto national election results',
    ],
    correctIndex: 1,
    explanation:
      'Security of tenure is the bedrock of institutional independence. If the ruling executive could remove the CEC at will, the Commission could not fearlessly enforce the Model Code of Conduct or counter electoral malpractices by the ruling party. Impeachment requires a 2/3 supermajority in both Houses of Parliament.',
    hints: [
      'If the Prime Minister could dismiss the CEC with a stroke of a pen, could the Election Commission remain an impartial referee?',
      'Security of tenure protects constitutional watchdogs from executive pressure.',
      'The high bar of parliamentary impeachment (proven misbehaviour or incapacity) shields the CEC from partisan dismissal.',
    ],
    misconceptionIndex: 3,
    bloomLevel: 'Understanding & Analyzing',
  },
  {
    id: 'ch_c9_014',
    nodeId: NODE_C9_HISTCIV_009,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Construct the exact constitutional composition of the Presidential Electoral College under Article 54 by selecting the correct voting components.',
    availableParts: [
      'Elected MPs of Lok Sabha & Rajya Sabha',
      'Elected MLAs of all State Legislative Assemblies',
      'Elected MLAs of Delhi & Puducherry UTs',
      'Nominated Members of Rajya Sabha',
      'Members of State Legislative Councils (MLCs)',
      'All Registered Adult Voters Nationwide',
    ],
    targetState:
      'Elected MPs of Lok Sabha & Rajya Sabha + Elected MLAs of all State Legislative Assemblies + Elected MLAs of Delhi & Puducherry UTs',
    validationHint:
      'The President is elected by ELECTED members of both Houses of Parliament and State Assemblies (+ Delhi & Puducherry). Nominated members, MLCs, and ordinary citizens do NOT participate.',
    explanation:
      'Under Article 54 and the 70th Constitutional Amendment Act, the Presidential Electoral College consists strictly of: (1) Elected MPs of Lok Sabha & Rajya Sabha, (2) Elected MLAs of all State Legislative Assemblies, and (3) Elected MLAs of Delhi and Puducherry UTs. Nominated members and State Legislative Council members (MLCs) are excluded.',
    hints: [
      'Only ELECTED representatives participate — nominated members have no vote.',
      'Include both national (MPs) and state (MLAs) elected legislators.',
      'Add the UT Assemblies of Delhi and Puducherry to the elected MPs and State MLAs.',
    ],
    misconceptionIndex: 4,
    bloomLevel: 'Applying',
  },

  // ── ADVANCED TIER (15-21) ──
  {
    id: 'ch_c9_015',
    nodeId: NODE_C9_HISTCIV_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In the landmark Kesavananda Bharati v. State of Kerala (1973) judgment, what definitive constitutional boundary did the Supreme Court establish regarding Constitutional Supremacy and Article 368?',
    options: [
      'Parliament possesses absolute, unlimited power to repeal the entire Constitution with a simple majority',
      'Parliament can amend constitutional provisions under Article 368, but cannot alter, damage, or destroy the "Basic Structure" of the Constitution',
      'The Prime Minister can suspend the Supreme Court and rewrite Fundamental Rights during economic downturns',
      'The British Crown retains sovereign authority to veto amendments passed by the Indian Parliament',
    ],
    correctIndex: 1,
    explanation:
      'The historic 13-judge bench in Kesavananda Bharati (1973) formulated the Basic Structure Doctrine. It affirmed that while Parliament has wide constituent amending power under Article 368, it cannot alter foundational pillars like democracy, secularism, rule of law, federalism, separation of powers, and judicial review.',
    hints: [
      'Can Parliament rewrite the Constitution so thoroughly that India ceases to be a democracy?',
      'Think of the "Basic Structure Doctrine" established on 24 April 1973.',
      'Parliament’s amending power is limited: the constitutional core cannot be destroyed.',
    ],
    bloomLevel: 'Analyzing & Evaluating',
  },
  {
    id: 'ch_c9_016',
    nodeId: NODE_C9_HISTCIV_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A municipal authority issues an arbitrary executive order prohibiting citizens from peacefully assembling in a public square to discuss public health policies. Which Fundamental Right is infringed, and what direct judicial remedy is available?',
    options: [
      'Right against Exploitation (Art 23); submit an informal request to the municipal clerk',
      'Right to Freedom (Art 19(1)(b) — freedom to assemble peaceably without arms); the citizen can petition the Supreme Court under Article 32 or High Court under Article 226 for a writ to quash the illegal order',
      'Cultural & Educational Rights (Art 29); no remedy exists because municipal orders are exempt from judicial review',
      'Fundamental Duties (Art 51A); the government has a moral duty to prevent all citizen gatherings',
    ],
    correctIndex: 1,
    explanation:
      'Article 19(1)(b) guarantees the right to assemble peaceably and without arms, subject only to reasonable restrictions under Art 19(3) in the interests of sovereignty or public order. An arbitrary executive ban violates this right, entitling citizens to seek writs under Article 32 (Supreme Court) or Article 226 (High Court).',
    hints: [
      'Which sub-clause of Article 19 protects peaceful assembly without weapons?',
      'How does Article 32 provide direct access to the apex court without needing to navigate lower civil courts first?',
      'The Right to Freedom of peaceful assembly is violated, enforceable through constitutional prerogative writs.',
    ],
    bloomLevel: 'Evaluating & Applying',
  },
  {
    id: 'ch_c9_017',
    nodeId: NODE_C9_HISTCIV_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'How did the 86th Constitutional Amendment Act (2002) exemplify the organic evolution of a Directive Principle into an enforceable Fundamental Right?',
    options: [
      'It abolished Article 45 entirely and made all primary education private and profit-driven',
      'It converted the non-justiciable welfare goal of Article 45 into an enforceable Fundamental Right under Article 21A (Right to Free & Compulsory Education for children aged 6-14)',
      'It made voting mandatory for all citizens above 18 years under penalty of fine',
      'It transferred all educational authority from State Governments to foreign NGOs',
    ],
    correctIndex: 1,
    explanation:
      'The 86th Amendment (2002) elevated the aspirational Directive Principle of Article 45 into a justiciable Fundamental Right by inserting Article 21A into Part III, guaranteeing free and compulsory education for all children aged 6 to 14. This culminated in the Right of Children to Free and Compulsory Education (RTE) Act 2009.',
    hints: [
      'What constitutional transformation occurred regarding free schooling for children aged 6-14 in 2002?',
      'Article 21A was inserted into Part III (Fundamental Rights).',
      'The non-justiciable aspiration of Article 45 became an enforceable citizen right under Article 21A.',
    ],
    bloomLevel: 'Analyzing',
  },
  {
    id: 'ch_c9_018',
    nodeId: NODE_C9_HISTCIV_006,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Match each landmark Indian Welfare State statute to the constitutional Directive Principle (Part IV) it operationalizes into statutory law:',
    options: [
      'MGNREGA 2005 -> Art 41 (Right to work); National Food Security Act 2013 -> Art 47 (Duty to raise nutrition & public health); Legal Services Authorities Act 1987 -> Art 39A (Equal justice & free legal aid)',
      'MGNREGA -> Art 14 (Equality before law); Food Security -> Art 18 (Abolition of titles); Legal Services -> Art 21A',
      'MGNREGA -> Art 51A (Fundamental duties); Food Security -> Art 326 (Voting age); Legal Services -> Art 324',
      'All three welfare acts were enacted under the British Government of India Act 1935 with no connection to Part IV',
    ],
    correctIndex: 0,
    explanation:
      'Directive Principles serve as the blueprint for Indian social legislation: Article 41 (right to work) inspired MGNREGA; Article 47 (nutrition and public health) inspired the Food Security Act; Article 39A (free legal aid) created the National Legal Services Authority (NALSA) and Lok Adalats.',
    hints: [
      'Article 41 deals with the right to work, education, and public assistance in cases of unemployment.',
      'Article 47 mandates the State to raise the level of nutrition and public health.',
      'Article 39A mandates free legal aid to ensure justice is not denied to any citizen by reason of economic disability.',
    ],
    bloomLevel: 'Analyzing & Connecting',
  },
  {
    id: 'ch_c9_019',
    nodeId: NODE_C9_HISTCIV_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'The Election Commission announces the General Election poll schedule on 10 March. On 12 March, the ruling Union Cabinet attempts to disburse ₹50,000 crore in fresh discretionary voter cash subsidies. What happens under the Model Code of Conduct (MCC)?',
    options: [
      'The subsidy is disbursed immediately because executive cabinet decisions supersede Election Commission regulations',
      'The Election Commission halts the scheme because the MCC takes effect the moment the election schedule is announced, strictly prohibiting ruling parties from announcing grants or new schemes that influence voters',
      'The Supreme Court must hold a nationwide referendum before the Election Commission can take notice',
      'The disbursement is doubled automatically for all opposition-held constituencies',
    ],
    correctIndex: 1,
    explanation:
      'The Model Code of Conduct (MCC) comes into force immediately upon the announcement of election dates by the ECI. Ministers and ruling party authorities are strictly barred from announcing financial grants, new welfare projects, laying foundation stones, or misusing government machinery/vehicles to secure electoral advantage.',
    hints: [
      'When does the Model Code of Conduct become operative?',
      'It activates the instant election dates are announced, preventing ruling parties from using public coffers for vote-buying.',
      'The ECI holds constitutional authority under Article 324 to enforce a level playing field.',
    ],
    bloomLevel: 'Applying & Evaluating',
  },
  {
    id: 'ch_c9_020',
    nodeId: NODE_C9_HISTCIV_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why did the framers of the Indian Constitution reject a direct presidential election in favor of a Westminster-style Parliamentary Executive?',
    options: [
      'Because the framers forgot to draft provisions for the executive head of state',
      'Because in a diverse country, a parliamentary system ensures the Executive (Prime Minister and Cabinet) is drawn from and continuously accountable to the directly elected Legislature, preventing authoritarian concentration of power',
      'Because only State Governors are permitted to exercise executive authority in South Asia',
      'Because direct elections were declared illegal by the United Nations in 1949',
    ],
    correctIndex: 1,
    explanation:
      'Dr. Ambedkar explained that the framers preferred the British parliamentary model because it provides "more responsibility" over "more stability". The Executive is daily and periodically assessed and held accountable on the floor of the Lok Sabha through questions, debates, and no-confidence motions.',
    hints: [
      'Does an Indian citizen vote directly for a Prime Minister, or for a local Member of Parliament?',
      'The Prime Minister must command majority confidence in the Lok Sabha.',
      'Parliamentary systems ensure continuous executive accountability to the elected representatives of the people.',
    ],
    misconceptionIndex: 4,
    bloomLevel: 'Analyzing & Evaluating',
  },
  {
    id: 'ch_c9_021',
    nodeId: NODE_C9_HISTCIV_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate and distinguish between a General Election, a Mid-Term Election, and a By-Election:',
    options: [
      'General = 1 seat vacancy; Mid-term = 5-year scheduled election; By-election = nationwide dissolution',
      'General Election = all seats polled at the end of the normal 5-year term; Mid-Term Election = all seats polled after premature dissolution of the House before 5 years; By-Election = election to fill a casual vacancy in a single constituency caused by death, resignation, or disqualification',
      'General = municipal wards only; Mid-Term = presidential polls only; By-Election = village panchayat only',
      'All three terms describe identical simultaneous nationwide general polling processes with no procedural difference',
    ],
    correctIndex: 1,
    explanation:
      'A General Election takes place across the country/state at the expiry of the standard 5-year term. A Mid-Term Election occurs when a House is prematurely dissolved (e.g., loss of majority) before completing its 5-year term. A By-Election is held in a single specific constituency to fill an isolated vacancy caused by death, resignation, or disqualification of a member.',
    hints: [
      'Look at two criteria: Scope (all seats vs one seat) and Timing (end of 5-year term vs premature dissolution vs mid-term vacancy).',
      'By-elections happen when an individual MP or MLA resigns or passes away.',
      'Mid-term elections happen when the entire government collapses early, necessitating fresh nationwide polls.',
    ],
    bloomLevel: 'Evaluating',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROPS INTERFACE
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT PROPS CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_HISTCIV_001,
  title: 'The Constitution & Democratic Elections in India',
  definition:
    'The Constitution of India is the supreme law of the land, establishing a sovereign socialist secular democratic republic with single citizenship, universal adult franchise, justiciable fundamental rights, directive principles for a welfare state, and an independent Election Commission overseeing free and fair elections.',
  eli5:
    'Think of the Constitution as the supreme rulebook of India. It protects every citizen, gives every adult one equal vote, prevents leaders from abusing power, and ensures that elections are conducted fairly by an independent referee.',
  misconceptions: [
    {
      misconception: 'The Constitution is merely a list of rights for citizens.',
      correction:
        'The Constitution has 3 core functions: structural (creating Parliament, Executive, Courts), protective (Fundamental Rights), and limiting (rule of law and judicial review under Article 13).',
    },
    {
      misconception: 'The Constitution was enforced on 26 November 1949.',
      correction:
        'It was ADOPTED on 26 November 1949, but ENFORCED on 26 January 1950 (Republic Day) to commemorate the 1930 Purna Swaraj pledge.',
    },
    {
      misconception: 'Single Citizenship means you can only hold one passport internationally.',
      correction:
        'Single Citizenship refers to domestic federalism: there is only Indian citizenship — no separate state-level citizenship (unlike the USA).',
    },
    {
      misconception: 'The Election Commission is a government department controlled by the ruling Prime Minister.',
      correction:
        'The ECI is an autonomous constitutional body under Article 324. The CEC can only be removed via impeachment by Parliament.',
    },
    {
      misconception: 'Voters directly elect the Prime Minister of India.',
      correction:
        'Voters elect local MPs to the Lok Sabha. The President appoints the leader commanding a Lok Sabha majority as Prime Minister.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which document is the supreme law of India?',
      options: ['The Indian Penal Code', 'The Constitution of India', 'Parliamentary Standing Orders', 'The Representation of the People Act'],
      correctIndex: 1,
    },
    {
      question: 'When was the Indian Constitution formally adopted by the Constituent Assembly?',
      options: ['15 August 1947', '26 November 1949', '26 January 1950', '2 October 1952'],
      correctIndex: 1,
    },
    {
      question: 'Which amendment lowered the voting age from 21 to 18 in India?',
      options: ['42nd Amendment (1976)', '44th Amendment (1978)', '61st Amendment (1988)', '86th Amendment (2002)'],
      correctIndex: 2,
    },
    {
      question: 'Under which Article can a citizen approach the Supreme Court directly for enforcement of Fundamental Rights?',
      options: ['Article 14', 'Article 21', 'Article 32', 'Article 51A'],
      correctIndex: 2,
    },
    {
      question: 'Are Directive Principles of State Policy directly enforceable in court?',
      options: ['Yes, by filing a writ petition', 'No, they are non-justiciable under Article 37', 'Yes, but only during financial emergencies', 'Only in the Supreme Court, not High Courts'],
      correctIndex: 1,
    },
    {
      question: 'Which article creates the Election Commission of India?',
      options: ['Article 280', 'Article 324', 'Article 356', 'Article 370'],
      correctIndex: 1,
    },
    {
      question: 'Who elects the members of the Rajya Sabha?',
      options: ['All adult citizens directly', 'Elected Members of State Legislative Assemblies (MLAs)', 'The President of India alone', 'Chief Ministers of all states'],
      correctIndex: 1,
    },
    {
      question: 'What is an election called when the entire Lok Sabha is dissolved before completing its 5-year term?',
      options: ['By-Election', 'General Election', 'Mid-Term Election', 'Indirect Election'],
      correctIndex: 2,
    },
  ],
  masteryCriteria:
    'Mastery is achieved when the student accurately distinguishes adoption from enforcement, evaluates constitutional supremacy, understands justiciable rights vs non-justiciable DPSPs, models the welfare state, and navigates direct vs indirect elections and ECI functions.',
};

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE LAB EXPLORATION STEPS
// ─────────────────────────────────────────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Constitutional Supremacy & The Trias Politica',
    instruction:
      'Click on each organ of government and test how Article 13 & Article 32 maintain checks and balances over ordinary legislation.',
    interactionType: 'click-pillars',
    nodeId: NODE_C9_HISTCIV_001,
  },
  {
    title: 'Lab 2: The 20-Year Timeline Bridge (1930 -> 1949 -> 1950)',
    instruction:
      'Drag the timeline slider to trace the historic connection from the Lahore Purna Swaraj pledge to Constitution Day and Republic Day.',
    interactionType: 'timeline-scrub',
    nodeId: NODE_C9_HISTCIV_002,
  },
  {
    title: 'Lab 3: Rights vs Duties vs DPSPs (Justiciability Balance)',
    instruction:
      'Toggle between Justiciable Rights (Part III), Aspirational DPSPs (Part IV), and Civic Duties (Part IVA) to analyze court enforceability.',
    interactionType: 'toggle-justiciability',
    nodeId: NODE_C9_HISTCIV_004,
  },
  {
    title: 'Lab 4: The Welfare State Safety-Net Simulator',
    instruction:
      'Adjust the State Welfare Investment slider from a Police State to a true Welfare State and observe poverty reduction and citizen dignity levels.',
    interactionType: 'welfare-slider',
    nodeId: NODE_C9_HISTCIV_006,
  },
  {
    title: 'Lab 5: The Electoral Engine (Direct vs Indirect Architecture)',
    instruction:
      'Click on a Citizen Voter to trace how their direct vote for an MLA/MP ripples upward into the Rajya Sabha and Presidential Electoral College.',
    interactionType: 'vote-trace',
    nodeId: NODE_C9_HISTCIV_009,
  },
];

// ───────────────��─────────────────────────────────────────────────────────────
// PREDICTION & OBSERVATION QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Parliament enacts an ordinary law that restricts free speech beyond the reasonable restrictions of Article 19(2), what constitutional power can the Supreme Court exercise?',
    options: [
      'Nothing — Parliament is supreme and can override all constitutional text',
      'Invoke Article 13 to declare the law unconstitutional and void ab initio',
      'Immediately dissolve both Houses of Parliament and call for fresh elections',
      'Refer the law to the International Court of Justice in The Hague',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now test the "Cycle Law Status" button in Lab 1 to observe Article 13 judicial review strike down unconstitutional legislation in real time.',
    nodeId: NODE_C9_HISTCIV_001,
  },
  {
    question:
      'Predict: If a rural worker is denied employment under MGNREGA despite state rules, can they seek legal relief in court?',
    options: [
      'No — because the right to work is rooted in Article 41 (a non-justiciable DPSP)',
      'Yes — because once Parliament passes a formal Act (MGNREGA 2005), the DPSP becomes an enforceable statutory right',
      'Only if the President declares a national economic emergency',
      'No — government welfare schemes are voluntary favors with no legal standing',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Explore Lab 4 to see how non-justiciable Directive Principles get transformed into justiciable statutory rights through legislation.',
    nodeId: NODE_C9_HISTCIV_006,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question:
      'What constitutional mechanism prevents an ordinary majority in Parliament from abolishing fundamental rights or democracy?',
    observableOptions: [
      'The British Crown veto',
      'The Basic Structure Doctrine and Article 13 Judicial Review',
      'Automatic dissolution by the United Nations',
      'Discretionary rule by State Governors',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_001,
  },
  {
    question:
      'What pattern emerges when you trace a citizen’s direct vote for a State MLA in the Electoral Engine?',
    observableOptions: [
      'The MLA vote has no impact outside state road repairs',
      'The direct vote carries indirect power: the elected MLA participates in electing both Rajya Sabha MPs and the President of India',
      'The MLA vote directly appoints the Chief Election Commissioner',
      'The MLA vote cancels the parliamentary Lok Sabha ballot',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_HISTCIV_009,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// REAL-WORLD CIVIC ACTION ACTIVITY
// ────────────────────────────────────────────────────────���────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Civic Blueprint: Be a Youth Election & Constitutional Officer',
  description:
    'Apply your understanding of constitutional supremacy, fundamental rights, and electoral democracy in your local community and school.',
  steps: [
    'Check your family’s voter registration on the official ECI Voter Service Portal (voters.eci.gov.in) using your Electoral Photo Identity Card (EPIC) number.',
    'Identify a local community need (clean water, primary healthcare, school infrastructure) and identify the exact Directive Principle (Art 41, 45, 47) and Fundamental Right (Art 21) that anchors it.',
    'Draft a 1-page formal civic petition to your local MLA or Municipal Councillor citing the constitutional mandate and relevant statutory welfare scheme.',
    'Organize a classroom mock election simulating secret balloting, Model Code of Conduct monitoring, and multi-member independent counting.',
  ],
};

// ═══════════════════════════════════════════════════════��═════════════════════
// MAIN COMPONENT FUNCTION
// ═════════════════════════════════════════════════════════════════════════════
function C9_HistoryCivicsDefinitionConstitutionSignificanceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_HISTCIV_001,
  title = DEFAULT_PROPS.title || 'Constitution & Democratic Elections',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ── Stream & Subject Configuration ──
  const subjectConfig = SUBJECT_CONFIG['histciv'] || {
    name: 'History & Civics',
    emoji: '🏛️',
    color: 'amber',
  };

  // ── Simulation Phases ──
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ── Adaptive & Scoring State ──
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ── Escalating Hints & Step Explanations ──
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ── Visual Feedback & Animations ──
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ── Challenge Type Specific Interactive State ──
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<string[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ── Discovery & Interactive Lab Specific State ──
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ── Interactive Exploration Lab States ──
  const [selectedPillar, setSelectedPillar] = useState<'legislature' | 'executive' | 'judiciary' | null>(null);
  const [lawStatus, setLawStatus] = useState<'valid' | 'clash' | 'struck_down'>('valid');
  const [timelineYear, setTimelineYear] = useState<number>(1950);
  const [activeTabJusticiability, setActiveTabJusticiability] = useState<'rights' | 'dpsp' | 'duties'>('rights');
  const [welfareSpend, setWelfareSpend] = useState<number>(75); // 0 = police state, 100 = full welfare
  const [selectedVoteTarget, setSelectedVoteTarget] = useState<'mla' | 'mp' | null>(null);
  const [voteRippleActive, setVoteRippleActive] = useState(false);

  // ── Sandbox Free Play Variables ──
  const [sandboxConstitutionSlider, setSandboxConstitutionSlider] = useState(85);
  const [sandboxVoterTurnout, setSandboxVoterTurnout] = useState(67);
  const [sandboxMccEnforced, setSandboxMccEnforced] = useState(true);
  const [sandboxWelfareAllocation, setSandboxWelfareAllocation] = useState(75);
  const [sandboxEvmTested, setSandboxEvmTested] = useState(false);

  // ── Refs ──
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── Filtered Challenges by Adaptive Difficulty ──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ── Load Saved Mastery on Mount ──
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ── BKT Difficulty Adjustment Effect ──
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

  // ── Canvas Pulse Effect for Challenge Arena ──
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(
        `🏛️ CIVICS ARENA • Challenge ${currentChallenge + 1} of ${filteredChallenges.length} • [${difficulty.toUpperCase()}]`,
        12,
        18
      );

      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 24, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length, difficulty]);

  // ── GSAP Timeline Animation Effect ──
  useEffect(() => {
    if (phase === 'explore' && currentSlide === 1 && timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.querySelectorAll('.timeline-card'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide, timelineYear]);

  // ── Escalating Hints Callback ──
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete constitutional reasoning step-by-step.');
    }
  }, [hintCount, challenge]);

  // ── Inactivity Timer Callback ──
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ── Phase Handlers ──
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant observation! 26 November 1949 was Adoption; 26 January 1950 was Enforcement.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Constitutional Labs. Let us learn by doing.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox unlocked. Experiment with constitutional controls without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenges initiated. Test your knowledge on the supreme law and democratic elections.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test and verify your hypothesis on the interactive simulation.');
  }, []);

  const handlePillarClick = useCallback((pillar: 'legislature' | 'executive' | 'judiciary') => {
    setSelectedPillar(pillar);
    audioManager.play('tap');
    if (pillar === 'judiciary') {
      speechManager.speak('Judiciary exercises Judicial Review under Article 13 and Article 32 to protect the Constitution.');
    } else if (pillar === 'legislature') {
      speechManager.speak('Legislature enacts laws but is bound by the basic structure and Fundamental Rights.');
    } else {
      speechManager.speak('Executive implements laws and policies under continuous parliamentary accountability.');
    }
  }, []);

  const handleLawTest = useCallback(() => {
    audioManager.play('balance');
    setLawStatus(prev => (prev === 'valid' ? 'clash' : prev === 'clash' ? 'struck_down' : 'valid'));
  }, []);

  const handleVoteTrace = useCallback((target: 'mla' | 'mp') => {
    setSelectedVoteTarget(target);
    setVoteRippleActive(true);
    audioManager.play('swoop');
    speechManager.speak(
      target === 'mla'
        ? 'Your direct vote elects an MLA, who then votes to elect Rajya Sabha MPs and the President of India!'
        : 'Your direct vote elects a Lok Sabha MP, who votes on laws and in the Presidential and Vice-Presidential elections!'
    );
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Simulation complete with a score of ${finalScore} percent.`);
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | string[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.sortItems);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding constitutional reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
          speechManager.speak('Review the full step-by-step constitutional explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrectMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrectMatch) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement(prev => {
      const items = prev.length > 0 ? [...prev] : [...(challenge.sortItems || [])];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge]);

  // Derived Welfare Chart Data for Lab 4 & Sandbox
  const welfareChartData = useMemo(() => {
    const healthPoverty = Math.max(10, 90 - welfareSpend * 0.8);
    const literacyRate = Math.min(98, 40 + welfareSpend * 0.58);
    const dignityIndex = Math.min(95, 30 + welfareSpend * 0.65);
    return [
      { metric: 'Poverty & Deprivation Rate', value: healthPoverty, fill: '#ef4444' },
      { metric: 'Literacy & Skill Floor', value: literacyRate, fill: '#3b82f6' },
      { metric: 'Citizen Dignity Index', value: dignityIndex, fill: '#10b981' },
    ];
  }, [welfareSpend]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans space-y-6">
      {/* ── HEADER & NAVIGATION BAR ── */}
      <header className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                ICSE Class 9 • Civics & Constitutional Framework
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                NEP 2020 Aligned
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Adaptive Difficulty */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono">
            Phase: {phase.toUpperCase()}
          </span>
        </div>
      </header>

      {/* ── PHASE 1: DISCOVERY HOOK & HISTORICAL SCENARIO ── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/30 rounded-2xl border border-amber-600/30 shadow-lg">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">Mission Scenario Brief</span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm md:text-base text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 pt-3 border-t border-amber-900/40 flex flex-wrap gap-4 text-xs font-medium text-amber-300/90">
              <span>🎯 <strong>Context:</strong> {SCENARIO.context}</span>
              <span>📋 <strong>Role:</strong> {SCENARIO.role}</span>
            </div>
          </div>

          {/* SVG Diagram 2 Preview: Timeline Bridge */}
          <TimelineHistoricalBridgeSvg currentYear={1950} />

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                ?
              </span>
              <h3 className="text-base md:text-lg font-bold text-white">Curiosity Discovery Hook</h3>
            </div>
            <p className="text-slate-200 font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  animate={wrongShake && discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-850 border-slate-750 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                >
                  <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
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
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Spot on! Accurate Historical Analysis.' : '💡 Key Historical Insight!'}
                  </p>
                  <p className="text-slate-300 text-xs mt-1">
                    {DISCOVERY_QUESTION.historicalFootnote}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 2: INTERACTIVE EXPLORATION LABS (5 LABS) ── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                Interactive Civics Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-bold"
              >
                ← Prev Lab
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Sandbox →' : 'Next Lab →'}
              </motion.button>
            </div>
          </div>

          <p className="text-sm text-amber-300/90 font-medium bg-amber-950/20 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 min-h-[420px] flex flex-col justify-center space-y-6">
            {/* LAB 1: PILLARS & CONSTITUTIONAL SUPREMACY */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <ConstitutionHierarchySvg
                  activePillar={selectedPillar}
                  lawStatus={lawStatus}
                  onPillarClick={handlePillarClick}
                />

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                      Test Judicial Review in Action (Article 13 Simulation)
                    </span>
                    <p className="text-sm font-bold text-slate-200 mt-0.5">
                      Current Law Status: <span className="text-amber-400">{lawStatus.toUpperCase()}</span>
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLawTest}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold shadow"
                  >
                    Cycle Statutory Status 🔄
                  </motion.button>
                </div>

                {/* Prediction Hook for Lab 1 */}
                {!predictionMade ? (
                  <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/50 space-y-3">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase">
                      Lab Prediction: Judicial Power
                    </span>
                    <p className="text-xs text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handlePrediction(i)}
                          className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-left text-slate-300"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/40 text-xs text-emerald-300">
                    ✓ Prediction verified! Article 13 empowers courts to nullify laws violating Part III rights.
                  </div>
                )}
              </div>
            )}

            {/* LAB 2: TIMELINE BRIDGE */}
            {currentSlide === 1 && (
              <div ref={timelineGsapRef} className="space-y-6">
                <TimelineHistoricalBridgeSvg currentYear={timelineYear} />

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Drag to Scrub Year: {timelineYear}</span>
                    <span className="text-amber-400 font-bold">1930 (Lahore) ➔ 1950 (Republic Day)</span>
                  </div>
                  <input
                    type="range"
                    min={1930}
                    max={1950}
                    step={1}
                    value={timelineYear}
                    onChange={e => {
                      setTimelineYear(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                    aria-label="Timeline Year Slider from 1930 to 1950"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div
                    className={`p-4 rounded-xl border timeline-card transition-all ${
                      timelineYear <= 1935 ? 'bg-amber-950/40 border-amber-500' : 'bg-slate-800/40 border-slate-750'
                    }`}
                  >
                    <span className="text-xs font-mono text-amber-400 font-bold">26 Jan 1930</span>
                    <h4 className="text-sm font-bold text-white mt-1">Purna Swaraj Pledge</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Lahore Congress session under Jawaharlal Nehru pledges complete independence from colonial rule.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-xl border timeline-card transition-all ${
                      timelineYear >= 1946 && timelineYear <= 1949
                        ? 'bg-gold-950/40 border-gold-500'
                        : 'bg-slate-800/40 border-slate-750'
                    }`}
                  >
                    <span className="text-xs font-mono text-gold-400 font-bold">26 Nov 1949</span>
                    <h4 className="text-sm font-bold text-white mt-1">Constitution Adopted</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Constituent Assembly approves final draft after 2 years, 11 months, and 18 days of rigorous debate.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-xl border timeline-card transition-all ${
                      timelineYear === 1950 ? 'bg-emerald-950/40 border-emerald-500' : 'bg-slate-800/40 border-slate-750'
                    }`}
                  >
                    <span className="text-xs font-mono text-emerald-400 font-bold">26 Jan 1950</span>
                    <h4 className="text-sm font-bold text-white mt-1">Republic Day Enforced</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Constitution comes into full force, deliberately honoring the 20th anniversary of Purna Swaraj!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: RIGHTS VS DPSPS BALANCE SCALE */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {(['rights', 'dpsp', 'duties'] as const).map(tab => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTabJusticiability(tab);
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        activeTabJusticiability === tab
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab === 'rights'
                        ? 'Fundamental Rights (Part III)'
                        : tab === 'dpsp'
                        ? 'DPSPs (Part IV)'
                        : 'Fundamental Duties (Part IVA)'}
                    </motion.button>
                  ))}
                </div>

                <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  {activeTabJusticiability === 'rights' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <span>⚖️ JUSTICIABLE (Enforceable by Courts of Law)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Articles 12 to 35. These are negative injunctions barring State overreach. If violated, a citizen
                        can directly petition the Supreme Court under Article 32 or High Court under Article 226 for
                        prerogative writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari).
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 text-xs">
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 14-18: Equality
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 19-22: Freedom
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 23-24: Exploitation
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 25-28: Religion
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 29-30: Culture/Edu
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 32: Writs & Remedies
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTabJusticiability === 'dpsp' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <span>🌱 NON-JUSTICIABLE (Fundamental in Governance)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Articles 36 to 51 (borrowed from the Irish Constitution). Positive socio-economic directives
                        guiding the State to build an egalitarian Welfare State. Under Article 37, courts cannot enforce
                        them directly, but they form the moral and statutory foundation for Acts like MGNREGA and RTE.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2 text-xs">
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 39A: Free Legal Aid
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 40: Village Panchayats
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 41: Right to Work
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 45: Early Child Care
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 47: Public Health
                        </span>
                        <span className="p-2 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          Art 48A: Environment
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTabJusticiability === 'duties' && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
                        <span>🇮🇳 MORAL OBLIGATIONS (Added by 42nd Amendment Act 1976)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Article 51A in Part IVA (11 duties). Recommended by the Swaran Singh Committee. Non-justiciable
                        civic duties reminding citizens that liberty requires personal responsibility (respecting the
                        national flag, cherishing noble ideals of the freedom struggle, protecting wildlife, developing
                        scientific temper).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LAB 4: WELFARE STATE SIMULATOR */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    State Model:{' '}
                    <strong className="text-white">
                      {welfareSpend < 30
                        ? 'Police State (Order & Defence Only)'
                        : welfareSpend < 65
                        ? 'Mixed Economy with Limited Relief'
                        : 'Constitutional Welfare State (Universal Safety Floor)'}
                    </strong>
                  </span>
                  <span className="text-xs font-bold text-amber-400 font-mono">{welfareSpend}% Welfare Spend</span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  value={welfareSpend}
                  onChange={e => {
                    setWelfareSpend(Number(e.target.value));
                    audioManager.play('count');
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                  aria-label="Welfare State Investment Slider"
                />

                <div className="h-44 w-full bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={welfareChartData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 10 }} />
                      <YAxis
                        dataKey="metric"
                        type="category"
                        stroke="#94a3b8"
                        tick={{ fontSize: 10 }}
                        width={140}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          fontSize: '11px',
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                        {welfareChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  💡 <strong>Constitutional Link:</strong> Articles 38 & 39 mandate that the State shall direct its policy
                  towards securing adequate livelihood, distributed resources, and prevention of wealth concentration.
                </div>
              </div>
            )}

            {/* LAB 5: ELECTORAL ENGINE (DIRECT VS INDIRECT) */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <ElectoralPyramidSvg
                  activeTrace={selectedVoteTarget}
                  onTraceSelect={handleVoteTrace}
                />

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVoteTrace('mla')}
                    className={`flex-1 p-3 rounded-xl border text-left text-xs ${
                      selectedVoteTarget === 'mla'
                        ? 'bg-gold-950 border-gold-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-bold text-amber-400 block mb-1">Trace Vote A: State MLA</span>
                    Voter casts direct secret ballot for Assembly representative.
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVoteTrace('mp')}
                    className={`flex-1 p-3 rounded-xl border text-left text-xs ${
                      selectedVoteTarget === 'mp'
                        ? 'bg-emerald-950 border-emerald-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-bold text-emerald-400 block mb-1">Trace Vote B: Lok Sabha MP</span>
                    Voter casts direct secret ballot in Parliamentary Constituency.
                  </motion.button>
                </div>

                {voteRippleActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                  >
                    <span className="text-xs font-mono text-amber-400 font-bold block">
                      ⚡ Indirect Power Cascade of Your Single Direct Vote:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="font-bold text-white block mb-1">🗳️ Rajya Sabha Election</span>
                        Your elected MLA votes in the proportional representation ballot to elect Rajya Sabha MPs from
                        your State.
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="font-bold text-white block mb-1">🏛️ Presidential Electoral College</span>
                        Your elected MLA and Lok Sabha MP join the Article 54 Electoral College to elect the President of
                        India!
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 3: FREE PLAY SANDBOX ── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Constitutional & Electoral Sandbox (Free Play)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Freely manipulate governance parameters without grading. Test constitutional stress thresholds.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Constitutional Enforcement Index (Rule of Law)</span>
                    <span className="font-mono text-amber-400">{sandboxConstitutionSlider}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sandboxConstitutionSlider}
                    onChange={e => setSandboxConstitutionSlider(Number(e.target.value))}
                    className="w-full accent-amber-500"
                    aria-label="Constitutional Enforcement Slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Voter Participation & Turnout Rate</span>
                    <span className="font-mono text-gold-400">{sandboxVoterTurnout}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sandboxVoterTurnout}
                    onChange={e => setSandboxVoterTurnout(Number(e.target.value))}
                    className="w-full accent-gold-500"
                    aria-label="Voter Turnout Slider"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>DPSP Welfare Budget Allocation</span>
                    <span className="font-mono text-emerald-400">{sandboxWelfareAllocation}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sandboxWelfareAllocation}
                    onChange={e => setSandboxWelfareAllocation(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                    aria-label="DPSP Welfare Allocation Slider"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-300">Model Code of Conduct (MCC) Enforced</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSandboxMccEnforced(!sandboxMccEnforced);
                      audioManager.play('pop');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      sandboxMccEnforced
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-900/60 text-rose-300 border border-rose-600'
                    }`}
                  >
                    {sandboxMccEnforced ? 'MCC Active ✓' : 'MCC Suspended ✗'}
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <span>
                Simulated State Stability Score:{' '}
                <strong className="text-amber-400 font-mono">
                  {Math.round(
                    (sandboxConstitutionSlider * 0.4 +
                      sandboxVoterTurnout * 0.3 +
                      sandboxWelfareAllocation * 0.3) *
                      (sandboxMccEnforced ? 1 : 0.7)
                  )}
                  /100
                </strong>
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg"
              >
                Proceed to 21 Graded Challenges →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 4: CHALLENGE ARENA (21 CHALLENGES) ── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <canvas ref={canvasRef} width={600} height={28} className="w-full bg-slate-900 rounded-lg" />

          {/* Progress Indicator */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-bold">
                Competency: {challenge.competencyLevel.toUpperCase()} • Bloom: {challenge.bloomLevel || 'Applied'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                {challenge.id}
              </span>
            </div>

            <p className="text-base md:text-lg font-bold text-white leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ / CLASSIFY / DISTINGUISH / MATCH WITH SHAKE ANIMATION */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      disabled={answerRevealed || showExplanation}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    >
                      <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL CHALLENGE */}
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
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-grab shadow"
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['feat_unity', 'feat_equality', 'feat_ballot', 'feat_national'].map(targetKey => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[70px] flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400 font-mono">
                        {targetKey === 'feat_unity' && 'National Unity (Single Passport & Rights):'}
                        {targetKey === 'feat_equality' && 'Political Equality (1 Person 1 Vote):'}
                        {targetKey === 'feat_ballot' && 'Adult Suffrage Constitutional Seat:'}
                        {targetKey === 'feat_national' && 'Citizenship Provisions in Part II:'}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-lg ${
                          droppedLabels[targetKey]
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {droppedLabels[targetKey] || 'Drop Target'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow"
                >
                  Verify Dragged Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to arrange in ascending Article order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems).map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(String(idx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, idx);
                        setDraggedItem(null);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-850 hover:bg-slate-800 rounded-xl border border-slate-755 text-slate-200 text-xs flex items-center justify-between cursor-grab"
                      role="button"
                      aria-label={`Sort item ${idx + 1}: ${item}`}
                    >
                      <span>
                        <strong className="text-amber-400 mr-2">{idx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕️</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation}
                  onClick={() => handleAnswer(sortArrangement.length > 0 ? sortArrangement : challenge.sortItems || [])}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow"
                >
                  Confirm Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-slate-400 text-sm font-mono">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    disabled={showExplanation}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow"
                  >
                    Submit Number
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-600 rounded-lg text-xs flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">
                      Click components above to assemble the constitutional Electoral College
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation || constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' + '))}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow"
                >
                  Verify Electoral College
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/30 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                    Step-by-Step Constitutional Reasoning
                  </span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((stepText, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-2">Step {idx + 1}:</span>
                      {stepText}
                      {!stepText.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between gap-3">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Reasoning Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow-lg uppercase tracking-wider"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Complete Simulation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 5: MASTERY & REFLECTION COMPLETION ── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 rounded-3xl border border-amber-500/40 text-center space-y-4">
            <span className="text-5xl">🏛️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Civics & Constitutional Simulation Completed!
            </h2>
            <div className="flex justify-center gap-6 text-sm font-mono">
              <span className="text-emerald-400 font-bold">Final Score: {Math.max(0, 100 - errors * 5)}%</span>
              <span className="text-amber-400 font-bold">Mastery Level: {masteryLevel.toUpperCase()}</span>
            </div>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You have demonstrated exceptional mastery over constitutional supremacy, fundamental rights remedies, welfare architecture, and electoral democracy.'
                : errors <= 3
                ? 'Outstanding performance! You possess a robust analytical grasp of constitutional law and elections. Review any missed concepts below.'
                : 'Good effort! Every error in civics is an opportunity to strengthen understanding of our republic. Study the misconception profile below.'}
            </p>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider font-mono">
                Your Misconception Review Profile:
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-4 bg-slate-950 rounded-xl border border-rose-900/50 space-y-1">
                    <p className="text-xs text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ Constitutional Truth: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase font-bold">
                Spaced Repetition Review Schedule
              </span>
              <p className="text-xs text-slate-300 mt-1">
                Next memory reinforcement session recommended in{' '}
                <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🌟</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-amber-400 mr-2">{idx + 1}.</span>
                  {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SIM ENGINE FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_HistoryCivicsDefinitionConstitutionSignificanceSim;