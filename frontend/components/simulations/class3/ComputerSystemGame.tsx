'use client';

/**
 * ComputerSystemGame — Learn about computer systems: hardware, software, components, GUI, and Windows operations.
 *
 * CISCE Nodes: c3_cs_001 (Computer system overview), c3_cs_002 (Main components - CPU, memory, input, output, storage),
 *              c3_cs_003 (Types of software - system and application), c3_cs_004 (GUI operating system - desktop, icons, taskbar, start menu),
 *              c3_cs_005 (Windows operations - opening, closing, minimising, maximising windows)
 *
 * ELI5: "A computer is like an organized team! Hardware is the body parts you can touch like monitor and keyboard.
 *   Software is the brain instructions. The CPU thinks, input brings data in, output shows answers, memory holds temporarily,
 *   and storage keeps files forever! Windows gives us a GUI with pictures and icons!"
 *
 * Misconceptions (from enrichment):
 *   1. "CPU and monitor are the same" → "No! The monitor is just the screen you see. The CPU is the tiny chip inside that acts as the brain!"
 *   2. "Software is something you can touch" → "No! Hardware is physical and touchable. Software is invisible programs and instructions!"
 *   3. "Windows is an application program" → "No! Windows is an Operating System, which is System Software that manages the whole computer!"
 *   4. "Minimizing a window closes the program" → "No! Minimizing only hides the window to a button on the taskbar. The program keeps running!"
 *   5. "RAM and hard drive are the same" → "No! RAM is temporary memory that forgets when power goes off. Hard drive stores files permanently!"
 *
 * Story: "Help Techie Tariq the Computer Teacher sort computer parts, manage software, and master Windows desktop operations!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── GameScreen Type Definition ───────────────────────────────
type GameScreen = 'teaching' | 'play';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
  {
    title: 'Hardware & Software 💻',
    text: 'A computer system has hardware (physical parts you can touch like monitor, keyboard, CPU) and software (programs and instructions that tell hardware what to do)! They work together as a team!',
    emoji: '🖥️',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'A computer system has hardware, the physical parts you can touch, and software, the programs that tell hardware what to do!',
  },
  {
    title: 'The 5 Main Components 🧠',
    text: 'Computers have 5 main parts: CPU (the brain that thinks), Memory / RAM (temporary working notepad), Input unit (keyboard & mouse bringing data in), Output unit (monitor & printer showing answers), and Storage (hard drive saving forever)!',
    emoji: '⚙️',
    bgColor: 'from-indigo-500 to-purple-600',
    spoken: 'Computers have five main parts: CPU, memory, input unit, output unit, and storage unit!',
  },
  {
    title: 'Types of Software 📀',
    text: 'System software (like Windows or Linux) manages the hardware and runs the computer. Application software (like MS Paint or Word) does specific jobs for you like drawing or writing!',
    emoji: '💽',
    bgColor: 'from-purple-500 to-pink-600',
    spoken: 'System software manages the computer, while application software does specific tasks for the user!',
  },
  {
    title: 'GUI & Windows Desktop 🪟',
    text: 'GUI stands for Graphical User Interface! It uses pictures instead of text commands. The main screen is the desktop with icons (small pictures). The bottom bar is the taskbar, and the corner button opens the Start menu!',
    emoji: '🎨',
    bgColor: 'from-teal-500 to-blue-600',
    spoken: 'GUI uses pictures and icons! The desktop is your workspace, the taskbar shows open programs, and the Start menu helps you find apps!',
  },
  {
    title: 'Window Operations 🗂️',
    text: 'Windows can be opened, closed (using the X button), minimized (hiding to taskbar), maximized (full screen), or restored! The Operating System directs everything like a traffic police officer!',
    emoji: '🔍',
    bgColor: 'from-cyan-500 to-teal-600',
    spoken: 'You can open, close, minimize, maximize, and restore windows! The operating system directs every part like a traffic police officer!',
  },
];

// ─── Types ────────────────────────────────────────────────────
type ChallengeType = 'identify_cpu' | 'identify_brain' | 'sort_components' | 'identify_system_sw' | 'sort_software' | 'identify_taskbar' | 'sort_windows_elements' | 'sort_window_buttons';

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

// ─── Challenges (8 progressive: easy → hard) ──────────────────
const CHALLENGES: Challenge[] = [
  {
    type: 'identify_cpu',
    question: 'What does CPU stand for?',
    answer: 'Central Processing Unit',
    options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Power Utility'],
    hint: 'Think of the brain of the computer. It processes data and calculations!',
    misconception: 'CPU stands for Central Processing Unit! It is the brain inside the computer that fetches instructions and performs calculations.',
  },
  {
    type: 'identify_brain',
    question: 'Which component is called the BRAIN of the computer?',
    answer: 'CPU',
    options: ['CPU', 'Monitor', 'Keyboard'],
    hint: 'It thinks, calculates, and controls the other parts. It is a tiny chip inside!',
    misconception: 'The CPU is the brain of the computer! The monitor is just an output screen, and the keyboard is an input device.',
  },
  {
    type: 'sort_components',
    question: 'Drag each computer part to its correct component group!',
    answer: 'sort',
    options: [],
    hint: 'Keyboard = Input. Monitor = Output. CPU = Processing. Hard drive = Storage.',
    misconception: 'Input devices bring data in (keyboard), output devices show results (monitor), CPU processes data, and storage keeps files permanently!',
    sortItems: [
      { id: 'kbd', label: 'Keyboard', icon: 'keyboard', correctBin: 'input' },
      { id: 'mon', label: 'Monitor', icon: 'monitor', correctBin: 'output' },
      { id: 'cpu', label: 'CPU Chip', icon: 'cpu', correctBin: 'processing' },
      { id: 'hdd', label: 'Hard Drive', icon: 'harddrive', correctBin: 'storage' },
    ],
    bins: [
      { id: 'input', label: 'Input 📥', color: '#3B82F6' },
      { id: 'output', label: 'Output 📤', color: '#10B981' },
      { id: 'processing', label: 'Processing 🧠', color: '#F59E0B' },
      { id: 'storage', label: 'Storage 💾', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify_system_sw',
    question: 'Which of these is SYSTEM software?',
    answer: 'Windows Operating System',
    options: ['Windows Operating System', 'MS Paint', 'Calculator App'],
    hint: 'System software manages the hardware and starts the computer first!',
    misconception: 'Windows is System Software because it manages the hardware and provides a platform! Paint and Calculator are application software for specific user tasks.',
  },
  {
    type: 'sort_software',
    question: 'Drag each program! Is it System Software or Application Software?',
    answer: 'sort',
    options: [],
    hint: 'Windows & Linux manage the machine (System). Paint & Word do special tasks (Application).',
    misconception: 'System software controls the computer hardware (Windows, Linux). Application software performs specific user tasks (MS Word, Paint, Games)!',
    sortItems: [
      { id: 'win', label: 'Windows OS', icon: 'windows', correctBin: 'system' },
      { id: 'lin', label: 'Linux OS', icon: 'windows', correctBin: 'system' },
      { id: 'word', label: 'MS Word', icon: 'app', correctBin: 'application' },
      { id: 'paint', label: 'MS Paint', icon: 'app', correctBin: 'application' },
    ],
    bins: [
      { id: 'system', label: 'System Software ⚙️', color: '#3B82F6' },
      { id: 'application', label: 'Application Software 📝', color: '#EC4899' },
    ],
  },
  {
    type: 'identify_taskbar',
    question: 'What is the taskbar used for in Windows?',
    answer: 'Switching between open programs and seeing the time',
    options: ['Switching between open programs and seeing the time', 'Drawing colourful pictures', 'Typing letters and essays'],
    hint: 'Look at the long strip at the bottom of the screen. It shows open windows!',
    misconception: 'The taskbar shows programs that are currently open and lets you switch between them easily! It is like a shelf for open books.',
  },
  {
    type: 'sort_windows_elements',
    question: 'Drag each Windows GUI element to its correct definition!',
    answer: 'sort',
    options: [],
    hint: 'Desktop = main screen. Taskbar = bottom bar. Start menu = program list.',
    misconception: 'Desktop is the main workspace screen, taskbar shows open programs, start menu lists all apps, and icons are small picture shortcuts!',
    sortItems: [
      { id: 'desk', label: 'Desktop', icon: 'windows', correctBin: 'desktop' },
      { id: 'task', label: 'Taskbar', icon: 'taskbar', correctBin: 'taskbar' },
      { id: 'start', label: 'Start Menu', icon: 'startmenu', correctBin: 'startmenu' },
    ],
    bins: [
      { id: 'desktop', label: 'Main Screen 🖥️', color: '#3B82F6' },
      { id: 'taskbar', label: 'Bottom Bar 📊', color: '#10B981' },
      { id: 'startmenu', label: 'App List 📋', color: '#F59E0B' },
    ],
  },
  {
    type: 'sort_window_buttons',
    question: 'Drag each window button to its correct operation!',
    answer: 'sort',
    options: [],
    hint: 'X = Close. Short line = Minimize. Square = Maximize.',
    misconception: 'Minimize hides to taskbar, Maximize makes full screen, Restore returns to normal size, and X (Close) exits the program completely!',
    sortItems: [
      { id: 'min', label: 'Minimize button', icon: 'window', correctBin: 'minimize' },
      { id: 'max', label: 'Maximize button', icon: 'window', correctBin: 'maximize' },
      { id: 'close', label: 'X Close button', icon: 'window', correctBin: 'close' },
    ],
    bins: [
      { id: 'minimize', label: 'Hide to Taskbar ➖', color: '#3B82F6' },
      { id: 'maximize', label: 'Full Screen 🔲', color: '#10B981' },
      { id: 'close', label: 'Exit Program ❌', color: '#EF4444' },
    ],
  },
];

// ─── Techie Tariq Mascot (Computer Teacher) ───────────────────
function TechieTariq({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-indigo-400"
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
            <linearGradient id="tariq-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="tariq-hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          {/* Body / Shirt */}
          <rect x="20" y="52" width="35" height="30" rx="6" fill="url(#tariq-shirt)" stroke="#312E81" strokeWidth="1.5" />
          {/* Collar & Tie */}
          <polygon points="30,52 37,62 45,52" fill="white" />
          <polygon points="35,60 37,72 39,60" fill="#EF4444" />
          {/* Head */}
          <circle cx="37.5" cy="35" r="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M 21.5 35 Q 21.5 20, 37.5 19 Q 53.5 20, 53.5 35 Q 45 25, 37.5 25 Q 30 25, 21.5 35 Z" fill="url(#tariq-hair)" />
          {/* Glasses */}
          <rect x="27" y="30" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <rect x="38" y="30" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="37" y1="34" x2="38" y2="34" stroke="#1E293B" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="32" cy="34" r="2" fill="#1E293B" />
          <circle cx="43" cy="34" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M 32 43 Q 37.5 47 43 43" stroke="#9A3412" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* USB drive on belt */}
          <rect x="34" y="78" width="7" height="6" rx="1" fill="#06B6D4" stroke="#0E7490" strokeWidth="1" />
          <rect x="36" y="76" width="3" height="3" fill="#CBD5E1" />
          {/* Digital watch on arm */}
          <rect x="15" y="65" width="6" height="4" rx="1" fill="#EF4444" />
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

// ─── Computer Classroom Background Scene ──────────────────────
function ComputerScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="60%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect x="0" y="0" width={width} height={height * 0.7} fill="url(#lab-sky)" />
        {/* Window view (sky gradient outside) */}
        <rect x={width * 0.75} y={20} width={width * 0.2} height={height * 0.4} rx="4" fill="#38BDF8" opacity="0.3" stroke="#6366F1" strokeWidth="2" />
        <line x1={width * 0.75} y1={height * 0.22} x2={width * 0.95} y2={height * 0.22} stroke="#6366F1" strokeWidth="2" />
        <line x1={width * 0.85} y1={20} x2={width * 0.85} y2={height * 0.42} stroke="#6366F1" strokeWidth="2" />
        {/* Whiteboard */}
        <rect x={width * 0.15} y={25} width={width * 0.45} height={height * 0.3} rx="4" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="3" />
        <text x={width * 0.37} y={45} fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">COMPUTER LAB</text>
        <text x={width * 0.37} y={65} fontSize="10" fill="#64748B" textAnchor="middle">Hardware + Software = System</text>
        {/* Floor */}
        <rect x="0" y={height * 0.7} width={width} height={height * 0.3} fill="url(#floor-grad)" />
        {/* Floor grid lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={i * 120} y1={height * 0.7} x2={i * 140 - 50} y2={height} stroke="#475569" strokeWidth="1" opacity="0.4" />
        ))}
      </svg>
    </div>
  );
}

// ─── Custom SVG Component Icons ───────────────────────────────
function CpuIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" rx="4" fill="#1E293B" stroke="#F59E0B" strokeWidth="2" />
      <rect x="20" y="20" width="20" height="20" fill="#3B82F6" stroke="#60A5FA" strokeWidth="1" />
      {/* Pins */}
      {[-6, 2, 10, 18].map(offset => (
        <g key={offset}>
          <line x1={22 + offset} y1="6" x2={22 + offset} y2="12" stroke="#F59E0B" strokeWidth="2" />
          <line x1={22 + offset} y1="48" x2={22 + offset} y2="54" stroke="#F59E0B" strokeWidth="2" />
          <line x1="6" y1={22 + offset} x2="12" y2={22 + offset} stroke="#F59E0B" strokeWidth="2" />
          <line x1="48" y1={22 + offset} x2="54" y2={22 + offset} stroke="#F59E0B" strokeWidth="2" />
        </g>
      ))}
      <text x="30" y="34" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">CPU</text>
    </svg>
  );
}

function MonitorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="30" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      <rect x="12" y="14" width="36" height="22" rx="2" fill="#38BDF8" />
      <rect x="26" y="40" width="8" height="6" fill="#64748B" />
      <rect x="18" y="46" width="24" height="4" rx="2" fill="#475569" />
    </svg>
  );
}

function KeyboardIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="16" width="48" height="28" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => (
          <rect key={`${r}-${c}`} x={10 + c * 7} y={20 + r * 7} width="5" height="5" rx="1" fill="#E2E8F0" />
        ))
      )}
    </svg>
  );
}

function HardDriveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" rx="6" fill="#475569" stroke="#1E293B" strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" fill="#38BDF8" />
      <circle cx="40" cy="18" r="2" fill="#10B981" />
    </svg>
  );
}

function WindowsOsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
      <rect x="13" y="13" width="16" height="16" fill="#38BDF8" />
      <rect x="31" y="13" width="16" height="16" fill="#38BDF8" />
      <rect x="13" y="31" width="16" height="16" fill="#38BDF8" />
      <rect x="31" y="31" width="16" height="16" fill="#38BDF8" />
    </svg>
  );
}

function AppSoftwareIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="8" width="40" height="44" rx="4" fill="white" stroke="#CBD5E1" strokeWidth="2" />
      <rect x="16" y="14" width="28" height="6" rx="2" fill="#EC4899" />
      <line x1="16" y1="28" x2="44" y2="28" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="36" x2="36" y2="36" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="38" cy="44" r="6" fill="#3B82F6" />
    </svg>
  );
}

function TaskbarIconSvg({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="12" width="48" height="36" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
      <rect x="10" y="38" width="40" height="6" fill="#0F172A" />
      <rect x="12" y="39" width="6" height="4" rx="1" fill="#38BDF8" />
      <rect x="20" y="39" width="12" height="4" rx="1" fill="#64748B" />
      <rect x="44" y="39" width="4" height="4" fill="#94A3B8" />
    </svg>
  );
}

function StartMenuIconSvg({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="4" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
      <rect x="14" y="14" width="32" height="8" rx="2" fill="#3B82F6" />
      <rect x="14" y="25" width="32" height="6" rx="1" fill="#334155" />
      <rect x="14" y="33" width="32" height="6" rx="1" fill="#334155" />
      <rect x="14" y="41" width="32" height="6" rx="1" fill="#334155" />
    </svg>
  );
}

function WindowButtonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="12" width="44" height="36" rx="4" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
      <rect x="8" y="12" width="44" height="10" rx="4" fill="#334155" />
      <circle cx="49" cy="17" r="2" fill="#EF4444" />
      <circle cx="43" cy="17" r="2" fill="#F59E0B" />
      <circle cx="37" cy="17" r="2" fill="#10B981" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────
function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'cpu': return <CpuIcon size={size} />;
    case 'monitor': return <MonitorIcon size={size} />;
    case 'keyboard': return <KeyboardIcon size={size} />;
    case 'harddrive': return <HardDriveIcon size={size} />;
    case 'windows': return <WindowsOsIcon size={size} />;
    case 'app': return <AppSoftwareIcon size={size} />;
    case 'taskbar': return <TaskbarIconSvg size={size} />;
    case 'startmenu': return <StartMenuIconSvg size={size} />;
    case 'window': return <WindowButtonIcon size={size} />;
    default: return <CpuIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-indigo-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{label}</span>
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
  isHovering?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 transition-all duration-200 shadow-inner ${
        isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white shadow-md font-bold" style={{ backgroundColor: color }}>
        📂
      </div>
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Component: ComputerSystemGame ───────────────────────
export interface ComputerSystemGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ComputerSystemGame({ width = 720, height = 560, onComplete }: ComputerSystemGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [spokenText, setSpokenText] = useState<string | null>(null);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<{ [id: string]: boolean }>({});
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);

  // Inactivity hint timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current challenge
  const challenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak slide text when teaching slide changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpokenText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  // Speak question when challenge starts
  useEffect(() => {
    if (screen === 'play' && challenge) {
      setSpokenText(challenge.question);
      speechManager.speak(challenge.question);
      resetInactivityTimer();
    }
  }, [screen, challengeIdx]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (challenge) {
        setHintMsg(challenge.hint);
        audioManager.play('hint');
        speechManager.speak(challenge.hint);
        setMascotMood('thinking');
      }
    }, 10000);
  }, [challenge]);

  // Handle multiple choice answer
  const handleAnswerClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

    if (option === challenge.answer) {
      // Correct!
      audioManager.play('success');
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      const praise = 'Great job! That is correct!';
      setSuccessMsg(praise);
      speechManager.speak(praise);
      setSpokenText(praise);
    } else {
      // Wrong!
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMsg(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setSpokenText(challenge.misconception);
    }
  };

  // Advance to next challenge or finish
  const handleNextChallenge = () => {
    setSuccessMsg(null);
    setHintMsg(null);
    setSparklePos(null);
    setMascotMood('happy');
    setPlacedItems({});

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const finishMsg = `Amazing! You completed all computer challenges with ${stars} stars!`;
      setSuccessMsg(finishMsg);
      speechManager.speak(finishMsg);
      setSpokenText(finishMsg);
      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    if (!challenge.bins || !challenge.sortItems) return false;
    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bin bounding boxes
    const binWidth = 140;
    const binHeight = 110;
    const binY = height - 130;
    const totalBins = challenge.bins.length;
    const spacing = (width - totalBins * binWidth) / (totalBins + 1);

    let droppedInBin: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const bx = spacing + idx * (binWidth + spacing);
      const by = binY;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + binHeight + 30) {
        droppedInBin = bin.id;
      }
    });

    setHoveringBin(null);

    if (droppedInBin) {
      if (droppedInBin === item.correctBin) {
        audioManager.play('drop-correct');
        const updatedPlaced = { ...placedItems, [id]: true };
        setPlacedItems(updatedPlaced);

        // Check if all items placed
        const allDone = challenge.sortItems.every(i => updatedPlaced[i.id]);
        if (allDone) {
          audioManager.play('success');
          setStars(prev => prev + 1);
          setMascotMood('celebrate');
          const praise = 'Wonderful sorting! All correct!';
          setSuccessMsg(praise);
          speechManager.speak(praise);
          setSpokenText(praise);
        }
        return true;
      } else {
        audioManager.play('drop-wrong');
        setErrors(prev => prev + 1);
        setMascotMood('thinking');
        setHintMsg(challenge.misconception);
        speechManager.speak(challenge.misconception);
        setSpokenText(challenge.misconception);
        return false;
      }
    }
    return false;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-indigo-400 bg-slate-900 select-none flex flex-col items-center justify-between" style={{ width, height }}>
      {/* Background Scene */}
      <ComputerScene width={width} height={height} />

      {/* Mascot */}
      <TechieTariq mood={mascotMood} speaking={spokenText} />

      {/* Top Navigation / Header */}
      <div className="relative z-10 w-full px-6 py-3 flex items-center justify-between bg-slate-900/80 backdrop-blur-md border-b border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white font-black px-3 py-1 rounded-xl shadow text-sm">
            🖥️ Computer System Game
          </div>
          {screen === 'play' && (
            <div className="text-xs font-bold text-indigo-200">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </div>
          )}
        </div>
        {screen === 'play' && <StarRow count={stars} total={CHALLENGES.length} />}
      </div>

      {/* Main Game Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-6 pb-6">
        {screen === 'teaching' ? (
          /* ─── TEACHING SLIDES ─── */
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-6 drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>

            {/* Slide Navigation */}
            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-5 py-2 rounded-xl font-bold transition-all ${slideIdx === 0 ? 'opacity-30 cursor-not-allowed bg-black/20' : 'bg-white/20 hover:bg-white/30'}`}
              >
                ⬅️ Back
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                    setChallengeIdx(0);
                    setStars(0);
                  }
                }}
                className="px-5 py-2 rounded-xl font-bold bg-white text-indigo-900 hover:bg-indigo-50 shadow-lg transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        ) : (
          /* ─── PLAY SCREEN ─── */
          <div className="w-full max-w-2xl flex flex-col items-center">
            {successMsg ? (
              <div className="flex flex-col items-center justify-center my-auto">
                <SuccessBanner message={successMsg} onComplete={handleNextChallenge} />
                {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                {/* Question Box */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-slate-800/90 backdrop-blur-md border-2 border-indigo-400 rounded-2xl p-4 shadow-xl mb-6 w-full text-center"
                >
                  <h3 className="text-lg font-extrabold text-white">{challenge.question}</h3>
                </motion.div>

                {/* Multiple Choice Challenge */}
                {challenge.answer !== 'sort' && (
                  <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                    {challenge.options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => handleAnswerClick(opt, e)}
                        className="w-full py-3 px-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold rounded-2xl shadow-lg border-2 border-indigo-300/40 text-left transition-all flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <span className="text-lg">👉</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Sort / Drag-and-Drop Challenge */}
                {challenge.answer === 'sort' && challenge.sortItems && challenge.bins && (
                  <div className="relative w-full h-[280px] bg-slate-900/60 rounded-3xl border-2 border-dashed border-indigo-500/40 p-4">
                    {/* Bins at bottom */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-around px-4">
                      {challenge.bins.map((bin, idx) => {
                        const totalBins = challenge.bins!.length;
                        const binWidth = Math.floor((width - 80) / totalBins) - 10;
                        const binX = 25 + idx * (binWidth + 10);
                        return (
                          <SortBin
                            key={bin.id}
                            label={bin.label}
                            color={bin.color}
                            x={binX}
                            y={160}
                            width={binWidth}
                            height={90}
                            isHovering={hoveringBin === bin.id}
                          />
                        );
                      })}
                    </div>

                    {/* Draggable items at top */}
                    <div className="absolute top-4 left-0 right-0 flex flex-wrap justify-center gap-4">
                      {challenge.sortItems.map((item, idx) => {
                        const placed = !!placedItems[item.id];
                        const startX = (width - 400) / 2 + idx * 105;
                        const startY = 15;
                        return (
                          <SortCard
                            key={item.id}
                            id={item.id}
                            label={item.label}
                            icon={item.icon}
                            x={startX}
                            y={startY}
                            placed={placed}
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
          </div>
        )}
      </div>

      {/* Hint Bubble & Sparkles */}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
