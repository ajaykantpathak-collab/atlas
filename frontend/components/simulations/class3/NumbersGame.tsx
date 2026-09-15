'use client';

/**
 * NumbersGame — Learn 4-digit numbers, place value, expanded form, counting, comparison, and greatest/smallest digits!
 *
 * CISCE Nodes: c3_math_001 (4 digit numbers up to 9999), c3_math_002 (Place value and expanded form),
 *              c3_math_003 (Count numbers in different ways), c3_math_004 (Comparison and ascending/descending order),
 *              c3_math_005 (Greatest and smallest numbers from given digits)
 *
 * ELI5: "Numbers have a home! Thousands, Hundreds, Tens, and Ones boxes hold our digits.
 *   Expanded form is opening the number up to see what each digit is worth.
 *   We can compare numbers, count in jumps, and build the biggest or smallest number!"
 *
 * Misconceptions Addressed:
 *   1. "The place value of 5 in 5432 is 5" → "No! 5 is in the thousands place, so its place value is 5000!"
 *   2. "Expanded form of 3427 is 3 + 4 + 2 + 7" → "No! Expanded form uses place values: 3000 + 400 + 20 + 7!"
 *   3. "Ascending order means largest to smallest" → "No! Ascending means climbing up — smallest to largest!"
 *   4. "To make the greatest number, put the smallest digit first" → "No! Put the LARGEST digit in the highest place!"
 *   5. "0 can be the first digit of a 4-digit number" → "No! 0045 is just 45 — 0 cannot lead a 4-digit number!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'Meet 4-Digit Numbers! 🔢',
    text: 'Numbers up to 9,999 have four places: Thousands, Hundreds, Tens, and Ones! In 4,527, we read four thousand five hundred twenty-seven!',
    emoji: '🏛️',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'Numbers up to 9,999 have four places: Thousands, Hundreds, Tens, and Ones! In 4,527, we read four thousand five hundred twenty-seven!',
  },
  {
    title: 'Place Value & Expanded Form 🧱',
    text: 'Every digit has a place value! In 3,456, 3 is 3000, 4 is 400, 5 is 50, and 6 is 6. Expanded form adds them up: 3000 + 400 + 50 + 6!',
    emoji: '📦',
    bgColor: 'from-indigo-500 to-purple-600',
    spoken: 'Every digit has a place value! In 3,456, 3 is 3000, 4 is 400, 5 is 50, and 6 is 6. Expanded form adds them up: 3000 + 400 + 50 + 6!',
  },
  {
    title: 'Skip Counting in Different Ways! 🏃',
    text: 'We can count forward or backward starting from any number! Counting by 10s from 2350 gives 2350, 2360, 2370 — only the tens digit changes!',
    emoji: '👟',
    bgColor: 'from-purple-500 to-pink-600',
    spoken: 'We can count forward or backward starting from any number! Counting by 10s from 2350 gives 2350, 2360, 2370 — only the tens digit changes!',
  },
  {
    title: 'Comparing & Ordering Numbers ⚖️',
    text: 'Compare numbers from left to right! 3,456 is less than 3,462 because 5 tens is less than 6 tens. Ascending goes small to big; descending goes big to small!',
    emoji: '📊',
    bgColor: 'from-teal-550 to-emerald-600',
    spoken: 'Compare numbers from left to right! 3,456 is less than 3,462 because 5 tens is less than 6 tens. Ascending goes small to big; descending goes big to small!',
  },
  {
    title: 'Greatest & Smallest Digits 👑',
    text: 'To make the greatest number, put the largest digit first! To make the smallest, put the smallest non-zero digit first — remember, 0 can never lead!',
    emoji: '💎',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'To make the greatest number, put the largest digit first! To make the smallest, put the smallest non-zero digit first — remember, 0 can never lead!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_place' | 'identify_expanded' | 'sort_place' | 'identify_greatest' | 'sort_ascending' | 'sort_descending' | 'identify_digits' | 'sort_expanded_form';

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

// ─── Challenges (8 progressive: easy → hard) ──────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_place',
    question: 'What is the place value of the digit 5 in the number 5,432?',
    answer: '5,000',
    options: ['5', '50', '500', '5,000'],
    hint: 'Look at where 5 sits: Thousands, Hundreds, Tens, or Ones? It is in the thousands place!',
    misconception: 'The place value of 5 in 5432 is 5000, NOT 5! Face value is 5, but its position in the thousands place makes it 5 x 1000 = 5000!',
  },
  {
    type: 'identify_expanded',
    question: 'How do you write 3,000 + 400 + 20 + 7 in standard form?',
    answer: '3,427',
    options: ['342', '3,427', '34,270', '7,243'],
    hint: 'Combine the thousands, hundreds, tens, and ones together: 3 thousands, 4 hundreds, 2 tens, 7 ones!',
    misconception: 'Combining 3000 + 400 + 20 + 7 gives 3,427! Do not add face values (3+4+2+7 = 18) — you are adding place value blocks!',
  },
  {
    type: 'sort_place',
    question: 'Drag each digit of 4,567 to its correct place value box!',
    answer: 'sort',
    options: [],
    hint: '4 is in thousands (4000), 5 in hundreds (500), 6 in tens (60), 7 in ones (7)!',
    misconception: 'Each place has a fixed value! Thousands is 1000, hundreds is 100, tens is 10, ones is 1. Match each digit to its correct home!',
    sortItems: [
      { id: 'digit-4', label: '4 (Thousands)', icon: 'thousands-block', correctBin: 'th-bin' },
      { id: 'digit-5', label: '5 (Hundreds)', icon: 'hundreds-block', correctBin: 'h-bin' },
      { id: 'digit-6', label: '6 (Tens)', icon: 'tens-block', correctBin: 't-bin' },
      { id: 'digit-7', label: '7 (Ones)', icon: 'ones-block', correctBin: 'o-bin' },
    ],
    bins: [
      { id: 'th-bin', label: '4,000', color: '#3B82F6' },
      { id: 'h-bin', label: '500', color: '#8B5CF6' },
      { id: 't-bin', label: '60', color: '#EC4899' },
      { id: 'o-bin', label: '7', color: '#10B981' },
    ],
  },
  {
    type: 'identify_greatest',
    question: 'Which of these numbers is the GREATEST?',
    answer: '8,765',
    options: ['8,567', '8,756', '8,765', '8,675'],
    hint: 'Compare thousands first (all 8), then hundreds (7 vs 5), then tens (6 vs 5)!',
    misconception: '8,765 is greater than 8,756 because in the tens place, 6 tens is greater than 5 tens! Always compare from left to right!',
  },
  {
    type: 'sort_ascending',
    question: 'Drag these numbers into ASCENDING order (smallest to largest)!',
    answer: 'sort',
    options: [],
    hint: 'Ascending means climbing stairs — start with the smallest thousands digit!',
    misconception: 'Ascending order goes from smallest to largest! Check the thousands digits first (1, 2, 2, 3), then break ties using hundreds!',
    sortItems: [
      { id: 'num-1234', label: '1,234', icon: 'number-line', correctBin: 'pos-1' },
      { id: 'num-2345', label: '2,345', icon: 'number-line', correctBin: 'pos-2' },
      { id: 'num-2567', label: '2,567', icon: 'number-line', correctBin: 'pos-3' },
      { id: 'num-3456', label: '3,456', icon: 'number-line', correctBin: 'pos-4' },
    ],
    bins: [
      { id: 'pos-1', label: '1st (Smallest)', color: '#3B82F6' },
      { id: 'pos-2', label: '2nd', color: '#6366F1' },
      { id: 'pos-3', label: '3rd', color: '#8B5CF6' },
      { id: 'pos-4', label: '4th (Largest)', color: '#EC4899' },
    ],
  },
  {
    type: 'sort_descending',
    question: 'Drag these numbers into DESCENDING order (largest to smallest)!',
    answer: 'sort',
    options: [],
    hint: 'Descending means coming down stairs — start with the largest thousands digit!',
    misconception: 'Descending order goes from largest to smallest! 9,876 is largest because its thousands digit is 9!',
    sortItems: [
      { id: 'num-9876', label: '9,876', icon: 'descending', correctBin: 'd-1' },
      { id: 'num-7890', label: '7,890', icon: 'descending', correctBin: 'd-2' },
      { id: 'num-5678', label: '5,678', icon: 'descending', correctBin: 'd-3' },
      { id: 'num-1234', label: '1,234', icon: 'descending', correctBin: 'd-4' },
    ],
    bins: [
      { id: 'd-1', label: '1st (Largest)', color: '#EF4444' },
      { id: 'd-2', label: '2nd', color: '#F97316' },
      { id: 'd-3', label: '3rd', color: '#F59E0B' },
      { id: 'd-4', label: '4th (Smallest)', color: '#10B981' },
    ],
  },
  {
    type: 'identify_digits',
    question: 'What is the GREATEST 4-digit number you can make using digits 3, 7, 1, 9 (no repeats)?',
    answer: '9,731',
    options: ['1,379', '9,713', '9,731', '3,791'],
    hint: 'To make the greatest number, put the largest digit in the thousands place and sort descending!',
    misconception: 'The greatest number from 3, 7, 1, 9 is 9,731! Put 9 in thousands, 7 in hundreds, 3 in tens, and 1 in ones. Largest digit goes first!',
  },
  {
    type: 'sort_expanded_form',
    question: 'Match each 4-digit number to its correct expanded form!',
    answer: 'sort',
    options: [],
    hint: 'Break each number into thousands + hundreds + tens + ones!',
    misconception: 'Expanded form shows the exact value of each place! 2,081 is 2000 + 0 + 80 + 1 (the hundreds place has 0, so it contributes 0)!',
    sortItems: [
      { id: 'exp-3456', label: '3,456', icon: 'calculator', correctBin: 'bin-3456' },
      { id: 'exp-2081', label: '2,081', icon: 'calculator', correctBin: 'bin-2081' },
      { id: 'exp-7604', label: '7,604', icon: 'calculator', correctBin: 'bin-7604' },
    ],
    bins: [
      { id: 'bin-3456', label: '3000+400+50+6', color: '#3B82F6' },
      { id: 'bin-2081', label: '2000+0+80+1', color: '#8B5CF6' },
      { id: 'bin-7604', label: '7000+600+0+4', color: '#EC4899' },
    ],
  },
];

// ─── Number Wizard Nikhil Mascot ──────────────────────────────

function NumberWizardNikhil({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white border-2 border-indigo-400 rounded-xl px-3 py-2 shadow-lg max-w-[220px] pointer-events-auto"
          >
            <p className="text-xs font-bold text-indigo-900">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
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
            <linearGradient id="wizard-robe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="wizard-hat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
          {/* Hat */}
          <polygon points="37,2 15,28 60,28" fill="url(#wizard-hat)" stroke="#5B21B6" strokeWidth="1.5" />
          <ellipse cx="37" cy="28" rx="26" ry="5" fill="#7C3AED" stroke="#5B21B6" strokeWidth="1.5" />
          {/* Star on hat */}
          <path d="M37 10 L39 15 L44 15 L40 18 L42 23 L37 20 L32 23 L34 18 L30 15 L35 15 Z" fill="#FBBF24" transform="scale(0.6) translate(22, 5)" />
          {/* Head/Face */}
          <circle cx="37" cy="42" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Beard */}
          <path d="M25 46 Q37 62 49 46 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="40" r="2" fill="#1F2937" />
          <circle cx="42" cy="40" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M34 45 Q37 48 40 45" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Robe */}
          <path d="M22 55 L52 55 L58 85 L16 85 Z" fill="url(#wizard-robe)" stroke="#312E81" strokeWidth="1.5" />
          {/* Magic Wand */}
          <line x1="55" y1="50" x2="70" y2="35" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="33" r="5" fill="#F59E0B" />
          <path d="M70 25 L72 31 L78 33 L72 35 L70 41 L68 35 L62 33 L68 31 Z" fill="#FDE047" transform="scale(0.5) translate(80, 45)" />
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

// ─── Math Kingdom Scene Background ────────────────────────────

function MathSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="math-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="math-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width={width} height={height} fill="url(#math-sky)" />
        {/* Floating Numbers in Sky */}
        <text x="60" y="70" fill="rgba(255,255,255,0.15)" fontSize="28" fontWeight="bold" fontFamily="sans-serif">9999</text>
        <text x="220" y="50" fill="rgba(255,255,255,0.12)" fontSize="24" fontWeight="bold" fontFamily="sans-serif">1000</text>
        <text x="400" y="80" fill="rgba(255,255,255,0.15)" fontSize="32" fontWeight="bold" fontFamily="sans-serif">+</text>
        <text x="560" y="60" fill="rgba(255,255,255,0.12)" fontSize="26" fontWeight="bold" fontFamily="sans-serif">×</text>
        <text x="640" y="90" fill="rgba(255,255,255,0.15)" fontSize="22" fontWeight="bold" fontFamily="sans-serif">4527</text>

        {/* Ground */}
        <rect x="0" y={height - 90} width={width} height="90" fill="url(#math-ground)" />
        {/* Number line pattern on ground */}
        <line x1="0" y1={height - 50} x2={width} y2={height - 50} stroke="#34D399" strokeWidth="3" strokeDasharray="10 10" opacity="0.6" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Icons for Topic Objects ───────────────────────

function ThousandsBlockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="4" />
      <text x="25" y="31" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">1000</text>
    </svg>
  );
}

function HundredsBlockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" rx="4" />
      <text x="25" y="31" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">100</text>
    </svg>
  );
}

function TensBlockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="#EC4899" stroke="#BE185D" strokeWidth="2" rx="4" />
      <text x="25" y="31" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">10</text>
    </svg>
  );
}

function OnesBlockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="#10B981" stroke="#047857" strokeWidth="2" rx="4" />
      <text x="25" y="31" fill="white" fontSize="18" fontWeight="bold" textAnchor="middle">1</text>
    </svg>
  );
}

function NumberLineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="10" width="40" height="30" fill="#F59E0B" stroke="#B45309" strokeWidth="2" rx="4" />
      <line x1="10" y1="25" x2="40" y2="25" stroke="white" strokeWidth="3" />
      <circle cx="15" cy="25" r="3" fill="white" />
      <circle cx="25" cy="25" r="3" fill="white" />
      <circle cx="35" cy="25" r="3" fill="white" />
    </svg>
  );
}

function DescendingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" rx="4" />
      <path d="M15 15 L35 35 M25 35 L35 35 L35 25" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CalculatorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="4" width="34" height="42" fill="#6366F1" stroke="#3730A3" strokeWidth="2" rx="4" />
      <rect x="12" y="8" width="26" height="10" fill="white" rx="2" />
      <rect x="12" y="22" width="6" height="5" fill="white" rx="1" />
      <rect x="22" y="22" width="6" height="5" fill="white" rx="1" />
      <rect x="32" y="22" width="6" height="5" fill="white" rx="1" />
      <rect x="12" y="30" width="6" height="5" fill="white" rx="1" />
      <rect x="22" y="30" width="6" height="5" fill="white" rx="1" />
      <rect x="32" y="30" width="6" height="5" fill="white" rx="1" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'thousands-block': return <ThousandsBlockIcon size={size} />;
    case 'hundreds-block': return <HundredsBlockIcon size={size} />;
    case 'tens-block': return <TensBlockIcon size={size} />;
    case 'ones-block': return <OnesBlockIcon size={size} />;
    case 'number-line': return <NumberLineIcon size={size} />;
    case 'descending': return <DescendingIcon size={size} />;
    case 'calculator': return <CalculatorIcon size={size} />;
    default: return <ThousandsBlockIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-indigo-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`} style={{ width: 120, height: 90 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all duration-200 ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-lg'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color + '22',
        borderColor: color,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 text-white font-bold shadow-md" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-black text-gray-900 text-center px-1" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface NumbersGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function NumbersGame({ width = 720, height = 560, onComplete }: NumbersGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Welcome to Number Wizard's realm! Let's learn 4-digit numbers!");

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speak and audio helpers
  const speakText = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  const playSound = useCallback((sound: SoundEffect) => {
    audioManager.play(sound);
  }, []);

  // Cleanup speech & timers on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge) {
        setHintMsg(currentChallenge.hint);
        setMascotMood('thinking');
        setMascotSpeech("Need a magical hint? Look at the place value!");
        playSound('hint');
        speakText(currentChallenge.hint);
      }
    }, 10000);
  }, [screen, currentChallenge, playSound, speakText]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Teaching slide spoken narration
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speakText(slide.spoken);
      setMascotSpeech(slide.text);
      setMascotMood('happy');
    }
  }, [screen, slideIdx, speakText]);

  // Challenge start speech
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      speakText(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setMascotMood('happy');
      setPlacedItems({});
    }
  }, [screen, challengeIdx, currentChallenge, speakText]);

  // Handle Multiple Choice Answer
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      playSound('success');
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! That is correct!');
      speakText('Fantastic! That is correct!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Correct! Well done, Math Wizard!');
      setShowSuccessBanner(true);
    } else {
      playSound('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speakText(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Handle Drag Start
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    setDraggingId(id);
    playSound('pickup');
  };

  // Handle Drag End for Sort Challenges
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    setDraggingId(null);
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check bins collision
    const binWidth = 140;
    const binHeight = 90;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * (binWidth + 20)) / 2;
    const binY = height - 130;

    let droppedInBin: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x + 60 >= bx && x + 60 <= bx + binWidth && y + 45 >= by && y + 45 <= by + binHeight) {
        droppedInBin = bin.id;
      }
    });

    if (droppedInBin && droppedInBin === item.correctBin) {
      playSound('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        playSound('success');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('All sorted perfectly!');
        speakText('All sorted perfectly! Great job!');
        setSparklePos({ x: width / 2, y: height / 2 });
        setSuccessMsg('Wonderful sorting!');
        setShowSuccessBanner(true);
      }
      return true;
    } else {
      playSound('drop-wrong');
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speakText(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  // Advance to next challenge or finish
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    setHintMsg(null);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      playSound('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('You completed all math challenges! You are a true Math Wizard!');
      speakText('You completed all math challenges! You are a true Math Wizard!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl select-none" style={{ width, height, background: '#1E1B4B' }}>
      {/* Background Scene */}
      <MathSceneBackground width={width} height={height} />

      {/* Mascot */}
      <NumberWizardNikhil mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 z-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-white tracking-wider">✨ NumbersGame</span>
          {screen === 'play' && (
            <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && <StarRow count={stars} total={CHALLENGES.length} />}
          <button
            onClick={() => {
              playSound('tap');
              speechManager.stop();
              setScreen(prev => (prev === 'teaching' ? 'play' : 'teaching'));
            }}
            className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition"
          >
            {screen === 'teaching' ? 'Start Game 🎮' : 'Review Rules 📚'}
          </button>
        </div>
      </div>

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 pb-6 px-8 flex flex-col items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl text-white flex flex-col items-center text-center border border-white/20`}
            >
              <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
              <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
              <p className="text-base font-medium leading-relaxed mb-6 opacity-95">{TEACHING_SLIDES[slideIdx].text}</p>
              <div className="flex items-center gap-2 mb-4">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 mt-6">
            {slideIdx > 0 && (
              <button
                onClick={() => {
                  playSound('tap');
                  setSlideIdx(prev => prev - 1);
                }}
                className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-2.5 rounded-2xl shadow backdrop-blur transition"
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => {
                playSound('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-indigo-950 font-black px-8 py-2.5 rounded-2xl shadow-lg transition transform active:scale-95"
            >
              {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next →' : 'Start Playing! 🚀'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col items-center justify-between z-10">
          {/* Question Box */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl border-2 border-indigo-200 mt-2 text-center">
            <h3 className="text-lg font-black text-indigo-950">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Content Area */}
          <div className="w-full flex-1 relative flex items-center justify-center my-2">
            {/* Multiple Choice Challenges */}
            {currentChallenge.answer !== 'sort' && currentChallenge.options && (
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {currentChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswerSelect(opt)}
                    className="bg-white hover:bg-indigo-50 border-3 border-indigo-400 rounded-2xl p-4 shadow-lg text-indigo-950 font-black text-lg transition flex items-center justify-center"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenges (Drag and Drop) */}
            {currentChallenge.answer === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="relative w-full h-full flex flex-col items-center justify-between">
                {/* Bins at bottom */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-6">
                  {currentChallenge.bins.map((bin, idx) => {
                    const totalBins = currentChallenge.bins!.length;
                    const binWidth = 135;
                    const startX = (width - totalBins * (binWidth + 20)) / 2;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={startX + idx * (binWidth + 20)}
                        y={height - 140}
                        width={binWidth}
                        height={85}
                        isHovering={hoverBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable Items at top/middle */}
                <div className="flex flex-wrap justify-center gap-6 mt-4">
                  {currentChallenge.sortItems.map((item, idx) => {
                    // Spread items horizontally
                    const startX = width / 2 - (currentChallenge.sortItems!.length * 70);
                    const defaultX = startX + idx * 140;
                    const defaultY = 70;
                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={defaultX}
                        y={defaultY}
                        placed={!!placedItems[item.id]}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && (
        <SuccessBanner
          message={successMsg}
          onComplete={() => {
            setShowSuccessBanner(false);
            handleNextChallenge();
          }}
        />
      )}
      {hintMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => setHintMsg(null)}
        />
      )}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
    </div>
  );
}
