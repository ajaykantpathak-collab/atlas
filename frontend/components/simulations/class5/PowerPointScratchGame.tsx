'use client';

/**
 * PowerPointScratchGame — Learn about PowerPoint Design & Scratch Programming
 *
 * CISCE Nodes: c5_cs_011 (PowerPoint templates, themes, and colour schemes),
 *              c5_cs_012 (PowerPoint objects, charts, and slide sorter view),
 *              c5_cs_013 (Concept of program and programming - algorithm to code),
 *              c5_cs_014 (Scratch interface - stage, sprite, blocks palette, scripts area),
 *              c5_cs_015 (Creating and moving sprites in Scratch - paint editor, saving sprites),
 *              c5_cs_016 (Scratch scripts - event blocks, motion, looks, and sound blocks)
 *
 * ELI5: "PowerPoint templates and themes make presentations look professional with coordinated
 *   colors and layouts. Scratch lets you program sprites by dragging blocks like puzzle pieces!
 *   An algorithm is your step-by-step recipe, and a program is that recipe in computer code.
 *   The stage is where your sprite acts, and event blocks start the show!"
 *
 * Story: "Help Coder Kavya lead an exciting tech adventure through PowerPoint slide design
 *   and Scratch visual programming! Learn templates, themes, charts, slide sorter view,
 *   algorithms, sprites, and scripts to become a coding star!"
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

// ─── Teaching Slides (EXACTLY 5 slides) ────────────────────────

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "PowerPoint Templates & Themes 🎨",
    text: "A PowerPoint template is a pre-designed slide layout with placeholders for text and images. A theme is a coordinated set of colors, fonts, and effects applied across all slides for a professional look!",
    emoji: "🎨",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "A PowerPoint template is a pre-designed slide layout with placeholders for text and images. A theme is a coordinated set of colors, fonts, and effects applied across all slides!"
  },
  {
    title: "Charts & Slide Sorter View 📊",
    text: "You can insert charts like bar charts and pie charts to display numbers visually. Slide Sorter view shows all your slide thumbnails at once, making it super easy to rearrange or delete slides!",
    emoji: "📊",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "You can insert charts like bar charts and pie charts to display numbers visually. Slide Sorter view shows all your slide thumbnails at once so you can rearrange them easily!"
  },
  {
    title: "From Algorithm to Code 🤖",
    text: "An algorithm is your human-friendly, step-by-step plan to solve a problem—like a recipe! When you write that plan in a programming language like Scratch, it becomes a program the computer runs.",
    emoji: "🤖",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "An algorithm is your step-by-step plan to solve a problem, like a recipe. When written in a programming language like Scratch, it becomes a program!"
  },
  {
    title: "The Scratch Interface 🎪",
    text: "Scratch is a visual programming language! The Stage is where your sprite performs, the Blocks palette holds color-coded command blocks, and the Scripts area is where you snap blocks together like LEGO bricks.",
    emoji: "🎪",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Scratch is a visual programming language. The Stage is where your sprite performs, the Blocks palette holds command blocks, and the Scripts area is where you snap them together!"
  },
  {
    title: "Sprites & Scratch Scripts ⚡",
    text: "Sprites are characters that act on the stage. You can draw them in the Paint Editor and save them! Scripts start with Event hat blocks (like green flag clicked) followed by motion, looks, and sound blocks.",
    emoji: "⚡",
    bgColor: "from-rose-500 to-pink-600",
    spoken: "Sprites are characters that act on the stage. You can draw them in the Paint Editor and save them. Scripts start with Event hat blocks followed by motion, looks, and sound blocks!"
  },
];

// ─── Challenges (EXACTLY 8 progressive challenges) ──────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is a PowerPoint template?",
    answer: "A pre-designed slide layout with placeholders for text and images",
    options: [
      "A pre-designed slide layout with placeholders for text and images",
      "A special type of animation effect",
      "A button used to print your slides"
    ],
    hint: "Think about what gives you a ready-made starting point with layouts and placeholders!",
    misconception: "A template is a pre-designed slide layout with structure and placeholders, not an animation or print button!"
  },
  {
    type: 'sort',
    question: "Drag each PowerPoint & programming feature to its correct description!",
    answer: "sort",
    options: [],
    hint: "Template = slide layout! Theme = colors and fonts! Algorithm = step-by-step plan!",
    misconception: "Remember: templates provide structure and layout, themes provide coordinated styles, and algorithms are step-by-step plans!",
    sortItems: [
      { id: 'template', label: 'Template', icon: 'template', correctBin: 'bin-ppt' },
      { id: 'theme', label: 'Theme', icon: 'theme', correctBin: 'bin-ppt' },
      { id: 'algo', label: 'Algorithm', icon: 'algorithm', correctBin: 'bin-code' },
    ],
    bins: [
      { id: 'bin-ppt', label: 'PowerPoint Design 🎨', color: '#3B82F6' },
      { id: 'bin-code', label: 'Programming Logic 🤖', color: '#10B981' },
    ]
  },
  {
    type: 'identify',
    question: "Which PowerPoint view shows all slides as thumbnails so you can rearrange them?",
    answer: "Slide Sorter view",
    options: [
      "Slide Sorter view",
      "Slide Show view",
      "Normal editing view"
    ],
    hint: "This view lets you sort and organize all your slides at once like cards on a table!",
    misconception: "Slide Sorter view shows all slide thumbnails for easy rearrangement, whereas Slide Show runs the presentation in full screen!"
  },
  {
    type: 'sort',
    question: "Drag each Scratch interface part to its correct function!",
    answer: "sort",
    options: [],
    hint: "Stage = where sprites perform! Blocks palette = toolbox of commands! Scripts area = where you build code!",
    misconception: "Remember: the Stage is the performance area, the Blocks palette is the toolbox of instructions, and the Scripts area is your workspace!",
    sortItems: [
      { id: 'stage', label: 'Stage', icon: 'stage', correctBin: 'bin-stage' },
      { id: 'blocks', label: 'Blocks Palette', icon: 'blocks', correctBin: 'bin-blocks' },
      { id: 'script', label: 'Scripts Area', icon: 'script', correctBin: 'bin-script' },
    ],
    bins: [
      { id: 'bin-stage', label: 'Stage (Performance) 🎭', color: '#F59E0B' },
      { id: 'bin-blocks', label: 'Blocks (Toolbox) 🧰', color: '#6366F1' },
      { id: 'bin-script', label: 'Scripts (Workspace) 🧩', color: '#EC4899' },
    ]
  },
  {
    type: 'identify',
    question: "What is the difference between an algorithm and a program?",
    answer: "An algorithm is a human-friendly plan; a program is that plan written in code",
    options: [
      "An algorithm is a human-friendly plan; a program is that plan written in code",
      "An algorithm and a program are exactly the same thing",
      "An algorithm is computer code; a program is a paper drawing"
    ],
    hint: "Think of an algorithm as a recipe and a program as the instructions followed by a computer!",
    misconception: "An algorithm is the human-friendly step-by-step plan, while a program is that exact plan written in a programming language for a computer!"
  },
  {
    type: 'sort',
    question: "Drag each Scratch block to its correct category!",
    answer: "sort",
    options: [],
    hint: "When green flag clicked = Event! Move 10 steps = Motion! Say Hello = Looks!",
    misconception: "Remember: Event blocks start scripts, Motion blocks move sprites, Looks blocks change appearance, and Sound blocks play audio!",
    sortItems: [
      { id: 'b1', label: 'When Flag Clicked', icon: 'event', correctBin: 'bin-event' },
      { id: 'b2', label: 'Move 10 Steps', icon: 'motion', correctBin: 'bin-motion' },
      { id: 'b3', label: 'Say Hello!', icon: 'looks', correctBin: 'bin-looks' },
    ],
    bins: [
      { id: 'bin-event', label: 'Event Blocks 🚩', color: '#F59E0B' },
      { id: 'bin-motion', label: 'Motion Blocks 🏃', color: '#3B82F6' },
      { id: 'bin-looks', label: 'Looks Blocks 💬', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "Why must a Scratch script almost always start with an Event block?",
    answer: "To give the computer a starting signal or trigger when to run",
    options: [
      "To give the computer a starting signal or trigger when to run",
      "To make the sprite change its color automatically",
      "To save the project file to the computer"
    ],
    hint: "Think of a starter whistle in a running race! What starts the script?",
    misconception: "An event block acts like a starter whistle; without it, the computer has no trigger signal to know when to run the script!"
  },
  {
    type: 'sort',
    question: "Drag each action to its correct Scratch tool or feature!",
    answer: "sort",
    options: [],
    hint: "Paint editor = draw new sprites! Save sprite = local file for reuse! Slide sorter = rearrange slides!",
    misconception: "Remember: the Paint Editor draws new sprites, saving a sprite lets you reuse it in other projects, and Slide Sorter rearranges presentation slides!",
    sortItems: [
      { id: 's-paint', label: 'Paint Editor', icon: 'paint', correctBin: 'bin-draw' },
      { id: 's-save', label: 'Save Sprite', icon: 'save', correctBin: 'bin-file' },
      { id: 's-sort', label: 'Slide Sorter', icon: 'sorter', correctBin: 'bin-ppt-tool' },
    ],
    bins: [
      { id: 'bin-draw', label: 'Drawing Sprites 🖌️', color: '#10B981' },
      { id: 'bin-file', label: 'Reusing Sprites 💾', color: '#6366F1' },
      { id: 'bin-ppt-tool', label: 'Presentation Tool 📊', color: '#EC4899' },
    ]
  },
];

// ─── Coder Kavya Mascot Component ─────────────────────────────

function CoderKavya({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-4 py-2.5 shadow-xl max-w-[240px] border-2 border-indigo-300"
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
        <svg width="84" height="100" viewBox="0 0 84 100">
          <defs>
            <linearGradient id="kavya-hoodie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4338CA" />
            </linearGradient>
            <linearGradient id="scratch-badge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF7900" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="42" cy="28" r="18" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
          {/* Hair / Hood */}
          <path d="M22 28 C22 14, 62 14, 62 28 C62 34, 58 38, 52 m-20 0 C26 38, 22 34, 22 28 Z" fill="#1E293B" />
          <path d="M22 26 C22 12, 62 12, 62 26 C62 36, 56 42, 42 42 C28 42, 22 36, 22 26 Z" fill="#334155" />
          {/* Scratch Cat Badge on Shirt */}
          <circle cx="42" cy="56" r="8" fill="url(#scratch-badge)" stroke="#B45309" strokeWidth="1" />
          <text x="42" y="59" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">🐾</text>
          {/* Hoodie / Body */}
          <path d="M26 62 L58 62 L64 92 L20 92 Z" fill="url(#kavya-hoodie)" stroke="#312E81" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="35" cy="26" r="2.5" fill="#1E293B" />
          <circle cx="49" cy="26" r="2.5" fill="#1E293B" />
          <circle cx="36" cy="25" r="1" fill="white" />
          <circle cx="50" cy="25" r="1" fill="white" />
          {/* Smile */}
          <path d="M37 34 Q42 39 47 34" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Laptop / Remote in Hand */}
          <rect x="58" y="70" width="18" height="12" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
          <rect x="62" y="65" width="10" height="6" rx="1" fill="#38BDF8" />
          {/* Feet */}
          <ellipse cx="32" cy="95" rx="6" ry="3" fill="#1E293B" />
          <ellipse cx="52" cy="95" rx="6" ry="3" fill="#1E293B" />
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

// ─── Computer Lab Scene Background (SVG with Gradients) ───────

function ComputerLabScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="lab-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        {/* Wall background */}
        <rect width={width} height={height} fill="url(#lab-wall)" />
        {/* Window with Sky */}
        <rect x={width - 160} y={20} width={130} height={150} rx="8" fill="url(#lab-sky)" stroke="#475569" strokeWidth="6" />
        <line x1={width - 95} y1={20} x2={width - 95} y2={170} stroke="#475569" strokeWidth="4" />
        <line x1={width - 160} y1={95} x2={width - 30} y2={95} stroke="#475569" strokeWidth="4" />
        {/* Computer Screen Graphic */}
        <rect x={40} y={30} width={180} height={120} rx="6" fill="#0F172A" stroke="#64748B" strokeWidth="4" />
        <rect x={48} y={38} width={164} height={100} rx="3" fill="#F8FAFC" />
        {/* PowerPoint Slide Thumbnails */}
        <rect x={56} y={46} width={36} height={26} rx="2" fill="#BAE6FD" />
        <rect x={56} y={78} width={36} height={26} rx="2" fill="#E2E8F0" />
        <rect x={100} y={46} width={104} height={84} rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1" />
        <rect x={110} y={56} width={60} height={10} rx="2" fill="#38BDF8" />
        <rect x={110} y={72} width={80} height={6} rx="1" fill="#94A3B8" />
        {/* Stand */}
        <path d={`M 115 150 L 145 150 L 155 165 L 105 165 Z`} fill="#64748B" />
        {/* Lab Floor */}
        <rect x={0} y={height - 60} width={width} height={60} fill="#334155" />
        <line x1="0" y1={height - 60} x2={width} y2={height - 60} stroke="#475569" strokeWidth="3" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Icon Components (12+ Topic Objects) ─────────────

function TemplateIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="4" fill="white" stroke="#3B82F6" strokeWidth="2" />
      <rect x="12" y="14" width="36" height="12" rx="2" fill="#BFDBFE" />
      <rect x="12" y="30" width="20" height="16" rx="2" fill="#93C5FD" />
      <rect x="34" y="30" width="14" height="16" rx="2" fill="#60A5FA" />
    </svg>
  );
}

function ThemeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="4" fill="#F3E8FF" stroke="#9333EA" strokeWidth="2" />
      <circle cx="20" cy="22" r="6" fill="#A855F7" />
      <circle cx="40" cy="22" r="6" fill="#EC4899" />
      <rect x="14" y="34" width="32" height="10" rx="2" fill="#C084FC" />
    </svg>
  );
}

function AlgorithmIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="8" width="30" height="12" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <path d="M30 20 L30 28" stroke="#D97706" strokeWidth="2" markerEnd="url(#arrow)" />
      <rect x="12" y="28" width="36" height="12" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M30 40 L30 46" stroke="#0284C7" strokeWidth="2" />
      <circle cx="30" cy="50" r="4" fill="#10B981" />
    </svg>
  );
}

function StageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="40" rx="4" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="2" />
      <path d="M6 10 L18 22 L18 38 L6 50 Z" fill="#FDE68A" />
      <path d="M54 10 L42 22 L42 38 L54 50 Z" fill="#FDE68A" />
      <circle cx="30" cy="30" r="8" fill="#F97316" />
    </svg>
  );
}

function BlocksPaletteIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <rect x="14" y="14" width="32" height="8" rx="2" fill="#3B82F6" />
      <rect x="14" y="26" width="32" height="8" rx="2" fill="#8B5CF6" />
      <rect x="14" y="38" width="32" height="8" rx="2" fill="#EC4899" />
    </svg>
  );
}

function ScriptsAreaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="4" fill="white" stroke="#EC4899" strokeWidth="2" />
      <path d="M16 16 L44 16 L44 26 L16 26 Z" fill="#F59E0B" rx="2" />
      <path d="M16 30 L40 30 L40 40 L16 40 Z" fill="#3B82F6" rx="2" />
    </svg>
  );
}

function EventBlockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M8 24 C8 18, 16 14, 30 14 C44 14, 52 18, 52 24 L52 42 C52 46, 48 50, 44 50 L16 50 C12 50, 8 46, 8 42 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <text x="30" y="36" fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">FLAG</text>
    </svg>
  );
}

function MotionBlockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="14" width="44" height="32" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <text x="30" y="33" fontSize="9" fill="white" fontWeight="bold" textAnchor="middle">MOVE 10</text>
    </svg>
  );
}

function PaintIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="6" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M20 38 L38 20 L42 24 L24 42 Z" fill="#FDE68A" />
      <circle cx="42" cy="20" r="5" fill="#EF4444" />
    </svg>
  );
}

function SaveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="6" fill="#6366F1" stroke="#4338CA" strokeWidth="2" />
      <rect x="18" y="14" width="24" height="14" fill="white" />
      <rect x="20" y="32" width="20" height="14" fill="#CBD5E1" />
    </svg>
  );
}

function SorterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="10" width="20" height="16" rx="2" fill="#38BDF8" />
      <rect x="32" y="10" width="20" height="16" rx="2" fill="#93C5FD" />
      <rect x="8" y="32" width="20" height="16" rx="2" fill="#93C5FD" />
      <rect x="32" y="32" width="20" height="16" rx="2" fill="#38BDF8" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'template': return <TemplateIcon size={size} />;
    case 'theme': return <ThemeIcon size={size} />;
    case 'algorithm': return <AlgorithmIcon size={size} />;
    case 'stage': return <StageIcon size={size} />;
    case 'blocks': return <BlocksPaletteIcon size={size} />;
    case 'script': return <ScriptsAreaIcon size={size} />;
    case 'event': return <EventBlockIcon size={size} />;
    case 'motion': return <MotionBlockIcon size={size} />;
    case 'looks': return <SaveIcon size={size} />;
    case 'paint': return <PaintIcon size={size} />;
    case 'save': return <SaveIcon size={size} />;
    case 'sorter': return <SorterIcon size={size} />;
    default: return <TemplateIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

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
      <div
        className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white p-2 cursor-grab active:cursor-grabbing"
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(icon, 38)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface PowerPointScratchGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Game Component ──────────────────────────────────────

export function PowerPointScratchGame({ width = 720, height = 560, onComplete }: PowerPointScratchGameProps) {
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

  const handleShowHint = useCallback(() => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  }, [currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [handleShowHint]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer, currentChallenge]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 125, y: height - 150 };
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
      const compMsg = "Wonderful! You are a brilliant PowerPoint & Scratch star!";
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

    // Check bin drop zones
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 210;
      const binY = 160;
      if (x >= binX - 20 && x <= binX + 180 && y >= binY - 20 && y <= binY + 130) {
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
      className="relative select-none overflow-hidden font-sans bg-slate-900 rounded-3xl shadow-2xl border-4 border-indigo-500"
      style={{ width, height }}
    >
      {/* Background Scene */}
      <ComputerLabScene width={width} height={height} />

      {/* Coder Kavya Mascot */}
      <CoderKavya mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && (
        <SuccessBanner message={successMsg} onComplete={() => advanceChallenge()} />
      )}
      {hintMsg && (
        <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />
      )}
      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-indigo-200">
        <span className="text-xl">🏆</span>
        <div>
          <p className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Score</p>
          <p className="text-lg font-extrabold text-gray-800">{score}</p>
        </div>
        <div className="h-6 w-[1px] bg-gray-300 mx-1" />
        <StarRow count={Math.min(5, Math.floor(score / 20))} total={5} />
      </div>

      {/* ─── TEACHING SCREEN ──────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8 bg-slate-900/80 backdrop-blur-sm">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={`max-w-xl w-full rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed bg-black/20 p-4 rounded-2xl backdrop-blur-sm mb-6">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 font-bold text-sm disabled:opacity-30 transition-all"
              >
                Previous
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    audioManager.play('chime');
                    setScreen('play');
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-black text-sm shadow-lg transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Play! 🚀" : "Next ➡️"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── PLAY SCREEN ──────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col pt-20 px-8 pb-6 justify-between">
          {/* Question Header */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-indigo-200 flex items-center justify-between max-w-2xl mx-auto w-full">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <h3 className="text-base font-extrabold text-gray-800 mt-1">{currentChallenge.question}</h3>
            </div>
            <button
              onClick={handleShowHint}
              className="ml-2 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
            >
              💡 Hint
            </button>
          </div>

          {/* Challenge Content */}
          <div className="flex-1 flex flex-col items-center justify-center relative my-4">
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 max-w-xl w-full">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnColor = "bg-white hover:bg-indigo-50 text-gray-800 border-indigo-200";
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnColor = "bg-emerald-500 text-white border-emerald-600 shadow-lg scale-[1.02]";
                    else if (isSelected) btnColor = "bg-rose-500 text-white border-rose-600";
                    else btnColor = "bg-gray-100 text-gray-400 border-gray-200 opacity-50";
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={(e) => !selectedOpt && handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-2xl border-2 font-bold text-sm shadow-md transition-all text-left flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt}</span>
                      <span className="text-xs px-2 py-1 rounded-lg bg-black/5 font-mono">{String.fromCharCode(65 + idx)}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="w-full flex flex-col items-center">
                {/* Bins */}
                <div className="flex gap-4 mb-6">
                  {currentChallenge.bins.map((bin) => (
                    <div
                      key={bin.id}
                      className="w-48 h-28 rounded-2xl border-4 border-dashed border-indigo-300 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center p-3 shadow-lg"
                      style={{ borderColor: bin.color }}
                    >
                      <span className="text-xs font-black text-center" style={{ color: bin.color }}>{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable Items */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                  {currentChallenge.sortItems.map((item) => {
                    const pos = itemPositions[item.id] || { x: 0, y: 0 };
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
              </div>
            )}
          </div>

          {/* Bottom Navigation for Identify Questions */}
          {currentChallenge.type === 'identify' && selectedOpt && (
            <div className="flex justify-center pb-2">
              <button
                onClick={advanceChallenge}
                className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-xl transition-all flex items-center gap-2"
              >
                Continue 🚀
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
