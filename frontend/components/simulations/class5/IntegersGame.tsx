'use client';

/**
 * IntegersGame — Class 5 Mathematics (CISCE / ICSE Curriculum)
 * 
 * CISCE Nodes:
 * - c5_math_041: Introduction to negative numbers through number line
 * - c5_math_042: Idea of integers as counting number, zero and negatives of counting numbers
 * - c5_math_043: Comparison of integers through number line
 * - c5_math_044: Ascending and Descending order of integer
 * - c5_math_045: Rules for addition, subtraction of integers
 *
 * Mascot: Explorer Esha — a mountain explorer with a backpack, compass, and hiking boots.
 * She explores numbers above and below sea level.
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

function NumberLineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="22" width="40" height="6" fill="#3B82F6" rx="3" />
      <polygon points="45,18 50,25 45,32" fill="#3B82F6" />
      <polygon points="5,18 0,25 5,32" fill="#3B82F6" />
      <line x1="25" y1="15" x2="25" y2="35" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <circle cx="15" cy="25" r="2" fill="#1E293B" />
      <circle cx="25" cy="25" r="2" fill="#1E293B" />
      <circle cx="35" cy="25" r="2" fill="#1E293B" />
    </svg>
  );
}

function ThermometerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="21" y="8" width="8" height="28" fill="#F8FAFC" stroke="#334155" strokeWidth="2" rx="4" />
      <circle cx="25" cy="38" r="7" fill="#EF4444" stroke="#334155" strokeWidth="2" />
      <rect x="23" y="20" width="4" height="16" fill="#EF4444" rx="2" />
      <line x1="29" y1="14" x2="33" y2="14" stroke="#64748B" strokeWidth="2" />
      <line x1="29" y1="22" x2="33" y2="22" stroke="#64748B" strokeWidth="2" />
      <line x1="29" y1="30" x2="33" y2="30" stroke="#64748B" strokeWidth="2" />
    </svg>
  );
}

function MountainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="25,5 45,42 5,42" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <polygon points="25,5 35,22 15,22" fill="#F8FAFC" />
      <line x1="5" y1="42" x2="45" y2="42" stroke="#3B82F6" strokeWidth="3" />
      <text x="25" y="47" fontSize="8" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">SEA LEVEL</text>
    </svg>
  );
}

function SubmarineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <line x1="0" y1="10" x2="50" y2="10" stroke="#3B82F6" strokeWidth="3" strokeDasharray="4 2" />
      <ellipse cx="25" cy="28" rx="18" ry="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <rect x="21" y="18" width="8" height="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" rx="1" />
      <line x1="25" y1="18" x2="25" y2="14" stroke="#B45309" strokeWidth="2" />
      <circle cx="18" cy="28" r="3" fill="#38BDF8" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="26" cy="28" r="3" fill="#38BDF8" stroke="#B45309" strokeWidth="1.5" />
      <polygon points="8,28 3,24 3,32" fill="#B45309" />
    </svg>
  );
}

function PositiveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M25 15 L25 35 M15 25 L35 25" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function NegativeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <path d="M15 25 L35 25" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function ZeroIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <text x="25" y="31" fontSize="20" fontWeight="bold" fill="#B45309" textAnchor="middle">0</text>
    </svg>
  );
}

function CompassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="21" fill="#F8FAFC" stroke="#475569" strokeWidth="3" />
      <polygon points="25,8 29,25 25,42 21,25" fill="#EF4444" />
      <polygon points="25,42 29,25 25,8 21,25" fill="#CBD5E1" />
      <circle cx="25" cy="25" r="4" fill="#1E293B" />
    </svg>
  );
}

function BackpackIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="12" y="14" width="26" height="30" fill="#10B981" stroke="#047857" strokeWidth="2" rx="6" />
      <path d="M18 14 C18 8, 32 8, 32 14" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      <rect x="17" y="24" width="16" height="12" fill="#059669" rx="3" />
      <circle cx="25" cy="30" r="2" fill="#FDE68A" />
    </svg>
  );
}

function IntegerSetIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="8" />
      <text x="25" y="20" fontSize="11" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">{"Z = {...}"}</text>
      <text x="25" y="35" fontSize="9" fontWeight="bold" fill="#2563EB" textAnchor="middle">-3, 0, +3</text>
    </svg>
  );
}

function CompareIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="21" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
      <text x="25" y="32" fontSize="22" fontWeight="bold" fill="#6D28D9" textAnchor="middle">&lt;</text>
    </svg>
  );
}

function SortArrowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="21" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <path d="M15 32 L35 18 M25 18 L35 18 L35 28" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'number-line': return <NumberLineIcon size={size} />;
    case 'thermometer': return <ThermometerIcon size={size} />;
    case 'mountain': return <MountainIcon size={size} />;
    case 'submarine': return <SubmarineIcon size={size} />;
    case 'positive': return <PositiveIcon size={size} />;
    case 'negative': return <NegativeIcon size={size} />;
    case 'zero': return <ZeroIcon size={size} />;
    case 'compass': return <CompassIcon size={size} />;
    case 'backpack': return <BackpackIcon size={size} />;
    case 'integer-set': return <IntegerSetIcon size={size} />;
    case 'compare': return <CompareIcon size={size} />;
    case 'sort-arrow': return <SortArrowIcon size={size} />;
    default: return <NumberLineIcon size={size} />;
  }
}

// ─── Mountain Explorer Scene Background ───────────────────────

function MountainScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect x="0" y="0" width="720" height="320" fill="url(#sky-grad)" />
        {/* Mountains */}
        <polygon points="50,320 200,120 350,320" fill="#64748B" />
        <polygon points="200,320 380,80 560,320" fill="#475569" />
        <polygon points="400,320 580,150 720,320" fill="#94A3B8" />
        {/* Mountain Snow Caps */}
        <polygon points="200,120 230,160 170,160" fill="#F8FAFC" />
        <polygon points="380,80 415,130 345,130" fill="#F8FAFC" />
        {/* Sea Level Line */}
        <rect x="0" y="320" width="720" height="15" fill="#0EA5E9" />
        <text x="360" y="331" fontSize="10" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">SEA LEVEL (0)</text>
        {/* Ocean Below */}
        <rect x="0" y="335" width="720" height="225" fill="url(#ocean-grad)" />
        {/* Bubbles in Ocean */}
        <circle cx="150" cy="400" r="4" fill="#38BDF8" opacity="0.6" />
        <circle cx="155" cy="380" r="6" fill="#38BDF8" opacity="0.6" />
        <circle cx="550" cy="480" r="5" fill="#38BDF8" opacity="0.6" />
        <circle cx="560" cy="450" r="8" fill="#38BDF8" opacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Mascot: Explorer Esha ────────────────────────────────────

function ExplorerEsha({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-2 bg-white border-2 border-gold-400 rounded-2xl px-4 py-3 shadow-xl max-w-[260px]"
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
          <circle cx="45" cy="32" r="20" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          {/* Explorer Hat */}
          <ellipse cx="45" cy="18" rx="22" ry="6" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          <path d="M30 18 Q45 2 60 18 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes & Smile */}
          <circle cx="38" cy="28" r="2.5" fill="#1E293B" />
          <circle cx="52" cy="28" r="2.5" fill="#1E293B" />
          <path d="M40 38 Q45 43 50 38" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Jacket / Backpack */}
          <path d="M25 54 L65 54 L72 95 L18 95 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          <rect x="38" y="62" width="14" height="18" fill="#10B981" rx="3" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ─────────────────────────────────��─────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-gold-200">
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
    title: "Welcome to Esha's Mountain Explorer! 🏔️",
    text: "Explorer Esha travels high up mountain peaks and deep down into the ocean! To measure these opposite directions, we use negative numbers below zero.",
    emoji: "🏔️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Welcome to Esha's Mountain Explorer! We use negative numbers below zero to measure heights above and depths below sea level."
  },
  {
    title: "The Number Line & Negative Numbers 📈",
    text: "Zero is right in the middle at sea level. Positive numbers go to the right (+1, +2, +3), and negative numbers go to the left (-1, -2, -3) with equal spacing!",
    emoji: "📏",
    bgColor: "from-gold-600 to-gold-700",
    spoken: "Zero is at the centre. Positive numbers go to the right, and negative numbers go to the left with equal spacing and mirror symmetry!"
  },
  {
    title: "The Complete Family of Integers 📦",
    text: "Integers include positive counting numbers (1, 2, 3...), zero (0), and negative integers (-1, -2, -3...). Zero is neither positive nor negative!",
    emoji: "🔢",
    bgColor: "from-emerald-600 to-teal-700",
    spoken: "Integers include positive counting numbers, zero, and negatives of counting numbers. Zero is the neutral mirror in the middle!"
  },
  {
    title: "Comparing Integers: Left vs Right ◀️▶️",
    text: "On the number line, any number to the RIGHT is greater, and any number to the LEFT is smaller! So -5 is smaller than -2 (-5 < -2) because it lies further left.",
    emoji: "⚖️",
    bgColor: "from-amber-600 to-orange-700",
    spoken: "Right means greater, left means smaller! This is why minus 5 is less than minus 2, because minus 5 sits further left."
  },
  {
    title: "Adding & Subtracting Integers ➕➖",
    text: "Same sign? Add values and keep the sign: (-3) + (-2) = -5. Opposite sign? Subtract and keep the larger sign: (+3) + (-5) = -2. Subtracting a negative is adding a positive!",
    emoji: "💡",
    bgColor: "from-purple-600 to-pink-700",
    spoken: "For addition, keep signs or subtract for opposites. Remember, subtracting a negative is the same as adding a positive!"
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "On the number line, which numbers are written to the LEFT of zero?",
    answer: "Negative numbers",
    options: ["Negative numbers", "Positive numbers", "Whole numbers", "Natural numbers"],
    hint: "Think about temperature below freezing or depths below sea level -- they lie on the left side of zero.",
    misconception: "Positive numbers lie to the right of zero, while negative numbers written with a minus sign lie to the left of zero."
  },
  {
    type: 'sort',
    question: "Drag each real-life situation to Positive or Negative!",
    answer: "sort",
    options: [],
    hint: "Above sea level or above zero is positive (+). Below sea level or below zero is negative (-).",
    misconception: "Quantities above a reference point are positive integers, while quantities below or opposite are negative integers.",
    sortItems: [
      { id: 's1', label: '1000m above sea level', icon: 'mountain', correctBin: 'pos' },
      { id: 's2', label: '200m below sea level', icon: 'submarine', correctBin: 'neg' },
      { id: 's3', label: '5 degrees above zero', icon: 'thermometer', correctBin: 'pos' },
      { id: 's4', label: '3 degrees below zero', icon: 'thermometer', correctBin: 'neg' },
    ],
    bins: [
      { id: 'pos', label: 'Positive (+)', color: '#3B82F6' },
      { id: 'neg', label: 'Negative (-)', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "Which integer is greater: -5 or -1?",
    answer: "-1",
    options: ["-1", "-5", "Both are equal", "Cannot compare"],
    hint: "Check their positions on the number line: -1 sits closer to zero, to the right of -5.",
    misconception: "Do not confuse magnitude with value! -5 has a bigger digit, but it lies further left than -1, so -5 is smaller than -1 (-5 < -1)."
  },
  {
    type: 'sort',
    question: "Drag each integer to its correct position on the number line from Smallest to Largest!",
    answer: "sort",
    options: [],
    hint: "Ascending order reads from left to right on the number line: most negative first, then zero, then positives.",
    misconception: "When ordering integers, negative numbers with larger magnitudes come first because they lie furthest to the left.",
    sortItems: [
      { id: 'i1', label: '-4', icon: 'number-line', correctBin: 'b1' },
      { id: 'i2', label: '-1', icon: 'number-line', correctBin: 'b2' },
      { id: 'i3', label: '0', icon: 'zero', correctBin: 'b3' },
      { id: 'i4', label: '5', icon: 'positive', correctBin: 'b4' },
    ],
    bins: [
      { id: 'b1', label: '1st (-4)', color: '#EF4444' },
      { id: 'b2', label: '2nd (-1)', color: '#F59E0B' },
      { id: 'b3', label: '3rd (0)', color: '#10B981' },
      { id: 'b4', label: '4th (5)', color: '#3B82F6' },
    ]
  },
  {
    type: 'identify',
    question: "What is 3 + (-5)?",
    answer: "-2",
    options: ["-2", "8", "-8", "2"],
    hint: "Start at +3 on the number line and move 5 steps to the left (negative direction).",
    misconception: "When adding integers with opposite signs, subtract the smaller value from the larger (5 - 3 = 2) and keep the sign of the larger (negative), giving -2."
  },
  {
    type: 'sort',
    question: "Drag each integer addition or subtraction problem to its correct answer!",
    answer: "sort",
    options: [],
    hint: "Remember: subtracting a negative is the same as adding a positive! e.g., (-2) - (-4) becomes (-2) + (+4) = +2.",
    misconception: "Careful with subtraction of negatives: (-2) - (-4) = +2 because subtracting a negative moves you to the right on the number line.",
    sortItems: [
      { id: 'p1', label: '(-3) + (-2)', icon: 'negative', correctBin: '-5' },
      { id: 'p2', label: '(-2) - (-4)', icon: 'positive', correctBin: '2' },
      { id: 'p3', label: '4 - (-2)', icon: 'compare', correctBin: '6' },
      { id: 'p4', label: '(+7) + (-4)', icon: 'integer-set', correctBin: '3' },
    ],
    bins: [
      { id: '-5', label: '-5', color: '#EF4444' },
      { id: '2', label: '+2', color: '#3B82F6' },
      { id: '6', label: '+6', color: '#10B981' },
      { id: '3', label: '+3', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "Arrange the integers {-3, 5, 0, -1, 2} in ascending order. Which integer comes FIRST?",
    answer: "-3",
    options: ["-3", "-1", "0", "5"],
    hint: "Ascending order means smallest to largest. The most negative number sits furthest to the left on the number line.",
    misconception: "The most negative integer (-3) comes first in ascending order because it lies furthest to the left of zero."
  },
  {
    type: 'sort',
    question: "Drag each set of integers to its correct ascending order!",
    answer: "sort",
    options: [],
    hint: "Check every number's position: negatives on the left, zero in the middle, positives on the right.",
    misconception: "Always verify left-to-right order on the number line: negatives first (furthest left is smallest), then zero, then positives.",
    sortItems: [
      { id: 'set1', label: '{-4, -1, 0, 2, 3}', icon: 'sort-arrow', correctBin: 'bin1' },
      { id: 'set2', label: '{-5, -2, 1, 3, 4}', icon: 'sort-arrow', correctBin: 'bin2' },
      { id: 'set3', label: '{-3, 0, 2, 5, 7}', icon: 'sort-arrow', correctBin: 'bin3' },
    ],
    bins: [
      { id: 'bin1', label: '-4, -1, 0, 2, 3', color: '#3B82F6' },
      { id: 'bin2', label: '-5, -2, 1, 3, 4', color: '#10B981' },
      { id: 'bin3', label: '-3, 0, 2, 5, 7', color: '#8B5CF6' },
    ]
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface IntegersGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function IntegersGame({ width = 720, height = 560, onComplete }: IntegersGameProps) {
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
  const [, setHoveredBin] = useState<string | null>(null);

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
        newPos[item.id] = { x: 40 + idx * 150, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = "Great job! That is correct!";
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
      const compMsg = "Wonderful! You are an expert Mountain Explorer!";
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

    // Check bin collision
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin) => {
      // Approximate bin positions based on index
      const binEl = document.getElementById(`bin-${bin.id}`);
      if (binEl) {
        const rect = binEl.getBoundingClientRect();
        if (x >= rect.left - 30 && x <= rect.right + 30 && y >= rect.top - 30 && y <= rect.bottom + 30) {
          droppedBinId = bin.id;
        }
      }
    });

    setHoveredBin(null);

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
        const msg = "Fantastic sorting! All correct!";
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
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans"
      style={{ width, height }}
    >
      {/* ── BACKGROUND SCENE ─────────────────────────────── */}
      <MountainScene width={width} height={height} />

      {/* ── MASCOT ────────────────────────────────────────── */}
      <ExplorerEsha mood={mascotMood} speaking={speakingText} />

      {/* ── FEEDBACK OVERLAYS ───────────────────────────── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
      {successMsg && (
        <SuccessBanner
          message={successMsg}
          onComplete={advanceChallenge}
        />
      )}
      {hintMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => setHintMsg(null)}
        />
      )}

      {/* ── SCREEN 1: TEACHING ───────────────���──────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 z-10 bg-black/40 backdrop-blur-sm">
          <div className="w-full flex justify-between items-center mt-2">
            <h1 className="text-xl font-black text-white tracking-wide drop-shadow-md">
              🏔️ Integers & Number Line Masterclass
            </h1>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === slideIdx ? 'bg-gold-400 w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4 drop-shadow-lg">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-xl mb-4">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${
                slideIdx === 0 ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-500'
              }`}
            >
              ⬅️ Previous
            </button>

            {slideIdx < TEACHING_SLIDES.length - 1 ? (
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIdx(prev => prev + 1);
                }}
                className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg"
              >
                Next ➡️
              </button>
            ) : (
              <button
                onClick={() => {
                  audioManager.play('celebration');
                  setScreen('play');
                }}
                className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-xl animate-bounce"
              >
                Start Adventure! 🚀
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── SCREEN 2: PLAY (CHALLENGES) ────────────────��── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
          {/* Header Bar */}
          <div className="flex justify-between items-center bg-black/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-black text-amber-300">Score: {score}</span>
              <button
                onClick={handleShowHint}
                className="bg-amber-500 hover:bg-amber-400 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
              >
                💡 Hint
              </button>
            </div>
          </div>

          {/* Challenge Box */}
          <div className="my-auto mx-auto w-full max-w-2xl bg-slate-900/90 backdrop-blur-xl border-2 border-gold-500/50 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
            <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
              {currentChallenge.question}
            </h3>

            {/* IDENTIFY TYPE: Multiple Choice */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnBg = 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600';
                  if (selectedOpt) {
                    if (isCorrectOpt) btnBg = 'bg-emerald-600 text-white border-emerald-400';
                    else if (isSelected) btnBg = 'bg-rose-600 text-white border-rose-400';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e) => !selectedOpt && handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`py-4 px-6 rounded-2xl font-black text-lg border-2 shadow-lg transition-all ${btnBg}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* SORT TYPE: Drag and Drop */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="w-full flex flex-col items-center">
                {/* Bins */}
                <div className="flex justify-center gap-4 w-full mb-16">
                  {currentChallenge.bins.map((bin) => (
                    <div
                      key={bin.id}
                      id={`bin-${bin.id}`}
                      className="w-32 h-28 rounded-2xl border-4 border-dashed border-white/40 bg-white/10 flex flex-col items-center justify-center p-2 shadow-inner transition-all"
                      style={{ borderColor: bin.color }}
                    >
                      <span className="text-xs font-black text-white text-center drop-shadow">{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable Items */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4 pointer-events-auto">
                  {currentChallenge.sortItems.map((item) => {
                    const pos = itemPositions[item.id] || { x: 0, y: 0 };
                    const placed = placedItems[item.id] || false;

                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={pos.x}
                        y={pos.y}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={(id, x, y) => handleDragEnd(id, x, y)}
                        width={130}
                        height={85}
                      >
                        <div
                          className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 ${
                            placed ? 'bg-emerald-800/80 border-emerald-400 opacity-50' : 'bg-white border-gold-300'
                          }`}
                          style={{ width: 130, height: 85 }}
                        >
                          {renderSortIcon(item.icon, 36)}
                          <span className="text-[10px] font-black text-gray-800 text-center mt-1 px-1">
                            {item.label}
                          </span>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Next Button for Identify after answering */}
            {currentChallenge.type === 'identify' && selectedOpt && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={advanceChallenge}
                className="mt-6 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black rounded-2xl shadow-xl"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Complete Adventure! 🏆'}
              </motion.button>
            )}

            {/* Next Button for Sort after all items placed */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={advanceChallenge}
                className="absolute bottom-6 right-6 z-30 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black rounded-2xl shadow-xl animate-bounce"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Complete Adventure! 🏆'}
              </motion.button>
            )}

            {isIncorrect && currentChallenge.type === 'identify' && (
              <button
                onClick={() => {
                  setSelectedOpt(null);
                  setIsIncorrect(false);
                  setMascotMood('happy');
                }}
                className="mt-4 text-xs font-bold text-gold-300 underline hover:text-gold-200"
              >
                Try Again 🔄
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
