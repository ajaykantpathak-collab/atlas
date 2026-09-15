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

// ─── SVG ICON COMPONENTS (10+) ──��─────────────────────────────

function BitIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="15" width="50" height="30" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      <text x="30" y="36" textAnchor="middle" fill="#38BDF8" fontSize="20" fontWeight="bold" fontFamily="monospace">0 / 1</text>
      <circle cx="12" cy="30" r="3" fill="#22C55E" />
    </svg>
  );
}

function ByteIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" rx="8" fill="#312E81" stroke="#4338CA" strokeWidth="2" />
      <text x="30" y="28" textAnchor="middle" fill="#A5B4FC" fontSize="11" fontWeight="bold">8 BITS</text>
      <text x="30" y="43" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">1 BYTE</text>
    </svg>
  );
}

function RAMIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="18" width="44" height="24" rx="4" fill="#047857" stroke="#065F46" strokeWidth="2" />
      <rect x="14" y="22" width="32" height="16" fill="#064E3B" rx="2" />
      {/* Gold pins */}
      {[14, 20, 26, 32, 38, 44].map((x) => (
        <rect key={x} x={x} y="42" width="3" height="6" fill="#F59E0B" />
      ))}
      <text x="30" y="33" textAnchor="middle" fill="#A7F3D0" fontSize="10" fontWeight="bold">RAM</text>
    </svg>
  );
}

function ROMIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="15" width="44" height="30" rx="4" fill="#B91C1C" stroke="#991B1B" strokeWidth="2" />
      <circle cx="16" cy="30" r="4" fill="#FEE2E2" />
      <text x="36" y="34" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">ROM</text>
      {/* Pins */}
      {[14, 22, 30, 38, 46].map((x) => (
        <g key={x}>
          <rect x={x} y="10" width="2" height="5" fill="#F59E0B" />
          <rect x={x} y="45" width="2" height="5" fill="#F59E0B" />
        </g>
      ))}
    </svg>
  );
}

function HDDIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="6" fill="#475569" stroke="#334155" strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" fill="#94A3B8" />
      <path d="M30 30 L40 20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SSDIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="15" width="36" height="30" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
      <rect x="18" y="20" width="24" height="12" rx="2" fill="#1E293B" />
      <circle cx="24" cy="26" r="3" fill="#22C55E" />
      <text x="38" y="29" fill="#38BDF8" fontSize="8" fontWeight="bold">SSD</text>
      <rect x="18" y="36" width="24" height="4" rx="1" fill="#334155" />
    </svg>
  );
}

function USBDriveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Cap */}
      <rect x="22" y="10" width="16" height="12" rx="3" fill="#9333EA" />
      {/* Body */}
      <rect x="18" y="22" width="24" height="24" rx="4" fill="#A855F7" stroke="#7E22CE" strokeWidth="1.5" />
      {/* USB Connector */}
      <rect x="23" y="46" width="14" height="6" fill="#CBD5E1" />
    </svg>
  );
}

function CDIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="30" cy="30" r="22" fill="url(#cd-gradient)" opacity="0.6" />
      <circle cx="30" cy="30" r="7" fill="white" stroke="#64748B" strokeWidth="1" />
    </svg>
  );
}

function DVDIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
      <circle cx="30" cy="30" r="22" fill="url(#dvd-gradient)" opacity="0.6" />
      <circle cx="30" cy="30" r="7" fill="white" stroke="#CA8A04" strokeWidth="1" />
      <text x="30" y="33" textAnchor="middle" fill="#854D0E" fontSize="8" fontWeight="bold">DVD</text>
    </svg>
  );
}

function CloudIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 40 C12 40, 8 36, 8 30 C8 24, 13 20, 19 21 C21 15, 27 12, 34 14 C41 15, 46 22, 45 29 C50 30, 52 35, 49 40 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="30" y="33" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">CLOUD</text>
    </svg>
  );
}

function DataIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
      <text x="30" y="28" textAnchor="middle" fill="#64748B" fontSize="12" fontWeight="bold">90 80 70</text>
      <text x="30" y="42" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">RAW DATA</text>
    </svg>
  );
}

function InfoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="40" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <text x="30" y="24" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">Rohan: 90</text>
      <text x="30" y="38" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">Sita: 80</text>
      <text x="30" y="46" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="bold">INFO</text>
    </svg>
  );
}

function ComputerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="28" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="2" />
      <rect x="14" y="14" width="32" height="20" fill="#38BDF8" rx="2" />
      <rect x="24" y="38" width="12" height="6" fill="#64748B" />
      <rect x="16" y="44" width="28" height="4" rx="2" fill="#475569" />
    </svg>
  );
}

function SwitchIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="20" width="30" height="20" rx="10" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
      <circle cx="25" cy="30" r="8" fill="#22C55E" />
    </svg>
  );
}

// ─── SCENE BACKGROUND ─────────────────────────────────────────

function LabSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="60%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <linearGradient id="cd-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="dvd-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EAB308" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#lab-sky)" />
        {/* Lab server rack graphic in background */}
        <rect x="40" y="60" width="80" height="200" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2" opacity="0.6" />
        {[80, 120, 160, 200].map((y) => (
          <g key={y} opacity="0.6">
            <rect x="50" y={y} width="60" height="25" rx="3" fill="#1E293B" />
            <circle cx="60" cy={y + 12} r="3" fill="#22C55E" />
            <circle cx="70" cy={y + 12} r="3" fill="#38BDF8" />
          </g>
        ))}
        {/* Computer lab desks */}
        <rect x="0" y={height - 80} width={width} height={80} fill="#0F172A" />
        <rect x="0" y={height - 90} width={width} height={12} fill="#334155" />
      </svg>
    </div>
  );
}

// ─── TECHIE TINA MASCOT ───────────────────────────────────────

function TechieTina({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-indigo-500"
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
          <circle cx="37.5" cy="35" r="22" fill="#FDE047" />
          <path d="M15 35 Q15 12, 37.5 12 Q60 12, 60 35 Q60 55, 50 55 Q37.5 45, 25 55 Q15 55, 15 35 Z" fill="#78350F" />
          {/* Face */}
          <circle cx="37.5" cy="37" r="16" fill="#FEF08A" />
          {/* Glasses */}
          <rect x="25" y="30" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <rect x="40" y="30" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="35" y1="34" x2="40" y2="34" stroke="#1E293B" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="30" cy="34" r="2" fill="#1E293B" />
          <circle cx="45" cy="34" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M32 44 Q37.5 49 43 44" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Body / Lab Coat */}
          <path d="M22 55 L37.5 52 L53 55 L55 80 L20 80 Z" fill="white" stroke="#CBD5E1" strokeWidth="2" />
          {/* USB Badge / Necklace */}
          <rect x="33" y="60" width="9" height="12" rx="2" fill="#9333EA" />
          <rect x="35" y="72" width="5" height="4" fill="#CBD5E1" />
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
    case 'data': return <DataIcon size={size} />;
    case 'info': return <InfoIcon size={size} />;
    case 'bit': return <BitIcon size={size} />;
    case 'byte': return <ByteIcon size={size} />;
    case 'ram': return <RAMIcon size={size} />;
    case 'rom': return <ROMIcon size={size} />;
    case 'ssd': return <SSDIcon size={size} />;
    case 'hdd': return <HDDIcon size={size} />;
    case 'usb': return <USBDriveIcon size={size} />;
    case 'cd': return <CDIcon size={size} />;
    case 'dvd': return <DVDIcon size={size} />;
    case 'cloud': return <CloudIcon size={size} />;
    default: return <BitIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-indigo-300 ${placed ? 'opacity-40' : 'bg-white'} p-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
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
      <span className="text-sm font-extrabold text-gray-800 text-center px-2">{label}</span>
    </div>
  );
}

// ─── TEACHING SLIDES ──────��───────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Data vs Information! 📊",
    text: "Data is raw facts and numbers without context, like test marks 90, 80, 70. Information is processed and organised data with meaning, like a report card with student names!",
    emoji: "📊",
    bgColor: "from-indigo-600 to-blue-600",
    spoken: "Data is raw facts and numbers without context, like test marks. Information is processed and organised data with meaning, like a report card!",
  },
  {
    title: "Data Storage Units! 💾",
    text: "Computers measure data storage using special units! A bit is the smallest unit (0 or 1). 8 bits make 1 byte. Then come KB, MB, GB, and TB from smallest to largest!",
    emoji: "💾",
    bgColor: "from-blue-600 to-cyan-600",
    spoken: "Computers measure data storage using special units! A bit is the smallest unit. Eight bits make one byte. Then come kilobyte, megabyte, gigabyte, and terabyte!",
  },
  {
    title: "RAM — Working Memory! ⚡",
    text: "RAM (Random Access Memory) is volatile working memory. It is super fast and holds your open apps, but it loses ALL data when the computer is turned off!",
    emoji: "⚡",
    bgColor: "from-emerald-600 to-teal-600",
    spoken: "RAM is volatile working memory. It holds your open applications, but it loses all data when the computer is turned off!",
  },
  {
    title: "ROM — Startup Memory! 🔒",
    text: "ROM (Read Only Memory) is non-volatile. It keeps its data safe forever without electricity! It stores the permanent startup instructions called the BIOS.",
    emoji: "🔒",
    bgColor: "from-purple-600 to-indigo-600",
    spoken: "ROM is non-volatile memory. It keeps its data safe forever without electricity and stores permanent startup instructions called the BIOS.",
  },
  {
    title: "Storage Devices & Cloud! ☁️",
    text: "Hard disks (HDD), Solid State Drives (SSD), USB flash drives, CDs, DVDs, and cloud storage keep our files safe for the long term. Cloud storage lives on the Internet!",
    emoji: "☁️",
    bgColor: "from-cyan-600 to-blue-700",
    spoken: "Hard disks, solid state drives, USB flash drives, CDs, DVDs, and cloud storage keep our files safe. Cloud storage lives on the Internet!",
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
    question: "What is the DIFFERENCE between data and information?",
    answer: "Data is raw facts without context, information is processed and organised data",
    options: [
      "Data is raw facts without context, information is processed and organised data",
      "Data and information are exactly the same thing",
      "Information is raw and data is processed"
    ],
    hint: "Think: uncooked rice vs cooked biryani! Data is raw numbers, information has headings and meaning.",
    misconception: "Data and information are NOT the same! Data is raw and unorganised (like 90, 80), while information is processed and has meaning (like a report card with student names).",
  },
  {
    type: 'sort',
    question: "Drag each item to Data or Information!",
    answer: "sort",
    options: [],
    hint: "Raw numbers without names go to Data. Organised marks with student names go to Information!",
    misconception: "Remember: raw numbers without context are Data. Once organised with headings and names, they become Information!",
    sortItems: [
      { id: 'item-data1', label: 'Raw marks: 90, 80', icon: 'data', correctBin: 'bin-data' },
      { id: 'item-info1', label: 'Rohan: 90, Sita: 80', icon: 'info', correctBin: 'bin-info' },
    ],
    bins: [
      { id: 'bin-data', label: 'Data 📊', color: '#F59E0B' },
      { id: 'bin-info', label: 'Information 📋', color: '#22C55E' },
    ],
  },
  {
    type: 'identify',
    question: "What is the SMALLEST unit of data storage in a computer?",
    answer: "A bit (0 or 1)",
    options: ["A bit (0 or 1)", "A byte", "A kilobyte"],
    hint: "Think of a single electric switch that is off or on (0 or 1). That is the smallest unit!",
    misconception: "A bit is the smallest unit! A byte is made of 8 bits. Never confuse bit with byte.",
  },
  {
    type: 'sort',
    question: "Drag each storage unit to its correct description!",
    answer: "sort",
    options: [],
    hint: "A bit is 0 or 1. A byte is 8 bits. RAM is working memory. ROM is startup memory.",
    misconception: "Check your units! A bit is a single binary digit (0 or 1), and 8 bits make one byte.",
    sortItems: [
      { id: 'item-bit', label: 'Bit (0 or 1)', icon: 'bit', correctBin: 'bin-bit' },
      { id: 'item-byte', label: '1 Byte (8 bits)', icon: 'byte', correctBin: 'bin-byte' },
    ],
    bins: [
      { id: 'bin-bit', label: 'Bit 0/1 ⚡', color: '#3B82F6' },
      { id: 'bin-byte', label: 'Byte (8 bits) 📦', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: "What is RAM and what happens to its data when the computer is turned off?",
    answer: "RAM is volatile memory — all data is lost when power is off",
    options: [
      "RAM is volatile memory — all data is lost when power is off",
      "RAM keeps data forever even without electricity",
      "RAM is the same thing as a hard disk drive"
    ],
    hint: "RAM is like a whiteboard! Fast to write on, but wiped clean when the power goes off.",
    misconception: "RAM is VOLATILE memory! It needs constant electricity. When the power goes off, EVERYTHING in RAM disappears!",
  },
  {
    type: 'sort',
    question: "Drag each memory type to its correct description!",
    answer: "sort",
    options: [],
    hint: "RAM is volatile working memory. ROM is non-volatile startup memory with BIOS.",
    misconception: "RAM loses data without power (volatile), while ROM keeps startup instructions safe without power (non-volatile).",
    sortItems: [
      { id: 'item-ram', label: 'RAM (Volatile)', icon: 'ram', correctBin: 'bin-ram' },
      { id: 'item-rom', label: 'ROM (Non-volatile)', icon: 'rom', correctBin: 'bin-rom' },
    ],
    bins: [
      { id: 'bin-ram', label: 'RAM (Loses data)', color: '#EF4444' },
      { id: 'bin-rom', label: 'ROM (Keeps BIOS)', color: '#22C55E' },
    ],
  },
  {
    type: 'identify',
    question: "Which storage device has NO moving parts and uses flash memory chips?",
    answer: "SSD (Solid State Drive)",
    options: ["SSD (Solid State Drive)", "HDD (Hard Disk Drive)", "Compact Disc (CD)"],
    hint: "An HDD has spinning platters. This modern drive has no moving parts and is super fast!",
    misconception: "An SSD has NO moving parts and uses flash memory chips, making it much faster and tougher than an HDD with spinning platters!",
  },
  {
    type: 'sort',
    question: "Drag each storage device to Internal or External!",
    answer: "sort",
    options: [],
    hint: "HDDs and SSDs live inside the computer. USBs, CDs, and Cloud live outside!",
    misconception: "Internal devices (HDD, SSD) are fixed inside the computer cabinet. External devices (USB, CD, DVD, Cloud) are portable or accessed via Internet!",
    sortItems: [
      { id: 'item-ssd', label: 'Internal SSD', icon: 'ssd', correctBin: 'bin-internal' },
      { id: 'item-usb', label: 'USB Flash Drive', icon: 'usb', correctBin: 'bin-external' },
      { id: 'item-cloud', label: 'Cloud Storage', icon: 'cloud', correctBin: 'bin-external' },
    ],
    bins: [
      { id: 'bin-internal', label: 'Internal Storage 💻', color: '#3B82F6' },
      { id: 'bin-external', label: 'External Storage ☁️', color: '#10B981' },
    ],
  },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────

export interface ComputerMemoryGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ComputerMemoryGame({ width = 720, height = 560, onComplete }: ComputerMemoryGameProps) {
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
        newPos[item.id] = { x: 40 + idx * 140, y: height - 160 };
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
      const msg = "Great job! You understand computer memory!";
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
      const compMsg = "Wonderful! You are a Computer Memory Star!";
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
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 300;
      const binY = 160;
      const binW = 260;
      const binH = 180;
      if (x >= binX && x <= binX + binW && y >= binY && y <= binY + binH) {
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
        const msg = "Fantastic! You sorted the computer memory types perfectly!";
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
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-slate-900" style={{ width, height }}>
      <LabSceneBackground width={width} height={height} />
      <TechieTina mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* TOP BAR */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur-md px-4 flex items-center justify-between z-10 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-white tracking-wide">🧠 Computer Memory Lab</span>
          <StarRow count={Math.floor(score / 15)} total={8} />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-cyan-400">Score: {score}</span>
          {screen === 'play' && (
            <button
              onClick={handleShowHint}
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow transition"
            >
              💡 Hint
            </button>
          )}
        </div>
      </div>

      {/* TEACHING SCREEN */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 px-8 pb-6 flex flex-col items-center justify-between z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-xl p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-4 border-white/20 flex flex-col items-center text-center`}
          >
            <span className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-extrabold mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base leading-relaxed font-medium">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex items-center justify-between w-full max-w-xl pb-2">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className="bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-2xl shadow transition"
            >
              ⬅️ Back
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-cyan-400 w-6' : 'bg-slate-600'}`} />
              ))}
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  audioManager.play('success');
                }
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold px-6 py-2.5 rounded-2xl shadow-lg transition"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* PLAY SCREEN */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 px-6 pb-6 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-2xl bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-700 mt-2 text-center">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
            <h2 className="text-lg font-extrabold text-white mt-1">{currentChallenge.question}</h2>
          </div>

          {currentChallenge.type === 'identify' && (
            <div className="flex flex-col gap-3 w-full max-w-xl my-auto">
              {currentChallenge.options.map((opt) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = "bg-slate-800 hover:bg-slate-700 text-white border-slate-700";
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = "bg-emerald-600 text-white border-emerald-400 shadow-lg scale-102";
                  else if (isSelected) btnStyle = "bg-rose-600 text-white border-rose-400 animate-shake";
                }
                return (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={(e) => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={selectedOpt === currentChallenge.answer}
                    className={`p-4 rounded-2xl border-2 font-bold text-left text-sm transition shadow-md flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span className="text-xl">✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span className="text-xl">❌</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-2xl h-[320px] my-auto">
              {currentChallenge.bins.map((bin, idx) => (
                <SortBin
                  key={bin.id}
                  label={bin.label}
                  color={bin.color}
                  x={50 + idx * 300}
                  y={160}
                  width={260}
                  height={150}
                  isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                />
              ))}

              {currentChallenge.sortItems.map((item) => {
                const pos = itemPositions[item.id] || { x: 50, y: 20 };
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

          <div className="w-full max-w-2xl flex justify-end pb-2">
            {(selectedOpt || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold px-8 py-3 rounded-2xl shadow-xl flex items-center gap-2"
              >
                <span>Continue</span>
                <span className="text-xl">➡️</span>
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
