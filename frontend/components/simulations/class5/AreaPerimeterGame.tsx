'use client';

/**
 * AreaPerimeterGame — Learn area, perimeter, daily life measurement problems, and unit conversions
 *
 * CISCE Nodes: c5_math_052 (Area and perimeter of simple geometrical shapes; ideas and their measurement),
 *              c5_math_053 (Daily life problems involving length, weight, time, money and volume - Use of four number operations),
 *              c5_math_054 (Idea of larger and smaller units of length, weight, time, money and volume and conversion)
 * Enrichment: c5_maths_enrichment_part52, part53, part54
 *
 * ELI5: "Imagine a rectangular photo frame. The frame itself — the wood running all the way around the edge —
 *   is the perimeter; you measure it in centimetres like a string. The picture inside, the flat surface it covers,
 *   is the area; you measure it in square centimetres, like counting tiny 1-cm tiles needed to fill it.
 *   Perimeter is the fence, area is the carpet!"
 *
 * Misconceptions:
 *   1. "Area and perimeter are the same thing." → "Area measures surface space inside (square units), perimeter measures boundary length (linear units)!"
 *   2. "Area of a rectangle is length + breadth." → "Area is length TIMES breadth (l × b)! Perimeter is 2 × (l + b)!"
 *   3. "1 hour = 100 minutes." → "Time uses base-60! 1 hour = 60 minutes!"
 *   4. "1 metre = 10 centimetres." → "1 metre = 100 centimetres! Metric units use 10, 100, or 1000!"
 *   5. "The unit of area is cm or m." → "Area is always in square units like sq cm or sq m because we count squares!"
 *
 * Mascot: Builder Bala — a construction builder with a hard hat, measuring tape, and blueprints!
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

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Perimeter: The Fence! 🧱",
    text: "Perimeter is the total length of the boundary around a shape. For a square, P = 4 × side. For a rectangle, P = 2 × (length + breadth). Measured in cm, m, or km!",
    emoji: "📏",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "Perimeter is the total length of the boundary around a shape! Like the fence around a garden. Measured in centimetres or metres!"
  },
  {
    title: "Area: The Carpet! 🟩",
    text: "Area is the flat surface space inside a shape. For a square, Area = side × side. For a rectangle, Area = length × breadth. Always measured in square units like sq cm or sq m!",
    emoji: "🟩",
    bgColor: "from-green-400 to-emerald-600",
    spoken: "Area is the flat surface space inside a shape! Like tiles covering a floor. Always measured in square units like square centimetres!"
  },
  {
    title: "Daily Life Operations! 🛒",
    text: "We use addition, subtraction, multiplication, and division for daily life problems! Buying rice at Rs 45 per kg is multiplication. Finding water left in a tank is subtraction.",
    emoji: "💰",
    bgColor: "from-gold-400 to-gold-600",
    spoken: "We use the four basic operations for daily life measurement problems involving length, weight, time, money, and volume!"
  },
  {
    title: "Unit Conversion Families! 🔄",
    text: "Larger units convert to smaller units by multiplying! 1 km = 1000 m, 1 kg = 1000 g, 1 litre = 1000 mL, 1 rupee = 100 paise, and 1 hour = 60 minutes! Smaller to larger divides.",
    emoji: "🔄",
    bgColor: "from-purple-450 to-pink-500",
    spoken: "Larger units convert to smaller units by multiplying! Remember that 1 hour has 60 minutes, while length and weight use 1000!"
  },
  {
    title: "Builder Bala s Workshop! 🏗️",
    text: "Ready to test your skills? Help Builder Bala measure perimeters, calculate areas, solve word problems, and convert units without making common mistakes!",
    emoji: "🏗️",
    bgColor: "from-rose-400 to-pink-600",
    spoken: "Ready to test your skills? Help Builder Bala measure perimeters, calculate areas, and convert units!"
  },
];

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is the perimeter of a square with side 6 cm?",
    answer: "24 cm",
    options: ["24 cm", "36 cm", "12 cm", "6 cm"],
    hint: "Perimeter of a square is 4 times the side length (4 × s)!",
    misconception: "Perimeter is 4 × 6 = 24 cm! 36 cm is the area (6 × 6), not the perimeter. Always use linear units (cm) for perimeter."
  },
  {
    type: 'sort',
    question: "Drag each shape to its correct PERIMETER!",
    answer: "sort",
    options: [],
    hint: "Calculate: Square = 4 × side. Rectangle = 2 × (L + B). Triangle = sum of 3 sides.",
    misconception: "Check your formula! Rectangle perimeter is 2 × (length + breadth), doubling both sides. Don't forget to double the sum!",
    sortItems: [
      { id: 'p1', label: 'Square side 5 cm (20 cm)', icon: 'square-icon', correctBin: 'bin-20' },
      { id: 'p2', label: 'Rectangle 8 cm × 3 cm (22 cm)', icon: 'rectangle-icon', correctBin: 'bin-22' },
      { id: 'p3', label: 'Triangle sides 4,5,6 cm (15 cm)', icon: 'triangle-icon', correctBin: 'bin-15' },
      { id: 'p4', label: 'Square side 7 cm (28 cm)', icon: 'square-icon', correctBin: 'bin-28' },
    ],
    bins: [
      { id: 'bin-15', label: '15 cm', color: '#3B82F6' },
      { id: 'bin-20', label: '20 cm', color: '#10B981' },
      { id: 'bin-22', label: '22 cm', color: '#F59E0B' },
      { id: 'bin-28', label: '28 cm', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is the area of a rectangle with length 8 cm and breadth 5 cm?",
    answer: "40 sq cm",
    options: ["40 sq cm", "13 sq cm", "26 cm", "40 cm"],
    hint: "Area = length × breadth. Also, remember area uses square units!",
    misconception: "Area is length × breadth = 8 × 5 = 40 sq cm. 13 is the sum (8 + 5). Area must always be in square units (sq cm), never just 'cm'."
  },
  {
    type: 'sort',
    question: "Drag each shape to its correct AREA!",
    answer: "sort",
    options: [],
    hint: "Area = length × breadth for rectangles, side × side for squares!",
    misconception: "Area counts unit squares inside the surface! Always write 'sq cm' or 'sq m', never linear units like cm.",
    sortItems: [
      { id: 'a1', label: 'Square side 6 cm (36 sq cm)', icon: 'square-icon', correctBin: 'bin-36' },
      { id: 'a2', label: 'Rectangle 7 cm × 4 cm (28 sq cm)', icon: 'rectangle-icon', correctBin: 'bin-28a' },
      { id: 'a3', label: 'Rectangle 9 cm × 3 cm (27 sq cm)', icon: 'rectangle-icon', correctBin: 'bin-27' },
      { id: 'a4', label: 'Square side 8 cm (64 sq cm)', icon: 'square-icon', correctBin: 'bin-64' },
    ],
    bins: [
      { id: 'bin-27', label: '27 sq cm', color: '#3B82F6' },
      { id: 'bin-28a', label: '28 sq cm', color: '#10B981' },
      { id: 'bin-36', label: '36 sq cm', color: '#F59E0B' },
      { id: 'bin-64', label: '64 sq cm', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "A garden is 12 m long and 8 m wide. What length of fencing is needed to go all around it?",
    answer: "40 m",
    options: ["40 m", "20 m", "96 m", "96 sq m"],
    hint: "Fencing goes around the boundary — that is perimeter: 2 × (length + breadth)!",
    misconception: "Fencing is perimeter = 2 × (12 + 8) = 2 × 20 = 40 m! 96 sq m is the area, but you cannot buy fencing in square metres."
  },
  {
    type: 'sort',
    question: "Drag each unit conversion to its correct answer!",
    answer: "sort",
    options: [],
    hint: "1 km = 1000 m, 1 m = 100 cm, 1 kg = 1000 g, 1 hour = 60 minutes!",
    misconception: "Remember: 1 hour = 60 minutes (not 100!). Time uses base-60. Length and weight use 1000.",
    sortItems: [
      { id: 'c1', label: '3 km = ? metres', icon: 'ruler-icon', correctBin: 'bin-3000m' },
      { id: 'c2', label: '2 kg = ? grams', icon: 'brick-icon', correctBin: 'bin-2000g' },
      { id: 'c3', label: '2 hours = ? minutes', icon: 'blueprint-icon', correctBin: 'bin-120min' },
      { id: 'c4', label: 'Rs. 5 = ? paise', icon: 'measuring-tape', correctBin: 'bin-500p' },
    ],
    bins: [
      { id: 'bin-120min', label: '120 minutes', color: '#3B82F6' },
      { id: 'bin-500p', label: '500 paise', color: '#10B981' },
      { id: 'bin-2000g', label: '2000 grams', color: '#F59E0B' },
      { id: 'bin-3000m', label: '3000 metres', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "A shopkeeper sells 3 kg of rice at Rs 45 per kg. What is the total cost?",
    answer: "Rs 135",
    options: ["Rs 135", "Rs 48", "Rs 15", "Rs 150"],
    hint: "When rate per kg and quantity are known, multiply rate by quantity!",
    misconception: "Multiply rate by quantity: 3 × 45 = Rs 135! Do not divide; 'per kg' for 3 kg means 3 groups of 45."
  },
  {
    type: 'sort',
    question: "Drag each word problem to its correct solution value!",
    answer: "sort",
    options: [],
    hint: "Read carefully: total distance / speed = time, or rate × quantity = cost!",
    misconception: "Match the operation to the clue words: 'per/each' means multiply for totals, 'left' means subtract, 'shared equally' means divide.",
    sortItems: [
      { id: 'w1', label: 'Car travels 240 km in 4 hours (Speed)', icon: 'ruler-icon', correctBin: 'bin-60' },
      { id: 'w2', label: 'Tank holds 500 L, uses 25 L/min (Time)', icon: 'brick-icon', correctBin: 'bin-20' },
      { id: 'w3', label: 'Rope 2.5 m cut into 5 pieces (Length)', icon: 'measuring-tape', correctBin: 'bin-05' },
      { id: 'w4', label: '5 kg rice in 250 g bags (Bags count)', icon: 'blueprint-icon', correctBin: 'bin-20bags' },
    ],
    bins: [
      { id: 'bin-05', label: '0.5 m each', color: '#3B82F6' },
      { id: 'bin-20', label: '20 minutes', color: '#10B981' },
      { id: 'bin-60', label: '60 km/h', color: '#F59E0B' },
      { id: 'bin-20bags', label: '20 bags', color: '#8B5CF6' },
    ]
  },
];

// ─── Custom SVG Component Icons ──────────────────────────────

function SquareIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" rx="3" />
      <text x="30" y="35" fontSize="12" fill="#92400E" fontWeight="bold" textAnchor="middle">s × s</text>
    </svg>
  );
}

function RectangleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="14" width="48" height="32" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2.5" rx="3" />
      <text x="30" y="34" fontSize="11" fill="#3730A3" fontWeight="bold" textAnchor="middle">l × b</text>
    </svg>
  );
}

function TriangleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 54,50 6,50" fill="#D1FAE5" stroke="#059669" strokeWidth="2.5" />
      <text x="30" y="38" fontSize="10" fill="#065F46" fontWeight="bold" textAnchor="middle">½bh</text>
    </svg>
  );
}

function RulerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="18" width="44" height="24" fill="#FDE68A" stroke="#B45309" strokeWidth="2" rx="2" />
      <line x1="14" y1="18" x2="14" y2="26" stroke="#92400E" strokeWidth="1.5" />
      <line x1="20" y1="18" x2="20" y2="24" stroke="#92400E" strokeWidth="1.5" />
      <line x1="26" y1="18" x2="26" y2="26" stroke="#92400E" strokeWidth="1.5" />
      <line x1="32" y1="18" x2="32" y2="24" stroke="#92400E" strokeWidth="1.5" />
      <line x1="38" y1="18" x2="38" y2="26" stroke="#92400E" strokeWidth="1.5" />
      <line x1="44" y1="18" x2="44" y2="24" stroke="#92400E" strokeWidth="1.5" />
    </svg>
  );
}

function BrickIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="11" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" rx="1" />
      <rect x="12" y="25" width="44" height="11" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" rx="1" />
      <rect x="8" y="38" width="44" height="11" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="1.5" rx="1" />
    </svg>
  );
}

function BlueprintIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#2563EB" stroke="#1E40AF" strokeWidth="2" rx="2" />
      <line x1="10" y1="20" x2="50" y2="20" stroke="#93C5FD" strokeWidth="1" />
      <line x1="10" y1="30" x2="50" y2="30" stroke="#93C5FD" strokeWidth="1" />
      <line x1="10" y1="40" x2="50" y2="40" stroke="#93C5FD" strokeWidth="1" />
      <line x1="20" y1="10" x2="20" y2="50" stroke="#93C5FD" strokeWidth="1" />
      <line x1="35" y1="10" x2="35" y2="50" stroke="#93C5FD" strokeWidth="1" />
    </svg>
  );
}

function HardHatIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 32 Q30 10 50 32 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
      <rect x="6" y="32" width="48" height="6" fill="#D97706" rx="2" />
      <rect x="25" y="18" width="10" height="6" fill="#FEF3C7" rx="2" />
    </svg>
  );
}

// ─── Construction Site Scene Background ──────────────────────

function ConstructionScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#4D7C0F" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width={width} height={height * 0.7} fill="url(#sky-grad)" />
        {/* Ground */}
        <rect y={height * 0.7} width={width} height={height * 0.3} fill="url(#ground-grad)" />
        {/* Distant crane outline */}
        <line x1="100" y1={height * 0.7} x2="100" y2="120" stroke="#78350F" strokeWidth="4" />
        <line x1="100" y1="120" x2="160" y2="90" stroke="#78350F" strokeWidth="3" />
        <line x1="100" y1="120" x2="50" y2="120" stroke="#78350F" strokeWidth="3" />
        {/* Half-built house frame */}
        <rect x={width - 180} y={height * 0.7 - 110} width="120" height="110" fill="#FEF3C7" stroke="#92400E" strokeWidth="3" />
        <polygon points={`${width - 190},${height * 0.7 - 110} ${width - 120},${height * 0.7 - 160} ${width - 50},${height * 0.7 - 110}`} fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ─── Builder Bala Mascot ──────────────────────────────────────

function BuilderBala({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400"
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
          <defs>
            <linearGradient id="bala-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          {/* Yellow Hard Hat */}
          <path d="M22 22 Q37 6 52 22 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
          <rect x="18" y="22" width="38" height="5" fill="#D97706" rx="2" />
          {/* Head */}
          <circle cx="37" cy="34" r="14" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="32" r="2" fill="#1F2937" />
          <circle cx="43" cy="32" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 40 Q37 44 41 40" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Shirt / Tool Belt */}
          <path d="M22 50 L52 50 L56 78 L18 78 Z" fill="url(#bala-shirt)" stroke="#1E3A8A" strokeWidth="1.5" />
          <rect x="22" y="60" width="30" height="6" fill="#78350F" />
          <rect x="33" y="58" width="6" height="8" fill="#F59E0B" rx="1" />
          {/* Measuring tape in hand */}
          <circle cx="12" cy="62" r="6" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
          <rect x="12" y="60" width="15" height="3" fill="#FBBF24" />
          {/* Feet */}
          <ellipse cx="28" cy="84" rx="5" ry="3" fill="#451A03" />
          <ellipse cx="46" cy="84" rx="5" ry="3" fill="#451A03" />
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

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'square-icon': return <SquareIcon size={size} />;
    case 'rectangle-icon': return <RectangleIcon size={size} />;
    case 'triangle-icon': return <TriangleIcon size={size} />;
    case 'ruler-icon': return <RulerIcon size={size} />;
    case 'brick-icon': return <BrickIcon size={size} />;
    case 'blueprint-icon': return <BlueprintIcon size={size} />;
    case 'measuring-tape': return <HardHatIcon size={size} />;
    default: return <SquareIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={85}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 120, height: 85 }}>
        {renderSortIcon(icon, 34)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-inner transition-all ${isHovering ? 'scale-105 opacity-95' : 'opacity-85'}`}
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}22` }}
    >
      <span className="text-xs font-black text-gray-800 text-center leading-tight">{label}</span>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface AreaPerimeterGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Component ───────────────────────────────────────────

export function AreaPerimeterGame({ width = 720, height = 560, onComplete }: AreaPerimeterGameProps) {
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
        newPos[item.id] = { x: 20 + idx * 135, y: height - 165 };
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
      const msg = "Great job! That is correct!";
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
      const compMsg = "Wonderful! You are a brilliant math builder!";
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
    currentChallenge.bins.forEach((bin, idx) => {
      const binWidth = 140;
      const binHeight = 90;
      const binX = 30 + idx * 165;
      const binY = 180;
      if (x >= binX && x <= binX + binWidth && y >= binY && y <= binY + binHeight) {
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

  const isSortComplete = currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]);

  return (
    <div className="relative overflow-hidden select-none font-sans rounded-2xl shadow-2xl border-4 border-amber-400 bg-amber-50" style={{ width, height }}>
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

      <ConstructionScene width={width} height={height} />
      <BuilderBala mood={mascotMood} speaking={speakingText} />

      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-amber-900/80 backdrop-blur-md flex items-center justify-between px-4 z-10 text-white border-b-2 border-amber-500">
        <div className="flex items-center gap-2">
          <HardHatIcon size={30} />
          <h1 className="text-sm font-black tracking-wide text-amber-200">AREA & PERIMETER BUILDER</h1>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-amber-300">Challenge {challengeIdx + 1} / {CHALLENGES.length}</span>
            <StarRow count={Math.min(5, Math.floor(score / 15))} total={5} />
          </div>
        )}
      </div>

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="absolute inset-x-0 top-12 bottom-0 flex flex-col items-center justify-center p-6 z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white border-4 border-white/60 flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-2">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-2">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-4 py-2 rounded-xl bg-black/30 text-white font-bold text-xs disabled:opacity-30 hover:bg-black/40"
              >
                Previous
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div key={idx} className={`h-2.5 rounded-full transition-all ${idx === slideIdx ? 'w-6 bg-white' : 'w-2.5 bg-white/40'}`} />
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
                className="px-5 py-2.5 rounded-xl bg-white text-gray-900 font-black text-xs shadow-lg hover:bg-amber-100"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Building! 🏗️" : "Next ➔"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="absolute inset-x-0 top-12 bottom-0 flex flex-col p-5 z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-amber-300 mb-4 max-w-xl">
            <h3 className="text-base font-black text-gray-800 leading-snug">{currentChallenge.question}</h3>
          </div>

          {currentChallenge.type === 'identify' && currentChallenge.options && (
            <div className="grid grid-cols-2 gap-3 max-w-xl mb-4">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-white hover:bg-amber-50 text-gray-800 border-amber-300";
                if (selectedOpt) {
                  if (isCorrect) btnStyle = "bg-green-500 text-white border-green-600";
                  else if (isSelected) btnStyle = "bg-red-500 text-white border-red-600";
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={e => handleAnswerClick(opt, e)}
                    className={`py-3 px-4 rounded-2xl font-black text-sm shadow-md border-3 transition-all ${btnStyle}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {currentChallenge.type === 'sort' && currentChallenge.bins && (
            <div className="relative h-48 w-full mb-16">
              {currentChallenge.bins.map((bin, idx) => (
                <SortBin
                  key={bin.id}
                  label={bin.label}
                  color={bin.color}
                  x={30 + idx * 165}
                  y={10}
                  width={150}
                  height={95}
                  isHovering={hoveredBin === bin.id}
                  onMouseEnter={() => setHoveredBin(bin.id)}
                  onMouseLeave={() => setHoveredBin(null)}
                />
              ))}
              {currentChallenge.sortItems?.map(item => (
                <SortCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  x={itemPositions[item.id]?.x || 40}
                  y={itemPositions[item.id]?.y || 120}
                  placed={placedItems[item.id]}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </div>
          )}

          {/* Bottom Control Bar */}
          <div className="mt-auto flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border-2 border-amber-300">
            <button
              onClick={handleShowHint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all"
            >
              💡 Need Hint?
            </button>

            {((selectedOpt && selectedOpt === currentChallenge.answer) || isSortComplete) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black text-xs shadow-lg transition-all"
              >
                Next Challenge ➔
              </motion.button>
            )}

            {isIncorrect && !selectedOpt && (
              <button
                onClick={() => {
                  setIsIncorrect(false);
                  setSpeakingText(currentChallenge.question);
                  speechManager.speak(currentChallenge.question);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md"
              >
                Try Again 🔄
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
