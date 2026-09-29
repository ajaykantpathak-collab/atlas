'use client';

/**
 * ComputerFilesGame — Learn about computer paint tools, files, folders, and computer etiquette
 *
 * CISCE Nodes: c2_cs_007 (Paint tools), c2_cs_008 (Paint tools), c2_cs_009 (File management intro),
 *              c2_cs_010 (Creating and naming files/folders), c2_cs_011 (Opening and closing files/folders),
 *              c2_cs_012 (Computer etiquette and keyboard posture)
 * Enrichment: c2_cs_enrichment_part7-12
 *
 * ELI5: "Paint is a digital drawing book where you use tools like the pencil, brush, eraser,
 *   fill bucket, shapes, and text. Files are saved pieces of work, and folders are boxes
 *   that hold your files. Always sit straight with good posture, wash your hands, and save your work!"
 *
 * Misconceptions (from enrichment):
 *   1. "Folder and file are the same" → "No! A file is one stored item, while a folder is a container holding many files!"
 *   2. "Eraser deletes the whole file" → "No! The eraser only removes part of your drawing, just like a pencil rubber!"
 *   3. "You can sit any way you like" → "No! Sitting straight with back support and feet flat protects your back and eyes!"
 *   4. "You can eat while using the computer" → "No! Food and sticky fingers damage the keyboard!"
 *
 * Story: "Help Artist Arjun in his digital art studio sort paint tools, organize art files into
 *   folders, and practice safe computer etiquette to become a Master Computer Artist!"
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
    title: 'Welcome to Paint Studio! 🎨',
    text: 'Paint is your digital drawing book! You open it from the Start menu. The canvas is your blank page, and the ribbon holds all your amazing tools!',
    emoji: '🎨',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Welcome to Paint Studio! Paint is your digital drawing book where you can create wonderful digital art!',
  },
  {
    title: 'Magic Paint Tools! ✏️',
    text: 'Use the Pencil for thin freehand lines, Brush for thick strokes, Eraser to rub out mistakes, Fill Tool (paint bucket) to fill closed shapes with colour, and Shapes for circles and rectangles!',
    emoji: '🖌️',
    bgColor: 'from-gold-400 to-purple-500',
    spoken: 'Use the Pencil for thin lines, Brush for thick strokes, Eraser to rub out mistakes, and Fill Tool to colour shapes!',
  },
  {
    title: 'Files and Folders 📁',
    text: 'A file is a saved piece of work, like your drawing. A folder is a container that holds and organizes many files together on your desktop!',
    emoji: '📂',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'A file is a saved piece of work like your drawing. A folder is a container that holds many files together!',
  },
  {
    title: 'Saving Your Work 💾',
    text: 'When your drawing is finished, click File, then Save. Give your file a clear name so you can open it easily tomorrow!',
    emoji: '💾',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'When your drawing is finished, click File and Save. Give your file a clear name so you can find it easily!',
  },
  {
    title: 'Computer Etiquette & Posture 🧘',
    text: 'Wash hands before typing! Sit straight with your back supported, feet flat on the floor, and screen at arm length. Take breaks to rest your eyes!',
    emoji: '💻',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Wash hands before typing! Sit straight with your back supported, feet flat, and take regular breaks!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_tool' | 'sort_tools' | 'identify_concept' | 'sort_actions' | 'sort_etiquette';

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
    type: 'identify_tool',
    question: 'Which Paint tool draws THIN freehand lines?',
    answer: 'Pencil Tool',
    options: ['Pencil Tool', 'Fill Bucket', 'Eraser Tool'],
    hint: 'Think: which tool acts just like a real thin pencil on paper?',
    misconception: 'The Pencil Tool draws thin freehand lines! The Fill Bucket pours colour into a closed shape, and the Eraser only removes lines!',
  },
  {
    type: 'identify_tool',
    question: 'Which Paint tool FILLS a closed shape with colour?',
    answer: 'Fill Bucket Tool',
    options: ['Pencil Tool', 'Fill Bucket Tool', 'Text Tool'],
    hint: 'Think: which tool looks like a small paint bucket pouring colour?',
    misconception: 'The Fill Bucket pours colour inside a closed shape! If the shape is not closed, the colour leaks all over the canvas!',
  },
  {
    type: 'identify_tool',
    question: 'What is a FOLDER used for on the computer?',
    answer: 'To store and organize files',
    options: ['To store and organize files', 'To draw pictures', 'To type songs'],
    hint: 'Think of a folder as a box that holds many papers or files together!',
    misconception: 'A folder is a container that holds and organizes files! It does not draw pictures or play music by itself.',
  },
  {
    type: 'sort_tools',
    question: 'Drag each Paint tool to what it does!',
    answer: 'sort',
    options: [],
    hint: 'Pencil = thin lines | Brush = thick strokes | Eraser = remove mistakes | Fill = colour closed shapes!',
    misconception: 'Remember: Pencil makes thin lines, Brush makes thick strokes, Eraser removes mistakes, and Fill colours closed shapes!',
    sortItems: [
      { id: 'pencil', label: 'Pencil', icon: 'pencil', correctBin: 'thin' },
      { id: 'brush', label: 'Brush', icon: 'brush', correctBin: 'thick' },
      { id: 'eraser', label: 'Eraser', icon: 'eraser', correctBin: 'remove' },
      { id: 'fill', label: 'Fill Bucket', icon: 'fill', correctBin: 'colour' },
    ],
    bins: [
      { id: 'thin', label: 'Thin Lines ✏️', color: '#3B82F6' },
      { id: 'thick', label: 'Thick Strokes 🖌️', color: '#8B5CF6' },
      { id: 'remove', label: 'Remove 🧹', color: '#EF4444' },
      { id: 'colour', label: 'Fill Colour 🎨', color: '#10B981' },
    ],
  },
  {
    type: 'identify_tool',
    question: 'How should you sit when using the computer?',
    answer: 'Straight back, feet flat on floor',
    options: ['Straight back, feet flat on floor', 'Slouched over keyboard', 'Lying down on the desk'],
    hint: 'Good posture protects your back and eyes! Sit up straight with back support.',
    misconception: 'Always sit straight with your back supported and feet flat on the floor! Slouching makes your back tired and hurts your posture.',
  },
  {
    type: 'sort_actions',
    question: 'Drag file management actions into the correct order!',
    answer: 'sort',
    options: [],
    hint: '1st: Open folder -> 2nd: Create file -> 3rd: Name file -> 4th: Save work!',
    misconception: 'Order matters! First open the folder, create your file, give it a meaningful name, and finally save your work before closing.',
    sortItems: [
      { id: 'open-folder', label: 'Open Folder', icon: 'folder', correctBin: 'step1' },
      { id: 'create-file', label: 'Create File', icon: 'file', correctBin: 'step2' },
      { id: 'name-file', label: 'Name File', icon: 'text', correctBin: 'step3' },
      { id: 'save-file', label: 'Save Work', icon: 'desktop', correctBin: 'step4' },
    ],
    bins: [
      { id: 'step1', label: '1. Open 📂', color: '#3B82F6' },
      { id: 'step2', label: '2. Create 📄', color: '#8B5CF6' },
      { id: 'step3', label: '3. Name 🏷️', color: '#EC4899' },
      { id: 'step4', label: '4. Save 💾', color: '#10B981' },
    ],
  },
  {
    type: 'identify_tool',
    question: 'Why should you wash your hands before using the computer?',
    answer: 'To keep keyboard clean of dust and oil',
    options: ['To keep keyboard clean of dust and oil', 'To make hands wet', 'To paint the computer screen'],
    hint: 'Clean hands stop dust and sticky food from getting between the keys!',
    misconception: 'Washing hands keeps dust, food crumbs, and oil off the keyboard and mouse, so the keys do not get sticky or stop working!',
  },
  {
    type: 'sort_etiquette',
    question: 'Drag computer habits to Good Etiquette vs Bad Habits!',
    answer: 'sort',
    options: [],
    hint: 'Good: sit straight, wash hands, take breaks! Bad: eat near keyboard, bang keys hard!',
    misconception: 'Good etiquette protects both you and the machine! Wash hands, sit straight, and take breaks. Never eat near the keyboard or bang the keys!',
    sortItems: [
      { id: 'good-posture', label: 'Sit straight', icon: 'good-posture', correctBin: 'good' },
      { id: 'wash-hands', label: 'Wash hands first', icon: 'file', correctBin: 'good' },
      { id: 'eat-keyboard', label: 'Eat near keyboard', icon: 'eraser', correctBin: 'bad' },
      { id: 'bang-keys', label: 'Bang keys hard', icon: 'pencil', correctBin: 'bad' },
    ],
    bins: [
      { id: 'good', label: 'Good Etiquette ✅', color: '#10B981' },
      { id: 'bad', label: 'Bad Habit ❌', color: '#EF4444' },
    ],
  },
];

// ─── Custom SVG Icon Components (Topic-Specific) ──────────────

function PencilToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 48 L15 36 L42 9 L51 18 L24 45 Z" fill="#FFC107" stroke="#FFA000" strokeWidth="2" />
      <path d="M42 9 L51 18 L46.5 22.5 L37.5 13.5 Z" fill="#E0E0E0" />
      <polygon points="12,48 18,51 15,45" fill="#E57373" />
      <polygon points="12,48 15,45 13.5,43.5" fill="#37474F" />
      <rect x="44" y="11" width="5" height="5" fill="#B0BEC5" transform="rotate(45 46.5 13.5)" />
    </svg>
  );
}

function BrushToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="25" width="10" height="25" fill="#8D6E63" rx="3" />
      <rect x="23" y="18" width="14" height="8" fill="#B0BEC5" stroke="#78909C" strokeWidth="1" rx="1" />
      <path d="M22 18 Q30 5 38 18 Z" fill="#E91E63" />
      <path d="M27 10 L33 10 L35 18 L25 18 Z" fill="#C2185B" />
    </svg>
  );
}

function EraserToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <g transform="rotate(-25 30 30)">
        <rect x="15" y="20" width="30" height="20" fill="#FF8A80" rx="3" stroke="#D32F2F" strokeWidth="1.5" />
        <rect x="15" y="30" width="30" height="10" fill="#B0BEC5" stroke="#78909C" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

function FillToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 25 L35 25 L40 45 L20 45 Z" fill="#42A5F5" stroke="#1565C0" strokeWidth="2" />
      <path d="M12 25 L38 25 L35 20 L15 20 Z" fill="#90CAF9" stroke="#1565C0" strokeWidth="1.5" />
      <path d="M25 12 Q30 2, 35 12" fill="none" stroke="#2196F3" strokeWidth="3" strokeLinecap="round" />
      <path d="M27 45 Q30 55, 33 45" fill="#29B6F6" />
      <circle cx="28" cy="35" r="3" fill="white" opacity="0.6" />
    </svg>
  );
}

function ShapeToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="18" height="18" fill="none" stroke="#AB47BC" strokeWidth="2.5" rx="2" />
      <circle cx="42" cy="21" r="9" fill="none" stroke="#26A69A" strokeWidth="2.5" />
      <polygon points="25,48 12,32 38,32" fill="none" stroke="#FFA726" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

function TextToolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <text x="30" y="44" fontSize="42" fontWeight="bold" fill="#3F51B5" textAnchor="middle" fontFamily="sans-serif">A</text>
      <rect x="15" y="12" width="30" height="6" fill="#7986CB" rx="2" />
      <rect x="27" y="18" width="6" height="6" fill="#7986CB" />
    </svg>
  );
}

function FileIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 10 L35 10 L45 20 L45 50 L15 50 Z" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" strokeLinejoin="round" />
      <path d="M35 10 L35 20 L45 20 Z" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="2" strokeLinejoin="round" />
      <line x1="20" y1="25" x2="35" y2="25" stroke="#78909C" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="33" x2="40" y2="33" stroke="#78909C" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="41" x2="30" y2="41" stroke="#78909C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function FolderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 16 L22 16 L27 22 L50 22 L50 46 L10 46 Z" fill="#FFCA28" stroke="#FFA000" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 20 L50 20 L46 44 L14 44 Z" fill="#FFE082" opacity="0.8" />
    </svg>
  );
}

function DesktopIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="30" fill="#37474F" rx="3" stroke="#263238" strokeWidth="2" />
      <rect x="12" y="14" width="36" height="22" fill="#E1F5FE" rx="1" />
      <rect x="25" y="40" width="10" height="6" fill="#78909C" />
      <rect x="18" y="46" width="24" height="4" fill="#546E7A" rx="2" />
    </svg>
  );
}

function GoodPostureIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Chair & table */}
      <rect x="10" y="32" width="22" height="18" fill="#8D6E63" rx="2" />
      <line x1="32" y1="20" x2="52" y2="20" stroke="#78909C" strokeWidth="3" strokeLinecap="round" />
      {/* Sitting child */}
      <circle cx="22" cy="18" r="5" fill="#FFCC80" />
      <path d="M22 23 L22 35" stroke="#AB47BC" strokeWidth="4" strokeLinecap="round" />
      <path d="M22 35 L16 48" stroke="#1E88E5" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 35 L28 48" stroke="#1E88E5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Artist Arjun Mascot ──────────────────────────────────────

function ArtistArjun({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px]"
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
          {/* Beret hat */}
          <ellipse cx="37" cy="18" rx="22" ry="8" fill="#E91E63" />
          <path d="M37 10 Q45 6, 52 14" fill="none" stroke="#C2185B" strokeWidth="2" strokeLinecap="round" />
          {/* Head */}
          <circle cx="37" cy="28" r="14" fill="#FFCC80" />
          {/* Eyes */}
          <circle cx="32" cy="26" r="2" fill="#3E2723" />
          <circle cx="42" cy="26" r="2" fill="#3E2723" />
          {/* Smile */}
          <path d="M33 33 Q37 37 41 33" stroke="#D84315" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Colorful Smock / Apron */}
          <path d="M22 42 L52 42 L58 75 L16 75 Z" fill="#9C27B0" stroke="#7B1FA2" strokeWidth="1.5" />
          {/* Paint splatters on apron */}
          <circle cx="28" cy="52" r="3" fill="#FFEB3B" />
          <circle cx="46" cy="60" r="3" fill="#03A9F4" />
          <circle cx="35" cy="65" r="2.5" fill="#4CAF50" />
          {/* Holding paintbrush */}
          <rect x="52" y="38" width="4" height="28" fill="#795548" transform="rotate(25 52 38)" rx="1" />
          <path d="M62 58 Q66 60, 68 56 Q66 52, 60 54 Z" fill="#E91E63" />
          {/* Feet */}
          <ellipse cx="28" cy="82" rx="5" ry="3" fill="#3E2723" />
          <ellipse cx="46" cy="82" rx="5" ry="3" fill="#3E2723" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─��─ Star Reward Row ──────────────────────────────────────────

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

// ─── Studio Scene Background ──────────────────────────────────

function StudioScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F3E8FF" />
            <stop offset="50%" stopColor="#EDE9FE" />
            <stop offset="100%" stopColor="#DDD6FE" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#studio-wall)" />
      </svg>
      {/* Window showing sky */}
      <div className="absolute top-6 left-8 w-28 h-36 bg-gold-200 border-4 border-amber-900 rounded-lg overflow-hidden opacity-70">
        <div className="w-full h-full bg-gradient-to-b from-gold-300 to-gold-100 flex flex-col items-center justify-center">
          <div className="w-12 h-6 bg-white rounded-full opacity-80 mb-2" />
          <div className="w-8 h-4 bg-white rounded-full opacity-80" />
        </div>
        {/* Window pane cross */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-1 bg-amber-900" />
          <div className="h-full w-1 bg-amber-900 absolute" />
        </div>
      </div>
      {/* Studio Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #D7CCC8 0%, #BCAAA4 100%)' }} />
      {/* Easel in background */}
      <div className="absolute bottom-16 right-16 opacity-40">
        <svg width="80" height="120" viewBox="0 0 80 120">
          <line x1="40" y1="10" x2="10" y2="110" stroke="#795548" strokeWidth="5" strokeLinecap="round" />
          <line x1="40" y1="10" x2="70" y2="110" stroke="#795548" strokeWidth="5" strokeLinecap="round" />
          <line x1="40" y1="10" x2="40" y2="115" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" />
          <rect x="20" y="40" width="40" height="30" fill="white" stroke="#3E2723" strokeWidth="2" rx="2" />
        </svg>
      </div>
    </div>
  );
}

// ─── Render Sort Icon Helper ──────────────────────────────────

function renderSortIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'pencil': return <PencilToolIcon size={size} />;
    case 'brush': return <BrushToolIcon size={size} />;
    case 'eraser': return <EraserToolIcon size={size} />;
    case 'fill': return <FillToolIcon size={size} />;
    case 'shape': return <ShapeToolIcon size={size} />;
    case 'text': return <TextToolIcon size={size} />;
    case 'file': return <FileIcon size={size} />;
    case 'folder': return <FolderIcon size={size} />;
    case 'desktop': return <DesktopIcon size={size} />;
    case 'good-posture': return <GoodPostureIcon size={size} />;
    default: return <PencilToolIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 truncate w-full">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 shadow-md transition-all ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white shadow-sm" style={{ backgroundColor: color }}>
        📂
      </div>
      <span className="text-xs font-bold text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Component Export ────────────────────────────────────

export interface ComputerFilesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ComputerFilesGame({ width = 720, height = 560, onComplete }: ComputerFilesGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIndex, setSlideIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome to Paint Studio! Let us learn computer art and files!');
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Sort challenge state
  const [sortPositions, setSortPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && !gameOver) {
        const currentChallenge = CHALLENGES[challengeIndex];
        setHintMessage(currentChallenge.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setMascotSpeech("Need a hint? Check this out!");
        speechManager.speak("Need a hint? Check this out!");
      }
    }, 10000);
  }, [screen, challengeIndex, gameOver]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIndex, screen, resetInactivityTimer]);

  // Initialize sort positions when entering a sort challenge
  useEffect(() => {
    const current = CHALLENGES[challengeIndex];
    if (current && current.type.startsWith('sort') && current.sortItems) {
      const initial: Record<string, { x: number; y: number; placed: boolean }> = {};
      current.sortItems.forEach((item, idx) => {
        initial[item.id] = {
          x: 40 + (idx % 2) * 130,
          y: 280 + Math.floor(idx / 2) * 105,
          placed: false,
        };
      });
      setSortPositions(initial);
    }
  }, [challengeIndex]);

  // Handle teaching slide navigation
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIndex < TEACHING_SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1);
      setMascotSpeech(TEACHING_SLIDES[slideIndex + 1].spoken);
      speechManager.speak(TEACHING_SLIDES[slideIndex + 1].spoken);
    } else {
      setScreen('play');
      setMascotSpeech("Let's start our first challenge!");
      speechManager.speak("Let's start our first challenge!");
      audioManager.play('success');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
      setMascotSpeech(TEACHING_SLIDES[slideIndex - 1].spoken);
      speechManager.speak(TEACHING_SLIDES[slideIndex - 1].spoken);
    }
  };

  // Handle multiple choice answer selection
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    const current = CHALLENGES[challengeIndex];
    if (option === current.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech("Brilliant! That is correct!");
      speechManager.speak("Brilliant! That is correct!");
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars(s => s + 1);
      setScore(s => s + 15);
      setSuccessMessage('Correct! Fantastic job!');
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setMascotSpeech(current.misconception);
      speechManager.speak(current.misconception);
      setErrors(e => e + 1);
      setHintMessage(current.misconception);
    }
  };

  // Handle drag start for sort items
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  // Handle drag end for sort items
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const current = CHALLENGES[challengeIndex];
    if (!current.sortItems || !current.bins) return false;

    const item = current.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bins collision
    let droppedInBin: string | null = null;
    current.bins.forEach((bin, idx) => {
      const binX = width - 260;
      const binY = 80 + idx * 100;
      if (x >= binX - 20 && x <= binX + 220 && y >= binY - 20 && y <= binY + 90) {
        droppedInBin = bin.id;
      }
    });

    if (droppedInBin) {
      if (droppedInBin === item.correctBin) {
        audioManager.play('drop-correct');
        setSortPositions(prev => ({
          ...prev,
          [id]: { x: width - 150, y: 150, placed: true },
        }));

        // Check if all items in this challenge are placed
        const updated = { ...sortPositions, [id]: { x, y, placed: true } };
        const allPlaced = current.sortItems.every(i => updated[i.id]?.placed);

        if (allPlaced) {
          audioManager.play('success');
          setMascotMood('celebrate');
          setMascotSpeech("All sorted correctly! Amazing!");
          speechManager.speak("All sorted correctly! Amazing!");
          setSparklePos({ x: width / 2, y: height / 2 });
          setStars(s => s + 1);
          setScore(s => s + 20);
          setSuccessMessage('Great sorting! Perfect match!');
        }
        return true;
      } else {
        audioManager.play('drop-wrong');
        setMascotMood('thinking');
        setMascotSpeech(current.misconception);
        speechManager.speak(current.misconception);
        setErrors(e => e + 1);
        setHintMessage(current.misconception);
        return false;
      }
    }
    return false;
  };

  // Progress to next challenge after success banner
  const handleSuccessComplete = () => {
    setSuccessMessage(null);
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex(c => c + 1);
      setMascotMood('happy');
      setMascotSpeech("Ready for the next challenge?");
      speechManager.speak("Ready for the next challenge?");
    } else {
      setGameOver(true);
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech("You are a Master Computer Artist! Incredible!");
      speechManager.speak("You are a Master Computer Artist! Incredible!");
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden select-none flex flex-col items-center justify-center bg-gold-950 font-sans rounded-3xl shadow-2xl" style={{ width, height }}>
      {/* Background Studio Scene */}
      <StudioScene width={width} height={height} />

      {/* Mascot Arjun */}
      <ArtistArjun mood={mascotMood} speaking={mascotSpeech} />

      {/* Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMessage && <SuccessBanner message={successMessage} onComplete={handleSuccessComplete} />}
      {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ──────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between w-full bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg">
            <h1 className="text-xl font-extrabold text-gold-900">🎨 Paint Studio & File Guide</h1>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIndex ? 'bg-gold-600 w-6' : 'bg-gold-200'}`} />
              ))}
            </div>
          </div>

          {/* Slide Card */}
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col items-center justify-center text-center p-8 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIndex].bgColor} text-white max-w-lg w-full border-4 border-white/30`}
          >
            <span className="text-6xl mb-4">{TEACHING_SLIDES[slideIndex].emoji}</span>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIndex].title}</h2>
            <p className="text-base font-medium leading-relaxed max-w-md">{TEACHING_SLIDES[slideIndex].text}</p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between w-full max-w-lg">
            <button
              onClick={handlePrevSlide}
              disabled={slideIndex === 0}
              className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${slideIndex === 0 ? 'bg-gray-400 opacity-50 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-700'}`}
            >
              ⬅️ Back
            </button>
            <button
              onClick={handleNextSlide}
              className="px-8 py-3 rounded-2xl font-bold text-white shadow-lg bg-emerald-500 hover:bg-emerald-600 transition-all flex items-center gap-2"
            >
              {slideIndex === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ──────────────────────────────────────── */}
      {screen === 'play' && !gameOver && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-6">
          {/* Top Status Bar */}
          <div className="flex items-center justify-between w-full bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-sm font-extrabold text-gold-900">Level {challengeIndex + 1} / {CHALLENGES.length}</span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-emerald-700">Score: {score}</span>
              <button
                onClick={() => { audioManager.play('tap'); setHintMessage(CHALLENGES[challengeIndex].hint); }}
                className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-3 py-1 rounded-xl text-xs shadow-md transition-all"
              >
                💡 Hint
              </button>
            </div>
          </div>

          {/* Challenge Box */}
          <motion.div
            key={challengeIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-full max-w-xl border-4 border-gold-200"
          >
            <h2 className="text-xl font-black text-gold-950 text-center mb-6">{CHALLENGES[challengeIndex].question}</h2>

            {/* Multiple Choice Options */}
            {CHALLENGES[challengeIndex].options.length > 0 && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {CHALLENGES[challengeIndex].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(opt)}
                    className="flex items-center justify-center px-6 py-4 rounded-2xl font-bold text-gray-800 bg-gradient-to-r from-gold-50 to-gold-50 border-2 border-gold-200 shadow-md hover:border-gold-500 hover:bg-gold-100 transition-all text-base"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag and Drop Sort Challenge */}
            {CHALLENGES[challengeIndex].type.startsWith('sort') && CHALLENGES[challengeIndex].sortItems && (
              <div className="relative w-full h-80 bg-gold-50/60 rounded-2xl border-2 border-dashed border-gold-300 overflow-hidden">
                {/* Render Bins on Right */}
                {CHALLENGES[challengeIndex].bins?.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={width - 270}
                    y={15 + idx * 80}
                    width={250}
                    height={72}
                    isHovering={false}
                  />
                ))}

                {/* Render Draggable Cards on Left */}
                {CHALLENGES[challengeIndex].sortItems?.map(item => {
                  const pos = sortPositions[item.id] || { x: 20, y: 20, placed: false };
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
            )}
          </motion.div>

          {/* Bottom Footer hint */}
          <div className="text-xs font-bold text-white/80 text-center">
            ICSE / CISCE Class 2 Computer Science — Paint Studio & File Management
          </div>
        </div>
      )}

      {/* ─── GAME OVER SCREEN ─────────────────────────────────── */}
      {gameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 max-w-md w-full border-4 border-emerald-300 text-center"
        >
          <span className="text-6xl mb-3">🏆</span>
          <h2 className="text-3xl font-black text-gold-950 mb-2">Master Artist!</h2>
          <p className="text-gray-600 font-medium mb-6">You successfully completed all Paint and File management challenges with flying colours!</p>

          <div className="bg-gold-50 rounded-2xl p-4 w-full mb-6 flex justify-around">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-gold-700">{score}</span>
              <span className="text-xs font-bold text-gray-500">Score</span>
            </div>
            <div className="flex flex-col items-center">
              <StarRow count={stars} total={CHALLENGES.length} />
              <span className="text-xs font-bold text-gray-500 mt-1">Stars</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black text-rose-600">{errors}</span>
              <span className="text-xs font-bold text-gray-500">Mistakes</span>
            </div>
          </div>

          <button
            onClick={() => {
              audioManager.play('tap');
              setGameOver(false);
              setScreen('teaching');
              setSlideIndex(0);
              setChallengeIndex(0);
              setScore(0);
              setErrors(0);
              setStars(0);
            }}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all text-lg"
          >
            Play Again 🔄
          </button>
        </motion.div>
      )}
    </div>
  );
}
