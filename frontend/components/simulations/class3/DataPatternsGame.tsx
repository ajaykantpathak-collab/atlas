'use client';

/**
 * DataPatternsGame — Data Collection, Pictographs, Tally Marks, and Patterns
 *
 * CISCE Nodes: c3_math_036 (Data collection, pictographs, tables),
 *              c3_math_037 (Classification and comparison of data),
 *              c3_math_038 (Tally marks, pictograph representation, conclusions),
 *              c3_math_039 (Patterns with unit of repeat),
 *              c3_math_040 (Extension of pattern using rule)
 *
 * ELI5: "Data is facts we collect by counting or asking questions! We can show
 *   data using tally marks (bundles of 5 with a slash) and pictographs (little
 *   pictures). Patterns have a rule or repeating unit — like red-blue-red-blue
 *   or 2, 4, 6, 8 where we add 2 every time!"
 *
 * Misconceptions (from enrichment):
 *   1. "Tally marks are just random lines" → "No! Tally marks are grouped in fives —
 *      four vertical lines with a diagonal fifth line cutting across them!"
 *   2. "A pattern can be anything" → "No! A pattern follows a strict rule or repeating unit!"
 *   3. "In 2, 4, 6, 8 the next number is 9" → "No! The rule is add 2, so 8 + 2 = 10!"
 *   4. "Pictograph and bar chart are the same" → "No! Pictograph uses pictures/symbols,
 *      bar chart uses bars of different heights!"
 *   5. "Data is only numbers" → "No! Data can be colors, shapes, fruits, or observations!"
 *
 * Story: "Help Data Detective Dinesh sort data, count with tally marks, and solve
 *   number and shape patterns! Become a Master Data Detective!"
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
    title: 'What is Data? 📊',
    text: 'Data is information we gather by asking questions, counting, or observing! For example, counting favourite fruits or vehicles outside school.',
    emoji: '📊',
    bgColor: 'from-gold-500 to-gold-600',
    spoken: 'Data is information we gather by asking questions, counting, or observing! For example, counting favourite fruits or vehicles outside school.',
  },
  {
    title: 'Pictographs & Tables 🍎',
    text: 'A pictograph uses pictures or symbols to show data! A table organizes data in rows and columns. Each picture stands for one or more items.',
    emoji: '🖼️',
    bgColor: 'from-gold-500 to-purple-600',
    spoken: 'A pictograph uses pictures or symbols to show data! A table organizes data in rows and columns. Each picture stands for one or more items.',
  },
  {
    title: 'Tally Marks 📏',
    text: 'Tally marks help us count quickly! We draw 4 vertical lines, and the 5th line cuts across diagonally. Bundles of 5 make counting super easy!',
    emoji: '📝',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'Tally marks help us count quickly! We draw four vertical lines, and the fifth line cuts across diagonally. Bundles of five make counting super easy!',
  },
  {
    title: 'Patterns with Unit of Repeat 🔄',
    text: 'A pattern is a sequence that repeats! The smallest block that repeats identically is the unit of repeat — like Red-Blue, Red-Blue, Red-Blue!',
    emoji: '🔄',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'A pattern is a sequence that repeats! The smallest block that repeats identically is the unit of repeat, like red-blue, red-blue, red-blue!',
  },
  {
    title: 'Extending Patterns Using Rules 📈',
    text: 'Some patterns grow or shrink by a rule! Like 2, 4, 6, 8 where the rule is "add 2"! We check the difference between neighbours to find the rule!',
    emoji: '📈',
    bgColor: 'from-rose-500 to-pink-600',
    spoken: 'Some patterns grow or shrink by a rule! Like 2, 4, 6, 8 where the rule is add 2! We check the difference between neighbours to find the rule!',
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

// ─── Challenges (8 progressive: easy → hard) ──────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is a PICTOGRAPH?',
    answer: 'A graph that uses pictures or symbols to show data',
    options: [
      'A graph that uses pictures or symbols to show data',
      'A graph that uses only numbers',
      'A type of physical map',
    ],
    hint: 'Think about pictures! "Picto" means picture.',
    misconception: 'A pictograph uses pictures or symbols to represent data visually! It is not just numbers or a map.',
  },
  {
    type: 'identify',
    question: 'What is DATA?',
    answer: 'Information we collect and organize',
    options: [
      'Information we collect and organize',
      'A type of wild animal',
      'A geometric shape',
    ],
    hint: 'Data is facts or information gathered by counting or asking questions.',
    misconception: 'Data is simply a collection of facts or information that we gather to understand things better — not animals or shapes!',
  },
  {
    type: 'sort',
    question: 'Drag each data term to its correct definition!',
    answer: 'sort',
    options: [],
    hint: 'Match pictograph with pictures, tally with lines, table with rows/columns!',
    misconception: 'Each data tool has a specific job: pictographs use pictures, tally marks use bundled lines, tables use rows and columns!',
    sortItems: [
      { id: 'picto', label: 'Pictograph', icon: 'pictograph', correctBin: 'bin-picto' },
      { id: 'tally', label: 'Tally Marks', icon: 'tally', correctBin: 'bin-tally' },
      { id: 'table', label: 'Data Table', icon: 'table', correctBin: 'bin-table' },
      { id: 'bar', label: 'Bar Chart', icon: 'bar', correctBin: 'bin-bar' },
    ],
    bins: [
      { id: 'bin-picto', label: 'Uses Pictures 🖼️', color: '#3B82F6' },
      { id: 'bin-tally', label: 'Uses Bundled Lines 📏', color: '#10B981' },
      { id: 'bin-table', label: 'Rows & Columns 📊', color: '#8B5CF6' },
      { id: 'bin-bar', label: 'Uses Bars 📶', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'How do you write the number 7 in tally marks?',
    answer: '5 with a cross + 2 more lines',
    options: [
      '5 with a cross + 2 more lines',
      '7 straight vertical lines',
      '7 small circles',
    ],
    hint: 'Remember: bundles of 5 have 4 vertical lines and a 5th diagonal slash!',
    misconception: 'Tally marks are grouped in fives! A bundle of 5 (4 vertical + 1 diagonal) plus 2 vertical lines equals 7: |||| | ||.',
  },
  {
    type: 'sort',
    question: 'Drag each tally count to its correct number!',
    answer: 'sort',
    options: [],
    hint: 'Each crossed group is 5. Add any extra vertical lines!',
    misconception: 'Count carefully: every crossed bundle is 5. Add leftover vertical lines to get the total count!',
    sortItems: [
      { id: 't4', label: '|||| (4 lines)', icon: 'tally4', correctBin: 'bin-4' },
      { id: 't5', label: '|||| + cross (5)', icon: 'tally5', correctBin: 'bin-5' },
      { id: 't7', label: 'Bundle + 2 lines (7)', icon: 'tally7', correctBin: 'bin-7' },
      { id: 't10', label: 'Two bundles (10)', icon: 'tally10', correctBin: 'bin-10' },
    ],
    bins: [
      { id: 'bin-4', label: '4', color: '#EF4444' },
      { id: 'bin-5', label: '5', color: '#3B82F6' },
      { id: 'bin-7', label: '7', color: '#10B981' },
      { id: 'bin-10', label: '10', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'What comes next in the pattern: 2, 4, 6, 8, __?',
    answer: '10',
    options: ['10', '9', '16'],
    hint: 'Find the rule! How do you get from 2 to 4? Add 2!',
    misconception: 'The rule is "add 2" (growing pattern)! So 8 + 2 = 10. It is not 9!',
  },
  {
    type: 'sort',
    question: 'Drag each number pattern to its next term!',
    answer: 'sort',
    options: [],
    hint: 'Look at the rule for each sequence: add 2, add 5, add 10, or subtract 10!',
    misconception: 'Verify the rule on neighbouring terms! If the pattern is 5, 10, 15, 20, the rule is add 5, so the next term is 25!',
    sortItems: [
      { id: 'p1', label: '2, 4, 6, 8 → ?', icon: 'num2', correctBin: 'bin-10' },
      { id: 'p2', label: '5, 10, 15, 20 → ?', icon: 'num5', correctBin: 'bin-25' },
      { id: 'p3', label: '10, 20, 30, 40 → ?', icon: 'num10', correctBin: 'bin-50' },
      { id: 'p4', label: '100, 90, 80, 70 → ?', icon: 'numsub', correctBin: 'bin-60' },
    ],
    bins: [
      { id: 'bin-10', label: '10', color: '#3B82F6' },
      { id: 'bin-25', label: '25', color: '#10B981' },
      { id: 'bin-50', label: '50', color: '#8B5CF6' },
      { id: 'bin-60', label: '60', color: '#F59E0B' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each shape/color pattern to what comes next!',
    answer: 'sort',
    options: [],
    hint: 'Find the repeating unit or rule in the shapes and colors!',
    misconception: 'Look closely at the repeating unit! In Circle-Square-Circle-Square, the next shape is Circle!',
    sortItems: [
      { id: 's1', label: 'Circle-Square-Circle-Square → ?', icon: 'shape1', correctBin: 'bin-circle' },
      { id: 's2', label: 'Red-Blue-Red-Blue → ?', icon: 'shape2', correctBin: 'bin-red' },
      { id: 's3', label: 'Star-Star-Dot-Star-Star → ?', icon: 'shape3', correctBin: 'bin-dot' },
      { id: 's4', label: 'Triangle-Square-Triangle-Square → ?', icon: 'shape4', correctBin: 'bin-tri' },
    ],
    bins: [
      { id: 'bin-circle', label: 'Circle ⭕', color: '#3B82F6' },
      { id: 'bin-red', label: 'Red 🔴', color: '#EF4444' },
      { id: 'bin-dot', label: 'Dot 🔵', color: '#10B981' },
      { id: 'bin-tri', label: 'Triangle 🔺', color: '#F59E0B' },
    ],
  },
];

// ─── Custom SVG Icons for Data & Patterns ─────────────────────

function PictographIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <circle cx="12" cy="14" r="4" fill="#EF4444" />
      <circle cx="20" cy="14" r="4" fill="#EF4444" />
      <circle cx="28" cy="14" r="4" fill="#EF4444" />
      <circle cx="12" cy="26" r="4" fill="#22C55E" />
      <circle cx="20" cy="26" r="4" fill="#22C55E" />
    </svg>
  );
}

function TallyMarksIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
      <line x1="10" y1="10" x2="10" y2="30" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      <line x1="15" y1="10" x2="15" y2="30" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="10" x2="20" y2="30" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      <line x1="25" y1="10" x2="25" y2="30" stroke="#047857" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="12" x2="27" y2="28" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

function TableIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2" />
      <line x1="4" y1="14" x2="36" y2="14" stroke="#7C3AED" strokeWidth="2" />
      <line x1="20" y1="14" x2="20" y2="36" stroke="#7C3AED" strokeWidth="2" />
      <circle cx="12" cy="24" r="3" fill="#8B5CF6" />
      <circle cx="28" cy="24" r="3" fill="#8B5CF6" />
      <circle cx="12" cy="31" r="3" fill="#8B5CF6" />
    </svg>
  );
}

function BarChartIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <rect x="9" y="20" width="5" height="12" fill="#F59E0B" rx="1" />
      <rect x="17" y="12" width="5" height="20" fill="#EF4444" rx="1" />
      <rect x="25" y="16" width="5" height="16" fill="#3B82F6" rx="1" />
      <line x1="7" y1="32" x2="33" y2="32" stroke="#92400E" strokeWidth="2" />
    </svg>
  );
}

function Tally4Icon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <line x1="10" y1="12" x2="10" y2="28" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="12" x2="16" y2="28" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="22" y1="12" x2="22" y2="28" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <line x1="28" y1="12" x2="28" y2="28" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Tally5Icon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <line x1="9" y1="12" x2="9" y2="28" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="14" y1="12" x2="14" y2="28" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="19" y1="12" x2="19" y2="28" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="24" y1="12" x2="24" y2="28" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="7" y1="14" x2="27" y2="26" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Tally7Icon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
      <line x1="8" y1="12" x2="8" y2="28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="12" x2="12" y2="28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="12" x2="16" y2="28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="12" x2="20" y2="28" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="14" x2="23" y2="26" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="27" y1="12" x2="27" y2="28" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="31" y1="12" x2="31" y2="28" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function Tally10Icon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2" />
      <line x1="7" y1="12" x2="7" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="12" x2="10" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="12" x2="13" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="12" x2="16" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="14" x2="19" y2="26" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="12" x2="23" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="26" y1="12" x2="26" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="29" y1="12" x2="29" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="12" x2="32" y2="28" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="14" x2="34" y2="26" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NumPatternIcon({ size = 40, text }: { size?: number; text: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="2" y="6" width="36" height="28" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <text x="20" y="24" textAnchor="middle" dominantBaseline="middle" fill="#92400E" fontSize="12" fontWeight="bold">
        {text}
      </text>
    </svg>
  );
}

function ShapePatternIcon({ size = 40, type }: { size?: number; type: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      {type === 'circle' && <circle cx="20" cy="20" r="10" fill="#3B82F6" />}
      {type === 'red' && <circle cx="20" cy="20" r="10" fill="#EF4444" />}
      {type === 'dot' && <circle cx="20" cy="20" r="6" fill="#10B981" />}
      {type === 'tri' && <polygon points="20,10 30,28 10,28" fill="#F59E0B" />}
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 40) {
  switch (icon) {
    case 'pictograph': return <PictographIcon size={size} />;
    case 'tally': return <TallyMarksIcon size={size} />;
    case 'table': return <TableIcon size={size} />;
    case 'bar': return <BarChartIcon size={size} />;
    case 'tally4': return <Tally4Icon size={size} />;
    case 'tally5': return <Tally5Icon size={size} />;
    case 'tally7': return <Tally7Icon size={size} />;
    case 'tally10': return <Tally10Icon size={size} />;
    case 'num2': return <NumPatternIcon size={size} text="2,4,6,8" />;
    case 'num5': return <NumPatternIcon size={size} text="5,10,15" />;
    case 'num10': return <NumPatternIcon size={size} text="10,20,30" />;
    case 'numsub': return <NumPatternIcon size={size} text="100,90,80" />;
    case 'shape1': return <ShapePatternIcon size={size} type="circle" />;
    case 'shape2': return <ShapePatternIcon size={size} type="red" />;
    case 'shape3': return <ShapePatternIcon size={size} type="dot" />;
    case 'shape4': return <ShapePatternIcon size={size} type="tri" />;
    default: return <PictographIcon size={size} />;
  }
}

// ─── Mascot: Data Detective Dinesh ────────────────────────────

function DineshMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[210px] border-2 border-amber-300"
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
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="dinesh-suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="dinesh-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Magnifying glass */}
          <g transform="translate(48, 45) rotate(-20)">
            <circle cx="12" cy="12" r="10" fill="none" stroke="#64748B" strokeWidth="3" />
            <circle cx="12" cy="12" r="8" fill="#E0F2FE" opacity="0.6" />
            <line x1="5" y1="19" x2="-2" y2="26" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          </g>
          {/* Body / Coat */}
          <path d="M22 55 L37 60 L52 55 L56 82 L18 82 Z" fill="url(#dinesh-suit)" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Clipboard */}
          <rect x="25" y="62" width="24" height="20" rx="2" fill="#FEF3C7" stroke="#B45309" strokeWidth="1" />
          <line x1="29" y1="68" x2="45" y2="68" stroke="#D97706" strokeWidth="1.5" />
          <line x1="29" y1="73" x2="41" y2="73" stroke="#D97706" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37" cy="32" r="18" fill="url(#dinesh-face)" stroke="#D97706" strokeWidth="1.5" />
          {/* Detective Cap */}
          <path d="M17 25 Q37 15 57 25 L53 18 Q37 10 21 18 Z" fill="#1E40AF" />
          <path d="M25 24 Q37 20 49 24 L52 28 Q37 25 22 28 Z" fill="#1E40AF" />
          {/* Eyes */}
          <circle cx="30" cy="30" r="3.5" fill="white" />
          <circle cx="44" cy="30" r="3.5" fill="white" />
          <circle cx="31" cy="31" r="2" fill="#1E293B" />
          <circle cx="43" cy="31" r="2" fill="#1E293B" />
          {/* Smile / Curious mouth */}
          <path d="M32 40 Q37 44 42 40" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Shoes */}
          <ellipse cx="27" cy="86" rx="6" ry="3" fill="#1E293B" />
          <ellipse cx="47" cy="86" rx="6" ry="3" fill="#1E293B" />
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

// ─── Data & Patterns Scene Background ─────────────────────────

function DataSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky / Detective Board gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="detective-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#292524" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#detective-bg)" />
        {/* Corkboard grid pattern */}
        <g stroke="#475569" strokeWidth="0.5" opacity="0.3">
          {Array.from({ length: Math.ceil(width / 40) }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2={height} />
          ))}
          {Array.from({ length: Math.ceil(height / 40) }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 40} x2={width} y2={i * 40} />
          ))}
        </g>
        {/* Floor desk */}
        <rect x="0" y={height - 50} width={width} height="50" fill="url(#floor-grad)" />
        <line x1="0" y1={height - 50} x2={width} y2={height - 50} stroke="#78350F" strokeWidth="3" />
      </svg>

      {/* Floating decorative math elements */}
      <motion.div className="absolute top-8 left-12 opacity-25" animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" />
          <text x="30" y="36" textAnchor="middle" fill="#38BDF8" fontSize="24" fontWeight="bold">📊</text>
        </svg>
      </motion.div>

      <motion.div className="absolute top-16 right-36 opacity-25" animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <rect x="5" y="5" width="50" height="50" rx="8" fill="none" stroke="#34D399" strokeWidth="3" />
          <line x1="5" y1="20" x2="55" y2="20" stroke="#34D399" strokeWidth="2" />
          <line x1="20" y1="20" x2="20" y2="55" stroke="#34D399" strokeWidth="2" />
        </svg>
      </motion.div>
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 ${placed ? 'opacity-40 border-gray-400 bg-gray-100' : 'border-amber-400 bg-white'} px-2 py-2`} style={{ width: 120, height: 95 }}>
        {renderSortIcon(icon, 38)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-200 border-4 ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-lg'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: isHovering ? '#F59E0B' : color,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 text-white font-bold shadow-md" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-black text-white text-center leading-tight drop-shadow">{label}</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStartPlay }: { onStartPlay: () => void }) {
  const [currSlide, setCurrSlide] = useState(0);

  useEffect(() => {
    speechManager.speak(TEACHING_SLIDES[currSlide].spoken);
  }, [currSlide]);

  const handleNext = () => {
    audioManager.play('tap');
    if (currSlide < TEACHING_SLIDES.length - 1) {
      setCurrSlide(prev => prev + 1);
    } else {
      onStartPlay();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (currSlide > 0) {
      setCurrSlide(prev => prev - 1);
    }
  };

  const slide = TEACHING_SLIDES[currSlide];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-gradient-to-br from-slate-900 via-gold-950 to-gold-950 text-white select-none">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between max-w-2xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          <h1 className="text-xl font-black tracking-wide text-amber-300">Data Detective Academy</h1>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === currSlide ? 'bg-amber-400 w-6' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      {/* Main Card */}
      <motion.div
        key={currSlide}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-xl bg-gradient-to-br ${slide.bgColor} rounded-3xl p-8 shadow-2xl border-4 border-white/20 flex flex-col items-center text-center`}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-4 bg-white/20 p-4 rounded-2xl shadow-inner"
        >
          {slide.emoji}
        </motion.div>
        <h2 className="text-2xl font-black mb-3 text-white drop-shadow-md">{slide.title}</h2>
        <p className="text-base font-medium text-white/90 leading-relaxed max-w-md">{slide.text}</p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-xl flex justify-between items-center pb-2">
        <button
          onClick={handlePrev}
          disabled={currSlide === 0}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all ${
            currSlide === 0 ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30 text-white'
          }`}
        >
          ⬅️ Back
        </button>

        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl font-black text-base bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-gray-900 shadow-xl transform active:scale-95 transition-all flex items-center gap-2"
        >
          {currSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface DataPatternsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function DataPatternsGame({ width = 720, height = 560, onComplete }: DataPatternsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Let's solve data and patterns together!");

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  // Inactivity timer for auto-hint
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Reset sort state when challenge changes
  useEffect(() => {
    setPlacedItems({});
    setHintMsg(null);
    setSuccessMsg(null);
    setMascotSpeech(`Challenge ${challengeIdx + 1}: ${currentChallenge.question}`);
    speechManager.speak(currentChallenge.question);

    // Reset inactivity timer
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleHint();
    }, 10000);

    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  const handleHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setMascotSpeech(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  const handleAnswerSelect = (option: string) => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech("Fantastic! Spot on!");
      speechManager.speak("Fantastic! Spot on!");
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars(prev => prev + 1);
      setSuccessMsg("Correct! Great detective work! ⭐");
    } else {
      // Wrong / Misconception
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Find bin under drop position
    // Bins layout: let's compute bin boxes based on index
    const binWidth = 130;
    const binHeight = 85;
    const startX = (width - currentChallenge.bins.length * 140) / 2;
    const binY = 320;

    let droppedInBin: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * 140;
      const by = binY;
      if (x + 60 >= bx && x + 60 <= bx + binWidth && y + 45 >= by && y + 45 <= by + binHeight) {
        droppedInBin = bin.id;
      }
    });

    if (droppedInBin && droppedInBin === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      const allDone = currentChallenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech("All sorted correctly! Brilliant!");
        speechManager.speak("All sorted correctly! Brilliant!");
        setSparklePos({ x: width / 2, y: height / 2 });
        setStars(prev => prev + 1);
        setSuccessMsg("All sorted perfectly! ⭐");
      }
      return true;
    } else {
      // Wrong bin
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  const handleAdvance = () => {
    setSuccessMsg(null);
    setHintMsg(null);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotSpeech("You are a Master Data Detective!");
      speechManager.speak("Congratulations! You are a Master Data Detective!");
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStartPlay={() => setScreen('play')} />;
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 select-none overflow-hidden" style={{ width, height }}>
      <DataSceneBackground width={width} height={height} />
      <DineshMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between bg-slate-900/80 backdrop-blur px-4 py-2.5 rounded-2xl border border-slate-700 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <div>
            <h2 className="text-xs font-bold text-slate-400">Data Detective Academy</h2>
            <p className="text-sm font-black text-amber-300">Challenge {challengeIdx + 1} of {CHALLENGES.length}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <StarRow count={stars} total={CHALLENGES.length} />
          <button
            onClick={handleHint}
            className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 rounded-xl text-amber-300 font-bold text-xs flex items-center gap-1 transition-all"
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Challenge Question Card */}
      <div className="relative z-10 w-full max-w-xl bg-slate-900/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-slate-700 text-center my-2">
        <h3 className="text-base font-black text-white leading-snug">{currentChallenge.question}</h3>
      </div>

      {/* Interactive Area */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center max-w-2xl px-2 my-1">
        {currentChallenge.type === 'identify' && (
          <div className="w-full grid grid-cols-1 gap-3 max-w-md">
            {currentChallenge.options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(opt)}
                className="w-full py-3 px-5 bg-gradient-to-r from-slate-800 to-gold-950 hover:from-slate-700 hover:to-gold-900 border-2 border-gold-500/40 hover:border-gold-400 rounded-2xl text-white font-bold text-sm shadow-lg transition-all text-left flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-xl bg-gold-500/30 flex items-center justify-center text-gold-300 font-black text-xs shrink-0">
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="flex-1">{opt}</span>
              </motion.button>
            ))}
          </div>
        )}

        {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
          <div className="relative w-full h-[280px] bg-slate-950/40 rounded-3xl border border-slate-800 p-2">
            {/* Render Bins at bottom */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 px-3">
              {currentChallenge.bins.map((bin, idx) => {
                const binWidth = Math.floor((width - 40) / currentChallenge.bins!.length) - 8;
                return (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={0}
                    y={0}
                    width={Math.min(binWidth, 140)}
                    height={80}
                    isHovering={false}
                  />
                );
              })}
            </div>

            {/* Render Draggable Items at top */}
            <div className="absolute top-3 left-0 right-0 flex flex-wrap justify-center gap-4 px-4">
              {currentChallenge.sortItems.map((item, idx) => {
                const isPlaced = !!placedItems[item.id];
                const startX = (width - currentChallenge.sortItems!.length * 130) / 2 + (idx % 4) * 130;
                const startY = 15;
                return (
                  <div key={item.id} className="relative" style={{ width: 120, height: 95 }}>
                    <SortCard
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={0}
                      y={0}
                      placed={isPlaced}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Feedback & Overlays */}
      <AnimatePresence>
        {hintMsg && !successMsg && (
          <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />
        )}
        {successMsg && (
          <SuccessBanner message={successMsg} onComplete={handleAdvance} />
        )}
        {showConfetti && (
          <Confetti onComplete={() => setShowConfetti(false)} />
        )}
        {sparklePos && (
          <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
