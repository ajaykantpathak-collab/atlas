'use client';

/**
 * MapsLengthGame — Learn about simple maps, 3D object line drawings,
 * standard units of length (cm and m), measuring tools, estimation,
 * and the relationship between metre and centimetre.
 *
 * CISCE Nodes: c3_math_022 (Simple map reading), c3_math_023 (Line-drawings of 3D objects),
 *              c3_math_024 (Need for standard units), c3_math_025 (Measurement using cm and m),
 *              c3_math_026 (Use of scale and tape), c3_math_027 (Estimation and verification),
 *              c3_math_028 (Relationship between metre and centimeter)
 *
 * Mascot: Surveyor Suresh — a friendly land surveyor with a measuring tape, ruler, map, and compass.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Maps & Directions! 🗺️',
    text: 'A map is a simple drawing showing places and things around us. It is not to scale! We use landmarks like temples, trees, and post boxes to find our way.',
    emoji: '🗺️',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'A map is a simple drawing showing places and things around us. We use landmarks like temples and trees to find our way!',
  },
  {
    title: 'Drawing 3D Objects! 📦',
    text: 'Real objects are 3-dimensional! A cube has 6 square faces, a sphere is round like a ball, a cone is pointy, and a cylinder has curved and flat parts.',
    emoji: '📦',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Real objects are three-dimensional! A cube, sphere, cone, and cylinder can be drawn on flat paper using straight and curved lines.',
  },
  {
    title: 'Why Standard Units? 📏',
    text: 'Hand spans and foot steps change from person to person! For accurate measurements that everyone agrees on, we use standard units: centimeter (cm) and metre (m).',
    emoji: '📏',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Hand spans change from person to person! For accurate measurements, we use standard units like centimeter and metre.',
  },
  {
    title: 'Measuring with CM and M! 📐',
    text: 'Use centimeters (cm) for small things like pencils and books. Use metres (m) for long things like tables, doors, and rooms. Always start your measurement from 0 on the scale!',
    emoji: '📐',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Use centimeters for small things like pencils, and metres for long things like rooms. Always start your measurement from zero!',
  },
  {
    title: 'Metres & Centimetres! 🔄',
    text: '1 metre is equal to 100 centimetres (1 m = 100 cm). To change metres to centimetres, multiply by 100! Estimate first, then measure to verify your guess!',
    emoji: '🔄',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: '1 metre equals 100 centimetres. To change metres to centimetres, multiply by 100. Estimate first, then verify by measuring!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_use' | 'identify_source' | 'sort_uses' | 'identify_habit' | 'sort_habits' | 'identify_tool' | 'sort_tools' | 'sort_estimates';

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

// ─── Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_use',
    question: 'What unit do we use to measure the length of a PENCIL?',
    answer: 'Centimeters (cm)',
    options: ['Centimeters (cm)', 'Metres (m)', 'Kilograms (kg)'],
    hint: 'A pencil is a small object that fits in your hand. Which small unit fits it?',
    misconception: 'A pencil is small, so we use Centimeters (cm)! Metres are for very long things like rooms and corridors!',
  },
  {
    type: 'identify_source',
    question: 'What unit do we use to measure the length of a ROOM?',
    answer: 'Metres (m)',
    options: ['Centimeters (cm)', 'Metres (m)', 'Litres (L)'],
    hint: 'A room is wide and long. We use the bigger standard unit for it!',
    misconception: 'A room is large, so we measure it in Metres (m)! Using cm for a room would give a huge, confusing number!',
  },
  {
    type: 'sort_uses',
    question: 'Drag each object to the best unit for measuring its length!',
    answer: 'sort',
    options: [],
    hint: 'Small items like pencils and books use centimeters (cm). Large items like rooms and tables use metres (m).',
    misconception: 'Remember: small objects go to Centimeters (cm) and large distances go to Metres (m)!',
    sortItems: [
      { id: 'pencil', label: 'Pencil', icon: 'pencil', correctBin: 'cm' },
      { id: 'book', label: 'Book', icon: 'book', correctBin: 'cm' },
      { id: 'table', label: 'Table', icon: 'table', correctBin: 'm' },
      { id: 'room', label: 'Room', icon: 'room', correctBin: 'm' },
    ],
    bins: [
      { id: 'cm', label: 'Centimeters (cm) 📐', color: '#3B82F6' },
      { id: 'm', label: 'Metres (m) 📏', color: '#10B981' },
    ],
  },
  {
    type: 'identify_habit',
    question: 'How many centimeters are in 1 metre?',
    answer: '100 cm',
    options: ['10 cm', '100 cm', '1000 cm'],
    hint: 'Think of 10 strips of 10 cm laid end to end. How many cm is that in total?',
    misconception: '1 metre = 100 centimetres! It is not 10 cm. Ten strips of 10 cm make 100 cm, which is exactly 1 metre.',
  },
  {
    type: 'sort_habits',
    question: 'Drag each length to its correct conversion!',
    answer: 'sort',
    options: [],
    hint: 'To convert metres to cm, multiply by 100. 1 m = 100 cm, 2 m = 200 cm!',
    misconception: 'Multiply metres by 100 to get centimetres! 2 metres = 200 cm, and 500 cm = 5 metres.',
    sortItems: [
      { id: 'm1', label: '1 m = 100 cm', icon: 'ruler', correctBin: 'correct' },
      { id: 'm2', label: '2 m = 200 cm', icon: 'ruler', correctBin: 'correct' },
      { id: 'm3', label: '500 cm = 5 m', icon: 'ruler', correctBin: 'correct' },
      { id: 'm4', label: '150 cm = 1.5 m', icon: 'ruler', correctBin: 'correct' },
    ],
    bins: [
      { id: 'correct', label: 'Correct Match ✅', color: '#10B981' },
    ],
  },
  {
    type: 'identify_tool',
    question: 'Which tool is BEST for measuring the length of a small notebook?',
    answer: 'A 15 cm ruler',
    options: ['A 15 cm ruler', 'A measuring tape', 'A weighing scale'],
    hint: 'Notebooks are short and flat. Which small tool fits right on the page?',
    misconception: 'A 15 cm ruler is best for small objects like a notebook or pencil! A measuring tape is for long curved things.',
  },
  {
    type: 'sort_tools',
    question: 'Drag each measuring tool to its best use!',
    answer: 'sort',
    options: [],
    hint: 'Rulers are for small items. Tapes are for long or curved things. Hand spans vary!',
    misconception: 'Ruler fits small things; measuring tape covers long distances; hand spans are non-standard!',
    sortItems: [
      { id: 'tool-ruler', label: 'Ruler (15cm)', icon: 'ruler', correctBin: 'small' },
      { id: 'tool-tape', label: 'Measuring Tape', icon: 'tape', correctBin: 'long' },
      { id: 'tool-metre', label: 'Metre Stick', icon: 'metre', correctBin: 'medium' },
      { id: 'tool-hand', label: 'Hand Span', icon: 'hand', correctBin: 'non-std' },
    ],
    bins: [
      { id: 'small', label: 'Small Objects ✏️', color: '#3B82F6' },
      { id: 'medium', label: 'Medium Items 🪵', color: '#8B5CF6' },
      { id: 'long', label: 'Long Distances 🚪', color: '#10B981' },
      { id: 'non-std', label: 'Non-Standard ✋', color: '#F59E0B' },
    ],
  },
  {
    type: 'sort_estimates',
    question: 'Drag each estimation to its correct verification tool!',
    answer: 'sort',
    options: [],
    hint: 'Estimate first, then verify small items with a ruler and long items with a tape!',
    misconception: 'Small length estimates (pencil, book) are verified with a ruler. Long distance estimates (room, table) are verified with a tape!',
    sortItems: [
      { id: 'est-pencil', label: 'Pencil (~15 cm)', icon: 'pencil', correctBin: 'ruler' },
      { id: 'est-book', label: 'Book (~25 cm)', icon: 'book', correctBin: 'ruler' },
      { id: 'est-table', label: 'Table (~1.5 m)', icon: 'table', correctBin: 'tape' },
      { id: 'est-room', label: 'Room (~4 m)', icon: 'room', correctBin: 'tape' },
    ],
    bins: [
      { id: 'ruler', label: 'Verify with Ruler 📐', color: '#3B82F6' },
      { id: 'tape', label: 'Verify with Tape 📏', color: '#10B981' },
    ],
  },
];

// ─── Surveyor Suresh Mascot ───────────────────────────────────

function SurveyorSuresh({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400"
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
          <defs>
            <linearGradient id="suresh-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="suresh-hat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Hat / Hard Hat */}
          <ellipse cx="37" cy="18" rx="20" ry="6" fill="url(#suresh-hat)" />
          <path d="M22 18 Q37 6 52 18 Z" fill="url(#suresh-hat)" />
          {/* Face */}
          <circle cx="37" cy="30" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="28" r="2" fill="#1F2937" />
          <circle cx="42" cy="28" r="2" fill="#1F2937" />
          {/* Mustache */}
          <path d="M31 35 Q37 39 43 35 Q37 37 31 35 Z" fill="#92400E" />
          {/* Smile */}
          <path d="M33 39 Q37 42 41 39" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Body / Vest */}
          <rect x="25" y="44" width="24" height="28" rx="6" fill="url(#suresh-shirt)" stroke="#B45309" strokeWidth="1" />
          {/* Measuring tape across chest */}
          <path d="M25 50 L49 62" stroke="#EF4444" strokeWidth="3" strokeDasharray="3 2" />
          {/* Arms */}
          <ellipse cx="18" cy="54" rx="4" ry="10" fill="#F59E0B" transform="rotate(-15 18 54)" />
          <ellipse cx="56" cy="54" rx="4" ry="10" fill="#F59E0B" transform="rotate(15 56 54)" />
          {/* Feet */}
          <ellipse cx="30" cy="78" rx="5" ry="4" fill="#1F2937" />
          <ellipse cx="44" cy="78" rx="5" ry="4" fill="#1F2937" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ──────────────────────────────────────────

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

// ─── Scene Background with SVG ────────────────────────────────

function SurveyScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="survey-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="survey-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#65A30D" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#survey-sky)" />
        {/* Ground */}
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#survey-ground)" />
        {/* Hills in background */}
        <path d={`M 0 ${height * 0.75} Q ${width * 0.25} ${height * 0.55} ${width * 0.5} ${height * 0.75} T ${width} ${height * 0.75} Z`} fill="#4ADE80" opacity="0.6" />
        <path d={`M 0 ${height * 0.78} Q ${width * 0.35} ${height * 0.6} ${width * 0.7} ${height * 0.78} T ${width} ${height * 0.78} Z`} fill="#22C55E" opacity="0.5" />
      </svg>
      {/* Decorative Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="45" height="45" viewBox="0 0 45 45">
          <circle cx="22" cy="22" r="14" fill="#FACC15" />
          {[0, 60, 120, 180, 240, 300].map(a => (
            <line key={a} x1="22" y1="22" x2={22 + 20 * Math.cos(a * Math.PI / 180)} y2={22 + 20 * Math.sin(a * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Topic-Specific SVG Icons ─────────────────────────────────

function RulerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 100 40">
      <rect x="2" y="5" width="96" height="30" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      {[15, 25, 35, 45, 55, 65, 75, 85].map(x => (
        <line key={x} x1={x} y1="5" x2={x} y2={x % 20 === 5 ? 18 : 12} stroke="#CA8A04" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function TapeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <circle cx="25" cy="25" r="8" fill="#FEE2E2" />
      <rect x="23" y="5" width="4" height="10" fill="#FEE2E2" />
    </svg>
  );
}

function MetreIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.3} viewBox="0 0 100 30">
      <rect x="2" y="8" width="96" height="14" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <text x="50" y="19" fontSize="9" fontWeight="bold" fill="#334155" textAnchor="middle">1 METRE</text>
    </svg>
  );
}

function PencilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="10,40 15,45 40,20 35,15" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <polygon points="10,40 15,45 12,42" fill="#EF4444" />
      <polygon points="40,20 35,15 38,12 43,17" fill="#FDE68A" />
      <polygon points="38,12 43,17 45,15" fill="#1F2937" />
    </svg>
  );
}

function BookIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 12 C18 10, 25 12, 25 38 C25 38, 18 36, 10 38 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <path d="M40 12 C32 10, 25 12, 25 38 C25 38, 32 36, 40 38 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <line x1="25" y1="12" x2="25" y2="38" stroke="#1E3A8A" strokeWidth="2" />
    </svg>
  );
}

function TableIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="15" width="40" height="8" rx="2" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
      <rect x="10" y="23" width="5" height="20" fill="#78350F" />
      <rect x="35" y="23" width="5" height="20" fill="#78350F" />
    </svg>
  );
}

function RoomIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="25,5 45,18 45,42 5,42 5,18" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
      <polygon points="25,5 45,18 5,18" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
      <rect x="20" y="26" width="10" height="16" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
    </svg>
  );
}

function HandSpanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M15 35 C15 25, 20 20, 25 20 C30 20, 35 25, 35 35 Z" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
      <path d="M22 20 L22 10 M28 20 L28 8 M16 22 L10 18" stroke="#FCD34D" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon Map ─────────────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'ruler': return <RulerIcon size={size} />;
    case 'tape': return <TapeIcon size={size} />;
    case 'metre': return <MetreIcon size={size} />;
    case 'pencil': return <PencilIcon size={size} />;
    case 'book': return <BookIcon size={size} />;
    case 'table': return <TableIcon size={size} />;
    case 'room': return <RoomIcon size={size} />;
    case 'hand': return <HandSpanIcon size={size} />;
    default: return <RulerIcon size={size} />;
  }
}

// ─── Sort Card & Bin ──────────────────────────────────────────

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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <div className="px-3 py-1 rounded-xl text-xs font-black text-white shadow-sm mb-1" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="text-[10px] text-gray-500 font-medium">Drop here!</div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface MapsLengthGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MapsLengthGame({ width = 720, height = 560, onComplete }: MapsLengthGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [itemCoords, setItemCoords] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and Audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide text when slide changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeechText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  // Speak challenge question when challenge changes
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      setSpeechText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);

      // Initialize sort item coordinates
      if (currentChallenge.type.startsWith('sort') && currentChallenge.sortItems) {
        const initial: Record<string, { x: number; y: number }> = {};
        currentChallenge.sortItems.forEach((item, idx) => {
          initial[item.id] = { x: 50 + idx * 140, y: 360 };
        });
        setItemCoords(initial);
        setPlacedItems({});
      }
    }
  }, [screen, challengeIdx]);

  // Inactivity timer for auto-hint
  useEffect(() => {
    if (screen === 'play') {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        if (currentChallenge) {
          setHintMsg(currentChallenge.hint);
          audioManager.play('hint');
          speechManager.speak(currentChallenge.hint);
        }
      }, 10000);
    }
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [screen, challengeIdx]);

  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      setScreen('play');
      audioManager.play('swoop');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  const handleAnswerClick = (option: string) => {
    audioManager.play('tap');
    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      speechManager.speak('Correct! Great job!');
      setSuccessMsg('Brilliant! Correct answer!');
      setStars(prev => prev + 1);
      setSparkles(prev => [...prev, { id: Date.now(), x: width / 2, y: height / 2 }]);

      setTimeout(() => {
        setSuccessMsg(null);
        advanceChallenge();
      }, 1200);
    } else {
      // Wrong!
      audioManager.play('error');
      setErrors(prev => prev + 1);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
    }
  };

  const advanceChallenge = () => {
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
      setHintMsg(null);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Amazing job! You are a Survey Master!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    if (!currentChallenge.bins || !currentChallenge.sortItems) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bin collision
    let matchedBin: string | null = null;
    const binWidth = 130;
    const binHeight = 110;
    const binY = 160;

    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 155;
      if (x + 55 >= binX && x + 55 <= binX + binWidth && y + 45 >= binY && y + 45 <= binY + binHeight) {
        matchedBin = bin.id;
      }
    });

    if (matchedBin === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      speechManager.speak('Correct drop!');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setSuccessMsg('All sorted correctly!');
        setStars(prev => prev + 1);
        setTimeout(() => {
          setSuccessMsg(null);
          advanceChallenge();
        }, 1200);
      }
      return true;
    } else {
      // Wrong bin!
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-gold-400 to-gold-600 select-none flex flex-col items-center justify-between font-sans" style={{ width, height }}>
      {/* Background Scene */}
      <SurveyScene width={width} height={height} />

      {/* Mascot */}
      <SurveyorSuresh mood={successMsg ? 'celebrate' : hintMsg ? 'thinking' : 'happy'} speaking={speechText} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🗺️</span>
          <div>
            <h1 className="text-lg font-black text-gray-800 tracking-wide">Maps & Length Explorer</h1>
            <p className="text-xs font-bold text-gray-500">CISCE Class 3 Mathematics</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && <StarRow count={stars} total={CHALLENGES.length} />}
          <div className="bg-amber-100 border border-amber-300 rounded-full px-3 py-1 text-xs font-bold text-amber-800">
            {screen === 'teaching' ? '📚 Introduction' : `Challenge ${challengeIdx + 1} / ${CHALLENGES.length}`}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex items-center justify-center p-6">
        {screen === 'teaching' ? (
          /* Teaching Screen */
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center justify-between min-h-[340px]`}
          >
            <div className="text-6xl mb-2">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={handlePrevSlide}
                disabled={slideIdx === 0}
                className={`px-5 py-2 rounded-xl font-bold text-sm bg-white/20 hover:bg-white/30 transition-all ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                ← Back
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div key={idx} className={`w-3 h-3 rounded-full transition-all ${idx === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="px-6 py-2 rounded-xl font-bold text-sm bg-white text-gray-900 shadow-lg hover:scale-105 transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Play Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 flex flex-col justify-between min-h-[380px] relative border-4 border-amber-300"
          >
            {/* Question Banner */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 rounded-2xl p-4 shadow-inner mb-4">
              <h2 className="text-lg font-black text-gray-800 text-center">{currentChallenge.question}</h2>
            </div>

            {/* Challenge Content: Multiple Choice or Sort */}
            {currentChallenge.answer !== 'sort' ? (
              <div className="grid grid-cols-1 gap-3 my-auto">
                {currentChallenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerClick(option)}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-gradient-to-r from-gold-500 to-gold-500 text-white shadow-md hover:from-gold-600 hover:to-gold-600 transition-all flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="text-xl">👉</span>
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Drag and Drop Sort Challenge */
              <div className="relative w-full h-[240px] my-auto">
                {/* Bins */}
                {currentChallenge.bins?.map((bin, idx) => {
                  const binWidth = 140;
                  const binX = 35 + idx * 165;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={binX}
                      y={20}
                      width={binWidth}
                      height={100}
                      isHovering={false}
                    />
                  );
                })}

                {/* Draggable Items */}
                {currentChallenge.sortItems?.map((item) => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemCoords[item.id]?.x || 50}
                    y={itemCoords[item.id]?.y || 350}
                    placed={!!placedItems[item.id]}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            )}

            {/* Hint & Feedback Area */}
            {hintMsg && (
              <HintBubble
                message={hintMsg}
                onComplete={() => setHintMsg(null)}
              />
            )}
          </motion.div>
        )}
      </div>

      {/* Success Banner & Confetti */}
      {successMsg && (
        <SuccessBanner
          message={successMsg}
          onComplete={() => setSuccessMsg(null)}
        />
      )}
      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}

      {/* Sparkles */}
      {sparkles.map(spark => (
        <SparkleBurst
          key={spark.id}
          x={spark.x}
          y={spark.y}
          onComplete={() => setSparkles(prev => prev.filter(s => s.id !== spark.id))}
        />
      ))}
    </div>
  );
}
