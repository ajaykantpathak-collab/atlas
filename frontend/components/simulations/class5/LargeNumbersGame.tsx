'use client';

/**
 * LargeNumbersGame — Class 5 Mathematics (CISCE / ICSE Curriculum)
 *
 * CISCE Nodes:
 * - c5_math_001: Indian and International system of numbers - 9 digit numbers
 * - c5_math_002: Place value and face value
 * - c5_math_003: Expanded form
 * - c5_math_004: Comparison of the numbers
 * - c5_math_005: Ascending and descending order of numbers
 * - c5_math_006: Formation of greatest and smallest numbers from the given digits
 * - c5_math_007: Rounding off numbers - nearest 10, 100, 1000
 *
 * Mascot: Mathematician Meera — a mathematician with glasses, a number chart,
 * a pointer stick, and a star badge.
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

function NumberCardIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="8" width="38" height="34" fill="#3B82F6" rx="4" stroke="#1E40AF" strokeWidth="2" />
      <text x="25" y="30" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">9</text>
      <circle cx="12" cy="14" r="2" fill="#FBBF24" />
      <circle cx="38" cy="14" r="2" fill="#FBBF24" />
    </svg>
  );
}

function PlaceValueChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="10" width="42" height="30" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="3" />
      <line x1="15" y1="10" x2="15" y2="40" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="25" y1="10" x2="25" y2="40" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="35" y1="10" x2="35" y2="40" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="9.5" y="28" fontSize="7" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">C</text>
      <text x="20" y="28" fontSize="7" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">L</text>
      <text x="30" y="28" fontSize="7" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">T</text>
      <text x="40" y="28" fontSize="7" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">O</text>
    </svg>
  );
}

function ExpandedFormIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="6" width="10" height="10" fill="#10B981" rx="2" />
      <text x="9" y="14" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">5</text>
      <text x="18" y="14" fontSize="10" fill="#374151" textAnchor="middle">+</text>
      <rect x="22" y="6" width="10" height="10" fill="#F59E0B" rx="2" />
      <text x="27" y="14" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">3</text>
      <text x="36" y="14" fontSize="10" fill="#374151" textAnchor="middle">+</text>
      <rect x="4" y="22" width="10" height="10" fill="#8B5CF6" rx="2" />
      <text x="9" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">2</text>
      <text x="18" y="30" fontSize="10" fill="#374151" textAnchor="middle">+</text>
      <rect x="22" y="22" width="10" height="10" fill="#EF4444" rx="2" />
      <text x="27" y="30" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">8</text>
      <text x="25" y="44" fontSize="8" fill="#1E3A8A" textAnchor="middle" fontWeight="bold">= 5328</text>
    </svg>
  );
}

function CompareIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <text x="12" y="30" fontSize="14" fontWeight="bold" fill="#3B82F6" textAnchor="middle">5</text>
      <text x="25" y="30" fontSize="18" fontWeight="bold" fill="#EF4444" textAnchor="middle">&gt;</text>
      <text x="38" y="30" fontSize="14" fontWeight="bold" fill="#10B981" textAnchor="middle">3</text>
    </svg>
  );
}

function AscendingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="36" width="8" height="8" fill="#3B82F6" rx="1" />
      <rect x="18" y="28" width="8" height="16" fill="#10B981" rx="1" />
      <rect x="28" y="18" width="8" height="26" fill="#F59E0B" rx="1" />
      <rect x="38" y="8" width="8" height="36" fill="#EF4444" rx="1" />
      <path d="M8 6 L42 6" stroke="#374151" strokeWidth="2" markerEnd="url(#arrowUp)" />
      <defs>
        <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
          <path d="M0 6 L3 0 L6 6 Z" fill="#374151" />
        </marker>
      </defs>
    </svg>
  );
}

function GreatestSmallestIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="15" cy="15" r="10" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <text x="15" y="18" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">S</text>
      <circle cx="35" cy="35" r="10" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <text x="35" y="38" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">G</text>
      <path d="M20 20 L30 30" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function RoundingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 25 Q25 10, 40 25" stroke="#8B5CF6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="25" y="30" fontSize="12" fontWeight="bold" fill="#6D28D9" textAnchor="middle">≈</text>
      <text x="12" y="42" fontSize="8" fill="#374151" textAnchor="middle">48</text>
      <text x="38" y="42" fontSize="8" fill="#6D28D9" textAnchor="middle" fontWeight="bold">50</text>
      <path d="M18 38 L32 38" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arrowR)" />
      <defs>
        <marker id="arrowR" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0 0 L5 2.5 L0 5 Z" fill="#8B5CF6" />
        </marker>
      </defs>
    </svg>
  );
}

function IndianSystemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="12" width="42" height="26" fill="#FFF7ED" stroke="#F59E0B" strokeWidth="2" rx="3" />
      <line x1="14" y1="12" x2="14" y2="38" stroke="#F59E0B" strokeWidth="1" />
      <line x1="24" y1="12" x2="24" y2="38" stroke="#F59E0B" strokeWidth="1" />
      <line x1="34" y1="12" x2="34" y2="38" stroke="#F59E0B" strokeWidth="1" />
      <text x="9" y="28" fontSize="6" fill="#92400E" textAnchor="middle" fontWeight="bold">Cr</text>
      <text x="19" y="28" fontSize="6" fill="#92400E" textAnchor="middle" fontWeight="bold">L</text>
      <text x="29" y="28" fontSize="6" fill="#92400E" textAnchor="middle" fontWeight="bold">T</text>
      <text x="39" y="28" fontSize="6" fill="#92400E" textAnchor="middle" fontWeight="bold">O</text>
    </svg>
  );
}

function InternationalSystemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="12" width="42" height="26" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" rx="3" />
      <line x1="18" y1="12" x2="18" y2="38" stroke="#3B82F6" strokeWidth="1" />
      <line x1="32" y1="12" x2="32" y2="38" stroke="#3B82F6" strokeWidth="1" />
      <text x="11" y="28" fontSize="6" fill="#1E40AF" textAnchor="middle" fontWeight="bold">M</text>
      <text x="25" y="28" fontSize="6" fill="#1E40AF" textAnchor="middle" fontWeight="bold">Th</text>
      <text x="39" y="28" fontSize="6" fill="#1E40AF" textAnchor="middle" fontWeight="bold">O</text>
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'numbercard': return <NumberCardIcon size={size} />;
    case 'placevalue': return <PlaceValueChartIcon size={size} />;
    case 'expanded': return <ExpandedFormIcon size={size} />;
    case 'compare': return <CompareIcon size={size} />;
    case 'ascending': return <AscendingIcon size={size} />;
    case 'greatestsmallest': return <GreatestSmallestIcon size={size} />;
    case 'rounding': return <RoundingIcon size={size} />;
    case 'indian': return <IndianSystemIcon size={size} />;
    case 'international': return <InternationalSystemIcon size={size} />;
    default: return <NumberCardIcon size={size} />;
  }
}

// ─── Math Classroom Scene Background ──────────────────────────

function MathClassroomScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="math-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="50%" stopColor="#BFDBFE" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          <linearGradient id="math-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0F9FF" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="math-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4D4D8" />
            <stop offset="100%" stopColor="#A1A1AA" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect width="720" height="400" fill="url(#math-wall)" />
        {/* Chalkboard with numbers */}
        <rect x="120" y="50" width="480" height="180" fill="#1E293B" rx="8" />
        <rect x="130" y="60" width="460" height="160" fill="#0F172A" rx="4" />
        <text x="360" y="100" fontSize="24" fill="#FBBF24" textAnchor="middle" fontWeight="bold">9-Digit Numbers</text>
        <text x="200" y="140" fontSize="16" fill="white" textAnchor="middle">12,34,56,789</text>
        <text x="520" y="140" fontSize="16" fill="#38BDF8" textAnchor="middle">123,456,789</text>
        <text x="200" y="165" fontSize="11" fill="#94A3B8" textAnchor="middle">Indian System</text>
        <text x="520" y="165" fontSize="11" fill="#94A3B8" textAnchor="middle">International System</text>
        <line x1="160" y1="190" x2="560" y2="190" stroke="#475569" strokeWidth="1" strokeDasharray="5,5" />
        <text x="360" y="210" fontSize="14" fill="#FBBF24" textAnchor="middle">Crores / Millions</text>
        {/* Number cards on wall */}
        <rect x="80" y="260" width="40" height="50" fill="#3B82F6" rx="4" opacity="0.8" />
        <text x="100" y="290" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">9</text>
        <rect x="130" y="260" width="40" height="50" fill="#10B981" rx="4" opacity="0.8" />
        <text x="150" y="290" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">8</text>
        <rect x="180" y="260" width="40" height="50" fill="#F59E0B" rx="4" opacity="0.8" />
        <text x="200" y="290" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">7</text>
        <rect x="500" y="260" width="40" height="50" fill="#8B5CF6" rx="4" opacity="0.8" />
        <text x="520" y="290" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">6</text>
        <rect x="550" y="260" width="40" height="50" fill="#EF4444" rx="4" opacity="0.8" />
        <text x="570" y="290" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">5</text>
        <rect x="600" y="260" width="40" height="50" fill="#EC4899" rx="4" opacity="0.8" />
        <text x="620" y="290" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">4</text>
        {/* Floor */}
        <rect x="0" y="400" width="720" height="160" fill="url(#math-floor)" />
        {/* Desk */}
        <rect x="200" y="420" width="320" height="80" fill="#92400E" rx="6" />
        <rect x="210" y="410" width="300" height="15" fill="#D97706" rx="4" />
      </svg>
    </div>
  );
}

// ─── Mascot: Mathematician Meera ──────────────────────────────

function MathematicianMeera({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-2 bg-white border-2 border-blue-400 rounded-2xl px-4 py-3 shadow-xl max-w-[260px]"
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
          {/* Hair bun */}
          <circle cx="45" cy="12" r="10" fill="#1E1B4B" />
          {/* Head & Face */}
          <circle cx="45" cy="30" r="22" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Hair framing */}
          <path d="M23 28 Q25 12, 45 10 Q65 12, 67 28 Q62 22, 45 22 Q28 22, 23 28 Z" fill="#1E1B4B" />
          {/* Glasses */}
          <circle cx="36" cy="30" r="7" fill="none" stroke="#1E293B" strokeWidth="2" />
          <circle cx="54" cy="30" r="7" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="43" y1="30" x2="47" y2="30" stroke="#1E293B" strokeWidth="2" />
          {/* Eyes behind glasses */}
          <circle cx="36" cy="30" r="2.5" fill="#1E293B" />
          <circle cx="54" cy="30" r="2.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M40 42 Q45 47 50 42" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Bindi */}
          <circle cx="45" cy="22" r="2" fill="#DC2626" />
          {/* Sari / Body */}
          <path d="M25 52 L65 52 L75 95 L15 95 Z" fill="#7C3AED" stroke="#5B21B6" strokeWidth="2" />
          {/* Star badge on sari */}
          <polygon points="45,62 48,69 55,69 49,73 51,80 45,76 39,80 41,73 35,69 42,69" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1" />
          {/* Pointer stick in hand */}
          <line x1="68" y1="60" x2="82" y2="40" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="82" cy="40" r="2.5" fill="#EF4444" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-blue-200">
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
    title: "Welcome to Meera's Number Lab! 🔢",
    text: "Mathematician Meera explores 9-digit numbers! In the Indian system, periods are Crores, Lakhs, Thousands, and Ones. In the International system, periods are Millions, Thousands, and Ones. Both describe the same number differently!",
    emoji: "🔢",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "Welcome to Meera's Number Lab! Today we explore 9-digit numbers in both Indian and International systems!"
  },
  {
    title: "Place Value & Face Value 📊",
    text: "Place value depends on position — the digit 5 in crores place has place value 5,00,00,000. Face value is the digit itself — always 5 no matter where it sits. The same digit has different place values in different positions!",
    emoji: "📊",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Place value depends on position, but face value is always the digit itself. The same digit has different place values in different positions!"
  },
  {
    title: "Expanded Form & Comparison 🔍",
    text: "Expanded form breaks a number into each digit times its place value: 5,43,21,098 = 5,00,00,000 + 40,00,000 + 3,00,000 + ... To compare two 9-digit numbers, examine digits from the highest place value leftward — the first difference decides!",
    emoji: "🔍",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Expanded form breaks a number into each digit times its place value. To compare numbers, examine digits from the highest place value leftward!"
  },
  {
    title: "Ordering & Forming Numbers 📋",
    text: "Ascending order means smallest to largest. Descending order means largest to smallest. To form the greatest number, arrange digits in descending order. For the smallest, arrange in ascending order — but zero cannot be the leading digit!",
    emoji: "📋",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "Ascending is smallest to largest, descending is largest to smallest. For the greatest number, arrange digits descending. For smallest, arrange ascending — but zero cannot lead!"
  },
  {
    title: "Rounding Off Numbers 🎯",
    text: "Rounding to the nearest 10: look at the ones digit (0-4 rounds down, 5-9 rounds up). Rounding to the nearest 100: look at the tens digit. Rounding to the nearest 1000: look at the hundreds digit. Estimation makes calculations easier!",
    emoji: "🎯",
    bgColor: "from-cyan-500 to-blue-600",
    spoken: "Rounding to the nearest 10, look at the ones digit. To the nearest 100, look at the tens digit. 0 to 4 rounds down, 5 to 9 rounds up!"
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "How do you read 12,34,56,789 in the Indian numeration system?",
    answer: "Twelve crore thirty-four lakh fifty-six thousand seven hundred eighty-nine",
    options: [
      "Twelve crore thirty-four lakh fifty-six thousand seven hundred eighty-nine",
      "One hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine",
      "Twelve million thirty-four thousand five hundred sixty-seven"
    ],
    hint: "In the Indian system, periods are Crores (2 digits), Lakhs (2 digits), Thousands (2 digits), and Ones (3 digits). Read each period separately!",
    misconception: "In the Indian system, 12,34,56,789 is read period by period: 12 crore, 34 lakh, 56 thousand, 789. Each period is read as a 2-digit number except the ones period which has 3 digits."
  },
  {
    type: 'sort',
    question: "Drag each number to its correct numeration system period name!",
    answer: "sort",
    options: [],
    hint: "Indian system: Crores-Lakhs-Thousands-Ones. International: Millions-Thousands-Ones. Match the period names!",
    misconception: "The Indian system uses Crores, Lakhs, Thousands, and Ones. The International system uses Millions, Thousands, and Ones. The same number has different period groupings in each system!",
    sortItems: [
      { id: 'i1', label: 'Indian 2-digit period', icon: 'indian', correctBin: 'crore' },
      { id: 'i2', label: 'Indian 2-digit period', icon: 'indian', correctBin: 'lakh' },
      { id: 'i3', label: 'International 3-digit period', icon: 'international', correctBin: 'million' },
      { id: 'i4', label: 'Both systems share this', icon: 'placevalue', correctBin: 'thousand' },
    ],
    bins: [
      { id: 'crore', label: 'Crores 🇮🇳', color: '#F59E0B' },
      { id: 'lakh', label: 'Lakhs 🇮🇳', color: '#10B981' },
      { id: 'million', label: 'Millions 🌍', color: '#3B82F6' },
      { id: 'thousand', label: 'Thousands (Both) 🌐', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "In the number 5,43,21,098, what is the PLACE VALUE of digit 5?",
    answer: "5,00,00,000 (Five crore)",
    options: [
      "5,00,00,000 (Five crore)",
      "5 (Five)",
      "50,00,000 (Fifty lakh)",
      "5,00,000 (Five lakh)"
    ],
    hint: "The digit 5 is in the crores place. Place value = digit × value of its position. What is the value of the crores place?",
    misconception: "Place value depends on position! The digit 5 is in the crores place, so its place value is 5 × 1,00,00,000 = 5,00,00,000. Face value is just 5. Do not confuse place value with face value!"
  },
  {
    type: 'sort',
    question: "Drag each number to its correct expanded form component!",
    answer: "sort",
    options: [],
    hint: "Break the number into each digit × its place value. 3,45,21,987 = 3,00,00,000 + 40,00,000 + 5,00,000 + 20,000 + 1,000 + 900 + 80 + 7",
    misconception: "Expanded form breaks a number into each digit multiplied by its place value. Match each digit to its correct place value component. Zero digits contribute nothing but must not be skipped in position!",
    sortItems: [
      { id: 'e1', label: 'Digit 3 in 3,45,21,987', icon: 'expanded', correctBin: 'b-3cr' },
      { id: 'e2', label: 'Digit 4 in 3,45,21,987', icon: 'expanded', correctBin: 'b-40l' },
      { id: 'e3', label: 'Digit 5 in 3,45,21,987', icon: 'expanded', correctBin: 'b-5l' },
      { id: 'e4', label: 'Digit 9 in 3,45,21,987', icon: 'expanded', correctBin: 'b-900' },
    ],
    bins: [
      { id: 'b-3cr', label: '3,00,00,000', color: '#3B82F6' },
      { id: 'b-40l', label: '40,00,000', color: '#10B981' },
      { id: 'b-5l', label: '5,00,000', color: '#F59E0B' },
      { id: 'b-900', label: '900', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "Which is greater: 4,56,78,901 or 4,56,78,109?",
    answer: "4,56,78,901",
    options: [
      "4,56,78,901",
      "4,56,78,109",
      "They are equal"
    ],
    hint: "Compare digit by digit from the highest place value (left). The digits match until the hundreds place. What happens at the hundreds place?",
    misconception: "Compare from the highest place value leftward! Both numbers match until the hundreds place: 9 hundreds vs 1 hundred. Since 900 > 100, the number 4,56,78,901 is greater. The first differing digit from the left decides!"
  },
  {
    type: 'sort',
    question: "Drag each number to its correct position in ascending order!",
    answer: "sort",
    options: [],
    hint: "Ascending = smallest to largest. First compare by number of digits (fewer digits = smaller). Then compare digit by digit from the left.",
    misconception: "Ascending order means smallest to largest! First check the number of digits — 34,56,789 (8 digits) is smallest. Then compare the remaining 9-digit numbers from the highest place value leftward.",
    sortItems: [
      { id: 'a1', label: '34,56,789', icon: 'ascending', correctBin: 'pos-1' },
      { id: 'a2', label: '3,45,67,809', icon: 'ascending', correctBin: 'pos-2' },
      { id: 'a3', label: '3,45,67,890', icon: 'ascending', correctBin: 'pos-3' },
      { id: 'a4', label: '3,45,67,908', icon: 'ascending', correctBin: 'pos-4' },
    ],
    bins: [
      { id: 'pos-1', label: '1st (Smallest)', color: '#10B981' },
      { id: 'pos-2', label: '2nd', color: '#3B82F6' },
      { id: 'pos-3', label: '3rd', color: '#F59E0B' },
      { id: 'pos-4', label: '4th (Largest)', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "Using digits 9, 8, 7, 6, 5, 4, 3, 2, 0, what is the GREATEST 9-digit number you can form?",
    answer: "9,87,65,432",
    options: [
      "9,87,65,432",
      "2,03,45,678",
      "9,87,65,420",
      "0,98,76,543"
    ],
    hint: "For the greatest number, arrange digits in DESCENDING order (largest to smallest) from left to right.",
    misconception: "For the greatest number, place the largest digit at the highest place value and arrange in descending order: 9, 8, 7, 6, 5, 4, 3, 2, 0 gives 9,87,65,432. Zero goes last, not first — zero cannot be the leading digit!"
  },
  {
    type: 'sort',
    question: "Drag each number to its correct rounded value!",
    answer: "sort",
    options: [],
    hint: "Nearest 10: look at ones digit (0-4 down, 5-9 up). Nearest 100: look at tens digit. Nearest 1000: look at hundreds digit.",
    misconception: "Rounding rules: look at the digit one place to the RIGHT of your target. 0-4 rounds down, 5-9 rounds up. 4,56,789 to nearest 1000: look at hundreds digit (7), so round up to 4,57,000.",
    sortItems: [
      { id: 'r1', label: '4,56,789 → nearest 10', icon: 'rounding', correctBin: 'b-456790' },
      { id: 'r2', label: '4,56,789 → nearest 100', icon: 'rounding', correctBin: 'b-456800' },
      { id: 'r3', label: '4,56,789 → nearest 1000', icon: 'rounding', correctBin: 'b-457000' },
      { id: 'r4', label: '4,56,712 → nearest 1000', icon: 'rounding', correctBin: 'b-457000b' },
    ],
    bins: [
      { id: 'b-456790', label: '4,56,790', color: '#3B82F6' },
      { id: 'b-456800', label: '4,56,800', color: '#10B981' },
      { id: 'b-457000', label: '4,57,000', color: '#F59E0B' },
      { id: 'b-457000b', label: '4,57,000', color: '#8B5CF6' },
    ]
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface LargeNumbersGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LargeNumbersGame({ width = 720, height = 560, onComplete }: LargeNumbersGameProps) {
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
      const msg = "Excellent! You understand large numbers perfectly!";
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
      const compMsg = "Wonderful! You are a Large Numbers champion!";
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
        const msg = "Fantastic! You sorted the large numbers perfectly!";
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
      {/* Scene Background */}
      <MathClassroomScene width={width} height={height} />

      {/* Mascot Meera */}
      <MathematicianMeera mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-28 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-blue-300 flex items-center gap-2">
            <span className="text-xs font-bold text-blue-800">Meera&apos;s Large Numbers</span>
            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">
              {screen === 'teaching' ? 'Intro' : `Q ${challengeIdx + 1}/${CHALLENGES.length}`}
            </span>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <StarRow count={Math.min(5, Math.floor(score / 15) + 1)} total={5} />
            <button
              onClick={handleShowHint}
              className="bg-blue-400 hover:bg-blue-500 text-blue-950 font-bold px-3 py-1 rounded-full text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
            >
              💡 Hint
            </button>
          </div>
        )}
      </div>

      {/* ─── SCREEN 1: TEACHING ─────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 pt-20">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} rounded-3xl p-8 shadow-2xl text-white border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-30 rounded-xl font-bold text-sm cursor-pointer transition-all"
              >
                ← Back
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                    audioManager.play('success');
                  }
                }}
                className="px-6 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-black text-sm shadow-lg cursor-pointer transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY ─────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 pt-20 pb-8">
          {/* Question Banner */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border-2 border-blue-300 max-w-xl text-center"
          >
            <h3 className="text-base font-black text-gray-800">{currentChallenge.question}</h3>
          </motion.div>

          {/* Challenge Content: Multiple Choice */}
          {currentChallenge.type === 'identify' && (
            <div className="grid grid-cols-1 gap-3 w-full max-w-lg my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-white hover:bg-blue-50 text-gray-800 border-2 border-blue-200";
                if (selectedOpt) {
                  if (isCorrect) btnStyle = "bg-green-500 text-white border-2 border-green-600 shadow-lg scale-105";
                  else if (isSelected) btnStyle = "bg-red-500 text-white border-2 border-red-600";
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                    onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={!!selectedOpt}
                    className={`py-3 px-6 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer text-left ${btnStyle}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Challenge Content: Drag and Drop Sorting */}
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
                      className={`flex-1 min-w-[110px] max-w-[150px] h-28 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-2 transition-all shadow-md ${
                        isHover ? 'bg-blue-100 scale-105' : 'bg-white/90'
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
                        <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-blue-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'}`} style={{ width: 110, height: 95 }}>
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

          {/* Bottom Action / Success Bar */}
          <div className="h-14 flex items-center justify-center w-full">
            {selectedOpt && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Feedback & Overlay Components */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
