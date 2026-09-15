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

// ─── Custom SVG Mascot (Geographer Gita) ──────────────────────

function GitaMascot({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] pointer-events-auto border border-emerald-300"
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
            <linearGradient id="gita-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="gita-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Body / Dress */}
          <path d="M25 55 L50 55 L60 85 L15 85 Z" fill="url(#gita-dress)" stroke="#065F46" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="16" fill="url(#gita-skin)" stroke="#D97706" strokeWidth="1" />
          {/* Hair */}
          <path d="M21 32 C21 18, 54 18, 54 32 C54 35, 52 38, 50 35 C45 25, 30 25, 25 35 C23 38, 21 35, 21 32 Z" fill="#1F2937" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="30" r="2.5" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 38 Q37.5 42 42 38" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Weather Badge on Dress */}
          <circle cx="37.5" cy="68" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <path d="M37.5 64 L39 67 L42 67.5 L39.5 69.5 L40 72.5 L37.5 71 L35 72.5 L35.5 69.5 L33 67.5 L36 67 Z" fill="#F59E0B" />
          {/* Arms */}
          <ellipse cx="18" cy="60" rx="3" ry="8" fill="#F59E0B" transform="rotate(-15 18 60)" />
          <ellipse cx="57" cy="60" rx="3" ry="8" fill="#F59E0B" transform="rotate(15 57 60)" />
          {/* Feet */}
          <ellipse cx="28" cy="87" rx="5" ry="3" fill="#374151" />
          <ellipse cx="47" cy="87" rx="5" ry="3" fill="#374151" />
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

// ─── Custom SVG Scene Background ─────────────────��────────────

function IndiaSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="plains-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />
        {/* Sun */}
        <circle cx="80" cy="60" r="30" fill="#FEF08A" opacity="0.8" />
        {/* Himalayan Peaks in North */}
        <polygon points="0,220 120,120 240,220" fill="url(#mountain-grad)" />
        <polygon points="180,230 300,100 420,230" fill="#64748B" />
        <polygon points="360,230 480,130 600,230" fill="url(#mountain-grad)" />
        <polygon points="540,230 630,150 720,230" fill="#64748B" />
        {/* Snow caps */}
        <polygon points="120,120 140,150 100,150" fill="white" />
        <polygon points="300,100 325,140 275,140" fill="white" />
        <polygon points="480,130 505,165 455,165" fill="white" />
        {/* Northern Plains & Plateau */}
        <rect x="0" y="220" width={width} height={height - 220} fill="url(#plains-grad)" />
        {/* Winding River */}
        <path d="M360,220 Q320,280 400,340 T300,450 L340,560 L280,560 T380,430 Q440,320 360,220 Z" fill="#0EA5E9" opacity="0.85" />
      </svg>
    </div>
  );
}

// ─── Topic-Specific SVG Icon Components ───────────────────────

function HimalayanRiverIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 10 L30 5 L50 10 L45 35 L30 55 L15 35 Z" fill="#94A3B8" />
      <polygon points="30,5 37,18 23,18" fill="white" />
      <path d="M30 18 Q25 35, 30 55" stroke="#38BDF8" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PeninsularRiverIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="6" fill="#A855F7" opacity="0.2" />
      <path d="M15 45 Q30 30, 45 45" stroke="#8B5CF6" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="20" r="6" fill="#F59E0B" />
      <path d="M30 26 L30 35" stroke="#0284C7" strokeWidth="3" strokeDasharray="2,2" />
    </svg>
  );
}

function MonsoonIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="25" cy="22" rx="14" ry="10" fill="#64748B" />
      <ellipse cx="40" cy="18" rx="15" ry="11" fill="#475569" />
      <path d="M20 35 L17 45" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 35 L27 45" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 35 L37 45" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ClimateIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#FBBF24" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
        <line key={a} x1="30" y1="30" x2={30 + 22 * Math.cos(a * Math.PI / 180)} y2={30 + 22 * Math.sin(a * Math.PI / 180)} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function RainforestIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="27" y="30" width="6" height="25" fill="#78350F" />
      <circle cx="30" cy="24" r="18" fill="#15803D" />
      <circle cx="20" cy="20" r="12" fill="#22C55E" />
      <circle cx="40" cy="20" r="12" fill="#16A34A" />
    </svg>
  );
}

function DeciduousForestIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="27" y="32" width="6" height="23" fill="#92400E" />
      <path d="M30 10 C15 10, 15 35, 30 35 C45 35, 45 10, 30 10 Z" fill="#EAB308" />
      {/* Falling leaf */}
      <path d="M42 25 Q46 27, 44 32 Q40 30, 42 25 Z" fill="#D97706" />
    </svg>
  );
}

function ThornScrubIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="20" width="8" height="35" rx="4" fill="#166534" />
      <path d="M26 28 L18 24" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
      <path d="M34 35 L42 30" stroke="#166534" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="30" cy="55" rx="18" ry="4" fill="#D97706" opacity="0.6" />
    </svg>
  );
}

function MountainVegIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 15,30 45,30" fill="#065F46" />
      <polygon points="30,22 12,45 48,45" fill="#047857" />
      <rect x="27" y="45" width="6" height="10" fill="#78350F" />
    </svg>
  );
}

function AlluvialSoilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="35" rx="6" fill="#D97706" />
      <ellipse cx="30" cy="30" rx="16" ry="8" fill="#F59E0B" />
      <path d="M20 40 Q30 45, 40 40" stroke="#78350F" strokeWidth="2" fill="none" />
    </svg>
  );
}

function BlackSoilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="35" rx="6" fill="#1E293B" />
      <path d="M15 25 Q30 20, 45 25" stroke="#334155" strokeWidth="3" fill="none" />
      <path d="M15 35 Q30 30, 45 35" stroke="#334155" strokeWidth="3" fill="none" />
    </svg>
  );
}

function RedSoilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="35" rx="6" fill="#DC2626" />
      <circle cx="30" cy="30" r="12" fill="#EF4444" />
      <circle cx="30" cy="30" r="6" fill="#B91C1C" />
    </svg>
  );
}

function LateriteSoilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="35" rx="6" fill="#EA580C" />
      <path d="M18 20 L42 20 M18 30 L42 30 M18 40 L42 40" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DesertSoilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="35" rx="6" fill="#FEF08A" />
      <path d="M12 35 Q30 25, 48 35" stroke="#CA8A04" strokeWidth="2" fill="none" />
      <circle cx="20" cy="22" r="3" fill="#CA8A04" />
      <circle cx="40" cy="25" r="2" fill="#CA8A04" />
    </svg>
  );
}

function CropIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 L30 20" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 30 Q20 20, 25 15" stroke="#22C55E" strokeWidth="2.5" fill="none" />
      <path d="M30 25 Q40 15, 35 10" stroke="#22C55E" strokeWidth="2.5" fill="none" />
      <ellipse cx="30" cy="52" rx="18" ry="4" fill="#92400E" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'himalayan': return <HimalayanRiverIcon size={size} />;
    case 'peninsular': return <PeninsularRiverIcon size={size} />;
    case 'monsoon': return <MonsoonIcon size={size} />;
    case 'climate': return <ClimateIcon size={size} />;
    case 'rainforest': return <RainforestIcon size={size} />;
    case 'deciduous': return <DeciduousForestIcon size={size} />;
    case 'thorn': return <ThornScrubIcon size={size} />;
    case 'mountain': return <MountainVegIcon size={size} />;
    case 'alluvial': return <AlluvialSoilIcon size={size} />;
    case 'black': return <BlackSoilIcon size={size} />;
    case 'red': return <RedSoilIcon size={size} />;
    case 'laterite': return <LateriteSoilIcon size={size} />;
    case 'desert': return <DesertSoilIcon size={size} />;
    case 'crop': return <CropIcon size={size} />;
    default: return <ClimateIcon size={size} />;
  }
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

interface SortBinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: SortBinProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all shadow-md ${isHovering ? 'scale-105 border-yellow-400 bg-yellow-50' : 'bg-white/90 border-emerald-500'}`}
      style={{ left: x, top: y, width, height, borderColor: color }}
    >
      <span className="text-xs font-extrabold text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Teaching Slides (EXACTLY 5 slides) ────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Rivers of India — Himalayan vs Peninsular 🌊",
    text: "India's rivers belong to two great families! Himalayan rivers like the Ganga start from glaciers and are PERENNIAL — they flow all year! Peninsular rivers like the Godavari start from rain-fed springs and are SEASONAL — they shrink in summer!",
    emoji: "🏔️",
    bgColor: "from-cyan-500 to-blue-600",
    spoken: "India's rivers belong to two great families! Himalayan rivers start from glaciers and flow all year. Peninsular rivers depend on rain and shrink in summer!"
  },
  {
    title: "Climate of India — The Great Monsoon 🌧️",
    text: "India has a tropical monsoon climate! The mighty Himalayas block cold polar winds from Central Asia. Monsoon winds reverse direction — blowing from sea to land in summer to bring heavy rainfall across the country!",
    emoji: "🌦️",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "India has a tropical monsoon climate! The mighty Himalayas block cold polar winds, and monsoon winds bring heavy rainfall in summer."
  },
  {
    title: "Four Seasons of India ☀️",
    text: "India experiences four seasons: Winter (Dec-Feb, cold & dry), Summer (Mar-May, hot & dry), Monsoon (Jun-Sep, rainy), and Autumn / Retreating Monsoon (Oct-Nov, east coast rain)!",
    emoji: "🍂",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "India experiences four seasons: Winter, Summer, Monsoon, and Retreating Monsoon."
  },
  {
    title: "Natural Vegetation of India 🌳",
    text: "Rainfall decides plant life! Tropical rainforests grow in heavy rain (Western Ghats & North-East). Deciduous forests (central India) shed leaves in dry seasons. Thorn scrub thrives in desert Rajasthan!",
    emoji: "🌲",
    bgColor: "from-emerald-500 to-green-600",
    spoken: "Rainfall decides plant life! Tropical rainforests grow in heavy rain, deciduous forests shed leaves in dry seasons, and thorn scrub thrives in the desert."
  },
  {
    title: "Soils of India — The Source of Life 🌱",
    text: "India has six major soil types! Alluvial soil covers the Northern Plains and is the most fertile. Black soil on the Deccan Plateau is ideal for cotton. Red, laterite, desert, and mountain soils complete our rich land!",
    emoji: "🌾",
    bgColor: "from-yellow-600 to-amber-700",
    spoken: "India has six major soil types! Alluvial soil in the Northern Plains is the most fertile, and black soil is ideal for growing cotton."
  },
];

// ─── Challenges (EXACTLY 8 progressive challenges) ─────────────

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

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is the main difference between HIMALAYAN rivers and PENINSULAR rivers?',
    answer: 'Himalayan rivers are perennial (flow all year, fed by snow), Peninsular rivers are seasonal (depend on monsoon rain)',
    options: [
      'Himalayan rivers are perennial (flow all year, fed by snow), Peninsular rivers are seasonal (depend on monsoon rain)',
      'They are completely identical in water flow and source',
      'Himalayan rivers are seasonal and Peninsular rivers flow all year'
    ],
    hint: 'Think about where they get their water: glacier ice melts all year in the north, but the south depends on monsoon rain!',
    misconception: 'Himalayan rivers and Peninsular rivers are NOT the same! Himalayan rivers are perennial (fed by glaciers), while Peninsular rivers are seasonal (rain-fed).'
  },
  {
    type: 'sort',
    question: 'Drag each river to the correct family: Himalayan or Peninsular!',
    answer: 'sort',
    options: [],
    hint: 'Ganga, Indus, Brahmaputra start from glaciers in the north (Himalayan). Godavari, Krishna, Narmada start from the Deccan Plateau/Western Ghats (Peninsular)!',
    misconception: 'Remember: Himalayan rivers originate in northern glaciers and flow all year. Peninsular rivers originate in plateau springs and are rain-fed.',
    sortItems: [
      { id: 'ganga', label: 'Ganga (Himalayan)', icon: 'himalayan', correctBin: 'himalayan' },
      { id: 'godavari', label: 'Godavari (Peninsular)', icon: 'peninsular', correctBin: 'peninsular' },
      { id: 'brahmaputra', label: 'Brahmaputra (Himalayan)', icon: 'himalayan', correctBin: 'himalayan' },
      { id: 'narmada', label: 'Narmada (Peninsular)', icon: 'peninsular', correctBin: 'peninsular' },
    ],
    bins: [
      { id: 'himalayan', label: 'Himalayan Rivers 🏔️', color: '#0EA5E9' },
      { id: 'peninsular', label: 'Peninsular Rivers ☀️', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'What type of climate does India mainly have?',
    answer: 'Monsoon climate with hot summers, rainy monsoon season, and cool winters',
    options: [
      'Monsoon climate with hot summers, rainy monsoon season, and cool winters',
      'Desert climate with no rainfall at all',
      'Polar climate with snow all year round'
    ],
    hint: 'India is shaped by the seasonal reversal of winds called the monsoon!',
    misconception: 'India does NOT have a polar or desert climate everywhere! It has a tropical monsoon climate with distinct seasons.'
  },
  {
    type: 'sort',
    question: 'Drag each season in India to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Summer is March-May (hot & dry). Monsoon is June-September (heavy rain). Winter is Dec-Feb (cool & dry). Retreating monsoon is Oct-Nov!',
    misconception: 'Make sure to match months and weather correctly: summer is hot, monsoon brings heavy rain, winter is cool, and retreating monsoon brings east coast rain.',
    sortItems: [
      { id: 'summer', label: 'Summer (Mar-May)', icon: 'climate', correctBin: 'summer' },
      { id: 'monsoon', label: 'Monsoon (Jun-Sep)', icon: 'monsoon', correctBin: 'monsoon' },
      { id: 'winter', label: 'Winter (Dec-Feb)', icon: 'climate', correctBin: 'winter' },
      { id: 'retreat', label: 'Retreating Monsoon', icon: 'monsoon', correctBin: 'retreat' },
    ],
    bins: [
      { id: 'summer', label: 'Hot & Dry ☀️', color: '#F59E0B' },
      { id: 'monsoon', label: 'Rainy 🌧️', color: '#0EA5E9' },
      { id: 'winter', label: 'Cool & Dry ❄️', color: '#3B82F6' },
      { id: 'retreat', label: 'East Coast Rain 🌊', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Which type of natural vegetation is found in areas with HEAVY rainfall like the Western Ghats and North-East India?',
    answer: 'Tropical rainforests',
    options: [
      'Tropical rainforests',
      'Thorn scrub',
      'Mountain vegetation'
    ],
    hint: 'These forests stay green all year because they get more than 200 cm of rainfall!',
    misconception: 'Heavy rainfall (above 200 cm) supports Tropical rainforests with dense canopies — not thorn scrub or mountain vegetation.'
  },
  {
    type: 'sort',
    question: 'Drag each natural vegetation type to its correct region and rainfall!',
    answer: 'sort',
    options: [],
    hint: 'Rainforests need heavy rain in Western Ghats. Deciduous forests are in central India. Thorn scrub is in Rajasthan. Mountains have conifers!',
    misconception: 'Vegetation depends on rainfall: rainforests need heavy rain, deciduous forests need moderate rain and shed leaves, and thorn scrub grows in dry deserts.',
    sortItems: [
      { id: 'rainforest', label: 'Tropical Rainforest', icon: 'rainforest', correctBin: 'rainforest' },
      { id: 'deciduous', label: 'Deciduous Forest', icon: 'deciduous', correctBin: 'deciduous' },
      { id: 'thorn', label: 'Thorn & Scrub', icon: 'thorn', correctBin: 'thorn' },
      { id: 'mountain', label: 'Mountain Conifers', icon: 'mountain', correctBin: 'mountain' },
    ],
    bins: [
      { id: 'rainforest', label: 'Heavy Rain 🌧️', color: '#15803D' },
      { id: 'deciduous', label: 'Moderate Rain 🌦️', color: '#CA8A04' },
      { id: 'thorn', label: 'Dry Rajasthan 🌵', color: '#C2410C' },
      { id: 'mountain', label: 'Himalayan Altitude 🏔️', color: '#047857' },
    ],
  },
  {
    type: 'identify',
    question: 'Which soil is the MOST FERTILE and covers the Northern Plains of India?',
    answer: 'Alluvial soil',
    options: [
      'Alluvial soil',
      'Desert soil',
      'Laterite soil'
    ],
    hint: 'Rivers deposit fine silt year after year across the Northern Plains, making this soil extremely rich for wheat and rice!',
    misconception: 'Alluvial soil is the most fertile and widespread soil in India, deposited by northern rivers. Desert and laterite soils are far less fertile.'
  },
  {
    type: 'sort',
    question: 'Drag each soil type to its correct region and best crop!',
    answer: 'sort',
    options: [],
    hint: 'Alluvial soil is in Northern Plains (wheat/rice). Black soil is on Deccan Plateau (cotton). Laterite is in Western Ghats (tea/coffee)!',
    misconception: 'Every soil type has a special crop: Alluvial for wheat/rice, Black for cotton, Laterite for tea/coffee, and Desert for bajra.',
    sortItems: [
      { id: 'alluvial', label: 'Alluvial (Wheat/Rice)', icon: 'alluvial', correctBin: 'alluvial' },
      { id: 'black', label: 'Black Soil (Cotton)', icon: 'black', correctBin: 'black' },
      { id: 'laterite', label: 'Laterite (Tea/Coffee)', icon: 'laterite', correctBin: 'laterite' },
      { id: 'desert', label: 'Desert Soil (Bajra)', icon: 'desert', correctBin: 'desert' },
    ],
    bins: [
      { id: 'alluvial', label: 'Northern Plains 🌾', color: '#D97706' },
      { id: 'black', label: 'Deccan Plateau ☁️', color: '#1E293B' },
      { id: 'laterite', label: 'High Rainfall ☕', color: '#EA580C' },
      { id: 'desert', label: 'Rajasthan 🌵', color: '#CA8A04' },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────

export interface IndiaClimateGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function IndiaClimateGame({ width = 720, height = 560, onComplete }: IndiaClimateGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 165, y: height - 150 };
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
      const compMsg = "Wonderful! You are an expert geographer!";
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

    // Check bin collision
    const binWidth = 140;
    const binHeight = 110;
    const binY = 160;

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 340;
      if (x >= binX - 20 && x <= binX + binWidth + 20 && y >= binY - 20 && y <= binY + binHeight + 20) {
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
        const msg = "Fantastic! You sorted India's climate facts perfectly!";
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl font-sans select-none bg-sky-100 flex flex-col justify-between" style={{ width, height }}>
      {/* Background */}
      <IndiaSceneBackground width={width} height={height} />

      {/* Confetti & Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
            India Climate & Rivers 🌍
          </span>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && (
            <>
              <span className="text-sm font-bold text-gray-700">
                Challenge {challengeIdx + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 15)} total={8} />
            </>
          )}
          <button
            onClick={handleShowHint}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-full text-xs shadow transition flex items-center gap-1"
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Mascot Gita */}
      <GitaMascot mood={mascotMood} speaking={speakingText} />

      {/* Screen 1: Teaching Intro */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-4">
          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-xl rounded-3xl p-6 shadow-xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center`}
          >
            <span className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex justify-between w-full items-center">
              <button
                onClick={() => setSlideIdx(prev => Math.max(0, prev - 1))}
                disabled={slideIdx === 0}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-30 rounded-xl font-bold text-sm transition"
              >
                ⬅️ Back
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>

              {slideIdx < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => setSlideIdx(prev => prev + 1)}
                  className="px-4 py-2 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-bold text-sm shadow transition"
                >
                  Next ➡️
                </button>
              ) : (
                <button
                  onClick={() => {
                    audioManager.play('success');
                    setScreen('play');
                  }}
                  className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-950 rounded-xl font-black text-sm shadow-lg transition animate-bounce"
                >
                  Start Game! 🚀
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Screen 2: Play Screen */}
      {screen === 'play' && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-6 py-4">
          {/* Question card */}
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-emerald-200 text-center">
            <h3 className="text-base font-extrabold text-gray-800">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Body */}
          {currentChallenge.type === 'identify' && (
            <div className="w-full max-w-xl flex flex-col gap-3 my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-white hover:bg-emerald-50 text-gray-800 border-emerald-200';
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-102';
                  else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600';
                  else btnStyle = 'bg-gray-100 text-gray-400 opacity-60';
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                    onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={selectedOpt === currentChallenge.answer}
                    className={`w-full p-3 rounded-2xl font-bold text-sm border-2 shadow transition text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span>✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span>❌</span>}
                  </motion.button>
                );
              })}

              {selectedOpt && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-2">
                  <button
                    onClick={advanceChallenge}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-lg transition"
                  >
                    {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Finish Game! 🎉'}
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-2xl h-72 my-auto">
              {/* Bins */}
              <div className="flex justify-between px-4">
                {currentChallenge.bins.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    id={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={idx * 340 + 50}
                    y={20}
                    width={150}
                    height={110}
                    isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                  />
                ))}
              </div>

              {/* Draggable Items */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4">
                {currentChallenge.sortItems.map(item => {
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

              {/* Next Button when all sorted */}
              {currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-x-0 bottom-2 flex justify-center z-30">
                  <button
                    onClick={advanceChallenge}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-xl transition animate-bounce"
                  >
                    {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Finish Game! 🎉'}
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Footer instruction */}
          <div className="text-xs font-bold text-gray-500 py-1">
            {currentChallenge.type === 'sort' ? 'Drag each item into the correct box above!' : 'Select the correct answer to continue!'}
          </div>
        </div>
      )}
    </div>
  );
}
