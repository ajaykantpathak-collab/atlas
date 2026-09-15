'use client';

/**
 * MulDivGame — Multiplication Tables and Equal Grouping/Sharing (Repeated Subtraction)
 *
 * CISCE Nodes: c2_math_012 (Multiplication tables of 2,3,4,5), c2_math_013 (Equal grouping and sharing)
 * Enrichment: c2_maths_enrichment_part12 & part13
 *
 * ELI5: "Multiplication is adding the same number again and again! 3 times 4 means
 *   three groups of 4. Division is taking away the same number again and again until
 *   nothing is left — that is repeated subtraction!"
 *
 * Misconceptions (from enrichment):
 *   1. "Multiplication makes numbers smaller" → "No! Multiplication is repeated addition,
 *      so numbers get bigger: 3 x 4 = 12!"
 *   2. "Multiplication and division are the same" → "No! Multiplication builds up equal groups,
 *      while division splits them or takes them away by repeated subtraction!"
 *   3. "We can share unequally" → "No! Sharing must be EQUAL — every friend gets the exact
 *      same amount!"
 *   4. "2 x 3 and 3 x 2 are different" → "No! Multiplication is commutative — 2 threes are 6,
 *      and 3 twos are also 6!"
 *   5. "Skipping steps in repeated subtraction is fine" → "No! Show every subtraction step
 *      (e.g., 15 -> 10 -> 5 -> 0) to prove understanding!"
 *
 * Story: "Help Gardener Gita plant seeds in equal rows, arrange flower pots, and share apples
 *   equally with her garden friends! Become a Master Multiplication & Division Gardener!"
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
    title: 'Multiplication is Repeated Addition! 🌱',
    text: 'A multiplication table adds the same number over and over! 3 fours means four equal groups of 3, giving 12. Skip counting is climbing stairs two or five steps at a time!',
    emoji: '🌱',
    bgColor: 'from-emerald-400 to-green-600',
  },
  {
    title: 'Tables of 2, 3, 4, and 5! 🌿',
    text: 'Table of 2: 2, 4, 6, 8, 10... Table of 5 ends in 0 or 5 (5, 10, 15, 20...). Table of 4 is double the table of 2! Patterns help us check our work instantly!',
    emoji: '🌿',
    bgColor: 'from-green-500 to-teal-600',
  },
  {
    title: 'Equal Sharing & Grouping! 🍎',
    text: 'Equal sharing splits a total among friends (e.g., 12 pencils among 3 friends = 4 each). Equal grouping finds how many groups fit (e.g., 20 pebbles in groups of 4 = 5 groups)!',
    emoji: '🍎',
    bgColor: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Division is Repeated Subtraction! 🧺',
    text: 'Just as multiplication builds up by adding, division breaks down by subtracting the same number again and again until zero! 15 minus 5, three times, leaves 0!',
    emoji: '🧺',
    bgColor: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Gardener Gita is Ready! 🌻',
    text: 'Plant seeds in equal rows, arrange flower pots, and share apples equally. Show your steps and become a Master Gardener!',
    emoji: '🌻',
    bgColor: 'from-teal-500 to-cyan-600',
  },
];

// ─── Types ────────────────────────────────────────────────────

type ChallengeType = 'identify_mul' | 'identify_div' | 'sort_table' | 'sort_subtraction' | 'sort_match';

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
    type: 'identify_mul',
    question: 'Gardener Gita plants 2 pots with 3 flowers in each. What is 2 x 3?',
    answer: '6',
    options: ['5', '6', '8'],
    hint: 'Think: 2 groups of 3 flowers is 3 + 3 = 6!',
    misconception: 'Multiplication is repeated addition! 2 threes means 3 + 3 = 6. Multiplication makes numbers bigger by adding equal groups!',
  },
  {
    type: 'identify_mul',
    question: 'Gita packs 5 seed bags with 4 seeds each. What is 5 x 4?',
    answer: '20',
    options: ['9', '16', '20'],
    hint: 'Skip count by 5 four times: 5, 10, 15, 20!',
    misconception: '5 fours means 4 + 4 + 4 + 4 + 4 = 20. Every product in the table of 5 ends in 0 or 5!',
  },
  {
    type: 'sort_table',
    question: 'Drag the numbers of the 3 times table into correct order!',
    answer: 'sort',
    options: [],
    hint: 'Start at 3 and add 3 each time: 3, 6, 9, 12, 15...',
    misconception: 'The table of 3 is built by adding 3 at every step: 3, 6, 9, 12, 15. Each step is one more equal group of 3!',
    sortItems: [
      { id: 't3_1', label: '3 ones = 3', icon: 'seed', correctBin: 'pos1' },
      { id: 't3_2', label: '3 twos = 6', icon: 'seed', correctBin: 'pos2' },
      { id: 't3_3', label: '3 threes = 9', icon: 'seed', correctBin: 'pos3' },
      { id: 't3_4', label: '3 fours = 12', icon: 'seed', correctBin: 'pos4' },
      { id: 't3_5', label: '3 fives = 15', icon: 'seed', correctBin: 'pos5' },
    ],
    bins: [
      { id: 'pos1', label: '1st (3)', color: '#10B981' },
      { id: 'pos2', label: '2nd (6)', color: '#3B82F6' },
      { id: 'pos3', label: '3rd (9)', color: '#8B5CF6' },
      { id: 'pos4', label: '4th (12)', color: '#EC4899' },
      { id: 'pos5', label: '5th (15)', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify_div',
    question: 'Gita has 12 apples shared equally among 3 friends. How many does each get?',
    answer: '4',
    options: ['3', '4', '6'],
    hint: 'Deal 1 apple to each friend round by round until 12 apples are gone. 12 / 3 = 4!',
    misconception: 'Sharing must be EQUAL! 12 shared among 3 friends means 4 apples each, because 3 x 4 = 12. Division is the inverse of multiplication!',
  },
  {
    type: 'sort_table',
    question: 'Drag the numbers of the 5 times table into correct order!',
    answer: 'sort',
    options: [],
    hint: 'Skip count by 5: 5, 10, 15, 20, 25. Notice they end in 5 or 0!',
    misconception: 'The table of 5 ends in 0 or 5 alternately: 5, 10, 15, 20, 25. Like counting five-rupee coins!',
    sortItems: [
      { id: 't5_1', label: '5 ones = 5', icon: 'pot', correctBin: 'pos1' },
      { id: 't5_2', label: '5 twos = 10', icon: 'pot', correctBin: 'pos2' },
      { id: 't5_3', label: '5 threes = 15', icon: 'pot', correctBin: 'pos3' },
      { id: 't5_4', label: '5 fours = 20', icon: 'pot', correctBin: 'pos4' },
      { id: 't5_5', label: '5 fives = 25', icon: 'pot', correctBin: 'pos5' },
    ],
    bins: [
      { id: 'pos1', label: '1st (5)', color: '#10B981' },
      { id: 'pos2', label: '2nd (10)', color: '#3B82F6' },
      { id: 'pos3', label: '3rd (15)', color: '#8B5CF6' },
      { id: 'pos4', label: '4th (20)', color: '#EC4899' },
      { id: 'pos5', label: '5th (25)', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify_mul',
    question: 'Gita makes 4 rows of 5 plants each. What is 4 x 5?',
    answer: '20',
    options: ['15', '20', '25'],
    hint: '4 groups of 5 is 5 + 5 + 5 + 5 = 20!',
    misconception: '4 fives is 20. Remember multiplication is commutative: 4 x 5 equals 5 x 4 = 20!',
  },
  {
    type: 'sort_subtraction',
    question: 'Drag the steps to solve 15 / 5 by repeated subtraction!',
    answer: 'sort',
    options: [],
    hint: 'Subtract 5 from 15 repeatedly until you reach 0: 15->10->5->0!',
    misconception: 'Division by repeated subtraction shows every step: 15-5=10, 10-5=5, 5-5=0. We subtracted 5 three times, so 15 / 5 = 3!',
    sortItems: [
      { id: 'sub_1', label: '15 - 5 = 10', icon: 'basket', correctBin: 'step1' },
      { id: 'sub_2', label: '10 - 5 = 5', icon: 'basket', correctBin: 'step2' },
      { id: 'sub_3', label: '5 - 5 = 0', icon: 'basket', correctBin: 'step3' },
      { id: 'sub_4', label: '3 subtractions (15/5=3)', icon: 'basket', correctBin: 'step4' },
    ],
    bins: [
      { id: 'step1', label: 'Step 1', color: '#10B981' },
      { id: 'step2', label: 'Step 2', color: '#3B82F6' },
      { id: 'step3', label: 'Step 3', color: '#8B5CF6' },
      { id: 'step4', label: 'Answer (3)', color: '#EC4899' },
    ],
  },
  {
    type: 'sort_match',
    question: 'Match each multiplication fact to its correct product!',
    answer: 'sort',
    options: [],
    hint: 'Calculate each: 2x3=6, 4x2=8, 5x5=25, 3x4=12!',
    misconception: 'Multiplication facts come from repeated addition! Check your tables: 3 fours are 12, 5 fives are 25!',
    sortItems: [
      { id: 'm_1', label: '2 x 3 = 6', icon: 'sprout', correctBin: 'bin6' },
      { id: 'm_2', label: '4 x 2 = 8', icon: 'sprout', correctBin: 'bin8' },
      { id: 'm_3', label: '3 x 4 = 12', icon: 'sprout', correctBin: 'bin12' },
      { id: 'm_4', label: '5 x 5 = 25', icon: 'sprout', correctBin: 'bin25' },
    ],
    bins: [
      { id: 'bin6', label: '6', color: '#10B981' },
      { id: 'bin8', label: '8', color: '#3B82F6' },
      { id: 'bin12', label: '12', color: '#8B5CF6' },
      { id: 'bin25', label: '25', color: '#EC4899' },
    ],
  },
];

// ─── Gardener Gita Mascot ─────────────────────────────────────

function GardenerGita({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-300"
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
          <defs>
            <linearGradient id="gita-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE0BD" />
              <stop offset="100%" stopColor="#F5CDA7" />
            </linearGradient>
            <linearGradient id="gita-hat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
          </defs>
          {/* Straw hat brim */}
          <ellipse cx="37" cy="32" rx="30" ry="8" fill="url(#gita-hat)" stroke="#A16207" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37" cy="38" r="16" fill="url(#gita-face)" stroke="#D97706" strokeWidth="1" />
          {/* Hat top */}
          <path d="M25 32 C25 18, 49 18, 49 32 Z" fill="url(#gita-hat)" stroke="#A16207" strokeWidth="1" />
          {/* Ribbon on hat */}
          <rect x="25" y="28" width="24" height="4" fill="#EF4444" />
          {/* Eyes */}
          <circle cx="31" cy="36" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="36" r="2.5" fill="#1F2937" />
          <circle cx="32" cy="35" r="1" fill="white" />
          <circle cx="44" cy="35" r="1" fill="white" />
          {/* Cheeks */}
          <circle cx="28" cy="41" r="3" fill="#FCA5A5" opacity="0.6" />
          <circle cx="46" cy="41" r="3" fill="#FCA5A5" opacity="0.6" />
          {/* Smile */}
          <path d="M33 43 Q37 47 41 43" stroke="#9A3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Green Gardening Shirt */}
          <path d="M21 54 C21 50, 53 50, 53 54 L58 75 L16 75 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          {/* Overalls straps */}
          <rect x="27" y="54" width="5" height="15" fill="#3B82F6" />
          <rect x="43" y="54" width="5" height="15" fill="#3B82F6" />
          {/* Watering can in hand */}
          <ellipse cx="12" cy="68" rx="6" ry="5" fill="#94A3B8" />
          <path d="M12 63 L6 58" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="28" cy="83" rx="5" ry="4" fill="#4B5563" />
          <ellipse cx="46" cy="83" rx="5" ry="4" fill="#4B5563" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Garden Scene Background ──────────────────────────────────

function GardenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 40%, #FEF08A 70%, #86EFAC 100%)' }} />
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="16" fill="#FACC15" opacity="0.9" />
          <circle cx="27" cy="27" r="11" fill="#EAB308" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="27" y1="27" x2={27 + 24 * Math.cos(angle * Math.PI / 180)} y2={27 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          ))}
        </svg>
      </motion.div>
      {/* Fluffy clouds */}
      <motion.div className="absolute top-6 right-1/4 opacity-80" animate={{ x: [0, 35, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="65" height="28" viewBox="0 0 65 28">
          <ellipse cx="20" cy="16" rx="14" ry="10" fill="white" />
          <ellipse cx="38" cy="12" rx="18" ry="12" fill="white" />
          <ellipse cx="50" cy="16" rx="12" ry="8" fill="white" />
        </svg>
      </motion.div>
      {/* Garden soil at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #15803D 0%, #166534 40%, #78350F 100%)' }} />
      {/* Plant rows on soil */}
      <div className="absolute bottom-16 left-10 flex gap-8">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <svg key={i} width="24" height="32" viewBox="0 0 24 32">
            <path d="M12 32 L12 14" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />
            <circle cx="8" cy="12" r="6" fill="#EC4899" />
            <circle cx="16" cy="10" r="6" fill="#F43F5E" />
            <circle cx="12" cy="7" r="6" fill="#FB7185" />
          </svg>
        ))}
      </div>
    </div>
  );
}

// ─── Topic-Specific SVG Component Functions ───────────────────

function SeedIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="28" rx="10" ry="14" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      <path d="M25 14 Q28 20, 25 32" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
      <circle cx="22" cy="22" r="2" fill="#FDE68A" />
    </svg>
  );
}

function SproutIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 42 L25 22" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 25 Q15 20, 12 12 Q22 12, 25 25 Z" fill="#22C55E" stroke="#166534" strokeWidth="1" />
      <path d="M25 20 Q35 15, 38 7 Q28 10, 25 20 Z" fill="#4ADE80" stroke="#166534" strokeWidth="1" />
    </svg>
  );
}

function FlowerPotIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M15 18 L35 18 L38 40 L12 40 Z" fill="#EA580C" stroke="#C2410C" strokeWidth="1.5" />
      <ellipse cx="25" cy="18" rx="10" ry="3" fill="#C2410C" />
      <ellipse cx="25" cy="18" rx="8" ry="2" fill="#78350F" />
      {/* Flower sprouting */}
      <path d="M25 18 L25 8" stroke="#15803D" strokeWidth="2.5" />
      <circle cx="25" cy="6" r="5" fill="#EC4899" />
    </svg>
  );
}

function BasketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M12 20 L38 20 L35 42 L15 42 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5" rx="3" />
      <path d="M15 20 Q25 8, 35 20" stroke="#78350F" strokeWidth="2.5" fill="none" />
      <path d="M13 28 L37 28 M14 35 L36 35" stroke="#92400E" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Sort Card Component (for drag-and-drop challenges) ───────

function renderSortIcon(iconName: string, size: number = 48) {
  if (iconName === 'seed') return <SeedIcon size={size} />;
  if (iconName === 'pot') return <FlowerPotIcon size={size} />;
  if (iconName === 'basket') return <BasketIcon size={size} />;
  if (iconName === 'sprout') return <SproutIcon size={size} />;
  return <SeedIcon size={size} />;
}

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
      width={110}
      height={95}
    >
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all duration-200 shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="absolute -top-3 px-3 py-0.5 rounded-full text-xs font-bold text-white shadow" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-30 mt-2" style={{ backgroundColor: color }}>
        <span className="text-xl font-bold text-white">📥</span>
      </div>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

interface TeachingScreenProps {
  onComplete: () => void;
}

function TeachingScreen({ onComplete }: TeachingScreenProps) {
  const [slide, setSlide] = useState(0);

  const handleNext = () => {
    audioManager.play('tap');
    if (slide < TEACHING_SLIDES.length - 1) {
      setSlide(slide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (slide > 0) setSlide(slide - 1);
  };

  const current = TEACHING_SLIDES[slide];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 z-30">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-300 p-8 flex flex-col items-center relative overflow-hidden">
        {/* Header decoration */}
        <div className={`w-full py-3 px-6 rounded-2xl bg-gradient-to-r ${current.bgColor} text-white flex items-center justify-between shadow-md mb-6`}>
          <span className="text-3xl">{current.emoji}</span>
          <span className="text-lg font-extrabold tracking-wide">Gardener Gita&apos;s Math School</span>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full font-bold">{slide + 1} / {TEACHING_SLIDES.length}</span>
        </div>

        {/* Slide Content */}
        <motion.div
          key={slide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center my-4"
        >
          <h2 className="text-2xl font-black text-gray-800 mb-3">{current.title}</h2>
          <p className="text-base text-gray-600 font-medium leading-relaxed max-w-md mx-auto">{current.text}</p>
        </motion.div>

        {/* Progress dots */}
        <div className="flex gap-2 my-6">
          {TEACHING_SLIDES.map((_, i) => (
            <div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-emerald-500' : 'w-3 bg-gray-300'}`} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handlePrev}
            disabled={slide === 0}
            className={`px-6 py-2 rounded-2xl font-bold text-white shadow-md transition-all ${slide === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600 active:scale-95'}`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg hover:from-emerald-600 hover:to-teal-700 active:scale-95 transition-all text-lg"
          >
            {slide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main MulDivGame Component ────────────────────────────────

export interface MulDivGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MulDivGame({ width = 720, height = 560, onComplete }: MulDivGameProps) {
  type GameScreen = 'teaching' | 'play';
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speechText, setSpeechText] = useState<string | null>('Welcome to the Garden! Let us grow math!');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  // Drag and drop state for sort challenges
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [, setActiveDragId] = useState<string | null>(null);

  // Inactivity timer ref
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const challenge = CHALLENGES[currentChallengeIndex];

  // Reset positions when challenge changes
  useEffect(() => {
    if (challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems.forEach((item, index) => {
        // Arrange items neatly in a row at the bottom
        initialPos[item.id] = { x: 50 + index * 115, y: 390 };
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [currentChallengeIndex, challenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
      setMascotMood('thinking');
      setSpeechText(challenge.hint);
      speechManager.speak(challenge.hint);
    }, 10000);
  }, [challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  // Handle multiple choice answer
  const handleOptionClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    resetInactivityTimer();

    if (option === challenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSpeechText('Correct! Fantastic math growing!');
      speechManager.speak('Correct! Fantastic math growing!');
      setStars(prev => prev + 1);

      setTimeout(() => {
        setSparklePos(null);
        if (currentChallengeIndex < CHALLENGES.length - 1) {
          setCurrentChallengeIndex(prev => prev + 1);
          setMascotMood('happy');
          setSpeechText('Next challenge! You can do it!');
          speechManager.speak('Next challenge! You can do it!');
          setShowHint(false);
        } else {
          setGameFinished(true);
          setShowConfetti(true);
          setShowSuccessBanner(true);
          audioManager.play('celebration');
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1200);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setSpeechText(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setShowHint(true);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setActiveDragId(id);
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    setActiveDragId(null);
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Find bin under drop coordinate
    // Bins layout: 5 bins horizontally across the middle y: [160, 280] approx
    const binWidth = 110;
    const binHeight = 130;
    const binY = 180;

    const binIndex = challenge.bins.findIndex((_, index) => {
      const binX = 50 + index * 125;
      return x >= binX - 20 && x <= binX + binWidth + 20 && y >= binY - 20 && y <= binY + binHeight + 20;
    });

    if (binIndex !== -1) {
      const targetBin = challenge.bins[binIndex];
      if (item.correctBin === targetBin.id) {
        audioManager.play('drop-correct');
        setItemPositions(prev => ({ ...prev, [id]: { x: 50 + binIndex * 125 + 10, y: binY + 30 } }));
        setPlacedItems(prev => {
          const updated = { ...prev, [id]: true };
          // Check if all items placed
          const allPlaced = challenge.sortItems?.every(si => updated[si.id]);
          if (allPlaced) {
            audioManager.play('success');
            setMascotMood('celebrate');
            setSpeechText('All sorted correctly! Amazing job!');
            speechManager.speak('All sorted correctly! Amazing job!');
            setStars(prevStars => prevStars + 1);

            setTimeout(() => {
              if (currentChallengeIndex < CHALLENGES.length - 1) {
                setCurrentChallengeIndex(prevIdx => prevIdx + 1);
                setMascotMood('happy');
                setSpeechText('Ready for the next garden challenge!');
                speechManager.speak('Ready for the next garden challenge!');
                setShowHint(false);
              } else {
                setGameFinished(true);
                setShowConfetti(true);
                setShowSuccessBanner(true);
                audioManager.play('celebration');
                const finalScore = Math.max(0, 100 - errors * 5);
                if (onComplete) onComplete(finalScore);
              }
            }, 1500);
          }
          return updated;
        });
        return true;
      } else {
        audioManager.play('drop-wrong');
        setErrors(prev => prev + 1);
        setMascotMood('thinking');
        setSpeechText(challenge.misconception);
        speechManager.speak(challenge.misconception);
        setShowHint(true);
        return false;
      }
    } else {
      audioManager.play('drop-wrong');
      return false;
    }
  };

  const handleManualHint = () => {
    setShowHint(true);
    audioManager.play('hint');
    setMascotMood('thinking');
    setSpeechText(challenge.hint);
    speechManager.speak(challenge.hint);
  };

  return (
    <div
      className="relative select-none overflow-hidden font-sans rounded-3xl shadow-2xl border-4 border-emerald-400 bg-emerald-900"
      style={{ width, height }}
    >
      {/* Background Scene */}
      <GardenScene width={width} height={height} />

      {/* Teaching Screen Modal */}
      {screen === 'teaching' && (
        <TeachingScreen onComplete={() => setScreen('play')} />
      )}

      {/* Mascot */}
      <GardenerGita mood={mascotMood} speaking={speechText} />

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-20 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border-2 border-emerald-200">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌻</span>
          <span className="text-base font-extrabold text-emerald-900">Mul & Div Garden</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            <span className="text-xs font-bold text-emerald-800">Challenge {currentChallengeIndex + 1}/8</span>
          </div>
          <StarRow count={stars} total={8} />
        </div>
      </div>

      {/* Challenge Area */}
      {!gameFinished && screen === 'play' && (
        <div className="absolute inset-x-4 top-24 bottom-6 flex flex-col items-center justify-between z-10 px-4 pb-4">
          {/* Question Box */}
          <motion.div
            key={currentChallengeIndex}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-3 border-emerald-300 text-center"
          >
            <h3 className="text-lg font-black text-gray-800 leading-snug">{challenge.question}</h3>
          </motion.div>

          {/* Multiple Choice Options */}
          {challenge.answer !== 'sort' && (
            <div className="grid grid-cols-3 gap-4 w-full max-w-lg my-auto">
              {challenge.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={e => handleOptionClick(opt, e)}
                  className="py-5 px-4 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xl rounded-2xl shadow-lg border-2 border-emerald-300 flex items-center justify-center transition-all"
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort / Drag and Drop Area */}
          {challenge.answer === 'sort' && challenge.sortItems && challenge.bins && (
            <div className="relative w-full h-[280px] my-auto">
              {/* Bins */}
              {challenge.bins.map((bin, index) => {
                const binWidth = 110;
                const binHeight = 135;
                const binX = 50 + index * 125;
                const binY = 170;
                return (
                  <SortBin
                    key={bin.id}
                    id={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={binX}
                    y={binY}
                    width={binWidth}
                    height={binHeight}
                    isHovering={false}
                  />
                );
              })}

              {/* Draggable Cards */}
              {challenge.sortItems.map(item => {
                const pos = itemPositions[item.id] || { x: 50, y: 390 };
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

          {/* Hint Button */}
          <div className="w-full flex justify-between items-center px-4">
            <button
              onClick={handleManualHint}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-xl shadow-md border-2 border-amber-500 text-xs flex items-center gap-1 transition-all"
            >
              💡 Need a Hint?
            </button>
            <span className="text-xs text-white font-bold bg-black/30 px-3 py-1 rounded-full">
              Errors: {errors}
            </span>
          </div>
        </div>
      )}

      {/* Feedback Overlays */}
      {showHint && (
        <HintBubble
          message={challenge.hint}
          onComplete={() => setShowHint(false)}
        />
      )}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}

      {showSuccessBanner && (
        <SuccessBanner
          message="Outstanding! You are a Multiplication & Division Garden Hero! 🌻🌱"
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
