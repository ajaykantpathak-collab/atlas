'use client';

/**
 * AddSubGame — Learn Addition & Subtraction up to 3 Digits in Shopkeeper Shyam's Fruit Shop!
 *
 * CISCE Nodes: c3_math_006 (Addition and Subtraction up to 3 digits),
 *              c3_math_007 (Place value to add and subtract using standard algorithm),
 *              c3_math_008 (Problem solving involving addition and subtraction in real life contexts)
 * Enrichment: c3_maths_enrichment_part6, 7, 8
 *
 * ELI5: "Think of numbers as boxes of hundreds, tens, and ones! When ones overflow,
 *   we bundle them into a ten and carry it over! When our ones box is too empty to
 *   subtract, we borrow a ten from the neighbor! Always start from the ones place
 *   on the right and work your way left!"
 *
 * Misconceptions (from enrichment):
 *   1. "Start adding or subtracting from the hundreds column on the left" →
 *      "No! Always start from the ones place on the right because carries and borrows flow leftward!"
 *   2. "Carry over and borrow are the same thing" →
 *      "No! Carry over is when addition columns exceed 9 and extra moves left. Borrow is when subtraction top digit is small and we take 1 from the left!"
 *   3. "When a column sum is 13, I write 13 in that column" →
 *      "No! A single place value can only hold 0-9! Write the ones digit (3) and carry over the 1 ten!"
 *   4. "Whenever a story has two numbers, I should add them" →
 *      "No! Read the story for clues: 'altogether'/'total' means ADD, but 'left'/'difference' means SUBTRACT!"
 *   5. "I don't need to align place values carefully" →
 *      "No! Ones under ones, tens under tens, hundreds under hundreds — misalignment ruins the whole sum!"
 *
 * Story: "Help Shopkeeper Shyam sort fruit prices, calculate bills at the cash register,
 *   and solve market word problems with carrying and borrowing! Become a Master Accountant!"
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
    title: 'Welcome to Shyam\'s Fruit Shop! 🍎',
    text: 'Three-digit numbers have three place values — Hundreds (H), Tens (T), and Ones (O)! Every big calculation is organized in neat vertical columns!',
    emoji: '🏪',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Welcome to Shyams Fruit Shop! Three digit numbers have hundreds, tens, and ones. Every calculation is organized in neat vertical columns!',
  },
  {
    title: 'Always Start from the Right! ➡️',
    text: 'Always begin adding or subtracting from the ones column on the right, then move left to tens and hundreds! Carries and borrows flow leftward!',
    emoji: '👉',
    bgColor: 'from-orange-400 to-red-500',
    spoken: 'Always begin adding or subtracting from the ones column on the right, then move left to tens and hundreds! Carries and borrows flow leftward!',
  },
  {
    title: 'Carrying Over in Addition ➕',
    text: 'When digits in a column add up to 10 or more, we write the ones digit and carry over 1 to the next column! For example, 6 + 7 = 13 (write 3, carry 1)!',
    emoji: '📈',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'When digits in a column add up to 10 or more, we write the ones digit and carry over 1 to the next column! For example, 6 plus 7 is 13, write 3 carry 1!',
  },
  {
    title: 'Borrowing in Subtraction ➖',
    text: 'When the top digit is smaller than the bottom digit, we borrow 1 ten or 1 hundred from the neighbor on the left, turning it into 10 extra units!',
    emoji: '🔄',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'When the top digit is smaller than the bottom digit, we borrow 1 ten or 1 hundred from the neighbor on the left, turning it into 10 extra units!',
  },
  {
    title: 'Solving Real Life Word Problems 🛒',
    text: 'Read stories carefully! "Altogether" or "total" means ADD. "Left", "remaining", or "difference" means SUBTRACT! Always write your final unit!',
    emoji: '💡',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'Read stories carefully! Altogether or total means add. Left, remaining, or difference means subtract! Always write your final unit!',
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

// ─── Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Shopkeeper Shyam adds 245 + 132 for a fruit basket. What is the sum?',
    answer: '377',
    options: ['377', '3770', '37', '277'],
    hint: 'Add column by column from right to left: Ones 5+2=7, Tens 4+3=7, Hundreds 2+1=3!',
    misconception: 'Always add column by column from right to left! Ones: 5+2=7, Tens: 4+3=7, Hundreds: 2+1=3, giving 377. Never start from the left!',
  },
  {
    type: 'identify',
    question: 'Shyam subtracts 567 - 234 from his daily earnings. What is the difference?',
    answer: '333',
    options: ['333', '3333', '799', '233'],
    hint: 'Subtract column by column from right to left: Ones 7-4=3, Tens 6-3=3, Hundreds 5-2=3!',
    misconception: 'Subtract from right to left: Ones 7-4=3, Tens 6-3=3, Hundreds 5-2=3, giving 333! No borrowing needed here.',
  },
  {
    type: 'sort',
    question: 'Drag the steps for adding 356 + 247 into the correct order!',
    answer: 'sort',
    options: [],
    hint: 'Start from ones (6+7=13), then tens (5+4+1=10), then hundreds (3+2+1=6)!',
    misconception: 'Always start from the ones column! When sum is 13, write 3 and carry 1 to tens. Then add tens plus carry (5+4+1=10), write 0 carry 1!',
    sortItems: [
      { id: 'step-1', label: '1. Ones: 6+7=13 (write 3, carry 1)', icon: 'carry', correctBin: 'bin-1' },
      { id: 'step-2', label: '2. Tens: 5+4+1=10 (write 0, carry 1)', icon: 'carry', correctBin: 'bin-2' },
      { id: 'step-3', label: '3. Hundreds: 3+2+1=6', icon: 'placevalue', correctBin: 'bin-3' },
      { id: 'step-4', label: '4. Final Sum: 603', icon: 'receipt', correctBin: 'bin-4' },
    ],
    bins: [
      { id: 'bin-1', label: 'Step 1: Ones', color: '#3B82F6' },
      { id: 'bin-2', label: 'Step 2: Tens', color: '#10B981' },
      { id: 'bin-3', label: 'Step 3: Hundreds', color: '#F59E0B' },
      { id: 'bin-4', label: 'Step 4: Result', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'Apples cost Rs 120 and mangoes cost Rs 85. How much altogether?',
    answer: 'Rs 205',
    options: ['Rs 205', 'Rs 35', 'Rs 12085', 'Rs 195'],
    hint: '"Altogether" means addition! Add 120 + 85. Ones: 0+5=5, Tens: 2+8=10 (write 0 carry 1), Hundreds: 1+1=2!',
    misconception: '"Altogether" is a clue word for ADDITION! You must add 120 + 85 to get Rs 205. Do not subtract or combine digits blindly!',
  },
  {
    type: 'sort',
    question: 'Drag the steps for subtracting 528 - 193 into the correct order!',
    answer: 'sort',
    options: [],
    hint: 'Start from ones (8-3=5), then tens (2-9 requires borrowing!), then hundreds (4-1)!',
    misconception: 'In tens place, 2 - 9 needs a borrow from hundreds! The 5 hundreds become 4, and 2 tens become 12 tens. 12-9=3!',
    sortItems: [
      { id: 'sub-1', label: '1. Ones: 8 - 3 = 5', icon: 'minus', correctBin: 'bin-s1' },
      { id: 'sub-2', label: '2. Tens: Borrow 1H, 12 - 9 = 3', icon: 'borrow', correctBin: 'bin-s2' },
      { id: 'sub-3', label: '3. Hundreds: 4 - 1 = 3', icon: 'placevalue', correctBin: 'bin-s3' },
      { id: 'sub-4', label: '4. Final Difference: 335', icon: 'receipt', correctBin: 'bin-s4' },
    ],
    bins: [
      { id: 'bin-s1', label: 'Step 1: Ones', color: '#3B82F6' },
      { id: 'bin-s2', label: 'Step 2: Tens', color: '#10B981' },
      { id: 'bin-s3', label: 'Step 3: Hundreds', color: '#F59E0B' },
      { id: 'bin-s4', label: 'Step 4: Result', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'You have Rs 500. You buy a toy for Rs 275. How much money is left?',
    answer: 'Rs 225',
    options: ['Rs 225', 'Rs 775', 'Rs 500', 'Rs 325'],
    hint: '"Left" means subtraction! 500 - 275 with borrowing across zeros (500 becomes 4 hundreds, 9 tens, 10 ones)!',
    misconception: '"Left" means SUBTRACT! 500 - 275 requires borrowing across zeros: 500 becomes 4, 9, 10. 10-5=5, 9-7=2, 4-2=2 -> Rs 225!',
  },
  {
    type: 'sort',
    question: 'Drag each word problem to its correct operation: Addition or Subtraction!',
    answer: 'sort',
    options: [],
    hint: '"Total" and "altogether" = Addition! "Left" and "how much more" = Subtraction!',
    misconception: 'Always read clue words! Total/altogether signal addition (+) because quantities join. Left/difference signal subtraction (-) because items are taken away!',
    sortItems: [
      { id: 'p1', label: 'Total cost of 2 items', icon: 'plus', correctBin: 'add-bin' },
      { id: 'p2', label: 'Total students in 2 classes', icon: 'plus', correctBin: 'add-bin' },
      { id: 'p3', label: 'Money left after buying', icon: 'minus', correctBin: 'sub-bin' },
      { id: 'p4', label: 'Difference between 2 numbers', icon: 'minus', correctBin: 'sub-bin' },
    ],
    bins: [
      { id: 'add-bin', label: 'Addition (+) ➕', color: '#22C55E' },
      { id: 'sub-bin', label: 'Subtraction (-) ➖', color: '#EF4444' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each calculation to the correct math operation box!',
    answer: 'sort',
    options: [],
    hint: 'Check the signs and wording! Plus (+) for sums, Minus (-) for differences!',
    misconception: 'Double-check your calculations! Rs 150 + Rs 200 = Rs 350 (addition). Rs 400 - Rs 150 = Rs 250 (subtraction). Match the signs carefully!',
    sortItems: [
      { id: 'c1', label: 'Rs 150 + Rs 200 = Rs 350', icon: 'plus', correctBin: 'bin-add' },
      { id: 'c2', label: 'Rs 400 - Rs 150 = Rs 250', icon: 'minus', correctBin: 'bin-sub' },
      { id: 'c3', label: '345 + 123 = 468', icon: 'plus', correctBin: 'bin-add' },
      { id: 'c4', label: '999 - 456 = 543', icon: 'minus', correctBin: 'bin-sub' },
    ],
    bins: [
      { id: 'bin-add', label: 'Addition Sums ➕', color: '#22C55E' },
      { id: 'bin-sub', label: 'Subtraction Diffs ➖', color: '#EF4444' },
    ],
  },
];

// ─── Shopkeeper Shyam Mascot (Custom SVG) ─────────────────────

function ShyamMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400"
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
          <defs>
            <linearGradient id="shyam-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="shyam-apron" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
          </defs>
          {/* Shopkeeper Cap */}
          <ellipse cx="37" cy="18" rx="20" ry="8" fill="#DC2626" />
          <path d="M22 18 Q37 8 52 18 Z" fill="#B91C1C" />
          <rect x="25" y="15" width="24" height="4" fill="#FBBF24" rx="1" />
          {/* Head */}
          <circle cx="37" cy="35" r="16" fill="url(#shyam-face)" stroke="#CA8A04" strokeWidth="1" />
          {/* Mustache */}
          <path d="M30 42 Q37 46 44 42 Q37 40 30 42 Z" fill="#78350F" />
          {/* Eyes */}
          <circle cx="31" cy="32" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="32" r="2.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M32 38 Q37 42 42 38" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Apron Body */}
          <path d="M22 50 L52 50 L56 82 L18 82 Z" fill="url(#shyam-apron)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Pocket with pencil */}
          <rect x="30" y="60" width="14" height="14" fill="white" stroke="#EAB308" strokeWidth="1" rx="1" />
          <line x1="37" y1="56" x2="37" y2="64" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ─────────────────────────────────────────────────

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

// ─── Fruit Shop Scene Background ──────────────────────────────

function FruitShopScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="shop-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="40%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="shop-counter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#shop-sky)" />
        {/* Awining stripes */}
        <path d="M0 0 L40 0 L20 40 L0 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M40 0 L80 0 L60 40 L20 40 Z" fill="white" opacity="0.9" />
        <path d="M80 0 L120 0 L100 40 L60 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M120 0 L160 0 L140 40 L100 40 Z" fill="white" opacity="0.9" />
        <path d="M160 0 L200 0 L180 40 L140 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M200 0 L240 0 L220 40 L180 40 Z" fill="white" opacity="0.9" />
        <path d="M240 0 L280 0 L260 40 L220 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M280 0 L320 0 L300 40 L260 40 Z" fill="white" opacity="0.9" />
        <path d="M320 0 L360 0 L340 40 L300 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M360 0 L400 0 L380 40 L340 40 Z" fill="white" opacity="0.9" />
        <path d="M400 0 L440 0 L420 40 L380 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M440 0 L480 0 L460 40 L420 40 Z" fill="white" opacity="0.9" />
        <path d="M480 0 L520 0 L500 40 L460 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M520 0 L560 0 L540 40 L500 40 Z" fill="white" opacity="0.9" />
        <path d="M560 0 L600 0 L580 40 L540 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M600 0 L640 0 L620 40 L580 40 Z" fill="white" opacity="0.9" />
        <path d="M640 0 L680 0 L660 40 L620 40 Z" fill="#EF4444" opacity="0.9" />
        <path d="M680 0 L720 0 L700 40 L660 40 Z" fill="white" opacity="0.9" />

        {/* Shop Counter */}
        <rect x="0" y={height - 70} width={width} height={70} fill="url(#shop-counter)" />
        <rect x="0" y={height - 70} width={width} height={8} fill="#B45309" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Icons for Interactive Objects ─────────────────

function AppleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 12 C18 5, 8 15, 12 25 C15 35, 22 42, 25 45 C28 42, 35 35, 38 25 C42 15, 32 5, 25 12 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
      <path d="M25 12 Q27 4, 32 6" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="29" cy="8" rx="4" ry="2" fill="#22C55E" transform="rotate(-30 29 8)" />
    </svg>
  );
}

function BananaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 35 Q25 42, 40 25 Q30 32, 15 28 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M8 36 L12 33" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MangoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 10 C38 10, 42 28, 35 38 C28 45, 18 40, 15 30 C12 20, 15 10, 25 10 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="3" fill="#FB923C" opacity="0.6" />
      <path d="M25 10 Q27 4, 30 6" stroke="#78350F" strokeWidth="2" fill="none" />
    </svg>
  );
}

function CoinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
      <circle cx="25" cy="25" r="13" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
      <text x="25" y="31" fontSize="16" fontWeight="bold" fill="#78350F" textAnchor="middle">₹</text>
    </svg>
  );
}

function NoteIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="12" width="38" height="26" fill="#86EFAC" stroke="#15803D" strokeWidth="1.5" rx="3" />
      <circle cx="25" cy="25" r="7" fill="none" stroke="#15803D" strokeWidth="1" />
      <text x="25" y="29" fontSize="12" fontWeight="bold" fill="#15803D" textAnchor="middle">100</text>
    </svg>
  );
}

function CashRegisterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="20" width="30" height="22" fill="#475569" stroke="#1E293B" strokeWidth="1.5" rx="2" />
      <rect x="14" y="10" width="22" height="12" fill="#334155" stroke="#1E293B" strokeWidth="1" rx="1" />
      <rect x="16" y="12" width="18" height="8" fill="#38BDF8" rx="1" />
      <rect x="14" y="28" width="22" height="10" fill="#CBD5E1" rx="1" />
    </svg>
  );
}

function PlusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <path d="M25 15 L25 35 M15 25 L35 25" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <path d="M15 25 L35 25" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function PlaceValueChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="white" stroke="#3B82F6" strokeWidth="2" rx="3" />
      <line x1="18" y1="5" x2="18" y2="45" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="32" y1="5" x2="32" y2="45" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="5" y1="18" x2="45" y2="18" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="11.5" y="14" fontSize="10" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">H</text>
      <text x="25" y="14" fontSize="10" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">T</text>
      <text x="38.5" y="14" fontSize="10" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">O</text>
    </svg>
  );
}

function CarryIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M15 30 Q25 10, 35 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M30 24 L35 30 L29 32" fill="white" />
      <text x="25" y="24" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">+1</text>
    </svg>
  );
}

function BorrowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <path d="M35 30 Q25 10, 15 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M20 24 L15 30 L21 32" fill="white" />
      <text x="25" y="24" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">-1</text>
    </svg>
  );
}

function ShoppingBagIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M12 18 L38 18 L36 42 L14 42 Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="1.5" rx="2" />
      <path d="M18 18 Q25 8, 32 18" stroke="#9F1239" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

function ReceiptIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M12 6 L38 6 L38 42 L35 44 L32 42 L29 44 L26 42 L23 44 L20 42 L17 44 L14 42 L12 44 Z" fill="white" stroke="#64748B" strokeWidth="1.5" />
      <line x1="17" y1="14" x2="33" y2="14" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="22" x2="30" y2="22" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="17" y1="28" x2="27" y2="28" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="17" y1="36" x2="33" y2="36" stroke="#334155" strokeWidth="2" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'carry': return <CarryIcon size={size} />;
    case 'borrow': return <BorrowIcon size={size} />;
    case 'placevalue': return <PlaceValueChartIcon size={size} />;
    case 'receipt': return <ReceiptIcon size={size} />;
    case 'plus': return <PlusIcon size={size} />;
    case 'minus': return <MinusIcon size={size} />;
    case 'apple': return <AppleIcon size={size} />;
    case 'banana': return <BananaIcon size={size} />;
    default: return <AppleIcon size={size} />;
  }
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`} style={{ width: 120, height: 90 }}>
        {renderSortIcon(icon, 36)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center px-2 py-1 bg-white/80 rounded-lg shadow-sm">{label}</span>
    </div>
  );
}

// ─── Main Component Props & Export ────────────────────────────

export interface AddSubGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AddSubGame({ width = 720, height = 560, onComplete }: AddSubGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintMsg, setHintMsg] = useState('');
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Drag and drop state for sort challenges
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current challenge
  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio handlers
  const speakText = useCallback((text: string) => {
    setSpeakingText(text);
    speechManager.speak(text);
  }, []);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Teaching slide narration
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speakText(slide.spoken);
    }
  }, [screen, slideIdx, speakText]);

  // Challenge narration
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      if (currentChallenge.type === 'identify') {
        speakText(currentChallenge.question);
      } else {
        speakText(currentChallenge.question);
      }
      // Reset inactivity timer
      resetInactivityTimer();
    }
  }, [challengeIdx, screen, currentChallenge, speakText]);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setHintMsg(currentChallenge.hint);
        setShowHint(true);
        setMascotMood('thinking');
        speakText(currentChallenge.hint);
      }
    }, 10000);
  };

  // Multiple choice answer handler
  const handleAnswerSelect = (option: string) => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setStars(prev => prev + 1);
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Wonderful! Correct answer! 🌟');
      setShowSuccessBanner(true);
      speakText('Wonderful! That is correct!');

      setTimeout(() => {
        advanceChallenge();
      }, 1500);
    } else {
      // Wrong!
      audioManager.play('error');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setShowHint(true);
      speakText(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check bins collision
    let droppedInBin: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      // Approximate bin bounding boxes on screen
      const binX = 50 + idx * 160;
      const binY = 320;
      const binW = 140;
      const binH = 110;
      if (x >= binX && x <= binX + binW && y >= binY && y <= binY + binH) {
        droppedInBin = bin.id;
      }
    });

    setHoverBin(null);

    if (droppedInBin && droppedInBin === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      // Check if all items in this challenge are placed
      const allDone = currentChallenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        audioManager.play('celebration');
        setMascotMood('celebrate');
        setStars(prev => prev + 1);
        setSparklePos({ x: width / 2, y: height / 2 });
        setShowConfetti(true);
        setSuccessMsg('Amazing sorting! All correct! 🌟');
        setShowSuccessBanner(true);
        speakText('Amazing sorting! All correct!');

        setTimeout(() => {
          setPlacedItems({});
          advanceChallenge();
        }, 1800);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setShowHint(true);
      speakText(currentChallenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    setShowSuccessBanner(false);
    setShowConfetti(false);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game Complete!
      audioManager.play('celebration');
      setShowConfetti(true);
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      setScreen('play');
      audioManager.play('whoosh');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  const handleHintClose = () => {
    setShowHint(false);
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans"
      style={{ width, height, background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)' }}
    >
      {/* Background Fruit Shop Scene */}
      <FruitShopScene width={width} height={height} />

      {/* Mascot */}
      <ShyamMascot mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="absolute top-3 left-4 right-20 z-20 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-amber-300">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏪</span>
          <h1 className="text-base font-black text-amber-900 tracking-wide">Shyam&apos;s Math Shop</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-xl border border-amber-300">
            <span className="text-xs font-bold text-amber-800">Stars:</span>
            <StarRow count={stars} total={CHALLENGES.length} />
          </div>
          {screen === 'play' && (
            <span className="text-xs font-black text-amber-700 bg-amber-50 px-2 py-1 rounded-lg">
              Q {challengeIdx + 1}/{CHALLENGES.length}
            </span>
          )}
        </div>
      </div>

      {/* ─── SCREEN 1: TEACHING ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-4 px-6 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-amber-300 flex flex-col items-center text-center mt-2">
            <motion.div
              key={slideIdx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4 text-white`}>
                {TEACHING_SLIDES[slideIdx].emoji}
              </div>
              <h2 className="text-xl font-black text-amber-900 mb-2">{TEACHING_SLIDES[slideIdx].title}</h2>
              <p className="text-sm font-semibold text-gray-700 leading-relaxed max-w-md">{TEACHING_SLIDES[slideIdx].text}</p>
            </motion.div>

            {/* Slide Dots */}
            <div className="flex gap-2 mt-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-amber-500' : 'w-2.5 bg-amber-200'}`}
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between w-full max-w-xl pb-2">
            <button
              onClick={handlePrevSlide}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold shadow-lg transition-all ${
                slideIdx === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-amber-800 hover:bg-amber-50 border-2 border-amber-300'
              }`}
            >
              ⬅️ Back
            </button>
            <button
              onClick={handleNextSlide}
              className="px-6 py-2.5 rounded-2xl font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all border-2 border-amber-300"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY ──────────────────────────────────── */}
      {screen === 'play' && currentChallenge && (
        <div className="absolute inset-0 pt-20 pb-4 px-6 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-4 border-amber-300 flex flex-col items-center mt-2">
            {/* Question Box */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-4 py-3 w-full text-center shadow-inner mb-4">
              <p className="text-base font-black text-amber-900 leading-snug">{currentChallenge.question}</p>
            </div>

            {/* Challenge Type: Identify (Multiple Choice) */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {currentChallenge.options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswerSelect(option)}
                    className="py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black rounded-2xl shadow-md border-2 border-amber-500 hover:from-amber-500 hover:to-orange-500 text-base transition-all"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Challenge Type: Sort (Drag and Drop) */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="relative w-full h-[230px] bg-amber-50/70 rounded-2xl border-2 border-amber-200 flex flex-col items-center">
                {/* Bins */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4">
                  {currentChallenge.bins.map((bin, idx) => (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={20 + idx * 165}
                      y={105}
                      width={150}
                      height={100}
                      isHovering={hoverBin === bin.id}
                    />
                  ))}
                </div>

                {/* Draggable Items */}
                <div className="absolute top-3 left-0 right-0 flex justify-around px-4">
                  {currentChallenge.sortItems.map((item, idx) => {
                    const placed = placedItems[item.id] || false;
                    const startX = 20 + idx * 165;
                    const startY = 10;
                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={startX}
                        y={startY}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Hint Bar */}
          <div className="w-full max-w-xl flex justify-between items-center px-2 pb-1">
            <button
              onClick={() => {
                audioManager.play('hint');
                setHintMsg(currentChallenge.hint);
                setShowHint(true);
                speakText(currentChallenge.hint);
              }}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-200 text-amber-900 rounded-2xl font-bold text-xs shadow-md border-2 border-amber-400 hover:bg-amber-300 transition-all"
            >
              💡 Need a Hint?
            </button>
            <span className="text-xs font-bold text-amber-800 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200">
              Score: {Math.max(0, 100 - errors * 5)} pts
            </span>
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ──────────────────────────────── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showSuccessBanner && <SuccessBanner message={successMsg} onComplete={() => setShowSuccessBanner(false)} />}
      {showHint && <HintBubble message={hintMsg} onComplete={handleHintClose} />}
    </div>
  );
}
