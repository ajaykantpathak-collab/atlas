'use client';

/**
 * WordAdvancedGame — Learn about Word advanced formatting (format painter, superscript,
 * subscript, shadow), headers, footers, page setup, margins, orientation, shapes, WordArt,
 * pictures, watermarks, borders, and cover pages in Microsoft Word!
 *
 * CISCE Nodes: c5_cs_008, c5_cs_009, c5_cs_010
 *
 * ELI5: "Advanced Word formatting is like decorating a professional book! Format Painter
 *   copies magic styles from one heading to another. Superscript floats numbers up for
 *   math like x², and subscript sinks them down for science like H₂O. Headers and footers
 *   repeat on every page, while shapes, WordArt, watermarks, and cover pages make your
 *   documents look amazing!"
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

// ─── Teaching Slides (Exactly 5) ──────────────────────────────

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Advanced Formatting & Format Painter 🖌️",
    text: "The Format Painter is like a magic styling photocopier! It copies font style, size, and color from one heading and applies it instantly to another without copying the words.",
    emoji: "🖌️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "The Format Painter is like a magic styling photocopier! It copies font style and color from one heading and applies it to another instantly."
  },
  {
    title: "Superscript & Subscript 🔣",
    text: "Superscript raises text slightly above the baseline for math exponents like x²! Subscript lowers text below the baseline for chemical formulas like H₂O.",
    emoji: "🔣",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Superscript raises text above the line for math like x squared! Subscript lowers text below the line for chemistry like H2O."
  },
  {
    title: "Headers, Footers & Page Setup 📄",
    text: "Headers appear at the top margin of every page (like project titles), and footers at the bottom (like page numbers). Page setup controls margins, orientation, and A4 paper size!",
    emoji: "📄",
    bgColor: "from-teal-500 to-emerald-600",
    spoken: "Headers appear at the top margin of every page, and footers at the bottom. Page setup controls margins, orientation, and paper size."
  },
  {
    title: "Orientation & Breaks 📐",
    text: "Portrait orientation stands tall for stories and essays, while landscape orientation lies wide for charts and tables! Page breaks force content to start on a brand new sheet.",
    emoji: "📐",
    bgColor: "from-emerald-500 to-green-600",
    spoken: "Portrait orientation stands tall, while landscape lies wide for charts! Page breaks force content to start on a brand new sheet."
  },
  {
    title: "WordArt, Watermarks & Cover Pages ✨",
    text: "WordArt gives titles 3D and shadow effects. Watermarks place faint text like DRAFT behind your content. Borders frame paragraphs, and cover pages introduce your project beautifully!",
    emoji: "✨",
    bgColor: "from-gold-500 to-purple-600",
    spoken: "WordArt gives titles 3D and shadow effects. Watermarks place faint text like DRAFT behind your content. Cover pages introduce your project!"
  },
];

// ─── Challenges (Exactly 8) ───────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "Which tool copies formatting from one piece of text and applies it to another without copying the words?",
    answer: "Format Painter",
    options: [
      "Format Painter",
      "Spell Check",
      "WordArt"
    ],
    hint: "Look for the paintbrush icon on the Home ribbon! It copies the look, not the text.",
    misconception: "Format Painter copies ONLY formatting (color, size, style), not the text content itself! Copy-paste copies the words."
  },
  {
    type: 'sort',
    question: "Drag each advanced formatting tool to its correct function description!",
    answer: "sort",
    options: [],
    hint: "Match Format Painter, Superscript, Subscript, and Shadow to their exact jobs!",
    misconception: "Superscript raises text above the line (x²), while subscript lowers text below the line (H₂O). They are not interchangeable!",
    sortItems: [
      { id: 'fp', label: 'Format Painter', icon: 'format-painter', correctBin: 'bin-fp' },
      { id: 'sup', label: 'Superscript', icon: 'superscript', correctBin: 'bin-sup' },
      { id: 'sub', label: 'Subscript', icon: 'subscript', correctBin: 'bin-sub' },
      { id: 'shd', label: 'Shadow Effect', icon: 'shadow', correctBin: 'bin-shd' },
    ],
    bins: [
      { id: 'bin-fp', label: 'Copy Look', color: '#3B82F6' },
      { id: 'bin-sup', label: 'Raise Text (x²)', color: '#10B981' },
      { id: 'bin-sub', label: 'Lower Text (H₂O)', color: '#F59E0B' },
      { id: 'bin-shd', label: 'Text Outline', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "Where does a HEADER appear in a Microsoft Word document?",
    answer: "At the top margin of every page automatically",
    options: [
      "At the top margin of every page automatically",
      "Only on the first page as a title",
      "At the very bottom right corner"
    ],
    hint: "Think of the top margin area where repeated titles or project names show up on every page.",
    misconception: "A header is placed at the top margin of every page automatically. You do not need to type it manually on each page!"
  },
  {
    type: 'sort',
    question: "Drag each page setup or layout feature to its correct description!",
    answer: "sort",
    options: [],
    hint: "Match Header, Footer, Margins, and Page Break to what they control!",
    misconception: "Margins are the blank spaces around the page edges, whereas headers and footers are the top and bottom repeat areas.",
    sortItems: [
      { id: 'hdr', label: 'Header', icon: 'header-footer', correctBin: 'bin-hdr' },
      { id: 'ftr', label: 'Footer', icon: 'header-footer', correctBin: 'bin-ftr' },
      { id: 'mar', label: 'Margins', icon: 'page-setup', correctBin: 'bin-mar' },
      { id: 'brk', label: 'Page Break', icon: 'page-setup', correctBin: 'bin-brk' },
    ],
    bins: [
      { id: 'bin-hdr', label: 'Top Margin Text', color: '#3B82F6' },
      { id: 'bin-ftr', label: 'Bottom Margin (Page #)', color: '#10B981' },
      { id: 'bin-mar', label: 'Blank Page Edges', color: '#F59E0B' },
      { id: 'bin-brk', label: 'New Sheet Force', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "What is WORDART used for in a word processor?",
    answer: "Creating decorative, stylized titles with 3D and shadow effects",
    options: [
      "Creating decorative, stylized titles with 3D and shadow effects",
      "Checking grammar and spelling errors",
      "Setting document page margins"
    ],
    hint: "Think of big, colorful, curved title letters that stand out on a poster!",
    misconception: "WordArt is decorative text with special visual effects used for titles. It is not the same as standard body text formatting."
  },
  {
    type: 'sort',
    question: "Drag each visual document element to its correct category!",
    answer: "sort",
    options: [],
    hint: "Match WordArt, Watermark, Shape, and Cover Page to their roles!",
    misconception: "Watermark is a faint background image or text like DRAFT behind the content, whereas WordArt is bright text in front.",
    sortItems: [
      { id: 'wa', label: 'WordArt', icon: 'wordart', correctBin: 'bin-wa' },
      { id: 'wm', label: 'Watermark', icon: 'watermark', correctBin: 'bin-wm' },
      { id: 'shp', label: 'Word Shape', icon: 'shape', correctBin: 'bin-shp' },
      { id: 'cp', label: 'Cover Page', icon: 'cover-page', correctBin: 'bin-cp' },
    ],
    bins: [
      { id: 'bin-wa', label: 'Stylized Title', color: '#3B82F6' },
      { id: 'bin-wm', label: 'Faint Background', color: '#64748B' },
      { id: 'bin-shp', label: 'Arrow / Rectangle', color: '#10B981' },
      { id: 'bin-cp', label: 'First Title Page', color: '#8B5CF6' },
    ]
  },
  {
    type: 'identify',
    question: "Which page orientation makes the page WIDER than it is tall, perfect for wide tables and charts?",
    answer: "Landscape",
    options: [
      "Landscape",
      "Portrait",
      "A4 Standard"
    ],
    hint: "Think of a sunset landscape photo that stretches wide across the screen!",
    misconception: "Landscape orientation is wider than it is tall. Portrait orientation stands tall for normal essays and letters."
  },
  {
    type: 'sort',
    question: "Drag each document layout element to its exact location or purpose!",
    answer: "sort",
    options: [],
    hint: "Match Cover Page, Page Border, Watermark, and Page Break!",
    misconception: "A page border frames the edge of the page, while a watermark sits invisibly behind the text.",
    sortItems: [
      { id: 'cp2', label: 'Cover Page', icon: 'cover-page', correctBin: 'bin-cp2' },
      { id: 'pb2', label: 'Page Border', icon: 'border', correctBin: 'bin-pb2' },
      { id: 'wm2', label: 'Watermark', icon: 'watermark', correctBin: 'bin-wm2' },
      { id: 'brk2', label: 'Page Break', icon: 'page-setup', correctBin: 'bin-brk2' },
    ],
    bins: [
      { id: 'bin-cp2', label: 'First Page Title', color: '#8B5CF6' },
      { id: 'bin-pb2', label: 'Decorative Frame', color: '#3B82F6' },
      { id: 'bin-wm2', label: 'Behind Content', color: '#64748B' },
      { id: 'bin-brk2', label: 'Starts New Page', color: '#EF4444' },
    ]
  },
];

// ─── Custom SVG Scene Background ──────────────────────────────

function StudioSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="studio-desk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="word-doc-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>

        {/* Studio Wall */}
        <rect width={width} height={height * 0.65} fill="url(#studio-sky)" />

        {/* Window */}
        <rect x={width - 160} y={25} width={110} height={130} rx={10} fill="#E2E8F0" stroke="#0284C7" strokeWidth="4" />
        <line x1={width - 105} y1={25} x2={width - 105} y2={155} stroke="#0284C7" strokeWidth="3" />
        <line x1={width - 160} y1={90} x2={width - 50} y2={90} stroke="#0284C7" strokeWidth="3" />

        {/* Wooden Desk Surface */}
        <rect x={0} y={height * 0.62} width={width} height={height * 0.38} fill="url(#studio-desk)" />
        <rect x={0} y={height * 0.60} width={width} height={14} fill="#D97706" opacity="0.6" />

        {/* Word Document Mockup on Desk */}
        <rect x={width / 2 - 95} y={height * 0.32} width={190} height={135} rx={6} fill="#334155" stroke="#1E293B" strokeWidth="4" />
        <rect x={width / 2 - 87} y={height * 0.36} width={174} height={115} rx={4} fill="url(#word-doc-grad)" />

        {/* Document Title Header */}
        <rect x={width / 2 - 70} y={height * 0.40} width={140} height={12} rx={2} fill="#3B82F6" />
        <line x1={width / 2 - 70} y1={height * 0.55} x2={width / 2 + 60} y2={height * 0.55} stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
        <line x1={width / 2 - 70} y1={height * 0.63} x2={width / 2 + 40} y2={height * 0.63} stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />

        {/* Stand */}
        <rect x={width / 2 - 16} y={height * 0.68} width={32} height={16} fill="#475569" />
        <rect x={width / 2 - 40} y={height * 0.71} width={80} height={6} rx={3} fill="#1E293B" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Mascot: Designer Dev ──────────────────────────

function DesignerDev({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-4 z-20 flex flex-col items-center">
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
            ? { rotate: [0, -14, 14, -14, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 5, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="80" height="95" viewBox="0 0 80 95">
          <defs>
            <linearGradient id="dev-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#3730A3" />
            </linearGradient>
            <linearGradient id="dev-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FED7AA" />
            </linearGradient>
          </defs>

          {/* Body */}
          <path d="M22 52 L40 57 L58 52 L63 88 C63 91, 57 94, 52 94 L28 94 C23 94, 17 91, 17 88 Z" fill="url(#dev-shirt)" stroke="#312E81" strokeWidth="1.5" />

          {/* Formatting Ribbon Badge */}
          <rect x="32" y="60" width="16" height="12" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="35" y1="64" x2="45" y2="64" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="35" y1="68" x2="41" y2="68" stroke="white" strokeWidth="2" strokeLinecap="round" />

          {/* Head */}
          <circle cx="40" cy="33" r="21" fill="url(#dev-skin)" stroke="#C2410C" strokeWidth="1.5" />

          {/* Hair */}
          <path d="M19 32 C19 16, 30 13, 40 13 C50 13, 61 16, 61 32 C58 23, 52 19, 40 19 C28 19, 22 23, 19 32 Z" fill="#0F172A" />

          {/* Stylish Designer Glasses */}
          <rect x="27" y="27" width="11" height="8" rx="2" fill="none" stroke="#0F172A" strokeWidth="1.5" />
          <rect x="42" y="27" width="11" height="8" rx="2" fill="none" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="38" y1="31" x2="42" y2="31" stroke="#0F172A" strokeWidth="1.5" />

          {/* Eyes */}
          <circle cx="32.5" cy="31" r="2" fill="#0F172A" />
          <circle cx="47.5" cy="31" r="2" fill="#0F172A" />

          {/* Smile */}
          <path d="M34 42 Q40 47 46 42" stroke="#9A3412" strokeWidth="2" fill="none" strokeLinecap="round" />
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

function FormatPainterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="14" y="28" width="32" height="18" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M22 28 C22 18, 38 18, 38 28 Z" fill="#F59E0B" />
      <path d="M18 46 L24 54 L36 54 L42 46 Z" fill="#64748B" />
      <circle cx="46" cy="18" r="6" fill="#10B981" />
      <path d="M44 18 L46 20 L49 15" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SuperscriptIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <text x="14" y="42" fontSize="28" fontWeight="bold" fill="#1E293B">x</text>
      <text x="36" y="24" fontSize="18" fontWeight="bold" fill="#EF4444">2</text>
    </svg>
  );
}

function SubscriptIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <text x="12" y="36" fontSize="24" fontWeight="bold" fill="#1E293B">H</text>
      <text x="32" y="46" fontSize="16" fontWeight="bold" fill="#3B82F6">2</text>
      <text x="44" y="36" fontSize="24" fontWeight="bold" fill="#1E293B">O</text>
    </svg>
  );
}

function ShadowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <text x="18" y="38" fontSize="26" fontWeight="bold" fill="#94A3B8">Aa</text>
      <text x="15" y="35" fontSize="26" fontWeight="bold" fill="#4F46E5">Aa</text>
    </svg>
  );
}

function HeaderFooterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" rx="3" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <rect x="12" y="10" width="36" height="8" fill="#3B82F6" rx="2" />
      <rect x="12" y="42" width="36" height="8" fill="#10B981" rx="2" />
    </svg>
  );
}

function PageSetupIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="12" width="40" height="36" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <line x1="18" y1="20" x2="42" y2="20" stroke="#92400E" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="18" y1="40" x2="42" y2="40" stroke="#92400E" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="18" y1="20" x2="18" y2="40" stroke="#92400E" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="42" y1="20" x2="42" y2="40" stroke="#92400E" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}

function WordArtIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <text x="10" y="38" fontSize="28" fontWeight="black" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" transform="skewX(-10)">W</text>
      <text x="32" y="38" fontSize="28" fontWeight="black" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="1.5" transform="skewX(-10)">A</text>
    </svg>
  );
}

function WatermarkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" rx="3" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="16" y1="20" x2="44" y2="20" stroke="#E2E8F0" strokeWidth="3" />
      <line x1="16" y1="30" x2="44" y2="30" stroke="#E2E8F0" strokeWidth="3" />
      <text x="14" y="38" fontSize="14" fontWeight="bold" fill="#94A3B8" transform="rotate(-20 30 30)">DRAFT</text>
    </svg>
  );
}

function ShapeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="22" cy="22" r="10" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <rect x="28" y="28" width="22" height="22" rx="3" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
    </svg>
  );
}

function CoverPageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2" />
      <rect x="16" y="18" width="28" height="10" rx="2" fill="#7C3AED" />
      <line x1="16" y1="36" x2="36" y2="36" stroke="#5B21B6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BorderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="4" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" strokeDasharray="4 2" />
      <line x1="16" y1="22" x2="44" y2="22" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
      <line x1="16" y1="34" x2="36" y2="34" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'format-painter': return <FormatPainterIcon size={size} />;
    case 'superscript': return <SuperscriptIcon size={size} />;
    case 'subscript': return <SubscriptIcon size={size} />;
    case 'shadow': return <ShadowIcon size={size} />;
    case 'header-footer': return <HeaderFooterIcon size={size} />;
    case 'page-setup': return <PageSetupIcon size={size} />;
    case 'wordart': return <WordArtIcon size={size} />;
    case 'watermark': return <WatermarkIcon size={size} />;
    case 'shape': return <ShapeIcon size={size} />;
    case 'cover-page': return <CoverPageIcon size={size} />;
    case 'border': return <BorderIcon size={size} />;
    default: return <FormatPainterIcon size={size} />;
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
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-gold-300 bg-white/95 backdrop-blur cursor-grab active:cursor-grabbing p-1" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Props & Component Export ─────────────────────────────────

export interface WordAdvancedGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function WordAdvancedGame({ width = 720, height = 560, onComplete }: WordAdvancedGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 140, y: height - 155 };
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
      const compMsg = "Fantastic! You are a master Word document designer!";
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

    // Hit test against bin elements in DOM
    const binElements = document.querySelectorAll('[data-bin-id]');
    let droppedBinId: string | null = null;

    binElements.forEach(binEl => {
      const rect = binEl.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        droppedBinId = binEl.getAttribute('data-bin-id');
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
        const msg = "Fantastic sorting! All correct!";
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
    <div className="relative overflow-hidden bg-slate-900 select-none flex flex-col items-center justify-between font-sans" style={{ width, height }}>
      <StudioSceneBackground width={width} height={height} />
      <DesignerDev mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 py-3 bg-slate-900/70 backdrop-blur border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-white tracking-wide">Word Studio Pro 📝</span>
          <StarRow count={Math.min(5, Math.floor(score / 25))} total={5} />
        </div>
        <div className="flex items-center gap-4 text-white font-bold text-sm">
          <span>Score: {score}</span>
          {screen === 'play' && (
            <span className="bg-gold-600 px-3 py-1 rounded-full text-xs">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-4">
        {screen === 'teaching' ? (
          <motion.div
            key="teaching"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-xl w-full border-4 border-gold-300 flex flex-col items-center text-center"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-3xl shadow-lg mb-3`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-xl font-black text-gold-950 mb-2">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 px-2">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-slate-200">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === slideIdx ? 'bg-gold-600' : 'bg-slate-300'}`} />
                ))}
              </div>
              <div className="flex gap-2">
                {slideIdx > 0 && (
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setSlideIdx(prev => prev - 1);
                    }}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs transition-all"
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
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-700 text-white font-bold rounded-xl text-xs shadow-lg transition-all"
                >
                  {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Designing!' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`challenge-${challengeIdx}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl flex flex-col items-center"
          >
            {/* Question Card */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl border-2 border-gold-200 w-full mb-4 text-center">
              <span className="text-xs font-bold text-gold-600 uppercase tracking-wider">Document Challenge</span>
              <h3 className="text-base font-black text-slate-900 mt-1 mb-2">{currentChallenge.question}</h3>
              <button
                onClick={handleShowHint}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-full transition-all"
              >
                💡 Need a Hint?
              </button>
            </div>

            {/* Challenge Content: Identify vs Sort */}
            {currentChallenge.type === 'identify' ? (
              <div className="grid grid-cols-1 gap-2.5 w-full max-w-lg">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrect = opt === currentChallenge.answer;
                  let btnColor = 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200';
                  if (selectedOpt) {
                    if (isCorrect) btnColor = 'bg-emerald-500 text-white border-emerald-600';
                    else if (isSelected) btnColor = 'bg-rose-500 text-white border-rose-600';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => !selectedOpt && handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`p-3.5 rounded-xl font-bold text-sm border-2 shadow-md transition-all text-left flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrect && <span className="text-white text-lg">✅</span>}
                      {selectedOpt && isSelected && !isCorrect && <span className="text-white text-lg">❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                {/* Bins Drop Targets */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mb-28">
                  {currentChallenge.bins?.map(bin => {
                    return (
                      <div
                        key={bin.id}
                        data-bin-id={bin.id}
                        className="h-28 rounded-2xl border-4 border-dashed border-gold-300 bg-white/70 backdrop-blur flex flex-col items-center justify-center p-2 shadow-inner transition-all"
                      >
                        <div className="w-6 h-6 rounded-full mb-1 shadow-sm" style={{ backgroundColor: bin.color }} />
                        <span className="text-xs font-black text-slate-800 text-center">{bin.label}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Draggable Cards */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-4 z-30">
                  {currentChallenge.sortItems?.map(item => (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={itemPositions[item.id]?.x || 0}
                      y={itemPositions[item.id]?.y || 0}
                      placed={placedItems[item.id] || false}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Next Button for Identify after answering correctly */}
            {selectedOpt && selectedOpt === currentChallenge.answer && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4">
                <button
                  onClick={advanceChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg text-sm transition-all"
                >
                  Continue ➡️
                </button>
              </motion.div>
            )}

            {/* Next Button for Sort after all items placed */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4 absolute bottom-20 z-40">
                <button
                  onClick={advanceChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg text-sm transition-all"
                >
                  Continue ➡️
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
