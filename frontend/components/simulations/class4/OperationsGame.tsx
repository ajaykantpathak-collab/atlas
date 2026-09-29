'use client';

/**
 * OperationsGame — Class 4 Mathematics (CISCE / ICSE Curriculum)
 * 
 * CISCE Nodes:
 * - c4_math_010: Addition and subtraction up to 4 digits with/without regrouping
 * - c4_math_011: Multiplication tables up to 10
 * - c4_math_012: 2 and 3 digit multiplication (standard and lattice)
 * - c4_math_013: Single digit division
 * - c4_math_014: Four operations in real-life situations
 * - c4_math_015: Word problems based on mathematical statements
 * - c4_math_016: Estimation and mental verification
 *
 * Mascot: Shopkeeper Suresh — a friendly shopkeeper with a green apron,
 * a calculator badge, a receipt book, and coins.
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

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

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

// ─── SVG Icon Components ──────────────────────────────────────

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

function MultiplyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 10 L40 40 M40 10 L10 40" stroke="#10B981" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}

function DivideIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="12" r="5" fill="#8B5CF6" />
      <rect x="8" y="22" width="34" height="8" fill="#8B5CF6" rx="3" />
      <circle cx="25" cy="40" r="5" fill="#8B5CF6" />
    </svg>
  );
}

function CalculatorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="4" width="34" height="42" fill="#1E293B" rx="6" />
      <rect x="12" y="8" width="26" height="10" fill="#38BDF8" rx="2" />
      <circle cx="17" cy="24" r="3" fill="#94A3B8" />
      <circle cx="25" cy="24" r="3" fill="#94A3B8" />
      <circle cx="33" cy="24" r="3" fill="#94A3B8" />
      <circle cx="17" cy="32" r="3" fill="#94A3B8" />
      <circle cx="25" cy="32" r="3" fill="#94A3B8" />
      <circle cx="33" cy="32" r="3" fill="#F59E0B" />
      <circle cx="17" cy="40" r="3" fill="#94A3B8" />
      <circle cx="25" cy="40" r="3" fill="#94A3B8" />
      <circle cx="33" cy="40" r="3" fill="#10B981" />
    </svg>
  );
}

function CoinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="35" rx="18" ry="8" fill="#D97706" />
      <ellipse cx="25" cy="30" rx="18" ry="8" fill="#F59E0B" />
      <ellipse cx="25" cy="25" rx="18" ry="8" fill="#FBBF24" />
      <ellipse cx="25" cy="20" rx="18" ry="8" fill="#FDE68A" />
      <text x="25" y="23" fontSize="10" fontWeight="bold" fill="#B45309" textAnchor="middle">₹</text>
    </svg>
  );
}

function ReceiptIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 5 L40 5 L40 42 L36 45 L32 42 L28 45 L24 42 L20 45 L16 42 L12 45 L10 42 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="16" y1="12" x2="34" y2="12" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="18" x2="28" y2="18" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="24" x2="32" y2="24" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="32" x2="34" y2="32" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BasketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 20 L40 20 L36 44 L14 44 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      <path d="M15 20 C15 5, 35 5, 35 20" stroke="#92400E" strokeWidth="3" fill="none" />
      <circle cx="22" cy="30" r="4" fill="#EF4444" />
      <circle cx="30" cy="33" r="4" fill="#10B981" />
      <circle cx="25" cy="38" r="4" fill="#F59E0B" />
    </svg>
  );
}

function TableIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="6" width="38" height="38" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="4" />
      <line x1="6" y1="18" x2="44" y2="18" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="20" y1="6" x2="20" y2="44" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="13" y="14" fontSize="10" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">×</text>
      <text x="32" y="14" fontSize="10" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">7</text>
      <text x="13" y="28" fontSize="10" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">8</text>
      <text x="32" y="28" fontSize="10" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">56</text>
    </svg>
  );
}

function EstimateIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 20 C15 12, 35 12, 40 20" stroke="#8B5CF6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M10 30 C15 38, 35 38, 40 30" stroke="#8B5CF6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="25" y="28" fontSize="14" fontWeight="bold" fill="#6D28D9" textAnchor="middle">≈</text>
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'plus': return <PlusIcon size={size} />;
    case 'minus': return <MinusIcon size={size} />;
    case 'multiply': return <MultiplyIcon size={size} />;
    case 'divide': return <DivideIcon size={size} />;
    case 'calculator': return <CalculatorIcon size={size} />;
    case 'coin': return <CoinIcon size={size} />;
    case 'receipt': return <ReceiptIcon size={size} />;
    case 'basket': return <BasketIcon size={size} />;
    case 'table': return <TableIcon size={size} />;
    case 'estimate': return <EstimateIcon size={size} />;
    default: return <PlusIcon size={size} />;
  }
}

// ─── Shop Scene Background ────────────────────────────────────

function ShopScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="shop-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="shop-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="counter-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
        {/* Background wall */}
        <rect width="720" height="380" fill="url(#shop-wall)" />
        {/* Shelves */}
        <rect x="60" y="80" width="600" height="12" fill="#B45309" rx="3" />
        <rect x="60" y="180" width="600" height="12" fill="#B45309" rx="3" />
        <rect x="60" y="280" width="600" height="12" fill="#B45309" rx="3" />
        {/* Items on shelves */}
        <circle cx="120" cy="65" r="15" fill="#EF4444" />
        <circle cx="170" cy="65" r="15" fill="#10B981" />
        <rect x="220" y="45" width="25" height="35" fill="#3B82F6" rx="3" />
        <rect x="260" y="45" width="25" height="35" fill="#8B5CF6" rx="3" />
        <rect x="350" y="145" width="30" height="35" fill="#F59E0B" rx="3" />
        <circle cx="420" cy="160" r="14" fill="#EC4899" />
        <circle cx="470" cy="160" r="14" fill="#06B6D4" />
        {/* Shop floor */}
        <rect x="0" y="380" width="720" height="180" fill="#78350F" />
        {/* Counter */}
        <rect x="100" y="340" width="520" height="100" fill="url(#counter-wood)" rx="6" />
        <rect x="120" y="320" width="480" height="25" fill="#F59E0B" rx="4" />
      </svg>
    </div>
  );
}

// ─── Mascot: Shopkeeper Suresh ────────────────────────────────

function ShopkeeperSuresh({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-2 bg-white border-2 border-amber-400 rounded-2xl px-4 py-3 shadow-xl max-w-[260px]"
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
          {/* Head & Face */}
          <circle cx="45" cy="30" r="22" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Mustache */}
          <path d="M35 38 Q45 44 55 38 Q50 34 45 38 Q40 34 35 38 Z" fill="#92400E" />
          {/* Eyes */}
          <circle cx="37" cy="26" r="3" fill="#1E293B" />
          <circle cx="53" cy="26" r="3" fill="#1E293B" />
          <circle cx="38" cy="25" r="1" fill="white" />
          <circle cx="54" cy="25" r="1" fill="white" />
          {/* Smile */}
          <path d="M40 43 Q45 48 50 43" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Cap / Turband */}
          <path d="M22 22 Q45 5 68 22 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          <ellipse cx="45" cy="18" rx="8" ry="4" fill="#F59E0B" />
          {/* Green Apron & Body */}
          <path d="M25 52 L65 52 L75 95 L15 95 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
          {/* Calculator badge on apron */}
          <rect x="38" y="62" width="14" height="16" fill="#1E293B" rx="2" />
          <rect x="41" y="65" width="8" height="4" fill="#38BDF8" rx="1" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-amber-200">
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
    title: "Welcome to Suresh's Math Shop! 🏪",
    text: "Shopkeeper Suresh uses addition, subtraction, multiplication, and division every single day to run his busy Indian market shop!",
    emoji: "🏪",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "Welcome to Suresh's Math Shop! Suresh uses addition, subtraction, multiplication, and division every single day!"
  },
  {
    title: "Addition & Subtraction (Up to 4 Digits) ➕➖",
    text: "Always start adding or subtracting from the ONES place on the right and move left! When columns overflow, carry over or borrow carefully.",
    emoji: "🔢",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Always start from the ones place on the right and move left! Carry over and borrow when needed!"
  },
  {
    title: "Multiplication Tables & Algorithms ✖️",
    text: "Master multiplication tables from 2 to 10. Use the standard column algorithm with partial products or the visual lattice grid!",
    emoji: "📊",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Master your multiplication tables up to 10, and use standard columns or lattice grids to multiply big numbers!"
  },
  {
    title: "Single Digit Division & Real Life ➗",
    text: "Division is fair sharing! Share items into equal groups, subtract repeatedly, or use multiplication facts backwards. Apply 2-step operations in real life!",
    emoji: "🍎",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "Division is fair sharing! Use multiplication facts backwards, and solve real life problems step by step!"
  },
  {
    title: "Estimation & Mental Verification 🧠",
    text: "Round numbers to the nearest ten or hundred to estimate sums and products quickly. Verify your answers to check if they are reasonable!",
    emoji: "💡",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Round numbers to estimate quickly, and verify your answers mentally to ensure they are reasonable!"
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is 3456 + 1232 without regrouping?",
    answer: "4688",
    options: ["4688", "4680", "4700", "3588"],
    hint: "Add column by column from the right: 6+2=8, 5+3=8, 4+2=6, 3+1=4.",
    misconception: "Always start adding from the ONES place on the right and move left. Here, 6+2=8, 5+3=8, 4+2=6, and 3+1=4, giving 4688 with no carry needed."
  },
  {
    type: 'identify',
    question: "Add 2345 and 1678 with regrouping (carrying). What is the sum?",
    answer: "4023",
    options: ["4023", "4013", "3923", "4123"],
    hint: "Ones: 5+8=13 (write 3, carry 1). Tens: 4+7+1=12 (write 2, carry 1). Hundreds: 3+6+1=10 (write 0, carry 1). Thousands: 2+1+1=4.",
    misconception: "Remember to carry over when a column sum reaches 10 or more! In the hundreds column, 3+6+1=10, so write 0 and carry 1 to thousands, giving 4023."
  },
  {
    type: 'sort',
    question: "Drag each multiplication fact to its correct product!",
    answer: "sort",
    options: [],
    hint: "Recall your tables from node c4_math_011: 7x8=56, 9x6=54, 8x8=64, 7x9=63!",
    misconception: "Multiplication tables are constructed through repeated addition and skip counting. Match each factor pair to its correct product row.",
    sortItems: [
      { id: 'm1', label: '7 × 8 = ?', icon: 'table', correctBin: '56' },
      { id: 'm2', label: '9 × 6 = ?', icon: 'table', correctBin: '54' },
      { id: 'm3', label: '8 × 8 = ?', icon: 'table', correctBin: '64' },
      { id: 'm4', label: '7 × 9 = ?', icon: 'table', correctBin: '63' },
    ],
    bins: [
      { id: '56', label: '56', color: '#3B82F6' },
      { id: '54', label: '54', color: '#10B981' },
      { id: '64', label: '64', color: '#F59E0B' },
      { id: '63', label: '63', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is 234 × 3 using the standard multiplication algorithm?",
    answer: "702",
    options: ["702", "602", "712", "692"],
    hint: "Multiply 3 by each digit: 3×4=12 (write 2, carry 1), 3×3=9+1=10 (write 0, carry 1), 3×2=6+1=7.",
    misconception: "Multiply ones first, write the digit and carry over any tens, then multiply tens and add the carry before moving to hundreds!"
  },
  {
    type: 'sort',
    question: "Drag each single-digit division problem to its correct quotient!",
    answer: "sort",
    options: [],
    hint: "Division is the inverse of multiplication! 48 ÷ 6 = ?, because 6 × ? = 48.",
    misconception: "Division splits a number into equal groups. Recall your multiplication tables backwards: 48/6=8, 72/8=9, 56/7=8, 63/9=7.",
    sortItems: [
      { id: 'd1', label: '48 ÷ 6 = ?', icon: 'divide', correctBin: '8' },
      { id: 'd2', label: '72 ÷ 8 = ?', icon: 'divide', correctBin: '9' },
      { id: 'd3', label: '56 ÷ 7 = ?', icon: 'divide', correctBin: '8' },
      { id: 'd4', label: '63 ÷ 9 = ?', icon: 'divide', correctBin: '7' },
    ],
    bins: [
      { id: '8', label: '8', color: '#3B82F6' },
      { id: '9', label: '9', color: '#10B981' },
      { id: '7', label: '7', color: '#F59E0B' },
    ]
  },
  {
    type: 'identify',
    question: "A shopkeeper has 8 boxes of pens with 12 pens in each box. He sells 45 pens. How many pens are left?",
    answer: "51",
    options: ["51", "96", "45", "59"],
    hint: "Step 1: Multiply 8 boxes × 12 pens = 96 total pens. Step 2: Subtract the 45 pens sold from 96.",
    misconception: "Real-life problems often need two operations! First multiply to find the total (8 × 12 = 96), then subtract what was sold (96 - 45 = 51)."
  },
  {
    type: 'sort',
    question: "Drag each word problem to the correct operation needed!",
    answer: "sort",
    options: [],
    hint: "Combining totals = addition. Taking away = subtraction. Equal groups = multiplication. Sharing equally = division.",
    misconception: "Read the story context carefully! 'Total cost of items' is addition, 'money left after spending' is subtraction, 'equal boxes' is multiplication, 'sharing equally' is division.",
    sortItems: [
      { id: 'op1', label: 'Total cost of 3 items', icon: 'plus', correctBin: 'add' },
      { id: 'op2', label: 'Money left after spending', icon: 'minus', correctBin: 'sub' },
      { id: 'op3', label: '6 boxes with 12 eggs each', icon: 'multiply', correctBin: 'mul' },
      { id: 'op4', label: 'Share ₹96 among 4 children', icon: 'divide', correctBin: 'div' },
    ],
    bins: [
      { id: 'add', label: 'Addition ➕', color: '#3B82F6' },
      { id: 'sub', label: 'Subtraction ➖', color: '#EF4444' },
      { id: 'mul', label: 'Multiplication ✖️', color: '#10B981' },
      { id: 'div', label: 'Division ➗', color: '#8B5CF6' },
    ]
  },
  {
    type: 'sort',
    question: "Drag each number to its correct rounded value to the nearest ten or hundred!",
    answer: "sort",
    options: [],
    hint: "Rule: 0-4 round down, 5-9 round up! 48 has ones digit 8, so it rounds up to 50.",
    misconception: "Rounding means looking at the ones or tens digit: 48 rounds to 50, 42 rounds to 40, 512 rounds to 500, 198 rounds to 200.",
    sortItems: [
      { id: 'r1', label: '48 (nearest 10)', icon: 'estimate', correctBin: '50' },
      { id: 'r2', label: '42 (nearest 10)', icon: 'estimate', correctBin: '40' },
      { id: 'r3', label: '512 (nearest 100)', icon: 'estimate', correctBin: '500' },
      { id: 'r4', label: '198 (nearest 100)', icon: 'estimate', correctBin: '200' },
    ],
    bins: [
      { id: '50', label: '50', color: '#3B82F6' },
      { id: '40', label: '40', color: '#10B981' },
      { id: '500', label: '500', color: '#F59E0B' },
      { id: '200', label: '200', color: '#8B5CF6' },
    ]
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface OperationsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function OperationsGame({ width = 720, height = 560, onComplete }: OperationsGameProps) {
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

  // Handle inactivity hint timer (EXACTLY 10000ms = 10s)
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
      const msg = "Great job! You are a math operations star!";
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
      const compMsg = "Wonderful! You are a brilliant star!";
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

    // Check bin bounding boxes
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      // Bins are positioned in the top/middle area
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
        const msg = "Fantastic! You sorted all the operations perfectly!";
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
      <ShopScene width={width} height={height} />

      {/* Mascot Suresh */}
      <ShopkeeperSuresh mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-28 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-amber-300 flex items-center gap-2">
            <span className="text-xs font-bold text-amber-800">Shopkeeper Suresh's Math</span>
            <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">
              {screen === 'teaching' ? 'Intro' : `Q ${challengeIdx + 1}/${CHALLENGES.length}`}
            </span>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <StarRow count={Math.min(5, Math.floor(score / 15) + 1)} total={5} />
            <button
              onClick={handleShowHint}
              className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-3 py-1 rounded-full text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
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
            className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border-2 border-amber-300 max-w-xl text-center"
          >
            <h3 className="text-base font-black text-gray-800">{currentChallenge.question}</h3>
          </motion.div>

          {/* Challenge Content: Multiple Choice */}
          {currentChallenge.type === 'identify' && (
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-white hover:bg-amber-50 text-gray-800 border-2 border-amber-200";
                if (selectedOpt) {
                  if (isCorrect) btnStyle = "bg-green-500 text-white border-2 border-green-600 shadow-lg scale-105";
                  else if (isSelected) btnStyle = "bg-red-500 text-white border-2 border-red-600 animate-shake";
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedOpt ? 1 : 1.03 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.97 }}
                    onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={!!selectedOpt}
                    className={`py-4 px-6 rounded-2xl font-black text-xl shadow-md transition-all cursor-pointer ${btnStyle}`}
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
              <div className="flex justify-center gap-4 px-4">
                {currentChallenge.bins.map(bin => {
                  const isHover = hoveredBin === bin.id;
                  return (
                    <div
                      key={bin.id}
                      id={`bin-${bin.id}`}
                      className={`flex-1 max-w-[150px] h-28 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-2 transition-all shadow-md ${
                        isHover ? 'bg-amber-100 scale-105' : 'bg-white/90'
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
              <div className="flex justify-center gap-4 px-4 mt-4">
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
                        <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'}`} style={{ width: 110, height: 95 }}>
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
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
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
