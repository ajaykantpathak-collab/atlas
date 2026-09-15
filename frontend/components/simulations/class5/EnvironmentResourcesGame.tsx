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

function EnvironmentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M6 35 Q 20 25, 34 38 T 54 35 L 54 50 Q 30 54, 6 50 Z" fill="#86EFAC" />
      <circle cx="20" cy="20" r="4" fill="#FACC15" />
      <path d="M38 35 Q 42 25, 46 35 Z" fill="#22C55E" />
      <path d="M14 40 Q 18 30, 22 40 Z" fill="#16A34A" />
    </svg>
  );
}

function BioticIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
      <path d="M30 16 Q 40 25, 30 44 Q 20 25, 30 16 Z" fill="#22C55E" />
      <path d="M30 24 L 38 18" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="36" r="3" fill="#EF4444" />
      <circle cx="38" cy="36" r="3" fill="#EF4444" />
    </svg>
  );
}

function AbioticIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <circle cx="30" cy="22" r="8" fill="#FACC15" />
      <path d="M14 42 Q 30 32, 46 42" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M18 35 Q 30 25, 42 35" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function EarthquakeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <path d="M14 42 L 22 28 L 28 35 L 36 20 L 46 42" stroke="#B91C1C" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="42" x2="40" y2="42" stroke="#7F1D1D" strokeWidth="3" />
      <circle cx="36" cy="20" r="3" fill="#F59E0B" />
    </svg>
  );
}

function FloodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <rect x="12" y="28" width="36" height="20" fill="#38BDF8" opacity="0.8" rx="4" />
      <path d="M12 28 Q 24 22, 36 28 T 48 28" stroke="#0284C7" strokeWidth="3" fill="none" />
      <polygon points="30,14 38,24 22,24" fill="#94A3B8" />
      <rect x="27" y="20" width="6" height="4" fill="#CBD5E1" />
    </svg>
  );
}

function DroughtIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <circle cx="44" cy="18" r="8" fill="#F59E0B" />
      <path d="M10 40 L 50 40" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 40 L 16 48" stroke="#78350F" strokeWidth="2" />
      <path d="M35 40 L 40 48" stroke="#78350F" strokeWidth="2" />
      <path d="M28 40 L 26 46" stroke="#78350F" strokeWidth="2" />
    </svg>
  );
}

function CycloneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
      <path d="M16 20 Q 30 14, 44 22 Q 38 32, 22 30 Q 30 42, 44 40" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="30" r="4" fill="#3B82F6" />
    </svg>
  );
}

function WaterResourceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M30 16 Q 38 26, 38 34 A 8 8 0 1 1 22 34 Q 22 26, 30 16 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
    </svg>
  );
}

function SoilResourceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="30" cy="38" rx="18" ry="8" fill="#92400E" />
      <path d="M18 36 Q 30 26, 42 36" fill="#78350F" />
      <circle cx="24" cy="34" r="2" fill="#D97706" />
      <circle cx="36" cy="32" r="2" fill="#D97706" />
    </svg>
  );
}

function ForestResourceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
      <rect x="27" y="34" width="6" height="12" fill="#78350F" />
      <circle cx="30" cy="24" r="12" fill="#22C55E" />
      <circle cx="22" cy="28" r="8" fill="#16A34A" />
      <circle cx="38" cy="28" r="8" fill="#16A34A" />
    </svg>
  );
}

function MineralResourceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#F3F4F6" stroke="#4B5563" strokeWidth="2" />
      <polygon points="30,14 42,24 38,42 22,42 18,24" fill="#9CA3AF" stroke="#374151" strokeWidth="2" />
      <polygon points="30,14 42,24 30,30" fill="#D1D5DB" />
      <polygon points="30,14 18,24 30,30" fill="#E5E7EB" />
    </svg>
  );
}

function ConservationIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="8" width="48" height="44" rx="6" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
      <path d="M30 16 L 42 22 L 42 34 Q 42 42, 30 46 Q 18 42, 18 34 L 18 22 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M24 30 L 28 34 L 36 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'biotic': return <BioticIcon size={size} />;
    case 'abiotic': return <AbioticIcon size={size} />;
    case 'earthquake': return <EarthquakeIcon size={size} />;
    case 'flood': return <FloodIcon size={size} />;
    case 'drought': return <DroughtIcon size={size} />;
    case 'cyclone': return <CycloneIcon size={size} />;
    case 'renewable': return <WaterResourceIcon size={size} />;
    case 'non-renewable': return <MineralResourceIcon size={size} />;
    case 'conservation': return <ConservationIcon size={size} />;
    case 'environment': return <EnvironmentIcon size={size} />;
    default: return <EnvironmentIcon size={size} />;
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
    title: "Our Environment 🌿",
    text: "The environment is everything that surrounds us! It has two main parts: the natural environment (air, water, land, plants, animals) and the human environment (buildings, roads, farms, factories). Both interact constantly.",
    emoji: "🌿",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "The environment is everything that surrounds us. It has two main parts, natural and human, which interact constantly."
  },
  {
    title: "Biotic & Abiotic Components 🐾",
    text: "Living things like plants, animals, humans, and micro-organisms form the biotic components. Non-living things like air, water, soil, sunlight, and temperature form the abiotic components. Together they form ecosystems like a pond!",
    emoji: "🐾",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "Living things form biotic components while non-living things like air, water, and soil form abiotic components."
  },
  {
    title: "Natural Disasters ⚡",
    text: "Natural disasters are sudden, extreme natural events that cause great damage. Examples include earthquakes (ground shaking from earth plates), floods (rivers overflowing), droughts (long periods without rain), and cyclones (strong storms).",
    emoji: "⚡",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Natural disasters are sudden extreme natural events like earthquakes, floods, droughts, and cyclones that cause great damage."
  },
  {
    title: "Natural Resources 💧",
    text: "Natural resources are gifts of nature we use to live. Renewable resources like sunlight, wind, water, and forests can be replenished quickly. Non-renewable resources like coal, petroleum, and minerals take millions of years to form and will run out.",
    emoji: "💧",
    bgColor: "from-teal-500 to-cyan-600",
    spoken: "Natural resources include renewable ones like water and sunlight, and non-renewable ones like coal and petroleum."
  },
  {
    title: "Conservation & Sustainability 🛡️",
    text: "Conservation means using resources wisely. We practice the 3 Rs: Reduce, Reuse, and Recycle! Sustainable development means meeting our needs today without destroying the chance for future generations to meet theirs.",
    emoji: "🛡️",
    bgColor: "from-indigo-500 to-purple-600",
    spoken: "Conservation means using resources wisely through the 3 Rs, ensuring future generations have what they need."
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
    question: "What are the TWO main components of the environment?",
    answer: "Biotic (living) and Abiotic (non-living)",
    options: [
      "Biotic (living) and Abiotic (non-living)",
      "Plants and Animals only",
      "Air and Water only"
    ],
    hint: "Think about all parts of the world — both living creatures and non-living things like air and soil!",
    misconception: "The environment includes both biotic (living things like plants and animals) and abiotic (non-living things like air, water, and soil) components!"
  },
  {
    type: 'sort',
    question: "Drag each environmental component to Biotic or Abiotic!",
    answer: "sort",
    options: [],
    hint: "Biotic means living things (plants, animals), while Abiotic means non-living things (air, water, soil)!",
    misconception: "Biotic components are living (plants, animals), whereas abiotic components are non-living (air, water, soil, sunlight)!",
    sortItems: [
      { id: 'item-1', label: 'Green Plant', icon: 'biotic', correctBin: 'bin-biotic' },
      { id: 'item-2', label: 'Wild Tiger', icon: 'biotic', correctBin: 'bin-biotic' },
      { id: 'item-3', label: 'Fresh Air', icon: 'abiotic', correctBin: 'bin-abiotic' },
      { id: 'item-4', label: 'River Water', icon: 'abiotic', correctBin: 'bin-abiotic' }
    ],
    bins: [
      { id: 'bin-biotic', label: 'Biotic (Living) 🌿', color: '#16A34A' },
      { id: 'bin-abiotic', label: 'Abiotic (Non-living) ☀️', color: '#0284C7' }
    ]
  },
  {
    type: 'identify',
    question: "Which of these is a NATURAL disaster caused by movements deep inside the Earth?",
    answer: "Earthquake",
    options: [
      "Earthquake",
      "School Sports Day",
      "Building a bridge"
    ],
    hint: "Think about violent shaking of the ground caused by underground plates shifting!",
    misconception: "An earthquake is a natural disaster caused by movements of tectonic plates deep inside the Earth, resulting in ground shaking!"
  },
  {
    type: 'sort',
    question: "Drag each natural disaster to its correct description!",
    answer: "sort",
    options: [],
    hint: "Earthquakes shake the ground, floods overflow rivers, droughts have no rain, cyclones bring strong wind storms!",
    misconception: "Each disaster has a distinct cause: earthquakes involve ground shaking, floods involve overflowing water, droughts mean no rain, and cyclones are violent wind storms!",
    sortItems: [
      { id: 'dis-1', label: 'Earthquake', icon: 'earthquake', correctBin: 'bin-eq' },
      { id: 'dis-2', label: 'Flood', icon: 'flood', correctBin: 'bin-fl' },
      { id: 'dis-3', label: 'Drought', icon: 'drought', correctBin: 'bin-dr' },
      { id: 'dis-4', label: 'Cyclone', icon: 'cyclone', correctBin: 'bin-cy' }
    ],
    bins: [
      { id: 'bin-eq', label: 'Ground Shaking 🏚️', color: '#DC2626' },
      { id: 'bin-fl', label: 'Overflowing River 🌊', color: '#0284C7' },
      { id: 'bin-dr', label: 'No Rain / Dry Land ☀️', color: '#D97706' },
      { id: 'bin-cy', label: 'Strong Wind Storm 🌀', color: '#64748B' }
    ]
  },
  {
    type: 'identify',
    question: "Which of the following is a RENEWABLE natural resource?",
    answer: "Solar energy (Sunlight)",
    options: [
      "Solar energy (Sunlight)",
      "Coal",
      "Petroleum (Crude oil)"
    ],
    hint: "Think of a resource that nature constantly replaces and never runs out, like sunshine!",
    misconception: "Solar energy is renewable because the Sun keeps shining, whereas coal and petroleum take millions of years to form and are non-renewable!"
  },
  {
    type: 'sort',
    question: "Drag each natural resource to Renewable or Non-renewable!",
    answer: "sort",
    options: [],
    hint: "Renewable resources are replaced quickly by nature (water, sunlight), while non-renewable ones run out (coal, petroleum)!",
    misconception: "Renewable resources like water and sunlight replenish quickly, while non-renewable resources like coal and minerals take millions of years and cannot be replaced once used!",
    sortItems: [
      { id: 'res-1', label: 'Water', icon: 'renewable', correctBin: 'bin-ren' },
      { id: 'res-2', label: 'Sunlight', icon: 'renewable', correctBin: 'bin-ren' },
      { id: 'res-3', label: 'Coal', icon: 'non-renewable', correctBin: 'bin-non' },
      { id: 'res-4', label: 'Petroleum', icon: 'non-renewable', correctBin: 'bin-non' }
    ],
    bins: [
      { id: 'bin-ren', label: 'Renewable 💧', color: '#16A34A' },
      { id: 'bin-non', label: 'Non-renewable 🪨', color: '#DC2626' }
    ]
  },
  {
    type: 'identify',
    question: "What does CONSERVATION of natural resources mean?",
    answer: "Using resources wisely and protecting them for the future",
    options: [
      "Using resources wisely and protecting them for the future",
      "Using up all resources as fast as possible",
      "Hiding resources underground"
    ],
    hint: "Think about taking care of nature so future generations have clean water and green forests!",
    misconception: "Conservation means using natural resources wisely and responsibly so they last longer and are not wasted, supporting future generations!"
  },
  {
    type: 'sort',
    question: "Drag each conservation action to the correct method or benefit!",
    answer: "sort",
    options: [],
    hint: "Planting trees helps forests, rainwater harvesting saves water, public transport saves petrol, recycling cuts waste!",
    misconception: "Conservation methods target specific resources: planting trees renews forests, rainwater harvesting saves water, and using public transport reduces fuel burning!",
    sortItems: [
      { id: 'con-1', label: 'Plant Trees', icon: 'conservation', correctBin: 'bin-forest' },
      { id: 'con-2', label: 'Rainwater Harvesting', icon: 'conservation', correctBin: 'bin-water' },
      { id: 'con-3', label: 'Recycle Paper', icon: 'conservation', correctBin: 'bin-waste' }
    ],
    bins: [
      { id: 'bin-forest', label: 'Protects Forests 🌳', color: '#16A34A' },
      { id: 'bin-water', label: 'Saves Water 💧', color: '#0284C7' },
      { id: 'bin-waste', label: 'Reduces Waste ♻️', color: '#9333EA' }
    ]
  }
];

// ─── Environmentalist Eshan Mascot ────────────────────────────

function EnvironmentalistEshan({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-25 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-400"
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
            <linearGradient id="eshan-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <radialGradient id="eshan-face" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Green Eco Vest / Body */}
          <rect x="22" y="48" width="31" height="30" rx="6" fill="url(#eshan-body)" stroke="#065F46" strokeWidth="2" />
          <path d="M37 48 L37 78" stroke="#6EE7B7" strokeWidth="2" />
          {/* Recycling / Leaf Badge */}
          <circle cx="30" cy="58" r="5" fill="white" stroke="#059669" strokeWidth="1.5" />
          <path d="M28 58 Q 30 54, 32 58 Z" fill="#10B981" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="14" fill="url(#eshan-face)" stroke="#D97706" strokeWidth="2" />
          {/* Safari / Ranger Hat */}
          <path d="M20 22 Q 37.5 12, 55 22 L 50 26 Q 37.5 18, 25 26 Z" fill="#047857" />
          <ellipse cx="37.5" cy="22" rx="18" ry="5" fill="#065F46" stroke="#047857" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2" fill="#1E293B" />
          <circle cx="43" cy="30" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 37 Q 37.5 41, 42 37" stroke="#065F46" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Guidebook in Hand */}
          <rect x="52" y="52" width="12" height="8" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(20 52 52)" />
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

// ─── Game Scene Background ────────────────────────────────────

function EnvironmentSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <svg className="absolute inset-0 pointer-events-none" width={width} height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id="env-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="60%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#86EFAC" />
        </linearGradient>
        <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#env-sky)" />
      
      {/* Sun & Glow */}
      <circle cx={width - 80} cy={70} r="45" fill="url(#sun-glow)" />
      <circle cx={width - 80} cy={70} r="25" fill="#FACC15" />

      {/* Hills / Background Trees */}
      <path d={`M0 ${height - 120} Q ${width * 0.25} ${height - 180}, ${width * 0.5} ${height - 130} T ${width} ${height - 140} L ${width} ${height} L 0 ${height} Z`} fill="#4ADE80" opacity="0.6" />
      <path d={`M0 ${height - 80} Q ${width * 0.3} ${height - 130}, ${width * 0.7} ${height - 90} T ${width} ${height - 100} L ${width} ${height} L 0 ${height} Z`} fill="#22C55E" opacity="0.8" />

      {/* River Curve */}
      <path d={`M ${width * 0.3} ${height} Q ${width * 0.4} ${height - 100}, ${width * 0.6} ${height - 60} T ${width * 0.8} 0`} stroke="#38BDF8" strokeWidth="24" fill="none" opacity="0.5" />
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
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 bg-white cursor-grab active:cursor-grabbing p-2" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

interface BinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean;
}

function SortBin({ label, color, x, y, width, height, isHovered }: BinProps) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 transition-all duration-200 shadow-md ${
        isHovered ? 'scale-105 bg-emerald-50' : 'bg-white/90'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
      }}
    >
      <div className="w-8 h-2 rounded-full mb-2 opacity-50" style={{ backgroundColor: color }} />
      <span className="text-xs font-black text-gray-800 text-center uppercase tracking-wider">{label}</span>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface EnvironmentResourcesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function EnvironmentResourcesGame({ width = 720, height = 560, onComplete }: EnvironmentResourcesGameProps) {
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
      const count = currentChallenge.sortItems.length;
      const spacing = Math.min(130, (width - 80) / count);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 40 + idx * spacing, y: height - 165 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, width]);

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
      const compMsg = "Wonderful! You are a brilliant environmental champion!";
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

    // Find bin coordinates
    let droppedBinId: string | null = null;
    const binCount = currentChallenge.bins.length;
    const binWidth = Math.min(150, (width - 60) / binCount - 15);
    const binHeight = 90;
    const binY = 140;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = 30 + idx * (binWidth + 15);
      const by = binY;
      if (x + 55 >= bx && x + 55 <= bx + binWidth && y + 45 >= by && y + 45 <= by + binHeight) {
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
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-sky-100 select-none flex flex-col items-center justify-between font-sans shadow-2xl rounded-3xl border-4 border-emerald-500"
      style={{ width, height }}
    >
      <EnvironmentSceneBackground width={width} height={height} />
      <EnvironmentalistEshan mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="w-full px-6 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md z-20 border-b border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-2xl shadow-md font-black text-lg">
            🌿 Class 5
          </div>
          <div>
            <h1 className="text-base font-black text-gray-800 leading-tight">Environment & Resources</h1>
            <p className="text-xs font-semibold text-emerald-700">CISCE Curriculum</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Progress</span>
              <span className="text-sm font-black text-emerald-700">
                {challengeIdx + 1} / {CHALLENGES.length}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Score</span>
              <span className="text-sm font-black text-amber-600">{score} pts</span>
            </div>
            <StarRow count={Math.min(3, Math.floor(score / 30))} total={3} />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-4">
        {screen === 'teaching' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-emerald-300 text-center"
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-black text-gray-800 mb-3">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            <div className="flex items-center justify-between w-full mt-2">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === slideIdx ? 'w-8 bg-emerald-600' : 'w-2.5 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                {slideIdx > 0 && (
                  <button
                    onClick={() => {
                      audioManager.play('tap');
                      setSlideIdx(prev => prev - 1);
                    }}
                    className="px-4 py-2 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors shadow-md text-sm"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    if (slideIdx < TEACHING_SLIDES.length - 1) {
                      setSlideIdx(prev => prev + 1);
                    } else {
                      setScreen('play');
                      audioManager.play('celebration');
                    }
                  }}
                  className="px-6 py-2 rounded-xl font-black bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-lg text-sm"
                >
                  {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center w-full max-w-2xl">
            {/* Challenge Header / Question */}
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border-2 border-emerald-300 w-full mb-6 text-center"
            >
              <h2 className="text-base font-black text-gray-800">{currentChallenge.question}</h2>
            </motion.div>

            {/* Identify Type Challenge */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-lg">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAns = opt === currentChallenge.answer;
                  let btnStyle = "bg-white text-gray-800 border-2 border-emerald-200 hover:bg-emerald-50";
                  if (selectedOpt) {
                    if (isCorrectAns) btnStyle = "bg-emerald-500 text-white border-2 border-emerald-600 font-black shadow-lg";
                    else if (isSelected) btnStyle = "bg-rose-500 text-white border-2 border-rose-600 font-black";
                    else btnStyle = "bg-gray-100 text-gray-400 border-2 border-gray-200 opacity-60";
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                      disabled={selectedOpt !== null}
                      onClick={e => handleAnswerClick(opt, e)}
                      className={`p-4 rounded-2xl font-bold text-sm shadow-md transition-all text-left flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAns && <span className="text-xl">✅</span>}
                      {selectedOpt && isSelected && !isCorrectAns && <span className="text-xl">❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Type Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-[320px] flex justify-center">
                {/* Bins */}
                <div className="absolute top-2 w-full flex justify-around px-4">
                  {currentChallenge.bins.map((bin, idx) => {
                    const binWidth = Math.min(150, (width - 60) / currentChallenge.bins!.length - 15);
                    const binX = 30 + idx * (binWidth + 15);
                    return (
                      <SortBin
                        key={bin.id}
                        id={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={binX}
                        y={10}
                        width={binWidth}
                        height={90}
                        isHovered={hoveredBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable Items */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 220 };
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

            {/* Next / Continue Button on Answer */}
            {((currentChallenge.type === 'identify' && selectedOpt) ||
              (currentChallenge.type === 'sort' &&
                currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-center"
              >
                <button
                  onClick={advanceChallenge}
                  className="px-8 py-3 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all text-base flex items-center gap-2"
                >
                  <span>Continue</span>
                  <span>➔</span>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
    </div>
  );
}
