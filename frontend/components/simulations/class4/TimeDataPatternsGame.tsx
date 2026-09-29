'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── SVG Icon Components ────��────────────────────────────────

function ClockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
      <circle cx="30" cy="30" r="2" fill="#0284C7" />
      <line x1="30" y1="30" x2="30" y2="14" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="30" x2="42" y2="30" stroke="#0369A1" strokeWidth="2.5" strokeLinecap="round" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 30 + 21 * Math.sin(rad);
        const y1 = 30 - 21 * Math.cos(rad);
        const x2 = 30 + 24 * Math.sin(rad);
        const y2 = 30 - 24 * Math.cos(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0284C7" strokeWidth="2" />;
      })}
    </svg>
  );
}

function CalendarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="42" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
      <rect x="8" y="12" width="44" height="12" fill="#D97706" rx="6" />
      <circle cx="18" cy="8" r="3" fill="#B45309" />
      <circle cx="42" cy="8" r="3" fill="#B45309" />
      <rect x="15" y="30" width="6" height="6" fill="#F59E0B" rx="1" />
      <rect x="27" y="30" width="6" height="6" fill="#F59E0B" rx="1" />
      <rect x="39" y="30" width="6" height="6" fill="#EF4444" rx="1" />
      <rect x="15" y="40" width="6" height="6" fill="#F59E0B" rx="1" />
      <rect x="27" y="40" width="6" height="6" fill="#F59E0B" rx="1" />
    </svg>
  );
}

function HourglassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 8 L45 8 L45 12 L33 30 L45 48 L45 52 L15 52 L15 48 L27 30 L15 12 Z" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="18,14 42,14 36,26 24,26" fill="#FBBF24" />
      <polygon points="20,44 40,44 33,33 27,33" fill="#FBBF24" />
      <circle cx="30" cy="38" r="2" fill="#FBBF24" />
    </svg>
  );
}

function StopwatchIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="32" r="22" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
      <rect x="27" y="6" width="6" height="6" fill="#DC2626" rx="1" />
      <circle cx="30" cy="12" r="3" fill="#DC2626" />
      <line x1="30" y1="32" x2="30" y2="20" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="32" r="2.5" fill="#DC2626" />
    </svg>
  );
}

function PictographIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="4" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
      <circle cx="16" cy="20" r="5" fill="#22C55E" />
      <circle cx="16" cy="32" r="5" fill="#22C55E" />
      <circle cx="16" cy="44" r="5" fill="#22C55E" />
      <line x1="26" y1="20" x2="50" y2="20" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="32" x2="42" y2="32" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="44" x2="46" y2="44" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BarGraphIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="10" y1="50" x2="52" y2="50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="10" x2="10" y2="50" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="15" y="30" width="8" height="20" fill="#3B82F6" rx="1" />
      <rect x="27" y="18" width="8" height="32" fill="#10B981" rx="1" />
      <rect x="39" y="24" width="8" height="26" fill="#F59E0B" rx="1" />
    </svg>
  );
}

function GrowingPatternIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="12" cy="42" r="5" fill="#8B5CF6" />
      <circle cx="24" cy="34" r="6" fill="#8B5CF6" />
      <circle cx="38" cy="24" r="7" fill="#8B5CF6" />
      <circle cx="50" cy="14" r="8" fill="#8B5CF6" />
      <path d="M12 42 Q 24 30, 38 24 T 50 14" stroke="#C4B5FD" strokeWidth="2" fill="none" strokeDasharray="3,3" />
    </svg>
  );
}

function ReducingPatternIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="10" cy="14" r="8" fill="#EC4899" />
      <circle cx="23" cy="24" r="7" fill="#EC4899" />
      <circle cx="36" cy="34" r="6" fill="#EC4899" />
      <circle cx="48" cy="42" r="5" fill="#EC4899" />
      <path d="M10 14 Q 23 26, 36 34 T 48 42" stroke="#FBCFE8" strokeWidth="2" fill="none" strokeDasharray="3,3" />
    </svg>
  );
}

function DayIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#F59E0B" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 30 + 18 * Math.sin(rad);
        const y1 = 30 - 18 * Math.cos(rad);
        const x2 = 30 + 24 * Math.sin(rad);
        const y2 = 30 - 24 * Math.cos(rad);
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D97706" strokeWidth="3" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function NightIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M38 12 C28 12, 20 20, 20 30 C20 40, 28 48, 38 48 C34 50, 28 50, 24 48 C16 44, 12 36, 14 27 C16 18, 24 12, 38 12 Z" fill="#6366F1" />
      <circle cx="44" cy="22" r="2" fill="#FDE047" />
      <circle cx="48" cy="36" r="1.5" fill="#FDE047" />
    </svg>
  );
}

function DataChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="40" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />
      <line x1="16" y1="20" x2="44" y2="20" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="28" x2="38" y2="28" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="36" x2="42" y2="36" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="20" r="2" fill="#3B82F6" />
      <circle cx="12" cy="28" r="2" fill="#3B82F6" />
      <circle cx="12" cy="36" r="2" fill="#3B82F6" />
    </svg>
  );
}

function PatternRuleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="6" fill="#FDF4FF" stroke="#C084FC" strokeWidth="2.5" />
      <text x="30" y="32" textAnchor="middle" fill="#9333EA" fontSize="18" fontWeight="bold">RULE</text>
      <path d="M22 38 L38 38" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusArrowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2.5" />
      <line x1="30" y1="16" x2="30" y2="44" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
      <line x1="16" y1="30" x2="44" y2="30" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function MinusArrowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2.5" />
      <line x1="16" y1="30" x2="44" y2="30" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'clock': return <ClockIcon size={size} />;
    case 'calendar': return <CalendarIcon size={size} />;
    case 'hourglass': return <HourglassIcon size={size} />;
    case 'stopwatch': return <StopwatchIcon size={size} />;
    case 'pictograph': return <PictographIcon size={size} />;
    case 'bargraph': return <BarGraphIcon size={size} />;
    case 'growing': return <GrowingPatternIcon size={size} />;
    case 'reducing': return <ReducingPatternIcon size={size} />;
    case 'day': return <DayIcon size={size} />;
    case 'night': return <NightIcon size={size} />;
    case 'datachart': return <DataChartIcon size={size} />;
    case 'rule': return <PatternRuleIcon size={size} />;
    case 'plus': return <PlusArrowIcon size={size} />;
    case 'minus': return <MinusArrowIcon size={size} />;
    default: return <ClockIcon size={size} />;
  }
}

// ─── Timekeeper Tara Mascot ───────────────────────────────────

function TimekeeperTara({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-3 shadow-xl max-w-[240px] border-2 border-gold-200"
          >
            <p className="text-xs font-bold text-gold-900">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.18, 1] }
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
            <linearGradient id="tara-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            <radialGradient id="tara-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FDE68A" />
            </radialGradient>
          </defs>
          {/* Clock badge */}
          <circle cx="37.5" cy="52" r="14" fill="white" stroke="#4F46E5" strokeWidth="2.5" />
          <line x1="37.5" y1="52" x2="37.5" y2="43" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
          <line x1="37.5" y1="52" x2="44" y2="52" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />
          
          {/* Body / cape */}
          <path d="M22 60 L37.5 45 L53 60 L58 85 L17 85 Z" fill="url(#tara-body)" stroke="#3730A3" strokeWidth="2" />
          
          {/* Head */}
          <circle cx="37.5" cy="28" r="16" fill="url(#tara-face)" stroke="#D97706" strokeWidth="2" />
          
          {/* Timekeeper hat / beret */}
          <ellipse cx="37.5" cy="14" rx="14" ry="6" fill="#4F46E5" />
          <circle cx="37.5" cy="8" r="3" fill="#FBBF24" />

          {/* Eyes */}
          <circle cx="31" cy="26" r="2.5" fill="#1E1B4B" />
          <circle cx="44" cy="26" r="2.5" fill="#1E1B4B" />
          <circle cx="32" cy="25" r="1" fill="white" />
          <circle cx="45" cy="25" r="1" fill="white" />

          {/* Smile */}
          <path d="M33 33 Q37.5 37 42 33" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Cheeks */}
          <circle cx="27" cy="30" r="2" fill="#FCA5A5" opacity="0.7" />
          <circle cx="48" cy="30" r="2" fill="#FCA5A5" opacity="0.7" />

          {/* Hands holding stopwatch */}
          <circle cx="26" cy="68" r="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="49" cy="68" r="4" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 items-center bg-white/80 px-3 py-1.5 rounded-full shadow-md">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#F59E0B' : 'none'} stroke={i < count ? '#D97706' : '#CBD5E1'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Scene Background ─────────────────────────────────────────

function TimeLabScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="50%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
          <linearGradient id="lab-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        <rect width={width} height={height} fill="url(#lab-sky)" />
        
        {/* Lab floor */}
        <rect x="0" y={height - 110} width={width} height="110" fill="url(#lab-floor)" />
        <line x1="0" y1={height - 110} x2={width} y2={height - 110} stroke="#94A3B8" strokeWidth="3" />

        {/* Big wall clock drawing in background */}
        <circle cx="100" cy="110" r="55" fill="white" stroke="#6366F1" strokeWidth="4" opacity="0.3" />
        <line x1="100" y1="110" x2="100" y2="75" stroke="#4F46E5" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
        <line x1="100" y1="110" x2="125" y2="110" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" opacity="0.3" />

        {/* Bar graph poster on wall */}
        <rect x={width - 200} y="60" width="110" height="90" rx="8" fill="white" stroke="#6366F1" strokeWidth="2.5" opacity="0.3" />
        <rect x={width - 180} y="90" width="16" height="40" fill="#3B82F6" opacity="0.3" />
        <rect x={width - 156} y="75" width="16" height="55" fill="#10B981" opacity="0.3" />
        <rect x={width - 132} y="105" width="16" height="25" fill="#F59E0B" opacity="0.3" />
      </svg>
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
    title: "Time Units & Conversions ⏰",
    text: "Time is measured in days, hours, and minutes! Remember the golden rules: 1 day = 24 hours, 1 hour = 60 minutes, and 1 minute = 60 seconds. To convert bigger to smaller units, we multiply! To convert smaller to bigger units, we divide!",
    emoji: "⏰",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Time is measured in days, hours, and minutes! 1 day equals 24 hours, 1 hour equals 60 minutes, and 1 minute equals 60 seconds. To convert bigger to smaller units, we multiply!"
  },
  {
    title: "Clock Reading & a.m. / p.m. ☀️🌙",
    text: "A clock has two hands: short hour hand and long minute hand. a.m. stands for hours before noon (from midnight to just before noon), while p.m. stands for hours after noon (from noon to just before midnight). Always write a.m. or p.m.!",
    emoji: "☀️",
    bgColor: "from-gold-500 to-purple-600",
    spoken: "A clock has a short hour hand and a long minute hand. a.m. is before noon, and p.m. is after noon. Always label your times with a.m. or p.m.!"
  },
  {
    title: "Time Elapsed / Duration ⏳",
    text: "Time elapsed is the duration between a start time and an end time. We can find it using forward counting, backward counting, or subtraction. Remember to borrow 60 minutes when the end minutes are smaller than the start minutes!",
    emoji: "⏳",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "Time elapsed is the duration between a start time and an end time. We can find it by subtraction, borrowing 60 minutes when needed!"
  },
  {
    title: "Pictographs & Bar Graphs 📊",
    text: "Pictographs use picture symbols to show data, using a scale like '1 symbol equals 5 students'. Bar graphs use rectangular bars where height shows quantity. The tallest bar is the most, and the shortest bar is the least!",
    emoji: "📊",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Pictographs use picture symbols and a scale. Bar graphs use rectangular bars where height shows quantity. The tallest bar is the most!"
  },
  {
    title: "Growing & Reducing Patterns 📈📉",
    text: "A pattern follows a rule! A growing pattern increases by a fixed amount each step (like 5, 8, 11 — adding 3). A reducing pattern decreases by a fixed amount each step (like 20, 17, 14 — subtracting 3). Always verify the rule before extending!",
    emoji: "📈",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "A pattern follows a rule! Growing patterns increase by a fixed amount each step. Reducing patterns decrease by a fixed amount each step. Always verify your rule!"
  }
];

// ─── Challenges ───────────────────────────────────────────────

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

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'How many hours are in 2 days?',
    answer: '48 hours',
    options: ['24 hours', '48 hours', '12 hours'],
    hint: 'Remember: 1 day = 24 hours. So 2 days = 2 x 24 = ?',
    misconception: 'To convert days to hours, multiply by 24! 2 days = 2 x 24 = 48 hours. Do not confuse days with hours!'
  },
  {
    type: 'sort',
    question: 'Drag each time conversion to its correct answer!',
    answer: 'sort',
    options: [],
    hint: '1 day = 24 hours, 1 hour = 60 minutes, 1 minute = 60 seconds!',
    misconception: 'Remember our conversion rules: bigger to smaller units means multiply by 24 or 60! Smaller to bigger means divide!',
    sortItems: [
      { id: 'item-1', label: '1 day = 24 hrs', icon: 'calendar', correctBin: 'bin-a' },
      { id: 'item-2', label: '1 hr = 60 mins', icon: 'clock', correctBin: 'bin-a' },
      { id: 'item-3', label: '1 min = 60 secs', icon: 'stopwatch', correctBin: 'bin-a' },
      { id: 'item-4', label: '2 days = 48 hrs', icon: 'plus', correctBin: 'bin-b' },
      { id: 'item-5', label: '180 mins = 3 hrs', icon: 'hourglass', correctBin: 'bin-b' },
      { id: 'item-6', label: '3 hrs = 180 mins', icon: 'clock', correctBin: 'bin-b' }
    ],
    bins: [
      { id: 'bin-a', label: 'Golden Rules 🌟', color: '#3B82F6' },
      { id: 'bin-b', label: 'Converted Values 🔄', color: '#10B981' }
    ]
  },
  {
    type: 'identify',
    question: 'A train departs at 7:30 a.m. and arrives at 11:30 a.m. How long was the journey?',
    answer: '4 hours',
    options: ['3 hours', '4 hours', '5 hours'],
    hint: 'Count forward from 7:30 to 11:30 hour by hour: 8:30, 9:30, 10:30, 11:30!',
    misconception: 'Subtract the start time from the end time: 11:30 minus 7:30 = 4 hours! Forward counting gives 4 hours exact.'
  },
  {
    type: 'sort',
    question: 'Drag each time to a.m. (morning) or p.m. (afternoon/evening)!',
    answer: 'sort',
    options: [],
    hint: 'a.m. is midnight to noon. p.m. is noon to midnight.',
    misconception: 'Remember: morning and breakfast times are a.m., while evening, dinner, and bedtime are p.m.!',
    sortItems: [
      { id: 'am-1', label: '6:00 Morning', icon: 'day', correctBin: 'bin-am' },
      { id: 'am-2', label: '10:30 School Start', icon: 'clock', correctBin: 'bin-am' },
      { id: 'pm-1', label: '3:00 Afternoon', icon: 'sun', correctBin: 'bin-pm' },
      { id: 'pm-2', label: '7:00 Dinner', icon: 'night', correctBin: 'bin-pm' }
    ],
    bins: [
      { id: 'bin-am', label: 'a.m. (Before Noon) ☀️', color: '#F59E0B' },
      { id: 'bin-pm', label: 'p.m. (After Noon) 🌙', color: '#6366F1' }
    ]
  },
  {
    type: 'identify',
    question: 'In a pictograph, 1 symbol = 5 students. If there are 4 symbols for Class 4A, how many students are in 4A?',
    answer: '20 students',
    options: ['9 students', '20 students', '25 students'],
    hint: 'Multiply the number of symbols by the scale value! 4 symbols x 5 students = ?',
    misconception: 'Do not just count the symbols as 4! Each symbol stands for 5 students, so 4 symbols x 5 = 20 students!'
  },
  {
    type: 'sort',
    question: 'Drag each bar graph term to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Tallest = most, Shortest = least, y-axis = scale/numbers!',
    misconception: 'The tallest bar always represents the highest count (most), and the shortest bar represents the lowest count (least)!',
    sortItems: [
      { id: 'bg-1', label: 'Tallest bar', icon: 'bargraph', correctBin: 'bin-most' },
      { id: 'bg-2', label: 'Shortest bar', icon: 'bargraph', correctBin: 'bin-least' },
      { id: 'bg-3', label: 'y-axis numbers', icon: 'datachart', correctBin: 'bin-scale' },
      { id: 'bg-4', label: 'x-axis labels', icon: 'datachart', correctBin: 'bin-cat' }
    ],
    bins: [
      { id: 'bin-most', label: 'Most / Highest 📈', color: '#10B981' },
      { id: 'bin-least', label: 'Least / Lowest 📉', color: '#EF4444' },
      { id: 'bin-scale', label: 'Scale / Values 🔢', color: '#3B82F6' },
      { id: 'bin-cat', label: 'Categories 🏷️', color: '#8B5CF6' }
    ]
  },
  {
    type: 'identify',
    question: 'What is the next number in this GROWING pattern: 5, 8, 11, 14, __?',
    answer: '17',
    options: ['16', '17', '20'],
    hint: 'Find the difference between consecutive terms: 8 - 5 = 3. Add 3 to 14!',
    misconception: 'This is a growing pattern with a rule of "add 3 each time"! 14 + 3 = 17. Do not guess randomly!'
  },
  {
    type: 'sort',
    question: 'Drag each number pattern to its correct rule!',
    answer: 'sort',
    options: [],
    hint: 'Check if numbers are growing (+) or reducing (-) and find the difference!',
    misconception: 'Growing patterns add a constant amount each time (+), while reducing patterns subtract a constant amount each time (-)!',
    sortItems: [
      { id: 'p-1', label: '5, 8, 11, 14', icon: 'growing', correctBin: 'bin-add3' },
      { id: 'p-2', label: '20, 17, 14, 11', icon: 'reducing', correctBin: 'bin-sub3' },
      { id: 'p-3', label: '2, 4, 6, 8', icon: 'growing', correctBin: 'bin-add2' },
      { id: 'p-4', label: '50, 45, 40, 35', icon: 'reducing', correctBin: 'bin-sub5' }
    ],
    bins: [
      { id: 'bin-add3', label: 'Add 3 each time ➕', color: '#10B981' },
      { id: 'bin-sub3', label: 'Subtract 3 each time ➖', color: '#EF4444' },
      { id: 'bin-add2', label: 'Add 2 each time ➕', color: '#3B82F6' },
      { id: 'bin-sub5', label: 'Subtract 5 each time ➖', color: '#F59E0B' }
    ]
  }
];

// ─── Component Props ──────────────────────────────────────────

export interface TimeDataPatternsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function TimeDataPatternsGame({ width = 720, height = 560, onComplete }: TimeDataPatternsGameProps) {
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
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        newPos[item.id] = { x: 50 + col * 125, y: height - 165 + row * 50 };
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
      const msg = "Great job! You understand time and patterns!";
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
      const compMsg = "Wonderful! You are a brilliant time and data star!";
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
    currentChallenge.bins.forEach((bin) => {
      // Approximate drop zones based on layout
      if (x > 80 && x < width - 80 && y > 150 && y < height - 200) {
        // Simple heuristic for bins
        if (x < width / 2) {
          droppedBinId = currentChallenge.bins![0].id;
        } else {
          droppedBinId = currentChallenge.bins![1]?.id || currentChallenge.bins![0].id;
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
        const msg = "Fantastic! You sorted the data patterns perfectly!";
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
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-gradient-to-br from-gold-50 to-gold-100 flex flex-col items-center justify-between" style={{ width, height }}>
      <TimeLabScene width={width} height={height} />
      <TimekeeperTara mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* Top Bar */}
      <div className="w-full px-6 py-3 flex items-center justify-between z-10 bg-white/70 backdrop-blur-md border-b border-gold-100">
        <div className="flex items-center gap-3">
          <div className="bg-gold-600 text-white font-black px-3 py-1 rounded-xl text-sm shadow">
            Class 4 Math
          </div>
          <span className="text-sm font-bold text-gold-900">Time, Data & Patterns</span>
        </div>

        <div className="flex items-center gap-4">
          {screen === 'play' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Challenge {challengeIdx + 1}/{CHALLENGES.length}</span>
              <StarRow count={Math.min(5, Math.floor(score / 15))} total={5} />
            </div>
          )}
          <button
            onClick={handleShowHint}
            className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-3 py-1.5 rounded-xl text-xs shadow transition active:scale-95 flex items-center gap-1"
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center p-6 z-10 relative">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-xl w-full flex flex-col items-center text-center border-4 border-gold-200"
          >
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black text-gold-950 mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-gray-700 text-base leading-relaxed mb-8">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-gold-600' : 'w-2.5 bg-gold-200'}`} />
                ))}
              </div>

              <div className="flex gap-3">
                {slideIdx > 0 && (
                  <button
                    onClick={() => setSlideIdx(prev => prev - 1)}
                    className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold text-sm shadow transition active:scale-95"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    if (slideIdx < TEACHING_SLIDES.length - 1) {
                      setSlideIdx(prev => prev + 1);
                    } else {
                      setScreen('play');
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-bold text-sm shadow-lg transition active:scale-95 flex items-center gap-2"
                >
                  {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-2xl w-full flex flex-col items-center text-center border-4 border-gold-200 relative"
          >
            <div className="bg-gold-100 text-gold-800 font-bold px-4 py-1 rounded-full text-xs mb-3 shadow-inner">
              Question {challengeIdx + 1} of {CHALLENGES.length}
            </div>

            <h3 className="text-lg font-black text-gold-950 mb-6">{currentChallenge.question}</h3>

            {currentChallenge.type === 'identify' ? (
              <div className="grid grid-cols-3 gap-4 w-full max-w-lg mb-4">
                {currentChallenge.options.map((opt) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnColor = 'bg-white hover:bg-gold-50 border-2 border-gold-200 text-gold-900';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnColor = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg scale-105';
                    else if (isSelected) btnColor = 'bg-rose-500 border-2 border-rose-600 text-white';
                    else btnColor = 'bg-gray-100 opacity-50 border-2 border-gray-200 text-gray-400';
                  }

                  return (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: selectedOpt ? 1 : 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={selectedOpt === currentChallenge.answer}
                      onClick={(e) => handleAnswerClick(opt, e)}
                      className={`py-4 px-3 rounded-2xl font-bold text-base shadow transition flex flex-col items-center justify-center gap-2 ${btnColor}`}
                    >
                      <span>{opt}</span>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              /* Sort Challenge */
              <div className="w-full h-72 relative flex flex-col items-center justify-between">
                {/* Bins area */}
                <div className="grid grid-cols-2 gap-6 w-full px-4 mb-2">
                  {currentChallenge.bins?.map((bin) => (
                    <div
                      key={bin.id}
                      onMouseEnter={() => setHoveredBin(bin.id)}
                      onMouseLeave={() => setHoveredBin(null)}
                      className={`border-3 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner transition-all ${hoveredBin === bin.id ? 'scale-105 opacity-90' : 'bg-gold-50/60 opacity-80'}`}
                      style={{ borderColor: bin.color, minHeight: '90px' }}
                    >
                      <span className="font-black text-sm" style={{ color: bin.color }}>{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable items */}
                <div className="w-full flex flex-wrap justify-center gap-4 relative" style={{ height: '110px' }}>
                  {currentChallenge.sortItems?.map((item) => {
                    const pos = itemPositions[item.id] || { x: 0, y: 0 };
                    const placed = placedItems[item.id] || false;
                    return (
                      <div key={item.id} className="relative" style={{ width: 110, height: 95 }}>
                        <Draggable
                          id={item.id}
                          x={pos.x}
                          y={pos.y}
                          draggable={!placed}
                          placed={placed}
                          onDragStart={handleDragStart}
                          onDragEnd={(id, x, y) => handleDragEnd(id, x, y)}
                          width={110}
                          height={95}
                        >
                          <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-200 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} p-2`} style={{ width: 110, height: 95 }}>
                            {renderSortIcon(item.icon, 40)}
                            <span className="text-[11px] font-bold text-gray-800 text-center mt-1 truncate max-w-[100px]">{item.label}</span>
                          </div>
                        </Draggable>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {isIncorrect && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setIsIncorrect(false);
                  setSelectedOpt(null);
                }}
                className="mt-4 bg-gold-600 hover:bg-gold-700 text-white font-bold px-6 py-2 rounded-xl text-sm shadow transition"
              >
                Try Again 🔄
              </motion.button>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="w-full px-6 py-3 bg-white/70 backdrop-blur-md border-t border-gold-100 flex items-center justify-between z-10 text-xs text-gold-900 font-semibold">
        <span>CISCE Class 4 Math • Time, Data & Patterns</span>
        <span>Score: {score} pts</span>
      </div>
    </div>
  );
}
