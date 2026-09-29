'use client';

/**
 * WordFormattingGame — Learn about desktop management, word processor tools,
 * formatting, fonts, and text cases in Microsoft Windows & Word!
 *
 * CISCE Nodes: c4_cs_004 (GUI desktop management), c4_cs_005 (Word processor tools),
 *              c4_cs_006 (Formatting in Word), c4_cs_007 (Changing text case and font type)
 *
 * ELI5: "Your computer desktop is like your study table! Icons are your tools,
 *   shortcuts are quick links with arrows, and wallpapers make it look nice.
 *   In Word, we format paragraphs with alignment, find words with Find and Replace,
 *   check spelling, and pick pretty fonts like Arial and Times New Roman!"
 *
 * 9/10 Quality Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG office desk background with sky gradient, monitor, and tools
 * - Custom SVG mascot (Editor Eshan) with pen badge, glasses, and mood states
 * - Drag-and-drop sorting challenges using Draggable component
 * - 8 progressive challenges: identify -> sort -> apply
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API (speechManager)
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after exactly 10 seconds of inactivity
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching Slides ─────��────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: "Desktop & Wallpaper 🖥️",
    text: "The desktop is your computer's workspace! You can customise it by changing the wallpaper (background picture), arranging icons, and adding shortcuts with small arrows!",
    emoji: "🖥️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "The desktop is your computer workspace! You can customise it by changing the wallpaper, arranging icons, and adding shortcuts with small arrows!"
  },
  {
    title: "Word Processor Tools 🔍",
    text: "Word processors have magic proofing tools! Find and Replace swaps words instantly. Spell check marks spelling errors with red wavy lines. Word count shows how many words you wrote!",
    emoji: "🔍",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Word processors have magic proofing tools! Find and Replace swaps words instantly. Spell check marks spelling errors with red wavy lines."
  },
  {
    title: "Formatting & Alignment 📐",
    text: "Make your document look neat! Left align starts at the left, center align puts titles in the middle, and justify makes both left and right edges straight like a newspaper!",
    emoji: "📐",
    bgColor: "from-teal-500 to-emerald-600",
    spoken: "Make your document look neat! Left align starts at the left, center align puts titles in the middle, and justify makes both edges straight!"
  },
  {
    title: "Fonts & Serifs 🔤",
    text: "Fonts are letter styles! Arial is a sans-serif font with plain edges. Times New Roman is a serif font with tiny feet at the ends of letters for a formal look!",
    emoji: "🔤",
    bgColor: "from-emerald-500 to-green-600",
    spoken: "Fonts are letter styles! Arial is a sans-serif font with plain edges. Times New Roman is a serif font with tiny feet at the ends!"
  },
  {
    title: "Text Cases & Shortcuts ⌨️",
    text: "Change text case to UPPERCASE, lowercase, or Title Case! Use keyboard shortcuts like Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline, and Ctrl+Z to undo!",
    emoji: "⌨️",
    bgColor: "from-gold-500 to-purple-600",
    spoken: "Change text case to UPPERCASE, lowercase, or Title Case! Use keyboard shortcuts like Control B for bold and Control Z to undo!"
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBin {
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
  bins?: SortBin[];
}

// ─── Challenges (8 progressive) ──────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is a SHORTCUT icon on the Windows 10 desktop?",
    answer: "A quick link that opens a file or program without searching through folders",
    options: [
      "A quick link that opens a file or program without searching through folders",
      "A type of wallpaper picture behind the icons",
      "A button on the keyboard to print documents"
    ],
    hint: "Look for the small curved arrow on the icon! It is just a quick pointer, not the original file.",
    misconception: "A shortcut is NOT the original file! It is only a quick link marked with a small arrow. If you delete a shortcut, the real file is still safe!"
  },
  {
    type: 'sort',
    question: "Drag each desktop element to its correct description!",
    answer: "sort",
    options: [],
    hint: "Match desktop, wallpaper, taskbar, and shortcut to what they do on Windows 10!",
    misconception: "Read carefully! The wallpaper is the background, the taskbar is at the bottom, and a shortcut has a small arrow.",
    sortItems: [
      { id: 'desktop', label: 'Desktop', icon: 'desktop', correctBin: 'bin-desktop' },
      { id: 'wallpaper', label: 'Wallpaper', icon: 'wallpaper', correctBin: 'bin-wallpaper' },
      { id: 'taskbar', label: 'Taskbar', icon: 'taskbar', correctBin: 'bin-taskbar' },
      { id: 'shortcut', label: 'Shortcut', icon: 'shortcut', correctBin: 'bin-shortcut' },
    ],
    bins: [
      { id: 'bin-desktop', label: 'Working Area', color: '#3B82F6' },
      { id: 'bin-wallpaper', label: 'Background', color: '#10B981' },
      { id: 'bin-taskbar', label: 'Bottom Bar', color: '#F59E0B' },
      { id: 'bin-shortcut', label: 'Quick Link', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "Which tool in a word processor helps you find a word and swap it with another everywhere?",
    answer: "Find and Replace",
    options: [
      "Find and Replace",
      "Spell Check",
      "Word Count"
    ],
    hint: "This tool searches for a word and replaces it instantly across the whole document!",
    misconception: "Find and Replace is used to swap words everywhere at once! Spell check only checks spelling and marks errors with a red wavy line."
  },
  {
    type: 'sort',
    question: "Drag each Word proofing tool to its correct function!",
    answer: "sort",
    options: [],
    hint: "Match Find & Replace, Spell Check, Thesaurus, and Word Count to what they do!",
    misconception: "Remember: spell check finds spelling mistakes with red wavy lines, while the thesaurus gives you synonyms (similar words).",
    sortItems: [
      { id: 'find-rep', label: 'Find & Replace', icon: 'find', correctBin: 'bin-find' },
      { id: 'spell', label: 'Spell Check', icon: 'spell', correctBin: 'bin-spell' },
      { id: 'thes', label: 'Thesaurus', icon: 'thesaurus', correctBin: 'bin-thes' },
      { id: 'count', label: 'Word Count', icon: 'count', correctBin: 'bin-count' },
    ],
    bins: [
      { id: 'bin-find', label: 'Swap Words', color: '#3B82F6' },
      { id: 'bin-spell', label: 'Red Wavy Lines', color: '#EF4444' },
      { id: 'bin-thes', label: 'Synonyms', color: '#10B981' },
      { id: 'bin-count', label: 'Count Words', color: '#F59E0B' },
    ]
  },
  {
    type: 'identify',
    question: "Which text alignment makes words line up evenly on BOTH the left and right sides of the page?",
    answer: "Justify",
    options: [
      "Justify",
      "Left align",
      "Center align"
    ],
    hint: "Think of how a newspaper column looks with straight edges on both sides!",
    misconception: "Justify alignment makes BOTH left and right edges straight like a printed book! Left align leaves the right edge uneven."
  },
  {
    type: 'sort',
    question: "Drag each alignment type to its correct description!",
    answer: "sort",
    options: [],
    hint: "Match Left, Center, Right, and Justify alignments to how text sits on the page!",
    misconception: "Center alignment places text in the middle for titles. Justify makes both edges straight. They are not the same!",
    sortItems: [
      { id: 'align-l', label: 'Left Align', icon: 'align-l', correctBin: 'bin-al' },
      { id: 'align-c', label: 'Center Align', icon: 'align-c', correctBin: 'bin-ac' },
      { id: 'align-r', label: 'Right Align', icon: 'align-r', correctBin: 'bin-ar' },
      { id: 'align-j', label: 'Justify', icon: 'align-j', correctBin: 'bin-aj' },
    ],
    bins: [
      { id: 'bin-al', label: 'Left Edge', color: '#3B82F6' },
      { id: 'bin-ac', label: 'Middle', color: '#10B981' },
      { id: 'bin-ar', label: 'Right Edge', color: '#F59E0B' },
      { id: 'bin-aj', label: 'Both Edges', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is a FONT TYPE in Microsoft Word?",
    answer: "The design or style of the letters, like Arial or Times New Roman",
    options: [
      "The design or style of the letters, like Arial or Times New Roman",
      "The size of the letters measured in points",
      "The colour used to highlight text"
    ],
    hint: "Think of it as different handwriting styles for the computer, such as Arial or Times New Roman.",
    misconception: "A font type is the design of the letters (like Arial or Times New Roman). It is not the size or the colour of the text!"
  },
  {
    type: 'sort',
    question: "Drag each text case or font style to its correct example!",
    answer: "sort",
    options: [],
    hint: "Match UPPERCASE, Title Case, Arial (sans-serif), and Times New Roman (serif)!",
    misconception: "UPPERCASE makes ALL letters capital, while Title Case capitalises only the first letter of each important word. Arial has no serifs (sans-serif), but Times New Roman has tiny feet (serif).",
    sortItems: [
      { id: 'upper', label: 'UPPERCASE', icon: 'case-u', correctBin: 'bin-upper' },
      { id: 'title', label: 'Title Case', icon: 'case-t', correctBin: 'bin-title' },
      { id: 'arial', label: 'Arial (Sans-serif)', icon: 'font-a', correctBin: 'bin-arial' },
      { id: 'times', label: 'Times New Roman (Serif)', icon: 'font-t', correctBin: 'bin-times' },
    ],
    bins: [
      { id: 'bin-upper', label: 'ALL CAPS', color: '#EF4444' },
      { id: 'bin-title', label: 'First Letters', color: '#3B82F6' },
      { id: 'bin-arial', label: 'Plain Edges', color: '#10B981' },
      { id: 'bin-times', label: 'Tiny Feet', color: '#8B5CF6' },
    ]
  },
];

// ─── Custom SVG Office Desk Background ────────────────────────

function OfficeSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="desk-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Wall background */}
        <rect width={width} height={height * 0.7} fill="url(#wall-grad)" />

        {/* Window on wall */}
        <rect x={width - 180} y={30} width={100} height={130} rx={8} fill="#7DD3FC" stroke="#0284C7" strokeWidth="4" />
        <line x1={width - 130} y1={30} x2={width - 130} y2={160} stroke="#0284C7" strokeWidth="3" />
        <line x1={width - 180} y1={95} x2={width - 80} y2={95} stroke="#0284C7" strokeWidth="3" />

        {/* Wooden desk surface */}
        <rect x={0} y={height * 0.65} width={width} height={height * 0.35} fill="url(#desk-grad)" />
        <rect x={0} y={height * 0.63} width={width} height={16} fill="#F59E0B" opacity="0.4" />

        {/* Computer Monitor */}
        <rect x={width / 2 - 90} y={height * 0.3} width={180} height={120} rx={6} fill="#334155" stroke="#1E293B" strokeWidth="4" />
        <rect x={width / 2 - 82} y={height * 0.33} width={164} height={98} rx={3} fill="url(#screen-grad)" />
        {/* Monitor stand */}
        <rect x={width / 2 - 18} y={height * 0.72} width={36} height={18} fill="#475569" />
        <rect x={width / 2 - 35} y={height * 0.75} width={70} height={6} rx={3} fill="#334155" />

        {/* Word Doc lines on screen */}
        <line x1={width / 2 - 65} y1={height * 0.38} x2={width / 2 + 20} y2={height * 0.38} stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
        <line x1={width / 2 - 65} y1={height * 0.46} x2={width / 2 + 55} y2={height * 0.46} stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1={width / 2 - 65} y1={height * 0.53} x2={width / 2 + 40} y2={height * 0.53} stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

        {/* Keyboard on desk */}
        <rect x={width / 2 - 75} y={height * 0.79} width={150} height={32} rx={6} fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Mascot: Editor Eshan ──────────────────────────

function EditorEshan({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[220px] border-2 border-gold-200"
          >
            <p className="text-xs font-bold text-gold-900">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.18, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
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
            <linearGradient id="eshan-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="eshan-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
          </defs>

          {/* Body / Shirt */}
          <path d="M20 50 L37 55 L55 50 L60 82 C60 85, 55 88, 50 88 L25 88 C20 88, 15 85, 15 82 Z" fill="url(#eshan-body)" stroke="#312E81" strokeWidth="1.5" />

          {/* Keyboard Tie */}
          <polygon points="35,55 40,55 42,80 33,80" fill="#1E293B" />
          <line x1="35" y1="60" x2="40" y2="60" stroke="#38BDF8" strokeWidth="1" />
          <line x1="34" y1="68" x2="41" y2="68" stroke="#38BDF8" strokeWidth="1" />
          <line x1="34" y1="76" x2="41" y2="76" stroke="#38BDF8" strokeWidth="1" />

          {/* Head */}
          <circle cx="37.5" cy="32" r="20" fill="url(#eshan-face)" stroke="#C2410C" strokeWidth="1.5" />

          {/* Hair */}
          <path d="M18 30 C18 15, 30 12, 37.5 12 C45 12, 57 15, 57 30 C55 22, 50 18, 37.5 18 C25 18, 20 22, 18 30 Z" fill="#1E293B" />

          {/* Glasses */}
          <rect x="25" y="26" width="11" height="8" rx="2" fill="none" stroke="#0F172A" strokeWidth="1.5" />
          <rect x="39" y="26" width="11" height="8" rx="2" fill="none" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="36" y1="30" x2="39" y2="30" stroke="#0F172A" strokeWidth="1.5" />

          {/* Eyes */}
          <circle cx="30.5" cy="30" r="2" fill="#0F172A" />
          <circle cx="44.5" cy="30" r="2" fill="#0F172A" />

          {/* Smile */}
          <path d="M32 40 Q37.5 45 43 40" stroke="#9A3412" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Pen Badge on Pocket */}
          <rect x="45" y="60" width="8" height="10" rx="1" fill="white" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="49" y1="58" x2="49" y2="64" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? "#FFD700" : "none"} stroke={i < count ? "#FFD700" : "rgba(255,255,255,0.3)"} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Topic Icons for Sort Cards & Bins ─────────────

function DesktopIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="32" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <rect x="12" y="14" width="36" height="24" rx="2" fill="#F0F9FF" />
      <rect x="24" y="42" width="12" height="6" fill="#64748B" />
      <rect x="18" y="48" width="24" height="4" rx="2" fill="#475569" />
      <circle cx="18" cy="20" r="3" fill="#3B82F6" />
      <circle cx="18" cy="28" r="3" fill="#10B981" />
    </svg>
  );
}

function WallpaperIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="40" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
      <path d="M8 38 L22 24 L34 36 L44 26 L52 34 L52 50 L8 50 Z" fill="#34D399" />
      <circle cx="44" cy="20" r="6" fill="#FBBF24" />
    </svg>
  );
}

function TaskbarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="15" width="48" height="30" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
      <rect x="6" y="37" width="48" height="8" fill="#1E293B" rx="1" />
      <rect x="10" y="39" width="6" height="4" rx="1" fill="#38BDF8" />
      <rect x="18" y="39" width="6" height="4" rx="1" fill="#10B981" />
      <rect x="42" y="39" width="8" height="4" rx="1" fill="#64748B" />
    </svg>
  );
}

function ShortcutIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="15" width="32" height="36" rx="4" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
      <path d="M34 15 L44 25 L44 15 Z" fill="#CA8A04" />
      <circle cx="28" cy="30" r="8" fill="#3B82F6" />
      {/* Arrow badge */}
      <circle cx="16" cy="46" r="8" fill="#EF4444" stroke="white" strokeWidth="1.5" />
      <path d="M13 46 L19 43 L19 49 Z" fill="white" />
    </svg>
  );
}

function FindReplaceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="24" cy="24" r="10" fill="none" stroke="#3B82F6" strokeWidth="4" />
      <line x1="31" y1="31" x2="44" y2="44" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 16 L48 22 L38 28 Z" fill="#10B981" />
      <line x1="12" y1="48" x2="48" y2="48" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SpellCheckIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      <text x="18" y="32" fontSize="22" fontWeight="bold" fill="#DC2626">Abc</text>
      <path d="M14 40 Q22 46, 30 40 T46 40" stroke="#EF4444" strokeWidth="3" fill="none" />
    </svg>
  );
}

function ThesaurusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" rx="3" fill="#D97706" stroke="#B45309" strokeWidth="2" />
      <rect x="16" y="14" width="28" height="32" fill="#FEF3C7" />
      <line x1="20" y1="22" x2="40" y2="22" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="30" x2="35" y2="30" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="38" x2="30" y2="38" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function WordCountIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="16" y="38" fontSize="20" fontWeight="bold" fill="#0369A1">128</text>
      <circle cx="42" cy="24" r="5" fill="#10B981" />
      <path d="M40 24 L42 26 L45 22" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AlignLeftIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="16" y1="20" x2="42" y2="20" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="16" y1="28" x2="32" y2="28" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="16" y1="36" x2="38" y2="36" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function AlignCenterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="18" y1="20" x2="42" y2="20" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="22" y1="28" x2="38" y2="28" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="20" y1="36" x2="40" y2="36" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function AlignRightIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="18" y1="20" x2="44" y2="20" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="28" y1="28" x2="44" y2="28" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="22" y1="36" x2="44" y2="36" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function AlignJustifyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <line x1="16" y1="20" x2="44" y2="20" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="16" y1="28" x2="44" y2="28" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <line x1="16" y1="36" x2="44" y2="36" stroke="#334155" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function UpperCaseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
      <text x="18" y="38" fontSize="24" fontWeight="bold" fill="#DC2626">A B</text>
    </svg>
  );
}

function TitleCaseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <text x="16" y="38" fontSize="20" fontWeight="bold" fill="#2563EB">Ab Cd</text>
    </svg>
  );
}

function FontArialIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <text x="18" y="38" fontSize="22" fontWeight="bold" fill="#059669">Aa</text>
    </svg>
  );
}

function FontTimesIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="2" />
      <text x="16" y="38" fontSize="22" fontFamily="serif" fontWeight="bold" fill="#7C3AED">T t</text>
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'desktop': return <DesktopIcon size={size} />;
    case 'wallpaper': return <WallpaperIcon size={size} />;
    case 'taskbar': return <TaskbarIcon size={size} />;
    case 'shortcut': return <ShortcutIcon size={size} />;
    case 'find': return <FindReplaceIcon size={size} />;
    case 'spell': return <SpellCheckIcon size={size} />;
    case 'thesaurus': return <ThesaurusIcon size={size} />;
    case 'count': return <WordCountIcon size={size} />;
    case 'align-l': return <AlignLeftIcon size={size} />;
    case 'align-c': return <AlignCenterIcon size={size} />;
    case 'align-r': return <AlignRightIcon size={size} />;
    case 'align-j': return <AlignJustifyIcon size={size} />;
    case 'case-u': return <UpperCaseIcon size={size} />;
    case 'case-t': return <TitleCaseIcon size={size} />;
    case 'font-a': return <FontArialIcon size={size} />;
    case 'font-t': return <FontTimesIcon size={size} />;
    default: return <DesktopIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-gold-200 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 truncate max-w-full">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all duration-200 ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-lg'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md mb-1" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-black text-gray-800 text-center leading-tight">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface WordFormattingGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function WordFormattingGame({ width = 720, height = 560, onComplete }: WordFormattingGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 170, y: height - 150 };
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
      const msg = "Brilliant! That is correct!";
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
      const compMsg = "Wonderful! You are a Word and Desktop Master!";
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
    const binWidth = 140;
    const binHeight = 90;
    const totalBins = currentChallenge.bins.length;
    const spacing = (width - (totalBins * binWidth)) / (totalBins + 1);

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = spacing + idx * (binWidth + spacing);
      const by = 180;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + binHeight + 30) {
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
        const msg = "Fantastic! You sorted the Word formatting tools perfectly!";
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
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      <OfficeSceneBackground width={width} height={height} />
      <EditorEshan mood={mascotMood} speaking={speakingText} />

      {/* Header bar */}
      <div className="relative z-10 w-full px-6 py-3 flex items-center justify-between bg-slate-900/70 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-gold-600 text-white font-black px-3 py-1 rounded-xl text-sm shadow-md">
            {screen === 'teaching' ? 'Learn' : `Q ${challengeIdx + 1}/${CHALLENGES.length}`}
          </div>
          <StarRow count={Math.min(5, Math.floor(score / 15))} total={5} />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShowHint}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-1"
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Screen Content */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {screen === 'teaching' ? (
            <motion.div
              key={`slide-${slideIdx}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-gold-300 text-center"
            >
              <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
              <h2 className="text-xl font-black text-gold-900 mb-2">{TEACHING_SLIDES[slideIdx].title}</h2>
              <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

              <div className="flex items-center justify-between w-full">
                <div className="flex gap-1.5">
                  {TEACHING_SLIDES.map((_, i) => (
                    <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-gold-600' : 'w-2.5 bg-gray-300'}`} />
                  ))}
                </div>
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    if (slideIdx < TEACHING_SLIDES.length - 1) {
                      setSlideIdx(prev => prev + 1);
                    } else {
                      audioManager.play('success');
                      setScreen('play');
                    }
                  }}
                  className="bg-gold-600 hover:bg-gold-700 text-white font-black px-6 py-2.5 rounded-2xl shadow-lg transition-transform active:scale-95 text-sm"
                >
                  {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next ➔' : 'Start Game! 🚀'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`challenge-${challengeIdx}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full max-w-2xl"
            >
              {/* Question card */}
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-gold-200 text-center mb-6 max-w-xl w-full">
                <p className="text-sm md:text-base font-black text-slate-800">{currentChallenge.question}</p>
              </div>

              {/* Identify Challenge Options */}
              {currentChallenge.type === 'identify' && (
                <div className="grid grid-cols-1 gap-3 w-full max-w-lg">
                  {currentChallenge.options.map((opt, idx) => {
                    const isSelected = selectedOpt === opt;
                    const isCorrect = opt === currentChallenge.answer;
                    let btnStyle = "bg-white hover:bg-gold-50 text-slate-800 border-gold-200";
                    if (selectedOpt) {
                      if (isCorrect) btnStyle = "bg-emerald-500 text-white border-emerald-600 shadow-lg";
                      else if (isSelected) btnStyle = "bg-rose-500 text-white border-rose-600 shadow-lg";
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={e => handleAnswerClick(opt, e)}
                        disabled={selectedOpt === currentChallenge.answer}
                        className={`p-3.5 rounded-2xl border-2 font-bold text-xs md:text-sm shadow-md transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOpt && isCorrect && <span>✅</span>}
                        {selectedOpt && isSelected && !isCorrect && <span>❌</span>}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Sort Challenge */}
              {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
                <div className="relative w-full h-64">
                  {/* Bins */}
                  {currentChallenge.bins.map((bin, idx) => {
                    const totalBins = currentChallenge.bins?.length || 1;
                    const binWidth = 140;
                    const spacing = (width - (totalBins * binWidth)) / (totalBins + 1);
                    const bx = spacing + idx * (binWidth + spacing);
                    const by = 20;

                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={bx}
                        y={by}
                        width={binWidth}
                        height={90}
                        isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                      />
                    );
                  })}

                  {/* Draggable Cards */}
                  {currentChallenge.sortItems.map(item => (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={itemPositions[item.id]?.x || 50}
                      y={itemPositions[item.id]?.y || 190}
                      placed={placedItems[item.id]}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
              )}

              {/* Next Button when answered or sorted */}
              {((currentChallenge.type === 'identify' && selectedOpt !== null) ||
                (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4">
                  <button
                    onClick={advanceChallenge}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <span>Continue 🚀</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
