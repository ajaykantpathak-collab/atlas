'use client';

/**
 * WindowsWordGame — Learn MS Word 2016: interface, formatting, saving & opening
 *
 * CISCE Nodes: c3_cs_006 (Introduction to MS Word 2016), c3_cs_007 (Formatting text),
 *              c3_cs_008 (Saving and opening Word documents)
 * Enrichment: c3_cs_enrichment_part6-8
 *
 * ELI5: "MS Word is your digital notebook! You open it from the Start menu,
 *   type in the big white document area where the blinking cursor points,
 *   format your words to make them bold, italic, or colourful, and save your
 *   work with Ctrl+S so it is never lost!"
 *
 * Misconceptions (from enrichment):
 *   1. "Closing a document saves it automatically" -> "No! If you close without
 *      saving, all your typing is lost! Always press Ctrl+S or click Save!"
 *   2. "The ribbon and the title bar are the same" -> "No! The title bar is at
 *      the very top showing the file name and window buttons. The ribbon is
 *      the tabbed toolbar below it holding commands!"
 *   3. "The cursor is the same as the mouse arrow" -> "No! The mouse arrow helps
 *      you click, but the cursor is the blinking vertical bar inside the
 *      document area showing where the next letter appears!"
 *   4. "Bold and Italic make text the same way" -> "No! Bold makes text thicker
 *      and darker, while Italic makes text slant to the right!"
 *   5. "You must type .docx by yourself" -> "No! Word adds the .docx file
 *      extension automatically like a helpful surname!"
 *
 * Story: "Help Typist Tina the typing teacher prepare neat documents, format
 *   titles, and save files safely on the computer!"
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
    title: 'Welcome to MS Word 2016! 💻',
    text: 'Microsoft Word 2016 is a word processor! It lets you type, change, and keep your writing in a digital file called a document. No more plain paper — use the keyboard and document area!',
    emoji: '📝',
    bgColor: 'from-gold-500 to-gold-600',
    spoken: 'Microsoft Word 2016 is a word processor! It lets you type, change, and keep your writing in a digital file called a document.'
  },
  {
    title: 'The Word Window Interface 🗂️',
    text: 'At the top is the Title Bar showing your document name and window buttons. Below it is the Ribbon, a toolbar full of tabs and commands. The big white space is the Document Area where the blinking cursor sits!',
    emoji: '🖥️',
    bgColor: 'from-gold-500 to-purple-600',
    spoken: 'At the top is the Title Bar showing your document name. Below it is the Ribbon toolbar. The big white space is the Document Area where the blinking cursor sits!'
  },
  {
    title: 'Formatting Text — Make it Stand Out! ✨',
    text: 'Formatting changes how text looks! Make words Bolder with B, slanted with Italic (I), underlined with U, change Font Size to be bigger, and pick wonderful Text Colours!',
    emoji: '🎨',
    bgColor: 'from-purple-500 to-pink-600',
    spoken: 'Formatting changes how text looks! Make words bold with B, slanted with italic, underlined with U, change font size, and pick wonderful text colours!'
  },
  {
    title: 'Saving Your Work — Keep it Safe! 💾',
    text: 'Never close Word without saving! Press Ctrl+S or click the Save button. Give your file a clear name like My_School_Essay. Word adds .docx automatically so you can find it on your desktop later!',
    emoji: '📂',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'Never close Word without saving! Press Control S or click the Save button. Give your file a clear name so you can find it on your desktop later!'
  },
  {
    title: 'Opening Saved Documents 🔍',
    text: 'Once saved, your file sits on the desktop like a notebook on a study table with a blue W icon. Double-click it anytime to open Word and continue your wonderful writing!',
    emoji: '📖',
    bgColor: 'from-teal-500 to-gold-600',
    spoken: 'Once saved, your file sits on the desktop with a blue icon. Double-click it anytime to open Word and continue your wonderful writing!'
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_use' | 'identify_cursor' | 'sort_interface' | 'identify_bold' | 'sort_formatting' | 'identify_save' | 'sort_save_steps' | 'sort_save_open';

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
    question: 'What is the main purpose of MS Word 2016?',
    answer: 'Typing and formatting text documents',
    options: ['Typing and formatting text documents', 'Drawing pictures with pencil and brush', 'Playing racing video games'],
    hint: 'Think: do you draw in Word or write stories and reports?',
    misconception: 'MS Word is a word processor designed for typing, editing, and formatting text documents! Drawing pictures belongs in MS Paint, not Word!',
  },
  {
    type: 'identify_cursor',
    question: 'Where does your typed text appear when you press keys in MS Word?',
    answer: 'At the blinking cursor',
    options: ['At the blinking cursor', 'At the very top of the screen', 'On the taskbar'],
    hint: 'Look for the blinking vertical line inside the white document area.',
    misconception: 'Text always appears exactly where the blinking cursor (insertion point) is flashing in the document area! It does not magically appear on the taskbar!',
  },
  {
    type: 'sort_interface',
    question: 'Drag each part of the MS Word window to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Title bar shows file name, Ribbon holds commands, Document area is for typing!',
    misconception: 'Make sure you match each part correctly: Title bar shows document name, Ribbon holds tabbed commands, and Document area is your blank typing page!',
    sortItems: [
      { id: 'title', label: 'Title Bar', icon: 'title', correctBin: 'bin-title' },
      { id: 'ribbon', label: 'Ribbon', icon: 'ribbon', correctBin: 'bin-ribbon' },
      { id: 'doc-area', label: 'Document Area', icon: 'doc', correctBin: 'bin-doc' },
    ],
    bins: [
      { id: 'bin-title', label: 'Shows file name & window buttons 🏷️', color: '#3B82F6' },
      { id: 'bin-ribbon', label: 'Tabbed toolbar with commands 🛠️', color: '#8B5CF6' },
      { id: 'bin-doc', label: 'Large white space to type text 📄', color: '#10B981' },
    ],
  },
  {
    type: 'identify_bold',
    question: 'Which button on the Home tab makes selected text thicker and darker?',
    answer: 'The B (Bold) button',
    options: ['The B (Bold) button', 'The I (Italic) button', 'The U (Underline) button'],
    hint: 'Think of the letter that stands for Bold!',
    misconception: 'The Bold button (B) makes text thicker and darker! Italic (I) slants text to the right, and Underline (U) draws a line beneath it!',
  },
  {
    type: 'sort_formatting',
    question: 'Drag each formatting tool to what it does to your text!',
    answer: 'sort',
    options: [],
    hint: 'Bold makes text thick, Italic slants text, Underline puts a line underneath!',
    misconception: 'Review your formatting tools carefully: Bold makes letters thick and dark, Italic slants them rightward, and Underline puts a neat line under them!',
    sortItems: [
      { id: 'bold-tool', label: 'Bold (B)', icon: 'bold', correctBin: 'bin-bold' },
      { id: 'italic-tool', label: 'Italic (I)', icon: 'italic', correctBin: 'bin-italic' },
      { id: 'underline-tool', label: 'Underline (U)', icon: 'underline', correctBin: 'bin-underline' },
    ],
    bins: [
      { id: 'bin-bold', label: 'Makes text thicker & darker 🔠', color: '#EF4444' },
      { id: 'bin-italic', label: 'Makes text slant to the right ↗️', color: '#F59E0B' },
      { id: 'bin-underline', label: 'Draws a line underneath text 🔗', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify_save',
    question: 'What must you do before closing Word so your typed story is not lost?',
    answer: 'Save the document',
    options: ['Save the document', 'Just close the window', 'Turn off computer power'],
    hint: 'Remember: unsaved work lives only in temporary memory and vanishes when closed!',
    misconception: 'You MUST save your document before closing! If you close without saving, all your typing is permanently lost because RAM is temporary memory!',
  },
  {
    type: 'sort_save_steps',
    question: 'Drag the correct steps to save a Word file in order (1 to 3)!',
    answer: 'sort',
    options: [],
    hint: 'First press Save, then type a name, then click final Save!',
    misconception: 'Saving order matters: 1. Click Save (or Ctrl+S), 2. Type a clear file name, 3. Click Save button in the dialog box!',
    sortItems: [
      { id: 'step-1', label: '1. Click Save / Ctrl+S', icon: 'save', correctBin: 'bin-step1' },
      { id: 'step-2', label: '2. Type file name', icon: 'keyboard', correctBin: 'bin-step2' },
      { id: 'step-3', label: '3. Click Save button', icon: 'folder', correctBin: 'bin-step3' },
    ],
    bins: [
      { id: 'bin-step1', label: 'Step 1: Open Save command 💾', color: '#6366F1' },
      { id: 'bin-step2', label: 'Step 2: Enter file name ⌨️', color: '#EC4899' },
      { id: 'bin-step3', label: 'Step 3: Confirm & save file ✅', color: '#14B8A6' },
    ],
  },
  {
    type: 'sort_save_open',
    question: 'Drag each action to either Saving or Opening a document!',
    answer: 'sort',
    options: [],
    hint: 'Ctrl+S is for saving, double-clicking desktop icon is for opening!',
    misconception: 'Saving stores your work permanently on the disk (Ctrl+S), while Opening loads a saved file back into Word so you can read and edit it again!',
    sortItems: [
      { id: 'act-ctrls', label: 'Press Ctrl+S', icon: 'save', correctBin: 'bin-save' },
      { id: 'act-open', label: 'Double-click icon', icon: 'open', correctBin: 'bin-open' },
      { id: 'act-name', label: 'Type file name', icon: 'keyboard', correctBin: 'bin-save' },
    ],
    bins: [
      { id: 'bin-save', label: 'Saving a Document 💾', color: '#22C55E' },
      { id: 'bin-open', label: 'Opening a Document 📂', color: '#3B82F6' },
    ],
  },
];

// ─── Typist Tina Mascot (Custom SVG Typing Teacher) ───────────

function TypistTina({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-200"
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
            <linearGradient id="tina-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="tina-hair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
          </defs>
          {/* Hair back */}
          <circle cx="37" cy="30" r="22" fill="url(#tina-hair)" />
          {/* Head */}
          <circle cx="37" cy="32" r="16" fill="#FDE68A" />
          {/* Hair front / bangs */}
          <path d="M21 28 Q37 18 53 28 Q50 38 45 32 Q37 26 29 32 Q24 38 21 28 Z" fill="url(#tina-hair)" />
          {/* Glasses */}
          <circle cx="31" cy="31" r="5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="43" cy="31" r="5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="36" y1="31" x2="38" y2="31" stroke="#1E293B" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="31" r="2" fill="#1E293B" />
          <circle cx="43" cy="31" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 39 Q37 43 41 39" stroke="#9A3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Body / Dress */}
          <path d="M24 50 L50 50 L58 78 L16 78 Z" fill="url(#tina-dress)" />
          {/* Collar */}
          <path d="M30 50 L37 56 L44 50 Z" fill="white" />
          {/* Keyboard Necklace */}
          <path d="M28 58 Q37 68 46 58" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
          <rect x="33" y="61" width="8" height="5" rx="1" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
          {/* Arms */}
          <ellipse cx="18" cy="62" rx="4" ry="10" fill="#4338CA" transform="rotate(15 18 62)" />
          <ellipse cx="57" cy="62" rx="4" ry="10" fill="#4338CA" transform="rotate(-15 57 62)" />
          {/* Feet */}
          <ellipse cx="28" cy="83" rx="5" ry="3" fill="#1E293B" />
          <ellipse cx="47" cy="83" rx="5" ry="3" fill="#1E293B" />
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

// ─── Office Scene Background (SVG) ────────────────────────────

function OfficeScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="office-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DBEAFE" />
            <stop offset="100%" stopColor="#BFDBFE" />
          </linearGradient>
          <linearGradient id="window-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="desk-top" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Wall background */}
        <rect width={width} height={height} fill="url(#office-wall)" />
        {/* Floor */}
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="#9A3412" />
        <line x1="0" y1={height * 0.75} x2={width} y2={height * 0.75} stroke="#78350F" strokeWidth="4" />
        {/* Window */}
        <rect x={width * 0.05} y={20} width={120} height={140} fill="url(#window-sky)" stroke="#1E3A8A" strokeWidth="6" rx="4" />
        <line x1={width * 0.05 + 60} y1={20} x2={width * 0.05 + 60} y2={160} stroke="#1E3A8A" strokeWidth="4" />
        <line x1={width * 0.05} y1={90} x2={width * 0.05 + 120} y2={90} stroke="#1E3A8A" strokeWidth="4" />
        {/* Window sun */}
        <circle cx={width * 0.05 + 90} cy={50} r={16} fill="#FDE047" opacity="0.9" />

        {/* Filing cabinet on right */}
        <rect x={width - 90} y={height * 0.3} width={70} height={180} fill="#64748B" stroke="#334155" strokeWidth="2" rx="4" />
        <rect x={width - 80} y={height * 0.35} width={50} height={25} fill="#94A3B8" rx="2" />
        <circle cx={width - 55} cy={height * 0.35 + 12.5} r={4} fill="#1E293B" />
        <rect x={width - 80} y={height * 0.45} width={50} height={25} fill="#94A3B8" rx="2" />
        <circle cx={width - 55} cy={height * 0.45 + 12.5} r={4} fill="#1E293B" />
        <rect x={width - 80} y={height * 0.55} width={50} height={25} fill="#94A3B8" rx="2" />
        <circle cx={width - 55} cy={height * 0.55 + 12.5} r={4} fill="#1E293B" />
      </svg>
    </div>
  );
}

// ─── Custom Word Object SVG Icons ─────────────────────────────

function WordDocIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 8 L38 8 L48 18 L48 52 L12 52 Z" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M38 8 L38 18 L48 18 Z" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="2" />
      {/* Blue Word header bar */}
      <rect x="16" y="14" width="20" height="6" fill="#2563EB" rx="1" />
      <text x="26" y="19" fontSize="6" fill="white" fontWeight="bold" textAnchor="middle">W</text>
      {/* Text lines */}
      <line x1="16" y1="26" x2="42" y2="26" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="33" x2="40" y2="33" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="40" x2="32" y2="40" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TitleBarIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="15" width="50" height="30" fill="#1E40AF" rx="4" />
      <text x="30" y="32" fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">Document1 - Word</text>
      <circle x="0" cx="14" cy="30" r="3" fill="#EF4444" />
      <circle cx="23" cy="30" r="3" fill="#F59E0B" />
      <circle cx="32" cy="30" r="3" fill="#10B981" />
    </svg>
  );
}

function RibbonIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" rx="3" />
      <rect x="5" y="10" width="50" height="12" fill="#E2E8F0" rx="3" />
      <text x="14" y="18" fontSize="7" fill="#1E293B" fontWeight="bold">Home</text>
      <text x="32" y="18" fontSize="7" fill="#64748B">Insert</text>
      <rect x="10" y="26" width="12" height="18" fill="#DBEAFE" rx="2" />
      <text x="16" y="37" fontSize="10" fill="#1D4ED8" fontWeight="bold">B</text>
      <rect x="25" y="26" width="12" height="18" fill="#F3E8FF" rx="2" />
      <text x="31" y="37" fontSize="10" fill="#7C3AED" fontStyle="italic">I</text>
      <rect x="40" y="26" width="12" height="18" fill="#DCFCE7" rx="2" />
      <text x="46" y="37" fontSize="10" fill="#15803D" textDecoration="underline">U</text>
    </svg>
  );
}

function DocAreaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" fill="white" stroke="#94A3B8" strokeWidth="2" rx="2" />
      <line x1="14" y1="18" x2="40" y2="18" stroke="#334155" strokeWidth="2" />
      <line x1="14" y1="26" x2="36" y2="26" stroke="#334155" strokeWidth="2" />
      {/* Blinking cursor */}
      <line x1="38" y1="23" x2="38" y2="29" stroke="#EF4444" strokeWidth="2" />
    </svg>
  );
}

function BoldIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2" rx="6" />
      <text x="30" y="40" fontSize="24" fill="#4338CA" fontWeight="900" textAnchor="middle">B</text>
    </svg>
  );
}

function ItalicIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" rx="6" />
      <text x="31" y="40" fontSize="24" fill="#7E22CE" fontStyle="italic" fontWeight="bold" textAnchor="middle">I</text>
    </svg>
  );
}

function UnderlineIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" rx="6" />
      <text x="30" y="38" fontSize="22" fill="#15803D" textDecoration="underline" fontWeight="bold" textAnchor="middle">U</text>
    </svg>
  );
}

function SaveIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#ECFDF5" stroke="#059669" strokeWidth="2" rx="6" />
      <path d="M18 16 L38 16 L42 20 L42 44 L18 44 Z" fill="#34D399" stroke="#065F46" strokeWidth="1.5" />
      <rect x="23" y="16" width="14" height="10" fill="white" />
      <rect x="20" y="34" width="20" height="10" fill="#10B981" rx="1" />
    </svg>
  );
}

function KeyboardIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="16" width="44" height="28" fill="#334155" stroke="#1E293B" strokeWidth="2" rx="4" />
      <rect x="12" y="20" width="6" height="5" fill="#E2E8F0" rx="1" />
      <rect x="20" y="20" width="6" height="5" fill="#E2E8F0" rx="1" />
      <rect x="28" y="20" width="6" height="5" fill="#E2E8F0" rx="1" />
      <rect x="36" y="20" width="6" height="5" fill="#E2E8F0" rx="1" />
      <rect x="44" y="20" width="4" height="5" fill="#E2E8F0" rx="1" />
      <rect x="12" y="27" width="8" height="5" fill="#E2E8F0" rx="1" />
      <rect x="22" y="27" width="16" height="5" fill="#E2E8F0" rx="1" />
      <rect x="40" y="27" width="8" height="5" fill="#E2E8F0" rx="1" />
      <rect x="18" y="34" width="24" height="5" fill="#F8FAFC" rx="1" />
    </svg>
  );
}

function FolderIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="16" width="40" height="30" fill="#F59E0B" stroke="#B45309" strokeWidth="2" rx="3" />
      <path d="M10 16 L20 16 L25 22 L50 22" fill="none" stroke="#B45309" strokeWidth="2" />
      <rect x="16" y="24" width="28" height="18" fill="#FEF3C7" rx="2" />
    </svg>
  );
}

function OpenIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="18" width="40" height="28" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" rx="3" />
      <path d="M10 18 L22 18 L28 24 L50 24" fill="none" stroke="#0284C7" strokeWidth="2" />
      <path d="M30 32 L40 22 L50 32" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="40" y1="22" x2="40" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon Mapper ─────────────────────────────────��

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'title': return <TitleBarIcon size={size} />;
    case 'ribbon': return <RibbonIcon size={size} />;
    case 'doc': return <DocAreaIcon size={size} />;
    case 'bold': return <BoldIcon size={size} />;
    case 'italic': return <ItalicIcon size={size} />;
    case 'underline': return <UnderlineIcon size={size} />;
    case 'save': return <SaveIcon size={size} />;
    case 'keyboard': return <KeyboardIcon size={size} />;
    case 'folder': return <FolderIcon size={size} />;
    case 'open': return <OpenIcon size={size} />;
    default: return <WordDocIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-300 ${placed ? 'opacity-40' : 'bg-white'} p-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 shadow-inner" style={{ backgroundColor: color }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M19 13H5v-2h14v2z" />
        </svg>
      </div>
      <span className="text-xs font-bold text-center text-gray-800 px-1 leading-tight">{label}</span>
    </div>
  );
}

// ─── Main Component Export ────────────────────────────────────

export interface WindowsWordGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function WindowsWordGame({ width = 720, height = 560, onComplete }: WindowsWordGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Typist Tina! Let us learn MS Word 2016!');

  // Drag and drop state for sort challenges
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize sort item positions when challenge changes
  useEffect(() => {
    const current = CHALLENGES[challengeIdx];
    if (current.type.startsWith('sort') && current.sortItems) {
      const posMap: Record<string, { x: number; y: number }> = {};
      current.sortItems.forEach((item, idx) => {
        posMap[item.id] = {
          x: 40 + idx * 125,
          y: height - 140,
        };
      });
      setItemPositions(posMap);
      setPlacedItems({});
    }
  }, [challengeIdx, height]);

  // Speech narration for teaching slides
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.text.slice(0, 50) + '...');
    }
  }, [screen, slideIdx]);

  // Speech narration for challenges
  useEffect(() => {
    if (screen === 'play') {
      const ch = CHALLENGES[challengeIdx];
      speechManager.speak(ch.question);
      setMascotSpeech(ch.question);
    }
  }, [screen, challengeIdx]);

  // Inactivity timer for auto-hints
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setHintMsg(CHALLENGES[challengeIdx].hint);
        setMascotMood('thinking');
        speechManager.speak(CHALLENGES[challengeIdx].hint);
      }
    }, 10000);
  }, [challengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Multiple choice answer handler
  const handleAnswer = (option: string) => {
    resetInactivityTimer();
    const ch = CHALLENGES[challengeIdx];
    if (option === ch.answer) {
      audioManager.play('success');
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! That is correct!');
      speechManager.speak('Fantastic! That is correct!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Correct! Excellent job!');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(ch.misconception);
      speechManager.speak(ch.misconception);
      setHintMsg(ch.misconception);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const ch = CHALLENGES[challengeIdx];
    if (!ch.bins || !ch.sortItems) return false;

    const item = ch.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bin bounding boxes
    const binWidth = 190;
    const binHeight = 90;
    const binY = height * 0.28;

    let targetBinId: string | null = null;
    ch.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 215;
      if (
        x + 55 >= binX &&
        x + 55 <= binX + binWidth &&
        y + 45 >= binY &&
        y + 45 <= binY + binHeight
      ) {
        targetBinId = bin.id;
      }
    });

    if (targetBinId && targetBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setMascotMood('happy');
      setMascotSpeech('Great match!');

      const allDone = ch.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('All sorted correctly! Wonderful!');
        speechManager.speak('All sorted correctly! Wonderful!');
        setSparklePos({ x: width / 2, y: height / 2 });
        setSuccessMsg('Perfect sorting!');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(ch.misconception);
      speechManager.speak(ch.misconception);
      setHintMsg(ch.misconception);
      return false;
    }
  };

  // Advance challenge or finish
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
      setMascotSpeech(`Amazing! You scored ${finalScore} points! You are a Word Master!`);
      speechManager.speak(`Amazing! You scored ${finalScore} points! You are a Word Master!`);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans"
      style={{ width, height, background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)' }}
    >
      <OfficeScene width={width} height={height} />
      <TypistTina mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Navigation / Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between z-10 border-b border-gold-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold-600 flex items-center justify-center text-white shadow-md font-extrabold text-lg">
            W
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-gray-900 leading-none">MS Word 2016 Explorer</h1>
            <p className="text-[10px] font-medium text-gold-600">ICSE Class 3 Computer Science</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-500">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                setScreen('teaching');
              }}
              className="px-3 py-1.5 bg-gold-100 hover:bg-gold-200 text-gold-700 text-xs font-bold rounded-xl transition shadow-sm"
            >
              📖 Review Lessons
            </button>
          </div>
        )}
      </div>

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 pb-6 px-8 flex flex-col items-center justify-center z-10 bg-gradient-to-br from-gold-900/90 via-gold-900/80 to-gold-950/90 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-gold-200 flex flex-col items-center">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-3xl shadow-lg mb-3`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2 text-center">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm font-medium text-gray-700 text-center mb-6 leading-relaxed px-4">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            {/* Slide Progress Dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-gold-600' : 'w-2.5 bg-gold-200'}`}
                />
              ))}
            </div>

            <div className="flex justify-between w-full">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow transition ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                ← Back
              </button>

              {slideIdx < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIdx(prev => prev + 1);
                  }}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-700 text-white font-bold text-sm rounded-2xl shadow-lg transition transform hover:scale-105"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => {
                    audioManager.play('success');
                    setScreen('play');
                  }}
                  className="px-8 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-xl transition transform hover:scale-105"
                >
                  🚀 Start Game!
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col items-center justify-between z-10">
          {/* Question card */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-gold-200 mt-2 flex flex-col items-center">
            <span className="text-[10px] font-extrabold text-gold-600 uppercase tracking-wider mb-1">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
            <h2 className="text-base font-extrabold text-gray-900 text-center leading-snug">
              {CHALLENGES[challengeIdx].question}
            </h2>
          </div>

          {/* Interactive Challenge Area */}
          <div className="w-full max-w-2xl flex-1 flex flex-col items-center justify-center relative my-2">
            {CHALLENGES[challengeIdx].type.startsWith('sort') && CHALLENGES[challengeIdx].bins ? (
              <div className="w-full h-full relative">
                {/* Bins */}
                <div className="flex justify-around w-full absolute top-2">
                  {CHALLENGES[challengeIdx].bins?.map((bin, idx) => {
                    const binWidth = CHALLENGES[challengeIdx].bins?.length === 3 ? 170 : 250;
                    const binX = idx === 0 ? 30 : idx === 1 ? (CHALLENGES[challengeIdx].bins?.length === 3 ? 225 : 380) : 430;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={binX}
                        y={20}
                        width={binWidth}
                        height={90}
                        isHovering={hoveringBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable items */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-around px-8">
                  {CHALLENGES[challengeIdx].sortItems?.map(item => (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={itemPositions[item.id]?.x || 0}
                      y={itemPositions[item.id]?.y || 0}
                      placed={!!placedItems[item.id]}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {CHALLENGES[challengeIdx].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt)}
                    className="w-full py-3 px-5 bg-white hover:bg-gold-50 border-2 border-gold-200 hover:border-gold-400 rounded-2xl shadow-md text-sm font-bold text-gray-800 transition flex items-center justify-between"
                  >
                    <span>{opt}</span>
                    <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 text-xs font-bold">
                      {String.fromCharCode(65 + i)}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom helper bar */}
          <div className="w-full max-w-2xl flex justify-between items-center py-2 px-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gold-100">
            <button
              onClick={() => {
                audioManager.play('hint');
                const ch = CHALLENGES[challengeIdx];
                setHintMsg(ch.hint);
                speechManager.speak(ch.hint);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-xs rounded-xl shadow-sm transition"
            >
              💡 Need a Hint?
            </button>
            <span className="text-xs font-bold text-gray-500">
              Errors: {errors}
            </span>
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {successMsg && (
        <SuccessBanner
          message={successMsg}
          onComplete={handleNextChallenge}
        />
      )}

      {hintMsg && !successMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => setHintMsg(null)}
        />
      )}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}
    </div>
  );
}
