'use client';

/**
 * DecimalsGame — Class 5 Mathematics (CISCE / ICSE Curriculum)
 *
 * CISCE Nodes:
 * - c5_math_022: Fraction and decimal relationship
 * - c5_math_023: Tenths and hundredths place introduction
 * - c5_math_024: Decimal place value through thousandths
 * - c5_math_025: Decimal expanded form
 * - c5_math_026: Types of decimals (like/unlike, equivalent)
 * - c5_math_027: Comparison of decimals
 * - c5_math_028: Ordering decimals (ascending/descending)
 * - c5_math_029: Addition and subtraction of decimals
 * - c5_math_030: Word problems on decimal addition and subtraction
 * - c5_math_031: Multiplication of decimals by powers of 10
 * - c5_math_032: Multiplication of decimals by whole numbers and decimals
 *
 * Mascot: Shopkeeper Ravi — a friendly shopkeeper with a calculator,
 * cash register, and price tags.
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

function CoinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <circle cx="25" cy="25" r="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
      <text x="25" y="30" fontSize="14" fill="#D97706" textAnchor="middle" fontWeight="bold">₹</text>
    </svg>
  );
}

function PriceTagIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M8 20 L20 8 L42 8 L42 30 L30 42 L8 42 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="36" cy="14" r="3" fill="white" />
      <text x="22" y="30" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">₹4.50</text>
    </svg>
  );
}

function CalculatorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="4" width="30" height="42" fill="#1F2937" stroke="#111827" strokeWidth="2" rx="4" />
      <rect x="14" y="8" width="22" height="10" fill="#D1FAE5" rx="2" />
      <text x="25" y="16" fontSize="7" fill="#065F46" textAnchor="middle" fontWeight="bold">3.14</text>
      <rect x="14" y="22" width="6" height="6" fill="#6B7280" rx="1" />
      <rect x="22" y="22" width="6" height="6" fill="#6B7280" rx="1" />
      <rect x="30" y="22" width="6" height="6" fill="#F59E0B" rx="1" />
      <rect x="14" y="30" width="6" height="6" fill="#6B7280" rx="1" />
      <rect x="22" y="30" width="6" height="6" fill="#6B7280" rx="1" />
      <rect x="30" y="30" width="6" height="6" fill="#F59E0B" rx="1" />
      <rect x="14" y="38" width="14" height="6" fill="#6B7280" rx="1" />
      <rect x="30" y="38" width="6" height="6" fill="#EF4444" rx="1" />
    </svg>
  );
}

function PlaceValueChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="3" y="8" width="44" height="34" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="2" />
      <line x1="3" y1="20" x2="47" y2="20" stroke="#D97706" strokeWidth="1" />
      <line x1="17" y1="8" x2="17" y2="42" stroke="#D97706" strokeWidth="1" />
      <line x1="31" y1="8" x2="31" y2="42" stroke="#D97706" strokeWidth="1" />
      <text x="10" y="17" fontSize="6" fill="#92400E" textAnchor="middle">H</text>
      <text x="24" y="17" fontSize="6" fill="#92400E" textAnchor="middle">T</text>
      <text x="38" y="17" fontSize="6" fill="#92400E" textAnchor="middle">O</text>
      <text x="10" y="35" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">3</text>
      <text x="24" y="35" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">2</text>
      <text x="38" y="35" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">5</text>
    </svg>
  );
}

function DecimalPointIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <text x="10" y="32" fontSize="20" fill="#3B82F6" textAnchor="middle" fontWeight="bold">4</text>
      <circle cx="20" cy="32" r="3" fill="#EF4444" />
      <text x="30" y="32" fontSize="20" fill="#10B981" textAnchor="middle" fontWeight="bold">5</text>
      <text x="42" y="32" fontSize="20" fill="#F59E0B" textAnchor="middle" fontWeight="bold">6</text>
    </svg>
  );
}

function RulerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="20" width="42" height="14" fill="#FBBF24" stroke="#D97706" strokeWidth="2" rx="2" />
      <line x1="10" y1="20" x2="10" y2="28" stroke="#92400E" strokeWidth="1.5" />
      <line x1="16" y1="20" x2="16" y2="26" stroke="#92400E" strokeWidth="1" />
      <line x1="22" y1="20" x2="22" y2="28" stroke="#92400E" strokeWidth="1.5" />
      <line x1="28" y1="20" x2="28" y2="26" stroke="#92400E" strokeWidth="1" />
      <line x1="34" y1="20" x2="34" y2="28" stroke="#92400E" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="26" stroke="#92400E" strokeWidth="1" />
      <text x="25" y="42" fontSize="7" fill="#92400E" textAnchor="middle">cm</text>
    </svg>
  );
}

function CashRegisterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="20" width="38" height="26" fill="#DC2626" stroke="#991B1B" strokeWidth="2" rx="3" />
      <rect x="10" y="8" width="30" height="14" fill="#1F2937" rx="2" />
      <text x="25" y="18" fontSize="8" fill="#10B981" textAnchor="middle" fontFamily="monospace">12.50</text>
      <rect x="10" y="26" width="10" height="8" fill="#FBBF24" rx="1" />
      <rect x="22" y="26" width="10" height="8" fill="#FBBF24" rx="1" />
      <rect x="34" y="26" width="6" height="8" fill="#FBBF24" rx="1" />
      <rect x="10" y="36" width="30" height="6" fill="#FCA5A5" rx="1" />
    </svg>
  );
}

function ReceiptIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M12 4 L38 4 L38 44 L34 42 L30 44 L26 42 L22 44 L18 42 L14 44 L12 42 Z" fill="white" stroke="#6B7280" strokeWidth="1.5" />
      <line x1="16" y1="12" x2="34" y2="12" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="16" y1="18" x2="30" y2="18" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="16" y1="24" x2="34" y2="24" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="16" y1="30" x2="28" y2="30" stroke="#9CA3AF" strokeWidth="1" />
      <text x="25" y="40" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="bold">₹25.75</text>
    </svg>
  );
}

function MultiplyByTenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <text x="8" y="28" fontSize="12" fill="#3B82F6" textAnchor="middle" fontWeight="bold">2.5</text>
      <text x="22" y="28" fontSize="14" fill="#374151" textAnchor="middle" fontWeight="bold">×</text>
      <text x="35" y="28" fontSize="12" fill="#10B981" textAnchor="middle" fontWeight="bold">10</text>
      <text x="25" y="44" fontSize="10" fill="#EF4444" textAnchor="middle" fontWeight="bold">= 25</text>
    </svg>
  );
}

function ExpandedFormIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <text x="25" y="14" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">3.245</text>
      <line x1="6" y1="20" x2="44" y2="20" stroke="#9CA3AF" strokeWidth="1" />
      <text x="25" y="34" fontSize="7" fill="#374151" textAnchor="middle">3+0.2+0.04</text>
      <text x="25" y="44" fontSize="7" fill="#374151" textAnchor="middle">+0.005</text>
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'coin': return <CoinIcon size={size} />;
    case 'pricetag': return <PriceTagIcon size={size} />;
    case 'calculator': return <CalculatorIcon size={size} />;
    case 'placevalue': return <PlaceValueChartIcon size={size} />;
    case 'decimalpoint': return <DecimalPointIcon size={size} />;
    case 'ruler': return <RulerIcon size={size} />;
    case 'cashregister': return <CashRegisterIcon size={size} />;
    case 'receipt': return <ReceiptIcon size={size} />;
    case 'multiplyten': return <MultiplyByTenIcon size={size} />;
    case 'expandedform': return <ExpandedFormIcon size={size} />;
    default: return <CoinIcon size={size} />;
  }
}

// ─── Shop Scene Background ────────────────────────────────────

function ShopScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="shop-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>
          <linearGradient id="shop-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="shop-shelf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect width="720" height="400" fill="url(#shop-sky)" />
        {/* Shop awning */}
        <path d="M0 60 L720 60 L720 100 L0 100 Z" fill="#EF4444" />
        <path d="M0 60 L60 100 L120 60 L180 100 L240 60 L300 100 L360 60 L420 100 L480 60 L540 100 L600 60 L660 100 L720 60 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
        <rect x="0" y="100" width="720" height="10" fill="#FBBF24" />
        {/* Shop sign */}
        <rect x="280" y="20" width="160" height="35" fill="#1F2937" rx="4" />
        <text x="360" y="42" fontSize="16" fill="#FBBF24" textAnchor="middle" fontWeight="bold">Ravi&apos;s Shop</text>
        {/* Shelves with items */}
        <rect x="40" y="130" width="200" height="12" fill="url(#shop-shelf)" rx="2" />
        <rect x="50" y="100" width="30" height="30" fill="#10B981" rx="3" />
        <rect x="85" y="105" width="25" height="25" fill="#3B82F6" rx="3" />
        <rect x="115" y="100" width="30" height="30" fill="#F59E0B" rx="3" />
        <rect x="150" y="108" width="22" height="22" fill="#EC4899" rx="3" />
        <rect x="180" y="100" width="30" height="30" fill="#8B5CF6" rx="3" />
        <rect x="40" y="180" width="200" height="12" fill="url(#shop-shelf)" rx="2" />
        <circle cx="60" cy="170" r="12" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        <circle cx="90" cy="170" r="12" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
        <circle cx="120" cy="170" r="12" fill="#22C55E" stroke="#16A34A" strokeWidth="2" />
        <circle cx="150" cy="170" r="12" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
        {/* Cash register counter */}
        <rect x="480" y="200" width="200" height="180" fill="#92400E" rx="4" />
        <rect x="490" y="210" width="180" height="60" fill="#1F2937" rx="4" />
        <text x="580" y="245" fontSize="18" fill="#10B981" textAnchor="middle" fontFamily="monospace" fontWeight="bold">₹12.50</text>
        <rect x="500" y="285" width="40" height="30" fill="#FBBF24" rx="2" />
        <rect x="550" y="285" width="40" height="30" fill="#FBBF24" rx="2" />
        <rect x="600" y="285" width="40" height="30" fill="#EF4444" rx="2" />
        {/* Floor */}
        <rect x="0" y="400" width="720" height="160" fill="url(#shop-floor)" />
        {/* Coins on floor */}
        <circle cx="100" cy="450" r="18" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        <text x="100" y="456" fontSize="12" fill="#D97706" textAnchor="middle" fontWeight="bold">₹</text>
        <circle cx="180" cy="470" r="15" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        <text x="180" y="475" fontSize="10" fill="#D97706" textAnchor="middle" fontWeight="bold">₹</text>
        <circle cx="300" cy="460" r="20" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
        <text x="300" y="467" fontSize="14" fill="#D97706" textAnchor="middle" fontWeight="bold">₹</text>
      </svg>
    </div>
  );
}

// ─── Mascot: Shopkeeper Ravi ──────────────────────────────────

function ShopkeeperRavi({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
          {/* Turban */}
          <path d="M25 20 Q45 5 65 20 L65 28 L25 28 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
          <circle cx="45" cy="14" r="4" fill="#FBBF24" />
          {/* Head & Face */}
          <circle cx="45" cy="38" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="38" cy="36" r="2.5" fill="#1E293B" />
          <circle cx="52" cy="36" r="2.5" fill="#1E293B" />
          <circle cx="39" cy="35" r="0.8" fill="white" />
          <circle cx="53" cy="35" r="0.8" fill="white" />
          {/* Glasses */}
          <circle cx="38" cy="36" r="5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="52" cy="36" r="5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="43" y1="36" x2="47" y2="36" stroke="#1E293B" strokeWidth="1.5" />
          {/* Smile */}
          <path d="M40 45 Q45 49 50 45" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Mustache */}
          <path d="M38 43 Q42 41 45 43 Q48 41 52 43" stroke="#1E1B4B" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Body with blue shirt */}
          <path d="M27 56 L63 56 L70 95 L20 95 Z" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="2" />
          {/* Calculator in pocket */}
          <rect x="35" y="65" width="20" height="18" fill="#1F2937" rx="2" />
          <rect x="37" y="67" width="16" height="6" fill="#D1FAE5" rx="1" />
          <rect x="37" y="75" width="4" height="3" fill="#6B7280" rx="0.5" />
          <rect x="43" y="75" width="4" height="3" fill="#6B7280" rx="0.5" />
          <rect x="49" y="75" width="4" height="3" fill="#F59E0B" rx="0.5" />
          <rect x="37" y="79" width="4" height="3" fill="#6B7280" rx="0.5" />
          <rect x="43" y="79" width="4" height="3" fill="#6B7280" rx="0.5" />
          <rect x="49" y="79" width="4" height="3" fill="#EF4444" rx="0.5" />
          {/* Price tag in hand */}
          <line x1="68" y1="65" x2="80" y2="50" stroke="#991B1B" strokeWidth="1.5" />
          <path d="M75 45 L85 45 L85 55 L78 60 L75 57 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          <circle cx="82" cy="48" r="1.5" fill="white" />
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
    title: "Welcome to Ravi's Shop! 🏪",
    text: "Shopkeeper Ravi uses decimals every day — pricing items, calculating totals, and giving change! Decimals are fractions with denominators 10, 100, or 1000. Let's learn decimals through shopping!",
    emoji: "🏪",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Welcome to Ravi's Shop! Today we learn decimals through shopping — fractions with denominators 10, 100, or 1000. Let's explore decimal place value, operations, and more!"
  },
  {
    title: "Decimal Place Value 📊",
    text: "In 3.245: 3 is ones, 2 is tenths (2/10), 4 is hundredths (4/100), 5 is thousandths (5/1000). Each place to the right of the decimal point is 1/10 of the previous place. Expanded form: 3 + 0.2 + 0.04 + 0.005.",
    emoji: "📊",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "In 3.245, 3 is ones, 2 is tenths, 4 is hundredths, and 5 is thousandths. Each place to the right is one-tenth of the previous place. Expanded form breaks it into 3 plus 0.2 plus 0.04 plus 0.005."
  },
  {
    title: "Comparing & Ordering Decimals 🔍",
    text: "To compare decimals, align the decimal points and compare digit by digit from left to right. 0.5 = 0.50 (trailing zeros don't change value). To order: 0.3, 0.25, 0.348 → 0.25, 0.3, 0.348 (ascending). Always compare the same place values!",
    emoji: "🔍",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "To compare decimals, align decimal points and compare digit by digit from left to right. Trailing zeros don't change the value — 0.5 equals 0.50. To order decimals, compare place values carefully!"
  },
  {
    title: "Adding & Subtracting Decimals ➕➖",
    text: "Always align decimal points! Write numbers so decimal points are in a column. Add zeros as placeholders if needed. 3.45 + 2.3 = 3.45 + 2.30 = 5.75. For subtraction: 5.00 - 2.75 = 2.25. Word problems use money and measurements!",
    emoji: "➕",
    bgColor: "from-orange-500 to-red-600",
    spoken: "Always align decimal points when adding or subtracting! Write numbers so decimal points line up in a column. Add zeros as placeholders if needed. Word problems often use money and measurements."
  },
  {
    title: "Multiplying Decimals ✖️",
    text: "Multiply as usual, then count decimal places in both numbers and place the decimal point in the product. 2.5 × 3 = 7.5 (one decimal place). Multiplying by 10 shifts the decimal right one place: 2.5 × 10 = 25. By 100: 2.5 × 100 = 250!",
    emoji: "✖️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Multiply as usual, then count decimal places in both numbers and place the decimal point in the product. Multiplying by 10 shifts the decimal right one place. By 100, it shifts two places!"
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is the fraction form of 0.25?",
    answer: "25/100",
    options: ["25/10", "25/100", "25/1000", "1/25"],
    hint: "0.25 has two digits after the decimal point, so the denominator is 100. The numerator is 25.",
    misconception: "0.25 means 25 hundredths. Count the digits after the decimal point — there are 2, so the denominator is 100 (not 10 or 1000). Therefore 0.25 = 25/100 = 1/4. The number of decimal places tells you the denominator!"
  },
  {
    type: 'sort',
    question: "Drag each decimal to its correct place value description!",
    answer: "sort",
    options: [],
    hint: "In 3.245: 3=ones, 2=tenths, 4=hundredths, 5=thousandths. Each place is 1/10 of the previous.",
    misconception: "In 3.245: the 3 is in the ones place, the 2 is in the tenths place (2/10), the 4 is in the hundredths place (4/100), and the 5 is in the thousandths place (5/1000). Each place to the right of the decimal is one-tenth of the previous place!",
    sortItems: [
      { id: 'pv1', label: '3 in 3.245', icon: 'placevalue', correctBin: 'ones' },
      { id: 'pv2', label: '2 in 3.245', icon: 'placevalue', correctBin: 'tenths' },
      { id: 'pv3', label: '4 in 3.245', icon: 'placevalue', correctBin: 'hundredths' },
      { id: 'pv4', label: '5 in 3.245', icon: 'placevalue', correctBin: 'thousandths' },
    ],
    bins: [
      { id: 'ones', label: 'Ones', color: '#3B82F6' },
      { id: 'tenths', label: 'Tenths', color: '#10B981' },
      { id: 'hundredths', label: 'Hundredths', color: '#F59E0B' },
      { id: 'thousandths', label: 'Thousandths', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is the expanded form of 4.506?",
    answer: "4 + 0.5 + 0.006",
    options: ["4 + 0.5 + 0.006", "4 + 0.05 + 0.006", "4 + 5 + 6", "4.5 + 0.06"],
    hint: "Break each digit by its place value: 4 ones, 5 tenths (0.5), 0 hundredths (0.00), 6 thousandths (0.006).",
    misconception: "Expanded form breaks each digit by its place value! In 4.506: 4 is ones (4), 5 is tenths (0.5), 0 is hundredths (0.00), 6 is thousandths (0.006). So 4.506 = 4 + 0.5 + 0.00 + 0.006 = 4 + 0.5 + 0.006. Don't forget the zero in hundredths place!"
  },
  {
    type: 'sort',
    question: "Drag each decimal to its correct order position (ascending: smallest to largest)!",
    answer: "sort",
    options: [],
    hint: "Compare decimals digit by digit from left. 0.25 < 0.3 < 0.348 < 0.4. Align decimal points!",
    misconception: "To order decimals, compare digit by digit from left to right. 0.25 (25 hundredths), 0.3 (30 hundredths), 0.348 (348 thousandths), 0.4 (40 hundredths). Ascending order: 0.25, 0.3, 0.348, 0.4. Don't just compare the number of digits — compare place values!",
    sortItems: [
      { id: 'o1', label: '0.25', icon: 'decimalpoint', correctBin: 'pos-1' },
      { id: 'o2', label: '0.3', icon: 'decimalpoint', correctBin: 'pos-2' },
      { id: 'o3', label: '0.348', icon: 'decimalpoint', correctBin: 'pos-3' },
      { id: 'o4', label: '0.4', icon: 'decimalpoint', correctBin: 'pos-4' },
    ],
    bins: [
      { id: 'pos-1', label: 'Smallest', color: '#3B82F6' },
      { id: 'pos-2', label: '2nd', color: '#10B981' },
      { id: 'pos-3', label: '3rd', color: '#F59E0B' },
      { id: 'pos-4', label: 'Largest', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "Ravi bought vegetables for ₹45.75 and fruits for ₹32.50. What is the total cost?",
    answer: "₹78.25",
    options: ["₹78.25", "₹77.25", "₹78.75", "₹77.125"],
    hint: "Align decimal points: 45.75 + 32.50. Add column by column: 75+50=125 (carry 1), 45+32+1=78. Total = 78.25.",
    misconception: "Always align decimal points when adding decimals! 45.75 + 32.50: hundredths 5+0=5, tenths 7+5=12 (write 2, carry 1), ones 5+2+1=8, tens 4+3=7. Total = ₹78.25. Never add without aligning the decimal points — that gives wrong answers!"
  },
  {
    type: 'sort',
    question: "Drag each addition/subtraction problem to its correct result!",
    answer: "sort",
    options: [],
    hint: "Align decimal points! Add zeros as placeholders. 3.45 + 2.3 = 3.45 + 2.30 = 5.75.",
    misconception: "Always align decimal points! 3.45 + 2.3 = 3.45 + 2.30 = 5.75 (add zero as placeholder). 7.00 - 3.45 = 3.55 (borrow as needed). 12.6 + 4.85 = 12.60 + 4.85 = 17.45. 10.00 - 6.25 = 3.75. Never add decimals without aligning the decimal points!",
    sortItems: [
      { id: 'a1', label: '3.45 + 2.3', icon: 'calculator', correctBin: 'r-5-75' },
      { id: 'a2', label: '7.00 - 3.45', icon: 'calculator', correctBin: 'r-3-55' },
      { id: 'a3', label: '12.6 + 4.85', icon: 'calculator', correctBin: 'r-17-45' },
      { id: 'a4', label: '10.00 - 6.25', icon: 'calculator', correctBin: 'r-3-75' },
    ],
    bins: [
      { id: 'r-5-75', label: '5.75', color: '#3B82F6' },
      { id: 'r-3-55', label: '3.55', color: '#10B981' },
      { id: 'r-17-45', label: '17.45', color: '#F59E0B' },
      { id: 'r-3-75', label: '3.75', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is 2.5 × 10? (Multiply by power of 10)",
    answer: "25",
    options: ["25", "2.50", "250", "0.25"],
    hint: "Multiplying by 10 shifts the decimal point one place to the RIGHT. 2.5 → 25.0 = 25.",
    misconception: "Multiplying by 10 shifts the decimal point one place to the RIGHT! 2.5 × 10 = 25 (decimal moves right one place). By 100, it moves two places: 2.5 × 100 = 250. By 1000, three places: 2.5 × 1000 = 2500. The decimal moves RIGHT by the number of zeros in the multiplier!"
  },
  {
    type: 'sort',
    question: "Drag each multiplication problem to its correct product!",
    answer: "sort",
    options: [],
    hint: "Multiply normally, then count total decimal places in both numbers and place the decimal in the product.",
    misconception: "Multiply as whole numbers, then count decimal places! 2.5 × 3 = 7.5 (1 decimal place). 0.4 × 0.5 = 0.20 = 0.2 (2 decimal places). 1.2 × 1.5 = 1.80 = 1.8 (2 decimal places). 3.25 × 4 = 13.00 = 13 (2 decimal places, but trailing zeros removed). Count decimal places in both factors!",
    sortItems: [
      { id: 'm1', label: '2.5 × 3', icon: 'multiplyten', correctBin: 'p-7-5' },
      { id: 'm2', label: '0.4 × 0.5', icon: 'multiplyten', correctBin: 'p-0-2' },
      { id: 'm3', label: '1.2 × 1.5', icon: 'multiplyten', correctBin: 'p-1-8' },
      { id: 'm4', label: '3.25 × 4', icon: 'multiplyten', correctBin: 'p-13' },
    ],
    bins: [
      { id: 'p-7-5', label: '7.5', color: '#3B82F6' },
      { id: 'p-0-2', label: '0.2', color: '#10B981' },
      { id: 'p-1-8', label: '1.8', color: '#F59E0B' },
      { id: 'p-13', label: '13', color: '#8B5CF6' },
    ]
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface DecimalsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function DecimalsGame({ width = 720, height = 560, onComplete }: DecimalsGameProps) {
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
  }, [challengeIdx, screen, resetInactivityTimer, currentChallenge]);

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
      const msg = "Perfect! You are a decimal shopping expert!";
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
      const compMsg = "Wonderful! You are a brilliant decimal master shopper!";
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
        const msg = "Fantastic! You sorted all the decimals perfectly!";
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
      <ShopScene width={width} height={height} />
      <ShopkeeperRavi mood={mascotMood} speaking={speakingText} />

      <div className="absolute top-4 left-4 right-28 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-gold-300 flex items-center gap-2">
            <span className="text-xs font-bold text-gold-800">Ravi&apos;s Decimals</span>
            <span className="text-xs bg-gold-500 text-white px-2 py-0.5 rounded-full font-bold">
              {screen === 'teaching' ? 'Intro' : `Q ${challengeIdx + 1}/${CHALLENGES.length}`}
            </span>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <StarRow count={Math.min(5, Math.floor(score / 15) + 1)} total={5} />
            <button
              onClick={handleShowHint}
              className="bg-gold-400 hover:bg-gold-500 text-gold-950 font-bold px-3 py-1 rounded-full text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
            >
              💡 Hint
            </button>
          </div>
        )}
      </div>

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
                className="px-6 py-2 bg-white text-gold-600 hover:bg-gold-50 rounded-xl font-black text-sm shadow-lg cursor-pointer transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 pt-20 pb-8">
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border-2 border-gold-300 max-w-xl text-center"
          >
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
            {selectedOpt && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-gold-500 to-gold-500 hover:from-gold-600 hover:to-gold-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-gold-500 to-gold-500 hover:from-gold-600 hover:to-gold-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
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
