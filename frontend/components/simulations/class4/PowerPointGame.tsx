'use client';

/**
 * PowerPointGame — Learn about Microsoft PowerPoint 2016
 *
 * CISCE Nodes: c4_cs_011 (Intro to PowerPoint 2016 - interface & creating presentation),
 *              c4_cs_012 (PowerPoint slides - adding slides, layouts, text, pictures),
 *              c4_cs_013 (PowerPoint - saving, opening, running a slide show)
 * Enrichment: c4_cs_enrichment_part11, part12, part13
 *
 * ELI5: "PowerPoint 2016 is a computer program that helps you make a picture book
 *   you can show on a screen. You start it from the Start menu, then use the
 *   ribbon at the top to pick tools. The big middle space is the slide pane,
 *   where you draw and write your slide. At the bottom is the notes area, where
 *   you can hide little reminders. To begin, make a new presentation, click the
 *   title box, and type your heading. Press F5 to show your slides like a movie!"
 *
 * Misconceptions (from enrichment):
 *   1. "The ribbon is the slide" -> "No! The ribbon is the tool belt at the top;
 *      the slide pane is the canvas where the slide is edited!"
 *   2. "What I type in the notes area appears on the slide during the show" ->
 *      "No! The notes area is private for the speaker; the audience sees only slides!"
 *   3. "Saving and closing are the same" -> "No! Saving stores your work on the disk
 *      with .pptx; closing just removes it from the screen!"
 *   4. "Pressing Escape closes PowerPoint" -> "No! Escape only ends the full-screen
 *      slide show and brings you back to the editing view!"
 *   5. "F5 creates a new presentation" -> "No! F5 starts the slide show from the
 *      very first slide in full screen!"
 *
 * Story: "Help Presenter Priya lead a digital tour of PowerPoint 2016! Learn the
 *   interface, add slides, layouts, text, and pictures, save your work, and run
 *   the slide show like a pro!"
 *
 * 9/10 Quality Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG presentation hall background with linear gradients
 * - Custom SVG topic-specific components (Ribbon, Slide Pane, Layouts, F5, etc.)
 * - Presenter Priya mascot with mood states and speech bubble
 * - Drag-and-drop sorting challenges
 * - 8 progressive challenges: identify interface → add slides → save/run show
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after EXACTLY 10 seconds of inactivity
 * - Progressive difficulty ladder
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

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

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Welcome to PowerPoint 2016! 🖥️",
    text: "Microsoft PowerPoint 2016 is a presentation program that lets you build electronic slides like a digital slideshow! A presentation is made of slides saved with the .pptx extension.",
    emoji: "🖥️",
    bgColor: "from-orange-400 to-amber-500",
    spoken: "Microsoft PowerPoint 2016 is a presentation program that lets you build electronic slides like a digital slideshow! A presentation is made of slides saved with the dot p p t x extension."
  },
  {
    title: "The PowerPoint Window 🧰",
    text: "The window has three main parts: The Ribbon (tool belt at top with tabs like Home & Insert), the Slide Pane (central canvas where you edit slides), and the Notes Area (private reminders for the speaker).",
    emoji: "📋",
    bgColor: "from-blue-400 to-indigo-500",
    spoken: "The window has three main parts: The Ribbon, the Slide Pane, and the Notes Area. The notes are private reminders for the speaker and do not show on the slide!"
  },
  {
    title: "Adding Slides & Layouts 📄",
    text: "A new presentation starts with a Title Slide. You can add new slides from the Home tab or press Ctrl+M. Choose layouts like Title and Content or Two Content, then click inside placeholders to type or add pictures!",
    emoji: "✨",
    bgColor: "from-emerald-400 to-teal-500",
    spoken: "A new presentation starts with a Title Slide. You can add new slides using the New Slide button on the Home tab, and choose layouts like Title and Content!"
  },
  {
    title: "Saving Your Presentation 💾",
    text: "Always save your work! Saving stores your presentation on the computer with a file name and .pptx. Remember: saving stores the file, while closing just removes it from the screen. Always save before closing!",
    emoji: "💾",
    bgColor: "from-purple-400 to-indigo-500",
    spoken: "Always save your work! Saving stores your presentation on the computer with a file name and dot p p t x. Always save before closing so you do not lose your work!"
  },
  {
    title: "Running the Slide Show 🎬",
    text: "When your presentation is ready, press the F5 key to start the slide show from the first slide in full screen! When you are done, press the Escape key to return to the editing view.",
    emoji: "🎬",
    bgColor: "from-rose-400 to-pink-500",
    spoken: "When your presentation is ready, press the F 5 key to start the slide show in full screen! When you are done, press the Escape key to return to editing view."
  },
];

// ─── Challenges (8 progressive) ───��───────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is Microsoft PowerPoint 2016?",
    answer: "A presentation program for creating slides with text, pictures, and charts",
    options: [
      "A presentation program for creating slides with text, pictures, and charts",
      "A word processor for writing letters and stories",
      "A web browser for searching the Internet"
    ],
    hint: "Think about what PowerPoint makes: electronic slides with pictures and text!",
    misconception: "PowerPoint 2016 is a presentation program for making slides, not just a word processor or web browser! It creates electronic slideshows."
  },
  {
    type: 'sort',
    question: "Drag each PowerPoint interface part to its correct function!",
    answer: "sort",
    options: [],
    hint: "Ribbon = tool belt at top! Slide Pane = central canvas! Notes Area = private speaker notes!",
    misconception: "Remember: the Ribbon is the tool belt with tabs, the Slide Pane is your design canvas, and the Notes Area is strictly private for the speaker!",
    sortItems: [
      { id: 'ribbon', label: 'Ribbon', icon: 'ribbon', correctBin: 'bin-ribbon' },
      { id: 'pane', label: 'Slide Pane', icon: 'pane', correctBin: 'bin-pane' },
      { id: 'notes', label: 'Notes Area', icon: 'notes', correctBin: 'bin-notes' },
    ],
    bins: [
      { id: 'bin-ribbon', label: 'Ribbon (Tool Belt) 🧰', color: '#3B82F6' },
      { id: 'bin-pane', label: 'Slide Pane (Canvas) 🎨', color: '#10B981' },
      { id: 'bin-notes', label: 'Notes Area (Speaker) 📝', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "What is the FIRST slide of a new presentation usually called?",
    answer: "Title slide",
    options: [
      "Title slide",
      "Content slide",
      "Blank slide"
    ],
    hint: "When you open a blank presentation, the very first slide has a title and subtitle placeholder. What is it called?",
    misconception: "The first slide of a new presentation is always the Title slide! It contains placeholders for your main heading and subtitle."
  },
  {
    type: 'sort',
    question: "Drag the steps to create a new presentation in the correct order!",
    answer: "sort",
    options: [],
    hint: "First open from Start menu, then choose Blank Presentation, then type your title in the placeholder!",
    misconception: "The correct sequence starts with opening PowerPoint from the Start menu, choosing Blank Presentation, and typing in the title placeholder!",
    sortItems: [
      { id: 'step1', label: '1. Open from Start menu', icon: 'start', correctBin: 'bin-order' },
      { id: 'step2', label: '2. Choose Blank Presentation', icon: 'blank', correctBin: 'bin-order' },
      { id: 'step3', label: '3. Type in Title placeholder', icon: 'type', correctBin: 'bin-order' },
    ],
    bins: [
      { id: 'bin-order', label: 'Creation Steps 📋', color: '#F59E0B' },
    ]
  },
  {
    type: 'identify',
    question: "How do you add a NEW SLIDE to a presentation in PowerPoint?",
    answer: "Click New Slide on the Home tab",
    options: [
      "Click New Slide on the Home tab",
      "Press the Escape key",
      "Close the presentation"
    ],
    hint: "Look at the Home tab on the Ribbon. There is a special button for adding a new page!",
    misconception: "You add a new slide by clicking the New Slide button on the Home tab (or pressing Ctrl+M)! Escape stops a slide show, and closing removes the file."
  },
  {
    type: 'sort',
    question: "Drag each action to its correct PowerPoint tool or tab!",
    answer: "sort",
    options: [],
    hint: "Adding pictures uses the Insert tab! Changing layouts uses the Home tab!",
    misconception: "Always match the action to the correct feature: pictures are inserted via the Insert tab, while new slides and layouts are managed on the Home tab!",
    sortItems: [
      { id: 'act-pic', label: 'Add picture', icon: 'picture', correctBin: 'bin-insert' },
      { id: 'act-slide', label: 'New slide button', icon: 'newslide', correctBin: 'bin-home' },
      { id: 'act-layout', label: 'Change layout', icon: 'layout', correctBin: 'bin-home' },
    ],
    bins: [
      { id: 'bin-home', label: 'Home Tab 🏠', color: '#3B82F6' },
      { id: 'bin-insert', label: 'Insert Tab 🖼️', color: '#10B981' },
    ]
  },
  {
    type: 'identify',
    question: "What key do you press to START a slide show from the first slide?",
    answer: "F5",
    options: [
      "F5",
      "Escape",
      "Enter"
    ],
    hint: "It is one of the function keys at the very top of your keyboard! It starts the show in full screen.",
    misconception: "Pressing the F5 key starts the slide show from the first slide in full screen! Escape stops the show, it does not start it."
  },
  {
    type: 'sort',
    question: "Drag each file action to its correct description!",
    answer: "sort",
    options: [],
    hint: "Saving stores with .pptx! F5 runs the slide show! Escape stops the show!",
    misconception: "Remember: saving stores your work with .pptx, F5 runs the slide show, and Escape only returns you to editing view without closing PowerPoint!",
    sortItems: [
      { id: 'act-save', label: 'Store file (.pptx)', icon: 'save', correctBin: 'bin-save' },
      { id: 'act-run', label: 'Run show (F5)', icon: 'show', correctBin: 'bin-run' },
      { id: 'act-esc', label: 'Stop show (Escape)', icon: 'escape', correctBin: 'bin-esc' },
    ],
    bins: [
      { id: 'bin-save', label: 'Saving 💾', color: '#6366F1' },
      { id: 'bin-run', label: 'Slide Show 🎬', color: '#EC4899' },
      { id: 'bin-esc', label: 'Exit Show ↩️', color: '#84CC16' },
    ]
  },
];

// ─── Presenter Priya Mascot ───────────────────────────────────

function PresenterPriya({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-4 py-2.5 shadow-xl max-w-[240px] border-2 border-orange-300"
          >
            <p className="text-xs font-bold text-gray-800 leading-tight">{speaking}</p>
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
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="80" height="95" viewBox="0 0 80 95">
          <defs>
            <linearGradient id="priya-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="priya-badge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="40" cy="28" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M22 26 C22 14, 58 14, 58 26 C58 32, 54 36, 50 34 C46 32, 40 36, 40 36 C40 36, 34 32, 30 34 C26 36, 22 32, 22 26 Z" fill="#78350F" />
          {/* Presentation Badge */}
          <rect x="31" y="48" width="18" height="12" rx="2" fill="url(#priya-badge)" stroke="#0369A1" strokeWidth="1" />
          <text x="40" y="57" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">PPT</text>
          {/* Body / Dress */}
          <path d="M25 60 L55 60 L62 88 L18 88 Z" fill="url(#priya-dress)" stroke="#9A3412" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="33" cy="26" r="2.5" fill="#1E293B" />
          <circle cx="47" cy="26" r="2.5" fill="#1E293B" />
          <circle cx="34" cy="25" r="1" fill="white" />
          <circle cx="48" cy="25" r="1" fill="white" />
          {/* Smile */}
          <path d="M35 34 Q40 39 45 34" stroke="#9A3412" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Pointer stick in hand */}
          <line x1="62" y1="70" x2="75" y2="45" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="75" cy="45" r="3" fill="#EF4444" />
          {/* Clicker in other hand */}
          <rect x="12" y="68" width="6" height="10" rx="2" fill="#334155" />
          <circle cx="15" cy="70" r="1.5" fill="#38BDF8" />
          {/* Feet */}
          <ellipse cx="30" cy="90" rx="5" ry="3" fill="#334155" />
          <ellipse cx="50" cy="90" rx="5" ry="3" fill="#334155" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

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

// ─── Presentation Hall Scene Background ───────────────────────

function PresentationScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="hall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="screen-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>
        {/* Hall background */}
        <rect width={width} height={height} fill="url(#hall-grad)" />
        {/* Projector Screen */}
        <rect x={width / 2 - 180} y={20} width={360} height={210} rx="8" fill="#0F172A" stroke="#64748B" strokeWidth="4" />
        <rect x={width / 2 - 172} y={28} width={344} height={194} rx="4" fill="url(#screen-grad)" />
        {/* Screen Content Mockup */}
        <rect x={width / 2 - 140} y={45} width={280} height={24} rx="4" fill="#38BDF8" opacity="0.3" />
        <rect x={width / 2 - 100} y={85} width={200} height={12} rx="3" fill="#64748B" opacity="0.3" />
        <rect x={width / 2 - 120} y={110} width={240} height={12} rx="3" fill="#64748B" opacity="0.2" />
        <rect x={width / 2 - 80} y={135} width={160} height={12} rx="3" fill="#64748B" opacity="0.2" />
        {/* Podium desk */}
        <path d={`M ${width / 2 - 60} ${height - 70} L ${width / 2 + 60} ${height - 70} L ${width / 2 + 50} ${height - 20} L ${width / 2 - 50} ${height - 20} Z`} fill="#475569" stroke="#334155" strokeWidth="2" />
        {/* Laptop on podium */}
        <rect x={width / 2 - 25} y={height - 90} width={50} height={20} rx="2" fill="#94A3B8" />
        <rect x={width / 2 - 20} y={height - 110} width={40} height={22} rx="2" fill="#E2E8F0" />
      </svg>
    </div>
  );
}

// ─── Custom SVG UI Icons for PowerPoint ────────────────────────

function SlideIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" rx="4" fill="white" stroke="#0284C7" strokeWidth="2" />
      <rect x="12" y="18" width="36" height="8" rx="2" fill="#38BDF8" />
      <rect x="12" y="32" width="24" height="4" rx="1" fill="#94A3B8" />
      <rect x="12" y="40" width="30" height="4" rx="1" fill="#94A3B8" />
    </svg>
  );
}

function RibbonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <rect x="10" y="15" width="40" height="10" rx="2" fill="#475569" />
      <rect x="12" y="18" width="8" height="4" rx="1" fill="#38BDF8" />
      <rect x="22" y="18" width="8" height="4" rx="1" fill="#E2E8F0" />
      <rect x="32" y="18" width="8" height="4" rx="1" fill="#E2E8F0" />
      <circle cx="16" cy="35" r="4" fill="#38BDF8" />
      <circle cx="30" cy="35" r="4" fill="#F43F5E" />
      <circle cx="44" cy="35" r="4" fill="#10B981" />
    </svg>
  );
}

function SlidePaneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="8" width="50" height="44" rx="4" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
      <line x1="20" y1="8" x2="20" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="8" y="12" width="10" height="8" rx="1" fill="#BAE6FD" />
      <rect x="8" y="24" width="10" height="8" rx="1" fill="#E2E8F0" />
      <rect x="8" y="36" width="10" height="8" rx="1" fill="#E2E8F0" />
      <rect x="25" y="16" width="26" height="28" rx="2" fill="white" stroke="#94A3B8" strokeWidth="1" />
    </svg>
  );
}

function NotesAreaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="40" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <line x1="14" y1="20" x2="46" y2="20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="28" x2="40" y2="28" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="36" x2="36" y2="36" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StartMenuIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
      <rect x="18" y="18" width="10" height="10" fill="white" />
      <rect x="32" y="18" width="10" height="10" fill="white" />
      <rect x="18" y="32" width="10" height="10" fill="white" />
      <rect x="32" y="32" width="10" height="10" fill="white" />
    </svg>
  );
}

function BlankSlideIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="12" width="48" height="36" rx="4" fill="white" stroke="#64748B" strokeWidth="2" />
      <text x="30" y="34" fontSize="10" fill="#94A3B8" textAnchor="middle" fontWeight="bold">BLANK</text>
    </svg>
  );
}

function TypeBoxIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="12" width="48" height="36" rx="4" fill="white" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
      <text x="30" y="33" fontSize="12" fill="#3B82F6" textAnchor="middle" fontWeight="bold">Title</text>
      <line x1="28" y1="38" x2="32" y2="38" stroke="#EF4444" strokeWidth="2" />
    </svg>
  );
}

function PictureInsertIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="40" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <circle cx="20" cy="24" r="5" fill="#38BDF8" />
      <path d="M12 40 L24 26 L34 38 L42 30 L50 40 Z" fill="#7DD3FC" />
    </svg>
  );
}

function NewSlideButtonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="30" height="22" rx="3" fill="white" stroke="#0284C7" strokeWidth="2" />
      <circle cx="42" cy="35" r="12" fill="#10B981" stroke="white" strokeWidth="2" />
      <path d="M42 29 L42 41 M36 35 L48 35" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function LayoutChangeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="44" height="40" rx="4" fill="white" stroke="#6366F1" strokeWidth="2" />
      <rect x="14" y="16" width="32" height="10" rx="2" fill="#C7D2FE" />
      <rect x="14" y="30" width="15" height="14" rx="2" fill="#E0E7FF" />
      <rect x="31" y="30" width="15" height="14" rx="2" fill="#E0E7FF" />
    </svg>
  );
}

function SaveFileIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="4" fill="#4338CA" stroke="#312E81" strokeWidth="2" />
      <rect x="16" y="10" width="22" height="14" fill="white" />
      <rect x="18" y="32" width="24" height="14" fill="#9CA3AF" />
      <rect x="34" y="12" width="10" height="8" fill="#E0E7FF" />
    </svg>
  );
}

function SlideShowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="12" width="48" height="32" rx="4" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
      <polygon points="24,20 24,36 38,28" fill="white" />
      <rect x="22" y="44" width="16" height="4" rx="1" fill="#9D174D" />
    </svg>
  );
}

function EscapeKeyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="15" width="44" height="30" rx="6" fill="#84CC16" stroke="#4D7C0F" strokeWidth="2" />
      <text x="30" y="34" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">ESC</text>
    </svg>
  );
}

// ─── Render Sort Icon Helper ───────────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'ribbon': return <RibbonIcon size={size} />;
    case 'pane': return <SlidePaneIcon size={size} />;
    case 'notes': return <NotesAreaIcon size={size} />;
    case 'start': return <StartMenuIcon size={size} />;
    case 'blank': return <BlankSlideIcon size={size} />;
    case 'type': return <TypeBoxIcon size={size} />;
    case 'picture': return <PictureInsertIcon size={size} />;
    case 'newslide': return <NewSlideButtonIcon size={size} />;
    case 'layout': return <LayoutChangeIcon size={size} />;
    case 'save': return <SaveFileIcon size={size} />;
    case 'show': return <SlideShowIcon size={size} />;
    case 'escape': return <EscapeKeyIcon size={size} />;
    default: return <SlideIcon size={size} />;
  }
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-orange-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1.5`} style={{ width: 120, height: 90 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color + '22',
        borderColor: color,
      }}
    >
      <span className="text-xs font-extrabold text-gray-900 text-center">{label}</span>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface PowerPointGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Component ───────────────────────────────────────────

export function PowerPointGame({ width = 720, height = 560, onComplete }: PowerPointGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 135, y: height - 165 };
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
      const msg = "Great job! You know PowerPoint well!";
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
      const compMsg = "Wonderful! You are a PowerPoint master!";
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

    // Hit test bins
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 210;
      const binY = 160;
      const binW = 190;
      const binH = 150;
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
        const msg = "Fantastic! You sorted the PowerPoint tools perfectly!";
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 select-none flex flex-col items-center justify-between" style={{ width, height }}>
      {/* Background scene */}
      <PresentationScene width={width} height={height} />

      {/* Mascot Priya */}
      <PresenterPriya mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full px-6 py-3 flex items-center justify-between bg-slate-900/80 backdrop-blur border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 text-white font-black px-3 py-1 rounded-xl shadow text-sm">
            PowerPoint 2016 🖥️
          </div>
          {screen === 'play' && <StarRow count={Math.floor(score / 15)} total={8} />}
        </div>
        <div className="flex items-center gap-2">
          {screen === 'teaching' ? (
            <span className="text-xs font-bold text-amber-300">Slide {slideIdx + 1} of {TEACHING_SLIDES.length}</span>
          ) : (
            <span className="text-xs font-bold text-cyan-300">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
          )}
          <button
            onClick={() => {
              audioManager.play('tap');
              speechManager.stop();
              if (screen === 'teaching') {
                setScreen('play');
              } else {
                setScreen('teaching');
                setSlideIdx(0);
              }
            }}
            className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow transition"
          >
            {screen === 'teaching' ? 'Skip to Play 🚀' : 'Review Slides 📚'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-4">
        {screen === 'teaching' ? (
          // TEACHING SCREEN
          <div className="flex flex-col items-center max-w-lg w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIdx}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`w-full bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} rounded-3xl p-6 shadow-2xl border-4 border-white/30 flex flex-col items-center text-center`}
              >
                <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
                <h2 className="text-2xl font-black text-white mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
                <p className="text-white text-base font-medium leading-relaxed drop-shadow-sm">{TEACHING_SLIDES[slideIdx].text}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between w-full mt-6 px-4">
              <button
                disabled={slideIdx === 0}
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIdx(prev => Math.max(0, prev - 1));
                }}
                className={`px-5 py-2.5 rounded-2xl font-bold text-white shadow-lg transition ${slideIdx === 0 ? 'bg-slate-700 opacity-40 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                ← Back
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-orange-400 scale-125' : 'bg-white/30'}`} />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                  }
                }}
                className="px-6 py-2.5 rounded-2xl font-bold text-white shadow-lg bg-emerald-500 hover:bg-emerald-600 transition"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Play! 🚀' : 'Next →'}
              </button>
            </div>
          </div>
        ) : (
          // PLAY SCREEN
          <div className="flex flex-col items-center max-w-xl w-full">
            {/* Question Card */}
            <div className="bg-slate-800/90 backdrop-blur border-2 border-slate-700 rounded-2xl p-4 w-full mb-4 shadow-xl text-center">
              <h3 className="text-lg font-black text-white">{currentChallenge.question}</h3>
            </div>

            {/* Challenge Content: Identify vs Sort */}
            {currentChallenge.type === 'identify' ? (
              <div className="flex flex-col gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrect = opt === currentChallenge.answer;
                  let btnBg = 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white';
                  if (selectedOpt) {
                    if (isCorrect) btnBg = 'bg-emerald-600 border-emerald-400 text-white';
                    else if (isSelected) btnBg = 'bg-rose-600 border-rose-400 text-white';
                    else btnBg = 'bg-slate-800 opacity-50 border-slate-700 text-white';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={!selectedOpt ? { scale: 1.02 } : {}}
                      whileTap={!selectedOpt ? { scale: 0.98 } : {}}
                      onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                      className={`p-3.5 rounded-2xl border-2 font-bold text-sm text-left shadow-lg transition flex items-center justify-between ${btnBg}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrect && <span className="text-xl">✅</span>}
                      {selectedOpt && isSelected && !isCorrect && <span className="text-xl">❌</span>}
                    </motion.button>
                  );
                })}

                {/* Next button after correct answer */}
                {selectedOpt && selectedOpt === currentChallenge.answer && (
                  <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex justify-center mt-2">
                    <button
                      onClick={advanceChallenge}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-2.5 rounded-2xl shadow-xl transition"
                    >
                      Continue 🚀
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              // SORT CHALLENGE
              <div className="relative w-full h-[280px]">
                {/* Bins */}
                {currentChallenge.bins && currentChallenge.bins.map((bin, idx) => {
                  const binW = currentChallenge.bins?.length === 1 ? 260 : 190;
                  const binH = 150;
                  const binX = currentChallenge.bins?.length === 1 ? (width - 260) / 2 - 40 : 25 + idx * 215;
                  const binY = 10;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={binX}
                      y={binY}
                      width={binW}
                      height={binH}
                      isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {/* Draggable Items */}
                {currentChallenge.sortItems && currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: height - 160 };
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

                {/* Next Button when all sorted */}
                {currentChallenge.sortItems && currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                  <div className="absolute bottom-2 right-4 z-30">
                    <button
                      onClick={advanceChallenge}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-6 py-2.5 rounded-2xl shadow-xl transition animate-bounce"
                    >
                      Continue 🚀
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hint Button */}
      {screen === 'play' && !selectedOpt && (
        <div className="absolute bottom-4 left-4 z-30">
          <button
            onClick={handleShowHint}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold px-3 py-2 rounded-xl shadow-lg flex items-center gap-1.5 transition"
          >
            💡 Need a Hint?
          </button>
        </div>
      )}

      {/* Feedback & Overlays */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
