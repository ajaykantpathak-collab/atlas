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

// ─── Custom SVG Icons for Circulatory System ���───────────────────────

function HeartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path
        d="M30 52 C30 52, 10 38, 10 24 C10 15, 17 10, 24 10 C29 10, 30 14, 30 14 C30 14, 31 10, 36 10 C43 10, 50 15, 50 24 C50 38, 30 52, 30 52 Z"
        fill="#E53935"
        stroke="#B71C1C"
        strokeWidth="2"
      />
      {/* Valves & Chambers detail */}
      <path d="M22 22 Q30 18, 38 22" fill="none" stroke="#FFCDD2" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="28" r="3" fill="#FF5252" />
      <circle cx="36" cy="28" r="3" fill="#FF5252" />
    </svg>
  );
}

function ArteryIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Thick red elastic tube */}
      <rect x="20" y="10" width="20" height="40" rx="6" fill="#D32F2F" stroke="#B71C1C" strokeWidth="2.5" />
      <rect x="23" y="13" width="14" height="34" rx="4" fill="#EF5350" />
      {/* Blood flow indicator */}
      <path d="M30 16 L30 40 M26 22 L30 16 L34 22" stroke="#FFCDD2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function VeinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Thinner blue tube with valves */}
      <rect x="22" y="10" width="16" height="40" rx="5" fill="#1976D2" stroke="#0D47A1" strokeWidth="2" />
      <rect x="24" y="13" width="12" height="34" rx="3" fill="#42A5F5" />
      {/* One-way valves */}
      <path d="M24 25 L36 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 38 L36 35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RedBloodCellIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="20" ry="14" fill="#E53935" stroke="#B71C1C" strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="10" ry="6" fill="#FFCDD2" opacity="0.7" />
    </svg>
  );
}

function WhiteBloodCellIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path
        d="M30 12 C38 12, 48 18, 46 28 C48 38, 38 48, 28 46 C18 48, 12 38, 14 28 C12 18, 22 12, 30 12 Z"
        fill="#FAFAFA"
        stroke="#90A4AE"
        strokeWidth="2"
      />
      {/* Nucleus lobes */}
      <circle cx="26" cy="26" r="4" fill="#B0BEC5" />
      <circle cx="34" cy="32" r="5" fill="#B0BEC5" />
    </svg>
  );
}

function PlateletIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path
        d="M20 22 C25 15, 38 18, 42 26 C48 35, 38 46, 26 44 C15 42, 16 30, 20 22 Z"
        fill="#FFB74D"
        stroke="#EF6C00"
        strokeWidth="2"
      />
      <circle cx="30" cy="30" r="4" fill="#FFE082" />
    </svg>
  );
}

function OxygenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="18" fill="#4FC3F7" stroke="#0288D1" strokeWidth="2" />
      <text x="30" y="36" fontSize="18" fontWeight="bold" fill="#0D47A1" textAnchor="middle">O₂</text>
    </svg>
  );
}

function NutrientIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="16" y="20" width="28" height="24" rx="4" fill="#81C784" stroke="#388E3C" strokeWidth="2" />
      <path d="M16 28 L44 28" stroke="#388E3C" strokeWidth="2" />
      <circle cx="30" cy="34" r="3" fill="#FFF" />
    </svg>
  );
}

function WasteIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 20 L40 20 L37 48 L23 48 Z" fill="#90A4AE" stroke="#455A64" strokeWidth="2" />
      <path d="M16 16 L44 16 L44 20 L16 20 Z" fill="#78909C" />
      <line x1="26" y1="26" x2="34" y2="42" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="26" x2="26" y2="42" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BodySilhouetteIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path
        d="M30 10 C34 10, 37 13, 37 17 C37 21, 34 24, 30 24 C26 24, 23 21, 23 17 C23 13, 26 10, 30 10 Z M18 28 C22 26, 38 26, 42 28 L46 50 L38 52 L32 38 L28 38 L22 52 L14 50 Z"
        fill="#90CAF9"
        stroke="#1E88E5"
        strokeWidth="1.5"
      />
      {/* Heart inside */}
      <circle cx="30" cy="31" r="4" fill="#E53935" />
    </svg>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: "The Circulatory System & Heart ❤️",
    text: "The heart is a strong muscular organ in your chest, about the size of your closed fist! It beats continuously day and night, pumping blood through a vast network of blood vessels to every corner of your body.",
    emoji: "❤️",
    bgColor: "from-red-500 to-rose-600",
    spoken: "The heart is a strong muscular organ in your chest that pumps blood through your body continuously.",
  },
  {
    title: "Arteries vs Veins 🛣️",
    text: "Arteries are thick, strong blood vessels that carry blood AWAY from the heart under high pressure. Veins carry blood BACK to the heart and have special one-way valves to prevent blood from flowing backward!",
    emoji: "🛣️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Arteries carry blood away from the heart with thick walls, while veins bring blood back with valves to stop backflow.",
  },
  {
    title: "Functions of Blood 🩸",
    text: "Blood is our living transport system! Red blood cells carry oxygen from lungs. Plasma carries nutrients from food. White blood cells fight germs like soldiers, and platelets help blood clot at cuts.",
    emoji: "🩸",
    bgColor: "from-rose-500 to-red-700",
    spoken: "Blood carries oxygen and food, removes waste, fights disease with white cells, and clots cuts using platelets.",
  },
  {
    title: "The Components of Blood 🧬",
    text: "Blood has a pale-yellow liquid part called plasma. Floating in plasma are red blood cells, infection-fighting white blood cells, and tiny repair platelets.",
    emoji: "🧬",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Plasma is the liquid part of blood that carries red blood cells, white blood cells, and platelets.",
  },
  {
    title: "The Endless Cycle of Circulation 🔄",
    text: "Circulation is an endless loop: Heart pumps blood -> Arteries carry it to body -> Capillaries deliver oxygen/food and collect waste -> Veins return blood to heart -> Heart pumps it to lungs for fresh oxygen!",
    emoji: "🔄",
    bgColor: "from-teal-500 to-emerald-600",
    spoken: "Blood circulates continuously from heart to arteries, body cells, veins, and lungs in a never-ending journey.",
  },
];

// ─── Challenges ───────────────────────────────────────────────

const CHALLENGES = [
  {
    type: 'identify' as ChallengeType,
    question: 'Which organ is the central muscular pump that pushes blood to the whole body?',
    answer: 'Heart',
    options: ['Heart', 'Lungs', 'Stomach', 'Kidneys'],
    hint: 'Think of the fist-sized organ beating in your chest right now!',
    misconception: 'The heart is the central muscular pump! While lungs supply oxygen and stomach digests food, the heart beats continuously to pump blood everywhere.',
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag each blood vessel or feature to its correct category!',
    answer: 'sort',
    options: [],
    hint: 'Arteries carry blood away with thick walls; veins bring blood back with valves!',
    misconception: 'Remember: arteries carry blood AWAY from the heart with thick walls, and veins carry blood BACK to the heart with one-way valves!',
    sortItems: [
      { id: 'art1', label: 'Carries blood away', icon: 'artery', correctBin: 'artery-bin' },
      { id: 'vein1', label: 'Carries blood back', icon: 'vein', correctBin: 'vein-bin' },
      { id: 'art2', label: 'Thick, strong walls', icon: 'artery', correctBin: 'artery-bin' },
      { id: 'vein2', label: 'Has valves for backflow', icon: 'vein', correctBin: 'vein-bin' },
    ],
    bins: [
      { id: 'artery-bin', label: 'Arteries 🔴', color: '#D32F2F' },
      { id: 'vein-bin', label: 'Veins 🔵', color: '#1976D2' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: 'What do red blood cells mainly carry from the lungs to every cell in the body?',
    answer: 'Oxygen',
    options: ['Oxygen', 'Carbon dioxide', 'Digested waste', 'Germs'],
    hint: 'We breathe this in from fresh air so our cells can release energy!',
    misconception: 'Red blood cells carry oxygen from the lungs to all cells! Carbon dioxide is waste carried back to the lungs to be breathed out.',
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag each blood part to its correct vital function!',
    answer: 'sort',
    options: [],
    hint: 'Red cells = oxygen, White cells = fight germs, Platelets = clot!',
    misconception: 'Each blood part has a specific job: red cells carry oxygen, white cells fight germs like soldiers, and platelets help wounds clot and heal!',
    sortItems: [
      { id: 'rbc', label: 'Carry Oxygen', icon: 'rbc', correctBin: 'bin-rbc' },
      { id: 'wbc', label: 'Fight Germs', icon: 'wbc', correctBin: 'bin-wbc' },
      { id: 'plat', label: 'Help Blood Clot', icon: 'platelet', correctBin: 'bin-plat' },
    ],
    bins: [
      { id: 'bin-rbc', label: 'Red Blood Cells 🔴', color: '#E53935' },
      { id: 'bin-wbc', label: 'White Blood Cells ⚪', color: '#78909C' },
      { id: 'bin-plat', label: 'Platelets 🛡️', color: '#FFB74D' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: 'What is the correct general path of blood during circulation?',
    answer: 'Heart -> Arteries -> Body cells -> Veins -> Heart',
    options: [
      'Heart -> Arteries -> Body cells -> Veins -> Heart',
      'Body cells -> Heart -> Arteries -> Veins',
      'Heart -> Veins -> Body cells -> Arteries -> Heart',
      'Arteries -> Heart -> Veins -> Body cells',
    ],
    hint: 'Heart pumps out through arteries, and returns through veins!',
    misconception: 'The path of blood is: Heart pumps blood out through arteries to the body, and it returns to the heart through veins!',
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag the steps of blood circulation into the correct order!',
    answer: 'sort',
    options: [],
    hint: 'Start with the heart pumping out, then capillaries exchange, then veins return!',
    misconception: 'Circulation order: Heart pumps blood out -> Capillaries deliver oxygen/nutrients and pick up waste -> Veins return blood to heart -> Lungs refresh blood with oxygen!',
    sortItems: [
      { id: 's1', label: '1. Heart pumps blood out', icon: 'heart', correctBin: 'b1' },
      { id: 's2', label: '2. Arteries carry to body', icon: 'artery', correctBin: 'b2' },
      { id: 's3', label: '3. Capillaries exchange', icon: 'oxygen', correctBin: 'b3' },
      { id: 's4', label: '4. Veins return to heart', icon: 'vein', correctBin: 'b4' },
    ],
    bins: [
      { id: 'b1', label: 'Step 1 ❤️', color: '#E53935' },
      { id: 'b2', label: 'Step 2 🛣️', color: '#D32F2F' },
      { id: 'b3', label: 'Step 3 🔀', color: '#10B981' },
      { id: 'b4', label: 'Step 4 🔄', color: '#1976D2' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: 'Why do veins in your legs have one-way valves inside them?',
    answer: 'To prevent blood from flowing backward against gravity',
    options: [
      'To prevent blood from flowing backward against gravity',
      'To pump blood faster than the heart',
      'To make veins look blue through the skin',
      'To create oxygen in the blood vessels',
    ],
    hint: 'Gravity pulls blood down; valves stop it from slipping backward!',
    misconception: 'Valves in veins act like one-way doors to stop blood from flowing backward against gravity when returning from the legs!',
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag each statement to True (Correct function of blood/circulatory system) or False!',
    answer: 'sort',
    options: [],
    hint: 'Blood carries oxygen, food, waste, and fights disease. It does NOT digest food!',
    misconception: 'Blood carries oxygen, nutrients, and waste, and fights disease. It does NOT digest food in the stomach—digestion is done by the digestive system!',
    sortItems: [
      { id: 't1', label: 'Carries oxygen to cells', icon: 'oxygen', correctBin: 'true-bin' },
      { id: 't2', label: 'Carries food nutrients', icon: 'nutrient', correctBin: 'true-bin' },
      { id: 't3', label: 'Digests food in stomach', icon: 'waste', correctBin: 'false-bin' },
      { id: 't4', label: 'Fights germs with WBC', icon: 'wbc', correctBin: 'true-bin' },
    ],
    bins: [
      { id: 'true-bin', label: 'True ✅', color: '#10B981' },
      { id: 'false-bin', label: 'False ❌', color: '#EF4444' },
    ],
  },
];

// ─── Doctor Deepa Mascot ──────────────────────────────────────

function DoctorDeepa({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-rose-200"
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
          {/* Head & Hair */}
          <circle cx="37.5" cy="30" r="18" fill="#FFCC80" stroke="#F57C00" strokeWidth="1.5" />
          <path d="M19 28 Q37.5 14, 56 28 L56 22 Q37.5 8, 19 22 Z" fill="#212121" />
          {/* Doctor Coat */}
          <path d="M20 48 L37.5 55 L55 48 L58 80 L17 80 Z" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="1.5" />
          <path d="M28 48 L37.5 60 L47 48" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="1" />
          {/* Heart Badge */}
          <circle cx="30" cy="62" r="6" fill="#FFFFFF" stroke="#E53935" strokeWidth="1.5" />
          <path d="M30 65 C30 65, 27 61, 27 59 C27 57.5, 28.5 56.5, 30 58 C31.5 56.5, 33 57.5, 33 59 C33 61, 30 65, 30 65 Z" fill="#E53935" />
          {/* Stethoscope */}
          <path d="M28 35 Q20 40, 22 50 L27 65" fill="none" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
          <circle cx="27" cy="66" r="3" fill="#B0BEC5" stroke="#37474F" strokeWidth="1.5" />
          {/* Eyes & Smile */}
          <circle cx="31" cy="27" r="2.5" fill="#212121" />
          <circle cx="44" cy="27" r="2.5" fill="#212121" />
          <path d="M33 35 Q37.5 39, 42 35" stroke="#C62828" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ─────────────────────────────────────────────────

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
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={i < count ? '#FFD700' : 'none'}
            stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'}
            strokeWidth="2"
          >
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Hospital & Circulatory System Scene Background ─────────────

function HospitalSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="hospital-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#FEE2E2" />
          </linearGradient>
          <linearGradient id="hospital-ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#hospital-sky-grad)" />
        <rect y={height - 100} width={width} height={100} fill="url(#hospital-ground-grad)" />
      </svg>

      {/* Hospital Window / Heartbeat line decoration */}
      <div className="absolute top-8 left-10 opacity-20">
        <svg width="180" height="60" viewBox="0 0 180 60">
          <path d="M0 30 L40 30 L50 10 L65 50 L80 20 L95 40 L105 30 L180 30" fill="none" stroke="#B91C1C" strokeWidth="4" />
        </svg>
      </div>

      {/* Floating Red Blood Cells / Oxygen decorations */}
      <motion.div
        className="absolute top-16 right-24 opacity-30"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <RedBloodCellIcon size={50} />
      </motion.div>
      <motion.div
        className="absolute bottom-24 left-20 opacity-30"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <OxygenIcon size={45} />
      </motion.div>
    </div>
  );
}

// ─── Sort Item Icon Renderer ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'artery': return <ArteryIcon size={size} />;
    case 'vein': return <VeinIcon size={size} />;
    case 'heart': return <HeartIcon size={size} />;
    case 'rbc': return <RedBloodCellIcon size={size} />;
    case 'wbc': return <WhiteBloodCellIcon size={size} />;
    case 'platelet': return <PlateletIcon size={size} />;
    case 'oxygen': return <OxygenIcon size={size} />;
    case 'nutrient': return <NutrientIcon size={size} />;
    case 'waste': return <WasteIcon size={size} />;
    default: return <HeartIcon size={size} />;
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
    <Draggable
      id={id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={120}
      height={100}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-rose-300 ${
          placed ? 'opacity-40' : 'bg-white'
        } px-2 py-1`}
        style={{ width: 120, height: 100 }}
      >
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ──────────────────────────────────────

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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${
        isHovering ? 'scale-105 shadow-xl' : 'shadow'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-1 shadow"
        style={{ backgroundColor: color }}
      >
        📥
      </div>
      <span className="text-xs font-extrabold text-gray-900 text-center px-1">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface CirculatoryGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function CirculatoryGame({ width = 720, height = 560, onComplete }: CirculatoryGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 145, y: height - 165 };
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
      const compMsg = "Wonderful! You are a brilliant circulatory expert!";
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
    const binWidth = currentChallenge.bins.length === 2 ? 260 : 150;
    const binHeight = 110;
    const binY = 120;

    currentChallenge.bins.forEach((bin, idx) => {
      const binX = currentChallenge.bins!.length === 2 ? 80 + idx * 310 : 30 + idx * 170;
      if (x >= binX && x <= binX + binWidth && y >= binY && y <= binY + binHeight) {
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
    <div
      className="relative overflow-hidden rounded-3xl shadow-2xl select-none font-sans bg-slate-900 flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      <HospitalSceneBg width={width} height={height} />
      <DoctorDeepa mood={mascotMood} speaking={speakingText} />

      {/* Header bar */}
      <div className="absolute top-4 left-6 z-20 flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-rose-100">
        <span className="text-sm font-extrabold text-rose-800">❤️ Circulatory System</span>
        {screen === 'play' && (
          <>
            <span className="text-xs font-bold text-gray-600">
              Q {challengeIdx + 1}/{CHALLENGES.length}
            </span>
            <StarRow count={Math.min(5, Math.floor(score / 20))} total={5} />
          </>
        )}
      </div>

      {/* Screen 1: Teaching */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 py-16">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIdx(prev => Math.max(0, prev - 1));
                }}
                disabled={slideIdx === 0}
                className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-bold disabled:opacity-30 transition-all"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                  />
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
                className="px-6 py-2 rounded-xl bg-white text-rose-600 font-extrabold shadow-lg hover:bg-rose-50 transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game 🚀' : 'Next ➜'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Screen 2: Play */}
      {screen === 'play' && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 pt-20 pb-6">
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-rose-100 flex flex-col items-center">
            <h3 className="text-lg font-black text-gray-800 text-center mb-4">{currentChallenge.question}</h3>

            {/* Identify Question Mode */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg mb-4">
                {currentChallenge.options.map(opt => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnStyle = 'bg-rose-50 hover:bg-rose-100 text-gray-800 border-rose-200';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnStyle = 'bg-emerald-500 text-white border-emerald-600';
                    else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-2xl font-bold text-sm border-2 shadow-md transition-all flex items-center justify-center text-center ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Sort Question Mode */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-[250px] mb-4">
                {/* Bins */}
                {currentChallenge.bins.map((bin, idx) => {
                  const binWidth = currentChallenge.bins!.length === 2 ? 260 : 150;
                  const binX = currentChallenge.bins!.length === 2 ? 80 + idx * 310 : 30 + idx * 170;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={binX}
                      y={10}
                      width={binWidth}
                      height={110}
                      isHovering={hoveredBin === bin.id}
                      onMouseEnter={() => setHoveredBin(bin.id)}
                      onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {/* Draggable Items */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 150 };
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

            {/* Hint Button / Next Button */}
            <div className="flex items-center justify-between w-full mt-2">
              <button
                onClick={handleShowHint}
                className="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-sm shadow transition-all flex items-center gap-1"
              >
                💡 Hint
              </button>

              {((currentChallenge.type === 'identify' && selectedOpt) ||
                (currentChallenge.type === 'sort' &&
                  currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={advanceChallenge}
                  className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg transition-all"
                >
                  Continue ➜
                </motion.button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
