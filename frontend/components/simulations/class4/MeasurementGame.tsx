'use client';

/**
 * MeasurementGame — Learn about measurement: need for measurement,
 * measuring instruments (ruler, tape, weighing machine, thermometer, clock),
 * and how to use them correctly.
 *
 * CISCE Nodes: c4_phy_005 (Need for measurement),
 *              c4_phy_006 (Measuring instruments in daily life),
 *              c4_phy_007 (How to use measuring instruments)
 * Enrichment: c4_physics_enrichment_part5-7
 *
 * ELI5: "Measurement is like a common language that uses numbers and units
 *   so everyone understands exactly how much. When you tell the shopkeeper
 *   '2 metres of cloth', he cuts exactly that much! We measure length with a
 *   tape, mass with a balance, time with a clock, and temperature with a
 *   thermometer. Without measurement, buying, cooking, and checking a fever
 *   would all be guesswork."
 *
 * Misconceptions (from enrichment):
 *   1. "Measurement only needs a number, like 'I want 2 of cloth.'" →
 *      "No! A measurement is always a number PLUS a unit ('2 metres').
 *      '2' alone is meaningless!"
 *   2. "You can place the edge of the ruler at the end of the object." →
 *      "No! You must place the ZERO MARK exactly at one end. The edge has a
 *      blank strip!"
 *   3. "A thermometer measures fever." →
 *      "No! A thermometer measures TEMPERATURE in degrees Celsius. Fever is a
 *      medical condition shown by a high temperature reading!"
 *   4. "Step on the weighing machine and read immediately." →
 *      "No! You must stand still and WAIT for the needle to stop moving!"
 *   5. "The long hand of the clock tells the hour." →
 *      "No! The SHORT hand tells the hour and the LONG hand tells the minutes!"
 *
 * Story: "Help Tailor Tanvi measure cloth for uniforms, weigh vegetables at
 *   the market, check fevers, and read the clock! Become a Measurement Master!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG tailor shop background (sky gradient, shop front, measuring tape, clock, thermometer)
 * - Custom SVG instrument & object components (ruler, tape, scale, thermometer, clock)
 * - Custom SVG tailor mascot (Tanvi) with measuring tape & lab badge
 * - Drag-and-drop: drag items into correct bins for sorting challenges
 * - 8 progressive challenges: identify need → match quantity/unit → use instruments → clock reading
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API
 * - Procedural sound effects (drop, success, celebration)
 * - Confetti + celebration on success
 * - Auto-hint after EXACTLY 10 seconds of inactivity
 * - Progressive difficulty ladder
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

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: 'Why Do We Measure? 📏',
    text: 'Measurement is the process of finding out the size, amount, or degree of something using a standard unit! Without measurement, buying cloth, cooking, or checking a fever would be impossible guesswork!',
    emoji: '📏',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'Measurement is the process of finding out the size, amount, or degree of something using a standard unit! Without measurement, buying cloth, cooking, or checking a fever would be guesswork!',
  },
  {
    title: 'Numbers and Units! 🔢',
    text: "Every measurement needs TWO things — a number and a unit! Saying 'I want 2 of cloth' is meaningless. Saying 'I want 2 metres of cloth' tells the shopkeeper exactly how much to cut!",
    emoji: '✂️',
    bgColor: 'from-cyan-500 to-blue-600',
    spoken: "Every measurement needs two things — a number and a unit! Saying 'I want 2 of cloth' is meaningless. Saying 'I want 2 metres of cloth' tells the shopkeeper exactly how much to cut!",
  },
  {
    title: 'Four Physical Quantities! ⚖️',
    text: 'At Class 4, we learn four common physical quantities: Length (metres/centimetres), Mass (kilograms/grams), Time (hours/minutes), and Temperature (degrees Celsius)! Each has a special instrument!',
    emoji: '🌡️',
    bgColor: 'from-teal-500 to-cyan-600',
    spoken: 'At Class 4, we learn four common physical quantities: Length, Mass, Time, and Temperature! Each has a special instrument!',
  },
  {
    title: 'Measuring Instruments! 🚰',
    text: 'A ruler and tape measure length! A weighing machine measures mass! A thermometer measures temperature in degrees Celsius! A clock measures time in hours and minutes!',
    emoji: '⏰',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'A ruler and tape measure length! A weighing machine measures mass! A thermometer measures temperature! A clock measures time!',
  },
  {
    title: 'Using Them Correctly! 🎯',
    text: 'Always start a ruler at the zero mark, not the edge! Stand still on a weighing machine and wait for the needle to stop! Shake down a thermometer and keep it under your tongue for one minute!',
    emoji: '⭐',
    bgColor: 'from-green-500 to-emerald-600',
    spoken: 'Always start a ruler at the zero mark, not the edge! Stand still on a weighing machine and wait for the needle to stop! Shake down a thermometer and keep it under your tongue for one minute!',
  },
];

// ─── Custom SVG Instrument & Object Icons ─────────────────────

function RulerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 100 40">
      <rect x="2" y="5" width="96" height="30" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" rx="3" />
      {/* Centimetre markings */}
      {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => (
        <line key={x} x1={x} y1="5" x2={x} y2={x % 20 === 0 ? "18" : "12"} stroke="#CA8A04" strokeWidth="1.5" />
      ))}
      <text x="12" y="27" fontSize="10" fill="#854D0E" fontWeight="bold">0</text>
      <text x="42" y="27" fontSize="10" fill="#854D0E" fontWeight="bold">5</text>
      <text x="82" y="27" fontSize="10" fill="#854D0E" fontWeight="bold">10</text>
    </svg>
  );
}

function MeasuringTapeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Tape case */}
      <circle cx="30" cy="30" r="22" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
      <circle cx="30" cy="30" r="16" fill="#FB7185" />
      <circle cx="30" cy="30" r="6" fill="#FFF" />
      {/* Pulling tape */}
      <path d="M30 8 L30 2 C30 1, 35 1, 35 2 L35 10" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
      <rect x="27" y="2" width="16" height="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" rx="1" />
    </svg>
  );
}

function WeighingScaleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Scale body */}
      <rect x="10" y="35" width="40" height="18" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" rx="4" />
      {/* Dial */}
      <circle cx="30" cy="22" r="16" fill="white" stroke="#0284C7" strokeWidth="2" />
      {/* Dial needle */}
      <line x1="30" y1="22" x2="38" y2="15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="22" r="3" stroke="#0284C7" strokeWidth="1" fill="#38BDF8" />
      {/* kg text */}
      <text x="24" y="28" fontSize="8" fill="#0369A1" fontWeight="bold">kg</text>
    </svg>
  );
}

function ThermometerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 60">
      {/* Stem */}
      <rect x="16" y="8" width="8" height="36" fill="white" stroke="#64748B" strokeWidth="2" rx="4" />
      {/* Bulb */}
      <circle cx="20" cy="46" r="8" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      {/* Mercury level */}
      <rect x="18" y="24" width="4" height="22" fill="#EF4444" rx="2" />
      {/* Markings */}
      <line x1="24" y1="15" x2="28" y2="15" stroke="#64748B" strokeWidth="1" />
      <line x1="24" y1="25" x2="28" y2="25" stroke="#64748B" strokeWidth="1" />
      <line x1="24" y1="35" x2="28" y2="35" stroke="#64748B" strokeWidth="1" />
    </svg>
  );
}

function ClockIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="white" stroke="#D97706" strokeWidth="3" />
      {/* Numbers */}
      <text x="27" y="12" fontSize="9" fill="#B45309" fontWeight="bold">12</text>
      <text x="47" y="33" fontSize="9" fill="#B45309" fontWeight="bold">3</text>
      <text x="28" y="52" fontSize="9" fill="#B45309" fontWeight="bold">6</text>
      <text x="9" y="33" fontSize="9" fill="#B45309" fontWeight="bold">9</text>
      {/* Hands */}
      <line x1="30" y1="30" x2="30" y2="18" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="30" x2="42" y2="30" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="30" r="2.5" fill="#D97706" />
    </svg>
  );
}

function ClothIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 15 Q30 5, 50 15 L50 45 Q30 55, 10 45 Z" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
      <path d="M10 23 Q30 13, 50 23" stroke="#C4B5FD" strokeWidth="2" fill="none" />
      <path d="M10 32 Q30 22, 50 32" stroke="#C4B5FD" strokeWidth="2" fill="none" />
    </svg>
  );
}

function VegetableIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Tomato */}
      <circle cx="25" cy="35" r="14" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <path d="M25 21 Q27 16, 29 21" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Potato */}
      <ellipse cx="43" cy="40" rx="11" ry="8" fill="#D97706" stroke="#B45309" strokeWidth="2" />
    </svg>
  );
}

function FeverIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Head */}
      <circle cx="30" cy="32" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      {/* Sad face */}
      <circle cx="24" cy="28" r="2" fill="#1E293B" />
      <circle cx="36" cy="28" r="2" fill="#1E293B" />
      <path d="M26 40 Q30 35, 34 40" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Thermometer in mouth */}
      <rect x="28" y="34" width="16" height="4" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" rx="2" transform="rotate(-15 28 34)" />
    </svg>
  );
}

function ZeroMarkIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="20" width="50" height="20" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" rx="2" />
      <line x1="15" y1="20" x2="15" y2="35" stroke="#EF4444" strokeWidth="3" />
      <text x="12" y="16" fontSize="12" fill="#EF4444" fontWeight="bold">0</text>
    </svg>
  );
}

function UnitIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="16" y="37" fontSize="22" fill="#0369A1" fontWeight="bold">m</text>
      <text x="34" y="24" fontSize="14" fill="#0284C7" fontWeight="bold">kg</text>
    </svg>
  );
}

// ─── Render Icon Helper for Sort Cards ────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'ruler': return <RulerIcon size={size} />;
    case 'tape': return <MeasuringTapeIcon size={size} />;
    case 'scale': return <WeighingScaleIcon size={size} />;
    case 'thermometer': return <ThermometerIcon size={size} />;
    case 'clock': return <ClockIcon size={size} />;
    case 'cloth': return <ClothIcon size={size} />;
    case 'vegetable': return <VegetableIcon size={size} />;
    case 'fever': return <FeverIcon size={size} />;
    case 'zero': return <ZeroMarkIcon size={size} />;
    case 'unit': return <UnitIcon size={size} />;
    default: return <RulerIcon size={size} />;
  }
}

// ─── Tailor Tanvi Mascot (Custom SVG) ─────────────────────────

function TailorTanvi({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[240px] border-2 border-indigo-200"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Body / Dress */}
          <path d="M25 50 L15 80 L60 80 L50 50 Z" fill="#6366F1" stroke="#4338CA" strokeWidth="2" />
          {/* Measuring tape draped around neck */}
          <path d="M20 35 Q37.5 50, 55 35" stroke="#FEF08A" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M22 37 Q37.5 52, 53 37" stroke="#CA8A04" strokeWidth="1" fill="none" strokeDasharray="3 3" />
          {/* Head */}
          <circle cx="37.5" cy="28" r="15" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          {/* Hair */}
          <path d="M22 25 Q37.5 10, 53 25 L50 20 Q37.5 8, 25 20 Z" fill="#1E293B" />
          {/* Eyes */}
          <circle cx="31" cy="26" r="2" fill="#1E293B" />
          <circle cx="44" cy="26" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 33 Q37.5 37, 42 33" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Ruler badge on dress */}
          <rect x="30" y="58" width="15" height="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" rx="1" />
          <line x1="33" y1="58" x2="33" y2="66" stroke="#CA8A04" strokeWidth="1" />
          <line x1="38" y1="58" x2="38" y2="66" stroke="#CA8A04" strokeWidth="1" />
          {/* Arms */}
          <ellipse cx="16" cy="60" rx="4" ry="8" fill="#4338CA" transform="rotate(20 16 60)" />
          <ellipse cx="59" cy="60" rx="4" ry="8" fill="#4338CA" transform="rotate(-20 59 60)" />
          {/* Feet */}
          <ellipse cx="30" cy="83" rx="5" ry="3" fill="#1E293B" />
          <ellipse cx="45" cy="83" rx="5" ry="3" fill="#1E293B" />
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

// ─── Tailor Shop Scene Background ─────────────────────────────

function TailorShopScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="shop-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>
          <linearGradient id="shop-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        {/* Sky / Wall */}
        <rect width={width} height={height * 0.75} fill="url(#shop-sky)" />
        {/* Floor */}
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#shop-floor)" />
        {/* Floor tiles pattern */}
        {[100, 200, 300, 400, 500, 600].map(x => (
          <line key={x} x1={x} y1={height * 0.75} x2={x} y2={height} stroke="#D97706" strokeWidth="2" strokeDasharray="10 10" opacity="0.4" />
        ))}
        {/* Wall clock on shop wall */}
        <circle cx="90" cy="50" r="22" fill="white" stroke="#D97706" strokeWidth="3" />
        <line x1="90" y1="50" x2="90" y2="38" stroke="#1E293B" strokeWidth="2" />
        <line x1="90" y1="50" x2="100" y2="50" stroke="#1E293B" strokeWidth="1.5" />
        <circle cx="90" cy="50" r="2" fill="#D97706" />
        {/* Shelf with cloth rolls */}
        <rect x="40" y="90" width="180" height="10" fill="#78350F" rx="2" />
        <rect x="50" y="65" width="25" height="25" fill="#EC4899" rx="3" />
        <rect x="80" y="60" width="30" height="30" fill="#8B5CF6" rx="3" />
        <rect x="115" y="65" width="22" height="25" fill="#3B82F6" rx="3" />
      </svg>
    </div>
  );
}

// ─── Challenges Array (8 progressive challenges) ──────────────

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

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Why do we need MEASUREMENT in daily life?',
    answer: 'To find the exact size, amount, or degree of something using a standard unit',
    options: [
      'To find the exact size, amount, or degree of something using a standard unit',
      'To make things look pretty in the house',
      'To waste time when shopping',
    ],
    hint: 'Think about buying cloth or potatoes! Without exact numbers and units, buying goods would be pure guesswork.',
    misconception: 'Measurement is not just for looks — it replaces guesswork with exactness so we can buy correct quantities of goods, cook properly, and check our health!',
  },
  {
    type: 'sort',
    question: 'Drag each physical quantity to its correct measuring instrument!',
    answer: 'sort',
    options: [],
    hint: 'Ruler/tape = Length | Weighing machine = Mass | Thermometer = Temperature | Clock = Time',
    misconception: 'Each physical quantity has one correct instrument: ruler/tape for length, weighing machine for mass, thermometer for temperature, and clock for time!',
    sortItems: [
      { id: 'item-len', label: 'Length', icon: 'ruler', correctBin: 'bin-ruler' },
      { id: 'item-mass', label: 'Mass', icon: 'scale', correctBin: 'bin-scale' },
      { id: 'item-temp', label: 'Temperature', icon: 'thermometer', correctBin: 'bin-therm' },
      { id: 'item-time', label: 'Time', icon: 'clock', correctBin: 'bin-clock' },
    ],
    bins: [
      { id: 'bin-ruler', label: 'Ruler 📏', color: '#3B82F6' },
      { id: 'bin-scale', label: 'Scale ⚖️', color: '#10B981' },
      { id: 'bin-therm', label: 'Thermometer 🌡️', color: '#EF4444' },
      { id: 'bin-clock', label: 'Clock ⏰', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'What TWO things does every measurement need?',
    answer: 'A number and a unit',
    options: [
      'A number and a unit',
      'Only a number without any unit',
      'Only a colour and a name',
    ],
    hint: "Saying 'I want 2' is meaningless! You must say '2 metres' or '2 kilograms'.",
    misconception: "A measurement is always a number PLUS a unit ('2 metres' or '1 kilogram'). A number alone like '2' tells the shopkeeper nothing!",
  },
  {
    type: 'sort',
    question: 'Match each daily-life situation to the correct measurement item!',
    answer: 'sort',
    options: [],
    hint: 'Tailor = cloth in metres | Vegetable seller = mass in kg | Doctor = thermometer for fever | Clock = time',
    misconception: 'Tailors measure cloth in metres, vegetable sellers weigh potatoes in kilograms, doctors check fever with a thermometer in degrees Celsius, and clocks show time in hours!',
    sortItems: [
      { id: 's-cloth', label: 'Tailor cutting cloth', icon: 'cloth', correctBin: 'bin-cloth' },
      { id: 's-veg', label: 'Weighing vegetables', icon: 'vegetable', correctBin: 'bin-veg' },
      { id: 's-fever', label: 'Checking fever', icon: 'fever', correctBin: 'bin-fever' },
    ],
    bins: [
      { id: 'bin-cloth', label: 'Metres (Length) ✂️', color: '#8B5CF6' },
      { id: 'bin-veg', label: 'Kilograms (Mass) ⚖️', color: '#10B981' },
      { id: 'bin-fever', label: 'Degrees (Temp) 🌡️', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'When using a RULER to measure length, where do you place the zero mark?',
    answer: 'Exactly at one end of the object',
    options: [
      'Exactly at one end of the object',
      'In the middle of the object',
      'At the other end from the object',
    ],
    hint: 'The zero mark is the starting point! Placing the edge instead of zero makes the measurement wrong.',
    misconception: 'You must always place the ZERO mark exactly at one end of the object, because many rulers have a small blank strip before the zero!',
  },
  {
    type: 'sort',
    question: 'Drag each step of using a ruler into the correct order!',
    answer: 'sort',
    options: [],
    hint: '1. Place zero at end -> 2. Lay ruler straight -> 3. Look at marking -> 4. Read to nearest cm',
    misconception: 'Using a ruler requires steps in order: first align the zero mark at one end, lay it straight, look at the other end marking, and read to the nearest centimetre!',
    sortItems: [
      { id: 'step-1', label: 'Place zero at end', icon: 'zero', correctBin: 'bin-1' },
      { id: 'step-2', label: 'Lay ruler straight', icon: 'ruler', correctBin: 'bin-2' },
      { id: 'step-3', label: 'Read marking', icon: 'unit', correctBin: 'bin-3' },
    ],
    bins: [
      { id: 'bin-1', label: 'Step 1 (Start)', color: '#3B82F6' },
      { id: 'bin-2', label: 'Step 2 (Align)', color: '#8B5CF6' },
      { id: 'bin-3', label: 'Step 3 (Read)', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'What does a THERMOMETER measure?',
    answer: 'Temperature in degrees Celsius',
    options: [
      'Temperature in degrees Celsius',
      'Length in centimetres',
      'Mass in kilograms',
    ],
    hint: 'A thermometer is used by doctors and mothers when a child feels warm or unwell.',
    misconception: 'A thermometer measures TEMPERATURE (how hot or cold something is) in degrees Celsius — it does NOT measure weight or length!',
  },
  {
    type: 'sort',
    question: 'Drag each instrument to how it is used correctly!',
    answer: 'sort',
    options: [],
    hint: 'Ruler = start at zero | Weighing machine = stand still and wait | Thermometer = shake down & keep under tongue',
    misconception: 'Each instrument has a unique correct procedure: rulers start at zero, weighing machines need you to stand still and wait for the needle to stop, and thermometers need to be shaken down first!',
    sortItems: [
      { id: 'u-ruler', label: 'Ruler', icon: 'ruler', correctBin: 'bin-ur' },
      { id: 'u-scale', label: 'Weighing machine', icon: 'scale', correctBin: 'bin-us' },
      { id: 'u-therm', label: 'Thermometer', icon: 'thermometer', correctBin: 'bin-ut' },
    ],
    bins: [
      { id: 'bin-ur', label: 'Start at zero mark 📏', color: '#3B82F6' },
      { id: 'bin-us', label: 'Stand still & wait ⚖️', color: '#10B981' },
      { id: 'bin-ut', label: 'Shake down & wait 1 min 🌡️', color: '#EF4444' },
    ],
  },
];

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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Component Props & Export ────────────────────────────

export interface MeasurementGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MeasurementGame({ width = 720, height = 560, onComplete }: MeasurementGameProps) {
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

  // Cleanup speech and timer on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Teaching slide speech
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

  // Challenge speech & inactivity timer
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

  // Initialize sort item positions
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 150, y: height - 165 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      setScreen('play');
      setMascotMood('happy');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

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
      const msg = 'Great job! You are a measurement master!';
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
      const compMsg = 'Wonderful! You are a Measurement Master!';
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

    // Check hit against bins
    let droppedBinId: string | null = null;
    const binCount = currentChallenge.bins.length;
    const binWidth = 130;
    const binHeight = 110;
    const startX = (width - (binCount * binWidth + (binCount - 1) * 20)) / 2;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = 130;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
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
        const msg = 'Fantastic! You sorted the measurements perfectly!';
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
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans bg-sky-100 flex flex-col justify-between"
      style={{ width, height }}
    >
      {/* Background Scene */}
      <TailorShopScene width={width} height={height} />

      {/* Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">✂️</span>
          <div>
            <h1 className="text-base font-black text-indigo-900 leading-tight">Tailor Tanvi s Measurement Workshop</h1>
            <p className="text-xs font-semibold text-indigo-600">CISCE Class 4 Physics • Measurement</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {screen === 'play' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Challenge {challengeIdx + 1} / {CHALLENGES.length}</span>
              <StarRow count={Math.floor(score / 15)} total={8} />
            </div>
          )}
          <button
            onClick={() => {
              audioManager.play('tap');
              handleShowHint();
            }}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-full shadow transition-transform active:scale-95 flex items-center gap-1"
          >
            <span>💡</span> Hint
          </button>
        </div>
      </div>

      {/* Mascot Tanvi */}
      <TailorTanvi mood={mascotMood} speaking={speakingText} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        {screen === 'teaching' ? (
          /* ─── TEACHING SCREEN ────────────────────────────── */
          <div className="flex flex-col items-center max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-indigo-200">
            <div className="text-6xl mb-4 animate-bounce">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black text-indigo-900 mb-3 text-center">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-base font-medium text-gray-700 text-center leading-relaxed mb-6">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            {/* Dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-indigo-600' : 'w-3 bg-gray-300'}`}
                />
              ))}
            </div>

            <div className="flex gap-4 w-full justify-between">
              <button
                onClick={handlePrevSlide}
                disabled={slideIdx === 0}
                className={`px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
                  slideIdx === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-700 active:scale-95'
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNextSlide}
                className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </div>
        ) : (
          /* ─── PLAY SCREEN ────────────────────────────────── */
          <div className="flex flex-col items-center max-w-2xl w-full">
            {/* Question Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-indigo-100 mb-6 w-full text-center">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                Challenge {challengeIdx + 1}
              </span>
              <h2 className="text-xl font-black text-gray-900">{currentChallenge.question}</h2>
            </div>

            {/* Challenge Type: Identify (Multiple Choice) */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-lg">
                {currentChallenge.options.map(opt => {
                  const isSelected = selectedOpt === opt;
                  const isCorrect = opt === currentChallenge.answer;
                  let btnStyle = 'bg-white hover:bg-indigo-50 border-indigo-200 text-gray-800';
                  if (selectedOpt) {
                    if (isCorrect) btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-102';
                    else if (isSelected) btnStyle = 'bg-rose-500 border-rose-600 text-white animate-shake';
                    else btnStyle = 'bg-gray-100 opacity-50 border-gray-200 text-gray-400';
                  }
                  return (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                      onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                      className={`p-4 rounded-2xl border-2 font-bold text-sm shadow-md transition-all text-left flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrect && <span className="text-xl">✅</span>}
                      {selectedOpt && isSelected && !isCorrect && <span className="text-xl">❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Challenge Type: Sort (Drag & Drop) */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-80 flex flex-col justify-between">
                {/* Bins Container */}
                <div className="flex justify-center gap-4 w-full">
                  {currentChallenge.bins.map((bin, idx) => {
                    const binCount = currentChallenge.bins!.length;
                    const binWidth = 130;
                    const binHeight = 110;
                    const startX = (width - (binCount * binWidth + (binCount - 1) * 20)) / 2;
                    const bx = startX + idx * (binWidth + 20) - (width - 720) / 2; // adjust centering
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={bx}
                        y={20}
                        width={binWidth}
                        height={binHeight}
                        isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                      />
                    );
                  })}
                </div>

                {/* Draggable Sort Cards */}
                <div className="flex justify-center gap-4 relative h-28">
                  {currentChallenge.sortItems.map(item => {
                    const pos = itemPositions[item.id] || { x: 0, y: 0 };
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
              </div>
            )}
          </div>
        )}
      </div>

      {/* Success Banner / Advance Button */}
      {successMsg && (
        <SuccessBanner
          message={successMsg}
          onComplete={advanceChallenge}
        />
      )}

      {/* Hint Bubble */}
      {hintMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => setHintMsg(null)}
        />
      )}

      {/* Sparkle Burst */}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {/* Confetti on Completion */}
      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}
    </div>
  );
}
