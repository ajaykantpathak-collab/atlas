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
    title: "Angles & Their Measures 📐",
    text: "An angle is formed when two rays meet at a common vertex! We measure angles in degrees using a protractor. A right angle is exactly 90 degrees, an acute angle is less than 90 degrees, and an obtuse angle is greater than 90 but less than 180 degrees!",
    emoji: "📐",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "An angle is formed when two rays meet at a common vertex! Right angles are 90 degrees, acute angles are smaller, and obtuse angles are wider!"
  },
  {
    title: "Classifying Angles 🔍",
    text: "Look at the opening between the arms! A square corner is a right angle (90 deg). Sharper openings like 45 degrees are acute. Wider openings like 120 degrees are obtuse. Straight lines form straight angles (180 deg)!",
    emoji: "🔍",
    bgColor: "from-blue-400 to-indigo-500",
    spoken: "Look at the opening! Square corners are right angles, sharper are acute, wider are obtuse, and flat lines are straight angles!"
  },
  {
    title: "Symmetry in 3D Shapes 🏛️",
    text: "3D shapes have planes of symmetry that slice them into two identical mirror halves. A cube has several symmetry planes through opposite faces and edges. Famous buildings like the Taj Mahal and the human body show bilateral reflection symmetry!",
    emoji: "🏛️",
    bgColor: "from-purple-400 to-pink-500",
    spoken: "Three dimensional shapes have planes of symmetry that slice them into mirror halves! The human body and buildings like the Taj Mahal show reflection symmetry!"
  },
  {
    title: "Reflection & Rotational 2D Symmetry 🦋",
    text: "Reflection symmetry is when one half mirrors the other across a line. A square has 4 lines of symmetry, a rectangle has 2. Rotational symmetry is when a shape looks identical after being turned around its centre!",
    emoji: "🦋",
    bgColor: "from-green-400 to-teal-500",
    spoken: "Reflection symmetry means one half mirrors the other across a line. Rotational symmetry means the shape looks identical after being turned!"
  },
  {
    title: "Nets of 3D Shapes 📦",
    text: "A net is a flat 2D pattern that folds up into a 3D solid! A cube's net is 6 squares in a cross. A cylinder's net is a rectangle plus 2 circles. A cone's net is a sector plus a circle!",
    emoji: "📦",
    bgColor: "from-rose-400 to-pink-500",
    spoken: "A net is a flat pattern that folds into a 3D solid! A cube uses 6 squares, a cylinder uses a rectangle and two circles!"
  },
];

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What type of angle measures exactly 90 degrees with a square corner?",
    answer: "Right angle",
    options: ["Acute angle", "Right angle", "Obtuse angle", "Straight angle"],
    hint: "Think of the corner of a square book or a postcard!",
    misconception: "A right angle always measures exactly 90 degrees, marked with a small square at the vertex. Don't confuse it with acute or obtuse angles!"
  },
  {
    type: 'sort',
    question: "Drag each angle measure to its correct classification!",
    answer: "sort",
    options: [],
    hint: "Acute < 90°, Right = 90°, Obtuse between 90° and 180°, Straight = 180°.",
    misconception: "An angle of 45° is acute (less than 90°). An angle of 120° is obtuse (greater than 90° but less than 180°). Check your degree ranges!",
    sortItems: [
      { id: 'a1', label: '45 degrees', icon: 'acute-icon', correctBin: 'acute-bin' },
      { id: 'a2', label: '90 degrees', icon: 'right-icon', correctBin: 'right-bin' },
      { id: 'a3', label: '120 degrees', icon: 'obtuse-icon', correctBin: 'obtuse-bin' },
      { id: 'a4', label: '180 degrees', icon: 'straight-icon', correctBin: 'straight-bin' },
    ],
    bins: [
      { id: 'acute-bin', label: 'Acute (<90°)', color: '#3B82F6' },
      { id: 'right-bin', label: 'Right (90°)', color: '#10B981' },
      { id: 'obtuse-bin', label: 'Obtuse (>90°)', color: '#F59E0B' },
      { id: 'straight-bin', label: 'Straight (180°)', color: '#EC4899' },
    ]
  },
  {
    type: 'identify',
    question: "How many lines of reflection symmetry does a SQUARE have?",
    answer: "4 lines",
    options: ["2 lines", "3 lines", "4 lines", "Infinite lines"],
    hint: "Count them: vertical, horizontal, and 2 diagonals!",
    misconception: "A square has 4 lines of symmetry: 2 through the midpoints of opposite sides and 2 along the diagonal corners. Don't forget the diagonals!"
  },
  {
    type: 'sort',
    question: "Drag each 2D shape to its correct number of lines of symmetry!",
    answer: "sort",
    options: [],
    hint: "Square = 4, Rectangle = 2, Equilateral Triangle = 3, Circle = Infinite.",
    misconception: "A rectangle has ONLY 2 lines of symmetry (horizontal and vertical) because its diagonals do not match when folded! A circle has infinite.",
    sortItems: [
      { id: 's-sq', label: 'Square', icon: 'cube-icon', correctBin: 'bin-4' },
      { id: 's-rec', label: 'Rectangle', icon: 'cuboid-icon', correctBin: 'bin-2' },
      { id: 's-tri', label: 'Eq. Triangle', icon: 'cone-icon', correctBin: 'bin-3' },
      { id: 's-circ', label: 'Circle', icon: 'cylinder-icon', correctBin: 'bin-inf' },
    ],
    bins: [
      { id: 'bin-2', label: '2 Lines', color: '#3B82F6' },
      { id: 'bin-3', label: '3 Lines', color: '#8B5CF6' },
      { id: 'bin-4', label: '4 Lines', color: '#10B981' },
      { id: 'bin-inf', label: 'Infinite', color: '#EC4899' },
    ]
  },
  {
    type: 'identify',
    question: "Which 3D shape has circular top and bottom faces and a curved surface?",
    answer: "Cylinder",
    options: ["Cube", "Cylinder", "Cone", "Cuboid"],
    hint: "Think of a cold drink tin can or a water pipe!",
    misconception: "A cylinder has two circular parallel flat faces and one curved surface. A cone has only one circular base and tapers to a point!"
  },
  {
    type: 'sort',
    question: "Drag each 3D shape to its correct net (flat pattern)!",
    answer: "sort",
    options: [],
    hint: "Cube = 6 squares. Cylinder = rectangle + 2 circles. Cone = sector + 1 circle.",
    misconception: "The net of a cylinder consists of a rectangle (whose length equals the circle's circumference) plus two equal circles. Don't confuse it with a cone net!",
    sortItems: [
      { id: 'n-cube', label: 'Cube Net', icon: 'cube-icon', correctBin: 'cube-bin' },
      { id: 'n-cyl', label: 'Cylinder Net', icon: 'cylinder-icon', correctBin: 'cylinder-bin' },
      { id: 'n-cone', label: 'Cone Net', icon: 'cone-icon', correctBin: 'cone-bin' },
      { id: 'n-cub', label: 'Cuboid Net', icon: 'cuboid-icon', correctBin: 'cuboid-bin' },
    ],
    bins: [
      { id: 'cube-bin', label: '6 Squares', color: '#3B82F6' },
      { id: 'cylinder-bin', label: 'Rect + 2 Circles', color: '#10B981' },
      { id: 'cone-bin', label: 'Sector + Circle', color: '#F59E0B' },
      { id: 'cuboid-bin', label: '6 Rectangles', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "How many faces, edges, and vertices does a CUBE have?",
    answer: "6 faces, 12 edges, 8 vertices",
    options: [
      "6 faces, 8 edges, 12 vertices",
      "6 faces, 12 edges, 8 vertices",
      "8 faces, 12 edges, 6 vertices",
      "12 faces, 6 edges, 8 vertices"
    ],
    hint: "Count the square faces (6), the straight lines where they meet (12), and the corner points (8)!",
    misconception: "A cube has 6 square faces, 12 straight edges, and 8 corner vertices. Make sure you count edges and vertices correctly!"
  },
  {
    type: 'sort',
    question: "Drag each object or shape to its symmetry type!",
    answer: "sort",
    options: [],
    hint: "Human body = bilateral reflection symmetry. Wheel = rotational symmetry.",
    misconception: "A ceiling fan or wheel has rotational symmetry because it looks identical after turning. A human body has bilateral reflection symmetry along the centre!",
    sortItems: [
      { id: 'sym-body', label: 'Human Body', icon: 'right-icon', correctBin: 'reflect-bin' },
      { id: 'sym-wheel', label: 'Bicycle Wheel', icon: 'cylinder-icon', correctBin: 'rotate-bin' },
      { id: 'sym-cube', label: 'Cube Solid', icon: 'cube-icon', correctBin: 'both-bin' },
      { id: 'sym-rock', label: 'Irregular Rock', icon: 'acute-icon', correctBin: 'none-bin' },
    ],
    bins: [
      { id: 'reflect-bin', label: 'Reflection Only', color: '#3B82F6' },
      { id: 'rotate-bin', label: 'Rotational Only', color: '#10B981' },
      { id: 'both-bin', label: 'Both Symmetries', color: '#8B5CF6' },
      { id: 'none-bin', label: 'No Symmetry', color: '#EF4444' },
    ]
  },
];

// ─── Custom SVG Icon Components ───────────────────────────���─────────

function RightAngleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 50 L50 50 L50 10" fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="40" y="40" width="10" height="10" fill="none" stroke="#DC2626" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="#1E40AF" />
    </svg>
  );
}

function AcuteAngleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 50 L50 50 L35 15" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 30 40 A 15 15 0 0 0 35 30" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4" fill="#1E40AF" />
    </svg>
  );
}

function ObtuseAngleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 50 L55 50 L20 20" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 35 50 A 20 20 0 0 0 28 35" fill="none" stroke="#EC4899" strokeWidth="2.5" />
      <circle cx="55" cy="50" r="4" fill="#6D28D9" />
    </svg>
  );
}

function StraightAngleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="5" y1="30" x2="55" y2="30" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
      <circle cx="30" cy="30" r="5" fill="#991B1B" />
      <path d="M 20 30 A 10 10 0 0 1 40 30" fill="none" stroke="#F59E0B" strokeWidth="2" />
    </svg>
  );
}

function CubeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 22 L35 12 L55 22 L55 45 L35 55 L15 45 Z" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M35 12 L35 55" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M15 22 L35 32 L55 22" stroke="#1D4ED8" strokeWidth="2" />
    </svg>
  );
}

function CylinderIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="15" rx="20" ry="8" fill="#A7F3D0" stroke="#047857" strokeWidth="2" />
      <path d="M10 15 L10 45 A 20 8 0 0 0 50 45 L50 15" fill="#34D399" stroke="#047857" strokeWidth="2" />
      <ellipse cx="30" cy="45" rx="20" ry="8" fill="#059669" stroke="#047857" strokeWidth="2" />
    </svg>
  );
}

function ConeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 L10 45 A 20 8 0 0 0 50 45 Z" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="30" cy="45" rx="20" ry="8" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
    </svg>
  );
}

function CuboidIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 25 L38 15 L52 25 L52 45 L24 55 L10 45 Z" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2" />
      <path d="M38 15 L38 55" stroke="#BE185D" strokeWidth="2" />
      <path d="M10 25 L24 35 L52 25" stroke="#BE185D" strokeWidth="2" />
    </svg>
  );
}

// ─── Studio Scene Background ─────────────────────────────────

function StudioScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="art-floor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#studio-sky)" />
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#art-floor)" />
        {/* Easel silhouette */}
        <line x1={width * 0.85} y1={20} x2={width * 0.75} y2={height * 0.75} stroke="#92400E" strokeWidth="4" />
        <line x1={width * 0.85} y1={20} x2={width * 0.95} y2={height * 0.75} stroke="#92400E" strokeWidth="4" />
        <line x1={width * 0.85} y1={20} x2={width * 0.85} y2={height * 0.78} stroke="#92400E" strokeWidth="3" />
        <rect x={width * 0.72} y={height * 0.3} width="80" height="60" fill="#FEF08A" stroke="#92400E" strokeWidth="2" rx="4" />
      </svg>
    </div>
  );
}

// ─── Artist Arjun Mascot ─────────────��───────────────────────

function ArtistArjun({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-12 right-4 z-20 flex flex-col items-center">
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
            <linearGradient id="arjun-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          {/* Beret hat */}
          <ellipse cx="37" cy="18" rx="20" ry="8" fill="#10B981" />
          <path d="M37 10 Q45 8, 48 12" stroke="#047857" strokeWidth="2" fill="none" />
          {/* Head */}
          <circle cx="37" cy="32" r="15" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="30" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="30" r="2.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M32 38 Q37 42 42 38" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Smock / Apron */}
          <path d="M22 48 L52 48 L56 75 L18 75 Z" fill="url(#arjun-body)" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Palette in hand */}
          <ellipse cx="12" cy="55" rx="10" ry="7" fill="#FEF3C7" stroke="#92400E" strokeWidth="1.5" />
          <circle cx="9" cy="53" r="1.5" fill="#EF4444" />
          <circle cx="14" cy="52" r="1.5" fill="#3B82F6" />
          <circle cx="12" cy="57" r="1.5" fill="#F59E0B" />
          {/* Paintbrush in other hand */}
          <rect x="58" y="45" width="3" height="18" fill="#92400E" transform="rotate(20 58 45)" />
          <path d="M60 44 L64 42 L62 47 Z" fill="#EF4444" />
          {/* Feet */}
          <ellipse cx="28" cy="82" rx="5" ry="3" fill="#78350F" />
          <ellipse cx="46" cy="82" rx="5" ry="3" fill="#78350F" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───��───────────────────────────────────

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
    case 'acute-icon': return <AcuteAngleIcon size={size} />;
    case 'right-icon': return <RightAngleIcon size={size} />;
    case 'obtuse-icon': return <ObtuseAngleIcon size={size} />;
    case 'straight-icon': return <StraightAngleIcon size={size} />;
    case 'cube-icon': return <CubeIcon size={size} />;
    case 'cylinder-icon': return <CylinderIcon size={size} />;
    case 'cone-icon': return <ConeIcon size={size} />;
    case 'cuboid-icon': return <CuboidIcon size={size} />;
    default: return <RightAngleIcon size={size} />;
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
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}15` }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-1 shadow" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-bold text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface AnglesSymmetryGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AnglesSymmetryGame({ width = 720, height = 560, onComplete }: AnglesSymmetryGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 140, y: height - 150 };
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
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 160;
      const binY = 180;
      if (x >= binX && x <= binX + 140 && y >= binY && y <= binY + 110) {
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

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-amber-50 select-none flex flex-col justify-between" style={{ width, height }}>
      <StudioScene width={width} height={height} />
      <ArtistArjun mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur border-b border-amber-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📐</span>
          <div>
            <h1 className="text-base font-extrabold text-gray-800">Angles & Symmetry Studio</h1>
            <p className="text-xs text-gray-600">Class 5 Geometry (CISCE)</p>
          </div>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <StarRow count={Math.min(challengeIdx, CHALLENGES.length)} total={CHALLENGES.length} />
            </div>
            <button
              onClick={handleShowHint}
              className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow transition flex items-center gap-1"
            >
              💡 Hint
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        {screen === 'teaching' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center max-w-lg bg-white/95 rounded-3xl p-6 shadow-2xl border-4 border-amber-300 text-center"
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-2">
              <button
                disabled={slideIdx === 0}
                onClick={() => { audioManager.play('tap'); setSlideIdx(prev => prev - 1); }}
                className={`px-4 py-2 rounded-xl font-bold text-xs shadow ${slideIdx === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
              >
                ◀ Previous
              </button>
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === slideIdx ? 'bg-amber-500' : 'bg-gray-300'}`} />
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
                className="px-5 py-2 rounded-xl font-bold text-xs shadow bg-amber-500 hover:bg-amber-600 text-white"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Play! 🚀" : "Next ▶"}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-xl">
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white/95 rounded-3xl p-6 shadow-xl border-2 border-amber-300 flex flex-col items-center"
            >
              <h3 className="text-base font-bold text-gray-800 text-center mb-6">{currentChallenge.question}</h3>

              {currentChallenge.type === 'identify' && currentChallenge.options && (
                <div className="grid grid-cols-2 gap-3 w-full">
                  {currentChallenge.options.map((opt, i) => {
                    const isSelected = selectedOpt === opt;
                    const isCorrectOpt = opt === currentChallenge.answer;
                    let btnStyle = "bg-amber-50 hover:bg-amber-100 text-gray-800 border-amber-200";
                    if (selectedOpt) {
                      if (isCorrectOpt) btnStyle = "bg-green-500 text-white border-green-600";
                      else if (isSelected) btnStyle = "bg-red-500 text-white border-red-600";
                    }
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={selectedOpt !== null}
                        onClick={(e) => handleAnswerClick(opt, e)}
                        className={`p-3 rounded-2xl font-bold text-sm border-2 shadow transition ${btnStyle}`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
                <div className="w-full relative h-[280px]">
                  {/* Bins */}
                  <div className="flex justify-around mb-2">
                    {currentChallenge.bins.map((bin, idx) => (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={20 + idx * 165}
                        y={10}
                        width={150}
                        height={110}
                        isHovering={hoveredBin === bin.id}
                        onMouseEnter={() => setHoveredBin(bin.id)}
                        onMouseLeave={() => setHoveredBin(null)}
                      />
                    ))}
                  </div>

                  {/* Draggable items */}
                  {currentChallenge.sortItems.map((item) => {
                    const pos = itemPositions[item.id] || { x: 50, y: 190 };
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

              {/* Feedback / Next button */}
              {(selectedOpt || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col items-center">
                  <button
                    onClick={advanceChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold rounded-xl shadow-lg hover:brightness-105 transition"
                  >
                    {challengeIdx < CHALLENGES.length - 1 ? "Next Challenge ➔" : "Complete Game 🎉"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>

      {/* Feedback Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* Footer info */}
      <div className="relative z-10 py-2 px-6 bg-white/70 backdrop-blur border-t border-amber-200 flex justify-between items-center text-xs text-gray-600">
        <span>Score: {score}</span>
        <span>CISCE Math Class 5: Angles & Symmetry</span>
        <span>Errors: {errors}</span>
      </div>
    </div>
  );
}
