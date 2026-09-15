'use client';
/**
 * CountingGame - Numbers and numerals from 1 to 20
 *
 * CISCE Node: c1_math_001 (Numbers and numerals from 1 to 20)
 * Enrichment: c1_maths_enrichment_part1
 *
 * ELI5: "A number tells you how many things there are, like how many apples
 *   are in your basket. A numeral is the picture you write for that number,
 *   like 7 or 15. You can count real things by touching each one once, and
 *   tell which group has more!"
 *
 * Misconceptions (from enrichment):
 *   1. "A number and a numeral are the same thing" → "A number is the idea of
 *      how many; a numeral is the written symbol, like 7."
 *   2. "You can count in any order" → "Each object must be touched exactly once
 *      and paired with one number name in order!"
 *   3. "9 is bigger than 11 because 9 looks bigger than 1 and 1" → "11 is a two-digit
 *      number with a 1 in the tens place and comes after 9, so 11 is more!"
 *
 * Story: "Help Apple Lover Piku collect delicious red apples in her basket,
 *   count them one by one, and arrange number cards from 1 to 20!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG apple orchard background (sky, apple tree, rolling green hills)
 * - Custom SVG topic-specific visual components (Apple, AppleTree, Basket, NumberCard)
 * - Custom SVG Apple Lover Piku mascot with pigtails, basket, and mood states
 * - Drag-and-drop: drag number cards and apples into correct bins/positions
 * - 8 progressive challenges: count items → identify number → compare more/less → sort order
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity (10s)
 * - Progressive difficulty ladder
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'Numbers and Numerals 🍎', text: 'A number is the idea of how many things there are. A numeral is the written mark we use, like 7 or 15! Piku has 5 delicious red apples in her basket!', emoji: '🍎', bgColor: 'from-red-400 to-rose-500' },
    { title: 'Counting One by One 🖐️', text: 'When counting objects up to 20, touch each object exactly once and say the number names in order: one, two, three... up to twenty! Never skip or repeat a number!', emoji: '🔢', bgColor: 'from-emerald-400 to-teal-500' },
    { title: 'The Teen Numbers 🌟', text: 'Numbers from 11 to 20 have two digits! 11 has a 1 in the tens place and a 1 in the units place. They go: eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty!', emoji: '✨', bgColor: 'from-amber-400 to-orange-500' },
    { title: 'Which is More? ⚖️', text: 'On the number line, numbers further along are greater! 14 is more than 9 because 14 comes after 9. The plate with 14 apples has more than the plate with 9 apples!', emoji: '⚖️', bgColor: 'from-blue-400 to-indigo-500' },
    { title: 'Read the Whole Numeral! 🧠', text: 'Never judge a number by a single digit! 11 is more than 9 because eleven is a two-digit teen number that comes after nine on the number line. Always read the whole numeral!', emoji: '💡', bgColor: 'from-purple-400 to-pink-500' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_count' | 'identify_after' | 'identify_compare' | 'sort_sequence' | 'identify_teen' | 'identify_biggest' | 'sort_before_after' | 'sort_digits';
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
        icon: string;
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
        type: 'identify_count',
        question: 'Piku has a basket of apples. Count them: 1, 2, 3, 4, 5. How many apples are there?',
        answer: '5',
        options: ['4', '5', '6'],
        hint: 'Count each apple by touching it once: one, two, three, four, five!',
        misconception: 'Make sure to touch each object exactly once and say the number names in order without skipping! There are 5 apples!',
    },
    {
        type: 'identify_after',
        question: 'Which number comes right after 7 when counting?',
        answer: '8',
        options: ['6', '8', '9'],
        hint: 'Recite from 1: one, two, three, four, five, six, seven, eight!',
        misconception: 'Each number name is one more than the previous name. After 7 comes 8!',
    },
    {
        type: 'identify_compare',
        question: 'Which is MORE apples: 11 or 9?',
        answer: '11',
        options: ['9', '11', 'Same'],
        hint: 'Look at the number line: 11 comes after 9, so 11 is further along and greater!',
        misconception: 'A common mistake is thinking 9 looks bigger than two 1s. But 11 is a teen number that comes after 9, so 11 is more!',
    },
    {
        type: 'sort_sequence',
        question: 'Drag the number cards in correct order from 1 to 5!',
        answer: 'sort',
        options: [],
        hint: 'Start with 1, then 2, 3, 4, and 5!',
        misconception: 'Counting must follow the strict order: one, two, three, four, five. Place each number in its correct spot!',
        sortItems: [
            { id: 'num-3', label: '3', icon: 'three', correctBin: 'slot-3' },
            { id: 'num-1', label: '1', icon: 'one', correctBin: 'slot-1' },
            { id: 'num-4', label: '4', icon: 'four', correctBin: 'slot-4' },
            { id: 'num-2', label: '2', icon: 'two', correctBin: 'slot-2' },
            { id: 'num-5', label: '5', icon: 'five', correctBin: 'slot-5' },
        ],
        bins: [
            { id: 'slot-1', label: '1', color: '#EF4444' },
            { id: 'slot-2', label: '2', color: '#F59E0B' },
            { id: 'slot-3', label: '3', color: '#10B981' },
            { id: 'slot-4', label: '4', color: '#3B82F6' },
            { id: 'slot-5', label: '5', color: '#8B5CF6' },
        ],
    },
    {
        type: 'identify_teen',
        question: 'What is the number name for the numeral 15?',
        answer: 'Fifteen',
        options: ['Thirteen', 'Fifteen', 'Fifty'],
        hint: '15 is 1 ten and 5 units. Its name is fifteen!',
        misconception: 'Teen numbers eleven to twenty have special names that must be memorized: eleven, twelve, thirteen, fourteen, fifteen!',
    },
    {
        type: 'identify_biggest',
        question: 'Which of these numbers is the biggest?',
        answer: '20',
        options: ['12', '8', '20'],
        hint: 'Recite up to 20: 20 is the largest number in our set of numbers from 1 to 20!',
        misconception: '20 is two tens, which is the highest number in our Class 1 counting set from 1 to 20!',
    },
    {
        type: 'sort_before_after',
        question: 'Drag the number cards! Which numbers come BEFORE 5 and which come AFTER 5?',
        answer: 'sort',
        options: [],
        hint: 'Before 5: 3, 4. After 5: 6, 7!',
        misconception: 'Numbers before 5 are smaller (1, 2, 3, 4). Numbers after 5 are greater (6, 7, 8, 9, 10)!',
        sortItems: [
            { id: 'num-3', label: '3', icon: 'three', correctBin: 'before' },
            { id: 'num-7', label: '7', icon: 'seven', correctBin: 'after' },
            { id: 'num-2', label: '2', icon: 'two', correctBin: 'before' },
            { id: 'num-8', label: '8', icon: 'eight', correctBin: 'after' },
        ],
        bins: [
            { id: 'before', label: 'Before 5 (Smaller)', color: '#3B82F6' },
            { id: 'after', label: 'After 5 (Larger)', color: '#10B981' },
        ],
    },
    {
        type: 'sort_digits',
        question: 'Drag the numbers! Is it a single-digit number (1-9) or a teen number (11-20)?',
        answer: 'sort',
        options: [],
        hint: 'Single digits have one number symbol. Teens have two digits starting with 1!',
        misconception: 'Single-digit numbers are from 1 to 9. Teen numbers have a 1 in the tens place (11 to 20)!',
        sortItems: [
            { id: 's-7', label: '7', icon: 'seven', correctBin: 'single' },
            { id: 't-14', label: '14', icon: 'fourteen', correctBin: 'teen' },
            { id: 's-4', label: '4', icon: 'four', correctBin: 'single' },
            { id: 't-19', label: '19', icon: 'nineteen', correctBin: 'teen' },
        ],
        bins: [
            { id: 'single', label: 'Single Digit (1-9)', color: '#F59E0B' },
            { id: 'teen', label: 'Teen Number (11-20)', color: '#8B5CF6' },
        ],
    },
];
// ─── Custom SVG Icons for Topic ───────────────────────────────
function AppleIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <defs>
        <radialGradient id="apple-grad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#FF6B6B"/>
          <stop offset="70%" stopColor="#E53935"/>
          <stop offset="100%" stopColor="#B71C1C"/>
        </radialGradient>
      </defs>
      {/* Stem */}
      <path d="M25 12 Q27 4, 32 3" stroke="#4E342E" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Leaf */}
      <path d="M28 7 Q36 2, 38 8 Q34 12, 28 7 Z" fill="#66BB6A"/>
      {/* Apple body */}
      <path d="M25 14 C15 12, 8 20, 10 32 C12 42, 20 46, 25 42 C30 46, 38 42, 40 32 C42 20, 35 12, 25 14 Z" fill="url(#apple-grad)" stroke="#C62828" strokeWidth="1.5"/>
      {/* Shine */}
      <ellipse cx="18" cy="24" rx="3" ry="5" fill="white" opacity="0.6" transform="rotate(-20 18 24)"/>
    </svg>);
}
function AppleTreeIcon({ size = 120 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 100 100">
      {/* Trunk */}
      <rect x="42" y="55" width="16" height="35" rx="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="2"/>
      {/* Foliage layers */}
      <circle cx="50" cy="45" r="30" fill="#66BB6A" stroke="#388E3C" strokeWidth="2"/>
      <circle cx="35" cy="38" r="22" fill="#81C784"/>
      <circle cx="65" cy="38" r="22" fill="#81C784"/>
      <circle cx="50" cy="25" r="20" fill="#A5D6A7"/>
      {/* Apples on tree */}
      <circle cx="38" cy="35" r="5" fill="#E53935"/>
      <circle cx="60" cy="30" r="5" fill="#E53935"/>
      <circle cx="50" cy="48" r="5" fill="#E53935"/>
      <circle cx="30" cy="50" r="5" fill="#E53935"/>
      <circle cx="68" cy="45" r="5" fill="#E53935"/>
      <circle cx="50" cy="20" r="5" fill="#E53935"/>
    </svg>);
}
function BasketIcon({ size = 80 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 80 80">
      <defs>
        <linearGradient id="basket-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7CCC8"/>
          <stop offset="100%" stopColor="#A1887F"/>
        </linearGradient>
      </defs>
      {/* Handle */}
      <path d="M22 30 Q40 5, 58 30" stroke="#6D4C41" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Basket body */}
      <path d="M15 32 L20 68 C20 72, 25 75, 40 75 C55 75, 60 72, 65 68 L70 32 Z" fill="url(#basket-grad)" stroke="#5D4037" strokeWidth="2"/>
      {/* Weave lines */}
      <line x1="22" y1="42" x2="58" y2="42" stroke="#6D4C41" strokeWidth="2" opacity="0.6"/>
      <line x1="19" y1="52" x2="61" y2="52" stroke="#6D4C41" strokeWidth="2" opacity="0.6"/>
      <line x1="17" y1="62" x2="63" y2="62" stroke="#6D4C41" strokeWidth="2" opacity="0.6"/>
    </svg>);
}
function NumberCardIcon({ num, size = 50 }: {
    num: string;
    size?: number;
}) {
    return (<div className="flex items-center justify-center rounded-xl bg-amber-100 border-2 border-amber-400 shadow-md font-bold text-amber-900" style={{ width: size, height: size, fontSize: size * 0.45 }}>
      {num}
    </div>);
}
// ─── Piku Mascot (Apple Lover Piku) ───────────────────────────
function PikuMascot({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-4 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-300">
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
                ? { y: [0, -5, 0] }
                : { rotate: [0, 6, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Body / dress */}
          <path d="M25 55 L50 55 L58 85 L17 85 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5"/>
          {/* White collar */}
          <path d="M28 55 L37 63 L47 55 Z" fill="white"/>
          {/* Head */}
          <circle cx="37.5" cy="34" r="18" fill="#FFD54F" stroke="#FFA000" strokeWidth="1.5"/>
          {/* Pigtails */}
          <circle cx="16" cy="30" r="7" fill="#5D4037"/>
          <circle cx="59" cy="30" r="7" fill="#5D4037"/>
          {/* Hair bows */}
          <path d="M11 24 Q16 20, 21 24 Q16 28, 11 24 Z" fill="#EF4444"/>
          <path d="M54 24 Q59 20, 64 24 Q59 28, 54 24 Z" fill="#EF4444"/>
          {/* Eyes */}
          <circle cx="31" cy="32" r="2.5" fill="#3E2723"/>
          <circle cx="44" cy="32" r="2.5" fill="#3E2723"/>
          {/* Smile */}
          <path d="M33 40 Q37.5 44 42 40" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Rosy cheeks */}
          <circle cx="27" cy="37" r="3" fill="#FF8A80" opacity="0.6"/>
          <circle cx="48" cy="37" r="3" fill="#FF8A80" opacity="0.6"/>
          {/* Holding tiny apple in hand */}
          <circle cx="52" cy="65" r="6" fill="#E53935" stroke="#B71C1C" strokeWidth="1"/>
          <path d="M52 59 Q53 56, 55 55" stroke="#4E342E" strokeWidth="1.5" fill="none"/>
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
// ─── Apple Orchard Scene Background ───────────────────────────
function AppleOrchardScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #E0F7FA 50%, #C8E6C9 100%)' }}/>
      {/* Sun */}
      <motion.div className="absolute top-4 right-8" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FFD700" opacity="0.9"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="30" y1="30" x2={30 + 26 * Math.cos(angle * Math.PI / 180)} y2={30 + 26 * Math.sin(angle * Math.PI / 180)} stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>))}
        </svg>
      </motion.div>
      {/* Rolling hills ground */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #81C784 0%, #4CAF50 100%)', borderRadius: '50% 50% 0 0 / 20% 20% 0 0' }}/>
      {/* Distant trees */}
      <div className="absolute bottom-20 left-10 opacity-60">
        <AppleTreeIcon size={70}/>
      </div>
      <div className="absolute bottom-24 right-12 opacity-60">
        <AppleTreeIcon size={80}/>
      </div>
    </div>);
}
// ─── Sort Card Component (for drag-and-drop challenges) ───────
function renderSortIcon(id: string, size: number = 48) {
  if (id.includes('apple')) return <AppleIcon size={size} />;
  if (id.includes('tree')) return <AppleTreeIcon size={size} />;
  if (id.includes('basket')) return <BasketIcon size={size} />;
  return <AppleIcon size={size} />;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={90} height={85}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 90, height: 85 }}>
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
      <div className="text-sm font-bold text-center px-1" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  useEffect(() => {audioManager.play('tap');
  }, [slide]);

  return (
    <div className="relative flex flex-col items-center justify-between p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl shadow-2xl overflow-hidden" style={{ width, height }}>
      <AppleOrchardScene width={width} height={height}/>
      <PikuMascot mood="happy" speaking="Let's learn numbers 1 to 20!"/>

      {/* Header */}
      <div className="z-10 text-center mt-2">
        <h1 className="text-2xl font-black text-amber-900 tracking-wide drop-shadow-sm">Apple Orchard Counting</h1>
        <p className="text-xs font-semibold text-amber-700">CISCE Class 1 Maths - Numbers & Numerals 1 to 20</p>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} transition={{ duration: 0.3 }} className="z-10 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-amber-300 max-w-lg w-full my-auto">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${current.bgColor} flex items-center justify-center text-3xl shadow-md mb-4`}>
          {current.emoji}
        </div>
        <h2 className="text-xl font-black text-gray-800 mb-2 text-center">{current.title}</h2>
        <p className="text-sm font-medium text-gray-600 text-center leading-relaxed px-2">{current.text}</p>
      </motion.div>

    { /* Navigation Footer */ }
    <div className="z-10 flex items-center justify-between w-full max-w-md px-4 mb-2">
        <button onClick={() => setSlide(s => Math.max(0, s - 1))} disabled={slide === 0} className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-md transition-all ${slide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95'}`}>
          Previous
        </button>

        {/* Progress dots */}
        <div className="flex gap-2">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-amber-600 scale-125' : 'bg-amber-200'}`}/>))}
        </div>

        {slide < total - 1 ? (<button onClick={() => setSlide(s => Math.min(total - 1, s + 1))} className="px-5 py-2.5 rounded-2xl font-bold text-sm bg-amber-500 text-white shadow-md hover:bg-amber-600 active:scale-95 transition-all">
            Next
          </button>) : (<button onClick={onStart} className="px-6 py-2.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:from-emerald-600 hover:to-green-700 active:scale-95 transition-all animate-bounce">
            Start Game! 🍎
          </button>)}
      </div>
    </div>
  );
}
// ─── Main CountingGame Component ──────────────────────────────
export interface CountingGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function CountingGame({ width = 720, height = 560, onComplete }: CountingGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
    const [stars, setStars] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [hintMessage, setHintMessage] = useState<string | null>(null);
    const [sparklePos, setSparklePos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>("Let's count apples and numerals!");
    // Sort challenge state
    const [sortPositions, setSortPositions] = useState<Record<string, {
        x: number;
        y: number;
    }>>({});
    const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
    const [hoverBin, setHoverBin] = useState<string | null>(null);
    const challenge = CHALLENGES[currentChallengeIndex];
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    // Reset inactivity timer
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current)
            clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            if (screen === 'play') {
                audioManager.play('hint');
                setHintMessage(challenge.hint);
                setMascotMood('thinking');
                setMascotSpeech("Need a hint? Check the apples!");
                speechManager.speak("Need a hint? Check the apples!");
            }
        }, 10000);
    }, [screen, challenge]);
    useEffect(() => {
        resetInactivityTimer();
        return () => {
            speechManager.stop();
            if (inactivityTimerRef.current)
                clearTimeout(inactivityTimerRef.current);
        };
    }, [currentChallengeIndex, resetInactivityTimer]);
    // Initialize sort item positions
    useEffect(() => {
        if (challenge.type.startsWith('sort') && challenge.sortItems) {
            const initialPos: Record<string, {
                x: number;
                y: number;
            }> = {};
            const initialPlaced: Record<string, boolean> = {};
            challenge.sortItems.forEach((item, idx) => {
                initialPos[item.id] = { x: 40 + idx * 115, y: 380 };
                initialPlaced[item.id] = false;
            });
            setSortPositions(initialPos);
            setPlacedItems(initialPlaced);
        }
    }, [currentChallengeIndex, challenge]);
    // Handle multiple choice answer
    const handleAnswer = (option: string) => {
        resetInactivityTimer();
        if (option === challenge.answer) {
            audioManager.play('success');
            setStars(s => s + 1);
            setMascotMood('celebrate');
            setMascotSpeech('Fantastic counting! Correct!');
            speechManager.speak('Fantastic counting! Correct!');
            setSparklePos({ x: width / 2, y: height / 2 });
            setShowSuccessBanner(true);
            setSuccessMessage('Wonderful! That is correct!');
        }
        else {
            audioManager.play('error');
            setMistakes(m => m + 1);
            setMascotMood('thinking');
            setMascotSpeech('Not quite! Read the misconception hint.');
            speechManager.speak('Not quite! Read the misconception hint.');
            setHintMessage(challenge.misconception);
        }
    };
    // Handle drag start
    const handleDragStart = () => {
        audioManager.play('pickup');
        resetInactivityTimer();
    };
    // Handle drag end for sort challenges
    const handleDragEnd = (id: string, x: number, y: number): boolean => {
        resetInactivityTimer();
        const item = challenge.sortItems?.find(i => i.id === id);
        if (!item || !challenge.bins)
            return false;
        // Check bins collision
        // Bin dimensions: width ~110, height ~100
        let matchedBin: string | null = null;
        challenge.bins.forEach((bin, idx) => {
            const binX = 50 + idx * 135;
            const binY = 120;
            const binW = 120;
            const binH = 110;
            if (x + 45 >= binX && x + 45 <= binX + binW && y + 40 >= binY && y + 40 <= binY + binH) {
                matchedBin = bin.id;
            }
        });
        if (matchedBin && matchedBin === item.correctBin) {
            audioManager.play('drop-correct');
            setPlacedItems(prev => ({ ...prev, [id]: true }));
            setSparklePos({ x: x + 45, y: y + 40 });
            // Check if all items placed
            const updatedPlaced = { ...placedItems, [id]: true };
            const allDone = challenge.sortItems?.every(i => updatedPlaced[i.id]);
            if (allDone) {
                audioManager.play('celebration');
                setStars(s => s + 1);
                setMascotMood('celebrate');
                setMascotSpeech('All sorted perfectly!');
                speechManager.speak('All sorted perfectly!');
                setShowConfetti(true);
                setShowSuccessBanner(true);
                setSuccessMessage('Amazing sorting skills!');
            }
            return true;
        }
        else {
            audioManager.play('drop-wrong');
            setMistakes(m => m + 1);
            setMascotMood('thinking');
            setMascotSpeech('Check the correct bin!');
            speechManager.speak('Check the correct bin!');
            setHintMessage(challenge.misconception);
            return false;
        }
    };
    // Advance to next challenge or finish
    const handleNextChallenge = () => {
        setShowSuccessBanner(false);
        setShowConfetti(false);
        setHintMessage(null);
        setMascotMood('happy');
        setMascotSpeech("Let's count more!");
        speechManager.speak("Let's count more!");
        if (currentChallengeIndex < CHALLENGES.length - 1) {
            setCurrentChallengeIndex(c => c + 1);
        }
        else {
            const finalScore = Math.max(0, 100 - mistakes * 5);
            if (onComplete)
                onComplete(finalScore);
        }
    };
    return (<div className="relative flex flex-col items-center justify-between p-6 bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl shadow-2xl select-none overflow-hidden font-sans" style={{ width, height }}>
      <AppleOrchardScene width={width} height={height}/>
      <PikuMascot mood={mascotMood} speaking={mascotSpeech}/>

      {screen === 'teaching' ? (<TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>) : (<>
          {/* Top Bar */}
          <div className="z-10 flex items-center justify-between w-full px-4 pt-2">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border-2 border-amber-300">
              <span className="text-xs font-bold text-amber-900">Challenge {currentChallengeIndex + 1} / {CHALLENGES.length}</span>
              <StarRow count={stars} total={CHALLENGES.length}/>
            </div>
            <h1 className="text-lg font-black text-amber-900 tracking-wide drop-shadow-sm">Counting 1 to 20 🍎</h1>
          </div>

          {/* Question Box */}
          <div className="z-10 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-4 border-amber-300 max-w-xl w-full my-auto">
            <div className="flex items-center gap-4 mb-4">
              <AppleTreeIcon size={60}/>
              <p className="text-base font-bold text-gray-800 text-center leading-snug">{challenge.question}</p>
            </div>

            {/* Multiple Choice Options */}
            {!challenge.type.startsWith('sort') && (<div className="flex flex-wrap gap-3 justify-center w-full mt-2">
                {challenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(opt)} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 text-amber-950 font-black shadow-md border-2 border-amber-500 text-base">
                    <AppleIcon size={24}/>
                    <span>{opt}</span>
                  </motion.button>))}
              </div>)}

            {/* Sort Challenge Area */}
            {challenge.type.startsWith('sort') && challenge.bins && challenge.sortItems && (<div className="relative w-full h-[220px] bg-amber-50/80 rounded-2xl border-2 border-dashed border-amber-300 mt-2">
                {/* Bins */}
                {challenge.bins.map((bin, idx) => {
                    const binW = 120;
                    const binH = 110;
                    const binX = 50 + idx * 135;
                    const binY = 120;
                    return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={binX} y={binY} width={binW} height={binH} isHovering={hoverBin === bin.id}/>);
                })}

                {/* Draggable Cards */}
                {challenge.sortItems.map((item) => {
                    const pos = sortPositions[item.id] || { x: 40, y: 380 };
                    const placed = placedItems[item.id] || false;
                    return (<SortCard key={item.id} id={item.id} label={item.label} icon={item.icon} x={pos.x} y={pos.y} placed={placed} onDragStart={handleDragStart} onDragEnd={(id, x, y) => handleDragEnd(id, x, y)}/>);
                })}
              </div>)}
          </div>

          {/* Feedback & Overlays */}
          {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
          {showSuccessBanner && <SuccessBanner message={successMessage} onComplete={handleNextChallenge}/>}
          {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>}
          {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>}
        </>)}
    </div>);
}
