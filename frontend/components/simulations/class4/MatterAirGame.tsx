'use client';

/**
 * MatterAirGame — Learn about matter, air properties, composition, and breathing
 *
 * CISCE Nodes: c4_chem_001 (Revision of matter - solids, liquids, gases),
 *              c4_chem_002 (Properties of air),
 *              c4_chem_003 (Composition of air - gases and water vapour),
 *              c4_chem_004 (Process of breathing and respiration - chemistry link)
 *
 * Mascot: Chemist Chetan — a friendly chemist with a lab coat, safety goggles,
 * a beaker, and a molecule-shaped badge.
 *
 * 8 progressive challenges:
 * 1. Identify solid properties (definite shape and volume)
 * 2. Identify liquid properties (takes container shape, fixed volume)
 * 3. Sort objects into solids, liquids, and gases
 * 4. Identify air as a mixture of gases
 * 5. Sort gases by their percentage in air (Nitrogen 78%, Oxygen 21%, etc.)
 * 6. Identify what burning candle needs (Oxygen)
 * 7. Sort statements into Breathing vs Burning vs Both
 * 8. Sequence the steps of breathing and respiration
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── Teaching Slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Three States of Matter! 🧊",
    text: "Matter is anything that takes up space and has weight! Solids have a definite shape and volume (stone, book). Liquids have a definite volume but take the container shape (water, milk). Gases have neither definite shape nor volume, filling any space (air, steam)!",
    emoji: "🧊",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "Matter is anything that takes up space and has weight! Solids have a definite shape and volume. Liquids take the shape of their container. Gases fill any space completely!"
  },
  {
    title: "Properties of Air! 💨",
    text: "Air is invisible, has weight, occupies space, and expands when heated! A balloon filled with air weighs more than an empty one. Water cannot enter an inverted tumbler because air already occupies that space!",
    emoji: "💨",
    bgColor: "from-cyan-500 to-blue-600",
    spoken: "Air is invisible, has weight, occupies space, and expands when heated! A balloon filled with air weighs more than an empty one."
  },
  {
    title: "Composition of Air! 🌍",
    text: "Air is not a single gas — it is a mixture! The major component is Nitrogen (about 78 percent), which is the largest part. Oxygen makes up about 21 percent and is essential for breathing and burning. Carbon dioxide and water vapour make up the rest!",
    emoji: "🌍",
    bgColor: "from-teal-500 to-cyan-600",
    spoken: "Air is a mixture of gases! Nitrogen makes up seventy-eight percent, and oxygen makes up twenty-one percent. There is also carbon dioxide and water vapour!"
  },
  {
    title: "Breathing and Respiration! 🫁",
    text: "Breathing is the physical process of taking in oxygen-rich air (inhalation) and giving out carbon dioxide-rich air (exhalation). Respiration is the chemical process inside body cells where oxygen breaks down food to release energy!",
    emoji: "🫁",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Breathing is taking in oxygen and giving out carbon dioxide. Respiration is the chemical process inside our cells where oxygen breaks down food to release energy!"
  },
  {
    title: "Burning and Oxygen! 🔥",
    text: "Both a burning candle and a living person need oxygen from the air! Burning is a fast reaction outside the body, while respiration is a slow, controlled reaction inside the body. Both use oxygen and release carbon dioxide!",
    emoji: "🔥",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Both a burning candle and a living person need oxygen from the air! Burning is fast, while respiration inside our body is slow and controlled."
  }
];

// ─── Custom SVG Icon Components ───────────────────────────────

function SolidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="15" width="36" height="30" rx="4" fill="#78909C" stroke="#37474F" strokeWidth="2" />
      <path d="M12 25 L48 25" stroke="#37474F" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2" fill="#CFD8DC" />
      <circle cx="40" cy="38" r="2.5" fill="#CFD8DC" />
    </svg>
  );
}

function LiquidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Beaker */}
      <path d="M18 12 L42 12 L42 48 C42 50, 40 52, 38 52 L22 52 C20 52, 18 50, 18 48 Z" fill="none" stroke="#90A4AE" strokeWidth="2.5" />
      {/* Liquid inside */}
      <path d="M19 28 L41 28 L41 48 C41 50, 39 51, 37 51 L23 51 C21 51, 19 50, 19 48 Z" fill="#4FC3F7" opacity="0.8" />
      {/* Measurement ticks */}
      <line x1="38" y1="20" x2="41" y2="20" stroke="#78909C" strokeWidth="1.5" />
      <line x1="38" y1="30" x2="41" y2="30" stroke="#78909C" strokeWidth="1.5" />
      <line x1="38" y1="40" x2="41" y2="40" stroke="#78909C" strokeWidth="1.5" />
    </svg>
  );
}

function GasIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Swirling gas clouds */}
      <path d="M15 30 Q20 20, 30 25 T45 20 T50 35 T35 45 T20 38 Z" fill="#81D4FA" opacity="0.6" stroke="#0288D1" strokeWidth="1.5" />
      <circle cx="25" cy="22" r="3" fill="#29B6F6" opacity="0.8" />
      <circle cx="40" cy="32" r="4" fill="#29B6F6" opacity="0.8" />
      <circle cx="30" cy="38" r="2.5" fill="#29B6F6" opacity="0.8" />
    </svg>
  );
}

function BalloonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="24" rx="16" ry="19" fill="#EF5350" stroke="#C62828" strokeWidth="1.5" />
      <path d="M28 43 L32 43 L33 47 L27 47 Z" fill="#C62828" />
      <path d="M30 47 Q33 53, 28 58" stroke="#B0BEC5" strokeWidth="1.5" fill="none" />
      <ellipse cx="23" cy="16" rx="3" ry="5" fill="white" opacity="0.5" transform="rotate(-30 23 16)" />
    </svg>
  );
}

function NitrogenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="30" r="12" fill="#3B82F6" opacity="0.9" />
      <circle cx="40" cy="30" r="12" fill="#3B82F6" opacity="0.9" />
      <line x1="28" y1="30" x2="32" y2="30" stroke="#1E40AF" strokeWidth="4" />
      <text x="16" y="35" fill="white" fontSize="12" fontWeight="bold">N</text>
      <text x="36" y="35" fill="white" fontSize="12" fontWeight="bold">N</text>
    </svg>
  );
}

function OxygenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="30" r="12" fill="#EF4444" opacity="0.9" />
      <circle cx="40" cy="30" r="12" fill="#EF4444" opacity="0.9" />
      <line x1="28" y1="30" x2="32" y2="30" stroke="#991B1B" strokeWidth="4" />
      <text x="16" y="35" fill="white" fontSize="12" fontWeight="bold">O</text>
      <text x="36" y="35" fill="white" fontSize="12" fontWeight="bold">O</text>
    </svg>
  );
}

function CarbonDioxideIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="10" fill="#6B7280" />
      <circle cx="15" cy="18" r="8" fill="#EF4444" />
      <circle cx="45" cy="18" r="8" fill="#EF4444" />
      <line x1="22" y1="24" x2="26" y2="28" stroke="#374151" strokeWidth="3" />
      <line x1="38" y1="24" x2="34" y2="28" stroke="#374151" strokeWidth="3" />
      <text x="26" y="34" fill="white" fontSize="10" fontWeight="bold">C</text>
      <text x="12" y="22" fill="white" fontSize="9" fontWeight="bold">O</text>
      <text x="42" y="22" fill="white" fontSize="9" fontWeight="bold">O</text>
    </svg>
  );
}

function WaterVapourIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="22" r="8" fill="#EF4444" />
      <circle cx="20" cy="38" r="6" fill="#3B82F6" />
      <circle cx="40" cy="38" r="6" fill="#3B82F6" />
      <line x1="25" y1="28" x2="22" y2="34" stroke="#1E3A8A" strokeWidth="2.5" />
      <line x1="35" y1="28" x2="38" y2="34" stroke="#1E3A8A" strokeWidth="2.5" />
      <text x="27" y="25" fill="white" fontSize="9" fontWeight="bold">O</text>
      <text x="17" y="41" fill="white" fontSize="8" fontWeight="bold">H</text>
      <text x="37" y="41" fill="white" fontSize="8" fontWeight="bold">H</text>
    </svg>
  );
}

function CandleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="30" width="16" height="22" fill="#FDE047" rx="2" stroke="#CA8A04" strokeWidth="1" />
      <line x1="30" y1="24" x2="30" y2="30" stroke="#1F2937" strokeWidth="2" />
      <path d="M30 10 Q25 18, 30 24 Q35 18, 30 10 Z" fill="#F97316" />
      <path d="M30 14 Q27 19, 30 22 Q33 19, 30 14 Z" fill="#FEF08A" />
    </svg>
  );
}

function LungsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 12 L30 22" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 22 Q18 20, 14 30 Q10 42, 22 46 Q30 42, 28 30 Z" fill="#F43F5E" opacity="0.8" stroke="#BE123C" strokeWidth="1.5" />
      <path d="M30 22 Q42 20, 46 30 Q50 42, 38 46 Q30 42, 32 30 Z" fill="#F43F5E" opacity="0.8" stroke="#BE123C" strokeWidth="1.5" />
    </svg>
  );
}

function WindIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 20 L35 20 C40 20, 42 16, 40 13 C38 10, 33 12, 35 16" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M15 35 L45 35 C50 35, 52 31, 50 28 C48 25, 43 27, 45 31" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M8 48 L25 48 C30 48, 32 44, 30 41 C28 38, 23 40, 25 44" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function InhalationIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="22" r="10" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
      <path d="M15 48 Q30 38, 45 48" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <path d="M25 15 Q30 5, 35 15" stroke="#2563EB" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M30 8 L27 12 M30 8 L33 12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function renderSortIcon(id: string, size: number = 44) {
  switch (id) {
    case 'stone':
    case 'book':
    case 'ruler':
    case 'laddoo':
    case 'brick':
    case 'solids':
      return <SolidIcon size={size} />;
    case 'water':
    case 'milk':
    case 'oil':
    case 'juice':
    case 'liquids':
      return <LiquidIcon size={size} />;
    case 'air':
    case 'cooking-gas':
    case 'breath':
    case 'steam':
    case 'gases':
      return <GasIcon size={size} />;
    case 'nitrogen':
      return <NitrogenIcon size={size} />;
    case 'oxygen':
      return <OxygenIcon size={size} />;
    case 'co2':
      return <CarbonDioxideIcon size={size} />;
    case 'other':
      return <WaterVapourIcon size={size} />;
    case 'breathing-in':
    case 'lungs-air':
    case 'absorbed-blood':
    case 'exhalation':
      return <InhalationIcon size={size} />;
    case 'respiration':
    case 'co2-waste':
      return <LungsIcon size={size} />;
    case 'burn-fuel':
    case 'burn-heat':
      return <CandleIcon size={size} />;
    case 'burn-both':
      return <WindIcon size={size} />;
    default:
      return <SolidIcon size={size} />;
  }
}

// ─── Chemist Chetan Mascot ────────────────────────────────────

function ChemistChetan({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-blue-400"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 5, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Lab coat body */}
          <path d="M22 45 L37 48 L53 45 L53 82 C53 85, 48 87, 45 87 L30 87 C27 87, 22 85, 22 82 Z" fill="white" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Beaker badge on coat */}
          <circle cx="43" cy="62" r="6" fill="#3B82F6" />
          <path d="M41 60 L45 60 L44 65 L42 65 Z" fill="white" />
          {/* Head */}
          <circle cx="37.5" cy="30" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Safety goggles */}
          <rect x="25" y="23" width="11" height="8" rx="2" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
          <rect x="39" y="23" width="11" height="8" rx="2" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
          <line x1="36" y1="27" x2="39" y2="27" stroke="#1D4ED8" strokeWidth="2" />
          {/* Smile */}
          <path d="M32 40 Q37.5 44 43 40" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Hair */}
          <path d="M21 28 Q23 14, 37.5 14 Q52 14, 54 28 Z" fill="#78350F" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Chemistry Lab Scene Background ───────────────────────────

function LabSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky/Wall gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="bench-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#lab-bg)" />
        {/* Lab bench */}
        <rect x="0" y={height - 70} width={width} height={70} fill="url(#bench-grad)" />
        <rect x="0" y={height - 75} width={width} height={5} fill="#64748B" />

        {/* Distillation apparatus silhouette */}
        <path d="M 60 {height - 75} L 60 {height - 140} Q 60 {height - 160}, 80 {height - 160} L 100 {height - 160}" stroke="#94A3B8" strokeWidth="3" fill="none" opacity="0.4" />
        <circle cx="60" cy={height - 150} r="15" fill="#38BDF8" opacity="0.3" />

        {/* Gas jars on shelf */}
        <rect x={width - 180} y={height - 180} width="140" height="12" fill="#64748B" rx="2" opacity="0.6" />
        <rect x={width - 160} y={height - 215} width="30" height="35" rx="4" fill="#E2E8F0" opacity="0.3" />
        <rect x={width - 110} y={height - 215} width="30" height="35" rx="4" fill="#38BDF8" opacity="0.3" />
      </svg>
    </div>
  );
}

// ─── Sort Card Component ──────────────────────────────────────

interface SortCardProps {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: SortCardProps) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-blue-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

interface SortBinProps {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: SortBinProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}22`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-white px-2 py-1 rounded-lg text-center shadow" style={{ backgroundColor: color }}>
        {label}
      </span>
    </div>
  );
}

// ─── Challenges Array (8 progressive challenges) ──────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBinData {
  id: string;
  label: string;
  color: string;
}

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: SortItem[];
  bins?: SortBinData[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which state of matter has a DEFINITE shape and DEFINITE volume?',
    answer: 'Solid',
    options: ['Solid', 'Liquid', 'Gas'],
    hint: 'Think: A stone or a book keeps its own shape and size everywhere!',
    misconception: 'Solids have both a definite shape and a definite volume! Liquids take container shape, and gases fill any space.',
  },
  {
    type: 'identify',
    question: 'Which state of matter takes the SHAPE of its container but keeps the same volume?',
    answer: 'Liquid',
    options: ['Solid', 'Liquid', 'Gas'],
    hint: 'Think: Water flows and changes shape when poured from a glass to a bowl!',
    misconception: 'Liquids have a definite volume but no definite shape — they take the shape of their container! Gases have neither.',
  },
  {
    type: 'sort',
    question: 'Drag each object to its correct state of matter!',
    answer: 'sort',
    options: [],
    hint: 'Solids keep shape (stone), liquids flow (water), gases fill space (air)!',
    misconception: 'Check your sorting! Solids have fixed shape, liquids flow into containers, and gases spread everywhere.',
    sortItems: [
      { id: 'stone', label: 'Stone (Solid)', icon: 'stone', correctBin: 'solids' },
      { id: 'water', label: 'Water (Liquid)', icon: 'water', correctBin: 'liquids' },
      { id: 'air', label: 'Air (Gas)', icon: 'air', correctBin: 'gases' },
      { id: 'milk', label: 'Milk (Liquid)', icon: 'milk', correctBin: 'liquids' },
    ],
    bins: [
      { id: 'solids', label: 'Solids 🧊', color: '#3B82F6' },
      { id: 'liquids', label: 'Liquids 💧', color: '#06B6D4' },
      { id: 'gases', label: 'Gases 💨', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'What is AIR mostly made of?',
    answer: 'A mixture of gases (mostly nitrogen & oxygen)',
    options: ['A pure substance of only oxygen', 'A mixture of gases (mostly nitrogen & oxygen)', 'A liquid like water'],
    hint: 'Remember: air contains nitrogen (~78%), oxygen (~21%), and other gases!',
    misconception: 'Air is NOT pure oxygen! It is a mixture of different gases, with nitrogen as the major component and oxygen second.',
  },
  {
    type: 'sort',
    question: 'Drag each gas to its correct percentage in air!',
    answer: 'sort',
    options: [],
    hint: 'Nitrogen is the biggest part (~78%), oxygen is second (~21%)!',
    misconception: 'Nitrogen is ~78% (the major part), oxygen is ~21%, and carbon dioxide & others make up the rest!',
    sortItems: [
      { id: 'nitrogen', label: 'Nitrogen (~78%)', icon: 'nitrogen', correctBin: 'bin-78' },
      { id: 'oxygen', label: 'Oxygen (~21%)', icon: 'oxygen', correctBin: 'bin-21' },
      { id: 'co2', label: 'Carbon Dioxide', icon: 'co2', correctBin: 'bin-co2' },
    ],
    bins: [
      { id: 'bin-78', label: 'Nitrogen 78%', color: '#3B82F6' },
      { id: 'bin-21', label: 'Oxygen 21%', color: '#EF4444' },
      { id: 'bin-co2', label: 'CO2 & Others', color: '#6B7280' },
    ],
  },
  {
    type: 'identify',
    question: 'What does a burning candle NEED to keep burning?',
    answer: 'Oxygen from the air',
    options: ['Nitrogen from the air', 'Oxygen from the air', 'Carbon dioxide'],
    hint: 'Think: Both living beings and burning flames need this vital gas!',
    misconception: 'Burning requires OXYGEN from the air! Nitrogen does not support burning.',
  },
  {
    type: 'sort',
    question: 'Drag each statement to Breathing or Burning or Both!',
    answer: 'sort',
    options: [],
    hint: 'Breathing takes in oxygen; burning also needs oxygen to make flame!',
    misconception: 'Both breathing and burning use oxygen and release carbon dioxide, but breathing happens in living bodies while burning is a flame outside!',
    sortItems: [
      { id: 'breathing-in', label: 'Inhales oxygen', icon: 'inhalation', correctBin: 'breathing' },
      { id: 'burn-fuel', label: 'Needs fuel & flame', icon: 'burn-fuel', correctBin: 'burning' },
      { id: 'burn-both', label: 'Releases CO2', icon: 'burn-both', correctBin: 'both' },
    ],
    bins: [
      { id: 'breathing', label: 'Breathing 🫁', color: '#EC4899' },
      { id: 'burning', label: 'Burning 🔥', color: '#F59E0B' },
      { id: 'both', label: 'Both 🌍', color: '#8B5CF6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag the steps of breathing and respiration in order!',
    answer: 'sort',
    options: [],
    hint: 'First we breathe in air, oxygen goes to lungs, then blood, then respiration!',
    misconception: 'Order of breathing: 1. Breathe in air (inhalation) -> 2. Air enters lungs -> 3. Oxygen absorbed by blood -> 4. Respiration releases energy!',
    sortItems: [
      { id: 'step1', label: '1. Inhale air', icon: 'inhalation', correctBin: 'order1' },
      { id: 'step2', label: '2. Air enters lungs', icon: 'lungs-air', correctBin: 'order2' },
      { id: 'step3', label: '3. Oxygen to blood', icon: 'absorbed-blood', correctBin: 'order3' },
      { id: 'step4', label: '4. Cellular energy', icon: 'respiration', correctBin: 'order4' },
    ],
    bins: [
      { id: 'order1', label: 'Step 1: Inhale', color: '#3B82F6' },
      { id: 'order2', label: 'Step 2: Lungs', color: '#06B6D4' },
      { id: 'order3', label: 'Step 3: Blood', color: '#10B981' },
      { id: 'order4', label: 'Step 4: Energy', color: '#8B5CF6' },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────

export interface MatterAirGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MatterAirGame({ width = 720, height = 560, onComplete }: MatterAirGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const currentChallenge = CHALLENGES[challengeIdx];

  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  const handleShowHint = useCallback(() => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  }, [currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [handleShowHint]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, currentChallenge, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 40 + idx * 140, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, currentChallenge]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setIsIncorrect(false);
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = "Great job! You understand matter and air!";
      setSuccessMsg(msg);
      setSpeakingText(msg);
      speechManager.speak(msg);
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setIsIncorrect(true);
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  const advanceChallenge = () => {
    setSelectedOpt(null);
    setIsIncorrect(false);
    setSuccessMsg(null);
    setHintMsg(null);
    setSparklePos(null);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const compMsg = "Wonderful! You are a brilliant science star!";
      setSpeakingText(compMsg);
      speechManager.speak(compMsg);
      if (onComplete) onComplete(finalScore);
    }
  };

  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Find which bin x,y falls into
    let droppedBinId: string | null = null;
    const binWidth = 130;
    const binHeight = 110;
    const binY = 160;
    const totalBins = currentChallenge.bins.length;
    const totalWidth = totalBins * binWidth + (totalBins - 1) * 20;
    const startX = (width - totalWidth) / 2;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });
      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = "Fantastic! You sorted the matter and air facts perfectly!";
        setSuccessMsg(msg);
        setSpeakingText(msg);
        speechManager.speak(msg);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 select-none flex flex-col items-center justify-between font-sans" style={{ width, height }}>
      <LabSceneBg width={width} height={height} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      <ChemistChetan mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="w-full px-6 py-3 flex items-center justify-between z-10 bg-slate-900/70 backdrop-blur-md border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-white tracking-wide">Matter & Air Lab 🧪</span>
          {screen === 'play' && (
            <span className="text-xs font-bold px-2.5 py-1 bg-blue-600/80 text-white rounded-full">
              Level {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            <span className="text-yellow-400 font-bold text-sm">⭐ {score}</span>
          </div>
          {screen === 'play' && <StarRow count={challengeIdx} total={CHALLENGES.length} />}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center p-6 z-10">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl text-white flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-6 opacity-95">{TEACHING_SLIDES[slideIdx].text}</p>
            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(slideIdx - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-4 py-2 rounded-xl font-bold transition ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed bg-black/20' : 'bg-black/30 hover:bg-black/40'}`}
              >
                Previous
              </button>
              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div key={idx} className={`w-2.5 h-2.5 rounded-full ${idx === slideIdx ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(slideIdx + 1);
                  } else {
                    setScreen('play');
                    audioManager.play('success');
                  }
                }}
                className="px-6 py-2.5 rounded-xl font-bold bg-white text-slate-900 shadow-lg hover:bg-slate-100 transition"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next'}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center justify-center">
            {/* Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full bg-slate-800/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-slate-700 text-center mb-6"
            >
              <h3 className="text-xl font-black text-white">{currentChallenge.question}</h3>
            </motion.div>

            {/* Multiple Choice Options */}
            {currentChallenge.type === 'identify' && currentChallenge.options && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAns = opt === currentChallenge.answer;
                  let btnColor = 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white';
                  if (selectedOpt) {
                    if (isCorrectAns) btnColor = 'bg-emerald-600 border-emerald-400 text-white';
                    else if (isSelected) btnColor = 'bg-rose-600 border-rose-400 text-white';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`p-4 rounded-2xl border-2 font-bold text-base shadow-lg transition flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAns && <span>✅</span>}
                      {selectedOpt && isSelected && !isCorrectAns && <span>❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sorting Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-[280px]">
                {/* Bins */}
                {currentChallenge.bins.map((bin, idx) => {
                  const binWidth = 130;
                  const binHeight = 110;
                  const totalBins = currentChallenge.bins!.length;
                  const totalWidth = totalBins * binWidth + (totalBins - 1) * 20;
                  const startX = (width - totalWidth) / 2;
                  const bx = startX + idx * (binWidth + 20);
                  const by = 10;
                  const isHover = hoveredBin === bin.id;

                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={by}
                      width={binWidth}
                      height={binHeight}
                      isHovering={isHover} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {/* Draggable Cards */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: height - 150 };
                  const placed = placedItems[item.id] || false;
                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={pos.x}
                      y={pos.y}
                      placed={placed}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            )}

            {/* Hint Button */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleShowHint}
                className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-sm hover:bg-amber-500/30 transition flex items-center gap-2"
              >
                💡 Need a Hint?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
