'use client';

/**
 * ShapesSymmetryGame — Learn geometry, tangrams, tessellation, circles, symmetry, area, perimeter, and views
 *
 * CISCE Nodes: c4_math_024 (Tangram shapes), c4_math_025 (Tessellation),
 *              c4_math_026 (Circle - centre, radius, diameter), c4_math_027 (Diameter/radius relationship),
 *              c4_math_028 (Reflection symmetry), c4_math_029 (Area and perimeter of simple shapes),
 *              c4_math_030 (Plan, elevation, side view)
 * Enrichment: c4_maths_enrichment_part24-30
 *
 * ELI5: "Geometry is everywhere! We build cats from tangram pieces, tile floors with tessellations,
 *   draw circles with radius and diameter, fold paper to find lines of symmetry, measure area and perimeter,
 *   and look at 3D objects from top, front, and side!"
 *
 * Misconceptions (from enrichment):
 *   1. "A tangram has six pieces — I forgot the parallelogram." → "A tangram always has 7 pieces: 5 triangles, 1 square, 1 parallelogram!"
 *   2. "Any shape can tessellate if you push them close together." → "Circles always leave gaps! Only shapes whose corner angles add to 360° tessellate!"
 *   3. "Radius and diameter are the same." → "Diameter is twice the radius (d = 2r)! Radius is half the diameter!"
 *   4. "A rectangle has 4 lines of symmetry." → "A rectangle has only 2 lines of symmetry (horizontal and vertical)! Diagonals do not match!"
 *   5. "Plan view means looking from the front." → "Plan view is looking from directly ABOVE! Elevation is looking from the front!"
 *
 * Story: "Help Artist Anjali sort shapes, build tangrams, measure circles, test symmetry, and draw views in her art and geometry studio!"
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
    title: "Tangram Magic! 🧩",
    text: "A tangram has 7 pieces: 5 triangles, 1 square, and 1 parallelogram! They fit together with no gaps to form shapes like cats, houses, and boats!",
    emoji: "🧩",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "A tangram has seven pieces: five triangles, one square, and one parallelogram! They fit together with no gaps!"
  },
  {
    title: "Tessellation Tiling! 🐝",
    text: "Tessellation is tiling a surface with no gaps and no overlaps! Squares, equilateral triangles, and hexagons tile perfectly because their corners add up to 360 degrees!",
    emoji: "🐝",
    bgColor: "from-gold-400 to-gold-500",
    spoken: "Tessellation is tiling a surface with no gaps and no overlaps! Squares and hexagons tile perfectly because their corners add up to 360 degrees!"
  },
  {
    title: "Circle Secrets! ⭕",
    text: "A circle has a centre in the middle! The radius is the distance from the centre to the edge. The diameter goes right through the centre, making it twice the radius (d = 2r)!",
    emoji: "⭕",
    bgColor: "from-purple-400 to-pink-500",
    spoken: "A circle has a centre in the middle! The radius goes to the edge, and the diameter goes right through, making it twice the radius!"
  },
  {
    title: "Reflection Symmetry! 🦋",
    text: "Reflection symmetry means one half is an exact mirror image of the other! The fold line is the line of symmetry. A square has 4 lines of symmetry, a rectangle has 2!",
    emoji: "🦋",
    bgColor: "from-green-400 to-teal-500",
    spoken: "Reflection symmetry means one half is an exact mirror image of the other! The fold line is the line of symmetry."
  },
  {
    title: "Area, Perimeter & Views! 📐",
    text: "Perimeter is the distance around the outside edge. Area is the space inside! And objects look different from the top (plan view), front (elevation), and side!",
    emoji: "📐",
    bgColor: "from-rose-400 to-pink-500",
    spoken: "Perimeter is the distance around the edge, and area is the space inside! Objects look different from the top, front, and side views!"
  },
];

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "How many flat pieces are in a complete TANGRAM puzzle?",
    answer: "7 pieces",
    options: ["5 pieces", "7 pieces", "10 pieces"],
    hint: "Count them: 5 triangles, 1 square, and 1 parallelogram!",
    misconception: "A tangram always has exactly 7 pieces (5 triangles, 1 square, 1 parallelogram)! Don't forget the parallelogram just because it is slanted!"
  },
  {
    type: 'sort',
    question: "Drag each tangram piece to its correct category!",
    answer: "sort",
    options: [],
    hint: "Look at the number of each piece in a standard tangram set!",
    misconception: "A tangram set has 2 large triangles, 1 medium triangle, 2 small triangles, 1 square, and 1 parallelogram. Check your counts!",
    sortItems: [
      { id: 'large-tri', label: 'Large Triangles (2)', icon: 'triangle-large', correctBin: 'triangle-bin' },
      { id: 'small-tri', label: 'Small Triangles (2)', icon: 'triangle-small', correctBin: 'triangle-bin' },
      { id: 'square-piece', label: 'Square (1)', icon: 'square-piece', correctBin: 'square-bin' },
      { id: 'parallelogram', label: 'Parallelogram (1)', icon: 'parallelogram', correctBin: 'para-bin' },
    ],
    bins: [
      { id: 'triangle-bin', label: 'Triangles 🔺', color: '#3B82F6' },
      { id: 'square-bin', label: 'Square ⏹️', color: '#10B981' },
      { id: 'para-bin', label: 'Parallelogram ▰', color: '#F59E0B' },
    ]
  },
  {
    type: 'identify',
    question: "What is the RADIUS of a circle?",
    answer: "Distance from centre to edge",
    options: ["Distance from centre to edge", "Distance right across through centre", "The curved outside boundary"],
    hint: "The radius starts at the centre and goes out to the rim!",
    misconception: "The radius is the line from the centre to any point on the circumference! The line all the way across through the centre is the diameter!"
  },
  {
    type: 'sort',
    question: "Drag each statement about circles to True or False!",
    answer: "sort",
    options: [],
    hint: "Remember: diameter = 2 x radius! All radii of the same circle are equal.",
    misconception: "Diameter is always twice the radius (d = 2r)! Radius is half the diameter (r = d/2). Circles are round and have no corners!",
    sortItems: [
      { id: 't1', label: 'Diameter = 2 × radius', icon: 'radius-icon', correctBin: 'true-bin' },
      { id: 't2', label: 'All radii are equal', icon: 'radius-icon', correctBin: 'true-bin' },
      { id: 'f1', label: 'Radius is longer than diameter', icon: 'diameter-icon', correctBin: 'false-bin' },
      { id: 'f2', label: 'Circle has 4 corners', icon: 'square-piece', correctBin: 'false-bin' },
    ],
    bins: [
      { id: 'true-bin', label: 'True ✅', color: '#22C55E' },
      { id: 'false-bin', label: 'False ❌', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "A butterfly has reflection symmetry. What does that mean?",
    answer: "One half is a mirror image of the other",
    options: ["One half is a mirror image of the other", "Both halves are completely different", "The butterfly has no pattern"],
    hint: "Think about folding the butterfly down the middle!",
    misconception: "Reflection symmetry means one half is an exact mirror image of the other when folded along the line of symmetry!"
  },
  {
    type: 'sort',
    question: "Drag each shape to how many lines of symmetry it has!",
    answer: "sort",
    options: [],
    hint: "Square = 4, Rectangle = 2 (no diagonals!), Equilateral triangle = 3, Circle = infinite!",
    misconception: "A rectangle has ONLY 2 lines of symmetry (horizontal and vertical) because diagonals do not match! A square has 4. A circle has infinite!",
    sortItems: [
      { id: 'sym-sq', label: 'Square (4 lines)', icon: 'square-piece', correctBin: 'bin-4' },
      { id: 'sym-rec', label: 'Rectangle (2 lines)', icon: 'parallelogram', correctBin: 'bin-2' },
      { id: 'sym-tri', label: 'Eq. Triangle (3 lines)', icon: 'triangle-large', correctBin: 'bin-3' },
      { id: 'sym-circ', label: 'Circle (Infinite)', icon: 'radius-icon', correctBin: 'bin-inf' },
    ],
    bins: [
      { id: 'bin-2', label: '2 Lines', color: '#3B82F6' },
      { id: 'bin-3', label: '3 Lines', color: '#8B5CF6' },
      { id: 'bin-4', label: '4 Lines', color: '#10B981' },
      { id: 'bin-inf', label: 'Infinite', color: '#EC4899' },
    ]
  },
  {
    type: 'sort',
    question: "Drag each measurement formula to Area or Perimeter!",
    answer: "sort",
    options: [],
    hint: "Perimeter is distance around the outside edge. Area is space inside!",
    misconception: "Perimeter adds all outside sides (e.g., 4 × side for square). Area measures the surface inside (e.g., side × side for square)!",
    sortItems: [
      { id: 'p-sq', label: 'Square Perimeter (4 × side)', icon: 'square-piece', correctBin: 'perim-bin' },
      { id: 'p-rec', label: 'Rectangle Perimeter (2×(L+B))', icon: 'parallelogram', correctBin: 'perim-bin' },
      { id: 'a-sq', label: 'Square Area (side × side)', icon: 'square-piece', correctBin: 'area-bin' },
      { id: 'a-rec', label: 'Rectangle Area (length × breadth)', icon: 'parallelogram', correctBin: 'area-bin' },
    ],
    bins: [
      { id: 'perim-bin', label: 'Perimeter (Distance Around)', color: '#F59E0B' },
      { id: 'area-bin', label: 'Area (Surface Inside)', color: '#6366F1' },
    ]
  },
  {
    type: 'sort',
    question: "Drag each view to its correct name (Plan, Elevation, Side View)!",
    answer: "sort",
    options: [],
    hint: "Plan = top view. Elevation = front view. Side = side view!",
    misconception: "Plan view is looking from directly ABOVE! Elevation is looking from the FRONT! Side view is looking from the SIDE!",
    sortItems: [
      { id: 'v-plan', label: 'Looking from above', icon: 'plan-icon', correctBin: 'plan-bin' },
      { id: 'v-elev', label: 'Looking from the front', icon: 'elev-icon', correctBin: 'elev-bin' },
      { id: 'v-side', label: 'Looking from the side', icon: 'side-icon', correctBin: 'side-bin' },
    ],
    bins: [
      { id: 'plan-bin', label: 'Plan (Top)', color: '#0EA5E9' },
      { id: 'elev-bin', label: 'Elevation (Front)', color: '#10B981' },
      { id: 'side-bin', label: 'Side View', color: '#F97316' },
    ]
  },
];

// ─── SVG Icon Components ─────────────────────────────────────

function TangramIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="5" width="50" height="50" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
      {/* Tangram diagonal split */}
      <polygon points="5,5 55,5 5,55" fill="#F59E0B" opacity="0.8" />
      <polygon points="55,5 55,55 5,55" fill="#3B82F6" opacity="0.8" />
      <line x1="5" y1="55" x2="55" y2="5" stroke="#92400E" strokeWidth="2" />
    </svg>
  );
}

function TriangleLargeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="8,52 52,52 30,10" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
    </svg>
  );
}

function TriangleSmallIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="15,45 45,45 30,15" fill="#60A5FA" stroke="#2563EB" strokeWidth="2" />
    </svg>
  );
}

function SquarePieceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" fill="#10B981" stroke="#047857" strokeWidth="2" rx="3" />
    </svg>
  );
}

function ParallelogramPieceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="18,15 52,15 42,45 8,45" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
    </svg>
  );
}

function RadiusIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
      <circle cx="30" cy="30" r="3" fill="#4F46E5" />
      <line x1="30" y1="30" x2="52" y2="30" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="3,3" />
      <text x="40" y="24" fontSize="10" fill="#DC2626" fontWeight="bold">r</text>
    </svg>
  );
}

function DiameterIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2" />
      <circle cx="30" cy="30" r="3" fill="#4F46E5" />
      <line x1="8" y1="30" x2="52" y2="30" stroke="#7C3AED" strokeWidth="2.5" />
      <text x="35" y="24" fontSize="10" fill="#7C3AED" fontWeight="bold">d</text>
    </svg>
  );
}

function PlanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="30" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" rx="2" />
      <rect x="15" y="20" width="30" height="8" fill="#BAE6FD" rx="1" />
      <text x="30" y="38" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">TOP VIEW</text>
    </svg>
  );
}

function ElevIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="20" width="36" height="28" fill="#10B981" stroke="#047857" strokeWidth="2" rx="2" />
      <circle cx="30" cy="34" r="5" fill="#A7F3D0" />
      <text x="30" y="15" fontSize="8" fill="#065F46" fontWeight="bold" textAnchor="middle">FRONT</text>
    </svg>
  );
}

function SideIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="15" width="24" height="33" fill="#F97316" stroke="#C2410C" strokeWidth="2" rx="2" />
      <line x1="30" y1="15" x2="30" y2="48" stroke="#FED7AA" strokeWidth="1.5" strokeDasharray="2,2" />
      <text x="30" y="10" fontSize="8" fill="#9A3412" fontWeight="bold" textAnchor="middle">SIDE</text>
    </svg>
  );
}

// ─── Studio Scene Background ─────────────────────────────────

function StudioScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall & floor gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)' }} />
      {/* Easel on wall */}
      <div className="absolute top-4 left-6 opacity-40">
        <svg width="80" height="90" viewBox="0 0 80 90">
          <line x1="40" y1="5" x2="10" y2="85" stroke="#92400E" strokeWidth="3" />
          <line x1="40" y1="5" x2="70" y2="85" stroke="#92400E" strokeWidth="3" />
          <line x1="40" y1="5" x2="40" y2="88" stroke="#92400E" strokeWidth="2" />
          <rect x="20" y="30" width="40" height="30" fill="#FEF08A" stroke="#B45309" strokeWidth="2" />
        </svg>
      </div>
      {/* Hanging butterfly art (symmetry) */}
      <div className="absolute top-6 right-24 opacity-50">
        <svg width="60" height="50" viewBox="0 0 60 50">
          <line x1="30" y1="5" x2="30" y2="45" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M30 20 Q10 5, 5 25 Q15 45, 30 35 Z" fill="#60A5FA" />
          <path d="M30 20 Q50 5, 55 25 Q45 45, 30 35 Z" fill="#60A5FA" />
          <ellipse cx="30" cy="25" rx="3" ry="12" fill="#1E3A8A" />
        </svg>
      </div>
    </div>
  );
}

// ─── Artist Anjali Mascot ─────────────────────────────────────

function ArtistAnjali({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <linearGradient id="anjali-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Beret hat */}
          <ellipse cx="37" cy="18" rx="20" ry="8" fill="#EF4444" />
          <path d="M37 10 Q45 8, 48 12" stroke="#B91C1C" strokeWidth="2" fill="none" />
          {/* Head */}
          <circle cx="37" cy="32" r="15" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="30" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="30" r="2.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M32 38 Q37 42 42 38" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Smock / Apron */}
          <path d="M22 48 L52 48 L56 75 L18 75 Z" fill="url(#anjali-body)" stroke="#92400E" strokeWidth="1.5" />
          {/* Palette in hand */}
          <ellipse cx="12" cy="55" rx="10" ry="7" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="9" cy="53" r="1.5" fill="#EF4444" />
          <circle cx="14" cy="52" r="1.5" fill="#3B82F6" />
          <circle cx="12" cy="57" r="1.5" fill="#10B981" />
          {/* Paintbrush in other hand */}
          <rect x="58" y="45" width="3" height="18" fill="#92400E" transform="rotate(20 58 45)" />
          <path d="M60 44 L64 42 L62 47 Z" fill="#3B82F6" />
          {/* Feet */}
          <ellipse cx="28" cy="82" rx="5" ry="3" fill="#78350F" />
          <ellipse cx="46" cy="82" rx="5" ry="3" fill="#78350F" />
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
    case 'triangle-large': return <TriangleLargeIcon size={size} />;
    case 'triangle-small': return <TriangleSmallIcon size={size} />;
    case 'square-piece': return <SquarePieceIcon size={size} />;
    case 'parallelogram': return <ParallelogramPieceIcon size={size} />;
    case 'radius-icon': return <RadiusIcon size={size} />;
    case 'diameter-icon': return <DiameterIcon size={size} />;
    case 'plan-icon': return <PlanIcon size={size} />;
    case 'elev-icon': return <ElevIcon size={size} />;
    case 'side-icon': return <SideIcon size={size} />;
    default: return <TangramIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 90 }}>
        {renderSortIcon(icon, 38)}
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-inner transition-all ${isHovering ? 'scale-105 opacity-90' : 'opacity-80'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <div className="w-8 h-2 rounded-full mb-1" style={{ backgroundColor: color }} />
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface ShapesSymmetryGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ShapesSymmetryGame({ width = 720, height = 560, onComplete }: ShapesSymmetryGameProps) {
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
      const startX = 30;
      const spacingX = 160;
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: startX + (idx % 4) * spacingX, y: height - 150 };
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
      const msg = "Brilliant! That is correct!";
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
      const compMsg = "Wonderful! You are a master of shapes and symmetry!";
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
    const binWidth = 140;
    const binHeight = 90;
    const binY = 180;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * (binWidth + 20)) / 2;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
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
        const msg = "Fantastic sorting! All shapes placed correctly!";
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
      className="relative select-none overflow-hidden rounded-2xl shadow-2xl font-sans bg-amber-50"
      style={{ width, height }}
    >
      <StudioScene width={width} height={height} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/85 backdrop-blur-md border-b border-amber-200 flex items-center justify-between px-4 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md">
            <TangramIcon size={24} />
          </div>
          <div>
            <h1 className="text-sm font-black text-gray-800 leading-tight">Shapes & Symmetry</h1>
            <p className="text-[10px] text-gray-500 font-semibold">ICSE Class 4 Geometry</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <span className="text-xs font-bold text-amber-800">Score: {score}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gold-100 px-3 py-1 rounded-full border border-gold-300">
              <span className="text-xs font-bold text-gold-800">Challenge {challengeIdx + 1} / {CHALLENGES.length}</span>
            </div>
            <StarRow count={Math.min(5, Math.floor(score / 20))} total={5} />
          </div>
        )}
      </div>

      <ArtistAnjali mood={mascotMood} speaking={speakingText} />

      {/* ─── Teaching Screen ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 flex flex-col items-center justify-center p-6 z-10">
          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            className={`w-full max-w-xl rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} p-8 text-white shadow-2xl border-4 border-white/40 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4 bg-white/20 p-4 rounded-2xl shadow-inner">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow mb-6 max-w-md">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            {/* Slide dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>

            <div className="flex gap-4">
              {slideIdx > 0 && (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIdx(prev => prev - 1);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-2.5 rounded-xl border border-white/40 shadow transition-all"
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
                    audioManager.play('celebration');
                  }
                }}
                className="bg-white text-orange-600 hover:bg-amber-50 font-black px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all text-lg"
              >
                {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next ➔' : 'Start Playing! 🚀'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── Play Screen ──────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 flex flex-col items-center justify-between p-6 z-10">
          {/* Question Box */}
          <motion.div
            key={challengeIdx}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-amber-200 text-center mt-2"
          >
            <h2 className="text-lg font-black text-gray-800">{currentChallenge.question}</h2>
          </motion.div>

          {/* Challenge Content: Multiple Choice or Sort */}
          {currentChallenge.type === 'identify' ? (
            <div className="flex flex-col gap-3 w-full max-w-md my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-white hover:bg-amber-50 text-gray-800 border-amber-200";
                if (selectedOpt) {
                  if (isCorrect) btnStyle = "bg-green-500 text-white border-green-600 scale-105";
                  else if (isSelected) btnStyle = "bg-red-500 text-white border-red-600 shake";
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={selectedOpt === currentChallenge.answer}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base shadow-md border-2 transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-black">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          ) : (
            <div className="relative w-full max-w-2xl h-[300px] my-auto">
              {/* Bins */}
              {currentChallenge.bins && currentChallenge.bins.map((bin, idx) => {
                const totalBins = currentChallenge.bins!.length;
                const binWidth = 140;
                const startX = (width - 48 - totalBins * (binWidth + 20)) / 2;
                const bx = startX + idx * (binWidth + 20);
                const isHover = hoveredBin === bin.id;
                return (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={bx}
                    y={20}
                    width={binWidth}
                    height={90}
                    isHovering={isHover} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                  />
                );
              })}

              {/* Sort Cards */}
              {currentChallenge.sortItems && currentChallenge.sortItems.map((item) => {
                const pos = itemPositions[item.id] || { x: 50, y: 200 };
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

          {/* Bottom Action Bar */}
          <div className="w-full max-w-2xl flex justify-between items-center pb-2">
            <button
              onClick={handleShowHint}
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-4 py-2 rounded-xl shadow border border-amber-300 text-sm flex items-center gap-1.5 transition-all"
            >
              💡 Need a Hint?
            </button>

            {((selectedOpt && selectedOpt === currentChallenge.answer) ||
              (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="bg-green-500 hover:bg-green-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl transform hover:scale-105 transition-all text-lg flex items-center gap-2"
              >
                Continue ➔
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
