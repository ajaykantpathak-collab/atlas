'use client';

/**
 * PaintFilesGame — Fun with Paint, File Management, Recycle Bin, Etiquette & Keyboard Shortcuts
 *
 * CISCE Nodes: c3_cs_011 (Fun with Paint), c3_cs_012 (File management & subfolders),
 *              c3_cs_013 (Deleting & restoring - Recycle Bin), c3_cs_014 (Computer etiquette),
 *              c3_cs_015 (Keyboard shortcuts)
 *
 * Mascot: Artist Akhil — friendly digital artist with a paintbrush, palette, beret hat, and tablet.
 * Features: 5 teaching slides, 8 progressive challenges (multiple choice + sort/drag-and-drop),
 * custom SVG scene background, custom SVG tools/files/recycle bin icons, Web Speech API narration,
 * procedural sound effects, star rewards, misconception feedback, confetti, sparkle bursts.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Game Screen Type ──────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_tool' | 'identify_concept' | 'sort_tools' | 'sort_actions' | 'sort_shortcuts' | 'sort_etiquette';

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

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Fun with Paint! 🎨',
    text: 'Microsoft Paint is your digital art studio! Use the pencil for fine lines, the brush for thick strokes, the fill bucket to pour color into closed shapes, and the shape tools to draw neat rectangles and circles!',
    emoji: '🎨',
    bgColor: 'from-pink-400 to-purple-500',
    spoken: 'Microsoft Paint is your digital art studio! Use the pencil for fine lines, the brush for thick strokes, the fill bucket to pour color into closed shapes, and the shape tools to draw neat rectangles and circles!',
  },
  {
    title: 'Organising Files & Folders 📁',
    text: 'A computer folder is like a cupboard with labelled drawers! Subfolders are smaller folders placed inside main folders. Good organisation keeps your drawings, poems, and worksheets easy to find.',
    emoji: '📁',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'A computer folder is like a cupboard with labelled drawers! Subfolders are smaller folders placed inside main folders. Good organisation keeps your drawings, poems, and worksheets easy to find.',
  },
  {
    title: 'The Recycle Bin Safety Net 🗑️',
    text: 'When you select a file and press the Delete key, it goes to the Recycle Bin! It is not gone forever. You can open the Recycle Bin, right-click the file, and Restore it to its original folder. Emptying the bin makes deletion permanent!',
    emoji: '🗑️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'When you select a file and press the Delete key, it goes to the Recycle Bin! It is not gone forever. You can open the Recycle Bin, right-click the file, and Restore it to its original folder.',
  },
  {
    title: 'Computer Etiquette & Care 💻',
    text: 'Take care of your computer! Keep food and drinks far away, wipe the screen and keyboard gently with a soft dry cloth, don\'t pull cords, and always follow the proper shutdown procedure on screen!',
    emoji: '🛡️',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Take care of your computer! Keep food and drinks far away, wipe the screen and keyboard gently with a soft dry cloth, don\'t pull cords, and always follow the proper shutdown procedure on screen!',
  },
  {
    title: 'Magical Keyboard Shortcuts ⌨️',
    text: 'Work faster in Word with Ctrl keys! Ctrl+C copies text, Ctrl+V pastes it, Ctrl+X cuts it to move, Ctrl+Z undoes your last mistake, and Ctrl+A selects everything instantly!',
    emoji: '⌨️',
    bgColor: 'from-violet-400 to-purple-600',
    spoken: 'Work faster in Word with control keys! Ctrl plus C copies text, Ctrl plus V pastes it, Ctrl plus X cuts it to move, Ctrl plus Z undoes your last mistake, and Ctrl plus A selects everything instantly!',
  },
];

// ─── Challenges ───────────────────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_tool',
    question: 'Which tool in Paint fills the inside of a closed shape with color?',
    answer: 'Fill with color tool (bucket)',
    options: ['Fill with color tool (bucket)', 'Eraser tool', 'Pencil tool'],
    hint: 'Look for the tool that looks like a tipping paint bucket pouring color!',
    misconception: 'The fill with color tool pours paint inside a closed shape! The eraser removes marks, and the pencil draws thin freehand lines.',
  },
  {
    type: 'identify_tool',
    question: 'Which tool in Paint works like a digital ruler to draw straight lines?',
    answer: 'Line tool',
    options: ['Line tool', 'Curve tool', 'Polygon tool'],
    hint: 'This tool draws straight lines from start to end, and you can pick its thickness!',
    misconception: 'The line tool draws straight edges like a ruler. The curve tool bends straight lines, and the polygon tool makes many-sided shapes!',
  },
  {
    type: 'identify_concept',
    question: 'Where does a file go immediately when you press the Delete key?',
    answer: 'Recycle Bin',
    options: ['Recycle Bin', 'Deleted forever instantly', 'The printer'],
    hint: 'It is a desktop icon shaped like a dustbin that gives you a second chance!',
    misconception: 'Files do not vanish instantly when you press Delete! They move safely into the Recycle Bin so you can restore them if needed.',
  },
  {
    type: 'sort_tools',
    question: 'Drag each Paint item to what it does!',
    answer: 'sort',
    options: [],
    hint: 'Pencil draws thin lines, Fill bucket pours color, Eraser removes mistakes!',
    misconception: 'Every Paint tool has a specific job! Match the pencil to drawing, the bucket to filling color, and the eraser to removing marks.',
    sortItems: [
      { id: 'pencil', label: 'Pencil tool', icon: 'pencil', correctBin: 'draw' },
      { id: 'bucket', label: 'Fill bucket', icon: 'bucket', correctBin: 'fill' },
      { id: 'eraser', label: 'Eraser tool', icon: 'eraser', correctBin: 'erase' },
    ],
    bins: [
      { id: 'draw', label: 'Draw Lines ✏️', color: '#3B82F6' },
      { id: 'fill', label: 'Fill Color 🎨', color: '#10B981' },
      { id: 'erase', label: 'Erase Marks 🧽', color: '#EF4444' },
    ],
  },
  {
    type: 'sort_actions',
    question: 'Drag each file management action to its correct step!',
    answer: 'sort',
    options: [],
    hint: 'Folders organise files, Delete moves to Recycle Bin, Restore brings files back!',
    misconception: 'File management keeps your computer tidy! Folders hold files, deleting sends items to the Recycle Bin, and restoring brings them back.',
    sortItems: [
      { id: 'folder', label: 'Create Folder', icon: 'folder', correctBin: 'organise' },
      { id: 'delete', label: 'Delete File', icon: 'recycle', correctBin: 'trash' },
      { id: 'restore', label: 'Restore File', icon: 'restore', correctBin: 'bringback' },
    ],
    bins: [
      { id: 'organise', label: 'Organise Work 📁', color: '#3B82F6' },
      { id: 'trash', label: 'Send to Bin 🗑️', color: '#F59E0B' },
      { id: 'bringback', label: 'Bring Back 🔄', color: '#10B981' },
    ],
  },
  {
    type: 'sort_shortcuts',
    question: 'Drag each keyboard shortcut to what it does!',
    answer: 'sort',
    options: [],
    hint: 'Ctrl+C copies, Ctrl+V pastes, Ctrl+Z undoes!',
    misconception: 'Shortcuts save time! Ctrl+C duplicates text to clipboard, Ctrl+V inserts it, and Ctrl+Z reverses your last mistake.',
    sortItems: [
      { id: 'copy', label: 'Ctrl + C', icon: 'copy', correctBin: 'dupe' },
      { id: 'paste', label: 'Ctrl + V', icon: 'paste', correctBin: 'place' },
      { id: 'undo', label: 'Ctrl + Z', icon: 'undo', correctBin: 'fix' },
    ],
    bins: [
      { id: 'dupe', label: 'Copy (Duplicate) 📋', color: '#8B5CF6' },
      { id: 'place', label: 'Paste (Insert) 📌', color: '#3B82F6' },
      { id: 'fix', label: 'Undo (Reverse) ↩️', color: '#EC4899' },
    ],
  },
  {
    type: 'sort_etiquette',
    question: 'Drag each action to Good Etiquette or Bad Etiquette!',
    answer: 'sort',
    options: [],
    hint: 'Wiping gently and closing properly are good habits! Eating near the computer is bad!',
    misconception: 'Computer etiquette protects both hardware and software! Always keep food away, handle gently, and use the proper shutdown on screen.',
    sortItems: [
      { id: 'wipe', label: 'Wipe screen gently', icon: 'brush', correctBin: 'good' },
      { id: 'eat', label: 'Eat snacks near keyboard', icon: 'pencil', correctBin: 'bad' },
      { id: 'shutdown', label: 'Proper screen shutdown', icon: 'folder', correctBin: 'good' },
    ],
    bins: [
      { id: 'good', label: 'Good Etiquette ✅', color: '#10B981' },
      { id: 'bad', label: 'Bad Habit ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'identify_concept',
    question: 'What is the main difference between Copy (Ctrl+C) and Cut (Ctrl+X)?',
    answer: 'Copy leaves the original in place; Cut removes it to move it',
    options: [
      'Copy leaves the original in place; Cut removes it to move it',
      'Cut makes two copies, Copy makes zero',
      'There is no difference at all',
    ],
    hint: 'Think about whether the original text stays or disappears when you use the shortcut.',
    misconception: 'Copy creates a duplicate while leaving the original untouched. Cut removes the text from its original location so you can paste it somewhere new!',
  },
];

// ─── Artist Akhil Mascot (Custom SVG) ─────────────────────────

function ArtistAkhil({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-indigo-300"
          >
            <p className="text-xs font-bold text-indigo-900">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="akhil-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="akhil-beret" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="37" cy="38" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Beret hat */}
          <ellipse cx="37" cy="23" rx="16" ry="7" fill="url(#akhil-beret)" />
          <path d="M45 20 Q53 16 50 23" fill="#BE185D" />
          {/* Eyes */}
          <circle cx="31" cy="36" r="3" fill="#1E293B" />
          <circle cx="43" cy="36" r="3" fill="#1E293B" />
          <circle cx="32" cy="35" r="1" fill="white" />
          <circle cx="44" cy="35" r="1" fill="white" />
          {/* Smile */}
          <path d="M32 43 Q37 48 42 43" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Body / Shirt */}
          <path d="M22 55 L37 52 L53 55 L58 80 L17 80 Z" fill="url(#akhil-shirt)" stroke="#312E81" strokeWidth="1.5" />
          {/* Palette in hand */}
          <ellipse cx="14" cy="65" rx="8" ry="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
          <circle cx="12" cy="63" r="1.5" fill="#EF4444" />
          <circle cx="16" cy="63" r="1.5" fill="#3B82F6" />
          <circle cx="14" cy="67" r="1.5" fill="#10B981" />
          {/* Paintbrush in other hand */}
          <rect x="56" y="55" width="3" height="18" fill="#92400E" transform="rotate(25 56 55)" />
          <path d="M62 68 L66 73 L63 74 Z" fill="#EC4899" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Art Studio Scene Background ──────────────────────────────

function ArtStudioScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="studio-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="window-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect width={width} height={height * 0.75} fill="url(#studio-wall)" />
        {/* Floor */}
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#studio-floor)" />
        {/* Floor tiles line */}
        <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#92400E" strokeWidth="3" />
        {/* Window with sky */}
        <rect x="50" y="30" width="100" height="130" rx="8" fill="#78350F" />
        <rect x="55" y="35" width="90" height="120" rx="4" fill="url(#window-sky)" />
        {/* Window cross bars */}
        <line x1="100" y1="35" x2="100" y2="155" stroke="#78350F" strokeWidth="4" />
        <line x1="55" y1="95" x2="145" y2="95" stroke="#78350F" strokeWidth="4" />
        {/* Sun in window */}
        <circle cx="120" cy="65" r="14" fill="#FEF08A" />
        {/* Easel with mini canvas */}
        <polygon points="560,80 580,220 540,220" fill="#92400E" />
        <line x1="560" y1="220" x2="520" y2="280" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
        <line x1="560" y1="220" x2="600" y2="280" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
        <rect x="535" y="100" width="55" height="45" fill="white" stroke="#CBD5E1" strokeWidth="2" rx="2" />
        {/* Painting on canvas */}
        <circle cx="550" cy="115" r="6" fill="#F43F5E" />
        <path d="M545 130 Q562 120 580 135 Z" fill="#10B981" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Tool & File Icons ─────────────────────────────

function PaintBrushIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="15" width="8" height="30" rx="2" fill="#92400E" transform="rotate(-30 29 30)" />
      <path d="M14 38 Q18 34, 23 42 Z" fill="#EC4899" />
      <rect x="21" y="32" width="6" height="5" fill="#94A3B8" transform="rotate(-30 24 34)" />
    </svg>
  );
}

function PencilToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="20,45 15,50 10,45 35,15 45,25" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
      <polygon points="15,50 20,45 15,40" fill="#1E293B" />
      <polygon points="35,15 45,25 40,30 30,20" fill="#EF4444" />
    </svg>
  );
}

function EraserIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="20" width="30" height="22" rx="3" fill="#F43F5E" transform="rotate(-15 30 31)" />
      <rect x="15" y="32" width="30" height="10" rx="2" fill="#38BDF8" transform="rotate(-15 30 37)" />
    </svg>
  );
}

function FillBucketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 20 L42 20 L38 45 L22 45 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <path d="M15 20 Q30 15, 45 20" stroke="#94A3B8" strokeWidth="3" fill="none" />
      <path d="M30 10 L30 18" stroke="#64748B" strokeWidth="3" />
      <path d="M28 32 Q32 28, 36 34" fill="#93C5FD" />
    </svg>
  );
}

function FolderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 18 L22 18 L26 22 L50 22 L50 45 L10 45 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" rx="3" />
      <path d="M12 26 L48 26 L48 42 L12 42 Z" fill="#FDE68A" opacity="0.8" />
    </svg>
  );
}

function RecycleBinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="20" width="24" height="26" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
      <line x1="24" y1="26" x2="24" y2="40" stroke="#334155" strokeWidth="2" />
      <line x1="30" y1="26" x2="30" y2="40" stroke="#334155" strokeWidth="2" />
      <line x1="36" y1="26" x2="36" y2="40" stroke="#334155" strokeWidth="2" />
      <rect x="15" y="14" width="30" height="4" rx="1" fill="#64748B" />
      <rect x="25" y="9" width="10" height="5" rx="1" fill="#64748B" />
    </svg>
  );
}

function RestoreIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 30 A18 18 0 1 1 45 35" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" />
      <polygon points="45,25 52,35 40,37" fill="#10B981" />
      <rect x="22" y="22" width="16" height="16" rx="2" fill="#F59E0B" />
    </svg>
  );
}

function CopyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="20" width="22" height="26" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
      <rect x="14" y="14" width="22" height="26" rx="2" fill="white" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="18" y1="20" x2="28" y2="20" stroke="#3B82F6" strokeWidth="2" />
      <line x1="18" y1="26" x2="28" y2="26" stroke="#3B82F6" strokeWidth="2" />
    </svg>
  );
}

function PasteIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="15" width="24" height="32" rx="2" fill="white" stroke="#10B981" strokeWidth="1.5" />
      <path d="M25 15 L25 12 C25 10, 35 10, 35 12 L35 15 Z" fill="#64748B" />
      <line x1="22" y1="22" x2="38" y2="22" stroke="#10B981" strokeWidth="2" />
      <line x1="22" y1="28" x2="34" y2="28" stroke="#10B981" strokeWidth="2" />
    </svg>
  );
}

function UndoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M42 35 C42 25, 30 20, 20 28 L14 22 M20 28 L14 34" stroke="#EC4899" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Render Sort Icon Mapper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'pencil': return <PencilToolIcon size={size} />;
    case 'bucket': return <FillBucketIcon size={size} />;
    case 'eraser': return <EraserIcon size={size} />;
    case 'folder': return <FolderIcon size={size} />;
    case 'recycle': return <RecycleBinIcon size={size} />;
    case 'restore': return <RestoreIcon size={size} />;
    case 'copy': return <CopyIcon size={size} />;
    case 'paste': return <PasteIcon size={size} />;
    case 'undo': return <UndoIcon size={size} />;
    case 'brush': return <PaintBrushIcon size={size} />;
    default: return <PaintBrushIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-indigo-200 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}15` }}
    >
      <span className="text-sm font-black text-gray-800 text-center px-2">{label}</span>
      <div className="absolute -top-3 px-3 py-0.5 rounded-full text-[10px] font-bold text-white shadow" style={{ backgroundColor: color }}>
        Drop Here
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface PaintFilesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PaintFilesGame({ width = 720, height = 560, onComplete }: PaintFilesGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [spokenText, setSpokenText] = useState<string | null>(null);

  // Sort challenge states
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and Audio cleanup
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide when slide changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpokenText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  // Speak challenge question when challenge starts
  useEffect(() => {
    if (screen === 'play') {
      setSpokenText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
    }
  }, [screen, challengeIdx, currentChallenge]);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
          if (screen === 'play') {
            audioManager.play('hint');
            setHintMsg(currentChallenge.hint);
            setMascotMood('thinking');
            speechManager.speak(currentChallenge.hint);
          }
        }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Reset placed items when challenge changes
  useEffect(() => {
    setPlacedItems({});
  }, [challengeIdx]);

  // Handle multiple choice answer
  const handleAnswer = (option: string) => {
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setSparklePos({ x: width / 2, y: height / 2 });
      setMascotMood('celebrate');
      setStars(prev => prev + 1);
      setSuccessMsg('Brilliant! That is correct!');
      setSpokenText('Brilliant! That is correct!');
      speechManager.speak('Brilliant! That is correct!');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMsg(currentChallenge.misconception);
      setSpokenText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  // Handle Drag Start
  const handleDragStart = () => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  // Handle Drag End for Sort Challenges
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Bin hit test (simplified coordinate check)
    // Bins are laid out horizontally at y = 340
    const binWidth = 140;
    const binHeight = 90;
    const startX = 60;
    const gap = 30;

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + gap);
      const by = 330;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + binHeight + 30) {
        droppedBinId = bin.id;
      }
    });

    setHoverBin(null);

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      const allDone = currentChallenge.sortItems.every(i => updated[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setStars(prev => prev + 1);
        setSuccessMsg('Amazing sorting! All correct!');
        setSpokenText('Amazing sorting! All correct!');
        speechManager.speak('Amazing sorting! All correct!');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMsg(currentChallenge.misconception);
      setSpokenText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  // Advance to next challenge or complete
  const handleNextChallenge = () => {
    setSuccessMsg(null);
    setHintMsg(null);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative select-none flex flex-col items-center justify-center bg-indigo-950 font-sans overflow-hidden rounded-3xl shadow-2xl" style={{ width, height }}>
      {/* Background Studio Scene */}
      <ArtStudioScene width={width} height={height} />

      {/* Mascot */}
      <ArtistAkhil mood={mascotMood} speaking={spokenText} />

      {/* Top Header */}
      <div className="absolute top-4 left-4 right-24 z-20 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎨</span>
          <h1 className="text-base font-black text-indigo-900">Paint, Files & Shortcuts Game</h1>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-600">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
            <StarRow count={stars} total={CHALLENGES.length} />
          </div>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pt-20 pb-6">
        {screen === 'teaching' ? (
          /* ─── TEACHING SLIDES SCREEN ─── */
          <div className="flex flex-col items-center justify-center max-w-lg w-full bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border-4 border-indigo-200">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-xl font-black text-indigo-950 mb-2 text-center">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm font-medium text-gray-700 text-center leading-relaxed mb-6">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            {/* Dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-indigo-600' : 'w-2.5 bg-gray-300'}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 w-full">
              {slideIdx > 0 && (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIdx(prev => prev - 1);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gray-200 hover:bg-gray-300 font-bold text-gray-800 shadow transition-transform active:scale-95"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                    audioManager.play('whoosh');
                  }
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-bold text-white shadow-lg transition-transform active:scale-95"
              >
                {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next ➡️' : 'Start Playing! 🚀'}
              </button>
            </div>
          </div>
        ) : (
          /* ─── PLAY SCREEN ─── */
          <div className="flex flex-col items-center justify-center max-w-xl w-full bg-white/95 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border-4 border-indigo-200">
            {/* Question Card */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 w-full mb-6 text-center shadow-inner">
              <h3 className="text-base font-black text-indigo-950">
                {currentChallenge.question}
              </h3>
            </div>

            {/* Multiple Choice Options */}
            {currentChallenge.answer !== 'sort' && currentChallenge.options && (
              <div className="grid grid-cols-1 gap-3 w-full mb-4">
                {currentChallenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt)}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border-2 border-indigo-200 font-bold text-indigo-950 text-left shadow-md flex items-center justify-between"
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-xs font-black text-indigo-800">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge Area */}
            {currentChallenge.answer === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="relative w-full h-[280px] bg-slate-50 rounded-2xl border-2 border-slate-200 p-4 flex flex-col justify-between">
                {/* Bins at bottom */}
                <div className="absolute bottom-4 left-6 right-6 flex justify-around">
                  {currentChallenge.bins.map((bin, idx) => {
                    const binWidth = 140;
                    const binHeight = 90;
                    const startX = 20;
                    const gap = 30;
                    const bx = startX + idx * (binWidth + gap);
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={bx}
                        y={140}
                        width={binWidth}
                        height={binHeight}
                        isHovering={hoverBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable items at top */}
                <div className="flex justify-around items-center pt-2">
                  {currentChallenge.sortItems.map((item, idx) => {
                    const isPlaced = !!placedItems[item.id];
                    const startX = 30 + idx * 130;
                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={startX}
                        y={15}
                        placed={isPlaced}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Hint / Misconception feedback */}
            {hintMsg && (
              <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />
            )}

            {/* Success Banner */}
            {successMsg && (
              <SuccessBanner message={successMsg} onComplete={handleNextChallenge} />
            )}

            {/* Sparkle Burst */}
            {sparklePos && (
              <SparkleBurst
                x={sparklePos.x}
                y={sparklePos.y}
                onComplete={() => setSparklePos(null)}
              />
            )}

            {/* Confetti */}
            {showConfetti && (
              <Confetti onComplete={() => setShowConfetti(false)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
