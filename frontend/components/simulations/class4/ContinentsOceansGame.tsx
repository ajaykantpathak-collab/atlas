'use client';

/**
 * ContinentsOceansGame — Learn about Earth's domains, continents, and oceans
 *
 * CISCE Nodes: c4_geo_004 (Four domains of Earth), c4_geo_005 (Continents), c4_geo_006 (Oceans)
 * Curriculum: ICSE Class 4 Geography
 *
 * ELI5: "Earth is our wonderful home in space, covered 71 percent by water and 29 percent
 * by land. It has four domains — land (lithosphere), water (hydrosphere), air (atmosphere),
 * and life (biosphere). The land is divided into seven giant continents, and the water
 * is divided into five great oceans!"
 *
 * Misconceptions:
 *   1. "The atmosphere is only oxygen" → "No! The atmosphere is mostly nitrogen (78%),
 *      with oxygen at 21%! Nitrogen is the main gas, not oxygen!"
 *   2. "Australia is the largest continent" → "No! Asia is the largest continent!
 *      Australia is the smallest continent and also a country!"
 *   3. "The Pacific and Atlantic are the same ocean" → "No! The Pacific is the largest
 *      and deepest ocean, while the Atlantic is second largest and has an S-shape!"
 *   4. "Antarctica has many permanent towns and people" → "No! Antarctica is covered in
 *      ice and has no permanent population — only visiting scientists!"
 *   5. "A sea and an ocean are the exact same thing" → "No! Oceans are vast open waters,
 *      while seas are smaller bodies partly enclosed by land like the Arabian Sea!"
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

// ─── SVG Icon Components ──────────────────────────────────────

function LithosphereIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M5 45 L20 20 L35 35 L50 15 L55 45 Z" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
      <path d="M20 20 L25 28 L35 35 Z" fill="#D7CCC8" opacity="0.6" />
      <path d="M50 15 L52 22 L55 45 L5 45 Z" fill="#A1887F" />
      <rect x="0" y="45" width="60" height="15" fill="#4E342E" />
    </svg>
  );
}

function HydrosphereIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="0" y="20" width="60" height="40" fill="#0288D1" rx="4" />
      <path d="M0 25 Q15 20, 30 25 T60 25" stroke="#81D4FA" strokeWidth="3" fill="none" />
      <path d="M0 38 Q15 33, 30 38 T60 38" stroke="#81D4FA" strokeWidth="2" fill="none" opacity="0.7" />
      <circle cx="20" cy="45" r="3" fill="#FFB74D" />
      <path d="M16 45 L12 43 L12 47 Z" fill="#FFB74D" />
    </svg>
  );
}

function AtmosphereIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="35" r="15" fill="#4CAF50" />
      <ellipse cx="22" cy="18" rx="14" ry="8" fill="white" opacity="0.9" />
      <ellipse cx="38" cy="14" rx="16" ry="10" fill="white" opacity="0.9" />
      <path d="M10 45 Q30 38, 50 45" stroke="#0288D1" strokeWidth="3" fill="none" />
    </svg>
  );
}

function BiosphereIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="32" width="8" height="18" fill="#795548" />
      <circle cx="30" cy="22" r="14" fill="#43A047" />
      <circle cx="23" cy="26" r="8" fill="#66BB6A" />
      <circle cx="37" cy="26" r="8" fill="#66BB6A" />
      <circle cx="30" cy="16" r="8" fill="#81C784" />
      <path d="M12 50 C12 45, 18 42, 22 46" stroke="#8D6E63" strokeWidth="2" fill="none" />
    </svg>
  );
}

function AsiaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 15 Q30 5, 45 15 Q55 25, 45 45 Q35 55, 20 45 Q10 35, 15 15 Z" fill="#FF7043" stroke="#D84315" strokeWidth="2" />
      <circle cx="30" cy="30" r="6" fill="#FFCA28" />
      <path d="M28 35 L30 44 L32 35 Z" fill="#D84315" />
    </svg>
  );
}

function AfricaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 10 Q35 8, 42 22 Q48 38, 32 50 Q22 52, 18 38 Q15 25, 20 10 Z" fill="#FFA726" stroke="#EF6C00" strokeWidth="2" />
      <line x1="12" y1="28" x2="48" y2="28" stroke="#D32F2F" strokeWidth="2" strokeDasharray="3,2" />
    </svg>
  );
}

function NorthAmericaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 10 Q40 12, 45 25 Q35 32, 25 35 Q15 45, 12 30 Q15 18, 20 10 Z" fill="#29B6F6" stroke="#0277BD" strokeWidth="2" />
      <rect x="25" y="20" width="10" height="6" fill="white" rx="1" opacity="0.8" />
    </svg>
  );
}

function SouthAmericaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M25 10 Q35 12, 38 25 Q30 45, 22 52 Q18 42, 22 25 Q20 15, 25 10 Z" fill="#66BB6A" stroke="#2E7D32" strokeWidth="2" />
      <circle cx="28" cy="32" r="5" fill="#81C784" />
    </svg>
  );
}

function AntarcticaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="22" ry="12" fill="#E0F7FA" stroke="#00BCD4" strokeWidth="2" />
      <path d="M15 32 Q25 25, 35 32 T50 35" stroke="white" strokeWidth="3" fill="none" />
      <circle cx="30" cy="30" r="4" fill="#0288D1" />
    </svg>
  );
}

function EuropeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 15 Q38 12, 42 28 Q35 40, 20 38 Q18 25, 22 15 Z" fill="#AB47BC" stroke="#6A1B9A" strokeWidth="2" />
      <circle cx="30" cy="26" r="4" fill="#FFD700" />
    </svg>
  );
}

function AustraliaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#EC407A" stroke="#AD1457" strokeWidth="2" />
      <circle cx="26" cy="30" r="3" fill="#FFF" />
      <circle cx="38" cy="34" r="3" fill="#FFF" />
    </svg>
  );
}

function PacificOceanIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" fill="#01579B" rx="8" />
      <path d="M10 25 Q30 15, 50 25" stroke="#4FC3F7" strokeWidth="3" fill="none" />
      <path d="M10 38 Q30 28, 50 38" stroke="#4FC3F7" strokeWidth="2" fill="none" opacity="0.7" />
      <circle cx="30" cy="31" r="5" fill="#FFD700" />
    </svg>
  );
}

function AtlanticOceanIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" fill="#0288D1" rx="6" />
      <path d="M35 15 C20 25, 40 35, 25 45" stroke="#B3E5FC" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function IndianOceanIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L50 45 L10 45 Z" fill="#00ACC1" stroke="#006064" strokeWidth="2" />
      <circle cx="30" cy="20" r="5" fill="#FFD700" />
      <path d="M20 35 Q30 30, 40 35" stroke="#E0F7FA" strokeWidth="2" fill="none" />
    </svg>
  );
}

function DefaultIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#0288D1" />
      <circle cx="30" cy="30" r="16" fill="#4FC3F7" />
      <text x="30" y="36" textAnchor="middle" fill="#01579B" fontSize="18" fontWeight="bold">?</text>
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'lithosphere': return <LithosphereIcon size={size} />;
    case 'hydrosphere': return <HydrosphereIcon size={size} />;
    case 'atmosphere': return <AtmosphereIcon size={size} />;
    case 'biosphere': return <BiosphereIcon size={size} />;
    case 'asia': return <AsiaIcon size={size} />;
    case 'africa': return <AfricaIcon size={size} />;
    case 'north-america': return <NorthAmericaIcon size={size} />;
    case 'south-america': return <SouthAmericaIcon size={size} />;
    case 'antarctica': return <AntarcticaIcon size={size} />;
    case 'europe': return <EuropeIcon size={size} />;
    case 'australia': return <AustraliaIcon size={size} />;
    case 'pacific': return <PacificOceanIcon size={size} />;
    case 'atlantic': return <AtlanticOceanIcon size={size} />;
    case 'indian': return <IndianOceanIcon size={size} />;
    default: return <DefaultIcon size={size} />;
  }
}

// ─── Explorer Ela Mascot Component ────────────────────────────

function ExplorerEla({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[240px] border-2 border-amber-400"
          >
            <p className="text-xs font-bold text-gray-800 leading-snug">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'thinking'
              ? { rotate: [0, 8, -8, 0] }
              : { y: [0, -5, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Explorer Hat */}
          <ellipse cx="37" cy="22" rx="26" ry="7" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" />
          <path d="M22 20 Q37 2, 52 20 Z" fill="#A1887F" stroke="#5D4037" strokeWidth="1.5" />
          <rect x="25" y="16" width="24" height="4" fill="#D7CCC8" />

          {/* Explorer Face/Head */}
          <circle cx="37" cy="38" r="16" fill="#FFCC80" stroke="#F57C00" strokeWidth="1.5" />

          {/* Eyes */}
          <circle cx="31" cy="35" r="2.5" fill="#3E2723" />
          <circle cx="43" cy="35" r="2.5" fill="#3E2723" />
          <circle cx="32" cy="34" r="1" fill="white" />
          <circle cx="44" cy="34" r="1" fill="white" />

          {/* Smile */}
          <path d="M32 44 Q37 49 42 44" stroke="#D84315" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Compass / Map Badge on shirt */}
          <rect x="27" y="56" width="20" height="22" rx="4" fill="#1976D2" stroke="#0D47A1" strokeWidth="1.5" />
          <circle cx="37" cy="67" r="6" fill="#FFD700" />
          <polygon points="37,62 39,67 37,72 35,67" fill="#D32F2F" />

          {/* Arms / Telescope */}
          <ellipse cx="16" cy="65" rx="4" ry="9" fill="#FFB74D" transform="rotate(-20 16 65)" />
          <ellipse cx="58" cy="65" rx="4" ry="9" fill="#FFB74D" transform="rotate(20 58 65)" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1 bg-white/80 px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : '#CBD5E1'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── World Map Scene Background ─��─────────────────────────────

function WorldMapScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E88E5" />
            <stop offset="40%" stopColor="#64B5F6" />
            <stop offset="70%" stopColor="#E3F2FD" />
            <stop offset="100%" stopColor="#81C784" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="0.8" cy="0.1" r="0.5">
            <stop offset="0%" stopColor="#FFF59D" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFCA28" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />
        <rect width={width} height={height} fill="url(#sun-glow)" />

        {/* Mountains silhouette in background */}
        <path d="M0 450 L80 370 L150 420 L240 330 L330 410 L420 340 L520 420 L620 360 L720 440 L720 560 L0 560 Z" fill="#558B2F" opacity="0.6" />
        <path d="M50 480 L130 400 L210 470 L300 390 L400 460 L500 390 L600 470 L720 420 L720 560 L0 560 Z" fill="#33691E" opacity="0.7" />

        {/* Globe grid lines background effect */}
        <circle cx={width / 2} cy={height / 2} r="220" fill="none" stroke="#90CAF9" strokeWidth="1" strokeDasharray="6,6" opacity="0.3" />
        <line x1={0} y1={height / 2} x2={width} y2={height / 2} stroke="#90CAF9" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
      </svg>
    </div>
  );
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
    title: "Four Amazing Domains of Earth! 🌍",
    text: "Earth has four major domains: Lithosphere (land), Hydrosphere (water), Atmosphere (air), and Biosphere (where life exists like plants, animals, and us)!",
    emoji: "🌍",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "Earth has four major domains: Lithosphere, Hydrosphere, Atmosphere, and Biosphere!",
  },
  {
    title: "The Seven Mighty Continents! 🗺️",
    text: "Earth's land is divided into seven massive blocks called continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia!",
    emoji: "🗺️",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Earth's land is divided into seven massive continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia!",
  },
  {
    title: "The Five Great Oceans! 🌊",
    text: "Water covers about 71 percent of Earth! The giant World Ocean is split into five parts: Pacific (largest), Atlantic (S-shaped), Indian, Southern, and Arctic!",
    emoji: "🌊",
    bgColor: "from-cyan-500 to-blue-600",
    spoken: "Water covers about 71 percent of Earth! The oceans are Pacific, Atlantic, Indian, Southern, and Arctic!",
  },
  {
    title: "Asia & India! 🇮🇳",
    text: "Asia is the largest continent on Earth, and our country India is located right in Asia! India is famous for the Himalayas in the north and great rivers like the Ganga!",
    emoji: "🇮🇳",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Asia is the largest continent on Earth, and our country India is located right in Asia!",
  },
  {
    title: "Antarctica & The Poles! ❄️",
    text: "Antarctica is the coldest continent on Earth, covered entirely in thick ice! It has no permanent towns or cities — only brave scientists living in research stations!",
    emoji: "❄️",
    bgColor: "from-sky-400 to-blue-500",
    spoken: "Antarctica is the coldest continent on Earth, covered entirely in ice with no permanent human population!",
  },
];

// ─── Challenge Definitions ───────────────────────────────────

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
    question: "What are the FOUR great domains of the Earth?",
    answer: "Lithosphere, hydrosphere, atmosphere, biosphere",
    options: [
      "Lithosphere, hydrosphere, atmosphere, biosphere",
      "Land, water, fire, wind",
      "Asia, Africa, Europe, Australia",
    ],
    hint: "Think of the four natural systems: stone land, all water, air blanket, and living zone!",
    misconception: "The four natural domains are Lithosphere (land), Hydrosphere (water), Atmosphere (air), and Biosphere (life)! Not fire or directions!",
  },
  {
    type: 'sort',
    question: "Drag each domain to its correct description!",
    answer: "sort",
    options: [],
    hint: "Lithosphere is solid land, hydrosphere is water, atmosphere is air, biosphere is life!",
    misconception: "Remember: Lithosphere = solid rocky land. Hydrosphere = all water. Atmosphere = blanket of gases. Biosphere = zone of living things!",
    sortItems: [
      { id: 'dom-1', label: 'Lithosphere', icon: 'lithosphere', correctBin: 'bin-l' },
      { id: 'dom-2', label: 'Hydrosphere', icon: 'hydrosphere', correctBin: 'bin-h' },
      { id: 'dom-3', label: 'Atmosphere', icon: 'atmosphere', correctBin: 'bin-a' },
      { id: 'dom-4', label: 'Biosphere', icon: 'biosphere', correctBin: 'bin-b' },
    ],
    bins: [
      { id: 'bin-l', label: 'Solid Land 🏔️', color: '#8D6E63' },
      { id: 'bin-h', label: 'All Water 🌊', color: '#0288D1' },
      { id: 'bin-a', label: 'Air Blanket ☁️', color: '#4CAF50' },
      { id: 'bin-b', label: 'Life Zone 🌳', color: '#FF9800' },
    ],
  },
  {
    type: 'identify',
    question: "How many CONTINENTS are there on Earth?",
    answer: "7 continents",
    options: ["5 continents", "7 continents", "10 continents"],
    hint: "Count them: Asia, Africa, North America, South America, Antarctica, Europe, Australia!",
    misconception: "There are exactly 7 continents on Earth! Asia is the largest and Australia is the smallest.",
  },
  {
    type: 'sort',
    question: "Drag each continent to its correct map feature!",
    answer: "sort",
    options: [],
    hint: "Asia is biggest and has India, Africa has the equator in the middle, Antarctica is freezing ice!",
    misconception: "Check carefully: Asia is the largest, Africa has the equator running through its middle, Antarctica is covered in ice, and Australia is an island continent!",
    sortItems: [
      { id: 'con-1', label: 'Asia (Largest)', icon: 'asia', correctBin: 'bin-asia' },
      { id: 'con-2', label: 'Africa (Equator)', icon: 'africa', correctBin: 'bin-africa' },
      { id: 'con-3', label: 'Antarctica (Ice)', icon: 'antarctica', correctBin: 'bin-ant' },
      { id: 'con-4', label: 'Australia (Small)', icon: 'australia', correctBin: 'bin-aus' },
    ],
    bins: [
      { id: 'bin-asia', label: 'Asia 🌏', color: '#FF7043' },
      { id: 'bin-africa', label: 'Africa 🌍', color: '#FFA726' },
      { id: 'bin-ant', label: 'Antarctica ❄️', color: '#00BCD4' },
      { id: 'bin-aus', label: 'Australia 🦘', color: '#EC407A' },
    ],
  },
  {
    type: 'identify',
    question: "Which is the LARGEST and DEEPEST ocean on Earth?",
    answer: "The Pacific Ocean",
    options: ["The Pacific Ocean", "The Atlantic Ocean", "The Indian Ocean"],
    hint: "It is so huge that it covers more area than all the land on Earth put together!",
    misconception: "The Pacific Ocean is the largest and deepest ocean! The Atlantic is second largest and S-shaped.",
  },
  {
    type: 'sort',
    question: "Drag each ocean to its correct description!",
    answer: "sort",
    options: [],
    hint: "Pacific is largest/deepest, Atlantic is S-shaped, Indian is triangular with India at top!",
    misconception: "Remember: Pacific is largest and deepest. Atlantic is S-shaped. Indian Ocean is triangular and named after India!",
    sortItems: [
      { id: 'oc-1', label: 'Pacific Ocean', icon: 'pacific', correctBin: 'bin-pac' },
      { id: 'oc-2', label: 'Atlantic Ocean', icon: 'atlantic', correctBin: 'bin-atl' },
      { id: 'oc-3', label: 'Indian Ocean', icon: 'indian', correctBin: 'bin-ind' },
    ],
    bins: [
      { id: 'bin-pac', label: 'Largest & Deepest 🌊', color: '#01579B' },
      { id: 'bin-atl', label: 'S-Shaped 🌀', color: '#0288D1' },
      { id: 'bin-ind', label: 'Triangular 🔺', color: '#00ACC1' },
    ],
  },
  {
    type: 'identify',
    question: "What percentage of the Earth's surface is covered by WATER?",
    answer: "About 71 percent",
    options: ["About 71 percent", "About 50 percent", "About 30 percent"],
    hint: "That is why Earth is often called the Blue Planet! It is nearly three-quarters water.",
    misconception: "About 71 percent of Earth's surface is covered by water, while land covers only 29 percent!",
  },
  {
    type: 'sort',
    question: "Drag each continent/ocean to its correct category!",
    answer: "sort",
    options: [],
    hint: "Asia and Africa are continents, Pacific and Atlantic are oceans!",
    misconception: "Make sure not to mix up continents (vast landmasses) with oceans (vast bodies of salt water)!",
    sortItems: [
      { id: 'mix-1', label: 'North America', icon: 'north-america', correctBin: 'bin-cont' },
      { id: 'mix-2', label: 'South America', icon: 'south-america', correctBin: 'bin-cont' },
      { id: 'mix-3', label: 'Pacific Ocean', icon: 'pacific', correctBin: 'bin-ocean' },
      { id: 'mix-4', label: 'Atlantic Ocean', icon: 'atlantic', correctBin: 'bin-ocean' },
    ],
    bins: [
      { id: 'bin-cont', label: 'Continent 🗺️', color: '#4CAF50' },
      { id: 'bin-ocean', label: 'Ocean 🌊', color: '#0288D1' },
    ],
  },
];

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={105} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1.5`} style={{ width: 105, height: 90 }}>
        {renderSortIcon(icon, 38)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 truncate max-w-[95px]">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center shadow-lg transition-all duration-200 ${isHovering ? 'scale-105 border-yellow-400 shadow-2xl' : 'border-white/80'}`}
      style={{ left: x, top: y, width, height, backgroundColor: color }}
    >
      <span className="text-white font-extrabold text-xs text-center px-2 drop-shadow-md">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface ContinentsOceansGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ContinentsOceansGame({ width = 720, height = 560, onComplete }: ContinentsOceansGameProps) {
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
  }, [challengeIdx, screen, resetInactivityTimer, currentChallenge]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      const count = currentChallenge.sortItems.length;
      const startX = Math.max(20, (width - count * 120) / 2);
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
      const compMsg = "Fantastic! You are a master World Explorer!";
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

    // Determine bin hit
    let droppedBinId: string | null = null;
    const binsCount = currentChallenge.bins.length;
    const binWidth = 130;
    const binHeight = 90;
    const totalWidth = binsCount * binWidth + (binsCount - 1) * 20;
    const startX = (width - totalWidth) / 2;
    const binY = 160;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x >= bx - 20 && x <= bx + binWidth + 20 && y >= by - 20 && y <= by + binHeight + 20) {
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
        const msg = "Fantastic! You sorted the continents and oceans perfectly!";
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
    <div className="relative overflow-hidden select-none rounded-3xl shadow-2xl border-4 border-blue-400 bg-slate-900" style={{ width, height }}>
      {/* Background scene */}
      <WorldMapScene width={width} height={height} />

      {/* Explorer Ela Mascot */}
      <ExplorerEla mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-slate-900/60 backdrop-blur-md">
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded-full shadow">
              Explorer Lesson {slideIdx + 1} of {TEACHING_SLIDES.length}
            </span>
            <div className="flex gap-1.5">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40'}`} />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} rounded-3xl p-6 shadow-2xl border-4 border-white/30 text-white flex flex-col items-center text-center my-auto`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed max-w-lg drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between items-center mb-2">
            <button
              onClick={() => {
                if (slideIdx > 0) {
                  audioManager.play('tap');
                  setSlideIdx(prev => prev - 1);
                }
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all ${slideIdx === 0 ? 'opacity-40 bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
            >
              Previous
            </button>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="px-7 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 shadow-xl hover:scale-105 transition-transform"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Mission! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10 bg-slate-900/50 backdrop-blur-sm">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <StarRow count={Math.floor(score / 15)} total={8} />
            <span className="text-xs font-bold text-white bg-black/40 px-3 py-1 rounded-full shadow">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
            <button
              onClick={handleShowHint}
              className="bg-amber-400 text-slate-900 px-3.5 py-1 rounded-full text-xs font-black shadow-lg hover:scale-105 transition-transform flex items-center gap-1"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Card */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 rounded-2xl p-4 shadow-xl border-2 border-amber-300 text-center mx-auto max-w-xl w-full mt-2"
          >
            <h3 className="text-sm font-black text-slate-800">{currentChallenge.question}</h3>
          </motion.div>

          {/* Interactive Challenge Area */}
          <div className="relative flex-1 my-3">
            {/* Multiple Choice Challenge */}
            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 items-center justify-center h-full max-w-md mx-auto">
                {currentChallenge.options.map(opt => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnColor = 'bg-white hover:bg-blue-50 text-slate-800 border-slate-200';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnColor = 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-102';
                    else if (isSelected) btnColor = 'bg-rose-500 text-white border-rose-600 animate-shake';
                  }
                  return (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`w-full py-3 px-5 rounded-2xl font-bold text-sm border-2 shadow-md transition-all ${btnColor}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort / Drag-and-Drop Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-full">
                {/* Bins */}
                {(() => {
                  const count = currentChallenge.bins.length;
                  const binWidth = 130;
                  const binHeight = 90;
                  const totalWidth = count * binWidth + (count - 1) * 20;
                  const startX = (width - totalWidth) / 2;
                  const binY = 150;

                  return currentChallenge.bins.map((bin, idx) => {
                    const bx = startX + idx * (binWidth + 20);
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={bx}
                        y={binY}
                        width={binWidth}
                        height={binHeight}
                        isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                      />
                    );
                  });
                })()}

                {/* Draggable Items */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: height - 130 };
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
          </div>

          {/* Bottom Navigation for Multiple Choice */}
          {currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer && (
            <div className="flex justify-center mb-2">
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="px-8 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-xl hover:scale-105 transition-transform"
              >
                Continue Mission! 🚀
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
