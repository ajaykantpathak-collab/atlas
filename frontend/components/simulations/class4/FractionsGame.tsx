'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── SVG Bakery & Fraction Icon Components ────────────────────

function PizzaIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Pizza base */}
      <circle cx="30" cy="30" r="26" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
      {/* Crust */}
      <circle cx="30" cy="30" r="26" fill="none" stroke="#B45309" strokeWidth="4" />
      {/* Slices / cut lines */}
      <line x1="30" y1="4" x2="30" y2="56" stroke="#D97706" strokeWidth="1.5" />
      <line x1="4" y1="30" x2="56" y2="30" stroke="#D97706" strokeWidth="1.5" />
      {/* Pepperoni */}
      <circle cx="20" cy="18" r="4" fill="#DC2626" />
      <circle cx="40" cy="20" r="4" fill="#DC2626" />
      <circle cx="32" cy="42" r="4" fill="#DC2626" />
      <circle cx="18" cy="40" r="3" fill="#DC2626" />
    </svg>
  );
}

function ChocolateIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" fill="#78350F" stroke="#451A03" strokeWidth="2" rx="4" />
      {/* Grid lines */}
      <line x1="30" y1="12" x2="30" y2="48" stroke="#451A03" strokeWidth="2" />
      <line x1="10" y1="24" x2="50" y2="24" stroke="#451A03" strokeWidth="2" />
      <line x1="10" y1="36" x2="50" y2="36" stroke="#451A03" strokeWidth="2" />
      {/* Shine */}
      <rect x="13" y="15" width="14" height="7" fill="white" opacity="0.3" rx="2" />
    </svg>
  );
}

function CakeIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Cake base */}
      <rect x="12" y="30" width="36" height="20" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" rx="2" />
      {/* Frosting layer */}
      <path d="M12 30 Q16 36, 20 30 Q24 36, 28 30 Q32 36, 36 30 Q40 36, 44 30 Q48 36, 48 30 L48 26 L12 26 Z" fill="#FBCFE8" />
      {/* Candle */}
      <rect x="28" y="14" width="4" height="12" fill="#60A5FA" />
      {/* Flame */}
      <ellipse cx="30" cy="10" rx="3" ry="5" fill="#F59E0B" />
      <ellipse cx="30" cy="10" rx="1.5" ry="3" fill="#FEF08A" />
    </svg>
  );
}

function PieIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FED7AA" stroke="#C2410C" strokeWidth="2" />
      {/* Shaded sector (3/4) */}
      <path d="M30 30 L30 4 A26 26 0 0 1 56 30 Z" fill="#FB923C" opacity="0.85" />
      <line x1="30" y1="30" x2="30" y2="4" stroke="#9A3412" strokeWidth="1.5" />
      <line x1="30" y1="30" x2="56" y2="30" stroke="#9A3412" strokeWidth="1.5" />
      <line x1="30" y1="30" x2="4" y2="30" stroke="#9A3412" strokeWidth="1.5" />
      <line x1="30" y1="30" x2="30" y2="56" stroke="#9A3412" strokeWidth="1.5" />
    </svg>
  );
}

function HalfIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="white" stroke="#1E3A8A" strokeWidth="2" />
      {/* Left half shaded */}
      <path d="M30 4 A26 26 0 0 0 30 56 Z" fill="#3B82F6" />
      <line x1="30" y1="4" x2="30" y2="56" stroke="#1E3A8A" strokeWidth="2" />
    </svg>
  );
}

function QuarterIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="white" stroke="#047857" strokeWidth="2" />
      {/* One quarter shaded */}
      <path d="M30 30 L30 4 A26 26 0 0 1 56 30 Z" fill="#10B981" />
      <line x1="30" y1="4" x2="30" y2="56" stroke="#047857" strokeWidth="1.5" />
      <line x1="4" y1="30" x2="56" y2="30" stroke="#047857" strokeWidth="1.5" />
    </svg>
  );
}

function ThirdIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="white" stroke="#7C3AED" strokeWidth="2" />
      {/* One third shaded (120 degrees) */}
      <path d="M30 30 L30 4 A26 26 0 0 1 52.5 43 Z" fill="#8B5CF6" />
      <line x1="30" y1="30" x2="30" y2="4" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="30" y1="30" x2="52.5" y2="43" stroke="#7C3AED" strokeWidth="1.5" />
      <line x1="30" y1="30" x2="7.5" y2="43" stroke="#7C3AED" strokeWidth="1.5" />
    </svg>
  );
}

function NumeratorIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="8" />
      <text x="30" y="38" fontSize="28" fontWeight="bold" fill="#B45309" textAnchor="middle">3</text>
      <text x="30" y="18" fontSize="10" fontWeight="bold" fill="#D97706" textAnchor="middle">TOP</text>
    </svg>
  );
}

function DenominatorIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" rx="8" />
      <text x="30" y="38" fontSize="28" fontWeight="bold" fill="#3730A3" textAnchor="middle">4</text>
      <text x="30" y="52" fontSize="10" fontWeight="bold" fill="#4F46E5" textAnchor="middle">BOTTOM</text>
    </svg>
  );
}

function EquivalentIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="30" r="16" fill="white" stroke="#2563EB" strokeWidth="1.5" />
      <path d="M20 14 A16 16 0 0 0 20 46 Z" fill="#3B82F6" />
      <text x="32" y="35" fontSize="18" fontWeight="bold" fill="#1F2937">=</text>
      <circle cx="45" cy="30" r="16" fill="white" stroke="#059669" strokeWidth="1.5" />
      <path d="M45 14 A16 16 0 0 0 45 46 Z" fill="#10B981" />
      <path d="M45 14 A16 16 0 0 1 45 46 Z" fill="#10B981" opacity="0.6" />
    </svg>
  );
}

function PlusIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
      <rect x="24" y="14" width="12" height="32" fill="#059669" rx="2" />
      <rect x="14" y="24" width="32" height="12" fill="#059669" rx="2" />
    </svg>
  );
}

function MinusIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <rect x="14" y="24" width="32" height="12" fill="#DC2626" rx="2" />
    </svg>
  );
}

function LikeFractionIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="16" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" rx="4" />
      <text x="30" y="24" fontSize="12" fontWeight="bold" fill="#3730A3" textAnchor="middle">2 / 7</text>
      <rect x="8" y="32" width="44" height="16" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.5" rx="4" />
      <text x="30" y="44" fontSize="12" fontWeight="bold" fill="#3730A3" textAnchor="middle">5 / 7</text>
    </svg>
  );
}

function UnlikeFractionIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="16" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" rx="4" />
      <text x="30" y="24" fontSize="12" fontWeight="bold" fill="#991B1B" textAnchor="middle">1 / 2</text>
      <rect x="8" y="32" width="44" height="16" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="4" />
      <text x="30" y="44" fontSize="12" fontWeight="bold" fill="#92400E" textAnchor="middle">1 / 3</text>
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'pizza': return <PizzaIcon size={size} />;
    case 'chocolate': return <ChocolateIcon size={size} />;
    case 'cake': return <CakeIcon size={size} />;
    case 'pie': return <PieIcon size={size} />;
    case 'half': return <HalfIcon size={size} />;
    case 'quarter': return <QuarterIcon size={size} />;
    case 'third': return <ThirdIcon size={size} />;
    case 'numerator': return <NumeratorIcon size={size} />;
    case 'denominator': return <DenominatorIcon size={size} />;
    case 'equivalent': return <EquivalentIcon size={size} />;
    case 'plus': return <PlusIcon size={size} />;
    case 'minus': return <MinusIcon size={size} />;
    case 'like': return <LikeFractionIcon size={size} />;
    case 'unlike': return <UnlikeFractionIcon size={size} />;
    default: return <PizzaIcon size={size} />;
  }
}

// ─── Bakery Background Scene ──────────────────────────────────

function BakeryScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="bakery-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="countertop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#bakery-sky)" />
        {/* Bakery shelf */}
        <rect x="40" y="40" width={width - 80} height="12" fill="#78350F" rx="3" />
        <rect x="40" y="100" width={width - 80} height="12" fill="#78350F" rx="3" />
        {/* Floor / Countertop */}
        <rect x="0" y={height - 70} width={width} height="70" fill="url(#countertop)" />
        <line x1="0" y1={height - 70} x2={width} y2={height - 70} stroke="#451A03" strokeWidth="4" />
      </svg>
      {/* Decorative floating fraction bubbles */}
      <motion.div className="absolute top-16 left-12 opacity-60" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="text-2xl font-bold text-amber-800">1/2</span>
      </motion.div>
      <motion.div className="absolute top-24 right-20 opacity-60" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="text-2xl font-bold text-amber-800">3/4</span>
      </motion.div>
    </div>
  );
}

// ─── Baker Bina Mascot ────────────────────────────────────────

function BakerBina({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-4 py-2.5 shadow-xl max-w-[240px] border-2 border-amber-400"
          >
            <p className="text-xs font-bold text-amber-900 leading-relaxed">{speaking}</p>
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
        <svg width="85" height="95" viewBox="0 0 85 95">
          {/* Chef Hat */}
          <ellipse cx="42" cy="18" rx="20" ry="14" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
          <rect x="30" y="24" width="24" height="12" fill="white" stroke="#D1D5DB" strokeWidth="1.5" rx="2" />
          <rect x="28" y="32" width="28" height="4" fill="#EF4444" rx="1" />
          {/* Head */}
          <circle cx="42" cy="46" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="36" cy="44" r="2.5" fill="#1F2937" />
          <circle cx="48" cy="44" r="2.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M38 52 Q42 56 46 52" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Apron & Body */}
          <path d="M26 62 Q42 58 58 62 L62 90 L22 90 Z" fill="white" stroke="#D97706" strokeWidth="1.5" />
          {/* Pizza Badge on Apron */}
          <circle cx="42" cy="74" r="8" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />
          <path d="M42 74 L42 67 A7 7 0 0 1 49 74 Z" fill="#EF4444" />
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

// ─── Teaching Slides (EXACTLY 5 slides) ────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "What is a Fraction? 🍕",
    text: "A fraction is a way of describing a part of a whole! When a pizza, a chapati, or a chocolate bar is divided into EQUAL parts, each part is a fraction of that whole.",
    emoji: "🍕",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "A fraction is a way of describing a part of a whole! When a pizza or a chapati is divided into equal parts, each part is a fraction of that whole."
  },
  {
    title: "Numerator & Denominator! 🔢",
    text: "The bottom number is the DENOMINATOR — it tells us how many equal parts the whole is divided into. The top number is the NUMERATOR — it tells how many parts we are taking!",
    emoji: "📐",
    bgColor: "from-orange-400 to-amber-600",
    spoken: "The bottom number is the denominator, telling us total equal parts. The top number is the numerator, telling how many parts we take!"
  },
  {
    title: "Types of Fractions! 🧁",
    text: "LIKE fractions have the same denominator (like 2/7 and 3/7). UNLIKE fractions have different denominators (like 1/2 and 1/3). UNIT fractions have numerator 1 (like 1/2, 1/4, 1/8)!",
    emoji: "🧁",
    bgColor: "from-yellow-500 to-amber-600",
    spoken: "Like fractions have the same denominator. Unlike fractions have different denominators. Unit fractions have numerator 1!"
  },
  {
    title: "Equivalent Fractions! ✨",
    text: "Equivalent fractions look different but represent the exact same quantity! For example, 1/2, 2/4, and 3/6 all shade the exact same half of a shape!",
    emoji: "✨",
    bgColor: "from-amber-500 to-yellow-600",
    spoken: "Equivalent fractions look different but represent the exact same quantity! For example, 1/2, 2/4, and 3/6 all equal one half!"
  },
  {
    title: "Adding & Subtracting Like Fractions! ➕➖",
    text: "When adding or subtracting like fractions, the denominator stays EXACTLY the same! We only add or subtract the numerators: 3/7 + 2/7 = 5/7!",
    emoji: "🍪",
    bgColor: "from-orange-500 to-red-600",
    spoken: "When adding or subtracting like fractions, the denominator stays exactly the same! We only add or subtract the numerators!"
  }
];

// ─── Challenges (EXACTLY 8 challenges) ─────────────────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBin {
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
  bins?: SortBin[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is a FRACTION?',
    answer: 'A part of a whole, where the whole is divided into equal parts',
    options: [
      'A part of a whole, where the whole is divided into equal parts',
      'A type of whole number used for counting objects',
      'A special way to multiply numbers together'
    ],
    hint: 'Think about sharing a chapati or pizza equally among friends!',
    misconception: 'A fraction is always a part of a whole divided into EQUAL parts! If parts are unequal, it is not a proper fraction.'
  },
  {
    type: 'identify',
    question: 'In the fraction 3/4, what does the number 4 (below the line) tell us?',
    answer: 'How many equal parts the whole is divided into (denominator)',
    options: [
      'How many equal parts the whole is divided into (denominator)',
      'How many parts we are taking or shading (numerator)',
      'The total sum of the fraction numbers'
    ],
    hint: 'The bottom number names the size and total number of equal slices!',
    misconception: 'The bottom number (denominator) tells how many equal parts the whole is split into. The top number (numerator) tells how many we take.'
  },
  {
    type: 'sort',
    question: 'Drag each fraction label to its correct visual shape!',
    answer: 'sort',
    options: [],
    hint: 'Check how many equal parts are shaded compared to the total parts!',
    misconception: 'Always count total parts for the bottom number (denominator) and shaded parts for the top number (numerator).',
    sortItems: [
      { id: 'h1', label: '1/2 (Half)', icon: 'half', correctBin: 'bin-half' },
      { id: 'q1', label: '1/4 (Quarter)', icon: 'quarter', correctBin: 'bin-quarter' },
      { id: 't1', label: '1/3 (Third)', icon: 'third', correctBin: 'bin-third' },
      { id: 'p1', label: '3/4 (Three-fourths)', icon: 'pie', correctBin: 'bin-three-fourths' }
    ],
    bins: [
      { id: 'bin-half', label: '1/2 (Half)', color: '#3B82F6' },
      { id: 'bin-quarter', label: '1/4 (Quarter)', color: '#10B981' },
      { id: 'bin-third', label: '1/3 (Third)', color: '#8B5CF6' },
      { id: 'bin-three-fourths', label: '3/4 (Three-fourths)', color: '#F59E0B' }
    ]
  },
  {
    type: 'identify',
    question: 'Which of these are LIKE fractions (sharing the same denominator)?',
    answer: '3/7 and 2/7',
    options: [
      '3/7 and 2/7',
      '1/2 and 1/3',
      '2/5 and 3/8'
    ],
    hint: 'Look for fractions that have the exact same bottom number!',
    misconception: 'Like fractions must share the SAME denominator (bottom number), like 3/7 and 2/7 both having 7.'
  },
  {
    type: 'sort',
    question: 'Drag each fraction card into its correct fraction category!',
    answer: 'sort',
    options: [],
    hint: 'Check if the numerator is 1, if denominators match, or if values are equal!',
    misconception: 'Unit fractions have numerator 1. Like fractions share a denominator. Equivalent fractions represent the same quantity.',
    sortItems: [
      { id: 'uf', label: 'Unit Fraction (1/4)', icon: 'quarter', correctBin: 'bin-unit' },
      { id: 'lf', label: 'Like Fractions (2/7 & 3/7)', icon: 'like', correctBin: 'bin-like' },
      { id: 'unf', label: 'Unlike Fractions (1/2 & 1/3)', icon: 'unlike', correctBin: 'bin-unlike' },
      { id: 'eq', label: 'Equivalent (1/2 & 2/4)', icon: 'equivalent', correctBin: 'bin-equiv' }
    ],
    bins: [
      { id: 'bin-unit', label: 'Unit Fraction', color: '#10B981' },
      { id: 'bin-like', label: 'Like Fractions', color: '#3B82F6' },
      { id: 'bin-unlike', label: 'Unlike Fractions', color: '#EF4444' },
      { id: 'bin-equiv', label: 'Equivalent', color: '#F59E0B' }
    ]
  },
  {
    type: 'identify',
    question: '1/2 and 2/4 are EQUIVALENT fractions. What does that mean?',
    answer: 'They represent the same amount of the whole',
    options: [
      'They represent the same amount of the whole',
      'They have the exact same numerators',
      'They are like fractions with matching bottoms'
    ],
    hint: 'Think of eating half a pizza whether cut into 2 slices or 4 slices!',
    misconception: 'Equivalent fractions look different in numbers, but they represent the exact same quantity of the whole!'
  },
  {
    type: 'sort',
    question: 'Drag each pair to Equivalent or Not Equivalent!',
    answer: 'sort',
    options: [],
    hint: 'Check if one fraction can be multiplied to match the other!',
    misconception: '1/2 and 2/4 are equivalent because multiplying top and bottom by 2 gives 2/4. 1/2 and 1/3 are not equivalent.',
    sortItems: [
      { id: 'eq1', label: '1/2 = 2/4', icon: 'equivalent', correctBin: 'bin-eq' },
      { id: 'eq2', label: '1/3 = 2/6', icon: 'equivalent', correctBin: 'bin-eq' },
      { id: 'neq1', label: '1/2 & 1/3', icon: 'unlike', correctBin: 'bin-neq' },
      { id: 'neq2', label: '2/3 & 3/4', icon: 'unlike', correctBin: 'bin-neq' }
    ],
    bins: [
      { id: 'bin-eq', label: 'Equivalent ✅', color: '#10B981' },
      { id: 'bin-neq', label: 'Not Equivalent ❌', color: '#EF4444' }
    ]
  },
  {
    type: 'sort',
    question: 'Drag each fraction addition or subtraction to its correct solved answer!',
    answer: 'sort',
    options: [],
    hint: 'Keep the denominator the same and only operate on the numerators!',
    misconception: 'Never add or subtract denominators! The denominator stays unchanged because the size of each piece remains the same.',
    sortItems: [
      { id: 'ad1', label: '3/7 + 2/7 = 5/7', icon: 'plus', correctBin: 'bin-5-7' },
      { id: 'ad2', label: '1/5 + 2/5 = 3/5', icon: 'plus', correctBin: 'bin-3-5' },
      { id: 'sub1', label: '6/9 - 4/9 = 2/9', icon: 'minus', correctBin: 'bin-2-9' },
      { id: 'sub2', label: '4/7 - 2/7 = 2/7', icon: 'minus', correctBin: 'bin-2-7' }
    ],
    bins: [
      { id: 'bin-5-7', label: '5/7', color: '#3B82F6' },
      { id: 'bin-3-5', label: '3/5', color: '#10B981' },
      { id: 'bin-2-9', label: '2/9', color: '#8B5CF6' },
      { id: 'bin-2-7', label: '2/7', color: '#F59E0B' }
    ]
  }
];

// ─── Component Props ──────────────────────────────────────────

export interface FractionsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FractionsGame({ width = 720, height = 560, onComplete }: FractionsGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 165, y: height - 140 };
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
      const msg = "Great job! You are a fractions champion!";
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
      const compMsg = "Wonderful! You are a master fraction baker!";
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

    // Hit test bins
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      // approximate bin positions based on index
      const binIdx = currentChallenge.bins!.findIndex(b => b.id === bin.id);
      const binX = 40 + binIdx * 160;
      const binY = 180;
      if (x >= binX && x <= binX + 140 && y >= binY && y <= binY + 130) {
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
        const msg = "Fantastic! You sorted all the fractions perfectly!";
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-amber-50 select-none font-sans" style={{ width, height }}>
      {/* Background scene */}
      <BakeryScene width={width} height={height} />

      {/* Confetti overlay */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {/* Sparkle burst */}
      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}

      {/* Success banner */}
      {successMsg && (
        <SuccessBanner message={successMsg} onComplete={advanceChallenge} />
      )}

      {/* Hint bubble */}
      {hintMsg && (
        <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />
      )}

      {/* Header bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
            <span className="text-xl">🍕</span>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-amber-900">Baker Bina’s Fractions</h1>
            <p className="text-xs text-amber-700 font-medium">CISCE Class 4 Math</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-amber-800">Challenge {challengeIdx + 1} / {CHALLENGES.length}</span>
              <StarRow count={Math.floor(score / 15)} total={8} />
            </div>
            <button
              onClick={handleShowHint}
              className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl font-bold text-xs shadow transition flex items-center gap-1"
            >
              💡 Hint
            </button>
          </div>
        )}
      </div>

      {/* Mascot */}
      <BakerBina mood={mascotMood} speaking={speakingText} />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center p-6" style={{ height: height - 70 }}>
        {screen === 'teaching' ? (
          /* Teaching Screen */
          <div className="flex flex-col items-center max-w-xl text-center bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border-2 border-amber-200">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black text-amber-900 mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-2">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-amber-500' : 'w-2.5 bg-amber-200'}`} />
                ))}
              </div>

              <div className="flex gap-3">
                {slideIdx > 0 && (
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setSlideIdx(prev => prev - 1);
                    }}
                    className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl shadow transition"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    if (slideIdx < TEACHING_SLIDES.length - 1) {
                      setSlideIdx(prev => prev + 1);
                    } else {
                      setScreen('play');
                    }
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg transition"
                >
                  {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next ➔' : 'Start Cooking! 🚀'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Play Screen */
          <div className="flex flex-col items-center w-full max-w-2xl">
            {/* Question Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-lg border-2 border-amber-200 mb-6 w-full text-center">
              <h3 className="text-lg font-black text-amber-900">{currentChallenge.question}</h3>
            </div>

            {/* Challenge Type: Identify (Multiple Choice) */}
            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 w-full max-w-lg">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnBg = 'bg-white hover:bg-amber-50 border-amber-200 text-gray-800';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnBg = 'bg-green-100 border-green-500 text-green-900';
                    else if (isSelected) btnBg = 'bg-red-100 border-red-500 text-red-900';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                      onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`p-4 rounded-2xl border-2 font-bold text-sm shadow-md transition text-left flex items-center justify-between ${btnBg}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAnswer && <span className="text-xl">✅</span>}
                      {selectedOpt && isSelected && !isCorrectAnswer && <span className="text-xl">❌</span>}
                    </motion.button>
                  );
                })}

                {selectedOpt && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end mt-2">
                    <button
                      onClick={advanceChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:from-amber-600 hover:to-orange-600 transition"
                    >
                      Continue ➔
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Challenge Type: Sort (Drag and Drop) */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="flex flex-col items-center w-full">
                {/* Bins row */}
                <div className="flex gap-4 justify-center mb-16 w-full">
                  {currentChallenge.bins.map(bin => {
                    const isHovered = hoveredBin === bin.id;
                    return (
                      <div
                        key={bin.id}
                        onMouseEnter={() => setHoveredBin(bin.id)}
                        onMouseLeave={() => setHoveredBin(null)}
                        className={`flex flex-col items-center justify-center rounded-2xl p-4 border-4 shadow-md transition-all duration-200`}
                        style={{
                          width: 150,
                          height: 120,
                          borderColor: bin.color,
                          backgroundColor: isHovered ? `${bin.color}22` : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        <span className="text-xs font-black text-center text-gray-800">{bin.label}</span>
                        <div className="mt-2 text-2xl">📥</div>
                      </div>
                    );
                  })}
                </div>

                {/* Draggable items */}
                <div className="relative w-full h-32 flex justify-center items-center">
                  {currentChallenge.sortItems.map(item => {
                    const pos = itemPositions[item.id] || { x: 0, y: 0 };
                    const placed = placedItems[item.id];
                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={pos.x}
                        y={pos.y}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        width={130}
                        height={95}
                      >
                        <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} p-2`} style={{ width: 130, height: 95 }}>
                          {renderSortIcon(item.icon, 40)}
                          <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{item.label}</span>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>

                {/* Continue button when all placed */}
                {Object.values(placedItems).every(Boolean) && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mt-4">
                    <button
                      onClick={advanceChallenge}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold rounded-2xl shadow-xl hover:from-emerald-600 hover:to-green-700 transition"
                    >
                      Awesome! Next Challenge ➔
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
