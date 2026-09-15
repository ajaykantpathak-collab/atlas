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

// ─── SVG ICON COMPONENTS (10+) ──��──────────────────────────────────────────

function AbacusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="2" />
      <line x1="30" y1="8" x2="30" y2="52" stroke="#451A03" strokeWidth="3" />
      {[16, 24, 36, 44].map((y) => (
        <g key={y}>
          <line x1="8" y1={y} x2="52" y2={y} stroke="#D97706" strokeWidth="1.5" />
          <circle cx="20" cy={y} r="4" fill="#EF4444" />
          <circle cx="40" cy={y} r="4" fill="#3B82F6" />
        </g>
      ))}
    </svg>
  );
}

function NapiersBonesIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="8" width="40" height="44" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      {[20, 30, 40].map((x) => (
        <line key={x} x1={x} y1="8" x2={x} y2="52" stroke="#F59E0B" strokeWidth="1" />
      ))}
      {[18, 28, 38, 48].map((y) => (
        <line key={y} x1="10" y1={y} x2="50" y2={y} stroke="#F59E0B" strokeWidth="1" />
      ))}
      <text x="30" y="15" textAnchor="middle" fill="#B45309" fontSize="8" fontWeight="bold">NAPIER</text>
    </svg>
  );
}

function PascalineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="14" width="48" height="32" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="2" />
      <circle cx="18" cy="30" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="42" cy="30" r="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <text x="18" y="33" textAnchor="middle" fill="#78350F" fontSize="8" fontWeight="bold">0</text>
      <text x="30" y="33" textAnchor="middle" fill="#78350F" fontSize="8" fontWeight="bold">4</text>
      <text x="42" y="33" textAnchor="middle" fill="#78350F" fontSize="8" fontWeight="bold">2</text>
    </svg>
  );
}

function DifferenceEngineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="16" width="40" height="28" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <circle cx="20" cy="30" r="6" fill="#94A3B8" />
      <circle cx="35" cy="24" r="5" fill="#64748B" />
      <circle cx="40" cy="38" r="4" fill="#64748B" />
      <path d="M15 44 L45 44" stroke="#CBD5E1" strokeWidth="3" />
    </svg>
  );
}

function AnalyticalEngineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="36" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <rect x="14" y="18" width="16" height="12" fill="#38BDF8" rx="2" />
      <rect x="34" y="18" width="12" height="12" fill="#F43F5E" rx="2" />
      <rect x="14" y="34" width="32" height="8" fill="#22C55E" rx="2" />
      <text x="30" y="40" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">MILL & STORE</text>
    </svg>
  );
}

function TabulatingMachineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="14" width="40" height="32" rx="4" fill="#475569" stroke="#334155" strokeWidth="2" />
      {/* Punched card */}
      <rect x="18" y="22" width="24" height="16" fill="#FEF08A" rx="1" />
      <circle cx="22" cy="27" r="1.5" fill="#1E293B" />
      <circle cx="28" cy="27" r="1.5" fill="#1E293B" />
      <circle cx="34" cy="33" r="1.5" fill="#1E293B" />
      <circle cx="40" cy="27" r="1.5" fill="#1E293B" />
    </svg>
  );
}

function FirstGenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="2" />
      {/* Vacuum tube */}
      <path d="M24 20 C24 14, 36 14, 36 20 L36 34 L24 34 Z" fill="#FDE047" opacity="0.8" />
      <rect x="22" y="34" width="16" height="6" fill="#CA8A04" />
      <circle cx="30" cy="25" r="3" fill="#EF4444" />
    </svg>
  );
}

function SecondGenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="16" width="36" height="28" rx="6" fill="#047857" stroke="#065F46" strokeWidth="2" />
      {/* Transistor shape */}
      <circle cx="30" cy="30" r="8" fill="#10B981" />
      <line x1="30" y1="22" x2="30" y2="12" stroke="#F59E0B" strokeWidth="2" />
      <line x1="23" y1="35" x2="16" y2="44" stroke="#F59E0B" strokeWidth="2" />
      <line x1="37" y1="35" x2="44" y2="44" stroke="#F59E0B" strokeWidth="2" />
    </svg>
  );
}

function ThirdGenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" rx="4" fill="#312E81" stroke="#4338CA" strokeWidth="2" />
      <rect x="20" y="20" width="20" height="20" fill="#4F46E5" rx="2" />
      {/* IC Pins */}
      {[16, 24, 32, 40].map((x) => (
        <g key={x}>
          <rect x={x} y="8" width="2" height="4" fill="#F59E0B" />
          <rect x={x} y="48" width="2" height="4" fill="#F59E0B" />
        </g>
      ))}
    </svg>
  );
}

function FourthGenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
      <rect x="18" y="18" width="24" height="24" fill="#1E293B" rx="2" stroke="#38BDF8" strokeWidth="1" />
      <text x="30" y="33" textAnchor="middle" fill="#38BDF8" fontSize="9" fontWeight="bold">CPU</text>
      {/* Microprocessor grid lines */}
      <line x1="24" y1="18" x2="24" y2="42" stroke="#334155" strokeWidth="1" />
      <line x1="36" y1="18" x2="36" y2="42" stroke="#334155" strokeWidth="1" />
      <line x1="18" y1="26" x2="42" y2="26" stroke="#334155" strokeWidth="1" />
      <line x1="18" y1="34" x2="42" y2="34" stroke="#334155" strokeWidth="1" />
    </svg>
  );
}

function FifthGenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="32" rx="4" fill="#701A75" stroke="#86198F" strokeWidth="2" />
      <circle cx="30" cy="28" r="10" fill="#E879F9" opacity="0.8" />
      <path d="M22 28 Q30 18, 38 28 Q30 38, 22 28 Z" fill="#F0ABFC" />
      <circle cx="30" cy="28" r="3" fill="#4A044E" />
    </svg>
  );
}

function TimelineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="10" y1="30" x2="50" y2="30" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
      <circle cx="16" cy="30" r="5" fill="#3B82F6" />
      <circle cx="30" cy="30" r="5" fill="#10B981" />
      <circle cx="44" cy="30" r="5" fill="#F59E0B" />
    </svg>
  );
}

// ─── SCENE BACKGROUND ─────────────────────────────────────────

function MuseumSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="museum-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="window-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#museum-bg)" />
        {/* Museum display windows / arches */}
        <path d="M 80 40 L 80 180 Q 140 120, 200 180 L 200 40 Z" fill="#1E293B" opacity="0.5" />
        <rect x="90" y="50" width="100" height="120" rx="4" fill="url(#window-sky)" opacity="0.3" />
        
        {/* Exhibition floor */}
        <rect x="0" y={height - 70} width={width} height={70} fill="#0F172A" />
        <line x1="0" y1={height - 70} x2={width} y2={height - 70} stroke="#475569" strokeWidth="3" />
      </svg>
    </div>
  );
}

// ─── PROFESSOR PRANAV MASCOT ───────────────────────────────────

function ProfessorPranav({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-25 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-500"
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
          {/* Head & Hair */}
          <circle cx="37.5" cy="35" r="22" fill="#FED7AA" />
          <path d="M15 30 Q37.5 10, 60 30 Q58 18, 37.5 16 Q17 18, 15 30 Z" fill="#475569" />
          {/* Face */}
          <circle cx="37.5" cy="37" r="16" fill="#FDE68A" />
          {/* Glasses */}
          <rect x="25" y="30" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <rect x="40" y="30" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="35" y1="34" x2="40" y2="34" stroke="#1E293B" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="30" cy="34" r="2" fill="#1E293B" />
          <circle cx="45" cy="34" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M32 44 Q37.5 49 43 44" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Bow Tie & Jacket */}
          <path d="M22 55 L37.5 52 L53 55 L55 80 L20 80 Z" fill="#1E3A8A" stroke="#1E293B" strokeWidth="2" />
          <polygon points="37.5,56 31,61 31,58" fill="#DC2626" />
          <polygon points="37.5,56 44,61 44,58" fill="#DC2626" />
          {/* Computer Badge */}
          <rect x="33" y="65" width="9" height="10" rx="1" fill="#38BDF8" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── STAR ROW ─────────────────────────────────────────────────

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

// ─── RENDER SORT ICON ─────────────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'abacus': return <AbacusIcon size={size} />;
    case 'napiers': return <NapiersBonesIcon size={size} />;
    case 'pascaline': return <PascalineIcon size={size} />;
    case 'difference': return <DifferenceEngineIcon size={size} />;
    case 'analytical': return <AnalyticalEngineIcon size={size} />;
    case 'tabulating': return <TabulatingMachineIcon size={size} />;
    case 'firstgen': return <FirstGenIcon size={size} />;
    case 'secondgen': return <SecondGenIcon size={size} />;
    case 'thirdgen': return <ThirdGenIcon size={size} />;
    case 'fourthgen': return <FourthGenIcon size={size} />;
    case 'fifthgen': return <FifthGenIcon size={size} />;
    default: return <AbacusIcon size={size} />;
  }
}

// ─── SORT CARD & BIN ──────────────────────────────────────────

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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} p-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}22` }}
    >
      <span className="text-sm font-extrabold text-white text-center px-2 drop-shadow">{label}</span>
    </div>
  );
}

// ─── TEACHING SLIDES ────────────────────���─────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Early Calculating Devices! 🧮",
    text: "Long before electronic computers, humans invented tools to count! The abacus uses beads on rods for addition and subtraction. Napier's bones uses numbered rods for multiplication. The Pascaline uses gears for mechanical addition!",
    emoji: "🧮",
    bgColor: "from-amber-700 to-orange-800",
    spoken: "Long before electronic computers, humans invented tools to count! The abacus uses beads on rods, Napier's bones multiplies, and the Pascaline uses gears to add.",
  },
  {
    title: "Mechanical & Electromechanical Giants! ⚙️",
    text: "Charles Babbage designed the Difference Engine and the Analytical Engine. The Analytical Engine had input, processing, storage, and output — making Babbage the Father of the Computer! Herman Hollerith built the Tabulating Machine using punched cards.",
    emoji: "⚙️",
    bgColor: "from-blue-700 to-indigo-800",
    spoken: "Charles Babbage designed the Difference and Analytical Engines, earning the title Father of the Computer. Herman Hollerith built the Tabulating Machine with punched cards.",
  },
  {
    title: "Generations of Computers — 1st & 2nd! ⚡",
    text: "First generation computers (1940s-1950s) used glowing vacuum tubes like ENIAC; they were huge and hot! Second generation (1950s-1960s) replaced tubes with tiny, reliable transistors.",
    emoji: "⚡",
    bgColor: "from-purple-700 to-indigo-900",
    spoken: "First generation computers used large vacuum tubes like ENIAC. Second generation replaced tubes with tiny, reliable transistors.",
  },
  {
    title: "Generations — 3rd, 4th & 5th! 💻",
    text: "Third generation introduced Integrated Circuits (ICs). Fourth generation brought microprocessors, creating personal desktop computers! Fifth generation focuses on Artificial Intelligence (AI) to learn and think.",
    emoji: "💻",
    bgColor: "from-emerald-700 to-teal-900",
    spoken: "Third generation used Integrated Circuits. Fourth generation brought microprocessors for personal computers. Fifth generation focuses on Artificial Intelligence.",
  },
  {
    title: "Characteristics & Limitations! 🌟",
    text: "Computers have amazing characteristics: Speed, Accuracy, Storage, Diligence, and Versatility! However, they have limitations: they have no IQ, no feelings, and depend entirely on human instructions and electricity.",
    emoji: "🌟",
    bgColor: "from-sky-700 to-blue-900",
    spoken: "Computers have speed, accuracy, storage, diligence, and versatility. But they have limitations: no IQ, no feelings, and dependence on human instructions.",
  },
];

// ─── CHALLENGES (8 progressive) ───────────────────────────────

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
    question: "Which of the following is the OLDEST calculating device among the three early tools?",
    answer: "Abacus",
    options: ["Abacus", "Pascaline", "Analytical Engine"],
    hint: "Think of the wooden frame with beads sliding on vertical rods used in markets across India!",
    misconception: "The abacus is the oldest manual counting tool among the three early calculating devices, long predating the Pascaline and the Analytical Engine.",
  },
  {
    type: 'sort',
    question: "Drag each early device to its correct inventor or origin!",
    answer: "sort",
    options: [],
    hint: "Abacus has no single inventor (ancient). John Napier invented Napier's bones. Blaise Pascal built the Pascaline.",
    misconception: "Remember: the abacus is ancient with no single inventor, John Napier made Napier's bones, and Blaise Pascal built the Pascaline.",
    sortItems: [
      { id: 'item-abacus', label: 'Abacus', icon: 'abacus', correctBin: 'bin-ancient' },
      { id: 'item-napiers', label: "Napier's Bones", icon: 'napiers', correctBin: 'bin-napier' },
      { id: 'item-pascaline', label: 'Pascaline', icon: 'pascaline', correctBin: 'bin-pascal' },
    ],
    bins: [
      { id: 'bin-ancient', label: 'Ancient (No inventor)', color: '#D97706' },
      { id: 'bin-napier', label: 'John Napier', color: '#2563EB' },
      { id: 'bin-pascal', label: 'Blaise Pascal', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: "Who is known as the 'Father of the Computer' for designing the Analytical Engine?",
    answer: "Charles Babbage",
    options: ["Charles Babbage", "Herman Hollerith", "Blaise Pascal"],
    hint: "He designed both the Difference Engine and the Analytical Engine in the 19th century.",
    misconception: "Charles Babbage is honoured as the father of the computer because his Analytical Engine introduced input, processing, storage, and output.",
  },
  {
    type: 'sort',
    question: "Drag each Babbage or Hollerith machine to its correct description!",
    answer: "sort",
    options: [],
    hint: "Difference Engine computed polynomial tables. Analytical Engine was general-purpose. Tabulating Machine used punched cards for census.",
    misconception: "Remember: Difference Engine computed polynomial tables, Analytical Engine was the first general-purpose design, and Hollerith's machine used punched cards.",
    sortItems: [
      { id: 'item-diff', label: 'Difference Engine', icon: 'difference', correctBin: 'bin-diff' },
      { id: 'item-anal', label: 'Analytical Engine', icon: 'analytical', correctBin: 'bin-anal' },
      { id: 'item-tab', label: 'Tabulating Machine', icon: 'tabulating', correctBin: 'bin-tab' },
    ],
    bins: [
      { id: 'bin-diff', label: 'Polynomial Tables', color: '#475569' },
      { id: 'bin-anal', label: 'General-Purpose', color: '#3B82F6' },
      { id: 'bin-tab', label: 'Punched Cards / Census', color: '#9333EA' },
    ],
  },
  {
    type: 'identify',
    question: "What was the key electronic component of FIRST generation computers like ENIAC?",
    answer: "Vacuum tubes",
    options: ["Vacuum tubes", "Transistors", "Microprocessors"],
    hint: "They were large glowing glass bulbs that produced a lot of heat and burned out often.",
    misconception: "First generation computers used vacuum tubes. Transistors came in the second generation, not the first.",
  },
  {
    type: 'sort',
    question: "Drag each computer generation to its defining technology!",
    answer: "sort",
    options: [],
    hint: "1st = Vacuum tubes, 2nd = Transistors, 3rd = Integrated Circuits (IC), 4th = Microprocessors, 5th = Artificial Intelligence.",
    misconception: "Each generation is defined by its core electronic component: vacuum tubes, transistors, ICs, microprocessors, and AI.",
    sortItems: [
      { id: 'item-g1', label: '1st Gen (Vacuum Tubes)', icon: 'firstgen', correctBin: 'bin-g1' },
      { id: 'item-g2', label: '2nd Gen (Transistors)', icon: 'secondgen', correctBin: 'bin-g2' },
      { id: 'item-g4', label: '4th Gen (Microprocessors)', icon: 'fourthgen', correctBin: 'bin-g4' },
    ],
    bins: [
      { id: 'bin-g1', label: 'Vacuum Tubes 💡', color: '#B45309' },
      { id: 'bin-g2', label: 'Transistors ⚡', color: '#047857' },
      { id: 'bin-g4', label: 'Microprocessors 💻', color: '#0284C7' },
    ],
  },
  {
    type: 'identify',
    question: "Which of the following is a major LIMITATION of computers?",
    answer: "Cannot think or take decisions on its own (No IQ)",
    options: [
      "Cannot think or take decisions on its own (No IQ)",
      "Cannot store large amounts of data",
      "Works too slowly for calculations"
    ],
    hint: "Think about whether a computer has feelings or can invent ideas without human programming.",
    misconception: "Computers have no IQ, no feelings, and cannot think or decide on their own. They are completely dependent on human instructions.",
  },
  {
    type: 'sort',
    question: "Drag each feature to Advantage or Limitation!",
    answer: "sort",
    options: [],
    hint: "Speed and large storage are advantages. Having no intelligence of its own or needing electricity are limitations.",
    misconception: "Advantages include speed and massive storage, while limitations include having no IQ, no feelings, and depending on electricity.",
    sortItems: [
      { id: 'item-adv', label: 'High Speed & Storage', icon: 'fourthgen', correctBin: 'bin-adv' },
      { id: 'item-lim', label: 'No IQ / Cannot Think', icon: 'fifthgen', correctBin: 'bin-lim' },
    ],
    bins: [
      { id: 'bin-adv', label: 'Advantage ✅', color: '#22C55E' },
      { id: 'bin-lim', label: 'Limitation ⚠️', color: '#EF4444' },
    ],
  },
];

export interface ComputerHistoryGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ComputerHistoryGame({ width = 720, height = 560, onComplete }: ComputerHistoryGameProps) {
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
  const [, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
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
        newPos[item.id] = { x: 40 + idx * 160, y: height - 170 };
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
      setScore((prev) => prev + 10);
      const msg = "Great job! That is correct!";
      setSuccessMsg(msg);
      setSpeakingText(msg);
      speechManager.speak(msg);
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setIsIncorrect(true);
      setErrors((prev) => prev + 1);
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
      setChallengeIdx((prev) => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const compMsg = "Wonderful! You are a brilliant computer historian!";
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
    const item = currentChallenge.sortItems?.find((i) => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 40 + idx * 210;
      const binY = 140;
      const binW = 190;
      const binH = 150;
      if (x >= binX && x <= binX + binW && y >= binY && y <= binY + binH) {
        droppedBinId = bin.id;
      }
    });

    setHoveredBin(null);

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });
      const allDone = currentChallenge.sortItems?.every((i) => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore((prev) => prev + 15);
        const msg = "Fantastic sorting! All correct!";
        setSuccessMsg(msg);
        setSpeakingText(msg);
        speechManager.speak(msg);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setErrors((prev) => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-slate-900 border-4 border-indigo-500" style={{ width, height }}>
      <MuseumSceneBackground width={width} height={height} />
      <ProfessorPranav mood={mascotMood} speaking={speakingText} />

      {/* HEADER BAR */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between z-20 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <TimelineIcon size={32} />
          <span className="text-white font-extrabold text-base tracking-wide">Computer History & Generations</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-600">
            <span className="text-yellow-400 font-bold text-sm">Score: {score}</span>
          </div>
          {screen === 'play' && (
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-600">
              <span className="text-cyan-400 font-bold text-xs">Q {challengeIdx + 1}/8</span>
            </div>
          )}
          <StarRow count={Math.floor(score / 20)} total={5} />
        </div>
      </div>

      {/* TEACHING SCREEN */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 pb-6 px-8 flex flex-col items-center justify-center z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-xl p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl border-4 border-white/20 text-white flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed mb-6 px-4">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-2">
              <button
                onClick={() => setSlideIdx((prev) => Math.max(0, prev - 1))}
                disabled={slideIdx === 0}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 disabled:opacity-30 text-white font-bold text-sm transition"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>
              {slideIdx < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => setSlideIdx((prev) => prev + 1)}
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-sm transition shadow-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    audioManager.play('chime');
                    setScreen('play');
                    setChallengeIdx(0);
                  }}
                  className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm transition shadow-lg animate-bounce"
                >
                  Start Game! 🚀
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* PLAY SCREEN */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-2xl bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-700 text-center mt-2">
            <h3 className="text-white font-bold text-base">{currentChallenge.question}</h3>
          </div>

          {/* IDENTIFY CHALLENGE */}
          {currentChallenge.type === 'identify' && (
            <div className="w-full max-w-xl flex flex-col gap-3 my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectAns = opt === currentChallenge.answer;
                let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600';
                if (selectedOpt) {
                  if (isCorrectAns) btnStyle = 'bg-emerald-600 text-white border-emerald-400';
                  else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-400';
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-sm text-left shadow-md transition ${btnStyle}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* SORT CHALLENGE */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-2xl h-[320px] my-auto">
              {/* Bins */}
              <div className="absolute top-4 left-0 right-0 flex justify-around px-4">
                {currentChallenge.bins.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={idx * 210 + 10}
                    y={0}
                    width={190}
                    height={130}
                    isHovering={hoveredBin === bin.id}
                    onMouseEnter={() => setHoveredBin(bin.id)}
                    onMouseLeave={() => setHoveredBin(null)}
                  />
                ))}
              </div>

              {/* Draggable Cards */}
              {currentChallenge.sortItems.map((item) => {
                const placed = placedItems[item.id] || false;
                const startPos = { x: 40 + currentChallenge.sortItems!.indexOf(item) * 160, y: 180 };
                return (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={startPos.x}
                    y={startPos.y}
                    placed={placed}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                );
              })}
            </div>
          )}

          {/* BOTTOM NAVIGATION / ADVANCE */}
          <div className="w-full max-w-2xl flex justify-between items-center py-2">
            <button
              onClick={handleShowHint}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 transition flex items-center gap-1"
            >
              💡 Hint
            </button>

            {((selectedOpt !== null && selectedOpt === currentChallenge.answer) ||
              (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every((i) => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg transition animate-bounce"
              >
                Continue ➔
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* OVERLAYS & FEEDBACK */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}

export default ComputerHistoryGame;
