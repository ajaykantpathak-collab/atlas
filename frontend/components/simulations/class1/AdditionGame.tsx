'use client';
/**
 * AdditionGame - Learn addition and subtraction up to 20 in steps (ICSE Class 1 c1_math_010)
 *
 * CISCE Nodes: c1_math_010 (Addition and subtraction up to 20, in steps)
 * Enrichment: c1_maths_enrichment_part10.marker
 *
 * ELI5: Addition is putting two handfuls together and counting all of them -- 3 cubes
 * and 4 cubes become 7 cubes. Subtraction is starting with some things and giving
 * a few away -- 8 toffees minus 3 toffees leaves 5. A number line lets you hop
 * forward to add and hop backward to take away.
 *
 * Misconceptions (from enrichment):
 *   1. "Adding always makes a bigger number, so I just say any number that is bigger."
 *      → Correction: The sum must be the exact count of the combined group, not just any bigger number!
 *   2. "Subtraction means the answer is always 1, because I take away one thing."
 *      → Correction: Subtraction takes away the stated amount, not just one!
 *   3. "When I subtract, I can take away the bigger number from the smaller one."
 *      → Correction: At Class 1 we always start on the larger number and hop backward!
 *
 * Story: "Help Math Whiz Bunty solve addition and subtraction puzzles using mangoes,
 * toffees, and the number line! Show your steps and become a Math Champion!"
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
        title: 'What is Addition? ➕',
        text: 'Addition is putting two groups together and counting the total! Written with the plus (+) sign. The result is called the sum. Example: 3 mangoes and 4 mangoes make 7 mangoes! (3 + 4 = 7)',
        emoji: '🥭',
        bgColor: 'from-amber-400 to-orange-500',
        spoken: 'Addition is putting two groups together and counting the total! The result is called the sum.',
    },
    {
        title: 'Counting On the Number Line! 🔢',
        text: 'Stand on a number and hop FORWARD to add! If you stand on 3 and hop forward 4 steps, you land on 7! This is called "counting on". Always show your hops!',
        emoji: '🐸',
        bgColor: 'from-emerald-400 to-teal-500',
        spoken: 'Stand on a number and hop forward to add! This is called counting on.',
    },
    {
        title: 'What is Subtraction? ➖',
        text: 'Subtraction is taking away some objects from a group and counting what is left! Written with the minus (-) sign. The result is called the difference. Example: 8 toffees take away 3 leaves 5! (8 - 3 = 5)',
        emoji: '🍬',
        bgColor: 'from-rose-400 to-red-500',
        spoken: 'Subtraction is taking away some objects and counting what is left! The result is called the difference.',
    },
    {
        title: 'Counting Back on the Number Line! 🔙',
        text: 'Stand on the larger number and hop BACKWARD to subtract! If you stand on 8 and hop back 3 steps, you land on 5! This is called "counting back".',
        emoji: '🐇',
        bgColor: 'from-purple-400 to-indigo-500',
        spoken: 'Stand on the larger number and hop backward to subtract! This is called counting back.',
    },
    {
        title: 'Growing Up to 20! 🌟',
        text: 'We do the exact same thing with bigger numbers up to 20! 12 + 3 = 15 by hopping forward, and 15 - 4 = 11 by hopping backward. Always show your working steps!',
        emoji: '⭐',
        bgColor: 'from-blue-400 to-cyan-500',
        spoken: 'We do the exact same thing with bigger numbers up to 20! Always show your working steps.',
    },
];
// ─── Types ────────────────────────────────────────────────────
type ChallengeType = 'identify_add' | 'identify_sub' | 'identify_rule_add' | 'sort_add' | 'identify_rule_sub' | 'identify_zero' | 'sort_sub' | 'sort_mixed';
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
        emoji: string;
        correctBin: string;
    }[];
    bins?: {
        id: string;
        label: string;
        color: string;
    }[];
}
// ─── Challenges (8 progressive: easy → hard) ──────────────────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify_add',
        question: 'Bunty has 3 mangoes and gets 4 more mangoes. How many mangoes in all?',
        answer: '7',
        options: ['6', '7', '8'],
        hint: 'Combine 3 mangoes and 4 mangoes. Count them all: 1, 2, 3, 4, 5, 6, 7!',
        misconception: 'Addition is not just guessing any bigger number! You must combine the groups and count the total: 3 + 4 = 7.',
    },
    {
        type: 'identify_sub',
        question: 'Bunty has 8 toffees and gives 3 away. How many toffees are left?',
        answer: '5',
        options: ['4', '5', '6'],
        hint: 'Start with 8 toffees and take away 3. Count what is left: 5!',
        misconception: 'Subtraction does not always leave 1! When you take 3 away from 8, exactly 5 are left: 8 - 3 = 5.',
    },
    {
        type: 'identify_rule_add',
        question: 'On a number line, to ADD numbers, we hop...',
        answer: 'Forward (Counting on)',
        options: ['Forward (Counting on)', 'Backward (Counting back)', 'Sideways'],
        hint: 'When adding, numbers grow bigger, so we hop forward along the number line!',
        misconception: 'Hopping backward is for subtraction! To add, we hop forward to count on.',
    },
    {
        type: 'sort_add',
        question: 'Drag each addition fact to its correct sum!',
        answer: 'sort',
        options: [],
        hint: 'Count carefully or use the number line for each addition!',
        misconception: 'Do not guess random numbers. Add the parts carefully to find the exact sum!',
        sortItems: [
            { id: 'a1', label: '3 + 4 = ?', emoji: '🥭', correctBin: '7' },
            { id: 'a2', label: '5 + 5 = ?', emoji: '🍎', correctBin: '10' },
            { id: 'a3', label: '2 + 6 = ?', emoji: '🍬', correctBin: '8' },
            { id: 'a4', label: '9 + 3 = ?', emoji: '⭐', correctBin: '12' },
        ],
        bins: [
            { id: '7', label: 'Sum: 7', color: '#F59E0B' },
            { id: '8', label: 'Sum: 8', color: '#3B82F6' },
            { id: '10', label: 'Sum: 10', color: '#10B981' },
            { id: '12', label: 'Sum: 12', color: '#8B5CF6' },
        ],
    },
    {
        type: 'identify_rule_sub',
        question: 'On a number line, to SUBTRACT numbers, we hop...',
        answer: 'Backward (Counting back)',
        options: ['Forward (Counting on)', 'Backward (Counting back)', 'Upwards'],
        hint: 'When subtracting, we take away, so we hop backward from the larger number!',
        misconception: 'Hopping forward is for addition! To subtract, we hop backward to count back.',
    },
    {
        type: 'identify_zero',
        question: 'Bunty has 7 toffees and adds 0 more. How many toffees does he have?',
        answer: '7',
        options: ['0', '7', '8'],
        hint: 'Adding zero means adding nothing at all! The number stays the same.',
        misconception: 'Adding zero does not change the amount! 7 + 0 is still 7.',
    },
    {
        type: 'sort_sub',
        question: 'Drag each subtraction fact to its correct difference!',
        answer: 'sort',
        options: [],
        hint: 'Start at the first number and hop backward by the second number!',
        misconception: 'Always start with the larger number when subtracting in Class 1!',
        sortItems: [
            { id: 's1', label: '8 - 3 = ?', emoji: '🍬', correctBin: '5' },
            { id: 's2', label: '10 - 4 = ?', emoji: '🥭', correctBin: '6' },
            { id: 's3', label: '9 - 2 = ?', emoji: '🍎', correctBin: '7' },
            { id: 's4', label: '12 - 5 = ?', emoji: '⭐', correctBin: '7' },
        ],
        bins: [
            { id: '5', label: 'Diff: 5', color: '#EF4444' },
            { id: '6', label: 'Diff: 6', color: '#F59E0B' },
            { id: '7', label: 'Diff: 7', color: '#10B981' },
        ],
    },
    {
        type: 'sort_mixed',
        question: 'Drag each problem into Addition (+) or Subtraction (-) bin!',
        answer: 'sort',
        options: [],
        hint: 'Look at the sign: plus (+) means combine, minus (-) means take away!',
        misconception: 'Plus (+) joins groups together, while minus (-) takes objects away!',
        sortItems: [
            { id: 'm1', label: '3 + 4', emoji: '➕', correctBin: 'add' },
            { id: 'm2', label: '8 - 3', emoji: '➖', correctBin: 'sub' },
            { id: 'm3', label: '5 + 5', emoji: '➕', correctBin: 'add' },
            { id: 'm4', label: '10 - 4', emoji: '➖', correctBin: 'sub' },
        ],
        bins: [
            { id: 'add', label: 'Addition (+)', color: '#3B82F6' },
            { id: 'sub', label: 'Subtraction (-)', color: '#EF4444' },
        ],
    },
];
// ─── Math Whiz Bunty Mascot ───────────────────────────────────
function MathWhizBunty({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-300">
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
                ? { y: [0, -5, 0] }
                : { rotate: [0, 5, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="bunny-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A"/>
              <stop offset="100%" stopColor="#F59E0B"/>
            </linearGradient>
            <linearGradient id="cap-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6"/>
              <stop offset="100%" stopColor="#1D4ED8"/>
            </linearGradient>
          </defs>
          {/* Ears */}
          <ellipse cx="28" cy="18" rx="6" ry="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5"/>
          <ellipse cx="28" cy="18" rx="3" ry="12" fill="#F472B6"/>
          <ellipse cx="47" cy="18" rx="6" ry="16" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5"/>
          <ellipse cx="47" cy="18" rx="3" ry="12" fill="#F472B6"/>
          {/* Head */}
          <circle cx="37.5" cy="38" r="20" fill="url(#bunny-body)" stroke="#D97706" strokeWidth="1.5"/>
          {/* Wizard Cap */}
          <path d="M20 28 L55 28 L37.5 5 Z" fill="url(#cap-grad)" stroke="#1E40AF" strokeWidth="1.5"/>
          <ellipse cx="37.5" cy="28" rx="19" ry="4" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1"/>
          {/* Number on Cap */}
          <text x="37.5" y="20" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">+</text>
          {/* Eyes */}
          <circle cx="30" cy="36" r="3" fill="#1F2937"/>
          <circle cx="45" cy="36" r="3" fill="#1F2937"/>
          <circle cx="31" cy="35" r="1" fill="white"/>
          <circle cx="46" cy="35" r="1" fill="white"/>
          {/* Nose & Whiskers */}
          <ellipse cx="37.5" cy="42" rx="3" ry="2" fill="#EC4899"/>
          <line x1="24" y1="44" x2="33" y2="43" stroke="#92400E" strokeWidth="1"/>
          <line x1="24" y1="47" x2="33" y2="45" stroke="#92400E" strokeWidth="1"/>
          <line x1="51" y1="44" x2="42" y2="43" stroke="#92400E" strokeWidth="1"/>
          <line x1="51" y1="47" x2="42" y2="45" stroke="#92400E" strokeWidth="1"/>
          {/* Smile */}
          <path d="M34 47 Q37.5 51 41 47" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Body with Bow */}
          <path d="M25 58 C25 54, 50 54, 50 58 L52 82 C52 85, 23 85, 23 82 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5"/>
          <circle cx="37.5" cy="65" r="3" fill="#FBBF24"/>
          <circle cx="37.5" cy="73" r="3" fill="#FBBF24"/>
          {/* Pencil behind ear */}
          <line x1="52" y1="25" x2="62" y2="15" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round"/>
          <polygon points="62,15 65,12 63,17" fill="#EF4444"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Reward Row ──────────────────────────────────────────
function StarRow({ count, total }: {
    count: number;
    total: number;
}) {
    return (<div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (<motion.div key={i} initial={false} animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Custom SVG Scene Background ──────────────────────────────
function MathSceneBackground({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 40%, #7DD3FC 70%, #38BDF8 100%)' }}/>
      {/* Floating Plus & Minus Signs */}
      <motion.div className="absolute top-10 left-12 text-blue-500 opacity-25 font-bold text-4xl" animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        +
      </motion.div>
      <motion.div className="absolute top-16 left-36 text-rose-500 opacity-25 font-bold text-4xl" animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        -
      </motion.div>
      <motion.div className="absolute top-8 right-24 text-emerald-600 opacity-25 font-bold text-4xl" animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity }}>
        =
      </motion.div>
      {/* Ground & Number Line Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #22C55E 40%, #16A34A 100%)' }}/>
      {/* Number Line on Ground */}
      <div className="absolute bottom-10 left-10 right-10 h-8 flex items-center justify-between px-4 bg-emerald-100 rounded-lg border-2 border-emerald-600 opacity-80">
        {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map(n => (<div key={n} className="flex flex-col items-center">
            <div className="w-1 h-2 bg-emerald-700"/>
            <span className="text-xs font-bold text-emerald-900">{n}</span>
          </div>))}
      </div>
    </div>);
}
// ─── Topic-Specific SVG Objects ───────────────────────��───────
function MangoIcon({ size = 45 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 C10 15, 5 30, 15 40 C22 47, 35 45, 40 35 C45 25, 40 10, 25 5 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
      <path d="M25 5 Q30 2, 35 8" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="32" cy="18" rx="3" ry="5" fill="#FDE68A" opacity="0.6"/>
    </svg>);
}
function ToffeeIcon({ size = 45 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="5,25 15,18 15,32" fill="#EC4899"/>
      <polygon points="45,25 35,18 35,32" fill="#EC4899"/>
      <rect x="15" y="17" width="20" height="16" fill="#8B5CF6" rx="4" stroke="#6D28D9" strokeWidth="1.5"/>
      <circle cx="25" cy="25" r="5" fill="#C4B5FD" opacity="0.7"/>
    </svg>);
}
function AppleIcon({ size = 45 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 10 C15 5, 5 20, 10 32 C15 42, 35 42, 40 32 C45 20, 35 5, 25 10 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M25 10 Q28 2, 33 5" stroke="#15803D" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>);
}
// ─── Sort Card & Bin ──────────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('mango'))
        return <MangoIcon size={size}/>;
    if (id.includes('toffee'))
        return <ToffeeIcon size={size}/>;
    if (id.includes('apple'))
        return <AppleIcon size={size}/>;
    if (id.includes('add'))
        return <MangoIcon size={size}/>;
    if (id.includes('sub'))
        return <ToffeeIcon size={size}/>;
    if (id.includes('a1'))
        return <MangoIcon size={size}/>;
    if (id.includes('a2'))
        return <MangoIcon size={size}/>;
    if (id.includes('a3'))
        return <AppleIcon size={size}/>;
    if (id.includes('a4'))
        return <AppleIcon size={size}/>;
    if (id.includes('m1'))
        return <ToffeeIcon size={size}/>;
    if (id.includes('m2'))
        return <ToffeeIcon size={size}/>;
    if (id.includes('s1'))
        return <ToffeeIcon size={size}/>;
    if (id.includes('s2'))
        return <ToffeeIcon size={size}/>;
    if (id.includes('s3'))
        return <AppleIcon size={size}/>;
    if (id.includes('s4'))
        return <AppleIcon size={size}/>;
    return null;
}
function SortCard({ id, label, emoji, x, y, placed, onDragStart, onDragEnd }: {
    id: string;
    label: string;
    emoji: string;
    x: number;
    y: number;
    placed: boolean;
    onDragStart: (id: string) => void;
    onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl ${placed ? 'opacity-30' : 'bg-white border-2 border-amber-300'} px-2 py-1`}>
        <span className="text-3xl">{emoji}</span>
        <span className="text-sm font-black text-gray-800 text-center">{label}</span>
      </div>
    </Draggable>);
}

function SortBin({ id, label, color, x, y, width, height, isHovering }: {
    id: string;
    label: string;
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
    isHovering: boolean;
}) {
  return (
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all shadow-md ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}25`, boxShadow: isHovering ? `0 0 25px ${color}` : 'none' }}>
      {renderSortIcon(id, 48)}
      <span className="text-sm font-black text-center px-2" style={{ color }}>{label}</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {
    audioManager.play('tap');
    if (slide < total - 1) {
      setSlide(s => s + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (slide > 0) {
      setSlide(s => s - 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 select-none" style={{ width, height }}>
      <MathSceneBackground width={width} height={height}/>
      <MathWhizBunty mood="happy" speaking={current.spoken}/>

      <div className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-amber-300 flex flex-col items-center mt-6">
        {/* Progress dots */}
        <div className="flex gap-2 mb-4">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-amber-500 scale-125' : 'bg-gray-300'}`}/>))}
        </div>

        <div className="text-5xl mb-3">{current.emoji}</div>
        <h2 className="text-2xl font-black text-amber-700 mb-2 text-center">{current.title}</h2>
        <p className="text-base text-gray-700 text-center font-medium leading-relaxed mb-6 px-4">{current.text}</p>

        <div className="flex justify-between w-full px-4">
          <button onClick={handlePrev} disabled={slide === 0} className={`px-5 py-2.5 rounded-2xl font-bold text-white shadow-md transition-all ${slide === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 active:scale-95'}`}>
            Previous
          </button>
          <button onClick={handleNext} className="px-8 py-2.5 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg active:scale-95 transition-all text-lg">
            {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface AdditionGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AdditionGame({width = 720, height = 560, onComplete}: AdditionGameProps) {
  const [gameScreen, setGameScreen] = useState<'teaching' | 'play'>('teaching');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Bunty! Let us learn addition and subtraction together!');
  const [showHint, setShowHint] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{x: number; y: number} | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Sort challenge state
  const [sortState, setSortState] = useState<{[id: string]: {placed: boolean; binId?: string}}>({});
  const [dragHoverBin, setDragHoverBin] = useState<string | null>(null);

  // Inactivity Timer for Auto-Hint
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
      setMascotSpeech('Need a little help? Read the hint below!');
      speechManager.speak('Need a little help? Read the hint below!');
      setMascotMood('thinking');
    }, 10000);
  }, []);

  useEffect(() => {
    if (gameScreen === 'play' && !isGameOver) {
      resetInactivityTimer();
    }
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, gameScreen, isGameOver, resetInactivityTimer]);

  // Initialize sort items when challenge changes
  const currentChallenge = CHALLENGES[challengeIdx];

  useEffect(() => {
    if (currentChallenge.type.startsWith('sort') && currentChallenge.sortItems) {
      const initial: {[id: string]: {placed: boolean}} = {};
      currentChallenge.sortItems.forEach(item => {
        initial[item.id] = { placed: false };
      });
      setSortState(initial);
    }
    setShowHint(false);
    setMascotSpeech(currentChallenge.question);
    speechManager.speak(currentChallenge.question);
    setMascotMood('happy');
  }, [challengeIdx, currentChallenge]);

  // Handle Multiple Choice Answer
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setStars(s => s + 1);
      setSparklePos({x: width / 2, y: height / 2});
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right! 🎉');
      speechManager.speak('Fantastic! You got it right! 🎉');
      setSuccessMessage('Correct! Great math thinking!');
      setShowSuccessBanner(true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setShowHint(true);
    }
  };

  // Handle Drag & Drop
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    // Check which bin x, y falls into
    let targetBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      // Approximate bin positions based on index
      // We will define bin layout dynamically in render
      const binWidth = 140;
      const binHeight = 110;
      // Simple bounding box check (we pass estimated coordinates during render)
    });

    // Fallback: check drop zone coordinates
    // Let's use a robust coordinate matcher based on drop zones
    const droppedBin = currentChallenge.bins.find(bin => {
      // Bins are positioned across the screen
      return true; // Simplified for robust drop target matching
    });

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item || !droppedBin) return false;

    // Find correct bin from item.correctBin
    // Let's match based on drop coordinates relative to bins
    const targetBin = currentChallenge.bins.find(bin => {
      // Check if (x, y) is inside bin area
      // Bins are typically centered around y = 250-350
      return Math.abs(y - 300) <= 120 && Math.abs(x - (currentChallenge.bins!.indexOf(bin) * 160 + 150)) <= 100;
    });

    if (targetBin && targetBin.id === item.correctBin) {
      audioManager.play('drop-correct');
      setSortState(prev => ({...prev, [id]: {placed: true, binId: targetBin.id}}));

      // Check if all sort items are placed
      const updatedSortState = {...sortState, [id]: {placed: true, binId: targetBin.id}};
      const allPlaced = currentChallenge.sortItems.every(i => updatedSortState[i.id]?.placed);

      if (allPlaced) {
        audioManager.play('success');
        setStars(s => s + 1);
        setSparklePos({x: width / 2, y: height / 2});
        setMascotMood('celebrate');
        setMascotSpeech('All sorted correctly! You are a Math Wizard! 🌟');
        speechManager.speak('All sorted correctly! You are a Math Wizard! 🌟');
        setSuccessMessage('Wonderful sorting! Perfect score!');
        setShowSuccessBanner(true);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setShowHint(true);
      return false;
    }
  };

  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(c => c + 1);
    } else {
      setIsGameOver(true);
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('You completed all math challenges! You are a Math Champion! 🏆');
      speechManager.speak('You completed all math challenges! You are a Math Champion! 🏆');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  if (gameScreen === 'teaching') {
    return <TeachingScreen onStart={() => setGameScreen('play')} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-4 select-none overflow-hidden font-sans" style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}>
      <MathSceneBackground width={width} height={height}/>
      <MathWhizBunty mood={mascotMood} speaking={mascotSpeech}/>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border-2 border-amber-300">
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-xl">
            Challenge {challengeIdx + 1} / {CHALLENGES.length}
          </span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <div className="text-sm font-bold text-gray-700">
          Errors: <span className="text-rose-500 font-black">{errors}</span>
        </div>
      </div>

      {/* Main Challenge Area */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-2xl my-2">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-amber-300 w-full flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-black text-amber-800 text-center mb-6 px-2 leading-snug">
            {currentChallenge.question}
          </h2>

          {/* Multiple Choice Options */}
          {!currentChallenge.type.startsWith('sort') && (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
              {currentChallenge.options.map((opt, idx) => (<motion.button key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswerSelect(opt)} className="py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-lg shadow-lg hover:from-amber-500 hover:to-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-amber-200">
                  <span>{opt}</span>
                </motion.button>))}
            </div>)}

          {/* Sort Challenge Layout */}
          {currentChallenge.type.startsWith('sort') && currentChallenge.sortItems && currentChallenge.bins && (<div className="relative w-full h-[280px] flex justify-center items-center">
              {/* Bins across bottom */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4">
                {currentChallenge.bins.map((bin, i) => (<SortBin key={bin.id} id={bin.id} label={bin.label} color={bin.color} x={i * (width / currentChallenge.bins!.length) + 10} y={160} width={130} height={90} isHovering={dragHoverBin === bin.id}/>))}
              </div>

              {/* Draggable items across top */}
              <div className="absolute top-2 left-0 right-0 flex justify-around px-4">
                {currentChallenge.sortItems.map((item, i) => {
                const placed = sortState[item.id]?.placed || false;
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={i * 120 + 30} y={20} placed={placed} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
              </div>
            </div>)}
        </div>
      </div>

      {/* Hint Bubble */}
      {showHint && (<HintBubble message={currentChallenge.hint} onComplete={() => setShowHint(false)}/>)}

      {/* Success Banner */}
      {showSuccessBanner && (<SuccessBanner message={successMessage} onComplete={handleNextChallenge}/>)}

      {/* Sparkle Burst */}
      {sparklePos && (<SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}

      {/* Confetti on Game Over */}
      {showConfetti && (<Confetti onComplete={() => setShowConfetti(false)}/>)}

      {/* Game Over Modal */}
      {isGameOver && (<div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-amber-400 flex flex-col items-center text-center">
            <span className="text-6xl mb-4">👑</span>
            <h2 className="text-3xl font-black text-amber-700 mb-2">Math Champion!</h2>
            <p className="text-gray-600 font-medium mb-6">
              You mastered addition and subtraction up to 20 like a true wizard!
            </p>
            <div className="flex gap-2 mb-6">
              <StarRow count={stars} total={CHALLENGES.length}/>
            </div>
            <button onClick={() => {
                setGameScreen('teaching');
                setChallengeIdx(0);
                setStars(0);
                setErrors(0);
                setIsGameOver(false);
            }} className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-xl text-lg active:scale-95 transition-all">
              Play Again 🔄
            </button>
          </motion.div>
        </div>)}
    </div>
  );
}
