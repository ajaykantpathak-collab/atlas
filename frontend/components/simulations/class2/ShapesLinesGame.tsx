'use client';

/**
 * ShapesLinesGame — Learn 2D shapes, attributes (sides/corners), straight lines,
 * orientations (horizontal, vertical, slanting), and curved lines through paper folding,
 * tracing, and sorting!
 *
 * CISCE Nodes: c2_math_015 (2D shapes through paper folding), c2_math_016 (Attributes - sides & corners),
 *              c2_math_017 (Straight lines), c2_math_018 (Horizontal, vertical, slanting lines),
 *              c2_math_019 (Curved lines)
 * Enrichment: c2_maths_enrichment_part15-19
 *
 * ELI5: "Shapes are flat drawings on paper! A triangle has 3 straight sides and 3 corners.
 *   A square has 4 equal sides and 4 corners. A rectangle has 4 sides too, but 2 are long
 *   and 2 are short. A circle and an oval have 0 sides and 0 corners because their edges
 *   curve round and round! Straight lines never bend, and they can go flat (horizontal),
 *   tall (vertical), or leaning (slanting). Curved lines bend smoothly!"
 *
 * Misconceptions (from enrichment):
 *   1. "A circle has 1 side because it has an edge." -> A side in geometry must be a
 *      STRAIGHT line! A circle's edge is curved, so it has 0 sides and 0 corners.
 *   2. "A square and a rectangle are the same." -> Both have 4 sides and 4 corners,
 *      but a square has 4 EQUAL sides, while a rectangle has opposite sides equal (2 long, 2 short).
 *   3. "All straight lines are horizontal." -> Straight lines can be horizontal (flat),
 *      vertical (up-down), or slanting (diagonal)!
 *   4. "A curved line is just a bent straight line." -> A curved line bends throughout
 *      and is a completely different kind of line from a straight line.
 *
 * Mascot: Artist Anaya — a friendly paper craft artist with a colorful apron, scissors,
 *   paper shapes, and a pencil behind her ear. Custom SVG!
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';

import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'Meet Shapes & Paper Folding! 📐',
    text: 'We can create 2D shapes by folding and cutting paper! When we fold a square paper diagonally from corner to corner and cut it, we get two triangles. Folding paper creates a sharp crease which is a straight line!',
    emoji: '📄',
    bgColor: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Sides and Corners! 🔺⏹️',
    text: 'A side is a straight line on the edge of a shape. A corner is where two sides meet! A triangle has 3 sides and 3 corners. A square has 4 equal sides and 4 corners. A rectangle has 4 sides (2 long, 2 short) and 4 corners!',
    emoji: '⭐',
    bgColor: 'from-gold-400 to-gold-500',
  },
  {
    title: 'Circles and Ovals! ⭕🥚',
    text: 'A circle is round with a smooth curved edge — it has 0 sides and 0 corners! An oval is like a stretched circle, also with 0 sides and 0 corners!',
    emoji: '🔵',
    bgColor: 'from-pink-400 to-rose-500',
  },
  {
    title: 'Straight Lines & Orientations! 📏',
    text: 'A straight line never bends! It can be horizontal (flat, left to right like a table edge), vertical (standing tall, up and down like a door edge), or slanting (diagonal like a slide railing)!',
    emoji: '📏',
    bgColor: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Curved Lines! 🌈',
    text: 'A curved line bends smoothly as you trace it — like a rainbow, a river, or the rim of a round cup. Straight lines do not bend; curved lines bend!',
    emoji: '🌈',
    bgColor: 'from-purple-400 to-gold-500',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface Bin {
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
  bins?: Bin[];
}

// ─── Challenges (8 progressive: identify sides/corners/lines → sort attributes) ──

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'How many straight sides does a TRIANGLE have?',
    answer: '3',
    options: ['3', '4', '0'],
    hint: 'Count the straight edges of a pizza slice or triangle shape: 1, 2, 3!',
    misconception: 'A triangle has exactly 3 straight sides and 3 corners! 4 sides belong to squares and rectangles.',
  },
  {
    type: 'identify',
    question: 'How many corners does a SQUARE have?',
    answer: '4',
    options: ['3', '4', '0'],
    hint: 'Feel the pointy corners of a square handkerchief: 1, 2, 3, 4!',
    misconception: 'A square has 4 corners and 4 EQUAL sides! All four sides are the exact same length.',
  },
  {
    type: 'identify',
    question: 'Which shape has 0 sides and 0 corners?',
    answer: 'Circle',
    options: ['Triangle', 'Square', 'Circle'],
    hint: 'Think of a coin or a bangle. Does it have straight sides or sharp corners?',
    misconception: 'A circle has 0 sides and 0 corners because its boundary is a smooth curve, not straight lines!',
  },
  {
    type: 'sort',
    question: 'Drag each shape to its correct number of sides!',
    answer: 'sort',
    options: [],
    hint: 'Count the straight edges: Triangle=3, Square=4, Rectangle=4, Circle=0!',
    misconception: 'Count carefully! Triangles have 3 sides, squares and rectangles have 4 sides, and circles have 0 sides!',
    sortItems: [
      { id: 'tri', label: 'Triangle (3 sides)', icon: 'triangle', correctBin: 'three' },
      { id: 'sq', label: 'Square (4 sides)', icon: 'square', correctBin: 'four' },
      { id: 'rect', label: 'Rectangle (4 sides)', icon: 'rectangle', correctBin: 'four' },
      { id: 'circ', label: 'Circle (0 sides)', icon: 'circle', correctBin: 'zero' },
    ],
    bins: [
      { id: 'three', label: '3 Sides 🔺', color: '#3B82F6' },
      { id: 'four', label: '4 Sides ⏹️', color: '#10B981' },
      { id: 'zero', label: '0 Sides ⭕', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which line goes flat from left to right like a table top?',
    answer: 'Horizontal line',
    options: ['Horizontal line', 'Vertical line', 'Curved line'],
    hint: 'Think of the horizon where the sky meets the sea — it lies flat!',
    misconception: 'A horizontal line lies flat from left to right! Vertical stands up-and-down, and curved bends.',
  },
  {
    type: 'identify',
    question: 'Which line stands tall from up to down like a flagpole?',
    answer: 'Vertical line',
    options: ['Horizontal line', 'Vertical line', 'Slanting line'],
    hint: 'Think of a tall tree trunk or a door edge standing straight up!',
    misconception: 'A vertical line stands upright from up to down! Horizontal is flat, and slanting is diagonal.',
  },
  {
    type: 'sort',
    question: 'Drag each line or object to its correct orientation/type!',
    answer: 'sort',
    options: [],
    hint: 'Table edge = horizontal, Door edge = vertical, Ladder = slanting, Rainbow = curved!',
    misconception: 'Check the direction: Flat = horizontal, Up-down = vertical, Diagonal = slanting, Bending = curved!',
    sortItems: [
      { id: 'horiz', label: 'Table Top Edge', icon: 'horizontal', correctBin: 'h' },
      { id: 'vert', label: 'Door Side', icon: 'vertical', correctBin: 'v' },
      { id: 'slant', label: 'Slide Railing', icon: 'slanting', correctBin: 's' },
      { id: 'curve', label: 'Rainbow Arc', icon: 'curved', correctBin: 'c' },
    ],
    bins: [
      { id: 'h', label: 'Horizontal ➖', color: '#3B82F6' },
      { id: 'v', label: 'Vertical ⬇️', color: '#8B5CF6' },
      { id: 's', label: 'Slanting ↗️', color: '#F59E0B' },
      { id: 'c', label: 'Curved 🌙', color: '#EC4899' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each shape or line to match its special property!',
    answer: 'sort',
    options: [],
    hint: 'Square=4 equal sides, Rectangle=2 long 2 short, Circle=curved boundary, Straight line=no bend!',
    misconception: 'Remember: Squares have all 4 sides equal, rectangles have opposite sides equal, circles have curved boundaries!',
    sortItems: [
      { id: 'p1', label: 'Square (4 equal sides)', icon: 'square', correctBin: 'bin-sq' },
      { id: 'p2', label: 'Rectangle (2 long, 2 short)', icon: 'rectangle', correctBin: 'bin-rect' },
      { id: 'p3', label: 'Circle (0 sides)', icon: 'circle', correctBin: 'bin-circ' },
      { id: 'p4', label: 'Straight line (no bend)', icon: 'horizontal', correctBin: 'bin-line' },
    ],
    bins: [
      { id: 'bin-sq', label: '4 Equal Sides', color: '#10B981' },
      { id: 'bin-rect', label: 'Opposite Sides Equal', color: '#3B82F6' },
      { id: 'bin-circ', label: 'Curved Boundary', color: '#EF4444' },
      { id: 'bin-line', label: 'Never Bends', color: '#8B5CF6' },
    ],
  },
];

// ─── Artist Anaya Mascot Component ────────────────────────────

function ArtistAnaya({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[240px] border-2 border-pink-300"
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
              ? { y: [0, -5, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Beret / Artist Hat */}
          <ellipse cx="37" cy="18" rx="22" ry="8" fill="#EC4899" />
          <path d="M37 10 C45 10, 52 14, 55 18 C52 14, 45 8, 37 8 Z" fill="#BE185D" />
          {/* Hair & Face */}
          <circle cx="37" cy="34" r="16" fill="#FDE68A" />
          {/* Pencil behind ear */}
          <rect x="50" y="24" width="4" height="16" fill="#F59E0B" transform="rotate(25 50 24)" />
          <polygon points="53,39 55,42 57,39" fill="#1F2937" transform="rotate(25 50 24)" />
          {/* Eyes */}
          <circle cx="31" cy="32" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="32" r="2.5" fill="#1F2937" />
          <circle cx="32" cy="31" r="1" fill="white" />
          <circle cx="44" cy="31" r="1" fill="white" />
          {/* Smile */}
          <path d="M33 39 Q37 43 41 39" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Rosy Cheeks */}
          <circle cx="27" cy="36" r="3" fill="#FDA4AF" opacity="0.7" />
          <circle cx="47" cy="36" r="3" fill="#FDA4AF" opacity="0.7" />
          {/* Apron */}
          <path d="M22 50 L52 50 L55 82 L19 82 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* Craft pocket with scissors */}
          <rect x="30" y="58" width="14" height="16" fill="#93C5FD" rx="2" />
          <circle cx="37" cy="62" r="3" fill="none" stroke="#1F2937" strokeWidth="1.5" />
          <line x1="37" y1="65" x2="37" y2="72" stroke="#1F2937" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Scene Background (Art Class Studio) ───────────

function ArtSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="art-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="40%" stopColor="#FDE68A" />
            <stop offset="40%" stopColor="#F3F4F6" />
            <stop offset="100%" stopColor="#E5E7EB" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#art-sky)" />
      </svg>
      {/* Window showing blue sky */}
      <div className="absolute top-6 left-8 w-28 h-36 bg-gold-200 border-4 border-amber-800 rounded-t-xl flex flex-col items-center justify-center opacity-60">
        <div className="w-full h-full border-b-4 border-r-4 border-amber-800 grid grid-cols-2 grid-rows-2">
          <div className="border-r border-b border-amber-800/40" />
          <div className="border-b border-amber-800/40" />
          <div className="border-r border-amber-800/40" />
          <div />
        </div>
      </div>
      {/* Wooden floor / Craft table surface */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-amber-100 border-t-4 border-amber-300" />
      {/* Art banner on wall */}
      <motion.div className="absolute top-4 left-1/3" animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="180" height="40" viewBox="0 0 180 40">
          <path d="M10 5 Q90 0, 170 5 L175 35 Q90 40, 5 35 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
          <text x="90" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">SHAPES & LINES</text>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Shape & Line Components ───────────────────────

function TriangleIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 52,50 8,50" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" strokeLinejoin="round" />
      {/* Corner dots */}
      <circle cx="30" cy="8" r="3" fill="#F59E0B" />
      <circle cx="52" cy="50" r="3" fill="#F59E0B" />
      <circle cx="8" cy="50" r="3" fill="#F59E0B" />
    </svg>
  );
}

function SquareIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#10B981" stroke="#047857" strokeWidth="3" rx="2" />
      {/* Corner dots */}
      <circle cx="10" cy="10" r="3" fill="#F59E0B" />
      <circle cx="50" cy="10" r="3" fill="#F59E0B" />
      <circle cx="50" cy="50" r="3" fill="#F59E0B" />
      <circle cx="10" cy="50" r="3" fill="#F59E0B" />
    </svg>
  );
}

function RectangleIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="15" width="48" height="30" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="3" rx="2" />
      {/* Corner dots */}
      <circle cx="6" cy="15" r="3" fill="#F59E0B" />
      <circle cx="54" cy="15" r="3" fill="#F59E0B" />
      <circle cx="54" cy="45" r="3" fill="#F59E0B" />
      <circle cx="6" cy="45" r="3" fill="#F59E0B" />
    </svg>
  );
}

function CircleIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
      {/* Smooth curved border indicator */}
      <path d="M15 30 Q30 45, 45 30" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function OvalIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="25" ry="16" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
    </svg>
  );
}

function HorizontalLineIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="8" y1="30" x2="52" y2="30" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" />
      <circle cx="8" cy="30" r="4" fill="#1E40AF" />
      <circle cx="52" cy="30" r="4" fill="#1E40AF" />
    </svg>
  );
}

function VerticalLineIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="30" y1="8" x2="30" y2="52" stroke="#7C3AED" strokeWidth="5" strokeLinecap="round" />
      <circle cx="30" cy="8" r="4" fill="#5B21B6" />
      <circle cx="30" cy="52" r="4" fill="#5B21B6" />
    </svg>
  );
}

function SlantingLineIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="10" y1="50" x2="50" y2="10" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
      <circle cx="10" cy="50" r="4" fill="#B45309" />
      <circle cx="50" cy="10" r="4" fill="#B45309" />
    </svg>
  );
}

function CurvedLineIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 45 Q30 10, 50 45" stroke="#DB2777" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="10" cy="45" r="4" fill="#9D174D" />
      <circle cx="50" cy="45" r="4" fill="#9D174D" />
    </svg>
  );
}

function PaperFoldIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="10,10 50,10 50,50 10,50" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <line x1="10" y1="10" x2="50" y2="50" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="4 4" />
      <polygon points="35,30 45,35 40,45" fill="#3B82F6" />
    </svg>
  );
}

// ─── Helper to render icon by string name ────────────────────

function renderTopicIcon(iconName: string, size: number = 52) {
  switch (iconName) {
    case 'triangle': return <TriangleIcon size={size} />;
    case 'square': return <SquareIcon size={size} />;
    case 'rectangle': return <RectangleIcon size={size} />;
    case 'circle': return <CircleIcon size={size} />;
    case 'oval': return <OvalIcon size={size} />;
    case 'horizontal': return <HorizontalLineIcon size={size} />;
    case 'vertical': return <VerticalLineIcon size={size} />;
    case 'slanting': return <SlantingLineIcon size={size} />;
    case 'curved': return <CurvedLineIcon size={size} />;
    case 'fold': return <PaperFoldIcon size={size} />;
    default: return <SquareIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

function SortCard({
  id,
  label,
  icon,
  x,
  y,
  placed,
  onDragStart,
  onDragEnd,
}: {
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
    <Draggable
      id={id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={120}
      height={100}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-amber-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white hover:bg-amber-50'
        } p-2 cursor-grab active:cursor-grabbing transition-colors`}
        style={{ width: 120, height: 100 }}
      >
        {renderTopicIcon(icon, 46)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">
          {label}
        </span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({
  label,
  color,
  x,
  y,
  width,
  height,
  isHovering,
}: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 shadow-lg transition-transform ${
        isHovering ? 'scale-105 shadow-2xl' : ''
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div
        className="w-8 h-2 rounded-full mb-1 opacity-60"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm font-extrabold text-gray-800 text-center">
        {label}
      </span>
    </div>
  );
}

// ─── Teaching Screen Component ─────────────────────────���──────

function TeachingScreen({
  onStartPlay,
  width,
  height,
}: {
  onStartPlay: () => void;
  width: number;
  height: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = TEACHING_SLIDES[currentSlide];

  return (
    <div
      className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden"
      style={{ width, height }}
    >
      <ArtSceneBackground width={width} height={height} />
      <ArtistAnaya mood="happy" speaking={null} />

      {/* Header */}
      <div className="z-10 text-center mt-2">
        <h1 className="text-3xl font-black text-amber-900 tracking-wide drop-shadow-sm">
          🎨 Shapes & Lines Art Studio 📐
        </h1>
        <p className="text-sm font-bold text-amber-800 mt-1">
          ICSE Class 1-2 Math Adventure
        </p>
      </div>

      {/* Main Slide Card */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`z-10 w-full max-w-xl bg-gradient-to-br ${slide.bgColor} rounded-3xl p-6 shadow-2xl border-4 border-white text-white flex flex-col items-center text-center`}
      >
        <span className="text-5xl mb-3">{slide.emoji}</span>
        <h2 className="text-2xl font-black mb-3 drop-shadow">{slide.title}</h2>
        <p className="text-base font-medium leading-relaxed drop-shadow-sm max-w-md">
          {slide.text}
        </p>
      </motion.div>

      {/* Slide Navigation & Dots */}
      <div className="z-10 flex flex-col items-center gap-4 w-full max-w-xl">
        <div className="flex gap-2">
          {TEACHING_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                audioManager.play('tap');
                setCurrentSlide(i);
              }}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-amber-600' : 'w-3 bg-amber-300'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-between w-full px-4">
          <button
            onClick={() => {
              audioManager.play('tap');
              if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
            }}
            disabled={currentSlide === 0}
            className={`px-5 py-2.5 rounded-xl font-bold shadow-md transition-all ${
              currentSlide === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-white text-amber-900 hover:bg-amber-100'
            }`}
          >
            ◀ Back
          </button>

          {currentSlide < TEACHING_SLIDES.length - 1 ? (
            <button
              onClick={() => {
                audioManager.play('tap');
                setCurrentSlide(currentSlide + 1);
              }}
              className="px-6 py-2.5 rounded-xl font-black bg-amber-600 text-white shadow-lg hover:bg-amber-700 transition-all"
            >
              Next ▶
            </button>
          ) : (
            <button
              onClick={() => {
                audioManager.play('celebration');
                onStartPlay();
              }}
              className="px-8 py-3 rounded-2xl font-black bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-all text-lg animate-bounce"
            >
              🚀 Start Game!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface ShapesLinesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ShapesLinesGame({
  width = 720,
  height = 560,
  onComplete,
}: ShapesLinesGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speech, setSpeech] = useState<string | null>("Let's learn shapes and lines!");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showHintBubble, setShowHintBubble] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state
  const [sortPositions, setSortPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const challenge = CHALLENGES[currentChallengeIndex];

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setHintMessage(challenge.hint);
        setShowHintBubble(true);
        setMascotMood('thinking');
        setSpeech('Need a little help? Read the hint!');
        speechManager.speak('Need a little help? Read the hint!');
      }
    }, 10000);
  }, [challenge.hint, screen]);

  // Initialize sort positions when entering a sort challenge
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems.forEach((item, index) => {
        initialPos[item.id] = { x: 50 + index * 140, y: 350 };
        initialPlaced[item.id] = false;
      });
      setSortPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, challenge, resetInactivityTimer]);

  // Handle multiple-choice answer selection
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    if (option === challenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars((prev) => prev + 1);

      setSuccessMessage('Wonderful job! ⭐');
      setShowSuccessBanner(true);
    } else {
      audioManager.play('error');
      setErrors((prev) => prev + 1);
      setMascotMood('thinking');
      setSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
      setShowHintBubble(true);
    }
  };

  // Handle Drag Start
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    setActiveDragId(id);
    audioManager.play('pickup');
  };

  // Handle Drag End (drop check)
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    setActiveDragId(null);

    const item = challenge.sortItems?.find((i) => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bins based on coordinate bounding boxes
    // Bins are positioned horizontally in the upper area: y from 80 to 220
    const binWidth = 130;
    const binHeight = 110;
    const totalBins = challenge.bins.length;
    const startX = (width - totalBins * 140) / 2 + 20;

    let matchedBinId: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * 140;
      const by = 90;
      if (x + 60 >= bx && x + 60 <= bx + binWidth && y + 50 >= by && y + 50 <= by + binHeight) {
        matchedBinId = bin.id;
      }
    });

    if (matchedBinId && matchedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setPlacedItems((prev) => ({ ...prev, [id]: true }));
      setSparklePos({ x, y });

      // Check if all items in sort challenge are placed
      const newPlaced = { ...placedItems, [id]: true };
      const allDone = challenge.sortItems?.every((i) => newPlaced[i.id]);

      if (allDone) {
        audioManager.play('celebration');
        setMascotMood('celebrate');
        setSpeech('All sorted correctly! You are a Shape Star! ⭐');
        speechManager.speak('All sorted correctly! You are a Shape Star! ⭐');
        setStars((prev) => prev + 1);
        setSuccessMessage('Amazing sorting! 🎉');
        setShowSuccessBanner(true);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors((prev) => prev + 1);
      setMascotMood('thinking');
      setSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
      setShowHintBubble(true);
      return false;
    }
  };

  // Advance to next challenge
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setMascotMood('happy');
      setSpeech("Let's tackle the next challenge!");
      speechManager.speak("Let's tackle the next challenge!");
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setSpeech('You completed all challenges! You are a Master Geometrician! 🏆');
      speechManager.speak('You completed all challenges! You are a Master Geometrician! 🏆');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-between select-none overflow-hidden bg-amber-50"
      style={{ width, height }}
    >
      {screen === 'teaching' ? (
        <TeachingScreen
          onStartPlay={() => {
            setScreen('play');
            setSpeech('Challenge 1: Let\'s test your shape knowledge!');
            speechManager.speak('Challenge 1: Let\'s test your shape knowledge!');
          }}
          width={width}
          height={height}
        />
      ) : (
        <>
          <ArtSceneBackground width={width} height={height} />
          <ArtistAnaya mood={mascotMood} speaking={speech} />

          {/* Top Status Bar */}
          <div className="z-10 w-full flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md shadow-md border-b-2 border-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full shadow-inner">
                Level {currentChallengeIndex + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <h1 className="text-lg font-black text-amber-900 tracking-wide drop-shadow-sm">
              🎨 Shapes & Lines Adventure 📐
            </h1>
          </div>

          {/* Challenge Card */}
          <div className="z-10 flex flex-col items-center w-full max-w-2xl px-4 my-auto">
            <motion.div
              key={currentChallengeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center"
            >
              <h2 className="text-xl font-black text-gray-800 mb-6 leading-snug">
                {challenge.question}
              </h2>

              {/* Challenge Type: Identify (Multiple Choice) */}
              {challenge.type === 'identify' && (
                <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                  {challenge.options.map((opt) => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswerSelect(opt)}
                      className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border-3 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all font-bold text-amber-900 text-sm h-28"
                    >
                      <div className="mb-2">
                        {opt.includes('Triangle') && <TriangleIcon size={40} />}
                        {opt.includes('Square') && <SquareIcon size={40} />}
                        {opt.includes('Rectangle') && <RectangleIcon size={40} />}
                        {opt.includes('Circle') && <CircleIcon size={40} />}
                        {opt.includes('Horizontal') && <HorizontalLineIcon size={40} />}
                        {opt.includes('Vertical') && <VerticalLineIcon size={40} />}
                        {opt.includes('Slanting') && <SlantingLineIcon size={40} />}
                        {opt.includes('Curved') && <CurvedLineIcon size={40} />}
                        {opt === '3' && <span className="text-3xl font-black text-gold-600">3</span>}
                        {opt === '4' && <span className="text-3xl font-black text-emerald-600">4</span>}
                        {opt === '0' && <span className="text-3xl font-black text-rose-600">0</span>}
                      </div>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Challenge Type: Sort (Drag and Drop) */}
              {challenge.type === 'sort' && challenge.bins && challenge.sortItems && (
                <div className="relative w-full h-80">
                  {/* Bins */}
                  {challenge.bins.map((bin, idx) => {
                    const totalBins = challenge.bins!.length;
                    const binWidth = 130;
                    const startX = (width - 60 - totalBins * 140) / 2 + 10;
                    const bx = startX + idx * 140;
                    const by = 10;
                    const isHovering =
                      activeDragId !== null &&
                      sortPositions[activeDragId]?.x + 60 >= bx &&
                      sortPositions[activeDragId]?.x + 60 <= bx + binWidth &&
                      sortPositions[activeDragId]?.y + 50 >= by &&
                      sortPositions[activeDragId]?.y + 50 <= by + 110;

                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={bx}
                        y={by}
                        width={binWidth}
                        height={110}
                        isHovering={isHovering}
                      />
                    );
                  })}

                  {/* Draggable Items */}
                  {challenge.sortItems.map((item) => {
                    const pos = sortPositions[item.id] || { x: 50, y: 350 };
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
            </motion.div>
          </div>

          {/* Bottom Bar / Hint trigger */}
          <div className="z-10 w-full flex justify-between items-center px-6 py-3 bg-white/80 backdrop-blur-md border-t-2 border-amber-200">
            <button
              onClick={() => {
                audioManager.play('hint');
                setHintMessage(challenge.hint);
                setShowHintBubble(true);
                setMascotMood('thinking');
                setSpeech('Here is a helpful tip!');
                speechManager.speak('Here is a helpful tip!');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold shadow-md transition-all text-sm"
            >
              💡 Need Hint?
            </button>
            <span className="text-xs font-bold text-gray-500">
              Errors: {errors}
            </span>
          </div>
        </>
      )}

      {/* Feedback Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {showSuccessBanner && (
        <SuccessBanner
          message={successMessage}
          onComplete={handleNextChallenge}
        />
      )}

      {showHintBubble && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setShowHintBubble(false)}
        />
      )}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
    </div>
  );
}
