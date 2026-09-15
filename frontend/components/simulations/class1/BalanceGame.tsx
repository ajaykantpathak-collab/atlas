'use client';
/**
 * BalanceGame - Learn about weight: compare heavy and light objects
 *
 * CISCE Nodes: c1_math_021 (Weight - compare heavy and light objects)
 * Enrichment: c1_maths_enrichment_part21
 *
 * ELI5: "Pick up a small pencil in one hand and a big book in the other.
 *   The book pushes your hand down more - it is heavy. A toy weighing
 *   balance works the same way: put a stone on one side and a feather on
 *   the other, and the stone side sinks down because it is heavier!"
 *
 * Misconceptions (from enrichment):
 *   1. "Bigger objects are always heavier" → "A large cotton ball can be
 *      lighter than a small iron marble. Always compare by holding or using
 *      a toy balance!"
 *   2. "Two objects that look the same must weigh the same" → "A real coin
 *      and a crumpled paper ball of the same size do not weigh the same.
 *      The coin is heavier!"
 *   3. "The pan that goes up holds the heavier object" → "The pan that goes
 *      DOWN holds the heavier object, because heavier things pull their side
 *      down, just like a see-saw!"
 *
 * Story: "Help Scale Master Tara sort objects by weight, balance scales, and
 *   become a Weight Master!"
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
        title: 'What is Weight? ⚖️',
        text: 'Weight is how heavy or how light an object is! When you hold a book and a pencil, the book presses down more - it is heavier! The pencil presses down less - it is light!',
        emoji: '📚',
        bgColor: 'from-amber-400 to-orange-500',
        spoken: 'Weight is how heavy or how light an object is! When you hold a book and a pencil, the book presses down more.'
    },
    {
        title: 'The Toy Weighing Balance ⚖️',
        text: 'A toy weighing balance has two pans hanging from a beam, like a playground see-saw! When you put a heavy object on one pan, that side goes DOWN and the other side goes UP!',
        emoji: '🎢',
        bgColor: 'from-blue-400 to-indigo-500',
        spoken: 'A toy weighing balance has two pans hanging from a beam, like a playground see-saw!'
    },
    {
        title: 'Size Does Not Decide Weight! 🧱',
        text: 'Do not judge by size alone! A small iron ball is heavier than a large cotton ball. A real coin is heavier than a crumpled paper ball of the exact same size!',
        emoji: '🪙',
        bgColor: 'from-purple-400 to-pink-500',
        spoken: 'Do not judge by size alone! A small iron ball is heavier than a large cotton ball.'
    },
    {
        title: 'Heavier and Lighter ⬆️⬇️',
        text: 'The pan that sinks down holds the HEAVIER object. The pan that goes up holds the LIGHTER object. If both pans stay level, the two objects weigh the same!',
        emoji: '⚖️',
        bgColor: 'from-emerald-400 to-teal-500',
        spoken: 'The pan that sinks down holds the heavier object. The pan that goes up holds the lighter object.'
    },
    {
        title: 'Become a Weight Master! 🌟',
        text: 'Always check with your hands or a toy balance, never just your eyes. Use words like heavier, lighter, heavy, light, and same correctly!',
        emoji: '🌟',
        bgColor: 'from-amber-500 to-yellow-500',
        spoken: 'Always check with your hands or a toy balance, never just your eyes.'
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
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
// ─── Challenges (8 progressive: identify → sort → apply) ──────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify',
        question: 'Which is HEAVIER - a heavy book or a light pencil?',
        answer: 'Heavy book',
        options: ['Heavy book', 'Light pencil', 'They weigh the same'],
        hint: 'Hold both in your hands: which one presses down more strongly?',
        misconception: 'The heavy book presses down much more than the pencil! Books are heavy, pencils are light.',
    },
    {
        type: 'identify',
        question: 'Which is LIGHTER - a big fluffy feather or a small stone?',
        answer: 'Big fluffy feather',
        options: ['Small stone', 'Big fluffy feather', 'They weigh the same'],
        hint: 'Think about a feather floating in the air vs a stone sinking in water!',
        misconception: 'The feather is much lighter! Feathers float and press down very little, while stones sink and are heavy.',
    },
    {
        type: 'identify',
        question: 'On a toy balance scale, which side goes DOWN?',
        answer: 'The heavier side',
        options: ['The lighter side', 'The heavier side', 'Neither side moves'],
        hint: 'Think of a playground see-saw: the heavier child makes their side sink down!',
        misconception: 'The heavier side always sinks DOWN! Heavier objects pull their pan down, just like a see-saw.',
    },
    {
        type: 'sort',
        question: 'Drag each object into the correct weight bin!',
        answer: 'sort',
        options: [],
        hint: 'Books, stones, and iron balls are heavy! Feathers, pencils, and cotton balls are light!',
        misconception: 'Remember: books and stones pull down hard (heavy), while feathers and pencils press down very little (light)!',
        sortItems: [
            { id: 'book', label: 'Heavy book', emoji: '📚', correctBin: 'heavy' },
            { id: 'stone', label: 'Stone', emoji: '🪨', correctBin: 'heavy' },
            { id: 'feather', label: 'Feather', emoji: '🪶', correctBin: 'light' },
            { id: 'pencil', label: 'Pencil', emoji: '✏️', correctBin: 'light' },
        ],
        bins: [
            { id: 'heavy', label: 'Heavy Objects ⬇️', color: '#D97706' },
            { id: 'light', label: 'Light Objects ⬆️', color: '#0284C7' },
        ],
    },
    {
        type: 'identify',
        question: 'A big cotton ball and a small iron ball. Which is heavier?',
        answer: 'Small iron ball',
        options: ['Big cotton ball', 'Small iron ball', 'They weigh the same'],
        hint: 'Remember: size does not decide weight! Metal weighs more than cotton!',
        misconception: 'Size does not decide weight! Even though the cotton ball is bigger, metal is much denser and heavier than cotton. The small iron ball is heavier!',
    },
    {
        type: 'identify',
        question: 'Can we tell which object is heavier just by looking at its SIZE?',
        answer: 'No, we must check with a balance or hands',
        options: ['Yes, bigger is always heavier', 'No, we must check with a balance or hands', 'Yes, smaller is always heavier'],
        hint: 'Think of the cotton ball and iron ball. Can eyes alone trick us?',
        misconception: 'Size can trick our eyes! A large balloon or cotton ball can be lighter than a small stone or iron ball. Always check with a balance or your hands!',
    },
    {
        type: 'sort',
        question: 'Drag each object to where it goes on a toy balance scale!',
        answer: 'sort',
        options: [],
        hint: 'Heavy iron balls go down! Light feathers go up! Equal wooden blocks stay level!',
        misconception: 'Heavy things go DOWN, light things go UP, and equal things stay level in the middle!',
        sortItems: [
            { id: 'iron', label: 'Iron ball', emoji: '⚽', correctBin: 'down' },
            { id: 'feather', label: 'Feather', emoji: '🪶', correctBin: 'up' },
            { id: 'block1', label: 'Wood block A', emoji: '🟩', correctBin: 'level' },
            { id: 'block2', label: 'Wood block B', emoji: '🟩', correctBin: 'level' },
        ],
        bins: [
            { id: 'down', label: 'Goes DOWN ⬇️', color: '#DC2626' },
            { id: 'up', label: 'Goes UP ⬆️', color: '#2563EB' },
            { id: 'level', label: 'Stays LEVEL ⚖️', color: '#16A34A' },
        ],
    },
    {
        type: 'sort',
        question: 'Drag each comparison sentence to Correct or Incorrect!',
        answer: 'sort',
        options: [],
        hint: 'Stones are heavier than feathers! Pencils are lighter than books!',
        misconception: 'Check carefully: stones sink (heavier than feathers), pencils press less (lighter than books)!',
        sortItems: [
            { id: 'c1', label: 'Stone is heavier than feather', emoji: '🪨', correctBin: 'correct' },
            { id: 'c2', label: 'Pencil is lighter than book', emoji: '📚', correctBin: 'correct' },
            { id: 'i1', label: 'Feather is heavier than stone', emoji: '🪶', correctBin: 'incorrect' },
            { id: 'i2', label: 'Book is lighter than pencil', emoji: '✏️', correctBin: 'incorrect' },
        ],
        bins: [
            { id: 'correct', label: 'CORRECT ✅', color: '#16A34A' },
            { id: 'incorrect', label: 'INCORRECT ❌', color: '#DC2626' },
        ],
    },
];
// ─── Scale Master Tara Mascot ─────────────────────────────────
function ScaleMasterTara({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400">
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
                ? { y: [0, -4, 0] }
                : { rotate: [0, 5, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="tara-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF"/>
              <stop offset="100%" stopColor="#F3F4F6"/>
            </linearGradient>
            <linearGradient id="tara-hair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#78350F"/>
              <stop offset="100%" stopColor="#451A03"/>
            </linearGradient>
          </defs>
          {/* Head & Pigtails */}
          <circle cx="20" cy="30" r="8" fill="url(#tara-hair)"/>
          <circle cx="55" cy="30" r="8" fill="url(#tara-hair)"/>
          <circle cx="37" cy="32" r="15" fill="#FDE68A"/>
          <circle cx="37" cy="32" r="14" fill="#FCD34D"/>
          {/* Hair bangs */}
          <path d="M25 25 Q37 32 49 25 Q37 20 25 25 Z" fill="url(#tara-hair)"/>
          {/* Eyes */}
          <circle cx="31" cy="30" r="2.5" fill="#1F2937"/>
          <circle cx="43" cy="30" r="2.5" fill="#1F2937"/>
          <circle cx="32" cy="29" r="1" fill="white"/>
          <circle cx="44" cy="29" r="1" fill="white"/>
          {/* Smile */}
          <path d="M33 37 Q37 41 41 37" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Lab Coat */}
          <path d="M22 47 L37 52 L52 47 L55 78 L20 78 Z" fill="url(#tara-coat)" stroke="#9CA3AF" strokeWidth="1"/>
          {/* Red scarf / bow */}
          <path d="M30 45 L37 49 L44 45 L37 42 Z" fill="#EF4444"/>
          {/* Magnifying glass in hand */}
          <circle cx="60" cy="60" r="6" fill="none" stroke="#3B82F6" strokeWidth="2"/>
          <line x1="56" y1="64" x2="50" y2="70" stroke="#1F2937" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Row ──────────────────────────────────────────
function StarRow({ count, total }: {
    count: number;
    total: number;
}) {
    return (<div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (<motion.div key={i} initial={false} animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Balance Scene Background ─────────────────────────────────
function BalanceScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 30%, #E0F2FE 70%, #BAE6FD 100%)' }}/>
      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="16" fill="#F59E0B" opacity="0.9"/>
          <circle cx="27" cy="27" r="11" fill="#FBBF24"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27" y1="27" x2={27 + 24 * Math.cos(angle * Math.PI / 180)} y2={27 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-10 left-1/4 opacity-70" animate={{ x: [0, 35, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="75" height="32" viewBox="0 0 75 32">
          <ellipse cx="22" cy="18" rx="16" ry="11" fill="white"/>
          <ellipse cx="42" cy="14" rx="20" ry="13" fill="white"/>
          <ellipse cx="55" cy="18" rx="14" ry="9" fill="white"/>
        </svg>
      </motion.div>
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(180deg, #84CC16 0%, #65A30D 100%)' }}/>
      {/* Background See-Saw */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30">
        <svg width="180" height="60" viewBox="0 0 180 60">
          <polygon points="90,20 75,55 105,55" fill="#78350F"/>
          <line x1="20" y1="35" x2="160" y2="25" stroke="#B45309" strokeWidth="6" strokeLinecap="round"/>
          <circle cx="20" cy="35" r="10" fill="#EF4444"/>
          <circle cx="160" cy="25" r="10" fill="#3B82F6"/>
        </svg>
      </div>
    </div>);
}
// ─── Custom Topic SVG Objects ─────────────────────────────────
function BalanceScaleIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="27" y="15" width="6" height="35" fill="#78350F" rx="2"/>
      <polygon points="20,50 40,50 30,42" fill="#451A03"/>
      <line x1="10" y1="18" x2="50" y2="18" stroke="#B45309" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="30" cy="18" r="4" fill="#F59E0B"/>
      <line x1="10" y1="18" x2="10" y2="28" stroke="#6B7280" strokeWidth="1.5"/>
      <line x1="50" y1="18" x2="50" y2="34" stroke="#6B7280" strokeWidth="1.5"/>
      <path d="M4 28 Q10 38, 16 28 Z" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1"/>
      <path d="M44 34 Q50 44, 56 34 Z" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1"/>
    </svg>);
}
function BookIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="10" width="34" height="32" fill="#DC2626" rx="2"/>
      <rect x="11" y="13" width="28" height="26" fill="#B91C1C" rx="1"/>
      <rect x="6" y="10" width="5" height="32" fill="#991B1B" rx="1"/>
      <line x1="16" y1="20" x2="32" y2="20" stroke="#FEE2E2" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="26" x2="28" y2="26" stroke="#FEE2E2" strokeWidth="2" strokeLinecap="round"/>
    </svg>);
}
function PencilIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="12,38 38,12 42,16 16,42" fill="#FBBF24"/>
      <polygon points="38,12 45,5 47,7 42,16" fill="#F87171"/>
      <polygon points="12,38 8,42 16,42" fill="#9CA3AF"/>
      <polygon points="10,40 12,38 16,42 14,44" fill="#1F2937"/>
    </svg>);
}
function StoneIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M12 32 C10 20, 18 12, 30 15 C42 18, 45 30, 38 38 C31 45, 15 42, 12 32 Z" fill="#6B7280" stroke="#4B5563" strokeWidth="2"/>
      <path d="M18 24 Q24 20, 32 26" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>);
}
function FeatherIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 40 C15 30, 25 15, 42 8 C42 22, 30 32, 20 40 C15 42, 12 42, 10 40 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5"/>
      <path d="M10 40 L42 8" stroke="#0284C7" strokeWidth="1.5"/>
      <path d="M20 30 L30 20 M15 35 L22 28 M28 22 L36 14" stroke="#7DD3FC" strokeWidth="1"/>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('book'))
        return <BookIcon size={size}/>;
    if (id.includes('pencil'))
        return <PencilIcon size={size}/>;
    if (id.includes('stone'))
        return <StoneIcon size={size}/>;
    if (id.includes('feather'))
        return <FeatherIcon size={size}/>;
    if (id.includes('iron'))
        return <StoneIcon size={size}/>;
    if (id.includes('block'))
        return <BookIcon size={size}/>;
    if (id.includes('heavy'))
        return <StoneIcon size={size}/>;
    if (id.includes('light'))
        return <FeatherIcon size={size}/>;
    if (id.includes('down'))
        return <StoneIcon size={size}/>;
    if (id.includes('up'))
        return <FeatherIcon size={size}/>;
    if (id.includes('correct'))
        return <BalanceScaleIcon size={size}/>;
    if (id.includes('incorrect'))
        return <BalanceScaleIcon size={size}/>;
    if (id.includes('level'))
        return <BalanceScaleIcon size={size}/>;
    if (id.includes('c1'))
        return <BookIcon size={size}/>;
    if (id.includes('c2'))
        return <PencilIcon size={size}/>;
    if (id.includes('i1'))
        return <StoneIcon size={size}/>;
    if (id.includes('i2'))
        return <FeatherIcon size={size}/>;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 ${placed ? 'opacity-40 border-gray-300' : 'bg-white border-amber-300'} px-2 py-2`}>
        {renderSortIcon(id, 48)}
        <span className="text-xs font-bold text-center text-gray-700">{label}</span>
      </div>
    </Draggable>);
}

// ─── Sort Bin Component ────────────────────────────────────────
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
      <div className="text-xs font-black text-center px-2" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {
    audioManager.play('tap');
    if (slide < total - 1) {
      setSlide(slide + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden select-none" style={{ width, height, background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)' }}>
      <BalanceScene width={width} height={height}/>
      <ScaleMasterTara mood="happy" speaking={current.spoken}/>

      {/* Top Header */}
      <div className="relative z-10 w-full flex justify-between items-center bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-md">
        <div className="flex items-center gap-2">
          <BalanceScaleIcon size={35}/>
          <h1 className="text-xl font-black text-amber-900 tracking-wide">Scale Master Tara</h1>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-amber-600' : 'w-3 bg-amber-200'}`}/>))}
        </div>
      </div>

      {/* Slide Content Card */}
      <motion.div key={slide} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} transition={{ duration: 0.3 }} className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-lg w-full text-center border-4 border-amber-300 my-auto">
        <div className="text-6xl mb-3">{current.emoji}</div>
        <h2 className="text-2xl font-black text-amber-900 mb-2">{current.title}</h2>
        <p className="text-base font-semibold text-gray-700 leading-relaxed">{current.text}</p>
      </motion.div>

      {/* Footer Navigation */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 py-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-5 py-2.5 rounded-2xl font-black text-white shadow-lg transition-all ${slide === 0 ? 'opacity-40 cursor-not-allowed bg-gray-400' : 'bg-amber-600 hover:bg-amber-700 active:scale-95'}`}>
          ⬅️ Back
        </button>

        <span className="text-sm font-bold text-amber-900 bg-white/70 px-4 py-1.5 rounded-full shadow">
          Slide {slide + 1} of {total}
        </span>

        <button onClick={handleNext} className="px-6 py-2.5 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-xl active:scale-95 transition-all">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main BalanceGame Component ───────────────────────────────

export interface BalanceGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function BalanceGame({width = 720, height = 560, onComplete}: BalanceGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successBannerMsg, setSuccessBannerMsg] = useState('');
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [taraSpeech, setTaraSpeech] = useState<string | null>('Hello! Let us learn about weight and balance!');
  const [taraMood, setTaraMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [gameFinished, setGameFinished] = useState(false);

  // Sort challenge states
  const [sortPositions, setSortPositions] = useState<{ [id: string]: { x: number; y: number; placed: boolean } }>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const challenge = CHALLENGES[currentChallengeIndex];

  // Reset sort item positions on challenge change
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initialPos: { [id: string]: { x: number; y: number; placed: boolean } } = {};
      const startX = 60;
      const startY = 320;
      challenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = {
            x: startX + idx * 135,
            y: startY,
            placed: false,
        };
      });
      setSortPositions(initialPos);
    }
  }, [currentChallengeIndex]);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      audioManager.play('hint');
      setHintMessage(challenge.hint);
      setTaraSpeech(challenge.hint);
      speechManager.speak(challenge.hint);
    }, 10000);
  }, [challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  const triggerSparkles = (x: number, y: number) => {
    audioManager.play('sparkle');
    setSparkles(prev => [...prev, { id: Date.now(), x, y }]);
  };

  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    audioManager.play('tap');

    if (option === challenge.answer) {
        // Correct!
        audioManager.play('success');
      triggerSparkles(width / 2, height / 2);
      setScore(s => s + 1);
      setTaraSpeech('Wonderful! That is correct! ⭐');
      speechManager.speak('Wonderful! That is correct! ⭐');
      setTaraMood('celebrate');
      setSuccessBannerMsg('Amazing job! That is correct! 🎉');
      setShowSuccessBanner(true);
    } else {
        // Wrong!
        audioManager.play('error');
      setErrors(e => e + 1);
      setTaraSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setTaraMood('thinking');
      setHintMessage(challenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    resetInactivityTimer();
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bin bounding boxes
    const binWidth = 140;
    const binHeight = 110;
    const binY = 160;

    let matchedBin: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 165;
      if (x >= binX - 20 && x <= binX + binWidth + 20 && y >= binY - 20 && y <= binY + binHeight + 20) {
        matchedBin = bin.id;
      }
    });

    if (matchedBin === item.correctBin) {
        // Correct bin!
        audioManager.play('drop-correct');
      triggerSparkles(x, y);
      setSortPositions(prev => ({
        ...prev,
        [id]: { x, y, placed: true },
      }));

      // Check if all items in sort challenge are placed
      const updatedPositions = { ...sortPositions, [id]: { x, y, placed: true } };
      const allPlaced = challenge.sortItems?.every(si => updatedPositions[si.id]?.placed);

      if (allPlaced) {
        audioManager.play('success');
        setScore(s => s + 1);
        setTaraSpeech('All sorted correctly! You are a superstar! 🌟');
        speechManager.speak('All sorted correctly! You are a superstar! 🌟');
        setSuccessBannerMsg('Fantastic sorting! Perfect match! 🎉');
        setShowSuccessBanner(true);
      }
      return true;
    } else {
        // Wrong bin!
        audioManager.play('drop-wrong');
      setErrors(e => e + 1);
      setTaraSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setTaraMood('thinking');
      setHintMessage(challenge.misconception);
      return false;
    }
  };

  const handleSuccessBannerComplete = () => {
    setShowSuccessBanner(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(c => c + 1);
      setTaraSpeech('Great! Now let us try the next challenge!');
      speechManager.speak('Great! Now let us try the next challenge!');
    } else {
        // Game Complete!
        audioManager.play('celebration');
      setShowConfetti(true);
      setGameFinished(true);
      setTaraSpeech('You completed all challenges! You are a true Weight Master! 🏆');
      speechManager.speak('You completed all challenges! You are a true Weight Master! 🏆');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden select-none" style={{ width, height, background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 50%, #F59E0B 100%)' }}>
      <BalanceScene width={width} height={height}/>
      <ScaleMasterTara mood={gameFinished ? 'celebrate' : taraMood} speaking={taraSpeech}/>

      {/* Confetti & Success Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccessBanner && <SuccessBanner message={successBannerMsg} onComplete={handleSuccessBannerComplete}/>}
      {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>}

      {sparkles.map(s => (<SparkleBurst key={s.id} x={s.x} y={s.y} onComplete={() => setSparkles(prev => prev.filter(item => item.id !== s.id))}/>))}

      {/* Top Header */}
      <div className="relative z-10 w-full flex justify-between items-center bg-white/85 backdrop-blur-md px-5 py-3 rounded-2xl shadow-md border-2 border-amber-300">
        <div className="flex items-center gap-3">
          <BalanceScaleIcon size={38}/>
          <div>
            <h1 className="text-lg font-black text-amber-900 leading-none">Scale Master Tara</h1>
            <p className="text-xs font-bold text-amber-700 mt-0.5">Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</p>
          </div>
        </div>
        <StarRow count={score} total={CHALLENGES.length}/>
      </div>

      {/* Question Card */}
      {!gameFinished && (<motion.div key={currentChallengeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl max-w-xl w-full text-center border-3 border-amber-300 my-2">
          <h2 className="text-lg font-black text-amber-900 mb-1">{challenge.question}</h2>
        </motion.div>)}

      {/* Interactive Area */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        {gameFinished ? (<motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl text-center border-4 border-amber-400 max-w-md w-full">
            <div className="text-6xl mb-3">🏆</div>
            <h2 className="text-2xl font-black text-amber-900 mb-2">You Are a Weight Master!</h2>
            <p className="text-sm font-bold text-gray-700 mb-4">You learned about heavy, light, balance scales, and size vs weight!</p>
            <button onClick={() => {
                setScreen('teaching');
                setCurrentChallengeIndex(0);
                setScore(0);
                setErrors(0);
                setGameFinished(false);
            }} className="px-6 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-600 shadow-xl hover:scale-105 active:scale-95 transition-all">
              Play Again 🔄
            </button>
          </motion.div>) : challenge.type === 'identify' ? (<div className="grid grid-cols-3 gap-4 w-full max-w-lg px-4">
            {challenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswerSelect(opt)} className="bg-white/90 hover:bg-amber-50 border-3 border-amber-300 rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center gap-2 font-black text-amber-900 text-sm transition-all">
                {opt.toLowerCase().includes('book') ? <BookIcon size={45}/> :
                    opt.toLowerCase().includes('pencil') ? <PencilIcon size={45}/> :
                        opt.toLowerCase().includes('feather') ? <FeatherIcon size={45}/> :
                            opt.toLowerCase().includes('stone') ? <StoneIcon size={45}/> :
                                <BalanceScaleIcon size={45}/>}
                <span className="text-center">{opt}</span>
              </motion.button>))}
          </div>) : (<div className="relative w-full h-80 flex justify-center items-center">
            {/* Bins */}
            {challenge.bins && challenge.bins.map((bin, idx) => {
                const binWidth = 140;
                const binHeight = 110;
                const binX = 50 + idx * 165;
                const binY = 30;
                const isHovering = hoverBin === bin.id;
                return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={binX} y={binY} width={binWidth} height={binHeight} isHovering={isHovering}/>);
            })}

            {/* Draggable Cards */}
            {challenge.sortItems && challenge.sortItems.map((item) => {
                const pos = sortPositions[item.id] || { x: 60, y: 340, placed: false };
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={pos.x} y={pos.y} placed={pos.placed} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
          </div>)}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 py-2 bg-white/70 backdrop-blur-md rounded-2xl shadow">
        <span className="text-xs font-bold text-amber-900">💡 Tip: Heavier things pull their pan DOWN!</span>
        <button onClick={() => {
            audioManager.play('hint');
            setHintMessage(challenge.hint);
            setTaraSpeech(challenge.hint);
            speechManager.speak(challenge.hint);
        }} className="px-4 py-1.5 rounded-xl font-bold text-xs text-white bg-amber-600 hover:bg-amber-700 shadow transition-all">
          Need Hint? 💡
        </button>
      </div>
    </div>
  );
}
