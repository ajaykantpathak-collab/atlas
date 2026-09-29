'use client';
/**
 * ShapeSortGame - Learn about 2D shapes, sorting, and properties
 *
 * CISCE Nodes: c1_math_013 (Sorting shapes), c1_math_016 (2D shapes - rectangle, square, triangle, circle)
 * Enrichment: c1_maths_enrichment_part13, c1_maths_enrichment_part16
 *
 * ELI5: "Shapes are all around us! A triangle has 3 pointy corners, a rectangle has
 *   4 straight sides with opposite sides equal, a square has 4 equal sides, and a
 *   circle is round with no corners at all. Sorting means putting shapes together by
 *   one rule like shape or size!"
 *
 * Misconceptions (from enrichment):
 *   1. "A square and a rectangle are completely different shapes" → "No! A square IS a
 *      special rectangle where all four sides are equal!"
 *   2. "A circle is the same as a ball" → "No! A ball is a 3D sphere with volume,
 *      while a circle is a flat 2D outline!"
 *   3. "A triangle is anything that is pointed" → "No! A triangle must have exactly
 *      three straight sides and three corners!"
 *
 * Story: "Help Riku the Shape Sorter sort shapes into boxes, count sides and corners,
 *   and become a Geometry Master!"
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
        title: 'Meet the 2D Shapes! 🔺',
        text: 'Shapes are flat outlines found everywhere around us! We have triangles, rectangles, squares, and circles!',
        emoji: '⭐',
        bgColor: 'from-amber-400 to-orange-500',
        spoken: 'Shapes are flat outlines found everywhere around us! We have triangles, rectangles, squares, and circles!',
    },
    {
        title: 'Triangle 🔺 (3 Sides)',
        text: 'A triangle is a shape with 3 straight sides and 3 corners! Like a samosa or a slice of pizza!',
        emoji: '🔺',
        bgColor: 'from-orange-400 to-red-500',
        spoken: 'A triangle has three straight sides and three corners! Like a samosa or a pizza slice!',
    },
    {
        title: 'Rectangle 🚪 (4 Sides)',
        text: 'A rectangle has 4 straight sides and 4 corners. Opposite sides are equal! Like a classroom door or a book!',
        emoji: '🚪',
        bgColor: 'from-gold-400 to-gold-500',
        spoken: 'A rectangle has four straight sides and four corners. Opposite sides are equal!',
    },
    {
        title: 'Square 🟪 (4 Equal Sides)',
        text: 'A square is a special rectangle where ALL FOUR sides are equal in length! Like a floor tile or a dice face!',
        emoji: '🟪',
        bgColor: 'from-purple-400 to-pink-500',
        spoken: 'A square is a special rectangle where all four sides are equal in length!',
    },
    {
        title: 'Circle ⭕ (Round & Smooth)',
        text: 'A circle is a round, closed flat shape with no straight sides and no corners at all! Like a bangle or a coin!',
        emoji: '⭕',
        bgColor: 'from-emerald-400 to-teal-500',
        spoken: 'A circle is a round, closed flat shape with no straight sides and no corners at all!',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
interface SortItem {
    id: string;
    label: string;
    type: string;
    correctBin: string;
}
interface Challenge {
    type: ChallengeType;
    question: string;
    answer: string;
    options: string[];
    hint: string;
    misconception: string;
    sortItems?: SortItem[];
    bins?: {
        id: string;
        label: string;
        color: string;
    }[];
}
// ─── Challenges (8 progressive: identify → sort → apply) ──────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify',
        question: 'Which shape has 3 straight sides and 3 corners?',
        answer: 'Triangle',
        options: ['Triangle', 'Square', 'Circle'],
        hint: 'Count the sides! Which shape has only 3 sides like a samosa?',
        misconception: 'A triangle has 3 sides and 3 corners! Squares have 4, and circles have none.',
    },
    {
        type: 'identify',
        question: 'Which shape has 4 EQUAL sides and 4 corners?',
        answer: 'Square',
        options: ['Triangle', 'Square', 'Rectangle'],
        hint: 'Look for the shape where every single side is the exact same length!',
        misconception: 'A square has 4 equal sides! A rectangle has opposite sides equal, but not all four equal.',
    },
    {
        type: 'identify',
        question: 'Which shape is round with NO straight sides and NO corners?',
        answer: 'Circle',
        options: ['Square', 'Triangle', 'Circle'],
        hint: 'Think of a bangle or a coin. It has a smooth curved boundary!',
        misconception: 'A circle has no straight sides and no corners! Only closed shapes with straight sides have corners.',
    },
    {
        type: 'sort',
        question: 'Drag each shape into the correct property bin!',
        answer: 'sort',
        options: [],
        hint: 'Match triangles to 3 sides, squares to 4 equal sides, rectangles to 4 sides, circles to round!',
        misconception: 'Count sides and corners carefully! Triangles = 3 sides, squares = 4 equal sides, circles = round!',
        sortItems: [
            { id: 'tri-1', label: 'Triangle', type: 'triangle', correctBin: 'triangle-bin' },
            { id: 'sq-1', label: 'Square', type: 'square', correctBin: 'square-bin' },
            { id: 'circ-1', label: 'Circle', type: 'circle', correctBin: 'circle-bin' },
            { id: 'rect-1', label: 'Rectangle', type: 'rectangle', correctBin: 'rect-bin' },
        ],
        bins: [
            { id: 'triangle-bin', label: '3 Sides 🔺', color: '#EF4444' },
            { id: 'square-bin', label: '4 Equal Sides 🟪', color: '#8B5CF6' },
            { id: 'rect-bin', label: 'Rectangle 🚪', color: '#3B82F6' },
            { id: 'circle-bin', label: 'Round ⭕', color: '#10B981' },
        ],
    },
    {
        type: 'identify',
        question: 'How many straight sides does a RECTANGLE have?',
        answer: '4 sides',
        options: ['3 sides', '4 sides', '0 sides'],
        hint: 'Think of a door or a book cover. Count the top, bottom, left, and right!',
        misconception: 'A rectangle always has 4 straight sides and 4 corners! Opposite sides are equal in length.',
    },
    {
        type: 'identify',
        question: 'Is a square a special kind of rectangle?',
        answer: 'Yes, both have 4 sides but square has all equal',
        options: [
            'Yes, both have 4 sides but square has all equal',
            'No, they are completely different shapes',
            'Only sometimes when it is big',
        ],
        hint: 'Both shapes have 4 straight sides and 4 corners! What makes a square special?',
        misconception: 'A square IS a special rectangle! Both have 4 sides and 4 corners. The square is special because all four sides are equal.',
    },
    {
        type: 'sort',
        question: 'Drag each item into 2D Flat Shape or 3D Solid!',
        answer: 'sort',
        options: [],
        hint: '2D shapes are flat outlines like traced drawings. 3D objects are solid things like balls!',
        misconception: 'A ball is a 3D sphere with volume, while a circle is a flat 2D outline! Only flat outlines are 2D shapes.',
        sortItems: [
            { id: 'circ-2', label: 'Circle outline', type: 'circle', correctBin: '2d-bin' },
            { id: 'sq-2', label: 'Square tile', type: 'square', correctBin: '2d-bin' },
            { id: 'ball-1', label: 'Play ball', type: 'ball', correctBin: '3d-bin' },
            { id: 'cone-1', label: 'Party hat', type: 'cone', correctBin: '3d-bin' },
        ],
        bins: [
            { id: '2d-bin', label: '2D Flat Shape ✨', color: '#3B82F6' },
            { id: '3d-bin', label: '3D Solid Object ⚽', color: '#F59E0B' },
        ],
    },
    {
        type: 'sort',
        question: 'Sort shapes by their number of sides!',
        answer: 'sort',
        options: [],
        hint: 'Count the straight sides of each shape. Triangles have 3, squares/rectangles have 4, circles have 0!',
        misconception: 'Circles have NO straight sides - their boundary is one smooth curved line! Triangles have 3, quadrilaterals have 4.',
        sortItems: [
            { id: 'tri-3', label: 'Triangle (3 sides)', type: 'triangle', correctBin: 'three-bin' },
            { id: 'sq-3', label: 'Square (4 sides)', type: 'square', correctBin: 'four-bin' },
            { id: 'rect-3', label: 'Rectangle (4 sides)', type: 'rectangle', correctBin: 'four-bin' },
            { id: 'circ-3', label: 'Circle (0 sides)', type: 'circle', correctBin: 'zero-bin' },
        ],
        bins: [
            { id: 'three-bin', label: '3 Sides 🔺', color: '#EF4444' },
            { id: 'four-bin', label: '4 Sides 🟪', color: '#8B5CF6' },
            { id: 'zero-bin', label: '0 Sides ⭕', color: '#10B981' },
        ],
    },
];
// ─── Shape Sorter Mascot (Riku) ───────────────────────────────
function RikuMascot({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-200">
            <p className="text-xs font-bold text-gold-900">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
                ? { y: [0, -4, 0] }
                : { rotate: [0, 6, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="85" viewBox="0 0 75 85">
          <defs>
            <linearGradient id="riku-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1"/>
              <stop offset="100%" stopColor="#4338CA"/>
            </linearGradient>
            <linearGradient id="riku-cap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899"/>
              <stop offset="100%" stopColor="#BE185D"/>
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="37" cy="30" r="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1"/>
          {/* Cap */}
          <path d="M21 26 Q37 14 53 26 L55 20 Q37 10 19 20 Z" fill="url(#riku-cap)"/>
          <path d="M30 18 Q45 15 58 20 L57 23 Q45 18 31 21 Z" fill="#BE185D"/>
          {/* Hair tuft */}
          <path d="M22 28 Q18 25 24 23 Z" fill="#92400E"/>
          {/* Eyes */}
          <circle cx="31" cy="28" r="2.5" fill="#1F2937"/>
          <circle cx="43" cy="28" r="2.5" fill="#1F2937"/>
          <circle cx="32" cy="27" r="1" fill="white"/>
          <circle cx="44" cy="27" r="1" fill="white"/>
          {/* Rosy cheeks */}
          <circle cx="28" cy="33" r="3" fill="#FCA5A5" opacity="0.6"/>
          <circle cx="46" cy="33" r="3" fill="#FCA5A5" opacity="0.6"/>
          {/* Smile */}
          <path d="M33 34 Q37 38 41 34" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Body / Shirt */}
          <path d="M24 46 L50 46 L54 72 L20 72 Z" fill="url(#riku-shirt)" stroke="#3730A3" strokeWidth="1" rx="4"/>
          {/* Collar */}
          <path d="M30 46 L37 53 L44 46 Z" fill="white"/>
          {/* Shape sorter box held in hands */}
          <rect x="25" y="52" width="24" height="18" fill="#F3F4F6" stroke="#4B5563" strokeWidth="1.5" rx="2"/>
          <circle cx="37" cy="61" r="3" fill="#EF4444"/>
          {/* Arms */}
          <ellipse cx="18" cy="56" rx="4" ry="8" fill="#FDE68A" transform="rotate(20 18 56)"/>
          <ellipse cx="56" cy="56" rx="4" ry="8" fill="#FDE68A" transform="rotate(-20 56 56)"/>
          {/* Feet */}
          <ellipse cx="29" cy="78" rx="5" ry="3" fill="#1F2937"/>
          <ellipse cx="45" cy="78" rx="5" ry="3" fill="#1F2937"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Reward Row ────────────────────────────��─────────────
function StarRow({ count, total }: {
    count: number;
    total: number;
}) {
    return (<div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (<motion.div key={i} initial={false} animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Shape Scene Background ───────────────────────────────────
function ShapeScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Soft geometric sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 40%, #7DD3FC 70%, #38BDF8 100%)' }}/>
      {/* Floating background shapes */}
      <motion.div className="absolute top-10 left-12 opacity-30" animate={{ y: [0, -15, 0], rotate: [0, 360] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="20" fill="#EC4899"/>
        </svg>
      </motion.div>
      <motion.div className="absolute top-16 right-20 opacity-25" animate={{ y: [0, 15, 0], rotate: [0, -360] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <rect x="5" y="5" width="40" height="40" rx="4" fill="#8B5CF6"/>
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-24 left-1/4 opacity-25" animate={{ y: [0, -10, 0], rotate: [0, 180] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <polygon points="30,5 55,50 5,50" fill="#F59E0B"/>
        </svg>
      </motion.div>
      {/* Ground hill */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #22C55E 100%)', borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}/>
    </div>);
}
// ─── Custom Topic SVG Shape Components ────────────────────────
function CircleShape({ size = 50, color = '#10B981' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill={color} stroke="#047857" strokeWidth="2.5"/>
      <circle cx="22" cy="22" r="5" fill="white" opacity="0.6"/>
    </svg>);
}
function SquareShape({ size = 50, color = '#8B5CF6' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="6" fill={color} stroke="#5B21B6" strokeWidth="2.5"/>
      <rect x="15" y="15" width="10" height="10" rx="2" fill="white" opacity="0.5"/>
    </svg>);
}
function TriangleShape({ size = 50, color = '#EF4444' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,6 54,52 6,52" fill={color} stroke="#B91C1C" strokeWidth="2.5" strokeLinejoin="round"/>
      <circle cx="30" cy="36" r="5" fill="white" opacity="0.6"/>
    </svg>);
}
function RectangleShape({ size = 60, color = '#3B82F6' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 70 50">
      <rect x="5" y="8" width="60" height="34" rx="6" fill={color} stroke="#1D4ED8" strokeWidth="2.5"/>
      <rect x="12" y="14" width="14" height="10" rx="2" fill="white" opacity="0.5"/>
    </svg>);
}
function BallShape({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#F97316" stroke="#C2410C" strokeWidth="2"/>
      <path d="M12 20 Q30 35 48 20" stroke="white" strokeWidth="2" fill="none"/>
      <path d="M12 40 Q30 25 48 40" stroke="white" strokeWidth="2" fill="none"/>
    </svg>);
}
function ConeShape({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,5 50,48 10,48" fill="#EC4899" stroke="#BE185D" strokeWidth="2"/>
      <ellipse cx="30" cy="48" rx="20" ry="6" fill="#F472B6" stroke="#BE185D" strokeWidth="2"/>
    </svg>);
}
// ─── Sort Card Component ───────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
  if (id.includes('circle')) return <CircleShape size={size} />;
  if (id.includes('square')) return <SquareShape size={size} />;
  if (id.includes('triangle')) return <TriangleShape size={size} />;
  if (id.includes('rectangle')) return <RectangleShape size={size} />;
  if (id.includes('ball')) return <BallShape size={size} />;
  if (id.includes('cone')) return <ConeShape size={size} />;
  return <CircleShape size={size} />;
}
function SortCard({ id, label, type, x, y, placed, onDragStart, onDragEnd }: {
    id: string;
    label: string;
    type: string;
    x: number;
    y: number;
    placed: boolean;
    onDragStart: (id: string) => void;
    onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-200 ${placed ? 'opacity-40' : 'bg-white'} p-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(id, 48)}
        <span className="text-xs font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>);
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
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
      <div className="text-xs font-extrabold text-center px-1" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(slide + 1);}
    else {audioManager.play('success');
      onStart();
    }
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) setSlide(slide - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden" style={{ width, height }}>
      <ShapeScene width={width} height={height}/>

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-white/40">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{current.emoji}</span>
          <h1 className="text-xl font-extrabold text-gold-900">Shape Sorter School 📐</h1>
        </div>
        <div className="flex items-center gap-2">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-gold-600 scale-125' : 'bg-gray-300'}`}/>))}
        </div>
      </div>

      {/* Slide Card */}
      <div className="relative z-10 w-full max-w-xl my-auto">
        <motion.div key={slide} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-4 border-gold-200 text-center flex flex-col items-center gap-6">
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${current.bgColor} flex items-center justify-center text-5xl shadow-lg`}>
            {current.emoji}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gold-950 mb-3">{current.title}</h2>
            <p className="text-base font-medium text-gray-700 leading-relaxed">{current.text}</p>
          </div>
        </motion.div>
      </div>
    { /* Navigation Buttons */ }
    <div className="relative z-10 w-full max-w-xl flex justify-between items-center mt-4">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${slide === 0 ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 'bg-gold-500 hover:bg-gold-600 active:scale-95'}`}>
          ⬅️ Back
        </button>
        <button onClick={handleNext} className="px-8 py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl active:scale-95 transition-all">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}
// ─── Main Game Component ──────────────────────────────────────
export interface ShapeSortGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function ShapeSortGame({ width = 720, height = 560, onComplete }: ShapeSortGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [sparklePos, setSparklePos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [hintMessage, setHintMessage] = useState<string | null>(null);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Riku! Let us sort shapes together!');
    // Sort challenge state
    const [sortPositions, setSortPositions] = useState<{
        [id: string]: {
            x: number;
            y: number;
            placed: boolean;
        };
    }>({});
    const [hoverBin, setHoverBin] = useState<string | null>(null);
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const challenge = CHALLENGES[currentChallenge];
    // Initialize sort positions when challenge changes
    useEffect(() => {
        if (challenge.type === 'sort' && challenge.sortItems) {
            const initialPos: {
                [id: string]: {
                    x: number;
                    y: number;
                    placed: boolean;
                };
            } = {};
            challenge.sortItems.forEach((item, idx) => {
                initialPos[item.id] = {
                    x: 40 + idx * 150,
                    y: 350,
                    placed: false,
                };
            });
            setSortPositions(initialPos);
        }
        setMascotSpeech(challenge.question);
        speechManager.speak(challenge.question);
        setMascotMood('happy');
        // Reset inactivity timer
        if (inactivityTimerRef.current)
            clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            setHintMessage(challenge.hint);
            setMascotMood('thinking');
            setMascotSpeech('Need a hint? Check this out!');
            speechManager.speak('Need a hint? Check this out!');
            audioManager.play('hint');
        }, 10000);
        return () => {
            speechManager.stop();
            if (inactivityTimerRef.current)
                clearTimeout(inactivityTimerRef.current);
        };
    }, [currentChallenge]);
    // Handle multiple-choice answers
    const handleAnswerSelect = (option: string) => {
        if (inactivityTimerRef.current)
            clearTimeout(inactivityTimerRef.current);
        if (option === challenge.answer) {
            audioManager.play('success');
            setStars(prev => prev + 1);
            setSparklePos({ x: width / 2, y: height / 2 });
            setMascotMood('celebrate');
            setMascotSpeech('Amazing job! That is correct! 🎉');
            speechManager.speak('Amazing job! That is correct! 🎉');
            setShowSuccess(true);
        }
        else {
            audioManager.play('error');
            setErrors(prev => prev + 1);
            setMascotMood('thinking');
            setMascotSpeech(challenge.misconception);
            speechManager.speak(challenge.misconception);
            setHintMessage(challenge.misconception);
        }
    };
    // Handle Drag Start
    const handleDragStart = (_id: string) => {
        audioManager.play('pickup');
    };
    // Handle Drag End for Sort Challenges
    const handleDragEnd = useCallback((id: string, x: number, y: number): boolean => {
        if (!challenge.bins || !challenge.sortItems)
            return false;
        const item = challenge.sortItems.find(i => i.id === id);
        if (!item)
            return false;
        // Bin bounding boxes check
        // We have up to 4 bins arranged horizontally
        const binWidth = 140;
        const binHeight = 90;
        const binY = 180;
        const totalBins = challenge.bins.length;
        const startX = (width - totalBins * 150) / 2;
        let matchedBinId: string | null = null;
        challenge.bins.forEach((bin, idx) => {
            const bx = startX + idx * 150;
            const by = binY;
            if (x >= bx - 20 && x <= bx + binWidth + 20 && y >= by - 20 && y <= by + binHeight + 20) {
                matchedBinId = bin.id;
            }
        });
        if (matchedBinId && matchedBinId === item.correctBin) {
            audioManager.play('drop-correct');
            setSortPositions(prev => ({
                ...prev,
                [id]: { x, y, placed: true },
            }));
            // Check if all items are placed
            setSortPositions(prev => {
                const updated = { ...prev, [id]: { x, y, placed: true } };
                const allPlaced = Object.values(updated).every(p => p.placed);
                if (allPlaced) {
                    audioManager.play('success');
                    setStars(s => s + 1);
                    setSparklePos({ x: width / 2, y: height / 2 });
                    setMascotMood('celebrate');
                    setMascotSpeech('Wonderful! All sorted perfectly! 🌟');
                    speechManager.speak('Wonderful! All sorted perfectly! 🌟');
                    setTimeout(() => setShowSuccess(true), 600);
                }
                return updated;
            });
            return true;
        }
        else {
            audioManager.play('drop-wrong');
            setErrors(e => e + 1);
            setMascotMood('thinking');
            setMascotSpeech(challenge.misconception);
            speechManager.speak(challenge.misconception);
            setHintMessage(challenge.misconception);
            return false;
        }
    }, [challenge, width, height]);
    // Next challenge or complete
    const handleNextChallenge = () => {
        setShowSuccess(false);
        if (currentChallenge < CHALLENGES.length - 1) {
            setCurrentChallenge(prev => prev + 1);
        }
        else {
            audioManager.play('celebration');
            setShowConfetti(true);
            setMascotMood('celebrate');
            setMascotSpeech('You are a true Geometry Master! 🏆');
            speechManager.speak('You are a true Geometry Master! 🏆');
        }
    };
    const finalScore = Math.max(0, 100 - errors * 5);
    if (screen === 'teaching') {
        return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
    }
    return (<div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden bg-gold-100" style={{ width, height }}>
      <ShapeScene width={width} height={height}/>

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between bg-white/85 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg border border-white/50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📐</span>
          <h1 className="text-lg font-extrabold text-gold-900">Shape Sorter Game</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-gold-700">Level {currentChallenge + 1} / {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
      </div>

      {/* Mascot */}
      <RikuMascot mood={mascotMood} speaking={mascotSpeech}/>

      {/* Game Content Area */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-2xl px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-gold-200 w-full flex flex-col items-center text-center">
          <h2 className="text-xl font-black text-gold-950 mb-6">{challenge.question}</h2>

          {/* Multiple Choice Challenge */}
          {challenge.type === 'identify' && (<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {challenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswerSelect(opt)} className="bg-gradient-to-br from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all text-base border-2 border-gold-300">
                  {opt}
                </motion.button>))}
            </div>)}

          {/* Sort Challenge */}
          {challenge.type === 'sort' && challenge.bins && challenge.sortItems && (<div className="relative w-full h-[280px]">
              {/* Bins */}
              {challenge.bins.map((bin, idx) => {
                const totalBins = challenge.bins!.length;
                const startX = (width - 80 - totalBins * 150) / 2;
                const bx = startX + idx * 150;
                return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={Math.max(10, bx)} y={10} width={130} height={90} isHovering={hoverBin === bin.id}/>);
            })}

              {/* Draggable Items */}
              {challenge.sortItems.map(item => {
                const pos = sortPositions[item.id] || { x: 50, y: 350, placed: false };
                return (<SortCard key={item.id} id={item.id} label={item.label} type={item.type} x={pos.x} y={pos.y} placed={pos.placed} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
            </div>)}
        </div>
      </div>

      {/* Footer / Hint trigger */}
      <div className="relative z-10 w-full flex justify-between items-center mt-2">
        <button onClick={() => {
            setHintMessage(challenge.hint);
            audioManager.play('hint');
        }} className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-4 py-2 rounded-xl shadow-md text-sm flex items-center gap-2 transition-all">
          💡 Need a Hint?
        </button>
        <span className="text-xs font-semibold text-gray-600">CISCE Class 1 Geometry</span>
      </div>

      {/* Feedback Overlays */}
      {hintMessage && (<HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>)}

      {showSuccess && (<SuccessBanner message={currentChallenge === CHALLENGES.length - 1 ? 'Amazing! You finished all challenges! 🎉' : 'Correct! Great job! ⭐'} onComplete={handleNextChallenge}/>)}

      {sparklePos && (<SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}

      {showConfetti && (<Confetti onComplete={() => {
                setShowConfetti(false);
                if (onComplete)
                    onComplete(finalScore);
            }}/>)}
    </div>);
}
