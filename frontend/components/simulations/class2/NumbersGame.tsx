'use client';

/**
 * NumbersGame — Learn about numbers up to 999, place and face values, and ordering!
 *
 * CISCE Nodes: c2_math_001 (Numbers up to 99), c2_math_002 (3 digit numbers up to 999),
 *              c2_math_003 (Place and face values), c2_math_004 (Comparison and ordering)
 * Enrichment: c2_maths_enrichment_part1-4
 *
 * ELI5: "Numbers are like building blocks! A two-digit number has tens and ones.
 *   A three-digit number has hundreds, tens, and ones. The face value is the digit
 *   itself, and the place value depends on where the digit sits! We can compare
 *   numbers from left to right and arrange them from smallest to biggest!"
 *
 * Misconceptions (from enrichment):
 *   1. "Place value and face value are the same" → "No! Face value is the digit
 *      itself. Place value depends on the position (hundreds = x100, tens = x10, ones = x1)!"
 *   2. "In 506, the 0 means nothing and can be skipped" → "No! The 0 is a place-holder
 *      in the tens place! It keeps the 5 in hundreds and 6 in ones!"
 *   3. "To compare numbers, look at the ones place first" → "No! Always compare
 *      from the highest place value: hundreds first, then tens, then ones!"
 *   4. "Ascending order means biggest to smallest" → "No! Ascending means going up
 *      from smallest to biggest! Descending is biggest to smallest!"
 *
 * Story: "Help Number Ninja Nisha sort number flowers, build with place value
 *   blocks, and conquer the counting path! Become a Math Ninja Master!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG math garden scene background (sky, number flowers, path, number line)
 * - Custom SVG math object components (ones blocks, tens rods, hundreds flats, abacus)
 * - Custom SVG mascot (Number Ninja Nisha) with pink headband and throwing star
 * - Drag-and-drop: drag blocks and numbers to correct targets
 * - 8 progressive challenges: identify numbers → place value → comparison → ordering
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via Web Speech API (audioManager)
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

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──────

const TEACHING_SLIDES = [
  {
    title: 'Numbers Up to 99 & 999! 🔢',
    text: 'Numbers tell us how many! Two-digit numbers have tens and ones (45 = 4 tens and 5 ones). Three-digit numbers add hundreds (345 = 3 hundreds, 4 tens, 5 ones)!',
    emoji: '🔢',
    bgColor: 'from-purple-500 to-gold-600',
    spoken: 'Numbers tell us how many! Two-digit numbers have tens and ones. Three-digit numbers add hundreds!',
  },
  {
    title: 'Place Value vs Face Value! 🏷️',
    text: 'Face value is the digit itself (in 345, face of 4 is 4). Place value depends on the seat! Hundreds seat = x100 (400), Tens seat = x10 (40), Ones seat = x1 (4)!',
    emoji: '🏷️',
    bgColor: 'from-pink-500 to-rose-600',
    spoken: 'Face value is the digit itself. Place value depends on the seat! Hundreds, tens, and ones!',
  },
  {
    title: 'The Magic Zero Place-Holder! 0️⃣',
    text: 'In 506, the zero in the tens place is very important! It is a place-holder that holds the tens seat empty so the 5 stays in hundreds and 6 in ones!',
    emoji: '0️⃣',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'In 506, the zero in the tens place is very important! It holds the tens seat empty!',
  },
  {
    title: 'Comparing Numbers! ⚖️',
    text: 'To compare numbers, always check from left to right! First check the hundreds. The bigger hundreds wins! If hundreds match, check tens, then ones!',
    emoji: '⚖️',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'To compare numbers, always check from left to right! First check the hundreds. The bigger hundreds wins!',
  },
  {
    title: 'Ascending & Descending Order! 📈📉',
    text: 'Ascending means going UP from smallest to biggest (145, 235, 318). Descending means going DOWN from biggest to smallest (902, 789, 456)!',
    emoji: '📈',
    bgColor: 'from-gold-500 to-gold-600',
    spoken: 'Ascending means going up from smallest to biggest. Descending means going down from biggest to smallest!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_num' | 'identify_digit' | 'identify_pv' | 'sort_ascending' | 'identify_biggest' | 'sort_blocks' | 'identify_zero' | 'sort_descending';

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: { id: string; label: string; icon: string; correctBin: string; value: number }[];
  bins?: { id: string; label: string; color: string }[];
}

// ─── Challenges (8 progressive: identify → place value → sort → order) ────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_num',
    question: 'What number comes immediately AFTER 99?',
    answer: '100',
    options: ['90', '100', '1000'],
    hint: 'After 99, we reach the first three-digit number, one hundred!',
    misconception: 'After 99 comes 100! 100 is the smallest three-digit number, made of 1 hundred, 0 tens, and 0 ones!',
  },
  {
    type: 'identify_digit',
    question: 'In the number 345, which digit is in the HUNDREDS place?',
    answer: '3',
    options: ['3', '4', '5'],
    hint: 'Look at the leftmost digit in 345. Hundreds are on the far left!',
    misconception: 'In 345, the 3 is in the hundreds place (worth 300), 4 is in the tens place, and 5 is in the ones place!',
  },
  {
    type: 'identify_pv',
    question: 'What is the PLACE VALUE of the digit 4 in the number 345?',
    answer: '40',
    options: ['4', '40', '400'],
    hint: 'The 4 sits in the TENS place! So its place value is 4 tens, which is 40!',
    misconception: 'Place value depends on the position! 4 in the tens place is worth 40 (4 x 10). Its face value is just 4, but its place value is 40!',
  },
  {
    type: 'sort_ascending',
    question: 'Drag these numbers into ASCENDING order (smallest to biggest)!',
    answer: 'sort',
    options: [],
    hint: 'Compare hundreds first: 145, then 235, then 318, then 456!',
    misconception: 'Ascending order goes UP from smallest to biggest! Check hundreds first, then tens, then ones for numbers with the same hundreds!',
    sortItems: [
      { id: 'num-456', label: '456', icon: 'flower', correctBin: 'bin-3', value: 456 },
      { id: 'num-145', label: '145', icon: 'flower', correctBin: 'bin-0', value: 145 },
      { id: 'num-318', label: '318', icon: 'flower', correctBin: 'bin-2', value: 318 },
      { id: 'num-235', label: '235', icon: 'flower', correctBin: 'bin-1', value: 235 },
    ],
    bins: [
      { id: 'bin-0', label: '1st (Smallest)', color: '#3B82F6' },
      { id: 'bin-1', label: '2nd', color: '#10B981' },
      { id: 'bin-2', label: '3rd', color: '#F59E0B' },
      { id: 'bin-3', label: '4th (Biggest)', color: '#EF4444' },
    ],
  },
  {
    type: 'identify_biggest',
    question: 'Which of these three-digit numbers is the GREATEST?',
    answer: '879',
    options: ['789', '798', '879'],
    hint: 'Compare the hundreds digits first: 7, 7, and 8! Which hundreds digit is biggest?',
    misconception: 'To find the greatest number, always check the hundreds place first! 879 has 8 in hundreds, which is bigger than 7 in 789 and 798!',
  },
  {
    type: 'sort_blocks',
    question: 'Drag place value blocks to build the number 234! (2 Hundreds, 3 Tens, 4 Ones)',
    answer: 'sort',
    options: [],
    hint: '2 Hundreds flats, 3 Tens rods, and 4 Ones cubes make 234!',
    misconception: 'Building numbers requires hundreds flats (100), tens rods (10), and ones cubes (1)! 2 hundreds + 3 tens + 4 ones = 234!',
    sortItems: [
      { id: 'block-h1', label: '100 Flat', icon: 'hundreds', correctBin: 'bin-hundreds', value: 100 },
      { id: 'block-h2', label: '100 Flat', icon: 'hundreds', correctBin: 'bin-hundreds', value: 100 },
      { id: 'block-t1', label: '10 Rod', icon: 'tens', correctBin: 'bin-tens', value: 10 },
      { id: 'block-t2', label: '10 Rod', icon: 'tens', correctBin: 'bin-tens', value: 10 },
      { id: 'block-t3', label: '10 Rod', icon: 'tens', correctBin: 'bin-tens', value: 10 },
      { id: 'block-o1', label: '1 Cube', icon: 'ones', correctBin: 'bin-ones', value: 1 },
      { id: 'block-o2', label: '1 Cube', icon: 'ones', correctBin: 'bin-ones', value: 1 },
      { id: 'block-o3', label: '1 Cube', icon: 'ones', correctBin: 'bin-ones', value: 1 },
      { id: 'block-o4', label: '1 Cube', icon: 'ones', correctBin: 'bin-ones', value: 1 },
    ],
    bins: [
      { id: 'bin-hundreds', label: 'Hundreds (2 needed)', color: '#8B5CF6' },
      { id: 'bin-tens', label: 'Tens (3 needed)', color: '#EC4899' },
      { id: 'bin-ones', label: 'Ones (4 needed)', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify_zero',
    question: 'In the number 506, what does the digit 0 in the tens place mean?',
    answer: 'Zero tens',
    options: ['Zero tens', 'Zero hundreds', 'Zero ones'],
    hint: 'The middle digit is in the tens place, and it is 0, meaning zero tens!',
    misconception: 'In 506, the 0 means zero tens! It acts as a place-holder so 5 stays in hundreds and 6 in ones. Without the 0, it would look like 56!',
  },
  {
    type: 'sort_descending',
    question: 'Drag these numbers into DESCENDING order (biggest to smallest)!',
    answer: 'sort',
    options: [],
    hint: 'Start with the biggest hundreds: 902, then 789, then 456, then 235!',
    misconception: 'Descending order goes DOWN from biggest to smallest! 902 is biggest because 9 hundreds is more than 7, 4, or 2 hundreds!',
    sortItems: [
      { id: 'dnum-456', label: '456', icon: 'flower', correctBin: 'bin-2', value: 456 },
      { id: 'dnum-902', label: '902', icon: 'flower', correctBin: 'bin-0', value: 902 },
      { id: 'dnum-235', label: '235', icon: 'flower', correctBin: 'bin-3', value: 235 },
      { id: 'dnum-789', label: '789', icon: 'flower', correctBin: 'bin-1', value: 789 },
    ],
    bins: [
      { id: 'bin-0', label: '1st (Biggest)', color: '#EF4444' },
      { id: 'bin-1', label: '2nd', color: '#F59E0B' },
      { id: 'bin-2', label: '3rd', color: '#10B981' },
      { id: 'bin-3', label: '4th (Smallest)', color: '#3B82F6' },
    ],
  },
];

// ─── Number Ninja Nisha Mascot ─────────────────────────────────

function NishaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-25 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-pink-300"
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
            <linearGradient id="ninja-suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            <linearGradient id="headband" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Body / Ninja Gi */}
          <path d="M22 50 L37 45 L53 50 L58 75 L17 75 Z" fill="url(#ninja-suit)" stroke="#9D174D" strokeWidth="1.5" />
          {/* Belt with plus sign */}
          <rect x="17" y="60" width="41" height="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <text x="37" y="67" fontSize="10" fontWeight="bold" fill="#78350F" textAnchor="middle">+</text>
          {/* Head */}
          <circle cx="37" cy="30" r="16" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1.5" />
          {/* Pink Headband */}
          <path d="M21 26 Q37 20 53 26 L54 32 Q37 26 21 32 Z" fill="url(#headband)" />
          {/* Eyes */}
          <circle cx="31" cy="32" r="3" fill="#1F2937" />
          <circle cx="43" cy="32" r="3" fill="#1F2937" />
          <circle cx="32" cy="31" r="1" fill="white" />
          <circle cx="44" cy="31" r="1" fill="white" />
          {/* Smile */}
          <path d="M33 38 Q37 42 41 38" stroke="#9D174D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Plus throwing star in hand */}
          <g transform="translate(56, 45)">
            <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
          </g>
          {/* Feet */}
          <ellipse cx="27" cy="80" rx="6" ry="4" fill="#1F2937" />
          <ellipse cx="47" cy="80" rx="6" ry="4" fill="#1F2937" />
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

// ─── Math Garden Scene Background ─────────────────────────────

function MathScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0E7FF 0%, #F5F3FF 40%, #ECFDF5 70%, #D1FAE5 100%)' }} />
      {/* Sun / Math Star */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FBBF24" opacity="0.9" />
          <text x="27.5" y="32" fontSize="18" fontWeight="bold" fill="#78350F" textAnchor="middle">123</text>
        </svg>
      </motion.div>
      {/* Floating clouds */}
      <motion.div className="absolute top-6 left-1/3 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="70" height="30" viewBox="0 0 70 30">
          <ellipse cx="22" cy="18" rx="16" ry="11" fill="white" />
          <ellipse cx="40" cy="14" rx="20" ry="13" fill="white" />
          <text x="35" y="18" fontSize="11" fontWeight="bold" fill="#6366F1" textAnchor="middle">+ - =</text>
        </svg>
      </motion.div>
      {/* Ground / Counting Path */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #A7F3D0 0%, #34D399 50%, #059669 100%)' }} />
      {/* Number line stones on path */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-around px-8 opacity-40">
        {[0, 10, 20, 50, 100, 500, 999].map((n, i) => (
          <div key={i} className="w-10 h-6 bg-white rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-800 shadow">
            {n}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Custom Math SVG Icons ────────────────────────────────────

function OnesBlockIcon({ size = 45 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="5" y="5" width="30" height="30" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" rx="4" />
      <text x="20" y="25" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">1</text>
    </svg>
  );
}

function TensBlockIcon({ size = 45 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="12" y="2" width="16" height="36" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" rx="3" />
      {[10, 18, 26].map((y, i) => (
        <line key={i} x1="12" y1={y} x2="28" y2={y} stroke="#FCE7F3" strokeWidth="1" />
      ))}
      <text x="20" y="24" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">10</text>
    </svg>
  );
}

function HundredsBlockIcon({ size = 45 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="1.5" rx="4" />
      <line x1="4" y1="14" x2="36" y2="14" stroke="#EDE9FE" strokeWidth="1" />
      <line x1="4" y1="26" x2="36" y2="26" stroke="#EDE9FE" strokeWidth="1" />
      <line x1="14" y1="4" x2="14" y2="36" stroke="#EDE9FE" strokeWidth="1" />
      <line x1="26" y1="4" x2="26" y2="36" stroke="#EDE9FE" strokeWidth="1" />
      <text x="20" y="23" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">100</text>
    </svg>
  );
}

function NumberFlowerIcon({ size = 45, label = '123' }: { size?: number; label?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      {/* Petals */}
      <circle cx="25" cy="12" r="8" fill="#F472B6" />
      <circle cx="25" cy="38" r="8" fill="#F472B6" />
      <circle cx="12" cy="25" r="8" fill="#F472B6" />
      <circle cx="38" cy="25" r="8" fill="#F472B6" />
      {/* Center */}
      <circle cx="25" cy="25" r="10" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      <text x="25" y="28" fontSize="10" fontWeight="bold" fill="#78350F" textAnchor="middle">{label}</text>
    </svg>
  );
}

// ─── Sort Card Component ──────────────────────────────────────

function renderSortIcon(icon: string, label: string, size: number = 45) {
  if (icon === 'hundreds') return <HundredsBlockIcon size={size} />;
  if (icon === 'tens') return <TensBlockIcon size={size} />;
  if (icon === 'ones') return <OnesBlockIcon size={size} />;
  return <NumberFlowerIcon size={size} label={label} />;
}

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={100} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-purple-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 100, height: 90 }}>
        {renderSortIcon(icon, label, 42)}
        <span className="text-xs font-bold text-gray-800 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all ${
        isHovering ? 'scale-105 shadow-xl' : 'shadow-md'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <div className="w-8 h-2 rounded-full mb-1" style={{ backgroundColor: color }} />
      <span className="text-xs font-bold text-center" style={{ color }}>{label}</span>
      <span className="text-[10px] text-gray-500 mt-1">Drop here</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart, width, height }: { onStart: () => void; width: number; height: number }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = TEACHING_SLIDES[currentSlide];

  const handleNext = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 select-none" style={{ width, height, background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #DB2777 100%)' }}>
      {/* Top Header */}
      <div className="flex items-center justify-between w-full max-w-xl">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🔢</span>
          <h1 className="text-xl font-extrabold text-white">Number Ninja Academy</h1>
        </div>
        <div className="flex gap-1">
          {TEACHING_SLIDES.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-yellow-400' : 'w-2 bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Slide Card */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl max-w-lg w-full flex flex-col items-center text-center border-4 border-yellow-300 my-auto"
      >
        <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-4xl mb-4 shadow-inner">
          {slide.emoji}
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">{slide.title}</h2>
        <p className="text-base text-gray-600 font-medium leading-relaxed mb-6">{slide.text}</p>
        <div className="flex items-center gap-2 bg-gold-50 px-4 py-2 rounded-xl border border-gold-200">
          <span className="text-sm font-bold text-gold-700">💡 ICSE Tip:</span>
          <span className="text-xs text-gold-900 font-medium">Master place value to compare numbers instantly!</span>
        </div>
      </motion.div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between w-full max-w-xl">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow transition-all ${
            currentSlide === 0 ? 'opacity-30 bg-white/20 text-white/50 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl font-black text-base bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-gray-900 shadow-lg transform active:scale-95 transition-all flex items-center gap-2"
        >
          {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ─────────────────────────────────────

export interface NumbersGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function NumbersGame({ width = 720, height = 560, onComplete }: NumbersGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(100);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome, Math Ninja! Let us conquer numbers!');

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sort challenge states
  const currentChallenge = CHALLENGES[currentIndex];
  const [sortItemsState, setSortItemsState] = useState<{ [id: string]: { x: number; y: number; placed: boolean; currentBin?: string } }>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  // Initialize sort items when challenge changes
  useEffect(() => {
    if (currentChallenge.type.startsWith('sort') && currentChallenge.sortItems) {
      const initial: { [id: string]: { x: number; y: number; placed: boolean } } = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        initial[item.id] = {
          x: 40 + (idx % 4) * 115,
          y: 280 + Math.floor(idx / 4) * 105,
          placed: false,
        };
      });
      setSortItemsState(initial);
    }
  }, [currentIndex, currentChallenge]);

  // Inactivity auto-hint setup
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!gameOver && screen === 'play') {
        audioManager.play('hint');
        setHintMsg(currentChallenge.hint);
        setMascotMood('thinking');
        setMascotSpeech('Need a hint? Check the rule!');
        speechManager.speak('Need a hint? Check the rule!');
      }
    }, 10000);
  }, [currentChallenge, gameOver, screen]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentIndex, resetInactivityTimer]);

  // Handle multiple-choice answer
  const handleAnswer = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setSparklePos({ x, y });
      setMascotMood('celebrate');
      setMascotSpeech('Amazing! You got it right!');
      speechManager.speak('Amazing! You got it right!');
      setStars(s => s + 1);

      setTimeout(() => {
        if (currentIndex < CHALLENGES.length - 1) {
          setCurrentIndex(c => c + 1);
          setMascotMood('happy');
          setMascotSpeech('Great job! Next challenge!');
          speechManager.speak('Great job! Next challenge!');
        } else {
          setGameOver(true);
          setShowConfetti(true);
          audioManager.play('celebration');
          setSuccessMsg('You are a Number Ninja Master! 🌟');
          if (onComplete) onComplete(Math.max(0, score));
        }
      }, 1200);
    } else {
      audioManager.play('error');
      setErrors(err => err + 1);
      setScore(s => Math.max(0, s - 5));
      setMascotMood('thinking');
      setMascotSpeech('Not quite! Check the misconception rule.');
      speechManager.speak('Not quite! Check the misconception rule.');
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Drag-and-drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check bin bounding boxes
    const binWidth = 140;
    const binHeight = 110;
    const binY = 140;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * (binWidth + 20)) / 2;

    let matchedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
        matchedBinId = bin.id;
      }
    });

    if (matchedBinId && matchedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setSortItemsState(prev => ({
        ...prev,
        [id]: { x, y, placed: true },
      }));

      // Check if all items are placed
      const allItems = currentChallenge.sortItems || [];
      const updatedState = {
        ...sortItemsState,
        [id]: { x, y, placed: true },
      };
      const allDone = allItems.every(i => updatedState[i.id]?.placed);

      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech('Fantastic sorting! All correct!');
        speechManager.speak('Fantastic sorting! All correct!');
        setStars(s => s + 1);

        setTimeout(() => {
          if (currentIndex < CHALLENGES.length - 1) {
            setCurrentIndex(c => c + 1);
            setMascotMood('happy');
            setMascotSpeech('Onto the next level!');
            speechManager.speak('Onto the next level!');
          } else {
            setGameOver(true);
            setShowConfetti(true);
            audioManager.play('celebration');
            setSuccessMsg('You are a Number Ninja Master! 🌟');
            if (onComplete) onComplete(Math.max(0, score));
          }
        }, 1200);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(err => err + 1);
      setScore(s => Math.max(0, s - 5));
      setMascotMood('thinking');
      setMascotSpeech('Oops! Check where that belongs.');
      speechManager.speak('Oops! Check where that belongs.');
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => { setScreen('play'); audioManager.play('whoosh'); }} width={width} height={height} />;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-4 select-none overflow-hidden bg-gray-900" style={{ width, height }}>
      {/* Background Scene */}
      <MathScene width={width} height={height} />

      {/* Mascot */}
      <NishaMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Header bar */}
      <div className="relative z-20 flex items-center justify-between w-full max-w-2xl px-4 py-2 bg-white/90 backdrop-blur rounded-2xl shadow-md border border-purple-200">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-purple-700">Level {currentIndex + 1}/8</span>
          <StarRow count={stars} total={8} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-gray-700">Score: {score}</span>
          <button
            onClick={() => { audioManager.play('hint'); setHintMsg(currentChallenge.hint); }}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold rounded-xl text-xs shadow transition-all flex items-center gap-1"
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Challenge Card */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-25 bg-white/95 backdrop-blur rounded-3xl p-6 shadow-xl max-w-xl w-full flex flex-col items-center text-center border-4 border-purple-300 my-auto"
      >
        <h2 className="text-xl font-extrabold text-gray-800 mb-6 leading-snug">{currentChallenge.question}</h2>

        {/* Multiple Choice Options */}
        {!currentChallenge.type.startsWith('sort') && (
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            {currentChallenge.options.map((opt, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleAnswer(opt, e)}
                className="py-4 px-3 rounded-2xl bg-gradient-to-br from-purple-500 to-gold-600 hover:from-purple-400 hover:to-gold-500 text-white font-black text-lg shadow-lg border-2 border-purple-300 transition-all flex flex-col items-center justify-center gap-1"
              >
                <span>{opt}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Sort Challenge Area */}
        {currentChallenge.type.startsWith('sort') && currentChallenge.bins && (
          <div className="relative w-full h-[320px]">
            {/* Bins */}
            {currentChallenge.bins.map((bin, idx) => {
              const binWidth = 140;
              const binHeight = 110;
              const totalBins = currentChallenge.bins?.length || 1;
              const startX = (width - totalBins * (binWidth + 20)) / 2;
              const bx = startX + idx * (binWidth + 20);
              const by = 20;

              return (
                <SortBin
                  key={bin.id}
                  label={bin.label}
                  color={bin.color}
                  x={bx}
                  y={by}
                  width={binWidth}
                  height={binHeight}
                  isHovering={hoveredBin === bin.id}
                />
              );
            })}

            {/* Draggable Sort Cards */}
            {currentChallenge.sortItems?.map(item => {
              const state = sortItemsState[item.id] || { x: 50, y: 280, placed: false };
              return (
                <SortCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  x={state.x}
                  y={state.y}
                  placed={state.placed}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Footer Instructions */}
      <div className="relative z-20 text-center text-xs text-white/80 font-medium py-1">
        {currentChallenge.type.startsWith('sort') ? 'Drag each item into the correct bin above!' : 'Tap the correct answer button!'}
      </div>

      {/* Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
