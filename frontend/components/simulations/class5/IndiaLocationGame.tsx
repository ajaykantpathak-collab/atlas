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

// ─── SVG Icon Components ────��─────────────────────────────────

function IndiaMapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      {/* Stylized India Shape */}
      <path d="M22 14 L38 16 L44 26 L36 34 L38 46 L26 42 L20 32 L16 22 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
      {/* Tropic of Cancer Line */}
      <line x1="12" y1="28" x2="48" y2="28" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3,2" />
    </svg>
  );
}

function HimalayaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
      <path d="M10 42 L25 18 L40 42 Z" fill="#94A3B8" />
      <path d="M25 18 L28 24 L22 24 Z" fill="white" />
      <path d="M28 44 L42 22 L52 44 Z" fill="#64748B" />
      <path d="M42 22 L45 28 L39 28 Z" fill="white" />
    </svg>
  );
}

function IndianOceanIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
      <path d="M10 30 Q 20 25, 30 30 T 50 30" stroke="#0284C7" strokeWidth="2" fill="none" />
      <path d="M10 40 Q 25 35, 40 40 T 50 38" stroke="#0284C7" strokeWidth="2" fill="none" />
      <circle cx="30" cy="20" r="4" fill="#38BDF8" />
    </svg>
  );
}

function NeighbourIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="#EF4444" />
      <circle cx="30" cy="30" r="6" fill="#FACC15" />
    </svg>
  );
}

function WinterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M30 14 L30 46 M14 30 L46 30 M18 18 L42 42 M18 42 L42 18" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="30" r="4" fill="#38BDF8" />
    </svg>
  );
}

function SummerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="#F59E0B" />
      <line x1="30" y1="10" x2="30" y2="15" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="45" x2="30" y2="50" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="30" x2="15" y2="30" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="30" x2="50" y2="30" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function MonsoonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <path d="M18 26 C18 20, 42 20, 42 26 C48 26, 48 36, 42 36 L18 36 C12 36, 12 26, 18 26 Z" fill="#94A3B8" />
      <line x1="22" y1="40" x2="18" y2="48" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="40" x2="26" y2="48" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="38" y1="40" x2="34" y2="48" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ForestIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
      <path d="M30 14 L42 34 L18 34 Z" fill="#15803D" />
      <path d="M30 24 L45 44 L15 44 Z" fill="#22C55E" />
      <rect x="27" y="44" width="6" height="6" fill="#78350F" />
    </svg>
  );
}

function DesertIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2" />
      <path d="M6 35 Q 20 20, 34 35 T 54 35 L 54 52 L 6 52 Z" fill="#FDE047" />
      <path d="M38 24 L38 16 M35 20 L41 20" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MountainVegetationIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#F1F5F9" stroke="#475569" strokeWidth="2" />
      <path d="M12 44 L30 16 L48 44 Z" fill="#64748B" />
      <path d="M30 16 L33 22 L27 22 Z" fill="white" />
      <path d="M22 36 L30 26 L38 36 Z" fill="#047857" />
    </svg>
  );
}

function CoastalVegetationIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
      <rect x="28" y="24" width="4" height="24" fill="#78350F" />
      <path d="M30 24 Q 20 16, 14 22 Q 22 26, 30 24" fill="#15803D" />
      <path d="M30 24 Q 40 16, 46 22 Q 38 26, 30 24" fill="#15803D" />
      <path d="M30 20 Q 30 10, 36 14 Q 32 20, 30 20" fill="#15803D" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'india-map': return <IndiaMapIcon size={size} />;
    case 'himalaya': return <HimalayaIcon size={size} />;
    case 'indian-ocean': return <IndianOceanIcon size={size} />;
    case 'neighbour': return <NeighbourIcon size={size} />;
    case 'winter': return <WinterIcon size={size} />;
    case 'summer': return <SummerIcon size={size} />;
    case 'monsoon': return <MonsoonIcon size={size} />;
    case 'forest': return <ForestIcon size={size} />;
    case 'desert': return <DesertIcon size={size} />;
    case 'mountain-veg': return <MountainVegetationIcon size={size} />;
    case 'coastal-veg': return <CoastalVegetationIcon size={size} />;
    default: return <IndiaMapIcon size={size} />;
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
    title: "India - Location & Extent 🇮🇳",
    text: "India is located entirely in the Northern Hemisphere in South Asia. Its mainland extends from 8°4'N to 37°6'N latitude and from 68°7'E to 97°25'E longitude. The Tropic of Cancer (23°30'N) divides India into two temperature zones!",
    emoji: "🇮🇳",
    bgColor: "from-blue-600 to-indigo-700",
    spoken: "India is located entirely in the Northern Hemisphere in South Asia. Its mainland extends from 8°4'N to 37°6'N latitude and from 68°7'E to 97°25'E longitude."
  },
  {
    title: "India's Boundaries & Peninsula 🌊",
    text: "India is surrounded by water on three sides — the Arabian Sea to the west, the Bay of Bengal to the east, and the Indian Ocean to the south — making India a peninsula with a coastline of about 7,516 km!",
    emoji: "🌊",
    bgColor: "from-teal-600 to-cyan-700",
    spoken: "India is surrounded by water on three sides, making India a peninsula with a coastline of about 7,516 kilometres!"
  },
  {
    title: "India's Neighbours 🤝",
    text: "India has seven land neighbours: Pakistan in the west, Afghanistan in the northwest, China, Nepal, and Bhutan in the north, and Bangladesh and Myanmar in the east. Sri Lanka and the Maldives are our maritime neighbours to the south!",
    emoji: "🤝",
    bgColor: "from-amber-600 to-orange-700",
    spoken: "India has seven land neighbours including Pakistan, China, Nepal, Bhutan, Bangladesh, Myanmar, and Afghanistan, plus maritime neighbours Sri Lanka and the Maldives."
  },
  {
    title: "Climate of India — Seasons ☀️",
    text: "India experiences four main seasons: Winter (Dec-Feb) which is cold and dry, Summer (Mar-May) which is hot, Monsoon (Jun-Sep) with heavy southwest monsoon rains crucial for farming, and Autumn (Oct-Nov) which is pleasant!",
    emoji: "🌦️",
    bgColor: "from-emerald-600 to-green-700",
    spoken: "India experiences four main seasons: Winter, Summer, Monsoon, and Autumn. The monsoon brings vital rain for Indian agriculture."
  },
  {
    title: "Natural Vegetation of India 🌲",
    text: "Because of diverse climates, India has five main vegetation types: Tropical Evergreen rainforests in heavy rain areas, Deciduous forests with trees shedding leaves, Thorn & Scrub in dry deserts, Mountain forests in the Himalayas, and Mangrove tidal forests in deltas!",
    emoji: "🌲",
    bgColor: "from-purple-600 to-indigo-800",
    spoken: "Because of diverse climates, India has five main vegetation types, including tropical evergreen, deciduous, thorn forests, mountain forests, and mangroves."
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
    question: "In which part of the Asian continent is India located?",
    answer: "South Asia",
    options: [
      "South Asia",
      "East Asia",
      "West Asia"
    ],
    hint: "Think about India's central position pointing south into the Indian Ocean.",
    misconception: "India is located in South Asia, occupying a central peninsular position surrounded by the Indian Ocean."
  },
  {
    type: 'sort',
    question: "Drag each geographic fact about India to its correct category!",
    answer: "sort",
    options: [],
    hint: "Match the northern mountains, southern ocean, latitudinal extent, and Tropic of Cancer!",
    misconception: "India extends from 8°4'N to 37°6'N latitude, has the Himalayas in the north, and the Indian Ocean to the south.",
    sortItems: [
      { id: 'item-him', label: 'Himalayas', icon: 'himalaya', correctBin: 'bin-north' },
      { id: 'item-oce', label: 'Indian Ocean', icon: 'indian-ocean', correctBin: 'bin-south' },
      { id: 'item-lat', label: '8°4\'N to 37°6\'N', icon: 'india-map', correctBin: 'bin-extent' },
      { id: 'item-toc', label: 'Tropic of Cancer', icon: 'india-map', correctBin: 'bin-central' }
    ],
    bins: [
      { id: 'bin-north', label: 'Northern Border 🏔️', color: '#64748B' },
      { id: 'bin-south', label: 'Southern Water 🌊', color: '#0284C7' },
      { id: 'bin-extent', label: 'Latitudinal Range 📏', color: '#16A34A' },
      { id: 'bin-central', label: 'Middle Line 🎯', color: '#D97706' }
    ]
  },
  {
    type: 'identify',
    question: "Which of India's neighbours lies directly to the NORTH?",
    answer: "China",
    options: [
      "China",
      "Sri Lanka",
      "Maldives"
    ],
    hint: "Think about the high Himalayan mountain border shared with the largest northern neighbour.",
    misconception: "China lies to the north and northeast of India along the Himalayas. Sri Lanka and Maldives are southern maritime neighbours."
  },
  {
    type: 'sort',
    question: "Drag each neighbouring country to its correct direction relative to India!",
    answer: "sort",
    options: [],
    hint: "Pakistan is west, China is north, Bangladesh is east, Sri Lanka is south!",
    misconception: "Pakistan is to the west, China to the north/northeast, Bangladesh to the east, and Sri Lanka to the south across the Palk Strait.",
    sortItems: [
      { id: 'nbr-pak', label: 'Pakistan', icon: 'neighbour', correctBin: 'bin-west' },
      { id: 'nbr-chn', label: 'China', icon: 'neighbour', correctBin: 'bin-north' },
      { id: 'nbr-ban', label: 'Bangladesh', icon: 'neighbour', correctBin: 'bin-east' },
      { id: 'nbr-sl', label: 'Sri Lanka', icon: 'neighbour', correctBin: 'bin-south' }
    ],
    bins: [
      { id: 'bin-west', label: 'West ⬅️', color: '#CA8A04' },
      { id: 'bin-north', label: 'North ⬆️', color: '#2563EB' },
      { id: 'bin-east', label: 'East ➡️', color: '#16A34A' },
      { id: 'bin-south', label: 'South ⬇️', color: '#9333EA' }
    ]
  },
  {
    type: 'identify',
    question: "What are the four main seasons of India?",
    answer: "Winter, Summer, Monsoon, and Autumn",
    options: [
      "Winter, Summer, Monsoon, and Autumn",
      "Spring, Summer, Autumn, and Winter only",
      "Hot, Cold, Wet, and Dry seasons"
    ],
    hint: "Remember that India's climate cycle includes winter, summer, rainy monsoon, and retreating monsoon autumn.",
    misconception: "India has four distinct seasons: Winter (Dec-Feb), Summer (Mar-May), Monsoon (Jun-Sep), and Autumn (Oct-Nov)."
  },
  {
    type: 'sort',
    question: "Drag each season to its correct description!",
    answer: "sort",
    options: [],
    hint: "Winter is cold and dry, Summer is hot, Monsoon brings rain, Autumn is pleasant!",
    misconception: "Winter is cold and dry (Dec-Feb), Summer is hot (Mar-May), Monsoon brings heavy rains (Jun-Sep), and Autumn is pleasant (Oct-Nov).",
    sortItems: [
      { id: 'seas-win', label: 'Winter (Dec-Feb)', icon: 'winter', correctBin: 'bin-cold' },
      { id: 'seas-sum', label: 'Summer (Mar-May)', icon: 'summer', correctBin: 'bin-hot' },
      { id: 'seas-mon', label: 'Monsoon (Jun-Sep)', icon: 'monsoon', correctBin: 'bin-rain' },
      { id: 'seas-aut', label: 'Autumn (Oct-Nov)', icon: 'summer', correctBin: 'bin-pleasant' }
    ],
    bins: [
      { id: 'bin-cold', label: 'Cold & Dry ❄️', color: '#0284C7' },
      { id: 'bin-hot', label: 'Hot & Dry ☀️', color: '#CA8A04' },
      { id: 'bin-rain', label: 'Heavy Rains 🌧️', color: '#2563EB' },
      { id: 'bin-pleasant', label: 'Pleasant & Clear 🍃', color: '#16A34A' }
    ]
  },
  {
    type: 'identify',
    question: "Which type of natural vegetation is found in the Himalayan mountain region?",
    answer: "Mountain forests with pine, fir and deodar",
    options: [
      "Mountain forests with pine, fir and deodar",
      "Thorny scrub and cactus",
      "Mangrove tidal forests"
    ],
    hint: "Think about high altitude cold regions where trees have needle-like leaves.",
    misconception: "Mountain forests in the Himalayas feature pine, fir, and deodar trees which change with altitude and withstand cold temperatures."
  },
  {
    type: 'sort',
    question: "Drag each vegetation type to its correct region in India!",
    answer: "sort",
    options: [],
    hint: "Evergreen in Western Ghats, Thorn in Thar Desert, Mangrove in Sundarbans, Mountain in Himalayas!",
    misconception: "Tropical evergreen forests grow in the Western Ghats (>200cm rain), thorn forests in Rajasthan (<70cm rain), and mangroves in the Sundarbans delta.",
    sortItems: [
      { id: 'veg-ev', label: 'Evergreen Forest', icon: 'forest', correctBin: 'bin-wg' },
      { id: 'veg-th', label: 'Thorn & Scrub', icon: 'desert', correctBin: 'bin-raj' },
      { id: 'veg-mg', label: 'Mangroves', icon: 'coastal-veg', correctBin: 'bin-sun' },
      { id: 'veg-mt', label: 'Mountain Forest', icon: 'mountain-veg', correctBin: 'bin-him' }
    ],
    bins: [
      { id: 'bin-wg', label: 'Western Ghats 🌧️', color: '#16A34A' },
      { id: 'bin-raj', label: 'Thar Desert 🌵', color: '#CA8A04' },
      { id: 'bin-sun', label: 'Sundarbans 🌊', color: '#0284C7' },
      { id: 'bin-him', label: 'Himalayas 🏔️', color: '#64748B' }
    ]
  }
];

// ─── Geographer Gauri Mascot ───────────────────────────────────

function GeographerGauri({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-400"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
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
            <linearGradient id="gauri-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#065F46" />
            </linearGradient>
            <radialGradient id="gauri-face" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Explorer Outfit */}
          <rect x="22" y="48" width="31" height="30" rx="6" fill="url(#gauri-body)" stroke="#064E3B" strokeWidth="2" />
          <path d="M37 48 L37 78" stroke="#A7F3D0" strokeWidth="2" />
          {/* Map Scroll Badge */}
          <circle cx="30" cy="58" r="5" fill="white" stroke="#059669" strokeWidth="1.5" />
          <path d="M28 58 L32 58" stroke="#059669" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="14" fill="url(#gauri-face)" stroke="#D97706" strokeWidth="2" />
          {/* Sun Hat */}
          <path d="M18 22 Q 37.5 12, 57 22 L 52 26 Q 37.5 18, 23 26 Z" fill="#B45309" />
          <ellipse cx="37.5" cy="22" rx="19" ry="5" fill="#D97706" stroke="#B45309" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2" fill="#1E293B" />
          <circle cx="43" cy="30" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 37 Q 37.5 41, 42 37" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Magnifying Glass */}
          <circle cx="56" cy="62" r="7" fill="none" stroke="#334155" strokeWidth="2.5" />
          <line x1="61" y1="67" x2="68" y2="74" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="30" cy="82" rx="5" ry="3" fill="#065F46" />
          <ellipse cx="45" cy="82" rx="5" ry="3" fill="#065F46" />
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

// ─── Scene Background Component ───────────────────────────────

function IndiaGameBackground({ width, height }: { width: number; height: number }) {
  return (
    <svg className="absolute inset-0 pointer-events-none" width={width} height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id="india-sky-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
        <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>
      <rect width={width} height={height} fill="url(#india-sky-grad)" />
      {/* Himalayas silhouette in northern horizon */}
      <path d="M0 160 L120 100 L240 130 L380 90 L520 120 L640 100 L720 140 L720 220 L0 220 Z" fill="#94A3B8" opacity="0.4" />
      <path d="M0 180 L100 130 L220 160 L360 110 L500 150 L620 130 L720 170 L720 220 L0 220 Z" fill="#64748B" opacity="0.5" />
      {/* Ground plane */}
      <rect x="0" y={height - 180} width={width} height="180" fill="url(#ground-grad)" />
    </svg>
  );
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
        className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 bg-white cursor-grab active:cursor-grabbing select-none"
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 px-1 line-clamp-2">{label}</span>
      </div>
    </Draggable>
  );
}

interface SortBinComponentProps {
  bin: SortBin;
  isHovered: boolean;
}

function SortBinComponent({ bin, isHovered }: SortBinComponentProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border-4 p-2 transition-all duration-200 ${
        isHovered ? 'scale-105 shadow-xl' : 'shadow-md'
      }`}
      style={{
        backgroundColor: `${bin.color}15`,
        borderColor: bin.color,
        minWidth: 120,
        minHeight: 110,
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white shadow-sm" style={{ backgroundColor: bin.color }}>
        📂
      </div>
      <span className="text-xs font-bold text-center text-gray-800" style={{ color: bin.color }}>
        {bin.label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface IndiaLocationGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function IndiaLocationGame({ width = 720, height = 560, onComplete }: IndiaLocationGameProps) {
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
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 50 + idx * 145, y: height - 165 };
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

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      const binEl = document.getElementById(`bin-${bin.id}`);
      if (binEl) {
        const rect = binEl.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          droppedBinId = bin.id;
        }
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
    <div
      className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-sky-400 to-emerald-500 font-sans select-none flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      <IndiaGameBackground width={width} height={height} />
      <GeographerGauri mood={mascotMood} speaking={speakingText} />

      {/* Header bar */}
      <div className="absolute top-3 left-4 right-20 z-10 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-white/40">
        <div className="flex items-center gap-2">
          <span className="text-xl">🇮🇳</span>
          <h1 className="text-sm font-extrabold text-gray-800 tracking-wide">INDIA EXPLORER</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-xl">
            <span className="text-xs font-bold text-emerald-800">Score: {score}</span>
          </div>
          {screen === 'play' && <StarRow count={challengeIdx} total={CHALLENGES.length} />}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 pt-16 pb-6">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-white flex flex-col items-center text-center"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-3xl shadow-lg mb-4 text-white`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-xl font-extrabold text-gray-800 mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6 font-medium">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-auto">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === slideIdx ? 'w-6 bg-emerald-600' : 'w-2 bg-gray-300'}`} />
                ))}
              </div>
              <div className="flex gap-3">
                {slideIdx > 0 && (
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setSlideIdx(prev => prev - 1);
                    }}
                    className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-300 transition"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={() => {
                    audioManager.play('swoop');
                    if (slideIdx < TEACHING_SLIDES.length - 1) {
                      setSlideIdx(prev => prev + 1);
                    } else {
                      setScreen('play');
                    }
                  }}
                  className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg hover:bg-emerald-700 transition"
                >
                  {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Game! 🚀" : "Next ➡️"}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-white flex flex-col items-center">
            {/* Challenge Header */}
            <div className="flex items-center justify-between w-full mb-4">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <button
                onClick={handleShowHint}
                className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full hover:bg-amber-200 transition shadow-sm"
              >
                💡 Hint
              </button>
            </div>

            <h2 className="text-base font-extrabold text-gray-800 mb-6 text-center">{currentChallenge.question}</h2>

            {/* Identify / Multiple Choice */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-lg mb-4">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100";
                  if (selectedOpt) {
                    if (isCorrectAnswer) {
                      btnStyle = "bg-green-500 border-green-600 text-white shadow-lg";
                    } else if (isSelected) {
                      btnStyle = "bg-red-500 border-red-600 text-white shadow-lg";
                    } else {
                      btnStyle = "opacity-50 bg-gray-100 border-gray-300 text-gray-500";
                    }
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                      disabled={selectedOpt !== null}
                      onClick={e => handleAnswerClick(opt, e)}
                      className={`p-3.5 rounded-2xl border-2 font-bold text-sm text-left transition flex items-center justify-between shadow-sm ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAnswer && <span>✅</span>}
                      {selectedOpt && isSelected && !isCorrectAnswer && <span>❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="w-full flex flex-col items-center mb-4">
                <div className="grid grid-cols-4 gap-3 w-full mb-20">
                  {currentChallenge.bins.map(bin => (
                    <div key={bin.id} id={`bin-${bin.id}`}>
                      <SortBinComponent
                        bin={bin}
                        isHovered={hoveredBin === bin.id}
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-4 px-6">
                  {currentChallenge.sortItems.map(item => (
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

            {/* Next Button after correct answer */}
            {(selectedOpt === currentChallenge.answer || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold rounded-2xl shadow-lg hover:from-emerald-600 hover:to-green-700 transition"
              >
                {challengeIdx < CHALLENGES.length - 1 ? "Next Challenge ➡️" : "Complete Game 🎉"}
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
