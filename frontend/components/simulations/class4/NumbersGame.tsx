'use client';

/**
 * NumbersGame — Learn 6-digit numbers, place value, ordering, and Roman numerals
 *
 * CISCE Nodes: c4_math_001 (6 digit numbers up to lac - Indian system),
 *              c4_math_002 (Place value and face values),
 *              c4_math_003 (Ascending and descending order),
 *              c4_math_004 (Greatest and smallest numbers from given digits),
 *              c4_math_005 (Roman Numerals using I, V and X)
 *
 * Mascot: Mathematician Manoj — a friendly maths teacher with glasses, a calculator badge,
 * a pencil behind the ear, and a number chart.
 *
 * Story: "Help Mathematician Manoj sort place values, order 6-digit numbers,
 * and master Roman Numerals! Become a Maths Champion!"
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

// ─── SVG Topic Icons ──────────────────────────────────────────

function PlaceValueChartIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
      <line x1="5" y1="22" x2="55" y2="22" stroke="#D97706" strokeWidth="1.5" />
      <line x1="20" y1="10" x2="20" y2="50" stroke="#D97706" strokeWidth="1" />
      <line x1="35" y1="10" x2="35" y2="50" stroke="#D97706" strokeWidth="1" />
      <text x="12" y="18" fontSize="8" fontWeight="bold" fill="#B45309">L</text>
      <text x="25" y="18" fontSize="8" fontWeight="bold" fill="#B45309">Th</text>
      <text x="42" y="18" fontSize="8" fontWeight="bold" fill="#B45309">O</text>
      <text x="11" y="38" fontSize="10" fontWeight="bold" fill="#1F2937">2</text>
      <text x="26" y="38" fontSize="10" fontWeight="bold" fill="#1F2937">4</text>
      <text x="42" y="38" fontSize="10" fontWeight="bold" fill="#1F2937">5</text>
    </svg>
  );
}

function NumberBlockIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="30" width="12" height="20" fill="#3B82F6" rx="2" />
      <rect x="24" y="20" width="12" height="30" fill="#10B981" rx="2" />
      <rect x="38" y="10" width="12" height="40" fill="#F59E0B" rx="2" />
      <text x="13" y="44" fontSize="9" fill="white" fontWeight="bold">1</text>
      <text x="27" y="37" fontSize="9" fill="white" fontWeight="bold">5</text>
      <text x="41" y="32" fontSize="9" fill="white" fontWeight="bold">9</text>
    </svg>
  );
}

function CommaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="25" r="15" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="22" y="34" fontSize="22" fontWeight="bold" fill="#0284C7">,</text>
    </svg>
  );
}

function LakhIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <text x="10" y="34" fontSize="11" fontWeight="bold" fill="#B45309">1,00,000</text>
    </svg>
  );
}

function RomanOneIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="10" width="10" height="40" fill="#8B5CF6" rx="2" />
      <text x="28" y="38" fontSize="20" fontWeight="bold" fill="white">I</text>
    </svg>
  );
}

function RomanFiveIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 15 L30 45 L45 15" stroke="#EC4899" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function RomanTenIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="15" y1="15" x2="45" y2="45" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
      <line x1="45" y1="15" x2="15" y2="45" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="white" stroke="#374151" strokeWidth="2.5" />
      <text x="25" y="18" fontSize="10" fontWeight="bold" fill="#1F2937">XII</text>
      <text x="40" y="33" fontSize="9" fontWeight="bold" fill="#1F2937">III</text>
      <text x="26" y="48" fontSize="9" fontWeight="bold" fill="#1F2937">VI</text>
      <text x="14" y="33" fontSize="9" fontWeight="bold" fill="#1F2937">IX</text>
      <line x1="30" y1="30" x2="30" y2="18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="30" x2="40" y2="30" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AscendingIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polyline points="10,45 25,35 40,25 55,15" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="55,15 48,16 52,22" fill="#10B981" />
    </svg>
  );
}

function DescendingIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polyline points="10,15 25,25 40,35 55,45" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="55,45 51,38 48,44" fill="#EF4444" />
    </svg>
  );
}

function DigitCardIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" fill="white" stroke="#6366F1" strokeWidth="2" rx="6" />
      <text x="24" y="38" fontSize="22" fontWeight="bold" fill="#4F46E5">7</text>
    </svg>
  );
}

function CrownIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 40 L15 20 L25 32 L30 15 L35 32 L45 20 L50 40 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="10" y="42" width="40" height="6" fill="#D97706" rx="2" />
    </svg>
  );
}

// ─── Classroom Scene Background ───────────────────────────────

function ClassroomScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall + Floor gradient — SVG */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="classroom-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="classroom-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#classroom-wall)" />
        <rect y={height - 112} width={width} height={112} fill="url(#classroom-floor)" />
      </svg>
      {/* Blackboard on wall */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-emerald-900 border-4 border-amber-800 rounded-lg shadow-inner flex flex-col items-center justify-center p-2 opacity-90">
        <span className="text-amber-200 text-xs font-bold tracking-widest">INDIAN SYSTEM OF NUMERATION</span>
        <div className="flex gap-4 mt-2 text-white font-mono text-sm">
          <span className="bg-emerald-800 px-2 py-1 rounded">Lakhs (L)</span>
          <span>|</span>
          <span className="bg-emerald-800 px-2 py-1 rounded">Thousands (Th)</span>
          <span>|</span>
          <span className="bg-emerald-800 px-2 py-1 rounded">Ones (O)</span>
        </div>
        <span className="text-yellow-300 text-xs mt-2">2,45,318 = Two lakh forty-five thousand three hundred eighteen</span>
      </div>
      {/* Floor tiles pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-28 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '40px 28px' }} />
    </div>
  );
}

// ─── Mathematician Manoj Mascot ───────────────────────────────

function ManojMascot({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-200"
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
          {/* Body / Shirt */}
          <rect x="22" y="48" width="31" height="32" fill="#3B82F6" rx="4" />
          {/* Calculator Badge */}
          <rect x="36" y="56" width="12" height="14" fill="white" rx="1" stroke="#1E40AF" strokeWidth="1" />
          <rect x="38" y="58" width="8" height="4" fill="#93C5FD" rx="0.5" />
          <circle cx="40" cy="65" r="1" fill="#1E40AF" />
          <circle cx="44" cy="65" r="1" fill="#1E40AF" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M 21.5 32 Q 23 18, 37.5 17 Q 53 18, 53.5 32 Z" fill="#4B5563" />
          {/* Glasses */}
          <circle cx="31" cy="31" r="5" fill="none" stroke="#1F2937" strokeWidth="1.5" />
          <circle cx="44" cy="31" r="5" fill="none" stroke="#1F2937" strokeWidth="1.5" />
          <line x1="36" y1="31" x2="39" y2="31" stroke="#1F2937" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="31" r="1.5" fill="#1F2937" />
          <circle cx="44" cy="31" r="1.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M 33 39 Q 37.5 43, 42 39" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Pencil behind ear */}
          <line x1="50" y1="22" x2="60" y2="12" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <polygon points="60,12 63,10 61,14" fill="#1F2937" />
          {/* Bow tie / Collar */}
          <polygon points="32,48 43,48 37.5,53" fill="#EF4444" />
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

// ─── Render Sort Icon ─────────────────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'place-value': return <PlaceValueChartIcon size={size} />;
    case 'number-block': return <NumberBlockIcon size={size} />;
    case 'comma': return <CommaIcon size={size} />;
    case 'lakh': return <LakhIcon size={size} />;
    case 'roman-i': return <RomanOneIcon size={size} />;
    case 'roman-v': return <RomanFiveIcon size={size} />;
    case 'roman-x': return <RomanTenIcon size={size} />;
    case 'clock': return <ClockIcon size={size} />;
    case 'ascending': return <AscendingIcon size={size} />;
    case 'descending': return <DescendingIcon size={size} />;
    case 'digit-card': return <DigitCardIcon size={size} />;
    case 'crown': return <CrownIcon size={size} />;
    default: return <NumberBlockIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 truncate w-full">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color + '22',
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "6-Digit Numbers & Indian System! 🇮🇳",
    text: "A 6-digit number goes from 1,00,000 (one lakh) up to 9,99,999. In the Indian system, commas are placed after lakhs and after thousands: 2,45,318!",
    emoji: "📊",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "A 6-digit number goes from 1,00,000 up to 9,99,999. In the Indian system, commas are placed after lakhs and thousands: 2,45,318!",
  },
  {
    title: "Place Value vs Face Value! 🏷️",
    text: "Face value is the digit itself. Place value is the digit multiplied by its position! In 5,73,294, the place value of 7 is 70,000 (ten thousands place).",
    emoji: "🏷️",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Face value is the digit itself. Place value is the digit multiplied by its position! In 5,73,294, the place value of 7 is 70,000.",
  },
  {
    title: "Ascending & Descending Order! 📈📉",
    text: "Ascending order means smallest to largest (1,23,456 < 2,34,567). Descending order means largest to smallest. Always compare from the leftmost place!",
    emoji: "📈",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Ascending order means smallest to largest. Descending order means largest to smallest. Always compare from the leftmost place!",
  },
  {
    title: "Greatest & Smallest Numbers! 👑",
    text: "To make the greatest number, arrange digits in descending order. To make the smallest number, arrange in ascending order — but NEVER start with 0!",
    emoji: "👑",
    bgColor: "from-purple-500 to-gold-600",
    spoken: "To make the greatest number, arrange digits in descending order. To make the smallest number, arrange in ascending order, but never start with zero!",
  },
  {
    title: "Roman Numerals (I, V, X)! 🏛️",
    text: "Roman numerals use letters: I = 1, V = 5, X = 10. Smaller symbol before larger means subtraction (IV = 4, IX = 9). I and X can repeat up to three times!",
    emoji: "🏛️",
    bgColor: "from-rose-500 to-pink-600",
    spoken: "Roman numerals use letters: I equals 1, V equals 5, X equals 10. Smaller symbol before larger means subtraction like IV for 4.",
  },
];

// ─── Challenges ───────────────────────────────────────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBinDef {
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
  bins?: SortBinDef[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'How do you read the number 2,45,318 in the Indian system?',
    answer: 'Two lakh forty-five thousand three hundred eighteen',
    options: [
      'Two lakh forty-five thousand three hundred eighteen',
      'Two hundred forty-five thousand three hundred eighteen',
      'Twenty-four thousand five hundred thirty-eight',
    ],
    hint: 'Look at the periods: 2 is in lakhs, 45 in thousands, 318 in ones!',
    misconception: 'Remember the Indian period names: Lakh, Thousand, Hundred! 2,45,318 is read as "Two lakh forty-five thousand three hundred eighteen".',
  },
  {
    type: 'identify',
    question: 'In the number 5,73,294, what is the place value of the digit 7?',
    answer: 'Seventy thousand (70,000)',
    options: [
      'Seventy thousand (70,000)',
      'Seven thousand (7,000)',
      'Seven lakh (7,00,000)',
    ],
    hint: 'Count places from right: ones, tens, hundreds, thousands, ten thousands! 7 is in the ten thousands place.',
    misconception: 'The digit 7 is in the ten thousands place, so its place value is 7 x 10,000 = 70,000 (Seventy thousand). Face value is just 7!',
  },
  {
    type: 'sort',
    question: 'Drag each digit of 3,89,451 to its correct place value!',
    answer: 'sort',
    options: [],
    hint: 'Match each digit position from left to right: Lakhs (3), Ten Thousands (8), Thousands (9)...',
    misconception: 'Check each place value carefully from left to right: Lakhs, Ten Thousands, Thousands, Hundreds, Tens, Ones!',
    sortItems: [
      { id: 'd3', label: '3 (Lakhs)', icon: 'lakh', correctBin: 'lakhs' },
      { id: 'd8', label: '8 (Ten Th)', icon: 'number-block', correctBin: 'tenth' },
      { id: 'd9', label: '9 (Th)', icon: 'digit-card', correctBin: 'thousands' },
      { id: 'd4', label: '4 (Hundreds)', icon: 'comma', correctBin: 'hundreds' },
    ],
    bins: [
      { id: 'lakhs', label: '3,00,000', color: '#3B82F6' },
      { id: 'tenth', label: '80,000', color: '#10B981' },
      { id: 'thousands', label: '9,000', color: '#F59E0B' },
      { id: 'hundreds', label: '400', color: '#EC4899' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is the SMALLEST number when arranged in ascending order?',
    answer: '1,23,450',
    options: ['1,23,450', '1,23,456', '2,34,500'],
    hint: 'Compare numbers from left to right. All start with 1,23,45... look at the tens and ones!',
    misconception: 'When comparing numbers with the same leading digits, check the tens and ones place: 450 is smaller than 456, so 1,23,450 is the smallest!',
  },
  {
    type: 'sort',
    question: 'Drag these 6-digit numbers in ASCENDING order (smallest to largest)!',
    answer: 'sort',
    options: [],
    hint: 'Start with the smallest number (45,678 or 1,23,456...) and end with the largest (9,99,999)!',
    misconception: 'Ascending order means going UP from smallest to largest! Check the lakhs place first.',
    sortItems: [
      { id: 'n1', label: '45,678', icon: 'number-block', correctBin: 'b1' },
      { id: 'n2', label: '1,23,456', icon: 'digit-card', correctBin: 'b2' },
      { id: 'n3', label: '5,67,890', icon: 'ascending', correctBin: 'b3' },
      { id: 'n4', label: '9,99,999', icon: 'crown', correctBin: 'b4' },
    ],
    bins: [
      { id: 'b1', label: '1st (Smallest)', color: '#3B82F6' },
      { id: 'b2', label: '2nd', color: '#10B981' },
      { id: 'b3', label: '3rd', color: '#F59E0B' },
      { id: 'b4', label: '4th (Largest)', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'Using digits 3, 7, 1, 0, 5, 9 �� what is the GREATEST 6-digit number you can make?',
    answer: '9,75,310',
    options: ['9,75,310', '1,03,579', '9,75,301'],
    hint: 'To make the greatest number, arrange the digits in descending order from largest to smallest!',
    misconception: 'Greatest number requires descending order of digits: 9, 7, 5, 3, 1, 0 -> 9,75,310. Place the largest digit in the lakhs place!',
  },
  {
    type: 'sort',
    question: 'Drag each Roman numeral to its correct Hindu-Arabic value!',
    answer: 'sort',
    options: [],
    hint: 'I = 1, V = 5, X = 10, IV = 4, IX = 9!',
    misconception: 'Remember the building blocks: I=1, V=5, X=10. Subtraction rule: IV is 5-1=4, IX is 10-1=9!',
    sortItems: [
      { id: 'r1', label: 'IV (4)', icon: 'roman-i', correctBin: 'b4' },
      { id: 'r2', label: 'IX (9)', icon: 'roman-v', correctBin: 'b9' },
      { id: 'r3', label: 'XIV (14)', icon: 'roman-x', correctBin: 'b14' },
      { id: 'r4', label: 'XXIX (29)', icon: 'clock', correctBin: 'b29' },
    ],
    bins: [
      { id: 'b4', label: 'Value: 4', color: '#3B82F6' },
      { id: 'b9', label: 'Value: 9', color: '#10B981' },
      { id: 'b14', label: 'Value: 14', color: '#F59E0B' },
      { id: 'b29', label: 'Value: 29', color: '#8B5CF6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each Hindu-Arabic number to its correct Roman Numeral!',
    answer: 'sort',
    options: [],
    hint: 'Break into tens and ones: 19 = 10 + 9 = XIX!',
    misconception: 'To convert to Roman numerals, break the number into tens and ones. 19 is 10 (X) plus 9 (IX) = XIX!',
    sortItems: [
      { id: 'h4', label: '4', icon: 'roman-i', correctBin: 'iv' },
      { id: 'h9', label: '9', icon: 'roman-v', correctBin: 'ix' },
      { id: 'h19', label: '19', icon: 'roman-x', correctBin: 'xix' },
      { id: 'h29', label: '29', icon: 'clock', correctBin: 'xxix' },
    ],
    bins: [
      { id: 'iv', label: 'IV', color: '#3B82F6' },
      { id: 'ix', label: 'IX', color: '#10B981' },
      { id: 'xix', label: 'XIX', color: '#F59E0B' },
      { id: 'xxix', label: 'XXIX', color: '#8B5CF6' },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────

export interface NumbersGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function NumbersGame({ width = 720, height = 560, onComplete }: NumbersGameProps) {
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
      const msg = "Great job! You are a numbers expert!";
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
      const compMsg = "Wonderful! You are a brilliant Maths Champion!";
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
    const numBins = currentChallenge.bins.length;
    const binWidth = Math.floor((width - 60) / numBins) - 10;
    const binHeight = 110;
    const binY = 160;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = 30 + idx * (binWidth + 10);
      if (x >= bx && x <= bx + binWidth && y >= binY && y <= binY + binHeight) {
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
        const msg = "Fantastic! You sorted all the numbers perfectly!";
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
    <div className="relative overflow-hidden select-none bg-amber-50" style={{ width, height }}>
      {/* Background */}
      <ClassroomScene width={width} height={height} />
      {/* Mascot */}
      <ManojMascot mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ─────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 bg-black/40 backdrop-blur-sm">
          <div className="w-full flex justify-between items-center text-white">
            <h1 className="text-xl font-black drop-shadow">Class 4 Maths — Numbers & Roman Numerals</h1>
            <StarRow count={slideIdx + 1} total={TEACHING_SLIDES.length} />
          </div>

          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-lg rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} border-4 border-white/30`}
          >
            <div className="text-4xl mb-3 text-center">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 text-center drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium text-center leading-relaxed drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex gap-4 w-full max-w-lg justify-between">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg text-white ${slideIdx === 0 ? 'bg-gray-400 opacity-50' : 'bg-gold-600 hover:bg-gold-500'}`}
            >
              Previous
            </button>
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  audioManager.play('swoop');
                }
              }}
              className="px-8 py-3 rounded-2xl font-black shadow-lg text-white bg-emerald-600 hover:bg-emerald-500 text-lg"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-700">Level {challengeIdx + 1} / {CHALLENGES.length}</span>
              <StarRow count={challengeIdx} total={CHALLENGES.length} />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleShowHint}
                className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-3 py-1.5 rounded-xl shadow text-xs"
              >
                💡 Hint
              </button>
              <span className="text-sm font-black text-gold-700">Score: {score}</span>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg mx-2 my-2 border-2 border-gold-200">
            <h3 className="text-base font-black text-gray-800 text-center">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Body: Multiple Choice or Sort */}
          <div className="flex-1 relative flex items-center justify-center">
            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 w-full max-w-md px-4">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnColor = 'bg-white hover:bg-gold-50 text-gold-900 border-gold-200';
                  if (selectedOpt) {
                    if (isCorrectOpt) btnColor = 'bg-emerald-500 text-white border-emerald-600';
                    else if (isSelected) btnColor = 'bg-rose-500 text-white border-rose-600';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`p-4 rounded-2xl font-bold shadow-md border-2 text-left transition-all ${btnColor}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="absolute inset-0">
                {/* Bins */}
                {currentChallenge.bins.map((bin, idx) => {
                  const numBins = currentChallenge.bins?.length || 1;
                  const binWidth = Math.floor((width - 60) / numBins) - 10;
                  const bx = 30 + idx * (binWidth + 10);
                  const isHover = hoveredBin === bin.id;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={150}
                      width={binWidth}
                      height={100}
                      isHovering={isHover} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {/* Draggable Items */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: height - 150 };
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
          </div>

          {/* Bottom Action for Multiple Choice when answered correctly */}
          {currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer && (
            <div className="flex justify-center pb-2">
              <button
                onClick={advanceChallenge}
                className="px-8 py-3 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg text-lg animate-bounce"
              >
                Continue ➡️
              </button>
            </div>
          )}

          {/* Bottom Action for Sort when all items placed */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
            <div className="flex justify-center pb-2">
              <button
                onClick={advanceChallenge}
                className="px-8 py-3 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg text-lg animate-bounce"
              >
                Next Challenge ➡️
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
