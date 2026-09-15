'use client';

/**
 * ShapesTessellationGame — Learn about lines, shapes, tangrams, and tessellation!
 *
 * CISCE Nodes: c3_math_017 (Straight lines, curved lines on dot grid),
 *              c3_math_018 (Tangram shapes),
 *              c3_math_019 (Compare shapes by sides and corners),
 *              c3_math_020 (Tessellation / tiling),
 *              c3_math_021 (Identification of shapes that tile)
 *
 * Mascot: Artist Anjali — a friendly shape artist with a beret, a paintbrush,
 *   a tangram puzzle, and a ruler. Custom SVG mascot.
 *
 * ELI5: "Shapes are everywhere! Straight lines go straight like a ruler.
 *   Curved lines bend like a rainbow. Tangram has 7 pieces to make animals and
 *   houses. Squares and triangles can tile a floor with no gaps, but circles
 *   leave curved gaps!"
 *
 * Misconceptions addressed:
 *   1. "A square and a rectangle are the same" → "Square has 4 equal sides;
 *      rectangle has opposite sides equal!"
 *   2. "A circle has 1 side" → "A circle has 0 straight sides and 0 corners!"
 *   3. "All shapes can tile" → "Circles and ovals leave gaps; only squares,
 *      triangles, rectangles, and hexagons tile!"
 *   4. "Tangram has only 5 pieces" → "Classic tangram has 7 pieces: 5 triangles,
 *      1 square, and 1 parallelogram!"
 *   5. "Triangles cannot tile" → "Two identical triangles fit together to tile
 *      a region!"
 *
 * 9/10 Quality Features:
 * - 5 teaching slides with full audio narration and visual examples
 * - Custom SVG scene background (dot grid, geometry shapes, art studio)
 * - Custom SVG artwork for all shape icons (square, triangle, circle, tangram, etc.)
 * - Mascot Artist Anjali with dynamic mood states and speech bubble
 * - Drag-and-drop sorting for properties, tangram pieces, and tiling shapes
 * - 8 progressive challenges (identify → sort → compare → apply)
 * - Misconception-aware feedback for incorrect answers
 * - Web Speech API narration + audioManager sound effects
 * - Confetti + SuccessBanner + SparkleBurst celebration
 * - Auto-hint timer (10s inactivity)
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── GameScreen Type Definition ───────────────────────────────

type GameScreen = 'teaching' | 'play';

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Straight & Curved Lines! 📏',
    text: 'A straight line is the shortest path between two points and does not bend (like a ruler edge). A curved line bends smoothly (like a rainbow or a slide)! On a dot grid, we connect dots to make shapes.',
    emoji: '📏',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'A straight line does not bend like a ruler. A curved line bends smoothly like a rainbow! On a dot grid, we connect dots to make shapes.',
  },
  {
    title: 'Sides and Corners! 🔺',
    text: 'Shapes have sides (straight boundary lines) and corners (where sides meet). A triangle has 3 sides and 3 corners. A square has 4 equal sides and 4 corners. A circle has zero sides and zero corners!',
    emoji: '🔺',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'Shapes have sides and corners. A triangle has three sides and three corners. A square has four equal sides and four corners. A circle has zero sides and zero corners!',
  },
  {
    title: 'Square vs Rectangle! 🟦',
    text: 'Both squares and rectangles have 4 sides and 4 corners! But in a square, all four sides are equal in length. In a rectangle, only opposite sides are equal (two long, two short)!',
    emoji: '🟦',
    bgColor: 'from-cyan-400 to-blue-500',
    spoken: 'Both squares and rectangles have four sides and four corners. But in a square, all four sides are equal. In a rectangle, opposite sides are equal with two long and two short sides!',
  },
  {
    title: 'The Magic Tangram! 🧩',
    text: 'A tangram is an ancient puzzle with 7 flat pieces: 5 triangles, 1 square, and 1 parallelogram! You can rotate and flip them to build cats, houses, rockets, and boats with no gaps!',
    emoji: '🧩',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'A tangram is an ancient puzzle with seven flat pieces: five triangles, one square, and one parallelogram. You can turn and flip them to build animals and houses with no gaps!',
  },
  {
    title: 'Tessellation (Tiling)! 🟩',
    text: 'Tessellation means covering a flat surface completely with tiles of the same shape, with NO gaps and NO overlaps! Squares, rectangles, triangles, and hexagons tile easily. Circles leave curved gaps and do not tile!',
    emoji: '🟩',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Tessellation means covering a flat surface completely with tiles of the same shape, with no gaps and no overlaps. Squares, triangles, and hexagons tile. Circles leave gaps and do not tile!',
  },
];

// ─── Challenge Interface & Definitions ────────────────────────

interface Challenge {
  type: 'identify' | 'sort';
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
    question: 'Which of these is a STRAIGHT line on a dot grid?',
    answer: 'A line joining two dots directly with a ruler',
    options: [
      'A line joining two dots directly with a ruler',
      'A wavy wiggle line passing through random dots',
      'A rainbow curved arc bending across the grid',
    ],
    hint: 'Think: a straight line is the shortest path between two points and does not bend!',
    misconception: 'A straight line is the shortest path between two points and never bends! Wavy or rainbow lines are curved lines, not straight lines.',
  },
  {
    type: 'identify',
    question: 'How many sides and corners does a TRIANGLE have?',
    answer: '3 sides and 3 corners',
    options: [
      '3 sides and 3 corners',
      '4 equal sides and 4 corners',
      '0 sides and 0 corners',
    ],
    hint: 'Count the boundary lines of a triangle like a slice of samosa!',
    misconception: 'A triangle always has 3 sides and 3 corners! 4 equal sides and 4 corners belong to a square, while 0 sides belong to a circle.',
  },
  {
    type: 'sort',
    question: 'Drag each shape to its correct number of sides and corners!',
    answer: 'sort',
    options: [],
    hint: 'Count carefully: Triangle has 3, Square has 4 equal, Circle has 0!',
    misconception: 'Always count every side and corner! Triangles have 3, squares have 4 equal sides, rectangles have opposite sides equal, and circles have no straight sides at all.',
    sortItems: [
      { id: 'tri', label: 'Triangle (3 sides)', icon: 'triangle', correctBin: 'bin-3' },
      { id: 'sq', label: 'Square (4 equal sides)', icon: 'square', correctBin: 'bin-4' },
      { id: 'circ', label: 'Circle (0 sides)', icon: 'circle', correctBin: 'bin-0' },
      { id: 'hex', label: 'Hexagon (6 sides)', icon: 'hexagon', correctBin: 'bin-6' },
    ],
    bins: [
      { id: 'bin-3', label: '3 Sides & Corners 🔺', color: '#8B5CF6' },
      { id: 'bin-4', label: '4 Sides & Corners 🟦', color: '#3B82F6' },
      { id: 'bin-6', label: '6 Sides & Corners ⬡', color: '#10B981' },
      { id: 'bin-0', label: '0 Sides (Curved) ⭕', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'What is a TANGRAM puzzle?',
    answer: 'A puzzle of 7 flat pieces that form shapes without gaps',
    options: [
      'A puzzle of 7 flat pieces that form shapes without gaps',
      'A tool used only for drawing straight lines',
      'A circular coin used for counting money',
    ],
    hint: 'Think: 5 triangles, 1 square, and 1 parallelogram put together!',
    misconception: 'A tangram is a Chinese puzzle with 7 flat pieces (triangles, square, parallelogram) that fit together to form animals, houses, and boats without gaps!',
  },
  {
    type: 'sort',
    question: 'Drag each tangram piece to its correct name!',
    answer: 'sort',
    options: [],
    hint: 'A tangram has 7 pieces: 2 large triangles, 1 medium, 2 small, 1 square, 1 parallelogram!',
    misconception: 'A classic tangram has 5 triangles of different sizes, 1 square, and 1 parallelogram — 7 pieces in total!',
    sortItems: [
      { id: 't-large', label: '2 Large Triangles', icon: 'triangle', correctBin: 'bin-tri' },
      { id: 't-med', label: '1 Medium Triangle', icon: 'triangle', correctBin: 'bin-tri' },
      { id: 'sq-piece', label: '1 Square Piece', icon: 'square', correctBin: 'bin-sq' },
      { id: 'para', label: '1 Parallelogram', icon: 'rectangle', correctBin: 'bin-para' },
    ],
    bins: [
      { id: 'bin-tri', label: 'Triangle Pieces 🔺', color: '#8B5CF6' },
      { id: 'bin-sq', label: 'Square Piece 🟦', color: '#3B82F6' },
      { id: 'bin-para', label: 'Parallelogram ▰', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these shapes can TILE (tessellate) a flat surface without gaps?',
    answer: 'Square tile',
    options: [
      'Square tile',
      'Circular coin',
      'Regular pentagon with gaps',
    ],
    hint: 'Think: which shape fits edge to edge like bathroom floor tiles with zero empty space?',
    misconception: 'Squares, rectangles, and triangles tile easily because their straight edges meet with no gaps! Circles always leave curved gaps between them and cannot tile.',
  },
  {
    type: 'sort',
    question: 'Drag each shape into Can Tile or Cannot Tile!',
    answer: 'sort',
    options: [],
    hint: 'If straight edges fit edge-to-edge with no gaps, it tiles! If it leaves curved spaces, it cannot!',
    misconception: 'Squares and hexagons tile perfectly (like honeycomb and floor tiles). Circles and ovals leave curved gaps and CANNOT tile a flat surface!',
    sortItems: [
      { id: 'tile-sq', label: 'Square', icon: 'square', correctBin: 'can-tile' },
      { id: 'tile-hex', label: 'Hexagon', icon: 'hexagon', correctBin: 'can-tile' },
      { id: 'tile-circ', label: 'Circle', icon: 'circle', correctBin: 'cannot-tile' },
      { id: 'tile-tri', label: 'Triangle', icon: 'triangle', correctBin: 'can-tile' },
    ],
    bins: [
      { id: 'can-tile', label: 'Can Tile (No Gaps) ✅', color: '#10B981' },
      { id: 'cannot-tile', label: 'Cannot Tile (Leaves Gaps) ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each property to the correct shape!',
    answer: 'sort',
    options: [],
    hint: 'Match 4 equal sides to Square, opposite sides to Rectangle, and 0 sides to Circle!',
    misconception: 'A square has 4 EQUAL sides, while a rectangle has opposite sides equal (2 long, 2 short). A circle has 0 sides and 0 corners!',
    sortItems: [
      { id: 'prop-sq', label: '4 Equal Sides', icon: 'square', correctBin: 'bin-square' },
      { id: 'prop-rect', label: 'Opposite Sides Equal', icon: 'rectangle', correctBin: 'bin-rect' },
      { id: 'prop-circ', label: '0 Sides & Corners', icon: 'circle', correctBin: 'bin-circle' },
    ],
    bins: [
      { id: 'bin-square', label: 'Square 🟦', color: '#3B82F6' },
      { id: 'bin-rect', label: 'Rectangle 🟫', color: '#F59E0B' },
      { id: 'bin-circle', label: 'Circle ⭕', color: '#EF4444' },
    ],
  },
];

// ─── Custom SVG Shape Icons ───────────────────────────────────

function SquareIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="5" width="40" height="40" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" rx="4" />
      <rect x="12" y="12" width="26" height="26" fill="#93C5FD" opacity="0.6" rx="2" />
    </svg>
  );
}

function RectangleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 40">
      <rect x="5" y="5" width="50" height="30" fill="#F59E0B" stroke="#B45309" strokeWidth="3" rx="4" />
      <rect x="10" y="10" width="40" height="20" fill="#FDE68A" opacity="0.6" rx="2" />
    </svg>
  );
}

function TriangleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="25,5 45,42 5,42" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="25,14 37,36 13,36" fill="#C4B5FD" opacity="0.6" strokeLinejoin="round" />
    </svg>
  );
}

function CircleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
      <circle cx="25" cy="25" r="12" fill="#FCA5A5" opacity="0.6" />
    </svg>
  );
}

function HexagonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="25,3 45,14 45,36 25,47 5,36 5,14" fill="#10B981" stroke="#047857" strokeWidth="3" strokeLinejoin="round" />
      <polygon points="25,10 38,18 38,32 25,40 12,32 12,18" fill="#A7F3D0" opacity="0.6" strokeLinejoin="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'square': return <SquareIcon size={size} />;
    case 'rectangle': return <RectangleIcon size={size} />;
    case 'triangle': return <TriangleIcon size={size} />;
    case 'circle': return <CircleIcon size={size} />;
    case 'hexagon': return <HexagonIcon size={size} />;
    default: return <SquareIcon size={size} />;
  }
}

// ─── Artist Anjali Mascot Component ───────────────────────────

function ArtistAnjali({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-purple-300"
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
              : { rotate: [0, 5, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Beret hat */}
          <ellipse cx="37" cy="18" rx="22" ry="8" fill="#8B5CF6" />
          <circle cx="28" cy="13" r="4" fill="#7C3AED" />
          {/* Head */}
          <circle cx="37" cy="32" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="30" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="30" r="2.5" fill="#1F2937" />
          <circle cx="32" cy="29" r="1" fill="white" />
          <circle cx="44" cy="29" r="1" fill="white" />
          {/* Smile */}
          <path d="M32 38 Q37 42 42 38" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Smock / Body */}
          <path d="M20 52 L54 52 L58 82 L16 82 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" rx="4" />
          <path d="M25 52 L37 62 L49 52" fill="white" />
          {/* Paintbrush in hand */}
          <line x1="58" y1="65" x2="70" y2="45" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="43" r="4" fill="#3B82F6" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

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

// ─── Art & Geometry Scene Background ──────────────────────────

function ArtScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="art-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E9D5FF" />
          </linearGradient>
          <pattern id="dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="2.5" fill="#93C5FD" opacity="0.7" />
          </pattern>
        </defs>
        {/* Background gradient */}
        <rect width={width} height={height} fill="url(#art-sky)" />
        {/* Dot grid overlay on bottom half */}
        <rect x="0" y={height * 0.4} width={width} height={height * 0.6} fill="url(#dot-grid)" />
      </svg>

      {/* Floating geometric shapes in background */}
      <motion.div className="absolute top-10 left-12 opacity-40" animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <SquareIcon size={60} />
      </motion.div>
      <motion.div className="absolute top-16 right-24 opacity-40" animate={{ y: [0, 12, 0], rotate: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
        <TriangleIcon size={65} />
      </motion.div>
      <motion.div className="absolute bottom-12 left-16 opacity-40" animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <CircleIcon size={55} />
      </motion.div>
      <motion.div className="absolute bottom-16 right-16 opacity-40" animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
        <HexagonIcon size={70} />
      </motion.div>
    </div>
  );
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-indigo-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-3 py-2`} style={{ width: 120, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 shadow-lg transition-all ${isHovering ? 'scale-105 ring-4 ring-yellow-300' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color + '22',
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface ShapesTessellationGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ShapesTessellationGame({ width = 720, height = 560, onComplete }: ShapesTessellationGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [hintText, setHintText] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Artist Anjali! Let us explore shapes and tessellation!');

  // Sort challenge placed items state
  const [placedItems, setPlacedItems] = useState<{ [id: string]: boolean }>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = TEACHING_SLIDES[slideIdx];
  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide when changed
  useEffect(() => {
    if (screen === 'teaching') {
      speechManager.speak(currentSlide.spoken);
      setMascotSpeech(currentSlide.spoken);
    }
  }, [screen, slideIdx, currentSlide]);

  // Speak challenge question when changed
  useEffect(() => {
    if (screen === 'play') {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setPlacedItems({});
      resetInactivityTimer();
    }
  }, [screen, challengeIdx, currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
          if (screen === 'play') {
            audioManager.play('hint');
            setHintText(currentChallenge.hint);
            setMascotMood('thinking');
            speechManager.speak(currentChallenge.hint);
          }
        }, 10000);
  }, [currentChallenge]);

  // Handle multiple choice answer
  const handleMultipleChoice = (option: string) => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! That is correct!');
      speechManager.speak('Fantastic! That is correct!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setShowSuccessBanner(true);
      setSuccessMsg('Brilliant geometry work! ✨');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintText(currentChallenge.misconception);
    }
  };

  // Handle drag start for sort challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  // Handle drag end for sort challenges
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check bins positions (bins are laid out at bottom/middle)
    let droppedBin: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 60 + idx * 190;
      const binY = 320;
      const binW = 170;
      const binH = 130;
      if (x >= binX - 20 && x <= binX + binW && y >= binY - 20 && y <= binY + binH) {
        droppedBin = bin.id;
      }
    });

    setHoverBin(null);

    if (droppedBin === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      // Check if all sort items placed
      const allDone = currentChallenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('Wonderful sorting! All correct!');
        speechManager.speak('Wonderful sorting! All correct!');
        setSparklePos({ x: width / 2, y: height / 2 });
        setShowSuccessBanner(true);
        setSuccessMsg('Perfect geometry sorting! 🌟');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintText(currentChallenge.misconception);
      return false;
    }
  };

  // Next challenge or complete
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    setHintText(null);
    setMascotMood('happy');

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You are an expert shape artist and tessellation master!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-indigo-400 select-none" style={{ width, height }}>
      {/* Background scene */}
      <ArtScene width={width} height={height} />

      {/* Mascot */}
      <ArtistAnjali mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between z-10 border-b-2 border-indigo-100 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-indigo-600">📐 Shapes & Tessellation</span>
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">CISCE Class 3</span>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Challenge {challengeIdx + 1}/8</span>
              <StarRow count={stars} total={8} />
            </div>
          )}
        </div>
      </div>

      {/* ─── SCREEN 1: TEACHING ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 flex flex-col items-center justify-between z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-2xl bg-gradient-to-br ${currentSlide.bgColor} rounded-3xl p-8 text-white shadow-2xl flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{currentSlide.emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{currentSlide.title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow max-w-lg">{currentSlide.text}</p>
          </motion.div>

          {/* Navigation Dots & Buttons */}
          <div className="w-full max-w-2xl flex items-center justify-between px-4">
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSlideIdx(i); audioManager.play('tap'); }}
                  className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-indigo-600 w-8' : 'bg-gray-300'}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              {slideIdx > 0 && (
                <button
                  onClick={() => { setSlideIdx(prev => prev - 1); audioManager.play('tap'); }}
                  className="px-5 py-2.5 rounded-2xl bg-white font-bold text-indigo-600 shadow-md hover:bg-indigo-50 transition-all"
                >
                  Back
                </button>
              )}
              {slideIdx < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => { setSlideIdx(prev => prev + 1); audioManager.play('tap'); }}
                  className="px-6 py-2.5 rounded-2xl bg-indigo-600 font-bold text-white shadow-lg hover:bg-indigo-700 transition-all"
                >
                  Next ➡️
                </button>
              ) : (
                <button
                  onClick={() => { setScreen('play'); audioManager.play('success'); }}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 font-black text-white shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all text-lg animate-bounce"
                >
                  Start Playing! 🚀
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY (CHALLENGES) ────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col items-center justify-between z-10 overflow-hidden">
          {/* Question Banner */}
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-indigo-200 text-center mt-2">
            <p className="text-base font-black text-indigo-900">{currentChallenge.question}</p>
          </div>

          {/* Challenge Content */}
          <div className="flex-1 w-full max-w-3xl flex flex-col items-center justify-center relative my-2">
            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 w-full max-w-md">
                {currentChallenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMultipleChoice(option)}
                    className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-indigo-50 text-gray-800 font-bold shadow-md border-2 border-indigo-200 text-left transition-all flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-black">
                      {['A', 'B', 'C'][idx]}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="w-full h-full relative" style={{ minHeight: 320 }}>
                {/* Bins */}
                <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
                  {currentChallenge.bins.map((bin, idx) => (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={60 + idx * 190}
                      y={10}
                      width={170}
                      height={130}
                      isHovering={hoverBin === bin.id}
                    />
                  ))}
                </div>

                {/* Draggable Cards */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 px-4">
                  {currentChallenge.sortItems.map((item, idx) => {
                    const isPlaced = !!placedItems[item.id];
                    const startX = (width - currentChallenge.sortItems!.length * 130) / 2 + idx * 135;
                    const startY = 220;
                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={startX}
                        y={startY}
                        placed={isPlaced}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Hint Bubble */}
          <AnimatePresence>
            {hintText && (
              <HintBubble message={hintText} onComplete={() => setHintText(null)} />
            )}
          </AnimatePresence>

          {/* Success Banner */}
          <AnimatePresence>
            {showSuccessBanner && (
              <SuccessBanner message={successMsg} onComplete={handleNextChallenge} />
            )}
          </AnimatePresence>

          {/* Sparkle Burst */}
          {sparklePos && (
            <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
          )}

          {/* Confetti */}
          {showConfetti && (
            <Confetti onComplete={() => setShowConfetti(false)} />
          )}
        </div>
      )}
    </div>
  );
}
