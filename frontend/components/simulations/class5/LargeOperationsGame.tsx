'use client';

/**
 * LargeOperationsGame — Class 5 Mathematics (CISCE / ICSE Curriculum)
 *
 * CISCE Nodes:
 * - c5_math_008: Construction of Multiplication Tables - 2 to 20
 * - c5_math_009: Addition, Subtraction, Multiplication, Division by 2-digit division
 * - c5_math_010: Word problems
 * - c5_math_011: Roman numerals for large numbers
 * - c5_math_012: Standard algorithms for addition subtraction and multiplication of large numbers
 * - c5_math_013: Division of given number by another number (up to 2 digits)
 * - c5_math_014: Framing and solving Problem from real life contexts involving number operations
 * - c5_math_015: Estimation of the sum, difference, product and quotient of two or more numbers
 *
 * Mascot: Banker Biju — a banker with a blue suit, an abacus badge,
 * a calculator, and rupee coins.
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

function AbacusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="8" width="42" height="34" fill="#92400E" rx="3" stroke="#451A03" strokeWidth="2" />
      <line x1="12" y1="8" x2="12" y2="42" stroke="#78350F" strokeWidth="2" />
      <line x1="25" y1="8" x2="25" y2="42" stroke="#78350F" strokeWidth="2" />
      <line x1="38" y1="8" x2="38" y2="42" stroke="#78350F" strokeWidth="2" />
      <circle cx="12" cy="16" r="3" fill="#EF4444" />
      <circle cx="12" cy="24" r="3" fill="#3B82F6" />
      <circle cx="25" cy="20" r="3" fill="#10B981" />
      <circle cx="25" cy="28" r="3" fill="#F59E0B" />
      <circle cx="38" cy="16" r="3" fill="#8B5CF6" />
    </svg>
  );
}

function CalculatorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="4" width="34" height="42" fill="#1E293B" rx="6" />
      <rect x="12" y="8" width="26" height="10" fill="#38BDF8" rx="2" />
      <text x="25" y="16" fontSize="8" fill="#0F172A" textAnchor="middle" fontWeight="bold">3456</text>
      <circle cx="17" cy="24" r="3" fill="#94A3B8" />
      <circle cx="25" cy="24" r="3" fill="#94A3B8" />
      <circle cx="33" cy="24" r="3" fill="#F59E0B" />
      <circle cx="17" cy="32" r="3" fill="#94A3B8" />
      <circle cx="25" cy="32" r="3" fill="#94A3B8" />
      <circle cx="33" cy="32" r="3" fill="#10B981" />
      <circle cx="17" cy="40" r="3" fill="#94A3B8" />
      <circle cx="25" cy="40" r="3" fill="#94A3B8" />
      <circle cx="33" cy="40" r="3" fill="#EF4444" />
    </svg>
  );
}

function RomanIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="6" width="42" height="38" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
      <text x="25" y="22" fontSize="12" fill="#92400E" textAnchor="middle" fontWeight="bold">MCMLXXXVII</text>
      <text x="25" y="38" fontSize="10" fill="#B45309" textAnchor="middle">= 1987</text>
    </svg>
  );
}

function DivisionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M8 8 L42 42" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="14" cy="14" r="5" fill="#8B5CF6" />
      <circle cx="36" cy="36" r="5" fill="#8B5CF6" />
    </svg>
  );
}

function WordProblemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="6" width="38" height="38" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="4" />
      <line x1="12" y1="16" x2="38" y2="16" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="24" x2="32" y2="24" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="32" x2="36" y2="32" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      <text x="25" y="42" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="bold">=?</text>
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

function CoinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="35" rx="18" ry="8" fill="#D97706" />
      <ellipse cx="25" cy="30" rx="18" ry="8" fill="#F59E0B" />
      <ellipse cx="25" cy="25" rx="18" ry="8" fill="#FBBF24" />
      <text x="25" y="28" fontSize="10" fontWeight="bold" fill="#B45309" textAnchor="middle">₹</text>
    </svg>
  );
}

function TableIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="6" width="38" height="38" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="4" />
      <line x1="6" y1="18" x2="44" y2="18" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="20" y1="6" x2="20" y2="44" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="13" y="14" fontSize="9" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">15</text>
      <text x="32" y="14" fontSize="9" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">×2</text>
      <text x="13" y="30" fontSize="9" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">×3</text>
      <text x="32" y="30" fontSize="9" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">45</text>
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

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'abacus': return <AbacusIcon size={size} />;
    case 'calculator': return <CalculatorIcon size={size} />;
    case 'roman': return <RomanIcon size={size} />;
    case 'division': return <DivisionIcon size={size} />;
    case 'wordproblem': return <WordProblemIcon size={size} />;
    case 'estimate': return <EstimateIcon size={size} />;
    case 'coin': return <CoinIcon size={size} />;
    case 'table': return <TableIcon size={size} />;
    case 'multiply': return <MultiplyIcon size={size} />;
    case 'plus': return <PlusIcon size={size} />;
    case 'minus': return <MinusIcon size={size} />;
    case 'receipt': return <ReceiptIcon size={size} />;
    default: return <CalculatorIcon size={size} />;
  }
}

// ─── Bank Scene Background ────────────────────────────────────

function BankScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="bank-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="bank-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="bank-counter" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4D4D8" />
            <stop offset="100%" stopColor="#71717A" />
          </linearGradient>
        </defs>
        <rect width="720" height="400" fill="url(#bank-wall)" />
        {/* Bank sign */}
        <rect x="250" y="40" width="220" height="50" fill="#1E40AF" rx="6" />
        <text x="360" y="72" fontSize="20" fill="#FBBF24" textAnchor="middle" fontWeight="bold">BIJU&apos;S BANK</text>
        {/* Columns */}
        <rect x="120" y="110" width="20" height="200" fill="#94A3B8" rx="2" />
        <rect x="580" y="110" width="20" height="200" fill="#94A3B8" rx="2" />
        {/* Vault */}
        <rect x="300" y="120" width="120" height="100" fill="#475569" rx="8" />
        <circle cx="360" cy="170" r="25" fill="#334155" stroke="#1E293B" strokeWidth="3" />
      <circle cx="360" cy="170" r="15" fill="#64748B" />
      <line x1="360" y1="155" x2="360" y2="185" stroke="#1E293B" strokeWidth="2" />
      <line x1="345" y1="170" x2="375" y2="170" stroke="#1E293B" strokeWidth="2" />
      {/* Decorative plants */}
      <rect x="80" y="300" width="20" height="40" fill="#92400E" rx="3" />
      <circle cx="90" cy="295" r="18" fill="#22C55E" />
      <circle cx="82" cy="285" r="12" fill="#16A34A" />
      <circle cx="98" cy="285" r="12" fill="#16A34A" />
      <rect x="620" y="300" width="20" height="40" fill="#92400E" rx="3" />
      <circle cx="630" cy="295" r="18" fill="#22C55E" />
      <circle cx="622" cy="285" r="12" fill="#16A34A" />
      <circle cx="638" cy="285" r="12" fill="#16A34A" />
      {/* Clock on wall */}
      <circle cx="600" cy="100" r="20" fill="white" stroke="#475569" strokeWidth="2" />
      <line x1="600" y1="100" x2="600" y2="85" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <line x1="600" y1="100" x2="612" y2="100" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="600" cy="100" r="2" fill="#1E293B" />
      <text x="600" y="92" fontSize="6" fill="#1E293B" textAnchor="middle" fontWeight="bold">12</text>
      <text x="617" y="103" fontSize="6" fill="#1E293B" textAnchor="middle" fontWeight="bold">3</text>
      {/* Counter */}
      <rect x="100" y="340" width="520" height="100" fill="url(#bank-counter)" rx="6" />
      <rect x="120" y="320" width="480" height="25" fill="#A1A1AA" rx="4" />
      {/* Floor */}
      <rect x="0" y="440" width="720" height="120" fill="#52525B" />
      </svg>
    </div>
  );
}

// ─── Mascot: Banker Biju ──────────────────────────────────────

function BankerBiju({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
        animate={mood === 'celebrate' ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] } : mood === 'happy' ? { y: [0, -4, 0] } : { rotate: [0, 5, 0] }}
        transition={{ duration: mood === 'celebrate' ? 0.6 : 2, repeat: mood === 'celebrate' ? 0 : Infinity, ease: 'easeInOut' }}
      >
        <svg width="85" height="100" viewBox="0 0 90 100">
          {/* Head */}
          <circle cx="45" cy="30" r="22" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Hair */}
          <path d="M23 28 Q25 10, 45 8 Q65 10, 67 28 Q60 18, 45 18 Q30 18, 23 28 Z" fill="#1E1B4B" />
          {/* Glasses */}
          <circle cx="36" cy="30" r="7" fill="none" stroke="#1E293B" strokeWidth="2" />
          <circle cx="54" cy="30" r="7" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="43" y1="30" x2="47" y2="30" stroke="#1E293B" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="36" cy="30" r="2.5" fill="#1E293B" />
          <circle cx="54" cy="30" r="2.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M40 42 Q45 47 50 42" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Blue Suit */}
          <path d="M25 52 L65 52 L75 95 L15 95 Z" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="2" />
          {/* White shirt collar */}
          <path d="M38 52 L45 60 L52 52 Z" fill="white" stroke="#E2E8F0" strokeWidth="1" />
          {/* Tie */}
          <path d="M43 60 L47 60 L49 75 L45 80 L41 75 Z" fill="#DC2626" />
          {/* Abacus badge */}
          <rect x="36" y="65" width="18" height="14" fill="#92400E" rx="2" />
          <circle cx="40" cy="70" r="2" fill="#EF4444" />
          <circle cx="46" cy="70" r="2" fill="#3B82F6" />
          <circle cx="50" cy="70" r="2" fill="#10B981" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ─────────────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-gold-200">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div key={i} initial={false} animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
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
  { title: "Welcome to Biju's Bank! 🏦", text: "Banker Biju uses multiplication tables 2 to 20, four operations on large numbers, and estimation every day! Let's learn how banks calculate with big numbers.", emoji: "🏦", bgColor: "from-gold-500 to-gold-600", spoken: "Welcome to Biju's Bank! Today we learn multiplication tables 2 to 20 and four operations on large numbers!" },
  { title: "Multiplication Tables 2 to 20 ✖️", text: "Tables are built by repeated addition. Table of 15: 15, 30, 45, 60... Table of 19: 19, 38, 57, 76... Spot patterns like the units digit of table 9 going down by 1 each time!", emoji: "✖️", bgColor: "from-emerald-500 to-teal-600", spoken: "Multiplication tables are built by repeated addition. Learn tables from 2 to 20 and spot the patterns!" },
  { title: "Standard Algorithms & 2-Digit Division ➗", text: "Add, subtract, and multiply large numbers using column methods. Divide by 2-digit divisors using long division. To divide 9450 by 25, break it: 9000÷25=360, 400÷25=16, 50÷25=2, total=378!", emoji: "➗", bgColor: "from-purple-500 to-pink-600", spoken: "Use standard algorithms for large number operations. Divide by 2-digit divisors using long division or breaking strategy!" },
  { title: "Roman Numerals for Large Numbers 🏛️", text: "Roman symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Subtraction rule: IV=4, IX=9, XL=40, XC=90, CD=400, CM=900. Write 1987 as MCMLXXXVII!", emoji: "🏛️", bgColor: "from-amber-500 to-orange-600", spoken: "Roman numerals use I, V, X, L, C, D, and M. The subtraction rule gives IV=4, IX=9, XL=40, XC=90, CD=400, CM=900!" },
  { title: "Word Problems & Estimation 📝", text: "Read the story, identify the operation, and solve! Frame your own word problems too. Estimate sums, differences, products, and quotients by rounding to check if answers are reasonable!", emoji: "📝", bgColor: "from-gold-500 to-gold-600", spoken: "Solve word problems by identifying the correct operation. Estimate answers by rounding to check if they are reasonable!" },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  { type: 'identify', question: "What is 15 × 6 using the multiplication table of 15?", answer: "90", options: ["90", "75", "85", "105"], hint: "Table of 15: 15, 30, 45, 60, 75, 90... Count 6 steps or multiply 15 × 6.", misconception: "The table of 15 is built by adding 15 each time: 15, 30, 45, 60, 75, 90. So 15 × 6 = 90. Practice tables from 2 to 20 for fast recall!" },
  { type: 'sort', question: "Drag each multiplication fact to its correct product!", answer: "sort", options: [], hint: "Use your tables: 12×8=96, 19×4=76, 15×7=105, 16×5=80!", misconception: "Multiplication tables are constructed by repeated addition. Match each factor pair to its correct product. Practice tables 2 to 20 regularly!", sortItems: [
    { id: 'm1', label: '12 × 8 = ?', icon: 'table', correctBin: 'p96' },
    { id: 'm2', label: '19 × 4 = ?', icon: 'table', correctBin: 'p76' },
    { id: 'm3', label: '15 × 7 = ?', icon: 'table', correctBin: 'p105' },
    { id: 'm4', label: '16 × 5 = ?', icon: 'table', correctBin: 'p80' },
  ], bins: [
    { id: 'p96', label: '96', color: '#3B82F6' },
    { id: 'p76', label: '76', color: '#10B981' },
    { id: 'p105', label: '105', color: '#F59E0B' },
    { id: 'p80', label: '80', color: '#8B5CF6' },
  ] },
  { type: 'identify', question: "Divide 9450 by 25 using the breaking strategy. What is the quotient?", answer: "378", options: ["378", "368", "388", "375"], hint: "Break 9450 = 9000 + 400 + 50. Divide each part by 25: 9000÷25=360, 400÷25=16, 50÷25=2. Add the quotients!", misconception: "Breaking strategy: 9450 ÷ 25 = (9000 ÷ 25) + (400 ÷ 25) + (50 ÷ 25) = 360 + 16 + 2 = 378. Verify: 25 × 378 = 9450. Dividend = divisor × quotient + remainder!" },
  { type: 'sort', question: "Drag each Roman numeral to its correct Hindu-Arabic value!", answer: "sort", options: [], hint: "L=50, C=100, D=500, M=1000. Subtraction rule: XL=40, XC=90, CD=400, CM=900!", misconception: "Roman symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. When a smaller symbol comes before a larger one, subtract: XL=40, XC=90, CD=400, CM=900.", sortItems: [
    { id: 'r1', label: 'XLIX', icon: 'roman', correctBin: 'v49' },
    { id: 'r2', label: 'XC', icon: 'roman', correctBin: 'v90' },
    { id: 'r3', label: 'CDXLVIII', icon: 'roman', correctBin: 'v448' },
    { id: 'r4', label: 'CM', icon: 'roman', correctBin: 'v900' },
  ], bins: [
    { id: 'v49', label: '49', color: '#3B82F6' },
    { id: 'v90', label: '90', color: '#10B981' },
    { id: 'v448', label: '448', color: '#F59E0B' },
    { id: 'v900', label: '900', color: '#8B5CF6' },
  ] },
  { type: 'identify', question: "A school collected ₹3456 from each of 23 students for a trip. What is the total amount collected?", answer: "₹79,488", options: ["₹79,488", "₹69,488", "₹79,848", "₹89,488"], hint: "Multiply: 3456 × 23. Break it: 3456 × 20 = 69,120 and 3456 × 3 = 10,368. Add them!", misconception: "This is a multiplication word problem! 3456 × 23 = 3456 × 20 + 3456 × 3 = 69,120 + 10,368 = ₹79,488. Break the multiplier into tens and ones for easier calculation!" },
  { type: 'sort', question: "Drag each word problem to the correct operation needed!", answer: "sort", options: [], hint: "Total of items = addition. Money left = subtraction. Equal groups = multiplication. Sharing equally = division.", misconception: "Read the story carefully! 'Total cost' = addition, 'money left after spending' = subtraction, 'equal boxes of items' = multiplication, 'sharing equally among people' = division.", sortItems: [
    { id: 'op1', label: 'Total of 3456 + 2345', icon: 'wordproblem', correctBin: 'add' },
    { id: 'op2', label: '₹5000 minus ₹1200 spent', icon: 'wordproblem', correctBin: 'sub' },
    { id: 'op3', label: '23 students × ₹3456 each', icon: 'wordproblem', correctBin: 'mul' },
    { id: 'op4', label: '9450 pencils ÷ 25 per box', icon: 'wordproblem', correctBin: 'div' },
  ], bins: [
    { id: 'add', label: 'Addition ➕', color: '#3B82F6' },
    { id: 'sub', label: 'Subtraction ➖', color: '#EF4444' },
    { id: 'mul', label: 'Multiplication ✖️', color: '#10B981' },
    { id: 'div', label: 'Division ➗', color: '#8B5CF6' },
  ] },
  { type: 'identify', question: "Estimate the product 48 × 52 by rounding to the nearest 10.", answer: "2500", options: ["2500", "2400", "2600", "2000"], hint: "Round 48 to 50 and 52 to 50. Then multiply: 50 × 50 = ?", misconception: "Estimation by rounding: 48 rounds to 50, 52 rounds to 50. So 48 × 52 ≈ 50 × 50 = 2500. The exact answer is 2496, which is close to our estimate!" },
  { type: 'sort', question: "Drag each estimation to its correct rounded result!", answer: "sort", options: [], hint: "Round to nearest 10 for sums, nearest 100 for large numbers. 0-4 down, 5-9 up!", misconception: "Estimation rounds numbers before calculating. 456+789 ≈ 460+790 = 1250. 345×12 ≈ 350×10 = 3500. 9450÷25 ≈ 9000÷25 = 360. Check if your exact answer is close!", sortItems: [
    { id: 'e1', label: '456 + 789 ≈ ?', icon: 'estimate', correctBin: 'est-1250' },
    { id: 'e2', label: '345 × 12 ≈ ?', icon: 'estimate', correctBin: 'est-3500' },
    { id: 'e3', label: '9450 ÷ 25 ≈ ?', icon: 'estimate', correctBin: 'est-360' },
    { id: 'e4', label: '5678 - 2345 ≈ ?', icon: 'estimate', correctBin: 'est-3300' },
  ], bins: [
    { id: 'est-1250', label: '~1250', color: '#3B82F6' },
    { id: 'est-3500', label: '~3500', color: '#10B981' },
    { id: 'est-360', label: '~360', color: '#F59E0B' },
    { id: 'est-3300', label: '~3300', color: '#8B5CF6' },
  ] },
];

// ─── Component ────────────────────────────────────────────────

export interface LargeOperationsGameProps { width?: number; height?: number; onComplete?: (score: number) => void; }

export function LargeOperationsGame({ width = 720, height = 560, onComplete }: LargeOperationsGameProps) {
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
      const msg = "Excellent! You are a large operations star!";
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
      const compMsg = "Wonderful! You are a brilliant operations champion!";
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
      <BankScene width={width} height={height} />
      <BankerBiju mood={mascotMood} speaking={speakingText} />
      <div className="absolute top-4 left-4 right-28 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-gold-300 flex items-center gap-2">
            <span className="text-xs font-bold text-gold-800">Biju&apos;s Operations</span>
            <span className="text-xs bg-gold-500 text-white px-2 py-0.5 rounded-full font-bold">{screen === 'teaching' ? 'Intro' : `Q ${challengeIdx + 1}/${CHALLENGES.length}`}</span>
          </div>
        </div>
        {screen === 'play' && (<div className="flex items-center gap-4"><StarRow count={Math.min(5, Math.floor(score / 15) + 1)} total={5} /><button onClick={handleShowHint} className="bg-gold-400 hover:bg-gold-500 text-gold-950 font-bold px-3 py-1 rounded-full text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer">💡 Hint</button></div>)}
      </div>

      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 pt-20">
          <motion.div key={slideIdx} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className={`w-full max-w-xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} rounded-3xl p-8 shadow-2xl text-white border-4 border-white/30 flex flex-col items-center text-center`}>
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow mb-6">{TEACHING_SLIDES[slideIdx].text}</p>
            <div className="flex items-center justify-between w-full mt-4">
              <button onClick={() => { if (slideIdx > 0) setSlideIdx(prev => prev - 1); }} disabled={slideIdx === 0} className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-30 rounded-xl font-bold text-sm cursor-pointer transition-all">← Back</button>
              <div className="flex gap-2">{TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} />))}</div>
              <button onClick={() => { audioManager.play('tap'); if (slideIdx < TEACHING_SLIDES.length - 1) { setSlideIdx(prev => prev + 1); } else { setScreen('play'); audioManager.play('success'); } }} className="px-6 py-2 bg-white text-gold-600 hover:bg-gold-50 rounded-xl font-black text-sm shadow-lg cursor-pointer transition-all">{slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}</button>
            </div>
          </motion.div>
        </div>
      )}

      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 pt-20 pb-8">
          <motion.div key={challengeIdx} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border-2 border-gold-300 max-w-xl text-center">
            <h3 className="text-base font-black text-gray-800">{currentChallenge.question}</h3>
          </motion.div>

          {currentChallenge.type === 'identify' && (
            <div className="grid grid-cols-2 gap-4 w-full max-w-lg my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-white hover:bg-gold-50 text-gray-800 border-2 border-gold-200";
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
                        isHover ? 'bg-gold-100 scale-105' : 'bg-white/90'
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
                        <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'}`} style={{ width: 110, height: 95 }}>
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

          <div className="h-14 flex items-center justify-center w-full">
            {selectedOpt && (<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={advanceChallenge} className="bg-gradient-to-r from-gold-500 to-gold-500 hover:from-gold-600 hover:to-gold-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer">{challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}</motion.button>)}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (<motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} onClick={advanceChallenge} className="bg-gradient-to-r from-gold-500 to-gold-500 hover:from-gold-600 hover:to-gold-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer">{challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}</motion.button>)}
          </div>
        </div>
      )}

      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
