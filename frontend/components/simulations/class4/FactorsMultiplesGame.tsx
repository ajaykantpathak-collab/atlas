'use client';

/**
 * FactorsMultiplesGame — Learn Factors, Multiples, Primes, Divisibility, HCF & LCM
 *
 * CISCE Nodes: c4_math_017 (Factors), c4_math_018 (Multiples),
 *              c4_math_019 (Prime and composite numbers),
 *              c4_math_020 (Divisibility tests by 2, 3, 4, 5, 9, 10),
 *              c4_math_021 (Prime factors using factor tree and prime factorisation),
 *              c4_math_022 (Highest common factor - HCF),
 *              c4_math_023 (Lowest common multiple - LCM)
 * Enrichment: c4_maths_enrichment_part17-23
 *
 * ELI5: "A factor is a number that fits perfectly into another with nothing left over,
 *   like sharing 12 sweets equally. A multiple is what you get by skip counting or
 *   multiplying! Primes have only two factors, composite have more. Divisibility rules
 *   let you test numbers by looking at digits. HCF is the biggest shared factor, and LCM
 *   is the smallest shared multiple!"
 *
 * Misconceptions (from enrichment):
 *   1. "1 is a prime number" → "No! 1 has only one factor (itself), so it is NEITHER prime nor composite!"
 *   2. "All even numbers are composite" → "No! 2 is even and it is PRIME because its only factors are 1 and 2!"
 *   3. "A number divisible by 3 is always divisible by 9" → "No! 12 is divisible by 3, but not by 9! 9 is a stricter test!"
 *   4. "HCF and LCM are the same" → "No! HCF is the largest common FACTOR that goes into numbers, LCM is the smallest common MULTIPLE that numbers go into!"
 *   5. "To test divisibility by 4, look at the last digit" → "No! The rule for 4 looks at the last TWO digits!"
 *
 * Story: "Help Detective Deepa the Math Sleuth solve number mysteries! Inspect factor trees,
 *   uncover prime numbers, test divisibility, and master HCF and LCM!"
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

// ─── SVG Icon Components ─────────────────────────────────────

function FactorTreeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="10" r="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <text x="24" y="14" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">12</text>
      <line x1="20" y1="16" x2="12" y2="28" stroke="#1D4ED8" strokeWidth="2" />
      <line x1="28" y1="16" x2="36" y2="28" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="12" cy="34" r="6" fill="#10B981" />
      <text x="12" y="38" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
      <circle cx="36" cy="34" r="6" fill="#F59E0B" />
      <text x="36" y="38" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">6</text>
    </svg>
  );
}

function PrimeNumberIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <polygon points="24,4 30,16 44,18 34,28 36,42 24,35 12,42 14,28 4,18 18,16" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
      <text x="24" y="28" fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">7</text>
    </svg>
  );
}

function CompositeNumberIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="6" y="6" width="36" height="36" rx="6" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
      <text x="24" y="29" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">12</text>
    </svg>
  );
}

function DivisibilityIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="4" y="8" width="40" height="32" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="24" y="22" fill="#0369A1" fontSize="11" fontWeight="bold" textAnchor="middle">÷ 2, 3, 5</text>
      <text x="24" y="34" fill="#0284C7" fontSize="10" fontWeight="bold" textAnchor="middle">RULES</text>
    </svg>
  );
}

function HCFIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="18" cy="24" r="14" fill="#3B82F6" opacity="0.7" />
      <circle cx="30" cy="24" r="14" fill="#EF4444" opacity="0.7" />
      <text x="24" y="28" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">HCF</text>
    </svg>
  );
}

function LCMIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="6" y="12" width="36" height="24" rx="4" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <text x="24" y="28" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">LCM</text>
    </svg>
  );
}

function MultiplesIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path d="M4 38 L14 28 L24 34 L36 16 L44 22" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="28" r="3" fill="#D97706" />
      <circle cx="24" cy="34" r="3" fill="#D97706" />
      <circle cx="36" cy="16" r="3" fill="#D97706" />
    </svg>
  );
}

function EvenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="#6EE7B7" stroke="#059669" strokeWidth="2" />
      <text x="24" y="29" fill="#065F46" fontSize="14" fontWeight="bold" textAnchor="middle">EVEN</text>
    </svg>
  );
}

function OddIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2" />
      <text x="24" y="29" fill="#991B1B" fontSize="14" fontWeight="bold" textAnchor="middle">ODD</text>
    </svg>
  );
}

function VennDiagramIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <circle cx="18" cy="24" r="15" fill="none" stroke="#6366F1" strokeWidth="2" />
      <circle cx="30" cy="24" r="15" fill="none" stroke="#EC4899" strokeWidth="2" />
      <text x="24" y="28" fill="#4F46E5" fontSize="10" fontWeight="bold" textAnchor="middle">∩</text>
    </svg>
  );
}

function ClueIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="10" y="6" width="28" height="36" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <line x1="16" y1="14" x2="32" y2="14" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="22" x2="32" y2="22" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="30" x2="26" y2="30" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PrimeChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#F4F4F5" stroke="#71717A" strokeWidth="2" />
      <circle cx="16" cy="16" r="4" fill="#3B82F6" />
      <circle cx="32" cy="16" r="4" fill="#10B981" />
      <circle cx="16" cy="32" r="4" fill="#F59E0B" />
      <circle cx="32" cy="32" r="4" fill="#EF4444" />
    </svg>
  );
}

// ─── Helper for rendering custom SVG icons on sort cards ───────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'factor-tree': return <FactorTreeIcon size={size} />;
    case 'prime': return <PrimeNumberIcon size={size} />;
    case 'composite': return <CompositeNumberIcon size={size} />;
    case 'divisibility': return <DivisibilityIcon size={size} />;
    case 'hcf': return <HCFIcon size={size} />;
    case 'lcm': return <LCMIcon size={size} />;
    case 'multiples': return <MultiplesIcon size={size} />;
    case 'even': return <EvenIcon size={size} />;
    case 'odd': return <OddIcon size={size} />;
    case 'venn': return <VennDiagramIcon size={size} />;
    case 'clue': return <ClueIcon size={size} />;
    case 'chart': return <PrimeChartIcon size={size} />;
    default: return <FactorTreeIcon size={size} />;
  }
}

// ─── Detective Deepa Mascot ───────────────────────────────────

function DetectiveDeepa({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-2.5 shadow-xl border-2 border-amber-400 max-w-[260px]"
          >
            <p className="text-xs font-bold text-slate-800 leading-snug">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 4, -4, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="85" height="95" viewBox="0 0 85 95">
          <defs>
            <linearGradient id="coat-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="face-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Detective Hat */}
          <ellipse cx="42" cy="22" rx="24" ry="7" fill="#92400E" />
          <path d="M24 20 Q42 5 60 20 Z" fill="#B45309" />
          <rect x="26" y="18" width="32" height="4" fill="#78350F" rx="2" />
          {/* Head / Face */}
          <circle cx="42" cy="36" r="16" fill="url(#face-grad)" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="36" cy="34" r="3" fill="#1E293B" />
          <circle cx="48" cy="34" r="3" fill="#1E293B" />
          <circle cx="37" cy="33" r="1" fill="white" />
          <circle cx="49" cy="33" r="1" fill="white" />
          {/* Smile */}
          <path d="M37 42 Q42 47 47 42" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Magnifying Glass */}
          <circle cx="62" cy="55" r="9" fill="none" stroke="#1E293B" strokeWidth="3" />
          <line x1="68" y1="61" x2="78" y2="71" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="62" cy="55" rx="7" ry="7" fill="#E0F2FE" opacity="0.6" />
          {/* Detective Coat Body */}
          <path d="M26 52 L58 52 L66 85 L18 85 Z" fill="url(#coat-grad)" stroke="#78350F" strokeWidth="1.5" />
          {/* Number Badge */}
          <circle cx="34" cy="62" r="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
          <text x="34" y="65" fill="#B45309" fontSize="8" fontWeight="bold" textAnchor="middle">#</text>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 shadow-inner">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#F59E0B' : 'none'} stroke={i < count ? '#D97706' : '#CBD5E1'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Scene Background Component ───────────────────────────────

function DetectiveOfficeScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="office-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect width={width} height={height * 0.75} fill="url(#office-wall)" />
        {/* Wooden Floor */}
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#floor-grad)" />
        {/* Whiteboard for Factor Tree */}
        <rect x="40" y="30" width="160" height="110" rx="6" fill="white" stroke="#94A3B8" strokeWidth="3" />
        <text x="120" y="50" fill="#0F172A" fontSize="12" fontWeight="bold" textAnchor="middle">FACTOR TREE</text>
        <circle cx="120" cy="70" r="10" fill="#3B82F6" />
        <text x="120" y="74" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">12</text>
        <line x1="113" y1="78" x2="95" y2="100" stroke="#64748B" strokeWidth="2" />
        <line x1="127" y1="78" x2="145" y2="100" stroke="#64748B" strokeWidth="2" />
        <circle cx="95" cy="106" r="8" fill="#10B981" />
        <text x="95" y="110" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>
        <circle cx="145" cy="106" r="8" fill="#F59E0B" />
        <text x="145" y="110" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">6</text>
        {/* Prime Number Chart */}
        <rect x="220" y="30" width="140" height="100" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
        <text x="290" y="50" fill="#1E40AF" fontSize="11" fontWeight="bold" textAnchor="middle">PRIME NUMBERS</text>
        <text x="290" y="75" fill="#334155" fontSize="10" textAnchor="middle">2, 3, 5, 7, 11, 13...</text>
        <text x="290" y="95" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">Only 2 factors!</text>
      </svg>
    </div>
  );
}

// ─── Sort Card Component ──────────────────────────────────────

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1.5`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-slate-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute flex flex-col items-center justify-center rounded-2xl border-4 transition-all duration-200 shadow-lg ${isHovering ? 'scale-105 shadow-2xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="absolute -top-3.5 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="border-2 border-dashed rounded-xl w-4/5 h-4/5 flex items-center justify-center opacity-40" style={{ borderColor: color }}>
        <span className="text-xs font-bold" style={{ color }}>Drop Here</span>
      </div>
    </div>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "What are Factors? 🔍",
    text: "A factor is a whole number that divides another number exactly with NO remainder! Every multiplication fact gives a factor pair, like 3 x 4 = 12.",
    emoji: "🔍",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "A factor is a whole number that divides another number exactly with no remainder! Every multiplication fact gives a factor pair.",
  },
  {
    title: "What are Multiples? 📈",
    text: "A multiple is what you get when you multiply a number by 1, 2, 3, 4, and so on! Think of skip counting: multiples of 5 are 5, 10, 15, 20...",
    emoji: "📈",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "A multiple is what you get when you multiply a number by 1, 2, 3, 4, and so on! Think of skip counting.",
  },
  {
    title: "Prime & Composite Numbers ⭐",
    text: "A prime number has EXACTLY two factors: 1 and itself (like 2, 3, 5, 7). A composite number has MORE than two factors (like 4, 6, 8, 9, 12). Note: 1 is neither!",
    emoji: "⭐",
    bgColor: "from-purple-500 to-indigo-700",
    spoken: "A prime number has exactly two factors, 1 and itself. A composite number has more than two factors. Number 1 is neither!",
  },
  {
    title: "Divisibility Rules ⚡",
    text: "Quick shortcuts! Divisible by 2 if last digit is even. By 3 or 9 if sum of digits divides by 3 or 9. By 5 if last digit is 0 or 5. By 10 if last digit is 0!",
    emoji: "⚡",
    bgColor: "from-teal-500 to-cyan-600",
    spoken: "Quick shortcuts! Divisible by 2 if last digit is even. By 3 or 9 if sum of digits divides by 3 or 9. By 5 if last digit is 0 or 5.",
  },
  {
    title: "HCF & LCM 🎯",
    text: "HCF is the Highest Common Factor — the largest number that divides both. LCM is the Lowest Common Multiple — the smallest number both numbers go into!",
    emoji: "🎯",
    bgColor: "from-emerald-500 to-teal-700",
    spoken: "HCF is the Highest Common Factor, the largest number that divides both. LCM is the Lowest Common Multiple, the smallest number both go into!",
  },
];

// ─── Challenges ───────────────────────────────────────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBinDef {
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
  bins?: SortBinDef[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is a FACTOR of a number?',
    answer: 'A whole number that divides the number exactly with no remainder',
    options: [
      'A whole number that divides the number exactly with no remainder',
      'A number that is always bigger than the given number',
      'A number you add to get the given number',
    ],
    hint: 'Think about division: when you divide by a factor, nothing is left over!',
    misconception: 'A factor divides a number EXACTLY with remainder 0! It is not just any smaller number or an addition sum.',
  },
  {
    type: 'sort',
    question: 'Drag each number to show if it is a factor of 12 or not!',
    answer: 'sort',
    options: [],
    hint: 'Factors of 12 divide 12 with no remainder: 1, 2, 3, 4, 6, 12. 5, 7, 8, 9 do not!',
    misconception: 'Not every smaller number is a factor! Only numbers that divide 12 exactly (remainder 0) are factors.',
    sortItems: [
      { id: 'f2', label: '2', icon: 'factor-tree', correctBin: 'factor' },
      { id: 'f5', label: '5', icon: 'composite', correctBin: 'not-factor' },
      { id: 'f4', label: '4', icon: 'factor-tree', correctBin: 'factor' },
      { id: 'f7', label: '7', icon: 'composite', correctBin: 'not-factor' },
    ],
    bins: [
      { id: 'factor', label: 'Factor of 12 ✅', color: '#10B981' },
      { id: 'not-factor', label: 'Not a Factor ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'What is a PRIME number?',
    answer: 'A number greater than 1 with exactly two factors: 1 and itself',
    options: [
      'A number greater than 1 with exactly two factors: 1 and itself',
      'A number with many factors',
      'A number that is always even',
    ],
    hint: 'Count the factors! Prime numbers have only two factors.',
    misconception: 'A prime number has EXACTLY two factors (1 and itself). 2 is even and prime, while 9 is odd and composite!',
  },
  {
    type: 'sort',
    question: 'Drag each number to Prime or Composite!',
    answer: 'sort',
    options: [],
    hint: 'Prime: 2, 3, 5, 7, 11. Composite: 4, 6, 8, 9, 12. Check the factor count!',
    misconception: 'Being odd or even does not decide prime vs composite! 9 is odd but composite (factors 1, 3, 9). 2 is even and prime!',
    sortItems: [
      { id: 'p7', label: '7 (Prime)', icon: 'prime', correctBin: 'prime' },
      { id: 'c9', label: '9 (Composite)', icon: 'composite', correctBin: 'composite' },
      { id: 'p2', label: '2 (Prime)', icon: 'prime', correctBin: 'prime' },
      { id: 'c12', label: '12 (Composite)', icon: 'composite', correctBin: 'composite' },
    ],
    bins: [
      { id: 'prime', label: 'Prime Number ⭐', color: '#8B5CF6' },
      { id: 'composite', label: 'Composite Number 📦', color: '#EC4899' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these numbers is divisible by BOTH 2 and 5?',
    answer: '10',
    options: ['10', '7', '13'],
    hint: 'Divisible by 2 means even (ends in 0,2,4,6,8). Divisible by 5 means ends in 0 or 5. Which number ends in 0?',
    misconception: 'A number divisible by both 2 and 5 must end in 0! 10 ends in 0, so it passes both tests.',
  },
  {
    type: 'sort',
    question: 'Drag each number to the correct divisibility test it passes!',
    answer: 'sort',
    options: [],
    hint: 'Divisible by 2: even ending. By 3: digit sum divides by 3. By 5: ends in 0 or 5. By 10: ends in 0.',
    misconception: 'Check the last digit for 2, 5, 10! Check the digit sum for 3!',
    sortItems: [
      { id: 'd8', label: '8 (Divisible by 2)', icon: 'even', correctBin: 'div2' },
      { id: 'd15', label: '15 (Divisible by 3)', icon: 'divisibility', correctBin: 'div3' },
      { id: 'd10', label: '10 (Divisible by 5)', icon: 'multiples', correctBin: 'div5' },
      { id: 'd50', label: '50 (Divisible by 10)', icon: 'chart', correctBin: 'div10' },
    ],
    bins: [
      { id: 'div2', label: 'Divisible by 2', color: '#3B82F6' },
      { id: 'div3', label: 'Divisible by 3', color: '#10B981' },
      { id: 'div5', label: 'Divisible by 5', color: '#F59E0B' },
      { id: 'div10', label: 'Divisible by 10', color: '#8B5CF6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag the prime factorisation steps of 12 in logical order!',
    answer: 'sort',
    options: [],
    hint: 'Start with 12, divide by smallest prime 2, then split 6 into 2 x 3!',
    misconception: 'Prime factorisation breaks a composite number down step by step until every factor is a prime number!',
    sortItems: [
      { id: 's1', label: '1. Start with 12', icon: 'factor-tree', correctBin: 'step1' },
      { id: 's2', label: '2. 12 = 2 x 6', icon: 'factor-tree', correctBin: 'step2' },
      { id: 's3', label: '3. Split 6 = 2 x 3', icon: 'prime', correctBin: 'step3' },
      { id: 's4', label: '4. 12 = 2 x 2 x 3', icon: 'chart', correctBin: 'step4' },
    ],
    bins: [
      { id: 'step1', label: 'Step 1: Root', color: '#3B82F6' },
      { id: 'step2', label: 'Step 2: First Split', color: '#10B981' },
      { id: 'step3', label: 'Step 3: Primes', color: '#F59E0B' },
      { id: 'step4', label: 'Step 4: Final Product', color: '#8B5CF6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each number pair to its correct HCF or LCM!',
    answer: 'sort',
    options: [],
    hint: 'HCF of 12 and 18 is 6. LCM of 4 and 6 is 12. HCF of 10 and 15 is 5!',
    misconception: 'HCF is the largest shared factor (goes into both), while LCM is the smallest shared multiple (both go into it)!',
    sortItems: [
      { id: 'h12-18', label: 'HCF(12, 18) = 6', icon: 'hcf', correctBin: 'hcf' },
      { id: 'l4-6', label: 'LCM(4, 6) = 12', icon: 'lcm', correctBin: 'lcm' },
      { id: 'h10-15', label: 'HCF(10, 15) = 5', icon: 'hcf', correctBin: 'hcf' },
      { id: 'l3-5', label: 'LCM(3, 5) = 15', icon: 'lcm', correctBin: 'lcm' },
    ],
    bins: [
      { id: 'hcf', label: 'HCF (Highest Common Factor)', color: '#3B82F6' },
      { id: 'lcm', label: 'LCM (Lowest Common Multiple)', color: '#10B981' },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────

export interface FactorsMultiplesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FactorsMultiplesGame({ width = 720, height = 560, onComplete }: FactorsMultiplesGameProps) {
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

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 140, y: height - 145 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

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
      const msg = "Brilliant deduction! That is correct!";
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
      const compMsg = "Case closed! You are a Master Math Detective!";
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

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binWidth = Math.floor((width - 60) / currentChallenge.bins!.length) - 10;
      const binX = 30 + idx * (binWidth + 10);
      const binY = 180;
      const binH = 150;
      if (x >= binX && x <= binX + binWidth && y >= binY && y <= binY + binH) {
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
        const msg = "Fantastic sorting! All clues matched!";
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
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-amber-50" style={{ width, height }}>
      {/* Background scene */}
      <DetectiveOfficeScene width={width} height={height} />

      {/* Detective Deepa Mascot */}
      <DetectiveDeepa mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Success Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-black/30 backdrop-blur-sm">
          <div className="flex justify-between items-center bg-white/90 px-5 py-3 rounded-2xl shadow-lg border-2 border-amber-300">
            <h1 className="text-xl font-black text-amber-800 flex items-center gap-2">
              <span>🔍</span> Math Detective Academy
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600">Slide {slideIdx + 1} of {TEACHING_SLIDES.length}</span>
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setScreen('play');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all transform hover:scale-105"
              >
                Start Game 🚀
              </button>
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`my-auto mx-auto max-w-xl p-8 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white border-4 border-white/30`}
          >
            <div className="text-5xl mb-4 text-center">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 text-center">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed text-center text-white/95">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between items-center bg-white/90 px-6 py-3 rounded-2xl shadow-lg border-2 border-amber-300">
            <button
              disabled={slideIdx === 0}
              onClick={() => {
                audioManager.play('tap');
                setSlideIdx(prev => Math.max(0, prev - 1));
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold disabled:opacity-40 shadow transition-all"
            >
              ⬅️ Previous
            </button>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-amber-600 w-6' : 'bg-amber-200'}`} />
              ))}
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Playing! 🎮' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ──────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/95 px-5 py-2.5 rounded-2xl shadow-lg border-2 border-amber-300">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-amber-800">Case {challengeIdx + 1} / {CHALLENGES.length}</span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShowHint}
                className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-xl text-xs font-bold shadow transition-all flex items-center gap-1"
              >
                <span>💡</span> Hint
              </button>
              <div className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl text-xs font-bold shadow">
                Score: {score}
              </div>
            </div>
          </div>

          {/* Question / Challenge Area */}
          <div className="my-auto mx-auto max-w-2xl w-full flex flex-col items-center">
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 px-6 py-4 rounded-3xl shadow-xl border-2 border-amber-300 mb-6 text-center max-w-xl w-full"
            >
              <h2 className="text-lg font-black text-slate-800">{currentChallenge.question}</h2>
            </motion.div>

            {/* Multiple Choice Challenge */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnStyle = "bg-white hover:bg-amber-50 border-2 border-amber-200 text-slate-700";
                  if (selectedOpt) {
                    if (isCorrectOpt) btnStyle = "bg-emerald-500 border-2 border-emerald-600 text-white font-bold";
                    else if (isSelected) btnStyle = "bg-rose-500 border-2 border-rose-600 text-white font-bold";
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`p-4 rounded-2xl shadow-md text-sm font-semibold transition-all ${btnStyle}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full" style={{ height: 280 }}>
                {/* Bins */}
                {currentChallenge.bins.map((bin, idx) => {
                  const binWidth = Math.floor((width - 60) / currentChallenge.bins!.length) - 10;
                  const binX = 30 + idx * (binWidth + 10);
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={binX}
                      y={10}
                      width={binWidth}
                      height={150}
                      isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
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
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-center bg-white/95 px-6 py-3 rounded-2xl shadow-lg border-2 border-amber-300">
            <button
              onClick={() => {
                audioManager.play('tap');
                setScreen('teaching');
              }}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all"
            >
              📖 Review Lessons
            </button>

            {currentChallenge.type === 'sort' && (
              <button
                disabled={!currentChallenge.sortItems?.every(i => placedItems[i.id])}
                onClick={advanceChallenge}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white px-6 py-2 rounded-xl text-sm font-bold shadow transition-all transform hover:scale-105"
              >
                Next Case ➡️
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
