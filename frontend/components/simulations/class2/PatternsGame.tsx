'use client';

/**
 * PatternsGame — Learn about Patterns & Simple Graphs (CISCE Class 1/2)
 *
 * CISCE Nodes: c2_math_024 (Simple graphs), c2_math_025 (Unit of repeat),
 *              c2_math_026 (Extending patterns), c2_math_027 (Create daily life patterns)
 * Enrichment: c2_maths_enrichment_part24-27.marker
 *
 * ELI5: "A pattern is a shape or colour that repeats over and over! The smallest
 *   part that repeats is the unit of repeat. A graph uses tall and short bars to
 *   show us information clearly — the tallest bar means the most, and the shortest
 *   bar means the least!"
 *
 * Misconceptions (from enrichment):
 *   1. "The unit of repeat is just one item" → "No! The unit of repeat is the
 *      smallest complete block that rebuilds the whole pattern when looped!"
 *   2. "Tallest bar on a graph means least" → "No! Tallest bar means MOST (highest
 *      count), shortest bar means LEAST!"
 *   3. "Patterns only exist in books" → "No! Patterns are all around us on floor
 *      tiles, sari borders, necklaces, and days of the week!"
 *   4. "Any random sequence is a pattern" → "No! A pattern must have a strict,
 *      repeating unit of repeat!"
 *
 * Story: "Help Designer Diya sort beads, build patterns, read graph charts, and
 *   become a Master Pattern Designer!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';

import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  { title: 'What is a Pattern? 🎨', text: 'A pattern is a sequence of shapes or colours that follows a rule! The same small group comes back again and again in the exact same order!', emoji: '🎨', bgColor: 'from-pink-400 to-rose-500', spoken: 'A pattern is a sequence of shapes or colours that follows a rule! The same small group comes back again and again in the exact same order!' },
  { title: 'The Unit of Repeat 🔄', text: 'The smallest block that repeats to build the whole pattern is called the unit of repeat! In red, blue, red, blue, the unit is red and blue!', emoji: '🔄', bgColor: 'from-purple-400 to-gold-500', spoken: 'The smallest block that repeats to build the whole pattern is called the unit of repeat!' },
  { title: 'Extending Patterns ➡️', text: 'To extend a pattern, you find the unit of repeat and copy it again and again! After red and yellow comes red, then yellow!', emoji: '➡️', bgColor: 'from-gold-400 to-gold-500', spoken: 'To extend a pattern, you find the unit of repeat and copy it again and again!' },
  { title: 'Daily Life Patterns 🏠', text: 'Patterns are everywhere around us! Floor tiles, sari borders, necklaces, and even the days of the week from Monday to Sunday follow repeating patterns!', emoji: '🏠', bgColor: 'from-emerald-400 to-teal-500', spoken: 'Patterns are everywhere around us! Floor tiles, sari borders, necklaces, and days of the week follow repeating patterns!' },
  { title: 'Simple Graphs & Charts 📊', text: 'A graph is a picture that shows information clearly! On a bar graph, the tallest bar shows the most popular item, and the shortest bar shows the least!', emoji: '📊', bgColor: 'from-amber-400 to-orange-500', spoken: 'A graph is a picture that shows information clearly! The tallest bar shows the most, and the shortest bar shows the least!' },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort' | 'graph_read';

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

// ─── Challenges (8 progressive: identify → sort → read graph) ─

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What comes next in the pattern: Red, Blue, Red, Blue, Red, ___?',
    answer: 'Blue',
    options: ['Blue', 'Red', 'Yellow'],
    hint: 'Look at the repeating pair: Red, Blue! After Red comes...?',
    misconception: 'The unit is Red-Blue! After Red, the next item in the repeating pair is always Blue!',
  },
  {
    type: 'identify',
    question: 'What is the UNIT OF REPEAT in: Circle, Square, Triangle, Circle, Square, Triangle...?',
    answer: 'Circle, Square, Triangle',
    options: ['Circle, Square, Triangle', 'Circle, Square', 'Just Circle'],
    hint: 'Find the shortest block that repeats without missing any shape!',
    misconception: 'The unit must include all shapes in order! Circle, Square, Triangle is the smallest block that rebuilds the whole pattern!',
  },
  {
    type: 'sort',
    question: 'Drag the right beads to extend the pattern: Red, Yellow, Red, Yellow, Red, ___, ___',
    answer: 'sort',
    options: [],
    hint: 'The unit is Red-Yellow! Keep repeating Red then Yellow!',
    misconception: 'Always copy the full unit in order! After Red comes Yellow, then Red again!',
    sortItems: [
      { id: 'bead-y', label: 'Yellow Bead', icon: 'yellow-circle', correctBin: 'bin-1' },
      { id: 'bead-r', label: 'Red Bead', icon: 'red-circle', correctBin: 'bin-2' },
    ],
    bins: [
      { id: 'bin-1', label: 'Next (6th)', color: '#F59E0B' },
      { id: 'bin-2', label: 'Then (7th)', color: '#EF4444' },
    ],
  },
  {
    type: 'graph_read',
    question: 'On a bar graph of favourite fruits, what does the TALLEST bar show?',
    answer: 'The most popular fruit',
    options: ['The most popular fruit', 'The least popular fruit', 'Nothing at all'],
    hint: 'Tallest bar means highest number of votes! Which fruit did the most children choose?',
    misconception: 'The tallest bar always shows the item with the most votes (most popular)! The shortest bar shows the least!',
  },
  {
    type: 'sort',
    question: 'Complete the repeating pattern: Star, Star, Circle, Star, Star, Circle, Star, ___, ___',
    answer: 'sort',
    options: [],
    hint: 'The unit is Star-Star-Circle! After one Star, what comes next?',
    misconception: 'The unit is three items long: Star, Star, Circle! After a single Star, you need another Star and then a Circle!',
    sortItems: [
      { id: 'star-item', label: 'Star', icon: 'green-star', correctBin: 'bin-star' },
      { id: 'circle-item', label: 'Circle', icon: 'red-circle', correctBin: 'bin-circle' },
    ],
    bins: [
      { id: 'bin-star', label: 'Next Item (8th)', color: '#10B981' },
      { id: 'bin-circle', label: 'Following (9th)', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a valid repeating pattern from daily life?',
    answer: 'Floor tiles: Square, Triangle, Square, Triangle',
    options: ['Floor tiles: Square, Triangle, Square, Triangle', 'Random scattered leaves on ground', 'A blank white wall'],
    hint: 'A pattern has a regular repeating order, like alternating floor tiles!',
    misconception: 'Floor tiles alternate in a strict repeating order! Random scattered leaves have no fixed unit of repeat.',
  },
  {
    type: 'sort',
    question: 'Arrange the sequence of days in a weekly repeating cycle!',
    answer: 'sort',
    options: [],
    hint: 'Monday comes first in the school week! What comes after Monday?',
    misconception: 'Days of the week follow a fixed cycle: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, then it repeats!',
    sortItems: [
      { id: 'tue', label: 'Tuesday', icon: 'blue-square', correctBin: 'bin-tue' },
      { id: 'wed', label: 'Wednesday', icon: 'yellow-triangle', correctBin: 'bin-wed' },
    ],
    bins: [
      { id: 'bin-tue', label: 'After Monday', color: '#3B82F6' },
      { id: 'bin-wed', label: 'After Tuesday', color: '#EAB308' },
    ],
  },
  {
    type: 'graph_read',
    question: 'Favourite Fruits Graph: Apple has 5 votes (tallest), Mango 4, Banana 3, Orange 2 (shortest). Which fruit has the LEAST votes?',
    answer: 'Orange',
    options: ['Orange', 'Apple', 'Mango'],
    hint: 'Look for the shortest bar on the graph! Shortest bar = least votes.',
    misconception: 'The shortest bar represents the fewest votes (least popular)! Here Orange has only 2 votes, making it the shortest bar.',
  },
];

// ─── Designer Diya Mascot (Pattern Designer) ───────────────────

function DesignerDiya({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px]"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
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
            <linearGradient id="diya-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
            <linearGradient id="diya-scarf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Head & Hair */}
          <circle cx="37" cy="28" r="14" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          <path d="M23 28 C23 15, 51 15, 51 28 C51 32, 47 30, 37 32 C27 30, 23 32, 23 28 Z" fill="#78350F" />
          {/* Pink Scarf / Dupatta */}
          <path d="M22 38 Q37 46 53 38 L50 48 Q37 54 25 48 Z" fill="url(#diya-scarf)" stroke="#B45309" strokeWidth="1" />
          {/* Dress / Body */}
          <path d="M25 48 L50 48 L58 78 L17 78 Z" fill="url(#diya-dress)" stroke="#831843" strokeWidth="1.5" />
          {/* Sketchbook in hand */}
          <rect x="10" y="52" width="14" height="18" fill="white" stroke="#94A3B8" strokeWidth="1" rx="1" transform="rotate(-10 10 52)" />
          <line x1="13" y1="56" x2="21" y2="56" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="13" y1="61" x2="21" y2="61" stroke="#3B82F6" strokeWidth="1.5" />
          <line x1="13" y1="66" x2="18" y2="66" stroke="#10B981" strokeWidth="1.5" />
          {/* Eyes & Smile */}
          <circle cx="32" cy="26" r="2" fill="#1E293B" />
          <circle cx="42" cy="26" r="2" fill="#1E293B" />
          <path d="M34 32 Q37 35 40 32" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Bindi */}
          <circle cx="37" cy="22" r="1.5" fill="#EF4444" />
          {/* Feet */}
          <ellipse cx="29" cy="81" rx="5" ry="3" fill="#B45309" />
          <ellipse cx="45" cy="81" rx="5" ry="3" fill="#B45309" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Design Studio Scene Background ───────────────────────────

function DesignStudioScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Warm workshop wall gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 40%, #FCD34D 100%)' }} />
      {/* Window showing blue sky */}
      <div className="absolute top-4 left-6 w-32 h-28 rounded-t-full bg-gradient-to-b from-gold-300 to-gold-400 border-4 border-amber-800 shadow-inner flex items-center justify-center overflow-hidden">
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <svg width="60" height="40" viewBox="0 0 60 40" opacity="0.8">
            <ellipse cx="20" cy="20" rx="15" ry="8" fill="white" />
            <ellipse cx="40" cy="18" rx="18" ry="10" fill="white" />
          </svg>
        </motion.div>
      </div>
      {/* Hanging pattern strip decoration */}
      <div className="absolute top-2 left-44 right-20 h-6 flex items-center justify-around opacity-75">
        <svg width="400" height="20" viewBox="0 0 400 20">
          <path d="M0 5 Q100 15, 200 5 T400 5" stroke="#92400E" strokeWidth="2" fill="none" />
          {[30, 80, 130, 180, 230, 280, 330, 370].map((x, i) => (
            <circle key={i} cx={x} cy={i % 2 === 0 ? 9 : 11} r="6" fill={i % 3 === 0 ? '#EF4444' : i % 3 === 1 ? '#3B82F6' : '#10B981'} />
          ))}
        </svg>
      </div>
      {/* Wooden floor at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-amber-900 border-t-4 border-amber-950 opacity-90" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.15) 40px, rgba(0,0,0,0.15) 80px)' }} />
      {/* Patterned fabric roll in corner */}
      <div className="absolute bottom-10 left-6">
        <svg width="40" height="60" viewBox="0 0 40 60">
          <rect x="5" y="5" width="30" height="50" fill="#EC4899" rx="4" stroke="#9D174D" strokeWidth="2" />
          <path d="M5 15 L35 15 M5 30 L35 30 M5 45 L35 45" stroke="#FCE7F3" strokeWidth="3" strokeDasharray="6 4" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Pattern & Graph Shape Icons ───────────────────

function RedCircleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <circle cx="18" cy="18" r="5" fill="white" opacity="0.6" />
    </svg>
  );
}

function BlueSquareIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="6" width="38" height="38" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" rx="4" />
      <rect x="14" y="14" width="10" height="10" fill="white" opacity="0.5" rx="2" />
    </svg>
  );
}

function YellowTriangleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 L45 42 L5 42 Z" fill="#EAB308" stroke="#854D0E" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="25" cy="30" r="4" fill="white" opacity="0.7" />
    </svg>
  );
}

function GreenStarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 4L31 18L46 20L35 31L38 46L25 38L12 46L15 31L4 20L19 18Z" fill="#10B981" stroke="#065F46" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function BarGraphIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Axes */}
      <line x1="10" y1="50" x2="55" y2="50" stroke="#334155" strokeWidth="2" />
      <line x1="10" y1="10" x2="10" y2="50" stroke="#334155" strokeWidth="2" />
      {/* Bars */}
      <rect x="16" y="25" width="8" height="25" fill="#EF4444" rx="1" />
      <rect x="28" y="15" width="8" height="35" fill="#3B82F6" rx="1" />
      <rect x="40" y="32" width="8" height="18" fill="#10B981" rx="1" />
    </svg>
  );
}

function PatternStripIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="15" width="50" height="30" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" rx="4" />
      <circle cx="15" cy="30" r="6" fill="#EF4444" />
      <rect x="23" y="24" width="12" height="12" fill="#3B82F6" rx="2" />
      <path d="M43 22 L49 38 L37 38 Z" fill="#EAB308" />
    </svg>
  );
}

function NecklaceIcon({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 20 Q30 50, 50 20" stroke="#92400E" strokeWidth="2" fill="none" />
      <circle cx="15" cy="22" r="5" fill="#EF4444" />
      <circle cx="23" cy="32" r="5" fill="#3B82F6" />
      <circle cx="30" cy="37" r="6" fill="#EAB308" />
      <circle cx="37" cy="32" r="5" fill="#3B82F6" />
      <circle cx="45" cy="22" r="5" fill="#EF4444" />
    </svg>
  );
}

// ─── Sort Card Component (for drag-and-drop challenges) ───────

function renderSortIcon(icon: string, size: number = 48) {
  if (icon === 'red-circle') return <RedCircleIcon size={size} />;
  if (icon === 'yellow-circle') return <YellowTriangleIcon size={size} />;
  if (icon === 'blue-square') return <BlueSquareIcon size={size} />;
  if (icon === 'green-star') return <GreenStarIcon size={size} />;
  if (icon === 'bar-graph') return <BarGraphIcon size={size} />;
  if (icon === 'pattern-strip') return <PatternStripIcon size={size} />;
  if (icon === 'necklace') return <NecklaceIcon size={size} />;
  return <RedCircleIcon size={size} />;
}

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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-xs font-bold text-gray-700 text-center mt-1 truncate max-w-[100px]">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white shadow-md" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-black text-gray-800 text-center px-1">{label}</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = TEACHING_SLIDES[currentSlide];

  const handleNext = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 h-full text-center">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className={`w-full max-w-lg rounded-3xl p-8 bg-gradient-to-br ${slide.bgColor} text-white shadow-2xl flex flex-col items-center border-4 border-white/40`}
      >
        <span className="text-6xl mb-4">{slide.emoji}</span>
        <h2 className="text-2xl font-black mb-3 drop-shadow">{slide.title}</h2>
        <p className="text-lg font-medium leading-relaxed drop-shadow-sm mb-6">{slide.text}</p>
        <div className="flex gap-2 mb-4">
          {TEACHING_SLIDES.map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`} />
          ))}
        </div>
      </motion.div>

      <div className="flex gap-4 mt-6">
        {currentSlide > 0 && (
          <button onClick={handlePrev} className="px-6 py-3 bg-white/80 hover:bg-white text-gray-800 font-bold rounded-2xl shadow-lg transition transform active:scale-95">
            ⬅️ Back
          </button>
        )}
        <button onClick={handleNext} className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-black rounded-2xl shadow-xl transition transform active:scale-95 text-lg">
          {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component: PatternsGame ─────────────────────────────

export interface PatternsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PatternsGame({ width = 720, height = 560, onComplete }: PatternsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparkles, setSparkles] = useState<{ x: number; y: number; id: number }[]>([]);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Let's learn patterns and graphs together!");
  const [gameOver, setGameOver] = useState(false);

  // Drag state for sort challenges
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const challenge = CHALLENGES[currentIndex];
      if (challenge) {
        setHintMessage(challenge.hint);
        setMascotSpeech("Need a little hint? Try this!");
        speechManager.speak("Need a little hint? Try this!");
        setMascotMood('thinking');
        audioManager.play('hint');
      }
    }, 10000);
  }, [currentIndex]);

  useEffect(() => {
    if (screen === 'play') {
      resetInactivityTimer();
    }
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [screen, currentIndex, resetInactivityTimer]);

  const challenge = CHALLENGES[currentIndex];

  // Reset drag items when challenge changes
  useEffect(() => {
    setPlacedItems({});
  }, [currentIndex]);

  const handleCorrectAnswer = useCallback(() => {
    audioManager.play('success');
    audioManager.play('celebration');
    setShowSuccess(true);
    setShowConfetti(true);
    setMascotMood('celebrate');
    setMascotSpeech("Fantastic! You got it right!");
    speechManager.speak("Fantastic! You got it right!");
    setScore(s => s + 10);

    // Trigger sparkle at center
    setSparkles(prev => [...prev, { x: width / 2, y: height / 2, id: Date.now() }]);
  }, [width, height]);

  const handleWrongAnswer = useCallback((misconceptionText: string) => {
    audioManager.play('error');
    setMistakes(m => m + 1);
    setHintMessage(misconceptionText);
    setMascotMood('thinking');
    setMascotSpeech("Not quite! Let's check why.");
    speechManager.speak("Not quite! Let's check why.");
  }, []);

  const handleOptionClick = (option: string) => {
    resetInactivityTimer();
    if (option === challenge.answer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer(challenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = () => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (itemId: string, dropX: number, dropY: number) => {
    resetInactivityTimer();
    const item = challenge.sortItems?.find(i => i.id === itemId);
    if (!item || !challenge.bins) return false;

    // Bin 1 box approx: left 80, top 340, width 240, height 130
    // Bin 2 box approx: left 400, top 340, width 240, height 130
    let targetBinId = '';
    if (dropX >= 60 && dropX <= 320 && dropY >= 320 && dropY <= 480) {
      targetBinId = challenge.bins[0].id;
    } else if (dropX >= 380 && dropX <= 640 && dropY >= 320 && dropY <= 480) {
      targetBinId = challenge.bins[1].id;
    }

    if (targetBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [itemId]: true };
      setPlacedItems(updatedPlaced);

      // Check if all sort items are placed
      const allPlaced = challenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allPlaced) {
        handleCorrectAnswer();
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      handleWrongAnswer(challenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    setShowSuccess(false);
    setShowConfetti(false);
    setHintMessage(null);
    setMascotMood('happy');
    setMascotSpeech("You're doing wonderfully!");
    speechManager.speak("You're doing wonderfully!");

    if (currentIndex < CHALLENGES.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setGameOver(true);
      const finalScore = Math.max(0, 100 - mistakes * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative bg-amber-50 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between select-none" style={{ width, height }}>
      {/* Background scene */}
      <DesignStudioScene width={width} height={height} />

      {screen === 'teaching' ? (
        <TeachingScreen onStart={() => setScreen('play')} />
      ) : gameOver ? (
        <div className="flex flex-col items-center justify-center p-8 h-full text-center z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border-4 border-amber-300 max-w-md w-full">
            <span className="text-6xl mb-4 block">🏆</span>
            <h2 className="text-3xl font-black text-amber-900 mb-2">Pattern Master!</h2>
            <p className="text-gray-700 font-semibold mb-6">You completed all challenges with Designer Diya!</p>
            <div className="flex justify-center mb-6">
              <StarRow count={3} total={3} />
            </div>
            <button onClick={() => { setCurrentIndex(0); setGameOver(false); setMistakes(0); setScore(0); }} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black rounded-2xl shadow-lg transform active:scale-95 transition">
              Play Again 🔄
            </button>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Top Header Bar */}
          <div className="relative z-20 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur border-b border-amber-200 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-amber-800">Challenge {currentIndex + 1} / {CHALLENGES.length}</span>
              <StarRow count={Math.min(3, Math.floor(score / 25))} total={3} />
            </div>
            <div className="text-sm font-bold text-amber-900 bg-amber-100 px-4 py-1.5 rounded-full shadow-inner">
              Score: {score} 🌟
            </div>
          </div>

          {/* Mascot */}
          <DesignerDiya mood={mascotMood} speaking={mascotSpeech} />

          {/* Center Play Area */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-6">
            <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-xl border-4 border-amber-200 max-w-xl w-full flex flex-col items-center text-center">
              <h3 className="text-xl font-black text-gray-800 mb-6">{challenge.question}</h3>

              {challenge.type === 'identify' || challenge.type === 'graph_read' ? (
                <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick(opt)}
                      className="w-full py-4 px-6 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border-2 border-amber-300 rounded-2xl text-amber-900 font-bold shadow-md transition text-lg"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              ) : (
                /* Sort / Drag and Drop Challenge */
                <div className="relative w-full h-[260px]">
                  {/* Bins */}
                  {challenge.bins && (
                    <>
                      <SortBin label={challenge.bins[0].label} color={challenge.bins[0].color} x={40} y={130} width={220} height={110} isHovering={hoverBin === challenge.bins[0].id} />
                      <SortBin label={challenge.bins[1].label} color={challenge.bins[1].color} x={300} y={130} width={220} height={110} isHovering={hoverBin === challenge.bins[1].id} />
                    </>
                  )}

                  {/* Draggable items */}
                  {challenge.sortItems && (
                    <div className="flex justify-center gap-6 absolute top-2 left-0 right-0">
                      {challenge.sortItems.map((item, idx) => {
                        const isPlaced = placedItems[item.id] || false;
                        const startX = idx === 0 ? 120 : 340;
                        const startY = 10;
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
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}

      {/* Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Wonderful job! You mastered this pattern!" onComplete={advanceChallenge} />}
      {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)} />}
      {sparkles.map(s => (
        <SparkleBurst key={s.id} x={s.x} y={s.y} onComplete={() => setSparkles(prev => prev.filter(p => p.id !== s.id))} />
      ))}
    </div>
  );
}
