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

// ─── SVG Icon Components ────��────────────────────────────────

function TurtleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Shell */}
      <ellipse cx="30" cy="32" rx="16" ry="12" fill="#4ADE80" stroke="#16A34A" strokeWidth="2" />
      <ellipse cx="30" cy="32" rx="10" ry="7" fill="#86EFAC" />
      {/* Head */}
      <circle cx="30" cy="14" r="6" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
      <circle cx="28" cy="13" r="1" fill="#1E293B" />
      <circle cx="32" cy="13" r="1" fill="#1E293B" />
      {/* Legs */}
      <ellipse cx="15" cy="24" rx="4" ry="2.5" fill="#16A34A" transform="rotate(-30 15 24)" />
      <ellipse cx="45" cy="24" rx="4" ry="2.5" fill="#16A34A" transform="rotate(30 45 24)" />
      <ellipse cx="15" cy="42" rx="4" ry="2.5" fill="#16A34A" transform="rotate(30 15 42)" />
      <ellipse cx="45" cy="42" rx="4" ry="2.5" fill="#16A34A" transform="rotate(-30 45 42)" />
      {/* Tail */}
      <polygon points="30,44 28,52 32,52" fill="#16A34A" />
    </svg>
  );
}

function ForwardIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="40" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <text x="30" y="27" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">FD</text>
      <path d="M22 36 L30 26 L38 36" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="30" y1="26" x2="30" y2="44" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BackwardIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="40" rx="6" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
      <text x="30" y="27" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">BK</text>
      <path d="M22 34 L30 44 L38 34" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="30" y1="26" x2="30" y2="44" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function RightTurnIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="40" rx="6" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
      <text x="30" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">RT</text>
      <path d="M22 35 A12 12 0 0 1 38 35" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M34 30 L38 35 L34 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LeftTurnIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="40" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <text x="30" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">LT</text>
      <path d="M38 35 A12 12 0 0 0 22 35" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M26 30 L22 35 L26 40" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HideTurtleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="40" rx="6" fill="#64748B" stroke="#334155" strokeWidth="2" />
      <text x="30" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">HT</text>
      <line x1="20" y1="40" x2="40" y2="20" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ShowTurtleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="40" rx="6" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <text x="30" y="32" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">ST</text>
      <circle cx="30" cy="42" r="3" fill="white" />
    </svg>
  );
}

function FlowchartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="8" width="30" height="14" rx="4" fill="#60A5FA" stroke="#2563EB" strokeWidth="1.5" />
      <polygon points="30,26 42,35 30,44 18,35" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
      <rect x="15" y="46" width="30" height="12" rx="3" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
      <line x1="30" y1="22" x2="30" y2="26" stroke="#334155" strokeWidth="2" />
      <line x1="30" y1="44" x2="30" y2="46" stroke="#334155" strokeWidth="2" />
    </svg>
  );
}

function AlgorithmIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="8" width="40" height="44" rx="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <line x1="16" y1="18" x2="32" y2="18" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="28" x2="40" y2="28" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="38" x2="36" y2="38" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1.5" fill="#B45309" />
      <circle cx="12" cy="28" r="1.5" fill="#B45309" />
      <circle cx="12" cy="38" r="1.5" fill="#B45309" />
    </svg>
  );
}

function SquareIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" fill="none" stroke="#2563EB" strokeWidth="4" rx="2" />
      <circle cx="30" cy="30" r="3" fill="#EF4444" />
    </svg>
  );
}

function StepIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="38" width="10" height="14" fill="#94A3B8" rx="2" />
      <rect x="25" y="26" width="10" height="26" fill="#64748B" rx="2" />
      <rect x="40" y="14" width="10" height="38" fill="#475569" rx="2" />
      <path d="M15 34 L30 22 L45 10" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon Helper ─────────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'turtle': return <TurtleIcon size={size} />;
    case 'fd': return <ForwardIcon size={size} />;
    case 'bk': return <BackwardIcon size={size} />;
    case 'rt': return <RightTurnIcon size={size} />;
    case 'lt': return <LeftTurnIcon size={size} />;
    case 'ht': return <HideTurtleIcon size={size} />;
    case 'st': return <ShowTurtleIcon size={size} />;
    case 'flowchart': return <FlowchartIcon size={size} />;
    case 'algorithm': return <AlgorithmIcon size={size} />;
    case 'square': return <SquareIcon size={size} />;
    case 'step': return <StepIcon size={size} />;
    default: return <TurtleIcon size={size} />;
  }
}

// ─── Coder Kabir Mascot ──────────────────────────────────────

function CoderKabir({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-400"
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
        <svg width="75" height="85" viewBox="0 0 75 85">
          <defs>
            <linearGradient id="kabir-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="kabir-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
          </defs>
          {/* Body / Shirt */}
          <rect x="22" y="48" width="31" height="30" rx="8" fill="url(#kabir-shirt)" />
          {/* Turtle Badge */}
          <circle cx="37.5" cy="62" r="7" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <path d="M34 62 L41 62" stroke="white" strokeWidth="2" strokeLinecap="round" />
          {/* Head */}
          <circle cx="37.5" cy="30" r="16" fill="url(#kabir-face)" stroke="#D97706" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M21 28 Q25 15, 37.5 16 Q50 15, 54 28 Z" fill="#78350F" />
          {/* Glasses */}
          <rect x="27" y="24" width="9" height="7" rx="2" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <rect x="39" y="24" width="9" height="7" rx="2" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="36" y1="27" x2="39" y2="27" stroke="#1E293B" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31.5" cy="27.5" r="1.5" fill="#1E293B" />
          <circle cx="43.5" cy="27.5" r="1.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 36 Q37.5 41, 42 36" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Arms */}
          <ellipse cx="15" cy="56" rx="4" ry="8" fill="#F59E0B" transform="rotate(20 15 56)" />
          <ellipse cx="60" cy="56" rx="4" ry="8" fill="#F59E0B" transform="rotate(-20 60 56)" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ──────────────────────────────────────

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

// ─── Coding Scene Background ─────────────────────────────────

function CodingSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />
        <rect x="0" y={height * 0.75} width={width} height={height * 0.25} fill="url(#floor-grad)" />
        {/* Grid lines on floor */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 100} y1={height * 0.75} x2={i * 120} y2={height} stroke="#475569" strokeWidth="1" opacity="0.4" />
        ))}
      </svg>
      {/* Floating binary / code symbols */}
      <motion.div className="absolute top-10 left-12 text-gold-300 font-mono text-xs opacity-30" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        FD 100
      </motion.div>
      <motion.div className="absolute top-20 right-20 text-emerald-300 font-mono text-xs opacity-30" animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        RT 90
      </motion.div>
      <motion.div className="absolute top-36 left-1/3 text-pink-300 font-mono text-xs opacity-25" animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>
        [START] → [PROCESS] → [OUTPUT]
      </motion.div>
    </div>
  );
}

// ─── Sort Card Component ─────────────────────────────────────

interface SortCardProps {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: SortCardProps) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ──────────────────────────────────────

interface SortBinProps {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: SortBinProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}15` }}
    >
      <div className="px-3 py-1 rounded-full text-xs font-black text-white shadow-sm mb-1" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="text-xs font-semibold text-gray-500">Drop here!</div>
    </div>
  );
}

// ─── Teaching Slides ─────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "What is Stepwise Thinking? 🧠",
    text: "Stepwise thinking means breaking a big task into small, ordered steps. Just like making a sandwich or getting ready for school, every step must be in the right order!",
    emoji: "🥪",
    bgColor: "from-gold-600 to-gold-700",
    spoken: "Stepwise thinking means breaking a big task into small, ordered steps. Just like making a sandwich, every step must be in the right order!",
  },
  {
    title: "Algorithms & Flowcharts 📋",
    text: "An algorithm is a step-by-step recipe to solve a problem. A flowchart shows these steps using pictures: ovals for Start and End, rectangles for processes, and diamonds for decisions!",
    emoji: "📊",
    bgColor: "from-gold-600 to-purple-700",
    spoken: "An algorithm is a step-by-step recipe to solve a problem. A flowchart shows these steps using special shapes and arrows!",
  },
  {
    title: "Meet LOGO and the Turtle! 🐢",
    text: "LOGO is a fun programming language where a little turtle robot draws pictures on your screen. The screen has a drawing area and a commander window where you type commands.",
    emoji: "💻",
    bgColor: "from-emerald-600 to-teal-700",
    spoken: "LOGO is a fun programming language where a little turtle robot draws pictures on your screen. You type commands in the commander window!",
  },
  {
    title: "LOGO Primitives (FD, BK, RT, LT) 🚀",
    text: "Primitives are ready-made commands. FD moves forward and draws a line, BK moves backward. RT turns right by degrees, LT turns left. HT hides the turtle, ST shows it!",
    emoji: "✏️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Primitives are ready-made commands. FD moves forward and draws a line, BK moves backward. RT turns right, LT turns left!",
  },
  {
    title: "Drawing Shapes with LOGO 📐",
    text: "By repeating movement and turns in an algorithm, the turtle can draw squares, rectangles, and triangles! To draw a square, repeat FD 100 and RT 90 four times!",
    emoji: "⭐",
    bgColor: "from-purple-600 to-pink-600",
    spoken: "By repeating movement and turns in an algorithm, the turtle can draw squares, rectangles, and triangles!",
  },
];

// ─── Challenges ──────────────────────────────────────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBinDef {
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
  bins?: SortBinDef[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is 'stepwise thinking'?",
    answer: "Breaking a big task into small, ordered steps",
    options: [
      "Breaking a big task into small, ordered steps",
      "Doing everything at once without a plan",
      "Skipping steps to finish a job faster"
    ],
    hint: "Think about making a sandwich or brushing teeth: you do one small action after another!",
    misconception: "Stepwise thinking means breaking a big task into small, ordered steps! Doing everything at once or skipping steps causes confusion and messy results.",
  },
  {
    type: 'sort',
    question: "Drag the steps of making a sandwich into the CORRECT order!",
    answer: "sort",
    options: [],
    hint: "First get bread, spread butter, add filling, close it, and then cut into halves!",
    misconception: "The order of steps matters! Cutting before spreading or adding filling before butter ruins the sandwich. Every step must prepare for the next one.",
    sortItems: [
      { id: 's1', label: '1. Get the bread', icon: 'step', correctBin: 'bin1' },
      { id: 's2', label: '2. Spread butter', icon: 'step', correctBin: 'bin2' },
      { id: 's3', label: '3. Add filling', icon: 'step', correctBin: 'bin3' },
      { id: 's4', label: '4. Close sandwich', icon: 'step', correctBin: 'bin4' },
      { id: 's5', label: '5. Cut into halves', icon: 'step', correctBin: 'bin5' },
    ],
    bins: [
      { id: 'bin1', label: 'Step 1 🍞', color: '#3B82F6' },
      { id: 'bin2', label: 'Step 2 🧈', color: '#10B981' },
      { id: 'bin3', label: 'Step 3 🧀', color: '#F59E0B' },
      { id: 'bin4', label: 'Step 4 🥪', color: '#EC4899' },
      { id: 'bin5', label: 'Step 5 🔪', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: "What is an 'algorithm'?",
    answer: "A set of ordered steps that solves a problem",
    options: [
      "A set of ordered steps that solves a problem",
      "A brand new type of personal computer",
      "A difficult computer programming language"
    ],
    hint: "An algorithm is like a recipe with a clear beginning, middle, and end.",
    misconception: "An algorithm is simply a step-by-step recipe or plan to solve a problem. It does not need a special computer language; humans use algorithms every day!",
  },
  {
    type: 'sort',
    question: "Drag each flowchart symbol to its correct meaning!",
    answer: "sort",
    options: [],
    hint: "Oval is Start/End, Rectangle is Process, Diamond is Decision!",
    misconception: "Flowchart symbols have specific meanings: Oval = Start/End, Rectangle = Process/Action, Diamond = Decision/Question, Parallelogram = Input/Output.",
    sortItems: [
      { id: 'f1', label: 'Oval symbol', icon: 'flowchart', correctBin: 'bin-start' },
      { id: 'f2', label: 'Rectangle symbol', icon: 'flowchart', correctBin: 'bin-process' },
      { id: 'f3', label: 'Diamond symbol', icon: 'flowchart', correctBin: 'bin-decision' },
    ],
    bins: [
      { id: 'bin-start', label: 'Start / End 🟢', color: '#10B981' },
      { id: 'bin-process', label: 'Process / Action 🟦', color: '#3B82F6' },
      { id: 'bin-decision', label: 'Decision 🔶', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: "What does the FD command do in LOGO?",
    answer: "Moves the turtle forward by the given steps, drawing a line",
    options: [
      "Moves the turtle forward by the given steps, drawing a line",
      "Turns the turtle right without moving forward",
      "Hides the turtle arrow from the screen"
    ],
    hint: "FD stands for Forward! It makes the turtle walk and leave a trail.",
    misconception: "FD stands for Forward. It moves the turtle across the screen and draws a line. Turning right (RT) or hiding (HT) do not make the turtle walk forward.",
  },
  {
    type: 'sort',
    question: "Drag each LOGO primitive to its correct action!",
    answer: "sort",
    options: [],
    hint: 'FD is forward, BK is backward, RT is right turn, LT is left turn!',
    misconception: "Remember: FD moves forward, BK moves backward, RT turns right, LT turns left, HT hides the turtle, and ST shows the turtle.",
    sortItems: [
      { id: 'p1', label: 'FD 100', icon: 'fd', correctBin: 'bin-fd' },
      { id: 'p2', label: 'BK 50', icon: 'bk', correctBin: 'bin-bk' },
      { id: 'p3', label: 'RT 90', icon: 'rt', correctBin: 'bin-rt' },
      { id: 'p4', label: 'LT 90', icon: 'lt', correctBin: 'bin-lt' },
    ],
    bins: [
      { id: 'bin-fd', label: 'Move Forward ⬆️', color: '#3B82F6' },
      { id: 'bin-bk', label: 'Move Backward ⬇️', color: '#8B5CF6' },
      { id: 'bin-rt', label: 'Turn Right ➡️', color: '#EC4899' },
      { id: 'bin-lt', label: 'Turn Left ⬅️', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: "Which LOGO commands will draw a complete SQUARE?",
    answer: "FD 100 RT 90 repeated 4 times",
    options: [
      "FD 100 RT 90 repeated 4 times",
      "FD 100 LT 30 repeated 3 times",
      "FD 50 BK 50 repeated 2 times"
    ],
    hint: "A square has 4 equal sides and 4 right-angle turns of 90 degrees!",
    misconception: "To draw a square, the turtle must move forward and turn right by 90 degrees four times so it returns to the starting direction and closes the shape.",
  },
  {
    type: 'sort',
    question: "Drag the LOGO commands to draw the first 2 sides of a square in order!",
    answer: "sort",
    options: [],
    hint: "Side 1: FD then RT 90. Side 2: FD then RT 90!",
    misconception: "Every side needs a movement (FD) followed immediately by a turn (RT 90). If you forget to turn, the turtle draws one long straight line instead of a corner.",
    sortItems: [
      { id: 'c1', label: '1. FD 100', icon: 'fd', correctBin: 'bin-1' },
      { id: 'c2', label: '2. RT 90', icon: 'rt', correctBin: 'bin-2' },
      { id: 'c3', label: '3. FD 100', icon: 'fd', correctBin: 'bin-3' },
      { id: 'c4', label: '4. RT 90', icon: 'rt', correctBin: 'bin-4' },
    ],
    bins: [
      { id: 'bin-1', label: 'Step 1 🚀', color: '#3B82F6' },
      { id: 'bin-2', label: 'Step 2 🔄', color: '#EC4899' },
      { id: 'bin-3', label: 'Step 3 🚀', color: '#10B981' },
      { id: 'bin-4', label: 'Step 4 🔄', color: '#F59E0B' },
    ],
  },
];

// ─── Component Props ─────────────────────────────────────────

export interface AlgorithmsLogoGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Component ──────────────────────────────────────────

export function AlgorithmsLogoGame({ width = 720, height = 560, onComplete }: AlgorithmsLogoGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 125, y: height - 150 };
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
      const msg = "Great job! You understand algorithms and Logo!";
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
      const compMsg = "Wonderful! You are a brilliant coding star!";
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

    // Find if dropped near any bin
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 30 + idx * 130;
      const binY = 160;
      if (x >= binX - 20 && x <= binX + 130 && y >= binY - 20 && y <= binY + 120) {
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
        const msg = "Fantastic! You sorted the algorithm steps perfectly!";
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
      className="relative select-none overflow-hidden rounded-2xl shadow-2xl font-sans"
      style={{ width, height, background: '#0F172A' }}
    >
      <CodingSceneBackground width={width} height={height} />
      <CoderKabir mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
          <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <span>🐢</span> Algorithms & LOGO Adventure
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gold-200">
                Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
              </span>
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setScreen('play');
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black px-4 py-1.5 rounded-xl shadow-lg hover:scale-105 transition-transform text-sm"
              >
                Skip to Play 🚀
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center my-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIdx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className={`w-full max-w-xl rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} border-2 border-white/30 text-white flex flex-col items-center text-center`}
              >
                <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
                <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
                <p className="text-base font-medium leading-relaxed opacity-95">{TEACHING_SLIDES[slideIdx].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (slideIdx > 0) {
                  audioManager.play('tap');
                  setSlideIdx(prev => prev - 1);
                }
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2 rounded-xl font-bold text-white shadow-md ${slideIdx === 0 ? 'bg-gray-600 opacity-40 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-500'}`}
            >
              Previous
            </button>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-yellow-400 w-6' : 'bg-white/40'}`} />
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
              className="px-6 py-2 rounded-xl font-black text-white bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 shadow-lg"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🎮' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
          <div className="flex justify-between items-center bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/20">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-yellow-300">Level {challengeIdx + 1} / {CHALLENGES.length}</span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-emerald-300">Score: {score}</span>
              <button
                onClick={handleShowHint}
                className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-black px-3 py-1 rounded-xl text-xs shadow-md"
              >
                💡 Hint
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-2">
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl border-4 border-gold-400 mb-3"
            >
              <h3 className="text-lg font-black text-gray-800 text-center mb-4">{currentChallenge.question}</h3>

              {currentChallenge.type === 'identify' && (
                <div className="flex flex-col gap-2.5">
                  {currentChallenge.options.map((opt, i) => {
                    const isSelected = selectedOpt === opt;
                    const isCorrectAnswer = opt === currentChallenge.answer;
                    let btnStyle = 'bg-gold-50 border-gold-200 text-gold-900 hover:bg-gold-100';
                    if (selectedOpt) {
                      if (isCorrectAnswer) btnStyle = 'bg-emerald-500 border-emerald-600 text-white';
                      else if (isSelected) btnStyle = 'bg-rose-500 border-rose-600 text-white';
                      else btnStyle = 'bg-gray-100 text-gray-400 opacity-60';
                    }
                    return (
                      <motion.button
                        key={i}
                        whileHover={!selectedOpt ? { scale: 1.02 } : {}}
                        whileTap={!selectedOpt ? { scale: 0.98 } : {}}
                        onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                        disabled={selectedOpt === currentChallenge.answer}
                        className={`w-full text-left px-4 py-3 rounded-2xl font-bold border-2 shadow-sm transition-all text-sm flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOpt && isCorrectAnswer && <span>✅</span>}
                        {selectedOpt && isSelected && !isCorrectAnswer && <span>❌</span>}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {currentChallenge.type === 'sort' && currentChallenge.bins && (
                <div className="relative h-60 w-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 overflow-hidden">
                  {currentChallenge.bins.map((bin, idx) => {
                    const binWidth = 120;
                    const totalBins = currentChallenge.bins?.length || 1;
                    const spacing = (width - 80 - totalBins * binWidth) / (totalBins + 1);
                    const binX = spacing + idx * (binWidth + spacing);
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={binX}
                        y={15}
                        width={binWidth}
                        height={100}
                        isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                      />
                    );
                  })}

                  {currentChallenge.sortItems?.map(item => (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={itemPositions[item.id]?.x || 40}
                      y={itemPositions[item.id]?.y || 140}
                      placed={placedItems[item.id] || false}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <div className="flex justify-between items-center px-2">
            <span className="text-xs text-gold-200 font-semibold">
              Errors: {errors}
            </span>
            {(selectedOpt || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black px-6 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-sm"
              >
                Continue 🚀
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
