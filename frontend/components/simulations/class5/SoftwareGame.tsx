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

// --- CUSTOM SVG ICON COMPONENTS (12 icons) ---

function OperatingSystemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="6" y="10" width="52" height="38" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
      <rect x="10" y="14" width="44" height="26" rx="2" fill="#38BDF8" />
      <circle cx="16" cy="48" r="4" fill="#64748B" />
      <path d="M24 48H40" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 22L28 27L20 32V22Z" fill="#F8FAFC" />
      <rect x="32" y="22" width="16" height="4" rx="2" fill="#F8FAFC" />
      <rect x="32" y="30" width="12" height="4" rx="2" fill="#F8FAFC" />
    </svg>
  );
}

function UtilityProgramIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="18" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
      <circle cx="32" cy="32" r="8" fill="#FEF3C7" />
      <path d="M32 6V12M32 52V58M6 32H12M52 32H58M13.6 13.6L17.8 17.8M46.2 46.2L50.4 50.4M13.6 50.4L17.8 46.2M46.2 17.8L50.4 13.6" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function DeviceDriverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="6" y="14" width="20" height="36" rx="3" fill="#6366F1" stroke="#4338CA" strokeWidth="3" />
      <rect x="38" y="20" width="20" height="24" rx="3" fill="#10B981" stroke="#047857" strokeWidth="3" />
      <path d="M26 32H38" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 4" />
      <circle cx="32" cy="32" r="3" fill="#F59E0B" />
    </svg>
  );
}

function GeneralPurposeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="3" />
      <path d="M20 18H44" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 28H44" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 38H32" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round" />
      <circle cx="44" cy="44" r="8" fill="#EC4899" />
      <path d="M41 44L43 46L47 42" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CustomisedSoftwareIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 8L52 20V44L32 56L12 44V20L32 8Z" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="3" />
      <path d="M22 30L29 37L42 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OSSIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="24" fill="#10B981" stroke="#047857" strokeWidth="3" />
      <path d="M20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 20V44" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="44" r="3" fill="#FFFFFF" />
    </svg>
  );
}

function DefragIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="8" y="12" width="48" height="16" rx="3" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <rect x="8" y="36" width="48" height="16" rx="3" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M32 28V36" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 32L32 36L36 32" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackupIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="10" y="16" width="44" height="14" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
      <rect x="10" y="34" width="44" height="14" rx="3" fill="#60A5FA" stroke="#2563EB" strokeWidth="3" />
      <circle cx="18" cy="23" r="2" fill="#FFFFFF" />
      <circle cx="18" cy="41" r="2" fill="#FFFFFF" />
      <path d="M44 8L54 18L44 28" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MonitorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="8" y="10" width="48" height="34" rx="4" fill="#334155" stroke="#0F172A" strokeWidth="3" />
      <rect x="12" y="14" width="40" height="26" rx="2" fill="#93C5FD" />
      <path d="M26 44H38V52H26V44Z" fill="#64748B" />
      <path d="M18 52H46" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function KeyboardIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="6" y="18" width="52" height="28" rx="4" fill="#475569" stroke="#1E293B" strokeWidth="3" />
      <rect x="12" y="24" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="22" y="24" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="32" y="24" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="42" y="24" width="6" height="4" rx="1" fill="#E2E8F0" />
      <rect x="16" y="32" width="32" height="6" rx="1" fill="#E2E8F0" />
    </svg>
  );
}

function HardDriveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect x="14" y="10" width="36" height="44" rx="6" fill="#64748B" stroke="#334155" strokeWidth="3" />
      <circle cx="32" cy="32" r="10" fill="#1E293B" />
      <circle cx="32" cy="32" r="4" fill="#38BDF8" />
      <circle cx="42" cy="18" r="2" fill="#10B981" />
    </svg>
  );
}

function SoftwareBoxIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <path d="M32 10L54 22V42L32 54L10 42V22L32 10Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="3" />
      <path d="M32 10V32L54 22" stroke="#BE123C" strokeWidth="3" />
      <path d="M32 32L10 22" stroke="#BE123C" strokeWidth="3" />
    </svg>
  );
}

// --- SCENE BACKGROUND ---

function SceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <svg className="absolute inset-0 pointer-events-none" width={width} height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id="desktop-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="60%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <radialGradient id="screen-glow" cx="50% " cy="40%" r="60%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#desktop-grad)" />
      <circle cx={width / 2} cy={height / 2} r={width * 0.4} fill="url(#screen-glow)" />
      {/* Decorative desktop grid lines */}
      <path d={`M 0 ${height * 0.85} L ${width} ${height * 0.85}`} stroke="#475569" strokeWidth="3" strokeDasharray="8 8" />
      <rect x={20} y={20} width={width - 40} height={height - 40} rx="12" fill="none" stroke="#475569" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

// --- MASCOT COMPONENT ---

interface MascotProps {
  mood: MascotMood;
  speakingText: string | null;
}

function TechieTara({ mood, speakingText }: MascotProps) {
  return (
    <div className="flex items-end gap-3 relative select-none z-10">
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Body / Laptop base */}
          <rect x="25" y="65" width="50" height="25" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="3" />
          <path d="M15 90H85" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          {/* Screen / Head */}
          <rect x="20" y="20" width="60" height="45" rx="8" fill="#0EA5E9" stroke="#0369A1" strokeWidth="3" />
          <rect x="26" y="26" width="48" height="33" rx="4" fill="#F8FAFC" />
          {/* Eyes */}
          <circle cx="40" cy="40" r="5" fill="#1E293B" />
          <circle cx="60" cy="40" r="5" fill="#1E293B" />
          {mood === 'celebrate' && (
            <>
              <path d="M37 36L43 44" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <path d="M57 36L63 44" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
              <path d="M42 52C45 56 55 56 58 52" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
            </>
          )}
          {mood === 'thinking' && (
            <path d="M44 54C47 50 53 50 56 54" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
          {mood === 'happy' && (
            <path d="M42 52C45 55 55 55 58 52" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
          {/* Glasses & Code Badge */}
          <rect x="35" y="22" width="30" height="10" rx="3" fill="#F59E0B" />
          <text x="50" y="80" fontSize="10" fill="#FFFFFF" textAnchor="middle" fontWeight="bold">TARA</text>
        </svg>
      </div>
      <AnimatePresence>
        {speakingText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white text-slate-800 px-4 py-2.5 rounded-2xl shadow-xl border-2 border-sky-300 max-w-xs text-sm font-medium relative mb-4"
          >
            <div className="absolute -left-2.5 bottom-3 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-white border-b-8 border-b-transparent" />
            {speakingText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- STAR ROW COMPONENT ---

function StarRow({ score }: { score: number }) {
  const starsEarned = Math.min(3, Math.floor(score / 30));
  return (
    <div className="flex gap-1.5 items-center bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-600 shadow-inner">
      {[1, 2, 3].map(i => (
        <span key={i} className={`text-lg transition-transform duration-300 ${i <= starsEarned ? 'scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]' : 'grayscale opacity-40'}`}>
          ⭐
        </span>
      ))}
      <span className="text-white font-bold text-xs ml-1">{score} pts</span>
    </div>
  );
}

// --- SORT ICON RENDERER ---

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'os': return <OperatingSystemIcon size={size} />;
    case 'utility': return <UtilityProgramIcon size={size} />;
    case 'driver': return <DeviceDriverIcon size={size} />;
    case 'general': return <GeneralPurposeIcon size={size} />;
    case 'custom': return <CustomisedSoftwareIcon size={size} />;
    case 'oss': return <OSSIcon size={size} />;
    case 'defrag': return <DefragIcon size={size} />;
    case 'backup': return <BackupIcon size={size} />;
    default: return <SoftwareBoxIcon size={size} />;
  }
}

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
    <Draggable
      id={id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={110}
      height={95}
    >
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white/95 backdrop-blur cursor-grab active:cursor-grabbing p-1" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-slate-700 text-center mt-1 truncate max-w-[100px]">{label}</span>
      </div>
    </Draggable>
  );
}

interface SortBinProps {
  id: string;
  label: string;
  color: string;
  isHovered: boolean;
}

function SortBin({ label, color, isHovered }: SortBinProps) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border-4 p-4 transition-all duration-300 ${color} ${isHovered ? 'scale-105 shadow-2xl ring-4 ring-amber-300' : 'shadow-md opacity-90'}`} style={{ width: 180, height: 130 }}>
      <span className="text-xs font-black text-white text-center drop-shadow">{label}</span>
    </div>
  );
}

// --- INTERFACES & DATA ---

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBinData {
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
  bins?: SortBinData[];
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Welcome to Software World!",
    text: "Techie Tara is here! Software is a set of instructions that tells the computer hardware what to do. There are two main families: System Software and Application Software.",
    emoji: "💻",
    bgColor: "from-blue-900 to-indigo-900",
    spoken: "Welcome to Software World! Techie Tara is here to show you how software makes computers work."
  },
  {
    title: "System Software: The Boss",
    text: "System software manages the computer hardware. The Operating System (like Windows or Linux) starts the computer, manages memory, and lets other programs run!",
    emoji: "⚙️",
    bgColor: "from-indigo-900 to-slate-900",
    spoken: "System software is the boss! The operating system starts the machine and manages all hardware resources."
  },
  {
    title: "Utility Programs & Drivers",
    text: "Utilities like Antivirus and Disk Cleanup keep the computer healthy. Device drivers act as translators between the operating system and hardware like printers and keyboards.",
    emoji: "🛠️",
    bgColor: "from-slate-900 to-sky-900",
    spoken: "Utility programs keep the system healthy, while device drivers help the operating system talk to printers and keyboards."
  },
  {
    title: "Application Software",
    text: "Application software helps users perform specific tasks. General purpose software (like Word, Excel, Paint) is used by anyone for many jobs. Customised software (like school attendance systems) is built for one specific organisation.",
    emoji: "📝",
    bgColor: "from-sky-900 to-emerald-900",
    spoken: "Application software helps you do real jobs. General purpose tools are like multi-tools, while customised software is tailor-made for one organisation."
  },
  {
    title: "OSS, Defrag & Backup",
    text: "Open Source Software (OSS) has freely available source code (like Linux and Firefox). Defragmentation rearranges scattered file fragments for faster access, and Backup creates safe copies of data!",
    emoji: "🔒",
    bgColor: "from-emerald-900 to-blue-900",
    spoken: "Open source software is free to share and modify. Defragmentation speeds up your hard disk, and backup keeps your data safe from loss!"
  }
];

const CHALLENGES: Challenge[] = [
  // Challenge 1
  {
    type: 'identify',
    question: "Which of these is classified as SYSTEM software?",
    answer: "Microsoft Windows OS",
    options: ["Microsoft Word", "Microsoft Windows OS", "Microsoft Paint", "Google Chrome"],
    hint: "Think about which program manages the computer's hardware and starts the machine.",
    misconception: "Students often think any installed program is system software. Remember, Word and Paint are applications for user tasks, while Windows is the operating system running the machine."
  },
  // Challenge 2
  {
    type: 'sort',
    question: "Sort each software item into System Software or Application Software!",
    answer: "sorted",
    options: [],
    hint: "System software manages hardware and runs the computer; application software helps users do specific tasks.",
    misconception: "Confusing system and application software is common. System software is essential for booting up and managing resources, whereas application software performs user tasks like typing or painting.",
    sortItems: [
      { id: 's1', label: 'Windows OS', icon: 'os', correctBin: 'system' },
      { id: 's2', label: 'MS Word', icon: 'general', correctBin: 'app' },
      { id: 's3', label: 'Antivirus', icon: 'utility', correctBin: 'system' },
      { id: 's4', label: 'School Attendance', icon: 'custom', correctBin: 'app' }
    ],
    bins: [
      { id: 'system', label: 'System Software', color: 'bg-indigo-600 border-indigo-400' },
      { id: 'app', label: 'Application Software', color: 'bg-emerald-600 border-emerald-400' }
    ]
  },
  // Challenge 3
  {
    type: 'identify',
    question: "What is the primary job of an Operating System?",
    answer: "Manages hardware and software resources",
    options: ["Only browses the internet", "Manages hardware and software resources", "Only plays music files", "Only creates drawings"],
    hint: "The operating system is the boss of the computer that oversees memory, processor time, and files.",
    misconception: "Some students think the operating system is just a desktop picture. In reality, it is a powerful manager that controls memory, processor scheduling, and peripheral devices."
  },
  // Challenge 4
  {
    type: 'sort',
    question: "Sort each utility program or driver to its correct function!",
    answer: "sorted",
    options: [],
    hint: "Utilities maintain and protect the computer, while device drivers translate signals for hardware.",
    misconception: "Students sometimes think device drivers are physical wires. Device drivers are software programs that translate OS signals for hardware devices like printers and keyboards.",
    sortItems: [
      { id: 'u1', label: 'Disk Cleanup', icon: 'utility', correctBin: 'util' },
      { id: 'u2', label: 'Printer Driver', icon: 'driver', correctBin: 'driver' },
      { id: 'u3', label: 'Antivirus', icon: 'utility', correctBin: 'util' },
      { id: 'u4', label: 'Keyboard Driver', icon: 'driver', correctBin: 'driver' }
    ],
    bins: [
      { id: 'util', label: 'Utility Programs', color: 'bg-amber-600 border-amber-400' },
      { id: 'driver', label: 'Device Drivers', color: 'bg-violet-600 border-violet-400' }
    ]
  },
  // Challenge 5
  {
    type: 'identify',
    question: "What is Open Source Software (OSS)?",
    answer: "Software whose source code is freely available",
    options: ["Software that costs a lot of money", "Software whose source code is freely available", "Software that cannot be modified", "Software that only runs on mobile"],
    hint: "OSS allows anyone to view, modify, and distribute its source code.",
    misconception: "Many believe OSS is always free of cost and without rules. While source code is open and free to modify, companies can still charge for enterprise support."
  },
  // Challenge 6
  {
    type: 'sort',
    question: "Sort each software into Open Source (OSS) or Proprietary!",
    answer: "sorted",
    options: [],
    hint: "OSS has open code for public collaboration; proprietary software is owned strictly by a company.",
    misconception: "Students often confuse proprietary software with system software. Proprietary software is simply owned by a vendor with closed source code, like MS Windows or MS Office.",
    sortItems: [
      { id: 'o1', label: 'Linux OS', icon: 'oss', correctBin: 'oss' },
      { id: 'o2', label: 'MS Windows', icon: 'os', correctBin: 'prop' },
      { id: 'o3', label: 'Firefox', icon: 'oss', correctBin: 'oss' },
      { id: 'o4', label: 'Adobe Photoshop', icon: 'general', correctBin: 'prop' }
    ],
    bins: [
      { id: 'oss', label: 'Open Source (OSS)', color: 'bg-teal-600 border-teal-400' },
      { id: 'prop', label: 'Proprietary Software', color: 'bg-rose-600 border-rose-400' }
    ]
  },
  // Challenge 7
  {
    type: 'identify',
    question: "What is the main purpose of Disk Defragmentation?",
    answer: "Rearranging fragmented files to improve performance",
    options: ["Deleting unwanted temporary files", "Rearranging fragmented files to improve performance", "Creating a backup copy of data", "Scanning for computer viruses"],
    hint: "Defrag puts scattered file pieces back together in contiguous blocks so the disk reads faster.",
    misconception: "A very common error is thinking defragmentation deletes files to free space. Disk cleanup frees space; defragmentation rearranges scattered fragments for speed."
  },
  // Challenge 8
  {
    type: 'sort',
    question: "Sort each utility operation to its correct maintenance task!",
    answer: "sorted",
    options: [],
    hint: "Think about whether the tool cleans space, secures files, rearranges fragments, or makes safety copies.",
    misconception: "Students sometimes think backup is just copy-pasting on the same hard disk. True backup stores copies safely in a separate location so data survives disk failure.",
    sortItems: [
      { id: 'op1', label: 'Defragmentation', icon: 'defrag', correctBin: 'defragBin' },
      { id: 'op2', label: 'Data Backup', icon: 'backup', correctBin: 'backupBin' },
      { id: 'op3', label: 'Disk Cleanup', icon: 'utility', correctBin: 'defragBin' },
      { id: 'op4', label: 'Cloud Copy', icon: 'backup', correctBin: 'backupBin' }
    ],
    bins: [
      { id: 'defragBin', label: 'Speed & Cleanup', color: 'bg-blue-600 border-blue-400' },
      { id: 'backupBin', label: 'Safety & Backup', color: 'bg-purple-600 border-purple-400' }
    ]
  }
];

// --- COMPONENT PROPS ---

export interface SoftwareGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SoftwareGame({ width = 720, height = 560, onComplete }: SoftwareGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 140, y: height - 170 };
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
      const compMsg = "Wonderful! You are a brilliant software star!";
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

    // Simple bounding box hit detection for bins placed in the upper/middle area
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binLeft = 80 + idx * 280;
      const binRight = binLeft + 180;
      const binTop = 160;
      const binBottom = 290;
      if (x >= binLeft - 20 && x <= binRight + 20 && y >= binTop - 20 && y <= binBottom + 20) {
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
        const msg = "Fantastic sorting! All items placed correctly!";
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
      className="relative overflow-hidden select-none font-sans flex flex-col justify-between p-4 rounded-3xl shadow-2xl border-4 border-slate-700 bg-slate-900"
      style={{ width, height }}
    >
      <SceneBackground width={width} height={height} />

      {/* OVERLAYS & FEEDBACK */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* TOP HEADER */}
      <div className="flex justify-between items-center z-15 bg-slate-800/90 backdrop-blur px-4 py-2.5 rounded-2xl border border-slate-700 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💻</span>
          <div>
            <h1 className="text-white font-extrabold text-sm tracking-wide">Software World</h1>
            <p className="text-sky-400 text-[10px] font-semibold">Class 5 ICSE Computer Science</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && (
            <span className="text-xs font-bold bg-slate-700 px-3 py-1 rounded-full text-sky-300">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
          )}
          <StarRow score={score} />
        </div>
      </div>

      {/* SCREEN CONTENT */}
      <div className="flex-1 flex flex-col justify-center items-center my-2 relative z-10">
        {screen === 'teaching' ? (
          <div className="w-full max-w-xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl border-2 border-sky-500/40 shadow-2xl flex flex-col items-center text-center">
            <div className="text-6xl mb-3 animate-bounce">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-black text-white mb-2">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-slate-200 text-sm leading-relaxed mb-6 px-4">{TEACHING_SLIDES[slideIdx].text}</p>
            
            <div className="flex justify-between items-center w-full px-4">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === slideIdx ? 'w-6 bg-sky-400' : 'w-2 bg-slate-600'}`} />
                ))}
              </div>
              <div className="flex gap-2">
                {slideIdx > 0 && (
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setSlideIdx(prev => prev - 1);
                    }}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl shadow transition"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    if (slideIdx < TEACHING_SLIDES.length - 1) {
                      setSlideIdx(prev => prev + 1);
                    } else {
                      setScreen('play');
                    }
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg transition transform active:scale-95"
                >
                  {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Game! 🚀" : "Next ➔"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-between items-center">
            {/* QUESTION BOX */}
            <div className="bg-slate-800/95 border-2 border-sky-500/50 px-6 py-3 rounded-2xl shadow-xl max-w-xl text-center">
              <p className="text-white font-bold text-sm md:text-base leading-snug">{currentChallenge.question}</p>
            </div>

            {/* CHALLENGE BODY */}
            {currentChallenge.type === 'identify' ? (
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg my-auto">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnStyle = "bg-slate-800 hover:bg-slate-700 text-white border-slate-600";
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnStyle = "bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]";
                    else if (isSelected) btnStyle = "bg-rose-600 text-white border-rose-400 animate-shake";
                  }
                  return (
                    <button
                      key={idx}
                      onClick={(e) => handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-2xl border-2 font-bold text-xs md:text-sm shadow-md transition-all duration-200 flex items-center justify-center text-center ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex-1 relative my-2">
                {/* BINS */}
                <div className="flex justify-around items-center w-full px-8 mb-4">
                  {currentChallenge.bins?.map(bin => (
                    <SortBin
                      key={bin.id}
                      id={bin.id}
                      label={bin.label}
                      color={bin.color}
                      isHovered={hoveredBin === bin.id}
                    />
                  ))}
                </div>

                {/* DRAGGABLE ITEMS */}
                {currentChallenge.sortItems?.map(item => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemPositions[item.id]?.x || 50}
                    y={itemPositions[item.id]?.y || height - 160}
                    placed={placedItems[item.id] || false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            )}

            {/* NEXT / ADVANCE BUTTON WHEN COMPLETED */}
            {(selectedOpt === currentChallenge.answer || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-2 z-20"
              >
                <button
                  onClick={advanceChallenge}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-xl transform active:scale-95 transition"
                >
                  {challengeIdx < CHALLENGES.length - 1 ? "Next Challenge ➔" : "Complete Game! 🎉"}
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER BAR WITH MASCOT */}
      <div className="flex justify-between items-end z-15 pt-2 border-t border-slate-800">
        <TechieTara mood={mascotMood} speakingText={speakingText} />
        <div className="flex gap-2">
          <button
            onClick={handleShowHint}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
          >
            <span>💡</span> Hint
          </button>
          {screen === 'play' && (
            <button
              onClick={() => {
                audioManager.play('tap');
                setScreen('teaching');
              }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl shadow transition"
            >
              Review Lesson
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
