'use client';

/**
 * TimeCalendarGame — Learn time, AM/PM, 12hr/24hr clock, calendar, and conversions
 *
 * CISCE Nodes:
 * - c3_math_032 (Calendar to find particular day and date)
 * - c3_math_033 (Read and write time am/pm and 12hr and 24hr clock)
 * - c3_math_034 (Conversion of 12hr to 24hr and vice versa)
 * - c3_math_035 (Conversion of days to hours and hours to minutes)
 *
 * Mascot: Timekeeper Tara — a friendly timekeeper with a pocket watch, a calendar, a clock pendant, and an hourglass.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (EXACTLY 5 slides) ────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Welcome to the World of Time! ⏰',
    text: 'Time helps us know when to wake up, go to school, eat lunch, and sleep! A day has 24 hours, a week has 7 days, and a year has 12 months!',
    emoji: '⏰',
    bgColor: 'from-cyan-500 to-blue-600',
    spoken: 'Welcome to the world of time! Time helps us know when to wake up, go to school, eat lunch, and sleep! A day has 24 hours, a week has 7 days, and a year has 12 months!',
  },
  {
    title: 'Reading the Calendar 📅',
    text: 'A calendar shows days, weeks, and months in an organized grid! We have 7 days in a week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday!',
    emoji: '📅',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'A calendar shows days, weeks, and months in an organized grid! We have seven days in a week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday!',
  },
  {
    title: 'AM and PM — Morning & Afternoon ☀️🌙',
    text: 'The 12-hour clock uses AM and PM. AM means before noon (midnight to just before noon). PM means after noon (noon to just before midnight)! 12:00 PM is NOON, and 12:00 AM is midnight!',
    emoji: '☀️',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'The twelve-hour clock uses A M and P M. A M means before noon, from midnight to just before noon. P M means after noon, from noon to just before midnight! Twelve P M is noon, and twelve A M is midnight!',
  },
  {
    title: 'The 24-Hour Clock 🚂',
    text: 'Railways and airports use the 24-hour clock from 00:00 to 23:59 without AM or PM! For PM times after noon, just add 12 to the hour! So 3:00 PM becomes 15:00!',
    emoji: '🚂',
    bgColor: 'from-purple-500 to-indigo-700',
    spoken: 'Railways and airports use the twenty-four-hour clock from zero to twenty-three fifty-nine without A M or P M! For P M times after noon, just add twelve to the hour! So three P M becomes fifteen hundred hours!',
  },
  {
    title: 'Converting Time Units ⏳',
    text: '1 day equals 24 hours, and 1 hour equals 60 minutes! To convert days to hours, multiply by 24. To convert hours to minutes, multiply by 60!',
    emoji: '⏳',
    bgColor: 'from-emerald-500 to-teal-700',
    spoken: 'One day equals twenty-four hours, and one hour equals sixty minutes! To convert days to hours, multiply by twenty-four. To convert hours to minutes, multiply by sixty!',
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

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'How many days are there in a standard WEEK?',
    answer: '7 days',
    options: ['5 days', '7 days', '12 days', '30 days'],
    hint: 'Think of all the days from Monday to Sunday!',
    misconception: 'A standard week always has 7 days (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday). Do not confuse it with 5 school days!',
  },
  {
    type: 'identify',
    question: 'How many months are there in a YEAR?',
    answer: '12 months',
    options: ['7 months', '10 months', '12 months', '24 months'],
    hint: 'From January to December, count all the months in a year!',
    misconception: 'There are exactly 12 months in a year, starting with January and ending with December. Do not confuse 12 months with the 12 hours on a clock face!',
  },
  {
    type: 'sort',
    question: 'Drag each day into the correct calendar order!',
    answer: 'sort',
    options: [],
    hint: 'The week starts with Monday and ends with Sunday!',
    misconception: 'The days of the week follow a fixed cyclic order: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Every week repeats this exact sequence.',
    sortItems: [
      { id: 'mon', label: 'Monday', icon: 'calendar', correctBin: 'day1' },
      { id: 'wed', label: 'Wednesday', icon: 'calendar', correctBin: 'day3' },
      { id: 'fri', label: 'Friday', icon: 'calendar', correctBin: 'day5' },
      { id: 'sun', label: 'Sunday', icon: 'calendar', correctBin: 'day7' },
    ],
    bins: [
      { id: 'day1', label: '1st (Mon)', color: '#3B82F6' },
      { id: 'day3', label: '3rd (Wed)', color: '#10B981' },
      { id: 'day5', label: '5th (Fri)', color: '#F59E0B' },
      { id: 'day7', label: '7th (Sun)', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'What does AM stand for in time?',
    answer: 'Before noon (Ante Meridiem)',
    options: ['After midnight', 'Before noon (Ante Meridiem)', 'All morning', 'At midday'],
    hint: 'AM refers to the time period from midnight until just before noon.',
    misconception: 'AM stands for "Ante Meridiem", which means before noon (from 12:00 midnight to 11:59 AM). It is not just "morning" since it includes midnight and early hours before dawn.',
  },
  {
    type: 'sort',
    question: 'Drag each time to AM (Morning/Before noon) or PM (Afternoon/Evening)!',
    answer: 'sort',
    options: [],
    hint: 'AM is before noon (like breakfast and morning school), PM is after noon (like lunch and dinner)!',
    misconception: '12:00 PM is NOON (midday), and 12:00 AM is midnight! Hours from midnight to just before noon are AM, and hours from noon to just before midnight are PM.',
    sortItems: [
      { id: 't1', label: '8:00 AM (School)', icon: 'sun', correctBin: 'am' },
      { id: 't2', label: '3:00 PM (Play)', icon: 'moon', correctBin: 'pm' },
      { id: 't3', label: '7:00 AM (Wake up)', icon: 'sun', correctBin: 'am' },
      { id: 't4', label: '8:00 PM (Dinner)', icon: 'moon', correctBin: 'pm' },
    ],
    bins: [
      { id: 'am', label: 'AM (Before Noon) ☀️', color: '#F59E0B' },
      { id: 'pm', label: 'PM (After Noon) 🌙', color: '#6366F1' },
    ],
  },
  {
    type: 'identify',
    question: 'What is 3:00 PM expressed in 24-hour clock time?',
    answer: '15:00',
    options: ['03:00', '13:00', '15:00', '21:00'],
    hint: 'For PM times after noon, add 12 to the hour (3 + 12 = 15).',
    misconception: 'To convert 3:00 PM to 24-hour format, you add 12 to 3, giving 15:00. 03:00 is 3:00 AM in the morning, not the afternoon!',
  },
  {
    type: 'sort',
    question: 'Drag each 12-hour time to its correct 24-hour clock equivalent!',
    answer: 'sort',
    options: [],
    hint: 'Add 12 to any PM hour after noon! AM hours stay the same (with leading zero).',
    misconception: 'Remember: 1:00 PM = 13:00 (1 + 12), 6:00 PM = 18:00 (6 + 12), while 8:00 AM stays 08:00. The 24-hour clock does not use AM or PM.',
    sortItems: [
      { id: 'c1', label: '1:00 PM → 13:00', icon: 'clock', correctBin: 'b13' },
      { id: 'c2', label: '6:00 PM → 18:00', icon: 'clock', correctBin: 'b18' },
      { id: 'c3', label: '8:00 AM → 08:00', icon: 'clock', correctBin: 'b08' },
      { id: 'c4', label: '10:00 PM → 22:00', icon: 'clock', correctBin: 'b22' },
    ],
    bins: [
      { id: 'b08', label: '08:00', color: '#3B82F6' },
      { id: 'b13', label: '13:00', color: '#10B981' },
      { id: 'b18', label: '18:00', color: '#F59E0B' },
      { id: 'b22', label: '22:00', color: '#EF4444' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each time conversion to its correct calculated value!',
    answer: 'sort',
    options: [],
    hint: '1 day = 24 hours. 1 hour = 60 minutes. Multiply to convert larger units to smaller units!',
    misconception: '1 hour = 60 minutes (not 100 minutes!). 1 day = 24 hours. So 3 hours = 3 × 60 = 180 minutes, and 2 days = 2 × 24 = 48 hours.',
    sortItems: [
      { id: 'v1', label: '1 day = 24 hrs', icon: 'hourglass', correctBin: 'd24' },
      { id: 'v2', label: '1 hr = 60 mins', icon: 'hourglass', correctBin: 'm60' },
      { id: 'v3', label: '3 hrs = 180 mins', icon: 'hourglass', correctBin: 'm180' },
      { id: 'v4', label: '2 days = 48 hrs', icon: 'hourglass', correctBin: 'd48' },
    ],
    bins: [
      { id: 'd24', label: '24 Hours', color: '#3B82F6' },
      { id: 'm60', label: '60 Minutes', color: '#10B981' },
      { id: 'm180', label: '180 Minutes', color: '#F59E0B' },
      { id: 'd48', label: '48 Hours', color: '#EF4444' },
    ],
  },
];

// ��── Timekeeper Tara Mascot ───────────────────────────────────

function TimekeeperTara({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white border-2 border-amber-300 rounded-xl px-3 py-2 shadow-lg max-w-[220px]"
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
            <linearGradient id="tara-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <radialGradient id="clock-face" cx="0.5" cy="0.5" r="0.5">
              <stop offset="70%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Head */}
          <circle cx="37.5" cy="28" r="18" fill="url(#tara-body)" stroke="#B45309" strokeWidth="2" />
          {/* Timekeeper Hat (Beret with clock symbol) */}
          <path d="M20 22 Q37.5 12 55 22 Z" fill="#4F46E5" stroke="#312E81" strokeWidth="1.5" />
          <circle cx="37.5" cy="14" r="3" fill="#FBBF24" />
          {/* Eyes */}
          <circle cx="31" cy="26" r="3.5" fill="white" />
          <circle cx="44" cy="26" r="3.5" fill="white" />
          <circle cx="32" cy="27" r="2" fill="#1E293B" />
          <circle cx="45" cy="27" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 33 Q37.5 37 42 33" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Clock pendant around neck */}
          <circle cx="37.5" cy="56" r="10" fill="url(#clock-face)" stroke="#92400E" strokeWidth="1.5" />
          <line x1="37.5" y1="56" x2="37.5" y2="50" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="37.5" y1="56" x2="42" y2="56" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M37.5 44 L37.5 48" stroke="#92400E" strokeWidth="1.5" />
          {/* Body / Coat */}
          <path d="M25 55 L50 55 L55 80 L20 80 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" rx="4" />
          {/* Pocket watch in hand */}
          <circle cx="16" cy="65" r="7" fill="#FCD34D" stroke="#B45309" strokeWidth="1" />
          <line x1="16" y1="65" x2="16" y2="62" stroke="#78350F" strokeWidth="1" />
          <line x1="16" y1="65" x2="19" y2="65" stroke="#78350F" strokeWidth="1" />
          {/* Feet */}
          <ellipse cx="28" cy="85" rx="5" ry="3" fill="#1E293B" />
          <ellipse cx="47" cy="85" rx="5" ry="3" fill="#1E293B" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

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

// ─── Custom SVG Scene Background ──────────────────────────────

function TimeSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* SVG Sky & Background */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="time-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="40%" stopColor="#312E81" />
            <stop offset="70%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#time-sky)" />

        {/* Stars */}
        {[
          { cx: 50, cy: 40, r: 2 }, { cx: 120, cy: 70, r: 1.5 }, { cx: 200, cy: 30, r: 2 },
          { cx: 350, cy: 60, r: 2.5 }, { cx: 480, cy: 40, r: 1.5 }, { cx: 580, cy: 80, r: 2 },
          { cx: 650, cy: 35, r: 2 }, { cx: 280, cy: 90, r: 1.5 },
        ].map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity="0.7" />
        ))}

        {/* Sun & Moon representations */}
        <circle cx={width - 80} cy={70} r={28} fill="url(#sun-glow)" />
        <circle cx={width - 80} cy={70} r={16} fill="#FACC15" />

        <circle cx={80} cy={70} r={18} fill="#E2E8F0" opacity="0.9" />
        <circle cx={74} cy={66} r={14} fill="#1E1B4B" opacity="0.4" />
      </svg>

      {/* Floating clock / calendar watermark elements */}
      <motion.div className="absolute top-12 left-20 opacity-20" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="white" strokeWidth="4" />
          <line x1="40" y1="40" x2="40" y2="18" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <line x1="40" y1="40" x2="56" y2="40" stroke="white" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Topic Icons (Strict Requirement) ──────────────

function ClockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
      <circle cx="30" cy="30" r="2" fill="#92400E" />
      {/* Hour hand */}
      <line x1="30" y1="30" x2="30" y2="16" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="30" y1="30" x2="42" y2="30" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Ticks */}
      <line x1="30" y1="6" x2="30" y2="10" stroke="#D97706" strokeWidth="2" />
      <line x1="30" y1="50" x2="30" y2="54" stroke="#D97706" strokeWidth="2" />
      <line x1="6" y1="30" x2="10" y2="30" stroke="#D97706" strokeWidth="2" />
      <line x1="50" y1="30" x2="54" y2="30" stroke="#D97706" strokeWidth="2" />
    </svg>
  );
}

function CalendarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Base */}
      <rect x="8" y="12" width="44" height="42" fill="white" stroke="#3B82F6" strokeWidth="3" rx="4" />
      {/* Header */}
      <path d="M8 12 L52 12 L52 24 L8 24 Z" fill="#3B82F6" />
      {/* Rings */}
      <rect x="18" y="6" width="4" height="10" fill="#94A3B8" rx="2" />
      <rect x="38" y="6" width="4" height="10" fill="#94A3B8" rx="2" />
      {/* Grid dots */}
      <circle cx="20" cy="32" r="3" fill="#CBD5E1" />
      <circle cx="30" cy="32" r="3" fill="#3B82F6" />
      <circle cx="40" cy="32" r="3" fill="#CBD5E1" />
      <circle cx="20" cy="43" r="3" fill="#CBD5E1" />
      <circle cx="30" cy="43" r="3" fill="#CBD5E1" />
      <circle cx="40" cy="43" r="3" fill="#3B82F6" />
    </svg>
  );
}

function HourglassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 8 L45 8 L45 12 L33 30 L45 48 L45 52 L15 52 L15 48 L27 30 L15 12 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Sand bottom */}
      <path d="M18 46 L42 46 L35 34 L25 34 Z" fill="#F59E0B" />
      {/* Frame bars */}
      <rect x="12" y="6" width="36" height="4" fill="#78350F" rx="2" />
      <rect x="12" y="50" width="36" height="4" fill="#78350F" rx="2" />
    </svg>
  );
}

function SunSymbolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#F59E0B" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line
          key={angle}
          x1={30 + 20 * Math.cos((angle * Math.PI) / 180)}
          y1={30 + 20 * Math.sin((angle * Math.PI) / 180)}
          x2={30 + 26 * Math.cos((angle * Math.PI) / 180)}
          y2={30 + 26 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FBBF24"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function MoonSymbolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M38 12 A18 18 0 1 1 22 48 A20 20 0 0 0 38 12 Z" fill="#818CF8" stroke="#4F46E5" strokeWidth="2" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'calendar':
      return <CalendarIcon size={size} />;
    case 'sun':
      return <SunSymbolIcon size={size} />;
    case 'moon':
      return <MoonSymbolIcon size={size} />;
    case 'clock':
      return <ClockIcon size={size} />;
    case 'hourglass':
      return <HourglassIcon size={size} />;
    default:
      return <ClockIcon size={size} />;
  }
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <div className="rounded-full px-3 py-1 text-white font-bold text-xs shadow-md mb-1" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="text-xs font-semibold text-gray-500">Drop Here</div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface TimeCalendarGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function TimeCalendarGame({ width = 720, height = 560, onComplete }: TimeCalendarGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [score, setScore] = useState(0);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Timekeeper Tara! Let us learn about time and calendars together!');

  // Sort challenge states
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [dragPositions, setDragPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide when slideIdx changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.text);
    }
  }, [screen, slideIdx]);

  // Speak challenge question when challenge changes
  useEffect(() => {
    if (screen === 'play') {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setMascotMood('happy');

      // Initialize drag positions for sort challenges
      if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
        const initialPos: Record<string, { x: number; y: number }> = {};
        const initialPlaced: Record<string, boolean> = {};
        currentChallenge.sortItems.forEach((item, idx) => {
          // Spread items across bottom row
          initialPos[item.id] = { x: 40 + idx.toString().length * 15 + idx * 150, y: 390 };
          initialPlaced[item.id] = false;
        });
        setDragPositions(initialPos);
        setPlacedItems(initialPlaced);
      }
    }
  }, [screen, challengeIdx, currentChallenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
          if (screen === 'play') {
            audioManager.play('hint');
            setHintMsg(currentChallenge.hint);
            setMascotMood('thinking');
            speechManager.speak(currentChallenge.hint);
          }
        }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Handle Multiple Choice Answer
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');
      setSuccessMsg('Correct! Amazing job! ⭐');
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars(prev => Math.min(8, prev + 1));
    } else {
      // Wrong — Misconception feedback
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Handle Drag Start
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  // Handle Drag End (for sort challenges)
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Find if dropped inside any bin
    // Bin layout: 4 bins spaced horizontally across top/middle
    const binWidth = 130;
    const binHeight = 110;
    const binY = 140;

    let matchedBin: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 155;
      if (x >= binX - 20 && x <= binX + binWidth && y >= binY - 20 && y <= binY + binHeight) {
        matchedBin = bin.id;
      }
    });

    setHoverBin(null);

    if (matchedBin && matchedBin === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech('All sorted correctly! Brilliant work!');
        speechManager.speak('All sorted correctly! Brilliant work!');
        setSuccessMsg('Wonderful sorting! ⭐');
        setSparklePos({ x: width / 2, y: height / 2 });
        setStars(prev => Math.min(8, prev + 1));
      }
      return true;
    } else {
      // Incorrect bin
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  // Advance to next challenge or finish
  const handleNextChallenge = () => {
    setSuccessMsg(null);
    setHintMsg(null);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game Complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('You completed all challenges! You are a Time & Calendar Star!');
      speechManager.speak('You completed all challenges! You are a Time and Calendar Star!');
      const finalScore = Math.max(0, 100 - errors * 5);
      setScore(finalScore);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-indigo-900 select-none flex flex-col items-center justify-between" style={{ width, height }}>
      {/* Background Scene */}
      <TimeSceneBackground width={width} height={height} />

      {/* Mascot */}
      <TimekeeperTara mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full px-6 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-3 bg-indigo-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-amber-400/50 shadow-lg">
          <span className="text-xl font-black text-amber-300">⏳ Time & Calendar</span>
          <span className="text-xs font-bold text-cyan-200">CISCE Class 3</span>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4 bg-indigo-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-indigo-400/50 shadow-lg">
            <span className="text-xs font-bold text-white">Challenge {challengeIdx + 1} / {CHALLENGES.length}</span>
            <StarRow count={stars} total={CHALLENGES.length} />
          </div>
        )}
      </div>

      {/* ─── SCREEN 1: TEACHING SLIDES ────────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-8 max-w-2xl my-auto">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`w-full rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} border-4 border-white/30 text-white flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4 bg-white/20 p-4 rounded-2xl backdrop-blur-sm shadow-inner">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed opacity-95 mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-white' : 'w-3 bg-white/40'}`}
                />
              ))}
            </div>

            <div className="flex gap-4 w-full justify-between">
              {slideIdx > 0 ? (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIdx(prev => prev - 1);
                  }}
                  className="px-6 py-3 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-bold text-sm backdrop-blur-md transition-all shadow-lg border border-white/20"
                >
                  ⬅️ Back
                </button>
              ) : <div />}

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    audioManager.play('success');
                    setScreen('play');
                  }
                }}
                className="px-8 py-3 rounded-2xl bg-white text-indigo-900 font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next ➡️' : 'Start Game! 🚀'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY SCREEN ────────────────────────────── */}
      {screen === 'play' && !showConfetti && (
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6 my-auto">
          {/* Question Box */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border-2 border-indigo-200 mb-6 max-w-xl w-full text-center"
          >
            <h3 className="text-lg font-black text-indigo-950">{currentChallenge.question}</h3>
          </motion.div>

          {/* Multiple Choice Challenge */}
          {currentChallenge.type === 'identify' && (
            <div className="grid grid-cols-2 gap-4 max-w-xl w-full">
              {currentChallenge.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswerSelect(option)}
                  className="py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-base shadow-lg border-2 border-amber-200 hover:brightness-110 transition-all flex items-center justify-center text-center"
                >
                  {option}
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort Challenge */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-2xl h-[340px]">
              {/* Bins */}
              <div className="flex justify-around mb-4">
                {currentChallenge.bins.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={50 + idx * 155}
                    y={130}
                    width={140}
                    height={110}
                    isHovering={hoverBin === bin.id}
                  />
                ))}
              </div>

              {/* Draggable Cards */}
              {currentChallenge.sortItems.map((item) => {
                const pos = dragPositions[item.id] || { x: 50, y: 380 };
                const isPlaced = placedItems[item.id] || false;
                return (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={pos.x}
                    y={pos.y}
                    placed={isPlaced}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── COMPLETION / SUCCESS SCREEN ──────────────────────── */}
      {showConfetti && (
        <div className="relative z-30 flex flex-col items-center justify-center flex-1 w-full px-6 my-auto text-center">
          <Confetti onComplete={() => setShowConfetti(false)} />
          <SuccessBanner message={`Awesome! Game Complete! Final Score: ${score}/100 ⭐`} onComplete={() => {}} />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-6 bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-amber-400 max-w-md w-full"
          >
            <h2 className="text-3xl font-black text-indigo-900 mb-2">Time Master! 🎉</h2>
            <p className="text-sm font-bold text-gray-700 mb-6">You have mastered calendars, clocks, AM/PM, and time conversions like a true champion!</p>
            <button
              onClick={() => {
                audioManager.play('tap');
                setScreen('teaching');
                setSlideIdx(0);
                setChallengeIdx(0);
                setStars(0);
                setErrors(0);
                setShowConfetti(false);
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Play Again 🔄
            </button>
          </motion.div>
        </div>
      )}

      {/* Feedback Overlays */}
      {successMsg && !showConfetti && (
        <SuccessBanner
          message={successMsg}
          onComplete={handleNextChallenge}
        />
      )}

      {hintMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => setHintMsg(null)}
        />
      )}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {/* Bottom Footer Bar */}
      <div className="relative z-10 w-full px-6 pb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-indigo-200">CISCE Class 3 • Mathematics</span>
        <button
          onClick={() => {
            audioManager.play('tap');
            setScreen(screen === 'teaching' ? 'play' : 'teaching');
          }}
          className="px-4 py-2 rounded-xl bg-indigo-950/80 hover:bg-indigo-950 text-amber-300 text-xs font-black backdrop-blur-md border border-amber-400/30 shadow-md transition-all"
        >
          {screen === 'teaching' ? 'Skip to Play 🎮' : 'Review Rules 📖'}
        </button>
      </div>
    </div>
  );
}
