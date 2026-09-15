'use client';
/**
 * ComputerBasicsGame - Learn about computers: what they are, types, uses, parts, and input/output
 *
 * CISCE Nodes: c1_cs_001 (Natural vs man-made), c1_cs_002 (What is a computer),
 *              c1_cs_003 (Types), c1_cs_004 (Uses), c1_cs_005 (Parts)
 * Enrichment: c1_computer_enrichment_part1-5
 *
 * ELI5: "A computer is a smart electronic machine made by humans! It runs on
 *   electricity, never gets tired, works very fast, and remembers many things.
 *   We use it to learn, draw, play games, and watch videos. A computer has parts
 *   like the monitor, CPU brain, keyboard, and mouse!"
 *
 * Misconceptions (from enrichment):
 *   1. "Computer is a living thing" → "No! A computer is a machine made by humans! It does not eat, grow, breathe, or sleep!"
 *   2. "Computer is just a toy" → "No! A computer is a powerful electronic machine used for learning, work, and creation!"
 *   3. "Monitor is the whole computer" → "No! The monitor is only the screen to show pictures. The CPU is the brain inside the tower!"
 *   4. "Computers don't need electricity" → "No! Computers need electricity from a plug or a charged battery to work!"
 *   5. "Keyboards and screens do the same thing" → "No! Keyboards are input devices to type and talk to the computer, while monitors are output devices to show results!"
 *
 * Story: "Help Tech Tom the tech teacher explore the computer lab, sort computer parts,
 *   identify device types, and learn how computers help us every day!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG computer lab scene background (sky, window, desks, monitors, server rack, floating binary)
 * - Custom SVG computer parts & devices (Monitor, CPU, Keyboard, Mouse, Laptop, Tablet, Smartphone, Desktop)
 * - Custom SVG Tech Tom mascot with glasses, blue circuit shirt, and tablet
 * - Drag-and-drop: drag computer parts into sorting bins
 * - 8 progressive challenges: identify computer → needs electricity → brain → sort parts → types → uses → computer vs non-computer → input vs output
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects
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
    { title: 'What is a Computer? 💻', text: 'A computer is a smart electronic machine made by humans! It runs on electricity, works very fast, remembers many things, and never gets tired!', emoji: '🖥️', bgColor: 'from-blue-500 to-indigo-600', spoken: 'A computer is a smart electronic machine made by humans! It runs on electricity and works very fast!' },
    { title: 'Types of Computers 📱', text: 'Computers come in many shapes and sizes! We have big desktop computers on desks, portable laptops, handheld tablets, and pocket-sized smartphones!', emoji: '📱', bgColor: 'from-indigo-500 to-purple-600', spoken: 'Computers come in many shapes and sizes! Desktops, laptops, tablets, and smartphones!' },
    { title: 'Parts of a Computer ⌨️', text: 'A computer has main parts working together! The Monitor is the screen, the CPU is the smart brain, the Keyboard is for typing, and the Mouse is for clicking!', emoji: '🖱️', bgColor: 'from-cyan-500 to-blue-600', spoken: 'A computer has main parts! The monitor screen, the CPU brain, the keyboard, and the mouse!' },
    { title: 'What Do We Use Computers For? 🎨', text: 'We use computers for so many fun and useful things! We can draw pictures, learn math, write stories, play educational games, and watch educational videos!', emoji: '🎨', bgColor: 'from-teal-500 to-cyan-600', spoken: 'We use computers to draw pictures, learn math, write stories, play games, and watch videos!' },
    { title: 'Input and Output 🔄', text: 'Input devices like keyboards and mice send instructions to the computer. Output devices like monitors and speakers show and tell us the results!', emoji: '🔊', bgColor: 'from-emerald-500 to-teal-600', spoken: 'Input devices send instructions like keyboards and mice. Output devices show results like monitors and speakers!' },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_computer' | 'identify_electricity' | 'identify_brain' | 'sort_parts' | 'identify_type' | 'identify_use' | 'sort_device_type' | 'sort_input_output';
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
        type: 'identify_computer',
        question: 'Which of these is a computer?',
        answer: 'Desktop computer',
        options: ['Desktop computer', 'Wooden chair', 'Heavy table'],
        hint: 'Think: which of these is an electronic machine that can calculate and show pictures?',
        misconception: 'A desktop computer is an electronic machine made by humans! Chairs and tables are furniture, not computers or machines!',
    },
    {
        type: 'identify_electricity',
        question: 'Does a computer need electricity to work?',
        answer: 'Yes, it needs electricity',
        options: ['Yes, it needs electricity', 'No, never', 'Only on Sundays'],
        hint: 'Think: what makes the screen turn on and the CPU start up? A plug or a charged battery!',
        misconception: 'Computers DO need electricity! They run on electric power from a wall plug or a charged battery to process information!',
    },
    {
        type: 'identify_brain',
        question: 'Which part is called the BRAIN of the computer?',
        answer: 'CPU (Central Processing Unit)',
        options: ['CPU (Central Processing Unit)', 'Monitor screen', 'Keyboard keys'],
        hint: 'This part is inside the tall tower box and thinks and calculates everything!',
        misconception: 'The CPU is the brain inside the tower! The monitor is only the screen to show pictures, and the keyboard is for typing!',
    },
    {
        type: 'sort_parts',
        question: 'Drag each part to its correct computer category!',
        answer: 'sort',
        options: [],
        hint: 'Keyboard and mouse = Input! Monitor and speakers = Output! CPU = Brain!',
        misconception: 'Keyboards and mice send input info to the computer. Monitors and speakers show output. The CPU is the processing brain!',
        sortItems: [
            { id: 'kb', label: 'Keyboard', emoji: '⌨️', correctBin: 'input' },
            { id: 'mon', label: 'Monitor', emoji: '🖥️', correctBin: 'output' },
            { id: 'cpu', label: 'CPU Box', emoji: '🖴', correctBin: 'brain' },
        ],
        bins: [
            { id: 'input', label: 'Input ⌨️', color: '#3B82F6' },
            { id: 'output', label: 'Output 🖥️', color: '#10B981' },
            { id: 'brain', label: 'Brain 🧠', color: '#8B5CF6' },
        ],
    },
    {
        type: 'identify_type',
        question: 'Which of these is a portable computer you can carry in a backpack?',
        answer: 'Laptop',
        options: ['Laptop', 'Television', 'Refrigerator'],
        hint: 'This device opens like a book with a screen on top and keyboard on the bottom!',
        misconception: 'A laptop is a portable computer you can fold and carry anywhere! Televisions and refrigerators are home appliances, not portable computers.',
    },
    {
        type: 'identify_use',
        question: 'What is a great use for a computer in school?',
        answer: 'Learning math and drawing pictures',
        options: ['Learning math and drawing pictures', 'Cooking dinner on the screen', 'Sleeping on the keyboard'],
        hint: 'Computers help us study, learn, write, and create art!',
        misconception: 'Computers are used for learning, drawing, writing, and playing educational games - not for cooking food or sleeping on!',
    },
    {
        type: 'sort_device_type',
        question: 'Drag each item! Is it a computer or not a computer?',
        answer: 'sort',
        options: [],
        hint: 'Laptops and smartphones = computers! Books and pencils = not computers!',
        misconception: 'Laptops and smartphones are modern computers with processors and memory! Books, pencils, and chairs are non-electronic items.',
        sortItems: [
            { id: 'lap', label: 'Laptop', emoji: '💻', correctBin: 'computer' },
            { id: 'phone', label: 'Smartphone', emoji: '📱', correctBin: 'computer' },
            { id: 'book', label: 'Paper Book', emoji: '📖', correctBin: 'not-computer' },
            { id: 'pencil', label: 'Pencil', emoji: '✏️', correctBin: 'not-computer' },
        ],
        bins: [
            { id: 'computer', label: 'Computer 💻', color: '#3B82F6' },
            { id: 'not-computer', label: 'Not a Computer ❌', color: '#EF4444' },
        ],
    },
    {
        type: 'sort_input_output',
        question: 'Drag each device! Is it Input (gives info) or Output (shows results)?',
        answer: 'sort',
        options: [],
        hint: 'Mouse clicks = input! Speaker sound = output!',
        misconception: 'Mouse and microphone send data IN (Input). Speakers and printers show or play data OUT (Output)!',
        sortItems: [
            { id: 'mou', label: 'Mouse', emoji: '🖱️', correctBin: 'input' },
            { id: 'mic', label: 'Microphone', emoji: '🎤', correctBin: 'input' },
            { id: 'spk', label: 'Speakers', emoji: '🔊', correctBin: 'output' },
            { id: 'prn', label: 'Printer', emoji: '🖨️', correctBin: 'output' },
        ],
        bins: [
            { id: 'input', label: 'Input Device 📥', color: '#2563EB' },
            { id: 'output', label: 'Output Device 📤', color: '#059669' },
        ],
    },
];
// ─── Tech Tom Mascot (Friendly Tech Teacher) ──────────────────
function TechTom({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-25 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px]">
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
            <linearGradient id="tom-shirt" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB"/>
              <stop offset="100%" stopColor="#1D4ED8"/>
            </linearGradient>
            <linearGradient id="tom-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A"/>
              <stop offset="100%" stopColor="#F59E0B"/>
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="37" cy="28" r="18" fill="url(#tom-skin)" stroke="#D97706" strokeWidth="1.5"/>
          {/* Spiky hair */}
          <path d="M20 20 L25 10 L30 18 L37 8 L44 18 L50 10 L55 20 C50 25, 25 25, 20 20 Z" fill="#1E293B"/>
          {/* Glasses */}
          <rect x="25" y="22" width="11" height="9" rx="2" fill="none" stroke="#1E293B" strokeWidth="2"/>
          <rect x="39" y="22" width="11" height="9" rx="2" fill="none" stroke="#1E293B" strokeWidth="2"/>
          <line x1="36" y1="26" x2="39" y2="26" stroke="#1E293B" strokeWidth="2"/>
          {/* Eyes */}
          <circle cx="30" cy="26.5" r="2" fill="#1E293B"/>
          <circle cx="44" cy="26.5" r="2" fill="#1E293B"/>
          {/* Smile */}
          <path d="M31 36 Q37 41 43 36" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Body / Shirt with circuit pattern */}
          <path d="M22 46 L53 46 L58 75 L17 75 Z" fill="url(#tom-shirt)"/>
          <path d="M28 50 L35 55 L28 60" stroke="#93C5FD" strokeWidth="1.5" fill="none"/>
          <path d="M47 50 L40 55 L47 60" stroke="#93C5FD" strokeWidth="1.5" fill="none"/>
          <line x1="35" y1="55" x2="40" y2="55" stroke="#93C5FD" strokeWidth="1.5"/>
          {/* Mini tablet in hand */}
          <rect x="42" y="62" width="16" height="12" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1"/>
          <rect x="44" y="64" width="12" height="8" fill="#38BDF8" rx="1"/>
          {/* Feet */}
          <ellipse cx="28" cy="80" rx="5" ry="3.5" fill="#1E293B"/>
          <ellipse cx="47" cy="80" rx="5" ry="3.5" fill="#1E293B"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Reward Row ───────────────────────────────��──────────
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
// ─── Computer Lab Background ──────────────────────────────────
function ComputerLabScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 50%, #090D16 100%)' }}/>
      {/* Window showing sci-fi city sky */}
      <div className="absolute top-4 left-10 w-48 h-36 rounded-2xl border-4 border-slate-600 bg-gradient-to-b from-sky-400 via-indigo-600 to-slate-900 opacity-60 overflow-hidden">
        {/* Stars / Binary in window */}
        <div className="absolute top-2 left-4 text-[10px] text-cyan-300 font-mono opacity-80">10101</div>
        <div className="absolute top-6 right-6 text-[10px] text-cyan-300 font-mono opacity-60">01100</div>
        <div className="absolute top-12 left-10 text-[10px] text-blue-300 font-mono opacity-70">11001</div>
      </div>
      {/* Server rack in corner */}
      <div className="absolute bottom-20 right-6 w-16 h-40 bg-slate-800 border-2 border-slate-700 rounded-lg flex flex-col justify-around p-2 opacity-50">
        {[1, 2, 3, 4, 5].map(i => (<div key={i} className="h-4 bg-slate-900 rounded flex items-center px-1 justify-between">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
            <div className="w-6 h-1 bg-slate-700 rounded"/>
          </div>))}
      </div>
      {/* Floating binary digits decoration */}
      <motion.div className="absolute top-1/4 left-1/3 text-cyan-400 font-mono text-sm opacity-25" animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        01001100 💻
      </motion.div>
      <motion.div className="absolute top-1/3 right-1/3 text-blue-400 font-mono text-sm opacity-20" animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        11010010 ⚡
      </motion.div>
      {/* Desk and floor */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #334155 0%, #1E293B 100%)' }}/>
    </div>);
}
// ─── Computer Part SVG Icons ──────────────────────────────────
function MonitorIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="32" rx="4" fill="#334155" stroke="#64748B" strokeWidth="2"/>
      <rect x="10" y="14" width="40" height="24" rx="2" fill="#0EA5E9"/>
      <path d="M26 42 L34 42 L36 48 L24 48 Z" fill="#64748B"/>
      <rect x="18" y="48" width="24" height="4" rx="2" fill="#475569"/>
    </svg>);
}
function CpuIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="14" y="6" width="32" height="48" rx="4" fill="#334155" stroke="#64748B" strokeWidth="2"/>
      {/* Power button */}
      <circle cx="30" cy="14" r="3" fill="#22C55E"/>
      {/* Optical drive / vents */}
      <rect x="20" y="22" width="20" height="3" rx="1" fill="#1E293B"/>
      <rect x="20" y="28" width="20" height="8" rx="1" fill="#1E293B"/>
      <line x1="24" y1="32" x2="36" y2="32" stroke="#64748B" strokeWidth="1"/>
    </svg>);
}
function KeyboardIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="18" width="48" height="24" rx="4" fill="#334155" stroke="#64748B" strokeWidth="2"/>
      {/* Key rows */}
      {[23, 29, 35].map((y, i) => (<g key={i}>
          {[10, 18, 26, 34, 42].map((x, j) => (<rect key={j} x={x} y={y} width="5" height="4" rx="1" fill="#94A3B8"/>))}
        </g>))}
    </svg>);
}
function MouseIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="14" ry="20" fill="#334155" stroke="#64748B" strokeWidth="2"/>
      <line x1="30" y1="12" x2="30" y2="28" stroke="#64748B" strokeWidth="1.5"/>
      <ellipse cx="30" cy="20" rx="3" ry="5" fill="#0EA5E9"/>
    </svg>);
}
function LaptopIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Screen */}
      <rect x="10" y="8" width="40" height="26" rx="3" fill="#334155" stroke="#64748B" strokeWidth="2"/>
      <rect x="13" y="11" width="34" height="20" fill="#38BDF8" rx="1"/>
      {/* Base */}
      <path d="M4 36 L56 36 L52 44 L8 44 Z" fill="#64748B" stroke="#475569" strokeWidth="1"/>
    </svg>);
}
function TabletIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="8" width="36" height="44" rx="6" fill="#334155" stroke="#64748B" strokeWidth="2"/>
      <rect x="16" y="12" width="28" height="34" fill="#38BDF8" rx="2"/>
      <circle cx="30" cy="49" r="2" fill="#94A3B8"/>
    </svg>);
}
function SmartphoneIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="6" width="24" height="48" rx="5" fill="#334155" stroke="#64748B" strokeWidth="2"/>
      <rect x="21" y="11" width="18" height="38" fill="#38BDF8" rx="2"/>
      <circle cx="30" cy="51" r="1.5" fill="#94A3B8"/>
    </svg>);
}
function DesktopIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Monitor */}
      <rect x="8" y="8" width="44" height="30" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="2"/>
      <rect x="11" y="11" width="38" height="24" fill="#38BDF8" rx="1"/>
      {/* Stand */}
      <rect x="26" y="38" width="8" height="8" fill="#475569"/>
      <rect x="18" y="46" width="24" height="4" rx="2" fill="#334155"/>
      {/* CPU tower */}
      <rect x="42" y="40" width="12" height="18" rx="1" fill="#334155" stroke="#475569" strokeWidth="1"/>
      <circle cx="48" cy="44" r="1" fill="#22C55E"/>
    </svg>);
}
// ─── Sort Card Component ───────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('mon'))
        return <MonitorIcon size={size}/>;
    if (id.includes('monitor'))
        return <MonitorIcon size={size}/>;
    if (id.includes('screen'))
        return <MonitorIcon size={size}/>;
    if (id.includes('cpu'))
        return <CpuIcon size={size}/>;
    if (id.includes('brain'))
        return <CpuIcon size={size}/>;
    if (id.includes('kb'))
        return <KeyboardIcon size={size}/>;
    if (id.includes('keyboard'))
        return <KeyboardIcon size={size}/>;
    if (id.includes('input'))
        return <KeyboardIcon size={size}/>;
    if (id.includes('mou'))
        return <MouseIcon size={size}/>;
    if (id.includes('mouse'))
        return <MouseIcon size={size}/>;
    if (id.includes('lap'))
        return <LaptopIcon size={size}/>;
    if (id.includes('laptop'))
        return <LaptopIcon size={size}/>;
    if (id.includes('tablet'))
        return <TabletIcon size={size}/>;
    if (id.includes('phone'))
        return <SmartphoneIcon size={size}/>;
    if (id.includes('smartphone'))
        return <SmartphoneIcon size={size}/>;
    if (id.includes('computer'))
        return <DesktopIcon size={size}/>;
    if (id.includes('not-computer'))
        return <MonitorIcon size={size}/>;
    if (id.includes('book'))
        return <MonitorIcon size={size}/>;
    if (id.includes('pencil'))
        return <MonitorIcon size={size}/>;
    if (id.includes('mic'))
        return <MouseIcon size={size}/>;
    if (id.includes('prn'))
        return <MonitorIcon size={size}/>;
    if (id.includes('spk'))
        return <MonitorIcon size={size}/>;
    if (id.includes('output'))
        return <MonitorIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-slate-800 border-2 border-slate-600'} px-3 py-2`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(id, 48)}
        <span className="text-xs font-bold text-white text-center mt-1">{label}</span>
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
      <div className="text-sm font-bold text-white drop-shadow" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ────────────────────────────────────────���─

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  useEffect(() => {audioManager.play('tap');
  }, [slide]);

  const handleNext = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(s => s + 1);}
    else {audioManager.play('success');
      onStart();
    }
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) setSlide(s => s - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 overflow-hidden select-none" style={{ width, height }}>
      <ComputerLabScene width={width} height={height}/>
      <TechTom mood="happy" speaking={current.spoken}/>

      {/* Top Header */}
      <div className="z-10 flex items-center justify-between w-full max-w-xl bg-slate-900/80 backdrop-blur rounded-2xl px-6 py-3 border border-slate-700">
        <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Computer Lab Adventure 💻
        </h1>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-cyan-400 scale-125' : 'bg-slate-600'}`}/>))}
        </div>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} transition={{ duration: 0.3 }} className={`z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br ${current.bgColor} shadow-2xl max-w-xl w-full border border-white/20 my-auto`}>
        <span className="text-6xl mb-4 animate-bounce">{current.emoji}</span>
        <h2 className="text-2xl font-black text-white mb-3 drop-shadow-md">{current.title}</h2>
        <p className="text-base font-medium text-white/90 leading-relaxed max-w-md">{current.text}</p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="z-10 flex justify-between w-full max-w-xl px-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-6 py-3 rounded-2xl font-bold text-white transition-all shadow-lg ${slide === 0 ? 'bg-slate-700/50 opacity-40 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600 active:scale-95'}`}>
          ⬅️ Back
        </button>
        <button onClick={handleNext} className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-95 shadow-xl transition-all">
          {slide === total - 1 ? 'Start Playing! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>);
}
// ─── Main Component ───────────────────────────────────────────
export interface ComputerBasicsGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function ComputerBasicsGame({ width = 720, height = 560, onComplete }: ComputerBasicsGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [showSuccessBanner, setShowSuccessBanner] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showSparkles, setShowSparkles] = useState(false);
    const [sparklePos, setSparklePos] = useState({ x: 360, y: 280 });
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>("Let's learn about computers!");
    // Sort challenge states
    const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
    // Inactivity timer ref
    const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimer.current)
            clearTimeout(inactivityTimer.current);
        inactivityTimer.current = setTimeout(() => {
            setShowHint(true);
            audioManager.play('hint');
            setMascotMood('thinking');
            setMascotSpeech("Need a hint? Check the message below!");
            speechManager.speak("Need a hint? Check the message below!");
        }, 10000);
    }, []);
    useEffect(() => {
        if (screen === 'play') {
            resetInactivityTimer();
        }
        return () => {
            speechManager.stop();
            if (inactivityTimer.current)
                clearTimeout(inactivityTimer.current);
        };
    }, [screen, currentIndex, resetInactivityTimer]);
    const challenge = CHALLENGES[currentIndex];
    // Reset sort state when challenge changes
    useEffect(() => {
        setPlacedItems({});
        setShowHint(false);
        setMascotMood('happy');
        setMascotSpeech(challenge.question);
        speechManager.speak(challenge.question);
    }, [currentIndex, challenge]);
    const handleCorrectAnswer = useCallback((e?: React.MouseEvent) => {
        audioManager.play('success');
        setShowSparkles(true);
        if (e)
            setSparklePos({ x: e.clientX, y: e.clientY });
        setMascotMood('celebrate');
        setMascotSpeech("Fantastic job! You got it right! 🎉");
        speechManager.speak("Fantastic job! You got it right! 🎉");
        setStars(s => s + 1);
        setScore(s => s + 15);
        setTimeout(() => {
            setShowSparkles(false);
            if (currentIndex < CHALLENGES.length - 1) {
                setCurrentIndex(i => i + 1);
            }
            else {
                setShowConfetti(true);
                setShowSuccessBanner(true);
                audioManager.play('celebration');
                setMascotSpeech("You are a Computer Master! Amazing!");
                speechManager.speak("You are a Computer Master! Amazing!");
                if (onComplete)
                    onComplete(Math.max(0, 100 - errors * 5));
            }
        }, 1200);
    }, [currentIndex, errors, onComplete]);
    const handleWrongAnswer = useCallback(() => {
        audioManager.play('error');
        setErrors(e => e + 1);
        setMascotMood('thinking');
        setMascotSpeech(challenge.misconception);
        speechManager.speak(challenge.misconception);
    }, [challenge]);
    const handleOptionClick = (opt: string, e: React.MouseEvent) => {
        resetInactivityTimer();
        if (opt === challenge.answer) {
            handleCorrectAnswer(e);
        }
        else {
            handleWrongAnswer();
        }
    };
    const handleDragStart = (_id: string) => {
        resetInactivityTimer();
        audioManager.play('pickup');
    };
    const handleDragEnd = (id: string, x: number, y: number): boolean => {
        resetInactivityTimer();
        const item = challenge.sortItems?.find(i => i.id === id);
        if (!item || !challenge.bins)
            return false;
        // Check bin bounding boxes
        const binLayouts: Record<string, {
            x: number;
            y: number;
            w: number;
            h: number;
        }> = {};
        if (challenge.bins.length === 2) {
            binLayouts['bin-0'] = { x: 120, y: 340, w: 200, h: 100 };
            binLayouts['bin-1'] = { x: 400, y: 340, w: 200, h: 100 };
        }
        else if (challenge.bins.length === 3) {
            binLayouts['bin-0'] = { x: 60, y: 340, w: 180, h: 100 };
            binLayouts['bin-1'] = { x: 270, y: 340, w: 180, h: 100 };
            binLayouts['bin-2'] = { x: 480, y: 340, w: 180, h: 100 };
        }
        let droppedBinIndex = -1;
        for (let i = 0; i < challenge.bins.length; i++) {
            const b = binLayouts[`bin-${i}`];
            if (b && x >= b.x - 20 && x <= b.x + b.w + 20 && y >= b.y - 20 && y <= b.y + b.h + 20) {
                droppedBinIndex = i;
                break;
            }
        }
        if (droppedBinIndex !== -1) {
            const targetBin = challenge.bins[droppedBinIndex];
            if (item.correctBin === targetBin.id) {
                audioManager.play('drop-correct');
                const nextPlaced = { ...placedItems, [id]: true };
                setPlacedItems(nextPlaced);
                // Check if all items placed
                if (challenge.sortItems && Object.keys(nextPlaced).length === challenge.sortItems.length) {
                    handleCorrectAnswer();
                }
                return true;
            }
        }
        audioManager.play('drop-wrong');
        handleWrongAnswer();
        return false;
    };
    if (screen === 'teaching') {
        return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
    }
    return (<div className="relative flex flex-col items-center justify-between p-4 overflow-hidden select-none" style={{ width, height }}>
      <ComputerLabScene width={width} height={height}/>
      <TechTom mood={mascotMood} speaking={mascotSpeech}/>

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccessBanner && <SuccessBanner message="You are a Computer Whiz! 💻⭐" onComplete={() => setShowSuccessBanner(false)}/>}
      {showSparkles && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkles(false)}/>}
      {showHint && <HintBubble message={challenge.hint} onComplete={() => setShowHint(false)}/>}

      {/* Top Status Bar */}
      <div className="z-10 flex items-center justify-between w-full max-w-2xl bg-slate-900/80 backdrop-blur rounded-2xl px-5 py-2.5 border border-slate-700 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-cyan-300">Level {currentIndex + 1} / {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <div className="text-sm font-black text-cyan-400">Score: {score}</div>
      </div>

      {/* Challenge Question Card */}
      <motion.div key={currentIndex} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="z-10 bg-slate-900/85 backdrop-blur border border-slate-700 rounded-2xl px-6 py-4 max-w-2xl w-full text-center shadow-xl my-2">
        <h2 className="text-lg font-black text-white">{challenge.question}</h2>
      </motion.div>

      {/* Challenge Interaction Area */}
      <div className="z-10 relative flex-1 w-full max-w-2xl flex items-center justify-center my-2">
        {challenge.answer !== 'sort' ? (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4">
            {challenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={(e) => handleOptionClick(opt, e)} className="bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-cyan-400 rounded-2xl p-5 text-white font-bold text-sm shadow-xl flex flex-col items-center justify-center gap-2 transition-all min-h-[110px]">
                {opt.includes('Desktop') || opt.includes('computer') ? <DesktopIcon size={48}/> :
                    opt.includes('Laptop') ? <LaptopIcon size={48}/> :
                        opt.includes('CPU') ? <CpuIcon size={48}/> :
                            opt.includes('Monitor') ? <MonitorIcon size={48}/> :
                                opt.includes('Keyboard') ? <KeyboardIcon size={48}/> : <span className="text-3xl">💡</span>}
                <span>{opt}</span>
              </motion.button>))}
          </div>) : (<div className="relative w-full h-[320px]">
            {/* Bins */}
            {challenge.bins && challenge.bins.map((bin, i) => {
                const binX = challenge.bins?.length === 2 ? (i === 0 ? 80 : 380) : (i === 0 ? 30 : i === 1 ? 250 : 470);
                const binW = challenge.bins?.length === 2 ? 260 : 200;
                return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={binX} y={210} width={binW} height={95} isHovering={false}/>);
            })}

            {/* Sort Items */}
            {challenge.sortItems && challenge.sortItems.map((item, i) => {
                const startX = 60 + i * 145;
                const startY = 40;
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={startX} y={startY} placed={!!placedItems[item.id]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
          </div>)}
      </div>

      {/* Bottom Hint Trigger */}
      <div className="z-10 flex justify-center w-full py-1">
        <button onClick={() => {
            setShowHint(true);
            audioManager.play('hint');
        }} className="text-xs font-bold text-cyan-300 hover:text-cyan-200 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 shadow flex items-center gap-1.5 transition-all">
          💡 Need a hint?
        </button>
      </div>
    </div>);
}
