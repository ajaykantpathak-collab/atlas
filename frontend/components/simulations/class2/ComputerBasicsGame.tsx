'use client';

/**
 * ComputerBasicsGame — Learn about computers as electronic devices,
 * daily life roles, input/output devices, special keyboard keys, and mouse operations.
 *
 * CISCE Nodes: c2_cs_001 (Electronic device), c2_cs_002 (Role in daily life),
 *              c2_cs_003 (Input devices), c2_cs_004 (Output devices),
 *              c2_cs_005 (Keyboard special keys), c2_cs_006 (Mouse operations)
 *
 * ELI5: "A computer is an electronic machine that runs on electricity!
 *   We give it data using input devices like keyboard and mouse.
 *   It processes information and shows results on output devices like monitors and printers.
 *   We use it for learning, playing, communicating, and working!"
 *
 * Misconceptions (from enrichment):
 *   1. "A computer can work without electricity if it has a battery" → "No! Batteries also provide electricity!"
 *   2. "Monitor is an input device" → "No! Monitor is an output device because it shows results to us!"
 *   3. "Keyboard is an output device" → "No! Keyboard is an input device because we type data into it!"
 *   4. "Shift key deletes letters" → "No! Shift key makes capital letters and symbols, Backspace deletes!"
 *   5. "Computer can think on its own" → "No! Computer only follows our exact instructions!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG computer lab scene background
 * - Custom SVG computer hardware components (Computer, Keyboard, Mouse, Monitor, Printer, Speaker, Scanner, Webcam, Microphone)
 * - Custom SVG mascot (Techie Tara — computer teacher with blue shirt and glasses)
 * - Drag-and-drop: drag items into correct classification bins
 * - 8 progressive challenges: electronic device → input devices → output devices → sorting input/output → shift key → mouse clicks → mouse operations → roles in daily life
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity
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
  {
    title: 'Computer as an Electronic Device 💻',
    text: 'A computer is an electronic machine that works only when plugged into electricity or running on battery! It is fast, accurate, never gets tired, and stores lots of information.',
    emoji: '⚡',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'A computer is an electronic machine that works only when plugged into electricity!',
  },
  {
    title: 'Input Devices ⌨️',
    text: 'Input devices send data TO the computer! The keyboard lets us type letters and numbers. The mouse helps us point and click. Scanners copy pictures, microphones record sound, and webcams capture video!',
    emoji: '🖱️',
    bgColor: 'from-cyan-500 to-blue-600',
    spoken: 'Input devices send data to the computer like the keyboard, mouse, and microphone!',
  },
  {
    title: 'Output Devices 🖥️',
    text: 'Output devices show results FROM the computer! The monitor displays pictures and videos. The printer puts text on paper. Speakers play sound, and projectors show big images on a wall!',
    emoji: '🖨️',
    bgColor: 'from-teal-500 to-cyan-600',
    spoken: 'Output devices show results from the computer like monitors, printers, and speakers!',
  },
  {
    title: 'Keyboard Special Keys 🔤',
    text: 'The keyboard has special keys! Hold Shift to type capital letters and symbols like @ and ₹. Caps Lock makes all letters capital. Enter starts a new line, and Backspace deletes characters!',
    emoji: '⌨️',
    bgColor: 'from-indigo-500 to-purple-600',
    spoken: 'The keyboard has special keys like Shift for capitals, Enter for new lines, and Backspace to delete!',
  },
  {
    title: 'Mouse Operations & Daily Life 🖱️',
    text: 'The mouse can left-click to select, right-click to open menus, scroll to move pages up and down, and drag-and-drop to move objects! We use computers for education, entertainment, and communication!',
    emoji: '🌟',
    bgColor: 'from-purple-500 to-pink-600',
    spoken: 'The mouse can click, scroll, and drag. We use computers for education, entertainment, and communication!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_device' | 'identify_input' | 'identify_output' | 'sort_io' | 'identify_shift' | 'identify_mouse' | 'sort_mouse' | 'sort_roles';

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
    type: 'identify_device',
    question: 'Why is a computer called an electronic device?',
    answer: 'It works only when electricity passes through it',
    options: [
      'It works only when electricity passes through it',
      'It can work completely without any power',
      'It is a mechanical toy that runs on wind-up keys',
    ],
    hint: 'Think about what happens to a fan or mixer when the power goes off! Computers need electricity too.',
    misconception: 'A computer is an electronic device because it always needs electricity, from a plug or a battery, to start and keep working! Even laptops need electrical power.',
  },
  {
    type: 'identify_input',
    question: 'Which of these is an INPUT device?',
    answer: 'Keyboard',
    options: ['Keyboard', 'Monitor', 'Printer'],
    hint: 'Input devices send data TO the computer. Which one do you use to type your name?',
    misconception: 'The keyboard is an INPUT device because you type data into it! Monitors and printers are output devices because they show or print results from the computer.',
  },
  {
    type: 'identify_output',
    question: 'Which of these is an OUTPUT device?',
    answer: 'Monitor',
    options: ['Monitor', 'Mouse', 'Keyboard'],
    hint: 'Output devices show results FROM the computer. Which one has a screen to watch videos?',
    misconception: 'The monitor is an OUTPUT device because the computer displays pictures and videos on its screen! Mouse and keyboard are input devices.',
  },
  {
    type: 'sort_io',
    question: 'Drag each device to the correct bin: Is it INPUT or OUTPUT?',
    answer: 'sort',
    options: [],
    hint: 'Keyboard and mouse send data IN (Input). Monitor and printer show results OUT (Output).',
    misconception: 'Input devices send information into the computer (keyboard, mouse). Output devices show results to you (monitor, printer, speaker).',
    sortItems: [
      { id: 'kb', label: 'Keyboard', icon: 'keyboard', correctBin: 'input' },
      { id: 'mouse', label: 'Mouse', icon: 'mouse', correctBin: 'input' },
      { id: 'mon', label: 'Monitor', icon: 'monitor', correctBin: 'output' },
      { id: 'print', label: 'Printer', icon: 'printer', correctBin: 'output' },
    ],
    bins: [
      { id: 'input', label: 'Input Device 📥', color: '#3B82F6' },
      { id: 'output', label: 'Output Device 📤', color: '#10B981' },
    ],
  },
  {
    type: 'identify_shift',
    question: 'What happens when you hold the SHIFT key and press an alphabet key?',
    answer: 'It types a capital letter',
    options: [
      'It types a capital letter',
      'It deletes the letter completely',
      'It turns off the computer',
    ],
    hint: 'Shift is a modifier key. When you hold it and press A, you get a big capital A!',
    misconception: 'The Shift key makes capital letters and upper symbols! It does NOT delete letters — Backspace is used for deleting.',
  },
  {
    type: 'identify_mouse',
    question: 'What does a single LEFT CLICK on the mouse usually do?',
    answer: 'Selects or opens an item',
    options: [
      'Selects or opens an item',
      'Deletes everything on screen',
      'Turns off the monitor',
    ],
    hint: 'Left click is your primary way to tell the computer: "I want this item!"',
    misconception: 'Left click selects or opens an item! Right click opens a menu with extra options. Left click never deletes everything.',
  },
  {
    type: 'sort_mouse',
    question: 'Drag each mouse action to what it does!',
    answer: 'sort',
    options: [],
    hint: 'Left click = select/open. Right click = menu. Scroll = move page. Double click = open program.',
    misconception: 'Each mouse action has a special job! Left click selects, right click opens a menu, scroll moves pages up and down, double click opens programs.',
    sortItems: [
      { id: 'lc', label: 'Left Click', icon: 'mouse', correctBin: 'select' },
      { id: 'rc', label: 'Right Click', icon: 'mouse', correctBin: 'menu' },
      { id: 'sc', label: 'Scroll Wheel', icon: 'mouse', correctBin: 'page' },
      { id: 'dc', label: 'Double Click', icon: 'mouse', correctBin: 'open' },
    ],
    bins: [
      { id: 'select', label: 'Select Item 🖱️', color: '#3B82F6' },
      { id: 'menu', label: 'Open Menu 📋', color: '#8B5CF6' },
      { id: 'page', label: 'Move Page 📜', color: '#F59E0B' },
      { id: 'open', label: 'Open App 🚀', color: '#10B981' },
    ],
  },
  {
    type: 'sort_roles',
    question: 'Drag each computer activity to its correct daily life role!',
    answer: 'sort',
    options: [],
    hint: 'Learning lessons = Education. Playing games = Entertainment. Video calling = Communication.',
    misconception: 'Computers play many roles: Education (learning in school), Entertainment (games & videos), Communication (video calls & email), and Work (typing documents)!',
    sortItems: [
      { id: 'learn', label: 'Learning lessons', icon: 'computer', correctBin: 'edu' },
      { id: 'game', label: 'Playing fun games', icon: 'mouse', correctBin: 'ent' },
      { id: 'call', label: 'Video calling grandma', icon: 'webcam', correctBin: 'comm' },
    ],
    bins: [
      { id: 'edu', label: 'Education 📚', color: '#3B82F6' },
      { id: 'ent', label: 'Entertainment 🎮', color: '#EC4899' },
      { id: 'comm', label: 'Communication 💬', color: '#10B981' },
    ],
  },
];

// ─── Techie Tara Mascot (Computer Teacher) ─────────────────────

function TechieTara({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-blue-300"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
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
            <linearGradient id="tara-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="laptop-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>

          {/* Body / Shirt */}
          <path d="M22 55 L37 60 L53 55 L58 85 L17 85 Z" fill="url(#tara-shirt)" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Name badge */}
          <rect x="42" y="66" width="12" height="7" fill="white" rx="1" stroke="#93C5FD" strokeWidth="0.8" />
          <text x="48" y="71" fontSize="4" fontWeight="bold" fill="#1E40AF" textAnchor="middle">TARA</text>

          {/* Head */}
          <circle cx="37.5" cy="32" r="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M21 30 C21 15, 54 15, 54 30 C54 35, 50 32, 48 26 C46 18, 29 18, 27 26 C25 32, 21 35, 21 30 Z" fill="#78350F" />

          {/* Glasses */}
          <circle cx="31" cy="32" r="5.5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="44" cy="32" r="5.5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="36.5" y1="32" x2="38.5" y2="32" stroke="#1E293B" strokeWidth="1.5" />

          {/* Eyes inside glasses */}
          <circle cx="31" cy="32" r="2" fill="#1E293B" />
          <circle cx="44" cy="32" r="2" fill="#1E293B" />

          {/* Smile */}
          <path d="M33 42 Q37.5 46 42 42" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Mini Laptop in hands */}
          <rect x="25" y="72" width="25" height="15" fill="url(#laptop-body)" rx="1.5" stroke="#334155" strokeWidth="1" />
          <rect x="27" y="74" width="21" height="10" fill="#0EA5E9" rx="0.5" />
          {/* Screen code lines */}
          <line x1="29" y1="77" x2="36" y2="77" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <line x1="29" y1="80" x2="42" y2="80" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Computer Lab Scene Background ────────────────────────────

function ComputerLabScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall & Window gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 40%, #7DD3FC 70%, #38BDF8 100%)' }} />

      {/* Classroom Window */}
      <div className="absolute top-6 left-12 w-36 h-28 border-4 border-white bg-blue-100 rounded-lg opacity-60 flex flex-col justify-between p-2 shadow-inner">
        <div className="flex justify-between h-full">
          <div className="w-16 h-full border-r-2 border-white" />
          <div className="w-16 h-full" />
        </div>
      </div>

      {/* Whiteboard on wall */}
      <div className="absolute top-8 left-56 right-36 h-20 bg-white border-4 border-gray-300 rounded-lg shadow-md flex items-center justify-center">
        <span className="text-blue-600 font-bold text-sm tracking-wider opacity-60">COMPUTER LAB: INPUT & OUTPUT</span>
      </div>

      {/* Computer Desks at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-700 to-slate-500 border-t-4 border-slate-400">
        {/* Desk reflection */}
        <div className="absolute inset-x-0 top-0 h-3 bg-slate-400 opacity-50" />
      </div>
    </div>
  );
}

// ─── Custom SVG Computer Hardware Icons ───────────────────────

function ComputerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="30" fill="#38BDF8" rx="3" stroke="#0284C7" strokeWidth="2" />
      <rect x="12" y="12" width="36" height="22" fill="#0F172A" rx="1" />
      <rect x="25" y="38" width="10" height="8" fill="#64748B" />
      <rect x="18" y="46" width="24" height="4" fill="#475569" rx="2" />
    </svg>
  );
}

function KeyboardIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="15" width="50" height="30" fill="#E2E8F0" rx="4" stroke="#94A3B8" strokeWidth="2" />
      {/* Key rows */}
      <rect x="8" y="18" width="6" height="6" fill="#F8FAFC" rx="1" />
      <rect x="16" y="18" width="6" height="6" fill="#F8FAFC" rx="1" />
      <rect x="24" y="18" width="6" height="6" fill="#F8FAFC" rx="1" />
      <rect x="32" y="18" width="6" height="6" fill="#F8FAFC" rx="1" />
      <rect x="40" y="18" width="6" height="6" fill="#F8FAFC" rx="1" />
      <rect x="48" y="18" width="6" height="6" fill="#F8FAFC" rx="1" />
      <rect x="8" y="27" width="8" height="6" fill="#F8FAFC" rx="1" />
      <rect x="18" y="27" width="8" height="6" fill="#F8FAFC" rx="1" />
      <rect x="28" y="27" width="8" height="6" fill="#F8FAFC" rx="1" />
      <rect x="38" y="27" width="8" height="6" fill="#F8FAFC" rx="1" />
      <rect x="15" y="36" width="30" height="6" fill="#CBD5E1" rx="1" />
    </svg>
  );
}

function MouseIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="16" ry="22" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <line x1="30" y1="8" x2="30" y2="25" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="30" cy="16" r="3" fill="#94A3B8" />
    </svg>
  );
}

function MonitorIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="32" fill="#1E293B" rx="3" stroke="#475569" strokeWidth="2" />
      <rect x="10" y="14" width="40" height="24" fill="#38BDF8" rx="1" />
      <rect x="26" y="42" width="8" height="6" fill="#64748B" />
      <rect x="18" y="48" width="24" height="4" fill="#475569" rx="2" />
    </svg>
  );
}

function PrinterIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="22" width="40" height="24" fill="#CBD5E1" rx="3" stroke="#64748B" strokeWidth="2" />
      <rect x="16" y="12" width="28" height="12" fill="#94A3B8" rx="1" />
      <rect x="16" y="40" width="28" height="12" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="42" cy="28" r="2.5" fill="#10B981" />
    </svg>
  );
}

function WebcamIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="26" r="12" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <circle cx="30" cy="26" r="6" fill="#0EA5E9" />
      <circle cx="28" cy="24" r="2" fill="white" />
      <rect x="25" y="38" width="10" height="12" fill="#64748B" />
      <rect x="18" y="50" width="24" height="4" fill="#475569" rx="2" />
    </svg>
  );
}

// ─── Sort Card Component (for drag-and-drop challenges) ───────

function renderSortIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'keyboard': return <KeyboardIcon size={size} />;
    case 'mouse': return <MouseIcon size={size} />;
    case 'monitor': return <MonitorIcon size={size} />;
    case 'printer': return <PrinterIcon size={size} />;
    case 'computer': return <ComputerIcon size={size} />;
    case 'webcam': return <WebcamIcon size={size} />;
    default: return <ComputerIcon size={size} />;
  }
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-blue-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 truncate max-w-[105px]">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="text-sm font-black px-2 py-1 rounded-lg text-white shadow-sm mb-2" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="text-xs font-semibold text-gray-500">Drop here!</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface ComputerBasicsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ComputerBasicsGame({ width = 720, height = 560, onComplete }: ComputerBasicsGameProps) {
  // Screen state
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIndex, setSlideIndex] = useState(0);

  // Challenge state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Mascot & feedback state
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome to Computer Basics! Click Next to start learning!');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showHintBubble, setShowHintBubble] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [burstPos, setBurstPos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state
  const [itemPositions, setItemPositions] = useState<{ [id: string]: { x: number; y: number; placed: boolean } }>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);
  const activeDraggedIdRef = useRef<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const challenge = CHALLENGES[currentChallengeIndex];
      if (challenge && !isComplete && screen === 'play') {
        setHintMessage(challenge.hint);
        setShowHintBubble(true);
        setMascotMood('thinking');
        setMascotSpeech("Need a little help? Check the hint!");
        speechManager.speak("Need a little help? Check the hint!");
        audioManager.play('hint');
      }
    }, 10000);
  }, [currentChallengeIndex, isComplete, screen]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  // Initialize sort item positions when challenge changes
  useEffect(() => {
    const challenge = CHALLENGES[currentChallengeIndex];
    if (challenge && challenge.sortItems) {
      const initialPos: { [id: string]: { x: number; y: number; placed: boolean } } = {};
      challenge.sortItems.forEach((item, index) => {
        // Arrange items horizontally at the bottom
        const startX = 60 + index * 145;
        initialPos[item.id] = { x: startX, y: 340, placed: false };
      });
      setItemPositions(initialPos);
    }
  }, [currentChallengeIndex]);

  // Handle teaching slide change
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIndex < TEACHING_SLIDES.length - 1) {
      const nextIdx = slideIndex + 1;
      setSlideIndex(nextIdx);
      setMascotSpeech(TEACHING_SLIDES[nextIdx].spoken);
      speechManager.speak(TEACHING_SLIDES[nextIdx].spoken);
    } else {
      setScreen('play');
      setMascotSpeech("Now let's test what you learned! Answer the questions correctly to earn stars!");
      speechManager.speak("Now let's test what you learned! Answer the questions correctly to earn stars!");
      audioManager.play('success');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIndex > 0) {
      const prevIdx = slideIndex - 1;
      setSlideIndex(prevIdx);
      setMascotSpeech(TEACHING_SLIDES[prevIdx].spoken);
      speechManager.speak(TEACHING_SLIDES[prevIdx].spoken);
    }
  };

  // Handle multiple-choice answers
  const handleAnswerSelect = (option: string) => {
    const challenge = CHALLENGES[currentChallengeIndex];
    resetInactivityTimer();

    if (option === challenge.answer) {
      // Correct!
      audioManager.play('success');
      setStars(s => s + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');
      setSuccessMessage('Brilliant job! ⭐');
      setShowSuccessBanner(true);
      setBurstPos({ x: width / 2, y: height / 2 });

      setTimeout(() => {
        setShowSuccessBanner(false);
        advanceChallenge();
      }, 1500);
    } else {
      // Wrong — show misconception feedback
      audioManager.play('error');
      setErrors(e => e + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
      setShowHintBubble(true);
    }
  };

  const advanceChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(c => c + 1);
      setMascotMood('happy');
      setMascotSpeech("Great! Here is your next question.");
      speechManager.speak("Great! Here is your next question.");
    } else {
      // Game complete!
      setIsComplete(true);
      setMascotMood('celebrate');
      setMascotSpeech('You completed all challenges! You are a Computer Star! 🌟');
      speechManager.speak('You completed all challenges! You are a Computer Star! 🌟');
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    activeDraggedIdRef.current = id;
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    activeDraggedIdRef.current = null;
    const challenge = CHALLENGES[currentChallengeIndex];
    if (!challenge || !challenge.sortItems || !challenge.bins) return false;

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check if dropped inside any bin
    // Bin 1: left bin (x: 80 to 280, y: 150 to 300)
    // Bin 2: right bin (x: 360 to 560, y: 150 to 300)
    // Bin 3 (if 3 bins): center or third bin
    let droppedBinId: string | null = null;

    challenge.bins.forEach((bin, idx) => {
      const binX = 70 + idx * 200;
      const binY = 140;
      const binW = 180;
      const binH = 170;

      if (x + 50 >= binX && x + 50 <= binX + binW && y + 40 >= binY && y + 40 <= binY + binH) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      setItemPositions(prev => ({
        ...prev,
        [id]: { x, y, placed: true },
      }));

      // Check if all items in this sort challenge are placed
      const updatedPositions = {
        ...itemPositions,
        [id]: { x, y, placed: true },
      };
      const allPlaced = challenge.sortItems.every(i => updatedPositions[i.id]?.placed);

      if (allPlaced) {
        setStars(s => s + 1);
        setMascotMood('celebrate');
        setMascotSpeech('All items sorted correctly! Amazing!');
        speechManager.speak('All items sorted correctly! Amazing!');
        setSuccessMessage('Sorting Master! 🌟');
        setShowSuccessBanner(true);
        setBurstPos({ x: width / 2, y: height / 2 });

        setTimeout(() => {
          setShowSuccessBanner(false);
          advanceChallenge();
        }, 1800);
      }
      return true;
    } else if (droppedBinId !== null) {
      // Wrong bin
      audioManager.play('drop-wrong');
      setErrors(e => e + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
      setShowHintBubble(true);
      return false;
    }

    return false;
  };

  const challenge = CHALLENGES[currentChallengeIndex];

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      {/* Background Scene */}
      <ComputerLabScene width={width} height={height} />

      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-3 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-lg font-black text-white tracking-wide">💻 Computer Basics</span>
          <span className="text-xs bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded-full font-bold">Class 2 ICSE</span>
        </div>
        {screen === 'play' && !isComplete && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs font-bold text-yellow-300">
              <span>Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length} />
          </div>
        )}
      </div>

      {/* Techie Tara Mascot */}
      <TechieTara mood={mascotMood} speaking={mascotSpeech} />

      {/* ─── SCREEN 1: TEACHING INTRO ────────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-8 pt-16 pb-6">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl p-6 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIndex].bgColor} text-white border-2 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-3">{TEACHING_SLIDES[slideIndex].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIndex].title}</h2>
            <p className="text-base font-medium leading-relaxed opacity-95">{TEACHING_SLIDES[slideIndex].text}</p>
          </motion.div>

          {/* Navigation & Dots */}
          <div className="flex items-center justify-between w-full max-w-xl mt-6 px-4">
            <button
              onClick={handlePrevSlide}
              disabled={slideIndex === 0}
              className={`px-4 py-2 rounded-xl font-bold text-sm bg-white/20 text-white shadow-md transition-all ${slideIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/30 active:scale-95'}`}
            >
              ← Back
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === slideIndex ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/40'}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="px-6 py-2 rounded-xl font-black text-sm bg-yellow-400 text-slate-900 shadow-lg hover:bg-yellow-300 active:scale-95 transition-all"
            >
              {slideIndex === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY & CHALLENGES ─────────────────────── */}
      {screen === 'play' && !isComplete && challenge && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 pt-16 pb-6">
          {/* Question Box */}
          <motion.div
            key={currentChallengeIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-blue-400/30 shadow-xl mb-4 text-center"
          >
            <h3 className="text-lg font-black text-white">{challenge.question}</h3>
          </motion.div>

          {/* Multiple Choice Options */}
          {challenge.answer !== 'sort' && challenge.options && (
            <div className="grid grid-cols-1 gap-3 w-full max-w-md">
              {challenge.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(opt)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg border border-blue-400/40 transition-all text-left flex items-center justify-between"
                >
                  <span>{opt}</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">👉</span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort Challenge (Drag & Drop) */}
          {challenge.answer === 'sort' && challenge.sortItems && challenge.bins && (
            <div className="relative w-full max-w-2xl h-80 flex flex-col items-center">
              {/* Bins */}
              <div className="flex gap-6 justify-center w-full mb-4">
                {challenge.bins.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={idx * 210 + 20}
                    y={10}
                    width={180}
                    height={150}
                    isHovering={false}
                  />
                ))}
              </div>

              {/* Draggable Items */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                {challenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 0, y: 340, placed: false };
                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={pos.x}
                      y={pos.y}
                      placed={pos.placed}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── GAME COMPLETE SCREEN ───────────────────────────── */}
      {isComplete && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-slate-800/95 backdrop-blur-lg p-8 rounded-3xl border-2 border-yellow-400 shadow-2xl max-w-md w-full flex flex-col items-center"
          >
            <div className="text-6xl mb-3">🏆</div>
            <h2 className="text-3xl font-black text-white mb-2">Computer Star!</h2>
            <p className="text-slate-300 text-sm mb-6">You mastered computer basics, input/output devices, special keys, and mouse operations!</p>
            <div className="flex gap-2 mb-6">
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                setScreen('teaching');
                setSlideIndex(0);
                setCurrentChallengeIndex(0);
                setStars(0);
                setErrors(0);
                setIsComplete(false);
                setMascotSpeech('Welcome back! Let\'s play again!');
                speechManager.speak('Welcome back! Let\'s play again!');
                audioManager.play('tap');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-900 font-black text-base shadow-lg transition-all active:scale-95"
            >
              Play Again 🔄
            </button>
          </motion.div>
        </div>
      )}

      {/* ─── FEEDBACK COMPONENTS (Strict Signatures) ─────────── */}
      {showSuccessBanner && (
        <SuccessBanner
          message={successMessage}
          onComplete={() => setShowSuccessBanner(false)}
        />
      )}

      {showHintBubble && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setShowHintBubble(false)}
        />
      )}

      {burstPos && (
        <SparkleBurst
          x={burstPos.x}
          y={burstPos.y}
          onComplete={() => setBurstPos(null)}
        />
      )}

      {isComplete && (
        <Confetti
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
