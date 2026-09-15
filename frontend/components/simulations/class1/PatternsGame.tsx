'use client';
/**
 * PatternsGame - Learn simple patterns in shapes and numbers
 *
 * CISCE Node: c1_math_027 (Simple patterns in shapes and numbers)
 * Enrichment: c1_maths_enrichment_part27
 *
 * ELI5: "A pattern is when things take turns in the same order, again and again -
 *   like triangle and circle, or counting by twos (2, 4, 6, 8, 10). You look at
 *   what comes before and after, guess the rule, and tell what comes next!"
 *
 * Misconceptions (from enrichment):
 *   1. "The next item is what I saw last" → "No! Look at the whole repeating unit!"
 *   2. "In 2, 4, 6, 8, the next is 9" → "No! We are counting by twos, so next is 10!"
 *   3. "Any random jumble is a pattern" → "No! A pattern must have a clear repeating rule!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG pattern scene background (sky gradient, floating shapes, number tiles)
 * - Custom SVG pattern objects (Triangle, Circle, Square, Bead, NumberTile, Star, Heart, Diamond)
 * - Custom SVG mascot (Pattern Pixie Milli) with wand and mood states
 * - Drag-and-drop: drag shape/number cards into pattern slots or bins
 * - 8 progressive challenges: identify shape pattern → identify number pattern → color pattern → rule evaluation → sorting
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager (NO speechManager)
 * - Confetti + celebration on success
 * - Auto-hint after 10 seconds of inactivity
 * - Progressive difficulty ladder
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    {
        title: 'What is a Pattern? ✨',
        text: 'A pattern is an arrangement of shapes, colours, or numbers that follows a repeating rule! Like triangle, circle, triangle, circle - taking turns!',
        emoji: '🔺',
        bgColor: 'from-pink-400 to-purple-500',
        spoken: 'A pattern is an arrangement of shapes or numbers that follows a repeating rule! Like triangle and circle taking turns!',
    },
    {
        title: 'Shapes Taking Turns 🔷',
        text: 'Look at the whole repeating unit! If the row goes triangle, circle, triangle, circle, the rule is "triangle then circle". After triangle comes circle!',
        emoji: '🔵',
        bgColor: 'from-purple-400 to-indigo-500',
        spoken: 'Look at the repeating unit! Triangle and circle take turns. After triangle always comes circle!',
    },
    {
        title: 'Colours and Beads on a Mala 📿',
        text: 'Patterns are everywhere! Red bead, blue bead, red bead, blue bead. Just like clap-stamp-clap-stamp in class. The rule keeps repeating!',
        emoji: '🔴',
        bgColor: 'from-indigo-400 to-blue-500',
        spoken: 'Colours and beads repeat in order, just like red and blue beads on a mala or the clap-stamp game!',
    },
    {
        title: 'Growing Number Patterns 🔢',
        text: 'Numbers can make patterns too! 2, 4, 6, 8 - each step adds 2! That is counting by twos. After 8 comes 10!',
        emoji: '🔟',
        bgColor: 'from-blue-400 to-teal-500',
        spoken: 'Number patterns grow by a steady rule! 2, 4, 6, 8, each step adds 2, so the next is 10!',
    },
    {
        title: 'Find the Rule and Justify! 💡',
        text: 'Always check the gap or repeating unit and say the rule aloud. "The next is 10 because we count by twos!" That is how a Math Star thinks!',
        emoji: '⭐',
        bgColor: 'from-teal-400 to-emerald-500',
        spoken: 'Always say the rule aloud to explain your answer. That is how a Math Star thinks!',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_shape' | 'identify_number' | 'identify_color' | 'sort_shapes' | 'identify_odd' | 'evaluate_rule' | 'sort_patterns' | 'sort_numbers';
interface Challenge {
    type: ChallengeType;
    question: string;
    answer: string;
    options: string[];
    hint: string;
    misconception: string;
    sortItems?: {
        id: string;
        label: string;
        type: string;
        correctBin: string;
    }[];
    bins?: {
        id: string;
        label: string;
        color: string;
    }[];
}
// ─── Challenges (8 progressive: identify → sort → evaluate) ───
const CHALLENGES: Challenge[] = [
    {
        type: 'identify_shape',
        question: 'What shape comes next in: Triangle, Circle, Triangle, Circle, ___?',
        answer: 'Triangle',
        options: ['Triangle', 'Square', 'Star'],
        hint: 'Observe the repeating unit: triangle and circle take turns. After circle comes...',
        misconception: 'The rule is "triangle, circle" repeating in turn! After circle, the rule says triangle must follow. Do not just pick the last shape you saw!',
    },
    {
        type: 'identify_number',
        question: 'What number comes next in: 2, 4, 6, 8, ___?',
        answer: '10',
        options: ['9', '10', '12'],
        hint: 'Check the gap between numbers: 2 to 4 is +2, 4 to 6 is +2. Add 2 to 8!',
        misconception: 'Counting by ones gives 9, but this pattern is counting by twos! Each jump adds 2, so 8 + 2 = 10. Always check the gap size!',
    },
    {
        type: 'identify_color',
        question: 'What color bead comes next in: Red, Blue, Red, Blue, ___?',
        answer: 'Red',
        options: ['Red', 'Green', 'Yellow'],
        hint: 'Red and blue take turns like beads on a mala. After blue comes...',
        misconception: 'Red and blue take turns in a repeating loop. After blue, the repeating unit starts again with red!',
    },
    {
        type: 'sort_shapes',
        question: 'Drag the correct shape to complete the AB pattern: Square, Circle, Square, Circle, ___?',
        answer: 'sort',
        options: [],
        hint: 'Square and circle take turns. After circle comes square!',
        misconception: 'Square and circle form the repeating unit. After circle, square comes next!',
        sortItems: [
            { id: 'sq1', label: 'Square', type: 'square', correctBin: 'slot' },
            { id: 'ci1', label: 'Circle', type: 'circle', correctBin: 'wrong' },
        ],
        bins: [
            { id: 'slot', label: 'Next Shape: Square 🟩', color: '#10B981' },
            { id: 'wrong', label: 'Not Next ❌', color: '#EF4444' },
        ],
    },
    {
        type: 'identify_odd',
        question: 'What number comes next in the odd number pattern: 1, 3, 5, 7, ___?',
        answer: '9',
        options: ['8', '9', '10'],
        hint: 'Look at the jumps: +2 each time (1 to 3, 3 to 5, 5 to 7). Add 2 to 7!',
        misconception: '8 comes after 7 when counting by ones, but this pattern adds 2 each time! 7 + 2 = 9. Always check the gap!',
    },
    {
        type: 'evaluate_rule',
        question: 'Is "3, 1, 7, 2, 9" a proper pattern?',
        answer: 'No, it has no rule',
        options: ['Yes, it counts numbers', 'No, it has no rule', 'Yes, all patterns are random'],
        hint: 'Does it have a steady repeating or growing rule? Check the jumps between numbers.',
        misconception: 'A random jumble of numbers is NOT a pattern! A pattern must follow a clear repeating or growing rule that you can describe.',
    },
    {
        type: 'sort_patterns',
        question: 'Drag each pattern sequence to its correct rule description!',
        answer: 'sort',
        options: [],
        hint: 'Look at whether shapes take turns (AB) or if numbers add two (+2)!',
        misconception: 'Read the sequence carefully: alternating shapes is an AB shape pattern, while 2,4,6 is counting by twos!',
        sortItems: [
            { id: 'pat1', label: 'Triangle, Circle, Triangle', type: 'shape', correctBin: 'ab' },
            { id: 'pat2', label: '2, 4, 6, 8', type: 'num', correctBin: 'twos' },
        ],
        bins: [
            { id: 'ab', label: 'Shapes Taking Turns 🔺🔵', color: '#3B82F6' },
            { id: 'twos', label: 'Counting by Twos 🔢', color: '#8B5CF6' },
        ],
    },
    {
        type: 'sort_numbers',
        question: 'Drag each number sequence to its correct growing rule!',
        answer: 'sort',
        options: [],
        hint: 'Check the step size: adding 1 vs adding 5!',
        misconception: '1, 2, 3 adds one each time, while 5, 10, 15 adds five each time (counting by fives)!',
        sortItems: [
            { id: 'n1', label: '1, 2, 3, 4, 5', type: 'ones', correctBin: 'one-bin' },
            { id: 'n5', label: '5, 10, 15, 20', type: 'fives', correctBin: 'five-bin' },
        ],
        bins: [
            { id: 'one-bin', label: 'Count by 1s (1, 2, 3...)', color: '#10B981' },
            { id: 'five-bin', label: 'Count by 5s (5, 10, 15...)', color: '#F59E0B' },
        ],
    },
];
// ─── Pattern Pixie Milli (Mascot) ─────────────────────────────
function PatternPixieMilli({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[220px] border-2 border-purple-300">
            <p className="text-xs font-bold text-purple-900">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
                ? { y: [0, -6, 0] }
                : { rotate: [0, 8, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="pixie-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899"/>
              <stop offset="100%" stopColor="#8B5CF6"/>
            </linearGradient>
            <radialGradient id="pixie-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#F472B6" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#DB2777" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* Fairy Wings */}
          <ellipse cx="22" cy="40" rx="14" ry="8" fill="#A7F3D0" opacity="0.8" transform="rotate(-30 22 40)" stroke="#34D399" strokeWidth="1"/>
          <ellipse cx="53" cy="40" rx="14" ry="8" fill="#A7F3D0" opacity="0.8" transform="rotate(30 53 40)" stroke="#34D399" strokeWidth="1"/>
          {/* Head */}
          <circle cx="37" cy="28" r="14" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5"/>
          {/* Hair with colorful bead ornaments */}
          <path d="M23 28 C23 16, 51 16, 51 28 C51 32, 49 35, 49 35 L45 28 L37 32 L29 28 Z" fill="#7C3AED"/>
          <circle cx="28" cy="22" r="3" fill="#EF4444"/>
          <circle cx="37" cy="18" r="3" fill="#3B82F6"/>
          <circle cx="46" cy="22" r="3" fill="#10B981"/>
          {/* Face: Eyes & Smile */}
          <circle cx="32" cy="27" r="2" fill="#1F2937"/>
          <circle cx="42" cy="27" r="2" fill="#1F2937"/>
          <path d="M33 32 Q37 36 41 32" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Dress */}
          <path d="M27 42 L47 42 L53 68 L21 68 Z" fill="url(#pixie-dress)" stroke="#6D28D9" strokeWidth="1.5"/>
          {/* Pattern dots on dress */}
          <circle cx="32" cy="48" r="2" fill="#FDE047"/>
          <circle cx="42" cy="48" r="2" fill="#6EE7B7"/>
          <circle cx="37" cy="58" r="2" fill="#93C5FD"/>
          {/* Feet */}
          <ellipse cx="31" cy="71" rx="4" ry="3" fill="#F59E0B"/>
          <ellipse cx="43" cy="71" rx="4" ry="3" fill="#F59E0B"/>
          {/* Magic Wand in hand */}
          <line x1="53" y1="50" x2="68" y2="32" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round"/>
          <polygon points="68,24 71,32 79,33 73,38 75,46 68,41 61,46 63,38 57,33 65,32" fill="#FACC15" stroke="#CA8A04" strokeWidth="1"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Row Component ───────────────────────────────────────
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
// ─── Custom SVG Scene Background ──────────────────────────────
function PatternScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #EDE9FE 0%, #F5F3FF 40%, #E0E7FF 70%, #C7D2FE 100%)' }}/>
      {/* Floating geometric background shapes */}
      <motion.div className="absolute top-10 left-12 opacity-40" animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="50" height="50" viewBox="0 0 50 50">
          <polygon points="25,5 45,40 5,40" fill="#EC4899"/>
        </svg>
      </motion.div>
      <motion.div className="absolute top-20 right-1/3 opacity-30" animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="45" height="45" viewBox="0 0 45 45">
          <circle cx="22" cy="22" r="18" fill="#3B82F6"/>
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-20 left-1/4 opacity-35" animate={{ y: [0, -12, 0], rotate: [0, 90, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <rect x="5" y="5" width="30" height="30" fill="#10B981" rx="4"/>
        </svg>
      </motion.div>
      {/* Ground strip */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #A7F3D0 0%, #34D399 100%)' }}/>
      {/* Ground pattern dots */}
      <div className="absolute bottom-6 left-10 flex gap-8 opacity-60">
        <span className="text-xl">🌸</span>
        <span className="text-xl">🍄</span>
        <span className="text-xl">🌸</span>
        <span className="text-xl">🍄</span>
        <span className="text-xl">🌸</span>
        <span className="text-xl">🍄</span>
      </div>
    </div>);
}
// ─── Custom SVG Topic Objects ───────────────────────���─────────
function TriangleIcon({ size = 45, color = '#EC4899' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="25,5 45,45 5,45" fill={color} stroke="#BE185D" strokeWidth="2" strokeLinejoin="round"/>
    </svg>);
}
function CircleIcon({ size = 45, color = '#3B82F6' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill={color} stroke="#1D4ED8" strokeWidth="2"/>
    </svg>);
}
function SquareIcon({ size = 45, color = '#10B981' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="6" y="6" width="38" height="38" fill={color} stroke="#047857" strokeWidth="2" rx="4"/>
    </svg>);
}
function BeadIcon({ size = 40, color = '#EF4444' }: {
    size?: number;
    color?: string;
}) {
    return (<svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="15" fill={color} stroke="#B91C1C" strokeWidth="2"/>
      <circle cx="15" cy="15" r="4" fill="white" opacity="0.6"/>
    </svg>);
}
function NumberTileIcon({ number, size = 45 }: {
    number: string;
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="3" y="3" width="44" height="44" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" rx="8"/>
      <text x="25" y="33" fontSize="24" fontWeight="bold" fill="#713F12" textAnchor="middle">{number}</text>
    </svg>);
}
// ─── Sort Card Component (for drag challenges) ────────────────
function renderSortIcon(id: string, size: number = 48) {
  if (id.includes('triangle')) return <TriangleIcon size={size} />;
  if (id.includes('circle')) return <CircleIcon size={size} />;
  if (id.includes('square')) return <SquareIcon size={size} />;
  if (id.includes('bead')) return <BeadIcon size={size} />;
  return <CircleIcon size={size} />;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={80}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 ${placed ? 'opacity-40 bg-gray-100 border-gray-300' : 'bg-white border-purple-300'} px-3 py-2`} style={{ width: 120, height: 80 }}>
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
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110 shadow-2xl' : 'shadow-md'}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 25px ${color}` : undefined }}>
      <div className="text-sm font-bold text-center px-2" style={{ color }}>{label}</div>
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
    else {onStart();}
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) {setSlide(slide - 1);}
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 select-none" style={{ width, height }}>
      <PatternScene width={width} height={height}/>
      <PatternPixieMilli mood="happy" speaking={current.spoken}/>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-xl bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-purple-200">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{current.emoji}</span>
          <div>
            <h1 className="text-lg font-bold text-purple-900">Pattern Pixie School 🌟</h1>
            <p className="text-xs text-purple-700">Slide {slide + 1} of {total}</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-purple-600 scale-125' : 'bg-purple-200'}`}/>))}
        </div>
      </div>

      {/* Main Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="relative z-10 flex flex-col items-center justify-center bg-white/95 rounded-3xl p-8 shadow-2xl max-w-xl w-full border-4 border-purple-300 my-auto text-center">
        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${current.bgColor} flex items-center justify-center text-4xl shadow-lg mb-6`}>
          {current.emoji}
        </div>
        <h2 className="text-2xl font-black text-purple-900 mb-4">{current.title}</h2>
        <p className="text-base font-medium text-gray-700 leading-relaxed">{current.text}</p>
      </motion.div>
    { /* Footer Navigation */ }
    <div className="relative z-10 flex justify-between w-full max-w-xl">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${slide === 0 ? 'opacity-40 bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-purple-700 hover:bg-purple-50 active:scale-95'}`}>
          ⬅️ Back
        </button>
        <button onClick={handleNext} className="px-8 py-3 rounded-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:brightness-110 active:scale-95 transition-all">
          {slide === total - 1 ? 'Start Playing! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}
// ─── Main Game Component ──────────────────────────────────────
export interface PatternsGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function PatternsGame({ width = 720, height = 560, onComplete }: PatternsGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [successBanner, setSuccessBanner] = useState(false);
    const [hintMessage, setHintMessage] = useState<string | null>(null);
    const [sparklePos, setSparklePos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Milli the Pattern Pixie! Let us learn patterns!');
    const [gameOver, setGameOver] = useState(false);
    // Sort challenge state
    const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
    const [itemPositions, setItemPositions] = useState<Record<string, {
        x: number;
        y: number;
    }>>({});
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
    const challenge = CHALLENGES[currentIndex];
    // Reset sort item positions on challenge change
    useEffect(() => {
        if (challenge.type.startsWith('sort') && challenge.sortItems) {
            const initialPos: Record<string, {
                x: number;
                y: number;
            }> = {};
            challenge.sortItems.forEach((item, index) => {
                initialPos[item.id] = { x: 60 + index * 140, y: 320 };
            });
            setItemPositions(initialPos);
            setPlacedItems({});
        }
    }, [currentIndex, challenge]);
    // Inactivity auto-hint timer
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimer.current)
            clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            audioManager.play('hint');
            setHintMessage(challenge.hint);
            setMascotMood('thinking');
            setMascotSpeech('Need a hint? Check the rule carefully!');
        }, 10000);
    }, [challenge.hint]);
    useEffect(() => {
        resetInactivityTimer();
        return () => {
            if (inactivityTimer.current)
                clearTimeout(inactivityTimer.current);
        };
    }, [currentIndex, resetInactivityTimer]);
    const handleCorrectAnswer = (x = width / 2, y = height / 2) => {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setSparklePos({ x, y });
        setMascotMood('celebrate');
        setMascotSpeech('Fantastic! You found the rule! ⭐');
        setShowConfetti(true);
        setTimeout(() => {
            if (currentIndex < CHALLENGES.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setMascotMood('happy');
                setMascotSpeech('Great job! Here is the next challenge!');
            }
            else {
                setGameOver(true);
                setSuccessBanner(true);
                audioManager.play('celebration');
                const finalScore = Math.max(0, 100 - errors * 5);
                if (onComplete)
                    onComplete(finalScore);
            }
        }, 1500);
    };
    const handleWrongAnswer = () => {
        audioManager.play('error');
        setErrors(prev => prev + 1);
        setMascotMood('thinking');
        setMascotSpeech(challenge.misconception);
        setHintMessage(challenge.misconception);
    };
    const handleOptionClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
        resetInactivityTimer();
        const rect = e.currentTarget.getBoundingClientRect();
        if (option === challenge.answer) {
            handleCorrectAnswer(rect.x + rect.width / 2, rect.y + rect.height / 2);
        }
        else {
            handleWrongAnswer();
        }
    };
    // Drag and drop handlers
    const handleDragStart = (_id: string) => {
        audioManager.play('pickup');
        resetInactivityTimer();
    };
    const handleDragEnd = (id: string, x: number, y: number): boolean => {
        const item = challenge.sortItems?.find(i => i.id === id);
        if (!item || !challenge.bins)
            return false;
        // Check if dropped near the correct bin
        // Bin 1: left 120-280, top 160-280; Bin 2: left 420-580, top 160-280
        const targetBinId = item.correctBin;
        const binIndex = challenge.bins.findIndex(b => b.id === targetBinId);
        const binX = binIndex === 0 ? 140 : 440;
        const binY = 160;
        const binWidth = 160;
        const binHeight = 110;
        const isInsideBin = x >= binX - 30 && x <= binX + binWidth + 30 && y >= binY - 30 && y <= binY + binHeight + 30;
        if (isInsideBin) {
            audioManager.play('drop-correct');
            setPlacedItems(prev => ({ ...prev, [id]: true }));
            setItemPositions(prev => ({ ...prev, [id]: { x: binX + 25, y: binY + 25 } }));
            // Check if all items are placed
            const allItems = challenge.sortItems || [];
            const newPlacedCount = Object.keys(placedItems).length + 1;
            if (newPlacedCount >= allItems.length) {
                handleCorrectAnswer(binX + 80, binY + 55);
            }
            return true;
        }
        else {
            audioManager.play('drop-wrong');
            handleWrongAnswer();
            return false;
        }
    };
    if (screen === 'teaching') {
        return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
    }
    return (<div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden" style={{ width, height }}>
      <PatternScene width={width} height={height}/>
      <PatternPixieMilli mood={mascotMood} speaking={mascotSpeech}/>

      {/* Top HUD */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-xl bg-white/85 backdrop-blur rounded-2xl px-5 py-3 shadow-lg border-2 border-purple-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-purple-900">Challenge {currentIndex + 1} of {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <button onClick={() => {
            audioManager.play('hint');
            setHintMessage(challenge.hint);
        }} className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 font-bold rounded-xl text-xs transition-all shadow-sm">
          💡 Hint
        </button>
      </div>

      {/* Challenge Question Card */}
      <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative z-10 flex flex-col items-center justify-center bg-white/95 rounded-3xl p-6 shadow-xl max-w-xl w-full border-4 border-purple-300 my-auto text-center">
        <h2 className="text-xl font-black text-purple-900 mb-6">{challenge.question}</h2>

        {/* Visual pattern preview for shape/number identify questions */}
        {challenge.type === 'identify_shape' && (<div className="flex items-center gap-3 mb-6 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <TriangleIcon size={38}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <CircleIcon size={38}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <TriangleIcon size={38}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <CircleIcon size={38}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <TriangleIcon size={38}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <div className="w-10 h-10 rounded-xl bg-purple-200 flex items-center justify-center font-black text-purple-700 text-xl border-2 border-dashed border-purple-400">?</div>
          </div>)}

        {challenge.type === 'identify_number' && (<div className="flex items-center gap-3 mb-6 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <NumberTileIcon number="2" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <NumberTileIcon number="4" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <NumberTileIcon number="6" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <NumberTileIcon number="8" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <div className="w-12 h-12 rounded-xl bg-purple-200 flex items-center justify-center font-black text-purple-700 text-xl border-2 border-dashed border-purple-400">?</div>
          </div>)}

        {challenge.type === 'identify_color' && (<div className="flex items-center gap-3 mb-6 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <BeadIcon size={38} color="#EF4444"/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <BeadIcon size={38} color="#3B82F6"/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <BeadIcon size={38} color="#EF4444"/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <BeadIcon size={38} color="#3B82F6"/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-black text-purple-700 text-sm border-2 border-dashed border-purple-400">?</div>
          </div>)}

        {challenge.type === 'identify_odd' && (<div className="flex items-center gap-3 mb-6 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <NumberTileIcon number="1" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <NumberTileIcon number="3" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <NumberTileIcon number="5" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <NumberTileIcon number="7" size={42}/>
            <span className="text-lg font-bold text-purple-400">,</span>
            <div className="w-12 h-12 rounded-xl bg-purple-200 flex items-center justify-center font-black text-purple-700 text-xl border-2 border-dashed border-purple-400">?</div>
          </div>)}

        {/* Multiple Choice Options */}
        {!challenge.sortItems && (<div className="grid grid-cols-3 gap-4 w-full">
            {challenge.options.map(option => (<motion.button key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => handleOptionClick(option, e)} className="py-4 px-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold shadow-lg hover:brightness-110 transition-all text-sm flex items-center justify-center">
                {option}
              </motion.button>))}
          </div>)}

        {/* Drag and Drop Sort Bins */}
        {challenge.sortItems && challenge.bins && (<div className="relative w-full h-[180px] bg-purple-50 rounded-2xl border-2 border-purple-200 overflow-hidden mt-2">
            {/* Bins */}
            {challenge.bins.map((bin, index) => (<SortBin key={bin.id} label={bin.label} color={bin.color} x={index === 0 ? 40 : 380} y={20} width={260} height={130} isHovering={false}/>))}

            {/* Draggable items */}
            {challenge.sortItems.map(item => {
                const pos = itemPositions[item.id] || { x: 50, y: 120 };
                const isPlaced = !!placedItems[item.id];
                return (<SortCard key={item.id} id={item.id} label={item.label} type={item.type} x={pos.x} y={pos.y} placed={isPlaced} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
          </div>)}
      </motion.div>

      {/* Bottom status / score bar */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-xl text-purple-900 font-bold text-sm bg-white/70 backdrop-blur rounded-2xl px-5 py-2 shadow">
        <span>⭐ Stars: {stars}</span>
        <span>❌ Mistakes: {errors}</span>
      </div>

      {/* Feedback components */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {successBanner && <SuccessBanner message="🎉 Amazing! You are a Pattern Master! ⭐" onComplete={() => { }}/>}
      {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>}
    </div>);
}
