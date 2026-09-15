'use client';

/**
 * FractionsAdvancedGame — Class 5 Mathematics (CISCE / ICSE Curriculum)
 *
 * CISCE Nodes:
 * - c5_math_016: Comparison of 3 or more fractions (common denominator via LCM)
 * - c5_math_017: Addition and subtraction of unlike fractions
 * - c5_math_018: Addition and subtraction of mixed numbers
 * - c5_math_019: Word problems on addition and subtraction of fractions
 * - c5_math_020: Multiplication of fractions (fraction × whole number, fraction × fraction, as 'of')
 * - c5_math_021: Division of fractions (reciprocal and multiply method)
 *
 * Mascot: Chef Anjali — a chef with a white hat, red apron, pizza peel,
 * and a recipe book badge.
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

interface TeachingSlide { title: string; text: string; emoji: string; bgColor: string; spoken: string; }
interface SortItem { id: string; label: string; icon: string; correctBin: string; }
interface SortBin { id: string; label: string; color: string; }
interface Challenge { type: ChallengeType; question: string; answer: string; options: string[]; hint: string; misconception: string; sortItems?: SortItem[]; bins?: SortBin[]; }

// ─── SVG Icon Components ──────────────────────────────────────

function PizzaSliceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 L45 42 L5 42 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
      <path d="M25 5 L45 42" stroke="#B45309" strokeWidth="1.5" />
      <path d="M25 5 L5 42" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="20" cy="28" r="3" fill="#EF4444" />
      <circle cx="30" cy="32" r="3" fill="#EF4444" />
      <circle cx="25" cy="20" r="2.5" fill="#22C55E" />
    </svg>
  );
}

function FractionBarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="14" width="42" height="10" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" rx="2" />
      <rect x="4" y="14" width="21" height="10" fill="#3B82F6" rx="2" />
      <rect x="4" y="28" width="42" height="10" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" rx="2" />
      <rect x="4" y="28" width="14" height="10" fill="#10B981" rx="2" />
    </svg>
  );
}

function MeasuringCupIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M12 10 L12 42 Q12 46, 16 46 L34 46 Q38 46, 38 42 L38 10 Z" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" />
      <path d="M12 25 L38 25" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,2" />
      <path d="M12 35 L38 35" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,2" />
      <path d="M12 20 L38 20" stroke="#3B82F6" strokeWidth="1" strokeDasharray="2,2" />
      <rect x="12" y="30" width="26" height="16" fill="#60A5FA" opacity="0.6" />
      <path d="M16 10 L16 4 L34 4 L34 10" fill="none" stroke="#3B82F6" strokeWidth="2" />
    </svg>
  );
}

function RecipeCardIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="6" width="34" height="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
      <line x1="14" y1="16" x2="36" y2="16" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="22" x2="30" y2="22" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="28" x2="34" y2="28" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <text x="25" y="42" fontSize="10" fill="#92400E" textAnchor="middle" fontWeight="bold">1/2</text>
    </svg>
  );
}

function MultiplyFractionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="8" width="20" height="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" rx="2" />
      <rect x="4" y="8" width="10" height="20" fill="#3B82F6" rx="2" />
      <text x="25" y="24" fontSize="14" fill="#374151" textAnchor="middle" fontWeight="bold">×</text>
      <rect x="28" y="8" width="18" height="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" rx="2" />
      <rect x="28" y="8" width="9" height="20" fill="#10B981" rx="2" />
      <rect x="4" y="34" width="42" height="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" rx="2" />
      <rect x="4" y="34" width="5" height="10" fill="#F59E0B" rx="2" />
    </svg>
  );
}

function DivideFractionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="8" width="20" height="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" rx="2" />
      <rect x="4" y="8" width="10" height="20" fill="#8B5CF6" rx="2" />
      <text x="25" y="24" fontSize="14" fill="#374151" textAnchor="middle" fontWeight="bold">÷</text>
      <rect x="28" y="8" width="18" height="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" rx="2" />
      <rect x="28" y="8" width="6" height="20" fill="#EF4444" rx="2" />
      <text x="25" y="44" fontSize="8" fill="#6D28D9" textAnchor="middle" fontWeight="bold">reciprocal</text>
    </svg>
  );
}

function MixedNumberIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <text x="10" y="30" fontSize="16" fill="#3B82F6" textAnchor="middle" fontWeight="bold">2</text>
      <rect x="18" y="14" width="20" height="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" rx="2" />
      <rect x="18" y="14" width="10" height="20" fill="#F59E0B" rx="2" />
      <text x="28" y="30" fontSize="10" fill="#1E40AF" textAnchor="middle" fontWeight="bold">1/3</text>
    </svg>
  );
}

function CommonDenominatorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="8" width="42" height="10" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" rx="2" />
      <rect x="4" y="8" width="14" height="10" fill="#3B82F6" rx="2" />
      <text x="25" y="16" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">1/3</text>
      <rect x="4" y="22" width="42" height="10" fill="#D1FAE5" stroke="#10B981" strokeWidth="1" rx="2" />
      <rect x="4" y="22" width="10.5" height="10" fill="#10B981" rx="2" />
      <text x="25" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">1/4</text>
      <rect x="4" y="36" width="42" height="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" rx="2" />
      <rect x="4" y="36" width="42" height="10" fill="#F59E0B" opacity="0.3" rx="2" />
      <text x="25" y="44" fontSize="7" fill="#92400E" textAnchor="middle" fontWeight="bold">LCM=12</text>
    </svg>
  );
}

function PlusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="18" width="40" height="14" fill="#3B82F6" rx="4" />
      <rect x="18" y="5" width="14" height="40" fill="#3B82F6" rx="4" />
    </svg>
  );
}

function MinusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="18" width="40" height="14" fill="#EF4444" rx="4" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'pizza': return <PizzaSliceIcon size={size} />;
    case 'fractionbar': return <FractionBarIcon size={size} />;
    case 'measuringcup': return <MeasuringCupIcon size={size} />;
    case 'recipecard': return <RecipeCardIcon size={size} />;
    case 'multiplyfraction': return <MultiplyFractionIcon size={size} />;
    case 'dividefraction': return <DivideFractionIcon size={size} />;
    case 'mixednumber': return <MixedNumberIcon size={size} />;
    case 'commondenom': return <CommonDenominatorIcon size={size} />;
    case 'plus': return <PlusIcon size={size} />;
    case 'minus': return <MinusIcon size={size} />;
    default: return <PizzaSliceIcon size={size} />;
  }
}

// ─── Kitchen Scene Background ─────────────────────────────────

function KitchenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="kitchen-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="kitchen-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="100%" stopColor="#FED7AA" />
          </linearGradient>
          <linearGradient id="kitchen-counter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect width="720" height="380" fill="url(#kitchen-wall)" />
        {/* Window with sky */}
        <rect x="80" y="60" width="160" height="120" fill="url(#kitchen-sky)" stroke="#92400E" strokeWidth="4" rx="4" />
        <line x1="160" y1="60" x2="160" y2="180" stroke="#92400E" strokeWidth="3" />
        <line x1="80" y1="120" x2="240" y2="120" stroke="#92400E" strokeWidth="3" />
        {/* Hanging pots */}
        <line x1="320" y1="40" x2="320" y2="80" stroke="#78350F" strokeWidth="2" />
        <path d="M305 80 L335 80 L330 110 L310 110 Z" fill="#6B7280" stroke="#374151" strokeWidth="2" />
        <line x1="380" y1="40" x2="380" y2="80" stroke="#78350F" strokeWidth="2" />
        <path d="M365 80 L395 80 L390 110 L370 110 Z" fill="#6B7280" stroke="#374151" strokeWidth="2" />
        <line x1="440" y1="40" x2="440" y2="80" stroke="#78350F" strokeWidth="2" />
        <circle cx="440" cy="100" r="20" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        {/* Spice shelves */}
        <rect x="500" y="60" width="180" height="12" fill="#B45309" rx="2" />
        <rect x="510" y="72" width="20" height="30" fill="#EF4444" rx="2" />
        <rect x="535" y="72" width="20" height="30" fill="#F59E0B" rx="2" />
        <rect x="560" y="72" width="20" height="30" fill="#10B981" rx="2" />
        <rect x="585" y="72" width="20" height="30" fill="#8B5CF6" rx="2" />
        <rect x="500" y="120" width="180" height="12" fill="#B45309" rx="2" />
        <rect x="510" y="132" width="20" height="30" fill="#3B82F6" rx="2" />
        <rect x="535" y="132" width="20" height="30" fill="#EC4899" rx="2" />
        <rect x="560" y="132" width="20" height="30" fill="#06B6D4" rx="2" />
        {/* Counter */}
        <rect x="0" y="380" width="720" height="180" fill="url(#kitchen-counter)" />
        <rect x="0" y="370" width="720" height="15" fill="#F59E0B" rx="2" />
        {/* Pizza on counter */}
        <circle cx="200" cy="430" r="35" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
        <circle cx="190" cy="420" r="4" fill="#EF4444" />
        <circle cx="210" cy="425" r="4" fill="#EF4444" />
        <circle cx="200" cy="440" r="4" fill="#22C55E" />
        {/* Cutting board */}
        <rect x="400" y="410" width="120" height="60" fill="#92400E" rx="6" stroke="#451A03" strokeWidth="2" />
        <circle cx="460" cy="440" r="15" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
        {/* Measuring cups */}
        <path d="M580 410 L580 460 Q580 465, 585 465 L620 465 Q625 465, 625 460 L625 410 Z" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" />
        <rect x="582" y="435" width="41" height="28" fill="#60A5FA" opacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Mascot: Chef Anjali ──────────────────────────────────────

function ChefAnjali({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-2 bg-white border-2 border-orange-400 rounded-2xl px-4 py-3 shadow-xl max-w-[260px]"
          >
            <p className="text-xs font-bold text-gray-800 leading-relaxed">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
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
        <svg width="85" height="100" viewBox="0 0 90 100">
          {/* Chef Hat */}
          <ellipse cx="45" cy="10" rx="22" ry="10" fill="white" stroke="#E5E7EB" strokeWidth="1.5" />
          <ellipse cx="35" cy="8" rx="10" ry="8" fill="white" />
          <ellipse cx="55" cy="8" rx="10" ry="8" fill="white" />
          <rect x="28" y="14" width="34" height="8" fill="white" stroke="#E5E7EB" strokeWidth="1" rx="2" />
          {/* Head & Face */}
          <circle cx="45" cy="32" r="20" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Hair (under hat) */}
          <path d="M28 28 Q30 22, 45 22 Q60 22, 62 28" fill="#1E1B4B" />
          {/* Eyes */}
          <circle cx="37" cy="30" r="3" fill="#1E293B" />
          <circle cx="53" cy="30" r="3" fill="#1E293B" />
          <circle cx="38" cy="29" r="1" fill="white" />
          <circle cx="54" cy="29" r="1" fill="white" />
          {/* Smile */}
          <path d="M39 40 Q45 45 51 40" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Bindi */}
          <circle cx="45" cy="24" r="2" fill="#DC2626" />
          {/* Red Apron & Body */}
          <path d="M25 52 L65 52 L75 95 L15 95 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          {/* Recipe book badge */}
          <rect x="35" y="62" width="20" height="18" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="2" />
          <line x1="38" y1="67" x2="52" y2="67" stroke="#D97706" strokeWidth="1" />
          <line x1="38" y1="71" x2="48" y2="71" stroke="#D97706" strokeWidth="1" />
          <line x1="38" y1="75" x2="50" y2="75" stroke="#D97706" strokeWidth="1" />
          {/* Pizza peel in hand */}
          <line x1="68" y1="60" x2="82" y2="45" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="84" cy="42" rx="6" ry="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" transform="rotate(-30 84 42)" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-orange-200">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#F59E0B' : '#CBD5E1'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Welcome to Chef Anjali's Kitchen! 🍕",
    text: "Chef Anjali uses fractions every day — comparing pizza slices, adding recipe portions, and sharing food equally! Let's learn advanced fractions through cooking.",
    emoji: "🍕",
    bgColor: "from-orange-500 to-red-600",
    spoken: "Welcome to Chef Anjali's Kitchen! Today we learn advanced fractions through cooking — comparing, adding, subtracting, multiplying, and dividing fractions!"
  },
  {
    title: "Comparing Fractions with LCM 📊",
    text: "To compare fractions with different denominators, find the LCM of the denominators and convert each fraction to an equivalent fraction with that common denominator. Then compare numerators! 1/2, 2/3, 3/4 → LCM of 2,3,4 = 12 → 6/12, 8/12, 9/12.",
    emoji: "📊",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "To compare fractions with different denominators, find the LCM and convert to equivalent fractions with a common denominator. Then compare numerators!"
  },
  {
    title: "Adding & Subtracting Unlike Fractions ➕➖",
    text: "To add or subtract unlike fractions, find a common denominator using LCM. Convert each fraction to an equivalent fraction with that denominator, then add or subtract numerators. 1/3 + 1/4 = 4/12 + 3/12 = 7/12. For mixed numbers, convert to improper fractions first!",
    emoji: "➕",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "To add or subtract unlike fractions, find a common denominator using LCM, convert to equivalent fractions, then add or subtract numerators. For mixed numbers, convert to improper fractions first!"
  },
  {
    title: "Multiplying Fractions as 'Of' ✖️",
    text: "Multiplication of fractions means 'of'. 1/2 × 1/3 means half of one-third = 1/6. Multiply numerators together and denominators together: a/b × c/d = (a×c)/(b×d). Simplify the result to lowest terms!",
    emoji: "✖️",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "Multiplying fractions means 'of'. Multiply numerators together and denominators together. Then simplify the result to lowest terms!"
  },
  {
    title: "Dividing Fractions — Reciprocal Method ➗",
    text: "To divide by a fraction, multiply by its reciprocal (flip it upside down). 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2. This means 'how many 1/4 pieces fit into 1/2?' The answer is 2!",
    emoji: "➗",
    bgColor: "from-cyan-500 to-blue-600",
    spoken: "To divide by a fraction, multiply by its reciprocal. Flip the divisor upside down and multiply. This tells you how many pieces of the divisor fit into the dividend!"
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "Compare 1/2, 2/3, and 3/4. Which is the LARGEST fraction?",
    answer: "3/4",
    options: ["1/2", "2/3", "3/4", "They are equal"],
    hint: "Find the LCM of denominators 2, 3, and 4. LCM(2,3,4) = 12. Convert each fraction: 6/12, 8/12, 9/12. Which numerator is largest?",
    misconception: "To compare unlike fractions, find the LCM of denominators. LCM(2,3,4) = 12. Convert: 1/2 = 6/12, 2/3 = 8/12, 3/4 = 9/12. Since 9/12 is the largest, 3/4 is the biggest fraction. You cannot compare fractions by just looking at numerators or denominators alone!"
  },
  {
    type: 'sort',
    question: "Drag each fraction to its correct equivalent fraction with denominator 12!",
    answer: "sort",
    options: [],
    hint: "LCM of 2, 3, 4, 6 is 12. Multiply numerator and denominator by the same number to get denominator 12.",
    misconception: "To convert to equivalent fractions, multiply both numerator and denominator by the same number. 1/2 = 6/12 (×6), 1/3 = 4/12 (×4), 3/4 = 9/12 (×3), 5/6 = 10/12 (×2). The fraction value stays the same!",
    sortItems: [
      { id: 'f1', label: '1/2', icon: 'fractionbar', correctBin: 'eq-6-12' },
      { id: 'f2', label: '1/3', icon: 'fractionbar', correctBin: 'eq-4-12' },
      { id: 'f3', label: '3/4', icon: 'fractionbar', correctBin: 'eq-9-12' },
      { id: 'f4', label: '5/6', icon: 'fractionbar', correctBin: 'eq-10-12' },
    ],
    bins: [
      { id: 'eq-6-12', label: '6/12', color: '#3B82F6' },
      { id: 'eq-4-12', label: '4/12', color: '#10B981' },
      { id: 'eq-9-12', label: '9/12', color: '#F59E0B' },
      { id: 'eq-10-12', label: '10/12', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is 1/3 + 1/4? (Add these unlike fractions)",
    answer: "7/12",
    options: ["7/12", "2/7", "2/12", "5/12"],
    hint: "Find common denominator: LCM(3,4) = 12. Convert: 1/3 = 4/12, 1/4 = 3/12. Then add numerators: 4/12 + 3/12 = ?",
    misconception: "You cannot add unlike fractions directly! Find the LCM of denominators: LCM(3,4) = 12. Convert: 1/3 = 4/12 and 1/4 = 3/12. Then add numerators: 4/12 + 3/12 = 7/12. Never add denominators — only numerators!"
  },
  {
    type: 'sort',
    question: "Drag each mixed number operation to its correct result!",
    answer: "sort",
    options: [],
    hint: "Convert mixed numbers to improper fractions first. 2 1/3 = 7/3, 1 1/4 = 5/4. Find common denominator, then add or subtract.",
    misconception: "For mixed numbers, convert to improper fractions first! 2 1/3 + 1 1/4 = 7/3 + 5/4 = 28/12 + 15/12 = 43/12 = 3 7/12. 3 1/2 - 1 3/4 = 7/2 - 7/4 = 14/4 - 7/4 = 7/4 = 1 3/4.",
    sortItems: [
      { id: 'm1', label: '2 1/3 + 1 1/4', icon: 'mixednumber', correctBin: 'r-3-7-12' },
      { id: 'm2', label: '3 1/2 - 1 3/4', icon: 'mixednumber', correctBin: 'r-1-3-4' },
      { id: 'm3', label: '1 2/5 + 2 1/3', icon: 'mixednumber', correctBin: 'r-3-11-15' },
      { id: 'm4', label: '4 1/2 - 2 1/4', icon: 'mixednumber', correctBin: 'r-2-1-4' },
    ],
    bins: [
      { id: 'r-3-7-12', label: '3 7/12', color: '#3B82F6' },
      { id: 'r-1-3-4', label: '1 3/4', color: '#10B981' },
      { id: 'r-3-11-15', label: '3 11/15', color: '#F59E0B' },
      { id: 'r-2-1-4', label: '2 1/4', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "A recipe needs 3/4 cup of sugar and 1/3 cup of honey. How much sweetener is needed in total?",
    answer: "1 1/12 cups",
    options: ["1 1/12 cups", "4/7 cup", "13/12 cups only", "3/7 cup"],
    hint: "Add 3/4 + 1/3. LCM(4,3) = 12. Convert: 9/12 + 4/12 = 13/12. Simplify to mixed number.",
    misconception: "This is a fraction addition word problem! 3/4 + 1/3 = 9/12 + 4/12 = 13/12 = 1 1/12 cups. Find the common denominator first, then add numerators. Convert the improper fraction to a mixed number for the final answer!"
  },
  {
    type: 'sort',
    question: "Drag each multiplication problem to its correct product!",
    answer: "sort",
    options: [],
    hint: "Multiply numerators together and denominators together. 1/4 × 3 = 3/4. 1/2 × 1/3 = 1/6. Simplify if needed!",
    misconception: "To multiply fractions, multiply numerators together and denominators together. 1/4 × 3 = 3/4 (treat 3 as 3/1). 1/2 × 1/3 = 1/6. 2/3 × 3/5 = 6/15 = 2/5. Multiplication means 'of' — 1/2 × 1/3 means half of one-third!",
    sortItems: [
      { id: 'mu1', label: '1/4 × 3', icon: 'multiplyfraction', correctBin: 'p-3-4' },
      { id: 'mu2', label: '1/2 × 1/3', icon: 'multiplyfraction', correctBin: 'p-1-6' },
      { id: 'mu3', label: '2/3 × 3/5', icon: 'multiplyfraction', correctBin: 'p-2-5' },
      { id: 'mu4', label: '3/4 × 1/2', icon: 'multiplyfraction', correctBin: 'p-3-8' },
    ],
    bins: [
      { id: 'p-3-4', label: '3/4', color: '#3B82F6' },
      { id: 'p-1-6', label: '1/6', color: '#10B981' },
      { id: 'p-2-5', label: '2/5', color: '#F59E0B' },
      { id: 'p-3-8', label: '3/8', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is 1/2 ÷ 1/4? (How many quarter-pieces fit into a half?)",
    answer: "2",
    options: ["2", "1/8", "1/6", "3/4"],
    hint: "To divide by a fraction, multiply by its reciprocal. 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = ?",
    misconception: "To divide by a fraction, multiply by its reciprocal (flip the divisor)! 1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2. This means two quarter-pieces fit into one half. Never divide numerators and denominators directly — always use the reciprocal method!"
  },
  {
    type: 'sort',
    question: "Drag each division problem to its correct quotient!",
    answer: "sort",
    options: [],
    hint: "Divide by a fraction = multiply by its reciprocal. Flip the divisor upside down and multiply!",
    misconception: "Division of fractions uses the reciprocal method. 3 ÷ 1/6 = 3 × 6/1 = 18. 2/3 ÷ 1/6 = 2/3 × 6/1 = 12/3 = 4. 1/3 ÷ 1/2 = 1/3 × 2/1 = 2/3. Always flip the second fraction (divisor) and multiply!",
    sortItems: [
      { id: 'd1', label: '3 ÷ 1/6', icon: 'dividefraction', correctBin: 'q-18' },
      { id: 'd2', label: '2/3 ÷ 1/6', icon: 'dividefraction', correctBin: 'q-4' },
      { id: 'd3', label: '1/3 ÷ 1/2', icon: 'dividefraction', correctBin: 'q-2-3' },
      { id: 'd4', label: '1/4 ÷ 1/8', icon: 'dividefraction', correctBin: 'q-2' },
    ],
    bins: [
      { id: 'q-18', label: '18', color: '#3B82F6' },
      { id: 'q-4', label: '4', color: '#10B981' },
      { id: 'q-2-3', label: '2/3', color: '#F59E0B' },
      { id: 'q-2', label: '2', color: '#8B5CF6' },
    ]
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface FractionsAdvancedGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FractionsAdvancedGame({ width = 720, height = 560, onComplete }: FractionsAdvancedGameProps) {
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

  // Drag and drop state
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const currentChallenge = CHALLENGES[challengeIdx];

  // Cleanup speech & timers on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Speak teaching slide text
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  // Handle inactivity hint timer (10 seconds)
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

  // Speak challenge question on mount or change
  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer, currentChallenge]);

  // Reset item positions when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 45 + idx * 140, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  // Multiple choice answer handler
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
      const msg = "Excellent! You are a fraction fractions chef!";
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

  // Advance challenge or complete game
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
      const compMsg = "Wonderful! You are a brilliant fractions master chef!";
      setSpeakingText(compMsg);
      speechManager.speak(compMsg);
      if (onComplete) onComplete(finalScore);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check bin bounding boxes using DOM elements
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      const binEl = document.getElementById(`bin-${bin.id}`);
      if (binEl) {
        const rect = binEl.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          droppedBinId = bin.id;
        }
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
    <div className="relative overflow-hidden bg-slate-900 rounded-3xl shadow-2xl select-none" style={{ width, height }}>
      {/* Scene Background */}
      <KitchenScene width={width} height={height} />

      {/* Mascot Anjali */}
      <ChefAnjali mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-28 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-orange-300 flex items-center gap-2">
            <span className="text-xs font-bold text-orange-800">Chef Anjali&apos;s Fractions</span>
            <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold">
              {screen === 'teaching' ? 'Intro' : `Q ${challengeIdx + 1}/${CHALLENGES.length}`}
            </span>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <StarRow count={Math.min(5, Math.floor(score / 15) + 1)} total={5} />
            <button
              onClick={handleShowHint}
              className="bg-orange-400 hover:bg-orange-500 text-orange-950 font-bold px-3 py-1 rounded-full text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
            >
              💡 Hint
            </button>
          </div>
        )}
      </div>

      {/* ─── SCREEN 1: TEACHING ─────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 pt-20">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} rounded-3xl p-8 shadow-2xl text-white border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-30 rounded-xl font-bold text-sm cursor-pointer transition-all"
              >
                ← Back
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                    audioManager.play('success');
                  }
                }}
                className="px-6 py-2 bg-white text-orange-600 hover:bg-orange-50 rounded-xl font-black text-sm shadow-lg cursor-pointer transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY ─────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 pt-20 pb-8">
          {/* Question Banner */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border-2 border-orange-300 max-w-xl text-center"
          >
            <h3 className="text-base font-black text-gray-800">{currentChallenge.question}</h3>
          </motion.div>

          {/* Challenge Content: Multiple Choice */}
          {currentChallenge.type === 'identify' && (
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-white hover:bg-orange-50 text-gray-800 border-2 border-orange-200";
                if (selectedOpt) {
                  if (isCorrect) btnStyle = "bg-green-500 text-white border-2 border-green-600 shadow-lg scale-105";
                  else if (isSelected) btnStyle = "bg-red-500 text-white border-2 border-red-600";
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedOpt ? 1 : 1.03 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.97 }}
                    onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={!!selectedOpt}
                    className={`py-4 px-6 rounded-2xl font-black text-lg shadow-md transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Challenge Content: Drag and Drop Sorting */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="w-full flex-1 flex flex-col justify-between my-4 relative">
              {/* Bins */}
              <div className="flex justify-center gap-3 px-4 flex-wrap">
                {currentChallenge.bins.map(bin => {
                  const isHover = hoveredBin === bin.id;
                  return (
                    <div
                      key={bin.id}
                      id={`bin-${bin.id}`}
                      className={`flex-1 min-w-[100px] max-w-[140px] h-28 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-2 transition-all shadow-md ${
                        isHover ? 'bg-orange-100 scale-105' : 'bg-white/90'
                      }`}
                      style={{ borderColor: bin.color }}
                      onMouseEnter={() => setHoveredBin(bin.id)}
                      onMouseLeave={() => setHoveredBin(null)}
                    >
                      <span className="text-xs font-black text-center" style={{ color: bin.color }}>{bin.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Draggable Items */}
              <div className="flex justify-center gap-4 px-4 mt-4 flex-wrap">
                {currentChallenge.sortItems.map(item => {
                  const placed = placedItems[item.id] || false;
                  const pos = itemPositions[item.id] || { x: 0, y: 0 };
                  return (
                    <div key={item.id} className="relative" style={{ width: 110, height: 95 }}>
                      <Draggable
                        id={item.id}
                        x={pos.x}
                        y={pos.y}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        width={110}
                        height={95}
                      >
                        <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-orange-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'}`} style={{ width: 110, height: 95 }}>
                          {renderSortIcon(item.icon, 40)}
                          <span className="text-xs font-bold text-gray-700 text-center mt-1">{item.label}</span>
                        </div>
                      </Draggable>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Action / Success Bar */}
          <div className="h-14 flex items-center justify-center w-full">
            {selectedOpt && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Feedback & Overlay Components */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
