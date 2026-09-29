'use client';

/**
 * PercentageDataGame — Class 5 Mathematics (CISCE / ICSE Curriculum)
 * 
 * CISCE Nodes:
 * - c5_math_055: Introduction of percentages
 * - c5_math_056: Relationship between fractions, decimals and percentage
 * - c5_math_057: Pictorial representation of percentage
 * - c5_math_058: Conversion of fractions to percentages and percentages to Fractions
 * - c5_math_059: Conversion of decimals to percentages and percentages to decimals
 * - c5_math_060: Simple word problems on percentage
 * - c5_math_061: Pictorial representation of the raw data
 * - c5_math_062: Interpretation of Bar graph, line graph and pie chart
 * - c5_math_063: Patterns with a unit of repeat and their extension
 * - c5_math_064: Progressive patterns
 * - c5_math_065: Extension of progressive patterns
 * - c5_math_066: Patterns with more than one characteristic
 * - c5_math_067: Triangular and square numbers
 *
 * Mascot: Reporter Riya — a news reporter with a press badge, notebook,
 * and microphone. She reports on percentages, data charts, and number patterns.
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

// ─── Custom SVG Icon Components ──────────────────────────────────────

function PercentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
      <text x="25" y="32" fontSize="26" fontWeight="bold" fill="#0369A1" textAnchor="middle">%</text>
    </svg>
  );
}

function PieChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
      <path d="M25 25 L25 5 A20 20 0 0 1 45 25 Z" fill="#F59E0B" />
      <path d="M25 25 L45 25 A20 20 0 0 1 25 45 Z" fill="#10B981" />
    </svg>
  );
}

function BarGraphIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="25" width="8" height="20" fill="#3B82F6" rx="2" />
      <rect x="18" y="15" width="8" height="30" fill="#10B981" rx="2" />
      <rect x="30" y="8" width="8" height="37" fill="#F59E0B" rx="2" />
      <line x1="4" y1="45" x2="46" y2="45" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function LineGraphIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M6 38 L18 24 L30 30 L42 12" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="38" r="4" fill="#6D28D9" />
      <circle cx="18" cy="24" r="4" fill="#6D28D9" />
      <circle cx="30" cy="30" r="4" fill="#6D28D9" />
      <circle cx="42" cy="12" r="4" fill="#6D28D9" />
    </svg>
  );
}

function FractionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="6" width="34" height="38" fill="#FCE7F3" stroke="#DB2777" strokeWidth="3" rx="4" />
      <line x1="8" y1="25" x2="42" y2="25" stroke="#DB2777" strokeWidth="3" />
      <text x="25" y="20" fontSize="16" fontWeight="bold" fill="#BE185D" textAnchor="middle">1</text>
      <text x="25" y="40" fontSize="16" fontWeight="bold" fill="#BE185D" textAnchor="middle">4</text>
    </svg>
  );
}

function DecimalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="8" width="40" height="34" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="3" rx="6" />
      <text x="25" y="32" fontSize="20" fontWeight="bold" fill="#6D28D9" textAnchor="middle">0.25</text>
    </svg>
  );
}

function PatternIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="10" cy="25" r="5" fill="#EF4444" />
      <rect x="18" y="20" width="10" height="10" fill="#3B82F6" rx="2" />
      <polygon points="38,20 44,30 32,30" fill="#10B981" />
    </svg>
  );
}

function ProgressivePatternIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <text x="25" y="32" fontSize="16" fontWeight="bold" fill="#0284C7" textAnchor="middle">2,4,6...</text>
      <path d="M10 40 Q25 10 40 40" stroke="#0284C7" strokeWidth="2" fill="none" strokeDasharray="3,3" />
    </svg>
  );
}

function TriangleNumbersIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="12" r="4" fill="#D97706" />
      <circle cx="18" cy="28" r="4" fill="#D97706" />
      <circle cx="32" cy="28" r="4" fill="#D97706" />
      <circle cx="11" cy="42" r="4" fill="#D97706" />
      <circle cx="25" cy="42" r="4" fill="#D97706" />
      <circle cx="39" cy="42" r="4" fill="#D97706" />
    </svg>
  );
}

function SquareNumbersIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="15" cy="15" r="4" fill="#2563EB" />
      <circle cx="35" cy="15" r="4" fill="#2563EB" />
      <circle cx="15" cy="35" r="4" fill="#2563EB" />
      <circle cx="35" cy="35" r="4" fill="#2563EB" />
    </svg>
  );
}

function MicrophoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="18" y="8" width="14" height="20" rx="7" fill="#64748B" />
      <path d="M13 18 C13 32, 37 32, 37 18" stroke="#64748B" strokeWidth="3" fill="none" />
      <line x1="25" y1="35" x2="25" y2="44" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="44" x2="32" y2="44" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function NotebookIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="6" width="32" height="38" rx="4" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
      <rect x="6" y="6" width="6" height="38" rx="2" fill="#0284C7" />
      <line x1="16" y1="14" x2="36" y2="14" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="22" x2="36" y2="22" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="30" x2="28" y2="30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'percent': return <PercentIcon size={size} />;
    case 'pie': return <PieChartIcon size={size} />;
    case 'bar': return <BarGraphIcon size={size} />;
    case 'line': return <LineGraphIcon size={size} />;
    case 'fraction': return <FractionIcon size={size} />;
    case 'decimal': return <DecimalIcon size={size} />;
    case 'pattern': return <PatternIcon size={size} />;
    case 'progressive': return <ProgressivePatternIcon size={size} />;
    case 'triangle': return <TriangleNumbersIcon size={size} />;
    case 'square': return <SquareNumbersIcon size={size} />;
    default: return <PercentIcon size={size} />;
  }
}

// ─── Newsroom Scene Background ────────────────────────────────────

function NewsroomScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="news-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="news-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="news-desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
        </defs>
        {/* Background wall */}
        <rect width="720" height="380" fill="url(#news-wall)" />
        {/* Window view showing sky */}
        <rect x="420" y="40" width="260" height="160" fill="url(#news-sky)" rx="8" stroke="#94A3B8" strokeWidth="4" />
        {/* Charts hanging on wall */}
        <rect x="60" y="50" width="140" height="100" fill="white" stroke="#64748B" strokeWidth="2" rx="4" />
        <rect x="75" y="90" width="18" height="45" fill="#3B82F6" rx="2" />
        <rect x="100" y="65" width="18" height="70" fill="#10B981" rx="2" />
        <rect x="125" y="80" width="18" height="55" fill="#F59E0B" rx="2" />
        
        <rect x="230" y="50" width="140" height="100" fill="white" stroke="#64748B" strokeWidth="2" rx="4" />
        <circle cx="300" cy="100" r="32" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
        <path d="M300 100 L300 68 A32 32 0 0 1 332 100 Z" fill="#EF4444" />
        <path d="M300 100 L332 100 A32 32 0 0 1 300 132 Z" fill="#3B82F6" />

        {/* News Floor */}
        <rect x="0" y="380" width="720" height="180" fill="#475569" />
        {/* News Desk */}
        <rect x="120" y="340" width="480" height="110" fill="url(#news-desk)" rx="8" />
        <rect x="100" y="330" width="520" height="20" fill="#0EA5E9" rx="4" />
        {/* TV Studio lights and cameras hint */}
        <circle cx="60" cy="30" r="16" fill="#334155" />
        <circle cx="660" cy="30" r="16" fill="#334155" />
      </svg>
    </div>
  );
}

// ─── Mascot: Reporter Riya ────────────────────────────────

function ReporterRiya({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
          <circle cx="45" cy="30" r="22" fill="#FED7AA" stroke="#C2410C" strokeWidth="2" />
          {/* Hair */}
          <path d="M23 25 Q45 2 67 25 Q60 12 45 10 Q30 12 23 25 Z" fill="#1E293B" />
          {/* Eyes */}
          <circle cx="37" cy="28" r="3" fill="#1E293B" />
          <circle cx="53" cy="28" r="3" fill="#1E293B" />
          <circle cx="38" cy="27" r="1" fill="white" />
          <circle cx="54" cy="27" r="1" fill="white" />
          {/* Smile */}
          <path d="M40 40 Q45 46 50 40" stroke="#C2410C" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Press Badge / Mic Head */}
          <circle cx="65" cy="55" r="8" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
          <rect x="20" y="52" width="50" height="43" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
          {/* Press ID Tag */}
          <rect x="35" y="65" width="20" height="14" fill="white" rx="2" />
          <text x="45" y="75" fontSize="8" fontWeight="bold" fill="#0284C7" textAnchor="middle">PRESS</text>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

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
    title: "Welcome to Riya's Newsroom! 📰",
    text: "Reporter Riya investigates percentages, data graphs, and number patterns every day to bring exciting mathematical news to students!",
    emoji: "📰",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Welcome to Riya's Newsroom! Riya investigates percentages, data graphs, and number patterns every day!"
  },
  {
    title: "Introduction to Percentages (%) 💯",
    text: "Percent means 'per hundred' or 'out of every hundred'. The symbol % is shorthand for '/100'. So 25% is exactly 25 out of 100, or the fraction 25/100!",
    emoji: "💯",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Percent means per hundred! The symbol percent is shorthand for over 100. So 25 percent is 25 out of 100!"
  },
  {
    title: "Fractions, Decimals, & Percentages 🔀",
    text: "The same amount can be written three ways! 1/4 equals 0.25, which equals 25%. To convert a fraction to a percentage, multiply by 100. To convert a decimal, multiply by 100!",
    emoji: "🔄",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "The same amount can be written three ways! One-quarter equals 0.25, which equals 25%!"
  },
  {
    title: "Data Handling: Charts & Graphs 📊",
    text: "Raw data is organised into tally tables and pictographs. We interpret bar graphs by comparing bar heights, line graphs by tracing trends over time, and pie charts by comparing sector shares!",
    emoji: "📈",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "Raw data is organised into tally tables and pictographs. We interpret bar graphs, line graphs, and pie charts easily!"
  },
  {
    title: "Fascinating Number Patterns 🧩",
    text: "Patterns have units of repeat or progression rules like adding or multiplying. Triangular numbers (1, 3, 6, 10) and square numbers (1, 4, 9, 16) follow wonderful geometric rules!",
    emoji: "🔺",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Patterns have units of repeat or progressive rules. Triangular and square numbers follow wonderful geometric rules!"
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is 25% expressed as a fraction in its simplest form?",
    answer: "1/4",
    options: ["1/4", "25/100", "1/25", "1/2"],
    hint: "Write 25% as 25/100, then divide both numerator and denominator by 25.",
    misconception: "By definition, 25% means 25 out of 100 (25/100). Simplifying by dividing top and bottom by 25 gives 1/4."
  },
  {
    type: 'sort',
    question: "Drag each percentage to its correct fraction form!",
    answer: "sort",
    options: [],
    hint: "Remember: 50% = 50/100 = 1/2, 25% = 1/4, 75% = 3/4, 10% = 1/10!",
    misconception: "Percentages convert to fractions by placing the number over 100 and simplifying to lowest terms. Match each percentage to its simplified fraction.",
    sortItems: [
      { id: 'p1', label: '25%', icon: 'percent', correctBin: '1/4' },
      { id: 'p2', label: '50%', icon: 'percent', correctBin: '1/2' },
      { id: 'p3', label: '75%', icon: 'percent', correctBin: '3/4' },
      { id: 'p4', label: '10%', icon: 'percent', correctBin: '1/10' },
    ],
    bins: [
      { id: '1/4', label: '1/4', color: '#3B82F6' },
      { id: '1/2', label: '1/2', color: '#10B981' },
      { id: '3/4', label: '3/4', color: '#F59E0B' },
      { id: '1/10', label: '1/10', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is 0.45 expressed as a percentage?",
    answer: "45%",
    options: ["45%", "4.5%", "450%", "0.45%"],
    hint: "To convert a decimal to a percentage, multiply by 100 (move the decimal point two places to the right).",
    misconception: "Multiplying 0.45 by 100 shifts the decimal point two places to the right, giving 45%."
  },
  {
    type: 'sort',
    question: "Drag each decimal to its correct percentage!",
    answer: "sort",
    options: [],
    hint: "Multiply each decimal by 100: 0.3 × 100 = 30%, 0.75 × 100 = 75%!",
    misconception: "Decimals convert to percentages by multiplying by 100. So 0.3 = 30%, 0.75 = 75%, 0.08 = 8%, and 1.5 = 150%.",
    sortItems: [
      { id: 'd1', label: '0.3', icon: 'decimal', correctBin: '30%' },
      { id: 'd2', label: '0.75', icon: 'decimal', correctBin: '75%' },
      { id: 'd3', label: '0.08', icon: 'decimal', correctBin: '8%' },
      { id: 'd4', label: '1.5', icon: 'decimal', correctBin: '150%' },
    ],
    bins: [
      { id: '30%', label: '30%', color: '#3B82F6' },
      { id: '75%', label: '75%', color: '#10B981' },
      { id: '8%', label: '8%', color: '#F59E0B' },
      { id: '150%', label: '150%', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "In a class of 40 students, 60% are girls. How many girls are there in the class?",
    answer: "24",
    options: ["24", "60", "16", "20"],
    hint: "Calculate 60% of 40: (60 / 100) × 40 = 24.",
    misconception: "Percentage word problems require writing the percentage as a fraction (60/100) and multiplying by the total (40). So 60/100 × 40 = 24 girls."
  },
  {
    type: 'sort',
    question: "Drag each percentage problem to its correct calculated answer!",
    answer: "sort",
    options: [],
    hint: "Convert percentage to fraction and multiply: 20% of 50 = 20/100 × 50 = 10!",
    misconception: "To find a percentage of a quantity, multiply the quantity by the percentage written over 100. Match each problem to its correct value.",
    sortItems: [
      { id: 'w1', label: '20% of 50', icon: 'percent', correctBin: '10' },
      { id: 'w2', label: '15% of 200', icon: 'percent', correctBin: '30' },
      { id: 'w3', label: '25% of 80', icon: 'percent', correctBin: '20' },
      { id: 'w4', label: '50% of 120', icon: 'percent', correctBin: '60' },
    ],
    bins: [
      { id: '10', label: '10', color: '#3B82F6' },
      { id: '30', label: '30', color: '#10B981' },
      { id: '20', label: '20', color: '#F59E0B' },
      { id: '60', label: '60', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "Look at the progressive pattern: 3, 6, 9, 12, ... What are the next two terms?",
    answer: "15, 18",
    options: ["15, 18", "13, 14", "18, 21", "15, 21"],
    hint: "Observe the rule of progression: each term increases by adding 3.",
    misconception: "A progressive pattern where each term increases by a fixed amount uses addition. Here the rule is 'add 3', so after 12 comes 15 and 18."
  },
  {
    type: 'sort',
    question: "Drag each number sequence to its correct pattern rule!",
    answer: "sort",
    options: [],
    hint: "Analyze whether the sequence adds a fixed amount, multiplies, or forms geometric dot shapes!",
    misconception: "Distinguish between arithmetic addition (add 2), multiplication (multiply by 2), triangular numbers (1, 3, 6, 10, 15), and square numbers (1, 4, 9, 16, 25).",
    sortItems: [
      { id: 's1', label: '2, 4, 6, 8, 10', icon: 'progressive', correctBin: 'add2' },
      { id: 's2', label: '3, 6, 12, 24, 48', icon: 'progressive', correctBin: 'mul2' },
      { id: 's3', label: '1, 3, 6, 10, 15', icon: 'triangle', correctBin: 'tri' },
      { id: 's4', label: '1, 4, 9, 16, 25', icon: 'square', correctBin: 'sq' },
    ],
    bins: [
      { id: 'add2', label: 'Add 2 each time', color: '#3B82F6' },
      { id: 'mul2', label: 'Multiply by 2', color: '#10B981' },
      { id: 'tri', label: 'Triangular Numbers', color: '#F59E0B' },
      { id: 'sq', label: 'Square Numbers', color: '#8B5CF6' },
    ]
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface PercentageDataGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PercentageDataGame({ width = 720, height = 560, onComplete }: PercentageDataGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 140, y: height - 150 };
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
      const msg = "Brilliant reporting! That is correct!";
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
      const compMsg = "Fantastic! You are a master mathematician and star reporter!";
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

    // Check bin collision based on drop coordinates
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 150;
      const binY = 220;
      if (x >= binX - 20 && x <= binX + 130 && y >= binY - 20 && y <= binY + 120) {
        droppedBinId = bin.id;
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
      className="relative overflow-hidden select-none font-sans bg-slate-900 flex flex-col items-center justify-center"
      style={{ width, height }}
    >
      <NewsroomScene width={width} height={height} />
      <ReporterRiya mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}

      {/* ─── TEACHING SCREEN ──���─────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-8 bg-black/40 backdrop-blur-sm">
          <div className="w-full flex justify-between items-center max-w-2xl">
            <h1 className="text-2xl font-black text-white drop-shadow-md flex items-center gap-2">
              <span>{TEACHING_SLIDES[slideIdx].emoji}</span>
              <span>{TEACHING_SLIDES[slideIdx].title}</span>
            </h1>
            <span className="text-sm font-bold text-gold-300 bg-gold-950/60 px-3 py-1 rounded-full border border-gold-500">
              Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
            </span>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`w-full max-w-2xl p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <p className="text-lg font-medium leading-relaxed max-w-xl">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          <div className="w-full max-w-2xl flex justify-between items-center">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${
                slideIdx === 0 ? 'bg-gray-600 opacity-50 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-500 active:scale-95'
              }`}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === slideIdx ? 'w-8 bg-gold-400' : 'w-3 bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg active:scale-95"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Reporting! 🚀' : 'Next ➔'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ────────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-gold-200">
            <div className="flex items-center gap-4">
              <span className="text-sm font-black text-gold-900 bg-gold-100 px-3 py-1 rounded-xl">
                Challenge {challengeIdx + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 15)} total={6} />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShowHint}
                className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-white px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                💡 Hint
              </button>
              <div className="text-sm font-extrabold text-gold-900 bg-gold-50 px-3 py-1 rounded-xl border border-gold-200">
                Score: {score}
              </div>
            </div>
          </div>

          {/* Challenge Box */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full my-4">
            <motion.div
              key={challengeIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border-4 border-gold-300 w-full text-center flex flex-col items-center"
            >
              <div className="flex items-center gap-2 mb-3 bg-gold-100 text-gold-800 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <span>{currentChallenge.type === 'sort' ? '🧩 Drag & Drop Sort' : '❓ Multiple Choice'}</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-800 mb-6 leading-snug">
                {currentChallenge.question}
              </h2>

              {/* Multiple Choice Options */}
              {currentChallenge.type === 'identify' && currentChallenge.options && (
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-4">
                  {currentChallenge.options.map((opt, idx) => {
                    const isSelected = selectedOpt === opt;
                    const isCorrect = opt === currentChallenge.answer;
                    let btnStyle = "bg-slate-100 hover:bg-gold-50 text-slate-800 border-slate-300";
                    if (selectedOpt) {
                      if (isCorrect) btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105";
                      else if (isSelected) btnStyle = "bg-rose-500 text-white border-rose-600 animate-shake";
                    }
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: selectedOpt ? 1 : 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => handleAnswerClick(opt, e)}
                        disabled={selectedOpt !== null}
                        className={`py-4 px-6 rounded-2xl font-black text-xl border-2 shadow-md transition-all ${btnStyle}`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Sort Challenge (Drag & Drop) */}
              {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
                <div className="w-full flex flex-col items-center">
                  <div className="flex justify-center gap-4 w-full mb-6">
                    {currentChallenge.bins.map((bin) => (
                      <div
                        key={bin.id}
                        className="w-32 h-36 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-2 shadow-inner transition-all bg-slate-50"
                        style={{ borderColor: bin.color }}
                      >
                        <span className="text-xs font-bold text-slate-600 text-center mb-2">{bin.label}</span>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md" style={{ backgroundColor: bin.color }}>
                          📁
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="relative w-full h-28 bg-slate-100 rounded-2xl border border-slate-300 flex items-center justify-center gap-4 px-4">
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
                          width={110}
                          height={80}
                        >
                          <div
                            className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-gold-400 bg-white ${
                              placed ? 'opacity-40 scale-90' : 'hover:scale-105 cursor-grab'
                            }`}
                            style={{ width: 110, height: 80 }}
                          >
                            {renderSortIcon(item.icon, 36)}
                            <span className="text-[11px] font-extrabold text-slate-700 mt-1">{item.label}</span>
                          </div>
                        </Draggable>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Next Button after correct answer */}
              {selectedOpt === currentChallenge.answer && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4">
                  <button
                    onClick={advanceChallenge}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all"
                  >
                    Continue Report ➔
                  </button>
                </motion.div>
              )}

              {/* Continue button for sort challenge when all placed */}
              {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4">
                  <button
                    onClick={advanceChallenge}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-lg rounded-2xl shadow-xl active:scale-95 transition-all"
                  >
                    Continue Report ➔
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
