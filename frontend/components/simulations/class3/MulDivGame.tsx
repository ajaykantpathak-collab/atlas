'use client';

/**
 * MulDivGame — Multiplication and Division Master for Class 3 (CISCE/ICSE)
 *
 * CISCE Nodes:
 *   - c3_math_009: Multiplication tables of 2, 3, 4, 5, 7, 9, 10
 *   - c3_math_010: Multiplication of two-digit by one-digit (standard algorithm & expanded notation)
 *   - c3_math_011: Division in equal grouping and sharing
 *   - c3_math_012: Division facts using grouping and multiplication tables
 *   - c3_math_013: Relation between multiplication and division (inverse operations, fact families)
 *
 * Mascot: Garden Manager Gita with a watering can, garden glove, flower basket, and seed packet.
 * Features: 5 teaching slides, 8 progressive challenges, sort & identify types, misconception feedback,
 * auto-hint timer, sound effects via audioManager, speech via speechManager, confetti/success banners.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Game Screen Type Definition ──────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: { id: string; label: string; icon: string; correctBin: string }[];
  bins?: { id: string; label: string; color: string }[];
}

// ─── Teaching Slides (5 slides from enrichment) ───────────────
const TEACHING_SLIDES = [
  {
    title: 'Multiplication is Repeated Addition! 🌸',
    text: 'Multiplication is adding the same group again and again! If you have 4 rows of 3 flowers, 4 × 3 = 3 + 3 + 3 + 3 = 12 flowers in total!',
    emoji: '🌸',
    bgColor: 'from-pink-400 to-rose-500',
    spoken: 'Multiplication is adding the same group again and again! 4 times 3 means 4 groups of 3 flowers, giving 12 flowers in total!',
  },
  {
    title: 'Multiplying Two-Digit Numbers! 🪴',
    text: 'To multiply 34 × 5, multiply the ones first (4 × 5 = 20, write 0 carry 2), then multiply the tens (3 × 5 = 15, add carry 2 = 17)! Answer: 170!',
    emoji: '🪴',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'To multiply a two-digit number by a one-digit number, multiply the ones first, write down the ones digit and carry over the tens, then multiply the tens and add the carry!',
  },
  {
    title: 'Division: Sharing Equally! 🧺',
    text: 'Division splits a total into equal parts! If 18 apples are shared equally among 3 children, each child gets 6 apples. We write 18 ÷ 3 = 6!',
    emoji: '🧺',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Division splits a total quantity into equal groups or shares. 18 apples divided among 3 children gives 6 apples to each child!',
  },
  {
    title: 'Division Facts & Tables! 📊',
    text: 'Multiplication tables are the key to division! To solve 20 ÷ 5, ask: 5 times what gives 20? Since 5 × 4 = 20, 20 ÷ 5 = 4 instantly!',
    emoji: '📊',
    bgColor: 'from-purple-400 to-violet-500',
    spoken: 'Multiplication tables unlock division! Since 5 times 4 is 20, 20 divided by 5 equals 4!',
  },
  {
    title: 'Inverse Operation & Fact Families! 🔄',
    text: 'Multiplication and division are inverse operations! If 3 × 4 = 12, then 12 ÷ 3 = 4 and 12 ÷ 4 = 3. They form a cozy fact family of three numbers!',
    emoji: '🔄',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Multiplication and division are inverse operations! One undoes the other, forming a complete fact family sharing the same three numbers!',
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────
const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is 7 × 6 in the multiplication table of 7?',
    answer: '42',
    options: ['35', '42', '49', '56'],
    hint: 'Think of repeated addition: add 7 six times (7, 14, 21, 28, 35, 42).',
    misconception: 'Multiplication is repeated addition, not addition of exponents or random guessing! 7 taken 6 times is 42, not 35 or 49.',
  },
  {
    type: 'identify',
    question: 'What is 24 ÷ 4 using the multiplication table of 4?',
    answer: '6',
    options: ['4', '5', '6', '8'],
    hint: 'Ask yourself: 4 times what number gives 24?',
    misconception: 'Division is the reverse of multiplication. Since 4 × 6 = 24, 24 ÷ 4 = 6. Do not subtract or guess randomly!',
  },
  {
    type: 'sort',
    question: 'Drag each multiplication fact to its correct product!',
    answer: 'sort',
    options: [],
    hint: 'Match each multiplication problem with its correct product!',
    misconception: 'Always recall your multiplication tables carefully: 3×4=12, 5×6=30, 7×8=56, 9×3=27.',
    sortItems: [
      { id: 'm1', label: '3 × 4 = 12', icon: 'times', correctBin: 'bin12' },
      { id: 'm2', label: '5 × 6 = 30', icon: 'times', correctBin: 'bin30' },
      { id: 'm3', label: '7 × 8 = 56', icon: 'times', correctBin: 'bin56' },
      { id: 'm4', label: '9 × 3 = 27', icon: 'times', correctBin: 'bin27' },
    ],
    bins: [
      { id: 'bin12', label: '12', color: '#EC4899' },
      { id: 'bin30', label: '30', color: '#10B981' },
      { id: 'bin56', label: '56', color: '#3B82F6' },
      { id: 'bin27', label: '27', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'A garden has 5 rows with 6 flowers in each row. How many flowers in total?',
    answer: '30',
    options: ['11', '25', '30', '35'],
    hint: '5 groups of 6 means multiplying 5 × 6.',
    misconception: 'Do not add the numbers (5 + 6 = 11)! Equal groups mean we multiply: 5 rows × 6 flowers = 30 flowers.',
  },
  {
    type: 'sort',
    question: 'Drag the steps for multiplying 34 × 5 using the standard algorithm in order!',
    answer: 'sort',
    options: [],
    hint: 'Start with the ones place first, then the tens place, remembering any carry!',
    misconception: 'Always multiply ones first (4×5=20, write 0 carry 2), then tens (3×5=15, add carry 2 = 17)! Never multiply the carry.',
    sortItems: [
      { id: 's1', label: '1. Multiply ones: 4 × 5 = 20 (write 0, carry 2)', icon: 'seed', correctBin: 'step1' },
      { id: 's2', label: '2. Multiply tens: 3 × 5 = 15, add carry 2 = 17', icon: 'seed', correctBin: 'step2' },
      { id: 's3', label: '3. Final product is 170', icon: 'seed', correctBin: 'step3' },
    ],
    bins: [
      { id: 'step1', label: 'Step 1 (Ones)', color: '#F59E0B' },
      { id: 'step2', label: 'Step 2 (Tens)', color: '#3B82F6' },
      { id: 'step3', label: 'Step 3 (Result)', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: '18 apples are shared equally among 3 children. How many does each child get?',
    answer: '6',
    options: ['5', '6', '7', '9'],
    hint: 'This is equal sharing: 18 divided by 3 (18 ÷ 3).',
    misconception: 'Equal sharing is division! 18 ÷ 3 = 6 because 3 × 6 = 18. Each child gets 6 apples.',
  },
  {
    type: 'sort',
    question: 'Drag each division problem to its correct quotient!',
    answer: 'sort',
    options: [],
    hint: 'Use related multiplication facts to find each quotient!',
    misconception: 'Division makes numbers smaller by splitting into equal groups: 20÷5=4, 36÷6=6, 48÷8=6, 27÷9=3.',
    sortItems: [
      { id: 'd1', label: '20 ÷ 5', icon: 'divide', correctBin: 'q4' },
      { id: 'd2', label: '36 ÷ 6', icon: 'divide', correctBin: 'q6' },
      { id: 'd3', label: '48 ÷ 8', icon: 'divide', correctBin: 'q6' },
      { id: 'd4', label: '27 ÷ 9', icon: 'divide', correctBin: 'q3' },
    ],
    bins: [
      { id: 'q4', label: '4', color: '#EC4899' },
      { id: 'q6', label: '6', color: '#3B82F6' },
      { id: 'q3', label: '3', color: '#10B981' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each multiplication fact to its matching inverse division fact!',
    answer: 'sort',
    options: [],
    hint: 'Multiplication and inverse division share the same three numbers in a fact family!',
    misconception: 'Multiplication and division are inverse operations! Every multiplication fact yields two division facts.',
    sortItems: [
      { id: 'f1', label: '3 × 4 = 12', icon: 'root', correctBin: 'inv12' },
      { id: 'f2', label: '5 × 6 = 30', icon: 'root', correctBin: 'inv30' },
      { id: 'f3', label: '7 × 8 = 56', icon: 'root', correctBin: 'inv56' },
      { id: 'f4', label: '9 × 3 = 27', icon: 'root', correctBin: 'inv27' },
    ],
    bins: [
      { id: 'inv12', label: '12 ÷ 3 = 4', color: '#8B5CF6' },
      { id: 'inv30', label: '30 ÷ 5 = 6', color: '#EC4899' },
      { id: 'inv56', label: '56 ÷ 7 = 8', color: '#3B82F6' },
      { id: 'inv27', label: '27 ÷ 9 = 3', color: '#10B981' },
    ],
  },
];

// ─── Custom SVG Garden Manager Gita Mascot ────────────────────
function GardenManagerGita({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-1 bg-white/95 backdrop-blur rounded-2xl px-3 py-2 shadow-xl max-w-[220px] border-2 border-amber-300"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
            ? { y: [0, -5, 0] }
            : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="85" height="95" viewBox="0 0 100 110">
          <defs>
            <linearGradient id="gita-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="gita-can" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Body / Dress */}
          <path d="M35 60 L65 60 L75 95 L25 95 Z" fill="url(#gita-dress)" stroke="#065F46" strokeWidth="2" />
          
          {/* Head */}
          <circle cx="50" cy="38" r="20" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          
          {/* Hair / Sun hat */}
          <path d="M25 35 Q50 15 75 35 Q80 25 50 15 Q20 25 25 35 Z" fill="#854D0E" />
          <ellipse cx="50" cy="22" rx="28" ry="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />

          {/* Eyes */}
          <circle cx="43" cy="36" r="3" fill="#1E293B" />
          <circle cx="57" cy="36" r="3" fill="#1E293B" />
          <circle cx="44" cy="35" r="1" fill="white" />
          <circle cx="58" cy="35" r="1" fill="white" />

          {/* Cheeks */}
          <circle cx="39" cy="42" r="3.5" fill="#FDA4AF" opacity="0.8" />
          <circle cx="61" cy="42" r="3.5" fill="#FDA4AF" opacity="0.8" />

          {/* Smile */}
          <path d="M44 45 Q50 51 56 45" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Garden Glove Hands & Watering Can */}
          <circle cx="20" cy="70" r="7" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.5" />
          <path d="M65 65 L80 60 L85 75 L70 80 Z" fill="url(#gita-can)" stroke="#0369A1" strokeWidth="1.5" />
          <path d="M80 60 L92 45" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />

          {/* Flower Basket on Other Side */}
          <rect x="70" y="80" width="18" height="14" rx="3" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
          <path d="M72 80 Q79 70 86 80" fill="none" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="76" cy="77" r="4" fill="#EC4899" />
          <circle cx="83" cy="76" r="4" fill="#38BDF8" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row Component ────────────────────────────────
function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#EAB308' : '#CBD5E1'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Garden Scene Background ───────────────────────
function GardenSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 600">
        <defs>
          <linearGradient id="garden-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="40%" stopColor="#BAE6FD" />
            <stop offset="70%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
          <linearGradient id="flower-stem" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>

        {/* Sky & Grass Background */}
        <rect width="800" height="600" fill="url(#garden-sky)" />

        {/* Rolling Hills */}
        <path d="M0 450 Q200 380 400 420 T800 400 L800 600 L0 600 Z" fill="#4ADE80" opacity="0.6" />
        <path d="M0 480 Q250 430 500 460 T800 440 L800 600 L0 600 Z" fill="#22C55E" />

        {/* Garden Shed in Background */}
        <g transform="translate(620, 310)">
          <rect x="0" y="40" width="120" height="90" fill="#9A3412" stroke="#7C2D12" strokeWidth="2" />
          <polygon points="-10,40 60,-10 130,40" fill="#B91C1C" stroke="#991B1B" strokeWidth="2" />
          <rect x="45" y="80" width="30" height="50" fill="#78350F" />
          <circle cx="70" cy="105" r="3" fill="#FBBF24" />
          <rect x="15" y="55" width="25" height="25" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
        </g>

        {/* Rows of Flowers (Multiplication arrays visual) */}
        {[100, 220, 340, 460, 580, 700].map((x, idx) => (
          <g key={idx} transform={`translate(${x}, 520)`}>
            <path d="M0 0 L0 -45" stroke="url(#flower-stem)" strokeWidth="4" strokeLinecap="round" />
            <circle cx="0" cy="-50" r="14" fill={idx % 2 === 0 ? '#EC4899' : '#F59E0B'} stroke="#B45309" strokeWidth="1.5" />
            <circle cx="0" cy="-50" r="5" fill="#FEF08A" />
            {/* Petals */}
            <circle cx="0" cy="-66" r="7" fill={idx % 2 === 0 ? '#F472B6' : '#FBBF24'} />
            <circle cx="0" cy="-34" r="7" fill={idx % 2 === 0 ? '#F472B6' : '#FBBF24'} />
            <circle cx="-16" cy="-50" r="7" fill={idx % 2 === 0 ? '#F472B6' : '#FBBF24'} />
            <circle cx="16" cy="-50" r="7" fill={idx % 2 === 0 ? '#F472B6' : '#FBBF24'} />
          </g>
        ))}

        {/* Floating Clouds */}
        <g transform="translate(100, 60)" fill="white" opacity="0.8">
          <ellipse cx="40" cy="30" rx="30" ry="20" />
          <ellipse cx="70" cy="20" rx="35" ry="25" />
          <ellipse cx="100" cy="30" rx="25" ry="18" />
        </g>
        <g transform="translate(500, 90)" fill="white" opacity="0.7">
          <ellipse cx="30" cy="25" rx="25" ry="16" />
          <ellipse cx="55" cy="18" rx="30" ry="20" />
        </g>
      </svg>
    </div>
  );
}

// ─── Custom Topic SVG Icon Components ─────────────────────────
function FlowerRowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2" />
      <circle cx="30" cy="30" r="10" fill="#EC4899" />
      <circle cx="30" cy="12" r="6" fill="#F472B6" />
      <circle cx="30" cy="48" r="6" fill="#F472B6" />
      <circle cx="12" cy="30" r="6" fill="#F472B6" />
      <circle cx="48" cy="30" r="6" fill="#F472B6" />
      <circle cx="30" cy="30" r="4" fill="#FBBF24" />
    </svg>
  );
}

function BasketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 25 L50 25 L45 52 L15 52 Z" fill="#D97706" stroke="#92400E" strokeWidth="2" />
      <path d="M15 25 Q30 10 45 25" fill="none" stroke="#92400E" strokeWidth="3" />
      <circle cx="25" cy="38" r="6" fill="#EF4444" />
      <circle cx="38" cy="36" r="6" fill="#10B981" />
      <circle cx="31" cy="44" r="5" fill="#FBBF24" />
    </svg>
  );
}

function TimesSymbolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" />
      <path d="M20 20 L40 40 M40 20 L20 40" stroke="#4F46E5" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function DivideSymbolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" />
      <circle cx="30" cy="20" r="4" fill="#16A34A" />
      <line x1="18" y1="30" x2="42" y2="30" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="30" cy="40" r="4" fill="#16A34A" />
    </svg>
  );
}

function SeedPacketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="42" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <path d="M12 22 L48 22" stroke="#D97706" strokeWidth="1.5" />
      <circle cx="30" cy="36" r="8" fill="#10B981" />
      <path d="M30 44 Q25 36 30 28 Q35 36 30 44" fill="#059669" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────
function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'times': return <TimesSymbolIcon size={size} />;
    case 'divide': return <DivideSymbolIcon size={size} />;
    case 'seed': return <SeedPacketIcon size={size} />;
    case 'root': return <FlowerRowIcon size={size} />;
    default: return <BasketIcon size={size} />;
  }
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
    <Draggable
      id={id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={130}
      height={85}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-amber-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        } p-2`}
        style={{ width: 130, height: 85 }}
      >
        {renderSortIcon(icon, 36)}
        <span className="text-xs font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────
interface SortBinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}

function SortBin({ label, color, x, y, width, height, isHovering }: SortBinProps) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-lg ${
        isHovering ? 'scale-105 shadow-2xl' : ''
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <span className="text-sm font-extrabold text-gray-900 text-center px-2">{label}</span>
      <span className="text-xs text-gray-600 font-semibold mt-1">Drop Here 🎯</span>
    </div>
  );
}

// ─── Main Component: MulDivGame ───────────────────────────────
export interface MulDivGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MulDivGame({ width = 720, height = 560, onComplete }: MulDivGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>('Welcome to Gita’s Garden Math! Let us grow our math skills!');
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Multiple Choice State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);

  // Sort Challenge State
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Item positions for sort challenges
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Initialize positions when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = { x: 50 + (idx % 2) * 150, y: 340 + Math.floor(idx / 2) * 100 };
      });
      setItemPositions(initialPos);
      setPlacedItems({});
    }
  }, [challengeIdx]);

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide when changed
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
      audioManager.play('tap');
    }
  }, [slideIdx, screen]);

  // Speak challenge question when changed
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      audioManager.play('tap');
    }
  }, [challengeIdx, screen]);

  // Inactivity timer for auto-hints
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (currentChallenge) {
        setHintMessage(currentChallenge.hint);
        audioManager.play('hint');
        speechManager.speak(currentChallenge.hint);
        setMascotMood('thinking');
      }
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Handle Teaching Navigation
  const handleNextSlide = () => {
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
      audioManager.play('tap');
    } else {
      setScreen('play');
      setSlideIdx(0);
      audioManager.play('success');
      speechManager.speak('Let us start the challenges! You can do it!');
    }
  };

  const handlePrevSlide = () => {
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
      audioManager.play('tap');
    }
  };

  // Multiple Choice Answer Handler
  const handleMultipleChoice = (option: string) => {
    resetInactivityTimer();
    setSelectedAnswer(option);

    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setStars(prev => prev + 1);
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Wonderful! Correct answer! 🌱');
      setShowSuccessBanner(true);
      setSpeakingText('Fantastic job! You got it right!');
      speechManager.speak('Fantastic job! You got it right!');
    } else {
      // Incorrect (Misconception feedback)
      audioManager.play('error');
      setIsIncorrect(true);
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMessage(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  // Success banner completion
  const handleSuccessComplete = () => {
    setShowSuccessBanner(false);
    setSelectedAnswer(null);
    setIsIncorrect(false);
    setSparklePos(null);
    setMascotMood('happy');

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game Complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      setSpeakingText('Amazing! You are a Math Garden Master!');
      speechManager.speak('Amazing! You are a Math Garden Master!');
      if (onComplete) onComplete(finalScore);
    }
  };

  // Sort Drag Handlers
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    setDraggingId(id);
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    setDraggingId(null);
    // Check bins collision
    const bins = currentChallenge.bins || [];
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item) return false;

    // Bin layout: positioned on right side
    const binWidth = 140;
    const binHeight = 70;
    let matchedBinId: string | null = null;

    bins.forEach((bin, idx) => {
      const bx = 420;
      const by = 80 + idx * 90;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + binHeight + 30) {
        matchedBinId = bin.id;
      }
    });

    if (matchedBinId === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setStars(prev => prev + 1);
        setSparklePos({ x: width / 2, y: height / 2 });
        setSuccessMsg('All sorted correctly! Brilliant! 🌸');
        setShowSuccessBanner(true);
        setSpeakingText('Wonderful sorting! You mastered this challenge!');
        speechManager.speak('Wonderful sorting! You mastered this challenge!');
      }
      return true;
    } else {
      // Wrong bin
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMessage(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div
      className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-gradient-to-b from-sky-300 to-emerald-300 flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      {/* Garden Scene Background */}
      <GardenSceneBg width={width} height={height} />

      {/* Mascot Gita */}
      <GardenManagerGita mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Success Feedbacks */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && <SuccessBanner message={successMsg} onComplete={handleSuccessComplete} />}
      {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TOP HEADER BAR ─────────────────────────────────────── */}
      <div className="w-full px-6 py-3 flex items-center justify-between z-10 bg-white/70 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-bold">🌱</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-gray-900 leading-tight">Garden Math Master</h1>
            <p className="text-xs font-semibold text-emerald-700">CISCE Class 3 • Mul & Div</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <StarRow count={stars} total={CHALLENGES.length} />
            <div className="bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-inner">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </div>
          </div>
        )}
      </div>

      {/* ─── TEACHING SCREEN ──────────────────────���─────────────── */}
      {screen === 'teaching' && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 z-10 w-full max-w-xl my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={`w-full bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} rounded-3xl p-6 shadow-2xl text-white flex flex-col items-center text-center border-4 border-white/40`}
            >
              <div className="text-6xl mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].emoji}</div>
              <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
              <p className="text-sm font-medium leading-relaxed bg-black/10 p-4 rounded-2xl backdrop-blur-sm">
                {TEACHING_SLIDES[slideIdx].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-6 px-2">
            <button
              onClick={handlePrevSlide}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                slideIdx === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-white text-gray-800 hover:bg-emerald-50 hover:text-emerald-700 active:scale-95'
              }`}
            >
              ← Previous
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === slideIdx ? 'bg-white scale-125 shadow-md' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="px-6 py-2.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ────────────────────────────────────────── */}
      {screen === 'play' && currentChallenge && (
        <div className="flex-1 w-full max-w-2xl px-6 py-4 z-10 flex flex-col justify-between items-center">
          
          {/* Question Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-xl w-full border-2 border-emerald-300 text-center">
            <h2 className="text-lg font-extrabold text-gray-800 leading-snug">
              {currentChallenge.question}
            </h2>
          </div>

          {/* Challenge Body: Multiple Choice or Sort */}
          {currentChallenge.type === 'identify' ? (
            <div className="grid grid-cols-2 gap-4 w-full my-auto px-4">
              {currentChallenge.options.map((option, i) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === currentChallenge.answer;
                let btnStyle = 'bg-white hover:bg-emerald-50 text-gray-800 border-emerald-200';

                if (selectedAnswer !== null) {
                  if (isCorrectOption) btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105';
                  else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600 animate-shake';
                  else btnStyle = 'bg-gray-100 text-gray-400 opacity-50';
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedAnswer === null ? 1.03 : 1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleMultipleChoice(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-2xl font-black text-xl border-4 shadow-md transition-all ${btnStyle}`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          ) : (
            /* Sort Challenge Area */
            <div className="relative w-full h-[320px] my-auto bg-white/40 backdrop-blur-sm rounded-3xl border-2 border-dashed border-emerald-400 p-4">
              {/* Bins on Right */}
              <div className="absolute right-4 top-4 bottom-4 flex flex-col justify-around w-[220px]">
                {currentChallenge.bins?.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    id={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={0}
                    y={idx * 75}
                    width={220}
                    height={65}
                    isHovering={hoverBin === bin.id}
                  />
                ))}
              </div>

              {/* Draggable Items on Left */}
              <div className="absolute left-6 top-6 bottom-6 flex flex-col justify-around w-[140px]">
                {currentChallenge.sortItems?.map(item => {
                  const pos = itemPositions[item.id] || { x: 0, y: 0 };
                  const isPlaced = placedItems[item.id];
                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={pos.x}
                      y={pos.y}
                      placed={!!isPlaced}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Hint Bar */}
          <div className="w-full flex justify-between items-center px-2 py-2">
            <button
              onClick={() => {
                setHintMessage(currentChallenge.hint);
                audioManager.play('hint');
                speechManager.speak(currentChallenge.hint);
                setMascotMood('thinking');
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-xs rounded-2xl shadow-lg transition-all active:scale-95"
            >
              💡 Need a Hint?
            </button>
            <div className="text-xs font-bold text-gray-700 bg-white/80 px-4 py-2 rounded-2xl shadow-sm">
              Errors: {errors}
            </div>
          </div>

        </div>
      )}

      {/* Footer Branding */}
      <div className="w-full py-1 text-center bg-white/50 backdrop-blur text-[10px] font-bold text-emerald-900 z-10">
        CISCE Class 3 Mathematics • Multiplication & Division
      </div>
    </div>
  );
}
