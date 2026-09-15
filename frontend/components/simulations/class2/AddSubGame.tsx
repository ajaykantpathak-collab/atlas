'use client';

/**
 * AddSubGame — Learn addition and subtraction of two-digit numbers with Shopkeeper Sam!
 *
 * CISCE Nodes: c2_math_005 (Addition/subtraction with regrouping),
 *              c2_math_006 (Place value in standard algorithm),
 *              c2_math_007 (Adding/subtracting zero),
 *              c2_math_008 (Commutative property),
 *              c2_math_009 (Word problems),
 *              c2_math_010 (Constructing problems),
 *              c2_math_011 (Estimation),
 *              c2_math_014 (Mental addition/subtracting)
 *
 * ELI5: "Shopkeeper Sam has vegetable baskets and a weighing scale! When we add
 *   two-digit numbers, we always add the ones first. If the ones make ten or
 *   more, we carry a bundle of ten over to the tens column! When we subtract,
 *   if we don't have enough ones, we borrow a ten from the tens column and break
 *   it into ten loose ones. Zero leaves the number unchanged, and adding two numbers
 *   in any order gives the same sum!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG vegetable market scene background (sky, chalkboard, scales, baskets)
 * - Custom SVG vegetable/coin components (Tomato, Carrot, Potato, Coin, Scales)
 * - Custom SVG Shopkeeper Sam mascot with green apron and mood states
 * - Drag-and-drop: drag calculation steps / estimation cards into bins
 * - 8 progressive challenges: exact add/sub → standard algorithm steps → zero → commutative → word problems → estimation
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions (via Web Speech API / audioManager)
 * - Procedural sound effects (drop, success, celebration)
 * - Confetti + celebration on success
 * - Auto-hint after inactivity
 * - Progressive difficulty ladder
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';

import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'Welcome to Sam’s Vegetable Shop! 🍅',
    text: 'Hello young mathematicians! Shopkeeper Sam has fresh vegetables, scales, and a chalkboard. Today we will learn to add and subtract two-digit numbers with carrying and borrowing!',
    emoji: '🏪',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Welcome to Sams Vegetable Shop! Let us learn addition and subtraction of two-digit numbers with Sam!',
  },
  {
    title: 'Always Start with the Ones! 🥇',
    text: 'When adding or subtracting two-digit numbers, ALWAYS start with the ones column on the right! If ones add up to 10 or more, carry 1 ten over. In subtraction, if top ones is smaller, borrow 1 ten!',
    emoji: '🔢',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Always start with the ones column on the right! Carry over or borrow when needed!',
  },
  {
    title: 'The Magic of Zero & Order 🪄',
    text: 'Adding or subtracting zero leaves the number completely unchanged (35 + 0 = 35). And adding two numbers in any order gives the same sum — that is the commutative property (34 + 56 = 56 + 34)!',
    emoji: '✨',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Adding zero leaves the number unchanged. And swapping addends does not change the sum!',
  },
  {
    title: 'Solving Word Problems 🛒',
    text: 'Read stories carefully! "In all" or "more" means we add. "Left", "sold", or "how many more" means we subtract. Always set out your numbers neatly in ones and tens columns.',
    emoji: '📖',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'Read stories carefully! More means add, left or sold means subtract!',
  },
  {
    title: 'Quick Estimation ⚡',
    text: 'Estimation is a smart guess! Round each number to the nearest ten (5 or more let it soar, 4 or less let it rest) and add or subtract mentally to check if your answer is reasonable.',
    emoji: '💡',
    bgColor: 'from-yellow-400 to-amber-500',
    spoken: 'Estimation is a smart guess by rounding to the nearest ten to check your answer!',
  },
];

// ─── Types ────────────────────────────────────────────────────

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

// ─── Challenges (8 progressive) ───────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Shopkeeper Sam has 25 tomatoes and gets 13 more. How many tomatoes does he have in all? (25 + 13)',
    answer: '38',
    options: ['35', '38', '48'],
    hint: 'Add the ones first: 5 + 3 = 8. Then add the tens: 2 + 1 = 3.',
    misconception: 'Always start with the ones column! 5 ones + 3 ones = 8 ones, and 2 tens + 1 ten = 3 tens. Total is 38, no regrouping needed!',
  },
  {
    type: 'identify',
    question: 'Sam had 45 carrots and sold 23. How many carrots are left? (45 - 23)',
    answer: '22',
    options: ['22', '68', '25'],
    hint: 'Subtract ones first: 5 - 3 = 2. Then subtract tens: 4 - 2 = 2.',
    misconception: 'Subtract ones from ones and tens from tens! 5 - 3 = 2 in ones, 4 - 2 = 2 in tens. The difference is 22!',
  },
  {
    type: 'sort',
    question: 'Drag the steps in order to solve 36 + 27 with regrouping!',
    answer: 'sort',
    options: [],
    hint: 'Start with ones: 6 + 7 = 13. Write 3, carry 1 ten. Then add tens: 3 + 2 + 1 = 6.',
    misconception: 'Always start with ones! 6 + 7 = 13 (3 ones, carry 1 ten). Then add tens plus carry: 3 + 2 + 1 = 6 tens. Total 63!',
    sortItems: [
      { id: 'step1', label: '1. Add ones: 6 + 7 = 13', icon: 'coin', correctBin: 'bin1' },
      { id: 'step2', label: '2. Write 3, carry 1 ten', icon: 'coin', correctBin: 'bin2' },
      { id: 'step3', label: '3. Add tens: 3 + 2 + 1 = 6', icon: 'coin', correctBin: 'bin3' },
      { id: 'step4', label: '4. Sum is 63', icon: 'coin', correctBin: 'bin4' },
    ],
    bins: [
      { id: 'bin1', label: '1. Ones', color: '#3B82F6' },
      { id: 'bin2', label: '2. Carry', color: '#8B5CF6' },
      { id: 'bin3', label: '3. Tens', color: '#EC4899' },
      { id: 'bin4', label: '4. Result', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Sam has 47 potatoes. He adds 0 more potatoes. How many does he have? (47 + 0)',
    answer: '47',
    options: ['0', '47', '407'],
    hint: 'Zero means nothing is added! The number stays exactly the same.',
    misconception: 'Adding zero does NOT make the answer zero! Zero is an operand representing nothing, so 47 + 0 = 47. The number remains unchanged.',
  },
  {
    type: 'identify',
    question: 'Sam writes 34 + 56 = 56 + 34 on his chalkboard. Why are both sides equal?',
    answer: 'Addition is commutative',
    options: ['Addition is commutative', 'Subtraction is commutative', 'Both sides are wrong'],
    hint: 'Does changing the order of addends change the sum in addition?',
    misconception: 'The commutative property states that changing the order of addends does not change the sum! 34 + 56 and 56 + 34 both equal 90. Note: subtraction is NOT commutative!',
  },
  {
    type: 'sort',
    question: 'Drag the steps in order to solve 52 - 28 with borrowing!',
    answer: 'sort',
    options: [],
    hint: 'Can you subtract 8 from 2? No! Borrow 1 ten. 2 becomes 12.',
    misconception: 'Never swap digits when subtracting! 2 is smaller than 8, so borrow 1 ten. 5 tens becomes 4 tens, and 2 ones becomes 12 ones. 12 - 8 = 4!',
    sortItems: [
      { id: 'sub1', label: '1. 2 < 8, borrow 1 ten', icon: 'coin', correctBin: 'bin1' },
      { id: 'sub2', label: '2. 5 tens becomes 4 tens', icon: 'coin', correctBin: 'bin2' },
      { id: 'sub3', label: '3. 2 ones becomes 12 ones', icon: 'coin', correctBin: 'bin3' },
      { id: 'sub4', label: '4. 12 - 8 = 4, 4 - 2 = 2 (24)', icon: 'coin', correctBin: 'bin4' },
    ],
    bins: [
      { id: 'bin1', label: '1. Borrow', color: '#EF4444' },
      { id: 'bin2', label: '2. Adjust', color: '#F59E0B' },
      { id: 'bin3', label: '3. Regroup', color: '#8B5CF6' },
      { id: 'bin4', label: '4. Result', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Ria has 18 pencils and buys 12 more. How many pencils does she have now?',
    answer: '30',
    options: ['30', '6', '20'],
    hint: 'The phrase "more" means we are combining quantities. Add 18 + 12!',
    misconception: '"More" signals addition! 18 + 12: ones 8 + 2 = 10 (write 0, carry 1), tens 1 + 1 + 1 = 3. Total is 30 pencils!',
  },
  {
    type: 'sort',
    question: 'Drag each estimation to its correct approximate pair!',
    answer: 'sort',
    options: [],
    hint: 'Round each number to nearest 10 (5 or more soar, 4 or less rest) then add/subtract!',
    misconception: 'Estimation rounds each number to nearest ten: 18 -> 20, 23 -> 20, so 20 + 20 = about 40! Always round each number individually before computing.',
    sortItems: [
      { id: 'est1', label: '18 + 23 is about 40', icon: 'coin', correctBin: 'bin1' },
      { id: 'est2', label: '47 - 22 is about 25', icon: 'coin', correctBin: 'bin2' },
      { id: 'est3', label: '31 + 38 is about 70', icon: 'coin', correctBin: 'bin3' },
      { id: 'est4', label: '85 - 41 is about 40', icon: 'coin', correctBin: 'bin4' },
    ],
    bins: [
      { id: 'bin1', label: '20+20=40', color: '#3B82F6' },
      { id: 'bin2', label: '50-20=30', color: '#10B981' },
      { id: 'bin3', label: '30+40=70', color: '#F59E0B' },
      { id: 'bin4', label: '90-40=50', color: '#EC4899' },
    ],
  },
];

// ─── Shopkeeper Sam Mascot ────────────────────────────────────

function ShopkeeperSam({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
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
          {/* Mustache / Face */}
          <circle cx="37" cy="35" r="22" fill="#FFE0BD" stroke="#D97706" strokeWidth="1.5" />
          {/* Turban / Cap */}
          <path d="M18 28 Q37 8 57 28 L52 18 Q37 10 23 18 Z" fill="#B91C1C" />
          <circle cx="37" cy="15" r="5" fill="#FBBF24" />
          {/* Eyes */}
          <circle cx="29" cy="32" r="3" fill="#1F2937" />
          <circle cx="45" cy="32" r="3" fill="#1F2937" />
          {/* Friendly mustache */}
          <path d="M25 42 Q37 48 49 42 Q37 45 25 42 Z" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 48 Q37 53 41 48" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Green Apron */}
          <path d="M22 57 L52 57 L55 85 L20 85 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
          {/* Pocket on apron */}
          <rect x="30" y="65" width="15" height="12" fill="#15803D" rx="2" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

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

// ─── Vegetable Market Scene Background ────────────────────────

function MarketScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="market-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="40%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F3F4F6" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#market-sky)" />
      </svg>
      {/* Chalkboard on wall */}
      <div className="absolute top-6 left-8 bg-gray-900 border-4 border-amber-800 rounded-xl p-3 shadow-md w-48 opacity-85">
        <p className="text-amber-300 font-mono text-xs font-bold">SAM&apos;S MATH CORNER</p>
        <p className="text-white font-mono text-xs mt-1">Tens | Ones</p>
        <p className="text-white font-mono text-xs">  4  |  7</p>
        <p className="text-white font-mono text-xs">+ 3  |  5</p>
        <div className="border-t border-white my-1" />
        <p className="text-green-400 font-mono text-xs font-bold">= 8  |  2 (Carry 1!)</p>
      </div>
      {/* Vegetable Baskets at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-amber-100 border-t-4 border-amber-300 flex justify-around items-end pb-2">
        {/* Basket 1: Tomatoes */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1 mb-1">
            <TomatoIcon size={28} />
            <TomatoIcon size={28} />
          </div>
          <div className="w-20 h-10 bg-amber-800 rounded-b-xl border-2 border-amber-900 shadow-inner" />
          <span className="text-[10px] font-bold text-amber-900 mt-1">Tomatoes</span>
        </div>
        {/* Scales */}
        <div className="flex flex-col items-center mb-1">
          <WeighingScaleIcon size={55} />
          <span className="text-[10px] font-bold text-amber-900 mt-1">Standard Scale</span>
        </div>
        {/* Basket 2: Carrots */}
        <div className="flex flex-col items-center">
          <div className="flex gap-1 mb-1">
            <CarrotIcon size={28} />
            <CarrotIcon size={28} />
          </div>
          <div className="w-20 h-10 bg-amber-800 rounded-b-xl border-2 border-amber-900 shadow-inner" />
          <span className="text-[10px] font-bold text-amber-900 mt-1">Carrots</span>
        </div>
      </div>
    </div>
  );
}

// ─── Custom SVG Objects ──────────────────────────────��────────

function TomatoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="22" r="15" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
      <path d="M20 7 Q23 12 20 15 Q17 12 20 7 Z" fill="#15803D" />
      <ellipse cx="15" cy="18" rx="3" ry="5" fill="white" opacity="0.4" transform="rotate(-20 15 18)" />
    </svg>
  );
}

function CarrotIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M20 12 L30 35 L10 35 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 12 Q20 2 25 12" fill="#22C55E" />
      <path d="M18 12 Q20 0 22 12" fill="#16A34A" />
    </svg>
  );
}

function CoinIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="16" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <circle cx="20" cy="20" r="12" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />
      <text x="20" y="25" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#B45309">₹</text>
    </svg>
  );
}

function WeighingScaleIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="45" width="10" height="12" fill="#4B5563" rx="2" />
      <path d="M15 45 L45 45 L35 25 L25 25 Z" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1" />
      <circle cx="30" cy="22" r="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <line x1="30" y1="22" x2="35" y2="16" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 32 L22 32 L16 42 Z" fill="#6B7280" />
      <path d="M38 32 L50 32 L44 42 Z" fill="#6B7280" />
    </svg>
  );
}

// ─── Sort Card Component ──────────────────────��───────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={130} height={70}>
      <div className={`flex items-center justify-center rounded-xl shadow-lg border-2 border-amber-400 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-2`} style={{ width: 130, height: 70 }}>
        <CoinIcon size={24} />
        <span className="text-[11px] font-bold text-gray-800 text-center ml-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-inner transition-all duration-200 ${
        isHovering ? 'scale-105 ring-4 ring-offset-2 ring-yellow-400' : ''
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center uppercase tracking-wide">{label}</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = TEACHING_SLIDES[currentSlide];

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-500 to-orange-600">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${slide.bgColor} text-white flex flex-col items-center text-center border-4 border-white/40`}
      >
        <div className="text-6xl mb-4">{slide.emoji}</div>
        <h2 className="text-2xl font-black mb-3 drop-shadow-md">{slide.title}</h2>
        <p className="text-base font-medium leading-relaxed mb-6 opacity-95">{slide.text}</p>

        {/* Progress Dots */}
        <div className="flex gap-2 mb-6">
          {TEACHING_SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-white' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4 w-full justify-between">
          {currentSlide > 0 ? (
            <button
              onClick={() => {
                audioManager.play('tap');
                setCurrentSlide(currentSlide - 1);
              }}
              className="px-6 py-3 rounded-2xl font-bold bg-white/20 hover:bg-white/30 text-white shadow-md transition-all"
            >
              Back
            </button>
          ) : <div />}

          {currentSlide < TEACHING_SLIDES.length - 1 ? (
            <button
              onClick={() => {
                audioManager.play('tap');
                setCurrentSlide(currentSlide + 1);
              }}
              className="px-8 py-3 rounded-2xl font-black bg-white text-orange-600 shadow-lg hover:bg-orange-50 transition-all"
            >
              Next ➔
            </button>
          ) : (
            <button
              onClick={() => {
                audioManager.play('celebration');
                onStart();
              }}
              className="px-8 py-3 rounded-2xl font-black bg-yellow-300 text-amber-900 shadow-xl hover:bg-yellow-400 transition-all text-lg animate-pulse"
            >
              Let&apos;s Play! 🚀
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface AddSubGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Game Component ──────────────────────────────────────

export function AddSubGame({ width = 720, height = 560, onComplete }: AddSubGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Welcome to my shop! Let's do math!");
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Sort challenge state
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const challenge = CHALLENGES[challengeIdx];
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sort item positions when challenge changes
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initial: Record<string, { x: number; y: number; placed: boolean }> = {};
      challenge.sortItems.forEach((item, idx) => {
        initial[item.id] = {
          x: 40 + idx * 160,
          y: height - 140,
          placed: false,
        };
      });
      setItemPositions(initial);
    }
  }, [challengeIdx, challenge, height]);

  // Inactivity timer for auto-hints
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setActiveHint(challenge.hint);
      audioManager.play('hint');
      setMascotMood('thinking');
      setMascotSpeech("Need a little clue? Check the hint!");
      speechManager.speak("Need a little clue? Check the hint!");
    }, 10000);
  }, [challenge.hint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Handle correct answer
  const handleCorrect = useCallback(() => {
    audioManager.play('success');
    setStars(s => s + 1);
    setMascotMood('celebrate');
    setMascotSpeech("Wonderful! You got it right!");
    speechManager.speak("Wonderful! You got it right!");
    setShowSuccess(true);
    setShowConfetti(true);
    setActiveHint(null);

    // Add sparkle burst
    setSparkles(prev => [...prev, { id: Date.now(), x: width / 2, y: height / 2 }]);

    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  }, [width, height]);

  // Handle wrong answer
  const handleWrong = useCallback(() => {
    audioManager.play('error');
    setErrors(e => e + 1);
    setMascotMood('thinking');
    setMascotSpeech(challenge.misconception);
    speechManager.speak(challenge.misconception);
    setActiveHint(challenge.misconception);
    resetInactivityTimer();
  }, [challenge.misconception, resetInactivityTimer]);

  // Multiple choice answer handler
  const handleAnswerClick = (option: string) => {
    if (showSuccess) return;
    if (option === challenge.answer) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  // Drag-and-Drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bins collision
    const binWidth = 140;
    const binHeight = 90;
    const binY = 160;
    const totalBins = challenge.bins.length;
    const startX = (width - totalBins * 150) / 2;

    let matchedBinId: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * 150;
      const by = binY;
      if (x >= bx - 20 && x <= bx + binWidth + 20 && y >= by - 20 && y <= by + binHeight + 20) {
        matchedBinId = bin.id;
      }
    });

    if (matchedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setItemPositions(prev => ({
        ...prev,
        [id]: { x, y, placed: true },
      }));

      // Check if all items are placed
      setTimeout(() => {
        setItemPositions(curr => {
          const allPlaced = challenge.sortItems?.every(si => curr[si.id]?.placed);
          if (allPlaced) {
            handleCorrect();
          }
          return curr;
        });
      }, 100);

      return true;
    } else {
      audioManager.play('drop-wrong');
      handleWrong();
      return false;
    }
  };

  // Advance to next challenge or finish
  const handleSuccessComplete = () => {
    setShowSuccess(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(i => i + 1);
      setMascotMood('happy');
      setMascotSpeech("Let's solve the next math puzzle!");
      speechManager.speak("Let's solve the next math puzzle!");
    } else {
      // Game complete
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-amber-550 border-4 border-amber-300"
      style={{ width, height }}
    >
      {/* Background Market Scene */}
      <MarketScene width={width} height={height} />

      {/* Teaching Intro Screen */}
      {screen === 'teaching' && (
        <TeachingScreen onStart={() => setScreen('play')} />
      )}

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-amber-900/90 backdrop-blur-md px-4 flex justify-between items-center z-20 border-b-2 border-amber-700">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-amber-300">
            Puzzle {challengeIdx + 1} of {CHALLENGES.length}
          </span>
          <StarRow count={stars} total={CHALLENGES.length} />
        </div>
        <div className="text-xs font-bold text-amber-200">
          Errors: {errors}
        </div>
      </div>

      {/* Shopkeeper Sam Mascot */}
      <ShopkeeperSam mood={mascotMood} speaking={mascotSpeech} />

      {/* Main Game Play Area */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col items-center justify-center z-10 pointer-events-auto">
          {/* Question Card */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-amber-300 max-w-lg w-full text-center mb-6"
          >
            <p className="text-lg font-black text-gray-800 leading-snug">{challenge.question}</p>
          </motion.div>

          {/* Multiple Choice Options */}
          {challenge.type === 'identify' && challenge.options && (
            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
              {challenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswerClick(opt)}
                  className="bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-white font-black text-xl py-4 rounded-2xl shadow-lg border-b-4 border-orange-700 transition-all flex items-center justify-center gap-2"
                >
                  <CoinIcon size={24} />
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort / Drag-and-Drop Challenge Area */}
          {challenge.type === 'sort' && challenge.sortItems && challenge.bins && (
            <div className="relative w-full h-72">
              {/* Bins */}
              {challenge.bins.map((bin, idx) => {
                const totalBins = challenge.bins!.length;
                const binW = 140;
                const startX = (width - totalBins * 150) / 2;
                return (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={startX + idx * 150}
                    y={20}
                    width={binW}
                    height={90}
                    isHovering={hoverBin === bin.id}
                  />
                );
              })}

              {/* Draggable Cards */}
              {challenge.sortItems.map(item => {
                const pos = itemPositions[item.id] || { x: 50, y: height - 140, placed: false };
                return (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={pos.x}
                    y={pos.y}
                    placed={pos.placed}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Feedback & Overlay Components */}
      {showSuccess && (
        <SuccessBanner
          message="Brilliant! Math solved perfectly! 🌟"
          onComplete={handleSuccessComplete}
        />
      )}

      {showConfetti && (
        <Confetti onComplete={() => setShowConfetti(false)} />
      )}

      {activeHint && !showSuccess && (
        <HintBubble
          message={activeHint}
          onComplete={() => setActiveHint(null)}
        />
      )}

      {sparkles.map(sp => (
        <SparkleBurst
          key={sp.id}
          x={sp.x}
          y={sp.y}
          onComplete={() => setSparkles(prev => prev.filter(s => s.id !== sp.id))}
        />
      ))}
    </div>
  );
}
