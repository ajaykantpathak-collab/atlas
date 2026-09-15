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

// ─── SVG Icon Components ──────────────────────────────────────

function PhysicalMapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      {/* Brown mountains */}
      <path d="M12 36 L22 20 L32 36 Z" fill="#A0522D" />
      <path d="M26 38 L36 22 L46 38 Z" fill="#CD853F" />
      {/* Blue river */}
      <path d="M10 44 Q 25 35, 30 42 T 50 40" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Green plains */}
      <rect x="10" y="42" width="40" height="6" fill="#86EFAC" opacity="0.6" rx="2" />
    </svg>
  );
}

function PoliticalMapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      {/* State borders */}
      <line x1="6" y1="28" x2="54" y2="28" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3,3" />
      <line x1="30" y1="8" x2="30" y2="52" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3,3" />
      {/* Capital dots */}
      <circle cx="18" cy="18" r="3" fill="#DC2626" />
      <circle cx="42" cy="40" r="3" fill="#2563EB" />
    </svg>
  );
}

function ThematicMapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#F3E8FF" stroke="#9333EA" strokeWidth="2" />
      {/* Raindrops / theme shading */}
      <circle cx="18" cy="20" r="6" fill="#C084FC" opacity="0.8" />
      <circle cx="40" cy="30" r="10" fill="#9333EA" opacity="0.8" />
      <circle cx="24" cy="40" r="4" fill="#E879F9" opacity="0.9" />
    </svg>
  );
}

function GlobeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
      {/* Continents */}
      <path d="M20 20 Q 30 15, 35 25 T 25 40 Z" fill="#22C55E" />
      <path d="M38 32 Q 45 35, 42 45 T 35 40 Z" fill="#22C55E" />
      {/* Stand */}
      <line x1="30" y1="52" x2="30" y2="56" stroke="#475569" strokeWidth="3" />
      <ellipse cx="30" cy="56" rx="10" ry="3" fill="#475569" />
    </svg>
  );
}

function AtlasIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 12 L30 18 L50 12 L50 48 L30 54 L10 48 Z" fill="#1E3A8A" stroke="#0F172A" strokeWidth="2" />
      <line x1="30" y1="18" x2="30" y2="54" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M14 18 L26 21 L26 45 L14 42 Z" fill="white" />
      <path d="M46 18 L34 21 L34 45 L46 42 Z" fill="white" />
    </svg>
  );
}

function CompassRoseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="white" stroke="#334155" strokeWidth="2" />
      <polygon points="30,10 34,30 30,50 26,30" fill="#EF4444" />
      <polygon points="30,10 30,50 34,30 26,30" fill="#DC2626" opacity="0.6" />
      <polygon points="10,30 30,34 50,30 30,26" fill="#3B82F6" />
      <text x="27" y="14" fontSize="8" fontWeight="bold" fill="#0F172A">N</text>
      <text x="27" y="49" fontSize="8" fontWeight="bold" fill="#0F172A">S</text>
      <text x="51" y="32" fontSize="8" fontWeight="bold" fill="#0F172A">E</text>
      <text x="5" y="32" fontSize="8" fontWeight="bold" fill="#0F172A">W</text>
    </svg>
  );
}

function ScaleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="20" width="44" height="20" rx="3" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
      <line x1="14" y1="30" x2="46" y2="30" stroke="#0F172A" strokeWidth="2" />
      <line x1="14" y1="26" x2="14" y2="34" stroke="#0F172A" strokeWidth="2" />
      <line x1="30" y1="26" x2="30" y2="34" stroke="#0F172A" strokeWidth="2" />
      <line x1="46" y1="26" x2="46" y2="34" stroke="#0F172A" strokeWidth="2" />
      <text x="18" y="18" fontSize="8" fontWeight="bold" fill="#334155">1 cm = 100 km</text>
    </svg>
  );
}

function LegendIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="3" fill="white" stroke="#64748B" strokeWidth="2" />
      <circle cx="16" cy="20" r="4" fill="#EF4444" />
      <text x="24" y="23" fontSize="8" fill="#334155">City</text>
      <line x1="12" y1="35" x2="20" y2="35" stroke="#3B82F6" strokeWidth="3" />
      <text x="24" y="38" fontSize="8" fill="#334155">River</text>
    </svg>
  );
}

function HimalayasIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M5 45 L20 15 L35 45 Z" fill="#94A3B8" />
      <path d="M20 15 L23 22 L17 22 Z" fill="white" />
      <path d="M25 48 L40 20 L55 48 Z" fill="#64748B" />
      <path d="M40 20 L43 27 L37 27 Z" fill="white" />
    </svg>
  );
}

function NorthernPlainsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="20" width="48" height="25" rx="3" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
      <path d="M10 30 Q 30 25, 50 35" stroke="#0284C7" strokeWidth="2" fill="none" />
      <circle cx="20" cy="35" r="2" fill="#DC2626" />
      <circle cx="40" cy="25" r="2" fill="#DC2626" />
    </svg>
  );
}

function DeccanPlateauIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="12,18 48,18 54,45 6,45" fill="#D97706" stroke="#B45309" strokeWidth="2" />
      <line x1="15" y1="28" x2="45" y2="28" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="2,2" />
      <line x1="20" y1="36" x2="40" y2="36" stroke="#FEF3C7" strokeWidth="1.5" strokeDasharray="2,2" />
    </svg>
  );
}

function CoastalPlainsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="15" height="40" fill="#CA8A04" />
      <rect x="21" y="10" width="33" height="40" fill="#38BDF8" />
      <path d="M21 10 Q 25 30, 21 50" stroke="#0284C7" strokeWidth="2" fill="none" />
    </svg>
  );
}

function DesertIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="40" rx="3" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
      {/* Dunes */}
      <path d="M6 35 Q 20 20, 34 35 T 54 35" fill="#FDE047" />
      <path d="M15 45 Q 30 30, 45 45" fill="#FACC15" />
      {/* Cactus */}
      <path d="M38 25 L38 18 M35 22 L41 22" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IslandsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="40" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="20" cy="25" rx="5" ry="3" fill="#22C55E" />
      <ellipse cx="40" cy="38" rx="6" ry="3.5" fill="#22C55E" />
      <ellipse cx="32" cy="20" rx="3" ry="2" fill="#22C55E" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'physical-map': return <PhysicalMapIcon size={size} />;
    case 'political-map': return <PoliticalMapIcon size={size} />;
    case 'thematic-map': return <ThematicMapIcon size={size} />;
    case 'title': return <AtlasIcon size={size} />;
    case 'scale': return <ScaleIcon size={size} />;
    case 'direction': return <CompassRoseIcon size={size} />;
    case 'legend': return <LegendIcon size={size} />;
    case 'globe': return <GlobeIcon size={size} />;
    case 'map-item': return <AtlasIcon size={size} />;
    case 'northern-mountains': return <HimalayasIcon size={size} />;
    case 'northern-plains': return <NorthernPlainsIcon size={size} />;
    case 'peninsular-plateau': return <DeccanPlateauIcon size={size} />;
    case 'coastal-plains': return <CoastalPlainsIcon size={size} />;
    case 'desert': return <DesertIcon size={size} />;
    case 'islands': return <IslandsIcon size={size} />;
    default: return <PhysicalMapIcon size={size} />;
  }
}

// ─── Teaching Slides ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "What is a Map? 🗺️",
    text: "A map is a flat, two-dimensional representation of the Earth or a part of it, drawn on paper. It has length and breadth but no depth, helping us view continents, countries, rivers, and cities all at once!",
    emoji: "🗺️",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "A map is a flat, two-dimensional representation of the Earth or a part of it, drawn on paper. It helps us view continents, countries, rivers, and cities all at once!"
  },
  {
    title: "Types of Maps 🎨",
    text: "There are three main types of maps! Physical maps show natural features like mountains in brown and rivers in blue. Political maps show human-made borders of states and countries. Thematic maps show one specific topic like rainfall or population.",
    emoji: "🌍",
    bgColor: "from-teal-500 to-cyan-600",
    spoken: "There are three main types of maps! Physical maps show natural features like mountains in brown and rivers in blue. Political maps show state borders. Thematic maps show specific topics like rainfall."
  },
  {
    title: "Six Key Elements of a Map 🧭",
    text: "Every good map must have six key elements: a Title (what it shows), a Direction indicator (north arrow), a Scale (map distance vs real distance), Symbols (conventional signs), a Legend or key, and standard Colours!",
    emoji: "🧭",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Every good map must have six key elements: a title, a direction indicator, a scale, symbols, a legend, and standard colours!"
  },
  {
    title: "Globe vs Map & Atlas 📖",
    text: "A globe is a three-dimensional ball model showing the whole Earth. A map is flat, portable, and shows small areas in great detail. Many maps bound together in a book form an atlas with an index to locate places quickly!",
    emoji: "📖",
    bgColor: "from-indigo-500 to-purple-600",
    spoken: "A globe is a three dimensional ball model. A map is flat and portable. An atlas is a collection of maps bound together in a book!"
  },
  {
    title: "Physical Divisions of India 🏔️",
    text: "India is divided into six main physical divisions: Northern Mountains (snow-capped Himalayas), Northern Plains (flat and fertile alluvium), Peninsular Plateau (oldest Deccan landmass), Coastal Plains, Thar Desert, and Islands!",
    emoji: "🇮🇳",
    bgColor: "from-emerald-500 to-green-600",
    spoken: "India is divided into six physical divisions: Northern Mountains, Northern Plains, Peninsular Plateau, Coastal Plains, Thar Desert, and Islands!"
  }
];

// ─── Challenges ───────────────────────────────────────────────

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

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is a map?",
    answer: "A flat, two-dimensional representation of the Earth or part of it",
    options: [
      "A flat, two-dimensional representation of the Earth or part of it",
      "A three-dimensional ball-shaped model of the entire Earth",
      "A photograph taken from a moving train"
    ],
    hint: "Think about how a map is drawn on paper — it is flat with length and breadth!",
    misconception: "A map is a two-dimensional flat representation on paper, unlike a globe which is a three-dimensional ball model!"
  },
  {
    type: 'sort',
    question: "Drag each map type to its correct description!",
    answer: "sort",
    options: [],
    hint: "Physical shows nature (mountains/rivers), political shows borders, thematic shows one specific topic like rainfall!",
    misconception: "Physical maps show natural features like mountains and rivers, political maps show human-made state borders, and thematic maps focus on one topic like rainfall!",
    sortItems: [
      { id: 'item-phys', label: 'Physical Map', icon: 'physical-map', correctBin: 'bin-phys' },
      { id: 'item-pol', label: 'Political Map', icon: 'political-map', correctBin: 'bin-pol' },
      { id: 'item-them', label: 'Thematic Map', icon: 'thematic-map', correctBin: 'bin-them' }
    ],
    bins: [
      { id: 'bin-phys', label: 'Shows Nature 🏔️', color: '#0284C7' },
      { id: 'bin-pol', label: 'Shows Borders 🗺️', color: '#CA8A04' },
      { id: 'bin-them', label: 'Shows One Theme 📊', color: '#9333EA' }
    ]
  },
  {
    type: 'identify',
    question: "Which of the following is NOT one of the six key elements of a map?",
    answer: "Favorite animal sticker",
    options: [
      "Title and scale",
      "Direction arrow and legend",
      "Favorite animal sticker"
    ],
    hint: "The six elements are title, direction, scale, symbols, legend, and colours. Animal stickers are not map elements!",
    misconception: "Every map needs a title, scale, direction indicator, symbols, legend, and colours. Animal stickers have nothing to do with map elements!"
  },
  {
    type: 'sort',
    question: "Drag each map element to its correct function!",
    answer: "sort",
    options: [],
    hint: "Title tells what it shows, scale converts distances, direction shows north, legend explains symbols!",
    misconception: "Each map element has a specific job: title tells the subject, scale relates map distance to real distance, direction shows north, and legend decodes symbols!",
    sortItems: [
      { id: 'elem-title', label: 'Title', icon: 'title', correctBin: 'bin-title' },
      { id: 'elem-scale', label: 'Scale', icon: 'scale', correctBin: 'bin-scale' },
      { id: 'elem-dir', label: 'Direction', icon: 'direction', correctBin: 'bin-dir' },
      { id: 'elem-leg', label: 'Legend', icon: 'legend', correctBin: 'bin-leg' }
    ],
    bins: [
      { id: 'bin-title', label: 'Tells Subject 🏷️', color: '#1E3A8A' },
      { id: 'bin-scale', label: 'Map vs Real Distance 📏', color: '#0D9488' },
      { id: 'bin-dir', label: 'North Arrow 🧭', color: '#DC2626' },
      { id: 'bin-leg', label: 'Decodes Symbols 📜', color: '#4F46E5' }
    ]
  },
  {
    type: 'identify',
    question: "What is the main difference between a globe and a map?",
    answer: "A globe is a 3D ball showing the whole Earth, while a map is flat and can show a small area in detail",
    options: [
      "A globe is a 3D ball showing the whole Earth, while a map is flat and can show a small area in detail",
      "A globe is flat and a map is a round ball",
      "They are exactly the same thing in different colours"
    ],
    hint: "Think about holding a ball in your hand versus looking at a flat page in an atlas!",
    misconception: "A globe is a three-dimensional ball model of the whole Earth, while a map is a flat drawing that can show a specific region in great detail!"
  },
  {
    type: 'sort',
    question: "Drag each feature to Globe or Map!",
    answer: "sort",
    options: [],
    hint: "Globes are 3D balls; maps are flat, portable, and can be collected in an atlas!",
    misconception: "Globes are 3D round models showing true shape for the whole Earth. Maps are flat, portable, can show detailed local areas, and are collected into atlases!",
    sortItems: [
      { id: 'f-globe', label: '3D Ball Model', icon: 'globe', correctBin: 'bin-globe' },
      { id: 'f-map', label: 'Flat & Portable', icon: 'map-item', correctBin: 'bin-map' }
    ],
    bins: [
      { id: 'bin-globe', label: 'Globe 🌍', color: '#0284C7' },
      { id: 'bin-map', label: 'Map 🗺️', color: '#16A34A' }
    ]
  },
  {
    type: 'identify',
    question: "Which physical division of India contains the snow-capped Himalayas?",
    answer: "The Northern Mountains",
    options: [
      "The Northern Mountains",
      "The Thar Desert",
      "The Coastal Plains"
    ],
    hint: "Think about where tall mountains with snow are located in India — at the very top in the north!",
    misconception: "The Himalayas form the Northern Mountains division at the northern edge of India, acting as a natural wall and feeding major rivers!"
  },
  {
    type: 'sort',
    question: "Drag each physical division of India to its correct description!",
    answer: "sort",
    options: [],
    hint: "Northern mountains = Himalayas, Northern plains = flat & fertile, Plateau = Deccan, Desert = Thar!",
    misconception: "Each physical division has unique traits: Northern Mountains have snow-capped Himalayas, Northern Plains are fertile and flat, Peninsular Plateau is old and rocky, Coastal Plains are narrow strips, Thar Desert is hot and dry, and Islands lie in the seas!",
    sortItems: [
      { id: 'div-nm', label: 'Northern Mountains', icon: 'northern-mountains', correctBin: 'bin-nm' },
      { id: 'div-np', label: 'Northern Plains', icon: 'northern-plains', correctBin: 'bin-np' },
      { id: 'div-pp', label: 'Peninsular Plateau', icon: 'peninsular-plateau', correctBin: 'bin-pp' },
      { id: 'div-des', label: 'Thar Desert', icon: 'desert', correctBin: 'bin-des' }
    ],
    bins: [
      { id: 'bin-nm', label: 'Snow Himalayas 🏔️', color: '#64748B' },
      { id: 'bin-np', label: 'Fertile Plains 🌱', color: '#16A34A' },
      { id: 'bin-pp', label: 'Deccan Plateau 🪨', color: '#D97706' },
      { id: 'bin-des', label: 'Hot Desert ☀️', color: '#CA8A04' }
    ]
  }
];

// ─── Cartographer Karan Mascot ─────────────────────────────────

function CartographerKaran({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 8, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="karan-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <radialGradient id="karan-face" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Explorer Vest / Body */}
          <rect x="22" y="48" width="31" height="30" rx="6" fill="url(#karan-body)" stroke="#1E3A8A" strokeWidth="2" />
          <path d="M37 48 L37 78" stroke="#93C5FD" strokeWidth="2" />
          {/* Compass Badge */}
          <circle cx="30" cy="58" r="5" fill="white" stroke="#D97706" strokeWidth="1.5" />
          <polygon points="30,54 32,58 30,62 28,58" fill="#DC2626" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="14" fill="url(#karan-face)" stroke="#D97706" strokeWidth="2" />
          {/* Explorer Hat */}
          <path d="M20 22 Q 37.5 12, 55 22 L 50 26 Q 37.5 18, 25 26 Z" fill="#78350F" />
          <ellipse cx="37.5" cy="22" rx="18" ry="5" fill="#92400E" stroke="#78350F" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2" fill="#1E293B" />
          <circle cx="43" cy="30" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 37 Q 37.5 41, 42 37" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Rolled Map in Hand */}
          <rect x="52" y="52" width="14" height="6" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(25 52 52)" />
          {/* Feet */}
          <ellipse cx="30" cy="82" rx="5" ry="3" fill="#1E3A8A" />
          <ellipse cx="45" cy="82" rx="5" ry="3" fill="#1E3A8A" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Map Studio Scene Background ──────────────────────────────

function MapStudioBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="studio-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        {/* Wall */}
        <rect width={width} height={height * 0.75} fill="url(#studio-wall)" />
        {/* Floor */}
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#studio-floor)" />
        {/* Hanging Wall Map of India */}
        <rect x={width * 0.3} y={30} width={width * 0.4} height={height * 0.45} rx="4" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3" />
        <path d="M" stroke="#0284C7" strokeWidth="2" fill="none" />
        <text x={width * 0.5} y={55} fontSize="14" fontWeight="bold" fill="#0369A1" textAnchor="middle">INDIA — POLITICAL & PHYSICAL</text>
        {/* Compass Rose on Wall Map */}
        <circle cx={width * 0.6} cy={height * 0.35} r="25" fill="white" stroke="#0284C7" strokeWidth="1.5" opacity="0.8" />
        <polygon points={`${width * 0.6},${height * 0.35 - 18} ${width * 0.6 + 4},${height * 0.35} ${width * 0.6},${height * 0.35 + 18} ${width * 0.6 - 4},${height * 0.35}`} fill="#DC2626" />
      </svg>
    </div>
  );
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 shadow-xl transition-all duration-200 ${isHovering ? 'scale-105 ring-4 ring-amber-300' : ''}`}
      style={{ left: x, top: y, width, height, backgroundColor: `${color}15`, borderColor: color }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 shadow-md" style={{ backgroundColor: color }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <span className="text-xs font-bold text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Component Props & Export ───────────────────────��────

export interface MapsIndiaGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MapsIndiaGame({ width = 720, height = 560, onComplete }: MapsIndiaGameProps) {
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
  }, [challengeIdx, screen, currentChallenge, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      const totalItems = currentChallenge.sortItems.length;
      const startX = Math.max(20, (width - totalItems * 120) / 2);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: startX + idx * 125, y: height - 130 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, width]);

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
      const msg = "Great job! You know the map of India!";
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
      const compMsg = "Wonderful! You are a brilliant cartographer star!";
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
    const numBins = currentChallenge.bins.length;
    const binWidth = 140;
    const totalBinsWidth = numBins * binWidth + (numBins - 1) * 20;
    const startX = (width - totalBinsWidth) / 2;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = 130;
      const bWidth = binWidth;
      const bHeight = 110;
      if (x >= bx && x <= bx + bWidth && y >= by && y <= by + bHeight) {
        droppedBinId = bin.id;
      }
    });

    setHoveredBin(null);

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
        const msg = "Fantastic! You sorted the map features perfectly!";
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-amber-50 select-none flex flex-col items-center justify-between" style={{ width, height }}>
      <MapStudioBackground width={width} height={height} />
      <CartographerKaran mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full px-6 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
          </div>
          <div>
            <h1 className="text-base font-extrabold text-amber-900 leading-tight">Maps of India Explorer</h1>
            <p className="text-xs font-medium text-amber-700">ICSE Class 4 Geography</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-amber-100 px-3 py-1.5 rounded-full border border-amber-300 shadow-inner">
              <span className="text-xs font-bold text-amber-900">Score: {score}</span>
            </div>
            <StarRow count={Math.min(3, Math.floor((challengeIdx / CHALLENGES.length) * 3) + 1)} total={3} />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-6 py-4">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center max-w-lg bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-4 border-amber-300 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-amber-100 flex items-center justify-center text-4xl mb-4 shadow-inner">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black text-amber-900 mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-amber-600 w-6' : 'bg-amber-200'}`} />
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
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-lg transform active:scale-95 transition-all flex items-center gap-2"
              >
                {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next ➔' : 'Start Game! 🚀'}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-2xl">
            {/* Challenge Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-amber-300 text-center mb-6"
            >
              <div className="inline-block px-3 py-1 bg-amber-100 rounded-full text-xs font-bold text-amber-800 mb-2">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </div>
              <h3 className="text-lg font-black text-gray-800">{currentChallenge.question}</h3>
            </motion.div>

            {/* Multiple Choice or Sort Interactive Area */}
            {currentChallenge.type === 'identify' ? (
              <div className="grid grid-cols-1 gap-3 w-full max-w-lg">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnBg = 'bg-white hover:bg-amber-50 border-amber-200 text-gray-800';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnBg = 'bg-green-500 border-green-600 text-white';
                    else if (isSelected) btnBg = 'bg-red-500 border-red-600 text-white';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-sm border-2 shadow-md transition-all text-left flex items-center justify-between ${btnBg}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAnswer && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="relative w-full h-[220px]">
                {/* Bins */}
                {currentChallenge.bins && currentChallenge.bins.map((bin, idx) => {
                  const numBins = currentChallenge.bins!.length;
                  const binWidth = 140;
                  const totalBinsWidth = numBins * binWidth + (numBins - 1) * 20;
                  const startX = (width - totalBinsWidth - 48) / 2;
                  const bx = startX + idx * (binWidth + 20);
                  const isHovering = hoveredBin === bin.id;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={10}
                      width={binWidth}
                      height={100}
                      isHovering={isHovering} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {/* Draggable Items */}
                {currentChallenge.sortItems && currentChallenge.sortItems.map((item) => {
                  const pos = itemPositions[item.id] || { x: 50, y: 150 };
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

            {/* Next Button for Multiple Choice when answered correctly */}
            {selectedOpt === currentChallenge.answer && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4">
                <button
                  onClick={advanceChallenge}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl transform active:scale-95 transition-all flex items-center gap-2"
                >
                  Continue ➔
                </button>
              </motion.div>
            )}

            {/* Sort completion continue button */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-4">
                <button
                  onClick={advanceChallenge}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-xl transform active:scale-95 transition-all flex items-center gap-2"
                >
                  Continue ➔
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
