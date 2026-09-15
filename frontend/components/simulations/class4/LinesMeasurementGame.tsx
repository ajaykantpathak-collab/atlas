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

// ─── SVG Geometric & Measurement Icon Components ─────────────────

function PointIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="6" fill="#1E3A8A" />
      <text x="38" y="28" fontSize="12" fontWeight="bold" fill="#1E3A8A">A</text>
    </svg>
  );
}

function LineSegmentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="10" y1="30" x2="50" y2="30" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
      <circle cx="10" cy="30" r="4" fill="#DC2626" />
      <circle cx="50" cy="30" r="4" fill="#DC2626" />
      <text x="8" y="46" fontSize="10" fontWeight="bold" fill="#1E3A8A">A</text>
      <text x="48" y="46" fontSize="10" fontWeight="bold" fill="#1E3A8A">B</text>
    </svg>
  );
}

function LineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="6" y1="30" x2="54" y2="30" stroke="#059669" strokeWidth="3" />
      <polygon points="6,30 14,26 14,34" fill="#059669" />
      <polygon points="54,30 46,26 46,34" fill="#059669" />
    </svg>
  );
}

function RayIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="12" y1="30" x2="52" y2="30" stroke="#D97706" strokeWidth="3" />
      <circle cx="12" cy="30" r="4" fill="#DC2626" />
      <polygon points="52,30 44,26 44,34" fill="#D97706" />
      <text x="10" y="46" fontSize="10" fontWeight="bold" fill="#1E3A8A">A</text>
    </svg>
  );
}

function ParallelLinesIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="10" y1="20" x2="50" y2="20" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="40" x2="50" y2="40" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PerpendicularIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="10" y1="40" x2="50" y2="40" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="10" x2="30" y2="50" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
      <rect x="30" y="34" width="6" height="6" fill="none" stroke="#EA580C" strokeWidth="1.5" />
    </svg>
  );
}

function RulerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="20" width="50" height="20" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" rx="2" />
      <line x1="10" y1="20" x2="10" y2="28" stroke="#CA8A04" strokeWidth="1.5" />
      <line x1="20" y1="20" x2="20" y2="26" stroke="#CA8A04" strokeWidth="1" />
      <line x1="30" y1="20" x2="30" y2="28" stroke="#CA8A04" strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="26" stroke="#CA8A04" strokeWidth="1" />
      <line x1="50" y1="20" x2="50" y2="28" stroke="#CA8A04" strokeWidth="1.5" />
      <text x="26" y="35" fontSize="8" fontWeight="bold" fill="#854D0E">cm</text>
    </svg>
  );
}

function WeighingScaleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="48" rx="16" ry="6" fill="#94A3B8" />
      <rect x="26" y="26" width="8" height="22" fill="#64748B" />
      <circle cx="30" cy="24" r="14" fill="#F8FAFC" stroke="#0F172A" strokeWidth="1.5" />
      <circle cx="30" cy="24" r="11" fill="#E2E8F0" />
      <line x1="30" y1="24" x2="35" y2="18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="24" r="2" fill="#0F172A" />
    </svg>
  );
}

function MeasuringCylinderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="15" width="20" height="36" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" rx="2" />
      <rect x="22" y="25" width="16" height="24" fill="#38BDF8" opacity="0.6" />
      <line x1="20" y1="20" x2="25" y2="20" stroke="#0284C7" strokeWidth="1" />
      <line x1="20" y1="30" x2="25" y2="30" stroke="#0284C7" strokeWidth="1" />
      <line x1="20" y1="40" x2="25" y2="40" stroke="#0284C7" strokeWidth="1" />
      <ellipse cx="30" cy="51" rx="10" ry="3" fill="#0284C7" />
    </svg>
  );
}

function MetreIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="25" width="44" height="10" fill="#FDE047" stroke="#EAB308" rx="2" />
      <text x="18" y="33" fontSize="8" fontWeight="bold" fill="#713F12">1 m = 100 cm</text>
    </svg>
  );
}

function KilogramIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 22 L40 22 L44 45 L16 45 Z" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
      <path d="M24 22 C24 14, 36 14, 36 22" fill="none" stroke="#334155" strokeWidth="2" />
      <text x="21" y="37" fontSize="11" fontWeight="bold" fill="white">1 kg</text>
    </svg>
  );
}

function LitreIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 18 L38 18 L36 48 L24 48 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" rx="2" />
      <path d="M38 24 L44 26 L44 38 L38 40" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
      <text x="25" y="36" fontSize="10" fontWeight="bold" fill="white">1 L</text>
    </svg>
  );
}

// ─── Builder Bharat Mascot (Friendly Builder with Hard Hat) ──

function BuilderBharat({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
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
            : mood === 'thinking'
              ? { rotate: [0, 5, -5, 0] }
              : { y: [0, -4, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="hat-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="shirt-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          {/* Hard Hat */}
          <ellipse cx="37" cy="22" rx="24" ry="7" fill="url(#hat-grad)" stroke="#B45309" strokeWidth="1" />
          <path d="M19 22 C19 8, 55 8, 55 22 Z" fill="url(#hat-grad)" stroke="#B45309" strokeWidth="1" />
          {/* Face */}
          <circle cx="37" cy="38" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="35" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="35" r="2.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M32 44 Q37 49 42 44" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Body / Shirt */}
          <path d="M21 54 L53 54 L58 82 L16 82 Z" fill="url(#shirt-grad)" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Ruler badge on chest */}
          <rect x="31" y="60" width="12" height="6" fill="#FEF08A" stroke="#CA8A04" rx="1" />
          {/* Pencil in hand */}
          <line x1="56" y1="65" x2="66" y2="55" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <polygon points="66,55 69,53 67,57" fill="#1F2937" />
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

// ─── Construction Site Scene Background ────────────────────────

function ConstructionSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#skyGrad)" />
        {/* Ground */}
        <rect x="0" y={height - 80} width={width} height="80" fill="url(#groundGrad)" />
        {/* Building silhouette in background */}
        <rect x={width - 160} y={height - 240} width="110" height="160" fill="#94A3B8" opacity="0.4" />
        <rect x={width - 140} y={height - 220} width="25" height="30" fill="#E2E8F0" opacity="0.5" />
        <rect x={width - 95} y={height - 220} width="25" height="30" fill="#E2E8F0" opacity="0.5" />
        <rect x={width - 140} y={height - 160} width="25" height="30" fill="#E2E8F0" opacity="0.5" />
        <rect x={width - 95} y={height - 160} width="25" height="30" fill="#E2E8F0" opacity="0.5" />
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
    title: "Points, Lines, & Rays! 📐",
    text: "A point shows position with no size. A line segment has two endpoints and measurable length. A line goes on forever both ways. A ray starts at one point and goes forever in one direction!",
    emoji: "📏",
    bgColor: "from-blue-400 to-indigo-500",
    spoken: "A point shows position with no size. A line segment has two endpoints and measurable length. A line goes on forever both ways. A ray starts at one point and goes forever in one direction!"
  },
  {
    title: "Parallel & Perpendicular Lines! 🛤️",
    text: "Parallel lines never meet and stay the same distance apart, like railway tracks! Perpendicular lines cross each other at a right angle, forming a perfect square corner like the letter T!",
    emoji: "⚔️",
    bgColor: "from-cyan-400 to-blue-600",
    spoken: "Parallel lines never meet and stay the same distance apart, like railway tracks! Perpendicular lines cross each other at a right angle, forming a perfect square corner like the letter T!"
  },
  {
    title: "Measuring Length: m & cm! 📏",
    text: "1 metre is equal to 100 centimetres! To convert metres to centimetres, multiply by 100. To convert centimetres to metres, divide by 100. Just like rupees and paise!",
    emoji: "🪙",
    bgColor: "from-emerald-400 to-teal-600",
    spoken: "1 metre is equal to 100 centimetres! To convert metres to centimetres, multiply by 100. To convert centimetres to metres, divide by 100!"
  },
  {
    title: "Weight & Capacity: g, kg, mL, L! ⚖️",
    text: "1 kilogram equals 1000 grams. 1 litre equals 1000 millilitres. When going from bigger units to smaller units, we multiply by 1000!",
    emoji: "⚖️",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "1 kilogram equals 1000 grams. 1 litre equals 1000 millilitres. When going from bigger units to smaller units, we multiply by 1000!"
  },
  {
    title: "Estimation & Verification! 🔍",
    text: "Estimation is making a smart, reasonable guess before measuring. Verification is checking your guess with an actual instrument like a ruler, scale, or measuring tape!",
    emoji: "🔍",
    bgColor: "from-purple-400 to-indigo-600",
    spoken: "Estimation is making a smart, reasonable guess before measuring. Verification is checking your guess with an actual instrument!"
  },
];

// ─── Sort Item & Bin Interfaces ───────────────────────────────

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

// ─── Challenges ��──────────────────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is a LINE SEGMENT?',
    answer: 'A straight path between two fixed endpoints with a definite length',
    options: [
      'A straight path between two fixed endpoints with a definite length',
      'A straight path that extends forever in both directions',
      'A flat surface that extends endlessly'
    ],
    hint: 'Think about what a ruler edge looks like — it has two exact ends and can be measured!',
    misconception: 'A line segment has TWO endpoints and a definite, measurable length! A line has NO endpoints and extends forever in both directions. Always count endpoints: 2 = segment, 0 = line.'
  },
  {
    type: 'sort',
    question: 'Drag each geometric term to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Point has no size; Line segment has 2 endpoints; Line goes forever both ways; Ray has 1 endpoint!',
    misconception: 'Review the definitions carefully! Point = 0 endpoints (position only). Line segment = 2 endpoints. Line = 0 endpoints, endless both ways. Ray = 1 endpoint, endless one way.',
    sortItems: [
      { id: 'point', label: 'Point', icon: 'point', correctBin: 'desc-point' },
      { id: 'segment', label: 'Line Segment', icon: 'segment', correctBin: 'desc-segment' },
      { id: 'line', label: 'Line', icon: 'line', correctBin: 'desc-line' },
      { id: 'ray', label: 'Ray', icon: 'ray', correctBin: 'desc-ray' },
    ],
    bins: [
      { id: 'desc-point', label: 'Tiny dot, position only', color: '#3B82F6' },
      { id: 'desc-segment', label: 'Two endpoints, fixed length', color: '#10B981' },
      { id: 'desc-line', label: 'Extends infinitely both ways', color: '#8B5CF6' },
      { id: 'desc-ray', label: 'Starts at one point, goes one way', color: '#F59E0B' },
    ]
  },
  {
    type: 'identify',
    question: 'What are PARALLEL lines?',
    answer: 'Two straight lines that never meet, always the same distance apart',
    options: [
      'Two straight lines that never meet, always the same distance apart',
      'Two lines that cross at one point',
      'Two lines that form a right angle'
    ],
    hint: 'Think of railway tracks — do they ever cross or meet no matter how far they go?',
    misconception: 'Parallel lines must lie in the same plane and NEVER meet, keeping the exact same distance apart! Two lines that cross each other are intersecting, not parallel.'
  },
  {
    type: 'sort',
    question: 'Drag each pair of lines to Parallel, Intersecting, or Perpendicular!',
    answer: 'sort',
    options: [],
    hint: 'Railway tracks = parallel; Letter X crossing = intersecting; Letter T corner = perpendicular!',
    misconception: 'Remember conditions: Parallel lines never meet. Intersecting lines cross at one point. Perpendicular lines cross at a right angle (90 degrees). Check your angles and meeting points!',
    sortItems: [
      { id: 'rail', label: 'Railway tracks', icon: 'parallel', correctBin: 'parallel' },
      { id: 'cross', label: 'Two roads crossing (X)', icon: 'intersecting', correctBin: 'intersecting' },
      { id: 'corner', label: 'Wall meeting floor (T)', icon: 'perpendicular', correctBin: 'perpendicular' },
    ],
    bins: [
      { id: 'parallel', label: 'Parallel Lines', color: '#7C3AED' },
      { id: 'intersecting', label: 'Intersecting Lines', color: '#2563EB' },
      { id: 'perpendicular', label: 'Perpendicular Lines', color: '#EA580C' },
    ]
  },
  {
    type: 'identify',
    question: 'How many centimetres are in 3 metres?',
    answer: '300 cm',
    options: ['300 cm', '30 cm', '3 cm'],
    hint: 'Remember the rule: 1 metre = 100 centimetres. So multiply 3 by 100!',
    misconception: '1 metre = 100 cm, so 3 metres = 3 x 100 = 300 cm! Do not confuse unit factors; length uses 100, just like 3 rupees = 300 paise.'
  },
  {
    type: 'sort',
    question: 'Drag each measurement conversion to its correct answer!',
    answer: 'sort',
    options: [],
    hint: '3 m = 300 cm; 250 cm = 2 m 50 cm; 2 kg = 2000 g; 3 L = 3000 mL!',
    misconception: 'Check your conversion factors! Length uses 100 (1 m = 100 cm). Mass and capacity use 1000 (1 kg = 1000 g, 1 L = 1000 mL). Multiply to go bigger-to-smaller, divide to go smaller-to-bigger.',
    sortItems: [
      { id: 'c1', label: '3 m = ?', icon: 'metre', correctBin: 'b-300cm' },
      { id: 'c2', label: '250 cm = ?', icon: 'ruler', correctBin: 'b-2m50cm' },
      { id: 'c3', label: '2 kg = ?', icon: 'kilogram', correctBin: 'b-2000g' },
      { id: 'c4', label: '3 L = ?', icon: 'litre', correctBin: 'b-3000ml' },
    ],
    bins: [
      { id: 'b-300cm', label: '300 cm', color: '#2563EB' },
      { id: 'b-2m50cm', label: '2 m 50 cm', color: '#10B981' },
      { id: 'b-2000g', label: '2000 g', color: '#D97706' },
      { id: 'b-3000ml', label: '3000 mL', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: 'A shopkeeper weighs 2 kg of rice. How many grams is that?',
    answer: '2000 g',
    options: ['2000 g', '200 g', '20 g'],
    hint: 'Remember: 1 kilogram = 1000 grams. Multiply 2 by 1000!',
    misconception: '1 kg = 1000 g, so 2 kg = 2 x 1000 = 2000 g! Do not use 100 for mass — mass and capacity always use 1000.'
  },
  {
    type: 'sort',
    question: 'Drag each everyday object to its most reasonable estimation!',
    answer: 'sort',
    options: [],
    hint: 'Pencil = 15 cm; Door = 2 m; Apple = 150 g; Water bottle = 1 L; Brick = 2 kg; Classroom = 8 m!',
    misconception: 'Choose sensible standard units! Small items use cm or g, large items or rooms use m or kg. Estimation is a reasonable guess checked by verification.',
    sortItems: [
      { id: 'e1', label: 'Length of a pencil', icon: 'ruler', correctBin: 'b-15cm' },
      { id: 'e2', label: 'Height of a door', icon: 'metre', correctBin: 'b-2m' },
      { id: 'e3', label: 'Weight of an apple', icon: 'scale', correctBin: 'b-150g' },
      { id: 'e4', label: 'Capacity of water bottle', icon: 'cylinder', correctBin: 'b-1l' },
    ],
    bins: [
      { id: 'b-15cm', label: 'About 15 cm', color: '#3B82F6' },
      { id: 'b-2m', label: 'About 2 m', color: '#10B981' },
      { id: 'b-150g', label: 'About 150 g', color: '#F59E0B' },
      { id: 'b-1l', label: 'About 1 L', color: '#8B5CF6' },
    ]
  },
];

// ─── Helper for rendering Sort Icons ──────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'point': return <PointIcon size={size} />;
    case 'segment': return <LineSegmentIcon size={size} />;
    case 'line': return <LineIcon size={size} />;
    case 'ray': return <RayIcon size={size} />;
    case 'parallel': return <ParallelLinesIcon size={size} />;
    case 'intersecting': return <PerpendicularIcon size={size} />;
    case 'perpendicular': return <PerpendicularIcon size={size} />;
    case 'ruler': return <RulerIcon size={size} />;
    case 'metre': return <MetreIcon size={size} />;
    case 'kilogram': return <KilogramIcon size={size} />;
    case 'litre': return <LitreIcon size={size} />;
    case 'scale': return <WeighingScaleIcon size={size} />;
    case 'cylinder': return <MeasuringCylinderIcon size={size} />;
    default: return <RulerIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : 'shadow'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-1 shadow" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-bold text-gray-800 text-center leading-tight">{label}</span>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface LinesMeasurementGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Game Export ─────────────────────────────────────────

export function LinesMeasurementGame({ width = 720, height = 560, onComplete }: LinesMeasurementGameProps) {
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
      const count = currentChallenge.sortItems.length;
      const spacing = Math.floor((width - 80) / count);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 40 + idx * spacing, y: height - 120 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, width]);

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
      const msg = "Great job! You know your lines and measurement!";
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
      const compMsg = "Wonderful! You are a brilliant geometry star!";
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
    const binCount = currentChallenge.bins.length;
    const binWidth = Math.floor((width - 60) / binCount);
    const binHeight = 110;
    const binTop = 130;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = 30 + idx * binWidth;
      const by = binTop;
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
        const msg = "Fantastic! You sorted the lines and angles perfectly!";
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
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-sky-100" style={{ width, height }}>
      <ConstructionSceneBackground width={width} height={height} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}

      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10 bg-gradient-to-b from-sky-500/90 to-blue-700/90 text-white">
          <div className="w-full flex justify-between items-center mt-2">
            <span className="text-sm font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
              Builder Bharat's Academy • Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
            </span>
            <button
              onClick={() => {
                audioManager.play('tap');
                setScreen('play');
              }}
              className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold px-5 py-2 rounded-full shadow-lg text-sm transition-transform active:scale-95"
            >
              Skip to Game 🚀
            </button>
          </div>

          <div className="flex flex-col items-center max-w-lg text-center my-auto">
            <motion.div
              key={slideIdx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-6xl mb-4 bg-white/20 p-6 rounded-3xl shadow-inner"
            >
              {TEACHING_SLIDES[slideIdx].emoji}
            </motion.div>
            <motion.h2
              key={`title-${slideIdx}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-black mb-3 drop-shadow"
            >
              {TEACHING_SLIDES[slideIdx].title}
            </motion.h2>
            <motion.p
              key={`text-${slideIdx}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-base font-medium leading-relaxed bg-black/20 p-4 rounded-2xl shadow"
            >
              {TEACHING_SLIDES[slideIdx].text}
            </motion.p>
          </div>

          <div className="w-full flex justify-between items-center mb-2">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2 rounded-full font-bold text-sm ${slideIdx === 0 ? 'opacity-40 bg-white/10' : 'bg-white/30 hover:bg-white/40'}`}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-amber-400 w-6' : 'bg-white/40'}`} />
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
              className="px-6 py-2 rounded-full font-bold text-sm bg-amber-400 hover:bg-amber-300 text-gray-900 shadow-lg"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🎮' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                Challenge {challengeIdx + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 15)} total={6} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700">Score: {score}</span>
              <button
                onClick={handleShowHint}
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-3 py-1 rounded-full text-xs shadow transition-transform active:scale-95"
              >
                💡 Hint
              </button>
            </div>
          </div>

          <BuilderBharat mood={mascotMood} speaking={speakingText} />

          {/* Challenge Box */}
          <div className="my-auto mx-auto max-w-xl w-full bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-xl border-2 border-white flex flex-col items-center">
            <h3 className="text-lg font-black text-gray-800 text-center mb-4">
              {currentChallenge.question}
            </h3>

            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnColor = 'bg-blue-50 hover:bg-blue-100 text-blue-900 border-blue-200';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnColor = 'bg-emerald-500 text-white border-emerald-600';
                    else if (isSelected) btnColor = 'bg-rose-500 text-white border-rose-600';
                    else btnColor = 'opacity-50 bg-gray-100 text-gray-400 border-gray-200';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                      onClick={(e) => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                      className={`p-3 rounded-2xl font-bold text-sm border-2 shadow transition-all text-left flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAnswer && <span>✅</span>}
                      {selectedOpt && isSelected && !isCorrectAnswer && <span>❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && (
              <div className="relative w-full h-[240px]">
                {currentChallenge.bins.map((bin, idx) => {
                  const binCount = currentChallenge.bins?.length || 1;
                  const binWidth = Math.floor((width - 70) / binCount);
                  const bx = 10 + idx * binWidth;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={10}
                      width={binWidth - 10}
                      height={110}
                      isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {currentChallenge.sortItems?.map(item => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemPositions[item.id]?.x || 20}
                    y={itemPositions[item.id]?.y || 140}
                    placed={placedItems[item.id]}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            )}

            {/* Next Button when answered correctly */}
            {(selectedOpt === currentChallenge.answer || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4">
                <button
                  onClick={advanceChallenge}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold px-8 py-3 rounded-2xl shadow-lg text-base transition-transform active:scale-95"
                >
                  {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Complete Game! 🎉'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom Nav */}
          <div className="flex justify-between items-center px-2">
            <span className="text-xs font-bold text-gray-600 bg-white/60 px-3 py-1 rounded-full shadow-sm">
              Errors: {errors}
            </span>
            <button
              onClick={() => setScreen('teaching')}
              className="bg-white/80 hover:bg-white text-gray-700 font-bold px-4 py-1.5 rounded-full text-xs shadow transition"
            >
              📖 Review Lessons
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
