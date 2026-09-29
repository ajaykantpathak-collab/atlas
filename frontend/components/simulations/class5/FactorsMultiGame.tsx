'use client';

/**
 * FactorsMultiGame — Class 5 Mathematics (CISCE / ICSE Curriculum)
 *
 * CISCE Nodes:
 * - c5_math_033: Factors, common factors and Highest common factors of two numbers
 * - c5_math_034: Multiples, common multiples and Lowest Common multiples of two numbers
 * - c5_math_035: Prime and composite numbers, Twin primes and co-prime
 * - c5_math_036: Prime factors - Factor Tree Method
 * - c5_math_037: Highest Common Factor (HCF) - Listing Method and Common Division
 * - c5_math_038: Lowest Common Multiples (LCM) - Listing Method and Common Division
 * - c5_math_039: Relationship between HCF and LCM
 * - c5_math_040: Test for divisibility by 2, 3, 4, 5, 9, 10, 11
 *
 * Mascot: Detective Priya — a number detective with a magnifying glass,
 * detective hat, and a notepad for finding factors and clues.
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

function MagnifyingGlassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="20" cy="20" r="14" fill="none" stroke="#1E40AF" strokeWidth="3" />
      <circle cx="20" cy="20" r="11" fill="#DBEAFE" opacity="0.5" />
      <line x1="30" y1="30" x2="44" y2="44" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
      <text x="20" y="24" fontSize="10" fill="#1E40AF" textAnchor="middle" fontWeight="bold">?</text>
    </svg>
  );
}

function FactorTreeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="8" r="6" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      <text x="25" y="11" fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">24</text>
      <line x1="25" y1="14" x2="14" y2="24" stroke="#6B7280" strokeWidth="1.5" />
      <line x1="25" y1="14" x2="36" y2="24" stroke="#6B7280" strokeWidth="1.5" />
      <circle cx="14" cy="28" r="5" fill="#3B82F6" stroke="#1E40AF" strokeWidth="1.5" />
      <text x="14" y="31" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">6</text>
      <circle cx="36" cy="28" r="5" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      <text x="36" y="31" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">4</text>
      <line x1="14" y1="33" x2="8" y2="40" stroke="#6B7280" strokeWidth="1" />
      <line x1="14" y1="33" x2="20" y2="40" stroke="#6B7280" strokeWidth="1" />
      <line x1="36" y1="33" x2="30" y2="40" stroke="#6B7280" strokeWidth="1" />
      <line x1="36" y1="33" x2="42" y2="40" stroke="#6B7280" strokeWidth="1" />
      <circle cx="8" cy="43" r="3" fill="#EF4444" />
      <circle cx="20" cy="43" r="3" fill="#EF4444" />
      <circle cx="30" cy="43" r="3" fill="#EF4444" />
      <circle cx="42" cy="43" r="3" fill="#EF4444" />
    </svg>
  );
}

function PrimeNumberIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="6" width="38" height="38" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="6" />
      <text x="25" y="22" fontSize="10" fill="#92400E" textAnchor="middle" fontWeight="bold">PRIME</text>
      <text x="25" y="36" fontSize="14" fill="#DC2626" textAnchor="middle" fontWeight="bold">7</text>
      <circle cx="12" cy="12" r="2" fill="#10B981" />
      <circle cx="38" cy="12" r="2" fill="#10B981" />
    </svg>
  );
}

function CompositeNumberIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="6" width="38" height="38" fill="#DBEAFE" stroke="#1E40AF" strokeWidth="2" rx="6" />
      <text x="25" y="20" fontSize="8" fill="#1E40AF" textAnchor="middle" fontWeight="bold">COMPOSITE</text>
      <text x="25" y="36" fontSize="14" fill="#DC2626" textAnchor="middle" fontWeight="bold">12</text>
      <text x="14" y="44" fontSize="6" fill="#6B7280">1·2·3·4·6·12</text>
    </svg>
  );
}

function TwinPrimesIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="15" cy="25" r="10" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      <text x="15" y="29" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">11</text>
      <circle cx="35" cy="25" r="10" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      <text x="35" y="29" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">13</text>
      <text x="25" y="14" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="bold">diff=2</text>
      <path d="M22 25 Q25 22 28 25" stroke="#DC2626" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function HcfLcmIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="8" width="20" height="16" fill="#3B82F6" stroke="#1E40AF" strokeWidth="1.5" rx="3" />
      <text x="14" y="19" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">HCF</text>
      <text x="25" y="20" fontSize="14" fill="#374151" textAnchor="middle" fontWeight="bold">×</text>
      <rect x="28" y="8" width="20" height="16" fill="#10B981" stroke="#047857" strokeWidth="1.5" rx="3" />
      <text x="38" y="19" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">LCM</text>
      <text x="25" y="35" fontSize="14" fill="#374151" textAnchor="middle" fontWeight="bold">=</text>
      <text x="25" y="46" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="bold">a × b</text>
    </svg>
  );
}

function DivisibilityRuleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="4" y="6" width="42" height="38" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
      <text x="25" y="18" fontSize="9" fill="#1E40AF" textAnchor="middle" fontWeight="bold">3468</text>
      <line x1="8" y1="22" x2="42" y2="22" stroke="#D97706" strokeWidth="1" />
      <text x="12" y="32" fontSize="7" fill="#10B981" textAnchor="middle">÷2✓</text>
      <text x="22" y="32" fontSize="7" fill="#10B981" textAnchor="middle">÷3✓</text>
      <text x="33" y="32" fontSize="7" fill="#EF4444" textAnchor="middle">÷5✗</text>
      <text x="25" y="42" fontSize="7" fill="#6B7280" textAnchor="middle">rules check</text>
    </svg>
  );
}

function NumberLineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <line x1="4" y1="25" x2="46" y2="25" stroke="#374151" strokeWidth="2" />
      <polygon points="46,25 42,22 42,28" fill="#374151" />
      <line x1="10" y1="22" x2="10" y2="28" stroke="#374151" strokeWidth="1.5" />
      <line x1="20" y1="22" x2="20" y2="28" stroke="#374151" strokeWidth="1.5" />
      <line x1="30" y1="22" x2="30" y2="28" stroke="#374151" strokeWidth="1.5" />
      <line x1="40" y1="22" x2="40" y2="28" stroke="#374151" strokeWidth="1.5" />
      <text x="10" y="38" fontSize="6" fill="#374151" textAnchor="middle">2</text>
      <text x="20" y="38" fontSize="6" fill="#374151" textAnchor="middle">4</text>
      <text x="30" y="38" fontSize="6" fill="#374151" textAnchor="middle">6</text>
      <text x="40" y="38" fontSize="6" fill="#374151" textAnchor="middle">8</text>
      <circle cx="20" cy="25" r="3" fill="#EF4444" />
    </svg>
  );
}

function NotepadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="6" width="34" height="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="3" />
      <rect x="8" y="6" width="34" height="8" fill="#D97706" rx="3" />
      <line x1="14" y1="20" x2="36" y2="20" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="14" y1="26" x2="32" y2="26" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="14" y1="32" x2="36" y2="32" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="14" y1="38" x2="28" y2="38" stroke="#9CA3AF" strokeWidth="1" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'magnifying': return <MagnifyingGlassIcon size={size} />;
    case 'factortree': return <FactorTreeIcon size={size} />;
    case 'prime': return <PrimeNumberIcon size={size} />;
    case 'composite': return <CompositeNumberIcon size={size} />;
    case 'twinprimes': return <TwinPrimesIcon size={size} />;
    case 'hcflcm': return <HcfLcmIcon size={size} />;
    case 'divisibility': return <DivisibilityRuleIcon size={size} />;
    case 'numberline': return <NumberLineIcon size={size} />;
    case 'notepad': return <NotepadIcon size={size} />;
    default: return <MagnifyingGlassIcon size={size} />;
  }
}

// ─── Detective Office Scene Background ────────────────────────

function DetectiveScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="det-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
          <linearGradient id="det-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <linearGradient id="det-board" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect width="720" height="400" fill="url(#det-sky)" />
        {/* Window */}
        <rect x="40" y="50" width="140" height="100" fill="#BFDBFE" stroke="#4F46E5" strokeWidth="4" rx="4" />
        <line x1="110" y1="50" x2="110" y2="150" stroke="#4F46E5" strokeWidth="3" />
        <line x1="40" y1="100" x2="180" y2="100" stroke="#4F46E5" strokeWidth="3" />
        {/* Detective board with clues */}
        <rect x="240" y="40" width="240" height="160" fill="url(#det-board)" rx="6" />
        <text x="360" y="65" fontSize="14" fill="#FBBF24" textAnchor="middle" fontWeight="bold">NUMBER CLUES</text>
        {/* Pins and strings on board */}
        <circle cx="280" cy="90" r="4" fill="#EF4444" />
        <circle cx="360" cy="90" r="4" fill="#10B981" />
        <circle cx="440" cy="90" r="4" fill="#3B82F6" />
        <line x1="280" y1="90" x2="360" y2="90" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="360" y1="90" x2="440" y2="90" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3,2" />
        <rect x="270" y="105" width="40" height="30" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" rx="2" />
        <text x="290" y="125" fontSize="10" fill="#1E40AF" textAnchor="middle" fontWeight="bold">12</text>
        <rect x="340" y="105" width="40" height="30" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" rx="2" />
        <text x="360" y="125" fontSize="10" fill="#1E40AF" textAnchor="middle" fontWeight="bold">18</text>
        <rect x="410" y="105" width="40" height="30" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" rx="2" />
        <text x="430" y="125" fontSize="10" fill="#1E40AF" textAnchor="middle" fontWeight="bold">HCF=6</text>
        <text x="360" y="160" fontSize="9" fill="#FBBF24" textAnchor="middle">Factors: 1,2,3,6</text>
        <text x="360" y="180" fontSize="9" fill="#FBBF24" textAnchor="middle">Multiples: 12,24,36...</text>
        {/* Bookshelf */}
        <rect x="520" y="50" width="160" height="180" fill="#78350F" rx="4" />
        <rect x="530" y="60" width="140" height="8" fill="#1E40AF" rx="1" />
        <rect x="530" y="72" width="140" height="8" fill="#DC2626" rx="1" />
        <rect x="530" y="84" width="140" height="8" fill="#10B981" rx="1" />
        <rect x="530" y="100" width="140" height="8" fill="#F59E0B" rx="1" />
        <rect x="530" y="112" width="140" height="8" fill="#8B5CF6" rx="1" />
        <rect x="530" y="128" width="140" height="8" fill="#EC4899" rx="1" />
        <rect x="530" y="140" width="140" height="8" fill="#06B6D4" rx="1" />
        {/* Magnifying glass on wall */}
        <circle cx="620" cy="180" r="18" fill="none" stroke="#1E40AF" strokeWidth="3" />
        <line x1="633" y1="193" x2="645" y2="205" stroke="#1E40AF" strokeWidth="4" strokeLinecap="round" />
        {/* Floor */}
        <rect x="0" y="400" width="720" height="160" fill="url(#det-floor)" />
        {/* Desk */}
        <rect x="100" y="420" width="200" height="100" fill="#92400E" rx="4" />
        <rect x="110" y="410" width="180" height="15" fill="#B45309" rx="2" />
        {/* Notepad on desk */}
        <rect x="130" y="425" width="50" height="60" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="2" />
        <line x1="135" y1="435" x2="175" y2="435" stroke="#9CA3AF" strokeWidth="1" />
        <line x1="135" y1="445" x2="170" y2="445" stroke="#9CA3AF" strokeWidth="1" />
        <line x1="135" y1="455" x2="175" y2="455" stroke="#9CA3AF" strokeWidth="1" />
        {/* Number chart on floor */}
        <rect x="380" y="430" width="180" height="80" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="3" />
        <text x="470" y="450" fontSize="10" fill="#1E40AF" textAnchor="middle" fontWeight="bold">PRIME NUMBERS</text>
        <text x="470" y="470" fontSize="8" fill="#374151" textAnchor="middle">2, 3, 5, 7, 11, 13</text>
        <text x="470" y="485" fontSize="8" fill="#374151" textAnchor="middle">17, 19, 23, 29, 31</text>
        <text x="470" y="500" fontSize="8" fill="#374151" textAnchor="middle">37, 41, 43, 47...</text>
      </svg>
    </div>
  );
}

// ─── Mascot: Detective Priya ──────────────────────────────────

function DetectivePriya({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
          {/* Detective Hat */}
          <ellipse cx="45" cy="18" rx="24" ry="6" fill="#1E1B4B" />
          <path d="M30 18 Q30 4 45 4 Q60 4 60 18 Z" fill="#1E1B4B" stroke="#0F172A" strokeWidth="1.5" />
          <rect x="35" y="14" width="20" height="5" fill="#8B5CF6" rx="1" />
          {/* Head & Face */}
          <circle cx="45" cy="36" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Hair */}
          <path d="M28 32 Q30 24 45 24 Q60 24 62 32" fill="#1E1B4B" />
          {/* Eyes */}
          <circle cx="38" cy="34" r="2.5" fill="#1E293B" />
          <circle cx="52" cy="34" r="2.5" fill="#1E293B" />
          <circle cx="39" cy="33" r="0.8" fill="white" />
          <circle cx="53" cy="33" r="0.8" fill="white" />
          {/* Magnifying glass over one eye */}
          <circle cx="38" cy="34" r="6" fill="none" stroke="#1E40AF" strokeWidth="2" />
          <circle cx="38" cy="34" r="5" fill="#DBEAFE" opacity="0.4" />
          {/* Smile */}
          <path d="M40 44 Q45 48 50 44" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Body with detective coat */}
          <path d="M27 56 L63 56 L72 95 L18 95 Z" fill="#4F46E5" stroke="#3730A3" strokeWidth="2" />
          {/* Badge */}
          <circle cx="45" cy="70" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <text x="45" y="73" fontSize="7" fill="#1E1B4B" textAnchor="middle" fontWeight="bold">P</text>
          {/* Magnifying glass in hand */}
          <line x1="68" y1="62" x2="78" y2="52" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" />
          <circle cx="82" cy="48" r="6" fill="none" stroke="#1E40AF" strokeWidth="2.5" />
          <circle cx="82" cy="48" r="5" fill="#DBEAFE" opacity="0.5" />
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
    title: "Detective Priya's Number Lab! 🔍",
    text: "Detective Priya investigates numbers! She finds factors (numbers that divide exactly), multiples (products of a number), and classifies numbers as prime or composite. Let's learn to play with numbers like a detective!",
    emoji: "🔍",
    bgColor: "from-gold-500 to-purple-600",
    spoken: "Welcome to Detective Priya's Number Lab! Today we investigate factors, multiples, HCF, LCM, prime and composite numbers, factor trees, and divisibility rules!"
  },
  {
    title: "Factors, Multiples & Prime/Composite 📝",
    text: "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24 (numbers that divide 24 exactly). Multiples of 6: 6, 12, 18, 24, 30... (products of 6). Prime numbers have exactly 2 factors (1 and itself). Composite numbers have more than 2 factors. Twin primes differ by 2 (3,5), (11,13). Co-prime numbers share only factor 1.",
    emoji: "📝",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Factors divide a number exactly. Multiples are products of a number. Prime numbers have exactly two factors. Composite numbers have more. Twin primes differ by 2. Co-prime numbers share only the factor 1."
  },
  {
    title: "Factor Trees & HCF/LCM 🌳",
    text: "Factor tree breaks a number into prime factors: 24 = 6×4 = (2×3)×(2×2) = 2×2×2×3. HCF is the largest common factor of two numbers. LCM is the smallest common multiple. HCF of 12 & 18 = 6. LCM of 4 & 6 = 12. Use listing method or common division!",
    emoji: "🌳",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Factor trees break numbers into prime factors. HCF is the largest common factor. LCM is the smallest common multiple. Use listing method or common division to find them!"
  },
  {
    title: "HCF × LCM = Product of Numbers 🔗",
    text: "There's a magical relationship: HCF × LCM = product of the two numbers! For 12 and 18: HCF=6, LCM=36, 6×36=216, and 12×18=216. They match! So if you know HCF, you can find LCM: LCM = (a×b) ÷ HCF. If you know LCM, HCF = (a×b) ÷ LCM.",
    emoji: "🔗",
    bgColor: "from-orange-500 to-red-600",
    spoken: "The relationship HCF times LCM equals the product of the two numbers! For 12 and 18, HCF is 6, LCM is 36, and 6 times 36 equals 216, which equals 12 times 18. Use this to find one when you know the other!"
  },
  {
    title: "Divisibility Rules 🚦",
    text: "Quick tests without dividing! By 2: last digit is even. By 3: digit sum divisible by 3. By 4: last 2 digits divisible by 4. By 5: last digit is 0 or 5. By 9: digit sum divisible by 9. By 10: last digit is 0. By 11: alternating digit sum difference divisible by 11. Detective Priya uses these as quick filters!",
    emoji: "🚦",
    bgColor: "from-pink-500 to-rose-600",
    spoken: "Divisibility rules are quick tests! By 2, check if the last digit is even. By 3, check if the digit sum is divisible by 3. By 5, check if the last digit is 0 or 5. By 10, check if the last digit is 0. By 9 and 11 have special rules too!"
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What are ALL the factors of 24?",
    answer: "1, 2, 3, 4, 6, 8, 12, 24",
    options: ["1, 2, 3, 4, 6, 8, 12, 24", "1, 2, 3, 4, 6, 8, 12", "2, 3, 4, 6, 8, 12, 24", "1, 2, 4, 6, 12, 24"],
    hint: "Factors are numbers that divide 24 exactly. Start from 1: 1×24=24, 2×12=24, 3×8=24, 4×6=24. List all of them.",
    misconception: "Factors are ALL numbers that divide 24 exactly with no remainder. Check pairs: 1×24=24, 2×12=24, 3×8=24, 4×6=24. So factors are 1, 2, 3, 4, 6, 8, 12, 24. Don't forget 1 and the number itself — they are always factors!"
  },
  {
    type: 'sort',
    question: "Drag each number to its correct classification: Prime or Composite!",
    answer: "sort",
    options: [],
    hint: "Prime = exactly 2 factors (1 and itself). Composite = more than 2 factors. 7 has factors 1,7 (prime). 12 has 1,2,3,4,6,12 (composite).",
    misconception: "Prime numbers have exactly TWO factors (1 and itself). 7 is prime (factors: 1, 7). 11 is prime (factors: 1, 11). 13 is prime (factors: 1, 13). Composite numbers have MORE than two factors. 9 is composite (factors: 1, 3, 9). 15 is composite (factors: 1, 3, 5, 15). 21 is composite (factors: 1, 3, 7, 21). Remember: 1 is neither prime nor composite!",
    sortItems: [
      { id: 'n1', label: '7', icon: 'prime', correctBin: 'prime' },
      { id: 'n2', label: '9', icon: 'composite', correctBin: 'composite' },
      { id: 'n3', label: '11', icon: 'prime', correctBin: 'prime' },
      { id: 'n4', label: '15', icon: 'composite', correctBin: 'composite' },
    ],
    bins: [
      { id: 'prime', label: 'Prime (2 factors)', color: '#10B981' },
      { id: 'composite', label: 'Composite (3+ factors)', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "Which pair are twin primes?",
    answer: "(11, 13)",
    options: ["(11, 13)", "(7, 11)", "(13, 17)", "(3, 7)"],
    hint: "Twin primes are prime numbers that differ by exactly 2. Check: 13-11=2. Are both 11 and 13 prime? Yes!",
    misconception: "Twin primes are pairs of prime numbers that differ by EXACTLY 2. (11, 13): both are prime and 13-11=2, so they are twin primes! (7, 11): both prime but 11-7=4, not twin primes. (3, 7): both prime but 7-3=4, not twin primes. The difference must be exactly 2!"
  },
  {
    type: 'sort',
    question: "Drag each number to its correct prime factorization (factor tree result)!",
    answer: "sort",
    options: [],
    hint: "Build a factor tree! 24 = 6×4 = (2×3)×(2×2) = 2×2×2×3. 36 = 6×6 = (2×3)×(2×3) = 2×2×3×3.",
    misconception: "Factor trees break numbers into prime factors! 24 = 6×4, then 6=2×3 and 4=2×2, so 24 = 2×2×2×3. 36 = 6×6, then each 6=2×3, so 36 = 2×2×3×3. 60 = 6×10, then 6=2×3 and 10=2×5, so 60 = 2×2×3×5. 48 = 6×8, then 6=2×3 and 8=2×2×2, so 48 = 2×2×2×2×3. Keep splitting until all branches are prime!",
    sortItems: [
      { id: 'ft1', label: '24', icon: 'factortree', correctBin: 'pf-2-2-2-3' },
      { id: 'ft2', label: '36', icon: 'factortree', correctBin: 'pf-2-2-3-3' },
      { id: 'ft3', label: '60', icon: 'factortree', correctBin: 'pf-2-2-3-5' },
      { id: 'ft4', label: '48', icon: 'factortree', correctBin: 'pf-2-2-2-2-3' },
    ],
    bins: [
      { id: 'pf-2-2-2-3', label: '2×2×2×3', color: '#3B82F6' },
      { id: 'pf-2-2-3-3', label: '2×2×3×3', color: '#10B981' },
      { id: 'pf-2-2-3-5', label: '2×2×3×5', color: '#F59E0B' },
      { id: 'pf-2-2-2-2-3', label: '2×2×2×2×3', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is the HCF of 12 and 18? (Use listing method)",
    answer: "6",
    options: ["6", "3", "12", "36"],
    hint: "List factors of 12: 1,2,3,4,6,12. List factors of 18: 1,2,3,6,9,18. Common factors: 1,2,3,6. The HIGHEST is the HCF.",
    misconception: "HCF is the HIGHEST Common Factor! Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. Common factors: 1, 2, 3, 6. The highest common factor is 6. HCF is NOT the product or the LCM — it is the largest number that divides BOTH numbers exactly!"
  },
  {
    type: 'sort',
    question: "Drag each pair to its correct LCM!",
    answer: "sort",
    options: [],
    hint: "LCM is the smallest common multiple. List multiples: 4→4,8,12,16,20... 6→6,12,18,24... LCM(4,6)=12.",
    misconception: "LCM is the Lowest Common Multiple — the smallest number that is a multiple of both! LCM(4,6): multiples of 4 are 4,8,12,16,20... multiples of 6 are 6,12,18,24... smallest common is 12. LCM(5,8): multiples of 5 are 5,10,15,20,25,30,35,40... multiples of 8 are 8,16,24,32,40... smallest common is 40. LCM(12,18)=36. LCM(3,9)=9.",
    sortItems: [
      { id: 'l1', label: 'LCM(4, 6)', icon: 'hcflcm', correctBin: 'lcm-12' },
      { id: 'l2', label: 'LCM(5, 8)', icon: 'hcflcm', correctBin: 'lcm-40' },
      { id: 'l3', label: 'LCM(12, 18)', icon: 'hcflcm', correctBin: 'lcm-36' },
      { id: 'l4', label: 'LCM(3, 9)', icon: 'hcflcm', correctBin: 'lcm-9' },
    ],
    bins: [
      { id: 'lcm-12', label: '12', color: '#3B82F6' },
      { id: 'lcm-40', label: '40', color: '#10B981' },
      { id: 'lcm-36', label: '36', color: '#F59E0B' },
      { id: 'lcm-9', label: '9', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "If HCF of 15 and 20 is 5, what is their LCM? (Use HCF × LCM = product)",
    answer: "60",
    options: ["60", "100", "40", "25"],
    hint: "HCF × LCM = product of numbers. So LCM = (15 × 20) ÷ HCF = 300 ÷ 5 = ?",
    misconception: "Use the relationship: HCF × LCM = product of the two numbers! So LCM = (15 × 20) ÷ HCF = 300 ÷ 5 = 60. Verify: HCF × LCM = 5 × 60 = 300, and 15 × 20 = 300. They match! This relationship lets you find LCM when you know HCF, or vice versa."
  },
  {
    type: 'sort',
    question: "Drag each number to ALL the divisibility rules it passes!",
    answer: "sort",
    options: [],
    hint: "By 2: last digit even. By 3: digit sum divisible by 3. By 5: last digit 0 or 5. By 10: last digit 0. Check each number against each rule!",
    misconception: "Divisibility rules are quick tests! 3468: by 2 (yes, ends in 8), by 3 (yes, 3+4+6+8=21, divisible by 3), by 5 (no, doesn't end in 0 or 5), by 10 (no, doesn't end in 0). 5280: by 2 (yes, ends in 0), by 5 (yes, ends in 0), by 10 (yes, ends in 0). 2541: by 3 (yes, 2+5+4+1=12, divisible by 3), by 11 (yes, (2+4)-(5+1)=0, divisible by 11). 9135: by 3 (yes, 9+1+3+5=18), by 5 (yes, ends in 5), by 9 (yes, 18 divisible by 9).",
    sortItems: [
      { id: 'd1', label: '3468', icon: 'divisibility', correctBin: 'rule-2-3' },
      { id: 'd2', label: '5280', icon: 'divisibility', correctBin: 'rule-2-5-10' },
      { id: 'd3', label: '2541', icon: 'divisibility', correctBin: 'rule-3-11' },
      { id: 'd4', label: '9135', icon: 'divisibility', correctBin: 'rule-3-5-9' },
    ],
    bins: [
      { id: 'rule-2-3', label: '÷2 and ÷3', color: '#3B82F6' },
      { id: 'rule-2-5-10', label: '÷2, ÷5, ÷10', color: '#10B981' },
      { id: 'rule-3-11', label: '÷3 and ÷11', color: '#F59E0B' },
      { id: 'rule-3-5-9', label: '÷3, ÷5, ÷9', color: '#8B5CF6' },
    ]
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface FactorsMultiGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FactorsMultiGame({ width = 720, height = 560, onComplete }: FactorsMultiGameProps) {
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
      const msg = "Excellent! You cracked the number case!";
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
      const compMsg = "Brilliant! You are a master number detective!";
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
    <div className="relative overflow-hidden bg-slate-900 rounded-3xl shadow-2xl select-none" style={{ width, height }}>
      <DetectiveScene width={width} height={height} />
      <DetectivePriya mood={mascotMood} speaking={speakingText} />

      <div className="absolute top-4 left-4 right-28 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md border border-gold-300 flex items-center gap-2">
            <span className="text-xs font-bold text-gold-800">Priya&apos;s Number Lab</span>
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
                      className={`flex-1 min-w-[100px] max-w-[160px] h-28 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-2 transition-all shadow-md ${
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
                className="bg-gradient-to-r from-gold-500 to-purple-500 hover:from-gold-600 hover:to-purple-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
              </motion.button>
            )}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-gold-500 to-purple-500 hover:from-gold-600 hover:to-purple-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base cursor-pointer"
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
